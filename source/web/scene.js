import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createFluidEffects } from './fluid-effects.js';
import { createThermalEffects } from './thermal-effects.js';
import { createSideHeater, createCoolingFan, createControlWiring } from './equipment.js';
import { COOLING_CONTACT } from './thermal-contact.js';

const TAU = Math.PI * 2;
const LEVEL_HEIGHT = new Map([[0, 0.08], [4, 0.30], [6, 0.65], [7, 0.92]]);
const TANK = { x: -0.62, z: 0, bottom: 0.59, height: 3.02, radius: 1.06 };

/**
 * Procedural, same-origin Three.js process view. Projected label coordinates are
 * CSS pixels relative to host (not the viewport). A label's active value always
 * comes from fresh telemetry; geometry alone never implies an actuator command.
 */
export function createTankScene(host, options = {}) {
  if (!(host instanceof HTMLElement)) throw new TypeError('3D scene requires an HTML host.');

  const lowPower = options.quality === 'low'
    || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4)
    || (navigator.deviceMemory && navigator.deviceMemory <= 4);
  const segments = lowPower ? 40 : 64;
  const capPixelRatio = lowPower ? 1.25 : 1.8;
  const frameInterval = lowPower ? 1000 / 30 : 1000 / 60;
  const reducedMedia = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  let reducedMotion = options.reducedMotion ?? reducedMedia?.matches ?? false;
  let disposed = false;
  let pageVisible = !document.hidden;
  let inViewport = true;
  let width = 1;
  let height = 1;
  let dirty = true;
  let frameHandle = 0;
  let lastFrame = 0;
  let motionTime = 0;
  let statsAt = 0;
  let environmentTarget;
  let latestState = {};
  let currentFill = 0;
  const active = { online: false, pump: false, heat: false, cool: false, mask: null };
  const resources = { geometry: new Set(), material: new Set() };
  const dummy = new THREE.Object3D();
  const yAxis = new THREE.Vector3(0, 1, 0);
  const projected = new THREE.Vector3();
  const anchors = [];
  const sensorLeds = [];

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xf4f8fa, 14, 28);
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 80);
  const renderer = new THREE.WebGLRenderer({
    antialias: !lowPower,
    alpha: true,
    powerPreference: lowPower ? 'low-power' : 'high-performance',
    preserveDrawingBuffer: false,
  });
  renderer.setClearColor(0xffffff, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, capPixelRatio));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.className = 'tank-canvas';
  renderer.domElement.setAttribute('aria-label', '储罐三维可视化，可拖动旋转、滚轮缩放。液位为传感器区间示意。');
  renderer.domElement.setAttribute('role', 'img');
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%;touch-action:none;outline:none;';
  host.appendChild(renderer.domElement);

  // The reflection environment is generated from geometry, never fetched.
  const environment = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  environmentTarget = pmrem.fromScene(environment, 0.04);
  scene.environment = environmentTarget.texture;
  scene.environmentIntensity = 0.65;
  environment.dispose();
  pmrem.dispose();

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = !reducedMotion;
  controls.dampingFactor = 0.085;
  controls.enablePan = false;
  controls.minDistance = 5.2;
  controls.maxDistance = 16.5;
  controls.minPolarAngle = Math.PI * 0.15;
  controls.maxPolarAngle = Math.PI * 0.47;
  controls.rotateSpeed = 0.65;
  controls.zoomSpeed = 0.8;
  controls.target.set(0.2, 1.94, 0.18);
  controls.addEventListener('change', markDirty);

  scene.add(new THREE.HemisphereLight(0xe8faff, 0xa3b4c0, 2.4));
  const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
  keyLight.position.set(-3, 8, 6);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(lowPower ? 512 : 1024, lowPower ? 512 : 1024);
  keyLight.shadow.camera.left = -5;
  keyLight.shadow.camera.right = 5;
  keyLight.shadow.camera.top = 6;
  keyLight.shadow.camera.bottom = -4;
  keyLight.shadow.camera.near = 0.1;
  keyLight.shadow.camera.far = 22;
  keyLight.shadow.bias = -0.0006;
  keyLight.shadow.normalBias = 0.025;
  keyLight.shadow.radius = 4;
  keyLight.target.position.set(0.2, 1.4, 0);
  scene.add(keyLight, keyLight.target);
  const rimLight = new THREE.DirectionalLight(0xafdcff, 2.1);
  rimLight.position.set(5, 5, -4);
  scene.add(rimLight);

  function geometry(value) {
    resources.geometry.add(value);
    return value;
  }
  function material(value) {
    resources.material.add(value);
    return value;
  }
  function standard(color, rest = {}) {
    return material(new THREE.MeshStandardMaterial({ color, roughness: 0.35, metalness: 0.35, ...rest }));
  }
  function basic(color, rest = {}) {
    return material(new THREE.MeshBasicMaterial({ color, ...rest }));
  }
  function mesh(shape, paint, position, parent = scene, shadows = true) {
    const value = new THREE.Mesh(geometry(shape), paint);
    if (position) value.position.set(...position);
    value.castShadow = shadows;
    value.receiveShadow = shadows;
    parent.add(value);
    return value;
  }
  function instances(shape, paint, transforms, parent = scene, shadows = true) {
    const value = new THREE.InstancedMesh(geometry(shape), paint, transforms.length);
    value.castShadow = shadows;
    value.receiveShadow = shadows;
    transforms.forEach((transform, index) => {
      dummy.position.set(...(transform.position || [0, 0, 0]));
      dummy.rotation.set(...(transform.rotation || [0, 0, 0]));
      dummy.scale.set(...(transform.scale || [1, 1, 1]));
      dummy.updateMatrix();
      value.setMatrixAt(index, dummy.matrix);
    });
    parent.add(value);
    return value;
  }
  function curve(points, tension = 0.35) {
    return new THREE.CatmullRomCurve3(points.map((v) => new THREE.Vector3(...v)), false, 'catmullrom', tension);
  }
  function tube(path, radius, paint, parent = scene, radialSegments = 8, shadows = true) {
    return mesh(new THREE.TubeGeometry(path, lowPower ? 36 : 56, radius, radialSegments, false), paint, null, parent, shadows);
  }
  function ring(radius, thickness, paint, at, parent = scene, shadows = true) {
    const value = mesh(new THREE.TorusGeometry(radius, thickness, 10, segments), paint, at, parent, shadows);
    value.rotation.x = Math.PI / 2;
    return value;
  }
  function annularSolid(outerRadius, innerRadius, depth, paint, at, parent = scene, axis = 'z') {
    const profile = new THREE.Shape();
    profile.absarc(0, 0, outerRadius, 0, TAU, false);
    const bore = new THREE.Path(); bore.absarc(0, 0, innerRadius, 0, TAU, true);
    profile.holes.push(bore);
    const shape = new THREE.ExtrudeGeometry(profile, { depth, steps: 1, curveSegments: lowPower ? 20 : 32, bevelEnabled: false });
    shape.translate(0, 0, -depth / 2);
    if (axis === 'y') shape.rotateX(-Math.PI / 2);
    return mesh(shape, paint, at, parent);
  }
  function label(id, at, stateKey = null, maskBit = 0) {
    anchors.push({ id, position: new THREE.Vector3(...at), stateKey, maskBit });
  }

  const steel = standard(0xd1dce2, { metalness: 0.75, roughness: 0.25 });
  const paleSteel = standard(0xe1e9ed, { metalness: 0.48, roughness: 0.3 });
  const navy = standard(0x1d3448, { metalness: 0.4, roughness: 0.32 });
  const graphite = standard(0x425769, { metalness: 0.6 });
  const teal = standard(0x158eab, { metalness: 0.32, roughness: 0.28 });
  const contactPaint = standard(0xd4ad61, { metalness: 0.72 });

  const floor = mesh(new THREE.PlaneGeometry(40, 40), standard(0xf4f7f9, { metalness: 0, roughness: 1 }), [0, -0.025, 0], scene, false);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  const grid = new THREE.GridHelper(18, 36, 0xcadce6, 0xe1e9ed);
  grid.position.y = -0.015;
  grid.material.transparent = true;
  grid.material.opacity = 0.36;
  grid.material.depthWrite = false;
  resources.geometry.add(grid.geometry);
  resources.material.add(grid.material);
  scene.add(grid);

  // The small instrument skid gives the whole view a physical, coherent base.
  mesh(new THREE.BoxGeometry(6.95, 0.12, 3.35), paleSteel, [0.28, 0.045, 0.38]);
  instances(new THREE.BoxGeometry(0.08, 0.13, 3.22), navy, [
    { position: [-3.07, 0.10, 0.38] }, { position: [3.58, 0.10, 0.38] },
  ]);
  const footPositions = [[-0.82, -0.82], [0.82, -0.82], [-0.82, 0.82], [0.82, 0.82]];
  instances(new THREE.CylinderGeometry(0.075, 0.09, 0.44, 12), steel,
    footPositions.map(([x, z]) => ({ position: [TANK.x + x, 0.34, z] })));
  instances(new THREE.BoxGeometry(0.30, 0.055, 0.26), graphite,
    footPositions.map(([x, z]) => ({ position: [TANK.x + x, 0.13, z] })));

  const tankFloorThickness = 0.030;
  const tankFloorUnder = TANK.bottom - tankFloorThickness;
  // The finite steel vessel floor, flange and feet are passive supports. Heat
  // enters through the separate ceramic plate bonded to the vessel's side.
  annularSolid(1.17, 1.07, 0.12, steel, [TANK.x, 0.62, 0], scene, 'y');
  mesh(new THREE.CylinderGeometry(1.07, 1.07, tankFloorThickness, segments), steel,
    [TANK.x, TANK.bottom - tankFloorThickness / 2, 0]);
  ring(1.09, 0.055, graphite, [TANK.x, 0.64, 0]);
  const glassPaint = material(new THREE.MeshPhysicalMaterial({
    color: 0xc9e8ef,
    metalness: 0.04,
    roughness: 0.12,
    transparent: true,
    opacity: 0.19,
    clearcoat: 1,
    clearcoatRoughness: 0.12,
    side: THREE.DoubleSide,
    depthWrite: false,
  }));
  const glass = mesh(new THREE.CylinderGeometry(TANK.radius, TANK.radius, TANK.height, segments, 1, true),
    glassPaint, [TANK.x, TANK.bottom + TANK.height / 2, 0], scene, false);
  glass.renderOrder = 4;
  mesh(new THREE.CylinderGeometry(1.11, 1.11, 0.14, segments), steel, [TANK.x, 3.68, 0]);
  ring(1.07, 0.04, graphite, [TANK.x, 3.59, 0]);

  // Top lid fasteners and cross brace are instanced to keep draw calls low.
  instances(new THREE.CylinderGeometry(0.045, 0.045, 0.045, 6), graphite,
    Array.from({ length: 8 }, (_, index) => {
      const angle = index * TAU / 8;
      return { position: [TANK.x + 0.94 * Math.cos(angle), 3.765, 0.94 * Math.sin(angle)] };
    }));
  mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.065, 32), paleSteel, [TANK.x, 3.79, 0]);
  mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.27, 16), steel, [TANK.x, 3.94, 0]);
  ring(0.21, 0.023, teal, [TANK.x, 4.085, 0]);
  instances(new THREE.BoxGeometry(0.38, 0.025, 0.024), teal, [
    { position: [TANK.x, 4.085, 0] },
    { position: [TANK.x, 4.085, 0], rotation: [0, Math.PI / 2, 0] },
  ]);

  const liquidPaint = material(new THREE.MeshPhysicalMaterial({
    color: 0x12acbb,
    roughness: 0.23,
    metalness: 0.08,
    transparent: true,
    opacity: 0.66,
    clearcoat: 0.9,
    clearcoatRoughness: 0.18,
    depthWrite: false,
    side: THREE.DoubleSide,
  }));
  const liquid = mesh(new THREE.CylinderGeometry(1.012, 1.012, 1, segments, 1, true), liquidPaint,
    [TANK.x, 0.7, 0], scene, false);
  liquid.renderOrder = 2;
  const liquidBottom = mesh(new THREE.CircleGeometry(1.012, segments).rotateX(-Math.PI / 2),
    liquidPaint, [TANK.x, TANK.bottom + 0.003, 0], scene, false);
  liquidBottom.renderOrder = 2;
  const waterSurfacePaint = material(new THREE.MeshPhysicalMaterial({
    color: 0x23c4ca,
    roughness: 0.19,
    metalness: 0.15,
    transparent: true,
    opacity: 0.78,
    clearcoat: 1,
    depthWrite: false,
    side: THREE.DoubleSide,
  }));
  const surfaceGeometry = new THREE.CircleGeometry(1.014, segments).rotateX(-Math.PI / 2);
  const waterSurface = mesh(surfaceGeometry, waterSurfacePaint, [TANK.x, 0.8, 0], scene, false);
  waterSurface.renderOrder = 3;
  const waterEdge = ring(1.012, 0.012, basic(0x86e8e5, { transparent: true, opacity: 0.7, depthWrite: false }),
    [TANK.x, 0.8, 0], scene, false);
  waterEdge.renderOrder = 3;
  liquid.visible = liquidBottom.visible = waterSurface.visible = waterEdge.visible = false;

  // A narrow sight scale on the glass makes the three physical thresholds clear.
  const tickVertices = [];
  for (let index = 0; index <= 12; index += 1) {
    const y = 0.72 + index * 0.223;
    tickVertices.push(TANK.x + 0.59, y, 0.872, TANK.x + (index % 4 === 0 ? 0.75 : 0.67), y, 0.872);
  }
  const scaleGeometry = geometry(new THREE.BufferGeometry());
  scaleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(tickVertices, 3));
  const sightScale = new THREE.LineSegments(scaleGeometry, material(new THREE.LineBasicMaterial({ color: 0x6b9eaf, transparent: true, opacity: 0.6 })));
  scene.add(sightScale);

  const sensorAt = [3.16, 2.20, 1.24];
  const sensorIds = ['upper', 'middle', 'lower'];
  const sensorAngle = -0.77;
  const sensorX = TANK.x - 0.78;
  const sensorZ = 0.78;
  instances(new THREE.BoxGeometry(0.30, 0.23, 0.085), paleSteel,
    sensorAt.map((y) => ({ position: [sensorX, y, sensorZ], rotation: [0, sensorAngle, 0] })));
  instances(new THREE.BoxGeometry(0.235, 0.165, 0.065), navy,
    sensorAt.map((y) => ({ position: [sensorX - 0.03, y, sensorZ + 0.035], rotation: [0, sensorAngle, 0] })));
  // A short moulded strain relief bridges each probe's lower housing edge to
  // its cable; the cable does not begin in empty space beside the enclosure.
  instances(new THREE.BoxGeometry(0.075, 0.080, 0.072), graphite,
    sensorAt.map((y) => ({ position: [sensorX - 0.099, y - 0.070, sensorZ + 0.039],
      rotation: [0, sensorAngle, 0] })));
  const sensorLedGeo = geometry(new THREE.SphereGeometry(0.038, 12, 8));
  sensorAt.forEach((y, index) => {
    const ledPaint = standard(0x8198a4, { metalness: 0.08, roughness: 0.25, emissive: 0x000000 });
    const led = new THREE.Mesh(sensorLedGeo, ledPaint);
    led.position.set(sensorX - 0.11, y + 0.006, sensorZ + 0.10);
    scene.add(led);
    sensorLeds.push(led);
    label(sensorIds[index], [sensorX - 0.14, y, sensorZ + 0.18], null, 1 << index);
  });

  const sensorBoard = new THREE.Group();
  sensorBoard.position.set(-2.13, 3.40, 0.32);
  sensorBoard.rotation.y = 0.22;
  scene.add(sensorBoard);
  mesh(new THREE.BoxGeometry(0.47, 0.32, 0.05), standard(0x087d98, { metalness: 0.15, roughness: 0.55 }), [0, 0, 0], sensorBoard);
  mesh(new THREE.BoxGeometry(0.18, 0.14, 0.055), paleSteel, [0.06, 0.01, 0.044], sensorBoard);
  instances(new THREE.BoxGeometry(0.020, 0.012, 0.009), graphite,
    [-0.042, 0, 0.042].map((x) => ({ position: [0.06 + x, 0.025, 0.076] })), sensorBoard, false);
  instances(new THREE.BoxGeometry(0.032, 0.09, 0.04), contactPaint,
    [-0.135, -0.045, 0.045, 0.135].map((x) => ({ position: [x, -0.16, 0] })), sensorBoard);
  mesh(new THREE.BoxGeometry(0.37, 0.035, 0.055), graphite, [0, -0.19, 0], sensorBoard);
  const ahtLed = mesh(new THREE.SphereGeometry(0.018, 10, 8),
    standard(0x84c7c8, { emissive: 0x000000, metalness: 0 }), [-0.14, 0.06, 0.045], sensorBoard, false);
  label('aht', [-2.13, 3.42, 0.41], 'online');

  const equipmentTracking = { trackGeometry: geometry, trackMaterial: material };
  const sideHeater = createSideHeater({ scene, tank: TANK, lowPower, ...equipmentTracking });
  const heater = sideHeater.descriptor;
  label('heater', heater.point(heater.outerRadius + 0.06, heater.bottom + 0.37, -0.22), 'heat');

  // Peltier assembly: the inside of the copper shoe follows the tank curvature,
  // while its outside face is flat so both ceramic faces contact adjacent parts.
  const coolerAngle = 0.35;
  const coldNormal = new THREE.Vector3(Math.cos(coolerAngle), 0, Math.sin(coolerAngle));
  const coldTangent = new THREE.Vector3(coldNormal.z, 0, -coldNormal.x);
  const contactHeight = COOLING_CONTACT.height;
  const contactBottomY = TANK.bottom + COOLING_CONTACT.bottomOffset;
  const coldCenterY = contactBottomY + contactHeight / 2;
  const contactRadius = TANK.radius + 0.001;
  const contactWidth = 0.76;
  const contactFace = 1.15;
  function coldPoint(radius, y, sideways = 0) {
    return [TANK.x + coldNormal.x * radius + coldTangent.x * sideways,
      y, coldNormal.z * radius + coldTangent.z * sideways];
  }
  const contactProfile = new THREE.Shape();
  for (let index = 0; index <= 24; index += 1) {
    const sideways = -contactWidth / 2 + index / 24 * contactWidth;
    const radial = Math.sqrt(contactRadius ** 2 - sideways ** 2);
    if (index === 0) contactProfile.moveTo(radial, sideways);
    else contactProfile.lineTo(radial, sideways);
  }
  contactProfile.lineTo(contactFace, contactWidth / 2);
  contactProfile.lineTo(contactFace, -contactWidth / 2);
  contactProfile.closePath();
  const contactGeometry = new THREE.ExtrudeGeometry(contactProfile, {
    depth: contactHeight, steps: 1, bevelEnabled: false,
  });
  contactGeometry.applyMatrix4(new THREE.Matrix4().makeBasis(coldNormal, coldTangent, yAxis));
  const contactShoe = mesh(contactGeometry, standard(0xc39d72, { metalness: 0.82, roughness: 0.27 }),
    [TANK.x, contactBottomY, 0]);
  const coolerAssembly = new THREE.Group();
  coolerAssembly.position.set(TANK.x, coldCenterY, 0);
  coolerAssembly.rotation.y = -coolerAngle;
  scene.add(coolerAssembly);
  const ceramic = standard(0xf0f1eb, { metalness: 0.05, roughness: 0.27 });
  const semiconductor = standard(0x334c5b, { metalness: 0.18, roughness: 0.42 });
  const coldSpreader = standard(0x6d9fae, { metalness: 0.80, roughness: 0.24, emissive: 0x000000 });
  const hotSpreader = standard(0xbb9574, { metalness: 0.80, roughness: 0.28, emissive: 0x000000 });
  let nextFace = contactFace;
  const peltierLayers = [];
  function peltierLayer(name, thickness, paint, height = 1.02, width = 0.65) {
    const inner = nextFace;
    const part = mesh(new THREE.BoxGeometry(thickness, height, width), paint,
      [inner + thickness / 2, 0, 0], coolerAssembly);
    nextFace += thickness;
    peltierLayers.push({ name, inner, outer: nextFace, thickness });
    return part;
  }
  peltierLayer('cold_conductor', 0.035, coldSpreader);
  peltierLayer('cold_ceramic', 0.020, ceramic, 0.96, 0.61);
  peltierLayer('semiconductor', 0.036, semiconductor, 0.96, 0.61);
  peltierLayer('hot_ceramic', 0.020, ceramic, 0.96, 0.61);
  peltierLayer('hot_conductor', 0.045, hotSpreader);
  const coolerPaint = standard(0x829dae, { metalness: 0.72, roughness: 0.30, emissive: 0x000000 });
  peltierLayer('sink_base', 0.060, coolerPaint, 1.20, 0.79);
  const sinkInner = nextFace;
  const sinkDepth = 0.45;
  instances(new THREE.BoxGeometry(sinkDepth, 0.022, 0.79), coolerPaint,
    Array.from({ length: 14 }, (_, index) => ({ position: [sinkInner + sinkDepth / 2, -0.56 + index * 0.086, 0] })), coolerAssembly);
  instances(new THREE.BoxGeometry(0.025, 1.20, 0.025), graphite, [
    { position: [sinkInner + sinkDepth - 0.0125, 0, -0.383] },
    { position: [sinkInner + sinkDepth - 0.0125, 0, 0.383] },
  ], coolerAssembly);
  instances(new THREE.CylinderGeometry(0.027, 0.027, 0.055, 6), steel,
    [-0.49, 0.49].flatMap((y) => [-0.30, 0.30].map((z) => ({
      position: [sinkInner + 0.025, y, z], rotation: [0, 0, Math.PI / 2],
    }))), coolerAssembly);
  const coolerLamp = new THREE.PointLight(0x51c6ff, 0, 2.8, 2);
  coolerLamp.position.fromArray(coldPoint(1.22, coldCenterY, -0.28));
  scene.add(coolerLamp);
  const coolingFan = createCoolingFan({ coolerAssembly, coldNormal, coldPoint, coldCenterY,
    sinkOuter: sinkInner + sinkDepth, lowPower, ...equipmentTracking });
  mesh(new THREE.BoxGeometry(0.12, 0.10, 0.085), graphite,
    [contactFace + 0.07, -0.48, 0.325], coolerAssembly);
  label('cooler', coldPoint(sinkInner + sinkDepth + 0.15, coldCenterY + 0.42, -0.25), 'cool');
  const thermalEffects = createThermalEffects({ scene, tank: TANK, lowPower,
    heater, fan: coolingFan.descriptor, coldNormal, coldTangent, coldPoint, coldCenterY,
    contactHeight, contactFace, sinkInner, sinkDepth });

  // Centrifugal pump: motor, shaft and impeller share one Z axis. The front
  // axial suction enters the eye; the tangential upper nozzle feeds the outlet.
  const pumpCenter = new THREE.Vector3(2.16, 0.76, 0.57);
  const pump = new THREE.Group();
  pump.position.copy(pumpCenter);
  scene.add(pump);
  mesh(new THREE.BoxGeometry(1.13, 0.14, 1.94), navy, [0, -0.45, -0.35], pump);
  const motorPaint = standard(0x1a607b, { metalness: 0.50, roughness: 0.27, emissive: 0x000000 });
  const motor = mesh(new THREE.CylinderGeometry(0.275, 0.275, 0.96, 32), motorPaint, [0, 0, -0.72], pump);
  motor.rotation.x = Math.PI / 2;
  const motorFins = Array.from({ length: 9 }, (_, index) => ({
    position: [0, 0, -1.13 + index * 0.10],
  }));
  instances(new THREE.TorusGeometry(0.28, 0.018, 6, 24), graphite, motorFins, pump);
  const motorCap = mesh(new THREE.CylinderGeometry(0.282, 0.282, 0.035, 24), steel, [0, 0, -1.2175], pump);
  motorCap.rotation.x = Math.PI / 2;
  instances(new THREE.BoxGeometry(0.20, 0.10, 0.47), graphite, [
    { position: [-0.19, -0.325, -0.72] }, { position: [0.19, -0.325, -0.72] },
  ], pump);

  const chamberInner = 0.34, chamberOuter = 0.40;
  // The open annular volute wall has a real radial outlet slot; its moving parts
  // occupy the empty bore, not an opaque solid cylinder with overlapping blades.
  const portAngle = Math.atan2(0.3572, 0.18);
  const slotHalfAngle = 0.25;
  const voluteProfile = new THREE.Shape();
  const arcStart = portAngle + slotHalfAngle;
  const arcEnd = portAngle + TAU - slotHalfAngle;
  voluteProfile.absarc(0, 0, chamberOuter, arcStart, arcEnd, false);
  voluteProfile.lineTo(chamberInner * Math.cos(arcEnd), chamberInner * Math.sin(arcEnd));
  voluteProfile.absarc(0, 0, chamberInner, arcEnd, arcStart, true);
  voluteProfile.closePath();
  const voluteShape = new THREE.ExtrudeGeometry(voluteProfile, {
    depth: 0.40, steps: 1, curveSegments: lowPower ? 24 : 40, bevelEnabled: false,
  }).translate(0, 0, -0.20);
  mesh(voluteShape, steel, [0, 0, 0], pump);
  annularSolid(chamberOuter, 0.065, 0.035, graphite, [0, 0, -0.2175], pump);
  const pumpWindowPaint = material(new THREE.MeshPhysicalMaterial({ color: 0xd2eef5,
    roughness: 0.08, metalness: 0.04, transparent: true, opacity: 0.17,
    clearcoat: 1, depthWrite: false, side: THREE.DoubleSide }));
  const pumpWindow = annularSolid(0.342, 0.10, 0.020, pumpWindowPaint, [0, 0, 0.215], pump);
  pumpWindow.castShadow = false; pumpWindow.renderOrder = 4;
  annularSolid(0.415, 0.342, 0.027, steel, [0, 0, 0.2185], pump);
  annularSolid(0.115, 0.080, 0.240, steel, [0, 0, 0.345], pump);
  annularSolid(0.113, 0.082, 0.180, steel, [0.18, 0.38, 0], pump, 'y');
  // The bearing/shaft/hub contact is intentional; blade-to-housing and
  // blade-to-window clearances are explicit and reported in diagnostics.
  const shaft = mesh(new THREE.CylinderGeometry(0.042, 0.042, 1.265, 16), contactPaint, [0, 0, -0.5275], pump);
  shaft.rotation.x = Math.PI / 2;
  const rotor = new THREE.Group();
  rotor.position.set(0, 0, 0.070);
  pump.add(rotor);
  const bladeProfile = new THREE.Shape();
  bladeProfile.moveTo(0.09, -0.013);
  bladeProfile.bezierCurveTo(0.17, -0.007, 0.24, 0.057, 0.272, 0.104);
  bladeProfile.lineTo(0.258, 0.128);
  bladeProfile.bezierCurveTo(0.215, 0.092, 0.155, 0.027, 0.090, 0.013);
  bladeProfile.closePath();
  const bladeShape = new THREE.ExtrudeGeometry(bladeProfile, {
    depth: 0.050, steps: 1, curveSegments: 6, bevelEnabled: false,
  }).translate(0, 0, -0.025);
  instances(bladeShape, paleSteel,
    Array.from({ length: 6 }, (_, index) => ({ rotation: [0, 0, index * TAU / 6] })), rotor, false);
  annularSolid(0.295, 0.045, 0.015, standard(0x799eae, { metalness: 0.65, roughness: 0.25 }),
    [0, 0, -0.0325], rotor);
  const hub = mesh(new THREE.CylinderGeometry(0.064, 0.064, 0.090, 16), contactPaint,
    [0, 0, 0.005], rotor, false);
  hub.rotation.x = Math.PI / 2;
  const pumpStatusPaint = standard(0x70949e, { emissive: 0x000000, metalness: 0.15 });
  const pumpHalo = mesh(new THREE.TorusGeometry(0.367, 0.015, 8, 40), pumpStatusPaint, [0, 0, 0.237], pump, false);
  instances(new THREE.CylinderGeometry(0.025, 0.025, 0.035, 6), graphite,
    Array.from({ length: 6 }, (_, index) => {
      const angle = index * TAU / 6;
      return { position: [0.382 * Math.cos(angle), 0.382 * Math.sin(angle), 0.245], rotation: [Math.PI / 2, 0, 0] };
    }), pump);
  label('pump', [2.16, 0.98, 0.84], 'pump');
  // The motor's upper terminal belongs to the same cable harness as the fan,
  // Peltier, heater and instruments; no lead ends at a decorative loose box.
  mesh(new THREE.BoxGeometry(0.24, 0.105, 0.19), graphite, [0, 0.30, -0.72], pump);
  const wiring = createControlWiring({ scene, lowPower, ...equipmentTracking, endpoints: {
    sensors: sensorAt.map((y) => [sensorX - 0.11, y - 0.11, sensorZ + 0.05]),
    aht: [-2.13, 3.21, 0.30], heater: sideHeater.leadStart,
    peltier: coldPoint(contactFace + 0.07, coldCenterY - 0.48, -0.3675),
    fan: coolingFan.leadStart, pump: [pumpCenter.x, pumpCenter.y + 0.3525, pumpCenter.z - 0.72],
  } });
  label('cabinet', wiring.labelAnchor, 'online');

  const inletCurve = curve([
    [TANK.x + 1.03, 0.80, 0.10], [0.94, 0.80, 0.10],
    [1.20, 0.80, 0.38], [1.52, 0.76, 1.15], [2.16, 0.76, 1.19], [2.16, 0.76, 1.035],
  ]);
  const outletCurve = curve([
    [2.34, 1.23, 0.57], [2.34, 1.55, 0.57], [2.67, 1.72, 0.54],
    [3.20, 1.72, 0.65], [3.35, 1.50, 0.94], [3.35, 1.08, 0.94],
  ]);
  const pipePaint = material(new THREE.MeshPhysicalMaterial({
    color: 0xc8dfe7, metalness: 0.12, roughness: 0.17, clearcoat: 1,
    transparent: true, opacity: 0.4, depthWrite: false, side: THREE.DoubleSide,
  }));
  [inletCurve, outletCurve].forEach((path) => {
    const shell = tube(path, 0.081, pipePaint, scene, 10, false);
    shell.renderOrder = 4;
  });
  instances(new THREE.TorusGeometry(0.084, 0.024, 8, 16), steel, [
    { position: [0.47, 0.80, 0.10], rotation: [0, Math.PI / 2, 0] },
    { position: [2.16, 0.76, 1.035] },
    { position: [2.34, 1.23, 0.57], rotation: [Math.PI / 2, 0, 0] },
    { position: [3.35, 1.11, 0.94], rotation: [Math.PI / 2, 0, 0] },
  ]);
  const fluidEffects = createFluidEffects({ scene, tank: TANK, inletCurve, outletCurve,
    liquid, waterSurface, waterEdge, lowPower, trackGeometry: geometry, trackMaterial: material });

  let cameraFitScale = 1;

  function viewportFitScale() {
    const aspect = Math.max(width / height, 0.35);
    return aspect < 1.15 ? Math.min(1.65, 1.15 / aspect) : 1;
  }

  function defaultCameraDistance(scale) {
    return Math.hypot(6.8 * scale - 0.28, 5.25 * scale - 1.98, 8.4 * scale - 0.24);
  }

  function setDefaultCamera() {
    // Keep the complete skid in view on narrow screens without shrinking a wide
    // desktop view into an orthographic-looking, distant thumbnail.
    cameraFitScale = viewportFitScale();
    controls.maxDistance = 16.5 * cameraFitScale;
    controls.target.set(0.28, 1.98, 0.24);
    camera.position.set(6.8 * cameraFitScale, 5.25 * cameraFitScale, 8.4 * cameraFitScale);
    controls.update();
    dirty = true;
  }

  function resize() {
    if (disposed) return;
    const box = host.getBoundingClientRect();
    const wasEmpty = width <= 1 || height <= 1;
    width = Math.max(1, box.width);
    height = Math.max(1, box.height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, capPixelRatio));
    renderer.setSize(width, height, false);
    if (wasEmpty) {
      setDefaultCamera();
    } else {
      const nextFitScale = viewportFitScale();
      if (Math.abs(nextFitScale - cameraFitScale) > 0.0001) {
        // Rescale the current orbit instead of resetting its angles. This keeps
        // a user's rotated view and zoom ratio through desktop/mobile resize.
        const ratio = defaultCameraDistance(nextFitScale) / defaultCameraDistance(cameraFitScale);
        controls.maxDistance = 16.5 * nextFitScale;
        camera.position.sub(controls.target).multiplyScalar(ratio).add(controls.target);
        cameraFitScale = nextFitScale;
        controls.update();
      }
    }
    dirty = true;
  }

  function setActuatorMaterial(paint, on, idle, color, intensity = 0.45) {
    paint.color.set(on ? color : idle);
    paint.emissive.set(on ? color : 0x000000);
    paint.emissiveIntensity = on ? intensity : 0;
  }

  function update(state = {}) {
    if (disposed) return;
    latestState = { ...state };
    active.online = state.online === true && state.stale !== true;
    active.pump = active.online && state.pump === true;
    // A malformed simultaneous heat/cool report cannot animate both systems.
    active.heat = active.online && state.heat === true && state.cool !== true;
    active.cool = active.online && state.cool === true && state.heat !== true;
    active.mask = Number.isInteger(state.wetmask) && state.wetmask >= 0 && state.wetmask <= 7
      ? state.wetmask : null;

    const visualFill = state.demo === true && Number.isFinite(state.visualFill)
      ? THREE.MathUtils.clamp(state.visualFill, 0, 0.96) : null;
    const fraction = visualFill ?? LEVEL_HEIGHT.get(active.mask);
    const known = fraction !== undefined;
    const thermalKnown = known && state.configuredMask === 7
      && state.level !== 'LEVEL_NC' && state.level !== 'LEVEL_ERR';
    const thermalRange = thermalEffects.getDiagnostics();
    const showingThermal = thermalKnown && (active.heat || active.cool
      || Math.max(Math.abs(thermalRange.min), Math.abs(thermalRange.max)) > 0.05);
    currentFill = known ? fraction : 0;
    liquid.visible = liquidBottom.visible = waterSurface.visible = waterEdge.visible = known && fraction > 0.003;
    if (known) {
      const liquidHeight = TANK.height * fraction;
      liquid.scale.y = liquidHeight;
      liquid.position.y = TANK.bottom + liquidHeight / 2;
      waterSurface.position.y = TANK.bottom + liquidHeight + 0.009;
      waterEdge.position.y = TANK.bottom + liquidHeight + 0.015;
    }
    liquidPaint.color.set(active.online ? (showingThermal ? 0x8fb9c0 : 0x12acbb) : 0x90b5bf);
    // A translucent vessel liquid lets the internal scalar field and return
    // streamlines remain legible without changing the measured fill interval.
    liquidPaint.opacity = active.online ? (showingThermal ? 0.16 : 0.48) : 0.20;
    waterSurfacePaint.color.set(active.online ? 0x23c4ca : 0xb0cbd2);
    waterSurfacePaint.opacity = active.online ? (showingThermal ? 0.43 : 0.62) : 0.40;
    glassPaint.opacity = active.online ? (showingThermal ? 0.10 : 0.19) : 0.14;
    sensorLeds.forEach((led, index) => {
      const wet = active.mask !== null && (active.mask & (1 << index)) !== 0;
      setActuatorMaterial(led.material, active.online && wet, wet ? 0x779e98 : 0x8399a4, 0x28d3b0, 1.25);
    });
    setActuatorMaterial(ahtLed.material, active.online, 0x89a5ab, 0x39d8d2, 0.7);
    setActuatorMaterial(sideHeater.paint, active.heat, 0xe7e4d8, 0xf0bd86, 0.18);
    setActuatorMaterial(coolerPaint, active.cool, 0x829dae, 0x70c9e9, 0.15);
    setActuatorMaterial(coldSpreader, active.cool, 0x6d9fae, 0x39bde9, 0.42);
    setActuatorMaterial(hotSpreader, active.cool, 0xbb9574, 0xe18b5a, 0.23);
    setActuatorMaterial(pumpStatusPaint, active.pump, 0x70949e, 0x22d6d5, 0.7);
    setActuatorMaterial(motorPaint, active.pump, 0x1a607b, 0x168cad, 0.15);
    sideHeater.lamp.intensity = active.heat ? 0.80 : 0;
    coolerLamp.intensity = active.cool ? 1.1 : 0;
    coolingFan.setState({ online: active.online, cool: active.cool, reducedMotion });
    wiring.setState({ online: active.online });
    thermalEffects.setState({ online: active.online, known: thermalKnown, fill: currentFill,
      heat: state.heat === true, cool: state.cool === true,
      demo: state.demo === true, reducedMotion });
    fluidEffects.setState({ online: active.online, pump: active.pump, known, fill: currentFill,
      demo: state.demo === true, reducedMotion });
    dirty = true;
  }

  function animateEquipment(delta) {
    if (!reducedMotion && active.online) motionTime += delta;
    if (active.pump && !reducedMotion) {
      rotor.rotation.z -= delta * 5.6;
    }
    coolingFan.step(delta);
    thermalEffects.step(delta);
    fluidEffects.step(delta, motionTime);
  }

  function projectLabels() {
    if (typeof options.onLabels !== 'function') return;
    camera.updateMatrixWorld();
    options.onLabels(anchors.map((anchor) => {
      projected.copy(anchor.position).project(camera);
      return {
        id: anchor.id,
        x: (projected.x * 0.5 + 0.5) * width,
        y: (-projected.y * 0.5 + 0.5) * height,
        visible: width > 1 && height > 1 && projected.z >= -1 && projected.z <= 1
          && Math.abs(projected.x) <= 1.05 && Math.abs(projected.y) <= 1.05,
        active: anchor.maskBit ? active.online && active.mask !== null && (active.mask & anchor.maskBit) !== 0
          : Boolean(active[anchor.stateKey]),
      };
    }));
  }

  function markDirty() {
    dirty = true;
  }

  function renderFrame(now) {
    if (disposed) return;
    frameHandle = requestAnimationFrame(renderFrame);
    if (!pageVisible || !inViewport || now - lastFrame < frameInterval) return;
    const delta = Math.min(0.05, lastFrame ? (now - lastFrame) / 1000 : 0);
    lastFrame = now;
    const moved = controls.update();
    const animating = !reducedMotion && active.online
      && (waterSurface.visible || active.pump || active.heat || active.cool);
    if (!dirty && !moved && !animating) return;
    animateEquipment(delta);
    renderer.render(scene, camera);
    projectLabels();
    if (typeof options.onRenderInfo === 'function' && now - statsAt > 1000) {
      statsAt = now;
      options.onRenderInfo({ calls: renderer.info.render.calls, triangles: renderer.info.render.triangles, lowPower });
    }
    dirty = false;
  }

  function setReducedMotion(value) {
    reducedMotion = Boolean(value);
    controls.enableDamping = !reducedMotion;
    update(latestState);
    dirty = true;
  }

  function onVisibility() {
    pageVisible = !document.hidden;
    lastFrame = 0;
    dirty = true;
  }

  function onContextLost(event) {
    event.preventDefault();
    if (typeof options.onError === 'function') options.onError(new Error('3D 画面暂时不可用，请刷新页面恢复。'));
  }
  function onContextRestored() {
    resize();
    update(latestState);
  }

  const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
  resizeObserver?.observe(host);
  if (!resizeObserver) window.addEventListener('resize', resize);
  const intersectionObserver = typeof IntersectionObserver !== 'undefined'
    ? new IntersectionObserver(([entry]) => { inViewport = entry.isIntersecting; dirty = true; lastFrame = 0; }, { rootMargin: '100px' })
    : null;
  intersectionObserver?.observe(host);
  document.addEventListener('visibilitychange', onVisibility);
  renderer.domElement.addEventListener('webglcontextlost', onContextLost);
  renderer.domElement.addEventListener('webglcontextrestored', onContextRestored);
  resize();
  setDefaultCamera();
  update(options.state || {});
  frameHandle = requestAnimationFrame(renderFrame);

  return {
    update,
    resetView: setDefaultCamera,
    setReducedMotion,
    // Useful for a browser QA assertion; never displayed in the operator flow.
    getDiagnostics() {
      const thermal = thermalEffects.getDiagnostics();
      return { calls: renderer.info.render.calls, triangles: renderer.info.render.triangles, lowPower,
        active: { ...active }, reducedMotion, width, height,
        camera: { position: camera.position.toArray(), target: controls.target.toArray() },
        motion_time: motionTime, rotor_phase: rotor.rotation.z,
        thermal_visibility: { heat: thermal.conductionVisible,
          cold: thermal.absorptionVisible,
          hot: thermal.rejectionVisible },
        geometry: {
          heater: sideHeater.getDiagnostics(),
          support: { tank_floor_top_y: TANK.bottom, tank_floor_underside_y: tankFloorUnder,
            tank_floor_thickness: tankFloorThickness, heated: false },
          fan: coolingFan.getDiagnostics(),
          wiring: wiring.getDiagnostics(),
          peltier: { tank_radius: TANK.radius, shoe_contact_radius: contactRadius,
            radial_contact_gap: contactRadius - TANK.radius, flat_face_radius: contactFace,
            center_y: coldCenterY, height: contactHeight, layers: peltierLayers,
            bottom_y: contactBottomY, top_y: contactBottomY + contactHeight,
            low_liquid_surface_y: TANK.bottom + TANK.height * LEVEL_HEIGHT.get(4),
            low_submerged_height: Math.max(0, Math.min(contactHeight,
              TANK.bottom + TANK.height * LEVEL_HEIGHT.get(4) - contactBottomY)),
            sink_outer_radius: sinkInner + sinkDepth, cold_arrow_direction: 'liquid_to_cold_contact',
            hot_arrow_direction: 'fins_to_ambient' },
          pump: { center: pumpCenter.toArray(), common_axis: [0, 0, 1],
            chamber_inner_radius: chamberInner, rotor_swept_radius: 0.295,
            blade_outer_radius_max: Math.hypot(0.272, 0.104), radial_clearance: chamberInner - 0.295,
            rotor_z_bounds: [0.030, 0.120], chamber_z_bounds: [-0.200, 0.205],
            front_clearance: 0.205 - 0.120, rear_clearance: 0.030 - (-0.200),
            shaft_radius: 0.042, shaft_rear_bore_radius: 0.065, rear_bore_clearance: 0.065 - 0.042,
            shaft_z_bounds: [-1.16, 0.105], motor_z_bounds: [-1.20, -0.240],
            suction_neck_z_bounds: [0.225, 0.465], outlet_neck_y_bounds: [0.29, 0.47],
            suction_curve_end: inletCurve.getPoint(1).toArray(), outlet_curve_start: outletCurve.getPoint(0).toArray(),
            axial_inlet: true, tangential_outlet: true, shaft_hub_contact: 'intentional_driving_fit' },
          thermal_paths: { representation: 'xyz_volume_with_contact_heat_paths',
            liquid_circulation_lines: false, side_contact: true,
            conduction_contact: 'side_ceramic_plate', exhaust_starts_beyond_fan: true },
        },
        fill: currentFill, fluid: fluidEffects.getDiagnostics(), thermal };
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      cancelAnimationFrame(frameHandle);
      controls.removeEventListener('change', markDirty);
      controls.dispose();
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', onContextRestored);
      thermalEffects.dispose();
      resources.geometry.forEach((value) => value.dispose());
      resources.material.forEach((value) => value.dispose());
      environmentTarget?.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
