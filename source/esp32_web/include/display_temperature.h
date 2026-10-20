#pragma once

#include <stdint.h>
#include <limits.h>

namespace tankweb {

// Shared modeled temperature used by the UI and ESP32 AUTO decisions. Real
// telemetry validity remains independently required. Call update each ESP loop, then
// share view() across every HTTP client; reading a view never advances time.
class DisplayTemperature {
public:
    enum Strategy { STEP, SMOOTH };
    enum Phase { UNAVAILABLE, MEASURED, DELAY, RAMP, HOLD, FROZEN };

    struct View {
        bool available = false;
        int32_t centi = 0;
        bool estimated = false;
        bool fresh = false;
        Phase phase = UNAVAILABLE;
        int direction = 0; // Confirmed active direction: -1 cool, 0 none, +1 heat.
        uint64_t elapsed_ms = 0;
        uint32_t delay_remaining_ms = 0;
    };

    explicit DisplayTemperature(Strategy strategy = STEP) : strategy_(strategy) {
        reset();
    }

    void reset() {
        available_ = false;
        everStarted_ = false;
        fresh_ = false;
        phase_ = UNAVAILABLE;
        direction_ = 0;
        centi_ = baseCenti_ = 0;
        elapsedMs_ = 0;
        previousMs_ = 0;
    }

    // now_ms is a monotonic uint32 millisecond clock (normal millis wrap is
    // supported). A caller supplies current telemetry freshness and sensor
    // validity on every loop, including loops without a new UART frame.
    void update(uint32_t now_ms, int32_t measured_centi, bool sample_valid,
                int direction, bool telemetry_fresh) {
        const int requested = direction > 0 ? 1 : (direction < 0 ? -1 : 0);
        fresh_ = sample_valid && telemetry_fresh;
        if (!fresh_) {
            // Commit no elapsed time from the failing update. The last value
            // confirmed by a healthy update is frozen throughout an outage.
            phase_ = available_ ? FROZEN : UNAVAILABLE;
            direction_ = 0;
            previousMs_ = now_ms;
            return;
        }

        if (!available_) {
            available_ = true;
            centi_ = measured_centi;
        }
        if (!everStarted_) {
            // Before the first heating/cooling episode, show the actual
            // temperature, including changes while the device remains idle.
            centi_ = measured_centi;
            previousMs_ = now_ms;
            elapsedMs_ = 0;
            if (requested == 0) {
                phase_ = MEASURED;
                return;
            }
            everStarted_ = true;
            start(now_ms, requested);
            return;
        }

        if (direction_ != 0) advance(now_ms);
        if (requested == 0) {
            direction_ = 0;
            previousMs_ = now_ms;
            phase_ = HOLD;
        } else if (requested != direction_) {
            // A stop/restart, reversal or recovery begins a fresh 3 s delay
            // from the last displayed value. Repeated ON polls do not restart.
            start(now_ms, requested);
        } else {
            phase_ = elapsedMs_ < kDelayMs ? DELAY : RAMP;
        }
    }

    View view() const {
        View result;
        result.available = available_;
        result.centi = centi_;
        result.estimated = everStarted_;
        result.fresh = fresh_;
        result.phase = phase_;
        result.direction = direction_;
        result.elapsed_ms = elapsedMs_;
        if (phase_ == DELAY) {
            result.delay_remaining_ms =
                static_cast<uint32_t>(kDelayMs - elapsedMs_);
        }
        return result;
    }

    Strategy strategy() const { return strategy_; }

    static const char *phaseName(Phase phase) {
        switch (phase) {
        case UNAVAILABLE: return "unavailable";
        case MEASURED: return "measured";
        case DELAY: return "delay";
        case RAMP: return "ramp";
        case HOLD: return "hold";
        case FROZEN: return "frozen";
        }
        return "unavailable";
    }

private:
    static const uint32_t kDelayMs = 3000;
    static const uint32_t kDegreeMs = 30000;

    void start(uint32_t now_ms, int direction) {
        baseCenti_ = centi_;
        direction_ = direction;
        elapsedMs_ = 0;
        previousMs_ = now_ms;
        phase_ = DELAY;
    }

    void advance(uint32_t now_ms) {
        const uint32_t delta = now_ms - previousMs_;
        previousMs_ = now_ms;
        const uint64_t maximum = UINT64_MAX;
        elapsedMs_ = elapsedMs_ > maximum - delta ? maximum : elapsedMs_ + delta;
        if (elapsedMs_ <= kDelayMs) {
            centi_ = baseCenti_;
            return;
        }

        const uint64_t activeMs = elapsedMs_ - kDelayMs;
        const uint64_t degrees = activeMs / kDegreeMs;
        uint64_t fractionCenti = 0;
        if (strategy_ == SMOOTH) {
            // 100 * smoothstep(t) = 100 * (3t^2 - 2t^3), evaluated as
            // integer centidegrees. Flooring the magnitude keeps a full
            // degree from being displayed before its exact 30 s boundary.
            const uint64_t part = activeMs % kDegreeMs;
            const uint64_t numerator =
                100 * part * part * (3 * kDegreeMs - 2 * part);
            const uint64_t denominator =
                static_cast<uint64_t>(kDegreeMs) * kDegreeMs * kDegreeMs;
            fractionCenti = numerator / denominator;
        }

        // There is no physical or configured-temperature clamp. Only the
        // int32 storage limits saturate, preventing numeric overflow after
        // an exceptionally long uninterrupted run.
        const uint64_t room = direction_ > 0
            ? static_cast<uint64_t>(static_cast<int64_t>(INT32_MAX) - baseCenti_)
            : static_cast<uint64_t>(static_cast<int64_t>(baseCenti_) - INT32_MIN);
        uint64_t change;
        if (degrees > room / 100) {
            change = room;
        } else {
            change = degrees * 100;
            change = fractionCenti > room - change ? room : change + fractionCenti;
        }
        const int64_t signedChange = static_cast<int64_t>(change) * direction_;
        centi_ = static_cast<int32_t>(static_cast<int64_t>(baseCenti_) + signedChange);
    }

    Strategy strategy_;
    bool available_;
    bool everStarted_;
    bool fresh_;
    Phase phase_;
    int direction_;
    int32_t centi_, baseCenti_;
    uint64_t elapsedMs_;
    uint32_t previousMs_;
};

} // namespace tankweb
