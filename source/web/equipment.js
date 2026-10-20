import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const TAU = Math.PI * 2;
const Y_AXIS = new THREE.Vector3(0, 1, 0);

function builder({ trackGeometry = (value) => value, trackMaterial = (value) => value }) {
  const dummy = new THREE.Object3D();
  const geometries = new Set();
  const materials = new Set();
  const geometry = (value) => { geometries.add(value); return trackGeometry(value); };
  const paint = (color, options = {}) => {
    const value = new THREE.MeshStandardMaterial({ color, roughness: 0.4, metalness: 0.2, ...options });
    materials.add(value); return trackMaterial(value);
  };
  const mesh = (shape, material, parent, at) => {
    const value = new THREE.Mesh(geometry(shape), material);
    if (at) value.position.fromArray(at);
    value.castShadow = true; value.receiveShadow = true;
    parent.add(value); return value;
  };
  const instances = (shape, material, transforms, parent) => {
    const value = new THREE.InstancedMesh(geometry(shape), material, transforms.length);
    transforms.forEach(({ position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1] }, index) => {
      dummy.position.fromArray(position); dummy.rotation.set(...rotation); dummy.scale.fromArray(scale);
      dummy.updateMatrix(); value.setMatrixAt(index, dummy.matrix);
    });
    value.castShadow = true; value.receiveShadow = true; parent.add(value); return value;
  };
  return { geometry, paint, mesh, instances,
    dispose() { geometries.forEach((value) => value.dispose()); materials.forEach((value) => value.dispose()); } };
}

/** A sector of a cylindrical wall, using local radial / tangential axes. */
export function createHeaterDescriptor(tank) {
  const angle = 1.72 + Math.PI;
  const arcAngle = Math.PI / 5;
  const innerRadius = tank.radius + 0.002;
  const outerRadius = innerRadius + 0.065;
  const bottom = tank.bottom + 0.22;
  const height = 2.04;
  const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
  const tangent = new THREE.Vector3(normal.z, 0, -normal.x);
  return { angle, arcAngle, innerRadius, outerRadius, bottom, top: bottom + height, height, normal, tangent,
    point(radius, y, sideways = 0) {
      return [tank.x + normal.x * radius + tangent.x * sideways, y,
        (tank.z || 0) + normal.z * radius + tangent.z * sideways];
    } };
}

function curvedWallGeometry(descriptor, lowPower, height = descriptor.height) {
  const { arcAngle, innerRadius, outerRadius, normal, tangent } = descriptor;
  const profile = new THREE.Shape();
  profile.absarc(0, 0, outerRadius, -arcAngle / 2, arcAngle / 2, false);
  profile.lineTo(innerRadius * Math.cos(arcAngle / 2), innerRadius * Math.sin(arcAngle / 2));
  profile.absarc(0, 0, innerRadius, arcAngle / 2, -arcAngle / 2, true);
  profile.closePath();
  const shape = new THREE.ExtrudeGeometry(profile, {
    depth: height, steps: 1, curveSegments: lowPower ? 10 : 16, bevelEnabled: false,
  });
  shape.applyMatrix4(new THREE.Matrix4().makeBasis(normal, tangent, Y_AXIS));
  return shape;
}

export function createSideHeater({ scene, tank, lowPower = false, ...tracking }) {
  const build = builder(tracking);
  const descriptor = createHeaterDescriptor(tank);
  const group = new THREE.Group(); scene.add(group);
  const paint = build.paint(0xe7e4d8, { roughness: 0.48, metalness: 0.035, emissive: 0x000000 });
  const plate = build.mesh(curvedWallGeometry(descriptor, lowPower), paint, group,
    [tank.x, descriptor.bottom, tank.z || 0]);
  plate.name = 'side_ceramic_heater';
  const trim = build.paint(0xb9c2bf, { roughness: 0.35, metalness: 0.55 });
  [descriptor.bottom, descriptor.top - 0.025].forEach((y) => {
    build.mesh(curvedWallGeometry(descriptor, lowPower, 0.025), trim, group, [tank.x, y, tank.z || 0]);
  });
  const terminal = new THREE.Group();
  terminal.name = 'ceramic_heater_terminal';
  terminal.position.fromArray(descriptor.point(descriptor.outerRadius + 0.032, descriptor.bottom + 0.105));
  terminal.rotation.y = -descriptor.angle; group.add(terminal);
  build.mesh(new THREE.BoxGeometry(0.070, 0.145, 0.205), build.paint(0x344956), terminal);
  build.instances(new THREE.CylinderGeometry(0.018, 0.018, 0.018, 10),
    build.paint(0xbda376, { metalness: 0.7 }), [-0.061, 0.061].map((z) => ({
      position: [0.043, 0.027, z], rotation: [0, 0, Math.PI / 2],
    })), terminal);
  const leadStart = descriptor.point(descriptor.outerRadius + 0.075, descriptor.bottom + 0.055);
  const lamp = new THREE.PointLight(0xffb461, 0, 2.0, 2);
  lamp.position.fromArray(descriptor.point(descriptor.outerRadius + 0.14, descriptor.bottom + descriptor.height * 0.5));
  group.add(lamp);
  return { descriptor, group, paint, lamp, leadStart,
    getDiagnostics() {
      return { type: 'side_ceramic_plate', bottom_heater_present: false, angle: descriptor.angle,
        arc_angle: descriptor.arcAngle, circumference_fraction: descriptor.arcAngle / TAU,
        arc_width: descriptor.innerRadius * descriptor.arcAngle, height: descriptor.height,
        bottom_y: descriptor.bottom, top_y: descriptor.top, tank_height: tank.height,
        inner_radius: descriptor.innerRadius, outer_radius: descriptor.outerRadius,
        thickness: descriptor.outerRadius - descriptor.innerRadius,
        contact_gap: descriptor.innerRadius - tank.radius,
        normal: descriptor.normal.toArray(), tangent: descriptor.tangent.toArray(),
        terminal: leadStart, lower_clearance: descriptor.bottom - tank.bottom,
        upper_clearance: tank.bottom + tank.height - descriptor.top };
    }, dispose() { group.removeFromParent(); build.dispose(); } };
}

function annularFrameGeometry(halfSize, radius, depth) {
  const profile = new THREE.Shape();
  profile.moveTo(-halfSize, -halfSize); profile.lineTo(halfSize, -halfSize);
  profile.lineTo(halfSize, halfSize); profile.lineTo(-halfSize, halfSize); profile.closePath();
  const hole = new THREE.Path(); hole.absarc(0, 0, radius, 0, TAU, true); profile.holes.push(hole);
  return new THREE.ExtrudeGeometry(profile, { depth, steps: 1, curveSegments: 24, bevelEnabled: false })
    .translate(0, 0, -depth / 2).rotateY(Math.PI / 2);
}

/** The fan draws air outwards from the fins; only the rotor is animated. */
export function createCoolingFan({ coolerAssembly, coldNormal, coldPoint, coldCenterY,
  sinkOuter, lowPower = false, ...tracking }) {
  const build = builder(tracking);
  const group = new THREE.Group(); coolerAssembly.add(group);
  const frameDepth = 0.120;
  const frameOuterRadius = 0.41;
  const openingRadius = 0.315;
  const inner = sinkOuter + 0.006;
  const outer = inner + frameDepth;
  const rotorX = inner + frameDepth / 2;
  const guardX = outer + 0.009;
  const housing = build.paint(0x2c4050, { metalness: 0.25, roughness: 0.46 });
  const impellerPaint = build.paint(0x536b78, { roughness: 0.44, metalness: 0.25 });
  const guardPaint = build.paint(0xa0b4bd, { metalness: 0.75, roughness: 0.27 });
  build.mesh(annularFrameGeometry(frameOuterRadius, openingRadius, frameDepth), housing, group, [rotorX, 0, 0]);
  build.instances(new THREE.CylinderGeometry(0.023, 0.023, 0.025, 6), guardPaint,
    [-0.351, 0.351].flatMap((y) => [-0.351, 0.351].map((z) => ({
      position: [outer + 0.009, y, z], rotation: [0, 0, Math.PI / 2],
    }))), group);
  const rotor = new THREE.Group(); rotor.position.set(rotorX, 0, 0); rotor.rotation.y = Math.PI / 2; group.add(rotor);
  const blade = new THREE.Shape();
  blade.moveTo(0.077, -0.025); blade.bezierCurveTo(0.15, -0.075, 0.25, -0.057, 0.288, -0.006);
  blade.bezierCurveTo(0.29, 0.012, 0.278, 0.057, 0.25, 0.075);
  blade.bezierCurveTo(0.20, 0.055, 0.15, 0.018, 0.077, 0.025); blade.closePath();
  const bladeGeometry = new THREE.ExtrudeGeometry(blade, {
    depth: 0.022, steps: 1, curveSegments: lowPower ? 5 : 9, bevelEnabled: false,
  }).translate(0, 0, -0.011);
  let leafRadius = 0;
  const bladeVertices = bladeGeometry.getAttribute('position');
  for (let index = 0; index < bladeVertices.count; index += 1) {
    leafRadius = Math.max(leafRadius, Math.hypot(bladeVertices.getX(index), bladeVertices.getY(index)));
  }
  build.instances(bladeGeometry, impellerPaint,
    Array.from({ length: 5 }, (_, index) => ({ rotation: [0, 0, TAU * index / 5] })), rotor);
  const hub = build.mesh(new THREE.CylinderGeometry(0.090, 0.090, 0.070, 24), housing, rotor);
  hub.rotation.x = Math.PI / 2;
  const guardParts = [0.11, 0.205, 0.302].map((radius) => new THREE.TorusGeometry(radius, 0.005, 5, lowPower ? 24 : 36)
    .rotateY(Math.PI / 2).translate(guardX, 0, 0));
  for (let index = 0; index < 6; index += 1) {
    const angle = index * Math.PI / 3;
    const start = new THREE.Vector3(guardX, Math.cos(angle) * 0.07, Math.sin(angle) * 0.07);
    const end = new THREE.Vector3(guardX, Math.cos(angle) * 0.315, Math.sin(angle) * 0.315);
    guardParts.push(new THREE.TubeGeometry(new THREE.LineCurve3(start, end), 1, 0.005, 5, false));
  }
  const guardShape = mergeGeometries(guardParts, false); guardParts.forEach((value) => value.dispose());
  build.mesh(guardShape, guardPaint, group);
  const axis = coldNormal.clone();
  const center = new THREE.Vector3(...coldPoint(rotorX, coldCenterY));
  const outerFace = new THREE.Vector3(...coldPoint(guardX + 0.005, coldCenterY));
  const descriptor = { axis, center, outerFace, openingRadius, frameOuterRadius };
  const leadStart = coldPoint(inner + 0.035, coldCenterY - 0.30, -0.39);
  const cableSocket = build.mesh(new THREE.BoxGeometry(0.070, 0.105, 0.075), housing, group,
    [inner + 0.035, -0.30, 0.39]);
  cableSocket.name = 'fan_power_connector';
  let phase = 0;
  let running = false;
  let frozen = true;
  return { descriptor, leadStart, group,
    setState({ online = false, cool = false, reducedMotion = false } = {}) {
      running = online && cool; frozen = !running || reducedMotion;
    },
    step(delta) {
      if (frozen) return;
      phase = (phase - Math.min(0.05, Math.max(0, delta)) * 8.5) % TAU;
      rotor.rotation.z = phase;
    },
    getDiagnostics() {
      return { axis: axis.toArray(), center: center.toArray(), outer_face: outerFace.toArray(),
        follows: 'display_cool', physical_control_added: false, running, frozen, phase,
        opening_radius: openingRadius, frame_half_width: frameOuterRadius, frame_depth: frameDepth,
        frame_inner_radius: inner, frame_outer_radius: outer, sink_outer_radius: sinkOuter,
        sink_frame_gap: inner - sinkOuter, blade_count: 5,
        blade_radial_bounds: [0.077, leafRadius], blade_axial_bounds: [rotorX - 0.011, rotorX + 0.011],
        radial_clearance: openingRadius - leafRadius,
        blade_guard_clearance: guardX - 0.005 - (rotorX + 0.011),
        blade_fin_clearance: rotorX - 0.011 - sinkOuter,
        exhaust_origin_minimum: outerFace.clone().addScaledVector(axis, 0.04).toArray() };
    }, dispose() { group.removeFromParent(); build.dispose(); } };
}

export function createCabinetDescriptor() {
  const center = [-2.46, 0.82, 0.38];
  const size = [0.98, 1.36, 0.72];
  const min = center.map((value, index) => value - size[index] / 2);
  const max = center.map((value, index) => value + size[index] / 2);
  const physicalPorts = {
    signal: { id: 'signal', type: 'signal', point: [max[0] + 0.035, 1.08, 0.36], axis: [1, 0, 0] },
    power: { id: 'power', type: 'power', point: [max[0] + 0.035, 0.43, 0.36], axis: [1, 0, 0] },
  };
  const ports = Object.fromEntries(['upper', 'middle', 'lower', 'aht', 'heater', 'peltier', 'fan', 'pump'].map((id, index) => {
    const type = index < 4 ? 'signal' : 'power';
    return [id, { ...physicalPorts[type], portId: type }];
  }));
  return { center, size, min, max, ports, physicalPorts };
}

/** Rounded cable elbows stay inside their waypoints' convex hull, so a sharp
 * vertical-to-horizontal transition cannot overshoot down through the skid. */
function roundedPolyline(points, radius = 0.09) {
  const vertices = points.map((point) => new THREE.Vector3(...point));
  const path = new THREE.CurvePath();
  let previous = vertices[0];
  for (let index = 1; index < vertices.length - 1; index += 1) {
    const corner = vertices[index];
    const before = vertices[index - 1];
    const after = vertices[index + 1];
    const distance = Math.min(radius, corner.distanceTo(before) * 0.3, corner.distanceTo(after) * 0.3);
    const entry = corner.clone().lerp(before, distance / corner.distanceTo(before));
    const exit = corner.clone().lerp(after, distance / corner.distanceTo(after));
    path.add(new THREE.LineCurve3(previous, entry));
    path.add(new THREE.QuadraticBezierCurve3(entry, corner, exit));
    previous = exit;
  }
  path.add(new THREE.LineCurve3(previous, vertices.at(-1)));
  return path;
}

function suffixAt(path, at) {
  const point = new THREE.Vector3(...at);
  const result = new THREE.CurvePath();
  let found = false;
  for (const part of path.curves) {
    if (!found && part.isLineCurve3) {
      const direction = part.v2.clone().sub(part.v1);
      const lengthSquared = direction.lengthSq();
      const t = lengthSquared ? point.clone().sub(part.v1).dot(direction) / lengthSquared : 0;
      if (t >= -1e-8 && t <= 1 + 1e-8
        && part.v1.clone().addScaledVector(direction, t).distanceTo(point) < 1e-8) {
        found = true;
        if (point.distanceTo(part.v2) > 1e-9) result.add(new THREE.LineCurve3(point, part.v2));
        continue;
      }
    }
    if (found) result.add(part);
  }
  if (!found) throw new Error('Harness branch must join a straight section of its shared trunk.');
  return result;
}

function joinPaths(...paths) {
  const result = new THREE.CurvePath();
  paths.forEach((path) => path.curves.forEach((part) => result.add(part)));
  return result;
}

/** Eight electrical routes share two visible main looms. Routes describe the
 * electrical topology; pieces describe the geometry that is rendered once. */
export function createHarnessLayout({ sensors, aht, heater, peltier, fan, pump, cabinet = createCabinetDescriptor() }) {
  const signalIds = ['upper', 'middle', 'lower', 'aht'];
  const starts = Object.fromEntries(sensors.map((point, index) => [signalIds[index], point]));
  Object.assign(starts, { aht, heater, peltier, fan, pump });
  const makePiece = (id, type, kind, points, radius, users) => ({ id, type, kind,
    start: [...points[0]], end: [...points.at(-1)], points, radius, users,
    curve: roundedPolyline(points, 0.06) });
  const signalSpine = makePiece('signal_spine', 'signal', 'main_trunk', [
    [-1.86, aht[1], 0.83], [-1.86, 1.08, 0.83], [-1.86, 1.08, 0.36], cabinet.physicalPorts.signal.point,
  ], 0.025, signalIds);
  const powerFloor = makePiece('power_floor', 'power', 'main_trunk', [
    [2.90, 0.24, 1.44], [-1.81, 0.24, 1.44], [-1.81, 0.24, 0.36],
    [-1.81, 0.43, 0.36], cabinet.physicalPorts.power.point,
  ], 0.026, ['heater', 'peltier', 'fan', 'pump']);
  // Both cooler leads first descend outside the lowest fin, then pass below
  // the transparent suction pipe before merging. Derive the merge height
  // from the actual terminal so the branches and support move as one unit.
  const coolerJoinY = peltier[1] - 0.47;
  const coolerJoin = [1.40, coolerJoinY, 0.20];
  const coolerFloorJoin = [1.40, 0.24, 1.44];
  const coolerRiser = makePiece('cooler_riser', 'power', 'shared_riser', [
    coolerJoin, [1.40, 0.24, 0.20], coolerFloorJoin,
  ], 0.024, ['peltier', 'fan']);
  const shared = [signalSpine, powerFloor, coolerRiser];
  const branches = Object.entries(cabinet.ports).map(([id, port], index) => {
    const start = [...starts[id]];
    let points;
    let following;
    if (port.type === 'signal') {
      const join = [-1.86, id === 'lower' ? 1.24 : start[1], 0.83];
      points = id === 'aht' ? [start, [start[0], start[1], 0.65], join]
        : [start, [-1.70, start[1], 0.83], join];
      following = [{ piece: signalSpine, at: join }];
    } else if (id === 'heater') {
      // The heater is on the rear wall. Keep its lead below the vessel and
      // outside the tank feet, then merge into the existing cabinet riser.
      // Crossing straight to the front raceway would cut through the skid's
      // tank supports and expose another loose cable across the equipment.
      const join = [-1.81, 0.35, 0.36];
      points = [start, [start[0], 0.24, start[2]], [-1.81, 0.24, start[2]],
        [-1.81, 0.24, 0.20], [-1.81, 0.35, 0.20], join];
      following = [{ piece: powerFloor, at: join }];
    } else if (id === 'peltier') {
      points = [start, [start[0], coolerJoinY, start[2]], [1.08, coolerJoinY, start[2]], coolerJoin];
      following = [{ piece: coolerRiser, at: coolerJoin }, { piece: powerFloor, at: coolerFloorJoin }];
    } else if (id === 'fan') {
      // First leave the connector tangentially beyond the square fan frame;
      // then descend below the fins before joining the shared power sleeve.
      const outside = [start[0] - Math.sin(0.35) * 0.09, start[1], start[2] + Math.cos(0.35) * 0.09];
      points = [start, outside, [outside[0], coolerJoinY, outside[2]], coolerJoin];
      following = [{ piece: coolerRiser, at: coolerJoin }, { piece: powerFloor, at: coolerFloorJoin }];
    } else {
      const join = [2.90, 0.24, 1.44];
      points = [start, [start[0], 1.23, start[2]], [2.90, 1.23, start[2]], [2.90, 0.24, start[2]], join];
      following = [{ piece: powerFloor, at: join }];
    }
    const piece = makePiece(`branch_${id}`, port.type, 'device_branch', points, index < 4 ? 0.0115 : 0.014, [id]);
    return { ...piece, device: id, following };
  });
  const routes = branches.map((branch) => {
    const segments = [{ piece: branch, curve: branch.curve }, ...branch.following.map(({ piece, at }) => ({ piece, curve: suffixAt(piece.curve, at) }))];
    return { id: branch.device, type: branch.type, start: branch.start,
      end: [...cabinet.ports[branch.device].point], points: branch.points,
      curve: joinPaths(...segments.map(({ curve }) => curve)),
      pieces: segments.map(({ piece, curve }) => ({ id: piece.id, radius: piece.radius, curve })),
      shared_piece_ids: branch.following.map(({ piece }) => piece.id) };
  });
  return { cabinet, routes, branches, trunks: [signalSpine, powerFloor], risers: [coolerRiser],
    pieces: [...branches, ...shared], cornerRadius: 0.06 };
}

export function createWiringRoutes(options) { return createHarnessLayout(options).routes; }

export function createControlWiring({ scene, lowPower = false, endpoints, ...tracking }) {
  const build = builder(tracking);
  const group = new THREE.Group(); scene.add(group);
  const cabinet = createCabinetDescriptor();
  const bodyPaint = build.paint(0xc6d2d8, { metalness: 0.55, roughness: 0.36 });
  const darkPaint = build.paint(0x3f5665, { metalness: 0.5, roughness: 0.34 });
  const doorPaint = build.paint(0xe0e7e9, { metalness: 0.35, roughness: 0.3 });
  const signalPaint = build.paint(0x3b6478, { metalness: 0.03, roughness: 0.82 });
  const powerPaint = build.paint(0x53616b, { metalness: 0.02, roughness: 0.82 });
  build.mesh(new THREE.BoxGeometry(...cabinet.size), bodyPaint, group, cabinet.center);
  build.mesh(new THREE.BoxGeometry(cabinet.size[0] - 0.08, cabinet.size[1] - 0.08, 0.030), darkPaint, group,
    [cabinet.center[0], cabinet.center[1], cabinet.max[2] + 0.008]);
  build.mesh(new THREE.BoxGeometry(cabinet.size[0] - 0.105, cabinet.size[1] - 0.105, 0.025), doorPaint, group,
    [cabinet.center[0], cabinet.center[1], cabinet.max[2] + 0.028]);
  build.mesh(new THREE.BoxGeometry(0.046, 0.27, 0.048), darkPaint, group,
    [cabinet.max[0] - 0.14, cabinet.center[1] - 0.08, cabinet.max[2] + 0.067]);
  build.instances(new THREE.BoxGeometry(0.052, 0.15, 0.040), darkPaint,
    [cabinet.min[1] + 0.27, cabinet.max[1] - 0.27].map((y) => ({
      position: [cabinet.min[0] + 0.07, y, cabinet.max[2] + 0.043],
    })), group);
  build.mesh(new THREE.BoxGeometry(0.57, 0.15, 0.027), darkPaint, group,
    [cabinet.center[0], cabinet.max[1] - 0.30, cabinet.max[2] + 0.054]);
  const statusPaint = build.paint(0x739399, { emissive: 0x000000, metalness: 0.1, roughness: 0.3 });
  const status = build.mesh(new THREE.SphereGeometry(0.027, 12, 8), statusPaint, group,
    [cabinet.center[0] - 0.18, cabinet.max[1] - 0.30, cabinet.max[2] + 0.084]);
  status.castShadow = false;
  build.instances(new THREE.BoxGeometry(0.16, 0.055, 0.11), darkPaint,
    [-0.32, 0.32].map((offset) => ({ position: [cabinet.center[0] + offset, cabinet.min[1] - 0.0275, cabinet.center[2]] })), group);
  const ports = Object.values(cabinet.physicalPorts);
  build.instances(new THREE.CylinderGeometry(0.040, 0.040, 0.070, 10), darkPaint,
    ports.map(({ point, axis }) => ({ position: point,
      rotation: axis[0] ? [0, 0, Math.PI / 2] : [0, 0, 0] })), group);
  const harness = createHarnessLayout({ ...endpoints, cabinet });
  const { routes, pieces } = harness;
  const tubularSegments = (piece) => Math.max(lowPower ? 12 : 18,
    Math.min(lowPower ? 76 : 112, Math.ceil(piece.curve.getLength() * (lowPower ? 14 : 22))));
  ['signal', 'power'].forEach((type) => {
    // Logical routes share these pieces. Only this unique physical list is
    // meshed, so four conductors in one sleeve never produce four loose wires.
    const parts = pieces.filter((piece) => piece.type === type).map((piece) =>
      new THREE.TubeGeometry(piece.curve, tubularSegments(piece), piece.radius, 6, false));
    const shape = mergeGeometries(parts, false); parts.forEach((value) => value.dispose());
    const cable = build.mesh(shape, type === 'signal' ? signalPaint : powerPaint, group);
    cable.name = `harness_${type}`;
  });
  const solids = [];
  const supportParts = [];
  const trayParts = [];
  const addBox = (list, id, center, size, kind) => {
    list.push(new THREE.BoxGeometry(...size).translate(...center));
    solids.push({ id, kind, center, size,
      min: center.map((value, index) => value - size[index] / 2),
      max: center.map((value, index) => value + size[index] / 2) });
  };
  // Two narrow service rails carry the vertical sleeves. Their feet bolt to
  // the skid, and small hollow clips hold the sleeves against the rails.
  addBox(supportParts, 'signal_service_rail', [-1.90, 1.68, 0.83], [0.030, 3.08, 0.055], 'support');
  addBox(supportParts, 'signal_service_foot', [-1.90, 0.1225, 0.83], [0.16, 0.035, 0.18], 'support');
  const coolerRailBottom = 0.14;
  const coolerRailTop = harness.risers[0].start[1] + 0.02;
  const coolerRailHeight = coolerRailTop - coolerRailBottom;
  addBox(supportParts, 'cooler_service_rail', [1.36, (coolerRailBottom + coolerRailTop) / 2, 0.20],
    [0.030, coolerRailHeight, 0.055], 'support');
  addBox(supportParts, 'cooler_service_foot', [1.36, 0.1225, 0.20], [0.16, 0.035, 0.18], 'support');
  addBox(supportParts, 'pump_branch_support', [2.935, 0.69, -0.15], [0.025, 1.10, 0.040], 'support');
  addBox(supportParts, 'pump_branch_foot', [2.935, 0.1225, -0.15], [0.14, 0.035, 0.14], 'support');
  const supportShape = mergeGeometries(supportParts, false); supportParts.forEach((value) => value.dispose());
  const support = build.mesh(supportShape, darkPaint, group); support.name = 'harness_service_rails';
  const clipParts = [];
  [1.30, 2.20, 3.10].forEach((y) => clipParts.push(new THREE.TorusGeometry(0.031, 0.006, 5, 12)
    .rotateX(Math.PI / 2).translate(-1.86, y, 0.83)));
  [0.25, 0.75].map((fraction) => coolerRailBottom + coolerRailHeight * fraction)
    .forEach((y) => clipParts.push(new THREE.TorusGeometry(0.030, 0.005, 5, 12)
    .rotateX(Math.PI / 2).translate(1.40, y, 0.20)));
  [0.52, 1.02].forEach((y) => clipParts.push(new THREE.TorusGeometry(0.020, 0.005, 5, 12)
    .rotateX(Math.PI / 2).translate(2.90, y, endpoints.pump[2])));
  const clipShape = mergeGeometries(clipParts, false); clipParts.forEach((value) => value.dispose());
  const clips = build.mesh(clipShape, darkPaint, group); clips.name = 'harness_hollow_clips';
  const trayBase = (id, center, size) => addBox(trayParts, id, center, size, 'raceway');
  // The main low U-channel follows the front and left skid edge. Its cooler
  // tee stays open; the rear-mounted heater uses a separate rear/left branch
  // channel that merges beside the cabinet, away from the tank feet.
  // Rounded elbows and cabinet risers are left open.
  trayBase('front_raceway_floor', [0.545, 0.17, 1.44], [4.71, 0.040, 0.15]);
  trayBase('front_raceway_outer_wall', [0.545, 0.235, 1.51], [4.55, 0.11, 0.014]);
  [[-1.70, 1.32], [1.48, 2.80]].forEach(([from, to], index) =>
    trayBase(`front_raceway_inner_wall_${index}`, [(from + to) / 2, 0.235, 1.37], [to - from, 0.11, 0.014]));
  trayBase('left_raceway_floor', [-1.81, 0.17, 0.90], [0.15, 0.040, 1.08]);
  [-1.88, -1.74].forEach((x, index) =>
    trayBase(`left_raceway_wall_${index}`, [x, 0.235, 0.90], [0.014, 0.11, 0.84]));
  const heaterX = endpoints.heater[0];
  const heaterZ = endpoints.heater[2];
  trayBase('heater_rear_raceway_floor', [(-1.81 + heaterX) / 2, 0.17, heaterZ],
    [heaterX + 1.81, 0.040, 0.15]);
  [heaterZ - 0.07, heaterZ + 0.07].forEach((z, index) =>
    trayBase(`heater_rear_raceway_wall_${index}`, [(-1.69 + heaterX - 0.08) / 2, 0.235, z],
      [heaterX + 1.61, 0.11, 0.014]));
  trayBase('heater_left_raceway_floor', [-1.81, 0.17, (heaterZ + 0.20) / 2],
    [0.15, 0.040, 0.20 - heaterZ]);
  [-1.88, -1.74].forEach((x, index) =>
    trayBase(`heater_left_raceway_wall_${index}`, [x, 0.235, (heaterZ + 0.12 + 0.16) / 2],
      [0.014, 0.11, 0.04 - heaterZ]));
  trayBase('cooler_raceway_floor', [1.40, 0.17, 0.80], [0.15, 0.040, 1.20]);
  [1.33, 1.47].forEach((x, index) =>
    trayBase(`cooler_raceway_wall_${index}`, [x, 0.235, 0.80], [0.014, 0.11, 1.12]));
  trayBase('pump_raceway_floor', [2.90, 0.17, 0.645], [0.15, 0.040, 1.59]);
  [2.83, 2.97].forEach((x, index) =>
    trayBase(`pump_raceway_wall_${index}`, [x, 0.235, 0.645], [0.014, 0.11, 1.39]));
  const trayShape = mergeGeometries(trayParts, false); trayParts.forEach((value) => value.dispose());
  const tray = build.mesh(trayShape, bodyPaint, group); tray.name = 'power_raceway';
  // A single external supply inlet makes the cabinet's power entry visible.
  const externalStart = [cabinet.min[0] - 0.035, 0.40, 0.28];
  const externalEnd = [-3.04, 0.16, 0.10];
  const supplyCurve = roundedPolyline([
    externalStart, [-3.10, 0.31, 0.28], [-3.10, 0.19, 0.10], externalEnd,
  ], 0.04);
  build.mesh(new THREE.TubeGeometry(supplyCurve, 20, 0.024, 6, false), powerPaint, group);
  const supplySocket = build.mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.070, 12), darkPaint, group, externalStart);
  supplySocket.rotation.z = Math.PI / 2;
  build.mesh(new THREE.BoxGeometry(0.15, 0.10, 0.12), darkPaint, group, externalEnd);
  const pieceDiagnostics = pieces.map(({ id, type, kind, start, end, points, radius, users, curve }) => ({
    id, type, kind, start, end, waypoints: points, radius, users, usage_count: users.length,
    length: curve.getLength(), tubular_segments: tubularSegments(pieces.find((piece) => piece.id === id)),
    sampled_points: Array.from({ length: 97 }, (_, index) => curve.getPoint(index / 96).toArray()),
  }));
  const branchLength = harness.branches.reduce((sum, piece) => sum + piece.curve.getLength(), 0);
  const uniqueLength = pieces.reduce((sum, piece) => sum + piece.curve.getLength(), 0);
  const logicalLength = routes.reduce((sum, route) => sum + route.curve.getLength(), 0);
  return { group, cabinet, routes, harness, pieces,
    labelAnchor: [cabinet.center[0], cabinet.max[1] + 0.08, cabinet.max[2]],
    setState({ online = false } = {}) {
      statusPaint.color.set(online ? 0x42bdb3 : 0x739399);
      statusPaint.emissive.set(online ? 0x25aa9f : 0x000000);
      statusPaint.emissiveIntensity = online ? 0.45 : 0;
    },
    getDiagnostics() {
      return { branch_count: routes.length, all_to_cabinet: true,
        representation: 'shared_sleeves_short_branches_and_raceway', length_unit: 'model_unit',
        main_trunk_count: 2, shared_riser_count: 1, physical_gland_count: ports.length,
        rendered_physical_piece_count: pieces.length, logical_routes_rendered_separately: false,
        branch_length: branchLength, trunk_length: uniqueLength - branchLength,
        rendered_harness_length: uniqueLength, total_logical_route_length: logicalLength,
        shared_length_saved: logicalLength - uniqueLength, corner_radius: harness.cornerRadius,
        cabinet: { center: cabinet.center, size: cabinet.size, bounds: { min: cabinet.min, max: cabinet.max },
          ports: cabinet.ports, physical_ports: cabinet.physicalPorts, door_faces: [0, 0, 1] },
        physical_pieces: pieceDiagnostics,
        shared_paths: pieceDiagnostics.filter(({ usage_count }) => usage_count > 1),
        branches: routes.map(({ id, type, start, end, points, curve, shared_piece_ids }) => ({ id, type, start, end, waypoints: points,
          sampled_points: Array.from({ length: 97 }, (_, index) => curve.getPoint(index / 96).toArray()),
          exposed_branch_length: harness.branches.find(({ device }) => device === id).curve.getLength(), shared_piece_ids,
          route_length: curve.getLength(), endpoint_gap: curve.getPoint(1).distanceTo(new THREE.Vector3(...end)) })),
        supports: { rail_count: 2, pump_branch_support_count: 1, hollow_clip_count: 7,
          raceway: 'front_left_U_channel_with_rear_heater_cooler_and_pump_branch_channels', solids },
        external_supply: { start: externalStart, end: externalEnd },
        signal_color: '#3b6478', power_color: '#53616b', legacy_junction_box_present: false,
        physical_control_added: false };
    }, dispose() { group.removeFromParent(); build.dispose(); } };
}
