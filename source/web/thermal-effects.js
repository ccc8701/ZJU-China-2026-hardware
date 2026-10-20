import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { createThermalVolume } from './thermal-volume.js';

const clamp = (value, low, high) => Math.max(low, Math.min(high, value));
const palette = `
  vec3 thermalColor(float t) {
    vec3 neutral = vec3(0.20, 0.48, 0.56);
    if (t < 0.0) return mix(neutral, mix(vec3(0.015, 0.30, 0.72), vec3(0.025, 0.07, 0.63),
      smoothstep(0.40, 1.0, -t)), smoothstep(0.0, 0.70, -t));
    return mix(neutral, mix(vec3(1.0, 0.27, 0.018), vec3(0.72, 0.035, 0.012),
      smoothstep(0.40, 1.0, t)), smoothstep(0.0, 0.70, t));
  }`;

/**
 * Engineering illustration of a relative thermal field and transport paths.
 * The XYZ scalar volume carries the internal thermal evolution. Only the short
 * wall-contact and fan-exhaust paths are drawn; liquid circulation has no mesh.
 * Resources are owned here and released on every geometry replacement/dispose.
 */
export function createThermalEffects({ scene, tank, lowPower = false, heater, fan,
  coldNormal, coldTangent, coldPoint, coldCenterY, contactHeight, contactFace,
  sinkInner, sinkDepth }) {
  const radius = tank.radius - 0.065;
  const coldBottom = coldCenterY - contactHeight / 2 - tank.bottom;
  const coldTop = coldCenterY + contactHeight / 2 - tank.bottom;
  const field = createThermalVolume({ columns: lowPower ? 12 : 18, rows: lowPower ? 20 : 28, depth: lowPower ? 12 : 18,
    tankHeight: tank.height, heaterBottom: heater.bottom - tank.bottom,
    heaterTop: heater.top - tank.bottom, heaterAngle: heater.angle, heaterArc: heater.arcAngle,
    coldAngle: Math.atan2(coldNormal.z, coldNormal.x), coldBottom, coldTop });
  const group = new THREE.Group();
  group.name = 'relative-thermal-field';
  scene.add(group);
  const geometries = new Set(), materials = new Set();
  let disposed = false;
  let fieldTime = 0, uploadAt = -1, textureRevision = -1;
  let geometryKey = '', builtMode = 'idle';
  let liquidHeight = 0, lastFill = 0;
  let conductionEndpoints = [], fanOutletClearance = 0;
  const state = { online: false, known: false, fill: 0, heat: false, cool: false,
    reducedMotion: false, demo: false };
  const pixels = new Uint8Array(field.columns * field.rows * field.depth * 4);
  const texture = new THREE.Data3DTexture(pixels, field.columns, field.rows, field.depth);
  texture.format = THREE.RGBAFormat;
  texture.minFilter = texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  texture.colorSpace = THREE.NoColorSpace;
  texture.needsUpdate = true;

  function ownMaterial(value) { materials.add(value); return value; }
  const fieldMaterial = ownMaterial(new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.BackSide, toneMapped: false, glslVersion: THREE.GLSL3,
    uniforms: { uField: { value: texture }, uOpacity: { value: 0.72 } },
    vertexShader: `out vec3 vPoint; out vec3 vOrigin;
      void main() {
        vPoint = position + vec3(0.0, 0.5, 0.0);
        vOrigin = (inverse(modelMatrix) * vec4(cameraPosition, 1.0)).xyz + vec3(0.0, 0.5, 0.0);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: `in vec3 vPoint; in vec3 vOrigin;
      uniform highp sampler3D uField; uniform float uOpacity; out vec4 fragColor;
      ${palette}
      vec3 srgb(vec3 color) {
        return mix(12.92 * color, 1.055 * pow(max(color, vec3(0.0)), vec3(0.4166667)) - 0.055,
          step(vec3(0.0031308), color));
      }
      void main() {
        vec3 ray = normalize(vPoint - vOrigin);
        float a = dot(ray.xz, ray.xz), b = dot(vOrigin.xz, ray.xz);
        float discriminant = b * b - a * (dot(vOrigin.xz, vOrigin.xz) - 1.0);
        if (discriminant < 0.0) discard;
        float root = sqrt(max(discriminant, 0.0));
        vec2 side = a > 0.000001 ? vec2((-b - root) / a, (-b + root) / a) : vec2(-1e5, 1e5);
        vec2 cap = abs(ray.y) > 0.000001 ? vec2(-vOrigin.y / ray.y, (1.0 - vOrigin.y) / ray.y) : vec2(-1e5, 1e5);
        if (cap.x > cap.y) cap = cap.yx;
        float start = max(0.0, max(side.x, cap.x)), end = min(side.y, cap.y);
        if (end <= start) discard;
        float delta = (end - start) / float(${lowPower ? 42 : 68});
        vec4 accumulated = vec4(0.0);
        for (int i = 0; i < ${lowPower ? 42 : 68}; i++) {
          vec3 p = vOrigin + ray * (start + (float(i) + 0.5) * delta);
          vec4 voxel = texture(uField, vec3(p.x * 0.5 + 0.5, p.y, p.z * 0.5 + 0.5));
          float theta = voxel.r * 2.0 - 1.0;
          float strength = smoothstep(0.008, 0.24, abs(theta)) * voxel.a;
          float alpha = 1.0 - exp(-strength * uOpacity * 3.0 * delta);
          float colorTheta = sign(theta) * pow(abs(theta), 0.55);
          accumulated.rgb += (1.0 - accumulated.a) * thermalColor(colorTheta) * alpha;
          accumulated.a += (1.0 - accumulated.a) * alpha;
          if (accumulated.a > 0.96) break;
        }
        if (accumulated.a < 0.004) discard;
        fragColor = vec4(srgb(accumulated.rgb / max(accumulated.a, 0.0001)), accumulated.a);
      }`,
  }));
  function makeFlowMaterial(kind) {
    return ownMaterial(new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, side: THREE.DoubleSide, toneMapped: false,
      uniforms: { uTime: { value: 0 }, uOpacity: { value: 1 }, uKind: { value: kind } },
      vertexShader: `attribute float pathPhase;
        varying float vProgress; varying float vPhase; varying vec3 vNormalView;
        void main() { vProgress = uv.x; vPhase = pathPhase;
          vec4 viewPoint = modelViewMatrix * vec4(position, 1.0);
          vNormalView = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * viewPoint; }`,
      fragmentShader: `varying float vProgress; varying float vPhase; varying vec3 vNormalView;
        uniform float uTime; uniform float uOpacity; uniform float uKind;
        void main() {
          vec3 color = mix(vec3(0.95, 0.34, 0.13), vec3(1.0, 0.77, 0.35), vProgress);
          if (uKind > 1.5 && uKind < 2.5) color = mix(vec3(0.16, 0.66, 0.88), vec3(0.95, 0.65, 0.27), vProgress);
          else if (uKind > 2.5) color = mix(vec3(0.98, 0.60, 0.22), vec3(0.94, 0.78, 0.48), vProgress);
          float phase = fract(vProgress - uTime * 0.43 + vPhase);
          float trail = smoothstep(0.48, 0.70, phase) * (1.0 - smoothstep(0.89, 0.99, phase));
          float lighting = mix(0.80, 1.14, 0.5 + 0.5 * dot(normalize(vNormalView), normalize(vec3(-0.35, 0.65, 0.85))));
          color *= 0.72 * lighting;
          float alpha = (0.72 + trail * 0.27) * uOpacity;
          gl_FragColor = vec4(mix(color, vec3(0.98, 1.0, 1.0), trail * 0.18), alpha);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`,
    }));
  }
  const conductionMaterial = makeFlowMaterial(1);
  const absorptionMaterial = makeFlowMaterial(2);
  const rejectionMaterial = makeFlowMaterial(3);
  const flowMaterials = [conductionMaterial, absorptionMaterial, rejectionMaterial];
  const fieldMesh = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 1, lowPower ? 24 : 40), fieldMaterial);
  const conduction = new THREE.Mesh(new THREE.BufferGeometry(), conductionMaterial);
  const absorption = new THREE.Mesh(new THREE.BufferGeometry(), absorptionMaterial);
  const rejection = new THREE.Mesh(new THREE.BufferGeometry(), rejectionMaterial);
  const meshes = [fieldMesh, conduction, absorption, rejection];
  meshes.forEach((mesh, index) => { mesh.name = ['thermal-volume', 'thermal-conduction', 'thermal-absorption', 'thermal-rejection'][index]; });
  for (const mesh of meshes) {
    geometries.add(mesh.geometry);
    mesh.castShadow = mesh.receiveShadow = false;
    mesh.frustumCulled = false;
    mesh.renderOrder = mesh === fieldMesh ? 3 : 5;
    mesh.visible = false;
    group.add(mesh);
  }

  function replaceGeometry(mesh, next) {
    geometries.delete(mesh.geometry);
    mesh.geometry.dispose();
    geometries.add(next);
    mesh.geometry = next;
  }
  function tubeGeometry(paths, thickness) {
    if (!paths.length) return new THREE.BufferGeometry();
    const pieces = paths.map((path, pathIndex) => {
      const curve = new THREE.CatmullRomCurve3(path.points, false, 'catmullrom', 0.12);
      const segments = lowPower ? 16 : 24;
      const value = new THREE.TubeGeometry(curve, segments, thickness, lowPower ? 3 : 4, false);
      const phases = new Float32Array(value.attributes.position.count);
      phases.fill(pathIndex * 0.173);
      value.setAttribute('pathPhase', new THREE.BufferAttribute(phases, 1));
      return value;
    });
    const combined = mergeGeometries(pieces);
    pieces.forEach((piece) => piece.dispose());
    return combined;
  }

  function rebuild(mode) {
    builtMode = mode;
    liquidHeight = tank.height * state.fill;
    const volumeHeight = Math.max(0.001, liquidHeight - 0.025);
    fieldMesh.scale.set(radius, volumeHeight, radius);
    fieldMesh.position.set(tank.x, tank.bottom + 0.014 + volumeHeight / 2, tank.z);
    const heaterPaths = [];
    const surfaceMargin = Math.min(0.012, liquidHeight * 0.025);
    const heatLower = Math.max(tank.bottom + surfaceMargin, heater.bottom);
    const heatUpper = Math.min(tank.bottom + liquidHeight - surfaceMargin, heater.top);
    if (heatUpper > heatLower) for (let index = 0; index < (lowPower ? 2 : 3); index += 1) {
      const y = heatLower + (heatUpper - heatLower) * (index + 0.5) / (lowPower ? 2 : 3);
      const sideways = (index - (lowPower ? 0.5 : 1)) * 0.10;
      heaterPaths.push({ points: [new THREE.Vector3(...heater.point(heater.outerRadius + 0.008, y, sideways)),
        new THREE.Vector3(...heater.point(heater.innerRadius, y, sideways)),
        new THREE.Vector3(...heater.point(radius - 0.025, y, sideways))] });
    }
    replaceGeometry(conduction, tubeGeometry(heaterPaths, 0.008));
    conductionEndpoints = heaterPaths.map((path) => ({ ceramic: path.points[0].toArray(),
      liquid: path.points.at(-1).toArray() }));
    const lower = Math.max(tank.bottom + 0.025, coldCenterY - contactHeight / 2);
    const upper = Math.min(tank.bottom + liquidHeight - 0.02, coldCenterY + contactHeight / 2);
    const absorbPaths = [];
    if (upper > lower) for (let index = 0; index < 2; index += 1) {
      const y = lower + (upper - lower) * (index + 0.5) / 2;
      const sideways = (index - 0.5) * 0.13;
      absorbPaths.push({ points: [new THREE.Vector3(...coldPoint(0.82, y, sideways)),
        new THREE.Vector3(...coldPoint(contactFace, y, sideways)),
        new THREE.Vector3(...coldPoint(sinkInner + sinkDepth * 0.72, y, sideways))] });
    }
    replaceGeometry(absorption, tubeGeometry(absorbPaths, 0.007));
    const heatRejection = [-1, 1].map((side) => {
      const exit = fan.outerFace.clone().addScaledVector(fan.axis, 0.045)
        .addScaledVector(coldTangent, side * fan.openingRadius * 0.28);
      exit.y += side * fan.openingRadius * 0.20;
      const at = (distance, rise) => exit.clone().addScaledVector(fan.axis, distance)
        .add(new THREE.Vector3(0, rise, 0));
      return { points: [exit, at(0.23, 0.025), at(0.49, 0.12), at(0.72, 0.30)] };
    });
    replaceGeometry(rejection, tubeGeometry(heatRejection, 0.0065));
    fanOutletClearance = Infinity;
    const rejectedPositions = rejection.geometry.attributes.position.array;
    for (let index = 0; index < rejectedPositions.length; index += 3) {
      const distance = (rejectedPositions[index] - fan.outerFace.x) * fan.axis.x
        + (rejectedPositions[index + 1] - fan.outerFace.y) * fan.axis.y
        + (rejectedPositions[index + 2] - fan.outerFace.z) * fan.axis.z;
      fanOutletClearance = Math.min(fanOutletClearance, distance);
    }
  }

  function uploadField(force = false) {
    const diagnostics = field.getDiagnostics();
    if (!force && (diagnostics.revision === textureRevision || fieldTime - uploadAt < (lowPower ? 1 / 12 : 1 / 18))) return;
    for (let index = 0; index < field.values.length; index += 1) {
      const encoded = Math.round((clamp(field.values[index], -1, 1) + 1) * 127.5);
      pixels[index * 4] = pixels[index * 4 + 1] = pixels[index * 4 + 2] = encoded;
      pixels[index * 4 + 3] = field.mask[index] ? 255 : 0;
    }
    texture.needsUpdate = true;
    textureRevision = diagnostics.revision;
    uploadAt = fieldTime;
  }

  function setVisibility() {
    const valid = state.known && state.fill > 0.001;
    const interlocked = state.heat && state.cool;
    const activeMode = state.online && !interlocked ? (state.heat ? 'heat' : state.cool ? 'cool' : 'idle') : 'idle';
    fieldMesh.visible = valid && !interlocked;
    conduction.visible = valid && activeMode === 'heat' && field.heaterOverlap > 0;
    absorption.visible = valid && activeMode === 'cool' && field.coldOverlap > 0;
    rejection.visible = valid && activeMode === 'cool';
    fieldMaterial.uniforms.uOpacity.value = state.online ? 0.72 : 0.30;
    for (const paint of flowMaterials) {
      paint.uniforms.uOpacity.value = state.online ? 1 : 0.42;
    }
  }

  function setState(next = {}) {
    if (disposed) return;
    Object.assign(state, next);
    field.setState(state);
    const validMode = state.heat === state.cool ? 'idle' : state.heat ? 'heat' : 'cool';
    // Pause retains scalar history and external path geometry; a language change
    // calls update with identical state and cannot restart the field.
    const mode = state.online && state.known && validMode !== 'idle' ? validMode
      : state.online && state.known && validMode === 'idle' ? 'idle' : builtMode;
    const key = `${mode}:${Math.round(state.fill * 10000)}:${state.known}`;
    if (key !== geometryKey) {
      rebuild(mode); geometryKey = key;
    }
    if (state.demo !== next.demo || Math.abs(lastFill - state.fill) > 0.0001) uploadAt = -1;
    lastFill = state.fill;
    uploadField(true);
    setVisibility();
  }

  function step(delta) {
    if (disposed) return;
    if (state.online && state.known && state.fill > 0.001 && !state.reducedMotion && !(state.heat && state.cool)) {
      fieldTime += Math.min(Math.max(0, delta), 0.05);
      field.step(delta);
      for (const paint of flowMaterials) paint.uniforms.uTime.value = fieldTime;
      uploadField();
    }
  }

  setState({});
  return { setState, step,
    getDiagnostics() {
      return { ...field.getDiagnostics(), fieldTime, lowPower, slices: 0,
        volumeRendering: { technique: 'cylindrical_raymarch', texture: 'Data3DTexture', sampler: 'sampler3D',
          grid: [field.columns, field.rows, field.depth], raySteps: lowPower ? 42 : 68 },
        builtMode, drawCalls: meshes.filter((mesh) => mesh.visible).length,
        visible: fieldMesh.visible, circulationVisible: false, circulationCount: 0, circulationObjects: 0,
        conductionVisible: conduction.visible, absorptionVisible: absorption.visible,
        rejectionVisible: rejection.visible,
        pathRadius: 0, externalPathRadii: { conduction: 0.008, absorption: 0.007, rejection: 0.0065 },
        heatPathCrossesSideWall: true,
        conductionDirection: 'side_ceramic_through_tank_wall_to_liquid',
        heatingCirculationDirection: 'heater_contact_upward_opposite_side_return',
        coolingCirculationDirection: 'cold_contact_downward',
        absorptionDirection: 'liquid_through_cold_contact_and_peltier_to_sink',
        rejectionDirection: 'fan_outlet_to_ambient',
        spatial: { dimensions: 3, coordinates: 'cylindrical_normalized_xyz',
          representation: 'scalar_volume', internalPathCount: 0,
          worldBounds: [[tank.x - radius, tank.x + radius], [tank.bottom + 0.014,
            tank.bottom + 0.014 + Math.max(0.001, liquidHeight - 0.025)], [tank.z - radius, tank.z + radius]], radius },
        conductionEndpoints,
        heaterContact: { bottom: heater.bottom, top: heater.top, arcAngle: heater.arcAngle,
          innerRadius: heater.innerRadius, outerRadius: heater.outerRadius },
        fanExit: { plane: fan.outerFace.toArray(), axis: fan.axis.toArray(),
          openingRadius: fan.openingRadius, startClearance: 0.045, minimumGeometryClearance: fanOutletClearance },
        resources: { geometries: geometries.size, materials: materials.size, textures: 1 },
        vertices: meshes.reduce((sum, mesh) => sum + (mesh.geometry.attributes.position?.count || 0), 0) };
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      geometries.forEach((value) => value.dispose()); geometries.clear();
      materials.forEach((value) => value.dispose()); materials.clear();
      texture.dispose(); scene.remove(group);
    },
  };
}
