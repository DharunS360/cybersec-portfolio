import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Rotating 3D shield — defense symbol
function Shield() {
  const ref = useRef();

  // Create shield geometry from extruded shape
  const shieldGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 1.2);
    shape.lineTo(0.9, 0.9);
    shape.lineTo(0.9, -0.2);
    shape.lineTo(0, -1.2);
    shape.lineTo(-0.9, -0.2);
    shape.lineTo(-0.9, 0.9);
    shape.lineTo(0, 1.2);

    const extrudeSettings = {
      steps: 1,
      depth: 0.15,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 2,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = Math.sin(t * 0.3) * 0.3;
    ref.current.rotation.x = Math.sin(t * 0.2) * 0.05;
    ref.current.position.y = Math.sin(t * 0.5) * 0.1;
  });

  return (
    <group ref={ref} position={[0, 0, 0]}>
      {/* Outer shield wireframe */}
      <mesh geometry={shieldGeometry}>
        <meshBasicMaterial
          color="#00bfff"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Inner shield — solid-ish */}
      <mesh geometry={shieldGeometry} scale={0.85}>
        <meshBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Shield edges — glowing outline */}
      <mesh geometry={shieldGeometry}>
        <lineSegments>
          <edgesGeometry args={[shieldGeometry]} />
          <lineBasicMaterial color="#00bfff" linewidth={1} />
        </lineSegments>
      </mesh>
    </group>
  );
}

// Orbiting small nodes (threats being monitored)
function OrbitNode({ radius, speed, offset, color, size = 0.1 }) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + offset;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 2) * 0.3;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

// Orbiting ring
function OrbitRing({ radius, color, rotation }) {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <mesh ref={ref} rotation={[rotation || Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.005, radius + 0.005, 64]} />
      <meshBasicMaterial
        color={color}
        side={THREE.DoubleSide}
        transparent
        opacity={0.25}
      />
    </mesh>
  );
}

// Grid floor (SOC monitoring floor)
function GridFloor() {
  return (
    <gridHelper
      args={[10, 20, "#00bfff", "#003366"]}
      position={[0, -1.8, 0]}
      material-opacity={0.15}
      material-transparent
    />
  );
}

// Pulse rings expanding from shield
function PulseRings() {
  const refs = [useRef(), useRef(), useRef()];

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    refs.forEach((ref, i) => {
      if (!ref.current) return;
      const phase = (t * 0.5 + i / 3) % 1;
      const scale = 1 + phase * 2.5;
      ref.current.scale.set(scale, scale, scale);
      ref.current.material.opacity = (1 - phase) * 0.15;
    });
  });

  return (
    <>
      {refs.map((ref, i) => (
        <mesh
          key={i}
          ref={ref}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
        >
          <ringGeometry args={[1.5, 1.55, 64]} />
          <meshBasicMaterial
            color="#00bfff"
            side={THREE.DoubleSide}
            transparent
            opacity={0.15}
          />
        </mesh>
      ))}
    </>
  );
}

// Mouse-driven camera parallax
function CameraRig() {
  const { camera, mouse } = useThree();

  useFrame(() => {
    camera.position.x += (mouse.x * 0.4 - camera.position.x) * 0.04;
    camera.position.y += (0.3 + mouse.y * 0.3 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0.3, 5], fov: 50 }}
        dpr={0.8}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "default",
          stencil: false,
          depth: true,
        }}
      >
        <ambientLight intensity={0.5} />

        <Shield />
        <OrbitRing radius={2.2} color="#00bfff" rotation={Math.PI / 2.2} />
        <OrbitRing radius={2.6} color="#00d4ff" rotation={Math.PI / 1.8} />

        <OrbitNode radius={2.2} speed={0.5} offset={0} color="#00bfff" />
        <OrbitNode radius={2.2} speed={0.5} offset={2.1} color="#00d4ff" />
        <OrbitNode radius={2.2} speed={0.5} offset={4.2} color="#00ff9d" />

        <OrbitNode radius={2.6} speed={-0.4} offset={1} color="#00d4ff" size={0.08} />
        <OrbitNode radius={2.6} speed={-0.4} offset={3} color="#00ff9d" size={0.08} />

        <PulseRings />
        <GridFloor />

        <CameraRig />
      </Canvas>
    </div>
  );
}