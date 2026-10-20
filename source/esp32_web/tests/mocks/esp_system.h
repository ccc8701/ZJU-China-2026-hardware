#pragma once
#include <stdint.h>
inline uint32_t esp_random() {
    static uint32_t state = 0x19b34e71;
    state ^= state << 13; state ^= state >> 17; state ^= state << 5;
    return state;
}
