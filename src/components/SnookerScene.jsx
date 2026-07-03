import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const BALL_R = 0.18;
const RACK_X = 2.4;
const CUE_START = [-4.2, BALL_R, 0];

// snooker colour-ball spots (approx, decorative — not gameplay-accurate)
const COLOUR_BALLS = [
  { pos: [-2.6, BALL_R, 0], color: "#c9a13b" }, // brown
  { pos: [-1.4, BALL_R, 1.1], color: "#3aa143" }, // green
  { pos: [-1.4, BALL_R, -1.1], color: "#d9c94a" }, // yellow
  { pos: [0.2, BALL_R, 0], color: "#2f6fb0" }, // blue
  { pos: [3.6, BALL_R, 0], color: "#c85fa0" }, // pink
  { pos: [5.0, BALL_R, 0], color: "#1a1a1a" }, // black
];

function buildRack(seed) {
  // 5-row triangle of reds, apex pointing toward cue ball (negative x)
  const reds = [];
  const spacingX = BALL_R * 1.78;
  const spacingZ = BALL_R * 2.02;
  let rand = mulberry32(seed);
  for (let row = 0; row < 5; row++) {
    const count = row + 1;
    const x = RACK_X + row * spacingX;
    for (let i = 0; i < count; i++) {
      const z = (i - (count - 1) / 2) * spacingZ;
      const dir = new THREE.Vector3(x - RACK_X, 0, z).normalize();
      if (dir.lengthSq() === 0) dir.set(1, 0, 0);
      const dist = 2.6 + rand() * 3.4;
      const spread = (rand() - 0.5) * 3.2;
      reds.push({
        rack: [x, BALL_R, z],
        scattered: [
          RACK_X + dir.x * dist + (rand() - 0.5) * 0.6,
          BALL_R,
          z + dir.z * dist + spread,
        ],
        delay: row * 0.05 + rand() * 0.08,
      });
    }
  }
  return reds;
}

function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}
function clamp01(t) {
  return Math.min(1, Math.max(0, t));
}

export default function SnookerScene({ playToken, frozen }) {
  const reds = useMemo(() => buildRack(playToken), [playToken]);
  const cueRef = useRef();
  const cueStickRef = useRef();
  const redRefs = useRef([]);
  const groupRef = useRef();
  const startedAt = useRef(null);
  const frozenElapsed = useRef(0);

  useFrame(({ clock, camera }) => {
    if (startedAt.current === null) startedAt.current = clock.getElapsedTime();
    let t;
    if (frozen) {
      t = frozenElapsed.current;
    } else {
      t = clock.getElapsedTime() - startedAt.current;
      frozenElapsed.current = t;
    }

    // Camera: 0 -> 2.6s push in from wide/high to low broadcast angle
    const camT = easeInOutQuad(clamp01(t / 2.6));
    const from = new THREE.Vector3(-1, 6.5, 9.5);
    const to = new THREE.Vector3(-2.6, 1.1, 3.2);
    camera.position.lerpVectors(from, to, camT);
    const lookFrom = new THREE.Vector3(0.5, 0, 0);
    const lookTo = new THREE.Vector3(1.6, 0.1, 0);
    const look = new THREE.Vector3().lerpVectors(lookFrom, lookTo, camT);
    camera.lookAt(look);

    // Cue stick: swings in 2.2 -> 2.55, strikes at 2.55
    if (cueStickRef.current) {
      const swingT = clamp01((t - 2.1) / 0.45);
      const pull = Math.sin(swingT * Math.PI) * 0.9;
      cueStickRef.current.position.x = CUE_START[0] - 1.1 - pull * 0.5;
      cueStickRef.current.visible = t > 1.9 && t < 3.0;
    }

    // Cue ball: fires forward starting 2.55s, travels to rack, stops around 3.5s
    if (cueRef.current) {
      const fireT = easeOutCubic(clamp01((t - 2.55) / 0.9));
      const x = THREE.MathUtils.lerp(CUE_START[0], RACK_X - 0.55, fireT);
      cueRef.current.position.x = x;
      const wobble = Math.sin(t * 14) * 0.01 * (1 - fireT);
      cueRef.current.position.z = CUE_START[2] + wobble;
    }

    // Reds scatter starting ~3.45s (impact), staggered
    reds.forEach((r, i) => {
      const mesh = redRefs.current[i];
      if (!mesh) return;
      const localT = clamp01((t - 3.45 - r.delay) / 0.9);
      const e = easeOutCubic(localT);
      mesh.position.x = THREE.MathUtils.lerp(r.rack[0], r.scattered[0], e);
      mesh.position.z = THREE.MathUtils.lerp(r.rack[2], r.scattered[2], e);
      // subtle roll wobble
      mesh.rotation.z = e * 4 * (i % 2 === 0 ? 1 : -1);
    });
  });

  return (
    <group ref={groupRef}>
      {/* Table baize */}
      <mesh position={[1, -0.05, 0]} receiveShadow>
        <boxGeometry args={[13, 0.1, 6.2]} />
        <meshStandardMaterial color="#1B5C3C" roughness={0.85} />
      </mesh>
      {/* Cushions */}
      <mesh position={[1, 0.12, 3.25]}>
        <boxGeometry args={[13.4, 0.3, 0.3]} />
        <meshStandardMaterial color="#123F29" roughness={0.7} />
      </mesh>
      <mesh position={[1, 0.12, -3.25]}>
        <boxGeometry args={[13.4, 0.3, 0.3]} />
        <meshStandardMaterial color="#123F29" roughness={0.7} />
      </mesh>
      <mesh position={[-6.05, 0.12, 0]}>
        <boxGeometry args={[0.3, 0.3, 6.5]} />
        <meshStandardMaterial color="#123F29" roughness={0.7} />
      </mesh>
      <mesh position={[8.05, 0.12, 0]}>
        <boxGeometry args={[0.3, 0.3, 6.5]} />
        <meshStandardMaterial color="#123F29" roughness={0.7} />
      </mesh>
      {/* Wooden rail */}
      <mesh position={[1, -0.15, 0]}>
  <boxGeometry args={[14.2, 0.2, 7.2]} />
  <meshStandardMaterial color="#2a1912" roughness={0.6} />
</mesh>

      {/* Cue ball */}
      <mesh ref={cueRef} position={CUE_START} castShadow>
        <sphereGeometry args={[BALL_R, 24, 24]} />
        <meshStandardMaterial color="#EAE4D9" roughness={0.25} />
      </mesh>

      {/* Cue stick */}
      <mesh
        ref={cueStickRef}
        position={[CUE_START[0] - 1.6, BALL_R, CUE_START[2]]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry args={[0.03, 0.045, 3.2, 12]} />
        <meshStandardMaterial color="#c99a5b" roughness={0.4} />
      </mesh>

      {/* Reds */}
      {reds.map((r, i) => (
        <mesh
          key={i}
          ref={(el) => (redRefs.current[i] = el)}
          position={r.rack}
          castShadow
        >
          <sphereGeometry args={[BALL_R, 20, 20]} />
          <meshStandardMaterial color="#8c1f1f" roughness={0.3} />
        </mesh>
      ))}

      {/* Colour balls, static, decorative */}
      {COLOUR_BALLS.map((b, i) => (
        <mesh key={i} position={b.pos} castShadow>
          <sphereGeometry args={[BALL_R, 20, 20]} />
          <meshStandardMaterial color={b.color} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}
