#pragma once
#include <stdint.h>
#include <stddef.h>
#include <string>
#include <vector>
#include <deque>
#include <functional>

#define PROGMEM
#define SERIAL_8N1 0

class String {
public:
    std::string value;
    String() = default;
    String(const char *input) : value(input ? input : "") {}
    String(const std::string &input) : value(input) {}
    size_t length() const { return value.size(); }
    const char *c_str() const { return value.c_str(); }
    bool startsWith(const char *prefix) const { return value.compare(0, std::string(prefix).size(), prefix) == 0; }
    bool operator==(const char *other) const { return value == other; }
    bool operator!=(const char *other) const { return value != other; }
    bool operator!=(const String &other) const { return value != other.value; }
    String operator+(const String &other) const { return String(value + other.value); }
};

extern uint32_t mockMillis;
inline uint32_t millis() { return mockMillis; }
inline std::function<void()> &mockBackgroundTask() {
    static std::function<void()> task;
    return task;
}
inline void delay(unsigned value) {
    if (mockBackgroundTask()) mockBackgroundTask()();
    mockMillis += value;
}

class HardwareSerial {
public:
    std::deque<uint8_t> rx;
    std::string tx;
    // Arduino 2.0.17 starts with _txBufferSize=0: after begin(), only the
    // 128-byte FIFO is available unless a ring was configured beforehand.
    int writable = 128;
    bool begun = false;
    size_t txBufferSize = 0;
    void setRxBufferSize(size_t) {}
    size_t setTxBufferSize(size_t size) {
        if (begun) return 0;
        txBufferSize = size <= 128 ? 0 : size;
        writable = txBufferSize ? static_cast<int>(txBufferSize) : 128;
        return static_cast<size_t>(writable);
    }
    void setDebugOutput(bool) {}
    void setTimeout(unsigned) {}
    void setRxFIFOFull(unsigned) {}
    void setRxTimeout(unsigned) {}
    void begin(unsigned, unsigned, int = -1, int = -1) { begun = true; }
    int availableForWrite() const { return begun ? writable : 0; }
    int available() const { return static_cast<int>(rx.size()); }
    int read() { if (rx.empty()) return -1; auto c = rx.front(); rx.pop_front(); return c; }
    size_t write(uint8_t byte) { tx += static_cast<char>(byte); return 1; }
    size_t write(const uint8_t *data, size_t size) { tx.append(reinterpret_cast<const char *>(data), size); return size; }
    void receive(const std::string &source) { for (unsigned char c : source) rx.push_back(c); }
};
extern HardwareSerial Serial, Serial2;

class EspClass {
public:
    uint32_t getFreeHeap() const { return 123456; }
};
extern EspClass ESP;
