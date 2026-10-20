import * as THREE from 'three';
import { createGravityJet, createSurfaceWaveModel } from './fluid-physics.js';

const TAU = Math.PI * 2;
const clamp = (value, lower, upper) => Math.max(lower, Math.min(upper, value));

/**
 * A visual fluid model around actual scene pipe endpoints. It cannot write
 * telemetry or lower a real tank level. The owner supplies either a discrete
 * measured interval or an explicitly simulated DEMO fill.
 */
export function createFluidEffects({ scene, tank, inletCurve, outletCurve, waterSurface, waterEdge, liquid,
  lowPower = false, trackGeometry, trackMaterial }) {
  const geometry = (value) => { trackGeometry?.(value); return value; };
  const material = (value) => { trackMaterial?.(value); return value; };
  const group = new THREE.Group();
  group.name = 'tank-fluid-effects';
  scene.add(group);
  const point = new THREE.Vector3();
  const tangent = new THREE.Vector3();
  const normal = new THREE.Vector3();
  const binormal = new THREE.Vector3();
  const up = new THREE.Vector3(0, 1, 0);
  const dummy = new THREE.Object3D();
  const intake = inletCurve.getPointAt(0, new THREE.Vector3());
  const nozzle = outletCurve.getPointAt(1, new THREE.Vector3());
  const nozzleDirection = outletCurve.getTangentAt(1, new THREE.Vector3());
  const radius = Math.min(tank.radius - 0.046, 1.014);
  const angularSegments = lowPower ? 40 : 64;
  const radialSegments = lowPower ? 10 : 16;
  const waves = createSurfaceWaveModel({ radius, radialSegments, angularSegments });
  const surfaceGeometry = geometry(new THREE.BufferGeometry());
  surfaceGeometry.setIndex(new THREE.BufferAttribute(waves.indices, 1));
  surfaceGeometry.setAttribute('position', new THREE.BufferAttribute(waves.positions, 3).setUsage(THREE.DynamicDrawUsage));
  surfaceGeometry.setAttribute('normal', new THREE.BufferAttribute(waves.normals, 3).setUsage(THREE.DynamicDrawUsage));
  const surfaceUv = new Float32Array(waves.count * 2);
  for (let index = 0; index < waves.count; index += 1) {
    surfaceUv[index * 2] = waves.positions[index * 3] / (radius * 2) + 0.5;
    surfaceUv[index * 2 + 1] = waves.positions[index * 3 + 2] / (radius * 2) + 0.5;
  }
  surfaceGeometry.setAttribute('uv', new THREE.BufferAttribute(surfaceUv, 2));
  surfaceGeometry.computeBoundingSphere();
  waterSurface.geometry = surfaceGeometry;
  waterSurface.frustumCulled = false;
  const liquidPositions = liquid?.geometry?.attributes?.position;
  const liquidTopIndices = [];
  if (liquidPositions) {
    for (let index = 0; index < liquidPositions.count; index += 1) {
      if (liquidPositions.array[index * 3 + 1] > 0.499) liquidTopIndices.push(index);
    }
    liquidPositions.setUsage(THREE.DynamicDrawUsage);
    liquid.frustumCulled = false;
  }

  // This thin meniscus follows the wave boundary instead of remaining a rigid
  // floating torus. The old surface and torus are still in the owner's resource
  // registry and are disposed together with the scene.
  const edgePositions = new Float32Array((angularSegments + 1) * 2 * 3);
  const edgeIndices = new Uint16Array(angularSegments * 6);
  for (let index = 0; index < angularSegments; index += 1) {
    const a = index * 2;
    edgeIndices.set([a, a + 2, a + 1, a + 2, a + 3, a + 1], index * 6);
  }
  const edgeGeometry = geometry(new THREE.BufferGeometry());
  edgeGeometry.setIndex(new THREE.BufferAttribute(edgeIndices, 1));
  edgeGeometry.setAttribute('position', new THREE.BufferAttribute(edgePositions, 3).setUsage(THREE.DynamicDrawUsage));
  waterEdge.geometry = edgeGeometry;
  waterEdge.rotation.set(0, 0, 0);
  waterEdge.frustumCulled = false;

  function mesh(shape, paint, position, parent = group) {
    const value = new THREE.Mesh(geometry(shape), paint);
    if (position) value.position.set(...position);
    value.castShadow = false;
    value.receiveShadow = false;
    parent.add(value);
    return value;
  }
  const waterPaint = material(new THREE.MeshPhysicalMaterial({
    color: 0x16aebe, metalness: 0.025, roughness: 0.12, clearcoat: 1,
    clearcoatRoughness: 0.09, transparent: true, opacity: 0.66,
    side: THREE.DoubleSide, depthWrite: false,
  }));
  const jetPaint = material(new THREE.MeshPhysicalMaterial({
    color: 0x21bed0, metalness: 0, roughness: 0.08, clearcoat: 1,
    transparent: true, opacity: 0.76, side: THREE.DoubleSide, depthWrite: false,
  }));
  function makeFlowPaint() {
    return material(new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, side: THREE.DoubleSide,
      uniforms: { uPhase: { value: 0 }, uDensity: { value: 8 } },
      vertexShader: `varying vec2 vFlowUv;
        void main() { vFlowUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `varying vec2 vFlowUv;
        uniform float uPhase;
        uniform float uDensity;
        void main() {
          float band = pow(max(0.0, sin((vFlowUv.x * uDensity - uPhase) * 6.2831853)), 10.0);
          float reflection = pow(max(0.0, sin(vFlowUv.y * 6.2831853 + 0.75)), 8.0);
          float vein = pow(max(0.0, sin(vFlowUv.x * 62.0 - vFlowUv.y * 20.0 - uPhase * 5.0)), 18.0);
          float alpha = reflection * (0.15 + band * 0.55) + vein * 0.14;
          gl_FragColor = vec4(vec3(0.87, 0.99, 1.0), alpha);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`,
    }));
  }
  const paths = [inletCurve, outletCurve];
  const pathSamples = paths.map((path) => {
    const samples = 128;
    const positions = new Float32Array((samples + 1) * 3);
    const tangents = new Float32Array((samples + 1) * 3);
    for (let index = 0; index <= samples; index += 1) {
      path.getPointAt(index / samples, point);
      path.getTangentAt(index / samples, tangent);
      positions.set([point.x, point.y, point.z], index * 3);
      tangents.set([tangent.x, tangent.y, tangent.z], index * 3);
    }
    return { samples, positions, tangents, length: path.getLength() };
  });
  function samplePath(index, fraction) {
    const cache = pathSamples[index];
    const offset = clamp(fraction, 0, 1) * cache.samples;
    const first = Math.min(cache.samples - 1, Math.floor(offset));
    const mix = offset - first;
    const a = first * 3;
    const b = (first + 1) * 3;
    const positions = cache.positions;
    const tangents = cache.tangents;
    point.set(positions[a] + (positions[b] - positions[a]) * mix,
      positions[a + 1] + (positions[b + 1] - positions[a + 1]) * mix,
      positions[a + 2] + (positions[b + 2] - positions[a + 2]) * mix);
    tangent.set(tangents[a] + (tangents[b] - tangents[a]) * mix,
      tangents[a + 1] + (tangents[b + 1] - tangents[a + 1]) * mix,
      tangents[a + 2] + (tangents[b + 2] - tangents[a + 2]) * mix).normalize();
  }
  const pipeWater = [];
  const flowHighlights = [];
  const flowPaints = [];
  for (const path of paths) {
    const water = mesh(new THREE.TubeGeometry(path, lowPower ? 40 : 64, 0.050, lowPower ? 6 : 8, false), waterPaint);
    water.renderOrder = 2;
    pipeWater.push(water);
    const paint = makeFlowPaint();
    paint.uniforms.uDensity.value = path.getLength() * 3.0;
    const highlight = mesh(new THREE.TubeGeometry(path, lowPower ? 40 : 64, 0.051, lowPower ? 6 : 8, false), paint);
    highlight.renderOrder = 3;
    flowHighlights.push(highlight);
    flowPaints.push(paint);
  }

  // White, non-emissive chevrons inside a continuous blue water column retain
  // an unambiguous direction even when the viewer requests reduced motion.
  const arrowPaint = material(new THREE.MeshBasicMaterial({ color: 0xeaffff, transparent: true, opacity: 0.88, depthWrite: false }));
  const arrowCount = lowPower ? 6 : 10;
  const flowArrows = new THREE.InstancedMesh(geometry(new THREE.ConeGeometry(0.024, 0.071, 7)), arrowPaint, arrowCount);
  flowArrows.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  flowArrows.frustumCulled = false;
  flowArrows.renderOrder = 5;
  group.add(flowArrows);

  // An open receiving cup is wholly inside the existing instrument skid. Its
  // water is a static illustration, never a displayed volume measurement.
  const basin = { x: clamp(nozzle.x, -2.15, 3.19), z: clamp(nozzle.z, -0.70, 1.56),
    y: 0.155, radiusX: 0.46, radiusZ: 0.355, surfaceY: 0.295, rimY: 0.405 };
  const steelPaint = material(new THREE.MeshStandardMaterial({ color: 0xc7dae2, metalness: 0.66, roughness: 0.26 }));
  const cupPaint = material(new THREE.MeshPhysicalMaterial({ color: 0xc6e4ec, metalness: 0.06,
    roughness: 0.18, clearcoat: 1, transparent: true, opacity: 0.32, side: THREE.DoubleSide, depthWrite: false }));
  const cup = mesh(new THREE.CylinderGeometry(basin.radiusX, basin.radiusX - 0.025, 0.25, lowPower ? 32 : 48, 1, true),
    cupPaint, [basin.x, basin.y + 0.125, basin.z]);
  cup.scale.z = basin.radiusZ / basin.radiusX;
  cup.renderOrder = 4;
  const cupBottom = mesh(new THREE.CylinderGeometry(basin.radiusX - 0.02, basin.radiusX - 0.02, 0.024, lowPower ? 32 : 48),
    steelPaint, [basin.x, basin.y, basin.z]);
  cupBottom.scale.z = basin.radiusZ / basin.radiusX;
  const cupRim = mesh(new THREE.TorusGeometry(basin.radiusX, 0.014, 7, lowPower ? 32 : 48), steelPaint,
    [basin.x, basin.rimY, basin.z]);
  cupRim.rotation.x = Math.PI / 2;
  cupRim.scale.y = basin.radiusZ / basin.radiusX;
  const poolPaint = material(new THREE.MeshPhysicalMaterial({ color: 0x48c5d1, metalness: 0.05, roughness: 0.13,
    transparent: true, opacity: 0.68, clearcoat: 1, side: THREE.DoubleSide, depthWrite: false }));
  const pool = mesh(new THREE.CircleGeometry(basin.radiusX - 0.035, lowPower ? 32 : 48).rotateX(-Math.PI / 2),
    poolPaint, [basin.x, basin.surfaceY, basin.z]);
  pool.scale.z = basin.radiusZ / basin.radiusX;
  pool.renderOrder = 3;

  let jet = createGravityJet({ ...nozzle, poolY: basin.surfaceY,
    vx: nozzleDirection.x * 1.15, vy: Math.min(-0.65, nozzleDirection.y * 1.15), vz: nozzleDirection.z * 1.15 });
  jet.at(jet.duration, point);
  const normalizedX = (point.x - basin.x) / (basin.radiusX * 0.72);
  const normalizedZ = (point.z - basin.z) / (basin.radiusZ * 0.72);
  const normalizedRadius = Math.hypot(normalizedX, normalizedZ);
  if (normalizedRadius > 1) {
    const landingX = basin.x + normalizedX / normalizedRadius * basin.radiusX * 0.72;
    const landingZ = basin.z + normalizedZ / normalizedRadius * basin.radiusZ * 0.72;
    jet = createGravityJet({ ...nozzle, poolY: basin.surfaceY,
      vx: (landingX - nozzle.x) / jet.duration,
      vy: Math.min(-0.65, nozzleDirection.y * 1.15), vz: (landingZ - nozzle.z) / jet.duration });
  }
  const impact = jet.at(jet.duration, new THREE.Vector3());
  const jetRows = lowPower ? 18 : 30;
  const jetSides = lowPower ? 7 : 10;
  const jetPositions = new Float32Array((jetRows + 1) * (jetSides + 1) * 3);
  const jetUvs = new Float32Array((jetRows + 1) * (jetSides + 1) * 2);
  const jetIndices = new Uint16Array(jetRows * jetSides * 6);
  for (let row = 0; row <= jetRows; row += 1) {
    const fraction = row / jetRows;
    jet.at(fraction * jet.duration, point);
    jet.tangentAt(fraction * jet.duration, tangent).normalize();
    normal.set(-tangent.y, tangent.x, 0).normalize();
    binormal.crossVectors(tangent, normal).normalize();
    const jetRadius = jet.radiusAt(fraction * jet.duration);
    for (let side = 0; side <= jetSides; side += 1) {
      const phase = side / jetSides * TAU;
      const index = row * (jetSides + 1) + side;
      const nx = normal.x * Math.cos(phase) + binormal.x * Math.sin(phase);
      const ny = normal.y * Math.cos(phase) + binormal.y * Math.sin(phase);
      const nz = normal.z * Math.cos(phase) + binormal.z * Math.sin(phase);
      jetPositions[index * 3] = point.x + nx * jetRadius;
      jetPositions[index * 3 + 1] = point.y + ny * jetRadius;
      jetPositions[index * 3 + 2] = point.z + nz * jetRadius;
      jetUvs[index * 2] = fraction;
      jetUvs[index * 2 + 1] = side / jetSides;
      if (row < jetRows && side < jetSides) {
        const next = index + jetSides + 1;
        jetIndices.set([index, next, index + 1, index + 1, next, next + 1], (row * jetSides + side) * 6);
      }
    }
  }
  const jetGeometry = geometry(new THREE.BufferGeometry());
  jetGeometry.setAttribute('position', new THREE.BufferAttribute(jetPositions, 3));
  jetGeometry.setAttribute('uv', new THREE.BufferAttribute(jetUvs, 2));
  jetGeometry.setIndex(new THREE.BufferAttribute(jetIndices, 1));
  jetGeometry.computeVertexNormals();
  const jetWater = mesh(jetGeometry, jetPaint);
  jetWater.renderOrder = 4;
  const jetFlowPaint = makeFlowPaint();
  jetFlowPaint.uniforms.uDensity.value = 5;
  const jetHighlights = mesh(jetGeometry, jetFlowPaint);
  jetHighlights.scale.setScalar(1.0001);
  jetHighlights.renderOrder = 5;
  flowPaints.push(jetFlowPaint);

  const splashCount = lowPower ? 12 : 26;
  const splashPaint = material(new THREE.MeshPhysicalMaterial({ color: 0xd5fbff, metalness: 0,
    roughness: 0.06, transparent: true, opacity: 0.83, clearcoat: 1, depthWrite: false }));
  const splashes = new THREE.InstancedMesh(geometry(new THREE.SphereGeometry(1, 7, 5)), splashPaint, splashCount);
  splashes.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  splashes.frustumCulled = false;
  splashes.renderOrder = 5;
  group.add(splashes);
  const splashParameters = new Float32Array(splashCount * 4);
  for (let index = 0; index < splashCount; index += 1) {
    splashParameters[index * 4] = index * 2.3999632297;
    splashParameters[index * 4 + 1] = 0.80 + (index % 4) * 0.16;
    splashParameters[index * 4 + 2] = 0.32 + (index % 3) * 0.10;
    splashParameters[index * 4 + 3] = 0.011 + (index % 4) * 0.003;
  }
  const poolRings = [];
  const poolRingPaints = [];
  const rippleGeometry = geometry(new THREE.TorusGeometry(1, 0.009, 5, lowPower ? 32 : 48));
  for (let index = 0; index < 4; index += 1) {
    const paint = material(new THREE.MeshBasicMaterial({ color: 0xd6ffff, transparent: true, opacity: 0.55, depthWrite: false }));
    const ring = new THREE.Mesh(rippleGeometry, paint);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(impact.x, basin.surfaceY + 0.004, impact.z);
    ring.renderOrder = 5;
    group.add(ring);
    poolRings.push(ring);
    poolRingPaints.push(paint);
  }

  // Flow converges from the deformed surface toward the actual tank outlet.
  // Its shallow spiral stays inside the tank and never becomes a deep funnel.
  const intakeLocalX = intake.x - tank.x;
  const intakeLocalZ = intake.z - tank.z;
  const intakeRadial = Math.hypot(intakeLocalX, intakeLocalZ);
  const sourceScale = intakeRadial > radius * 0.62 ? radius * 0.62 / intakeRadial : 1;
  const sourceX = intakeLocalX * sourceScale;
  const sourceZ = intakeLocalZ * sourceScale;
  const spiralSegments = lowPower ? 20 : 30;
  const spiralCount = 3;
  const spiralPositions = new Float32Array(spiralCount * spiralSegments * 6);
  const spiralGeometry = geometry(new THREE.BufferGeometry());
  spiralGeometry.setAttribute('position', new THREE.BufferAttribute(spiralPositions, 3).setUsage(THREE.DynamicDrawUsage));
  const intakeLines = new THREE.LineSegments(spiralGeometry, material(new THREE.LineBasicMaterial({
    color: 0xe4ffff, transparent: true, opacity: 0.65, depthWrite: false,
  })));
  intakeLines.frustumCulled = false;
  intakeLines.renderOrder = 3;
  group.add(intakeLines);

  const state = { online: false, pump: false, known: false, fill: 0, demo: false, reducedMotion: false };
  let waterDelivery = false;
  let intakeSubmerged = false;
  let flowTime = 0;
  let lastFill = 0;
  let surfaceY = tank.bottom;

  function updateEdge() {
    for (let index = 0; index <= angularSegments; index += 1) {
      const angle = (index % angularSegments) / angularSegments * TAU;
      const height = waves.height[1 + (radialSegments - 1) * angularSegments + index % angularSegments];
      for (let side = 0; side < 2; side += 1) {
        const offset = (index * 2 + side) * 3;
        const r = radius + (side ? 0.007 : -0.007);
        edgePositions[offset] = Math.cos(angle) * r;
        edgePositions[offset + 1] = height;
        edgePositions[offset + 2] = Math.sin(angle) * r;
      }
    }
    edgeGeometry.attributes.position.needsUpdate = true;
    // The open liquid cylinder must meet the moving surface. Its vertical
    // generators keep radial normals, so moving only the top ring closes both
    // crest gaps and raised rigid side edges without rebuilding its geometry.
    if (state.known && liquidPositions) {
      const liquidHeight = Math.max(0.001, tank.height * state.fill);
      for (const index of liquidTopIndices) {
        const offset = index * 3;
        liquidPositions.array[offset + 1] = 0.5 + (0.009
          + waves.sample(liquidPositions.array[offset], liquidPositions.array[offset + 2])) / liquidHeight;
      }
      liquidPositions.needsUpdate = true;
    }
  }

  function animateFlow() {
    for (const paint of flowPaints) paint.uniforms.uPhase.value = flowTime * 2.35;
    for (let index = 0; index < arrowCount; index += 1) {
      const pathIndex = index % 2;
      const count = Math.ceil(arrowCount / 2);
      const fraction = (0.12 + Math.floor(index / 2) / count + flowTime * 0.65 / pathSamples[pathIndex].length) % 1;
      samplePath(pathIndex, fraction);
      dummy.position.copy(point);
      dummy.quaternion.setFromUnitVectors(up, tangent);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      flowArrows.setMatrixAt(index, dummy.matrix);
    }
    flowArrows.instanceMatrix.needsUpdate = true;
    for (let index = 0; index < splashCount; index += 1) {
      const angle = splashParameters[index * 4];
      const velocityY = splashParameters[index * 4 + 1];
      const velocityR = splashParameters[index * 4 + 2];
      const size = splashParameters[index * 4 + 3];
      const duration = 2 * velocityY / 9.81;
      const age = ((flowTime + index / splashCount * duration) % duration);
      const x = impact.x + Math.cos(angle) * velocityR * age;
      const z = impact.z + Math.sin(angle) * velocityR * age;
      const y = basin.surfaceY + velocityY * age - 0.5 * 9.81 * age * age;
      const inside = ((x - basin.x) / (basin.radiusX * 0.87)) ** 2
        + ((z - basin.z) / (basin.radiusZ * 0.87)) ** 2 <= 1;
      dummy.position.set(x, y, z);
      dummy.quaternion.identity();
      dummy.scale.set(inside ? size : 0, inside ? size * (1.25 + Math.abs(velocityY - 9.81 * age) * 0.55) : 0,
        inside ? size : 0);
      dummy.updateMatrix();
      splashes.setMatrixAt(index, dummy.matrix);
    }
    splashes.instanceMatrix.needsUpdate = true;
    for (let index = 0; index < poolRings.length; index += 1) {
      const phase = (flowTime * 1.8 + index / poolRings.length) % 1;
      const radius = 0.022 + phase * 0.20;
      poolRings[index].scale.set(radius, radius * 0.70, 1);
      poolRingPaints[index].opacity = (1 - phase) * 0.63;
    }
    let offset = 0;
    const depth = Math.max(0.012, surfaceY - intake.y);
    for (let strand = 0; strand < spiralCount; strand += 1) {
      for (let segment = 0; segment < spiralSegments; segment += 1) {
        for (let end = 0; end < 2; end += 1) {
          const t = (segment + end) / spiralSegments;
          const angle = strand / spiralCount * TAU + t * TAU * 1.3 - flowTime * 1.9;
          const swirlRadius = 0.21 * (1 - t);
          const x = sourceX * (1 - t) + intakeLocalX * t + Math.cos(angle) * swirlRadius;
          const z = sourceZ * (1 - t) + intakeLocalZ * t + Math.sin(angle) * swirlRadius;
          spiralPositions[offset++] = tank.x + x;
          spiralPositions[offset++] = surfaceY - depth * t + waves.sample(x, z) * (1 - t) - 0.008;
          spiralPositions[offset++] = tank.z + z;
        }
      }
    }
    spiralGeometry.attributes.position.needsUpdate = true;
  }

  function setState(next = {}) {
    state.online = next.online === true;
    state.pump = next.pump === true;
    state.known = next.known === true && Number.isFinite(next.fill);
    state.fill = state.known ? clamp(next.fill, 0, 1) : 0;
    state.demo = next.demo === true;
    state.reducedMotion = next.reducedMotion === true;
    surfaceY = tank.bottom + tank.height * state.fill + 0.009;
    intakeSubmerged = state.known && surfaceY > intake.y + 0.020;
    waterDelivery = state.online && state.pump && state.known && intakeSubmerged;
    if (!state.online || !state.known || state.reducedMotion || Math.abs(state.fill - lastFill) > 0.16) {
      waves.clear();
      surfaceGeometry.attributes.position.needsUpdate = true;
      surfaceGeometry.attributes.normal.needsUpdate = true;
      updateEdge();
    }
    lastFill = state.fill;
    for (const water of pipeWater) water.visible = state.known;
    waterPaint.color.set(state.online ? 0x16aebe : 0x91b8c3);
    waterPaint.opacity = state.online ? 0.66 : 0.30;
    for (const highlight of flowHighlights) highlight.visible = waterDelivery;
    jetWater.visible = jetHighlights.visible = flowArrows.visible = intakeLines.visible = waterDelivery;
    splashes.visible = waterDelivery && !state.reducedMotion;
    for (const ring of poolRings) ring.visible = waterDelivery;
    // Generate a meaningful static depiction before the next render tick.
    animateFlow();
  }

  function step(delta, _time) {
    if (!state.online || !state.known) return;
    if (!state.reducedMotion && Number.isFinite(delta) && delta > 0) {
      const dt = Math.min(delta, 0.05);
      if (waterDelivery) flowTime = (flowTime + dt) % 1024;
      if (waves.step(dt, { pump: waterDelivery, sourceX, sourceZ,
        strength: clamp((surfaceY - intake.y) / 0.25, 0, 1),
        amplitudeLimit: Math.min(0.045, tank.height * state.fill * 0.10) })) {
        surfaceGeometry.attributes.position.needsUpdate = true;
        surfaceGeometry.attributes.normal.needsUpdate = true;
        updateEdge();
      }
      if (waterDelivery) animateFlow();
    }
  }

  updateEdge();
  setState({});
  return {
    setState,
    step,
    getDiagnostics() {
      const wave = waves.getDiagnostics();
      return { online: state.online, pump: state.pump, known: state.known, fill: state.fill, demo: state.demo,
        reducedMotion: state.reducedMotion, intakeSubmerged, waterDelivery,
        surfaceVertices: waves.count, surfaceTriangles: waves.indices.length / 3,
        wave, flowTime, splashCount, surfaceY, liquidSideFollowsSurface: Boolean(liquidPositions),
        surfaceRadius: radius, surfaceHeightRange: [surfaceY - wave.amplitude, surfaceY + wave.amplitude],
        stream: { visible: jetWater.visible, frozen: state.reducedMotion, continuousColumn: true,
          highlightsVisible: jetHighlights.visible, splashesVisible: splashes.visible },
        intake: { x: intake.x, y: intake.y, z: intake.z },
        nozzle: { x: nozzle.x, y: nozzle.y, z: nozzle.z },
        impact: { x: impact.x, y: impact.y, z: impact.z }, basin: { ...basin },
        jetFallSeconds: jet.duration, gravity: jet.gravity };
    },
  };
}
