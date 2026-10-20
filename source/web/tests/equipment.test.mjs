import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createHeaterDescriptor, createSideHeater, createCoolingFan,
  createControlWiring, createCabinetDescriptor, createWiringRoutes, createHarnessLayout } from '../equipment.js';
import { COOLING_CONTACT } from '../thermal-contact.js';

const tank = { x: -0.62, z: 0, bottom: 0.59, height: 3.02, radius: 1.06 };
const coldCenterY = tank.bottom + COOLING_CONTACT.bottomOffset + COOLING_CONTACT.height / 2;
const angle = 0.35;
const coldNormal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
const coldTangent = new THREE.Vector3(coldNormal.z, 0, -coldNormal.x);
const coldPoint = (radius, y, sideways = 0) => [tank.x + coldNormal.x * radius + coldTangent.x * sideways,
  y, coldNormal.z * radius + coldTangent.z * sideways];
const endpoints = () => ({
  sensors: [3.16, 2.20, 1.24].map((y) => [-1.51, y - 0.11, 0.83]),
  aht: [-2.13, 3.21, 0.30],
  heater: createHeaterDescriptor(tank).point(1.202, 0.865),
  peltier: coldPoint(1.22, coldCenterY - 0.48, -0.3675),
  fan: coldPoint(1.857, coldCenterY - 0.30, -0.39),
  pump: [2.16, 1.1125, -0.15],
});
function distanceToBox(point, min, max) {
  return Math.hypot(...point.map((value, index) => Math.max(min[index] - value, 0, value - max[index])));
}

function distanceToPolyline(point, vertices) {
  let nearest = Infinity;
  for (let index = 1; index < vertices.length; index += 1) {
    const a = vertices[index - 1]; const b = vertices[index];
    const dx = b.x - a.x, dy = b.y - a.y, dz = b.z - a.z;
    const t = Math.max(0, Math.min(1, ((point[0] - a.x) * dx + (point[1] - a.y) * dy + (point[2] - a.z) * dz)
      / (dx * dx + dy * dy + dz * dz)));
    nearest = Math.min(nearest, Math.hypot(point[0] - a.x - t * dx, point[1] - a.y - t * dy, point[2] - a.z - t * dz));
  }
  return nearest;
}

test('side ceramic heater is a vessel-conforming 36-degree sector shorter than the tank', () => {
  const scene = new THREE.Scene();
  const heater = createSideHeater({ scene, tank });
  const d = heater.getDiagnostics();
  assert.equal(d.type, 'side_ceramic_plate');
  assert.equal(d.bottom_heater_present, false);
  assert.equal(d.circumference_fraction, 0.1);
  assert.ok(d.height < tank.height);
  assert.ok(d.lower_clearance > 0 && d.upper_clearance > 0);
  assert.ok(d.contact_gap > 0 && d.contact_gap <= 0.0021);
  const plate = heater.group.getObjectByName('side_ceramic_heater');
  const vertices = plate.geometry.getAttribute('position');
  for (let index = 0; index < vertices.count; index += 1) {
    const x = vertices.getX(index); const z = vertices.getZ(index);
    const radius = Math.hypot(x, z);
    assert.ok(radius >= d.inner_radius - 1e-6 && radius <= d.outer_radius + 1e-6);
    assert.ok((x * heater.descriptor.normal.x + z * heater.descriptor.normal.z) / radius
      >= Math.cos(d.arc_angle / 2) - 1e-6, 'plate sector must follow the heater descriptor angle');
    assert.ok(vertices.getY(index) >= -1e-6 && vertices.getY(index) <= d.height + 1e-6);
  }
  heater.dispose(); assert.equal(scene.children.length, 0);
});

test('heater, terminal and cable rotate 180 degrees together to the opposite vessel wall', () => {
  const heater = createSideHeater({ scene: new THREE.Scene(), tank });
  const d = heater.descriptor;
  const oldNormal = new THREE.Vector3(Math.cos(1.72), 0, Math.sin(1.72));
  assert.equal(d.angle, 1.72 + Math.PI);
  assert.ok(d.normal.clone().add(oldNormal).length() < 1e-12);
  const oldLead = new THREE.Vector3(tank.x, d.bottom + 0.055, tank.z)
    .addScaledVector(oldNormal, d.outerRadius + 0.075);
  const expectedLead = new THREE.Vector3(2 * tank.x - oldLead.x, oldLead.y, 2 * tank.z - oldLead.z);
  assert.ok(expectedLead.distanceTo(new THREE.Vector3(...heater.leadStart)) < 1e-12);
  assert.deepEqual(heater.leadStart, endpoints().heater);
  heater.group.updateMatrixWorld(true);
  const terminal = heater.group.getObjectByName('ceramic_heater_terminal');
  const localLead = new THREE.Vector3(...heater.leadStart).applyMatrix4(terminal.matrixWorld.clone().invert());
  assert.ok(distanceToBox(localLead.toArray(), [-0.035, -0.0725, -0.1025], [0.035, 0.0725, 0.1025]) < 0.014,
    'the cable envelope must still meet the rotated terminal');
  assert.ok(new THREE.Vector3(1, 0, 0).transformDirection(terminal.matrixWorld).distanceTo(d.normal) < 1e-12);
  heater.dispose();
});

test('fan leaves clear fins, opening and guard, with a shared outward heat-sink axis', () => {
  const coolerAssembly = new THREE.Group();
  const fan = createCoolingFan({ coolerAssembly, coldNormal, coldPoint, coldCenterY, sinkOuter: 1.816 });
  const d = fan.getDiagnostics();
  assert.deepEqual(d.axis, coldNormal.toArray());
  assert.equal(d.blade_count, 5);
  assert.ok(d.radial_clearance > 0.02);
  assert.ok(d.blade_guard_clearance > 0.05 && d.blade_fin_clearance > 0.05);
  const end = new THREE.Vector3(...d.outer_face).sub(new THREE.Vector3(...d.center));
  assert.ok(end.clone().normalize().distanceTo(coldNormal) < 1e-10);
  const exhaustOffset = new THREE.Vector3(...d.exhaust_origin_minimum).sub(new THREE.Vector3(...d.outer_face));
  assert.ok(Math.abs(exhaustOffset.dot(coldNormal) - 0.04) < 1e-10);
  fan.dispose(); assert.equal(coolerAssembly.children.length, 0);
});

test('fan rotor follows visible cooling and freezes on stop, offline and reduced motion', () => {
  const fan = createCoolingFan({ coolerAssembly: new THREE.Group(), coldNormal, coldPoint, coldCenterY, sinkOuter: 1.816 });
  const phase = () => fan.getDiagnostics().phase;
  fan.setState({ online: true, cool: true }); fan.step(0.03);
  assert.notEqual(phase(), 0);
  for (const state of [{ online: true, cool: false }, { online: false, cool: true },
    { online: true, cool: true, reducedMotion: true }]) {
    const last = phase(); fan.setState(state); fan.step(1); assert.equal(phase(), last);
  }
  fan.setState({ online: true, cool: true }); const last = phase(); fan.step(0.03);
  assert.notEqual(phase(), last); fan.dispose();
});

test('lowered cooling assembly overlaps the LOW liquid level and its fan and harness follow the same height', () => {
  const bottom = tank.bottom + COOLING_CONTACT.bottomOffset;
  const lowSurface = tank.bottom + tank.height * 0.30;
  const fan = createCoolingFan({ coolerAssembly: new THREE.Group(), coldNormal, coldPoint, coldCenterY, sinkOuter: 1.816 });
  const wiring = createControlWiring({ scene: new THREE.Scene(), endpoints: endpoints() });
  assert.ok(Math.abs(coldCenterY - 1.55) < 1e-12);
  assert.ok(Math.abs(bottom - 0.95) < 1e-12);
  assert.ok(Math.abs(bottom + COOLING_CONTACT.height - 2.15) < 1e-12);
  assert.ok(Math.abs(lowSurface - 1.496) < 1e-12);
  assert.ok(Math.abs(Math.min(COOLING_CONTACT.height, lowSurface - bottom) - 0.546) < 1e-12,
    'the cold shoe must overlap liquid in LOW state');
  assert.equal(fan.descriptor.center.y, coldCenterY);
  assert.deepEqual(fan.leadStart, endpoints().fan);
  const riser = wiring.harness.risers[0];
  assert.ok(Math.abs(riser.start[1] - (coldCenterY - 0.95)) < 1e-12);
  const rail = wiring.getDiagnostics().supports.solids.find(({ id }) => id === 'cooler_service_rail');
  assert.ok(Math.abs(rail.max[1] - (riser.start[1] + 0.02)) < 1e-12);
  assert.ok(rail.max[1] < bottom, 'shared lead support must end below the lowered cooler');
  assert.equal(wiring.getDiagnostics().rendered_physical_piece_count, 11);
  assert.equal(wiring.getDiagnostics().physical_gland_count, 2);
  fan.dispose(); wiring.dispose();
});

test('every powered device has one terminated cabinet branch, routed outside the vessel', () => {
  const cabinet = createCabinetDescriptor();
  const starts = endpoints();
  const routes = createWiringRoutes({ ...starts, cabinet });
  assert.deepEqual(routes.map(({ id }) => id), ['upper', 'middle', 'lower', 'aht', 'heater', 'peltier', 'fan', 'pump']);
  assert.equal(routes.filter(({ type }) => type === 'signal').length, 4);
  assert.equal(routes.filter(({ type }) => type === 'power').length, 4);
  for (const route of routes) {
    assert.ok(route.curve.getPoint(0).distanceTo(new THREE.Vector3(...route.start)) < 1e-10);
    assert.ok(route.curve.getPoint(1).distanceTo(new THREE.Vector3(...cabinet.ports[route.id].point)) < 1e-10);
    for (const point of Array.from({ length: 1001 }, (_, index) => route.curve.getPoint(index / 1000))) {
      const cableRadius = route.type === 'signal' ? 0.014 : 0.018;
      assert.ok(point.y - cableRadius > 0.105, `${route.id} intersects the skid`);
      if (point.y > tank.bottom + 0.03 && point.y < tank.bottom + tank.height) {
        assert.ok(Math.hypot(point.x - tank.x, point.z - tank.z) >= tank.radius,
          `${route.id} intersects the vessel wall`);
      }
      if (route.id === 'pump' && point.z > -0.63 && point.z < 0.33) {
        assert.ok(Math.hypot(point.x - 2.16, point.y - 0.76) >= 0.315,
          'pump lead intersects the motor or its cooling fins');
      }
      if (route.id === 'peltier') {
        const relative = new THREE.Vector3(point.x - tank.x, 0, point.z);
        const local = [relative.dot(coldNormal), point.y - coldCenterY, -relative.dot(coldTangent)];
        assert.ok(distanceToBox(local, [1.306, -0.60, -0.395], [1.366, 0.60, 0.395]) > cableRadius,
          'Peltier lead intersects the heat-sink base');
        for (let fin = 0; fin < 14; fin += 1) {
          const y = -0.56 + fin * 0.086;
          assert.ok(distanceToBox(local, [1.366, y - 0.011, -0.395], [1.816, y + 0.011, 0.395]) > cableRadius,
            'Peltier lead intersects a cooling fin');
        }
      }
      const insideCabinet = point.x > cabinet.min[0] && point.x < cabinet.max[0]
        && point.y > cabinet.min[1] && point.y < cabinet.max[1]
        && point.z > cabinet.min[2] && point.z < cabinet.max[2];
      assert.equal(insideCabinet, false, `${route.id} crosses cabinet body before its gland`);
    }
  }
});

test('control cabinet, merged cable harness and device materials can all be disposed', () => {
  const scene = new THREE.Scene();
  const trackedGeometry = new Set(); const trackedMaterials = new Set();
  let releasedGeometry = 0; let releasedMaterials = 0;
  const wiring = createControlWiring({ scene, endpoints: endpoints(),
    trackGeometry(value) { trackedGeometry.add(value); value.addEventListener('dispose', () => releasedGeometry++); return value; },
    trackMaterial(value) { trackedMaterials.add(value); value.addEventListener('dispose', () => releasedMaterials++); return value; } });
  const d = wiring.getDiagnostics();
  assert.equal(d.branch_count, 8); assert.equal(d.all_to_cabinet, true);
  assert.equal(d.legacy_junction_box_present, false);
  assert.ok(d.branches.every(({ endpoint_gap }) => endpoint_gap < 1e-10));
  wiring.dispose(); assert.equal(scene.children.length, 0);
  assert.equal(releasedGeometry, trackedGeometry.size); assert.equal(releasedMaterials, trackedMaterials.size);
});

test('eight logical routes share two physical main looms and terminate at two cabinet glands', () => {
  const wiring = createControlWiring({ scene: new THREE.Scene(), endpoints: endpoints() });
  const d = wiring.getDiagnostics();
  assert.equal(d.main_trunk_count, 2); assert.equal(d.shared_riser_count, 1);
  assert.equal(d.physical_gland_count, 2); assert.equal(d.rendered_physical_piece_count, 11);
  assert.equal(d.logical_routes_rendered_separately, false);
  assert.equal(d.length_unit, 'model_unit');
  assert.ok(d.total_logical_route_length > d.rendered_harness_length * 1.35);
  assert.ok(d.shared_length_saved > 0);
  assert.deepEqual(d.shared_paths.map(({ usage_count }) => usage_count), [4, 4, 2]);
  assert.ok(d.branches.filter(({ type }) => type === 'signal').every(({ exposed_branch_length }) => exposed_branch_length < 0.7));
  for (const type of ['signal', 'power']) {
    const expectedVertices = d.physical_pieces.filter((piece) => piece.type === type)
      .reduce((sum, piece) => sum + (piece.tubular_segments + 1) * 7, 0);
    assert.equal(wiring.group.getObjectByName(`harness_${type}`).geometry.getAttribute('position').count, expectedVertices,
      'shared sleeve must be rendered once rather than once per electrical route');
  }
  for (const branch of wiring.harness.branches) {
    assert.ok(branch.following[0].at.every((value, index) => value === branch.end[index]));
  }
  assert.ok(d.supports.hollow_clip_count > 0 && d.supports.solids.some(({ kind }) => kind === 'raceway'));
  wiring.dispose();
});

test('physical harness sleeves clear the skid, cabinet and open cable-channel walls', () => {
  const wiring = createControlWiring({ scene: new THREE.Scene(), endpoints: endpoints() });
  const layout = createHarnessLayout(endpoints());
  const d = wiring.getDiagnostics();
  for (const piece of layout.pieces) {
    for (let index = 0; index <= 1000; index += 1) {
      const point = piece.curve.getPoint(index / 1000).toArray();
      assert.ok(point[1] - piece.radius > 0.105, `${piece.id} enters the skid`);
      assert.ok(distanceToBox(point, layout.cabinet.min, layout.cabinet.max) >= piece.radius - 1e-8,
        `${piece.id} enters the cabinet ahead of its gland`);
      for (const solid of d.supports.solids.filter(({ kind }) => kind === 'raceway')) {
        assert.ok(distanceToBox(point, solid.min, solid.max) >= piece.radius - 1e-8,
          `${piece.id} enters cable channel ${solid.id}`);
      }
    }
  }
  wiring.dispose();
});

test('opposite-side heater lead follows rear and left low channels without crossing tank feet', () => {
  const starts = endpoints();
  const wiring = createControlWiring({ scene: new THREE.Scene(), endpoints: starts });
  const d = wiring.getDiagnostics();
  const branch = wiring.harness.branches.find(({ device }) => device === 'heater');
  assert.deepEqual(branch.start, starts.heater);
  assert.deepEqual(branch.end, [-1.81, 0.35, 0.36]);
  assert.deepEqual(branch.following.map(({ piece }) => piece.id), ['power_floor']);
  assert.ok(branch.points.slice(1, -1).every(([x, y, z]) => y <= 0.35 && (z <= 0.20 || x <= -1.81)),
    'heater branch must use the low rear/left route, not cross the front equipment');
  const floor = d.supports.solids.find(({ id }) => id === 'heater_rear_raceway_floor');
  assert.equal(floor.center[2], starts.heater[2]);
  assert.ok(floor.min[2] > -1.295, 'rear channel must remain within the skid');
  assert.ok(d.supports.solids.some(({ id }) => id === 'heater_left_raceway_floor'));
  const frontWall = d.supports.solids.find(({ id }) => id === 'front_raceway_inner_wall_0');
  assert.ok(frontWall.min[0] < starts.heater[0] && frontWall.max[0] > starts.heater[0],
    'obsolete front heater opening must be closed');
  const feet = [-0.82, 0.82].flatMap((x) => [-0.82, 0.82].map((z) => ({
    x: tank.x + x, z,
  })));
  for (let index = 0; index <= 2000; index += 1) {
    const p = branch.curve.getPoint(index / 2000);
    for (const foot of feet) {
      assert.ok(distanceToBox(p.toArray(), [foot.x - 0.09, 0.12, foot.z - 0.09],
        [foot.x + 0.09, 0.56, foot.z + 0.09]) > branch.radius,
      'heater cable intersects a tank support post');
      assert.ok(distanceToBox(p.toArray(), [foot.x - 0.15, 0.1025, foot.z - 0.13],
        [foot.x + 0.15, 0.1575, foot.z + 0.13]) > branch.radius,
      'heater cable intersects a tank foot pad');
    }
  }
  wiring.dispose();
});

test('lowered cooler leads clear the cold shoe, fins, floor flange and actual transparent pipe paths', () => {
  const pipePaths = [
    [[tank.x + 1.03, 0.80, 0.10], [0.94, 0.80, 0.10], [1.20, 0.80, 0.38],
      [1.52, 0.76, 1.15], [2.16, 0.76, 1.19], [2.16, 0.76, 1.035]],
    [[2.34, 1.23, 0.57], [2.34, 1.55, 0.57], [2.67, 1.72, 0.54],
      [3.20, 1.72, 0.65], [3.35, 1.50, 0.94], [3.35, 1.08, 0.94]],
  ].map((points) => new THREE.CatmullRomCurve3(points.map((point) => new THREE.Vector3(...point)), false, 'catmullrom', 0.35));
  const pipeVertices = pipePaths.map((curve) => Array.from({ length: 1001 }, (_, index) => curve.getPoint(index / 1000)));
  assert.ok(Math.max(...pipeVertices[0].map(({ y }) => y)) + 0.081
    < tank.bottom + COOLING_CONTACT.bottomOffset,
  'the lowered cold shoe and fins must remain above the complete suction-pipe shell');
  const affected = new Set(['branch_peltier', 'branch_fan', 'cooler_riser']);
  let minimumPipeClearance = Infinity;
  for (const lowPower of [false, true]) {
    const wiring = createControlWiring({ scene: new THREE.Scene(), endpoints: endpoints(), lowPower });
    const d = wiring.getDiagnostics();
    const positions = wiring.group.getObjectByName('harness_power').geometry.getAttribute('position');
    let startVertex = 0;
    for (const piece of wiring.harness.pieces.filter(({ type }) => type === 'power')) {
      const segmentCount = d.physical_pieces.find(({ id }) => id === piece.id).tubular_segments;
      const vertexCount = (segmentCount + 1) * 7;
      if (affected.has(piece.id)) {
        const check = (point, envelopeRadius) => {
          const relative = new THREE.Vector3(point[0] - tank.x, 0, point[2]);
          const local = [relative.dot(coldNormal), point[1] - coldCenterY, -relative.dot(coldTangent)];
          assert.ok(distanceToBox(local, [0.99, -0.60, -0.38], [1.15, 0.60, 0.38]) > envelopeRadius,
            `${piece.id} enters the cold shoe`);
          assert.ok(distanceToBox(local, [1.306, -0.60, -0.395], [1.366, 0.60, 0.395]) > envelopeRadius,
            `${piece.id} enters the lowered sink base`);
          for (let fin = 0; fin < 14; fin += 1) {
            const y = -0.56 + fin * 0.086;
            assert.ok(distanceToBox(local, [1.366, y - 0.011, -0.395], [1.816, y + 0.011, 0.395]) > envelopeRadius,
              `${piece.id} enters a lowered fin`);
          }
          const radial = Math.hypot(point[0] - tank.x, point[2]);
          const flangeRadialGap = Math.max(1.07 - radial, 0, radial - 1.17);
          const flangeHeightGap = Math.max(0.56 - point[1], 0, point[1] - 0.68);
          assert.ok(Math.hypot(flangeRadialGap, flangeHeightGap) > envelopeRadius,
            `${piece.id} enters the vessel floor flange`);
          for (const pipe of pipeVertices) {
            const clearance = distanceToPolyline(point, pipe) - envelopeRadius - 0.081;
            minimumPipeClearance = Math.min(minimumPipeClearance, clearance);
            assert.ok(clearance > 0.01, `${piece.id} enters a transparent pipe`);
          }
        };
        for (let index = 0; index <= 1000; index += 1) check(piece.curve.getPoint(index / 1000).toArray(), piece.radius);
        for (let index = startVertex; index < startVertex + vertexCount; index += 1) {
          check([positions.getX(index), positions.getY(index), positions.getZ(index)], 0);
        }
      }
      startVertex += vertexCount;
    }
    wiring.dispose();
  }
  assert.ok(minimumPipeClearance > 0.01);
});
