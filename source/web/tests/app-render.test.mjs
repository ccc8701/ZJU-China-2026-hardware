import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import * as state from '../state.js';
import * as display from '../display.js';
import * as i18n from '../i18n.js';
import * as version from '../version.js';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const app = readFileSync(new URL('../app.js', import.meta.url), 'utf8');
// Execute the production render function and its helpers against a small DOM.
// No copied render logic, browser dependencies, network requests or hardware.
const renderSource = app.slice(app.indexOf('function syncInput('), app.indexOf('async function fetchJson('));

class Element {
  constructor() {
    this.textContent = ''; this.dataset = {}; this.attributes = new Map(); this.childNodes = [];
    this.children = new Map(); this.classes = new Set(); this.disabled = false;
    this.classList = {
      toggle: (name, enabled) => enabled ? this.classes.add(name) : this.classes.delete(name),
      contains: (name) => this.classes.has(name)
    };
  }
  setAttribute(name, value) { this.attributes.set(name, String(value)); }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
  querySelector(selector) {
    if (!this.children.has(selector)) this.children.set(selector, new Element());
    return this.children.get(selector);
  }
  querySelectorAll() { return []; }
  closest(selector) { return this.querySelector(selector); }
}

function harness() {
  const nodes = new Map([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => [match[1], new Element()]));
  const root = new Element();
  const document = {
    activeElement: null,
    getElementById: (id) => { assert.ok(nodes.has(id), `render target #${id} exists in index.html`); return nodes.get(id); },
    querySelector: (selector) => root.querySelector(selector),
    querySelectorAll: () => []
  };
  let snapshot = state.normalizeSnapshot(null);
  const context = vm.createContext({
    ...state, ...display, ...i18n, ...version, document, Node: { TEXT_NODE: 3 },
    $: document.getElementById,
    setText: (id, text) => { document.getElementById(id).textContent = String(text); },
    duration: (ms) => ms === null ? '—' : `${(ms / 1000).toFixed(1)} s`,
    currentState: () => snapshot, copyText: () => '', actionName: () => '',
    mode: 'real', posting: false, awaiting: null, initialRequest: false,
    acknowledged: { kind: '', message: {} }, reducedMotion: false, scene: null, payload: null
  });
  vm.runInContext(renderSource, context, { filename: 'app.js:render' });
  return {
    node: document.getElementById,
    setPending: (request, isPosting = false) => { context.awaiting = request; context.posting = isPosting; },
    render: (payload, options = {}) => {
      snapshot = state.normalizeSnapshot(payload, options);
      context.payload = payload;
      vm.runInContext('render()', context);
    }
  };
}

function espSnapshot() {
  const payload = state.makeDemo();
  payload.session = 'test-only-session';
  payload.stm.auto = 0; payload.stm.hw_t_centi = 2700; payload.stm.t_centi = 500;
  payload.thermal_display_swapped = true; payload.thermal_control_ready = true;
  payload.automatic_control = { owner: 'esp32', measurement: 'temperature_display', enabled: true, phase: 'running', fault: null };
  payload.temperature_display = { available: true, estimated: true, centi: 4000, phase: 'hold' };
  return payload;
}

test('render restores the original modeled temperature and keeps confirmed ESP32 AUTO on', () => {
  const h = harness(), p = espSnapshot();
  h.render(p);
  assert.equal(h.node('tempValue').textContent, '40.00');
  assert.equal(h.node('autoDescription').textContent, i18n.t('temperature.autoDisplayedDescription'));
  assert.equal(h.node('tempLabel').textContent, i18n.t('temperature.estimated'));
  assert.equal(h.node('tempSource').textContent, i18n.t('temperature.estimateSource'));
  assert.equal(h.node('tempStatus').textContent, i18n.t('temperature.hold'));
  assert.equal(h.node('autoToggle').getAttribute('aria-checked'), 'true');
  assert.equal(h.node('stripAutoValue').textContent, i18n.t('strip.auto'));
  assert.equal(h.node('heatValue').textContent, i18n.t('state.off'));
  assert.equal(h.node('coolValue').textContent, i18n.t('state.off'));

  p.stm.hw_t_centi = 2399; p.outputs.cool = true; p.temperature_display.centi = 2700;
  h.render(p);
  assert.equal(h.node('tempValue').textContent, '27.00');
  assert.equal(state.normalizeSnapshot(p).controlTempC, 27);
  assert.equal(h.node('stripAutoValue').textContent, i18n.t('strip.auto'));
  assert.equal(h.node('autoToggle').getAttribute('aria-checked'), 'true');
});

test('render differentiates confirmed-on, starting, stopping, fault and off without claiming pending is on', () => {
  const h = harness(), p = espSnapshot();
  for (const phase of ['off', 'starting', 'running', 'stopping', 'fault']) {
    p.automatic_control = { owner: 'esp32', enabled: ['starting', 'running'].includes(phase), phase,
      fault: phase === 'fault' ? 'CONTROL_FAILED' : null };
    p.pending = ['starting', 'stopping'].includes(phase);
    h.render(p);
    assert.equal(h.node('autoToggle').getAttribute('aria-checked'), String(phase === 'running'));
    assert.equal(h.node('autoToggle').getAttribute('aria-busy'), String(p.pending));
    if (['starting', 'stopping', 'fault'].includes(phase)) assert.equal(h.node('thermalTag').textContent, i18n.t(`temperature.autoPhase.${phase}`));
    if (phase === 'fault') assert.ok(h.node('processDescription').textContent.includes(i18n.t('automaticFault.CONTROL_FAILED')));
  }
});

test('stale AUTO becomes explicitly unknown at the original freshness boundary, then recovers on fresh feedback', () => {
  const h = harness(), p = espSnapshot();
  h.render(p, { localAgeMs: 1499 });
  assert.equal(h.node('autoToggle').getAttribute('aria-checked'), 'true');
  h.render(p, { localAgeMs: 1500 });
  assert.equal(h.node('autoToggle').getAttribute('aria-checked'), 'false');
  assert.equal(h.node('autoToggle').disabled, false, 'stale feedback must not block the last-known enabled controller from being stopped');
  assert.equal(h.node('thermalTag').textContent, i18n.t('state.unknown'));
  assert.equal(h.node('tempStatus').textContent, i18n.t('state.previous'));
  h.render(p);
  assert.equal(h.node('autoToggle').getAttribute('aria-checked'), 'true');
  assert.equal(h.node('autoToggle').disabled, false);
});

test('a new page and language changes render the same confirmed AUTO state', () => {
  const previous = i18n.getLanguage();
  try {
    const p = espSnapshot();
    for (const language of ['zh', 'en', 'zh']) {
      i18n.setLanguage(language);
      const h = harness(); h.render(p);
      assert.equal(h.node('autoToggle').getAttribute('aria-checked'), 'true');
      assert.equal(h.node('stripAutoValue').textContent, i18n.t('strip.auto'));
      assert.equal(h.node('autoDescription').textContent, i18n.t('temperature.autoDisplayedDescription'));
    }
  } finally { i18n.setLanguage(previous); }
});

test('the original model remains visible while missing measurements disable AUTO', () => {
  const h = harness(), p = espSnapshot();
  p.stm.hw_t_centi = null;
  p.automatic_control.enabled = false; p.automatic_control.phase = 'off';
  h.render(p);
  assert.equal(h.node('tempValue').textContent, '40.00');
  assert.equal(h.node('autoToggle').disabled, true);
  assert.equal(h.node('tempStatus').textContent, i18n.t('temperature.invalid'));
});

test('AUTO cannot be enabled for a sample expired in the ESP32 cache or STM32 level simulation', () => {
  const h = harness(), p = espSnapshot();
  p.automatic_control = { owner: 'esp32', enabled: false, phase: 'off', fault: null };
  p.stm.aht_age_ms = 4800; p.age_ms = 400;
  h.render(p);
  assert.equal(h.node('autoToggle').disabled, true);
  assert.equal(h.node('tempStatus').textContent, i18n.t('temperature.invalid'));
  p.stm.aht_age_ms = 0; p.stm.aht_state = 'ERROR';
  h.render(p);
  assert.equal(h.node('autoToggle').disabled, true);
  p.stm.aht_state = 'OK'; p.stm.sim_l = 1;
  h.render(p);
  assert.equal(h.node('autoToggle').disabled, true);
});

test('internal pending or unknown outputs do not disable thermal shutdown', () => {
  const h = harness(), p = espSnapshot();
  p.pending = true;
  h.render(p);
  assert.equal(h.node('autoToggle').disabled, false);
  p.outputs = null; p.stm = null; p.online = false; p.stale = true;
  h.render(p);
  assert.equal(h.node('autoToggle').disabled, false);
  p.session = null;
  h.render(p);
  assert.equal(h.node('autoToggle').disabled, true);
});

test('local start is visibly pending and can be cancelled before its HTTP response', () => {
  const h = harness(), p = espSnapshot();
  p.automatic_control = { owner: 'esp32', enabled: false, phase: 'off' };
  h.setPending({ action: 'auto', args: { enabled: true } }, true);
  h.render(p);
  assert.equal(h.node('autoToggle').disabled, false);
  assert.equal(h.node('autoToggle').getAttribute('aria-checked'), 'false');
  assert.equal(h.node('autoToggle').getAttribute('aria-busy'), 'true');
  assert.equal(h.node('thermalTag').textContent, i18n.t('temperature.autoPhase.starting'));
  h.setPending({ action: 'auto', args: { enabled: false } }, true);
  h.render(p);
  assert.equal(h.node('autoToggle').disabled, true);
  assert.equal(h.node('thermalTag').textContent, i18n.t('temperature.autoPhase.stopping'));
});

test('manual heat and cool retain original modeled values, roles and labels', () => {
  const h = harness(), p = espSnapshot();
  p.fw = 'tankweb-1.15'; p.automatic_control = { owner: 'esp32', enabled: false, phase: 'off' };
  p.outputs.heat = true; // Hardware mapping is projected to the physical cooler.
  p.temperature_display = { available: true, estimated: true, centi: 2650, phase: 'ramp' };
  h.render(p);
  assert.equal(h.node('tempValue').textContent, '26.50');
  assert.equal(h.node('tempStatus').textContent, i18n.t('temperature.coolingEstimate', { seconds: 0 }));
  assert.equal(h.node('coolValue').textContent, i18n.t('state.on'));
  assert.equal(h.node('heatValue').textContent, i18n.t('state.off'));
  p.outputs.heat = false; p.outputs.cool = true; p.temperature_display.centi = 2800;
  h.render(p);
  assert.equal(h.node('tempValue').textContent, '28.00');
  assert.equal(h.node('tempStatus').textContent, i18n.t('temperature.heatingEstimate', { seconds: 0 }));
  assert.equal(h.node('heatValue').textContent, i18n.t('state.on'));
  assert.equal(h.node('coolValue').textContent, i18n.t('state.off'));
});

test('the UI shows one shared temperature when the sensor is 31C and modeled AUTO input is 30C', () => {
  const h = harness(), p = espSnapshot();
  p.stm.hw_t_centi = 3100;
  p.temperature_display.centi = 3000;
  h.render(p);
  assert.equal(h.node('tempValue').textContent, '30.00');
  assert.equal(state.normalizeSnapshot(p).controlTempC, 30);
  assert.equal(display.controlTemperatureAssessment(state.normalizeSnapshot(p)), 'within');
  assert.equal(h.node('thermalTag').textContent, 'HOLD');
});
