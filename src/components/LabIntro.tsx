/* eslint-disable react/no-unknown-property */
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';

function LabInner() {
  const orbitGroupRef = useRef<THREE.Group>(null);
  const primedAxesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const omega = 0.5; // Orbital angular velocity
    
    // Lab orbits: position moves along circle
    if (orbitGroupRef.current) {
      orbitGroupRef.current.position.set(2.9 * Math.cos(omega * t), 2.9 * Math.sin(omega * t), 0);
    }
    
    // Primed axes rotate to maintain x' radially outward
    if (primedAxesRef.current) {
      primedAxesRef.current.rotation.z = omega * t;
    }
  });

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} />
      
      {/* Earth */}
      <mesh>
        <sphereGeometry args={[1.0, 32, 32]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>

      {/* Orbit path */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.8, 3.0, 64]} />
        <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} opacity={0.2} transparent />
      </mesh>

      {/* Orbiting Lab Group */}
      <group ref={orbitGroupRef}>
        <group ref={primedAxesRef}>
          {/* Lab Body */}
          <mesh>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color="#00f0ff" />
          </mesh>

          {/* Axes Visualization */}
          <group>
            {/* x' axis (Radial, Red) */}
            <mesh position={[0.6, 0, 0]}>
              <cylinderGeometry args={[0.04, 0.04, 0.8]} />
              <meshBasicMaterial color="red" />
            </mesh>
            {/* y' axis (Tangential, Green) */}
            <mesh position={[0, 0.6, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.04, 0.04, 0.8]} />
              <meshBasicMaterial color="green" />
            </mesh>
          </group>
        </group>
      </group>
    </>
  );
}

export default function LabIntroContainer() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div className="relative h-96">
      <div className="absolute top-2 left-2 bg-gray-900/80 p-2 rounded text-[10px] text-white z-10">
        <p>Blue: Earth | Cyan: Lab</p>
        <p className="text-red-400">Red: x&apos; (Radial)</p>
        <p className="text-green-400">Green: y&apos; (Tangential)</p>
      </div>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <LabInner />
      </Canvas>
    </div>
  );
}
