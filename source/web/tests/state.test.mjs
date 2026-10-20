import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeSnapshot, parseRange, parseLimit, sensorState, makeDemo, selectDemoLevel, applyDemoCommand, tickDemo, LEVELS } from '../state.js';

test('unconnected telemetry remains unknown, rather than asserting outputs off', () => {
  const s = normalizeSnapshot({ online: false, stale: true, stm: null, outputs: null, age_ms: 0xffffffff });
  assert.equal(s.stale, true); assert.equal(s.outputsKnown, false); assert.equal(s.tempC, null); assert.equal(s.wetmask, null); assert.equal(s.ageMs, null); assert.equal(sensorState(s, 1), '未知');
  const sentinel = makeDemo(); sentinel.age_ms = 0xffffffff;
  assert.equal(normalizeSnapshot(sentinel).ageMs, null); assert.equal(normalizeSnapshot(sentinel).stale, true);
});

test('stale transport freezes activity while retaining explicitly last known state', () => {
  const p = makeDemo(); p.outputs.pump = true; p.outputs.heat = true;
  const byAge = normalizeSnapshot(p, { localAgeMs: 3501 });
  const byFailure = normalizeSnapshot(p, { transportFresh: false });
  for (const s of [byAge, byFailure]) { assert.equal(s.stale, true); assert.equal(s.sensorFresh, false); assert.equal(s.pump, true); assert.equal(s.heat, true); }
});

test('UI freshness uses device age plus browser elapsed time at the exact 1500ms boundary', () => {
  const p = makeDemo(); p.age_ms = 1499;
  assert.equal(normalizeSnapshot(p, { localAgeMs: 0 }).stale, false);
  assert.equal(normalizeSnapshot(p, { localAgeMs: 1 }).stale, true);
  p.age_ms = 2000;
  assert.equal(normalizeSnapshot(p, { localAgeMs: 0 }).stale, true);
  delete p.age_ms;
  assert.equal(normalizeSnapshot(p).stale, true);
});

test('aht fresh threshold includes elapsed browser time and uses hardware temperature', () => {
  const p = makeDemo(); p.stm.aht_age_ms = 4900; p.stm.t_centi = 990; p.stm.hw_t_centi = 2301; p.stm.sim_t = 1;
  assert.equal(normalizeSnapshot(p, { localAgeMs: 100 }).sensorFresh, true);
  const s = normalizeSnapshot(p, { localAgeMs: 101 });
  assert.equal(s.sensorFresh, false); assert.equal(s.tempC, 23.01); assert.equal(s.controlTempC, 9.9); assert.equal(s.simulation, true);
});

test('ESP32 automatic ownership is independent of the STM32 native AUTO flag', () => {
  const p = makeDemo();
  p.stm.auto = 0; p.stm.t_centi = 1000; p.stm.hw_t_centi = 2700;
  p.automatic_control = { owner: 'esp32', enabled: true, phase: 'running', fault: null };
  let s = normalizeSnapshot(p);
  assert.equal(s.auto, true); assert.equal(s.nativeAuto, false);
  assert.equal(s.automaticOwner, 'esp32'); assert.equal(s.automaticPhase, 'running');
  assert.equal(s.controlTempC, 27); assert.equal(s.automaticFault, null);
  p.stm.auto = 1; p.automatic_control.enabled = false;
  p.automatic_control.phase = 'fault'; p.automatic_control.fault = 'NATIVE_AUTO';
  s = normalizeSnapshot(p);
  assert.equal(s.auto, false); assert.equal(s.nativeAuto, true);
  assert.equal(s.automaticPhase, 'fault'); assert.equal(s.automaticFault, 'NATIVE_AUTO');
});

test('sensor freshness includes ESP32 cached status age and requires the backend AHT state', () => {
  const p = makeDemo(); p.stm.aht_age_ms = 4800; p.age_ms = 200;
  assert.equal(normalizeSnapshot(p).sensorFresh, true);
  assert.equal(normalizeSnapshot(p, { localAgeMs: 1 }).sensorFresh, false);
  p.age_ms = 400;
  assert.equal(normalizeSnapshot(p).sensorFresh, false);
  p.stm.aht_age_ms = 0;
  for (const ahtState of ['ERROR', 'BUSY', undefined]) {
    p.stm.aht_state = ahtState;
    assert.equal(normalizeSnapshot(p).sensorFresh, false);
  }
  assert.equal(normalizeSnapshot(p, { demo: true }).sensorFresh, true);
  p.stm.aht_state = 'OK'; p.stm.hw_t_centi = null;
  assert.equal(normalizeSnapshot(p).sensorFresh, false);
});

test('both STM32 level simulation flags are recognized', () => {
  for (const flag of ['sim_t', 'sim_l', 'level_sim']) {
    const p = makeDemo(); p.stm[flag] = 1;
    assert.equal(normalizeSnapshot(p).simulation, true);
  }
});

test('old payloads and browser demo retain native automatic ownership', () => {
  const p = makeDemo(); p.stm.auto = 1;
  assert.equal(normalizeSnapshot(p).auto, true);
  assert.equal(normalizeSnapshot(p).automaticOwner, 'stm32');
  p.automatic_control = { owner: 'esp32', enabled: false, phase: 'fault', fault: 'AHT_INVALID' };
  const demo = normalizeSnapshot(p, { demo: true });
  assert.equal(demo.auto, true); assert.equal(demo.automaticOwner, 'stm32');
  assert.equal(demo.automaticPhase, 'running'); assert.equal(demo.automaticFault, null);
});

test('range rejects invalid and rounding-collapsed bands before command transmission', () => {
  assert.deepEqual(parseRange('-40', '85'), { lower_centi: -4000, upper_centi: 8500 });
  assert.deepEqual(parseRange('25.5', '30'), { lower_centi: 2550, upper_centi: 3000 });
  for (const values of [['', '30'], ['a', '30'], ['30', '30'], ['-41', '30'], ['25', '86'], ['1.0001', '1.0002']]) assert.throws(() => parseRange(...values));
});

test('pump limit only accepts integral seconds inside firmware limits', () => {
  assert.deepEqual(parseLimit('1'), { seconds: 1 }); assert.deepEqual(parseLimit('300'), { seconds: 300 });
  for (const value of ['', '0', '301', '1.5', 'abc']) assert.throws(() => parseLimit(value));
});

test('three discrete liquid points preserve NC and abnormal combinations', () => {
  const p = makeDemo(); p.stm.level_mask = 6; p.stm.level_wetmask = 6;
  const s = normalizeSnapshot(p); assert.equal(sensorState(s, 1), '未知'); assert.equal(sensorState(s, 2), '湿态'); assert.equal(sensorState(s, 4), '湿态');
  assert.equal(LEVELS.LEVEL_ERR.visual, null); assert.equal(LEVELS.LEVEL_NC.visual, null);
});

test('browser demonstration keeps heat and cool mutually exclusive', () => {
  let d = makeDemo(); d = applyDemoCommand(d, 'heat', { enabled: true }, 0); assert.deepEqual(d.outputs, { pump: false, heat: true, cool: false });
  d = applyDemoCommand(d, 'cool', { enabled: true }, 0); assert.deepEqual(d.outputs, { pump: false, heat: false, cool: true }); assert.equal(d.stm.auto, 0);
  d = applyDemoCommand(d, 'auto', { enabled: true }, 0); assert.equal(d.stm.thermal, 'HOLD'); assert.equal(d.outputs.heat, false); assert.equal(d.outputs.cool, false);
  d = applyDemoCommand(d, 'range', { lower_centi: 1500, upper_centi: 1800 }, 0); assert.equal(d.outputs.cool, true); assert.equal(d.outputs.heat, false);
});

test('demo pump repeated ON does not reset continuous time and reaches exact limit', () => {
  let d = makeDemo(); d = applyDemoCommand(d, 'pump_limit', { seconds: 3 }, 0); d = applyDemoCommand(d, 'pump', { enabled: true }, 100);
  d = tickDemo(d, 2100, 2000); d = applyDemoCommand(d, 'pump', { enabled: true }, 2100);
  assert.equal(d.pumpStartedAt, 100);
  d = tickDemo(d, 3500, 1400); assert.equal(d.outputs.pump, false); assert.equal(d.stm.pump_ms, 3000); assert.equal(d.stm.pump_total_ms, 3000); assert.equal(d.stm.fault, 'PUMP_LIMIT');
});

test('demo STOP atomically clears all actuators and AUTO', () => {
  let d = makeDemo(); d = applyDemoCommand(d, 'auto', { enabled: true }, 0); d = applyDemoCommand(d, 'pump', { enabled: true }, 0);
  d = applyDemoCommand(d, 'stop', {}, 100); assert.deepEqual(d.outputs, { pump: false, heat: false, cool: false }); assert.equal(d.stm.auto, 0); assert.equal(d.stm.pump, 0);
});

test('continuous demonstration fill is excluded from real telemetry normalization', () => {
  const payload = makeDemo(); payload.stm.demo_visual_fill = 0.473;
  assert.equal(normalizeSnapshot(payload, { demo: true }).visualFill, 0.473);
  assert.equal(normalizeSnapshot(payload).visualFill, null);
  assert.equal(payload.stm.level_wetmask, 6);
});

test('demo drawdown crosses physical probe heights, preserves residual and stops at pump limit', () => {
  let d = applyDemoCommand(makeDemo(), 'pump', { enabled: true }, 0);
  d = tickDemo(d, 10000, 10000);
  assert.ok(Math.abs(d.stm.demo_visual_fill - 0.45) < 1e-10);
  assert.equal(d.stm.level_wetmask, 4); assert.equal(d.stm.level_state, 'LOW');
  d = tickDemo(d, 22000, 12000);
  assert.equal(d.stm.level_wetmask, 0); assert.equal(d.stm.level_state, 'EMPTY');
  d = tickDemo(d, 60000, 38000);
  assert.ok(Math.abs(d.stm.demo_visual_fill - (0.80 - 0.59) / 3.02) < 1e-10);
  assert.equal(d.stm.pump_total_ms, 30000); assert.equal(d.outputs.pump, false);
  const remaining = d.stm.demo_visual_fill;
  d = tickDemo(d, 70000, 10000);
  assert.equal(d.stm.demo_visual_fill, remaining);
});

test('demonstration stop freezes fill and manual level selection refills consistent probes', () => {
  let d = applyDemoCommand(makeDemo(), 'pump', { enabled: true }, 0);
  d = tickDemo(d, 4000, 4000);
  d = applyDemoCommand(d, 'stop', {}, 4000);
  const fill = d.stm.demo_visual_fill;
  d = tickDemo(d, 9000, 5000);
  assert.equal(d.stm.demo_visual_fill, fill);
  for (const [mask, name] of [[0, 'EMPTY'], [4, 'LOW'], [6, 'NORMAL'], [7, 'FULL']]) {
    const picked = selectDemoLevel(d, mask);
    assert.equal(picked.stm.level_wetmask, mask); assert.equal(picked.stm.level_state, name);
    assert.equal(picked.stm.demo_visual_fill, LEVELS[name].visual);
    const unchanged = tickDemo(picked, 10000, 1000);
    assert.equal(unchanged.stm.demo_visual_fill, LEVELS[name].visual);
  }
});

test('STOP and pump OFF settle the unsampled drawdown tail before stopping', () => {
  for (const [action, args] of [['stop', {}], ['pump', { enabled: false }]]) {
    let d = applyDemoCommand(makeDemo(), 'pump', { enabled: true }, 0);
    d = tickDemo(d, 5000, 5000);
    d = applyDemoCommand(d, action, args, 6250);
    assert.equal(d.stm.pump_ms, 6250); assert.equal(d.stm.pump_total_ms, 6250);
    assert.ok(Math.abs(d.stm.demo_visual_fill - 0.525) < 1e-10);
    assert.equal(d.stm.level_wetmask, 4); assert.equal(d.outputs.pump, false);
  }
});

test('editing a limit settles the original deadline and never rolls time backward', () => {
  let d = applyDemoCommand(makeDemo(), 'pump_limit', { seconds: 5 }, 0);
  d = applyDemoCommand(d, 'pump', { enabled: true }, 0);
  d = tickDemo(d, 1000, 1000);
  d = applyDemoCommand(d, 'pump_limit', { seconds: 20 }, 10000);
  assert.equal(d.outputs.pump, false); assert.equal(d.stm.pump_ms, 5000);
  assert.equal(d.stm.pump_total_ms, 5000);
  assert.ok(Math.abs(d.stm.demo_visual_fill - 0.55) < 1e-10);
  d = applyDemoCommand(makeDemo(), 'pump', { enabled: true }, 0);
  d = applyDemoCommand(d, 'pump_limit', { seconds: 3 }, 5000);
  assert.equal(d.outputs.pump, false); assert.equal(d.stm.pump_ms, 5000);
  d = tickDemo(d, 6000, 1000);
  assert.equal(d.stm.pump_ms, 5000); assert.equal(d.stm.pump_total_ms, 5000);
});

test('refilling a demo tank settles the previous liquid before replacing it', () => {
  let d = applyDemoCommand(makeDemo(), 'pump', { enabled: true }, 0);
  d = tickDemo(d, 1000, 1000);
  d = selectDemoLevel(d, 7, 6000);
  assert.equal(d.stm.pump_ms, 6000); assert.equal(d.stm.pump_total_ms, 6000);
  assert.equal(d.stm.demo_visual_fill, 0.92);
  d = tickDemo(d, 7000, 1000);
  assert.ok(Math.abs(d.stm.demo_visual_fill - 0.90) < 1e-10);
  assert.equal(d.stm.pump_total_ms, 7000);
});
