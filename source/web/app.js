import { createIcons, Waves, Wifi, Radio, Check, Flame, Snowflake, Play, Square, OctagonX, Rotate3d, Pause, Thermometer, Droplets, Activity, Move, Info, Unplug, ArrowUpRight, SlidersHorizontal, Cpu, CheckCircle2, X } from 'lucide';
import { createTankScene } from './scene.js';
import { LEVELS, normalizeSnapshot, parseRange, parseLimit, sensorState, makeDemo, selectDemoLevel, applyDemoCommand, tickDemo } from './state.js';
import { layoutLabels } from './labels.js';
import { projectDisplayState, displayThermalAction, thermalToggleCommand, thermalRelayChannels, canEnableAutomatic, canToggleThermal, automaticControlPresentation, automaticToggleEnabled, isThermalShutdown } from './display.js';
import { getLanguage, setLanguage, t, translateDom, levelName, levelRange, sensorLabel, firmwareLabel, apiErrorMessage } from './i18n.js';
import { UI_VERSION } from './version.js';

createIcons({ icons: { Waves, Wifi, Radio, Check, Flame, Snowflake, Play, Square, OctagonX, Rotate3d, Pause, Thermometer, Droplets, Activity, Move, Info, Unplug, ArrowUpRight, SlidersHorizontal, Cpu, CheckCircle2, X } });
const $ = (id) => document.getElementById(id);
const setText = (id, text) => { const node = $(id); if (node.textContent !== String(text)) node.textContent = String(text); };
const duration = (ms) => ms === null ? '—' : `${(ms / 1000).toFixed(1)} s`;
const actionName = (action) => t(`action.${displayThermalAction(action, currentState()) || 'device'}`);
const copy = (key, params = {}) => ({ key, params });
const actionCopy = (key, action) => ({ key, action });
const serverCopy = (error, fallbackKey = 'ack.unconfirmed', params = {}) => ({ apiError: error, fallbackKey, params });
function copyText(message) {
  if (message?.apiError) return apiErrorMessage(message.apiError, message.fallbackKey, message.params);
  if (message?.key) return t(message.key, message.action ? { ...message.params, action: actionName(message.action) } : message.params);
  return String(message ?? '');
}

let mode = 'real';
let payload = null;
let receivedAt = 0;
let transportFresh = true;
let pollBusy = false;
let posting = false;
let awaiting = null;
let modeEpoch = 0;
let initialRequest = true;
let demo = makeDemo();
let lastDemoTick = performance.now();
let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let toastTimer;
let toastMessage = null;
let acknowledged = { kind: '', message: copy('ack.waiting') };
let scene;

const labelNodes = new Map([...document.querySelectorAll('[data-label]')].map((node) => [node.dataset.label, node]));
const leaderNodes = new Map([...labelNodes.keys()].map((id) => {
  const line = document.createElement('span'); line.className = 'callout-leader';
  $('modelLabels').prepend(line); return [id, line];
}));
try {
  scene = createTankScene($('scene'), {
    reducedMotion,
    onLabels: (labels) => {
      for (const label of layoutLabels(labels, $('scene').clientWidth, $('scene').clientHeight)) {
        const node = labelNodes.get(label.id);
        if (!node) continue;
        node.style.left = `${label.left}px`;
        node.style.top = `${label.top}px`;
        node.style.width = `${label.width}px`;
        node.style.height = `${label.height}px`;
        node.classList.toggle('visible', label.visible);
        node.classList.toggle('active', label.active);
        const leader = leaderNodes.get(label.id);
        leader.style.left = `${label.x}px`; leader.style.top = `${label.y}px`;
        leader.style.width = `${label.lineLength}px`; leader.style.transform = `rotate(${label.lineAngle}rad)`;
        leader.classList.toggle('visible', label.visible); leader.classList.toggle('active', label.active);
      }
    }
  });
} catch (error) {
  const notice = document.createElement('div');
  notice.className = 'scene-disconnected';
  const title = document.createElement('strong'); title.dataset.i18n = 'view.webglTitle'; title.textContent = t('view.webglTitle');
  const detail = document.createElement('span'); detail.dataset.i18n = 'view.webglDetail'; detail.textContent = t('view.webglDetail');
  notice.append(title, detail); $('scene').append(notice);
  console.error('WebGL initialization failed', error);
}

function currentState() {
  return normalizeSnapshot(mode === 'demo' ? demo : payload, {
    demo: mode === 'demo',
    localAgeMs: mode === 'demo' || !receivedAt ? 0 : performance.now() - receivedAt,
    transportFresh: mode === 'demo' || transportFresh
  });
}

function notify(message, error = false) {
  const node = $('toast');
  toastMessage = message;
  node.querySelector('span').textContent = copyText(message);
  node.classList.toggle('error', error); node.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => node.classList.remove('show'), error ? 6000 : 3200);
}

function ack(kind, message) { acknowledged = { kind, message }; render(); }

function renderLanguage() {
  const language = getLanguage();
  document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN';
  translateDom(document);
  $('languageToggle').setAttribute('aria-pressed', String(language === 'en'));
  $('languageToggle').setAttribute('title', t('language.current'));
  for (const node of $('languageToggle').querySelectorAll('[data-language]')) node.classList.toggle('active', node.dataset.language === language);
  $('scene').querySelector('canvas')?.setAttribute('aria-label', t('view.canvasAria'));
  if (toastMessage) $('toast').querySelector('span').textContent = copyText(toastMessage);
}

function syncInput(node, value) {
  if (value === null || node.dataset.dirty === 'true' || document.activeElement === node) return;
  node.value = value;
}

function processWords(state) {
  if (state.stale) return { title: t(initialRequest ? 'process.waiting' : 'process.offline'), description: t(state.raw?.stm ? 'process.lastFeedback' : 'process.noFeedback') };
  const actions = [];
  if (state.heat) actions.push(t('process.heating'));
  if (state.cool) actions.push(t('process.cooling'));
  if (state.pump) actions.push(t('process.dispensing'));
  const automatic = automaticControlPresentation(state);
  const title = automatic.pending || automatic.fault ? t(automatic.key) : actions.length ? actions.join(' · ') : t(state.auto && state.thermal === 'HOLD' ? 'process.hold' : 'process.idle');
  const faultKey = `fault.${state.fault}`;
  const description = automatic.fault ? automaticFaultText(state) : state.fault ? t(faultKey) === faultKey ? state.fault : t(faultKey) : t(state.auto ? 'process.automatic' : 'process.manual');
  return { title, description };
}

function automaticFaultText(state) {
  const key = `automaticFault.${state.automaticFault}`;
  return t(key) === key ? t('temperature.autoFaultUnknown') : t(key);
}

function thermalFlowWords(state) {
  const levelUnknown = state.configuredMask !== 7 || ![0, 4, 6, 7].includes(state.wetmask) || state.level === 'LEVEL_ERR' || state.level === 'LEVEL_NC';
  const phase = state.stale ? 'paused' : levelUnknown ? 'unknown' : state.wetmask === 0 ? 'empty' : state.heat ? 'heating' : state.cool ? 'cooling' : 'idle';
  return { phase, title: t(`thermal.${phase}`), note: t(phase === 'cooling' && state.wetmask === 4 ? 'thermal.coolingLowNote' : `thermal.${phase}Note`) };
}

function tag(id, text, color = '') {
  const node = $(id); node.textContent = text;
  node.className = `state-tag${color ? ` ${color}` : ''}`;
}

function render() {
  const s = projectDisplayState(currentState());
  const automatic = automaticControlPresentation(s, awaiting);
  const fresh = !s.stale;
  const known = Boolean(s.raw?.stm);
  const busy = posting || Boolean(awaiting) || Boolean(s.pending);
  const words = processWords(s);
  $('realMode').classList.toggle('active', mode === 'real');
  $('demoMode').classList.toggle('active', mode === 'demo');
  $('realMode').disabled = busy && mode === 'real'; $('demoMode').disabled = busy && mode === 'real';
  setText('controlMode', t(mode === 'demo' ? 'mode.browserDemo' : s.mock ? 'mode.mockApi' : 'mode.real'));
  $('modeNote').classList.toggle('demo', mode === 'demo');
  $('modeNote').querySelector('span').textContent = t(mode === 'demo' ? 'mode.demoNote' : s.mock ? 'mode.mockNote' : 'mode.realNote');
  $('connection').className = `connection ${mode === 'demo' ? 'demo' : fresh ? 'online' : initialRequest ? '' : 'offline'}`;
  setText('connectionText', t(mode === 'demo' ? 'connection.demo' : s.mock && fresh ? 'connection.mock' : fresh ? 'connection.online' : initialRequest ? 'connection.connecting' : 'connection.offline'));
  setText('tempValue', s.tempC === null ? '—' : s.tempC.toFixed(2));
  setText('tempLabel', t(s.tempEstimated ? 'temperature.estimated' : 'temperature.measured'));
  setText('tempSource', s.tempEstimated ? t('temperature.estimateSource') : 'AHT30');
  setText('humidityValue', s.humidity === null ? '—' : s.humidity.toFixed(2));
  const temperatureNote = t(s.tempPhase === 'delay' ? 'temperature.delay' : s.tempPhase === 'hold' ? 'temperature.hold' : s.tempPhase === 'frozen' ? 'temperature.frozen' : s.heat ? 'temperature.heatingEstimate' : s.cool ? 'temperature.coolingEstimate' : 'temperature.runningEstimate', { seconds: Math.ceil((s.tempDelayMs ?? 0) / 1000) });
  setText('tempStatus', !known || s.tempC === null ? t('temperature.waiting') : s.stale ? t('state.previous') : !s.sensorFresh ? t('temperature.invalid') : s.tempEstimated ? temperatureNote : t('temperature.valid'));
  $('tempValue').closest('.metric').classList.toggle('sample-invalid', !s.sensorFresh);
  setText('processValue', words.title); setText('processDescription', words.description);
  setText('sceneSource', t(mode === 'demo' ? 'view.demoSource' : s.mock ? 'view.mockSource' : s.simulation ? 'view.simulatedSource' : 'view.realSource'));
  $('sceneLiveBadge').className = `live-badge ${mode === 'demo' || s.mock ? 'demo' : s.stale ? 'offline' : ''}`;
  const badgeText = mode === 'demo' || s.mock ? 'DEMO' : s.stale ? 'OFFLINE' : 'LIVE';
  for (const child of $('sceneLiveBadge').childNodes) if (child.nodeType === Node.TEXT_NODE) child.textContent = badgeText;
  $('sceneWrap').classList.toggle('offline', s.stale);
  $('sceneDisconnected').hidden = fresh;
  $('sceneDisconnected').querySelector('strong').textContent = t(initialRequest ? 'view.waiting' : 'view.offline');
  $('sceneDisconnected').querySelector('span').textContent = t(known ? 'view.offlineKnown' : 'view.offlineUnknown');
  setText('lastUpdated', t(mode === 'demo' ? 'updated.demo' : s.ageMs === null ? 'updated.none' : 'updated.ago', { seconds: Math.floor((s.ageMs ?? 0) / 1000) }));
  setText('firmwareInfo', firmwareLabel(s.firmware) || 'FLOW / 01');
  const channels = thermalRelayChannels(s);
  setText('heaterChannel', `CH${channels.heat}`);
  setText('coolerChannel', `CH${channels.cool}`);
  setText('stripHeaterChannel', t('strip.heater', { channel: `CH${channels.heat}` }));
  setText('stripCoolerChannel', t('strip.cooler', { channel: `CH${channels.cool}` }));
  setText('autoDescription', t(s.automaticMeasurement === 'temperature_display' ? 'temperature.autoDisplayedDescription' : 'temperature.autoDescription'));
  const thermalFlow = thermalFlowWords(s);
  setText('thermalFlowState', thermalFlow.title); setText('thermalFlowNote', thermalFlow.note);
  document.querySelector('.thermal-analysis').dataset.phase = thermalFlow.phase;

  syncInput($('lowerInput'), s.lowerCenti === null ? null : (s.lowerCenti / 100).toFixed(2));
  syncInput($('upperInput'), s.upperCenti === null ? null : (s.upperCenti / 100).toFixed(2));
  syncInput($('pumpLimit'), s.pumpLimitMs === null ? null : Math.round(s.pumpLimitMs / 1000));
  const canControl = fresh && (mode === 'demo' || Boolean(s.session)) && s.outputsKnown && !busy;
  for (const id of ['lowerInput', 'upperInput', 'saveRange', 'pumpLimit', 'saveLimit', 'heatToggle', 'coolToggle', 'pumpStart', 'pumpStop']) $(id).disabled = !canControl;
  const hasSession = mode === 'demo' || Boolean(s.session);
  const shutdownRequested = isThermalShutdown(awaiting);
  const togglesOn = automaticToggleEnabled(s, awaiting);
  $('autoToggle').disabled = shutdownRequested || (togglesOn ? !canControl || !canEnableAutomatic(s) : !hasSession);
  $('heatToggle').disabled = !canControl || !canToggleThermal('heat', currentState());
  $('coolToggle').disabled = !canControl || !canToggleThermal('cool', currentState());
  $('pumpStart').disabled = !canControl || s.pump;
  $('pumpStop').disabled = !canControl || !s.pump;
  // STOP remains available during another request and uses a single priority job.
  $('stopAll').disabled = mode === 'real' && (!s.session || (posting && awaiting?.action === 'stop') || awaiting?.action === 'stop');
  document.querySelector('.control-panel').classList.toggle('busy', busy);
  $('autoToggle').setAttribute('aria-checked', String(known && automatic.active));
  $('autoToggle').setAttribute('aria-busy', String(automatic.pending));
  $('heatToggle').classList.toggle('active', known && s.heat); $('coolToggle').classList.toggle('active', known && s.cool);
  setText('heatValue', t(!s.outputsKnown ? 'sensor.unknown' : s.stale ? 'state.previous' : s.heat ? 'state.on' : 'state.off'));
  setText('coolValue', t(!s.outputsKnown ? 'sensor.unknown' : s.stale ? 'state.previous' : s.cool ? 'state.on' : 'state.off'));
  tag('thermalTag', !known ? t('state.waitingData') : s.stale ? t('state.unknown') : automatic.pending || automatic.fault ? t(automatic.key) : s.thermal === 'HEAT' ? 'HEAT' : s.thermal === 'COOL' ? 'COOL' : s.thermal === 'HOLD' ? 'HOLD' : t('state.idle'), s.stale ? '' : automatic.fault ? 'error' : automatic.pending ? '' : s.heat ? 'heat' : s.cool ? 'cool' : automatic.active ? 'active' : '');
  tag('pumpTag', t(!s.outputsKnown ? 'state.waitingData' : s.stale ? 'state.unknown' : s.pump ? 'pump.running' : s.fault === 'PUMP_LIMIT' ? 'pump.limited' : 'pump.stopped'), fresh && s.pump ? 'active' : s.fault === 'PUMP_LIMIT' ? 'error' : '');
  setText('pumpCurrent', duration(s.pumpMs)); setText('pumpTotal', duration(s.pumpTotalMs));
  const level = LEVELS[s.level];
  tag('levelTag', !known ? t('state.waitingData') : s.stale ? t('state.previous') : levelName(s.level), fresh && s.level === 'NORMAL' ? 'active' : fresh && (s.level === 'FULL' || s.level === 'LEVEL_ERR') ? 'error' : '');
  for (const node of document.querySelectorAll('[data-sensor]')) {
    const wet = sensorState(s, Number(node.dataset.sensor));
    node.classList.toggle('wet', known && wet === '湿态');
    node.querySelector('.wet-label').textContent = !known ? '—' : sensorLabel(wet);
  }
  for (const node of document.querySelectorAll('[data-color]')) node.classList.toggle('active', known && level.color === node.dataset.color);
  setText('liquidText', !known ? t('level.waiting') : s.stale ? t('level.last', { range: levelRange(s.level) }) : levelRange(s.level));
  setText('levelCaption', t(s.level === 'LEVEL_ERR' || s.level === 'LEVEL_NC' ? 'level.unknownCaption' : mode === 'demo' ? 'level.demoCaption' : 'level.realCaption', { range: levelRange(s.level) }));
  $('demoLevelControls').hidden = mode !== 'demo';
  for (const node of document.querySelectorAll('[data-demo-level]')) node.classList.toggle('active', Number(node.dataset.demoLevel) === s.wetmask);
  const labels = { upper: sensorLabel(sensorState(s, 1)), middle: sensorLabel(sensorState(s, 2)), lower: sensorLabel(sensorState(s, 4)), pump: t(s.pump ? 'state.running' : 'state.stopped'), heater: t(s.heat ? 'state.on' : 'state.off'), cooler: t(s.cool ? 'state.on' : 'state.off') };
  for (const [key, val] of Object.entries(labels)) {
    const node = document.querySelector(`[data-label-value="${key}"]`);
    node.textContent = !known ? '—' : s.stale ? t('state.previous') : val;
  }
  for (const [key, active, textKey] of [['Auto', s.auto, s.auto ? 'strip.auto' : 'strip.manual'], ['Heat', s.heat, s.heat ? 'strip.heating' : 'state.closed'], ['Cool', s.cool, s.cool ? 'strip.cooling' : 'state.closed'], ['Pump', s.pump, s.pump ? 'strip.dispensing' : 'pump.stopped']]) {
    $(`strip${key}`).classList.toggle('active', known && (key === 'Auto' ? automatic.active : active) && fresh);
    setText(`strip${key}Value`, t(!known ? 'state.waiting' : s.stale ? 'state.unknown' : key === 'Auto' && (automatic.pending || automatic.fault) ? automatic.key : textKey));
  }
  $('ackDot').className = `ack-dot ${busy ? 'pending' : acknowledged.kind}`;
  setText('ackMessage', busy ? t(awaiting?.action === 'auto' && s.automaticOwner === 'esp32' ? 'ack.autoPending' : 'ack.pending', { action: actionName(awaiting?.action) }) : copyText(acknowledged.message));
  for (const node of document.querySelectorAll('[data-operation]')) node.classList.toggle('busy', busy && displayThermalAction(awaiting?.action, currentState()) === node.dataset.operation);
  $('motionToggle').setAttribute('aria-pressed', String(reducedMotion));
  if (scene) {
    scene.update(s);
    // Read-only DOM diagnostics allow the rendered model to be checked without a control hook.
    $('scene').dataset.modelDiagnostics = JSON.stringify(scene.getDiagnostics());
  }
  setText('apInfo', payload?.wifi?.ap_ssid || 'TankLab-ESP32');
  setText('apAddress', `http://${payload?.wifi?.ap_ip || '192.168.4.1'}/`);
}

async function fetchJson(path, options = {}, timeoutMs = 6000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(path, { cache: 'no-store', ...options, signal: controller.signal });
    const data = await response.json();
    return { response, data };
  } finally { clearTimeout(timer); }
}

function finishJob(result) {
  const job = awaiting;
  if (!job || result?.id !== job.id) return;
  awaiting = null;
  if (result.confirmed === true && result.accepted === true && !result.error) {
    if (job.action === 'range') { $('lowerInput').dataset.dirty = 'false'; $('upperInput').dataset.dirty = 'false'; }
    if (job.action === 'pump_limit') $('pumpLimit').dataset.dirty = 'false';
    const message = job.action === 'auto' && currentState().automaticOwner === 'esp32' ? copy('ack.autoConfirmed') : actionCopy('ack.confirmed', job.action);
    acknowledged = { kind: 'success', message }; notify(message);
  } else {
    const message = result.error ? serverCopy(result.error) : copy(result.accepted ? 'ack.acceptedUnknown' : 'ack.unconfirmed');
    acknowledged = { kind: 'error', message }; notify(message, true);
  }
}

function consumeState(data) {
  payload = data; receivedAt = performance.now(); transportFresh = true; initialRequest = false;
  if (awaiting?.id !== null && awaiting) {
    if (data.boot_epoch !== awaiting.bootEpoch) {
      const message = copy('ack.sessionChanged');
      awaiting = null; acknowledged = { kind: 'error', message }; notify(message, true);
    } else if (!data.pending && data.last_command?.id === awaiting.id) finishJob(data.last_command);
    else if (performance.now() - awaiting.started > 5500) {
      awaiting = null; acknowledged = { kind: 'error', message: copy('ack.timeout') }; notify(acknowledged.message, true);
    }
  }
  if (!awaiting && acknowledged.message.key === 'ack.waiting' && data.online && !data.stale) acknowledged = { kind: 'success', message: copy(data.mock ? 'ack.mockConnected' : 'ack.connected') };
  render();
}

async function poll() {
  if (mode !== 'real' || pollBusy) return;
  pollBusy = true; const epoch = modeEpoch;
  try {
    const { response, data } = await fetchJson('/api/state', {}, 3200);
    if (mode !== 'real' || epoch !== modeEpoch) return;
    if (!response.ok || !data || !Object.hasOwn(data, 'online')) throw new Error('invalid_device_state');
    consumeState(data);
  } catch {
    if (mode === 'real' && epoch === modeEpoch) { transportFresh = false; initialRequest = false; render(); }
  } finally { pollBusy = false; }
}

async function command(action, args = {}) {
  if (mode === 'demo') {
    demo = applyDemoCommand(demo, action, args, performance.now());
    if (action === 'range') { $('lowerInput').dataset.dirty = 'false'; $('upperInput').dataset.dirty = 'false'; }
    if (action === 'pump_limit') $('pumpLimit').dataset.dirty = 'false';
    acknowledged = { kind: 'success', message: actionCopy('ack.demoUpdated', action) };
    render(); notify(actionCopy('ack.demoToast', action)); return;
  }
  const s = currentState();
  if (!s.session) { notify(copy('error.noSession'), true); return; }
  const priority = isThermalShutdown({ action, args });
  if (!priority && (posting || awaiting || s.pending || s.stale)) return;
  if (action === 'auto' && args.enabled && (!s.outputsKnown || !canEnableAutomatic(s))) return;
  if (awaiting?.action === 'stop' || action !== 'stop' && priority && isThermalShutdown(awaiting)) return;
  const previous = awaiting;
  const localJob = { id: null, action, args, bootEpoch: s.bootEpoch, started: performance.now() };
  if (previous && priority) previous.preempted = true;
  awaiting = localJob; posting = localJob; render();
  try {
    const { response, data } = await fetchJson('/api/command', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Tank-UI': UI_VERSION }, body: JSON.stringify({ session: s.session, action, ...args }) });
    if (awaiting !== localJob) return;
    if (!response.ok || data.error || data.ok !== true) {
      const message = data.error ? serverCopy(data.error, 'error.operation', { status: response.status }) : copy('error.operation', { status: response.status });
      awaiting = null; acknowledged = { kind: 'error', message }; notify(message, true);
      if (data.state) consumeState(data.state);
      return;
    }
    localJob.id = data.id;
    localJob.bootEpoch = data.state?.boot_epoch ?? localJob.bootEpoch;
    if (data.state) consumeState(data.state);
    if (data.confirmed === true) finishJob(data);
    else if (data.queued !== true && data.accepted !== true) { awaiting = null; ack('error', copy('error.notAccepted')); }
    await poll();
  } catch {
    if (awaiting === localJob) {
      awaiting = null; transportFresh = false;
      const message = copy('error.interrupted');
      acknowledged = { kind: 'error', message }; notify(message, true);
    }
  } finally {
    // A late reply from a preempted start must not clear the shutdown's busy state.
    if (posting === localJob) posting = false;
    render();
  }
}

function setMode(next) {
  if (mode === next || mode === 'real' && (posting || awaiting || currentState().pending)) return;
  mode = next; modeEpoch++; acknowledged = { kind: '', message: copy(next === 'demo' ? 'ack.demoMode' : 'ack.reading') };
  for (const node of [$('lowerInput'), $('upperInput'), $('pumpLimit')]) node.dataset.dirty = 'false';
  if (next === 'demo') { demo = makeDemo(); lastDemoTick = performance.now(); }
  else { transportFresh = false; initialRequest = true; poll(); }
  render();
}

$('realMode').addEventListener('click', () => setMode('real'));
$('demoMode').addEventListener('click', () => setMode('demo'));
$('tryDemo').addEventListener('click', () => setMode('demo'));
$('languageToggle').addEventListener('click', () => {
  // A language change only refreshes copy; device jobs, form drafts, and the 3D instance remain intact.
  setLanguage(getLanguage() === 'zh' ? 'en' : 'zh');
  renderLanguage(); render();
});
for (const node of [$('lowerInput'), $('upperInput'), $('pumpLimit')]) node.addEventListener('input', () => { node.dataset.dirty = 'true'; });
$('saveRange').addEventListener('click', () => { try { command('range', parseRange($('lowerInput').value, $('upperInput').value)); } catch (error) { notify(copy(error.i18nKey || 'api.argument', error.i18nParams), true); } });
$('saveLimit').addEventListener('click', () => { try { command('pump_limit', parseLimit($('pumpLimit').value)); } catch (error) { notify(copy(error.i18nKey || 'api.argument', error.i18nParams), true); } });
function toggleAutomatic() { return command('auto', { enabled: automaticToggleEnabled(currentState(), awaiting) }); }
$('autoToggle').addEventListener('click', toggleAutomatic);
function toggleThermal(displayAction) {
  const request = thermalToggleCommand(displayAction, currentState());
  command(request.action, { enabled: request.enabled });
}
$('heatToggle').addEventListener('click', () => toggleThermal('heat'));
$('coolToggle').addEventListener('click', () => toggleThermal('cool'));
$('pumpStart').addEventListener('click', () => command('pump', { enabled: true }));
$('pumpStop').addEventListener('click', () => command('pump', { enabled: false }));
$('stopAll').addEventListener('click', () => command('stop'));
$('resetView').addEventListener('click', () => scene?.resetView());
$('motionToggle').addEventListener('click', () => { reducedMotion = !reducedMotion; scene?.setReducedMotion(reducedMotion); render(); });
for (const node of document.querySelectorAll('[data-demo-level]')) node.addEventListener('click', () => {
  if (mode !== 'demo') return;
  demo = selectDemoLevel(demo, Number(node.dataset.demoLevel), performance.now()); render();
});
$('networkOpen').addEventListener('click', () => $('networkDialog').showModal());
$('networkClose').addEventListener('click', () => $('networkDialog').close());
$('networkDone').addEventListener('click', () => $('networkDialog').close());
$('networkDialog').addEventListener('click', (event) => { if (event.target === $('networkDialog')) { const b = event.target.getBoundingClientRect(); if (event.clientX < b.left || event.clientX > b.right || event.clientY < b.top || event.clientY > b.bottom) event.target.close(); } });

setInterval(() => {
  if (mode === 'demo') { const now = performance.now(); demo = tickDemo(demo, now, now - lastDemoTick); lastDemoTick = now; }
  render();
}, 250);
setInterval(() => { if (!posting) poll(); }, 700);
document.addEventListener('visibilitychange', () => { if (!document.hidden && mode === 'real') poll(); });
window.addEventListener('pagehide', (event) => { if (!event.persisted) scene?.dispose(); });
renderLanguage(); render(); poll();
