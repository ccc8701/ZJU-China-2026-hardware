#include "protocol.h"

#include <assert.h>
#include <stdio.h>
#include <limits.h>

using namespace tankweb;

namespace {
unsigned checks = 0;
void check(bool condition) { ++checks; assert(condition); }

const char *kStat =
    "ms=12345 web_epoch=42 auto=0 mode=OFF thermal=IDLE fault=NONE sim_t=0 sim_l=0"
    " t_centi=2332 hw_t_centi=2332 rh_centi=5901 aht_valid=1 aht_state=OK aht_age_ms=30 aht_failures=0"
    " target_centi=2750 hyst_centi=250 level_mask=7 level_polarity=low raw_level=1,0,0 level=DRY,WET,WET"
    " lower_centi=2500 upper_centi=3000 menu=HOME edit=0 selected=LOW draft_centi=2500 ui_note=NONE"
    " level_state=NORMAL level_wetmask=6 level_raw_wetmask=6 level_sim=0"
    " button_pressed=0,0,0 button_raw=0,0,0 armed=1 relay_active=high map=1,2,3 map_ok=1 out=0,0,0"
    " relay_drive=L,L,L relay_read=0,0,0 pump=0 pump_ms=0 pump_total_ms=3000 pump_limit_ms=30000"
    " u2_rx=100 u2_tx=1000 u2_rxdrop=1 u2_txdrop=0 u2_seq=10 u2_err=0"
    " led_bits=4 led_mode=liquid led_polarity=high oled_ok=1 oled_addr=60 page=0 rx_dropped=0";

std::string replace(std::string source, const std::string &old, const std::string &value) {
    size_t position = source.find(old);
    assert(position != std::string::npos);
    source.replace(position, old.size(), value);
    return source;
}
Command command(const std::string &body) {
    std::vector<Field> fields;
    std::string error;
    Command result;
    check(parseJson(body, fields, error));
    check(parseCommand(fields, result, error));
    return result;
}
Status sample(const std::string &source = kStat) {
    Status result;
    std::string error;
    check(parseStatus(source, result, error));
    return result;
}

void testJsonAndArguments() {
    std::vector<Field> fields;
    std::string error;
    check(parseJson("{\"session\":\"x\",\"action\":\"pump\",\"enabled\":true}", fields, error));
    check(fields.size() == 3 && get(fields, "enabled")->boolean);
    for (const char *bad : {
        "{\"action\":\"pump\",\"action\":\"stop\"}", "[]", "{}x",
        "{\"x\":1.5}", "{\"x\":01}", "{\"x\":+1}", "{\"x\":1e3}",
        "{\"x\":{}}", "{\"x\":[1]}", "{\"x\":true,}",
        "{\"x\":9223372036854775808}", "{\"x\":\"\\ud800\"}",
        "{\"x\":\"\\udc00\"}", "{\"x\":\"\\q\"}"})
        check(!parseJson(bad, fields, error));
    check(parseJson("{\"x\":\"\\u6c34\\ud83d\\udca7\"}", fields, error));
    check(get(fields, "x")->text == "水💧");
    check(quote("x\n\"\\") == "\"x\\u000a\\\"\\\\\"");

    const char *badCommands[] = {
        "{\"session\":\"x\",\"action\":\"raw\",\"command\":\"pump on\"}",
        "{\"session\":\"x\",\"action\":\"pump\",\"enabled\":1}",
        "{\"session\":\"x\",\"action\":\"pump\",\"enabled\":true,\"extra\":1}",
        "{\"session\":\"x\",\"action\":\"stop\",\"enabled\":true}",
        "{\"session\":\"x\",\"action\":\"range\",\"lower_centi\":2500,\"upper_centi\":2500}",
        "{\"session\":\"x\",\"action\":\"range\",\"lower_centi\":-4001,\"upper_centi\":3000}",
        "{\"session\":\"x\",\"action\":\"range\",\"lower_centi\":0,\"upper_centi\":8501}",
        "{\"session\":\"x\",\"action\":\"pump_limit\",\"seconds\":0}",
        "{\"session\":\"x\",\"action\":\"pump_limit\",\"seconds\":301}"
    };
    for (const char *body : badCommands) {
        Command result;
        check(parseJson(body, fields, error));
        check(!parseCommand(fields, result, error));
    }
    Command valid = command("{\"session\":\"x\",\"action\":\"range\",\"lower_centi\":-4000,\"upper_centi\":8500}");
    check(valid.wire == "range -4000 8500");
}

void testCorrelatedFrames() {
    Frame frame;
    std::string error;
    check(parseFrame("R 2147483647 OK ACK cmd=pump on=1", frame, error));
    check(frame.id == INT32_MAX && frame.kind == Frame::OK);
    for (const char *bad : {"ACK cmd=pump on=1", "R 0 OK ACK cmd=stop", "R 2147483648 OK x", "R 01 OK x", "R -1 OK x", "R 1 WHAT x", "R 1 STAT", "R 1 STAT "})
        check(!parseFrame(bad, frame, error));
    check(compatibleInfo("fw=tankctrl-3.0 proto=1 uart=USART2 baud=115200 read_only=0 sensor=AHT30 epoch=42", 42));
    std::string version;
    check(compatibleInfo("fw=tankctrl-3.1 proto=1 uart=USART2 baud=115200 read_only=0 epoch=42", 42, &version));
    check(version == "tankctrl-3.1");
    check(!compatibleInfo("fw=tankctrl-3.2 proto=1 uart=USART2 baud=115200 read_only=0 epoch=42", 42, &version));
    check(version == "tankctrl-3.1");
    check(!compatibleInfo("fw=tankdiag-2.2 proto=1 uart=USART2 baud=115200 read_only=1 epoch=42", 42));
    check(!compatibleInfo("fw=tankctrl-3.0 proto=2 uart=USART2 baud=115200 read_only=0 epoch=42", 42));
    check(!compatibleInfo("fw=tankctrl-3.0 proto=1 proto=1 uart=USART2 baud=115200 read_only=0 epoch=42", 42));
    check(!compatibleInfo("fw=tankctrl-3.0 proto=1 uart=USART2 baud=115200 read_only=0 epoch=41", 42));
    check(!compatibleInfo("fw=tankctrl-3.0 proto=1 uart=USART2 baud=115200 read_only=0", 42));
    check(!compatibleInfo("fw=tankctrl-3.0 proto=1 uart=USART2 baud=115200 read_only=0 epoch=0", 0));

    LineReader reader;
    std::string line;
    for (char c : std::string("R 7 OK ACK cmd=stop\r\n")) {
        auto result = reader.put(c, line);
        if (c == '\n') check(result == LineReader::LINE && line == "R 7 OK ACK cmd=stop");
    }
    for (unsigned i = 0; i < 1200; ++i) check(reader.put('x', line) == LineReader::WAIT);
    check(reader.put('x', line) == LineReader::TOO_LONG);
    check(reader.put('\n', line) == LineReader::WAIT);
    check(reader.put(0, line) == LineReader::BAD_BYTE);
    check(reader.put('\n', line) == LineReader::WAIT);
    for (char c : std::string("R 8 ERR code=forbidden\n")) {
        auto result = reader.put(c, line);
        if (c == '\n') check(result == LineReader::LINE);
    }
}

void testAckSemantics() {
    Command commands[] = {
        command("{\"session\":\"x\",\"action\":\"range\",\"lower_centi\":2500,\"upper_centi\":3000}"),
        command("{\"session\":\"x\",\"action\":\"auto\",\"enabled\":true}"),
        command("{\"session\":\"x\",\"action\":\"pump\",\"enabled\":false}"),
        command("{\"session\":\"x\",\"action\":\"pump_limit\",\"seconds\":3}"),
        command("{\"session\":\"x\",\"action\":\"heat\",\"enabled\":true}"),
        command("{\"session\":\"x\",\"action\":\"cool\",\"enabled\":false}"),
        command("{\"session\":\"x\",\"action\":\"stop\"}")
    };
    const char *acks[] = {"ACK cmd=range lower=2500 upper=3000", "ACK cmd=auto on=1", "ACK cmd=pump on=0", "ACK cmd=pump limit_s=3", "ACK cmd=heat on=1", "ACK cmd=cool on=0", "ACK cmd=stop"};
    for (unsigned i = 0; i < 7; ++i) {
        check(ackMatches(commands[i], acks[i]));
        check(!ackMatches(commands[i], std::string(acks[i]) + " old=1"));
        check(!ackMatches(commands[i], acks[(i + 1) % 7]));
    }
    check(!ackMatches(commands[0], "ACK cmd=range lower=2500 upper=3500"));
    check(!ackMatches(commands[1], "ACK cmd=auto on=0"));
    check(!ackMatches(commands[2], "ACK cmd=pump on=1"));
    check(!ackMatches(commands[3], "ACK cmd=pump limit_s=30"));
    check(!ackMatches(commands[4], "ACK cmd=heat on=0"));
    check(!ackMatches(commands[5], "ACK cmd=cool on=1"));
    // A prior/foreign request ID cannot become this transaction's ACK even
    // when its payload happens to match the current request.
    Frame frame;
    std::string error;
    check(parseFrame("R 10 OK ACK cmd=pump on=0", frame, error));
    uint32_t currentId = 11;
    check(!(frame.id == currentId && frame.kind == Frame::OK && ackMatches(commands[2], frame.payload)));
}

void testStatusAndConfirmation() {
    Status state = sample();
    check(state.ms == 12345 && !state.outputs[0] && !state.outputs[1] && !state.outputs[2]);
    check(flag(state, "aht_valid") && number(state, "rh_centi") == 5901);
    check(fieldsJson(state.fields).find("\"auto\":false") != std::string::npos);
    std::string error;
    Status invalid;
    for (const auto &bad : {
        std::string(kStat) + " ms=5", replace(kStat, "aht_valid=1", "aht_valid=2"),
        replace(kStat, "ms=12345", "ms=-1"), replace(kStat, "ms=12345", "ms=4294967296"),
        replace(kStat, "rh_centi=5901", "rh_centi=10001"), replace(kStat, "map=1,2,3", "map=1,1,3"),
        replace(kStat, "out=0,0,0", "out=0,1,1"), replace(kStat, "pump=0", "pump=1"),
        replace(kStat, "lower_centi=2500", "lower_centi=3000"), replace(kStat, "level_wetmask=6", "level_wetmask=8")})
        check(!parseStatus(bad, invalid, error));
    check(parseStatus(replace(kStat, "t_centi=2332", "t_centi=12000"), invalid, error));
    check(parseStatus(replace(kStat, "aht_age_ms=30", "aht_age_ms=4294967295"), invalid, error));

    Command stop = command("{\"session\":\"x\",\"action\":\"stop\"}");
    check(confirmed(stop, state));
    check(!confirmed(stop, sample(replace(kStat, "sim_t=0", "sim_t=1"))));
    Command range = command("{\"session\":\"x\",\"action\":\"range\",\"lower_centi\":2500,\"upper_centi\":3000}");
    check(confirmed(range, state));
    check(!confirmed(range, sample(replace(kStat, "upper_centi=3000", "upper_centi=3100"))));
    Command automatic = command("{\"session\":\"x\",\"action\":\"auto\",\"enabled\":true}");
    std::string autoState = replace(kStat, "auto=0", "auto=1");
    autoState = replace(replace(autoState, "out=0,0,0", "out=0,0,1"), "thermal=IDLE", "thermal=HEAT");
    autoState = replace(autoState, "map=1,2,3", "map=1,3,2");
    check(confirmed(automatic, sample(autoState)));
    check(!confirmed(automatic, sample(replace(autoState, "aht_age_ms=30", "aht_age_ms=5001"))));
    check(!confirmed(automatic, sample(replace(autoState, "aht_valid=1", "aht_valid=0"))));
    check(!confirmed(automatic, sample(replace(autoState, "armed=1", "armed=0"))));
    check(!confirmed(automatic, sample(replace(autoState, "map_ok=1", "map_ok=0"))));
    // An old physical role map must not pass AUTO confirmation, even if its
    // native logical decision is self-consistent. The loaded outputs differ.
    for (const char *map : {"1,2,3", "1,3,2"}) {
        for (int32_t temperature : {2499, 2500, 2750, 3000, 3001}) {
            std::string data = replace(replace(kStat, "map=1,2,3", std::string("map=") + map), "auto=0", "auto=1");
            data = replace(data, " t_centi=2332", " t_centi=" + std::to_string(temperature));
            bool heat = temperature < 2500, cool = temperature > 3000;
            const bool corrected = std::string(map) == "1,3,2";
            const char *out = !heat && !cool ? "0,0,0" : (heat != corrected) ? "0,1,0" : "0,0,1";
            data = replace(data, "out=0,0,0", std::string("out=") + out);
            data = replace(data, "thermal=IDLE", heat ? "thermal=HEAT" : cool ? "thermal=COOL" : "thermal=HOLD");
            check(confirmed(automatic, sample(data)) == corrected);
            if (!heat && !cool) {
                for (const char *bad : {"0,1,0", "0,0,1"})
                    check(!confirmed(automatic, sample(replace(data, "out=0,0,0", std::string("out=") + bad))));
            } else {
                const char *opposite = std::string(out) == "0,1,0" ? "0,0,1" : "0,1,0";
                check(!confirmed(automatic, sample(replace(data, std::string("out=") + out, std::string("out=") + opposite))));
            }
        }
    }
    Command pump = command("{\"session\":\"x\",\"action\":\"pump\",\"enabled\":true}");
    std::string pumping = replace(replace(kStat, "pump=0", "pump=1"), "out=0,0,0", "out=1,0,0");
    check(confirmed(pump, sample(pumping)));
    check(!confirmed(pump, state));
    Command limit = command("{\"session\":\"x\",\"action\":\"pump_limit\",\"seconds\":3}");
    check(confirmed(limit, sample(replace(kStat, "pump_limit_ms=30000", "pump_limit_ms=3000"))));
    check(!confirmed(limit, state));
    Command heat = command("{\"session\":\"x\",\"action\":\"heat\",\"enabled\":true}");
    std::string heated = replace(kStat, "out=0,0,0", "out=0,1,0");
    check(confirmed(heat, sample(heated)));
    check(!confirmed(heat, sample(replace(heated, "auto=0", "auto=1"))));
    // Changing physical channel mapping must not change role confirmation.
    heated = replace(replace(kStat, "map=1,2,3", "map=2,3,1"), "out=0,0,0", "out=0,0,1");
    check(confirmed(heat, sample(heated)));
    Command cool = command("{\"session\":\"x\",\"action\":\"cool\",\"enabled\":true}");
    check(confirmed(cool, sample(replace(kStat, "out=0,0,0", "out=0,0,1"))));
}

void testClock() {
    ClockMonitor clock;
    check(!clock.observe(100, 100));
    check(!clock.observe(100, 101));
    check(!clock.observe(500, 500));
    check(clock.observe(10, 600));
    check(!clock.observe(510, 1100));
    ClockMonitor wrap;
    check(!wrap.observe(UINT32_MAX - 100, 1000));
    check(!wrap.observe(50, 1151));
    check(wrap.observe(10, 1160));
    ClockMonitor unlikelyWrap;
    check(!unlikelyWrap.observe(0xf0000001, 100));
    check(unlikelyWrap.observe(1, 101));
    // RAM handshake detects a reboot even when remote ms moves forward.
    ClockMonitor forwardReset;
    check(!forwardReset.observe(100, 1000));
    check(!forwardReset.observe(200, 1500));
    check(epochMatches(sample(replace(kStat, "ms=12345", "ms=100")), 42));
    check(!epochMatches(sample(replace(replace(kStat, "ms=12345", "ms=200"), "web_epoch=42", "web_epoch=0")), 42));
    check(!epochMatches(sample(replace(kStat, "web_epoch=42", "web_epoch=43")), 42));
}

void testStopSessionBarrier() {
    SessionGate session;
    const std::string oldToken = "11111111111111111111111111111111";
    const std::string stopToken = "22222222222222222222222222222222";
    check(!session.matches(""));
    check(!session.rotate("short"));
    check(!session.rotate("gggggggggggggggggggggggggggggggg"));
    check(session.rotate(oldToken));
    check(session.matches(oldToken));
    check(!session.rotate(oldToken));
    // Accept STOP, immediately rotate, then let a delayed old ON arrive.
    check(session.rotate(stopToken));
    check(!session.matches(oldToken));
    check(session.matches(stopToken));
    check(!session.matches(stopToken + "0"));
    check(!session.matches("22222222222222222222222222222223"));
}
} // namespace

int main() {
    testJsonAndArguments();
    testCorrelatedFrames();
    testAckSemantics();
    testStatusAndConfirmation();
    testClock();
    testStopSessionBarrier();
    printf("ESP32 web protocol: %u checks passed\n", checks);
}
