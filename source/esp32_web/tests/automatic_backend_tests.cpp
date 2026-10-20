// Reuse the deployed backend harness without changing its historical cases.
// Its renamed entry point is compiled but never run; the baseline executable
// remains a separate required gate in run_backend_tests.sh.
#if defined(__clang__)
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wreturn-type"
#elif defined(__GNUC__)
#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wreturn-type"
#endif
#define main historical_backend_tests_main
#include "backend_tests.cpp"
#undef main
#if defined(__clang__)
#pragma clang diagnostic pop
#elif defined(__GNUC__)
#pragma GCC diagnostic pop
#endif

namespace {
std::string automaticSample(int measured, unsigned thermal = 0, bool pump = false,
                            int control = 2332, int lower = 2500, int upper = 3000) {
    std::string value = sample(webEpoch, 100 + millis());
    value = replacing(value, "hw_t_centi=2332", "hw_t_centi=" + std::to_string(measured));
    value = replacing(value, " t_centi=2332", " t_centi=" + std::to_string(control));
    value = replacing(value, "lower_centi=2500", "lower_centi=" + std::to_string(lower));
    value = replacing(value, "upper_centi=3000", "upper_centi=" + std::to_string(upper));
    const std::string outputs = "out=" + std::to_string(pump ? 1 : 0) + "," +
        std::to_string(thermal & 1 ? 1 : 0) + "," + std::to_string(thermal & 2 ? 1 : 0);
    value = replacing(value, "out=0,0,0", outputs);
    if (pump) value = replacing(value, "pump=0", "pump=1");
    return value;
}
void automaticStatus(const std::string &payload) {
    if (transaction.kind == TX_NONE) tick(kPollMs);
    if (transaction.kind != TX_STATUS) fprintf(stderr, "Unexpected automatic status transaction %d: job=%s phase=%s fault=%s\n",
        static_cast<int>(transaction.kind), job.wireCommand.wire.c_str(), automatic.phase.c_str(), automatic.fault.c_str());
    check(transaction.kind == TX_STATUS);
    reply(transaction.id, "STAT", payload);
}
void automaticStatus(int measured, unsigned thermal = 0, bool pump = false,
                     int control = 2332, int lower = 2500, int upper = 3000) {
    if (transaction.kind == TX_NONE) tick(kPollMs);
    automaticStatus(automaticSample(measured, thermal, pump, control, lower, upper));
}
void acknowledgeWire() {
    check(job.pending && transaction.kind == TX_CONTROL && transaction.id == job.wireId);
    const uint32_t wireId = job.wireId;
    const Command wire = job.wireCommand;
    reply(wireId, "OK", tankweb::expectedAck(wire));
    check(job.pending && job.wireAccepted && transaction.kind == TX_CONFIRM);
}
void finishWire(int measured, unsigned thermal = 0, bool pump = false,
                int control = 2332, int lower = 2500, int upper = 3000) {
    acknowledgeWire();
    reply(transaction.id, "STAT", automaticSample(measured, thermal, pump, control, lower, upper));
}
void beginAutomatic(int measured, unsigned expected, bool pump = false) {
    restart();
    automaticStatus(measured, 0, pump);
    post("auto", ",\"enabled\":true");
    check(server.code == 202 && automatic.enabled && automatic.phase == "starting");
    check(job.command.kind == Command::AUTO && job.command.enabled && job.baseline);
    check(job.wireCommand.wire == "auto off");
    finishWire(measured, 0, pump);
    if (expected) {
        check(job.pending && !job.baseline && job.starting);
        check(job.wireCommand.wire == (expected == 2 ? "cool on" : "heat on"));
        finishWire(measured, expected, pump);
    }
    check(!job.pending && job.accepted && job.confirmed);
    check(automatic.enabled && automatic.phase == "running" && automatic.expected == expected);
    check(!tankweb::flag(status, "auto") && thermalBits() == expected);
    check(wireCount(" auto on\n") == 0);
}

void testAutomaticDirectionBoundariesAndMeasurements() {
    for (int temperature : {2499, 2500, 2700, 3000, 3001}) {
        const unsigned expected = temperature < 2500 ? 2 : temperature > 3000 ? 1 : 0;
        beginAutomatic(temperature, expected);
        check(status.outputs[2] == (temperature < 2500)); // Physical CH3 heater.
        check(status.outputs[1] == (temperature > 3000)); // Physical CH2 cooler.
        check(stateJson().find("\"owner\":\"esp32\",\"enabled\":true") != std::string::npos);
        check(stateJson().find("\"measurement\":\"temperature_display\",\"native_auto\":false") != std::string::npos);
    }

    // Before the first device run, the shared UI value follows fresh sensor
    // samples. STM32's separate t_centi does not participate in decisions.
    beginAutomatic(2700, 0);
    automaticStatus(2700, 0, false, 500);
    check(automatic.enabled && !job.pending && thermalBits() == 0);
    automaticStatus(2700, 0, false, 4500);
    check(automatic.enabled && !job.pending && thermalBits() == 0);
    automaticStatus(2499, 0, false, 2700);
    check(job.pending && job.internal && job.wireCommand.wire == "cool on");
    finishWire(2499, 2, false, 2700);
    check(automatic.enabled && thermalBits() == 2);
}

void reachDisplayedBoundary(int measured, unsigned thermal) {
    const uint32_t started = millis();
    // Advance real controller service and correlated sensor polls throughout
    // the model's 3 second delay and 30 second, one-degree curve.
    for (uint32_t offset = 500; offset <= 33000; offset += 500) {
        mockMillis = started + offset;
        pollUart();
        check(transaction.kind == TX_STATUS);
        Serial2.receive("R " + std::to_string(transaction.id) + " STAT " + automaticSample(measured, thermal) + "\r\n");
        loop();
        if (offset < 33000) check(!job.pending && automatic.enabled);
    }
    check(job.internal && job.pending && job.wireCommand.wire == "auto off");
}

void testAutomaticTransitionsAndVisibleJob() {
    for (const auto &scenario : {std::make_pair(2400, 2u), std::make_pair(3100, 1u)}) {
        const int measured = scenario.first;
        const unsigned thermal = scenario.second;
        const int boundary = thermal == 2 ? 2500 : 3000;
        beginAutomatic(measured, thermal);
        const uint32_t visibleId = job.id;
        const std::string visible = jobJson();
        reachDisplayedBoundary(measured, thermal);
        check(displayTemperature.view().centi == boundary);
        check(tankweb::number(status, "hw_t_centi") == measured);
        check(jobJson() == visible);
        finishWire(measured, 0);
        check(automatic.enabled && automatic.expected == 0 && !job.pending);
        check(jobJson() == visible && lastUserJob.id == visibleId);
        // Holding uses the UI value despite a real sensor still outside range.
        for (int unchanged : {measured, 4000, 1000}) {
            automaticStatus(unchanged, 0);
            check(displayTemperature.view().centi == boundary);
            check(automatic.enabled && !job.pending && thermalBits() == 0);
        }
        check(wireCount(" auto on\n") == 0);
    }
}

void testFreshStartupBaselineAndUnavailableDisplay() {
    restart();
    automaticStatus(2400);
    post("auto", ",\"enabled\":true");
    check(job.baseline && job.wireCommand.wire == "auto off");
    // The new correlated baseline arrives after the request and must replace
    // the prior display before deciding whether to heat or cool.
    finishWire(3100, 0);
    check(displayTemperature.view().centi == 3100);
    check(job.pending && job.wireCommand.wire == "heat on");
    finishWire(3100, 1);
    check(automatic.enabled && automatic.expected == 1);
    automaticStatus(replacing(automaticSample(3100,1), "aht_valid=1", "aht_valid=0"));
    check(!displayTemperature.view().fresh);
    check(!automatic.enabled && job.shutdown && job.wireCommand.wire == "auto off");
}

void testManualExitPumpAndRangeChanges() {
    beginAutomatic(2400, 2);
    post("pump", ",\"enabled\":true");
    check(server.code == 202 && automatic.enabled && job.wireCommand.wire == "pump on");
    finishWire(2400, 2, true);
    check(automatic.enabled && status.outputs[0] && automatic.expected == 2);
    post("pump_limit", ",\"seconds\":3");
    acknowledgeWire();
    reply(transaction.id, "STAT", replacing(automaticSample(2400, 2, true), "pump_limit_ms=30000", "pump_limit_ms=3000"));
    check(automatic.enabled && job.confirmed);
    post("range", ",\"lower_centi\":2000,\"upper_centi\":3000");
    check(server.code == 202 && job.wireCommand.wire == "range 2000 3000");
    finishWire(2400, 2, true, 2400, 2000, 3000);
    check(lastUserJob.confirmed && automatic.enabled);
    check(job.internal && job.pending && job.wireCommand.wire == "auto off");
    finishWire(2400, 0, true, 2400, 2000, 3000);
    check(status.outputs[0] && automatic.enabled && automatic.expected == 0);
    check(lastUserJob.command.kind == Command::RANGE && lastUserJob.confirmed);

    post("heat", ",\"enabled\":true");
    check(server.code == 202 && !automatic.enabled && automatic.phase == "off");
    finishWire(2400, 1, true, 2400, 2000, 3000);
    automaticStatus(2400, 1, true, 2400, 2000, 3000);
    check(!automatic.enabled && !job.pending && status.outputs[1]);

    beginAutomatic(2400, 2, true);
    post("auto", ",\"enabled\":false");
    check(server.code == 202 && !automatic.enabled && job.wireCommand.wire == "auto off");
    finishWire(2400, 0, true);
    check(automatic.phase == "off" && !automatic.needsOff && status.outputs[0]);
}

void testStopPreemptsAutomaticAndLateAcknowledgment() {
    beginAutomatic(2700, 0);
    tick(kPollMs);
    check(transaction.kind == TX_STATUS);
    Serial2.writable = 0;
    automaticStatus(2400, 0);
    check(job.pending && job.internal && transaction.kind == TX_NONE);
    const uint32_t canceled = job.wireId;
    const std::string written = Serial2.tx;
    const std::string oldSession = session.value();
    post("stop");
    check(server.code == 202 && !automatic.enabled && job.command.kind == Command::STOP);
    check(!session.matches(oldSession) && job.wireId != canceled);
    Serial2.writable = 1024;
    tick();
    check(transaction.kind == TX_CONTROL && job.wireCommand.wire == "stop");
    check(Serial2.tx.substr(written.size()).find("cool on") == std::string::npos);
    reply(canceled, "OK", "ACK cmd=cool on=1");
    check(job.pending && !job.accepted && !automatic.enabled);
    finishWire(2400, 0);
    check(job.confirmed && automatic.phase == "off" && !automatic.needsOff);
    automaticStatus(2400, 0);
    check(!automatic.enabled && !job.pending);
    post("auto", ",\"enabled\":true", &oldSession);
    check(server.code == 403 && !automatic.enabled);

    // A sent activation can no longer be withdrawn, but STOP supersedes it.
    beginAutomatic(2700, 0);
    automaticStatus(2400, 0);
    check(transaction.kind == TX_CONTROL && job.wireCommand.wire == "cool on");
    const uint32_t sent = job.wireId;
    post("stop");
    check(transaction.kind == TX_CONTROL && job.wireCommand.wire == "stop");
    reply(sent, "OK", "ACK cmd=cool on=1");
    check(!job.accepted && !automatic.enabled);
    finishWire(2400, 0);
    check(job.confirmed && !automatic.enabled);
}

void testAutomaticTimeoutsNeverRetryActivation() {
    beginAutomatic(2700, 0);
    automaticStatus(2400, 0);
    const uint32_t failed = job.wireId;
    const std::string activation = "W " + std::to_string(failed) + " cool on\n";
    tick(kReplyMs + 1);
    check(!automatic.enabled && automatic.phase == "fault" && automatic.needsOff);
    check(errorCode == "TIMEOUT" && wireCount(activation) == 1);
    check(transaction.kind == TX_CONTROL);
    check(job.pending && job.internal && job.shutdown && job.wireCommand.wire == "auto off");
    reply(failed, "OK", "ACK cmd=cool on=1");
    check(!job.accepted && !automatic.enabled);
    finishWire(2400, 0);
    check(!automatic.enabled && !automatic.needsOff && automatic.phase == "fault");
    automaticStatus(2400, 0);
    check(!job.pending && wireCount(activation) == 1 && wireCount("cool on\n") == 1);

    beginAutomatic(2700, 0);
    automaticStatus(3100, 0);
    acknowledgeWire();
    tick(kConfirmMs + 1);
    check(!automatic.enabled && automatic.needsOff && errorCode == "NOT_CONFIRMED");
    check(transaction.kind == TX_CONTROL);
    check(job.pending && job.shutdown && job.wireCommand.wire == "auto off");
    const uint32_t off = job.wireId;
    tick(kReplyMs + 1);
    check(!job.pending && automatic.needsOff && !automatic.enabled);
    check(wireCount("W " + std::to_string(off) + " auto off\n") == 1);
    check(wireCount("heat on\n") == 1);
}

void testDroppedPollPrioritizesShutdownBeforeRecovery() {
    beginAutomatic(2400, 2, true);
    tick(kPollMs);
    check(transaction.kind == TX_STATUS);
    const uint32_t lostPoll = transaction.id;
    const std::string before = Serial2.tx;
    // RX replies are lost while TX remains writable. The failed read must
    // release its slot to OFF before any further status request or handshake.
    tick(kReplyMs + 1);
    check(!automatic.enabled && automatic.phase == "fault" && automatic.needsOff);
    check(job.pending && job.shutdown && transaction.kind == TX_CONTROL);
    check(job.wireCommand.wire == "auto off");
    const std::string firstShutdown = Serial2.tx.substr(before.size());
    check(firstShutdown.find(" auto off\n") != std::string::npos);
    check(firstShutdown.find(" status\n") == std::string::npos);
    check(firstShutdown.find(" hello ") == std::string::npos);
    const uint32_t shutdown = job.wireId;

    // A late poll cannot confirm OFF; its output still belongs to the old
    // request. Lose the OFF acknowledgment and the first recovery hello too.
    reply(lostPoll, "STAT", automaticSample(2500, 2, true));
    check(job.pending && !job.accepted && job.wireId == shutdown);
    tick(kReplyMs + 1);
    check(automatic.needsOff && !job.pending && !automatic.enabled);
    check(transaction.kind == TX_INFO);
    check(wireCount("W " + std::to_string(shutdown) + " auto off\n") == 1);
    tick(kReplyMs + 1);
    check(!compatible && transaction.kind == TX_NONE && automatic.needsOff);
    tick(kRetryInfoMs);
    check(transaction.kind == TX_INFO);
    acceptRecoveryHello();
    reply(transaction.id, "STAT", automaticSample(2500, 2, true));
    check(job.pending && job.shutdown && job.wireCommand.wire == "auto off");
    finishWire(2500, 0, true);
    check(!automatic.enabled && automatic.phase == "fault" && !automatic.needsOff);
    check(thermalBits() == 0 && status.outputs[0]);
    check(wireCount("cool on\n") == 1 && wireCount("heat on\n") == 0);
}

void testInRangeShutdownAckLossStillPrioritizesOff() {
    beginAutomatic(2400, 2);
    reachDisplayedBoundary(2400, 2);
    check(automatic.enabled && job.internal && !job.shutdown);
    check(job.wireCommand.wire == "auto off" && transaction.kind == TX_CONTROL);
    const uint32_t lostOff = job.wireId;
    const std::string before = Serial2.tx;
    tick(kReplyMs + 1);
    check(!automatic.enabled && automatic.phase == "fault" && automatic.needsOff);
    check(job.pending && job.shutdown && job.wireId != lostOff);
    check(job.wireCommand.wire == "auto off" && transaction.kind == TX_CONTROL);
    const std::string retriedOff = Serial2.tx.substr(before.size());
    check(retriedOff.find(" auto off\n") != std::string::npos);
    check(retriedOff.find(" status\n") == std::string::npos);
    check(retriedOff.find(" hello ") == std::string::npos);
    reply(lostOff, "OK", "ACK cmd=auto on=0");
    check(!job.accepted && automatic.needsOff);
    finishWire(2500, 0);
    check(!automatic.needsOff && thermalBits() == 0 && automatic.phase == "fault");
    automaticStatus(2400, 0);
    check(!automatic.enabled && !job.pending && wireCount("cool on\n") == 1);
}

void testAutomaticInvalidSensorAndProfile() {
    const std::pair<const char *, const char *> invalid[] = {
        {"aht_valid=1", "aht_valid=0"}, {"aht_state=OK", "aht_state=ERROR"},
        {"aht_age_ms=30", "aht_age_ms=5001"}, {"sim_t=0", "sim_t=1"},
        {"sim_l=0", "sim_l=1"}, {"map_ok=1", "map_ok=0"},
        {"armed=1", "armed=0"}, {"map=1,2,3", "map=1,3,2"}
    };
    for (const auto &field : invalid) {
        beginAutomatic(2400, 2);
        automaticStatus(replacing(automaticSample(2400, 2), field.first, field.second));
        check(!automatic.enabled && automatic.phase == "fault" && automatic.needsOff);
        check(job.pending && job.internal && job.shutdown && job.wireCommand.wire == "auto off");
        finishWire(2400, 0);
        check(!automatic.enabled && !automatic.needsOff && automatic.phase == "fault");
        automaticStatus(2400, 0);
        check(!automatic.enabled && !job.pending); // Recovery never restarts AUTO.
    }
    // Bad partial-health values also block an initial start, without an ON.
    for (const auto &field : invalid) {
        restart();
        automaticStatus(replacing(automaticSample(2400), field.first, field.second));
        const std::string written = Serial2.tx;
        post("auto", ",\"enabled\":true");
        check(server.code == 409 && !automatic.enabled && Serial2.tx == written);
    }
}

void testNativeAutomaticLocalOverridesAndReset() {
    beginAutomatic(2700, 0);
    automaticStatus(replacing(automaticSample(2700), "auto=0", "auto=1"));
    check(!automatic.enabled && automatic.fault == "NATIVE_AUTO");
    check(job.pending && job.shutdown && job.wireCommand.wire == "auto off");
    finishWire(2700, 0);
    check(!automatic.enabled && automatic.phase == "fault");

    beginAutomatic(2400, 2);
    automaticStatus(2400, 0);
    check(!automatic.enabled && automatic.fault == "LOCAL_OVERRIDE");
    // A local OFF causes a shutdown confirmation, never a new activation.
    check(job.pending && job.shutdown && job.wireCommand.wire == "auto off" && thermalBits() == 0);
    finishWire(2400, 0);
    check(!job.pending && !automatic.needsOff && !automatic.enabled);

    beginAutomatic(2400, 2);
    tick(kPollMs);
    check(transaction.kind == TX_STATUS);
    const std::string previousSession = session.value();
    reply(transaction.id, "STAT", replacing(automaticSample(2400),
        "web_epoch=" + std::to_string(webEpoch), "web_epoch=0"));
    check(!automatic.enabled && automatic.fault == "STM_RESET" && !compatible);
    check(!session.matches(previousSession) && transaction.kind == TX_INFO);
    acceptRecoveryHello();
    reply(transaction.id, "STAT", automaticSample(2400));
    check(online(millis()) && !automatic.enabled && !job.pending && !automatic.needsOff);
    check(automatic.phase == "fault");
}

void testQueuedActivationRevalidatedBeforeWireSend() {
    beginAutomatic(2700, 0);
    tick(kPollMs);
    check(transaction.kind == TX_STATUS);
    Serial2.writable = 0;
    automaticStatus(2400, 0);
    check(job.pending && job.internal && job.wireCommand.wire == "cool on" && transaction.kind == TX_NONE);
    // Exercise the real scheduler after a newer validated cache sample arrives
    // before UART capacity returns. No stale queued ON may escape to the wire.
    std::string failure;
    check(tankweb::parseStatus(automaticSample(2700), status, failure));
    lastStatusAt = millis();
    Serial2.writable = 1024;
    tick();
    check(transaction.kind == TX_CONTROL && job.wireCommand.wire == "auto off");
    check(wireCount("cool on\n") == 0 && wireCount("heat on\n") == 0);
    finishWire(2700, 0);
    check(automatic.enabled && automatic.expected == 0);

    beginAutomatic(2700, 0);
    tick(kPollMs);
    check(transaction.kind == TX_STATUS);
    Serial2.writable = 0;
    automaticStatus(2400, 0);
    check(tankweb::parseStatus(replacing(automaticSample(2400), "aht_valid=1", "aht_valid=0"), status, failure));
    lastStatusAt = millis();
    Serial2.writable = 1024;
    tick();
    check(!automatic.enabled && automatic.needsOff && job.wireCommand.wire == "auto off");
    check(wireCount("cool on\n") == 0 && wireCount("heat on\n") == 0);
}

void testBootClosesLeftoverThermalPreservingPump() {
    // A new ESP process must not adopt a thermal output left running by an
    // earlier process. The startup handshake's first real STAT is authoritative.
    restart();
    automatic.bootChecked = false;
    automaticStatus(2400, 2, true);
    check(!automatic.enabled && automatic.phase == "stopping" && automatic.needsOff);
    check(job.pending && job.shutdown && job.wireCommand.wire == "auto off");
    finishWire(2400, 0, true);
    check(!automatic.enabled && !automatic.needsOff && status.outputs[0]);
    check(wireCount(" stop\n") == 0 && wireCount("pump off\n") == 0);
    automaticStatus(2400, 0, true);
    check(!job.pending && !automatic.enabled && automatic.phase == "off");
}

void testRecoveryGateBlocksEveryThermalActivation() {
    beginAutomatic(2700, 0);
    automaticFault("CONTROL_FAILED");
    automatic.retryOffAt = millis() + kRetryInfoMs;
    const std::string written = Serial2.tx;
    for (const char *action : {"heat", "cool", "auto"}) {
        post(action, ",\"enabled\":true");
        check(server.code == 409 && server.response.find("AUTO_RECOVERY") != std::string::npos);
        check(!automatic.enabled && !job.pending && Serial2.tx == written);
    }
    post("cool", ",\"enabled\":false");
    check(server.code == 202 && job.wireCommand.wire == "cool off" && !automatic.enabled);
    finishWire(2700, 0);
    check(!automatic.needsOff && !automatic.enabled);
}

void testStartBaselineAndPartialHealthNeverActivate() {
    restart();
    automaticStatus(2400);
    post("auto", ",\"enabled\":true");
    acknowledgeWire();
    // Sensor validity can change between the browser POST and the required
    // confirming baseline STAT. A valid POST alone cannot authorize an ON.
    reply(transaction.id, "STAT", replacing(automaticSample(2400), "aht_valid=1", "aht_valid=0"));
    check(!automatic.enabled && automatic.phase == "fault");
    check(wireCount("cool on\n") == 0 && wireCount("heat on\n") == 0);
    check(lastUserJob.errorCode == "AUTO_SENSOR" && !lastUserJob.confirmed);

    // An incomplete sensor health report is rejected by parseStatus, so the
    // last known good value cannot keep automatic control running indefinitely.
    beginAutomatic(2400, 2);
    automaticStatus(replacing(automaticSample(2400, 2), " aht_age_ms=30", ""));
    check(!automatic.enabled && automatic.phase == "fault" && automatic.needsOff);
    check(errorCode == "BAD_STAT" || errorCode == "UART_PROTOCOL");
    check(wireCount("cool on\n") == 1 && wireCount("heat on\n") == 0);

    beginAutomatic(2400, 2);
    const std::string before = Serial2.tx;
    mockMillis = lastStatusAt + kStaleMs;
    loop();
    check(!automatic.enabled && automatic.fault == "UART_STALE" && automatic.needsOff);
    check(job.pending && job.shutdown && job.wireCommand.wire == "auto off");
    check(Serial2.tx.substr(before.size()).find(" on\n") == std::string::npos);
    check(!online(millis()));
}
void testCompleteTelemetryBeforeDeadline() {
    beginAutomatic(3200, 1);
    tick(kPollMs);
    check(transaction.kind == TX_STATUS);
    const std::string payload = automaticSample(3200, 1) +
        " button_pressed=0,0,0 button_raw=0,0,0 raw_level=0,0,1 level=WET,WET,DRY"
        " relay_drive=L,H,L relay_read=0,1,0 led_bits=4 led_mode=liquid"
        " menu=HOME edit=0 selected=LOW draft_centi=2500 ui_note=NONE"
        " target_centi=2750 hyst_centi=250 oled_ok=1 oled_addr=60 page=0 rx_dropped=0";
    const std::string frame = "R " + std::to_string(transaction.id) + " STAT " + payload + "\r\n";
    check(frame.size() > 512 && frame.size() < 1200);
    Serial2.receive(frame);
    mockMillis = lastStatusAt + kStaleMs;
    tick();
    check(Serial2.rx.empty() && automatic.enabled && automatic.phase == "running");
    check(thermalBits() == 1 && errorCode.empty() && !job.pending);
}

void testNetworkWritesReleaseControlLock() {
    beginAutomatic(3200, 1);
    unsigned callbacks = 0;
    server.duringResponse = [&callbacks]() {
        check(!tankweb::controlLocked());
        check(static_cast<bool>(mockBackgroundTask()));
        mockBackgroundTask()();
        ++callbacks;
    };
    server.request = WebServer::Request();
    server.queued = true;
    tick();
    check(server.code == 200 && callbacks == 1 && automatic.enabled);
    post("invalid");
    check(server.code == 400 && callbacks == 2 && automatic.enabled);
    post("auto", ",\"enabled\":false");
    check(server.code == 202 && callbacks == 3 && !automatic.enabled);
    server.duringResponse = nullptr;
    finishWire(3200, 0);
}

void testAutoOffCancelsEveryStartupStage() {
    // Cancel both baseline and activation, before and after their ACKs.
    for (unsigned stage = 0; stage < 4; ++stage) {
        restart();
        automaticStatus(3200, 0, true);
        post("auto", ",\"enabled\":true");
        if (stage >= 2) finishWire(3200, 0, true);
        if (stage & 1) acknowledgeWire();
        check(job.pending && job.starting && automatic.phase == "starting");
        const uint32_t oldWireId = job.wireId, oldReplyId = transaction.id;
        const Command oldWire = job.wireCommand;
        const std::string oldToken = session.value();
        const std::string before = Serial2.tx;
        post("auto", ",\"enabled\":false");
        check(server.code == 202 && !automatic.enabled && automatic.phase == "stopping");
        check(job.pending && !job.starting && job.wireCommand.wire == "auto off");
        check(canceledCommands == 1 && !session.matches(oldToken));
        check(server.response.find(quote(session.value())) != std::string::npos);
        const uint32_t offId = job.wireId;
        reply(oldWireId, "OK", tankweb::expectedAck(oldWire));
        reply(oldReplyId, "STAT", automaticSample(3200, 1, true));
        check(job.wireId == offId && !job.accepted && !automatic.enabled);
        check(Serial2.tx.substr(before.size()).find(" on\n") == std::string::npos);
        finishWire(3200, 0, true);
        check(job.confirmed && !job.pending && !automatic.enabled && automatic.phase == "off");
        check(!status.outputs[1] && !status.outputs[2] && status.outputs[0]);
        post("auto", ",\"enabled\":true", &oldToken);
        check(server.code == 403 && !automatic.enabled && !job.pending);
        automaticStatus(3200, 0, true);
        check(!automatic.enabled && !job.pending);
    }
}

void testAutoOffPreemptsUserCommandsAndPreservesPump() {
    for (bool range : {false, true}) {
        beginAutomatic(2400, 2, true);
        post(range ? "range" : "pump", range ? ",\"lower_centi\":2000,\"upper_centi\":3000" : ",\"enabled\":true");
        check(server.code == 202 && job.pending && !job.internal);
        const uint32_t oldId = job.wireId;
        const Command oldCommand = job.wireCommand;
        const std::string oldToken = session.value();
        const std::string before = Serial2.tx;
        post("auto", ",\"enabled\":false");
        check(server.code == 202 && job.pending && job.wireCommand.wire == "auto off");
        check(!automatic.enabled && !session.matches(oldToken));
        reply(oldId, "OK", tankweb::expectedAck(oldCommand));
        check(!job.accepted && !automatic.enabled);
        finishWire(2400, 0, true, 2400, range ? 2000 : 2500, 3000);
        check(job.confirmed && !automatic.needsOff && !automatic.enabled);
        check(status.outputs[0] && !status.outputs[1] && !status.outputs[2]);
        const std::string after = Serial2.tx.substr(before.size());
        check(after.find(" stop\n") == std::string::npos && after.find(" pump off\n") == std::string::npos);
        post("heat", ",\"enabled\":true", &oldToken);
        check(server.code == 403 && !automatic.enabled && !job.pending);
    }
}

void testRepeatedAndStaleAutoOffRemainSafe() {
    beginAutomatic(3200, 1, true);
    post("auto", ",\"enabled\":false");
    const uint32_t firstOff = job.wireId;
    const std::string firstToken = session.value();
    post("auto", ",\"enabled\":false");
    check(server.code == 202 && job.wireId != firstOff && !session.matches(firstToken));
    reply(firstOff, "OK", "ACK cmd=auto on=0");
    check(!job.accepted && !automatic.enabled);
    finishWire(3200, 0, true);
    check(job.confirmed && !automatic.needsOff && status.outputs[0]);
    post("auto", ",\"enabled\":false");
    check(server.code == 202 && !automatic.enabled);
    finishWire(3200, 0, true);
    check(job.confirmed && !status.outputs[1] && !status.outputs[2]);

    // The cached state may be stale, but authenticated shutdown must still
    // reach UART instead of being rejected by the activation-only gate.
    mockMillis = lastStatusAt + kStaleMs;
    check(!online(millis()));
    post("auto", ",\"enabled\":false");
    check(server.code == 202 && job.pending && job.wireCommand.wire == "auto off");
    finishWire(3200, 0, true);
    check(job.confirmed && automatic.phase == "off" && !automatic.needsOff);
    check(status.outputs[0] && !status.outputs[1] && !status.outputs[2]);
}

void testOldPagesCannotActivateButCanShutDown() {
    for (const char *version : {static_cast<const char *>(nullptr), "tank-web-ui-1.12"}) {
        restart();
        const std::string before = Serial2.tx;
        for (const char *action : {"auto", "heat", "cool", "pump", "range", "pump_limit"}) {
            const std::string arguments = std::string(action) == "range" ? ",\"lower_centi\":2000,\"upper_centi\":3000" :
                std::string(action) == "pump_limit" ? ",\"seconds\":3" : ",\"enabled\":true";
            post(action, arguments, nullptr, version);
            check(server.code == 409 && server.response.find("UI_VERSION") != std::string::npos);
            check(server.response.find("http://192.168.4.1/?v=1.15") != std::string::npos);
            check(!job.pending && !automatic.enabled && Serial2.tx == before);
        }

        beginAutomatic(3200, 1, true);
        post("auto", ",\"enabled\":false", nullptr, version);
        check(server.code == 202 && !automatic.enabled && job.wireCommand.wire == "auto off");
        finishWire(3200, 0, true);
        check(job.confirmed && status.outputs[0] && !status.outputs[1] && !status.outputs[2]);
        for (const char *action : {"heat", "cool", "pump"}) {
            post(action, ",\"enabled\":false", nullptr, version);
            check(server.code == 202);
            finishWire(3200, 0, std::string(action) != "pump");
            check(job.confirmed);
        }
        post("stop", "", nullptr, version);
        check(server.code == 202 && job.wireCommand.wire == "stop");
        finishWire(3200, 0);
        check(job.confirmed && !status.outputs[0] && !status.outputs[1] && !status.outputs[2]);
    }
}
} // namespace

int main() {
    testAutomaticDirectionBoundariesAndMeasurements();
    testAutomaticTransitionsAndVisibleJob();
    testFreshStartupBaselineAndUnavailableDisplay();
    testManualExitPumpAndRangeChanges();
    testStopPreemptsAutomaticAndLateAcknowledgment();
    testAutomaticTimeoutsNeverRetryActivation();
    testDroppedPollPrioritizesShutdownBeforeRecovery();
    testInRangeShutdownAckLossStillPrioritizesOff();
    testAutomaticInvalidSensorAndProfile();
    testNativeAutomaticLocalOverridesAndReset();
    testQueuedActivationRevalidatedBeforeWireSend();
    testBootClosesLeftoverThermalPreservingPump();
    testRecoveryGateBlocksEveryThermalActivation();
    testStartBaselineAndPartialHealthNeverActivate();
    testCompleteTelemetryBeforeDeadline();
    testNetworkWritesReleaseControlLock();
    testAutoOffCancelsEveryStartupStage();
    testAutoOffPreemptsUserCommandsAndPreservesPump();
    testRepeatedAndStaleAutoOffRemainSafe();
    testOldPagesCannotActivateButCanShutDown();
    printf("ESP32-only AUTO actual backend state machine: %u checks passed\n", backendChecks);
    return 0;
}
