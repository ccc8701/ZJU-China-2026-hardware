import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import * as display from '../display.js';
import * as state from '../state.js';
import * as version from '../version.js';

const app = readFileSync(new URL('../app.js', import.meta.url), 'utf8');
// Run the production async command/response path, with only its network and DOM stubbed.
const source = app.slice(app.indexOf('function finishJob('), app.indexOf('async function poll(')) +
  app.slice(app.indexOf('async function command('), app.indexOf('function setMode(')) +
  app.match(/function toggleAutomatic\(\) \{[^\n]+\}/)[0];

function snapshot() {
  const p = state.makeDemo();
  p.session = 'before-stop'; p.boot_epoch = 42;
  p.automatic_control = { owner: 'esp32', enabled: false, phase: 'off' };
  p.thermal_control_ready = true;
  return p;
}

function harness(p = snapshot()) {
  const requests = [];
  const context = vm.createContext({ ...display, ...state, ...version,
    mode: 'real', posting: false, awaiting: null, payload: p,
    receivedAt: 1, transportFresh: true, initialRequest: false,
    performance: { now: () => 100 },
    acknowledged: { kind: '', message: { key: '' } },
    currentState: () => state.normalizeSnapshot(context.payload),
    copy: (key) => ({ key }), actionCopy: (key) => ({ key }), serverCopy: (error) => ({ error }),
    notify: () => {}, render: () => {}, poll: async () => {},
    $: () => ({ dataset: {} }), ack: () => {},
    fetchJson: (url, options) => new Promise((resolve) => requests.push({ url, headers: options.headers, body: JSON.parse(options.body), resolve }))
  });
  vm.runInContext(source, context);
  return { context, requests,
    command: (action, args = {}) => context.command(action, args),
    toggle: () => context.toggleAutomatic(),
    reply: (index, { enabled = false, pending = false, session = 'after-stop' } = {}) => {
      const next = snapshot(); next.session = session; next.pending = pending;
      next.automatic_control = { owner: 'esp32', enabled, phase: pending ? enabled ? 'starting' : 'stopping' : enabled ? 'running' : 'off' };
      const id = index + 1;
      next.last_command = { id, accepted: true, confirmed: !pending, error: null };
      requests[index].resolve({ response: { ok: true }, data: {
        ok: true, id, queued: pending, accepted: !pending, confirmed: !pending, error: null, state: next
      } });
    }
  };
}

test('AUTO OFF is submitted with stale or pending state, while AUTO ON is blocked', async () => {
  for (const condition of ['stale', 'pending', 'unknown']) {
    const p = snapshot();
    if (condition === 'stale') { p.online = false; p.stale = true; }
    if (condition === 'pending') p.pending = true;
    if (condition === 'unknown') { p.stm = null; p.outputs = null; }
    const h = harness(p);
    await h.command('auto', { enabled: true });
    assert.equal(h.requests.length, 0, `${condition}: enabling is blocked`);
    const stopped = h.command('auto', { enabled: false });
    assert.deepEqual(h.requests[0].body, { session: 'before-stop', action: 'auto', enabled: false });
    assert.equal(h.requests[0].headers['X-Tank-UI'], version.UI_VERSION);
    h.reply(0); await stopped;
    assert.equal(h.context.awaiting, null);
  }
});

test('a second click cancels AUTO before the start response, which cannot overwrite the stop', async () => {
  const h = harness();
  const starting = h.toggle();
  assert.equal(h.requests[0].body.enabled, true);
  const stopping = h.toggle();
  assert.equal(h.requests[1].body.enabled, false);
  assert.equal(h.context.awaiting.args.enabled, false);
  const stopPosting = h.context.posting;
  h.reply(0, { enabled: true, pending: true, session: 'before-stop' });
  await starting;
  assert.equal(h.context.awaiting.args.enabled, false);
  assert.equal(h.context.posting, stopPosting, 'late start reply must preserve active stop POST');
  assert.equal(h.context.payload.automatic_control.enabled, false, 'late start snapshot is ignored');
  h.reply(1); await stopping;
  assert.equal(h.context.awaiting, null);
  assert.equal(h.context.posting, false);
  assert.equal(h.context.payload.session, 'after-stop');
});

test('start response arriving after confirmed shutdown cannot restore AUTO or old session', async () => {
  const h = harness();
  const starting = h.toggle();
  const stopping = h.command('auto', { enabled: false });
  h.reply(1); await stopping;
  h.reply(0, { enabled: true, session: 'before-stop' }); await starting;
  assert.equal(h.context.payload.automatic_control.enabled, false);
  assert.equal(h.context.payload.session, 'after-stop');
  assert.equal(h.context.awaiting, null);
  assert.equal(h.context.posting, false);
});

test('thermal shutdown suppresses duplicate stops, while all-stop can still supersede it', async () => {
  const h = harness();
  const thermal = h.command('auto', { enabled: false });
  await h.command('auto', { enabled: false });
  assert.equal(h.requests.length, 1);
  const all = h.command('stop');
  assert.equal(h.requests.length, 2);
  await h.command('auto', { enabled: false });
  await h.command('auto', { enabled: true });
  assert.equal(h.requests.length, 2);
  h.reply(1); await all;
  h.reply(0); await thermal;
  assert.equal(h.context.awaiting, null);
});

test('stopping temperature control preserves a running pump in the browser demo', () => {
  let p = state.makeDemo();
  p = state.applyDemoCommand(p, 'pump', { enabled: true }, 1);
  p = state.applyDemoCommand(p, 'cool', { enabled: true }, 2);
  p = state.applyDemoCommand(p, 'auto', { enabled: false }, 3);
  assert.equal(p.outputs.pump, true);
  assert.equal(p.outputs.cool, false);
  assert.equal(p.outputs.heat, false);
  assert.equal(p.stm.auto, 0);
});

test('legacy native-auto=0 does not make an enabled ESP32 controller submit another ON', async () => {
  // The recovered v1.8 UI read only stm.auto and sent its inverse on every click.
  // ESP32-owned AUTO intentionally leaves that native flag at zero while running.
  const p = snapshot();
  p.stm.auto = 0;
  p.automatic_control = { owner: 'esp32', enabled: true, phase: 'running' };
  const h = harness(p);
  assert.equal(h.context.currentState().auto, true);
  const stopping = h.toggle();
  assert.equal(h.requests[0].body.enabled, false);
  assert.equal(h.requests[0].headers['X-Tank-UI'], version.UI_VERSION);
  h.reply(0); await stopping;
});
