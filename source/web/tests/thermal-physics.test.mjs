import test from 'node:test';
import assert from 'node:assert/strict';
import { createThermalVolume, createThermalVelocity } from '../thermal-physics.js';
import { COOLING_CONTACT } from '../thermal-contact.js';

const running = { online: true, known: true, fill: 0.65, heat: false, cool: false };
const heaterAngle = 1.72 + Math.PI, coldAngle = 0.35;
const at = (angle, y, r = 0.9) => [r * Math.cos(angle), y, r * Math.sin(angle)];
function advance(field, seconds, interval = 1 / 30) {
  const whole = Math.floor(seconds / interval + 1e-9);
  for (let i = 0; i < whole; i += 1) field.step(interval);
  if (seconds - whole * interval > 1e-9) field.step(seconds - whole * interval);
}
function close(actual, expected, tolerance = 1e-8) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} differs from ${expected}`);
}

test('XYZ curl is divergence-free and impermeable at cylindrical boundaries', () => {
  const v = createThermalVelocity(), h = 1e-5;
  for (let i = 0; i < 32; i += 1) {
    const angle = i * Math.PI / 16, r = 0.15 + 0.7 * (i % 5) / 5;
    const x = Math.cos(angle) * r, y = 0.1 + 0.8 * (i % 7) / 7, z = Math.sin(angle) * r;
    const div = (v(x + h, y, z).x - v(x - h, y, z).x) / (2 * h)
      + (v(x, y + h, z).y - v(x, y - h, z).y) / (2 * h)
      + (v(x, y, z + h).z - v(x, y, z - h).z) / (2 * h);
    close(div, 0, 2e-8);
    const wall = v(Math.cos(angle), y, Math.sin(angle));
    close(wall.x * Math.cos(angle) + wall.z * Math.sin(angle), 0);
    close(v(x, 0, z).y, 0); close(v(x, 1, z).y, 0);
  }
});

test('heater-side liquid rises, cold-side liquid descends, and the flow turns azimuthally', () => {
  const v = createThermalVelocity();
  for (const y of [0.15, 0.3, 0.5, 0.7, 0.85]) {
    assert.ok(v(...at(heaterAngle, y, 0.72)).y > 0);
    assert.ok(v(...at(coldAngle, y, 0.72)).y < 0);
  }
  const p = [0.4, 0.5, 0.15], velocity = v(...p);
  assert.ok(Math.abs(p[0] * velocity.z - p[2] * velocity.x) > 0.04);
});

test('trilinear sampling depends independently on X, Y and Z', () => {
  const f = createThermalVolume();
  for (let z = 0; z < f.depth; z += 1) for (let y = 0; y < f.rows; y += 1) for (let x = 0; x < f.columns; x += 1) {
    f.values[(z * f.rows + y) * f.columns + x] = 0.2 * (-1 + 2 * x / (f.columns - 1))
      + 0.3 * y / (f.rows - 1) + 0.4 * (-1 + 2 * z / (f.depth - 1));
  }
  close(f.sample(0.2, 0.4, -0.3), 0.04, 1e-7);
  close(f.sample(0.4, 0.4, -0.3) - f.sample(0.2, 0.4, -0.3), 0.04, 1e-7);
  close(f.sample(0.2, 0.6, -0.3) - f.sample(0.2, 0.4, -0.3), 0.06, 1e-7);
  close(f.sample(0.2, 0.4, 0.3) - f.sample(0.2, 0.4, -0.3), 0.24, 1e-7);
});

test('insulated wall samples do not mix liquid with zero-temperature air', () => {
  const f = createThermalVolume();
  for (let i = 0; i < f.values.length; i += 1) f.values[i] = f.mask[i] ? 0.65 : 0;
  for (const angle of [0, 0.35, 1.72, 2.5, 4.8]) close(f.sample(...at(angle, 0.5, 1.01)), 0.65, 1e-7);
});

test('heat enters the true angular side patch and evolves as a finite XYZ volume', () => {
  const f = createThermalVolume(); f.setState({ ...running, heat: true }); advance(f, 20);
  const d = f.getDiagnostics(); assert.deepEqual(d.grid, [18, 28, 18]);
  assert.ok(d.validVoxels > 5000 && d.validVoxels < d.cells);
  assert.ok(d.finite && d.min >= 0 && d.max <= 1 && d.diffusionStabilityNumber < 0.5);
  assert.equal(d.heatSource, 'cylindrical_side_contact');
  close(d.sourceAngles.heater, heaterAngle);
  assert.ok(f.sample(...at(heaterAngle, 0.3)) > 0.8); assert.ok(f.sample(...at(heaterAngle, 0.9)) > 0.8);
  assert.ok(f.sample(...at(coldAngle, 0.3)) < 0.08); assert.ok(f.sample(0, 0.02, 0) < 0.08);
  const z = [-0.75, -0.4, -0.1].map((depth) => f.sample(0.2, 0.5, depth));
  assert.ok(Math.max(...z) - Math.min(...z) > 0.02);
  assert.ok(f.sample(...at(heaterAngle, 0.5, 0.55)) > 0.05, 'the evolving thermal region expands inward from the actual side source');
});

test('heater source clips to its physical height and needs submerged side contact', () => {
  const f = createThermalVolume({ heaterBottom: 0.22, heaterTop: 0.80 });
  f.setState({ ...running, fill: 0.92, heat: true }); advance(f, 0.5);
  const d = f.getDiagnostics(); close(d.heatSourceRange[0], 0.22 / (3.02 * 0.92)); close(d.heatSourceRange[1], 0.80 / (3.02 * 0.92));
  assert.ok(f.sample(...at(heaterAngle, 0.18)) > 0.30); assert.ok(f.sample(...at(heaterAngle, 0.75)) < 1e-5);
  const dry = createThermalVolume(); dry.setState({ ...running, fill: 0.05, heat: true }); advance(dry, 5);
  assert.equal(dry.getDiagnostics().heaterOverlap, 0); assert.ok(dry.values.every((n) => n === 0));
});

test('lowered cold contact cools LOW, clips its XYZ source, and stays dry at EMPTY in both grids', () => {
  const bottom = COOLING_CONTACT.bottomOffset, top = bottom + COOLING_CONTACT.height;
  for (const quality of [{}, { columns: 12, rows: 20, depth: 12 }]) {
    const f = createThermalVolume(quality); f.setState({ ...running, cool: true }); f.step(0.05);
    const contact = f.getDiagnostics();
    assert.deepEqual(contact.coldSourceHeight, [0.36, 1.56]);
    close(contact.coldSourceRange[0], bottom / (3.02 * running.fill));
    close(contact.coldSourceRange[1], top / (3.02 * running.fill));
    close(f.sample(...at(coldAngle, 0.02)), 0, 1e-7);
    close(f.sample(...at(coldAngle, 0.98)), 0, 1e-7);
    advance(f, 0.45);
    assert.ok(f.sample(...at(coldAngle, 0.50)) < -0.25);
    advance(f, 19.5);
    const d = f.getDiagnostics(); assert.ok(d.finite && d.min >= -1 && d.max <= 0);
    assert.ok(f.sample(...at(coldAngle, 0.55)) < -0.75);
    assert.ok(f.sample(...at(heaterAngle, 0.55)) > -0.08);

    const low = createThermalVolume(quality); low.setState({ ...running, fill: 0.30, cool: true });
    close(low.getDiagnostics().coldOverlap, 0.546);
    close(low.getDiagnostics().coldSourceRange[0], 0.36 / 0.906);
    close(low.getDiagnostics().coldSourceRange[1], 1);
    advance(low, 5);
    assert.ok(low.getDiagnostics().finite && low.getDiagnostics().min < -0.75);
    assert.ok(low.sample(...at(coldAngle, 0.65)) < -0.65, 'LOW contains an actual negative-temperature volume');

    for (const fill of [0.08, 0.10, 0]) {
      const dry = createThermalVolume(quality); dry.setState({ ...running, fill, cool: true }); advance(dry, 5);
      assert.equal(dry.getDiagnostics().coldOverlap, 0);
      assert.ok(dry.values.every((n) => n === 0), 'a liquid surface below the contact cannot create a cold source');
    }
    const unknown = createThermalVolume(quality); unknown.setState({ ...running, fill: 0.30, known: false, cool: true });
    advance(unknown, 5); assert.ok(unknown.getDiagnostics().frozen && unknown.values.every((n) => n === 0));
  }
});

test('offline, unknown, reduced-motion, zero-fill and conflicting states freeze history', () => {
  const f = createThermalVolume(); f.setState({ ...running, heat: true }); advance(f, 3);
  const values = [...f.values], before = f.getDiagnostics();
  for (const pause of [{ online: false }, { known: false }, { reducedMotion: true }, { cool: true }, { fill: 0 }]) {
    f.setState({ ...running, heat: true, ...pause }); advance(f, 5);
    assert.deepEqual([...f.values], values); assert.equal(f.getDiagnostics().steps, before.steps);
    assert.equal(f.getDiagnostics().resetCount, before.resetCount); assert.equal(f.getDiagnostics().frozen, true);
  }
  f.setState({ ...running, heat: true }); f.step(0.05); assert.equal(f.getDiagnostics().steps, before.steps + 1);
});

test('presentation and mode changes retain history while demo changes reset it', () => {
  const f = createThermalVolume(); f.setState({ ...running, heat: true }); advance(f, 3);
  const values = [...f.values], before = f.getDiagnostics();
  for (let i = 0; i < 20; i += 1) f.setState({ ...running, heat: true });
  assert.deepEqual([...f.values], values); assert.equal(f.getDiagnostics().revision, before.revision);
  f.setState({ ...running, cool: true }); assert.deepEqual([...f.values], values); advance(f, 5);
  assert.ok(f.getDiagnostics().min < -0.5); assert.equal(f.getDiagnostics().resetCount, before.resetCount);
  f.setState({ ...running, demo: true }); assert.ok(f.values.every((n) => n === 0));
  assert.equal(f.getDiagnostics().resetCount, before.resetCount + 1);
});

test('fixed XYZ solver stepping is independent of render cadence', () => {
  const fields = [1 / 100, 1 / 30, 1 / 20].map((interval) => {
    const f = createThermalVolume({ columns: 12, rows: 20, depth: 12 });
    f.setState({ ...running, cool: true }); advance(f, 8, interval); return f;
  });
  for (const f of fields) assert.equal(f.getDiagnostics().steps, 160);
  assert.deepEqual([...fields[0].values], [...fields[1].values]); assert.deepEqual([...fields[1].values], [...fields[2].values]);
});

test('large gaps are bounded and low quality remains finite after thermal reversals', () => {
  const f = createThermalVolume({ columns: 12, rows: 20, depth: 12 });
  f.setState({ ...running, heat: true }); f.step(30); assert.ok(f.getDiagnostics().simulatedSeconds < 0.13);
  f.step(NaN); f.step(-1); f.step(Infinity);
  for (let i = 0; i < 6; i += 1) {
    f.setState({ ...running, heat: i % 2 === 0, cool: i % 2 !== 0 }); advance(f, 5);
  }
  const d = f.getDiagnostics(); assert.equal(d.cells, 2880);
  assert.ok(d.finite && d.min >= -1 && d.max <= 1 && d.diffusionStabilityNumber < 0.5);
});

test('fill changes retain XYZ history at the same physical liquid height', () => {
  const f = createThermalVolume(); f.setState({ ...running, heat: true }); advance(f, 5);
  const p = at(heaterAngle, 0.30, 0.82), old = f.sample(...p), before = f.getDiagnostics();
  f.setState({ ...running, known: false, fill: 0 }); f.setState({ ...running, heat: true, fill: 0.85 });
  close(f.sample(p[0], p[1] * 0.65 / 0.85, p[2]), old, 0.02); close(f.sample(0, 0.95, 0), 0);
  assert.equal(f.getDiagnostics().resetCount, before.resetCount);
});
