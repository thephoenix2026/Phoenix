"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Robot() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main Body */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2, 1.2, 1.4]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Body accent stripe */}
      <mesh position={[0, 0.5, 0.71]}>
        <boxGeometry args={[1.8, 0.1, 0.01]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.5} />
      </mesh>

      {/* Head/Sensor Array */}
      <mesh position={[0, 1.4, 0]}>
        <boxGeometry args={[1.2, 0.5, 0.9]} />
        <meshStandardMaterial color="#2a2a3e" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Left Camera (Thermal - Red) */}
      <mesh position={[-0.3, 1.4, 0.46]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.15, 16]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.3} />
      </mesh>

      {/* Right Camera (RGB - Cyan) */}
      <mesh position={[0.3, 1.4, 0.46]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.15, 16]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.3} />
      </mesh>

      {/* Antenna */}
      <mesh position={[0, 1.85, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>
      <mesh position={[0, 2.1, 0]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={1} />
      </mesh>

      {/* Wheels */}
      {[[-0.8, -0.2, 0.7], [0.8, -0.2, 0.7], [-0.8, -0.2, -0.7], [0.8, -0.2, -0.7]].map(
        (pos, i) => (
          <mesh
            key={i}
            position={pos as [number, number, number]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.2, 0.2, 0.15, 16]} />
            <meshStandardMaterial color="#333" metalness={0.5} roughness={0.7} />
          </mesh>
        )
      )}

      {/* Arm */}
      <group position={[1.1, 0.3, 0]}>
        <mesh>
          <boxGeometry args={[0.15, 0.6, 0.15]} />
          <meshStandardMaterial color="#2a2a3e" metalness={0.7} roughness={0.3} />
        </mesh>
        <group position={[0, -0.35, 0]}>
          <mesh>
            <boxGeometry args={[0.12, 0.4, 0.12]} />
            <meshStandardMaterial color="#1a1a2e" metalness={0.7} roughness={0.3} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

export default function RobotViewer() {
  return (
    <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-xl overflow-hidden border border-[#2a2a3e] bg-[#0a0a0f]">
      <Canvas camera={{ position: [4, 3, 4], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-3, 3, -3]} intensity={0.3} color="#00d4ff" />
        <Robot />
        <OrbitControls enableZoom={true} enablePan={true} autoRotate={false} />
      </Canvas>
    </div>
  );
}
