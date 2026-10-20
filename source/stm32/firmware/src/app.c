#include "app.h"
#include "bsp.h"
#include "drivers.h"
#include "util.h"
#include "board_config.h"

/* The debugger halts the CPU before writing command, then request, and resumes.
 * Symbols are intentionally exported; their addresses come from this ELF. */
volatile char debug_command[APP_COMMAND_CAPACITY];
volatile uint32_t debug_request;
volatile uint32_t debug_response;
volatile char debug_status[APP_STATUS_CAPACITY];
volatile char debug_reply[192];

typedef enum { FAULT_NONE, FAULT_AHT_ERROR, FAULT_AHT_STALE,
               FAULT_PUMP_LIMIT } fault_t;
typedef enum { UI_HOME, UI_MENU, UI_EDIT, UI_LEVEL, UI_STATUS } ui_mode_t;
typedef enum { ITEM_LOW, ITEM_HIGH, ITEM_AUTO, ITEM_PUMP, ITEM_LEVEL,
               ITEM_STATUS, ITEM_BACK, ITEM_COUNT } menu_item_t;
typedef enum { NOTE_NONE, NOTE_SAVED, NOTE_CANCELLED, NOTE_RANGE,
               NOTE_LIMIT, NOTE_ARM, NOTE_MAP, NOTE_SENSOR,
               NOTE_PUMP_LIMIT } ui_note_t;
typedef struct {
    bool candidate, pressed;
    uint32_t changed_at;
} button_t;
typedef struct {
    bool armed, relay_high, relay[3], map_confirmed, auto_enabled;
    uint8_t map[3]; /* pump, heat, cool: zero-based relay indices */
    uint32_t pump_started, pump_accumulated, pump_limit;
    int32_t lower, upper, target, hysteresis;
    fault_t fault;
    button_t button[3];
    bool level_raw[3], level_high;
    uint8_t level_mask;
    bool sim_temperature, sim_level;
    uint8_t simulated_wetmask;
    int32_t simulated_temperature;
    bool led_high, led_auto;
    uint8_t led_bits;
    bool aht_initialized, aht_waiting, aht_has_sample, aht_failed;
    int32_t temperature;
    uint32_t humidity, aht_good_at, aht_attempt_at, aht_started_at;
    uint32_t aht_failures;
    bool oled_ok, oled_pattern;
    uint8_t pattern, page;
    uint32_t oled_at, oled_retry_at, telemetry_at;
    bool scanning;
    uint8_t scan_bus, scan_address, scan_found[2];
    uint32_t scan_at;
    ui_mode_t ui_mode;
    menu_item_t selected;
    int32_t draft;
    ui_note_t ui_note;
    uint32_t ui_note_at, ok_pressed_at;
    bool ok_long_handled, ok_suppressed;
    uint32_t uart2_sequence, uart2_errors, web_epoch;
} application_t;

static application_t a;
static char status_buffer[APP_STATUS_CAPACITY];
typedef struct {
    uint32_t id;
    bool valid, failed;
    char payload[APP_COMMAND_CAPACITY];
    char response[APP_WEB_RESPONSE_CAPACITY];
} web_cache_t;
static web_cache_t web_cache;
static bool web_capturing_reply;
static char web_ack[192];
static const gpio_pin_t *const led_pin[3] = {
    &PIN_LED_R, &PIN_LED_Y, &PIN_LED_G
};

static bool elapsed(uint32_t now, uint32_t before, uint32_t interval) {
    return (uint32_t)(now - before) >= interval;
}

static void copy_debug(volatile char *destination, size_t capacity,
                       const char *source) {
    size_t i = 0;
    while (i + 1u < capacity && source[i]) {
        destination[i] = source[i];
        ++i;
    }
    destination[i] = 0;
}

static void reply(const char *format, ...) {
    char line[192];
    va_list args;
    va_start(args, format);
    vfmt(line, sizeof line, format, args);
    va_end(args);
    if (web_capturing_reply) {
        copy_debug(web_ack, sizeof web_ack, line);
        return;
    }
    copy_debug(debug_reply, sizeof debug_reply, line);
    uart_write(line);
    uart_write("\r\n");
}

static void error(const char *command, const char *code) {
    reply("ERR cmd=%s code=%s", command, code);
}

static void set_note(ui_note_t note, uint32_t now) {
    a.ui_note = note;
    a.ui_note_at = now;
    a.oled_at = now - 250u;
}

static const char *ui_name(void) {
    switch (a.ui_mode) {
    case UI_MENU: return "MENU";
    case UI_EDIT: return "EDIT";
    case UI_LEVEL: return "LEVEL";
    case UI_STATUS: return "STATUS";
    default: return "HOME";
    }
}

static const char *item_name(void) {
    static const char *const name[ITEM_COUNT] = {
        "LOW", "HIGH", "AUTO", "PUMP", "LEVEL", "STATUS", "BACK"
    };
    return name[a.selected];
}

static const char *note_name(void) {
    switch (a.ui_note) {
    case NOTE_SAVED: return "SAVED";
    case NOTE_CANCELLED: return "CANCELLED";
    case NOTE_RANGE: return "ERR_RANGE";
    case NOTE_LIMIT: return "ERR_LIMIT";
    case NOTE_ARM: return "NEED_ARM";
    case NOTE_MAP: return "NEED_MAP";
    case NOTE_SENSOR: return "SENSOR_ERR";
    case NOTE_PUMP_LIMIT: return "PUMP_LIMIT";
    default: return "NONE";
    }
}

static const char *note_text(void) {
    switch (a.ui_note) {
    case NOTE_SAVED: return "SAVED";
    case NOTE_CANCELLED: return "CANCELLED";
    case NOTE_RANGE: return "ERR LOW>=HIGH";
    case NOTE_LIMIT: return "ERR RANGE LIMIT";
    case NOTE_ARM: return "ARM REQUIRED";
    case NOTE_MAP: return "MAP REQUIRED";
    case NOTE_SENSOR: return "SENSOR ERROR";
    case NOTE_PUMP_LIMIT: return "PUMP TIME LIMIT";
    default: return "";
    }
}

static bool range_valid(int32_t lower, int32_t upper) {
    return lower >= -4000 && upper <= 8500 && lower < upper;
}

static void range_store(int32_t lower, int32_t upper) {
    a.lower = lower;
    a.upper = upper;
    /* Legacy target/hyst describe this one range; they are never controls. */
    a.target = lower + (upper - lower) / 2;
    a.hysteresis = (upper - lower + 1) / 2;
}

static uint32_t aht_age(uint32_t now) {
    return a.aht_has_sample ? (uint32_t)(now - a.aht_good_at) : UINT32_MAX;
}

static bool sensor_valid(uint32_t now) {
    return a.aht_has_sample && !a.aht_failed && aht_age(now) <= 5000u;
}

static int32_t effective_temperature(void) {
    return a.sim_temperature ? a.simulated_temperature : a.temperature;
}

static bool level_wet(unsigned index) {
    return a.sim_level ? (a.simulated_wetmask & (1u << index)) != 0u :
                        a.level_raw[index] == a.level_high;
}

static const char *level_name(unsigned index) {
    if (!a.sim_level && !(a.level_mask & (1u << index))) return "NC";
    return level_wet(index) ? "WET" : "DRY";
}

static char level_char(unsigned index) {
    if (!a.sim_level && !(a.level_mask & (1u << index))) return 'N';
    return level_wet(index) ? 'W' : 'D';
}

static uint8_t level_raw_wetmask(void) {
    uint8_t bits = 0u;
    for (unsigned i = 0; i < 3u; ++i)
        if (a.level_raw[i] == a.level_high) bits |= (uint8_t)(1u << i);
    return bits;
}

static uint8_t level_wetmask(void) {
    return a.sim_level ? a.simulated_wetmask : (level_raw_wetmask() & a.level_mask);
}

static const char *level_state(void) {
    if (!a.sim_level && a.level_mask != 7u) return "LEVEL_NC";
    switch (level_wetmask()) {
    case 0u: return "EMPTY";
    case 4u: return "LOW";
    case 6u: return "NORMAL";
    case 7u: return "FULL";
    default: return "LEVEL_ERR";
    }
}

static const char *fault_name(void) {
    switch (a.fault) {
    case FAULT_AHT_ERROR: return "AHT_ERR";
    case FAULT_AHT_STALE: return "AHT_STALE";
    case FAULT_PUMP_LIMIT: return "PUMP_LIMIT";
    default: return "NONE";
    }
}

static const char *aht_state(uint32_t now) {
    if (a.aht_failed || !a.aht_has_sample) return "ERR";
    return sensor_valid(now) ? "OK" : "STALE";
}

static void relay_apply(unsigned index, bool on) {
    if (!a.armed || a.relay[index] == on) return;
    gpio_write(PIN_RELAY[index], on ? a.relay_high : !a.relay_high);
    a.relay[index] = on;
}

static void pump_apply(bool on, uint32_t now) {
    unsigned index = a.map[0];
    if (!a.armed || a.relay[index] == on) return;
    if (on) {
        a.pump_started = now;
        if (a.fault == FAULT_PUMP_LIMIT) a.fault = FAULT_NONE;
    } else {
        a.pump_accumulated += (uint32_t)(now - a.pump_started);
    }
    relay_apply(index, on);
}

static uint32_t pump_active_ms(uint32_t now) {
    return a.relay[a.map[0]] ? (uint32_t)(now - a.pump_started) : 0u;
}

static void thermal_apply(unsigned desired) {
    /* Deenergize the opposite direction before energizing the requested one. */
    if (desired == 1u) {
        relay_apply(a.map[2], false);
        relay_apply(a.map[1], true);
    } else if (desired == 2u) {
        relay_apply(a.map[1], false);
        relay_apply(a.map[2], true);
    } else {
        relay_apply(a.map[1], false);
        relay_apply(a.map[2], false);
    }
}

static void all_relays_off(uint32_t now) {
    pump_apply(false, now);
    for (unsigned i = 0; i < 3u; ++i) relay_apply(i, false);
}

static void led_drive(void) {
    for (unsigned i = 0; i < 3u; ++i) {
        bool on = (a.led_bits & (1u << i)) != 0u;
        gpio_write(*led_pin[i], on ? a.led_high : !a.led_high);
    }
}

static void led_apply(uint8_t bits) {
    if (a.led_bits == bits) return;
    a.led_bits = bits;
    led_drive();
}

static void auto_disable(void) {
    a.auto_enabled = false;
    thermal_apply(0u);
}

static bool auto_enable(const char *command, uint32_t now) {
    if (!a.armed) { set_note(NOTE_ARM, now); error(command, "not_armed"); return false; }
    if (!a.map_confirmed) { set_note(NOTE_MAP, now); error(command, "map_unconfirmed"); return false; }
    if (!sensor_valid(now)) { set_note(NOTE_SENSOR, now); error(command, "aht_invalid"); return false; }
    thermal_apply(0u);
    a.fault = FAULT_NONE;
    a.auto_enabled = true;
    return true;
}

static bool pump_toggle(const char *command, uint32_t now) {
    if (a.relay[a.map[0]]) {
        pump_apply(false, now);
        return true;
    }
    if (!a.armed) { set_note(NOTE_ARM, now); error(command, "not_armed"); return false; }
    if (!a.map_confirmed) { set_note(NOTE_MAP, now); error(command, "map_unconfirmed"); return false; }
    pump_apply(true, now);
    return true;
}

static void stop(uint32_t now) {
    a.auto_enabled = false;
    all_relays_off(now);
    a.led_auto = true;
    a.sim_temperature = false;
    a.sim_level = false;
    a.oled_pattern = false;
    a.oled_at = now - 250u;
    a.fault = FAULT_NONE;
    a.ui_mode = UI_HOME;
    a.page = 0u;
    a.ui_note = NOTE_NONE;
    /* A held OK must never restart a pump when stop returns to Home. */
    if (a.button[2].pressed || a.button[2].candidate) {
        a.ok_long_handled = true;
        a.ok_suppressed = true;
    }
}

static void configure_levels(void) {
    for (unsigned i = 0; i < 3u; ++i) {
        gpio_mode(PIN_LEVEL[i], (a.level_mask & (1u << i)) ?
                  GPIO_IN_PULL_UP : GPIO_IN_FLOAT);
        a.level_raw[i] = gpio_read(PIN_LEVEL[i]);
    }
}

static void relay_arm(bool active_high, uint32_t now) {
    a.auto_enabled = false;
    all_relays_off(now);
    for (unsigned i = 0; i < 3u; ++i)
        gpio_mode(PIN_RELAY[i], GPIO_IN_FLOAT);
    a.armed = false;
    a.relay_high = active_high;
    /* Seed all OFF ODR values while pins are inputs, then enable outputs. */
    for (unsigned i = 0; i < 3u; ++i)
        gpio_write(PIN_RELAY[i], !active_high);
    for (unsigned i = 0; i < 3u; ++i) {
        gpio_mode(PIN_RELAY[i], GPIO_OUT_PP);
        a.relay[i] = false;
    }
    a.armed = true;
}

static void append_status(size_t *position, const char *format, ...) {
    if (*position >= sizeof status_buffer - 1u) return;
    va_list args;
    va_start(args, format);
    int result = vfmt(status_buffer + *position,
                     sizeof status_buffer - *position, format, args);
    va_end(args);
    if (result > 0) {
        size_t available = sizeof status_buffer - 1u - *position;
        *position += (size_t)result < available ? (size_t)result : available;
    }
}

static void status_update(uint32_t now, bool transmit) {
    size_t p = 0u;
    bool any_output = a.relay[0] || a.relay[1] || a.relay[2];
    const char *mode = a.auto_enabled ? "AUTO" : (any_output ? "MANUAL" : "OFF");
    const char *thermal = a.relay[a.map[1]] ? "HEAT" :
                          (a.relay[a.map[2]] ? "COOL" : (a.auto_enabled ? "HOLD" : "IDLE"));
    append_status(&p, "STAT ms=%u auto=%u mode=%s thermal=%s fault=%s sim_t=%u sim_l=%u",
                  (unsigned)now, (unsigned)a.auto_enabled, mode, thermal,
                  fault_name(), (unsigned)a.sim_temperature, (unsigned)a.sim_level);
    append_status(&p, " t_centi=%d hw_t_centi=%d rh_centi=%u aht_valid=%u aht_state=%s aht_age_ms=%u aht_failures=%u",
                  (int)effective_temperature(), (int)a.temperature,
                  (unsigned)a.humidity, (unsigned)sensor_valid(now),
                  aht_state(now), (unsigned)aht_age(now), (unsigned)a.aht_failures);
    append_status(&p, " target_centi=%d hyst_centi=%d level_mask=%u level_polarity=%s raw_level=%u,%u,%u level=%s,%s,%s",
                  (int)a.target, (int)a.hysteresis, (unsigned)a.level_mask,
                  a.level_high ? "high" : "low", (unsigned)a.level_raw[0],
                  (unsigned)a.level_raw[1], (unsigned)a.level_raw[2],
                  level_name(0), level_name(1), level_name(2));
    append_status(&p, " lower_centi=%d upper_centi=%d menu=%s edit=%u selected=%s draft_centi=%d ui_note=%s level_state=%s level_wetmask=%u level_raw_wetmask=%u level_sim=%u",
                  (int)a.lower, (int)a.upper, ui_name(), (unsigned)(a.ui_mode == UI_EDIT),
                  item_name(), (int)a.draft, note_name(), level_state(),
                  (unsigned)level_wetmask(), (unsigned)level_raw_wetmask(),
                  (unsigned)a.sim_level);
    append_status(&p, " button_pressed=%u,%u,%u button_raw=%u,%u,%u armed=%u relay_active=%s map=%u,%u,%u map_ok=%u out=%u,%u,%u",
                  (unsigned)a.button[0].pressed, (unsigned)a.button[1].pressed,
                  (unsigned)a.button[2].pressed,
                  (unsigned)!gpio_read(PIN_BUTTON[0]),
                  (unsigned)!gpio_read(PIN_BUTTON[1]),
                  (unsigned)!gpio_read(PIN_BUTTON[2]), (unsigned)a.armed,
                  a.armed ? (a.relay_high ? "high" : "low") : "unknown",
                  (unsigned)a.map[0] + 1u, (unsigned)a.map[1] + 1u,
                  (unsigned)a.map[2] + 1u, (unsigned)a.map_confirmed,
                  (unsigned)a.relay[0], (unsigned)a.relay[1], (unsigned)a.relay[2]);
    append_status(&p, " relay_drive=%c,%c,%c relay_read=%u,%u,%u pump=%u pump_ms=%u pump_total_ms=%u pump_limit_ms=%u",
                  a.armed ? ((a.relay[0] ? a.relay_high : !a.relay_high) ? 'H' : 'L') : 'Z',
                  a.armed ? ((a.relay[1] ? a.relay_high : !a.relay_high) ? 'H' : 'L') : 'Z',
                  a.armed ? ((a.relay[2] ? a.relay_high : !a.relay_high) ? 'H' : 'L') : 'Z',
                  (unsigned)gpio_read(PIN_RELAY[0]),
                  (unsigned)gpio_read(PIN_RELAY[1]),
                  (unsigned)gpio_read(PIN_RELAY[2]),
                  (unsigned)a.relay[a.map[0]], (unsigned)pump_active_ms(now),
                  (unsigned)(a.pump_accumulated + pump_active_ms(now)),
                  (unsigned)a.pump_limit);
    append_status(&p, " web_epoch=%u u2_rx=%u u2_tx=%u u2_rxdrop=%u u2_txdrop=%u u2_seq=%u u2_err=%u",
                  (unsigned)a.web_epoch, (unsigned)uart2_rx_bytes(), (unsigned)uart2_tx_bytes(),
                  (unsigned)uart2_rx_dropped(), (unsigned)uart2_tx_dropped(),
                  (unsigned)a.uart2_sequence, (unsigned)a.uart2_errors);
    append_status(&p, " led_bits=%u led_mode=%s led_polarity=%s oled_ok=%u oled_addr=%u page=%u rx_dropped=%u",
                  (unsigned)a.led_bits, "liquid",
                  a.led_high ? "high" : "low", (unsigned)a.oled_ok,
                  (unsigned)oled_address(), (unsigned)a.page,
                  (unsigned)uart_rx_dropped());
    copy_debug(debug_status, sizeof debug_status, status_buffer);
    if (transmit) {
        uart_write(status_buffer);
        uart_write("\r\n");
    }
}

static void aht_failed(void) {
    a.aht_waiting = false;
    a.aht_initialized = false;
    a.aht_failed = true;
    ++a.aht_failures;
}

static void sensor_poll(uint32_t now) {
    if (a.aht_waiting) {
        int32_t temperature;
        uint32_t humidity;
        aht_result_t result = aht_poll(&temperature, &humidity);
        if (result == AHT_OK) {
            a.temperature = temperature;
            a.humidity = humidity;
            a.aht_has_sample = true;
            a.aht_failed = false;
            a.aht_good_at = now;
            a.aht_waiting = false;
        } else if (result == AHT_ERROR || elapsed(now, a.aht_started_at, 500u)) {
            aht_failed();
        }
    }
    if (!a.aht_waiting && elapsed(now, a.aht_attempt_at, 2000u)) {
        a.aht_attempt_at = now;
        if (!a.aht_initialized) a.aht_initialized = aht_init();
        if (!a.aht_initialized || !aht_start()) {
            aht_failed();
        } else {
            a.aht_waiting = true;
            a.aht_started_at = now;
        }
    }
}

static void control_poll(uint32_t now) {
    if (a.auto_enabled) {
        if (!sensor_valid(now)) {
            a.fault = a.aht_failed ? FAULT_AHT_ERROR : FAULT_AHT_STALE;
            auto_disable();
            set_note(NOTE_SENSOR, now);
            error("auto", fault_name());
        } else {
            int32_t temperature = effective_temperature();
            unsigned desired = 0u;
            if (temperature < a.lower) desired = 1u;
            else if (temperature > a.upper) desired = 2u;
            thermal_apply(desired);
        }
    }
    if (a.relay[a.map[0]] && elapsed(now, a.pump_started, a.pump_limit)) {
        pump_apply(false, now);
        a.fault = FAULT_PUMP_LIMIT;
        set_note(NOTE_PUMP_LIMIT, now);
        error("pump", "limit");
    }
    uint8_t wet = level_wetmask();
    if (!a.sim_level && a.level_mask != 7u) led_apply(0u);
    else if (wet == 4u) led_apply(2u);
    else if (wet == 6u) led_apply(4u);
    else led_apply(1u); /* EMPTY, FULL and invalid ordering are distinct on OLED. */
}

static void ui_go(ui_mode_t mode, uint32_t now) {
    a.ui_mode = mode;
    a.oled_pattern = false;
    a.page = mode == UI_STATUS ? 1u : 0u;
    a.oled_at = now - 250u;
}

static void ui_enter_menu(uint32_t now) {
    a.selected = ITEM_LOW;
    set_note(NOTE_NONE, now);
    ui_go(UI_MENU, now);
}

static void ui_move(bool up, uint32_t now) {
    if (a.ui_mode == UI_HOME) {
        ui_enter_menu(now);
    } else if (a.ui_mode == UI_MENU) {
        a.selected = (menu_item_t)((a.selected + (up ? ITEM_COUNT - 1u : 1u)) % ITEM_COUNT);
        set_note(NOTE_NONE, now);
    } else if (a.ui_mode == UI_EDIT) {
        int32_t next = a.draft + (up ? 50 : -50);
        if (next < -4000 || next > 8500) set_note(NOTE_LIMIT, now);
        else { a.draft = next; set_note(NOTE_NONE, now); }
    } else if (a.ui_mode == UI_STATUS) {
        a.page = a.page == 1u ? 2u : 1u;
        a.oled_at = now - 250u;
    }
}

static void ui_short_ok(uint32_t now) {
    if (a.ui_mode == UI_HOME) {
        if (pump_toggle("button_pump", now))
            reply("ACK cmd=button_pump on=%u", (unsigned)a.relay[a.map[0]]);
    } else if (a.ui_mode == UI_EDIT) {
        int32_t lower = a.selected == ITEM_LOW ? a.draft : a.lower;
        int32_t upper = a.selected == ITEM_HIGH ? a.draft : a.upper;
        if (!range_valid(lower, upper)) {
            set_note(NOTE_RANGE, now);
            error("menu", "bad_range");
        } else {
            range_store(lower, upper);
            ui_go(UI_MENU, now);
            set_note(NOTE_SAVED, now);
            reply("ACK cmd=menu field=%s centi=%d", item_name(), (int)a.draft);
        }
    } else if (a.ui_mode == UI_MENU) {
        switch (a.selected) {
        case ITEM_LOW: case ITEM_HIGH:
            a.draft = a.selected == ITEM_LOW ? a.lower : a.upper;
            set_note(NOTE_NONE, now);
            ui_go(UI_EDIT, now);
            break;
        case ITEM_AUTO:
            if (a.auto_enabled) {
                auto_disable();
                set_note(NOTE_SAVED, now);
                reply("ACK cmd=button_auto on=0");
            } else if (auto_enable("button_auto", now)) {
                set_note(NOTE_SAVED, now);
                reply("ACK cmd=button_auto on=1");
            }
            break;
        case ITEM_PUMP:
            if (pump_toggle("button_pump", now)) {
                set_note(NOTE_SAVED, now);
                reply("ACK cmd=button_pump on=%u", (unsigned)a.relay[a.map[0]]);
            }
            break;
        case ITEM_LEVEL: ui_go(UI_LEVEL, now); break;
        case ITEM_STATUS: ui_go(UI_STATUS, now); break;
        default: ui_go(UI_HOME, now); set_note(NOTE_NONE, now); break;
        }
    } else {
        ui_go(UI_MENU, now);
        set_note(NOTE_NONE, now);
    }
}

static void ui_long_ok(uint32_t now) {
    a.ok_long_handled = true;
    if (a.ui_mode == UI_HOME) ui_enter_menu(now);
    else if (a.ui_mode == UI_EDIT) {
        ui_go(UI_MENU, now);
        set_note(NOTE_CANCELLED, now);
    } else {
        ui_go(UI_HOME, now);
        set_note(NOTE_NONE, now);
    }
}

static void buttons_poll(uint32_t now) {
    for (unsigned i = 0; i < 3u; ++i) {
        button_t *button = &a.button[i];
        bool pressed = !gpio_read(PIN_BUTTON[i]);
        if (pressed != button->candidate) {
            button->candidate = pressed;
            button->changed_at = now;
        }
        if (button->pressed == button->candidate ||
            !elapsed(now, button->changed_at, 30u)) continue;
        button->pressed = button->candidate;
        if (i < 2u && button->pressed) ui_move(i == 0u, now);
        else if (i == 2u) {
            if (button->pressed) {
                a.ok_pressed_at = button->changed_at;
                a.ok_long_handled = a.ok_suppressed;
            } else {
                if (!a.ok_long_handled && elapsed(button->changed_at, a.ok_pressed_at, 800u))
                    ui_long_ok(now);
                if (!a.ok_long_handled) ui_short_ok(now);
                a.ok_long_handled = false;
                a.ok_suppressed = false;
            }
        }
    }
    /* Raw release time is used so release debounce cannot turn a short press long. */
    if (a.button[2].pressed && a.button[2].candidate && !a.ok_long_handled &&
        elapsed(now, a.ok_pressed_at, 800u)) ui_long_ok(now);
    if (!a.button[2].pressed && !a.button[2].candidate) a.ok_suppressed = false;
}

static void fixed_centi(char *text, size_t capacity, int32_t value) {
    uint32_t magnitude = value < 0 ? 0u - (uint32_t)value : (uint32_t)value;
    fmt(text, capacity, "%s%u.%02u", value < 0 ? "-" : "",
        (unsigned)(magnitude / 100u), (unsigned)(magnitude % 100u));
}

static void display_line(uint8_t row, const char *format, ...) {
    char text[48];
    va_list args;
    va_start(args, format);
    vfmt(text, sizeof text, format, args);
    va_end(args);
    oled_text(row, 0, text);
}

static void display_poll(uint32_t now) {
    if (!a.oled_ok) {
        if (!elapsed(now, a.oled_retry_at, 5000u)) return;
        a.oled_retry_at = now;
        a.oled_ok = oled_init();
        if (!a.oled_ok) return;
        if (a.oled_pattern) a.oled_ok = oled_test_pattern(a.pattern);
    }
    /* Never overwrite a queued snapshot. UI changes keep oled_at expired until
     * the current frame finishes, then the latest view is rendered. */
    if (a.oled_pattern || oled_refresh_busy() || !elapsed(now, a.oled_at, 250u)) return;
    a.oled_at = now;
    char temperature[16], humidity[16], lower[16], upper[16], draft[16];
    bool sim = a.sim_temperature || a.sim_level;
    const char *prefix = sim ? "SIM " : "";
    fixed_centi(temperature, sizeof temperature, effective_temperature());
    fixed_centi(humidity, sizeof humidity, (int32_t)a.humidity);
    fixed_centi(lower, sizeof lower, a.lower);
    fixed_centi(upper, sizeof upper, a.upper);
    fixed_centi(draft, sizeof draft, a.draft);
    oled_clear();
    if (a.ui_mode == UI_HOME) {
        if (a.ui_note >= NOTE_RANGE && !elapsed(now, a.ui_note_at, 2000u))
            display_line(0, "%s%s", prefix, note_text());
        else if (!sensor_valid(now)) display_line(0, "%sTemp:ERR", prefix);
        else display_line(0, "%sTemp:%s C", prefix, temperature);
        if (!sensor_valid(now)) display_line(1, "Humidity:ERR");
        else display_line(1, "Humidity:%s%%", humidity);
        display_line(2, "%s T:%c M:%c B:%c", level_state(), level_char(0), level_char(1), level_char(2));
        if (a.auto_enabled && !a.relay[a.map[1]] && !a.relay[a.map[2]])
            display_line(3, "HOLD:HEAT/COOL OFF");
        else display_line(3, "Heat:%s Cool:%s", a.relay[a.map[1]] ? "ON" : "OFF",
                          a.relay[a.map[2]] ? "ON" : "OFF");
        display_line(4, "Pump:%s Auto:%s", a.relay[a.map[0]] ? "ON" : "OFF",
                     a.auto_enabled ? "ON" : "OFF");
        display_line(5, "Up:%us", (unsigned)(now / 1000u));
        display_line(6, "P:%us Sum:%us", (unsigned)(pump_active_ms(now) / 1000u),
                     (unsigned)((a.pump_accumulated + pump_active_ms(now)) / 1000u));
        display_line(7, "Lo:%s Hi:%s", lower, upper);
    } else if (a.ui_mode == UI_MENU) {
        if (a.ui_note == NOTE_NONE) display_line(0, "%sMENU", prefix);
        else if (a.ui_note == NOTE_SAVED) display_line(0, "%sMENU SAVED", prefix);
        else display_line(0, "%s%s", prefix, note_text());
        display_line(1, "%cLOW:%s C", a.selected == ITEM_LOW ? '>' : ' ', lower);
        display_line(2, "%cHIGH:%s C", a.selected == ITEM_HIGH ? '>' : ' ', upper);
        display_line(3, "%cAUTO:%s", a.selected == ITEM_AUTO ? '>' : ' ', a.auto_enabled ? "ON" : "OFF");
        display_line(4, "%cPUMP:%s", a.selected == ITEM_PUMP ? '>' : ' ', a.relay[a.map[0]] ? "ON" : "OFF");
        display_line(5, "%cLEVEL", a.selected == ITEM_LEVEL ? '>' : ' ');
        display_line(6, "%cSTATUS", a.selected == ITEM_STATUS ? '>' : ' ');
        display_line(7, "%cBACK", a.selected == ITEM_BACK ? '>' : ' ');
    } else if (a.ui_mode == UI_EDIT) {
        display_line(0, "%sEDIT %s", prefix, item_name());
        display_line(1, "DRAFT:%s C", draft);
        display_line(2, "LOW:%s C", lower);
        display_line(3, "HIGH:%s C", upper);
        display_line(4, "STEP:0.50 C");
        display_line(5, "UP:+ DOWN:-");
        display_line(6, "OK:SAVE HOLD:CANCEL");
        display_line(7, "%s", (a.ui_note == NOTE_RANGE || a.ui_note == NOTE_LIMIT) ?
                     note_text() : "LOW < HIGH REQUIRED");
    } else if (a.ui_mode == UI_LEVEL) {
        display_line(0, "%sLEVEL", prefix);
        display_line(1, "STATE:%s", level_state());
        display_line(2, "TOP:%s", level_name(0));
        display_line(3, "MIDDLE:%s", level_name(1));
        display_line(4, "BOTTOM:%s", level_name(2));
        display_line(5, "LED:%s", a.led_bits == 1u ? "RED" :
                     (a.led_bits == 2u ? "YELLOW" : (a.led_bits == 4u ? "GREEN" : "OFF")));
        display_line(6, "%s", a.sim_level ? "SIM:VIRTUAL 3 POINTS" :
                     (a.level_mask == 7u ? "TOP/MIDDLE/BOTTOM" : "INPUTS MISSING"));
        display_line(7, "OK:MENU HOLD:HOME");
    } else if (a.page == 1u) {
        display_line(0, "%sSTATUS 1/2", prefix);
        display_line(1, "AHT:%s OLED:%u", aht_state(now), (unsigned)oled_address());
        display_line(2, "P/H/C:%u/%u/%u %s", (unsigned)a.map[0] + 1u,
                     (unsigned)a.map[1] + 1u, (unsigned)a.map[2] + 1u,
                     a.map_confirmed ? "OK" : "?");
        if (!a.armed) display_line(3, "RELAY:Z/Z/Z UNARMED");
        else display_line(3, "R:%u%u%u ACTIVE:%c", (unsigned)a.relay[0],
                          (unsigned)a.relay[1], (unsigned)a.relay[2], a.relay_high ? 'H' : 'L');
        display_line(4, "RAW:%u/%u/%u BTN:%u/%u/%u", (unsigned)a.level_raw[0],
                     (unsigned)a.level_raw[1], (unsigned)a.level_raw[2],
                     (unsigned)a.button[0].pressed, (unsigned)a.button[1].pressed,
                     (unsigned)a.button[2].pressed);
        display_line(5, "MASK:%u WET:%s", (unsigned)a.level_mask, a.level_high ? "HIGH" : "LOW");
        display_line(6, "FAULT:%s", fault_name());
        display_line(7, "OK:MENU HOLD:HOME");
    } else {
        display_line(0, "%sSTATUS 2/2", prefix);
        display_line(1, "UP:%us", (unsigned)(now / 1000u));
        display_line(2, "PUMP RUN:%us", (unsigned)(pump_active_ms(now) / 1000u));
        display_line(3, "PUMP SUM:%us", (unsigned)((a.pump_accumulated + pump_active_ms(now)) / 1000u));
        display_line(4, "PUMP LIMIT:%us", (unsigned)(a.pump_limit / 1000u));
        display_line(5, "LOW:%s C", lower);
        display_line(6, "HIGH:%s C", upper);
        display_line(7, "OK:MENU HOLD:HOME");
    }
    a.oled_ok = oled_refresh_begin();
    if (!a.oled_ok) a.oled_retry_at = now;
}

static void scan_poll(uint32_t now) {
    if (!a.scanning || !elapsed(now, a.scan_at, 2u)) return;
    a.scan_at = now;
    const soft_i2c_t *bus = a.scan_bus ? &BUS_AHT : &BUS_OLED;
    if (i2c_probe(bus, a.scan_address)) {
        ++a.scan_found[a.scan_bus];
        uart_printf("I2C bus=%s addr=%u\r\n", a.scan_bus ? "aht" : "oled",
                    (unsigned)a.scan_address);
    }
    if (++a.scan_address > 0x77u) {
        a.scan_address = 3u;
        if (++a.scan_bus == 2u) {
            a.scanning = false;
            uart_printf("SCAN_DONE oled_found=%u aht_found=%u\r\n",
                        (unsigned)a.scan_found[0], (unsigned)a.scan_found[1]);
        }
    }
}

static unsigned split(char *line, char **tokens, unsigned capacity) {
    unsigned count = 0u;
    while (*line) {
        while (*line == ' ' || *line == '\t' || *line == '\r' || *line == '\n') ++line;
        if (!*line) break;
        if (count == capacity) return capacity + 1u;
        tokens[count++] = line;
        while (*line && *line != ' ' && *line != '\t' && *line != '\r' && *line != '\n') ++line;
        if (*line) *line++ = 0;
    }
    return count;
}

static bool parse_polarity(const char *text, bool *high) {
    if (text_eq(text, "high")) { *high = true; return true; }
    if (text_eq(text, "low")) { *high = false; return true; }
    return false;
}

static void uart2_reply(const char *format, ...) {
    char line[256];
    va_list args;
    va_start(args, format);
    vfmt(line, sizeof line - 2u, format, args);
    va_end(args);
    size_t n = text_len(line);
    line[n++] = '\r';
    line[n++] = '\n';
    line[n] = 0;
    uart2_write(line);
}

static void uart2_error(const char *code) {
    ++a.uart2_errors;
    uart2_reply("ERR uart=USART2 fw=" APP_FW_VERSION " read_only=0 code=%s", code);
}

static bool prefix_is(const char *text, const char *prefix) {
    while (*prefix) if (*text++ != *prefix++) return false;
    return true;
}

static bool printable_payload(const char *text, bool allow_space) {
    size_t length = text_len(text);
    if (!length || length > 154u) return false;
    for (size_t i = 0u; i < length; ++i) {
        unsigned char c = (unsigned char)text[i];
        if (c < (allow_space ? 32u : 33u) || c > 126u) return false;
    }
    return true;
}

typedef enum { UART2_NO_STATUS, UART2_BARE_STATUS, UART2_WEB_STATUS } uart2_action_t;
static void command(char *line, uint32_t now);

static bool decimal_i31(const char *text, uint32_t *value) {
    uint32_t parsed = 0u;
    if (!*text) return false;
    for (; *text; ++text) {
        if (*text < '0' || *text > '9') return false;
        uint32_t digit = (uint32_t)(*text - '0');
        if (parsed > (2147483647u - digit) / 10u) return false;
        parsed = parsed * 10u + digit;
    }
    if (!parsed) return false;
    *value = parsed;
    return true;
}

static void web_uncached_error(uint32_t id, const char *code) {
    ++a.uart2_errors;
    uart2_reply("R %u ERR code=%s", (unsigned)id, code);
}

/* Cache the complete wire response, including CRLF. No asynchronous app reply
 * can be routed here: capturing is limited to the synchronous command call. */
static void web_cache_reply(bool failed, const char *format, ...) {
    va_list args;
    va_start(args, format);
    int needed = vfmt(web_cache.response, sizeof web_cache.response - 2u, format, args);
    va_end(args);
    if (needed < 0 || (size_t)needed >= sizeof web_cache.response - 2u) {
        failed = true;
        fmt(web_cache.response, sizeof web_cache.response - 2u,
            "R %u ERR code=response_too_long", (unsigned)web_cache.id);
    }
    web_cache.failed = failed;
    if (failed) ++a.uart2_errors;
    size_t n = text_len(web_cache.response);
    web_cache.response[n++] = '\r';
    web_cache.response[n++] = '\n';
    web_cache.response[n] = 0;
    uart2_write(web_cache.response);
}

static const char *web_validate(char *payload, uint32_t *epoch) {
    for (const char *p = payload; *p; ++p) {
        unsigned char c = (unsigned char)*p;
        if (c < 32u || c > 126u ||
            (c == ' ' && (p == payload || p[1] == ' ' || !p[1]))) return "bad_args";
    }
    char *tokens[4];
    unsigned n = split(payload, tokens, 4u);
    if (!n) return "bad_args";
    const char *cmd = tokens[0];
    if (text_eq(cmd, "hello")) {
        if (n != 2u) return "bad_args";
        return decimal_i31(tokens[1], epoch) ? NULL : "bad_epoch";
    }
    if (text_eq(cmd, "info") || text_eq(cmd, "status") || text_eq(cmd, "stop"))
        return n == 1u ? NULL : "bad_args";
    if (text_eq(cmd, "range")) {
        int32_t lower, upper;
        if (n != 3u) return "bad_args";
        return parse_i32(tokens[1], &lower) && parse_i32(tokens[2], &upper) &&
               range_valid(lower, upper) ? NULL : "bad_range";
    }
    if (text_eq(cmd, "auto") || text_eq(cmd, "heat") || text_eq(cmd, "cool"))
        return n == 2u && (text_eq(tokens[1], "on") || text_eq(tokens[1], "off")) ?
               NULL : "bad_args";
    if (text_eq(cmd, "pump")) {
        int32_t seconds;
        if (n == 2u && (text_eq(tokens[1], "on") || text_eq(tokens[1], "off"))) return NULL;
        return n == 3u && text_eq(tokens[1], "limit") && parse_i32(tokens[2], &seconds) &&
               seconds >= 1 && seconds <= 300 ? NULL : "bad_args";
    }
    return "forbidden";
}

static uart2_action_t web_request(const char *line, uint32_t now) {
    if (!prefix_is(line, "W ")) {
        web_uncached_error(0u, "bad_request");
        return UART2_NO_STATUS;
    }
    const char *p = line + 2;
    uint32_t id = 0u;
    if (*p < '0' || *p > '9') {
        web_uncached_error(0u, "invalid_id");
        return UART2_NO_STATUS;
    }
    while (*p >= '0' && *p <= '9') {
        uint32_t digit = (uint32_t)(*p++ - '0');
        if (id > (2147483647u - digit) / 10u) {
            web_uncached_error(0u, "invalid_id");
            return UART2_NO_STATUS;
        }
        id = id * 10u + digit;
    }
    if (!id) {
        web_uncached_error(0u, "invalid_id");
        return UART2_NO_STATUS;
    }
    if (*p != ' ') {
        web_uncached_error(id, "bad_request");
        return UART2_NO_STATUS;
    }
    const char *payload = p + 1;
    if (text_len(line) >= APP_COMMAND_CAPACITY) {
        web_uncached_error(id, "too_long");
        return UART2_NO_STATUS;
    }
    if (web_cache.valid && web_cache.id == id) {
        if (!text_eq(web_cache.payload, payload)) web_uncached_error(id, "id_conflict");
        else {
            if (web_cache.failed) ++a.uart2_errors;
            uart2_write(web_cache.response);
        }
        return UART2_NO_STATUS;
    }
    web_cache.id = id;
    web_cache.valid = true;
    web_cache.failed = false;
    copy_debug(web_cache.payload, sizeof web_cache.payload, payload);
    web_cache.response[0] = 0;
    char parsed[APP_COMMAND_CAPACITY];
    copy_debug(parsed, sizeof parsed, payload);
    uint32_t epoch = 0u;
    const char *invalid = web_validate(parsed, &epoch);
    if (invalid) {
        web_cache_reply(true, "R %u ERR code=%s", (unsigned)id, invalid);
    } else if (text_eq(payload, "status")) {
        return UART2_WEB_STATUS;
    } else if (text_eq(payload, "info") || prefix_is(payload, "hello ")) {
        if (prefix_is(payload, "hello ")) a.web_epoch = epoch;
        web_cache_reply(false, "R %u INFO fw=" APP_FW_VERSION
            " proto=%u uart=USART2 baud=115200 read_only=0 target=STM32F103C8T6 sensor=AHT30 oled=SSD1306_128x64 epoch=%u",
            (unsigned)id, (unsigned)APP_UART2_PROTOCOL, (unsigned)a.web_epoch);
    } else {
        copy_debug(parsed, sizeof parsed, payload);
        web_ack[0] = 0;
        web_capturing_reply = true;
        command(parsed, now);
        web_capturing_reply = false;
        if (prefix_is(web_ack, "ACK "))
            web_cache_reply(false, "R %u OK %s", (unsigned)id, web_ack);
        else if (prefix_is(web_ack, "ERR "))
            web_cache_reply(true, "R %u ERR %s", (unsigned)id, web_ack + 4);
        else web_cache_reply(true, "R %u ERR code=internal", (unsigned)id);
    }
    return UART2_NO_STATUS;
}

/* Bare diagnostics remain available. Every actuator request must have a valid
 * W envelope and pass the smaller web allowlist before the shared parser. */
static uart2_action_t uart2_command(const char *line, uint32_t now) {
    ++a.uart2_sequence;
    if (*line == 'W') return web_request(line, now);
    if (text_eq(line, "info")) {
        uart2_reply("INFO fw=" APP_FW_VERSION " uart=USART2 baud=115200 read_only=0 proto=%u sensor=AHT30 oled=SSD1306_128x64 epoch=%u",
                    (unsigned)APP_UART2_PROTOCOL, (unsigned)a.web_epoch);
    } else if (text_eq(line, "status")) {
        return UART2_BARE_STATUS;
    } else if (prefix_is(line, "ping ")) {
        const char *token = line + 5;
        if (!printable_payload(token, false)) uart2_error("invalid_token");
        else uart2_reply("PONG uart=USART2 fw=" APP_FW_VERSION " read_only=0 token=%s", token);
    } else if (prefix_is(line, "echo ")) {
        const char *text = line + 5;
        if (!printable_payload(text, true)) uart2_error("invalid_text");
        else uart2_reply("ECHO uart=USART2 fw=" APP_FW_VERSION " read_only=0 text=%s", text);
    } else if (text_eq(line, "ping")) {
        uart2_error("invalid_token");
    } else if (text_eq(line, "echo")) {
        uart2_error("invalid_text");
    } else {
        uart2_error("framed_required");
    }
    return UART2_NO_STATUS;
}

static void uart2_send_status(void) {
    char line[APP_WEB_RESPONSE_CAPACITY];
    fmt(line, sizeof line - 2u,
        "STAT uart=USART2 fw=" APP_FW_VERSION " read_only=0 %s", status_buffer + 5);
    size_t n = text_len(line);
    line[n++] = '\r';
    line[n++] = '\n';
    line[n] = 0;
    uart2_write(line);
}

static void command(char *line, uint32_t now) {
    char *token[8];
    unsigned n = split(line, token, 8u);
    if (!n) { error("parse", "empty"); return; }
    if (n > 8u) { error("parse", "too_many_args"); return; }
    const char *cmd = token[0];
    int32_t value;
    bool high;
    if (text_eq(cmd, "help") && n == 1u) {
        uart_write("CMDS help status info scan oled pattern 0..3|live; led auto|polarity high|low (liquid only)\r\n");
        uart_write("CMDS relay arm high|low; relay disarm; relay 1..3 on|off; map P H C|confirm; level mask 0..7|polarity high|low\r\n");
        uart_write("CMDS range lower upper; target centi; hyst centi; auto on|off; pump on|off|limit seconds; heat|cool on|off; sim temp centi|off; sim level mask 0..7|dry|wet|off; sim off; stop reboot\r\n");
        reply("ACK cmd=help");
    } else if (text_eq(cmd, "status") && n == 1u) {
        status_update(now, true);
        reply("ACK cmd=status");
    } else if (text_eq(cmd, "info") && n == 1u) {
        uart_write("INFO fw=" APP_FW_VERSION " target=STM32F103C8T6 clock_hz=8000000 uart=USART1 baud=115200 sensor=AHT30 oled=SSD1306_128x64\r\n");
        reply("ACK cmd=info");
    } else if (text_eq(cmd, "stop") && n == 1u) {
        stop(now);
        reply("ACK cmd=stop");
    } else if (text_eq(cmd, "reboot") && n == 1u) {
        stop(now);
        reply("ACK cmd=reboot");
        bsp_reboot();
    } else if (text_eq(cmd, "scan") && n == 1u) {
        if (a.scanning) { error(cmd, "busy"); return; }
        a.scanning = true;
        a.scan_bus = 0u;
        a.scan_address = 3u;
        a.scan_found[0] = a.scan_found[1] = 0u;
        a.scan_at = now - 2u;
        reply("ACK cmd=scan state=start");
    } else if (text_eq(cmd, "oled")) {
        if (n == 2u && text_eq(token[1], "live")) {
            ui_go(UI_HOME, now);
            set_note(NOTE_NONE, now);
            reply("ACK cmd=oled mode=live");
        } else if (n == 3u && text_eq(token[1], "pattern") &&
                   parse_i32(token[2], &value) && value >= 0 && value <= 3) {
            if (!a.oled_ok) a.oled_ok = oled_init();
            if (!a.oled_ok || !oled_test_pattern((uint8_t)value)) {
                a.oled_ok = false;
                a.oled_retry_at = now;
                error(cmd, "not_connected");
                return;
            }
            a.pattern = (uint8_t)value;
            a.oled_pattern = true;
            reply("ACK cmd=oled pattern=%u", (unsigned)value);
        } else error(cmd, "bad_args");
    } else if (text_eq(cmd, "led")) {
        if (n == 3u && text_eq(token[1], "polarity") && parse_polarity(token[2], &high)) {
            uint8_t previous = a.led_bits;
            led_apply(0u);
            a.led_high = high;
            a.led_bits = previous;
            led_drive();
            reply("ACK cmd=led polarity=%s", high ? "high" : "low");
        } else if (n == 2u && text_eq(token[1], "auto")) {
            a.led_auto = true;
            reply("ACK cmd=led mode=liquid");
        } else if (n == 2u && (text_eq(token[1], "R") || text_eq(token[1], "r") ||
                   text_eq(token[1], "Y") || text_eq(token[1], "y") ||
                   text_eq(token[1], "G") || text_eq(token[1], "g") ||
                   text_eq(token[1], "off") || text_eq(token[1], "test"))) {
            error(cmd, "liquid_indicator_only");
        } else error(cmd, "bad_args");
    } else if (text_eq(cmd, "relay")) {
        if (n == 3u && text_eq(token[1], "arm") && parse_polarity(token[2], &high)) {
            relay_arm(high, now);
            reply("ACK cmd=relay armed=1 active=%s", high ? "high" : "low");
        } else if (n == 2u && text_eq(token[1], "disarm")) {
            a.auto_enabled = false;
            all_relays_off(now);
            for (unsigned i = 0; i < 3u; ++i) gpio_mode(PIN_RELAY[i], GPIO_IN_FLOAT);
            a.armed = false;
            reply("ACK cmd=relay armed=0");
        } else if (n == 3u && parse_i32(token[1], &value) && value >= 1 && value <= 3 &&
                   (text_eq(token[2], "on") || text_eq(token[2], "off"))) {
            if (!a.armed) { error(cmd, "not_armed"); return; }
            unsigned index = (unsigned)value - 1u;
            bool on = text_eq(token[2], "on");
            if (index == a.map[0]) pump_apply(on, now);
            else {
                a.auto_enabled = false;
                if (on) thermal_apply(index == a.map[1] ? 1u : 2u);
                else relay_apply(index, false);
            }
            reply("ACK cmd=relay channel=%u on=%u", (unsigned)value, (unsigned)on);
        } else error(cmd, "bad_args");
    } else if (text_eq(cmd, "map")) {
        if (n == 2u && text_eq(token[1], "confirm")) {
            a.map_confirmed = true;
            reply("ACK cmd=map confirmed=1");
        } else if (n == 4u) {
            int32_t mapped[3];
            for (unsigned i = 0; i < 3u; ++i) {
                if (!parse_i32(token[i + 1u], &mapped[i]) || mapped[i] < 1 || mapped[i] > 3) {
                    error(cmd, "bad_args"); return;
                }
            }
            if (mapped[0] == mapped[1] || mapped[0] == mapped[2] || mapped[1] == mapped[2]) {
                error(cmd, "duplicate_channel"); return;
            }
            a.auto_enabled = false;
            all_relays_off(now);
            for (unsigned i = 0; i < 3u; ++i) a.map[i] = (uint8_t)(mapped[i] - 1);
            a.map_confirmed = true;
            reply("ACK cmd=map pump=%u heat=%u cool=%u confirmed=1",
                  (unsigned)mapped[0], (unsigned)mapped[1], (unsigned)mapped[2]);
        } else error(cmd, "bad_args");
    } else if (text_eq(cmd, "level")) {
        if (n == 3u && text_eq(token[1], "mask") && parse_i32(token[2], &value) && value >= 0 && value <= 7) {
            a.level_mask = (uint8_t)value;
            configure_levels();
            reply("ACK cmd=level mask=%u", (unsigned)value);
        } else if (n == 3u && text_eq(token[1], "polarity") && parse_polarity(token[2], &high)) {
            a.level_high = high;
            reply("ACK cmd=level polarity=%s", high ? "high" : "low");
        } else error(cmd, "bad_args");
    } else if (text_eq(cmd, "range") && n == 3u) {
        int32_t lower, upper;
        if (!parse_i32(token[1], &lower) || !parse_i32(token[2], &upper) || !range_valid(lower, upper)) {
            error(cmd, "bad_range"); return;
        }
        range_store(lower, upper);
        set_note(NOTE_SAVED, now);
        reply("ACK cmd=range lower=%d upper=%d", (int)lower, (int)upper);
    } else if (text_eq(cmd, "target") && n == 2u && parse_i32(token[1], &value)) {
        int32_t lower = value >= -4000 && value <= 8500 ? value - a.hysteresis : -4001;
        int32_t upper = value >= -4000 && value <= 8500 ? value + a.hysteresis : -4001;
        if (!range_valid(lower, upper)) { error(cmd, "bad_range"); return; }
        range_store(lower, upper);
        set_note(NOTE_SAVED, now);
        reply("ACK cmd=target lower=%d upper=%d", (int)lower, (int)upper);
    } else if (text_eq(cmd, "hyst") && n == 2u && parse_i32(token[1], &value)) {
        if (value < 1 || value > 6250 || !range_valid(a.target - value, a.target + value)) {
            error(cmd, "bad_range"); return;
        }
        range_store(a.target - value, a.target + value);
        set_note(NOTE_SAVED, now);
        reply("ACK cmd=hyst lower=%d upper=%d", (int)a.lower, (int)a.upper);
    } else if (text_eq(cmd, "auto") && n == 2u) {
        if (text_eq(token[1], "off")) {
            auto_disable();
            reply("ACK cmd=auto on=0");
        } else if (text_eq(token[1], "on")) {
            if (auto_enable(cmd, now)) reply("ACK cmd=auto on=1");
        } else error(cmd, "bad_args");
    } else if ((text_eq(cmd, "heat") || text_eq(cmd, "cool")) && n == 2u &&
               (text_eq(token[1], "on") || text_eq(token[1], "off"))) {
        bool on = text_eq(token[1], "on");
        if (on && !a.armed) { error(cmd, "not_armed"); return; }
        if (on && !a.map_confirmed) { error(cmd, "map_unconfirmed"); return; }
        a.auto_enabled = false;
        unsigned role = text_eq(cmd, "heat") ? 1u : 2u;
        if (on) thermal_apply(role);
        else relay_apply(a.map[role], false);
        reply("ACK cmd=%s on=%u", cmd, (unsigned)on);
    } else if (text_eq(cmd, "pump")) {
        if (n == 3u && text_eq(token[1], "limit") && parse_i32(token[2], &value) && value >= 1 && value <= 300) {
            a.pump_limit = (uint32_t)value * 1000u;
            reply("ACK cmd=pump limit_s=%u", (unsigned)value);
        } else if (n == 2u && text_eq(token[1], "off")) {
            pump_apply(false, now);
            reply("ACK cmd=pump on=0");
        } else if (n == 2u && text_eq(token[1], "on")) {
            if (!a.armed) { error(cmd, "not_armed"); return; }
            if (!a.map_confirmed) { error(cmd, "map_unconfirmed"); return; }
            pump_apply(true, now);
            reply("ACK cmd=pump on=1");
        } else error(cmd, "bad_args");
    } else if (text_eq(cmd, "sim")) {
        if (n == 2u && text_eq(token[1], "off")) {
            a.sim_temperature = a.sim_level = false;
            reply("ACK cmd=sim enabled=0");
        } else if (n == 3u && text_eq(token[1], "temp")) {
            if (text_eq(token[2], "off")) {
                a.sim_temperature = false;
                reply("ACK cmd=sim temperature=0");
            } else if (parse_i32(token[2], &value) && value >= -4000 && value <= 8500) {
                a.simulated_temperature = value;
                a.sim_temperature = true;
                reply("ACK cmd=sim temperature=1 centi=%d", (int)value);
            } else error(cmd, "bad_args");
        } else if (n == 4u && text_eq(token[1], "level") && text_eq(token[2], "mask") &&
                   parse_i32(token[3], &value) && value >= 0 && value <= 7) {
            a.sim_level = true;
            a.simulated_wetmask = (uint8_t)value;
            reply("ACK cmd=sim level=1 wetmask=%u", (unsigned)value);
        } else if (n == 3u && text_eq(token[1], "level")) {
            if (text_eq(token[2], "off")) a.sim_level = false;
            else if (text_eq(token[2], "wet") || text_eq(token[2], "dry")) {
                a.sim_level = true;
                a.simulated_wetmask = text_eq(token[2], "wet") ? 7u : 0u;
            } else { error(cmd, "bad_args"); return; }
            reply("ACK cmd=sim level=%u", (unsigned)a.sim_level);
        } else error(cmd, "bad_args");
    } else error(cmd, "bad_args_or_unknown");
}

void app_init(void) {
    memset(&a, 0, sizeof a);
    memset(&web_cache, 0, sizeof web_cache);
    web_capturing_reply = false;
    web_ack[0] = 0;
    a.map[0] = 0u; a.map[1] = 1u; a.map[2] = 2u;
    a.level_mask = BOARD_LEVEL_MASK;
    a.led_high = true;
    a.led_auto = true;
    range_store(2500, 3000);
    a.draft = a.lower;
    a.pump_limit = 30000u;
    uint32_t now = millis();
    for (unsigned i = 0; i < 3u; ++i) {
        gpio_mode(PIN_RELAY[i], GPIO_IN_FLOAT);
        gpio_write(*led_pin[i], false);
        gpio_mode(*led_pin[i], GPIO_OUT_PP);
        gpio_mode(PIN_BUTTON[i], GPIO_IN_PULL_UP);
        a.button[i].candidate = !gpio_read(PIN_BUTTON[i]);
        a.button[i].changed_at = now;
    }
    if (BOARD_RELAYS_VERIFIED) {
        relay_arm(BOARD_RELAY_ACTIVE_HIGH != 0, now);
        a.map_confirmed = true;
    }
    configure_levels();
    a.oled_ok = oled_init();
    a.aht_initialized = aht_init();
    a.aht_failed = !a.aht_initialized;
    a.aht_attempt_at = now - 2000u;
    a.oled_at = now - 250u;
    a.oled_retry_at = now;
    a.telemetry_at = now;
    debug_request = debug_response = 0u;
    debug_command[0] = 0;
    copy_debug(debug_reply, sizeof debug_reply,
               a.armed ? "BOOT relay=armed auto=off" : "BOOT relay=unarmed auto=off");
    uart_printf("BOOT fw=" APP_FW_VERSION " relay=%s auto=off level_mask=%u\r\n",
                a.armed ? "armed" : "unarmed", (unsigned)a.level_mask);
    status_update(millis(), true);
}

void app_poll(void) {
    uint32_t now = millis();
    sensor_poll(now);
    for (unsigned i = 0; i < 3u; ++i) a.level_raw[i] = gpio_read(PIN_LEVEL[i]);
    buttons_poll(now);
    char line[APP_COMMAND_CAPACITY];
    if (uart_read_line(line, sizeof line)) command(line, now);
    uart2_action_t uart2_action = UART2_NO_STATUS;
    bool uart2_received = uart2_read_line(line, sizeof line);
    if (uart2_received) uart2_action = uart2_command(line, now);
    uint32_t request = debug_request;
    bool mailbox = request != debug_response;
    if (mailbox) {
        size_t i = 0u;
        for (; i < sizeof line; ++i) {
            line[i] = debug_command[i];
            if (!line[i]) break;
        }
        if (i == sizeof line) error("mailbox", "unterminated");
        else if (!i) error("mailbox", "empty");
        else command(line, now);
    }
    control_poll(now);
    /* One small OLED transfer per loop; button and control polling take priority. */
    if (!oled_refresh_step()) {
        a.oled_ok = false;
        a.oled_retry_at = now;
    }
    display_poll(now);
    scan_poll(now);
    if (elapsed(now, a.telemetry_at, 1000u)) {
        a.telemetry_at = now;
        status_update(now, true);
    } else if (mailbox || uart2_received) status_update(now, false);
    if (uart2_action == UART2_BARE_STATUS) uart2_send_status();
    else if (uart2_action == UART2_WEB_STATUS)
        web_cache_reply(false, "R %u STAT %s", (unsigned)web_cache.id, status_buffer + 5);
    if (mailbox) debug_response = request;
}
