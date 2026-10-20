#pragma once
#include "Arduino.h"
#include <cassert>

namespace tankweb {
inline bool &controlLocked() {
    static bool locked = false;
    return locked;
}

class ControlGuard {
public:
    ControlGuard() { assert(!controlLocked()); controlLocked() = true; }
    ~ControlGuard() { controlLocked() = false; }
    ControlGuard(const ControlGuard &) = delete;
    ControlGuard &operator=(const ControlGuard &) = delete;
};

inline bool startControlService(void (*step)()) {
    mockBackgroundTask() = step;
    return true;
}
}
