import test from 'node:test';
import assert from 'node:assert/strict';
import { makeDemo, normalizeSnapshot } from '../state.js';
import { projectDisplayState, displayThermalAction, thermalToggleCommand, controlTemperatureAssessment, thermalRelayChannels, canEnableAutomatic, canToggleThermal, automaticControlPresentation, confirmedControlRange } from '../display.js';

function snapshot(heat, cool, thermal) {
  const value = makeDemo();
  value.thermal_display_swapped = true;
  value.outputs.heat = heat; value.outputs.cool = cool; value.stm.thermal = thermal;
  return value;
}

test('channel reversal covers displayed state without mutating raw control telemetry', () => {
  for (const [heat, cool, thermal, expected] of [[true, false, 'HEAT', 'COOL'], [false, true, 'COOL', 'HEAT']]) {
    const payload = snapshot(heat, cool, thermal);
    const original = structuredClone(payload);
    const raw = normalizeSnapshot(payload);
    const shown = projectDisplayState(raw);
    assert.equal(shown.heat, cool); assert.equal(shown.cool, heat); assert.equal(shown.thermal, expected);
    assert.equal(raw.heat, heat); assert.equal(raw.cool, cool); assert.equal(raw.thermal, thermal);
    assert.deepEqual(payload, original);
  }
});

test('displayed heat and cool buttons toggle the exact underlying output', () => {
  for (const active of [false, true]) {
    const raw = normalizeSnapshot(snapshot(false, active, active ? 'COOL' : 'IDLE'));
    assert.deepEqual(thermalToggleCommand('heat', raw), { action: 'cool', enabled: !active });
    assert.deepEqual(thermalToggleCommand('cool', raw), { action: 'heat', enabled: true });
    assert.equal(displayThermalAction('cool', raw), 'heat');
    assert.equal(displayThermalAction('heat', raw), 'cool');
    for (const action of ['auto', 'pump', 'range', 'stop']) assert.equal(displayThermalAction(action, raw), action);
  }
});

test('browser demo retains its own heat and cool semantics, independent of device wiring', () => {
  const raw = normalizeSnapshot(snapshot(true, false, 'HEAT'), { demo: true });
  assert.equal(raw.thermalDisplaySwapped, false);
  assert.equal(projectDisplayState(raw).heat, true);
  assert.deepEqual(thermalToggleCommand('heat', raw), { action: 'heat', enabled: false });
});

test('HOLD, IDLE and pump states retain their meaning after thermal projection', () => {
  for (const thermal of ['HOLD', 'IDLE']) {
    const value = snapshot(false, false, thermal); value.outputs.pump = true;
    const shown = projectDisplayState(normalizeSnapshot(value));
    assert.equal(shown.thermal, thermal); assert.equal(shown.pump, true);
    assert.equal(shown.heat, false); assert.equal(shown.cool, false);
  }
});

test('modeled display temperature stays separate from measured and control temperatures', () => {
  const p = snapshot(false, true, 'COOL');
  p.stm.hw_t_centi = 2387; p.stm.t_centi = 2400;
  p.temperature_display = { available: true, centi: 2452, estimated: true, phase: 'ramp', delay_remaining_ms: 0 };
  const raw = normalizeSnapshot(p), shown = projectDisplayState(raw);
  assert.equal(raw.tempC, 23.87); assert.equal(raw.controlTempC, 24);
  assert.equal(shown.measuredTempC, 23.87); assert.equal(shown.tempC, 24.52);
  assert.equal(shown.tempEstimated, true); assert.equal(shown.heat, true);
  assert.equal(p.stm.hw_t_centi, 2387);
});

test('boot uses real sample, no initial sample stays unknown, and delay is explicit', () => {
  const p = snapshot(false, false, 'IDLE'); p.stm.hw_t_centi = 2312;
  p.temperature_display = { available: false, centi: null, estimated: false, phase: 'unavailable' };
  assert.equal(projectDisplayState(normalizeSnapshot(p)).tempC, null);
  p.temperature_display = { available: true, centi: 2312, estimated: false, phase: 'measured' };
  assert.equal(projectDisplayState(normalizeSnapshot(p)).tempC, 23.12);
  assert.equal(normalizeSnapshot(p).tempEstimated, false);
  p.temperature_display.estimated = true; p.temperature_display.phase = 'delay'; p.temperature_display.delay_remaining_ms = 3000;
  const delayed = projectDisplayState(normalizeSnapshot(p));
  assert.equal(delayed.tempC, 23.12); assert.equal(delayed.tempPhase, 'delay'); assert.equal(delayed.tempDelayMs, 3000);
});

test('unknown and stale telemetry never becomes a fresh modeled sensor reading', () => {
  const unknown = projectDisplayState(normalizeSnapshot(null));
  assert.equal(unknown.tempC, null); assert.equal(unknown.stale, true);
  const p = snapshot(false, true, 'COOL');
  p.temperature_display = { available: true, centi: 2512, estimated: true, phase: 'frozen' };
  const stale = projectDisplayState(normalizeSnapshot(p, { transportFresh: false }));
  assert.equal(stale.tempC, 25.12); assert.equal(stale.sensorFresh, false); assert.equal(stale.stale, true);
});

test('corrected STM32 mapping preserves the physical manual channels used by legacy firmware', () => {
  const legacy = snapshot(false, false, 'IDLE');
  legacy.thermal_control_ready = false;
  legacy.relay_channels = { pump: 1, heat: 3, cool: 2 };
  const fixed = snapshot(false, false, 'IDLE');
  fixed.thermal_display_swapped = false;
  fixed.thermal_control_ready = true;
  fixed.relay_channels = { pump: 1, heat: 3, cool: 2 };
  for (const action of ['heat', 'cool']) {
    const legacyState = normalizeSnapshot(legacy), fixedState = normalizeSnapshot(fixed);
    const oldCommand = thermalToggleCommand(action, legacyState);
    const newCommand = thermalToggleCommand(action, fixedState);
    const legacyMap = { heat: 2, cool: 3 }, fixedMap = { heat: 3, cool: 2 };
    assert.equal(legacyMap[oldCommand.action], fixedMap[newCommand.action]);
    assert.deepEqual(thermalRelayChannels(legacyState), thermalRelayChannels(fixedState));
  }
  assert.equal(canEnableAutomatic(normalizeSnapshot(legacy)), false);
  assert.equal(canEnableAutomatic(normalizeSnapshot(fixed)), true);
});

test('AUTO range assessment follows the actual control sample even when the estimate differs', () => {
  const p = snapshot(false, false, 'HOLD');
  p.thermal_display_swapped = false;
  p.thermal_control_ready = true;
  p.stm.lower_centi = 2500; p.stm.upper_centi = 3000; p.stm.auto = 1;
  p.temperature_display = { available: true, centi: 4000, estimated: true, phase: 'hold' };
  p.stm.hw_t_centi = 2700; p.stm.t_centi = 2700;
  let shown = projectDisplayState(normalizeSnapshot(p));
  assert.equal(shown.tempC, 40); assert.equal(shown.controlTempC, 27);
  assert.equal(controlTemperatureAssessment(shown), 'within');
  assert.equal(shown.thermal, 'HOLD'); assert.equal(shown.heat, false); assert.equal(shown.cool, false);
  p.temperature_display.centi = 2700; p.stm.t_centi = 2300;
  shown = projectDisplayState(normalizeSnapshot(p));
  assert.equal(shown.tempC, 27); assert.equal(controlTemperatureAssessment(shown), 'below');
  p.stm.t_centi = 3200;
  assert.equal(controlTemperatureAssessment(normalizeSnapshot(p)), 'above');
  for (const t of [2500, 3000]) {
    p.stm.t_centi = t;
    assert.equal(controlTemperatureAssessment(normalizeSnapshot(p)), 'within');
  }
  assert.equal(controlTemperatureAssessment(normalizeSnapshot(p, { transportFresh: false })), 'unknown');
  assert.equal(canEnableAutomatic(normalizeSnapshot(p, { transportFresh: false })), false);
});

test('channel labels use backend physical roles and retain safe legacy/demo fallbacks', () => {
  const p = snapshot(false, false, 'IDLE');
  assert.deepEqual(thermalRelayChannels(normalizeSnapshot(p)), { pump: 1, heat: 3, cool: 2 });
  assert.deepEqual(thermalRelayChannels(normalizeSnapshot(p, { demo: true })), { pump: 1, heat: 2, cool: 3 });
  p.thermal_display_swapped = false;
  p.relay_channels = { pump: 1, heat: 3, cool: 2 };
  assert.deepEqual(thermalRelayChannels(normalizeSnapshot(p)), { pump: 1, heat: 3, cool: 2 });
  p.relay_channels = { pump: 1, heat: 1, cool: 2 };
  assert.deepEqual(thermalRelayChannels(normalizeSnapshot(p)), { pump: 1, heat: 2, cool: 3 });
});


test('applied range is the STM32-confirmed range, independent of unsaved input drafts', () => {
  const p = snapshot(false, false, 'HOLD');
  p.stm.lower_centi = 2550; p.stm.upper_centi = 2950;
  const draftInputs = { lowerInput: '15.00', upperInput: '18.00' };
  const state = normalizeSnapshot(p);
  assert.deepEqual(confirmedControlRange({ ...state, ...draftInputs }), { lower: '25.50', upper: '29.50' });
  assert.equal(confirmedControlRange(normalizeSnapshot(null)), null);
  assert.equal(confirmedControlRange({ lowerCenti: 3000, upperCenti: 2500 }), null);
});

test('ESP32 AUTO uses the same physical heating/cooling channels as the correct manual controls', () => {
  for (const [heat, cool, expected] of [[false, true, 'HEAT'], [true, false, 'COOL'], [false, false, 'HOLD']]) {
    const p = snapshot(heat, cool, heat ? 'HEAT' : cool ? 'COOL' : 'IDLE');
    p.stm.auto = 0; p.thermal_control_ready = true;
    p.relay_channels = { pump: 1, heat: 3, cool: 2 };
    p.automatic_control = { owner: 'esp32', enabled: true, phase: 'running', fault: null };
    const raw = normalizeSnapshot(p), shown = projectDisplayState(raw);
    assert.equal(raw.auto, true); assert.equal(raw.nativeAuto, false);
    assert.equal(shown.thermal, expected); assert.equal(shown.heat, cool); assert.equal(shown.cool, heat);
    assert.deepEqual(thermalToggleCommand('heat', raw), { action: 'cool', enabled: !cool });
    assert.deepEqual(thermalToggleCommand('cool', raw), { action: 'heat', enabled: !heat });
    assert.equal(canEnableAutomatic(raw), true);
    assert.deepEqual(thermalRelayChannels(raw), { pump: 1, heat: 3, cool: 2 });
  }
});

test('older ESP32 firmware without a displayed-input contract retains its measured AUTO input', () => {
  const p = snapshot(false, false, 'IDLE');
  p.automatic_control = { owner: 'esp32', enabled: true, phase: 'running', fault: null };
  p.stm.lower_centi = 2500; p.stm.upper_centi = 3000;
  p.stm.hw_t_centi = 2700; p.stm.t_centi = 500;
  p.temperature_display = { available: true, estimated: true, centi: 4000, phase: 'hold' };
  let s = projectDisplayState(normalizeSnapshot(p));
  assert.equal(s.tempC, 40); assert.equal(s.controlTempC, 27);
  assert.equal(controlTemperatureAssessment(s), 'within'); assert.equal(s.thermal, 'HOLD');
  for (const [temperature, expected] of [[2499, 'below'], [2500, 'within'], [3000, 'within'], [3001, 'above']]) {
    p.stm.hw_t_centi = temperature;
    assert.equal(controlTemperatureAssessment(normalizeSnapshot(p)), expected);
  }
  s = normalizeSnapshot(p, { transportFresh: false });
  assert.equal(controlTemperatureAssessment(s), 'unknown'); assert.equal(canEnableAutomatic(s), false);
  p.stm.sim_t = 1;
  assert.equal(canEnableAutomatic(normalizeSnapshot(p)), false);
  p.stm.sim_t = 0; p.stm.level_sim = 1;
  assert.equal(canEnableAutomatic(normalizeSnapshot(p)), false);
});

test('ESP32 displayed-temperature AUTO uses the exact centidegree shown in the UI at both boundaries', () => {
  const p = snapshot(false, false, 'IDLE');
  p.automatic_control = { owner: 'esp32', measurement: 'temperature_display', enabled: true, phase: 'running' };
  p.stm.lower_centi = 2500; p.stm.upper_centi = 3000;
  p.stm.hw_t_centi = 3100; p.stm.t_centi = 500;
  p.temperature_display = { available: true, estimated: true, centi: 3000, phase: 'hold' };
  for (const [centi, assessment] of [[2499, 'below'], [2500, 'within'], [3000, 'within'], [3001, 'above']]) {
    p.temperature_display.centi = centi;
    const shown = projectDisplayState(normalizeSnapshot(p));
    assert.equal(shown.controlTempC, shown.tempC);
    assert.equal(shown.tempC.toFixed(2), (centi / 100).toFixed(2));
    assert.equal(shown.measuredTempC, 31);
    assert.equal(controlTemperatureAssessment(shown), assessment);
    assert.equal(canEnableAutomatic(shown), true);
  }
  // A valid model must never mask lost sensor/transport health.
  p.stm.aht_valid = 0;
  assert.equal(canEnableAutomatic(normalizeSnapshot(p)), false);
  assert.equal(controlTemperatureAssessment(normalizeSnapshot(p)), 'unknown');
  p.stm.aht_valid = 1;
  assert.equal(canEnableAutomatic(normalizeSnapshot(p, { transportFresh: false })), false);
});

test('a missing displayed control input stays unavailable instead of falling back to the sensor', () => {
  const p = snapshot(false, false, 'IDLE');
  p.automatic_control = { owner: 'esp32', measurement: 'temperature_display', enabled: false, phase: 'off' };
  for (const displayValue of [undefined, { available: false, centi: 2700 }, { available: true, centi: null }]) {
    p.temperature_display = displayValue;
    const shown = projectDisplayState(normalizeSnapshot(p));
    assert.equal(shown.sensorFresh, true);
    assert.equal(shown.tempC, null);
    assert.equal(shown.controlTempC, null);
    assert.equal(canEnableAutomatic(shown), false);
    assert.equal(controlTemperatureAssessment(shown), 'unknown');
  }
});

test('ESP32 AUTO transitions and faults never display a confirmed active controller', () => {
  const p = snapshot(false, false, 'IDLE');
  for (const [phase, enabled] of [['off', false], ['starting', true], ['running', true], ['stopping', false], ['fault', false]]) {
    p.automatic_control = { owner: 'esp32', enabled, phase, fault: phase === 'fault' ? 'UART_STALE' : null };
    const state = normalizeSnapshot(p), view = automaticControlPresentation(state);
    assert.equal(view.phase, phase); assert.equal(view.key, `temperature.autoPhase.${phase}`);
    assert.equal(view.active, phase === 'running');
    assert.equal(view.pending, phase === 'starting' || phase === 'stopping');
    assert.equal(view.fault, phase === 'fault');
    assert.equal(projectDisplayState(state).thermal, phase === 'running' ? 'HOLD' : 'IDLE');
    assert.equal(automaticControlPresentation(normalizeSnapshot(p, { transportFresh: false })).active, false);
  }
  // Report an output that is still energized while a fault is being shut down truthfully.
  p.outputs.heat = true;
  assert.equal(projectDisplayState(normalizeSnapshot(p)).cool, true);
  assert.equal(projectDisplayState(normalizeSnapshot(p)).thermal, 'COOL');
});

test('unconfirmed thermal shutdown blocks new ON requests but permits turning existing outputs OFF', () => {
  const p = snapshot(false, true, 'COOL');
  p.thermal_control_ready = true;
  p.automatic_control = { owner: 'esp32', enabled: false, phase: 'fault', fault: 'CONTROL_FAILED', shutdown_pending: true };
  let state = normalizeSnapshot(p);
  assert.equal(state.automaticShutdownPending, true);
  assert.equal(canEnableAutomatic(state), false);
  assert.equal(canToggleThermal('heat', state), true);
  assert.equal(canToggleThermal('cool', state), false);
  assert.deepEqual(thermalToggleCommand('heat', state), { action: 'cool', enabled: false });
  p.outputs.cool = false;
  state = normalizeSnapshot(p);
  assert.equal(canToggleThermal('heat', state), false);
  assert.equal(canToggleThermal('cool', state), false);
  p.automatic_control.shutdown_pending = false;
  state = normalizeSnapshot(p);
  assert.equal(canEnableAutomatic(state), true);
  assert.equal(canToggleThermal('heat', state), true);
  assert.equal(canToggleThermal('cool', state), true);
});
