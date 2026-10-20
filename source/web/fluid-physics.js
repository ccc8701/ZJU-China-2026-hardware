const TAU = Math.PI * 2;
const FIXED_STEP = 1 / 120;

/**
 * A small volume-conserving, damped spring surface. The positive undirected
 * neighbour graph has a normalized Laplacian spectrum in [0, 2]. At the
 * highest quality, k*dt² + 2*damping*dt = 0.131, safely below the semi-implicit
 * Euler stability bound of 4. Coordinates and all work arrays are reused.
 * This is a presentation model; it never estimates a measured tank volume.
 */
export function createSurfaceWaveModel({ radius = 1.012, radialSegments = 16, angularSegments = 64,
  maxAmplitude = 0.045 } = {}) {
  if (!(radius > 0) || !Number.isInteger(radialSegments) || radialSegments < 2
    || !Number.isInteger(angularSegments) || angularSegments < 8) {
    throw new TypeError('The fluid surface needs a positive radius and a connected circular grid.');
  }
  const count = 1 + radialSegments * angularSegments;
  const positions = new Float32Array(count * 3);
  const normals = new Float32Array(count * 3);
  const height = new Float32Array(count);
  const velocity = new Float32Array(count);
  const acceleration = new Float32Array(count);
  const forcing = new Float32Array(count);
  const weights = new Float32Array(count);
  const neighbours = Array.from({ length: count }, () => new Set());
  const stepRadius = radius / radialSegments;
  const indexAt = (ring, angle) => 1 + (ring - 1) * angularSegments
    + ((angle + angularSegments) % angularSegments);
  const join = (a, b) => { neighbours[a].add(b); neighbours[b].add(a); };
  const triangleIndices = [];
  for (let ring = 1; ring <= radialSegments; ring += 1) {
    const r = ring * stepRadius;
    for (let angle = 0; angle < angularSegments; angle += 1) {
      const index = indexAt(ring, angle);
      const phase = angle / angularSegments * TAU;
      positions[index * 3] = Math.cos(phase) * r;
      positions[index * 3 + 2] = Math.sin(phase) * r;
      join(index, indexAt(ring, angle + 1));
      if (ring === 1) {
        join(0, index);
        triangleIndices.push(0, indexAt(1, angle + 1), index);
      } else {
        const inner = indexAt(ring - 1, angle);
        const innerNext = indexAt(ring - 1, angle + 1);
        const next = indexAt(ring, angle + 1);
        join(index, inner);
        triangleIndices.push(inner, innerNext, index, index, innerNext, next);
      }
    }
  }
  const indices = new Uint16Array(triangleIndices);
  // Exact projected triangle quadrature keeps the rendered piecewise-linear
  // surface at the supplied level as well as the numerical control nodes.
  for (let offset = 0; offset < indices.length; offset += 3) {
    const a = indices[offset];
    const b = indices[offset + 1];
    const c = indices[offset + 2];
    const areaThird = Math.abs((positions[b * 3] - positions[a * 3])
      * (positions[c * 3 + 2] - positions[a * 3 + 2])
      - (positions[b * 3 + 2] - positions[a * 3 + 2])
      * (positions[c * 3] - positions[a * 3])) / 6;
    weights[a] += areaThird;
    weights[b] += areaThird;
    weights[c] += areaThird;
  }
  const offsets = new Uint32Array(count + 1);
  let neighbourCount = 0;
  for (let index = 0; index < count; index += 1) {
    offsets[index] = neighbourCount;
    neighbourCount += neighbours[index].size;
  }
  offsets[count] = neighbourCount;
  const adjacent = new Uint16Array(neighbourCount);
  for (let index = 0; index < count; index += 1) {
    let cursor = offsets[index];
    for (const neighbour of neighbours[index]) adjacent[cursor++] = neighbour;
  }
  const totalWeight = weights.reduce((sum, value) => sum + value, 0);
  const coupling = 18 * radialSegments / 16;
  const couplingSquared = coupling * coupling;
  const restore = 30;
  const damping = 5;
  let accumulator = 0;
  let elapsed = 0;
  let amplitude = 0;
  let maxSpeed = 0;
  let meanHeight = 0;

  function writeMesh() {
    normals.fill(0);
    for (let index = 0; index < count; index += 1) positions[index * 3 + 1] = height[index];
    for (let offset = 0; offset < indices.length; offset += 3) {
      const a = indices[offset] * 3;
      const b = indices[offset + 1] * 3;
      const c = indices[offset + 2] * 3;
      const abX = positions[b] - positions[a];
      const abY = positions[b + 1] - positions[a + 1];
      const abZ = positions[b + 2] - positions[a + 2];
      const acX = positions[c] - positions[a];
      const acY = positions[c + 1] - positions[a + 1];
      const acZ = positions[c + 2] - positions[a + 2];
      const nx = abY * acZ - abZ * acY;
      const ny = abZ * acX - abX * acZ;
      const nz = abX * acY - abY * acX;
      normals[a] += nx; normals[a + 1] += ny; normals[a + 2] += nz;
      normals[b] += nx; normals[b + 1] += ny; normals[b + 2] += nz;
      normals[c] += nx; normals[c + 1] += ny; normals[c + 2] += nz;
    }
    for (let offset = 0; offset < normals.length; offset += 3) {
      const length = Math.hypot(normals[offset], normals[offset + 1], normals[offset + 2]) || 1;
      normals[offset] /= length; normals[offset + 1] /= length; normals[offset + 2] /= length;
    }
  }

  function clear() {
    height.fill(0);
    velocity.fill(0);
    accumulator = 0;
    amplitude = maxSpeed = meanHeight = 0;
    writeMesh();
  }

  function step(delta, { pump = false, strength = 1, sourceX = radius * 0.65, sourceZ = 0,
    amplitudeLimit = maxAmplitude } = {}) {
    if (!Number.isFinite(delta) || delta <= 0) return false;
    accumulator += Math.min(delta, 0.05);
    let changed = false;
    const bound = Math.max(0, Math.min(maxAmplitude, Number.isFinite(amplitudeLimit) ? amplitudeLimit : maxAmplitude));
    const forceStrength = Math.max(0, Math.min(1, Number.isFinite(strength) ? strength : 0));
    const kernelRadius = 0.25;
    while (accumulator + 1e-10 >= FIXED_STEP) {
      accumulator -= FIXED_STEP;
      elapsed += FIXED_STEP;
      let weightedForce = 0;
      for (let index = 0; index < count; index += 1) {
        const dx = positions[index * 3] - sourceX;
        const dz = positions[index * 3 + 2] - sourceZ;
        const distance = Math.hypot(dx, dz);
        const local = Math.exp(-(distance * distance) / (kernelRadius * kernelRadius));
        // A shallow depression and outward pulses, rather than a deep funnel
        // that would falsely imply a vortex down to the tank outlet.
        forcing[index] = pump ? forceStrength * (-0.95 * local
          + 0.30 * Math.sin(elapsed * 7.5 - distance * 12) * Math.exp(-distance * 1.4)) : 0;
        weightedForce += forcing[index] * weights[index];
      }
      const forceMean = weightedForce / totalWeight;
      // Read the complete previous height field before integrating any node.
      for (let index = 0; index < count; index += 1) {
        let neighbourSum = 0;
        for (let cursor = offsets[index]; cursor < offsets[index + 1]; cursor += 1) {
          neighbourSum += height[adjacent[cursor]];
        }
        const laplacian = neighbourSum / (offsets[index + 1] - offsets[index]) - height[index];
        acceleration[index] = couplingSquared * laplacian - restore * height[index]
          - damping * velocity[index] + forcing[index] - forceMean;
      }
      let weightedHeight = 0;
      let weightedVelocity = 0;
      for (let index = 0; index < count; index += 1) {
        velocity[index] += acceleration[index] * FIXED_STEP;
        height[index] += velocity[index] * FIXED_STEP;
        weightedHeight += height[index] * weights[index];
        weightedVelocity += velocity[index] * weights[index];
      }
      const heightMean = weightedHeight / totalWeight;
      const velocityMean = weightedVelocity / totalWeight;
      amplitude = maxSpeed = 0;
      for (let index = 0; index < count; index += 1) {
        height[index] -= heightMean;
        velocity[index] -= velocityMean;
        amplitude = Math.max(amplitude, Math.abs(height[index]));
        maxSpeed = Math.max(maxSpeed, Math.abs(velocity[index]));
      }
      if (amplitude > bound) {
        const scale = bound / amplitude;
        for (let index = 0; index < count; index += 1) {
          height[index] *= scale;
          velocity[index] *= scale;
        }
        amplitude = bound;
        maxSpeed *= scale;
      }
      changed = true;
    }
    if (changed) {
      writeMesh();
      meanHeight = 0;
      for (let index = 0; index < count; index += 1) meanHeight += height[index] * weights[index];
      meanHeight /= totalWeight;
    }
    return changed;
  }

  clear();
  function sample(x, z) {
    const radial = Math.min(radialSegments, Math.hypot(x, z) / radius * radialSegments);
    const inner = Math.floor(radial);
    const mix = radial - inner;
    const angular = ((Math.atan2(z, x) / TAU + 1) % 1) * angularSegments;
    const angle = Math.floor(angular);
    const blend = angular - angle;
    const innerHeight = inner === 0 ? height[0]
      : height[indexAt(inner, angle)] * (1 - blend) + height[indexAt(inner, angle + 1)] * blend;
    const outer = Math.min(radialSegments, inner + 1);
    const outerHeight = height[indexAt(outer, angle)] * (1 - blend) + height[indexAt(outer, angle + 1)] * blend;
    return innerHeight * (1 - mix) + outerHeight * mix;
  }
  return { positions, normals, indices, height, velocity, weights, count, radialSegments, angularSegments,
    step, clear, sample,
    getDiagnostics() { return { amplitude, maxSpeed, meanHeight, elapsed, coupling, fixedStep: FIXED_STEP }; } };
}

/** Constant gravity, including a stable positive intersection with the pool. */
export function createGravityJet({ x, y, z, poolY, vx = 0, vy = -1.15, vz = 0, gravity = 9.81 }) {
  if (![x, y, z, poolY, vx, vy, vz, gravity].every(Number.isFinite)
    || gravity <= 0 || y <= poolY) throw new TypeError('A falling jet must start above its pool.');
  const drop = y - poolY;
  const root = Math.sqrt(vy * vy + 2 * gravity * drop);
  const duration = vy <= 0 ? 2 * drop / (root - vy) : (root + vy) / gravity;
  return {
    duration,
    gravity,
    at(t, target) {
      const time = Math.max(0, Math.min(duration, t));
      target.x = x + vx * time;
      target.y = y + vy * time - 0.5 * gravity * time * time;
      target.z = z + vz * time;
      return target;
    },
    tangentAt(t, target) {
      const time = Math.max(0, Math.min(duration, t));
      target.x = vx;
      target.y = vy - gravity * time;
      target.z = vz;
      return target;
    },
    radiusAt(t, inletRadius = 0.043) {
      const initialSpeed = Math.hypot(vx, vy, vz);
      const time = Math.max(0, Math.min(duration, t));
      const speed = Math.hypot(vx, vy - gravity * time, vz);
      return inletRadius * Math.sqrt(Math.max(initialSpeed, 0.1) / Math.max(speed, 0.1));
    },
  };
}
