// Local UI development only. This process never accesses a serial port.
import http from 'node:http';
import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { makeDemo, applyDemoCommand, tickDemo, parseRange, parseLimit } from './state.js';
import { UI_VERSION } from './version.js';

const root = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const option = (key, fallback) => args.includes(key) ? args[args.indexOf(key) + 1] : fallback;
const port = Number(option('--port', '8421'));
const host = option('--host', '127.0.0.1');
const mockEsp32 = args.includes('--mock-esp32');
const mock = args.includes('--mock') || mockEsp32;
let session = 'local-development-mock-session';
const bootEpoch = Date.now();
let device = makeDemo();
if (mockEsp32) device.stm.t_centi = 4000;
let job = null;
let nextId = 1;
let previousTick = performance.now();
let lastCommand = null;

function state() {
  const now = performance.now();
  device = tickDemo(device, now, now - previousTick); previousTick = now;
  const result = { fw: 'local-dev-server', mock, session, online: mock, stale: !mock, age_ms: mock ? 0 : 4294967295, boot_epoch: bootEpoch, error: mock ? null : { code: 'development_server', message: '本地开发服务器未连接硬件，请使用浏览器演示模式。' }, wifi: { ap_ssid: 'TankLab-ESP32', ap_ip: '192.168.4.1', sta_connected: false }, stm: mock ? device.stm : null, outputs: mock ? device.outputs : null, pending: Boolean(job), last_command: lastCommand };
  if (mockEsp32) {
    const transitioning = job?.action === 'auto' || job?.action === 'stop';
    const enabled = transitioning ? job.action === 'auto' && job.params.enabled : Boolean(device.stm.auto);
    Object.assign(result, {
      stm: { ...device.stm, auto: 0 },
      outputs: { pump: device.outputs.pump, heat: device.outputs.cool, cool: device.outputs.heat },
      thermal_display_swapped: true, thermal_control_ready: true,
      relay_channels: { pump: 1, heat: 3, cool: 2 },
      automatic_control: { owner: 'esp32', measurement: 'temperature_display', enabled, phase: transitioning ? enabled ? 'starting' : 'stopping' : enabled ? 'running' : 'off', fault: null, shutdown_pending: transitioning && !enabled },
      // The mock uses the same value for its AUTO decisions and UI display.
      temperature_display: { available: true, estimated: true, centi: device.stm.t_centi, phase: 'hold' }
    });
  }
  return result;
}

function json(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': Buffer.byteLength(body), 'Cache-Control': 'no-store' }); res.end(body);
}

async function body(req) {
  let raw = '';
  for await (const chunk of req) { raw += chunk; if (raw.length > 2048) throw new Error('request_too_large'); }
  return JSON.parse(raw);
}

function validate(command) {
  if (command.session !== session) throw new Error('session_mismatch');
  if (command.action === 'range') {
    if (!Number.isInteger(command.lower_centi) || !Number.isInteger(command.upper_centi)) throw new Error('range_integer_required');
    return parseRange(command.lower_centi / 100, command.upper_centi / 100);
  }
  if (command.action === 'pump_limit') return parseLimit(command.seconds);
  if (['auto', 'pump', 'heat', 'cool'].includes(command.action)) { if (typeof command.enabled !== 'boolean') throw new Error('enabled_boolean_required'); return { enabled: command.enabled }; }
  if (command.action === 'stop') return {};
  throw new Error('unknown_action');
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${host}:${port}`);
  try {
    if (req.method === 'GET' && url.pathname === '/api/state') { json(res, 200, state()); return; }
    if (req.method === 'POST' && url.pathname === '/api/command') {
      const command = await body(req);
      const params = validate(command);
      if (!mock) { json(res, 503, { ok: false, error: { code: 'no_hardware', message: '开发服务器未连接实际设备。' }, state: state() }); return; }
      const shutdown = command.action === 'stop' || command.action === 'auto' && params.enabled === false;
      const deenergizing = command.action === 'stop' || ['auto', 'heat', 'cool', 'pump'].includes(command.action) && params.enabled === false;
      if (!deenergizing && req.headers['x-tank-ui'] !== UI_VERSION) { json(res, 409, { ok: false, error: { code: 'UI_VERSION', message: '页面版本过旧，请重新打开设备网页。' }, state: state() }); return; }
      if (job && !shutdown) { json(res, 409, { ok: false, error: { code: 'busy', message: '上一条命令正在等待确认。' }, state: state() }); return; }
      if (shutdown) session = `local-development-mock-session-${nextId}`;
      if (job) clearTimeout(job.timer);
      const id = nextId++;
      job = { id, action: command.action, params, timer: null };
      const current = job;
      job.timer = setTimeout(() => {
        if (job !== current) return;
        const action = mockEsp32 && command.action === 'heat' ? 'cool' : mockEsp32 && command.action === 'cool' ? 'heat' : command.action;
        state(); device = applyDemoCommand(device, action, params, performance.now());
        lastCommand = { id, action: command.action, accepted: true, confirmed: true, error: null, ack: `ACK MOCK ${command.action}`, finished_ms: Date.now() - bootEpoch };
        job = null;
      }, 600);
      json(res, 202, { ok: true, queued: true, accepted: false, confirmed: false, id, action: command.action, ack: '', error: null, state: state() }); return;
    }
    if (req.method !== 'GET') { json(res, 405, { error: { code: 'method_not_allowed' } }); return; }
    const file = url.pathname === '/' || url.pathname === '/index.html' ? 'index.html' : url.pathname === '/app.js' ? 'app.js' : url.pathname === '/style.css' ? 'style.css' : null;
    if (!file) { res.writeHead(404, { 'Content-Type': 'text/plain' }); res.end('Not found'); return; }
    const gzip = String(req.headers['accept-encoding'] || '').includes('gzip');
    const data = await readFile(path.join(root, 'dist', file + (gzip ? '.gz' : '')));
    const type = file.endsWith('.html') ? 'text/html; charset=utf-8' : file.endsWith('.css') ? 'text/css; charset=utf-8' : 'application/javascript; charset=utf-8';
    res.writeHead(200, { 'Content-Type': type, 'Content-Length': data.length, 'Cache-Control': 'no-store', ...(gzip ? { 'Content-Encoding': 'gzip', 'Vary': 'Accept-Encoding' } : {}) }); res.end(data);
  } catch (error) { json(res, 400, { ok: false, error: { code: 'invalid_request', message: error.message } }); }
});

server.listen(port, host, () => console.log(`FLOW UI: http://${host}:${port}/ (${mockEsp32 ? 'explicit ESP32-contract MOCK API, no hardware' : mock ? 'explicit MOCK API, no hardware' : 'offline API + browser demo; no hardware'})`));
