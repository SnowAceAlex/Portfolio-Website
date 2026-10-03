"use client";

import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { Theme } from "@/lib/theme";

// A small diorama: a toy car drives along an endless snowy road.
// The world scrolls past the car, so nothing travels far from the origin.

const SPEED = 3.2; // world units per second
const TREE_SPAN = 40; // trees wrap across [-20, 20] on x
const DASH_SPAN = 36;
const MOUNTAIN_SPAN = 72;

const palettes = {
  light: {
    sky: "#e3e8ee",
    ground: "#f4f6f9",
    road: "#c9d0d9",
    dash: "#fafbfc",
    pine: "#6c8a8a",
    pineDark: "#58736f",
    trunk: "#7a6a5c",
    snowCap: "#fafbfc",
    mountain: "#d3dbe4",
    car: "#2b63cc",
    glass: "#2a3546",
    tyre: "#20252d",
    headlight: "#fff4d6",
    taillight: "#d9654a",
    flake: "#9fb0c3",
    hemiSky: "#ffffff",
    hemiGround: "#c4ceda",
    hemiIntensity: 1.6,
    sunIntensity: 1.5,
    beam: 0,
  },
  dark: {
    sky: "#111722",
    ground: "#1a212d",
    road: "#262e3b",
    dash: "#8d97a5",
    pine: "#33484d",
    pineDark: "#2a3c40",
    trunk: "#2f2925",
    snowCap: "#aab6c4",
    mountain: "#1c2430",
    car: "#83a9f2",
    glass: "#0b0f15",
    tyre: "#0d1015",
    headlight: "#fff1c9",
    taillight: "#ff6a4d",
    flake: "#e7ebf0",
    hemiSky: "#8193b3",
    hemiGround: "#0b0e13",
    hemiIntensity: 0.9,
    sunIntensity: 0.55,
    beam: 28,
  },
} as const;

type Palette = (typeof palettes)[Theme];

// Deterministic pseudo-random so server and client never disagree and layouts stay stable.
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

type TreeSpec = { x: number; z: number; scale: number; dark: boolean };

function useTrees(): TreeSpec[] {
  return useMemo(() => {
    const rand = seeded(7);
    const trees: TreeSpec[] = [];
    for (let i = 0; i < 38; i++) {
      trees.push({
        x: -20 + rand() * TREE_SPAN,
        z: -2.4 - rand() * 8,
        scale: 0.7 + rand() * 0.7,
        dark: rand() > 0.5,
      });
    }
    for (let i = 0; i < 6; i++) {
      trees.push({
        x: -20 + rand() * TREE_SPAN,
        z: 2.6 + rand() * 1.2,
        scale: 0.45 + rand() * 0.25,
        dark: rand() > 0.5,
      });
    }
    return trees;
  }, []);
}

function Pine({ spec, p }: { spec: TreeSpec; p: Palette }) {
  const body = spec.dark ? p.pineDark : p.pine;
  return (
    <>
      <mesh position={[0, 0.18, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.09, 0.36, 6]} />
        <meshStandardMaterial color={p.trunk} roughness={1} />
      </mesh>
      <mesh position={[0, 0.75, 0]} castShadow>
        <coneGeometry args={[0.52, 0.95, 7]} />
        <meshStandardMaterial color={body} roughness={0.95} flatShading />
      </mesh>
      <mesh position={[0, 1.22, 0]} castShadow>
        <coneGeometry args={[0.38, 0.75, 7]} />
        <meshStandardMaterial color={body} roughness={0.95} flatShading />
      </mesh>
      <mesh position={[0, 1.52, 0]}>
        <coneGeometry args={[0.2, 0.34, 7]} />
        <meshStandardMaterial color={p.snowCap} roughness={0.8} flatShading />
      </mesh>
    </>
  );
}

function Forest({ p, speed }: { p: Palette; speed: number }) {
  const trees = useTrees();
  const refs = useRef<(THREE.Group | null)[]>([]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    for (const g of refs.current) {
      if (!g) continue;
      g.position.x -= speed * dt;
      if (g.position.x < -TREE_SPAN / 2) g.position.x += TREE_SPAN;
    }
  });

  return (
    <>
      {trees.map((spec, i) => (
        <group
          key={i}
          ref={(el) => void (refs.current[i] = el)}
          position={[spec.x, 0, spec.z]}
          scale={spec.scale}
        >
          <Pine spec={spec} p={p} />
        </group>
      ))}
    </>
  );
}

function Mountains({ p, speed }: { p: Palette; speed: number }) {
  const group = useRef<THREE.Group>(null);
  const peaks = useMemo(() => {
    const rand = seeded(42);
    return Array.from({ length: 9 }, (_, i) => ({
      x: -MOUNTAIN_SPAN / 2 + i * (MOUNTAIN_SPAN / 9) + rand() * 4,
      z: -16 - rand() * 4,
      h: 3 + rand() * 3.5,
      r: 3.5 + rand() * 2.5,
    }));
  }, []);

  useFrame((_, delta) => {
    if (!group.current) return;
    const dt = Math.min(delta, 0.05);
    // Distant peaks drift slower than the road to give depth.
    for (const child of group.current.children) {
      child.position.x -= speed * 0.12 * dt;
      if (child.position.x < -MOUNTAIN_SPAN / 2) child.position.x += MOUNTAIN_SPAN;
    }
  });

  return (
    <group ref={group}>
      {peaks.map((m, i) => (
        <mesh key={i} position={[m.x, m.h / 2 - 0.05, m.z]}>
          <coneGeometry args={[m.r, m.h, 5]} />
          <meshStandardMaterial color={p.mountain} roughness={1} flatShading />
        </mesh>
      ))}
    </group>
  );
}

function Road({ p, speed }: { p: Palette; speed: number }) {
  const dashes = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!dashes.current) return;
    const dt = Math.min(delta, 0.05);
    for (const d of dashes.current.children) {
      d.position.x -= speed * dt;
      if (d.position.x < -DASH_SPAN / 2) d.position.x += DASH_SPAN;
    }
  });

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[120, 60]} />
        <meshStandardMaterial color={p.ground} roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[120, 2.6]} />
        <meshStandardMaterial color={p.road} roughness={0.9} />
      </mesh>
      <group ref={dashes}>
        {Array.from({ length: 18 }, (_, i) => (
          <mesh key={i} position={[-DASH_SPAN / 2 + i * 2, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.9, 0.08]} />
            <meshBasicMaterial color={p.dash} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Car({ p, speed, theme }: { p: Palette; speed: number; theme: Theme }) {
  const root = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const wheels = useRef<(THREE.Mesh | null)[]>([]);
  const hop = useRef({ y: 0, v: 0 });
  const beamTarget = useMemo(() => {
    const o = new THREE.Object3D();
    o.position.set(6, 0, 0);
    return o;
  }, []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    const h = hop.current;
    if (h.y > 0 || h.v > 0) {
      h.v -= 14 * dt;
      h.y = Math.max(0, h.y + h.v * dt);
      if (h.y === 0) h.v = 0;
    }
    if (root.current) {
      root.current.position.y = h.y;
      root.current.position.z = 0.55 + Math.sin(t * 0.6) * 0.06 * Math.sign(speed);
      root.current.rotation.z = h.v * 0.025;
    }
    if (body.current && speed > 0) {
      body.current.position.y = Math.sin(t * 11) * 0.012;
      body.current.rotation.z = Math.sin(t * 5.5) * 0.008;
    }
    for (const w of wheels.current) if (w) w.rotation.y -= (speed * dt) / 0.2;
  });

  const onHop = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (hop.current.y === 0) hop.current.v = 4.2;
  };

  const wheelPositions: [number, number, number][] = [
    [0.55, 0.2, 0.44],
    [0.55, 0.2, -0.44],
    [-0.58, 0.2, 0.44],
    [-0.58, 0.2, -0.44],
  ];

  return (
    <group
      ref={root}
      position={[0, 0, 0.55]}
      onClick={onHop}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "")}
    >
      <group ref={body}>
        <RoundedBox args={[1.8, 0.42, 0.9]} radius={0.13} smoothness={4} position={[0, 0.43, 0]} castShadow>
          <meshStandardMaterial color={p.car} roughness={0.45} metalness={0.1} />
        </RoundedBox>
        <RoundedBox args={[0.98, 0.4, 0.8]} radius={0.12} smoothness={4} position={[-0.16, 0.78, 0]} castShadow>
          <meshStandardMaterial color={p.glass} roughness={0.2} metalness={0.3} />
        </RoundedBox>
        <RoundedBox args={[0.86, 0.07, 0.82]} radius={0.03} smoothness={2} position={[-0.18, 0.99, 0]}>
          <meshStandardMaterial color={p.car} roughness={0.45} />
        </RoundedBox>
        {/* Roof rack with a little snowboard, the road-trip detail */}
        <mesh position={[-0.18, 1.07, 0]} castShadow>
          <boxGeometry args={[0.95, 0.05, 0.22]} />
          <meshStandardMaterial color={p.snowCap} roughness={0.6} />
        </mesh>
        {[0.27, -0.27].map((z) => (
          <mesh key={`h${z}`} position={[0.9, 0.47, z]}>
            <boxGeometry args={[0.03, 0.09, 0.16]} />
            <meshStandardMaterial color={p.headlight} emissive={p.headlight} emissiveIntensity={theme === "dark" ? 3 : 0.4} />
          </mesh>
        ))}
        {[0.3, -0.3].map((z) => (
          <mesh key={`t${z}`} position={[-0.9, 0.5, z]}>
            <boxGeometry args={[0.03, 0.07, 0.14]} />
            <meshStandardMaterial color={p.taillight} emissive={p.taillight} emissiveIntensity={theme === "dark" ? 2 : 0.3} />
          </mesh>
        ))}
      </group>
      {wheelPositions.map((pos, i) => (
        <mesh
          key={i}
          ref={(el) => void (wheels.current[i] = el)}
          position={pos}
          rotation={[Math.PI / 2, 0, 0]}
          castShadow
        >
          <cylinderGeometry args={[0.2, 0.2, 0.16, 18]} />
          <meshStandardMaterial color={p.tyre} roughness={0.9} />
        </mesh>
      ))}
      <primitive object={beamTarget} />
      {p.beam > 0 && (
        <spotLight
          position={[0.95, 0.5, 0]}
          target={beamTarget}
          color={p.headlight}
          intensity={p.beam}
          distance={11}
          angle={0.42}
          penumbra={0.7}
          decay={1.6}
          castShadow={false}
        />
      )}
    </group>
  );
}

function makeFlakeTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.45, "rgba(255,255,255,0.75)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

function Snowfall({ p, speed, falling }: { p: Palette; speed: number; falling: boolean }) {
  const COUNT = 700;
  const points = useRef<THREE.Points>(null);
  const texture = useMemo(() => makeFlakeTexture(), []);
  const { positions, fall } = useMemo(() => {
    const rand = seeded(99);
    const positions = new Float32Array(COUNT * 3);
    const fall = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = -14 + rand() * 28;
      positions[i * 3 + 1] = rand() * 8;
      positions[i * 3 + 2] = -10 + rand() * 16;
      fall[i] = 0.35 + rand() * 0.6;
    }
    return { positions, fall };
  }, []);

  useFrame((state, delta) => {
    if (!points.current || !falling) return;
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    const attr = points.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      const ix = i * 3;
      arr[ix] -= (speed * 0.35 + Math.sin(t + i) * 0.15) * dt;
      arr[ix + 1] -= fall[i] * dt;
      if (arr[ix + 1] < 0) arr[ix + 1] += 8;
      if (arr[ix] < -14) arr[ix] += 28;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        color={p.flake}
        size={0.075}
        sizeAttenuation
        transparent
        depthWrite={false}
        opacity={0.9}
      />
    </points>
  );
}

function CameraRig() {
  const target = useMemo(() => new THREE.Vector3(0.9, 0.55, 0), []);
  useFrame((state, delta) => {
    const k = 1 - Math.exp(-delta * 2.5);
    const cam = state.camera;
    cam.position.x += (-1.4 + state.pointer.x * 0.7 - cam.position.x) * k;
    cam.position.y += (2.5 + state.pointer.y * 0.35 - cam.position.y) * k;
    cam.lookAt(target);
  });
  return null;
}

export default function RoadScene({
  theme,
  active,
  reduce,
  onReady,
}: {
  theme: Theme;
  active: boolean;
  reduce: boolean;
  onReady?: () => void;
}) {
  const p = palettes[theme];
  const speed = reduce ? 0 : SPEED;

  return (
    <Canvas
      flat
      shadows
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "demand"}
      camera={{ position: [-1.4, 2.5, 8.4], fov: 34, near: 0.1, far: 80 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ camera }) => {
        camera.lookAt(0.9, 0.55, 0);
        onReady?.();
      }}
      aria-hidden="true"
    >
      <color attach="background" args={[p.sky]} />
      <fog attach="fog" args={[p.sky, 9, 30]} />
      <hemisphereLight args={[p.hemiSky, p.hemiGround, p.hemiIntensity]} />
      <directionalLight
        position={[4, 9, 6]}
        intensity={p.sunIntensity}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-bias={-0.0005}
      />
      <Mountains p={p} speed={speed} />
      <Road p={p} speed={speed} />
      <Forest p={p} speed={speed} />
      <Car p={p} speed={speed} theme={theme} />
      <Snowfall p={p} speed={speed} falling={!reduce} />
      {!reduce && <CameraRig />}
    </Canvas>
  );
}
