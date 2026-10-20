#include "protocol.h"

#include <limits.h>
#include <errno.h>
#include <stdlib.h>
#include <ctype.h>

namespace tankweb {
namespace {
bool integer(const std::string &source, int64_t &value) {
    if (source.empty()) return false;
    size_t first = source[0] == '-' ? 1 : 0;
    if (first == source.size()) return false;
    if (source[first] == '0' && first + 1 != source.size()) return false;
    for (size_t i = first; i < source.size(); ++i)
        if (source[i] < '0' || source[i] > '9') return false;
    errno = 0;
    char *end = nullptr;
    long long parsed = strtoll(source.c_str(), &end, 10);
    if (errno == ERANGE || !end || *end) return false;
    value = parsed;
    return true;
}

bool oneOf(const std::string &name, const char *list) {
    std::string wrapped = "," + name + ",";
    return std::string(list).find(wrapped) != std::string::npos;
}

class JsonReader {
public:
    explicit JsonReader(const std::string &input) : input_(input) {}
    bool read(std::vector<Field> &fields) {
        whitespace();
        if (!take('{')) return false;
        whitespace();
        if (take('}')) { whitespace(); return position_ == input_.size(); }
        while (fields.size() < 12) {
            Field field;
            if (!string(field.key) || field.key.empty()) return false;
            for (const auto &previous : fields) if (previous.key == field.key) return false;
            whitespace();
            if (!take(':')) return false;
            whitespace();
            if (peek() == '"') {
                field.value.type = Value::STRING;
                if (!string(field.value.text)) return false;
            } else if (literal("true")) {
                field.value.type = Value::BOOLEAN;
                field.value.boolean = true;
            } else if (literal("false")) {
                field.value.type = Value::BOOLEAN;
            } else if (literal("null")) {
                field.value.type = Value::NIL;
            } else {
                size_t start = position_;
                if (peek() == '-') ++position_;
                while (peek() >= '0' && peek() <= '9') ++position_;
                field.value.type = Value::NUMBER;
                if (!integer(input_.substr(start, position_ - start), field.value.number)) return false;
            }
            fields.push_back(field);
            whitespace();
            if (take('}')) { whitespace(); return position_ == input_.size(); }
            if (!take(',')) return false;
            whitespace();
        }
        return false;
    }
private:
    const std::string &input_;
    size_t position_ = 0;
    char peek() const { return position_ < input_.size() ? input_[position_] : 0; }
    bool take(char value) { if (peek() != value) return false; ++position_; return true; }
    void whitespace() { while (peek() == ' ' || peek() == '\t' || peek() == '\r' || peek() == '\n') ++position_; }
    bool literal(const char *value) {
        size_t size = std::char_traits<char>::length(value);
        if (input_.compare(position_, size, value)) return false;
        position_ += size;
        return true;
    }
    bool hex4(uint32_t &value) {
        value = 0;
        for (unsigned i = 0; i < 4; ++i) {
            char c = peek(); ++position_;
            value <<= 4;
            if (c >= '0' && c <= '9') value |= c - '0';
            else if (c >= 'A' && c <= 'F') value |= c - 'A' + 10;
            else if (c >= 'a' && c <= 'f') value |= c - 'a' + 10;
            else return false;
        }
        return true;
    }
    void utf8(std::string &output, uint32_t value) {
        if (value <= 0x7f) output += static_cast<char>(value);
        else if (value <= 0x7ff) {
            output += static_cast<char>(0xc0 | (value >> 6));
            output += static_cast<char>(0x80 | (value & 0x3f));
        } else if (value <= 0xffff) {
            output += static_cast<char>(0xe0 | (value >> 12));
            output += static_cast<char>(0x80 | ((value >> 6) & 0x3f));
            output += static_cast<char>(0x80 | (value & 0x3f));
        } else {
            output += static_cast<char>(0xf0 | (value >> 18));
            output += static_cast<char>(0x80 | ((value >> 12) & 0x3f));
            output += static_cast<char>(0x80 | ((value >> 6) & 0x3f));
            output += static_cast<char>(0x80 | (value & 0x3f));
        }
    }
    bool string(std::string &output) {
        whitespace();
        if (!take('"')) return false;
        while (position_ < input_.size()) {
            unsigned char c = input_[position_++];
            if (c == '"') return true;
            if (c < 0x20) return false;
            if (c != '\\') { output += c; continue; }
            char escaped = peek(); ++position_;
            if (escaped == '"' || escaped == '\\' || escaped == '/') output += escaped;
            else if (escaped == 'b') output += '\b';
            else if (escaped == 'f') output += '\f';
            else if (escaped == 'n') output += '\n';
            else if (escaped == 'r') output += '\r';
            else if (escaped == 't') output += '\t';
            else if (escaped == 'u') {
                uint32_t code;
                if (!hex4(code)) return false;
                if (code >= 0xd800 && code <= 0xdbff) {
                    if (!take('\\') || !take('u')) return false;
                    uint32_t low;
                    if (!hex4(low) || low < 0xdc00 || low > 0xdfff) return false;
                    code = 0x10000 + ((code - 0xd800) << 10) + low - 0xdc00;
                } else if (code >= 0xdc00 && code <= 0xdfff) return false;
                utf8(output, code);
            } else return false;
            if (output.size() > 512) return false;
        }
        return false;
    }
};

bool csv3(const std::string &source, int values[3], int low, int high) {
    if (source.size() != 5 || source[1] != ',' || source[3] != ',') return false;
    for (unsigned i = 0; i < 3; ++i) {
        int value = source[2 * i] - '0';
        if (value < low || value > high) return false;
        values[i] = value;
    }
    return true;
}

bool requiredNumber(const Status &status, const char *key, int64_t low, int64_t high) {
    const Value *value = get(status.fields, key);
    return value && value->type == Value::NUMBER && value->number >= low && value->number <= high;
}
bool requiredFlag(const Status &status, const char *key) {
    const Value *value = get(status.fields, key);
    return value && value->type == Value::BOOLEAN;
}
bool requiredText(const Status &status, const char *key) {
    const Value *value = get(status.fields, key);
    return value && value->type == Value::STRING && !value->text.empty();
}
} // namespace

bool parseJson(const std::string &source, std::vector<Field> &fields, std::string &error) {
    fields.clear();
    if (source.size() > 512 || !JsonReader(source).read(fields)) {
        fields.clear(); error = "Invalid flat JSON object (maximum 512 bytes, no duplicate fields).";
        return false;
    }
    return true;
}

const Value *get(const std::vector<Field> &fields, const char *key) {
    for (const auto &field : fields) if (field.key == key) return &field.value;
    return nullptr;
}

std::string quote(const std::string &source) {
    const char *hex = "0123456789abcdef";
    std::string result = "\"";
    for (unsigned char c : source) {
        if (c == '"' || c == '\\') { result += '\\'; result += c; }
        else if (c < 0x20) {
            result += "\\u00"; result += hex[c >> 4]; result += hex[c & 15];
        } else result += c;
    }
    return result + "\"";
}

bool parseFrame(const std::string &line, Frame &frame, std::string &error) {
    if (line.size() > 1200 || line.compare(0, 2, "R ")) {
        error = "Missing correlated R frame."; return false;
    }
    size_t idEnd = line.find(' ', 2);
    int64_t id;
    if (idEnd == std::string::npos || !integer(line.substr(2, idEnd - 2), id) || id < 1 || id > INT32_MAX) {
        error = "Invalid response id."; return false;
    }
    size_t typeEnd = line.find(' ', idEnd + 1);
    if (typeEnd == std::string::npos || typeEnd + 1 == line.size()) {
        error = "Missing response type or payload."; return false;
    }
    std::string kind = line.substr(idEnd + 1, typeEnd - idEnd - 1);
    if (kind == "OK") frame.kind = Frame::OK;
    else if (kind == "ERR") frame.kind = Frame::ERR;
    else if (kind == "STAT") frame.kind = Frame::STAT;
    else if (kind == "INFO") frame.kind = Frame::INFO;
    else { error = "Unknown response type."; return false; }
    frame.id = static_cast<uint32_t>(id);
    frame.payload = line.substr(typeEnd + 1);
    return true;
}

bool parseStatus(const std::string &payload, Status &status, std::string &error) {
    Status candidate;
    size_t position = 0;
    while (position < payload.size()) {
        size_t end = payload.find(' ', position);
        if (end == std::string::npos) end = payload.size();
        std::string pair = payload.substr(position, end - position);
        size_t equal = pair.find('=');
        if (equal == std::string::npos || equal == 0 || equal + 1 == pair.size() || pair.find('=', equal + 1) != std::string::npos) {
            error = "Invalid STAT key=value token."; return false;
        }
        Field field;
        field.key = pair.substr(0, equal);
        for (char c : field.key) if (!((c >= 'a' && c <= 'z') || c == '_' || (c >= '0' && c <= '9'))) {
            error = "Invalid STAT key."; return false;
        }
        if (get(candidate.fields, field.key.c_str())) { error = "Duplicate STAT key."; return false; }
        std::string value = pair.substr(equal + 1);
        for (unsigned char c : value) if (c < 33 || c > 126) { error = "Invalid STAT character."; return false; }
        if (oneOf(field.key, ",auto,aht_valid,sim_t,sim_l,level_sim,edit,armed,map_ok,pump,oled_ok,")) {
            if (value != "0" && value != "1") { error = "Invalid STAT boolean."; return false; }
            field.value.type = Value::BOOLEAN;
            field.value.boolean = value == "1";
        } else if (integer(value, field.value.number)) {
            field.value.type = Value::NUMBER;
        } else {
            field.value.type = Value::STRING;
            field.value.text = value;
        }
        candidate.fields.push_back(field);
        if (candidate.fields.size() > 80) { error = "Too many STAT fields."; return false; }
        position = end + 1;
    }
    const char *uintFields[] = {"ms", "aht_age_ms", "aht_failures", "pump_ms", "pump_total_ms", "pump_limit_ms", "u2_rx", "u2_tx", "u2_rxdrop", "u2_txdrop", "u2_seq", "u2_err", "web_epoch"};
    for (const char *key : uintFields) if (!requiredNumber(candidate, key, 0, UINT32_MAX)) { error = std::string("Missing/invalid STAT ") + key; return false; }
    const char *boolFields[] = {"auto", "pump", "aht_valid", "sim_t", "sim_l", "level_sim", "armed", "map_ok"};
    for (const char *key : boolFields) if (!requiredFlag(candidate, key)) { error = std::string("Missing/invalid STAT ") + key; return false; }
    const char *textFields[] = {"thermal", "fault", "aht_state", "level_state", "map", "out", "mode"};
    for (const char *key : textFields) if (!requiredText(candidate, key)) { error = std::string("Missing/invalid STAT ") + key; return false; }
    if (!requiredNumber(candidate, "t_centi", -4000, 12000) || !requiredNumber(candidate, "hw_t_centi", -4000, 12000) ||
        !requiredNumber(candidate, "rh_centi", 0, 10000) || !requiredNumber(candidate, "lower_centi", -4000, 8500) ||
        !requiredNumber(candidate, "upper_centi", -4000, 8500) || !requiredNumber(candidate, "level_wetmask", 0, 7) ||
        !requiredNumber(candidate, "level_mask", 0, 7) || number(candidate, "lower_centi") >= number(candidate, "upper_centi")) {
        error = "STAT sensor, range, or level is invalid."; return false;
    }
    int map[3], out[3];
    if (!csv3(text(candidate, "map"), map, 1, 3) || !csv3(text(candidate, "out"), out, 0, 1) ||
        map[0] == map[1] || map[0] == map[2] || map[1] == map[2]) {
        error = "STAT relay mapping is invalid."; return false;
    }
    for (unsigned i = 0; i < 3; ++i) candidate.outputs[i] = out[map[i] - 1] != 0;
    if (candidate.outputs[0] != flag(candidate, "pump") || (candidate.outputs[1] && candidate.outputs[2])) {
        error = "STAT relay state is inconsistent."; return false;
    }
    candidate.ms = static_cast<uint32_t>(number(candidate, "ms"));
    candidate.valid = true;
    status = candidate;
    return true;
}

bool compatibleInfo(const std::string &payload, uint32_t expectedEpoch,
                    std::string *firmware) {
    std::vector<Field> fields;
    size_t position = 0;
    while (position < payload.size()) {
        size_t end = payload.find(' ', position);
        if (end == std::string::npos) end = payload.size();
        std::string pair = payload.substr(position, end - position);
        size_t equal = pair.find('=');
        if (equal == std::string::npos || get(fields, pair.substr(0, equal).c_str())) return false;
        Field field;
        field.key = pair.substr(0, equal);
        field.value.type = Value::STRING;
        field.value.text = pair.substr(equal + 1);
        fields.push_back(field);
        position = end + 1;
    }
    auto matches = [&](const char *key, const char *expected) {
        const Value *value = get(fields, key);
        return value && value->text == expected;
    };
    const bool valid = expectedEpoch >= 1 && expectedEpoch <= INT32_MAX &&
           (matches("fw", "tankctrl-3.0") || matches("fw", "tankctrl-3.1")) &&
           matches("proto", "1") && matches("uart", "USART2") &&
           matches("baud", "115200") && matches("read_only", "0") &&
           matches("epoch", std::to_string(expectedEpoch).c_str());
    if (valid && firmware) *firmware = get(fields, "fw")->text;
    return valid;
}

bool epochMatches(const Status &status, uint32_t expectedEpoch) {
    return status.valid && expectedEpoch >= 1 && expectedEpoch <= INT32_MAX &&
           number(status, "web_epoch", -1) == expectedEpoch;
}

std::string fieldsJson(const std::vector<Field> &fields) {
    std::string result = "{";
    bool first = true;
    for (const auto &field : fields) {
        if (!first) result += ',';
        first = false;
        result += quote(field.key) + ':';
        if (field.value.type == Value::NUMBER) result += std::to_string(field.value.number);
        else if (field.value.type == Value::BOOLEAN) result += field.value.boolean ? "true" : "false";
        else if (field.value.type == Value::STRING) result += quote(field.value.text);
        else result += "null";
    }
    return result + '}';
}
int64_t number(const Status &status, const char *key, int64_t fallback) {
    const Value *value = get(status.fields, key);
    return value && value->type == Value::NUMBER ? value->number : fallback;
}
bool flag(const Status &status, const char *key) {
    const Value *value = get(status.fields, key);
    return value && value->type == Value::BOOLEAN && value->boolean;
}
std::string text(const Status &status, const char *key) {
    const Value *value = get(status.fields, key);
    return value && value->type == Value::STRING ? value->text : std::string();
}

bool parseCommand(const std::vector<Field> &fields, Command &command, std::string &error) {
    const Value *action = get(fields, "action");
    const Value *session = get(fields, "session");
    if (!action || action->type != Value::STRING || !session || session->type != Value::STRING) {
        error = "action and session must be strings."; return false;
    }
    Command candidate;
    candidate.action = action->text;
    std::string allowed = ",action,session,";
    if (candidate.action == "range") {
        candidate.kind = Command::RANGE;
        const Value *lo = get(fields, "lower_centi"), *hi = get(fields, "upper_centi");
        if (!lo || !hi || lo->type != Value::NUMBER || hi->type != Value::NUMBER || lo->number < -4000 || hi->number > 8500 || lo->number >= hi->number) {
            error = "Temperature range must satisfy -4000 <= lower_centi < upper_centi <= 8500."; return false;
        }
        candidate.lower = static_cast<int32_t>(lo->number);
        candidate.upper = static_cast<int32_t>(hi->number);
        candidate.wire = "range " + std::to_string(candidate.lower) + " " + std::to_string(candidate.upper);
        allowed += "lower_centi,upper_centi,";
    } else if (candidate.action == "pump_limit") {
        candidate.kind = Command::PUMP_LIMIT;
        const Value *seconds = get(fields, "seconds");
        if (!seconds || seconds->type != Value::NUMBER || seconds->number < 1 || seconds->number > 300) { error = "seconds must be an integer from 1 to 300."; return false; }
        candidate.seconds = static_cast<uint32_t>(seconds->number);
        candidate.wire = "pump limit " + std::to_string(candidate.seconds);
        allowed += "seconds,";
    } else if (candidate.action == "stop") {
        candidate.kind = Command::STOP;
        candidate.wire = "stop";
    } else if (candidate.action == "auto" || candidate.action == "pump" || candidate.action == "heat" || candidate.action == "cool") {
        const Value *enabled = get(fields, "enabled");
        if (!enabled || enabled->type != Value::BOOLEAN) { error = "enabled must be a boolean."; return false; }
        candidate.enabled = enabled->boolean;
        if (candidate.action == "auto") candidate.kind = Command::AUTO;
        else if (candidate.action == "pump") candidate.kind = Command::PUMP;
        else if (candidate.action == "heat") candidate.kind = Command::HEAT;
        else candidate.kind = Command::COOL;
        candidate.wire = candidate.action + (candidate.enabled ? " on" : " off");
        allowed += "enabled,";
    } else { error = "Unknown action."; return false; }
    for (const auto &field : fields) if (!oneOf(field.key, allowed.c_str())) { error = "Unexpected command field: " + field.key; return false; }
    command = candidate;
    return true;
}

bool confirmed(const Command &command, const Status &status) {
    if (!status.valid) return false;
    switch (command.kind) {
    case Command::RANGE: return number(status, "lower_centi") == command.lower && number(status, "upper_centi") == command.upper;
    case Command::AUTO: {
        if (flag(status, "auto") != command.enabled) return false;
        if (!command.enabled) return !status.outputs[1] && !status.outputs[2];
        if (text(status, "map") != "1,3,2" || !flag(status, "armed") || !flag(status, "map_ok") || !flag(status, "aht_valid") ||
            number(status, "aht_age_ms") > 5000 || text(status, "aht_state") != "OK") return false;
        // Confirm the actual closed-loop decision, not just an AUTO flag.
        // Only the STM32 control sample participates; display estimates do not.
        const int64_t temperature = number(status, "t_centi");
        const bool heat = temperature < number(status, "lower_centi");
        const bool cool = temperature > number(status, "upper_centi");
        return status.outputs[1] == heat && status.outputs[2] == cool &&
               text(status, "thermal") == (heat ? "HEAT" : cool ? "COOL" : "HOLD");
    }
    case Command::PUMP: return flag(status, "pump") == command.enabled && status.outputs[0] == command.enabled;
    case Command::PUMP_LIMIT: return number(status, "pump_limit_ms") == command.seconds * 1000u;
    case Command::HEAT: return !flag(status, "auto") && status.outputs[1] == command.enabled && (!command.enabled || !status.outputs[2]);
    case Command::COOL: return !flag(status, "auto") && status.outputs[2] == command.enabled && (!command.enabled || !status.outputs[1]);
    case Command::STOP: return !flag(status, "auto") && !flag(status, "pump") && !status.outputs[0] && !status.outputs[1] && !status.outputs[2] && !flag(status, "sim_t") && !flag(status, "sim_l");
    }
    return false;
}

std::string expectedAck(const Command &command) {
    switch (command.kind) {
    case Command::RANGE:
        return "ACK cmd=range lower=" + std::to_string(command.lower) + " upper=" + std::to_string(command.upper);
    case Command::PUMP_LIMIT:
        return "ACK cmd=pump limit_s=" + std::to_string(command.seconds);
    case Command::STOP:
        return "ACK cmd=stop";
    default:
        return "ACK cmd=" + command.action + " on=" + (command.enabled ? "1" : "0");
    }
}

bool ackMatches(const Command &command, const std::string &payload) {
    return payload == expectedAck(command);
}

bool ClockMonitor::observe(uint32_t remote, uint32_t local) {
    bool reset = false;
    if (seen_ && remote < previous_) {
        uint32_t remoteDelta = remote - previous_;
        uint32_t localDelta = local - local_;
        reset = !(previous_ > 0xf0000000u && remote < 0x10000000u && remoteDelta <= localDelta + 5000u);
    }
    seen_ = true;
    previous_ = remote;
    local_ = local;
    return reset;
}

bool SessionGate::rotate(const std::string &token) {
    if (token.size() != 32 || token == current_) return false;
    for (char c : token) if (!((c >= '0' && c <= '9') || (c >= 'a' && c <= 'f'))) return false;
    current_ = token;
    return true;
}
bool SessionGate::matches(const std::string &token) const {
    if (current_.empty() || token.size() != current_.size()) return false;
    uint8_t difference = 0;
    for (size_t i = 0; i < current_.size(); ++i) difference |= token[i] ^ current_[i];
    return difference == 0;
}

LineReader::Result LineReader::put(uint8_t byte, std::string &line) {
    if (byte == '\n') {
        bool wasDiscarded = discarded_;
        if (!wasDiscarded) line = buffer_;
        reset();
        return wasDiscarded || line.empty() ? WAIT : LINE;
    }
    if (discarded_) return WAIT;
    if (byte == '\r') return WAIT;
    if (byte < 32 || byte > 126) { buffer_.clear(); discarded_ = true; return BAD_BYTE; }
    if (buffer_.size() >= 1200) { buffer_.clear(); discarded_ = true; return TOO_LONG; }
    buffer_ += static_cast<char>(byte);
    return WAIT;
}
void LineReader::reset() { buffer_.clear(); discarded_ = false; }
} // namespace tankweb
