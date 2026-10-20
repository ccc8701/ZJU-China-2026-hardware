import test from 'node:test';
import assert from 'node:assert/strict';
import { createGravityJet, createSurfaceWaveModel } from '../fluid-physics.js';

function weightedMean(values, weights) {
  let total = 0;
  let area = 0;
  for (let index = 0; index < values.length; index += 1) {
    total += values[index] * weights[index];
    area += weights[index];
  }
  return total / area;
}

test('both quality grids keep bounded finite waves without moving the supplied mean liquid level', () => {
  for (const [radialSegments, angularSegments] of [[10, 40], [16, 64]]) {
    const surface = createSurfaceWaveModel({ radius: 1.014, radialSegments, angularSegments });
    const force = { pump: true, sourceX: 0.63, sourceZ: 0.08, strength: 1 };
    for (let step = 0; step < 180; step += 1) surface.step(1 / 30, force);
    const forced = surface.getDiagnostics();
    assert.ok(forced.amplitude > 0.004, `visible local deformation at ${radialSegments} rings`);
    assert.ok(forced.amplitude <= 0.045 + 1e-7);
    assert.ok(Math.abs(weightedMean(surface.height, surface.weights)) < 1e-7);
    assert.ok(Math.abs(weightedMean(surface.velocity, surface.weights)) < 1e-7);
    for (const value of [...surface.positions, ...surface.normals, ...surface.velocity]) {
      assert.ok(Number.isFinite(value));
    }
    for (let offset = 0; offset < surface.normals.length; offset += 3) {
      assert.ok(surface.normals[offset + 1] > 0, 'wave normals remain upward');
      const normalLength = Math.hypot(...surface.normals.subarray(offset, offset + 3));
      assert.ok(Math.abs(normalLength - 1) < 1e-5);
    }
    for (let step = 0; step < 240; step += 1) surface.step(1 / 30, { pump: false });
    assert.ok(surface.getDiagnostics().amplitude < forced.amplitude * 0.01, 'waves settle after the source stops');
  }
});

test('fixed substeps give the same surface at 30, 60 and 144 Hz', () => {
  const surfaces = [30, 60, 144].map((fps) => {
    const surface = createSurfaceWaveModel({ radialSegments: 10, angularSegments: 40 });
    for (let frame = 0; frame < fps * 2; frame += 1) {
      surface.step(1 / fps, { pump: true, sourceX: 0.62, sourceZ: 0.09 });
    }
    return surface;
  });
  for (let index = 1; index < surfaces.length; index += 1) {
    assert.equal(surfaces[index].getDiagnostics().elapsed, surfaces[0].getDiagnostics().elapsed);
    assert.deepEqual(surfaces[index].height, surfaces[0].height);
    assert.deepEqual(surfaces[index].velocity, surfaces[0].velocity);
  }
});

test('long pauses, malformed deltas and low fills cannot create a large catch-up impulse', () => {
  const surface = createSurfaceWaveModel({ radialSegments: 10, angularSegments: 40 });
  surface.step(600, { pump: true, amplitudeLimit: 0.005 });
  assert.ok(surface.getDiagnostics().elapsed <= 0.05 + 1e-8);
  for (let frame = 0; frame < 240; frame += 1) surface.step(1 / 60, { pump: true, amplitudeLimit: 0.005 });
  assert.ok(surface.getDiagnostics().amplitude <= 0.005 + 1e-7);
  const before = surface.height.slice();
  assert.equal(surface.step(Infinity), false);
  assert.equal(surface.step(NaN), false);
  assert.equal(surface.step(-1), false);
  assert.deepEqual(surface.height, before);
  surface.clear();
  assert.ok(surface.height.every((height) => height === 0));
  assert.ok(surface.velocity.every((velocity) => velocity === 0));
});

test('surface sampling is bounded and reproduces the deformed centre and outer ring', () => {
  const surface = createSurfaceWaveModel({ radius: 1, radialSegments: 10, angularSegments: 40 });
  for (let frame = 0; frame < 90; frame += 1) surface.step(1 / 30, { pump: true, sourceX: 0.6 });
  assert.equal(surface.sample(0, 0), surface.height[0]);
  assert.ok(Math.abs(surface.sample(1, 0) - surface.height[1 + 9 * 40]) < 1e-7);
  assert.equal(surface.sample(2, 0), surface.sample(1, 0));
  assert.ok(Math.abs(surface.sample(-0.48, 0.16)) <= 0.045);
});

test('a gravity jet starts at the pipe, reaches the pool and narrows with increasing speed', () => {
  const parameters = { x: 3.35, y: 1.08, z: 0.94, poolY: 0.295, vx: 0, vy: -1.15, vz: 0 };
  const jet = createGravityJet(parameters);
  const start = {};
  const end = {};
  jet.at(0, start);
  jet.at(jet.duration, end);
  assert.equal(start.x, parameters.x);
  assert.equal(start.y, parameters.y);
  assert.equal(start.z, parameters.z);
  assert.ok(Math.abs(end.y - parameters.poolY) < 1e-10);
  assert.ok(((end.x - 3.19) / 0.46) ** 2 + ((end.z - 0.94) / 0.355) ** 2 < 1);
  let previousY = Infinity;
  let previousRadius = Infinity;
  const position = {};
  const tangent = {};
  for (let sample = 0; sample <= 40; sample += 1) {
    const time = jet.duration * sample / 40;
    jet.at(time, position);
    jet.tangentAt(time, tangent);
    assert.ok(position.y < previousY);
    assert.ok(tangent.y < 0);
    const radius = jet.radiusAt(time);
    assert.ok(radius <= previousRadius);
    // Incompressible continuity: area * speed is constant along this jet.
    const flux = radius * radius * Math.hypot(tangent.x, tangent.y, tangent.z);
    assert.ok(Math.abs(flux - 0.043 ** 2 * 1.15) < 1e-10);
    previousY = position.y;
    previousRadius = radius;
  }
});

test('gravity intersection remains finite at a very fast downward velocity and rejects bad geometry', () => {
  const jet = createGravityJet({ x: 0, y: 1, z: 0, poolY: 0.2, vy: -1e6 });
  assert.ok(jet.duration > 0 && jet.duration < 1e-5);
  const end = {};
  jet.at(jet.duration, end);
  assert.ok(Math.abs(end.y - 0.2) < 1e-7);
  assert.throws(() => createGravityJet({ x: 0, y: 1, z: 0, poolY: 1 }), TypeError);
  assert.throws(() => createGravityJet({ x: 0, y: 1, z: 0, poolY: 0, gravity: 0 }), TypeError);
});
