#include "drivers.h"

const soft_i2c_t BUS_OLED = {{PORT_B, 13}, {PORT_B, 12}};
const soft_i2c_t BUS_AHT = {{PORT_B, 6}, {PORT_B, 7}};

#define I2C_HALF_PERIOD_US 5u
#define I2C_LINE_TIMEOUT_US 1000u
#define OLED_REFRESH_CHUNK 16u
#define AHT_ADDRESS 0x38u
#define AHT_READY_FLAGS 0x18u
#define AHT_STATUS_MASK 0x98u
#define AHT_MIN_WAIT_MS 80u
#define AHT_MAX_WAIT_MS 500u

static uint8_t oled_device_address;
static uint8_t oled_framebuffer[OLED_WIDTH * OLED_PAGES];
static uint8_t oled_refresh_snapshot[OLED_WIDTH * OLED_PAGES];
static size_t oled_refresh_offset;
static bool oled_refresh_active;
static bool aht_ready;
static bool aht_pending;
static uint32_t aht_started_at;
static uint32_t aht_last_poll_at;

static bool bus_valid(const soft_i2c_t *bus) {
    return bus && bus->scl.port <= PORT_C && bus->sda.port <= PORT_C &&
           bus->scl.pin < 16u && bus->sda.pin < 16u &&
           (bus->scl.port != bus->sda.port || bus->scl.pin != bus->sda.pin);
}

static void i2c_half_period(void) {
    delay_us(I2C_HALF_PERIOD_US);
}

static bool line_wait_high(gpio_pin_t pin) {
    /* The loop remains bounded even if the system tick is not running. */
    for (uint32_t waited = 0; waited < I2C_LINE_TIMEOUT_US;
         waited += I2C_HALF_PERIOD_US) {
        if (gpio_read(pin)) return true;
        i2c_half_period();
    }
    return gpio_read(pin);
}

static bool i2c_raise_scl(const soft_i2c_t *bus) {
    /* In open-drain mode, writing 1 releases the line to its pull-up. */
    gpio_write(bus->scl, true);
    return line_wait_high(bus->scl);
}

static void i2c_release(const soft_i2c_t *bus) {
    gpio_write(bus->sda, true);
    gpio_write(bus->scl, true);
}

static bool i2c_stop(const soft_i2c_t *bus) {
    gpio_write(bus->scl, false);
    gpio_write(bus->sda, false);
    i2c_half_period();
    if (!i2c_raise_scl(bus)) {
        i2c_release(bus);
        return false;
    }
    i2c_half_period();
    gpio_write(bus->sda, true);
    i2c_half_period();
    return line_wait_high(bus->sda);
}

static bool i2c_bus_idle(const soft_i2c_t *bus) {
    i2c_release(bus);
    if (!line_wait_high(bus->scl)) return false;
    i2c_half_period();
    if (gpio_read(bus->sda)) return true;

    /* Recover an interrupted slave transmission using at most nine clocks. */
    for (uint8_t pulse = 0; pulse < 9u; ++pulse) {
        gpio_write(bus->scl, false);
        i2c_half_period();
        if (!i2c_raise_scl(bus)) {
            i2c_release(bus);
            return false;
        }
        i2c_half_period();
        if (gpio_read(bus->sda)) break;
    }
    return i2c_stop(bus);
}

static bool i2c_start(const soft_i2c_t *bus) {
    if (!i2c_bus_idle(bus)) return false;
    gpio_write(bus->sda, false);
    i2c_half_period();
    gpio_write(bus->scl, false);
    return true;
}

static bool i2c_write_byte(const soft_i2c_t *bus, uint8_t value) {
    for (uint8_t bit = 0; bit < 8u; ++bit) {
        bool released = (value & 0x80u) != 0u;
        gpio_write(bus->sda, released);
        i2c_half_period();
        if (!i2c_raise_scl(bus)) return false;
        i2c_half_period();
        /* Detect SDA being held low while the master transmits a 1. */
        if (released && !gpio_read(bus->sda)) return false;
        gpio_write(bus->scl, false);
        value <<= 1;
    }
    gpio_write(bus->sda, true);
    i2c_half_period();
    if (!i2c_raise_scl(bus)) return false;
    i2c_half_period();
    bool acknowledged = !gpio_read(bus->sda);
    gpio_write(bus->scl, false);
    return acknowledged;
}

static bool i2c_read_byte(const soft_i2c_t *bus, uint8_t *value, bool acknowledge) {
    uint8_t received = 0;
    gpio_write(bus->sda, true);
    for (uint8_t bit = 0; bit < 8u; ++bit) {
        i2c_half_period();
        if (!i2c_raise_scl(bus)) return false;
        i2c_half_period();
        received = (uint8_t)((received << 1) | (gpio_read(bus->sda) ? 1u : 0u));
        gpio_write(bus->scl, false);
    }
    /* ACK all bytes except the final byte, whose ninth clock carries NACK. */
    gpio_write(bus->sda, !acknowledge);
    i2c_half_period();
    if (!i2c_raise_scl(bus)) return false;
    i2c_half_period();
    gpio_write(bus->scl, false);
    gpio_write(bus->sda, true);
    *value = received;
    return true;
}

void i2c_init(const soft_i2c_t *bus) {
    if (!bus_valid(bus)) return;
    /* Set the output latch before enabling output mode to avoid a low glitch. */
    i2c_release(bus);
    gpio_mode(bus->scl, GPIO_OUT_OD);
    gpio_mode(bus->sda, GPIO_OUT_OD);
    (void)i2c_bus_idle(bus);
}

bool i2c_write(const soft_i2c_t *bus, uint8_t address,
               const uint8_t *data, size_t length) {
    if (!bus_valid(bus) || address > 0x7fu || (length && !data)) return false;
    if (!i2c_start(bus)) return false;
    bool ok = i2c_write_byte(bus, (uint8_t)(address << 1));
    for (size_t i = 0; ok && i < length; ++i) ok = i2c_write_byte(bus, data[i]);
    bool stopped = i2c_stop(bus);
    return ok && stopped;
}

bool i2c_probe(const soft_i2c_t *bus, uint8_t address) {
    return i2c_write(bus, address, 0, 0);
}

bool i2c_read(const soft_i2c_t *bus, uint8_t address,
              uint8_t *data, size_t length) {
    if (!bus_valid(bus) || address > 0x7fu || !length || !data) return false;
    if (!i2c_start(bus)) return false;
    bool ok = i2c_write_byte(bus, (uint8_t)((address << 1) | 1u));
    for (size_t i = 0; ok && i < length; ++i)
        ok = i2c_read_byte(bus, &data[i], i + 1u < length);
    bool stopped = i2c_stop(bus);
    return ok && stopped;
}

/* Five columns per printable ASCII glyph; bit 0 is the top pixel. */
static const uint8_t font5x7[95][5] = {
    {0x00,0x00,0x00,0x00,0x00}, /* space */
    {0x00,0x00,0x5f,0x00,0x00}, /* ! */
    {0x00,0x07,0x00,0x07,0x00}, /* " */
    {0x14,0x7f,0x14,0x7f,0x14}, /* # */
    {0x24,0x2a,0x7f,0x2a,0x12}, /* $ */
    {0x23,0x13,0x08,0x64,0x62}, /* % */
    {0x36,0x49,0x55,0x22,0x50}, /* & */
    {0x00,0x05,0x03,0x00,0x00}, /* ' */
    {0x00,0x1c,0x22,0x41,0x00}, /* ( */
    {0x00,0x41,0x22,0x1c,0x00}, /* ) */
    {0x14,0x08,0x3e,0x08,0x14}, /* * */
    {0x08,0x08,0x3e,0x08,0x08}, /* + */
    {0x00,0x50,0x30,0x00,0x00}, /* , */
    {0x08,0x08,0x08,0x08,0x08}, /* - */
    {0x00,0x60,0x60,0x00,0x00}, /* . */
    {0x20,0x10,0x08,0x04,0x02}, /* / */
    {0x3e,0x51,0x49,0x45,0x3e}, /* 0 */
    {0x00,0x42,0x7f,0x40,0x00}, /* 1 */
    {0x42,0x61,0x51,0x49,0x46}, /* 2 */
    {0x21,0x41,0x45,0x4b,0x31}, /* 3 */
    {0x18,0x14,0x12,0x7f,0x10}, /* 4 */
    {0x27,0x45,0x45,0x45,0x39}, /* 5 */
    {0x3c,0x4a,0x49,0x49,0x30}, /* 6 */
    {0x01,0x71,0x09,0x05,0x03}, /* 7 */
    {0x36,0x49,0x49,0x49,0x36}, /* 8 */
    {0x06,0x49,0x49,0x29,0x1e}, /* 9 */
    {0x00,0x36,0x36,0x00,0x00}, /* : */
    {0x00,0x56,0x36,0x00,0x00}, /* ; */
    {0x08,0x14,0x22,0x41,0x00}, /* < */
    {0x14,0x14,0x14,0x14,0x14}, /* = */
    {0x00,0x41,0x22,0x14,0x08}, /* > */
    {0x02,0x01,0x51,0x09,0x06}, /* ? */
    {0x32,0x49,0x79,0x41,0x3e}, /* @ */
    {0x7e,0x11,0x11,0x11,0x7e}, /* A */
    {0x7f,0x49,0x49,0x49,0x36}, /* B */
    {0x3e,0x41,0x41,0x41,0x22}, /* C */
    {0x7f,0x41,0x41,0x22,0x1c}, /* D */
    {0x7f,0x49,0x49,0x49,0x41}, /* E */
    {0x7f,0x09,0x09,0x09,0x01}, /* F */
    {0x3e,0x41,0x49,0x49,0x7a}, /* G */
    {0x7f,0x08,0x08,0x08,0x7f}, /* H */
    {0x00,0x41,0x7f,0x41,0x00}, /* I */
    {0x20,0x40,0x41,0x3f,0x01}, /* J */
    {0x7f,0x08,0x14,0x22,0x41}, /* K */
    {0x7f,0x40,0x40,0x40,0x40}, /* L */
    {0x7f,0x02,0x0c,0x02,0x7f}, /* M */
    {0x7f,0x04,0x08,0x10,0x7f}, /* N */
    {0x3e,0x41,0x41,0x41,0x3e}, /* O */
    {0x7f,0x09,0x09,0x09,0x06}, /* P */
    {0x3e,0x41,0x51,0x21,0x5e}, /* Q */
    {0x7f,0x09,0x19,0x29,0x46}, /* R */
    {0x46,0x49,0x49,0x49,0x31}, /* S */
    {0x01,0x01,0x7f,0x01,0x01}, /* T */
    {0x3f,0x40,0x40,0x40,0x3f}, /* U */
    {0x1f,0x20,0x40,0x20,0x1f}, /* V */
    {0x3f,0x40,0x38,0x40,0x3f}, /* W */
    {0x63,0x14,0x08,0x14,0x63}, /* X */
    {0x07,0x08,0x70,0x08,0x07}, /* Y */
    {0x61,0x51,0x49,0x45,0x43}, /* Z */
    {0x00,0x7f,0x41,0x41,0x00}, /* [ */
    {0x02,0x04,0x08,0x10,0x20}, /* backslash */
    {0x00,0x41,0x41,0x7f,0x00}, /* ] */
    {0x04,0x02,0x01,0x02,0x04}, /* ^ */
    {0x40,0x40,0x40,0x40,0x40}, /* _ */
    {0x00,0x01,0x02,0x04,0x00}, /* ` */
    {0x20,0x54,0x54,0x54,0x78}, /* a */
    {0x7f,0x48,0x44,0x44,0x38}, /* b */
    {0x38,0x44,0x44,0x44,0x20}, /* c */
    {0x38,0x44,0x44,0x48,0x7f}, /* d */
    {0x38,0x54,0x54,0x54,0x18}, /* e */
    {0x08,0x7e,0x09,0x01,0x02}, /* f */
    {0x0c,0x52,0x52,0x52,0x3e}, /* g */
    {0x7f,0x08,0x04,0x04,0x78}, /* h */
    {0x00,0x44,0x7d,0x40,0x00}, /* i */
    {0x20,0x40,0x44,0x3d,0x00}, /* j */
    {0x7f,0x10,0x28,0x44,0x00}, /* k */
    {0x00,0x41,0x7f,0x40,0x00}, /* l */
    {0x7c,0x04,0x18,0x04,0x78}, /* m */
    {0x7c,0x08,0x04,0x04,0x78}, /* n */
    {0x38,0x44,0x44,0x44,0x38}, /* o */
    {0x7c,0x14,0x14,0x14,0x08}, /* p */
    {0x08,0x14,0x14,0x18,0x7c}, /* q */
    {0x7c,0x08,0x04,0x04,0x08}, /* r */
    {0x48,0x54,0x54,0x54,0x20}, /* s */
    {0x04,0x3f,0x44,0x40,0x20}, /* t */
    {0x3c,0x40,0x40,0x20,0x7c}, /* u */
    {0x1c,0x20,0x40,0x20,0x1c}, /* v */
    {0x3c,0x40,0x30,0x40,0x3c}, /* w */
    {0x44,0x28,0x10,0x28,0x44}, /* x */
    {0x0c,0x50,0x50,0x50,0x3c}, /* y */
    {0x44,0x64,0x54,0x4c,0x44}, /* z */
    {0x00,0x08,0x36,0x41,0x00}, /* { */
    {0x00,0x00,0x7f,0x00,0x00}, /* | */
    {0x00,0x41,0x36,0x08,0x00}, /* } */
    {0x08,0x04,0x08,0x10,0x08}  /* ~ */
};

static bool oled_send(uint8_t control, const uint8_t *data, size_t length) {
    if (!oled_device_address || !i2c_start(&BUS_OLED)) return false;
    bool ok = i2c_write_byte(&BUS_OLED, (uint8_t)(oled_device_address << 1));
    if (ok) ok = i2c_write_byte(&BUS_OLED, control);
    for (size_t i = 0; ok && i < length; ++i)
        ok = i2c_write_byte(&BUS_OLED, data[i]);
    bool stopped = i2c_stop(&BUS_OLED);
    return ok && stopped;
}

uint8_t oled_address(void) {
    return oled_device_address;
}

void oled_clear(void) {
    for (size_t i = 0; i < sizeof oled_framebuffer; ++i) oled_framebuffer[i] = 0;
}

void oled_text(uint8_t row, uint8_t column, const char *text) {
    if (row >= OLED_PAGES || column >= OLED_TEXT_COLUMNS || !text) return;
    while (*text && column < OLED_TEXT_COLUMNS) {
        uint8_t glyph = (uint8_t)*text++;
        if (glyph < 32u || glyph > 126u) glyph = '?';
        size_t offset = (size_t)row * OLED_WIDTH + (size_t)column * 6u;
        for (uint8_t x = 0; x < 5u; ++x)
            oled_framebuffer[offset + x] = font5x7[glyph - 32u][x];
        oled_framebuffer[offset + 5u] = 0;
        ++column;
    }
}

static void oled_refresh_cancel(void) {
    oled_refresh_active = false;
    oled_refresh_offset = 0;
}

bool oled_refresh_busy(void) {
    return oled_refresh_active;
}

bool oled_refresh_begin(void) {
    if (oled_refresh_active || !oled_device_address) return false;
    for (size_t i = 0; i < sizeof oled_framebuffer; ++i)
        oled_refresh_snapshot[i] = oled_framebuffer[i];
    oled_refresh_offset = 0;
    oled_refresh_active = true;
    return true;
}

bool oled_refresh_step(void) {
    if (!oled_refresh_active) return true;
    uint8_t page = (uint8_t)(oled_refresh_offset / OLED_WIDTH);
    uint8_t column = (uint8_t)(oled_refresh_offset % OLED_WIDTH);
    uint8_t window[] = {
        0x21, column, (uint8_t)(column + OLED_REFRESH_CHUNK - 1u),
        0x22, page, page
    };
    /* Each step contains two bounded transactions: address + control + six
     * window bytes, then address + control + sixteen snapshot data bytes.
     */
    if (!oled_send(0x00, window, sizeof window) ||
        !oled_send(0x40, &oled_refresh_snapshot[oled_refresh_offset],
                   OLED_REFRESH_CHUNK)) {
        oled_refresh_cancel();
        return false;
    }
    oled_refresh_offset += OLED_REFRESH_CHUNK;
    if (oled_refresh_offset == sizeof oled_refresh_snapshot) oled_refresh_cancel();
    return true;
}

bool oled_refresh(void) {
    /* A synchronous update supersedes any queued snapshot, including on error. */
    oled_refresh_cancel();
    /* Horizontal addressing covers the 128 x 64 panel's eight pages. */
    static const uint8_t window[] = {
        0x21, 0x00, OLED_WIDTH - 1u, 0x22, 0x00, OLED_PAGES - 1u
    };
    if (!oled_send(0x00, window, sizeof window)) return false;
    return oled_send(0x40, oled_framebuffer, sizeof oled_framebuffer);
}

bool oled_init(void) {
    static const uint8_t setup[] = {
        0xae,             /* display off */
        0xd5, 0x80,       /* oscillator / clock divider */
        0xa8, OLED_HEIGHT - 1u, /* 64 multiplexed rows */
        0xd3, 0x00,       /* display offset */
        0x40,             /* display start line 0 */
        0x8d, 0x14,       /* internal charge pump enabled */
        0x20, 0x00,       /* horizontal RAM addressing */
        0xa1, 0xc8,       /* segment and COM scan orientation */
        0xda, 0x12,       /* alternate COM pins for 128 x 64 */
        0x81, 0x7f,       /* moderate contrast */
        0xd9, 0xf1,       /* precharge for charge-pump operation */
        0xdb, 0x20,       /* VCOMH deselect level: 0.77 VCC */
        0xa4, 0xa6, 0x2e  /* RAM display, normal pixels, scrolling off */
    };
    static const uint8_t display_on[] = {0xaf};
    oled_refresh_cancel();
    oled_device_address = 0;
    i2c_init(&BUS_OLED);
    delay_ms(50);
    if (i2c_probe(&BUS_OLED, 0x3c)) oled_device_address = 0x3c;
    else if (i2c_probe(&BUS_OLED, 0x3d)) oled_device_address = 0x3d;
    else return false;
    oled_clear();
    if (!oled_send(0x00, setup, sizeof setup) || !oled_refresh() ||
        !oled_send(0x00, display_on, sizeof display_on)) {
        oled_device_address = 0;
        return false;
    }
    return true;
}

bool oled_test_pattern(uint8_t pattern) {
    if (pattern > 3u) return false;
    for (size_t i = 0; i < sizeof oled_framebuffer; ++i) {
        uint8_t column = (uint8_t)(i % OLED_WIDTH);
        switch (pattern) {
        case 0: oled_framebuffer[i] = 0x00; break;
        case 1: oled_framebuffer[i] = 0xff; break;
        case 2: oled_framebuffer[i] = (column & 1u) ? 0x55 : 0xaa; break;
        default: oled_framebuffer[i] = (column & 4u) ? 0x00 : 0xff; break;
        }
    }
    return oled_refresh();
}

static uint8_t aht_crc8(const uint8_t *data, size_t length) {
    uint8_t crc = 0xff;
    for (size_t i = 0; i < length; ++i) {
        crc ^= data[i];
        for (uint8_t bit = 0; bit < 8u; ++bit)
            crc = (uint8_t)((crc << 1) ^ ((crc & 0x80u) ? 0x31u : 0u));
    }
    return crc;
}

static bool aht_decode(const uint8_t data[7], int32_t *temperature_centi,
                       uint32_t *humidity_centi) {
    if (!temperature_centi || !humidity_centi ||
        (data[0] & AHT_STATUS_MASK) != AHT_READY_FLAGS ||
        aht_crc8(data, 6) != data[6]) return false;
    uint32_t raw_humidity = ((uint32_t)data[1] << 12) |
                            ((uint32_t)data[2] << 4) | (data[3] >> 4);
    uint32_t raw_temperature = ((uint32_t)(data[3] & 0x0fu) << 16) |
                               ((uint32_t)data[4] << 8) | data[5];
    /* Fixed point with rounding to 0.01 units; no floating point or division. */
    int32_t temperature = (int32_t)(((uint64_t)raw_temperature * 20000u +
                                     524288u) >> 20) - 5000;
    uint32_t humidity = (uint32_t)(((uint64_t)raw_humidity * 10000u +
                                   524288u) >> 20);
    if (temperature < -4000 || temperature > 12000 || humidity > 10000u)
        return false;
    *temperature_centi = temperature;
    *humidity_centi = humidity;
    return true;
}

bool aht_init(void) {
    uint8_t status = 0;
    aht_ready = false;
    aht_pending = false;
    i2c_init(&BUS_AHT);
    delay_ms(100);
    /* AHT30 is factory calibrated. Its documented startup flow uses no
     * AHT20 BE command or register initialization. 0x71 is the address
     * byte 0x38 << 1 | READ, not a data command.
     */
    for (uint8_t attempt = 0; attempt < 10u; ++attempt) {
        if (!i2c_read(&BUS_AHT, AHT_ADDRESS, &status, 1)) return false;
        if ((status & AHT_STATUS_MASK) == AHT_READY_FLAGS) {
            aht_ready = true;
            return true;
        }
        /* OTP integrity failure or disabled calibration invalidates data. */
        if ((status & AHT_READY_FLAGS) != AHT_READY_FLAGS) return false;
        delay_ms(10);
    }
    return false;
}

bool aht_start(void) {
    static const uint8_t trigger[] = {0xac, 0x33, 0x00};
    if (!aht_ready || aht_pending) return false;
    if (!i2c_write(&BUS_AHT, AHT_ADDRESS, trigger, sizeof trigger)) return false;
    aht_started_at = millis();
    aht_last_poll_at = aht_started_at;
    aht_pending = true;
    return true;
}

aht_result_t aht_poll(int32_t *temperature_centi, uint32_t *humidity_centi) {
    uint8_t data[7];
    if (!aht_pending || !temperature_centi || !humidity_centi) return AHT_ERROR;
    uint32_t now = millis();
    uint32_t elapsed = now - aht_started_at;
    if (elapsed >= AHT_MAX_WAIT_MS) {
        aht_pending = false;
        return AHT_ERROR;
    }
    if (elapsed < AHT_MIN_WAIT_MS || now - aht_last_poll_at < 10u)
        return AHT_WAIT;
    aht_last_poll_at = now;
    if (!i2c_read(&BUS_AHT, AHT_ADDRESS, data, sizeof data)) {
        aht_pending = false;
        return AHT_ERROR;
    }
    if (data[0] & 0x80u) return AHT_WAIT;
    aht_pending = false;
    if ((data[0] & AHT_READY_FLAGS) != AHT_READY_FLAGS) aht_ready = false;
    if (!aht_decode(data, temperature_centi, humidity_centi)) return AHT_ERROR;
    return AHT_OK;
}
