#include <Arduino.h>
#include <WiFi.h>
#include <WebServer.h>
#include <esp_log.h>
#include <esp_system.h>

#include "protocol.h"
#include "display_temperature.h"
#include "web_assets.h"
#include "control_runtime.h"

namespace {
using tankweb::Frame;
using tankweb::Command;
using tankweb::Status;
using tankweb::quote;

constexpr char kFirmware[] = "tankweb-1.15";
constexpr char kUiVersion[] = "tank-web-ui-1.15";
constexpr char kSsid[] = "TankLab-ESP32";
constexpr char kPassword[] = "tanklab2026";
constexpr uint32_t kBaud = 115200;
constexpr uint32_t kPollMs = 500;
constexpr uint32_t kStaleMs = 1500;
constexpr uint32_t kReplyMs = 800;
constexpr uint32_t kConfirmMs = 800;
constexpr uint32_t kRetryInfoMs = 1000;
// Keep the deployed STM32 unchanged. Its native COOL drives the actual
// heater CH3; native HEAT drives the actual cooler CH2.
constexpr char kThermalRelayMap[] = "1,2,3";

WebServer server(80);
Status status;
tankweb::DisplayTemperature displayTemperature(tankweb::DisplayTemperature::SMOOTH);
tankweb::LineReader reader;
tankweb::ClockMonitor remoteClock;
tankweb::SessionGate session;
bool compatible = false;
bool hasStatus = false;
bool awaitingFreshStatus = false;
uint32_t lastStatusAt = 0, lastPollAt = 0, nextInfoAt = 0;
uint32_t bootEpoch = 0, nextId = 1, webEpoch = 0;
uint32_t malformedFrames = 0, unmatchedFrames = 0, unmatchedErrors = 0;
uint32_t logDropped = 0, canceledCommands = 0;
std::string errorCode, errorMessage, lastUnmatched;
std::string remoteFirmware;
uint32_t syncStarted = 0;
unsigned syncStage = 0;

enum TxKind { TX_NONE, TX_INFO, TX_STATUS, TX_CONTROL, TX_CONFIRM };
struct Transaction {
    TxKind kind = TX_NONE;
    uint32_t id = 0, started = 0;
} transaction;

struct Job {
    bool exists = false, pending = false, accepted = false, confirmed = false;
    bool internal = false, shutdown = false, starting = false, baseline = false;
    bool wireAccepted = false;
    uint32_t id = 0, created = 0, acceptedAt = 0, finished = 0;
    uint32_t wireId = 0;
    Command command, wireCommand;
    std::string ack, errorCode, errorMessage;
} job;
Job lastUserJob;
struct AutomaticState {
    bool enabled = false, needsOff = false, bootChecked = false;
    unsigned expected = 0;
    uint32_t retryOffAt = 0;
    std::string phase = "off", fault;
} automatic;

void completeJob(const std::string &code, const std::string &message);
void automaticPoll();
void log(const std::string &entry);

bool elapsed(uint32_t now, uint32_t then, uint32_t interval) {
    return static_cast<uint32_t>(now - then) >= interval;
}
bool due(uint32_t now, uint32_t deadline) {
    return static_cast<int32_t>(now - deadline) >= 0;
}
uint32_t allocateId() {
    uint32_t id = nextId++;
    if (nextId > INT32_MAX) nextId = 1;
    return id;
}
uint32_t randomId() {
    uint32_t value = esp_random() & 0x7fffffff;
    return value ? value : 1;
}
void rotateSession() {
    const char *hex = "0123456789abcdef";
    std::string candidate;
    do {
        candidate.clear();
        for (unsigned word = 0; word < 4; ++word) {
            uint32_t random = esp_random();
            for (unsigned nibble = 0; nibble < 8; ++nibble) candidate += hex[(random >> (nibble * 4)) & 15];
        }
    } while (!session.rotate(candidate));
}
bool online(uint32_t now) {
    return compatible && !awaitingFreshStatus && hasStatus && !elapsed(now, lastStatusAt, kStaleMs);
}
bool thermalDisplaySwapped() {
    return hasStatus && tankweb::text(status, "map") == "1,2,3";
}
bool thermalControlReady() {
    return hasStatus && remoteFirmware == "tankctrl-3.0" && tankweb::text(status, "map") == kThermalRelayMap &&
           tankweb::flag(status, "map_ok") && tankweb::flag(status, "armed");
}
unsigned thermalBits() {
    return (status.outputs[1] ? 1u : 0u) | (status.outputs[2] ? 2u : 0u);
}
bool automaticSampleValid(uint32_t now) {
    const uint64_t age = static_cast<uint64_t>(tankweb::number(status, "aht_age_ms", 5001)) +
        static_cast<uint32_t>(now - lastStatusAt);
    const auto displayed = displayTemperature.view();
    return displayed.available && displayed.fresh && online(now) && tankweb::flag(status, "aht_valid") &&
        tankweb::text(status, "aht_state") == "OK" && age <= 5000 &&
        !tankweb::flag(status, "sim_t") && !tankweb::flag(status, "sim_l");
}
unsigned automaticDesired() {
    const auto displayed = displayTemperature.view();
    if (!displayed.available || !displayed.fresh) return 0u;
    const int64_t temperature = displayed.centi;
    return temperature < tankweb::number(status, "lower_centi") ? 2u :
           temperature > tankweb::number(status, "upper_centi") ? 1u : 0u;
}
Command thermalCommand(unsigned bits) {
    Command command;
    command.kind = bits == 2 ? Command::COOL : bits == 1 ? Command::HEAT : Command::AUTO;
    command.action = bits == 2 ? "cool" : bits == 1 ? "heat" : "auto";
    command.enabled = bits != 0;
    command.wire = command.action + (command.enabled ? " on" : " off");
    return command;
}
void setWireCommand(const Command &command) {
    job.wireCommand = command;
    job.wireAccepted = false;
    job.wireId = allocateId();
    job.created = millis();
}
void automaticFault(const std::string &code) {
    if (automatic.phase != "fault" || automatic.fault != code) {
        log("{\"event\":\"automatic_fault\",\"reason\":" + quote(code) +
            ",\"esp_ms\":" + std::to_string(millis()) +
            ",\"status_age_ms\":" + std::to_string(static_cast<uint32_t>(millis() - lastStatusAt)) +
            ",\"aht_state\":" + quote(tankweb::text(status, "aht_state")) +
            ",\"aht_age_ms\":" + std::to_string(tankweb::number(status, "aht_age_ms", 5001)) +
            ",\"wire_command\":" + quote(job.wireCommand.wire) +
            ",\"link_error\":" + quote(errorCode) + "}");
    }
    automatic.enabled = false;
    automatic.phase = "fault";
    automatic.fault = code;
    automatic.needsOff = true;
    automatic.retryOffAt = millis();
}
std::string automaticJson() {
    return "{\"owner\":\"esp32\",\"enabled\":" + std::string(automatic.enabled ? "true" : "false") +
        ",\"phase\":" + quote(automatic.phase) + ",\"fault\":" +
        (automatic.fault.empty() ? "null" : quote(automatic.fault)) +
        ",\"shutdown_pending\":" + (automatic.needsOff ? "true" : "false") +
        ",\"measurement\":\"temperature_display\",\"native_auto\":" +
        (hasStatus && tankweb::flag(status, "auto") ? "true" : "false") + "}";
}
void updateDisplayTemperature() {
    const uint32_t now = millis();
    const uint64_t sampleAge = static_cast<uint64_t>(tankweb::number(status, "aht_age_ms", 5001)) +
        static_cast<uint32_t>(now - lastStatusAt);
    const bool valid = hasStatus && tankweb::flag(status, "aht_valid") &&
        tankweb::text(status, "aht_state") == "OK" && sampleAge <= 5000 &&
        !tankweb::flag(status, "sim_t") && !tankweb::flag(status, "sim_l");
    const bool swapped = thermalDisplaySwapped();
    const bool heat = status.outputs[swapped ? 2 : 1];
    const bool cool = status.outputs[swapped ? 1 : 2];
    const int direction = heat == cool ? 0 : heat ? 1 : -1;
    displayTemperature.update(now, static_cast<int32_t>(tankweb::number(status, "hw_t_centi")),
                              valid, direction, online(now));
}
std::string jsonBool(bool value) { return value ? "true" : "false"; }
std::string displayTemperatureJson() {
    const auto value = displayTemperature.view();
    return "{\"available\":" + jsonBool(value.available) +
        ",\"centi\":" + (value.available ? std::to_string(value.centi) : "null") +
        ",\"estimated\":" + jsonBool(value.estimated) +
        ",\"fresh\":" + jsonBool(value.fresh) +
        ",\"phase\":" + quote(tankweb::DisplayTemperature::phaseName(value.phase)) +
        ",\"direction\":" + std::to_string(value.direction) +
        ",\"elapsed_ms\":" + std::to_string(value.elapsed_ms) +
        ",\"delay_remaining_ms\":" + std::to_string(value.delay_remaining_ms) +
        ",\"startup_delay_ms\":3000,\"degree_interval_ms\":30000,\"curve\":\"smoothstep\"}";
}
std::string errorJson(const std::string &code, const std::string &message) {
    return code.empty() ? "null" : "{\"code\":" + quote(code) + ",\"message\":" + quote(message) + "}";
}

void log(const std::string &entry) {
    // UART0 is a read-only observation channel. A slow USB consumer never
    // stalls UART2 control or the Wi-Fi service.
    if (Serial.availableForWrite() >= static_cast<int>(entry.size() + 1)) {
        Serial.write(reinterpret_cast<const uint8_t *>(entry.data()), entry.size());
        Serial.write('\n');
    } else ++logDropped;
}
void setError(const std::string &code, const std::string &message) {
    errorCode = code;
    errorMessage = message;
}
std::string jobJson() {
    const Job &visible = job.internal ? lastUserJob : job;
    if (!visible.exists) return "null";
    return "{\"id\":" + std::to_string(visible.id) + ",\"action\":" + quote(visible.command.action) +
        ",\"accepted\":" + jsonBool(visible.accepted) + ",\"confirmed\":" + jsonBool(visible.confirmed) +
        ",\"ack\":" + quote(visible.ack) + ",\"error\":" + errorJson(visible.errorCode, visible.errorMessage) +
        ",\"finished_ms\":" + std::to_string(visible.finished) + "}";
}

void completeJob(const std::string &code, const std::string &message) {
    if (!job.pending) return;
    job.pending = false;
    job.finished = millis();
    job.errorCode = code;
    job.errorMessage = message;
    job.confirmed = code.empty();
    if (code.empty()) {
        if (job.starting) {
            automatic.enabled = true;
            automatic.phase = "running";
            automatic.fault.clear();
        } else if (job.command.kind == Command::STOP ||
                   (job.command.kind == Command::AUTO && !job.command.enabled && !job.internal)) {
            automatic.phase = "off";
            automatic.fault.clear();
        }
        if (job.shutdown || job.starting || job.internal || !automatic.enabled) automatic.expected = thermalBits();
        if (job.shutdown || job.command.kind == Command::STOP ||
            (job.command.kind == Command::AUTO && !job.command.enabled)) automatic.needsOff = false;
    } else if (automatic.enabled || job.starting || (job.internal && !job.shutdown) ||
               job.command.kind == Command::AUTO || job.command.kind == Command::STOP) {
        if (automatic.phase != "fault") automaticFault("CONTROL_FAILED");
    }
    if (job.shutdown && !code.empty()) {
        automatic.needsOff = true;
        automatic.retryOffAt = millis() + kRetryInfoMs;
    }
    if (!job.internal) lastUserJob = job;
    if (!code.empty()) setError(code, message);
    else { errorCode.clear(); errorMessage.clear(); }
    log("{\"event\":\"command_finished\",\"internal\":" + jsonBool(job.internal) + ",\"command\":" + jobJson() + "}");
}

std::string stateJson() {
    uint32_t now = millis();
    bool current = online(now);
    std::string outputs = !hasStatus ? "null" :
        "{\"pump\":" + jsonBool(status.outputs[0]) + ",\"heat\":" + jsonBool(status.outputs[1]) +
        ",\"cool\":" + jsonBool(status.outputs[2]) + "}";
    std::string state = "{\"fw\":" + quote(kFirmware) + ",\"ui_version\":" + quote(kUiVersion) +
        ",\"session\":" + quote(session.value()) +
        ",\"online\":" + jsonBool(current) + ",\"stale\":" + jsonBool(!current) +
        ",\"age_ms\":" + (hasStatus ? std::to_string(static_cast<uint32_t>(now - lastStatusAt)) : "null") +
        ",\"boot_epoch\":" + std::to_string(bootEpoch) +
        ",\"web_epoch\":" + std::to_string(webEpoch) +
        ",\"error\":" + errorJson(errorCode, errorMessage) +
        ",\"wifi\":{\"ap_ssid\":" + quote(kSsid) + ",\"ap_ip\":" + quote(WiFi.softAPIP().toString().c_str()) +
        ",\"ap_clients\":" + std::to_string(WiFi.softAPgetStationNum()) + ",\"sta_connected\":false}" +
        ",\"stm\":" + (hasStatus ? tankweb::fieldsJson(status.fields) : "null") +
        ",\"outputs\":" + outputs +
        ",\"thermal_display_swapped\":" + jsonBool(thermalDisplaySwapped()) +
        ",\"thermal_control_ready\":" + jsonBool(thermalControlReady()) +
        ",\"automatic_control\":" + automaticJson() +
        ",\"relay_channels\":" + (hasStatus && (thermalDisplaySwapped() || tankweb::text(status, "map") == kThermalRelayMap)
            ? "{\"pump\":1,\"heat\":3,\"cool\":2}" : "null") +
        ",\"temperature_display\":" + displayTemperatureJson() +
        ",\"pending\":" + jsonBool(job.pending) +
        ",\"last_command\":" + jobJson() +
        ",\"diagnostics\":{\"control_service\":\"dedicated_task\",\"malformed_frames\":" + std::to_string(malformedFrames) +
        ",\"unmatched_frames\":" + std::to_string(unmatchedFrames) +
        ",\"unmatched_errors\":" + std::to_string(unmatchedErrors) +
        ",\"last_unmatched\":" + quote(lastUnmatched) +
        ",\"canceled_commands\":" + std::to_string(canceledCommands) +
        ",\"log_dropped\":" + std::to_string(logDropped) + "}}";
    return state;
}

void commonHeaders() {
    server.sendHeader("X-Content-Type-Options", "nosniff");
    server.sendHeader("X-Frame-Options", "DENY");
    server.sendHeader("Referrer-Policy", "no-referrer");
    server.sendHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'");
}
void sendJson(int code, const std::string &body) {
    commonHeaders();
    server.sendHeader("Cache-Control", "no-store");
    server.send(code, "application/json; charset=utf-8", body.c_str());
}
struct HttpResponse {
    int code;
    std::string body;
};
HttpResponse errorResponse(int code, const char *error, const std::string &message) {
    return {code, "{\"ok\":false,\"queued\":false,\"accepted\":false,\"confirmed\":false,\"error\":" +
        errorJson(error, message) + ",\"state\":" + stateJson() + "}"};
}
void httpError(int code, const char *error, const std::string &message) {
    HttpResponse response;
    {
        tankweb::ControlGuard guard;
        response = errorResponse(code, error, message);
    }
    sendJson(response.code, response.body);
}

bool tokenMatches(const std::string &provided) {
    return session.matches(provided);
}
HttpResponse prepareCommand() {
    String origin = server.header("Origin");
    if (origin.length() && origin != String("http://") + server.hostHeader()) {
        return errorResponse(403, "ORIGIN", "Cross-origin control requests are rejected.");
    }
    String type = server.header("Content-Type");
    if (type != "application/json" && !type.startsWith("application/json;")) {
        return errorResponse(415, "CONTENT_TYPE", "Use application/json.");
    }
    if (server.arg("plain").length() > 512) {
        return errorResponse(413, "BODY_TOO_LARGE", "Command body exceeds 512 bytes.");
    }
    std::vector<tankweb::Field> fields;
    std::string failure;
    if (!tankweb::parseJson(server.arg("plain").c_str(), fields, failure)) {
        return errorResponse(400, "JSON", failure);
    }
    const tankweb::Value *token = tankweb::get(fields, "session");
    if (!token || token->type != tankweb::Value::STRING || !tokenMatches(token->text)) {
        return errorResponse(403, "SESSION", "Session expired; reload live state before controlling.");
    }
    Command command;
    if (!tankweb::parseCommand(fields, command, failure)) {
        return errorResponse(400, "BAD_ARGUMENT", failure);
    }
    bool isStop = command.kind == Command::STOP;
    bool deenergizing = isStop || ((command.kind == Command::AUTO || command.kind == Command::PUMP ||
                                  command.kind == Command::HEAT || command.kind == Command::COOL) && !command.enabled);
    const bool autoOff = command.kind == Command::AUTO && !command.enabled;
    if (!deenergizing && server.header("X-Tank-UI") != kUiVersion) {
        return errorResponse(409, "UI_VERSION", "页面版本过旧，请关闭旧页面并重新打开 http://192.168.4.1/?v=1.15。停止操作仍可使用。");
    }
    if (job.pending && !isStop && !autoOff) {
        return errorResponse(409, "BUSY", "A control is awaiting STM32 confirmation; STOP or AUTO OFF can preempt it.");
    }
    if (!online(millis()) && !deenergizing) {
        return errorResponse(503, "OFFLINE", "A fresh compatible STM32 status is required before activating or configuring.");
    }
    if ((command.kind == Command::AUTO || command.kind == Command::HEAT || command.kind == Command::COOL) &&
        command.enabled && !thermalControlReady()) {
        return errorResponse(409, "THERMAL_MAPPING", "ESP32 AUTO requires the unchanged STM32 3.0 profile and confirmed map 1,2,3.");
    }
    updateDisplayTemperature();
    if (command.kind == Command::AUTO && command.enabled && !automaticSampleValid(millis())) {
        return errorResponse(409, "AUTO_SENSOR", "ESP32 AUTO requires a fresh real AHT30 sample with simulation disabled.");
    }
    if ((command.kind == Command::AUTO || command.kind == Command::HEAT || command.kind == Command::COOL) &&
        command.enabled && automatic.needsOff) {
        return errorResponse(409, "AUTO_RECOVERY", "Wait for thermal OFF confirmation before explicitly restarting AUTO.");
    }
    if (isStop || autoOff) {
        // Delayed activation POSTs retain the old token and fail authentication
        // even when they arrive after the requested shutdown is confirmed.
        rotateSession();
    }
    if (job.pending) {
        ++canceledCommands;
        completeJob("PREEMPTED", "Superseded by a shutdown request; the earlier control will not be retried.");
    }
    // All frames are queued to UART2 atomically below. A frame already sent
    // cannot be withdrawn; shutdown follows it immediately and cancels retries.
    transaction.kind = TX_NONE;
    job = Job();
    job.exists = true;
    job.pending = true;
    job.id = allocateId();
    job.created = millis();
    job.command = command;
    job.wireId = job.id;
    job.wireCommand = command;
    if (command.kind == Command::AUTO && command.enabled) {
        automatic.enabled = true;
        automatic.phase = "starting";
        automatic.fault.clear();
        job.starting = job.baseline = true;
        job.wireCommand = thermalCommand(0); // Native AUTO is always disabled.
    } else if (isStop || autoOff) {
        automatic.enabled = false;
        automatic.phase = "stopping";
        automatic.fault.clear();
        automatic.needsOff = true;
    } else if (command.kind == Command::HEAT || command.kind == Command::COOL) {
        automatic.enabled = false;
        automatic.phase = "off";
        automatic.fault.clear();
    }
    log("{\"event\":\"command_queued\",\"id\":" + std::to_string(job.id) + ",\"action\":" + quote(command.action) + "}");
    return {202, "{\"ok\":true,\"queued\":true,\"accepted\":false,\"confirmed\":false,\"id\":" +
        std::to_string(job.id) + ",\"action\":" + quote(command.action) + ",\"ack\":\"\",\"error\":null,\"state\":" + stateJson() + "}"};
}

void commandHandler() {
    HttpResponse response;
    {
        tankweb::ControlGuard guard;
        response = prepareCommand();
    }
    sendJson(response.code, response.body);
}

bool sendFrame(TxKind kind, uint32_t id, const std::string &payload) {
    std::string wire = "W " + std::to_string(id) + " " + payload + "\n";
    if (Serial2.availableForWrite() < static_cast<int>(wire.size())) return false;
    size_t written = Serial2.write(reinterpret_cast<const uint8_t *>(wire.data()), wire.size());
    if (written != wire.size()) {
        setError("TX_PARTIAL", "UART2 could not queue an entire request. Control is not retried.");
        if (job.pending) completeJob("TX_PARTIAL", errorMessage);
        transaction.kind = TX_NONE;
        return false;
    }
    transaction.kind = kind;
    transaction.id = id;
    transaction.started = millis();
    return true;
}

void scheduleHandshake(uint32_t delayMs) {
    compatible = false;
    awaitingFreshStatus = false;
    nextInfoAt = millis() + delayMs;
}

void failTransaction(const std::string &code, const std::string &message) {
    TxKind kind = transaction.kind;
    transaction.kind = TX_NONE;
    setError(code, message);
    if (automatic.enabled) automaticFault("CONTROL_FAILED");
    if ((kind == TX_CONTROL || kind == TX_CONFIRM) && job.pending) completeJob(code, message);
    if (kind == TX_INFO || (awaitingFreshStatus && (kind == TX_STATUS || kind == TX_CONFIRM))) {
        scheduleHandshake(kRetryInfoMs);
    }
}

void handleFrame(const Frame &frame) {
    if (transaction.kind == TX_NONE || frame.id != transaction.id) {
        ++unmatchedFrames;
        lastUnmatched = "R " + std::to_string(frame.id) + " " + frame.payload;
        if (lastUnmatched.size() > 192) lastUnmatched.resize(192);
        if (frame.kind == Frame::ERR) {
            ++unmatchedErrors;
            setError("UNMATCHED_ERR", "Unrelated STM32 error: " + frame.payload);
        }
        log("{\"event\":\"uart_unmatched\",\"id\":" + std::to_string(frame.id) + ",\"kind\":" +
            std::to_string(static_cast<int>(frame.kind)) + ",\"payload\":" + quote(lastUnmatched) + "}");
        return;
    }
    TxKind kind = transaction.kind;
    if (frame.kind == Frame::ERR) {
        failTransaction("STM_ERR", frame.payload);
        return;
    }
    if (kind == TX_INFO) {
        if (frame.kind != Frame::INFO || !tankweb::compatibleInfo(frame.payload, webEpoch, &remoteFirmware)) {
            failTransaction("INCOMPATIBLE", "Expected tankctrl-3.0/3.1 protocol 1 on STM32 USART2."); return;
        }
        transaction.kind = TX_NONE;
        compatible = true;
        // INFO validates the protocol, not the cached sample. Query a new
        // STAT before applying stale detection again or enabling activations.
        awaitingFreshStatus = true;
        lastPollAt = millis() - kPollMs;
        log("{\"event\":\"uart_info\",\"compatible\":true,\"info\":" + quote(frame.payload) + "}");
        return;
    }
    if (kind == TX_CONTROL) {
        if (frame.kind != Frame::OK || !tankweb::ackMatches(job.wireCommand, frame.payload)) {
            failTransaction("BAD_ACK", "The correlated ACK does not match the requested action and parameters."); return;
        }
        transaction.kind = TX_NONE;
        job.accepted = true;
        job.wireAccepted = true;
        job.acceptedAt = millis();
        job.ack = frame.payload;
        log("{\"event\":\"command_ack\",\"id\":" + std::to_string(job.id) + ",\"ack\":" + quote(frame.payload) + "}");
        return;
    }
    if (frame.kind != Frame::STAT) {
        failTransaction("BAD_REPLY", "Expected a correlated STAT response."); return;
    }
    Status sample;
    std::string failure;
    if (!tankweb::parseStatus(frame.payload, sample, failure)) {
        ++malformedFrames;
        failTransaction("BAD_STAT", failure); return;
    }
    transaction.kind = TX_NONE;
    uint32_t now = millis();
    bool reset = !tankweb::epochMatches(sample, webEpoch);
    if (!reset) reset = remoteClock.observe(sample.ms, now);
    if (reset) {
        ++bootEpoch;
        automaticFault("STM_RESET");
        displayTemperature.reset();
        scheduleHandshake(awaitingFreshStatus ? kRetryInfoMs : 0);
        remoteClock = tankweb::ClockMonitor();
        rotateSession();
        setError("STM_RESET", "STM32 restarted; pending controls are canceled and the protocol is revalidated.");
        if (job.pending) completeJob("STM_RESET", errorMessage);
        log("{\"event\":\"stm_reset\",\"boot_epoch\":" + std::to_string(bootEpoch) + "}");
        return;
    }
    // Only a matching, validated new sample can advance the cache timestamp
    // and finish recovery. Wrong-epoch replies retain the old offline cache.
    status = sample;
    if (compatible && !tankweb::get(status.fields, "fw")) {
        tankweb::Field firmware;
        firmware.key = "fw";
        firmware.value.type = tankweb::Value::STRING;
        firmware.value.text = remoteFirmware; // Verified by the required INFO handshake.
        status.fields.push_back(firmware);
    }
    hasStatus = true;
    awaitingFreshStatus = false;
    lastStatusAt = now;
    lastPollAt = now;
    // Publish the same fresh display value used by HTTP before any start decision.
    updateDisplayTemperature();
    if (!automatic.bootChecked) {
        automatic.bootChecked = true;
        if (thermalBits() || tankweb::flag(status, "auto")) {
            automatic.needsOff = true;
            automatic.phase = "stopping";
        }
    }
    if (!thermalBits() && !tankweb::flag(status, "auto")) {
        automatic.needsOff = false; // A new correlated STAT proves thermal OFF.
        if (!automatic.enabled && automatic.phase == "stopping" && !job.pending) automatic.phase = "off";
    }
    if (kind == TX_CONFIRM && job.pending && job.accepted) {
        if (tankweb::confirmed(job.wireCommand, status)) {
            if (job.starting && job.baseline) {
                automatic.expected = thermalBits();
                job.baseline = false;
                if (!thermalControlReady() || !automaticSampleValid(now)) {
                    automaticFault(!thermalControlReady() ? "THERMAL_MAPPING" : "AHT_INVALID");
                    completeJob("AUTO_SENSOR", "Automatic start canceled after baseline validation.");
                } else if (automaticDesired()) setWireCommand(thermalCommand(automaticDesired()));
                else completeJob("", "");
            } else completeJob("", "");
        }
        else if (elapsed(now, job.acceptedAt, kConfirmMs)) completeJob("NOT_CONFIRMED", "STM32 acknowledged the control but fresh status did not match; inspect current state.");
    } else if (!job.pending && errorCode != "UNMATCHED_ERR") {
        // A valid status restores link health; a command's outcome remains
        // permanently recorded in last_command until the next user request.
        errorCode.clear();
        errorMessage.clear();
    }
}

void receiveUart() {
    size_t budget = 4096;
    while (budget-- && Serial2.available()) {
        uint8_t byte = static_cast<uint8_t>(Serial2.read());
        if (syncStage < 2) continue; // Only the explicit startup sync drains old bytes.
        std::string line;
        auto result = reader.put(byte, line);
        if (result == tankweb::LineReader::TOO_LONG || result == tankweb::LineReader::BAD_BYTE) {
            ++malformedFrames;
            if (transaction.kind != TX_NONE) failTransaction("UART_FRAME", "Invalid or oversized UART2 response.");
        } else if (result == tankweb::LineReader::LINE) {
            Frame frame;
            std::string failure;
            if (!tankweb::parseFrame(line, frame, failure)) {
                ++malformedFrames;
                lastUnmatched = line.substr(0, 192);
                setError("UART_PROTOCOL", failure);
                log("{\"event\":\"uart_malformed\",\"message\":" + quote(failure) + ",\"line\":" + quote(lastUnmatched) + "}");
            } else handleFrame(frame);
        }
    }
}

void queueAutomatic(const Command &command, bool shutdown) {
    job = Job();
    job.exists = job.pending = job.internal = true;
    job.shutdown = shutdown;
    job.id = allocateId();
    job.wireId = job.id;
    job.created = millis();
    job.command = job.wireCommand = command;
}

void queuePendingShutdown(uint32_t now) {
    if (!automatic.needsOff || job.pending || transaction.kind != TX_NONE ||
        !compatible || awaitingFreshStatus || !due(now, automatic.retryOffAt)) return;
    // Once the peer has been validated, a failed read must not require another
    // STAT before attempting OFF: replies can be lost while TX still works.
    queueAutomatic(thermalCommand(0), true);
}

void automaticPoll() {
    const uint32_t now = millis();
    const bool startingBaseline = job.pending && job.starting && job.baseline;
    std::string reason;
    if (online(now) && tankweb::flag(status, "auto") && !startingBaseline && !automatic.needsOff)
        reason = "NATIVE_AUTO";
    if (automatic.enabled) {
        if (!online(now)) reason = "UART_STALE";
        else if (!thermalControlReady()) reason = "THERMAL_MAPPING";
        else if (!automaticSampleValid(now)) reason = "AHT_INVALID";
        else if (!job.pending && thermalBits() != automatic.expected) reason = "LOCAL_OVERRIDE";
    }
    if (!reason.empty()) {
        automaticFault(reason);
        if (job.pending && (job.starting || (job.internal && !job.shutdown))) {
            transaction.kind = TX_NONE;
            completeJob("AUTO_FAULT", "Automatic control canceled: " + reason);
        }
    }
    if (!automatic.enabled && automatic.phase == "stopping" && !automatic.needsOff && !job.pending)
        automatic.phase = "off";
    if (job.pending || transaction.kind != TX_NONE) return;
    if (automatic.needsOff) {
        // OFF retries are best effort. Unchanged STM32 3.0 has no output lease:
        // no software on ESP can guarantee shutdown when UART or ESP power fails.
        queuePendingShutdown(now);
        return;
    }
    if (!automatic.enabled || automatic.phase != "running" || !automaticSampleValid(now)) return;
    const unsigned desired = automaticDesired();
    if (desired != thermalBits()) queueAutomatic(thermalCommand(desired), false);
}

void pollUart() {
    uint32_t now = millis();
    if (syncStage == 0) {
        if (elapsed(now, syncStarted, 120)) { Serial2.write('\n'); syncStage = 1; }
        return;
    }
    if (syncStage == 1) {
        if (elapsed(now, syncStarted, 240)) {
            syncStage = 2;
            reader.reset();
            nextInfoAt = now;
        }
        return;
    }
    if (job.pending && job.wireAccepted && elapsed(now, job.acceptedAt, kConfirmMs)) {
        // An OFF/STOP can interrupt recovery without being delayed. Its
        // missing first STAT must still leave recovery on the same backoff.
        if (awaitingFreshStatus) scheduleHandshake(kRetryInfoMs);
        if (transaction.kind == TX_CONFIRM) transaction.kind = TX_NONE;
        completeJob("NOT_CONFIRMED", "No matching post-control status within 800 ms; inspect state before another activation.");
    }
    if (transaction.kind != TX_NONE && elapsed(now, transaction.started, kReplyMs)) {
        failTransaction("TIMEOUT", "No matching STM32 reply within 800 ms. Controls are never automatically retried.");
    }
    if (transaction.kind != TX_NONE) return;
    // A timeout above may have requested a shutdown after automaticPoll ran.
    // Give that OFF the free transaction slot before another status/hello.
    queuePendingShutdown(now);
    if (job.pending) {
        if (!job.wireAccepted) {
            // An unsent automatic activation must still match the latest
            // valid measurement when UART TX capacity becomes available.
            if ((job.starting || (job.internal && !job.shutdown)) && job.wireCommand.enabled) {
                if (!automatic.enabled || !thermalControlReady() || !automaticSampleValid(now)) {
                    automaticFault(!thermalControlReady() ? "THERMAL_MAPPING" : !online(now) ? "UART_STALE" : "AHT_INVALID");
                    completeJob("AUTO_SENSOR", "Queued automatic activation canceled; sample or profile is no longer valid.");
                    return;
                }
                Command desired = thermalCommand(automaticDesired());
                if (desired.wire != job.wireCommand.wire) setWireCommand(desired);
            }
            if (!sendFrame(TX_CONTROL, job.wireId, job.wireCommand.wire) && elapsed(now, job.created, 1000))
                completeJob("TX_BUSY", "UART2 transmit space unavailable. Control was not retried.");
        } else {
            sendFrame(TX_CONFIRM, allocateId(), "status");
        }
        return;
    }
    if (compatible && !awaitingFreshStatus && hasStatus && elapsed(now, lastStatusAt, kStaleMs)) {
        scheduleHandshake(0);
        setError("STALE", "STM32 status expired; activations remain disabled until the protocol and live status return.");
    }
    if (!compatible) {
        if (due(now, nextInfoAt)) {
            uint32_t epoch;
            do { epoch = randomId(); } while (epoch == webEpoch);
            if (sendFrame(TX_INFO, allocateId(), "hello " + std::to_string(epoch))) webEpoch = epoch;
        }
    } else if (elapsed(now, lastPollAt, kPollMs)) {
        sendFrame(TX_STATUS, allocateId(), "status");
    }
}

void serveAsset() {
    String uri = server.uri();
    if (uri == "/index.html") uri = "/";
    for (size_t i = 0; i < tankweb_assets::asset_count; ++i) {
        const auto &asset = tankweb_assets::assets[i];
        if (uri != asset.path || server.method() != HTTP_GET) continue;
        commonHeaders();
        server.sendHeader("ETag", asset.etag);
        // Always replace the page shell. Scripts/styles still revalidate by
        // content ETag, so stable URLs cannot retain an earlier controller UI.
        const bool html = uri == "/";
        server.sendHeader("Cache-Control", html ? "no-store" : "no-cache");
        if (!html && server.header("If-None-Match") == asset.etag) { server.send(304); return; }
        server.sendHeader("Content-Encoding", "gzip");
        server.send_P(200, asset.mime, reinterpret_cast<const char *>(asset.data), asset.size);
        return;
    }
    if (uri.startsWith("/api/")) httpError(404, "NOT_FOUND", "Unknown API path or method.");
    else { commonHeaders(); server.send(404, "text/plain; charset=utf-8", "Not found"); }
}

void reportState() {
    static uint32_t reported = 0;
    uint32_t now = millis();
    if (!elapsed(now, reported, 5000)) return;
    reported = now;
    std::string data = "{\"event\":\"STATE\",\"fw\":" + quote(kFirmware) + ",\"esp_ms\":" + std::to_string(now) +
        ",\"ap_clients\":" + std::to_string(WiFi.softAPgetStationNum()) +
        ",\"online\":" + jsonBool(online(now)) + ",\"stale\":" + jsonBool(!online(now)) + ",\"stm\":";
    if (!hasStatus) data += "null";
    else data += "{\"fw\":" + quote(remoteFirmware) + ",\"map\":" + quote(tankweb::text(status, "map")) +
        ",\"ms\":" + std::to_string(status.ms) +
        ",\"web_epoch\":" + std::to_string(tankweb::number(status, "web_epoch")) +
        ",\"t_centi\":" + std::to_string(tankweb::number(status, "t_centi")) +
        ",\"hw_t_centi\":" + std::to_string(tankweb::number(status, "hw_t_centi")) +
        ",\"rh_centi\":" + std::to_string(tankweb::number(status, "rh_centi")) +
        ",\"level_state\":" + quote(tankweb::text(status, "level_state")) +
        ",\"level_wetmask\":" + std::to_string(tankweb::number(status, "level_wetmask")) +
        ",\"auto\":" + jsonBool(tankweb::flag(status, "auto")) +
        ",\"out\":" + quote(tankweb::text(status, "out")) +
        ",\"pump\":" + jsonBool(tankweb::flag(status, "pump")) +
        ",\"pump_limit_ms\":" + std::to_string(tankweb::number(status, "pump_limit_ms")) + "}";
    data += ",\"temperature_display\":" + displayTemperatureJson() +
        ",\"automatic_control\":" + automaticJson() +
        ",\"thermal_control_ready\":" + jsonBool(thermalControlReady()) +
        ",\"pending\":" + jsonBool(job.pending) + ",\"last_command\":" + jobJson() +
        ",\"heap\":" + std::to_string(ESP.getFreeHeap()) + ",\"error\":" + errorJson(errorCode, errorMessage) + "}";
    log(data);
}
void serviceControl() {
    tankweb::ControlGuard guard;
    receiveUart();
    updateDisplayTemperature();
    automaticPoll();
    pollUart();
    reportState();
    while (Serial.available()) Serial.read();
}
} // namespace

void setup() {
    automatic = AutomaticState();
    lastUserJob = Job();
    displayTemperature.reset();
    esp_log_level_set("*", ESP_LOG_NONE);
    Serial.setRxBufferSize(256);
    Serial.setTxBufferSize(2048);
    Serial.begin(kBaud, SERIAL_8N1);
    Serial.setDebugOutput(false);
    Serial.setTimeout(0);
    Serial2.setRxBufferSize(4096);
    Serial2.setTxBufferSize(1024);
    Serial2.begin(kBaud, SERIAL_8N1, 16, 17);
    Serial2.setTimeout(0);
    Serial2.setRxFIFOFull(16);
    Serial2.setRxTimeout(1);

    WiFi.mode(WIFI_AP);
    IPAddress local(192, 168, 4, 1), subnet(255, 255, 255, 0);
    WiFi.softAPConfig(local, local, subnet);
    bool apReady = WiFi.softAP(kSsid, kPassword, 6, false, 4);
    if (!apReady) setError("AP_START", "ESP32 hotspot could not start.");
    nextId = randomId();
    rotateSession(); // Wi-Fi is active, so esp_random has RF entropy available.
    const char *headers[] = {"Origin", "Content-Type", "If-None-Match", "X-Tank-UI"};
    server.collectHeaders(headers, 4);
    server.on("/api/state", HTTP_GET, []() {
        std::string snapshot;
        {
            tankweb::ControlGuard guard;
            snapshot = stateJson();
        }
        sendJson(200, snapshot);
    });
    server.on("/api/command", HTTP_POST, commandHandler);
    server.onNotFound(serveAsset);
    server.begin();

    syncStarted = millis();
    // Invalidate a partial STM32 request left over from an earlier session.
    Serial2.write(static_cast<uint8_t>(0));
    Serial2.write('\n'); // First sync LF; the second gets its own 120 ms turn.
    log("{\"event\":\"BOOT\",\"fw\":" + quote(kFirmware) + ",\"ssid\":" + quote(kSsid) +
        ",\"ap_ready\":" + jsonBool(apReady) + ",\"ip\":" + quote(WiFi.softAPIP().toString().c_str()) +
        ",\"heap\":" + std::to_string(ESP.getFreeHeap()) +
        ",\"uart2\":{\"rx\":16,\"tx\":17,\"baud\":115200,\"format\":\"8N1\"}}");
    if (!tankweb::startControlService(serviceControl))
        setError("CONTROL_TASK", "Temperature control service could not start; restart ESP32.");
}

void loop() {
    server.handleClient();
    delay(1);
}
