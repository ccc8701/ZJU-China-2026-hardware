/* Standalone host test: compile this file with -Ifirmware/include.
 * Include the implementation to inspect private decode/framebuffer state;
 * the GPIO mock implements a separate I2C slave state machine.
 */
#include <assert.h>
#include <stdio.h>
#include <string.h>
#include "../firmware/src/drivers.c"

typedef enum { RX_BITS, RX_ACK, TX_BITS, TX_ACK, WAIT_STOP } phase_t;
typedef struct { uint8_t bytes[1100]; size_t length; } transaction_t;
static struct {
    const soft_i2c_t *bus;
    uint8_t address;
    bool scl, sda, slave_release, active;
    bool stuck_scl, stuck_sda, accepted, reading, ack_clock;
    unsigned recovery_clocks, clear_after, modes, stops;
    phase_t phase;
    uint8_t bits, received;
    uint8_t reply[7];
    size_t reply_length, reply_index;
    bool master_acks[32];
    size_t ack_count;
    transaction_t transactions[160];
    size_t count;
    size_t nack_transaction, nack_byte;
    uint64_t time_us;
} mock;

static bool pin_eq(gpio_pin_t a, gpio_pin_t b) {
    return a.port == b.port && a.pin == b.pin;
}

static bool wire_sda(void) {
    return mock.sda && mock.slave_release && !mock.stuck_sda;
}

static void mock_start(void) {
    assert(mock.count < sizeof mock.transactions / sizeof mock.transactions[0]);
    mock.transactions[mock.count++].length = 0;
    mock.active = true;
    mock.slave_release = true;
    mock.accepted = false;
    mock.reading = false;
    mock.ack_clock = false;
    mock.bits = 0;
    mock.received = 0;
    mock.reply_index = 0;
    mock.phase = RX_BITS;
}

static void mock_receive(uint8_t byte) {
    transaction_t *transaction = &mock.transactions[mock.count - 1];
    assert(transaction->length < sizeof transaction->bytes);
    transaction->bytes[transaction->length++] = byte;
    if (transaction->length == 1) {
        mock.accepted = (byte >> 1) == mock.address;
        mock.reading = (byte & 1u) != 0;
    }
    if (mock.count == mock.nack_transaction && transaction->length == mock.nack_byte)
        mock.accepted = false;
}

static void mock_send_bit(void) {
    uint8_t byte = mock.reply_index < mock.reply_length ?
                   mock.reply[mock.reply_index] : 0xff;
    mock.slave_release = (byte & (0x80u >> mock.bits)) != 0;
}

static void mock_rising(void) {
    if (!mock.active) {
        if (mock.stuck_sda && mock.sda) {
            ++mock.recovery_clocks;
            if (mock.clear_after && mock.recovery_clocks >= mock.clear_after)
                mock.stuck_sda = false;
        }
        return;
    }
    switch (mock.phase) {
    case RX_BITS:
        mock.received = (uint8_t)((mock.received << 1) | (wire_sda() ? 1u : 0u));
        if (++mock.bits == 8) mock_receive(mock.received);
        break;
    case RX_ACK:
        mock.ack_clock = true;
        break;
    case TX_BITS:
        ++mock.bits;
        break;
    case TX_ACK:
        assert(mock.ack_count < sizeof mock.master_acks / sizeof mock.master_acks[0]);
        mock.master_acks[mock.ack_count++] = !wire_sda();
        mock.ack_clock = true;
        break;
    case WAIT_STOP:
        break;
    }
}

static void mock_falling(void) {
    if (!mock.active) return;
    switch (mock.phase) {
    case RX_BITS:
        if (mock.bits == 8) {
            mock.phase = RX_ACK;
            mock.slave_release = !mock.accepted;
            mock.ack_clock = false;
        }
        break;
    case RX_ACK:
        if (mock.ack_clock) {
            mock.bits = 0;
            mock.received = 0;
            mock.ack_clock = false;
            mock.slave_release = true;
            mock.phase = mock.reading && mock.accepted ? TX_BITS : RX_BITS;
            if (mock.phase == TX_BITS) mock_send_bit();
        }
        break;
    case TX_BITS:
        if (mock.bits == 8) {
            mock.phase = TX_ACK;
            mock.slave_release = true;
            mock.ack_clock = false;
        } else mock_send_bit();
        break;
    case TX_ACK:
        if (mock.ack_clock) {
            mock.ack_clock = false;
            mock.bits = 0;
            ++mock.reply_index;
            if (mock.master_acks[mock.ack_count - 1]) {
                mock.phase = TX_BITS;
                mock_send_bit();
            } else {
                mock.phase = WAIT_STOP;
                mock.slave_release = true;
            }
        }
        break;
    case WAIT_STOP:
        break;
    }
}

void gpio_mode(gpio_pin_t pin, gpio_mode_t mode) {
    assert(pin_eq(pin, mock.bus->scl) || pin_eq(pin, mock.bus->sda));
    assert(mode == GPIO_OUT_OD);
    ++mock.modes;
}

void gpio_write(gpio_pin_t pin, bool high) {
    if (pin_eq(pin, mock.bus->scl)) {
        bool old_wire = mock.scl && !mock.stuck_scl;
        mock.scl = high;
        bool new_wire = mock.scl && !mock.stuck_scl;
        if (!old_wire && new_wire) mock_rising();
        if (old_wire && !new_wire) mock_falling();
    } else {
        assert(pin_eq(pin, mock.bus->sda));
        bool old_wire = wire_sda();
        mock.sda = high;
        bool new_wire = wire_sda();
        if (mock.scl && !mock.stuck_scl) {
            if (old_wire && !new_wire) mock_start();
            if (!old_wire && new_wire) {
                mock.active = false;
                mock.slave_release = true;
                ++mock.stops;
            }
        }
    }
}

bool gpio_read(gpio_pin_t pin) {
    if (pin_eq(pin, mock.bus->scl)) return mock.scl && !mock.stuck_scl;
    assert(pin_eq(pin, mock.bus->sda));
    return wire_sda();
}

uint32_t millis(void) { return (uint32_t)(mock.time_us / 1000u); }
void delay_ms(uint32_t ms) { mock.time_us += (uint64_t)ms * 1000u; }
void delay_us(uint32_t us) { mock.time_us += us; }

static void mock_reset(const soft_i2c_t *bus, uint8_t address) {
    memset(&mock, 0, sizeof mock);
    mock.bus = bus;
    mock.address = address;
    mock.scl = mock.sda = mock.slave_release = true;
    aht_ready = aht_pending = false;
    oled_device_address = 0;
    oled_refresh_active = false;
    oled_refresh_offset = 0;
    oled_clear();
}

static void mock_reply(const uint8_t *bytes, size_t length) {
    assert(length <= sizeof mock.reply);
    memcpy(mock.reply, bytes, length);
    mock.reply_length = length;
}

static void test_i2c_transactions(void) {
    static const uint8_t reply[] = {0x18, 0x80, 0x00, 0x06, 0x00, 0x00, 0x23};
    static const uint8_t trigger[] = {0xac, 0x33, 0x00};
    uint8_t result[7] = {0};
    mock_reset(&BUS_AHT, 0x38);
    i2c_init(&BUS_AHT);
    assert(mock.modes == 2);
    assert(i2c_write(&BUS_AHT, 0x38, trigger, sizeof trigger));
    assert(mock.count == 1 && mock.transactions[0].length == 4);
    assert(memcmp(mock.transactions[0].bytes, "\x70\xac\x33\x00", 4) == 0);
    mock_reply(reply, sizeof reply);
    assert(i2c_read(&BUS_AHT, 0x38, result, sizeof result));
    assert(memcmp(result, reply, sizeof reply) == 0);
    assert(mock.transactions[1].bytes[0] == 0x71);
    assert(mock.ack_count == 7);
    for (size_t i = 0; i < 6; ++i) assert(mock.master_acks[i]);
    assert(!mock.master_acks[6]);
    assert(mock.stops == 2 && !mock.active && mock.scl && mock.sda);
    assert(!i2c_probe(&BUS_AHT, 0x39));
    assert(mock.stops == 3 && mock.scl && mock.sda);
}

static void test_i2c_stuck_lines(void) {
    mock_reset(&BUS_AHT, 0x38);
    mock.stuck_scl = true;
    assert(!i2c_probe(&BUS_AHT, 0x38));
    assert(mock.count == 0 && mock.time_us <= 1100);
    assert(mock.scl && mock.sda);

    mock_reset(&BUS_AHT, 0x38);
    mock.stuck_sda = true;
    assert(!i2c_probe(&BUS_AHT, 0x38));
    assert(mock.recovery_clocks == 9 && mock.count == 0);
    assert(mock.time_us < 2000 && mock.scl && mock.sda);

    mock_reset(&BUS_AHT, 0x38);
    mock.stuck_sda = true;
    mock.clear_after = 9;
    assert(i2c_probe(&BUS_AHT, 0x38));
    assert(mock.recovery_clocks == 9 && mock.count == 1);
    assert(!mock.stuck_sda && mock.scl && mock.sda && !mock.active);
}

static void test_aht_crc_decode(void) {
    static const uint8_t check[] = "123456789";
    static const uint8_t normal[] = {0x18, 0x80, 0x00, 0x06, 0x00, 0x00, 0x23};
    static const uint8_t cold[] = {0x18, 0x00, 0x00, 0x00, 0xcc, 0xcd, 0x20};
    static const uint8_t hot[] = {0x18, 0x80, 0x00, 0x0c, 0x00, 0x00, 0xfd};
    static const uint8_t limit[] = {0x18, 0x80, 0x00, 0x0d, 0x99, 0x9a, 0xd7};
    static const uint8_t too_hot[] = {0x18, 0x80, 0x00, 0x0d, 0xad, 0xf4, 0x42};
    static const uint8_t otp_error[] = {0x08, 0x80, 0x00, 0x06, 0x00, 0x00, 0xa6};
    static const uint8_t uncalibrated[] = {0x10, 0x80, 0x00, 0x06, 0x00, 0x00, 0xf9};
    int32_t temperature = 123;
    uint32_t humidity = 456;
    assert(aht_crc8(check, 9) == 0xf7);
    assert(aht_crc8(normal, 6) == 0x23);
    assert(aht_decode(normal, &temperature, &humidity));
    assert(temperature == 2500 && humidity == 5000);
    assert(aht_decode(cold, &temperature, &humidity));
    assert(temperature == -4000 && humidity == 0);
    assert(aht_decode(hot, &temperature, &humidity));
    assert(temperature == 10000 && humidity == 5000);
    assert(aht_decode(limit, &temperature, &humidity));
    assert(temperature == 12000 && humidity == 5000);
    uint8_t corrupt[7];
    memcpy(corrupt, normal, sizeof corrupt);
    corrupt[4] ^= 1u;
    temperature = 123;
    humidity = 456;
    assert(!aht_decode(corrupt, &temperature, &humidity));
    assert(temperature == 123 && humidity == 456);
    assert(!aht_decode(otp_error, &temperature, &humidity));
    assert(!aht_decode(uncalibrated, &temperature, &humidity));
    assert(!aht_decode(too_hot, &temperature, &humidity));
    assert(temperature == 123 && humidity == 456);
}

static void test_aht_nonblocking(void) {
    static const uint8_t calibrated[] = {0x18};
    static const uint8_t normal[] = {0x18, 0x80, 0x00, 0x06, 0x00, 0x00, 0x23};
    static const uint8_t busy[] = {0x98, 0, 0, 0, 0, 0, 0};
    int32_t temperature = 123;
    uint32_t humidity = 456;
    mock_reset(&BUS_AHT, 0x38);
    mock_reply(calibrated, sizeof calibrated);
    assert(aht_init());
    assert(mock.time_us >= 100000);
    assert(aht_start());
    assert(!aht_start());
    size_t count = mock.count;
    assert(aht_poll(&temperature, &humidity) == AHT_WAIT);
    delay_ms(79);
    assert(aht_poll(&temperature, &humidity) == AHT_WAIT);
    assert(mock.count == count && temperature == 123 && humidity == 456);
    delay_ms(1);
    mock_reply(busy, sizeof busy);
    assert(aht_poll(&temperature, &humidity) == AHT_WAIT);
    count = mock.count;
    assert(aht_poll(&temperature, &humidity) == AHT_WAIT);
    assert(mock.count == count && temperature == 123 && humidity == 456);
    delay_ms(10);
    mock_reply(normal, sizeof normal);
    assert(aht_poll(&temperature, &humidity) == AHT_OK);
    assert(temperature == 2500 && humidity == 5000);

    assert(aht_start());
    delay_ms(80);
    mock.reply[6] ^= 1u;
    temperature = 123;
    humidity = 456;
    assert(aht_poll(&temperature, &humidity) == AHT_ERROR);
    assert(temperature == 123 && humidity == 456);
    assert(aht_start());
    count = mock.count;
    delay_ms(500);
    assert(aht_poll(&temperature, &humidity) == AHT_ERROR);
    assert(mock.count == count && temperature == 123 && humidity == 456);
    assert(!aht_pending);

    /* The 80 ms interval crosses the unsigned millisecond counter wrap. */
    mock_reset(&BUS_AHT, 0x38);
    aht_ready = true;
    mock.time_us = (uint64_t)(UINT32_MAX - 30u) * 1000u;
    mock_reply(normal, sizeof normal);
    assert(aht_start());
    delay_ms(80);
    assert(aht_poll(&temperature, &humidity) == AHT_OK);
    assert(temperature == 2500 && humidity == 5000);
}

static void test_aht_readiness(void) {
    static const uint8_t calibrated[] = {0x18};
    static const uint8_t bad_status[] = {0x00, 0x08, 0x10, 0x98};
    mock_reset(&BUS_AHT, 0x38);
    mock_reply(calibrated, sizeof calibrated);
    assert(aht_init());
    assert(mock.count == 1 && mock.transactions[0].length == 1);
    assert(mock.transactions[0].bytes[0] == 0x71);
    assert(mock.time_us >= 100000);
    for (size_t i = 0; i < sizeof bad_status; ++i) {
        mock_reset(&BUS_AHT, 0x38);
        mock_reply(&bad_status[i], 1);
        assert(!aht_init());
        assert(mock.time_us < 250000 && !aht_ready);
        assert(!aht_start());
        /* AHT30 startup performs status reads, without legacy init writes. */
        for (size_t j = 0; j < mock.count; ++j) {
            assert(mock.transactions[j].length == 1);
            assert(mock.transactions[j].bytes[0] == 0x71);
        }
    }
}

static bool contains_pair(const transaction_t *transaction, uint8_t a, uint8_t b) {
    for (size_t i = 2; i + 1 < transaction->length; ++i)
        if (transaction->bytes[i] == a && transaction->bytes[i + 1] == b)
            return true;
    return false;
}

static void test_oled_window_and_text(void) {
    static const uint8_t window[] = {0x7a, 0x00, 0x21, 0x00, 0x7f, 0x22, 0x00, 0x07};
    mock_reset(&BUS_OLED, 0x3d);
    assert(oled_init() && oled_address() == 0x3d);
    assert(mock.count == 6);
    assert(mock.transactions[0].bytes[0] == 0x78);
    assert(mock.transactions[1].bytes[0] == 0x7a);
    assert(contains_pair(&mock.transactions[2], 0xa8, 0x3f));
    assert(contains_pair(&mock.transactions[2], 0xda, 0x12));
    assert(contains_pair(&mock.transactions[2], 0x8d, 0x14));
    assert(mock.transactions[3].length == sizeof window);
    assert(memcmp(mock.transactions[3].bytes, window, sizeof window) == 0);
    assert(mock.transactions[4].length == 1026);
    assert(mock.transactions[4].bytes[1] == 0x40);
    for (size_t i = 2; i < 1026; ++i) assert(mock.transactions[4].bytes[i] == 0);

    oled_text(7, 20, "AB");
    for (size_t i = 0; i < 1016; ++i) assert(oled_framebuffer[i] == 0);
    assert(oled_framebuffer[1016] == 0x7e && oled_framebuffer[1020] == 0x7e);
    assert(oled_framebuffer[1021] == 0 && oled_framebuffer[1022] == 0 &&
           oled_framebuffer[1023] == 0);
    uint8_t snapshot[1024];
    memcpy(snapshot, oled_framebuffer, sizeof snapshot);
    oled_text(8, 0, "bad");
    oled_text(0, 21, "bad");
    oled_text(255, 255, "bad");
    assert(memcmp(snapshot, oled_framebuffer, sizeof snapshot) == 0);
    oled_text(0, 0, "\xff");
    assert(oled_framebuffer[0] == 0x02 && oled_framebuffer[2] == 0x51);

    for (uint8_t pattern = 0; pattern < 4; ++pattern) {
        assert(oled_test_pattern(pattern));
        for (size_t i = 0; i < sizeof oled_framebuffer; ++i) {
            uint8_t expected = pattern == 0 ? 0 : pattern == 1 ? 0xff :
                               pattern == 2 ? ((i & 1u) ? 0x55 : 0xaa) :
                               ((i & 4u) ? 0 : 0xff);
            assert(oled_framebuffer[i] == expected);
        }
    }
    memcpy(snapshot, oled_framebuffer, sizeof snapshot);
    size_t count = mock.count;
    assert(!oled_test_pattern(4));
    assert(mock.count == count && memcmp(snapshot, oled_framebuffer, sizeof snapshot) == 0);
}

static void test_oled_async_snapshot(void) {
    uint8_t expected[1024];
    mock_reset(&BUS_OLED, 0x3c);
    oled_device_address = 0x3c;
    for (size_t i = 0; i < sizeof expected; ++i)
        expected[i] = oled_framebuffer[i] = (uint8_t)((i / 128u) * 29u + i % 128u);
    assert(!oled_refresh_busy());
    assert(oled_refresh_step() && mock.count == 0 && mock.time_us == 0);
    assert(oled_refresh_begin() && oled_refresh_busy());
    assert(mock.count == 0 && mock.time_us == 0);
    memset(oled_framebuffer, 0xa5, sizeof oled_framebuffer);
    assert(!oled_refresh_begin());
    assert(mock.count == 0 && mock.time_us == 0);

    for (size_t block = 0; block < 64; ++block) {
        size_t before = mock.count;
        uint64_t before_us = mock.time_us;
        assert(oled_refresh_step());
        assert(mock.count == before + 2);
        assert(mock.time_us - before_us < 3000u);
        uint8_t column = (uint8_t)((block % 8u) * 16u);
        uint8_t page = (uint8_t)(block / 8u);
        uint8_t window[] = {0x78, 0x00, 0x21, column, (uint8_t)(column + 15u),
                            0x22, page, page};
        const transaction_t *command = &mock.transactions[before];
        const transaction_t *data = &mock.transactions[before + 1];
        assert(command->length == 8 && memcmp(command->bytes, window, 8) == 0);
        assert(data->length == 18 && data->bytes[0] == 0x78 && data->bytes[1] == 0x40);
        assert(memcmp(&data->bytes[2], &expected[block * 16u], 16) == 0);
        assert(oled_refresh_busy() == (block < 63));
    }
    assert(mock.count == 128);
    size_t count = mock.count;
    uint64_t elapsed = mock.time_us;
    assert(oled_refresh_step());
    assert(mock.count == count && mock.time_us == elapsed);
}

static void test_oled_async_nack(void) {
    /* Reject a window argument, then a data payload byte after one good block. */
    static const size_t failed_transaction[] = {1, 2};
    static const size_t failed_byte[] = {5, 10};
    for (size_t failure = 0; failure < 2; ++failure) {
        mock_reset(&BUS_OLED, 0x3c);
        oled_device_address = 0x3c;
        memset(oled_framebuffer, 0x22, sizeof oled_framebuffer);
        assert(oled_refresh_begin() && oled_refresh_step());
        mock.nack_transaction = mock.count + failed_transaction[failure];
        mock.nack_byte = failed_byte[failure];
        assert(!oled_refresh_step());
        assert(!oled_refresh_busy() && !mock.active && mock.scl && mock.sda);
        size_t count = mock.count;
        assert(oled_refresh_step() && mock.count == count);
        mock.nack_transaction = mock.nack_byte = 0;
        memset(oled_framebuffer, 0x5a, sizeof oled_framebuffer);
        assert(oled_refresh_begin() && mock.count == count);
        assert(oled_refresh_step());
        static const uint8_t first_window[] = {0x78,0x00,0x21,0x00,0x0f,0x22,0x00,0x00};
        assert(memcmp(mock.transactions[count].bytes, first_window, 8) == 0);
        assert(mock.transactions[count + 1].length == 18);
        for (size_t i = 2; i < 18; ++i)
            assert(mock.transactions[count + 1].bytes[i] == 0x5a);
    }
}

static void test_oled_sync_cancels_async(void) {
    mock_reset(&BUS_OLED, 0x3c);
    oled_device_address = 0x3c;
    memset(oled_framebuffer, 0x55, sizeof oled_framebuffer);
    assert(oled_refresh_begin() && oled_refresh_step());
    memset(oled_framebuffer, 0x3c, sizeof oled_framebuffer);
    size_t before = mock.count;
    assert(oled_refresh() && !oled_refresh_busy());
    assert(mock.count == before + 2 && mock.transactions[before + 1].length == 1026);
    for (size_t i = 2; i < 1026; ++i)
        assert(mock.transactions[before + 1].bytes[i] == 0x3c);
    size_t count = mock.count;
    assert(oled_refresh_step() && mock.count == count);

    assert(oled_refresh_begin());
    mock.nack_transaction = mock.count + 1;
    mock.nack_byte = 1;
    assert(!oled_refresh() && !oled_refresh_busy());
    count = mock.count;
    assert(oled_refresh_step() && mock.count == count);
    mock.nack_transaction = mock.nack_byte = 0;

    assert(oled_refresh_begin());
    assert(oled_test_pattern(1) && !oled_refresh_busy());
    const transaction_t *pattern = &mock.transactions[mock.count - 1];
    assert(pattern->length == 1026);
    for (size_t i = 2; i < 1026; ++i) assert(pattern->bytes[i] == 0xff);
    count = mock.count;
    assert(oled_refresh_step() && mock.count == count);

    assert(oled_refresh_begin());
    mock.address = 0; /* Both OLED address probes fail during reinitialization. */
    assert(!oled_init() && !oled_refresh_busy());
    count = mock.count;
    assert(oled_refresh_step() && mock.count == count);
    assert(!oled_refresh_begin() && mock.count == count);
}

int main(void) {
    test_i2c_transactions();
    test_i2c_stuck_lines();
    test_aht_crc_decode();
    test_aht_nonblocking();
    test_aht_readiness();
    test_oled_window_and_text();
    test_oled_async_snapshot();
    test_oled_async_nack();
    test_oled_sync_cancels_async();
    puts("drivers: I2C recovery, AHT30, OLED geometry/snapshot/16-byte steps/NACK/cancel passed");
    return 0;
}
