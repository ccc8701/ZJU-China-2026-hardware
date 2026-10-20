import { COOLING_CONTACT } from './thermal-contact.js';

const PI = Math.PI;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const angleDifference = (a, b) => Math.atan2(Math.sin(a - b), Math.cos(a - b));

/** Curl of a smooth 3D vector potential plus divergence-free azimuthal motion. */
export function createThermalVelocity({ heaterAngle = 1.72 + PI, coldAngle = 0.35 } = {}) {
  const dx = Math.cos(heaterAngle) - Math.cos(coldAngle);
  const dz = Math.sin(heaterAngle) - Math.sin(coldAngle);
  const length = Math.hypot(dx, dz) || 1;
  const direction = Math.atan2(dz / length, dx / length);
  return function velocity(x, y, z, out = { x: 0, y: 0, z: 0 }) {
    const q = Math.max(0, 1 - x * x - z * z);
    const py = clamp(y, 0, 1), s = Math.sin(PI * py);
    const s2 = s * s, verticalDerivative = PI * Math.sin(2 * PI * py);
    // Turning the horizontal vector potential with height creates a genuinely
    // spatial loop. Its derivative must also enter curl(A), preserving div(v)=0.
    const turn = 0.48 * Math.sin(2 * PI * py), turnDerivative = 0.96 * PI * Math.cos(2 * PI * py);
    const dxAt = Math.cos(direction + turn), dzAt = Math.sin(direction + turn);
    const strength = 0.070, swirl = 0.16;
    out.x = strength * q * q * (dxAt * verticalDerivative - dzAt * turnDerivative * s2)
      - swirl * z * q * q * s2;
    out.y = 4 * strength * (dxAt * x + dzAt * z) * q * s2;
    out.z = strength * q * q * (dzAt * verticalDerivative + dxAt * turnDerivative * s2)
      + swirl * x * q * q * s2;
    return out;
  };
}

/** True cylindrical XYZ field; θ is dimensionless, never measured temperature. */
export function createThermalVolume({ columns = 18, rows = 28, depth = 18, tankHeight = 3.02,
  heaterAngle = 1.72 + PI, heaterArc = PI / 5, heaterBottom = 0.22, heaterTop = 2.26,
  coldAngle = 0.35, coldArc = 0.74, coldBottom = COOLING_CONTACT.bottomOffset,
  coldTop = COOLING_CONTACT.bottomOffset + COOLING_CONTACT.height,
  diffusivity = 0.0035, sourceRadialBand = 0.22 } = {}) {
  const nx = Math.max(8, Math.round(columns)), ny = Math.max(8, Math.round(rows)), nz = Math.max(8, Math.round(depth));
  const count = nx * ny * nz, values = new Float32Array(count), transported = new Float32Array(count);
  const old = new Float32Array(count), mask = new Uint8Array(count);
  const xs = new Float32Array(count), ys = new Float32Array(count), zs = new Float32Array(count);
  const sourceHeat = new Float32Array(count), sourceCold = new Float32Array(count);
  const hx = 2 / (nx - 1), hy = 1 / (ny - 1), hz = 2 / (nz - 1);
  const inv = [1 / hx ** 2, 1 / hy ** 2, 1 / hz ** 2];
  const dt = Math.min(0.05, 0.45 / (diffusivity * (inv[0] + inv[1] + inv[2])));
  const velocity = createThermalVelocity({ heaterAngle, coldAngle });
  const state = { online: false, known: false, fill: 0, heat: false, cool: false, reducedMotion: false, demo: false };
  let mode = 'idle', steps = 0, revision = 0, resetCount = 0, simulatedSeconds = 0, accumulator = 0, historyFill = 0;
  let heaterOverlap = 0, coldOverlap = 0, heatRange = [1, 1], coldRange = [1, 1], validVoxels = 0;
  const index = (x, y, z) => (z * ny + y) * nx + x;
  for (let z = 0; z < nz; z += 1) for (let y = 0; y < ny; y += 1) for (let x = 0; x < nx; x += 1) {
    const i = index(x, y, z), px = -1 + x * hx, pz = -1 + z * hz;
    xs[i] = px; ys[i] = y * hy; zs[i] = pz;
    if (px * px + pz * pz > 1) continue;
    mask[i] = 1; validVoxels += 1;
    const radius = Math.hypot(px, pz), angle = Math.atan2(pz, px);
    const radial = Math.exp(-(((1 - radius) / sourceRadialBand) ** 2));
    const heatAngle = Math.abs(angleDifference(angle, heaterAngle)) / (heaterArc / 2);
    const coldAngleDistance = Math.abs(angleDifference(angle, coldAngle)) / (coldArc / 2);
    sourceHeat[i] = heatAngle < 1 ? radial * Math.cos(heatAngle * PI / 2) ** 2 : 0;
    sourceCold[i] = coldAngleDistance < 1 ? radial * Math.cos(coldAngleDistance * PI / 2) ** 2 : 0;
  }
  function sample(x, y, z, data = values) {
    const radius = Math.hypot(x, z);
    if (radius > 0.999) { x *= 0.999 / radius; z *= 0.999 / radius; }
    const px = clamp((x + 1) / 2, 0, 1) * (nx - 1), py = clamp(y, 0, 1) * (ny - 1), pz = clamp((z + 1) / 2, 0, 1) * (nz - 1);
    const x0 = Math.min(nx - 2, Math.floor(px)), y0 = Math.min(ny - 2, Math.floor(py)), z0 = Math.min(nz - 2, Math.floor(pz));
    const ax = px - x0, ay = py - y0, az = pz - z0;
    let total = 0, weight = 0;
    for (let k = 0; k < 2; k += 1) for (let j = 0; j < 2; j += 1) for (let i = 0; i < 2; i += 1) {
      const offset = index(x0 + i, y0 + j, z0 + k);
      const w = (i ? ax : 1 - ax) * (j ? ay : 1 - ay) * (k ? az : 1 - az) * mask[offset];
      total += data[offset] * w; weight += w;
    }
    return weight > 1e-9 ? total / weight : 0;
  }
  function reset() {
    values.fill(0); transported.fill(0); accumulator = 0; steps = 0; simulatedSeconds = 0; historyFill = 0;
    revision += 1; resetCount += 1;
  }
  function setState(next = {}) {
    const known = next.known === true && Number.isFinite(next.fill), fill = known ? clamp(next.fill, 0, 1) : 0;
    if (state.demo !== (next.demo === true)) reset();
    if (known && historyFill > 0.001 && fill > 0.001 && Math.abs(fill - historyFill) > 0.0001) {
      old.set(values);
      for (let i = 0; i < count; i += 1) if (mask[i]) {
        const y = ys[i] * fill / historyFill;
        values[i] = y <= 1 ? sample(xs[i], y, zs[i], old) : 0;
      }
      revision += 1;
    }
    Object.assign(state, { online: next.online === true, known, fill, heat: next.heat === true, cool: next.cool === true,
      reducedMotion: next.reducedMotion === true, demo: next.demo === true });
    if (known && fill > 0.001) historyFill = fill;
    const height = fill * tankHeight;
    heaterOverlap = Math.max(0, Math.min(height, heaterTop) - heaterBottom);
    coldOverlap = Math.max(0, Math.min(height, coldTop) - coldBottom);
    heatRange = height > 0 ? [clamp(heaterBottom / height, 0, 1), clamp(heaterTop / height, 0, 1)] : [1, 1];
    coldRange = height > 0 ? [clamp(coldBottom / height, 0, 1), clamp(coldTop / height, 0, 1)] : [1, 1];
    if (state.online && known) mode = state.heat === state.cool ? (state.heat ? 'invalid' : 'idle') : state.heat ? 'heat' : 'cool';
    if (!state.online || !known || state.reducedMotion || mode === 'invalid') accumulator = 0;
  }
  const a = {}, b = {};
  function advance() {
    const flowing = (mode === 'heat' && heaterOverlap > 0) || (mode === 'cool' && coldOverlap > 0);
    for (let i = 0; i < count; i += 1) if (mask[i]) {
      if (flowing) {
        velocity(xs[i], ys[i], zs[i], a);
        velocity(xs[i] - a.x * dt / 2, ys[i] - a.y * dt / 2, zs[i] - a.z * dt / 2, b);
        transported[i] = sample(xs[i] - b.x * dt, ys[i] - b.y * dt, zs[i] - b.z * dt);
      } else transported[i] = values[i];
    }
    const decay = Math.exp(-0.008 * dt);
    for (let z = 0; z < nz; z += 1) for (let y = 0; y < ny; y += 1) for (let x = 0; x < nx; x += 1) {
      const i = index(x, y, z); if (!mask[i]) continue;
      const centre = transported[i];
      const left = x > 0 && mask[i - 1] ? transported[i - 1] : centre;
      const right = x < nx - 1 && mask[i + 1] ? transported[i + 1] : centre;
      const below = y > 0 && mask[i - nx] ? transported[i - nx] : centre;
      const above = y < ny - 1 && mask[i + nx] ? transported[i + nx] : centre;
      const back = z > 0 && mask[i - nx * ny] ? transported[i - nx * ny] : centre;
      const front = z < nz - 1 && mask[i + nx * ny] ? transported[i + nx * ny] : centre;
      const laplacian = (left + right - 2 * centre) * inv[0] + (below + above - 2 * centre) * inv[1]
        + (back + front - 2 * centre) * inv[2];
      let value = (centre + diffusivity * dt * laplacian) * decay;
      const v = ys[i];
      if (mode === 'heat' && heaterOverlap > 0 && v >= heatRange[0] && v <= heatRange[1]) {
        value += (1 - value) * (1 - Math.exp(-2.0 * sourceHeat[i] * dt));
      } else if (mode === 'cool' && coldOverlap > 0 && v >= coldRange[0] && v <= coldRange[1]) {
        value += (-1 - value) * (1 - Math.exp(-2.0 * sourceCold[i] * dt));
      }
      values[i] = Number.isFinite(value) ? clamp(value, -1, 1) : 0;
    }
    steps += 1; simulatedSeconds += dt; revision += 1;
  }
  function step(seconds) {
    if (!state.online || !state.known || state.fill <= 0.001 || state.reducedMotion || mode === 'invalid'
      || !(seconds > 0) || !Number.isFinite(seconds)) return false;
    accumulator += Math.min(seconds, 0.12); let advanced = 0;
    while (accumulator + 1e-10 >= dt && advanced < 4) { advance(); accumulator -= dt; advanced += 1; }
    return advanced > 0;
  }
  function getDiagnostics() {
    let min = 0, max = 0, sum = 0, finite = true;
    for (let i = 0; i < count; i += 1) if (mask[i]) { min = Math.min(min, values[i]); max = Math.max(max, values[i]); sum += values[i]; finite &&= Number.isFinite(values[i]); }
    return { representation: 'dimensionless_relative_temperature', solver: '3d_semi_lagrangian_advection_explicit_diffusion',
      velocityModel: '3d_vector_potential_curl_with_azimuthal_flow', dimensions: 3,
      columns: nx, rows: ny, depth: nz, grid: [nx, ny, nz], cells: count, validVoxels, min, max, mean: sum / validVoxels, finite,
      mode, steps, revision, resetCount, simulatedSeconds, fixedStep: dt,
      diffusionStabilityNumber: diffusivity * dt * (inv[0] + inv[1] + inv[2]),
      diffusivity, sourceRadialBand,
      heaterOverlap, coldOverlap, heatSource: 'cylindrical_side_contact', heatSourceRange: heatRange,
      heatSourceHeight: [heaterBottom, heaterTop], coldSourceHeight: [coldBottom, coldTop], coldSourceRange: coldRange,
      sourceAngles: { heater: heaterAngle, heaterArc, cold: coldAngle, coldArc },
      fill: state.fill, online: state.online, known: state.known, reducedMotion: state.reducedMotion,
      frozen: !state.online || !state.known || state.fill <= 0.001 || state.reducedMotion || mode === 'invalid',
      xyzExtents: [[-1, 1], [0, 1], [-1, 1]] };
  }
  return { setState, step, reset, sample, velocity, getDiagnostics, values, mask,
    columns: nx, rows: ny, depth: nz, get mode() { return mode; },
    get heaterOverlap() { return heaterOverlap; }, get coldOverlap() { return coldOverlap; } };
}
