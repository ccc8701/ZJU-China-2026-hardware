#pragma once
#include "Arduino.h"
#define WIFI_AP 1

class IPAddress {
public:
    uint8_t bytes[4];
    IPAddress(uint8_t a = 0, uint8_t b = 0, uint8_t c = 0, uint8_t d = 0) : bytes{a,b,c,d} {}
    String toString() const {
        return String(std::to_string(bytes[0]) + "." + std::to_string(bytes[1]) + "." + std::to_string(bytes[2]) + "." + std::to_string(bytes[3]));
    }
};
class WiFiClass {
public:
    void mode(int) {}
    bool softAPConfig(IPAddress, IPAddress, IPAddress) { return true; }
    bool softAP(const char *, const char *, int, bool, int) { return true; }
    IPAddress softAPIP() const { return IPAddress(192,168,4,1); }
    unsigned softAPgetStationNum() const { return 1; }
};
extern WiFiClass WiFi;
