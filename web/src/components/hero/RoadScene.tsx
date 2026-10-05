"use client";

import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { useCallback, useEffect, useImperativeHandle, useMemo, useRef, type ComponentProps, type RefObject } from "react";
import * as THREE from "three";
import type { Theme } from "@/lib/theme";
import type { SceneHandle } from "./HeroScene";

// A 3D line drawing: an ink car on an endless snowy road. Every mesh is an unlit paper-coloured
// fill with ink edge lines on top; the car is the only solid ink object. The world scrolls past
// the car, so nothing travels far from the origin.

// R3F 9 creates a THREE.Clock for its store, which three r183+ flags as deprecated on every
// Canvas mount. Drop that one warning until R3F moves to THREE.Timer (v10); pass the rest through.
THREE.setConsoleFunction((type: "log" | "warn" | "error", message: string, ...params: unknown[]) => {
  if (type === "warn" && message.startsWith("THREE.Clock:")) return;
  console[type](message, ...params);
});

const INK = "#2b63cc"; // --ink-base, the car blue
const SPEED = 7.5; // world units per second
const DASH_GAP = 2.8;
const GRAVITY = 24;
const HOP_VY = 7.2;
const CAM_BASE = new THREE.Vector3(10.5, 6.4, 13.5);
const CAM_TARGET = new THREE.Vector3(0.6, 0.9, 0);

// Deterministic pseudo-random for the initial layout; recycling later uses Math.random.
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function createMaterials() {
  const fill = () =>
    new THREE.MeshBasicMaterial({ polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 });
  return {
    paper: fill(),
    car: fill(),
    glass: fill(),
    wheel: fill(),
    line: new THREE.LineBasicMaterial(),
    faint: new THREE.LineBasicMaterial({ transparent: true, opacity: 0.35 }),
    carLine: new THREE.LineBasicMaterial(),
    wheelLine: new THREE.LineBasicMaterial(),
    lamp: new THREE.MeshBasicMaterial(),
    shadow: new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false }),
    beams: [0.12, 0.14, 0.18].map(
      (opacity) =>
        new THREE.MeshBasicMaterial({
          color: "#ffdf9a",
          transparent: true,
          opacity,
          depthWrite: false,
          side: THREE.DoubleSide,
        }),
    ),
    snow: new THREE.PointsMaterial({ size: 0.09, transparent: true, depthWrite: false }),
  };
}

type Materials = ReturnType<typeof createMaterials>;

// Day: ink on white. Night: navy paper, pale ink lines, a lighter car and warm lamps.
function applyTheme(m: Materials, scene: THREE.Scene, night: boolean) {
  const ink = new THREE.Color(INK);
  const paper = night ? ink.clone().lerp(new THREE.Color("#040913"), 0.84) : new THREE.Color("#ffffff");
  const line = night ? ink.clone().lerp(new THREE.Color("#ffffff"), 0.72) : ink.clone();
  const car = night ? ink.clone().lerp(new THREE.Color("#ffffff"), 0.22) : ink.clone();
  const carLine = night
    ? ink.clone().lerp(new THREE.Color("#ffffff"), 0.8)
    : ink.clone().lerp(new THREE.Color("#000814"), 0.45);

  scene.background = paper;
  if (scene.fog instanceof THREE.Fog) {
    scene.fog.color.copy(paper);
    scene.fog.near = night ? 10 : 16;
    scene.fog.far = night ? 44 : 62;
  }
  m.paper.color.copy(paper);
  m.line.color.copy(line);
  m.faint.color.copy(line);
  m.car.color.copy(car);
  m.carLine.color.copy(carLine);
  m.glass.color.copy(night ? paper.clone().lerp(line, 0.12) : paper);
  m.wheel.color.copy(night ? paper.clone().lerp(new THREE.Color("#000000"), 0.3) : carLine);
  m.wheelLine.color.copy(night ? line : paper);
  m.lamp.color.set(night ? "#ffe2a6" : "#ffffff");
  m.shadow.color.copy(night ? new THREE.Color("#000000") : ink);
  m.shadow.opacity = night ? 0.35 : 0.14;
  m.snow.color.copy(line);
  m.snow.opacity = night ? 0.8 : 0.5;
}

// A paper fill with ink edges on top.
function Outlined({
  geometry,
  edges,
  fill,
  line,
  threshold = 20,
  ...props
}: {
  geometry: THREE.BufferGeometry;
  edges?: THREE.BufferGeometry;
  fill: THREE.Material;
  line: THREE.LineBasicMaterial;
  threshold?: number;
} & Omit<ComponentProps<"group">, "children">) {
  const outline = useMemo(() => edges ?? new THREE.EdgesGeometry(geometry, threshold), [edges, geometry, threshold]);
  return (
    <group {...props}>
      <mesh geometry={geometry} material={fill} />
      <lineSegments geometry={outline} material={line} />
    </group>
  );
}

function segments(points: [number, number, number][]) {
  return new THREE.BufferGeometry().setFromPoints(points.map((p) => new THREE.Vector3(...p)));
}

function Road({ m, speed }: { m: Materials; speed: number }) {
  const dashes = useRef<THREE.LineSegments>(null);
  const tufts = useRef<THREE.LineSegments>(null);
  const geo = useMemo(() => {
    const rand = seeded(11);
    const dashPts: [number, number, number][] = [];
    for (let i = -34; i < 34; i++) dashPts.push([i * DASH_GAP, 0, 0], [i * DASH_GAP + 1.3, 0, 0]);
    // snow tufts on the shoulders: short hatch marks
    const tuftPts: [number, number, number][] = [];
    for (let i = 0; i < 220; i++) {
      const x = (rand() - 0.5) * 160;
      const z = (rand() < 0.5 ? -1 : 1) * (2.8 + rand() * 16);
      tuftPts.push([x, 0, z], [x + 0.35, 0, z + 0.12]);
    }
    return {
      edges: segments([
        [-90, 0, -1.7],
        [90, 0, -1.7],
        [-90, 0, 1.7],
        [90, 0, 1.7],
      ]),
      shoulders: segments([
        [-90, 0, -2.5],
        [90, 0, -2.5],
        [-90, 0, 2.5],
        [90, 0, 2.5],
      ]),
      dashes: segments(dashPts),
      tufts: segments(tuftPts),
    };
  }, []);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    if (!speed) return;
    if (dashes.current) dashes.current.position.x = (dashes.current.position.x - speed * dt) % DASH_GAP;
    if (tufts.current) {
      tufts.current.position.x -= speed * dt;
      if (tufts.current.position.x < -80) tufts.current.position.x += 80;
    }
  });

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} material={m.paper}>
        <planeGeometry args={[400, 400]} />
      </mesh>
      <lineSegments geometry={geo.edges} material={m.line} />
      <lineSegments geometry={geo.shoulders} material={m.faint} />
      <lineSegments ref={dashes} geometry={geo.dashes} material={m.line} />
      <lineSegments ref={tufts} geometry={geo.tufts} material={m.faint} />
    </>
  );
}

function Mountains({ m }: { m: Materials }) {
  const peaks = useMemo(() => {
    const rand = seeded(42);
    return Array.from({ length: 9 }, (_, i) => {
      const h = 7 + rand() * 9;
      const geometry = new THREE.ConeGeometry(9 + rand() * 9, h, 5 + Math.floor(rand() * 2));
      return {
        geometry,
        position: [-70 + i * 18 + rand() * 6, h / 2 - 0.2, -52 - rand() * 14] as [number, number, number],
        rotation: rand() * 3,
      };
    });
  }, []);
  return (
    <>
      {peaks.map((p, i) => (
        <Outlined
          key={i}
          geometry={p.geometry}
          fill={m.paper}
          line={m.faint}
          threshold={1}
          position={p.position}
          rotation={[0, p.rotation, 0]}
        />
      ))}
    </>
  );
}

// ~22% of trees stand on the near side at a smaller scale.
function treeSpot(x: number, rand: () => number) {
  const near = rand() < 0.22;
  return {
    position: [x, 0, near ? 3.6 + rand() * 3 : -(3.4 + rand() * 24)] as [number, number, number],
    scale: near ? 0.55 + rand() * 0.3 : 0.7 + rand() * 0.75,
    rotation: [0, rand() * 3, 0] as [number, number, number],
  };
}

function Forest({ m, speed }: { m: Materials; speed: number }) {
  const trees = useRef<(THREE.Group | null)[]>([]);
  const spots = useMemo(() => {
    const rand = seeded(7);
    return Array.from({ length: 46 }, () => treeSpot((rand() - 0.5) * 100, rand));
  }, []);
  const parts = useMemo(() => {
    const lower = new THREE.ConeGeometry(0.95, 1.9, 7).translate(0, 1.55, 0);
    const upper = new THREE.ConeGeometry(0.7, 1.5, 7).translate(0, 2.45, 0);
    const trunk = new THREE.CylinderGeometry(0.12, 0.14, 0.6, 6).translate(0, 0.3, 0);
    return [lower, upper, trunk].map((geometry) => ({ geometry, edges: new THREE.EdgesGeometry(geometry, 30) }));
  }, []);

  useFrame((_, delta) => {
    if (!speed) return;
    const dt = Math.min(delta, 0.05);
    for (const t of trees.current) {
      if (!t) continue;
      t.position.x -= speed * dt;
      if (t.position.x < -50) {
        // recycle it ahead of the car
        const spot = treeSpot(50 + Math.random() * 6, Math.random);
        t.position.set(...spot.position);
        t.scale.setScalar(spot.scale);
        t.rotation.set(...spot.rotation);
      }
    }
  });

  return (
    <>
      {spots.map((spot, i) => (
        <group key={i} ref={(el) => void (trees.current[i] = el)} {...spot}>
          {parts.map((p, k) => (
            <Outlined key={k} geometry={p.geometry} edges={p.edges} fill={m.paper} line={m.line} />
          ))}
        </group>
      ))}
    </>
  );
}

const WHEELS: [number, number][] = [
  [1.15, 0.86],
  [1.15, -0.86],
  [-1.15, 0.86],
  [-1.15, -0.86],
];

function Car({
  m,
  speed,
  night,
  handle,
}: {
  m: Materials;
  speed: number;
  night: boolean;
  handle?: RefObject<SceneHandle | null>;
}) {
  const body = useRef<THREE.Group>(null);
  const wheels = useRef<(THREE.Group | null)[]>([]);
  const shadow = useRef<THREE.Mesh>(null);
  const state = useRef({ y: 0, vy: 0, squash: 0, t: 0 });
  const invalidate = useThree((s) => s.invalidate);
  const gl = useThree((s) => s.gl);

  const geo = useMemo(() => {
    const wheel = new THREE.CylinderGeometry(0.43, 0.43, 0.32, 14).rotateX(Math.PI / 2);
    const beams = [
      [11, 2.6],
      [7, 1.7],
      [4, 1.1],
    ].map(([len, half]) => {
      const s = new THREE.Shape();
      s.moveTo(0, -0.45);
      s.lineTo(len, -half);
      s.lineTo(len, half);
      s.lineTo(0, 0.45);
      s.closePath();
      return new THREE.ShapeGeometry(s);
    });
    return {
      body: new THREE.BoxGeometry(3.5, 0.85, 1.75),
      hood: new THREE.BoxGeometry(0.9, 0.25, 1.7),
      cabin: new THREE.BoxGeometry(2.0, 0.78, 1.55),
      pillar: new THREE.BoxGeometry(0.16, 0.78, 1.57),
      roof: new THREE.BoxGeometry(2.1, 0.12, 1.6),
      bar: new THREE.EdgesGeometry(new THREE.BoxGeometry(1.7, 0.08, 0.08)),
      headlamp: new THREE.BoxGeometry(0.06, 0.2, 0.36),
      taillamp: new THREE.BoxGeometry(0.06, 0.18, 0.28),
      wheel,
      wheelEdges: new THREE.EdgesGeometry(wheel, 10),
      shadow: new THREE.CircleGeometry(1, 28),
      beams,
    };
  }, []);

  // Hop only from the ground; the road pass calls this through `handle`.
  const hop = useCallback(() => {
    const s = state.current;
    if (s.y > 0.001) return;
    s.vy = HOP_VY;
    invalidate();
  }, [invalidate]);
  useImperativeHandle(handle, () => ({ hop }), [hop]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const s = state.current;
    s.t += dt;
    if (speed) for (const w of wheels.current) if (w) w.rotation.z -= (speed * dt) / 0.43;

    // hop: launch, gravity, then a landing squash that recovers at 4/s
    if (s.vy !== 0 || s.y > 0) {
      s.vy -= GRAVITY * dt;
      s.y += s.vy * dt;
      if (s.y <= 0) {
        s.y = 0;
        s.vy = 0;
        s.squash = 1;
      }
    }
    s.squash = Math.max(0, s.squash - dt * 4);

    const bob = speed ? Math.sin(s.t * 13) * 0.025 : 0;
    if (body.current) {
      body.current.position.y = s.y + bob;
      body.current.rotation.z = s.y > 0 ? s.vy * 0.018 : 0;
      body.current.scale.set(1 + s.squash * 0.06, 1 - s.squash * 0.09, 1);
    }
    for (const w of wheels.current) if (w) w.position.y = 0.43 + s.y;
    const k = 1 / (1 + s.y * 0.35);
    shadow.current?.scale.set(2.3 * k, 1.15 * k, 1);

    // With on-demand rendering (reduced motion, or scrolled away), keep frames coming until the hop settles.
    if (s.vy !== 0 || s.y > 0 || s.squash > 0) invalidate();
  });

  const onDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    hop();
  };
  const setCursor = (c: string) => () => void (gl.domElement.style.cursor = c);

  return (
    <group>
      <group onPointerDown={onDown} onPointerOver={setCursor("pointer")} onPointerOut={setCursor("")}>
        <group ref={body}>
          <Outlined geometry={geo.body} fill={m.car} line={m.carLine} position={[0, 0.78, 0]} />
          <Outlined geometry={geo.hood} fill={m.car} line={m.carLine} position={[1.3, 1.24, 0]} />
          <Outlined geometry={geo.cabin} fill={m.glass} line={m.carLine} position={[-0.4, 1.6, 0]} />
          {[-1.32, 0.52].map((x) => (
            <Outlined key={x} geometry={geo.pillar} fill={m.car} line={m.carLine} position={[x, 1.6, 0]} />
          ))}
          <Outlined geometry={geo.roof} fill={m.car} line={m.carLine} position={[-0.4, 2.04, 0]} />
          {[-0.6, 0.6].map((z) => (
            <lineSegments key={z} geometry={geo.bar} material={m.carLine} position={[-0.4, 2.2, z]} />
          ))}
          {[-0.55, 0.55].map((z) => (
            <mesh key={z} geometry={geo.headlamp} material={m.lamp} position={[1.76, 0.88, z]} />
          ))}
          {[-0.6, 0.6].map((z) => (
            <mesh key={z} geometry={geo.taillamp} material={m.lamp} position={[-1.76, 0.95, z]} />
          ))}
        </group>
        {WHEELS.map(([x, z], i) => (
          <group key={i} ref={(el) => void (wheels.current[i] = el)} position={[x, 0.43, z]}>
            <mesh geometry={geo.wheel} material={m.wheel} />
            <lineSegments geometry={geo.wheelEdges} material={m.wheelLine} />
          </group>
        ))}
      </group>
      <mesh
        ref={shadow}
        geometry={geo.shadow}
        material={m.shadow}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.01, 0]}
        scale={[2.3, 1.15, 1]}
      />
      {/* headlight cones lying on the road ahead, night only */}
      <group visible={night}>
        {geo.beams.map((g, i) => (
          <mesh key={i} geometry={g} material={m.beams[i]} rotation={[-Math.PI / 2, 0, 0]} position={[1.8, 0.02, 0]} />
        ))}
      </group>
    </group>
  );
}

function Snow({ m, speed }: { m: Materials; speed: number }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const rand = seeded(99);
    const arr = new Float32Array(520 * 3);
    for (let i = 0; i < 520; i++) {
      arr[i * 3] = (rand() - 0.5) * 60;
      arr[i * 3 + 1] = rand() * 14;
      arr[i * 3 + 2] = (rand() - 0.6) * 40;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!speed || !points.current) return;
    const dt = Math.min(delta, 0.05);
    const attr = points.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const a = attr.array as Float32Array;
    for (let i = 0; i < a.length; i += 3) {
      a[i] -= speed * 0.35 * dt;
      a[i + 1] -= 0.9 * dt;
      if (a[i + 1] < 0) a[i + 1] += 14;
      if (a[i] < -30) a[i] += 60;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={points} material={m.snow}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
    </points>
  );
}

// FOV 30 from (10.5, 6.4, 13.5), pulled back on narrow screens so the car stays in frame.
function CameraRig() {
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return;
    const aspect = size.width / Math.max(1, size.height);
    camera.position.copy(CAM_BASE).multiplyScalar(Math.max(1, 1.5 / aspect));
    camera.lookAt(CAM_TARGET);
    camera.updateProjectionMatrix();
    invalidate();
  }, [camera, size, invalidate]);
  return null;
}

function World({
  theme,
  reduce,
  handle,
}: {
  theme: Theme;
  reduce: boolean;
  handle?: RefObject<SceneHandle | null>;
}) {
  const scene = useThree((s) => s.scene);
  const invalidate = useThree((s) => s.invalidate);
  const m = useMemo(() => createMaterials(), []);
  const night = theme === "dark";
  const speed = reduce ? 0 : SPEED;

  useEffect(() => {
    applyTheme(m, scene, night);
    invalidate();
  }, [m, scene, night, invalidate]);

  return (
    <>
      <fog attach="fog" args={["#ffffff", 16, 62]} />
      <CameraRig />
      <Road m={m} speed={speed} />
      <Mountains m={m} />
      <Forest m={m} speed={speed} />
      <Car m={m} speed={speed} night={night} handle={handle} />
      <Snow m={m} speed={speed} />
    </>
  );
}

export default function RoadScene({
  theme,
  active,
  reduce,
  handle,
  onReady,
}: {
  theme: Theme;
  active: boolean;
  reduce: boolean;
  handle?: RefObject<SceneHandle | null>;
  onReady?: () => void;
}) {
  return (
    <Canvas
      flat
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "demand"}
      camera={{ fov: 30, near: 0.1, far: 300, position: CAM_BASE.toArray() }}
      gl={{ antialias: true }}
      onCreated={() => onReady?.()}
      aria-hidden="true"
    >
      <World theme={theme} reduce={reduce} handle={handle} />
    </Canvas>
  );
}
