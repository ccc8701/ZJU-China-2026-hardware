#pragma once

#include <stdint.h>
#include <stddef.h>
#include <string>
#include <vector>

namespace tankweb {

struct Value {
    enum Type { STRING, NUMBER, BOOLEAN, NIL } type = NIL;
    std::string text;
    int64_t number = 0;
    bool boolean = false;
};

struct Field { std::string key; Value value; };

// Small, strict, flat JSON request parser. Nested data is never a command.
bool parseJson(const std::string &source, std::vector<Field> &fields,
               std::string &error);
const Value *get(const std::vector<Field> &fields, const char *key);
std::string quote(const std::string &source);

struct Frame {
    enum Kind { OK, ERR, STAT, INFO } kind = ERR;
    uint32_t id = 0;
    std::string payload;
};
bool parseFrame(const std::string &line, Frame &frame, std::string &error);

struct Status {
    std::vector<Field> fields;
    uint32_t ms = 0;
    bool valid = false;
    bool outputs[3] = {false, false, false}; // pump, heat, cool after map
};
bool parseStatus(const std::string &payload, Status &status, std::string &error);
bool compatibleInfo(const std::string &payload, uint32_t expectedEpoch,
                    std::string *firmware = nullptr);
bool epochMatches(const Status &status, uint32_t expectedEpoch);
std::string fieldsJson(const std::vector<Field> &fields);
int64_t number(const Status &status, const char *key, int64_t fallback = 0);
bool flag(const Status &status, const char *key);
std::string text(const Status &status, const char *key);

struct Command {
    enum Kind { RANGE, AUTO, PUMP, PUMP_LIMIT, HEAT, COOL, STOP } kind = STOP;
    std::string action;
    std::string wire;
    bool enabled = false;
    int32_t lower = 0, upper = 0;
    uint32_t seconds = 0;
};
bool parseCommand(const std::vector<Field> &fields, Command &command,
                  std::string &error);
std::string expectedAck(const Command &command);
bool ackMatches(const Command &command, const std::string &payload);
bool confirmed(const Command &command, const Status &status);

class ClockMonitor {
public:
    // True means reset, false includes a legitimate uint32 millisecond wrap.
    bool observe(uint32_t remote, uint32_t local);
private:
    bool seen_ = false;
    uint32_t previous_ = 0, local_ = 0;
};

class SessionGate {
public:
    bool rotate(const std::string &token);
    bool matches(const std::string &token) const;
    const std::string &value() const { return current_; }
private:
    std::string current_;
};

class LineReader {
public:
    enum Result { WAIT, LINE, TOO_LONG, BAD_BYTE };
    Result put(uint8_t byte, std::string &line);
    void reset();
private:
    std::string buffer_;
    bool discarded_ = false;
};

} // namespace tankweb
