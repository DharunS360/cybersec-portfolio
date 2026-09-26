import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// ============================================
// RADAR SHIELD — Realistic SOC Radar
// ============================================

function RadarShield() {
  const groupRef = useRef();
  const glowRef = useRef();
  const sweepRef = useRef();
  const blipRefs = useRef([]);
  const gridRef = useRef();

  // Shield outer geometry
  const shieldGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 1.5);
    shape.bezierCurveTo(0.5, 1.5, 1.05, 1.25, 1.15, 1.0);
    shape.lineTo(1.15, 0.1);
    shape.bezierCurveTo(1.15, -0.6, 0.8, -1.15, 0, -1.6);
    shape.bezierCurveTo(-0.8, -1.15, -1.15, -0.6, -1.15, 0.1);
    shape.lineTo(-1.15, 1.0);
    shape.bezierCurveTo(-1.05, 1.25, -0.5, 1.5, 0, 1.5);

    return new THREE.ExtrudeGeometry(shape, {
      steps: 2,
      depth: 0.3,
      bevelEnabled: true,
      bevelThickness: 0.06,
      bevelSize: 0.08,
      bevelSegments: 12,
    });
  }, []);

  // Inner recessed plate
  const innerPlateGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 1.2);
    shape.bezierCurveTo(0.4, 1.2, 0.85, 1.0, 0.9, 0.8);
    shape.lineTo(0.9, 0.1);
    shape.bezierCurveTo(0.9, -0.5, 0.6, -0.9, 0, -1.3);
    shape.bezierCurveTo(-0.6, -0.9, -0.9, -0.5, -0.9, 0.1);
    shape.lineTo(-0.9, 0.8);
    shape.bezierCurveTo(-0.85, 1.0, -0.4, 1.2, 0, 1.2);

    return new THREE.ExtrudeGeometry(shape, {
      steps: 1,
      depth: 0.08,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 8,
    });
  }, []);

  // Radar blips — random positions
  const blips = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 + Math.random() * 0.5;
      const radius = 0.2 + Math.random() * 0.7;
      arr.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        delay: Math.random() * 3,
        color: i % 3 === 0 ? "#ff3b3b" : i % 3 === 1 ? "#ffb700" : "#00ff9d",
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.25) * 0.4;
      groupRef.current.rotation.x = Math.sin(t * 0.18) * 0.1;
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.12;
    }
    if (glowRef.current) {
      const pulse = 1 + Math.sin(t * 2) * 0.06;
      glowRef.current.scale.set(pulse, pulse, pulse);
      glowRef.current.material.opacity = 0.08 + Math.sin(t * 2) * 0.03;
    }
    // Rotating radar sweep
    if (sweepRef.current) {
      sweepRef.current.rotation.z = -t * 0.8;
    }
    // Blips pulsing
    if (blipRefs.current) {
      blipRefs.current.forEach((blip, i) => {
        if (!blip) return;
        const b = blips[i];
        const pulse = 0.5 + Math.sin(t * 3 + b.delay) * 0.5;
        blip.material.opacity = pulse * 0.9;
        blip.scale.setScalar(0.7 + pulse * 0.5);
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* === MAIN SHIELD === */}
      <mesh geometry={shieldGeometry}>
        <meshPhysicalMaterial
          color="#0a2540"
          metalness={0.95}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={2}
          emissive="#001428"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* === INNER PLATE === */}
      <mesh geometry={innerPlateGeometry} position={[0, 0, 0.31]}>
        <meshPhysicalMaterial
          color="#0d3d6b"
          metalness={1}
          roughness={0.15}
          clearcoat={1}
          envMapIntensity={2.5}
          emissive="#002a4d"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* === RADAR DISPLAY === */}
      <group position={[0, 0, 0.42]}>
        {/* Grid lines — vertical + horizontal crosshair */}
        <mesh>
          <planeGeometry args={[1.7, 0.006]} />
          <meshBasicMaterial color="#00bfff" transparent opacity={0.5} toneMapped={false} />
        </mesh>
        <mesh>
          <planeGeometry args={[0.006, 1.7]} />
          <meshBasicMaterial color="#00bfff" transparent opacity={0.5} toneMapped={false} />
        </mesh>

        {/* Diagonal crosshair lines */}
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <planeGeometry args={[1.7, 0.004]} />
          <meshBasicMaterial color="#00bfff" transparent opacity={0.25} toneMapped={false} />
        </mesh>
        <mesh rotation={[0, 0, -Math.PI / 4]}>
          <planeGeometry args={[1.7, 0.004]} />
          <meshBasicMaterial color="#00bfff" transparent opacity={0.25} toneMapped={false} />
        </mesh>

        {/* Concentric circles (5 rings) */}
        {[0.25, 0.5, 0.75, 1.0, 1.2].map((radius, i) => (
          <mesh key={i}>
            <ringGeometry args={[radius - 0.006, radius, 64]} />
            <meshBasicMaterial
              color="#00bfff"
              transparent
              opacity={0.4 - i * 0.05}
              side={THREE.DoubleSide}
              toneMapped={false}
            />
          </mesh>
        ))}

        {/* Angle markers around outer ring */}
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const r = 1.2;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * r, Math.sin(angle) * r, 0]}
              rotation={[0, 0, angle + Math.PI / 2]}
            >
              <planeGeometry args={[0.04, 0.008]} />
              <meshBasicMaterial color="#00d4ff" transparent opacity={0.7} toneMapped={false} />
            </mesh>
          );
        })}

        {/* Rotating sweep — cone shape with gradient */}
        <group ref={sweepRef}>
          {/* Sweep line */}
          <mesh rotation={[0, 0, Math.PI / 2]} position={[0.6, 0, 0]}>
            <planeGeometry args={[1.2, 0.008]} />
            <meshBasicMaterial color="#00ffff" transparent opacity={0.9} toneMapped={false} />
          </mesh>

          {/* Sweep gradient trail — triangle fan */}
          <mesh>
            <circleGeometry args={[1.2, 32, 0, Math.PI / 3]} />
            <meshBasicMaterial
              color="#00ffff"
              transparent
              opacity={0.15}
              toneMapped={false}
            />
          </mesh>

          {/* Bright head dot */}
          <mesh position={[1.2, 0, 0.001]}>
            <circleGeometry args={[0.05, 16]} />
            <meshBasicMaterial color="#ffffff" toneMapped={false} />
          </mesh>
        </group>

        {/* Blips — target dots */}
        {blips.map((blip, i) => (
          <mesh
            key={i}
            ref={(el) => (blipRefs.current[i] = el)}
            position={[blip.x, blip.y, 0.002]}
          >
            <circleGeometry args={[0.05, 16]} />
            <meshBasicMaterial
              color={blip.color}
              transparent
              opacity={0.9}
              toneMapped={false}
            />
          </mesh>
        ))}

        {/* Center dot */}
        <mesh position={[0, 0, 0.003]}>
          <circleGeometry args={[0.04, 16]} />
          <meshBasicMaterial color="#ffffff" toneMapped={false} />
        </mesh>

        {/* Center ring */}
        <mesh>
          <ringGeometry args={[0.08, 0.1, 32]} />
          <meshBasicMaterial
            color="#00ff9d"
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* === SHIELD OUTER EDGE === */}
      <lineSegments geometry={new THREE.EdgesGeometry(shieldGeometry)}>
        <lineBasicMaterial color="#00d4ff" transparent opacity={0.9} />
      </lineSegments>

      {/* === OUTER GLOW === */}
      <mesh ref={glowRef} geometry={shieldGeometry} scale={1.08}>
        <meshBasicMaterial
          color="#00bfff"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

// ============================================
// ORBITING NODES
// ============================================

function OrbitNode({ radius, speed, offset, color, size = 0.05 }) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + offset;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 2) * 0.4;
  });

  return (
    <>
      <mesh ref={ref}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <pointLight color={color} intensity={0.8} distance={2} />
    </>
  );
}

// ============================================
// ORBIT RINGS
// ============================================

function OrbitRing({ radius, color, rotation, opacity = 0.3 }) {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <mesh ref={ref} rotation={rotation || [Math.PI / 2.2, 0, 0]}>
      <ringGeometry args={[radius - 0.003, radius + 0.003, 128]} />
      <meshBasicMaterial
        color={color}
        side={THREE.DoubleSide}
        transparent
        opacity={opacity}
        toneMapped={false}
      />
    </mesh>
  );
}

// ============================================
// PULSE RINGS
// ============================================

function PulseRings() {
  const refs = [useRef(), useRef(), useRef(), useRef()];

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    refs.forEach((ref, i) => {
      if (!ref.current) return;
      const phase = (t * 0.35 + i / 4) % 1;
      const scale = 1 + phase * 1.8;
      ref.current.scale.set(scale, scale, 1);
      ref.current.material.opacity = (1 - phase) * 0.3;
    });
  });

  return (
    <>
      {refs.map((ref, i) => (
        <mesh key={i} ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <ringGeometry args={[2.0, 2.05, 64]} />
          <meshBasicMaterial
            color="#00d4ff"
            side={THREE.DoubleSide}
            transparent
            opacity={0.3}
            toneMapped={false}
          />
        </mesh>
      ))}
    </>
  );
}

// ============================================
// STAR FIELD
// ============================================

function StarField() {
  const starsRef = useRef();

  const stars = useMemo(() => {
    const positions = [];
    const colors = [];
    for (let i = 0; i < 400; i++) {
      const r = 10 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
      const c = Math.random();
      if (c > 0.9) colors.push(0.6, 0.8, 1);
      else if (c > 0.8) colors.push(1, 0.9, 0.7);
      else colors.push(1, 1, 1);
    }
    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(colors),
    };
  }, []);

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.008;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={stars.positions}
          count={stars.positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={stars.colors}
          count={stars.colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        toneMapped={false}
      />
    </points>
  );
}

// ============================================
// CAMERA RIG
// ============================================

function CameraRig() {
  const { camera, mouse } = useThree();

  useFrame(() => {
    camera.position.x += (mouse.x * 0.6 - camera.position.x) * 0.03;
    camera.position.y += (0.3 + mouse.y * 0.4 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ============================================
// MAIN
// ============================================

export default function Hero3D() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0.3, 5.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <directionalLight position={[-5, -3, -5]} intensity={0.8} color="#00bfff" />
        <pointLight position={[0, 0, 4]} intensity={1.5} color="#00d4ff" />
        <pointLight position={[3, -2, -3]} intensity={0.8} color="#a855f7" />

        <Environment preset="night" background={false} />

        <RadarShield />

        <OrbitRing radius={2.6} color="#00bfff" opacity={0.25} />
        <OrbitRing radius={3.0} color="#00d4ff" rotation={[Math.PI / 1.8, 0.3, 0]} opacity={0.2} />

        <OrbitNode radius={2.6} speed={0.35} offset={0} color="#00bfff" size={0.06} />
        <OrbitNode radius={2.6} speed={0.35} offset={2.1} color="#00d4ff" size={0.05} />
        <OrbitNode radius={2.6} speed={0.35} offset={4.2} color="#00ff9d" size={0.04} />

        <PulseRings />
        <StarField />

        <EffectComposer>
          <Bloom
            intensity={1.2}
            luminanceThreshold={0.4}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>

        <CameraRig />
      </Canvas>
    </div>
  );
}