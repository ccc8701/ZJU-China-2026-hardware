export const LEVELS = Object.freeze({
  EMPTY: { name: '低液量', range: '液位低于下位传感器', color: 'red', visual: 0.08 },
  LOW: { name: '少量', range: '液位在下位与中位之间', color: 'yellow', visual: 0.30 },
  NORMAL: { name: '正常', range: '液位在中位与上位之间', color: 'green', visual: 0.65 },
  FULL: { name: '满液', range: '液位高于上位传感器', color: 'red', visual: 0.92 },
  LEVEL_ERR: { name: '液位异常', range: '探头组合不连续，液量未知', color: 'red', visual: null },
  LEVEL_NC: { name: '未配置', range: '液位传感器未完整配置', color: null, visual: null }
});
const finite = (value) => value !== null && value !== undefined && Number.isFinite(Number(value)) ? Number(value) : null;
const truth = (value) => value === true || value === 1 || value === '1';
const DEMO_LEVEL_NAMES = Object.freeze({ 0: 'EMPTY', 4: 'LOW', 6: 'NORMAL', 7: 'FULL' });
// Fractions correspond to the three probe heights on the displayed tank.
const DEMO_PROBES = Object.freeze({ lower: (1.24 - 0.59) / 3.02, middle: (2.20 - 0.59) / 3.02, upper: (3.16 - 0.59) / 3.02 });
const DEMO_INTAKE_FLOOR = (0.80 - 0.59) / 3.02;
const DEMO_DRAIN_PER_MS = 0.02 / 1000;

function validationError(message, i18nKey) {
  const error = new Error(message);
  error.i18nKey = i18nKey;
  return error;
}

export function normalizeSnapshot(payload, { demo = false, localAgeMs = 0, transportFresh = true } = {}) {
  const stm = payload?.stm ?? null;
  const rawAge = finite(payload?.age_ms);
  const age = stm && rawAge !== 0xffffffff && rawAge !== null && rawAge >= 0 ? rawAge : null;
  const online = Boolean(stm && payload?.online && transportFresh);
  const snapshotAge = age === null ? null : Math.max(0, age) + Math.max(0, localAgeMs);
  const stale = !online || Boolean(payload?.stale) || snapshotAge === null || snapshotAge >= 1500;
  const sampleAge = finite(stm?.aht_age_ms);
  const sensorFresh = !stale && truth(stm?.aht_valid) && (demo || stm?.aht_state === 'OK') &&
    sampleAge !== null && sampleAge >= 0 && sampleAge + snapshotAge <= 5000 && finite(stm?.hw_t_centi) !== null;
  const mask = finite(stm?.level_wetmask);
  const outputs = payload?.outputs;
  const tempC = finite(stm?.hw_t_centi);
  const humidity = finite(stm?.rh_centi);
  const temperatureDisplay = demo ? null : payload?.temperature_display;
  const displayCenti = temperatureDisplay && truth(temperatureDisplay.available) ? finite(temperatureDisplay.centi) : null;
  const automaticControl = !demo && payload?.automatic_control?.owner === 'esp32' ? payload.automatic_control : null;
  const automaticEnabled = automaticControl ? truth(automaticControl.enabled) : truth(stm?.auto);
  const automaticPhase = automaticControl && ['off', 'starting', 'running', 'stopping', 'fault'].includes(automaticControl.phase) ? automaticControl.phase : automaticEnabled ? 'running' : 'off';
  const automaticMeasurement = automaticControl ? automaticControl.measurement === 'temperature_display' ? 'temperature_display' : 'hw_t_centi' : 't_centi';
  // The ESP32 publishes the same centidegree value it uses for AUTO decisions.
  const controlCenti = automaticMeasurement === 'temperature_display' ? displayCenti : automaticControl ? tempC : finite(stm?.t_centi);
  return {
    online, stale, sensorFresh, demo, mock: Boolean(payload?.mock),
    ageMs: snapshotAge,
    tempC: tempC === null ? null : tempC / 100,
    displayTempC: temperatureDisplay || automaticMeasurement === 'temperature_display' ? displayCenti === null ? null : displayCenti / 100 : tempC === null ? null : tempC / 100,
    tempEstimated: Boolean(temperatureDisplay && truth(temperatureDisplay.estimated)),
    tempPhase: temperatureDisplay?.phase ?? 'measured',
    tempDelayMs: finite(temperatureDisplay?.delay_remaining_ms),
    thermalDisplaySwapped: !demo && truth(payload?.thermal_display_swapped),
    thermalControlReady: demo ? true : payload?.thermal_control_ready === undefined ? null : truth(payload.thermal_control_ready),
    relayChannels: !demo ? payload?.relay_channels ?? null : null,
    humidity: humidity === null ? null : humidity / 100,
    controlTempC: controlCenti === null ? null : controlCenti / 100,
    wetmask: mask === null ? null : (mask & 7),
    // The physical device has three discrete probes. Continuous fill is local to DEMO.
    visualFill: demo && finite(stm?.demo_visual_fill) !== null ? Math.min(1, Math.max(0, Number(stm.demo_visual_fill))) : null,
    configuredMask: finite(stm?.level_mask),
    level: LEVELS[stm?.level_state] ? stm.level_state : 'LEVEL_NC',
    thermal: stm?.thermal ?? 'IDLE',
    auto: automaticEnabled,
    automaticOwner: automaticControl ? 'esp32' : 'stm32',
    automaticMeasurement,
    automaticPhase,
    automaticFault: automaticControl?.fault ? String(automaticControl.fault) : null,
    automaticShutdownPending: Boolean(automaticControl && truth(automaticControl.shutdown_pending)),
    nativeAuto: truth(stm?.auto),
    pump: outputs ? truth(outputs.pump) : truth(stm?.pump),
    heat: outputs ? truth(outputs.heat) : false,
    cool: outputs ? truth(outputs.cool) : false,
    outputsKnown: Boolean(stm && outputs),
    lowerCenti: finite(stm?.lower_centi),
    upperCenti: finite(stm?.upper_centi),
    pumpLimitMs: finite(stm?.pump_limit_ms),
    pumpMs: finite(stm?.pump_ms),
    pumpTotalMs: finite(stm?.pump_total_ms),
    uptimeMs: finite(stm?.ms),
    fault: stm?.fault && stm.fault !== 'NONE' ? String(stm.fault) : null,
    simulation: truth(stm?.sim_t) || truth(stm?.sim_l) || truth(stm?.level_sim),
    ahtValid: truth(stm?.aht_valid),
    firmware: stm?.fw ?? '',
    pending: Boolean(payload?.pending),
    session: payload?.session ?? null,
    bootEpoch: payload?.boot_epoch ?? null,
    lastCommand: payload?.last_command ?? null,
    error: payload?.error ?? null,
    raw: payload
  };
}

export function parseRange(lower, upper) {
  const lo = finite(lower), hi = finite(upper);
  if (lower === '' || upper === '' || lo === null || hi === null) throw validationError('请填写有效温度。', 'validation.temperature');
  if (lo < -40 || hi > 85 || lo >= hi) throw validationError('温区须满足 −40°C ≤ 下限 < 上限 ≤ 85°C。', 'validation.range');
  const lower_centi = Math.round(lo * 100), upper_centi = Math.round(hi * 100);
  if (lower_centi >= upper_centi) throw validationError('上限至少应比下限高 0.01°C。', 'validation.precision');
  return { lower_centi, upper_centi };
}

export function parseLimit(value) {
  const seconds = finite(value);
  if (value === '' || !Number.isInteger(seconds) || seconds < 1 || seconds > 300) throw validationError('泵运行时限须为 1–300 秒的整数。', 'validation.limit');
  return { seconds };
}

export function sensorState(state, bit) {
  if (state.wetmask === null || state.configuredMask === null || !(state.configuredMask & bit)) return '未知';
  return state.wetmask & bit ? '湿态' : '干态';
}

export function makeDemo() {
  return {
    fw: 'browser-demo', session: null, online: true, stale: false, age_ms: 0, boot_epoch: 1,
    outputs: { pump: false, heat: false, cool: false }, pending: false, last_command: null,
    stm: { fw: '纯浏览器演示', ms: 0, t_centi: 2740, hw_t_centi: 2740, rh_centi: 5870, aht_valid: 1, aht_state: 'OK', aht_age_ms: 0, lower_centi: 2500, upper_centi: 3000, auto: 0, pump: 0, pump_ms: 0, pump_total_ms: 0, pump_limit_ms: 30000, level_mask: 7, level_wetmask: 6, level_state: 'NORMAL', demo_visual_fill: LEVELS.NORMAL.visual, thermal: 'IDLE', fault: 'NONE', sim_t: 0, sim_l: 0, level_sim: 0 }
  };
}

export function selectDemoLevel(state, wetmask, now = null) {
  const name = DEMO_LEVEL_NAMES[wetmask];
  if (!name) throw validationError('演示液位组合无效。', 'validation.demoLevel');
  const next = Number.isFinite(now) ? tickDemo(state, now, 0) : structuredClone(state);
  next.stm.demo_visual_fill = LEVELS[name].visual;
  next.stm.level_wetmask = Number(wetmask);
  next.stm.level_state = name;
  return next;
}

function syncDemoProbes(stm) {
  const fill = stm.demo_visual_fill;
  stm.level_wetmask = fill >= DEMO_PROBES.upper ? 7 : fill >= DEMO_PROBES.middle ? 6 : fill >= DEMO_PROBES.lower ? 4 : 0;
  stm.level_state = DEMO_LEVEL_NAMES[stm.level_wetmask];
}

function demoThermal(state) {
  if (!state.stm.auto) return;
  const t = state.stm.t_centi;
  state.outputs.heat = t < state.stm.lower_centi;
  state.outputs.cool = t > state.stm.upper_centi;
  state.stm.thermal = state.outputs.heat ? 'HEAT' : state.outputs.cool ? 'COOL' : 'HOLD';
}

export function applyDemoCommand(state, action, args, now) {
  // Settle the old command and its original deadline before changing controls.
  const settled = tickDemo(state, now, 0);
  const next = structuredClone(settled);
  if (action === 'range') Object.assign(next.stm, args);
  else if (action === 'pump_limit') {
    next.stm.pump_limit_ms = args.seconds * 1000;
    if (next.outputs.pump && next.stm.pump_ms >= next.stm.pump_limit_ms) {
      next.outputs.pump = false; next.stm.pump = 0; next.pumpStartedAt = null; next.stm.fault = 'PUMP_LIMIT';
    }
  }
  else if (action === 'auto') {
    next.stm.auto = args.enabled ? 1 : 0;
    if (!args.enabled) { next.outputs.heat = false; next.outputs.cool = false; next.stm.thermal = 'IDLE'; }
  } else if (action === 'pump') {
    next.stm.pump = args.enabled ? 1 : 0;
    next.outputs.pump = args.enabled;
    if (args.enabled && !settled.outputs.pump) { next.pumpStartedAt = now; next.stm.pump_ms = 0; next.stm.fault = 'NONE'; }
    if (!args.enabled) next.pumpStartedAt = null;
  } else if (action === 'heat' || action === 'cool') {
    next.stm.auto = 0;
    next.outputs.heat = action === 'heat' && args.enabled;
    next.outputs.cool = action === 'cool' && args.enabled;
    next.stm.thermal = args.enabled ? action === 'heat' ? 'HEAT' : 'COOL' : 'IDLE';
  } else if (action === 'stop') {
    next.outputs = { pump: false, heat: false, cool: false };
    next.stm.pump = 0; next.stm.auto = 0; next.stm.thermal = 'IDLE'; next.pumpStartedAt = null;
  }
  demoThermal(next);
  return next;
}

export function tickDemo(state, now, dt) {
  const next = structuredClone(state);
  next.stm.ms += dt;
  if (next.outputs.pump && Number.isFinite(next.pumpStartedAt)) {
    const elapsed = Math.max(0, now - next.pumpStartedAt);
    const effective = Math.max(next.stm.pump_ms, Math.min(elapsed, next.stm.pump_limit_ms));
    const increment = Math.max(0, effective - next.stm.pump_ms);
    next.stm.pump_ms = effective;
    next.stm.pump_total_ms += increment;
    const before = finite(next.stm.demo_visual_fill) ?? LEVELS[next.stm.level_state]?.visual ?? LEVELS.NORMAL.visual;
    // The suction port leaves a small residual below its centre; no negative volume.
    next.stm.demo_visual_fill = Math.max(Math.min(before, DEMO_INTAKE_FLOOR), before - increment * DEMO_DRAIN_PER_MS);
    syncDemoProbes(next.stm);
    if (elapsed >= next.stm.pump_limit_ms) { next.outputs.pump = false; next.stm.pump = 0; next.pumpStartedAt = null; next.stm.fault = 'PUMP_LIMIT'; }
  }
  demoThermal(next);
  return next;
}
