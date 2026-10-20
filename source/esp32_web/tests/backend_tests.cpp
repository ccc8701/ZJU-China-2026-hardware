// Execute the actual Arduino handlers/state machine with deterministic mocks.
#include "Arduino.h"
#include "WiFi.h"
uint32_t mockMillis = 0;
HardwareSerial Serial, Serial2;
EspClass ESP;
WiFiClass WiFi;
#include "../src/main.cpp"

#include <assert.h>
#include <stdio.h>

namespace {
unsigned backendChecks = 0;
void checkAt(bool condition, unsigned line) {
    ++backendChecks;
    if (!condition) fprintf(stderr, "Backend check failed at line %u\n", line);
    assert(condition);
}
#define check(condition) checkAt((condition), __LINE__)
void tick(uint32_t delta = 1) { mockMillis += delta; loop(); }

const char *kSample =
    "ms=100 web_epoch=EPOCH auto=0 mode=OFF thermal=IDLE fault=NONE sim_t=0 sim_l=0"
    " t_centi=2332 hw_t_centi=2332 rh_centi=5901 aht_valid=1 aht_state=OK aht_age_ms=30 aht_failures=0"
    " level_mask=7 lower_centi=2500 upper_centi=3000 level_state=NORMAL level_wetmask=6 level_sim=0"
    " armed=1 map=1,2,3 map_ok=1 out=0,0,0 pump=0 pump_ms=0 pump_total_ms=3000 pump_limit_ms=30000"
    " u2_rx=100 u2_tx=1000 u2_rxdrop=0 u2_txdrop=0 u2_seq=10 u2_err=0";

std::string replacing(std::string source, const std::string &needle, const std::string &replacement) {
    size_t at = source.find(needle);
    assert(at != std::string::npos);
    source.replace(at, needle.size(), replacement);
    return source;
}
std::string sample(uint32_t epoch, uint32_t ms = 100) {
    return replacing(replacing(kSample, "EPOCH", std::to_string(epoch)), "ms=100", "ms=" + std::to_string(ms));
}
void reply(uint32_t id, const std::string &kind, const std::string &payload) {
    Serial2.receive("R " + std::to_string(id) + " " + kind + " " + payload + "\r\n");
    for (unsigned turns = 0; !Serial2.rx.empty() && turns < 10; ++turns) tick();
    check(Serial2.rx.empty());
}
void freshStatus(uint32_t ms = 100) {
    if (transaction.kind == TX_NONE) tick(kPollMs);
    check(transaction.kind == TX_STATUS);
    reply(transaction.id, "STAT", sample(webEpoch, ms));
    check(hasStatus && online(millis()));
}
void restart() {
    Serial = HardwareSerial(); Serial2 = HardwareSerial(); mockMillis = 0;
    status = Status(); reader = tankweb::LineReader(); remoteClock = tankweb::ClockMonitor();
    session = tankweb::SessionGate(); compatible = false; hasStatus = false; awaitingFreshStatus = false;
    lastStatusAt = lastPollAt = nextInfoAt = bootEpoch = webEpoch = 0;
    malformedFrames = unmatchedFrames = unmatchedErrors = logDropped = canceledCommands = 0;
    errorCode.clear(); errorMessage.clear(); lastUnmatched.clear();
    syncStage = 0; transaction = Transaction(); job = Job();
    setup();
    check(Serial2.tx == std::string("\0\n", 2));
    tick(119); check(Serial2.tx == std::string("\0\n", 2));
    tick(1); check(Serial2.tx == std::string("\0\n\n", 3));
    tick(119); check(transaction.kind == TX_NONE);
    tick(1); tick(); check(transaction.kind == TX_INFO);
    check(Serial2.tx.find(" hello " + std::to_string(webEpoch) + "\n") != std::string::npos);
    reply(transaction.id, "INFO", "fw=tankctrl-3.0 proto=1 uart=USART2 baud=115200 read_only=0 epoch=" + std::to_string(webEpoch));
    check(compatible && transaction.kind == TX_STATUS);
    reply(transaction.id, "STAT", sample(webEpoch));
    check(online(millis()));
}
void post(const std::string &action, const std::string &arguments = "", const std::string *oldSession = nullptr,
          const char *uiVersion = kUiVersion) {
    server.request = WebServer::Request();
    server.request.path = "/api/command"; server.request.method = HTTP_POST;
    server.request.headers["Content-Type"] = "application/json";
    server.request.headers["Origin"] = "http://192.168.4.1";
    if (uiVersion) server.request.headers["X-Tank-UI"] = uiVersion;
    server.request.body = "{\"session\":" + quote(oldSession ? *oldSession : session.value()) + ",\"action\":" + quote(action) + arguments + "}";
    server.queued = true;
    tick();
}
void acknowledge() {
    check(transaction.kind == TX_CONTROL && transaction.id == job.id);
    reply(job.id, "OK", tankweb::expectedAck(job.command));
    check(job.accepted && job.pending && transaction.kind == TX_CONFIRM);
}

void testTruthAndCorrelation() {
    restart();
    post("pump", ",\"enabled\":true");
    check(server.code == 202 && job.pending && !job.accepted && !job.confirmed);
    uint32_t id = job.id;
    reply(id, "OK", "ACK cmd=range lower=2500 upper=3000");
    check(!job.pending && !job.accepted && !job.confirmed && job.errorCode == "BAD_ACK");

    post("pump", ",\"enabled\":true");
    check(server.code == 202);
    acknowledge();
    uint32_t confirmId = transaction.id;
    reply(id, "STAT", replacing(sample(webEpoch), "out=0,0,0", "out=0,0,0"));
    check(job.pending && !job.confirmed && transaction.id == confirmId && unmatchedFrames == 1);
    std::string on = replacing(replacing(sample(webEpoch), "pump=0", "pump=1"), "out=0,0,0", "out=1,0,0");
    reply(confirmId, "STAT", on);
    check(!job.pending && job.accepted && job.confirmed && job.errorCode.empty());
    check(status.outputs[0]);
}

void testStopPriorityAndTokenBarrier() {
    restart();
    post("pump", ",\"enabled\":true");
    uint32_t oldId = job.id;
    std::string oldToken = session.value();
    post("stop");
    check(server.code == 202 && job.command.kind == Command::STOP && job.id != oldId && canceledCommands == 1);
    check(session.value() != oldToken && !session.matches(oldToken));
    check(server.response.find(quote(session.value())) != std::string::npos);
    reply(oldId, "OK", "ACK cmd=pump on=1");
    check(job.pending && !job.accepted);
    acknowledge();
    reply(transaction.id, "STAT", sample(webEpoch));
    check(job.confirmed && !job.pending && !status.outputs[0]);
    std::string written = Serial2.tx;
    post("pump", ",\"enabled\":true", &oldToken);
    check(server.code == 403 && job.command.kind == Command::STOP && Serial2.tx == written);

    // A STOP received before an unsent activation gets all UART TX capacity.
    Serial2.writable = 0;
    post("heat", ",\"enabled\":true");
    check(server.code == 202 && transaction.kind == TX_NONE && job.pending);
    written = Serial2.tx;
    post("stop");
    check(server.code == 202 && transaction.kind == TX_NONE);
    Serial2.writable = 8192; tick();
    check(transaction.kind == TX_CONTROL && job.command.kind == Command::STOP);
    std::string after = Serial2.tx.substr(written.size());
    check(after.find(" heat on\n") == std::string::npos && after.find(" stop\n") != std::string::npos);
}

void testTimeoutNoActivationRetry() {
    restart();
    post("heat", ",\"enabled\":true");
    uint32_t id = job.id;
    const std::string once = "W " + std::to_string(id) + " heat on\n";
    tick(kReplyMs + 1);
    check(!job.pending && !job.accepted && !job.confirmed && job.errorCode == "TIMEOUT");
    tick(kReplyMs + 1); tick(kReplyMs + 1);
    size_t first = Serial2.tx.find(once);
    check(first != std::string::npos && Serial2.tx.find(once, first + 1) == std::string::npos);
    reply(id, "OK", "ACK cmd=heat on=1");
    check(!job.confirmed && !job.accepted);

    restart();
    post("pump", ",\"enabled\":true"); acknowledge();
    tick(kConfirmMs + 1);
    check(!job.pending && job.accepted && !job.confirmed && job.errorCode == "NOT_CONFIRMED");
}

void testResetAndWrap() {
    restart();
    post("cool", ",\"enabled\":true"); acknowledge();
    uint32_t epoch = webEpoch;
    std::string token = session.value();
    // ms increased, but STM RAM epoch was cleared by its reset.
    reply(transaction.id, "STAT", sample(0, 200));
    check(bootEpoch == 1 && !compatible && !job.pending && !job.confirmed && job.errorCode == "STM_RESET");
    check(!session.matches(token) && webEpoch != epoch);
    check(transaction.kind == TX_INFO);

    restart();
    remoteClock = tankweb::ClockMonitor();
    freshStatus(UINT32_MAX - 100);
    freshStatus(50);
    check(bootEpoch == 0 && compatible && online(millis()));
}

void testOfflineAuthenticationAndUnknownError() {
    restart();
    server.request = WebServer::Request(); server.request.path = "/api/command"; server.request.method = HTTP_POST;
    server.request.headers["Content-Type"] = "application/json";
    server.request.headers["Origin"] = "http://evil.example";
    server.request.body = "{\"session\":" + quote(session.value()) + ",\"action\":\"stop\"}";
    server.queued = true; tick(); check(server.code == 403 && !job.exists);
    reply(999, "ERR", "code=unknown_error");
    check(unmatchedErrors == 1 && errorCode == "UNMATCHED_ERR");
    freshStatus(); check(errorCode == "UNMATCHED_ERR");
    compatible = false;
    post("pump", ",\"enabled\":true"); check(server.code == 503 && !job.exists);
    post("stop"); check(server.code == 202 && job.pending && !job.confirmed);
    tick(kReplyMs + 1); check(!job.confirmed && job.errorCode == "TIMEOUT");
}

void testRealisticUsbLogCapacity() {
    HardwareSerial defaultUart;
    check(defaultUart.availableForWrite() == 0);
    defaultUart.begin(115200, SERIAL_8N1);
    check(defaultUart.availableForWrite() == 128);
    check(defaultUart.setTxBufferSize(2048) == 0); // Too late after begin().
    check(defaultUart.availableForWrite() == 128);
    HardwareSerial bufferedUart;
    check(bufferedUart.setTxBufferSize(2048) == 2048);
    check(bufferedUart.availableForWrite() == 0);
    bufferedUart.begin(115200, SERIAL_8N1);
    check(bufferedUart.availableForWrite() == 2048);

    restart();
    check(Serial.txBufferSize == 2048 && Serial.availableForWrite() == 2048);
    check(Serial.tx.find("\"event\":\"BOOT\"") != std::string::npos);
    check(Serial.tx.find('\n') > 128); // BOOT itself exceeds the default FIFO.
    check(Serial.tx.find(session.value()) == std::string::npos);
    Serial.tx.clear();
    mockMillis += 6000;
    reportState();
    check(Serial.tx.find("\"event\":\"STATE\"") != std::string::npos);
    check(Serial.tx.size() > 128 && Serial.tx.size() <= 2048 && Serial.tx.back() == '\n');

    Serial.tx.clear();
    post("stop"); acknowledge(); reply(transaction.id, "STAT", sample(webEpoch));
    check(Serial.tx.find("\"event\":\"command_queued\"") != std::string::npos);
    check(Serial.tx.find("\"event\":\"command_ack\"") != std::string::npos);
    check(Serial.tx.find("\"event\":\"command_finished\"") != std::string::npos);
    check(Serial.tx.find(session.value()) == std::string::npos);

    uint32_t dropped = logDropped;
    std::string written = Serial.tx;
    Serial.writable = 128;
    log(std::string(128, 'x')); // Plus newline would need 129 bytes.
    check(logDropped == dropped + 1 && Serial.tx == written);
    log(std::string(127, 'x'));
    check(logDropped == dropped + 1 && Serial.tx.size() == written.size() + 128);
    Serial.writable = 2048;
    written = Serial.tx;
    log(std::string(2048, 'x'));
    check(logDropped == dropped + 2 && Serial.tx == written);
    log(std::string(2047, 'x'));
    check(logDropped == dropped + 2 && Serial.tx.size() == written.size() + 2048);
    Serial.writable = 0;
    written = Serial.tx;
    uint32_t before = mockMillis;
    log("A full USB TX ring must not block UART2 control.");
    check(logDropped == dropped + 3 && Serial.tx == written && mockMillis == before);
}

size_t wireCount(const std::string &fragment) {
    size_t count = 0, position = 0;
    while ((position = Serial2.tx.find(fragment, position)) != std::string::npos) {
        ++count;
        position += fragment.size();
    }
    return count;
}

void acceptRecoveryHello() {
    check(transaction.kind == TX_INFO && !online(millis()));
    uint32_t stamp = lastStatusAt;
    reply(transaction.id, "INFO", "fw=tankctrl-3.0 proto=1 uart=USART2 baud=115200 read_only=0 epoch=" + std::to_string(webEpoch));
    check(compatible && awaitingFreshStatus && transaction.kind == TX_STATUS);
    check(!online(millis()) && lastStatusAt == stamp);
}

void testResyncWaitsForFreshStatus() {
    restart();
    uint32_t oldStatusId = transaction.id, oldEpoch = webEpoch, stamp = lastStatusAt;
    size_t hellos = wireCount(" hello ");
    tick(kStaleMs + 1);
    check(!compatible && !online(millis()) && transaction.kind == TX_INFO && webEpoch != oldEpoch);
    check(wireCount(" hello ") == hellos + 1);
    acceptRecoveryHello();
    uint32_t freshId = transaction.id;
    check(stateJson().find("\"online\":false,\"stale\":true") != std::string::npos);
    check(status.ms == 100 && lastStatusAt == stamp);

    // The authenticated INFO must not turn the old cached sample fresh or
    // permit any activation/configuration before the new STAT has arrived.
    std::string written = Serial2.tx;
    for (const char *action : {"pump", "auto", "heat", "cool"}) {
        post(action, ",\"enabled\":true");
        check(server.code == 503 && !job.exists && transaction.kind == TX_STATUS);
    }
    post("range", ",\"lower_centi\":2500,\"upper_centi\":3000");
    check(server.code == 503 && !job.exists && Serial2.tx == written);
    check(wireCount(" hello ") == hellos + 1 && lastStatusAt == stamp);

    reply(oldStatusId, "STAT", sample(oldEpoch, 200));
    check(transaction.id == freshId && awaitingFreshStatus && !online(millis()));
    check(lastStatusAt == stamp && wireCount(" hello ") == hellos + 1);
    reply(freshId, "STAT", sample(webEpoch, 200));
    check(online(millis()) && !awaitingFreshStatus && lastStatusAt > stamp);
    check(tankweb::number(status, "web_epoch") == webEpoch);

    // Fresh recovery returns to one status per 500 ms, with no more HELLOs.
    size_t statuses = wireCount(" status\n");
    for (unsigned i = 0; i < 4; ++i) {
        tick(kPollMs);
        check(transaction.kind == TX_STATUS);
        reply(transaction.id, "STAT", sample(webEpoch, 700 + i * 500));
        check(online(millis()) && wireCount(" hello ") == hellos + 1);
    }
    check(wireCount(" status\n") == statuses + 4);
}

void testResyncWrongEpochAndErrorStayOffline() {
    restart();
    uint32_t oldEpoch = webEpoch, stamp = lastStatusAt;
    tick(kStaleMs + 1);
    acceptRecoveryHello();
    size_t hellos = wireCount(" hello ");
    reply(transaction.id, "STAT", sample(oldEpoch, 200));
    check(!compatible && !awaitingFreshStatus && !online(millis()) && bootEpoch == 1 && transaction.kind == TX_NONE);
    check(lastStatusAt == stamp && status.ms == 100);
    check(nextInfoAt + 1 == millis() + kRetryInfoMs); // loop() yielded 1 ms after scheduling.
    post("pump", ",\"enabled\":true");
    check(server.code == 503 && !job.exists);
    uint32_t retryAt = nextInfoAt;
    mockMillis = retryAt - 1; pollUart();
    check(transaction.kind == TX_NONE && wireCount(" hello ") == hellos);
    mockMillis = retryAt; pollUart();
    check(transaction.kind == TX_INFO && wireCount(" hello ") == hellos + 1);
    acceptRecoveryHello();
    reply(transaction.id, "ERR", "code=status_unavailable");
    check(!compatible && !awaitingFreshStatus && !online(millis()) && transaction.kind == TX_NONE);
    check(lastStatusAt == stamp && errorCode == "STM_ERR");
    retryAt = nextInfoAt;
    hellos = wireCount(" hello ");
    mockMillis = retryAt - 1; pollUart();
    check(transaction.kind == TX_NONE && wireCount(" hello ") == hellos);
    mockMillis = retryAt; pollUart();
    check(transaction.kind == TX_INFO && wireCount(" hello ") == hellos + 1);
    acceptRecoveryHello();
    reply(transaction.id, "STAT", replacing(sample(webEpoch, 250), "aht_valid=1", "aht_valid=2"));
    check(!compatible && !online(millis()) && transaction.kind == TX_NONE && errorCode == "BAD_STAT");
    check(lastStatusAt == stamp && status.ms == 100);
}

void testResyncStatusTimeoutBacksOff() {
    restart();
    uint32_t stamp = lastStatusAt;
    tick(kStaleMs + 1);
    acceptRecoveryHello();
    uint32_t expiredId = transaction.id, expiredEpoch = webEpoch;
    size_t hellos = wireCount(" hello ");
    tick(kReplyMs + 1);
    check(transaction.kind == TX_NONE && !compatible && !awaitingFreshStatus && !online(millis()));
    check(lastStatusAt == stamp && errorCode == "TIMEOUT");
    uint32_t retryAt = nextInfoAt;
    mockMillis = retryAt - 1; pollUart();
    check(transaction.kind == TX_NONE && wireCount(" hello ") == hellos);
    mockMillis = retryAt; pollUart();
    check(transaction.kind == TX_INFO && wireCount(" hello ") == hellos + 1);
    acceptRecoveryHello();
    uint32_t freshId = transaction.id;
    reply(expiredId, "STAT", sample(expiredEpoch, 200));
    check(transaction.id == freshId && awaitingFreshStatus && !online(millis()) && lastStatusAt == stamp);
    reply(freshId, "STAT", sample(webEpoch, 200));
    check(online(millis()) && !awaitingFreshStatus && lastStatusAt > stamp);
}

void testResyncDeenergizingConfirmTimeoutBacksOff() {
    for (const char *action : {"stop", "pump"}) {
        restart();
        uint32_t stamp = lastStatusAt;
        tick(kStaleMs + 1);
        acceptRecoveryHello();
        uint32_t epoch = webEpoch;
        size_t hellos = wireCount(" hello ");

        // STOP and OFF still go to UART immediately while recovering; only
        // revalidation backs off if their first confirming STAT never arrives.
        post(action, std::string(action) == "stop" ? "" : ",\"enabled\":false");
        check(server.code == 202 && job.pending && transaction.kind == TX_CONTROL);
        uint32_t commandId = job.id;
        std::string controlWire = "W " + std::to_string(commandId) + " " + job.command.wire + "\n";
        check(wireCount(controlWire) == 1);
        acknowledge();
        uint32_t expiredId = transaction.id;
        size_t statuses = wireCount(" status\n");
        tick(kConfirmMs);
        check(!job.pending && job.accepted && !job.confirmed && job.errorCode == "NOT_CONFIRMED");
        check(!compatible && !awaitingFreshStatus && !online(millis()) && transaction.kind == TX_NONE);
        check(lastStatusAt == stamp && status.ms == 100 && nextInfoAt == job.finished + kRetryInfoMs);
        check(wireCount(" status\n") == statuses && wireCount(" hello ") == hellos);

        uint32_t finished = job.finished, retryAt = nextInfoAt;
        reply(expiredId, "STAT", sample(epoch, 200));
        reply(commandId, "OK", tankweb::expectedAck(job.command));
        check(!job.pending && !job.confirmed && job.finished == finished && job.errorCode == "NOT_CONFIRMED");
        check(!online(millis()) && lastStatusAt == stamp && transaction.kind == TX_NONE);
        post("pump", ",\"enabled\":true");
        check(server.code == 503 && !job.pending && job.id == commandId);
        mockMillis = retryAt - 1; pollUart();
        check(transaction.kind == TX_NONE && wireCount(" hello ") == hellos && wireCount(" status\n") == statuses);
        mockMillis = retryAt; pollUart();
        check(transaction.kind == TX_INFO && wireCount(" hello ") == hellos + 1 && wireCount(controlWire) == 1);
        acceptRecoveryHello();
        reply(transaction.id, "STAT", sample(webEpoch, 200));
        check(online(millis()) && !awaitingFreshStatus && lastStatusAt > stamp);
        check(!job.pending && !job.confirmed && job.finished == finished && job.errorCode == "NOT_CONFIRMED");
    }
}

void testDisplayTemperatureIntegration() {
    restart();
    auto shown = displayTemperature.view();
    check(shown.available && shown.centi == 2332 && !shown.estimated);
    check(shown.phase == tankweb::DisplayTemperature::MEASURED);
    check(displayTemperature.strategy() == tankweb::DisplayTemperature::SMOOTH);

    // Feed actual correlated UART frames at deterministic 500 ms intervals.
    // hw_t_centi is deliberately different from the STM32 control temperature.
    const uint32_t initialAt = lastStatusAt;
    const auto statusAt = [&](uint32_t at, const char *outputs, int32_t measured) {
        mockMillis = at;
        pollUart();
        check(transaction.kind == TX_STATUS);
        std::string payload = sample(webEpoch, 100 + at - initialAt);
        payload = replacing(payload, " t_centi=2332", " t_centi=2900");
        payload = replacing(payload, "hw_t_centi=2332", "hw_t_centi=" + std::to_string(measured));
        payload = replacing(payload, "out=0,0,0", std::string("out=") + outputs);
        Serial2.receive("R " + std::to_string(transaction.id) + " STAT " + payload + "\r\n");
        loop();
        check(Serial2.rx.empty() && lastStatusAt == at && online(millis()));
        check(tankweb::number(status, "t_centi") == 2900);
        check(tankweb::number(status, "hw_t_centi") == measured);
    };

    statusAt(initialAt + 500, "0,0,0", 2345);
    check(displayTemperature.view().centi == 2345 && !displayTemperature.view().estimated);
    const uint32_t heatingAt = lastStatusAt + 500;
    statusAt(heatingAt, "0,0,1", 2345);
    shown = displayTemperature.view();
    check(shown.centi == 2345 && shown.estimated && shown.direction == 1);
    check(shown.phase == tankweb::DisplayTemperature::DELAY && shown.delay_remaining_ms == 3000);
    check(!status.outputs[0] && !status.outputs[1] && status.outputs[2]);
    std::string json = stateJson();
    check(json.find("\"thermal_display_swapped\":true") != std::string::npos);
    check(json.find("\"outputs\":{\"pump\":false,\"heat\":false,\"cool\":true}") != std::string::npos);
    check(json.find("\"temperature_display\":{\"available\":true,\"centi\":2345,\"estimated\":true,\"fresh\":true,\"phase\":\"delay\",\"direction\":1") != std::string::npos);

    for (uint32_t offset = 500; offset <= 33000; offset += 500) {
        statusAt(heatingAt + offset, "0,0,1", 1800 + offset / 500);
        shown = displayTemperature.view();
        check(shown.elapsed_ms == offset && shown.direction == 1);
        if (offset <= 3000) check(shown.centi == 2345);
        if (offset == 3000) check(shown.delay_remaining_ms == 0);
        if (offset == 10500) check(shown.centi == 2360); // Nonuniform curve, not a linear 0.25 degree.
    }
    check(displayTemperature.view().centi == 2445);
    check(!status.outputs[1] && status.outputs[2]);
    json = stateJson();
    check(json.find("\"t_centi\":2900") != std::string::npos);
    check(json.find("\"hw_t_centi\":1866") != std::string::npos);
    check(json.find("\"temperature_display\":{\"available\":true,\"centi\":2445") != std::string::npos);
    check(json.find("\"startup_delay_ms\":3000,\"degree_interval_ms\":30000,\"curve\":\"smoothstep\"") != std::string::npos);

    // HTTP clients only serialize one ESP-owned estimate. Reading cannot
    // restart the delay or advance either the display or controller cache.
    const uint64_t beforeReads = displayTemperature.view().elapsed_ms;
    const uint32_t beforeMs = mockMillis;
    const std::string beforeWire = Serial2.tx;
    for (unsigned client = 0; client < 10; ++client) check(stateJson() == json);
    check(mockMillis == beforeMs && Serial2.tx == beforeWire);
    check(displayTemperature.view().centi == 2445 && displayTemperature.view().elapsed_ms == beforeReads);
    check(tankweb::number(status, "t_centi") == 2900 && tankweb::number(status, "hw_t_centi") == 1866);

    const uint32_t coolingAt = lastStatusAt + 500;
    statusAt(coolingAt, "0,1,0", 4000);
    shown = displayTemperature.view();
    check(shown.centi == 2445 && shown.direction == -1 && shown.delay_remaining_ms == 3000);
    check(status.outputs[1] && !status.outputs[2]);
    check(stateJson().find("\"outputs\":{\"pump\":false,\"heat\":true,\"cool\":false}") != std::string::npos);
    for (uint32_t offset = 500; offset <= 33000; offset += 500) {
        statusAt(coolingAt + offset, "0,1,0", 4000);
        if (offset <= 3000) check(displayTemperature.view().centi == 2445);
    }
    check(displayTemperature.view().centi == 2345 && displayTemperature.view().direction == -1);

    const uint32_t stamp = lastStatusAt;
    mockMillis = stamp + kStaleMs - 1;
    loop();
    shown = displayTemperature.view();
    check(shown.fresh && transaction.kind == TX_STATUS);
    mockMillis = stamp + kStaleMs;
    loop();
    const auto frozen = displayTemperature.view();
    check(!online(stamp + kStaleMs) && !frozen.fresh);
    check(frozen.phase == tankweb::DisplayTemperature::FROZEN);
    check(frozen.centi == shown.centi && frozen.elapsed_ms == shown.elapsed_ms);
    check(stateJson().find("\"phase\":\"frozen\",\"direction\":0") != std::string::npos);

    // A confirmed STM32 reset invalidates the old estimate. After the new
    // handshake, an idle sensor sample becomes the actual startup value again.
    const uint32_t oldEpoch = webEpoch;
    reply(transaction.id, "STAT", sample(0, 1));
    check(bootEpoch == 1 && webEpoch != oldEpoch);
    check(!displayTemperature.view().available && !displayTemperature.view().estimated);
    check(stateJson().find("\"temperature_display\":{\"available\":false,\"centi\":null") != std::string::npos);
    acceptRecoveryHello();
    std::string newSample = replacing(sample(webEpoch, 100), "hw_t_centi=2332", "hw_t_centi=2107");
    reply(transaction.id, "STAT", newSample);
    check(online(millis()) && displayTemperature.view().centi == 2107);
    check(displayTemperature.view().phase == tankweb::DisplayTemperature::MEASURED);
    check(!displayTemperature.view().estimated && tankweb::number(status, "t_centi") == 2332);
}
void testVersionAndAssetCachePolicy() {
    restart();
    check(stateJson().find("\"fw\":\"tankweb-1.15\"") != std::string::npos);
    check(stateJson().find("\"ui_version\":\"tank-web-ui-1.15\"") != std::string::npos);
    for (const char *path : {"/", "/index.html"}) {
        server.request = WebServer::Request();
        server.request.path = path;
        server.request.headers["If-None-Match"] = "\"mock\"";
        server.queued = true;
        tick();
        check(server.code == 200 && server.responseHeaders["Cache-Control"] == "no-store");
        check(server.responseHeaders["Content-Encoding"] == "gzip");
    }
    for (bool script : {false, true}) {
        server.request = WebServer::Request();
        server.request.path = script ? "/app.js" : "/style.css";
        server.queued = true;
        tick();
        check(server.code == 200 && server.responseHeaders["Cache-Control"] == "no-cache");
        server.request.headers["If-None-Match"] = server.responseHeaders["ETag"];
        server.queued = true;
        tick();
        check(server.code == 304 && server.responseHeaders["Cache-Control"] == "no-cache");
    }
    const size_t before = Serial.tx.size();
    mockMillis += 6000;
    reportState();
    check(Serial.tx.substr(before).find("\"event\":\"STATE\",\"fw\":\"tankweb-1.15\"") != std::string::npos);
}
} // namespace

int main() {
    testTruthAndCorrelation();
    testStopPriorityAndTokenBarrier();
    testTimeoutNoActivationRetry();
    testResetAndWrap();
    testOfflineAuthenticationAndUnknownError();
    testRealisticUsbLogCapacity();
    testResyncWaitsForFreshStatus();
    testResyncWrongEpochAndErrorStayOffline();
    testResyncStatusTimeoutBacksOff();
    testResyncDeenergizingConfirmTimeoutBacksOff();
    testDisplayTemperatureIntegration();
    testVersionAndAssetCachePolicy();
    printf("ESP32 actual backend state machine: %u checks passed\n", backendChecks);
}
