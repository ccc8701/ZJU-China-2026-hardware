#include "app.h"
#include "bsp.h"
#include "drivers.h"
#include "util.h"

#include <stdarg.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

_Static_assert(OLED_TEXT_ROWS == 8u, "128x64 OLED has eight 8-pixel text rows");
_Static_assert(OLED_TEXT_COLUMNS == 21u, "six-pixel glyphs fit 21 columns");
_Static_assert(APP_UART2_PROTOCOL == 1u, "web protocol version is one");
_Static_assert(APP_COMMAND_CAPACITY == 160u, "request buffer includes one NUL byte");
_Static_assert(APP_STATUS_CAPACITY == 1024u, "debug status ABI capacity");
_Static_assert(APP_WEB_RESPONSE_CAPACITY == 1152u, "framed wire response capacity");
#ifndef BOARD_RELAYS_VERIFIED
#define BOARD_RELAYS_VERIFIED 0
#endif

/* This executable never links bsp.c or drivers.c and never opens a device. */
const gpio_pin_t PIN_LED_R = {PORT_B, 3};
const gpio_pin_t PIN_LED_Y = {PORT_B, 4};
const gpio_pin_t PIN_LED_G = {PORT_B, 5};
const gpio_pin_t PIN_RELAY[3] = {{PORT_A, 15}, {PORT_A, 12}, {PORT_A, 11}};
const gpio_pin_t PIN_BUTTON[3] = {{PORT_B, 14}, {PORT_B, 15}, {PORT_A, 8}};
const gpio_pin_t PIN_LEVEL[3] = {{PORT_C, 13}, {PORT_C, 14}, {PORT_C, 15}};
const soft_i2c_t BUS_OLED = {{PORT_B, 6}, {PORT_B, 7}};
const soft_i2c_t BUS_AHT = {{PORT_B, 8}, {PORT_B, 9}};

extern volatile char debug_command[APP_COMMAND_CAPACITY];
extern volatile char debug_status[APP_STATUS_CAPACITY];
extern volatile char debug_reply[192];
extern volatile uint32_t debug_request;
extern volatile uint32_t debug_response;

static const char *test_name;
static unsigned tests_run;
static bool fixture_disarm = true;
static bool led_active_high;
static uint32_t now_ms;
static gpio_mode_t pin_modes[3][16];
static bool pin_latches[3][16], pin_inputs[3][16];
static bool active_high;
static bool enforce_heat_cool;
static unsigned heat_channel, cool_channel;
static char uart_output[65536];
static size_t uart_output_length;
static char command_queue[32][256];
static unsigned command_head, command_tail;
static char uart2_output[65536], uart2_queue[32][256], uart2_status_line[2048];
static size_t uart2_output_length;
static unsigned uart2_head, uart2_tail;
static uint32_t uart2_rx_count, uart2_tx_count, uart2_rx_drop, uart2_tx_drop;
static bool uart2_drop_next_write;
static bool reboot_called;
static uint32_t rx_dropped;
static bool aht_init_ok, aht_start_ok, aht_pending;
static aht_result_t sensor_result;
static int32_t sensor_temperature;
static uint32_t sensor_humidity;
static unsigned aht_starts, aht_reads, oled_refreshes;
static unsigned oled_inits, oled_begins, oled_steps, oled_whole_sync, oled_finishes;
static unsigned oled_steps_per_frame, oled_steps_remaining;
static bool oled_busy, oled_fail_next_step;
static char oled_rows[OLED_TEXT_ROWS][OLED_TEXT_COLUMNS + 1u];
static char oled_snapshot[OLED_TEXT_ROWS][OLED_TEXT_COLUMNS + 1u];
static char oled_completed[OLED_TEXT_ROWS][OLED_TEXT_COLUMNS + 1u];
static char status_line[2048];
static size_t largest_status_length;
static size_t largest_uart2_status_length;
static size_t largest_framed_status_length;

typedef struct {
    uint32_t time;
    unsigned channel;
    char operation;
    unsigned driven_mask;
} relay_event_t;
static relay_event_t relay_events[8192];
static size_t relay_event_count;

static void fail(const char *condition, unsigned line) {
    fprintf(stderr, "FAIL %s:%u: %s\nUART1:\n%s\nUART2:\n%s\n", test_name, line,
            condition, uart_output, uart2_output);
    exit(1);
}
#define REQUIRE(condition) do { if (!(condition)) fail(#condition, __LINE__); } while (0)

static bool same_pin(gpio_pin_t a, gpio_pin_t b) {
    return a.port == b.port && a.pin == b.pin;
}

static unsigned driven_mask(void) {
    unsigned mask = 0;
    for (unsigned i = 0; i < 3; ++i) {
        gpio_pin_t p = PIN_RELAY[i];
        gpio_mode_t mode = pin_modes[p.port][p.pin];
        if ((mode == GPIO_OUT_PP || mode == GPIO_OUT_OD) &&
            pin_latches[p.port][p.pin] == active_high) mask |= 1u << i;
    }
    return mask;
}

static void record_gpio(gpio_pin_t pin, char operation) {
    for (unsigned i = 0; i < 3; ++i) {
        if (!same_pin(pin, PIN_RELAY[i])) continue;
        unsigned mask = driven_mask();
        REQUIRE(relay_event_count < sizeof relay_events / sizeof relay_events[0]);
        relay_events[relay_event_count++] = (relay_event_t){now_ms, i, operation, mask};
        if (enforce_heat_cool) {
            unsigned opposite = (1u << heat_channel) | (1u << cool_channel);
            REQUIRE((mask & opposite) != opposite);
        }
    }
}

void bsp_init(void) {}
void gpio_mode(gpio_pin_t pin, gpio_mode_t mode) {
    pin_modes[pin.port][pin.pin] = mode;
    if (mode == GPIO_IN_PULL_UP) pin_latches[pin.port][pin.pin] = true;
    if (mode == GPIO_IN_PULL_DOWN) pin_latches[pin.port][pin.pin] = false;
    record_gpio(pin, 'M');
}
void gpio_write(gpio_pin_t pin, bool high) {
    pin_latches[pin.port][pin.pin] = high;
    record_gpio(pin, 'W');
}
bool gpio_read(gpio_pin_t pin) {
    gpio_mode_t mode = pin_modes[pin.port][pin.pin];
    return mode == GPIO_OUT_PP || mode == GPIO_OUT_OD
        ? pin_latches[pin.port][pin.pin] : pin_inputs[pin.port][pin.pin];
}
uint32_t millis(void) { return now_ms; }
void delay_ms(uint32_t ms) { now_ms += ms; }
void delay_us(uint32_t us) { now_ms += us / 1000u; }
void bsp_reboot(void) { reboot_called = true; }
uint32_t uart_rx_dropped(void) { return rx_dropped; }
uint32_t uart_tx_dropped(void) { return 0; }
void uart_write(const char *text) {
    size_t length = strlen(text);
    REQUIRE(length + uart_output_length < sizeof uart_output);
    memcpy(uart_output + uart_output_length, text, length + 1);
    uart_output_length += length;
}
void uart_printf(const char *format, ...) {
    char buffer[4096];
    va_list args;
    va_start(args, format);
    int count = vfmt(buffer, sizeof buffer, format, args);
    va_end(args);
    REQUIRE(count >= 0 && (size_t)count < sizeof buffer);
    uart_write(buffer);
}
bool uart_read_line(char *line, size_t capacity) {
    if (command_head == command_tail) return false;
    const char *source = command_queue[command_head % 32u];
    size_t length = strlen(source);
    REQUIRE(capacity > length);
    memcpy(line, source, length + 1);
    ++command_head;
    return true;
}
void uart2_write(const char *text) {
    size_t length = strlen(text);
    if (uart2_drop_next_write) {
        uart2_drop_next_write = false;
        ++uart2_tx_drop;
        return;
    }
    REQUIRE(length + uart2_output_length < sizeof uart2_output);
    memcpy(uart2_output + uart2_output_length, text, length + 1);
    uart2_output_length += length;
    uart2_tx_count += (uint32_t)length;
}
bool uart2_read_line(char *line, size_t capacity) {
    if (uart2_head == uart2_tail) return false;
    const char *source = uart2_queue[uart2_head % 32u];
    size_t length = strlen(source);
    REQUIRE(capacity > length);
    memcpy(line, source, length + 1);
    ++uart2_head;
    return true;
}
uint32_t uart2_rx_dropped(void) { return uart2_rx_drop; }
uint32_t uart2_tx_dropped(void) { return uart2_tx_drop; }
uint32_t uart2_rx_bytes(void) { return uart2_rx_count; }
uint32_t uart2_tx_bytes(void) { return uart2_tx_count; }

void i2c_init(const soft_i2c_t *bus) { (void)bus; }
bool i2c_probe(const soft_i2c_t *bus, uint8_t address) {
    return (bus == &BUS_OLED && address == 0x3c) ||
           (bus == &BUS_AHT && address == 0x38);
}
bool i2c_write(const soft_i2c_t *bus, uint8_t address,
               const uint8_t *data, size_t length) {
    (void)bus; (void)address; (void)data; (void)length;
    return true;
}
bool i2c_read(const soft_i2c_t *bus, uint8_t address,
             uint8_t *data, size_t length) {
    (void)bus; (void)address;
    memset(data, 0, length);
    return true;
}
bool oled_init(void) {
    ++oled_inits;
    oled_busy = false;
    oled_steps_remaining = 0;
    return true;
}
uint8_t oled_address(void) { return 0x3c; }
void oled_clear(void) {
    REQUIRE(!oled_busy);
    memset(oled_rows, 0, sizeof oled_rows);
}
void oled_text(uint8_t row, uint8_t column, const char *text) {
    REQUIRE(!oled_busy);
    REQUIRE(row < OLED_TEXT_ROWS);
    REQUIRE(column < OLED_TEXT_COLUMNS);
    size_t length = strlen(text);
    REQUIRE(strchr(text, '\n') == NULL && strchr(text, '\r') == NULL);
    REQUIRE(length + column <= OLED_TEXT_COLUMNS);
    memcpy(oled_rows[row] + column, text, length);
    oled_rows[row][column + length] = 0;
}
static void check_rendered_oled_rows(void) {
    for (unsigned row = 0; row < OLED_TEXT_ROWS; ++row)
        REQUIRE(oled_rows[row][0] != 0);
}
bool oled_refresh(void) {
    check_rendered_oled_rows();
    ++oled_whole_sync;
    ++oled_refreshes;
    oled_busy = false;
    oled_steps_remaining = 0;
    memcpy(oled_completed, oled_rows, sizeof oled_rows);
    return true;
}
bool oled_refresh_begin(void) {
    REQUIRE(!oled_busy);
    REQUIRE(oled_steps_per_frame > 0);
    check_rendered_oled_rows();
    memcpy(oled_snapshot, oled_rows, sizeof oled_rows);
    ++oled_begins;
    ++oled_refreshes;
    oled_steps_remaining = oled_steps_per_frame;
    oled_busy = true;
    return true;
}
bool oled_refresh_step(void) {
    ++oled_steps;
    if (!oled_busy) return true;
    if (oled_fail_next_step) {
        oled_fail_next_step = false;
        oled_busy = false;
        oled_steps_remaining = 0;
        return false;
    }
    REQUIRE(oled_steps_remaining > 0);
    if (--oled_steps_remaining == 0) {
        oled_busy = false;
        ++oled_finishes;
        memcpy(oled_completed, oled_snapshot, sizeof oled_snapshot);
    }
    return true;
}
bool oled_refresh_busy(void) { return oled_busy; }
bool oled_test_pattern(uint8_t pattern) {
    (void)pattern;
    ++oled_whole_sync;
    ++oled_refreshes;
    oled_busy = false;
    oled_steps_remaining = 0;
    return true;
}
bool aht_init(void) { return aht_init_ok; }
bool aht_start(void) {
    ++aht_starts;
    aht_pending = aht_start_ok;
    return aht_start_ok;
}
aht_result_t aht_poll(int32_t *temperature_centi, uint32_t *humidity_centi) {
    ++aht_reads;
    REQUIRE(aht_pending);
    if (sensor_result == AHT_OK) {
        *temperature_centi = sensor_temperature;
        *humidity_centi = sensor_humidity;
        aht_pending = false;
    } else if (sensor_result == AHT_ERROR) aht_pending = false;
    return sensor_result;
}

static void poll_app(void) {
    unsigned steps_before = oled_steps;
    unsigned sync_before = oled_whole_sync;
    unsigned uart1_before = command_head, uart2_before = uart2_head;
    app_poll();
    REQUIRE(oled_steps - steps_before <= 1u);
    REQUIRE(oled_whole_sync == sync_before);
    REQUIRE(command_head - uart1_before <= 1u);
    REQUIRE(uart2_head - uart2_before <= 1u);
}
static void clear_uart(void) {
    uart_output_length = 0;
    uart_output[0] = 0;
}
static void queue_uart1(const char *text) {
    REQUIRE(command_tail - command_head < 32u);
    REQUIRE(strlen(text) < sizeof command_queue[0]);
    strcpy(command_queue[command_tail++ % 32u], text);
}
static void command(const char *text) {
    queue_uart1(text);
    poll_app();
}
static void clear_uart2(void) {
    uart2_output_length = 0;
    uart2_output[0] = 0;
}
static void queue_uart2(const char *text) {
    REQUIRE(uart2_tail - uart2_head < 32u);
    size_t length = strlen(text);
    REQUIRE(length < sizeof uart2_queue[0]);
    strcpy(uart2_queue[uart2_tail++ % 32u], text);
    uart2_rx_count += (uint32_t)length + 1u; /* Include the received newline. */
}
static void advance(uint32_t ms) { now_ms += ms; poll_app(); }
static void input(gpio_pin_t pin, bool high) { pin_inputs[pin.port][pin.pin] = high; }
static void check_status_complete(const char *text) {
    char suffix[48];
    int suffix_length = snprintf(suffix, sizeof suffix, " rx_dropped=%u",
                                 (unsigned)rx_dropped);
    REQUIRE(suffix_length > 0 && (size_t)suffix_length < sizeof suffix);
    size_t length = strlen(text);
    REQUIRE(length < sizeof debug_status);
    REQUIRE(length >= (size_t)suffix_length);
    REQUIRE(strstr(text, " web_epoch=") != NULL);
    REQUIRE(strcmp(text + length - (size_t)suffix_length, suffix) == 0);
    if (length > largest_status_length) largest_status_length = length;
}
static const char *status(void) {
    clear_uart();
    command("status");
    const char *p = uart_output, *latest = NULL;
    while ((p = strstr(p, "STAT ")) != NULL) { latest = p; p += 5; }
    REQUIRE(latest != NULL);
    size_t length = strcspn(latest, "\r\n");
    REQUIRE(length < sizeof status_line);
    memcpy(status_line, latest, length);
    status_line[length] = 0;
    check_status_complete(status_line);
    return status_line;
}
static bool has_field(const char *text, const char *key, const char *value) {
    char field[256];
    int length = snprintf(field, sizeof field, "%s=%s", key, value);
    REQUIRE(length > 0 && (size_t)length < sizeof field);
    const char *p = text;
    while ((p = strstr(p, field)) != NULL) {
        char end = p[length];
        if ((p == text || p[-1] == ' ') &&
            (end == 0 || end == ' ' || end == '\r' || end == '\n')) return true;
        ++p;
    }
    return false;
}
static void field(const char *key, const char *value) {
    REQUIRE(has_field(status_line, key, value));
}
static void outputs(unsigned mask, const char *expected) {
    REQUIRE(driven_mask() == mask);
    status();
    field("out", expected);
}
static void sample(int32_t temperature) {
    sensor_temperature = temperature;
    sensor_result = AHT_OK;
    advance(2000);
    poll_app();
    poll_app();
}
static void reset_test(const char *name) {
    test_name = name;
    ++tests_run;
    now_ms = 0;
    active_high = true;
    led_active_high = true;
    enforce_heat_cool = false;
    heat_channel = 1;
    cool_channel = 2;
    memset(pin_modes, 0, sizeof pin_modes);
    memset(pin_latches, 0, sizeof pin_latches);
    memset(pin_inputs, 1, sizeof pin_inputs);
    clear_uart();
    command_head = command_tail = 0;
    uart2_head = uart2_tail = 0;
    uart2_rx_count = uart2_tx_count = uart2_rx_drop = uart2_tx_drop = 0;
    uart2_drop_next_write = false;
    clear_uart2();
    reboot_called = false;
    rx_dropped = 0;
    aht_init_ok = aht_start_ok = true;
    aht_pending = false;
    sensor_result = AHT_OK;
    sensor_temperature = 3000;
    sensor_humidity = 5000;
    aht_starts = aht_reads = oled_refreshes = 0;
    oled_inits = oled_begins = oled_steps = oled_whole_sync = oled_finishes = 0;
    oled_steps_per_frame = 1;
    oled_steps_remaining = 0;
    oled_busy = oled_fail_next_step = false;
    memset(oled_rows, 0, sizeof oled_rows);
    memset(oled_snapshot, 0, sizeof oled_snapshot);
    memset(oled_completed, 0, sizeof oled_completed);
    relay_event_count = 0;
    for (size_t i = 0; i < sizeof debug_command; ++i) debug_command[i] = 0;
    for (size_t i = 0; i < sizeof debug_status; ++i) debug_status[i] = 0;
    for (size_t i = 0; i < sizeof debug_reply; ++i) debug_reply[i] = 0;
    debug_request = debug_response = 0;
    app_init();
#if BOARD_RELAYS_VERIFIED
    if (fixture_disarm) command("relay disarm");
#endif
}
static void initial_sample(int32_t temperature) {
    sensor_temperature = temperature;
    poll_app();
    poll_app();
    REQUIRE(aht_reads > 0);
}
static void arm_and_map(bool high) {
    active_high = high;
    size_t begin = relay_event_count;
    command(high ? "relay arm high" : "relay arm low");
    for (size_t i = begin; i < relay_event_count; ++i)
        REQUIRE(relay_events[i].driven_mask == 0);
    command("map 1 2 3");
}
static void button_down(unsigned index) {
    input(PIN_BUTTON[index], false); poll_app(); advance(30);
}
static void button_up(unsigned index) {
    input(PIN_BUTTON[index], true); poll_app(); advance(30);
}
static void short_key(unsigned index) {
    button_down(index); button_up(index);
}
static void long_ok(void) {
    button_down(2); advance(770); button_up(2);
}
static void press_pump(void) { short_key(2); }
static void release_pump(void) { short_key(2); }
static void menu_state(const char *menu) { status(); field("menu", menu); }
static void enter_menu(void) { long_ok(); menu_state("MENU"); }
static void select_menu(const char *selected) {
    for (unsigned i = 0; i < 7; ++i) {
        status();
        if (has_field(status_line, "selected", selected)) return;
        short_key(1);
    }
    status(); field("selected", selected);
}
static unsigned led_mask(void) {
    const gpio_pin_t leds[3] = {PIN_LED_R, PIN_LED_Y, PIN_LED_G};
    unsigned bits = 0;
    for (unsigned i = 0; i < 3; ++i)
        if (pin_latches[leds[i].port][leds[i].pin] == led_active_high) bits |= 1u << i;
    return bits;
}

static void test_defaults(void) {
    fixture_disarm = false;
    reset_test(BOARD_RELAYS_VERIFIED ? "calibrated startup is armed, mapped, and all off"
                                  : "uncalibrated startup keeps relays floating");
    fixture_disarm = true;
    REQUIRE(strcmp(APP_FW_VERSION, "tankctrl-3.0") == 0);
    for (unsigned i = 0; i < 3; ++i) {
        REQUIRE(pin_modes[PIN_RELAY[i].port][PIN_RELAY[i].pin] ==
                (BOARD_RELAYS_VERIFIED ? GPIO_OUT_PP : GPIO_IN_FLOAT));
    }
    REQUIRE(pin_modes[PORT_C][13] == GPIO_IN_PULL_UP);
    REQUIRE(pin_modes[PORT_C][14] == GPIO_IN_PULL_UP);
    REQUIRE(pin_modes[PORT_C][15] == GPIO_IN_PULL_UP);
    status();
    field("out", "0,0,0");
    field("relay_drive", BOARD_RELAYS_VERIFIED ? "L,L,L" : "Z,Z,Z");
    field("armed", BOARD_RELAYS_VERIFIED ? "1" : "0");
    field("map_ok", BOARD_RELAYS_VERIFIED ? "1" : "0");
    field("pump", "0"); field("auto", "0");
    field("sim_t", "0"); field("sim_l", "0");
    field("lower_centi", "2500"); field("upper_centi", "3000");
    field("menu", "HOME");
    field("level_mask", "7"); field("level_polarity", "low");
    field("raw_level", "1,1,1"); field("level", "DRY,DRY,DRY");
    field("level_state", "EMPTY"); field("level_wetmask", "0");
    field("level_raw_wetmask", "0"); field("level_sim", "0");
    REQUIRE(led_mask() == 1);
    for (size_t i = 0; i < relay_event_count; ++i) {
        REQUIRE(relay_events[i].driven_mask == 0);
        if (!BOARD_RELAYS_VERIFIED) REQUIRE(relay_events[i].operation != 'W');
    }
    REQUIRE(!reboot_called);
#if BOARD_RELAYS_VERIFIED
    /* Standalone startup needs no serial arm/map before the Home control works. */
    press_pump(); outputs(1, "1,0,0");
    release_pump(); outputs(0, "0,0,0");
#endif
}
static void test_unarmed_and_mapping_gate(void) {
    reset_test("outputs require arm and automatic functions require a map");
    initial_sample(2400);
    command("relay 1 on"); command("relay 2 on"); command("relay 3 on");
    command("map 1 2 3"); command("auto on"); press_pump();
    outputs(0, "0,0,0"); field("auto", "0");
    for (unsigned i = 0; i < 3; ++i)
        REQUIRE(pin_modes[PIN_RELAY[i].port][PIN_RELAY[i].pin] == GPIO_IN_FLOAT);

#if !BOARD_RELAYS_VERIFIED
    reset_test("arm alone does not permit automatic output");
    initial_sample(2400);
    command("relay arm high"); command("auto on"); press_pump();
    outputs(0, "0,0,0"); field("auto", "0");
    command("relay 1 on"); outputs(1, "1,0,0");
    /* OFF is allowed even while the automatic-role mapping is unconfirmed. */
    release_pump(); outputs(0, "0,0,0");
    command("map confirm"); press_pump();
    outputs(1, "1,0,0");
    release_pump(); outputs(0, "0,0,0");
#endif
}
static void test_invalid_commands(void) {
    static const char *invalid[] = {
        "relay 0 on", "relay 4 on", "relay -1 on", "relay 1 maybe",
        "relay 1 on extra", "relay arm maybe", "relay arm high extra",
        "map 1 1 3", "map 0 2 3", "map 1 2 4", "map 1 2 3 extra",
        "target nan", "target 2147483648", "target -2147483649",
        "hyst -1", "hyst text", "pump limit 0", "pump limit 301",
        "pump limit 2147483648", "auto true", "auto on extra",
        "sim temp banana", "sim level damp", "sim level mask -1", "sim level mask 8",
        "range 3000 2500", "range 2500 2500", "range -4001 3000", "range 2500 8501",
        "range x 3000", "range 2500 3000 extra", "hyst 0", "hyst 6251",
        "led R", "led Y", "led G", "led test", "led off", "unknown command"
    };
    reset_test("malformed commands cannot activate outputs");
    initial_sample(2400);
    arm_and_map(true);
    for (size_t i = 0; i < sizeof invalid / sizeof invalid[0]; ++i) {
        clear_uart();
        command(invalid[i]);
        REQUIRE(driven_mask() == 0);
        REQUIRE(strstr(uart_output, "ERR") != NULL);
    }
    status(); field("auto", "0"); field("sim_t", "0"); field("sim_l", "0");
}
static void test_arm_polarity_and_manual(void) {
    for (unsigned polarity = 0; polarity < 2; ++polarity) {
        reset_test(polarity ? "manual active high" : "manual active low");
        arm_and_map(polarity != 0);
        outputs(0, "0,0,0");
        command("relay 1 on"); outputs(1, "1,0,0");
        field("relay_drive", polarity ? "H,L,L" : "L,H,H");
        command("relay 1 off"); outputs(0, "0,0,0");
        command("relay 2 on"); outputs(2, "0,1,0");
        sensor_result = AHT_ERROR;
        advance(2000); poll_app();
        outputs(2, "0,1,0"); field("auto", "0");
        command("relay 2 off"); command("relay 3 on"); outputs(4, "0,0,1");
        command("stop"); outputs(0, "0,0,0");
    }
}
static void test_auto_range(void) {
    reset_test("closed temperature range holds both thermal relays off");
    initial_sample(2750);
    arm_and_map(true);
    enforce_heat_cool = true;
    command("auto on"); outputs(0, "0,0,0"); field("auto", "1");
    sample(2500); outputs(0, "0,0,0");
    sample(2499); outputs(2, "0,1,0");
    sample(2500); outputs(0, "0,0,0"); field("thermal", "HOLD");
    sample(2999); outputs(0, "0,0,0");
    sample(3000); outputs(0, "0,0,0");
    sample(3001); outputs(4, "0,0,1");
    sample(3000); outputs(0, "0,0,0"); field("thermal", "HOLD");
    sample(2501); outputs(0, "0,0,0");
}
static void test_range_commands(void) {
    reset_test("range and legacy commands use one bounded interval");
    command("range -4000 8500");
    status(); field("lower_centi", "-4000"); field("upper_centi", "8500");
    field("target_centi", "2250"); field("hyst_centi", "6250");
    command("target 2250"); command("hyst 6250");
    static const char *invalid[] = {"target 2251", "target -4000", "hyst 6251", "hyst 0"};
    for (size_t i = 0; i < sizeof invalid / sizeof invalid[0]; ++i) {
        clear_uart(); command(invalid[i]); REQUIRE(strstr(uart_output, "ERR") != NULL);
        status(); field("lower_centi", "-4000"); field("upper_centi", "8500");
    }
    command("range -4000 -3950");
    status(); field("target_centi", "-3975"); field("hyst_centi", "25");
    command("target 2750"); command("hyst 250");
    status(); field("lower_centi", "2500"); field("upper_centi", "3000");
    command("range 2900 3100");
    status(); field("target_centi", "3000"); field("hyst_centi", "100");
}
static void require_break_before_make(size_t begin, unsigned old_mask, unsigned new_mask) {
    bool old_disconnected = false, new_connected = false;
    for (size_t i = begin; i < relay_event_count; ++i) {
        unsigned mask = relay_events[i].driven_mask;
        if (!(mask & old_mask)) old_disconnected = true;
        if (mask & new_mask) {
            REQUIRE(old_disconnected);
            new_connected = true;
        }
    }
    REQUIRE(new_connected);
}
static void test_direction_interlock(void) {
    reset_test("opposite relay is off before a direction change");
    initial_sample(2400);
    arm_and_map(true);
    enforce_heat_cool = true;
    command("auto on"); outputs(2, "0,1,0");
    size_t begin = relay_event_count;
    sample(3200); outputs(4, "0,0,1");
    require_break_before_make(begin, 2, 4);
    begin = relay_event_count;
    sample(2400); outputs(2, "0,1,0");
    require_break_before_make(begin, 4, 2);

    reset_test("automatic control honors the configured physical map");
    initial_sample(2400);
    command("relay arm high"); command("map 3 1 2");
    heat_channel = 0; cool_channel = 1; enforce_heat_cool = true;
    command("auto on"); outputs(1, "1,0,0");
    sample(3200); outputs(2, "0,1,0");
    command("auto off"); outputs(0, "0,0,0");
    press_pump(); outputs(4, "0,0,1");
    release_pump(); outputs(0, "0,0,0");
}
static void test_sensor_failure(void) {
    reset_test("a sensor error disables automatic control");
    initial_sample(2400); arm_and_map(true);
    command("auto on"); outputs(2, "0,1,0");
    sensor_result = AHT_ERROR;
    advance(2000); poll_app();
    outputs(0, "0,0,0"); field("auto", "0");
    command("relay 2 on");
    advance(6000); poll_app();
    outputs(2, "0,1,0"); field("auto", "0");

    reset_test("an overdue valid sample disables automatic control");
    initial_sample(2400); arm_and_map(true);
    command("auto on"); outputs(2, "0,1,0");
    sensor_result = AHT_WAIT;
    advance(5501);
    outputs(0, "0,0,0"); field("auto", "0");

    reset_test("a timed out conversion disables automatic control");
    initial_sample(2400); arm_and_map(true);
    command("auto on");
    sensor_result = AHT_WAIT;
    advance(2000); advance(501);
    outputs(0, "0,0,0"); field("auto", "0");
}
static void test_simulation_and_level_mask(void) {
    reset_test("a simulated temperature still requires a valid real AHT sample");
    sensor_result = AHT_WAIT;
    arm_and_map(true);
    command("sim temp 2400"); command("auto on");
    outputs(0, "0,0,0"); field("auto", "0"); field("sim_t", "1");

    reset_test("level simulation supplies three explicit virtual points and keeps raw inputs");
    initial_sample(3200); arm_and_map(true);
    command("level mask 1");
    command("sim temp 2400"); command("auto on");
    outputs(2, "0,1,0"); field("sim_t", "1");
    command("sim level wet");
    status(); field("sim_l", "1"); field("level", "WET,WET,WET");
    field("level_mask", "1"); field("level_state", "FULL"); field("level_sim", "1");
    field("raw_level", "1,1,1");
    command("sim level dry");
    status(); field("level", "DRY,DRY,DRY"); field("level_state", "EMPTY");
    command("sim temp off");
    outputs(4, "0,0,1"); field("sim_t", "0"); field("sim_l", "1");
    command("sim level off"); status(); field("sim_l", "0"); field("level_state", "LEVEL_NC");
    input(PIN_LEVEL[0], false); advance(600);
    status(); field("level", "WET,NC,NC"); field("raw_level", "0,1,1");
    command("sim temp 2400"); command("sim level dry"); command("sim off");
    status(); field("sim_t", "0"); field("sim_l", "0");

    reset_test("stop clears simulations and all driven outputs");
    initial_sample(3200); arm_and_map(true);
    command("sim temp 2400"); command("sim level wet"); command("auto on");
    press_pump(); REQUIRE(driven_mask() != 0);
    button_down(2);
    command("stop");
    outputs(0, "0,0,0");
    field("auto", "0"); field("sim_t", "0"); field("sim_l", "0");
    advance(800); outputs(0, "0,0,0"); field("menu", "HOME");
    button_up(2); outputs(0, "0,0,0");
    press_pump(); outputs(1, "1,0,0");
    release_pump();
}
static void test_button_debounce(void) {
    reset_test("home OK toggles the pump only after a debounced short release");
    initial_sample(3000); arm_and_map(true);
    input(PIN_BUTTON[2], false); poll_app();
    advance(29); outputs(0, "0,0,0");
    input(PIN_BUTTON[2], true); poll_app();
    advance(30); outputs(0, "0,0,0");
    input(PIN_BUTTON[2], false); poll_app();
    advance(29); outputs(0, "0,0,0");
    advance(1); outputs(0, "0,0,0");
    input(PIN_BUTTON[2], true); poll_app();
    advance(29); outputs(0, "0,0,0");
    advance(1); outputs(1, "1,0,0"); field("pump", "1");
    button_down(2); outputs(1, "1,0,0");
    button_up(2); outputs(0, "0,0,0"); field("pump", "0");

    /* Physical release at 780 ms stays short even when its 30 ms debounce ends at 810. */
    button_down(2); advance(750);
    input(PIN_BUTTON[2], true); poll_app(); advance(30);
    outputs(1, "1,0,0"); field("menu", "HOME");
    release_pump();
}
static void test_menu_navigation_and_editing(void) {
    reset_test("long OK, menu navigation, draft editing, save, and cancel are isolated");
    initial_sample(2750); arm_and_map(true);
    button_down(2); advance(769);
    menu_state("HOME"); outputs(0, "0,0,0");
    advance(1); menu_state("MENU");
    button_up(2); menu_state("MENU"); outputs(0, "0,0,0");

    select_menu("LOW"); short_key(0);
    status(); field("selected", "BACK");
    short_key(1); status(); field("selected", "LOW");
    short_key(2); menu_state("EDIT"); field("draft_centi", "2500");
    short_key(0); status(); field("draft_centi", "2550"); field("lower_centi", "2500");
    short_key(1); status(); field("draft_centi", "2500");
    short_key(0); short_key(2);
    menu_state("MENU"); field("lower_centi", "2550"); field("upper_centi", "3000");

    select_menu("HIGH"); short_key(2);
    menu_state("EDIT"); field("draft_centi", "3000");
    for (unsigned i = 0; i < 9; ++i) short_key(1);
    status(); field("draft_centi", "2550");
    clear_uart(); short_key(2);
    REQUIRE(strstr(uart_output, "ERR") != NULL);
    menu_state("EDIT"); field("lower_centi", "2550"); field("upper_centi", "3000");
    long_ok(); menu_state("MENU"); outputs(0, "0,0,0");
    field("lower_centi", "2550"); field("upper_centi", "3000");
    short_key(2); menu_state("EDIT"); field("draft_centi", "3000");
    short_key(0); short_key(2);
    menu_state("MENU"); field("lower_centi", "2550"); field("upper_centi", "3050");
    long_ok(); menu_state("HOME"); outputs(0, "0,0,0");

    short_key(0); menu_state("MENU");
    long_ok(); menu_state("HOME"); outputs(0, "0,0,0");
    short_key(1); menu_state("MENU");
    select_menu("BACK"); short_key(2); menu_state("HOME"); outputs(0, "0,0,0");
}
static void test_menu_actions_and_views(void) {
    reset_test("menu actions share output gates and view exits swallow long releases");
    initial_sample(2400);
    enter_menu(); select_menu("AUTO"); short_key(2);
    outputs(0, "0,0,0"); field("auto", "0");
    select_menu("PUMP"); short_key(2); outputs(0, "0,0,0");
    command("relay arm high"); command("map 1 2 3");
    select_menu("AUTO"); short_key(2);
    outputs(2, "0,1,0"); field("auto", "1");
    select_menu("PUMP"); short_key(2); outputs(3, "1,1,0");
    short_key(2); outputs(2, "0,1,0");
    select_menu("AUTO"); short_key(2); outputs(0, "0,0,0"); field("auto", "0");

    select_menu("LEVEL"); short_key(2); menu_state("LEVEL");
    short_key(2); menu_state("MENU"); field("selected", "LEVEL");
    short_key(2); menu_state("LEVEL");
    long_ok(); menu_state("HOME"); outputs(0, "0,0,0");
    enter_menu(); select_menu("STATUS"); short_key(2);
    menu_state("STATUS"); field("selected", "STATUS"); field("page", "1");
    short_key(1); status(); field("page", "2");
    short_key(0); status(); field("page", "1");
    short_key(2); menu_state("MENU"); field("selected", "STATUS");
    short_key(2); menu_state("STATUS");
    long_ok(); menu_state("HOME"); outputs(0, "0,0,0");
}
static void physical_level_mask(unsigned wet) {
    for (unsigned i = 0; i < 3; ++i) input(PIN_LEVEL[i], !(wet & (1u << i)));
    advance(600);
}
static void test_liquid_indicator_policy(void) {
    static const struct { unsigned wet; const char *state; unsigned color; } cases[] = {
        {0, "EMPTY", 1}, {4, "LOW", 2}, {6, "NORMAL", 4}, {7, "FULL", 1},
        {1, "LEVEL_ERR", 1}, {2, "LEVEL_ERR", 1}, {3, "LEVEL_ERR", 1}, {5, "LEVEL_ERR", 1}
    };
    reset_test("top-middle-bottom liquid patterns select the documented indicator colors");
    initial_sample(2750);
    for (size_t i = 0; i < sizeof cases / sizeof cases[0]; ++i) {
        physical_level_mask(cases[i].wet);
        char value[16]; snprintf(value, sizeof value, "%u", cases[i].wet);
        status(); field("level_state", cases[i].state);
        field("level_wetmask", value); field("level_raw_wetmask", value);
        field("level_sim", "0"); REQUIRE(led_mask() == cases[i].color);
    }
    command("level mask 1"); physical_level_mask(1);
    status(); field("level_state", "LEVEL_NC"); field("level_raw_wetmask", "1");
    REQUIRE(led_mask() == 0);
    command("sim level mask 4"); advance(250);
    status(); field("level_mask", "1"); field("level_state", "LOW");
    field("level_wetmask", "4"); field("level_raw_wetmask", "1"); field("level_sim", "1");
    field("level", "DRY,DRY,WET"); REQUIRE(led_mask() == 2);
    REQUIRE(strstr(oled_rows[0], "SIM") != NULL);
    command("sim level mask 6"); status(); field("level_state", "NORMAL"); REQUIRE(led_mask() == 4);
    led_active_high = false; command("led polarity low"); REQUIRE(led_mask() == 4);
    command("led auto"); status(); field("level_state", "NORMAL"); REQUIRE(led_mask() == 4);
    command("stop"); status(); field("level_state", "LEVEL_NC"); field("level_sim", "0");
    field("menu", "HOME"); REQUIRE(led_mask() == 0);
}
static void test_pump_limit(void) {
    reset_test("default pump limit is 30 seconds and requires another press");
    arm_and_map(true); press_pump(); outputs(1, "1,0,0");
    advance(29999); outputs(1, "1,0,0");
    advance(1); outputs(0, "0,0,0");
    advance(1000); outputs(0, "0,0,0");
    press_pump(); outputs(1, "1,0,0");

    reset_test("one second pump limit");
    arm_and_map(true); command("pump limit 1"); press_pump();
    advance(999); outputs(1, "1,0,0");
    advance(1); outputs(0, "0,0,0");

    reset_test("maximum pump limit of 300 seconds");
    arm_and_map(true); command("pump limit 300"); press_pump();
    advance(299999); outputs(1, "1,0,0");
    advance(1); outputs(0, "0,0,0");

    reset_test("invalid pump limits preserve the prior accepted limit");
    arm_and_map(true); command("pump limit 2");
    command("pump limit 0"); command("pump limit 301"); press_pump();
    advance(1999); outputs(1, "1,0,0");
    advance(1); outputs(0, "0,0,0");
}
static void mailbox_command(const char *text) {
    size_t length = strlen(text);
    REQUIRE(length < sizeof debug_command);
    for (size_t i = 0; i < sizeof debug_command; ++i)
        debug_command[i] = i < length ? text[i] : 0;
    ++debug_request;
    poll_app();
    REQUIRE(debug_response == debug_request);
}
static void copy_volatile(char *dest, const volatile char *source, size_t capacity) {
    for (size_t i = 0; i < capacity; ++i) {
        dest[i] = source[i];
        if (!dest[i]) return;
    }
    REQUIRE(false); /* Every mailbox result must be terminated in its own buffer. */
}
static void uart2_single_line(void) {
    REQUIRE(uart2_output_length >= 2);
    REQUIRE(uart2_output[uart2_output_length - 2] == '\r');
    REQUIRE(uart2_output[uart2_output_length - 1] == '\n');
    REQUIRE(strchr(uart2_output, '\r') == uart2_output + uart2_output_length - 2);
    REQUIRE(strchr(uart2_output, '\n') == uart2_output + uart2_output_length - 1);
}
static void uart2_command_for_test(const char *text) {
    clear_uart(); clear_uart2(); queue_uart2(text); poll_app();
    uart2_single_line();
}
static void uart2_field(const char *key, const char *value) {
    REQUIRE(has_field(uart2_status_line, key, value));
}
static void uart2_field_u32(const char *key, uint32_t value) {
    char number[16]; snprintf(number, sizeof number, "%u", (unsigned)value);
    uart2_field(key, number);
}
static void uart2_status(void) {
    static const char prefix[] = "STAT uart=USART2 fw=tankctrl-3.0 read_only=0 ";
    uint32_t tx_before = uart2_tx_count;
    uart2_command_for_test("status");
    REQUIRE(strncmp(uart2_output, prefix, sizeof prefix - 1u) == 0);
    size_t length = uart2_output_length - 2u;
    REQUIRE(uart2_output_length < APP_WEB_RESPONSE_CAPACITY);
    memcpy(uart2_status_line, uart2_output, length);
    uart2_status_line[length] = 0;
    if (length > largest_uart2_status_length) largest_uart2_status_length = length;
    const char *body = uart2_status_line + sizeof prefix - 1u;
    REQUIRE(strstr(body, "ms=") == body);
    REQUIRE(strstr(body, "STAT ") == NULL);
    char shared[sizeof debug_status], mailbox[sizeof debug_status];
    int count = snprintf(shared, sizeof shared, "STAT %s", body);
    REQUIRE(count > 0 && (size_t)count < sizeof shared);
    check_status_complete(shared);
    copy_volatile(mailbox, debug_status, sizeof mailbox);
    REQUIRE(strcmp(shared, mailbox) == 0);
    REQUIRE(strstr(uart2_status_line, " oled_ok=") != NULL);
    REQUIRE(strstr(uart2_status_line, " page=") != NULL);
    uart2_field_u32("u2_rx", uart2_rx_count);
    uart2_field_u32("u2_tx", tx_before);
    uart2_field_u32("u2_rxdrop", uart2_rx_drop);
    uart2_field_u32("u2_txdrop", uart2_tx_drop);
    uart2_field_u32("u2_seq", uart2_head);
    REQUIRE(uart_output_length == 0);
}
static void web_command(unsigned id, const char *payload) {
    char request[APP_COMMAND_CAPACITY];
    int length = snprintf(request, sizeof request, "W %u %s", id, payload);
    REQUIRE(length > 0 && (size_t)length < sizeof request);
    uart2_command_for_test(request);
}
static void web_ok(unsigned id, const char *command_name) {
    char prefix[80];
    int length = snprintf(prefix, sizeof prefix, "R %u OK ACK cmd=%s", id, command_name);
    REQUIRE(length > 0 && (size_t)length < sizeof prefix);
    REQUIRE(strncmp(uart2_output, prefix, (size_t)length) == 0);
    REQUIRE(uart2_output[length] == ' ' || uart2_output[length] == '\r');
}
static void web_info_epoch(unsigned id, uint32_t epoch) {
    char expected[256];
    int length = snprintf(expected, sizeof expected,
        "R %u INFO fw=tankctrl-3.0 proto=1 uart=USART2 baud=115200 read_only=0 target=STM32F103C8T6 sensor=AHT30 oled=SSD1306_128x64 epoch=%u\r\n",
        id, (unsigned)epoch);
    REQUIRE(length > 0 && (size_t)length < sizeof expected);
    REQUIRE(strcmp(uart2_output, expected) == 0);
}
static void web_protocol_error(unsigned id, const char *code) {
    char expected[128];
    snprintf(expected, sizeof expected, "R %u ERR code=%s\r\n", id, code);
    REQUIRE(strcmp(uart2_output, expected) == 0);
}
static void web_application_error(unsigned id, const char *cmd, const char *code) {
    char expected[128];
    snprintf(expected, sizeof expected, "R %u ERR cmd=%s code=%s\r\n", id, cmd, code);
    REQUIRE(strcmp(uart2_output, expected) == 0);
}
static void web_reply_isolated(const char *reply_before) {
    char reply_after[sizeof debug_reply];
    copy_volatile(reply_after, debug_reply, sizeof reply_after);
    REQUIRE(strcmp(reply_before, reply_after) == 0);
    REQUIRE(uart_output_length == 0);
}
static void web_status(unsigned id) {
    char prefix[48], shared[APP_STATUS_CAPACITY], mailbox[APP_STATUS_CAPACITY];
    uint32_t tx_before = uart2_tx_count;
    web_command(id, "status");
    int prefix_length = snprintf(prefix, sizeof prefix, "R %u STAT ", id);
    REQUIRE(prefix_length > 0 && (size_t)prefix_length < sizeof prefix);
    REQUIRE(strncmp(uart2_output, prefix, (size_t)prefix_length) == 0);
    size_t length = uart2_output_length - 2u;
    REQUIRE(uart2_output_length < APP_WEB_RESPONSE_CAPACITY);
    memcpy(uart2_status_line, uart2_output, length);
    uart2_status_line[length] = 0;
    if (length > largest_framed_status_length) largest_framed_status_length = length;
    const char *body = uart2_status_line + prefix_length;
    REQUIRE(strstr(body, "ms=") == body);
    REQUIRE(strstr(body, "STAT ") == NULL);
    int count = snprintf(shared, sizeof shared, "STAT %s", body);
    REQUIRE(count > 0 && (size_t)count < sizeof shared);
    check_status_complete(shared);
    copy_volatile(mailbox, debug_status, sizeof mailbox);
    REQUIRE(strcmp(shared, mailbox) == 0);
    uart2_field_u32("u2_seq", uart2_head);
    uart2_field_u32("u2_tx", tx_before);
    REQUIRE(strstr(uart2_status_line, " oled_ok=") != NULL);
    REQUIRE(strstr(uart2_status_line, " page=") != NULL);
    REQUIRE(uart_output_length == 0);
}
static void test_debug_mailbox(void) {
    reset_test("mailbox commands acknowledge only after publishing status");
    initial_sample(3000); arm_and_map(true);
    mailbox_command("relay 1 on");
    REQUIRE(driven_mask() == 1);
    char published[sizeof debug_status], reply[sizeof debug_reply];
    copy_volatile(published, debug_status, sizeof published);
    copy_volatile(reply, debug_reply, sizeof reply);
    REQUIRE(strstr(published, "STAT ") == published);
    REQUIRE(has_field(published, "out", "1,0,0"));
    REQUIRE(has_field(published, "auto", "0"));
    REQUIRE(has_field(published, "sim_t", "0"));
    REQUIRE(has_field(published, "sim_l", "0"));
    REQUIRE(strstr(reply, "ERR") == NULL);

    const char *off = "relay 1 off";
    for (size_t i = 0; i <= strlen(off); ++i) debug_command[i] = off[i];
    poll_app(); REQUIRE(driven_mask() == 1); /* No new request, so no execution. */
    ++debug_request; poll_app();
    REQUIRE(debug_response == debug_request); REQUIRE(driven_mask() == 0);

    const char *unterminated = "relay 1 on";
    for (size_t i = 0; i < sizeof debug_command; ++i) debug_command[i] = ' ';
    for (size_t i = 0; i < strlen(unterminated); ++i) debug_command[i] = unterminated[i];
    ++debug_request; poll_app();
    REQUIRE(debug_response == debug_request); REQUIRE(driven_mask() == 0);
    copy_volatile(reply, debug_reply, sizeof reply);
    REQUIRE(strstr(reply, "ERR") == reply);
    copy_volatile(published, debug_status, sizeof published);
    REQUIRE(has_field(published, "out", "0,0,0"));
    mailbox_command("status");
    copy_volatile(published, debug_status, sizeof published);
    REQUIRE(has_field(published, "relay_drive", "L,L,L"));
    mailbox_command("nonsense");
    copy_volatile(reply, debug_reply, sizeof reply);
    REQUIRE(strstr(reply, "ERR") == reply);
}
static void check_debug_status_matches_uart(void) {
    char published[sizeof debug_status];
    copy_volatile(published, debug_status, sizeof published);
    check_status_complete(published);
    REQUIRE(strcmp(published, status_line) == 0);
}
static void test_status_capacity(void) {
    reset_test("complete status at boot and with long uptime and large counters");
    rx_dropped = UINT32_MAX;
    sensor_result = AHT_WAIT;
    status();
    field("aht_age_ms", "4294967295");
    field("rx_dropped", "4294967295");
    check_debug_status_matches_uart();

    sensor_humidity = 10000;
    sensor_result = AHT_OK;
    initial_sample(-4000);
    arm_and_map(true);
    command("range -4000 8500");
    command("level mask 7"); command("level polarity high");
    command("led auto"); command("sim temp -4000"); command("sim level mask 5");
    aht_start_ok = false;
    for (unsigned i = 0; i < 10000; ++i) {
        clear_uart();
        advance(2000);
    }
    status(); field("aht_failures", "10000");
    check_debug_status_matches_uart();

    /* Large clock gaps model two periods when the cooperative loop is stalled.
     * The next poll ends each pump run and must retain the full elapsed count. */
    command("pump limit 300");
    command("pump on"); clear_uart(); advance(1900000000u);
    command("pump on"); clear_uart(); advance(1900000000u);
    command("relay 2 on");
    status();
    field("ms", "3820000000"); field("aht_age_ms", "3820000000");
    field("pump_total_ms", "3800000000"); field("pump_limit_ms", "300000");
    field("aht_failures", "10002"); field("fault", "PUMP_LIMIT");
    field("rx_dropped", "4294967295");
    check_debug_status_matches_uart();

    command("pump on"); clear_uart(); advance(299999);
    status(); field("pump_ms", "299999"); field("pump_total_ms", "3800299999");
    field("aht_failures", "10003"); field("rx_dropped", "4294967295");
    check_debug_status_matches_uart();
    command("range -4000 -1000");
    enter_menu(); select_menu("STATUS"); short_key(2);
    status(); field("menu", "STATUS"); field("selected", "STATUS");
    field("lower_centi", "-4000"); field("upper_centi", "-1000");
    check_debug_status_matches_uart();
    short_key(1); status(); field("page", "2");
    check_debug_status_matches_uart();
    command("pump on"); clear_uart(); advance(299999);
    status(); field("out", "1,1,0"); field("pump_ms", "299999");
    field("menu", "STATUS"); field("selected", "STATUS");
    check_debug_status_matches_uart();
    web_command(2147483646u, "hello 2147483647");
    web_info_epoch(2147483646u, 2147483647u);
    uart2_rx_count = UINT32_MAX - 7u;
    uart2_tx_count = uart2_rx_drop = uart2_tx_drop = UINT32_MAX;
    uart2_status();
    uart2_field("u2_rx", "4294967295"); uart2_field("u2_tx", "4294967295");
    uart2_field("u2_rxdrop", "4294967295"); uart2_field("u2_txdrop", "4294967295");
    uart2_field("oled_ok", "1"); uart2_field("page", "2");
    uart2_field("web_epoch", "2147483647");
    uart2_field("rx_dropped", "4294967295");
    uart2_rx_count = UINT32_MAX - (uint32_t)strlen("W 2147483647 status") - 1u;
    uart2_tx_count = UINT32_MAX;
    web_status(2147483647u);
    uart2_field("u2_rx", "4294967295"); uart2_field("u2_tx", "4294967295");
    uart2_field("oled_ok", "1"); uart2_field("page", "2");
    uart2_field("web_epoch", "2147483647");
    uart2_field("rx_dropped", "4294967295");
}
static void main_display(bool simulated) {
    REQUIRE(strcmp(oled_rows[0], simulated ? "SIM Temp:-40.00 C" : "Temp:-40.00 C") == 0);
    REQUIRE(strcmp(oled_rows[1], "Humidity:100.00%") == 0);
    REQUIRE(strcmp(oled_rows[2], simulated ? "FULL T:W M:W B:W" : "EMPTY T:D M:D B:D") == 0);
    REQUIRE(strcmp(oled_rows[3], "Heat:OFF Cool:OFF") == 0);
    REQUIRE(strcmp(oled_rows[4], "Pump:OFF Auto:OFF") == 0);
    REQUIRE(strstr(oled_rows[5], "Up:") == oled_rows[5]);
    REQUIRE(strcmp(oled_rows[6], "P:0s Sum:3800000s") == 0);
    REQUIRE(strcmp(oled_rows[7], "Lo:-40.00 Hi:-39.50") == 0);
}
static void display_page_cycle(bool simulated) {
    enter_menu(); select_menu("STATUS"); short_key(2);
    REQUIRE(strcmp(oled_rows[0], simulated ? "SIM STATUS 1/2" : "STATUS 1/2") == 0);
    REQUIRE(strcmp(oled_rows[2], "P/H/C:1/2/3 OK") == 0);
    REQUIRE(strcmp(oled_rows[3], "R:000 ACTIVE:H") == 0);
    REQUIRE(strstr(oled_rows[4], "RAW:1/1/1 BTN:") == oled_rows[4]);
    REQUIRE(strcmp(oled_rows[5], "MASK:7 WET:LOW") == 0);
    REQUIRE(strcmp(oled_rows[6], "FAULT:PUMP_LIMIT") == 0);
    REQUIRE(strcmp(oled_rows[7], "OK:MENU HOLD:HOME") == 0);

    short_key(1);
    REQUIRE(strcmp(oled_rows[0], simulated ? "SIM STATUS 2/2" : "STATUS 2/2") == 0);
    REQUIRE(strstr(oled_rows[1], "UP:") == oled_rows[1]);
    REQUIRE(strcmp(oled_rows[2], "PUMP RUN:0s") == 0);
    REQUIRE(strcmp(oled_rows[3], "PUMP SUM:3800000s") == 0);
    REQUIRE(strcmp(oled_rows[4], "PUMP LIMIT:300s") == 0);
    REQUIRE(strcmp(oled_rows[5], "LOW:-40.00 C") == 0);
    REQUIRE(strcmp(oled_rows[6], "HIGH:-39.50 C") == 0);
    REQUIRE(strcmp(oled_rows[7], "OK:MENU HOLD:HOME") == 0);
    long_ok(); menu_state("HOME");
    main_display(simulated);
}
static void test_display_servicing(void) {
    reset_test("eight OLED rows and menu status pages fit real and simulated extreme values");
    sensor_humidity = 10000;
    initial_sample(-4000);
    arm_and_map(true);
    command("range -4000 -3950"); command("pump limit 300");
    command("pump on");
    /* Reuse the long-counter setup to check the widest supported timer fields. */
    advance(3800000000u); poll_app();
    now_ms = UINT32_MAX - 300u;
    poll_app(); poll_app(); advance(300);
    REQUIRE(strcmp(oled_rows[5], "Up:4294967s") == 0);
    main_display(false);
    display_page_cycle(false);
    command("sim temp -4000"); command("sim level wet"); advance(250);
    main_display(true);
    display_page_cycle(true);
    REQUIRE(oled_refreshes > 0 && aht_starts > 0 && aht_reads > 0);
    REQUIRE(driven_mask() == 0);
}
static void test_async_oled_keeps_controls_responsive(void) {
    reset_test("a long OLED queue leaves button timing, control, and pump limits active");
    initial_sample(2750); arm_and_map(true);
    enforce_heat_cool = true;
    oled_steps_per_frame = 1000;
    advance(250);
    REQUIRE(oled_busy);
    unsigned begins = oled_begins, steps = oled_steps;
    char old_frame[sizeof oled_snapshot];
    memcpy(old_frame, oled_snapshot, sizeof old_frame);

    command("auto on"); sample(2400); outputs(2, "0,1,0");
    command("pump limit 1"); press_pump();
    uint32_t pump_started = now_ms;
    outputs(3, "1,1,0");
    button_down(2); advance(769);
    menu_state("HOME"); outputs(3, "1,1,0");
    advance(1); menu_state("MENU");
    button_up(2); menu_state("MENU"); outputs(3, "1,1,0");
    uint32_t pump_elapsed = now_ms - pump_started;
    REQUIRE(pump_elapsed < 1000);
    advance(999u - pump_elapsed); outputs(3, "1,1,0");
    advance(1); outputs(2, "0,1,0"); field("pump", "0");

    short_key(2); menu_state("EDIT"); field("draft_centi", "2500");
    input(PIN_BUTTON[0], false); poll_app(); advance(29);
    status(); field("draft_centi", "2500");
    advance(1); status(); field("draft_centi", "2550");
    button_up(0); short_key(2);
    menu_state("MENU"); field("lower_centi", "2550");
    sample(3101); outputs(4, "0,0,1");
    for (unsigned i = 0; i < 100; ++i) advance(10);
    outputs(4, "0,0,1"); field("auto", "1"); field("pump", "0");
    REQUIRE(oled_steps - steps >= 100);
    REQUIRE(oled_busy && oled_begins == begins);
    REQUIRE(memcmp(old_frame, oled_snapshot, sizeof old_frame) == 0);
    REQUIRE(oled_whole_sync == 0);
}
static void test_async_oled_renders_latest_view(void) {
    reset_test("view changes during an OLED transfer produce the latest deferred frame");
    initial_sample(2750); arm_and_map(true);
    oled_steps_per_frame = 500;
    advance(250);
    REQUIRE(oled_busy);
    unsigned begins = oled_begins;
    REQUIRE(strstr(oled_snapshot[0], "Temp:") == oled_snapshot[0]);

    enter_menu(); select_menu("HIGH"); short_key(2); short_key(0); short_key(2);
    status(); field("upper_centi", "3050");
    select_menu("STATUS"); short_key(2); short_key(1); short_key(2);
    select_menu("LEVEL"); short_key(2); long_ok();
    menu_state("HOME");
    enter_menu(); select_menu("STATUS"); short_key(2); short_key(1);
    menu_state("STATUS"); field("selected", "STATUS"); field("page", "2");
    REQUIRE(oled_busy && oled_begins == begins);
    REQUIRE(strstr(oled_snapshot[0], "Temp:") == oled_snapshot[0]);

    /* The old frame keeps its remaining work; only the next snapshot uses one step. */
    oled_steps_per_frame = 1;
    for (unsigned i = 0; i < 1000 && oled_begins == begins; ++i) poll_app();
    REQUIRE(oled_begins == begins + 1);
    REQUIRE(strcmp(oled_snapshot[0], "STATUS 2/2") == 0);
    REQUIRE(strcmp(oled_snapshot[5], "LOW:25.00 C") == 0);
    REQUIRE(strcmp(oled_snapshot[6], "HIGH:30.50 C") == 0);
    REQUIRE(oled_busy);
    poll_app();
    REQUIRE(!oled_busy && oled_begins == begins + 1);
    REQUIRE(strcmp(oled_completed[0], "STATUS 2/2") == 0);
    REQUIRE(strcmp(oled_completed[6], "HIGH:30.50 C") == 0);
    REQUIRE(oled_whole_sync == 0);
}
static void test_async_oled_failure_recovers(void) {
    reset_test("OLED step failure waits five seconds then resumes asynchronous output");
    initial_sample(2750); arm_and_map(true);
    oled_steps_per_frame = 3;
    advance(250);
    REQUIRE(oled_busy);
    unsigned inits = oled_inits, begins = oled_begins;
    oled_fail_next_step = true;
    poll_app();
    REQUIRE(!oled_busy);
    status(); field("oled_ok", "0");
    REQUIRE(oled_inits == inits && oled_begins == begins);
    advance(4999);
    REQUIRE(oled_inits == inits && oled_begins == begins);
    status(); field("oled_ok", "0");
    advance(1);
    REQUIRE(oled_inits == inits + 1 && oled_begins == begins + 1);
    REQUIRE(oled_busy);
    status(); field("oled_ok", "1");
    poll_app(); poll_app();
    REQUIRE(!oled_busy);
    REQUIRE(strstr(oled_completed[0], "Temp:") == oled_completed[0]);
    REQUIRE(oled_whole_sync == 0);
    outputs(0, "0,0,0");
}
static void test_uart2_isolation_and_protocol(void) {
    reset_test("USART2 replies independently and never emits boot or periodic output");
    REQUIRE(uart2_output_length == 0 && uart2_tx_count == 0);
    initial_sample(2750); advance(1000);
    REQUIRE(strstr(uart_output, "STAT ") != NULL);
    REQUIRE(uart2_output_length == 0);
    command("info");
    REQUIRE(strstr(uart_output, "INFO fw=tankctrl-3.0") != NULL);
    REQUIRE(strstr(uart_output, "ACK cmd=info") != NULL);
    char reply_before[sizeof debug_reply], reply_after[sizeof debug_reply];
    copy_volatile(reply_before, debug_reply, sizeof reply_before);

    uart2_command_for_test("info");
    REQUIRE(strcmp(uart2_output, "INFO fw=tankctrl-3.0 uart=USART2 baud=115200 read_only=0 proto=1 sensor=AHT30 oled=SSD1306_128x64 epoch=0\r\n") == 0);
    REQUIRE(uart2_rx_count == 5);
    REQUIRE(uart2_tx_count == uart2_output_length);
    REQUIRE(uart_output_length == 0);
    uart2_command_for_test("ping HELLO");
    REQUIRE(strcmp(uart2_output, "PONG uart=USART2 fw=tankctrl-3.0 read_only=0 token=HELLO\r\n") == 0);
    uart2_command_for_test("echo hello");
    REQUIRE(strcmp(uart2_output, "ECHO uart=USART2 fw=tankctrl-3.0 read_only=0 text=hello\r\n") == 0);
    REQUIRE(uart_output_length == 0);
    copy_volatile(reply_after, debug_reply, sizeof reply_after);
    REQUIRE(strcmp(reply_before, reply_after) == 0);

    uint32_t tx_before = uart2_tx_count;
    uart2_rx_drop = 2; uart2_rx_count += 2; /* Two simulated errored DR reads. */
    uart2_drop_next_write = true;
    clear_uart(); clear_uart2(); queue_uart2("ping DROP"); poll_app();
    REQUIRE(uart2_output_length == 0 && uart2_tx_count == tx_before);
    REQUIRE(uart2_tx_drop == 1);
    uart2_status(); uart2_field("u2_rxdrop", "2"); uart2_field("u2_txdrop", "1");
    uart2_field("u2_err", "0");
    copy_volatile(reply_after, debug_reply, sizeof reply_after);
    REQUIRE(strcmp(reply_before, reply_after) == 0);
    clear_uart2(); advance(1000);
    REQUIRE(uart2_output_length == 0);
}
static void test_uart2_per_poll_and_fresh_status(void) {
    reset_test("each poll accepts one line per port and UART2 status follows control");
    initial_sample(2750); arm_and_map(true);
    unsigned uart1_start = command_head, uart2_start = uart2_head;
    queue_uart1("range 2600 3100"); queue_uart1("range 2700 3200"); queue_uart1("range 2800 3300");
    queue_uart2("ping A"); queue_uart2("echo B"); queue_uart2("info");
    static const char *expected[] = {
        "PONG uart=USART2 fw=tankctrl-3.0 read_only=0 token=A\r\n",
        "ECHO uart=USART2 fw=tankctrl-3.0 read_only=0 text=B\r\n",
        "INFO fw=tankctrl-3.0 uart=USART2 baud=115200 read_only=0 proto=1 sensor=AHT30 oled=SSD1306_128x64 epoch=0\r\n"
    };
    for (unsigned i = 0; i < 3; ++i) {
        clear_uart(); clear_uart2(); poll_app();
        REQUIRE(command_head == uart1_start + i + 1u);
        REQUIRE(uart2_head == uart2_start + i + 1u);
        REQUIRE(strstr(uart_output, "ACK cmd=range") == uart_output);
        REQUIRE(strchr(uart_output, '\n') == uart_output + uart_output_length - 1u);
        uart2_single_line(); REQUIRE(strcmp(uart2_output, expected[i]) == 0);
    }
    status(); field("lower_centi", "2800"); field("upper_centi", "3300");
    field("u2_seq", "3"); field("u2_err", "0");
    command("range 2500 3000"); command("auto on"); outputs(0, "0,0,0");
    queue_uart1("range 2900 3100"); queue_uart2("status");
    clear_uart(); clear_uart2(); poll_app(); uart2_single_line();
    REQUIRE(strstr(uart2_output, "STAT uart=USART2 fw=tankctrl-3.0 read_only=0 ms=") == uart2_output);
    REQUIRE(has_field(uart2_output, "out", "0,1,0"));
    REQUIRE(has_field(uart2_output, "lower_centi", "2900"));
    REQUIRE(has_field(uart2_output, "upper_centi", "3100"));
    REQUIRE(has_field(uart2_output, "u2_seq", "4"));
    REQUIRE(driven_mask() == 2);
    REQUIRE(strstr(uart_output, "ACK cmd=range") == uart_output);
}
static void test_uart2_payload_boundaries(void) {
    reset_test("USART2 payload boundaries and echo whitespace remain exact");
    char payload[155], request[256], expected[512];
    for (unsigned i = 0; i < 154; ++i) payload[i] = (char)(33u + i % 94u);
    payload[154] = 0;
    snprintf(request, sizeof request, "ping %s", payload);
    snprintf(expected, sizeof expected, "PONG uart=USART2 fw=tankctrl-3.0 read_only=0 token=%s\r\n", payload);
    uart2_command_for_test(request); REQUIRE(strcmp(uart2_output, expected) == 0);
    REQUIRE(uart2_rx_count == 160);
    for (unsigned i = 0; i < 154; ++i) payload[i] = (char)(32u + i % 95u);
    snprintf(request, sizeof request, "echo %s", payload);
    snprintf(expected, sizeof expected, "ECHO uart=USART2 fw=tankctrl-3.0 read_only=0 text=%s\r\n", payload);
    uart2_command_for_test(request); REQUIRE(strcmp(uart2_output, expected) == 0);
    REQUIRE(uart2_rx_count == 320);
    uart2_command_for_test("ping !");
    REQUIRE(strcmp(uart2_output, "PONG uart=USART2 fw=tankctrl-3.0 read_only=0 token=!\r\n") == 0);
    uart2_command_for_test("echo  ");
    REQUIRE(strcmp(uart2_output, "ECHO uart=USART2 fw=tankctrl-3.0 read_only=0 text= \r\n") == 0);
    uart2_command_for_test("echo    keep  both ends  ");
    REQUIRE(strcmp(uart2_output, "ECHO uart=USART2 fw=tankctrl-3.0 read_only=0 text=   keep  both ends  \r\n") == 0);
    uart2_command_for_test("echo    ");
    REQUIRE(strcmp(uart2_output, "ECHO uart=USART2 fw=tankctrl-3.0 read_only=0 text=   \r\n") == 0);
    static const char *invalid_token[] = {"ping", "ping ", "ping  ", "ping A B", "ping \t", "ping \x7f", "ping \x80"};
    static const char *invalid_text[] = {"echo", "echo ", "echo \t", "echo \x1f", "echo \x7f", "echo \x80"};
    for (size_t i = 0; i < sizeof invalid_token / sizeof invalid_token[0]; ++i) {
        uart2_command_for_test(invalid_token[i]);
        REQUIRE(strcmp(uart2_output, "ERR uart=USART2 fw=tankctrl-3.0 read_only=0 code=invalid_token\r\n") == 0);
    }
    for (size_t i = 0; i < sizeof invalid_text / sizeof invalid_text[0]; ++i) {
        uart2_command_for_test(invalid_text[i]);
        REQUIRE(strcmp(uart2_output, "ERR uart=USART2 fw=tankctrl-3.0 read_only=0 code=invalid_text\r\n") == 0);
    }
    uart2_status(); uart2_field("u2_err", "13"); uart2_field("u2_rxdrop", "0");
    REQUIRE(uart_output_length == 0 && !reboot_called);
}
static void test_uart2_control_commands_are_read_only(void) {
    static const char *controls[] = {
        "stop", "reboot", "range -4000 8500", "relay arm low", "relay 1 off", "relay 3 on",
        "sim temp 8500", "sim level mask 7", "sim off", "menu AUTO", "auto off", "auto on",
        "pump off", "pump on", "pump limit 1", "led R", "led auto", "led polarity low",
        "level mask 1", "level polarity high", "scan", "oled pattern 0", "oled live",
        "map 3 2 1", "map confirm", "target 8500", "hyst 1", "unknown", "help", "status extra", "info extra"
    };
    reset_test("USART2 control words never reach application state or actuator commands");
    initial_sample(2400); arm_and_map(true);
    command("auto on"); command("pump on"); command("sim temp 2300"); command("sim level mask 4");
    enter_menu();
    char reply_before[sizeof debug_reply], reply_after[sizeof debug_reply];
    copy_volatile(reply_before, debug_reply, sizeof reply_before);
    for (size_t i = 0; i < sizeof controls / sizeof controls[0]; ++i) {
        uart2_command_for_test(controls[i]);
        REQUIRE(strcmp(uart2_output, "ERR uart=USART2 fw=tankctrl-3.0 read_only=0 code=framed_required\r\n") == 0);
        REQUIRE(uart_output_length == 0 && driven_mask() == 3 && led_mask() == 2 && !reboot_called);
        uart2_status();
        uart2_field("auto", "1"); uart2_field("pump", "1"); uart2_field("out", "1,1,0");
        uart2_field("lower_centi", "2500"); uart2_field("upper_centi", "3000");
        uart2_field("sim_t", "1"); uart2_field("sim_l", "1"); uart2_field("level_wetmask", "4");
        uart2_field("level_mask", "7"); uart2_field("level_polarity", "low");
        uart2_field("level_state", "LOW"); uart2_field("menu", "MENU"); uart2_field("selected", "LOW");
        uart2_field_u32("u2_err", (uint32_t)i + 1u);
        uart2_field_u32("u2_seq", 2u * ((uint32_t)i + 1u));
        copy_volatile(reply_after, debug_reply, sizeof reply_after);
        REQUIRE(strcmp(reply_before, reply_after) == 0);
    }
}
static void test_web_ids_and_strict_requests(void) {
    reset_test("framed IDs and request syntax obey their exact numeric and ASCII bounds");
    web_command(1, "info");
    REQUIRE(strcmp(uart2_output, "R 1 INFO fw=tankctrl-3.0 proto=1 uart=USART2 baud=115200 read_only=0 target=STM32F103C8T6 sensor=AHT30 oled=SSD1306_128x64 epoch=0\r\n") == 0);
    web_command(2147483647u, "info");
    REQUIRE(strstr(uart2_output, "R 2147483647 INFO fw=tankctrl-3.0 proto=1 ") == uart2_output);
    static const char *invalid_id[] = {"W ", "W 0 info", "W 000 info", "W -1 info", "W +1 info", "W x info", "W 2147483648 info", "W 999999999999999999999 info"};
    for (size_t i = 0; i < sizeof invalid_id / sizeof invalid_id[0]; ++i) {
        uart2_command_for_test(invalid_id[i]); web_protocol_error(0, "invalid_id");
    }
    static const char *bad_prefix[] = {"W", "W7 status", "W\t7 status", "Wx 7 status"};
    for (size_t i = 0; i < sizeof bad_prefix / sizeof bad_prefix[0]; ++i) {
        uart2_command_for_test(bad_prefix[i]); web_protocol_error(0, "bad_request");
    }
    static const char *bad_separator[] = {"W 7", "W 7\tstatus", "W 7x status"};
    for (size_t i = 0; i < sizeof bad_separator / sizeof bad_separator[0]; ++i) {
        uart2_command_for_test(bad_separator[i]); web_protocol_error(7, "bad_request");
    }

    char longest[APP_COMMAND_CAPACITY], saved[APP_WEB_RESPONSE_CAPACITY];
    longest[0] = 'W'; longest[1] = ' ';
    for (unsigned i = 2; i < 153; ++i) longest[i] = '0';
    longest[153] = '7'; memcpy(longest + 154, " info", 6);
    REQUIRE(strlen(longest) == APP_COMMAND_CAPACITY - 1u);
    uart2_command_for_test(longest);
    REQUIRE(strstr(uart2_output, "R 7 INFO fw=tankctrl-3.0 proto=1 ") == uart2_output);
    strcpy(saved, uart2_output); web_command(7, "info"); REQUIRE(strcmp(saved, uart2_output) == 0);

    static const char *bad_args[] = {
        "info extra", "status extra", "stop extra", "range", "range 2500 3000 extra",
        "auto", "auto ON", "auto on extra", "pump", "pump on extra", "pump limit",
        "pump limit 0", "pump limit 301", "pump limit 2147483648", "heat ON", "heat on extra",
        "cool", "cool off extra", " range 2500 3000", "range 2500  3000",
        "range 2500\t3000", "range 2500 3000 "
    };
    for (size_t i = 0; i < sizeof bad_args / sizeof bad_args[0]; ++i) {
        unsigned id = 100u + (unsigned)i;
        web_command(id, bad_args[i]); web_protocol_error(id, "bad_args");
        REQUIRE(driven_mask() == 0 && !reboot_called);
    }
    uart2_status(); uart2_field("lower_centi", "2500"); uart2_field("upper_centi", "3000");
    uart2_field("auto", "0"); uart2_field("pump", "0");
}
static void test_web_forbidden_and_bad_ranges(void) {
    static const char *forbidden[] = {
        "reboot", "relay arm high", "relay arm low", "relay disarm", "relay 1 on", "relay 1 off",
        "relay 2 on", "relay 3 on", "map 1 2 3", "map confirm", "sim temp 2500", "sim level wet",
        "sim level mask 4", "sim off", "menu LOW", "led R", "led Y", "led G", "led test", "led off",
        "led auto", "led polarity low", "level mask 1", "level polarity high", "scan", "oled pattern 0",
        "oled live", "target 2750", "hyst 250", "ping HELLO", "echo hello"
    };
    _Static_assert(sizeof forbidden / sizeof forbidden[0] == 31u, "31 forbidden framed commands");
    reset_test("framed allowlist and invalid ranges leave running control untouched");
    initial_sample(2400); arm_and_map(true);
    command("auto on"); command("pump on"); command("sim temp 2300"); command("sim level mask 4"); enter_menu();
    char old_reply[sizeof debug_reply]; copy_volatile(old_reply, debug_reply, sizeof old_reply);
    for (size_t i = 0; i < sizeof forbidden / sizeof forbidden[0]; ++i) {
        unsigned id = 300u + (unsigned)i;
        web_command(id, forbidden[i]); web_protocol_error(id, "forbidden"); web_reply_isolated(old_reply);
        REQUIRE(driven_mask() == 3 && led_mask() == 2 && !reboot_called);
        uart2_status(); uart2_field("auto", "1"); uart2_field("pump", "1");
        uart2_field("sim_t", "1"); uart2_field("sim_l", "1"); uart2_field("menu", "MENU");
        uart2_field("lower_centi", "2500"); uart2_field("upper_centi", "3000");
        uart2_field("map", "1,2,3");
    }
    static const char *bad_range[] = {"range 2500 2500", "range 3000 2500", "range -4001 3000", "range 2500 8501", "range x 3000", "range 2147483648 3000", "range -2147483649 3000"};
    for (size_t i = 0; i < sizeof bad_range / sizeof bad_range[0]; ++i) {
        unsigned id = 400u + (unsigned)i;
        web_command(id, bad_range[i]); web_protocol_error(id, "bad_range"); web_reply_isolated(old_reply);
        REQUIRE(driven_mask() == 3);
        uart2_status(); uart2_field("lower_centi", "2500"); uart2_field("upper_centi", "3000");
    }
}
static void test_web_arm_map_and_sensor_gates(void) {
    reset_test("framed control retains arm, map, and automatic-sensor gates");
    initial_sample(2400);
    static const char *on[] = {"heat on", "cool on", "auto on", "pump on"};
    static const char *name[] = {"heat", "cool", "auto", "pump"};
    char old_reply[sizeof debug_reply]; copy_volatile(old_reply, debug_reply, sizeof old_reply);
    for (unsigned i = 0; i < 4; ++i) {
        web_command(i + 1, on[i]); web_application_error(i + 1, name[i], "not_armed"); web_reply_isolated(old_reply);
        REQUIRE(driven_mask() == 0);
    }
    web_command(5, "heat off"); web_ok(5, "heat"); REQUIRE(driven_mask() == 0);
    web_command(6, "cool off"); web_ok(6, "cool"); REQUIRE(driven_mask() == 0);
    command("relay arm high"); copy_volatile(old_reply, debug_reply, sizeof old_reply);
#if !BOARD_RELAYS_VERIFIED
    for (unsigned i = 0; i < 4; ++i) {
        web_command(i + 7, on[i]); web_application_error(i + 7, name[i], "map_unconfirmed"); web_reply_isolated(old_reply);
        REQUIRE(driven_mask() == 0);
    }
#endif
    command("map confirm"); sensor_result = AHT_ERROR; advance(2000); poll_app();
    copy_volatile(old_reply, debug_reply, sizeof old_reply);
    web_command(11, "auto on"); web_application_error(11, "auto", "aht_invalid"); web_reply_isolated(old_reply);
    web_command(12, "heat on"); web_ok(12, "heat"); REQUIRE(driven_mask() == 2);
    web_command(13, "cool on"); web_ok(13, "cool"); REQUIRE(driven_mask() == 4);
    web_command(14, "heat off"); web_ok(14, "heat"); REQUIRE(driven_mask() == 4);
    web_command(15, "cool off"); web_ok(15, "cool"); REQUIRE(driven_mask() == 0);
    web_command(16, "pump on"); web_ok(16, "pump"); REQUIRE(driven_mask() == 1);
    web_command(17, "stop"); web_ok(17, "stop"); web_reply_isolated(old_reply); REQUIRE(driven_mask() == 0);
    uart2_status(); uart2_field("auto", "0"); uart2_field("aht_valid", "0"); uart2_field("menu", "HOME");
}
static void test_web_roles_and_stop(void) {
    reset_test("framed thermal roles honor mapping, interlock, manual mode, and stop");
    initial_sample(2400); command("relay arm high"); command("map 3 1 2");
    heat_channel = 0; cool_channel = 1; enforce_heat_cool = true;
    command("auto on"); command("pump on"); command("sim temp 2300"); command("sim level mask 4"); enter_menu();
    REQUIRE(driven_mask() == 5);
    char old_reply[sizeof debug_reply]; copy_volatile(old_reply, debug_reply, sizeof old_reply);
    size_t begin = relay_event_count;
    web_command(1, "cool on"); web_ok(1, "cool"); web_reply_isolated(old_reply);
    REQUIRE(driven_mask() == 6); require_break_before_make(begin, 1, 2);
    uart2_status(); uart2_field("auto", "0"); uart2_field("pump", "1");
    begin = relay_event_count;
    web_command(2, "heat on"); web_ok(2, "heat"); REQUIRE(driven_mask() == 5);
    require_break_before_make(begin, 2, 1);
    web_command(3, "heat off"); web_ok(3, "heat"); REQUIRE(driven_mask() == 4);
    web_command(4, "cool off"); web_ok(4, "cool"); REQUIRE(driven_mask() == 4);
    command("auto on"); REQUIRE(driven_mask() == 5);
    copy_volatile(old_reply, debug_reply, sizeof old_reply);
    web_command(5, "heat off"); web_ok(5, "heat"); web_reply_isolated(old_reply); REQUIRE(driven_mask() == 4);
    select_menu("LOW"); short_key(2); menu_state("EDIT");
    web_command(6, "stop"); web_ok(6, "stop"); REQUIRE(driven_mask() == 0);
    web_status(7); uart2_field("auto", "0"); uart2_field("pump", "0");
    uart2_field("sim_t", "0"); uart2_field("sim_l", "0"); uart2_field("menu", "HOME");
}
static void test_web_cached_pump_and_stop(void) {
    reset_test("cached actuator acknowledgements never restart or extend an action");
    initial_sample(2750); arm_and_map(true);
    web_command(1, "pump limit 1"); web_ok(1, "pump");
    web_command(2, "pump on"); web_ok(2, "pump"); REQUIRE(driven_mask() == 1);
    char saved[APP_WEB_RESPONSE_CAPACITY]; strcpy(saved, uart2_output);
    advance(500); web_command(2, "pump on"); REQUIRE(strcmp(saved, uart2_output) == 0);
    advance(499); REQUIRE(driven_mask() == 1);
    advance(1); REQUIRE(driven_mask() == 0);
    web_command(2, "pump on"); REQUIRE(strcmp(saved, uart2_output) == 0 && driven_mask() == 0);
    web_command(3, "pump on"); web_ok(3, "pump"); REQUIRE(driven_mask() == 1);
    web_command(4, "pump off"); web_ok(4, "pump"); REQUIRE(driven_mask() == 0);
    web_command(5, "pump limit 300"); web_ok(5, "pump");
    web_status(6); uart2_field("pump_limit_ms", "300000");
    web_command(7, "stop"); web_ok(7, "stop"); strcpy(saved, uart2_output);
    command("pump on"); REQUIRE(driven_mask() == 1);
    web_command(7, "stop"); REQUIRE(strcmp(saved, uart2_output) == 0 && driven_mask() == 1);
    web_command(8, "stop"); web_ok(8, "stop"); REQUIRE(driven_mask() == 0);
}
static void test_web_cached_failures_and_conflicts(void) {
    reset_test("cached failures, conflicts, bare diagnostics, and query replacement are stable");
    sensor_result = AHT_WAIT; arm_and_map(true);
    char old_reply[sizeof debug_reply], saved[APP_WEB_RESPONSE_CAPACITY];
    copy_volatile(old_reply, debug_reply, sizeof old_reply);
    web_command(20, "auto on"); web_application_error(20, "auto", "aht_invalid"); web_reply_isolated(old_reply);
    strcpy(saved, uart2_output);
    sensor_result = AHT_OK; sensor_temperature = 2400; poll_app();
    uart2_command_for_test("info"); uart2_command_for_test("ping CACHE"); uart2_command_for_test("echo keep");
    web_command(20, "auto on"); REQUIRE(strcmp(saved, uart2_output) == 0 && driven_mask() == 0);
    uart2_status(); uart2_field("auto", "0"); uart2_field("aht_valid", "1"); uart2_field("u2_err", "2");
    web_command(21, "auto on"); web_ok(21, "auto"); REQUIRE(driven_mask() == 2); strcpy(saved, uart2_output);
    size_t before = relay_event_count;
    web_command(21, "cool on"); web_protocol_error(21, "id_conflict"); REQUIRE(driven_mask() == 2);
    web_command(21, "auto on"); REQUIRE(strcmp(saved, uart2_output) == 0 && driven_mask() == 2);
    REQUIRE(relay_event_count == before);
    web_command(22, "info"); REQUIRE(strstr(uart2_output, "R 22 INFO fw=tankctrl-3.0 proto=1 ") == uart2_output);
    web_command(21, "cool on"); web_ok(21, "cool"); REQUIRE(driven_mask() == 4); web_reply_isolated(old_reply);
    web_status(23); uart2_field("auto", "0"); uart2_field("u2_err", "3");
}
static void test_web_cached_status_and_fresh_control(void) {
    reset_test("cached STAT stays byte-exact while fresh framed STAT follows this loop control");
    initial_sample(2750); arm_and_map(true);
    web_status(7);
    char saved[APP_WEB_RESPONSE_CAPACITY], mailbox[APP_STATUS_CAPACITY], old_reply[sizeof debug_reply];
    strcpy(saved, uart2_output);
    advance(250); command("range 2700 3200"); copy_volatile(old_reply, debug_reply, sizeof old_reply);
    uart2_command_for_test("info"); uart2_command_for_test("ping CACHE"); uart2_command_for_test("echo keep"); uart2_status();
    web_command(7, "status"); REQUIRE(strcmp(saved, uart2_output) == 0); web_reply_isolated(old_reply);
    REQUIRE(has_field(uart2_output, "ms", "0") && has_field(uart2_output, "lower_centi", "2500"));
    copy_volatile(mailbox, debug_status, sizeof mailbox);
    REQUIRE(has_field(mailbox, "ms", "250") && has_field(mailbox, "lower_centi", "2700"));
    char sequence[16]; snprintf(sequence, sizeof sequence, "%u", uart2_head);
    REQUIRE(has_field(mailbox, "u2_seq", sequence));
    web_status(8); uart2_field("ms", "250"); uart2_field("lower_centi", "2700");
    web_status(7); REQUIRE(strcmp(saved, uart2_output) != 0); uart2_field("ms", "250");
    command("auto on"); REQUIRE(driven_mask() == 0);
    queue_uart1("range 2900 3100"); queue_uart2("W 9 status");
    clear_uart(); clear_uart2(); poll_app(); uart2_single_line();
    REQUIRE(strstr(uart2_output, "R 9 STAT ms=") == uart2_output);
    REQUIRE(has_field(uart2_output, "out", "0,1,0") && has_field(uart2_output, "lower_centi", "2900"));
    REQUIRE(driven_mask() == 2 && strstr(uart_output, "ACK cmd=range") == uart_output);
    copy_volatile(old_reply, debug_reply, sizeof old_reply); REQUIRE(has_field(old_reply, "cmd", "range"));
}
static void hello_preserves_live_control(const char *old_reply, size_t events_before,
                                        uint32_t epoch, uint32_t elapsed) {
    char mailbox[APP_STATUS_CAPACITY], epoch_text[16], elapsed_text[16];
    web_reply_isolated(old_reply);
    REQUIRE(relay_event_count == events_before && driven_mask() == 3);
    copy_volatile(mailbox, debug_status, sizeof mailbox);
    snprintf(epoch_text, sizeof epoch_text, "%u", (unsigned)epoch);
    snprintf(elapsed_text, sizeof elapsed_text, "%u", (unsigned)elapsed);
    REQUIRE(has_field(mailbox, "web_epoch", epoch_text));
    REQUIRE(has_field(mailbox, "auto", "1") && has_field(mailbox, "pump", "1"));
    REQUIRE(has_field(mailbox, "out", "1,1,0"));
    REQUIRE(has_field(mailbox, "lower_centi", "2500") && has_field(mailbox, "upper_centi", "3000"));
    REQUIRE(has_field(mailbox, "menu", "EDIT") && has_field(mailbox, "selected", "LOW"));
    REQUIRE(has_field(mailbox, "draft_centi", "2550"));
    REQUIRE(has_field(mailbox, "pump_ms", elapsed_text));
    REQUIRE(has_field(mailbox, "pump_total_ms", elapsed_text));
}
static void test_web_hello_bounds_and_live_control(void) {
    reset_test("hello validates its epoch and preserves live control, draft, and pump deadline");
    initial_sample(2400); arm_and_map(true); enforce_heat_cool = true;
    command("auto on"); enter_menu(); short_key(2); short_key(0);
    command("pump limit 1"); command("pump on"); advance(500);
    status(); field("web_epoch", "0"); field("draft_centi", "2550");
    char old_reply[sizeof debug_reply], saved[APP_WEB_RESPONSE_CAPACITY];
    copy_volatile(old_reply, debug_reply, sizeof old_reply);
    size_t events_before = relay_event_count;
    static const char *valid[] = {"hello 1", "hello 2147483647", "hello 0000000001"};
    static const uint32_t epochs[] = {1u, 2147483647u, 1u};
    for (unsigned i = 0; i < 3; ++i) {
        web_command(i + 1u, valid[i]); web_info_epoch(i + 1u, epochs[i]);
        hello_preserves_live_control(old_reply, events_before, epochs[i], 500u);
    }
    static const char *bad_epoch[] = {
        "hello 0", "hello 0000", "hello -1", "hello +1", "hello 2147483648",
        "hello 999999999999999999999", "hello x", "hello 1x", "hello 0x10"
    };
    for (unsigned i = 0; i < sizeof bad_epoch / sizeof bad_epoch[0]; ++i) {
        web_command(100u + i, bad_epoch[i]); web_protocol_error(100u + i, "bad_epoch");
        hello_preserves_live_control(old_reply, events_before, 1u, 500u);
    }
    static const char *bad_args[] = {
        "hello", "hello ", "hello  1", "hello 1 ", "hello 1 extra", "hello\t1"
    };
    for (unsigned i = 0; i < sizeof bad_args / sizeof bad_args[0]; ++i) {
        web_command(200u + i, bad_args[i]); web_protocol_error(200u + i, "bad_args");
        hello_preserves_live_control(old_reply, events_before, 1u, 500u);
    }
    web_command(700, "hello 2147483647"); web_info_epoch(700, 2147483647u);
    strcpy(saved, uart2_output);
    uart2_command_for_test("info");
    REQUIRE(strcmp(uart2_output, "INFO fw=tankctrl-3.0 uart=USART2 baud=115200 read_only=0 proto=1 sensor=AHT30 oled=SSD1306_128x64 epoch=2147483647\r\n") == 0);
    hello_preserves_live_control(old_reply, events_before, 2147483647u, 500u);
    web_command(700, "hello 1"); web_protocol_error(700, "id_conflict");
    hello_preserves_live_control(old_reply, events_before, 2147483647u, 500u);
    web_command(700, "hello 2147483647"); REQUIRE(strcmp(saved, uart2_output) == 0);
    hello_preserves_live_control(old_reply, events_before, 2147483647u, 500u);
    advance(499); web_command(700, "hello 2147483647"); REQUIRE(strcmp(saved, uart2_output) == 0);
    hello_preserves_live_control(old_reply, events_before, 2147483647u, 999u);
    advance(1); REQUIRE(driven_mask() == 2);
    copy_volatile(old_reply, debug_reply, sizeof old_reply); /* The timer reports its own limit error. */
    web_command(700, "hello 2147483647"); REQUIRE(strcmp(saved, uart2_output) == 0);
    web_reply_isolated(old_reply); REQUIRE(driven_mask() == 2 && relay_event_count > events_before);
    uart2_status(); uart2_field("auto", "1"); uart2_field("pump", "0");
    uart2_field("pump_total_ms", "1000"); uart2_field("web_epoch", "2147483647");
    sample(3100); command("pump on"); REQUIRE(driven_mask() == 5);
    events_before = relay_event_count; copy_volatile(old_reply, debug_reply, sizeof old_reply);
    web_command(701, "hello 1"); web_info_epoch(701, 1u); web_reply_isolated(old_reply);
    REQUIRE(driven_mask() == 5 && relay_event_count == events_before);
    uart2_status(); uart2_field("auto", "1"); uart2_field("pump", "1");
    uart2_field("out", "1,0,1"); uart2_field("menu", "EDIT"); uart2_field("draft_centi", "2550");
}
static void test_web_epoch_reset_and_fresh_handshake(void) {
    reset_test("a reset clears epoch and cached responses even when the new clock is larger");
    initial_sample(2750); advance(1000);
    web_command(1, "info"); web_info_epoch(1, 0u);
    web_command(7, "hello 12345"); web_info_epoch(7, 12345u);
    web_command(8, "info"); web_info_epoch(8, 12345u);
    web_status(9); uart2_field("web_epoch", "12345"); uart2_field("ms", "1000");
    char saved[APP_WEB_RESPONSE_CAPACITY], mailbox[APP_STATUS_CAPACITY], old_reply[sizeof debug_reply];
    strcpy(saved, uart2_output);

    /* Restart the application and peripheral counters, preserving a larger
     * host clock so a browser cannot rely on uptime decreasing to detect it. */
    now_ms = 2000;
    command_head = command_tail = uart2_head = uart2_tail = 0;
    uart2_rx_count = uart2_tx_count = uart2_rx_drop = uart2_tx_drop = 0;
    app_init();
    copy_volatile(mailbox, debug_status, sizeof mailbox);
    REQUIRE(has_field(mailbox, "web_epoch", "0") && has_field(mailbox, "ms", "2000"));
    REQUIRE(has_field(mailbox, "auto", "0") && has_field(mailbox, "pump", "0"));
    copy_volatile(old_reply, debug_reply, sizeof old_reply);
    uart2_command_for_test("info");
    REQUIRE(strcmp(uart2_output, "INFO fw=tankctrl-3.0 uart=USART2 baud=115200 read_only=0 proto=1 sensor=AHT30 oled=SSD1306_128x64 epoch=0\r\n") == 0);
    web_reply_isolated(old_reply);
    web_status(9); uart2_field("web_epoch", "0"); uart2_field("ms", "2000");
    REQUIRE(strcmp(saved, uart2_output) != 0); web_reply_isolated(old_reply);
    web_command(10, "hello 2147483647"); web_info_epoch(10, 2147483647u); web_reply_isolated(old_reply);
    web_status(11); uart2_field("web_epoch", "2147483647"); uart2_field("auto", "0"); uart2_field("pump", "0");
}

int main(void) {
    test_defaults();
    test_unarmed_and_mapping_gate();
    test_invalid_commands();
    test_arm_polarity_and_manual();
    test_auto_range();
    test_range_commands();
    test_direction_interlock();
    test_sensor_failure();
    test_simulation_and_level_mask();
    test_button_debounce();
    test_menu_navigation_and_editing();
    test_menu_actions_and_views();
    test_liquid_indicator_policy();
    test_pump_limit();
    test_debug_mailbox();
    test_status_capacity();
    test_display_servicing();
    test_async_oled_keeps_controls_responsive();
    test_async_oled_renders_latest_view();
    test_async_oled_failure_recovers();
    test_uart2_isolation_and_protocol();
    test_uart2_per_poll_and_fresh_status();
    test_uart2_payload_boundaries();
    test_uart2_control_commands_are_read_only();
    test_web_ids_and_strict_requests();
    test_web_forbidden_and_bad_ranges();
    test_web_arm_map_and_sensor_gates();
    test_web_roles_and_stop();
    test_web_cached_pump_and_stop();
    test_web_cached_failures_and_conflicts();
    test_web_cached_status_and_fresh_control();
    test_web_hello_bounds_and_live_control();
    test_web_epoch_reset_and_fresh_handshake();
    printf("PASS: verified=%u, %u black-box application scenarios (no hardware access); "
           "longest mailbox STAT=%zu/%zu, bare UART2 STAT=%zu, framed UART2 STAT=%zu bytes (UBSan)\n", (unsigned)BOARD_RELAYS_VERIFIED,
           tests_run, largest_status_length, sizeof debug_status - 1u, largest_uart2_status_length, largest_framed_status_length);
    return 0;
}
