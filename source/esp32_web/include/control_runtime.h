#pragma once

#include <freertos/FreeRTOS.h>
#include <freertos/semphr.h>
#include <freertos/task.h>

namespace tankweb {
inline SemaphoreHandle_t &controlMutex() {
    static SemaphoreHandle_t mutex = nullptr;
    return mutex;
}

class ControlGuard {
public:
    ControlGuard() {
        if (controlMutex()) xSemaphoreTake(controlMutex(), portMAX_DELAY);
    }
    ~ControlGuard() {
        if (controlMutex()) xSemaphoreGive(controlMutex());
    }
    ControlGuard(const ControlGuard &) = delete;
    ControlGuard &operator=(const ControlGuard &) = delete;
};

inline void (*&controlStep())() {
    static void (*step)() = nullptr;
    return step;
}

inline void controlTask(void *) {
    for (;;) {
        controlStep()();
        vTaskDelay(1);
    }
}

inline bool startControlService(void (*step)()) {
    controlMutex() = xSemaphoreCreateMutex();
    if (!controlMutex()) return false;
    controlStep() = step;
    return xTaskCreatePinnedToCore(controlTask, "TankControl", 8192, nullptr, 2, nullptr, tskNO_AFFINITY) == pdPASS;
}
}
