/* eslint-disable react/no-unknown-property */
import { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Rocket3D = ({
  tau,
  gamma,
  massRatio,
}: {
  tau: number;
  gamma: number;
  massRatio: number;
}) => {
  const shipRef = useRef<THREE.Group>(null);
  const beaconMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const exhaustRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    // Length contraction: The ship visually compresses in the direction of travel (X axis) by 1/gamma
    if (shipRef.current) {
      shipRef.current.scale.set(1 / gamma, 1, 1);
    }

    // Time Dilation: The beacon pulses based on proper time (tau).
    if (beaconMatRef.current) {
      beaconMatRef.current.opacity = Math.pow(Math.sin(tau * 10), 2);
    }

    if (exhaustRef.current) {
      // Pulse exhaust slightly so it feels alive
      const time = state.clock.getElapsedTime();
      const flicker = 1 + Math.sin(time * 40) * 0.1;

      const exhaustLen = massRatio * 2.5 * flicker;
      const exhaustWidth = massRatio * 0.4 * flicker;

      exhaustRef.current.scale.set(exhaustLen, exhaustWidth, exhaustWidth);

      // Calculate the uncontracted rear of the ship, then apply contraction
      const rearX = -1.5 / gamma;
      exhaustRef.current.position.set(rearX - exhaustLen / 2, 0, 0);
    }
  });

  return (
    <group>
      {/* Ship Frame (Subject to Length Contraction) */}
      <group ref={shipRef}>
        {/* Sleek White Hull */}
        <mesh position={[0.2, 0, 0]} scale={[1.3, 0.3, 0.3]}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.4}
            roughness={0.2}
          />
        </mesh>

        {/* Internal Core Housing - dark housing for the energy core */}
        <mesh
          position={[-1.1, 0, 0]}
          scale={[0.25, 0.4, 0.25]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[1, 1, 1, 32]} />
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.8}
            roughness={0.5}
          />
        </mesh>

        {/* Energy Core representing Mass (M/M0) 
            Integrated into the back of the oval ship, before the exhaust */}
        <mesh
          position={[-1.2, 0, 0]}
          scale={[0.3 * massRatio, 0.3 * massRatio, 0.3 * massRatio]}
        >
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial
            color="#00f0ff"
            transparent
            opacity={0.9}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Pulsing Beacon (Time Dilation Clock) */}
        <mesh position={[0.2, 0.3, 0]} scale={[0.1, 0.05, 0.05]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial ref={beaconMatRef} color="#ff0044" transparent />
        </mesh>
      </group>

      {/* Photon Exhaust (Length & Width directly proportional to remaining Mass / Thrust) */}
      <mesh ref={exhaustRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

const MovingStars = ({ v, gamma }: { v: number; gamma: number }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 1000;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const [stars] = useState(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 60,
        y: (Math.random() - 0.5) * 40,
        z: (Math.random() - 0.5) * 40 - 10,
        size: Math.random() * 0.05 + 0.01,
      });
    }
    return temp;
  });

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    stars.forEach((star, i) => {
      // Starfield moves at exactly the rocket's velocity v
      // Map c=1 to 30 units/sec visually
      star.x -= v * delta * 30;
      if (star.x < -30) star.x += 60;

      dummy.position.set(star.x, star.y, star.z);

      // Relativistic Aberration & Motion Blur (Streaking)
      // Stars elongate proportionally to v and gamma
      const stretch = 1 + v * gamma * 8;
      dummy.scale.set(stretch * star.size, star.size * 0.2, star.size * 0.2);

      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
    </instancedMesh>
  );
};

const RelativisticRocket = () => {
  // We drive the animation linearly via Earth Time (t), simulating an Earth Observer
  const [currentT, setCurrentT] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>();

  const maxTau = 4;
  const maxT = Math.sinh(maxTau); // ~27.28 years in Earth frame
  const durationMs = 15000; // Complete the 27.28 Earth-year journey in 15 real-time seconds

  const currentTRef = useRef(currentT);

  useEffect(() => {
    currentTRef.current = currentT;
  }, [currentT]);

  useEffect(() => {
    const animate = (time: number) => {
      if (startTimeRef.current === undefined) {
        startTimeRef.current = time - (currentTRef.current / maxT) * durationMs;
      }
      const elapsed = time - startTimeRef.current;
      let nextT = (elapsed / durationMs) * maxT;

      if (nextT >= maxT) {
        nextT = maxT;
        setIsPlaying(false);
      }

      setCurrentT(nextT);

      if (nextT < maxT) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    if (isPlaying) {
      startTimeRef.current = undefined;
      requestRef.current = requestAnimationFrame(animate);
    } else if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, maxT, durationMs]);

  // Mathematical Derivations from Earth Time (t)
  const tau = Math.asinh(currentT); // Proper Time
  const v = Math.tanh(tau); // Velocity (c=1)
  const gamma = Math.cosh(tau); // Lorentz Factor
  const massRatio = Math.exp(-tau); // Mass remaining

  return (
    <div className="my-8 border border-gray-800 bg-black shadow-2xl font-sans rounded-sm text-gray-200">
      {/* Header and Controls */}
      <div className="p-6 pb-0 flex flex-col md:flex-row items-start md:items-end justify-between">
        <div>
          <h3 className="text-xl tracking-widest text-white uppercase font-light">
            Photon Rocket
          </h3>
          <p className="text-xs tracking-[0.2em] text-[#00f0ff] mt-1 uppercase opacity-80">
            Earth Observer Frame
          </p>
        </div>

        <div className="flex gap-4 mt-4 md:mt-0">
          <button
            onClick={() => {
              if (currentT >= maxT) {
                setCurrentT(0);
                setIsPlaying(true);
              } else setIsPlaying(!isPlaying);
            }}
            className="border border-gray-700 text-gray-300 hover:bg-gray-900 hover:text-white px-6 py-2 text-xs uppercase tracking-widest transition-colors"
          >
            {isPlaying ? 'Pause' : currentT >= maxT ? 'Restart' : 'Engage'}
          </button>
          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentT(0);
            }}
            className="text-gray-500 hover:text-white px-2 py-2 text-xs uppercase tracking-widest transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="relative h-64 mt-6 border-y border-gray-900">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 40 }}
          style={{ background: '#000000' }}
        >
          <ambientLight intensity={1} />
          <directionalLight
            position={[5, 10, 10]}
            intensity={3}
            color="#ffffff"
          />
          <directionalLight
            position={[-5, -10, -10]}
            intensity={1}
            color="#3b82f6"
          />
          <MovingStars v={v} gamma={gamma} />
          <Rocket3D tau={tau} gamma={gamma} massRatio={massRatio} />
        </Canvas>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-6 border-b border-gray-900 bg-[#050505]">
        <Stat label="Earth Time (t)" value={currentT.toFixed(2)} unit="yr" />
        <Stat label="Proper Time (τ)" value={tau.toFixed(2)} unit="yr" />
        <Stat label="Velocity (v)" value={(v * 100).toFixed(1)} unit="% c" />
        <Stat label="Lorentz (γ)" value={gamma.toFixed(2)} />
        <Stat
          label="Mass (M/M₀)"
          value={(massRatio * 100).toFixed(1)}
          unit="%"
          highlight
        />
      </div>

      {/* Mathematical Link Explanations */}
      <div className="p-6 text-xs text-gray-500 font-mono leading-relaxed space-y-1">
        <p>
          <span className="text-gray-300">v = tanh(τ)</span> : Starfield passing
          speed accelerates towards c.
        </p>
        <p>
          <span className="text-gray-300">γ = cosh(τ)</span> : Rocket length
          contracts by 1/γ; stars streak by vγ.
        </p>
        <p>
          <span className="text-gray-300">t = sinh(τ)</span> : Beacon pulse (τ)
          visually slows down relative to Earth time (t).
        </p>
        <p>
          <span className="text-[#00f0ff] opacity-80">M = M₀e⁻ᵀ</span> :
          Internal blue energy core and photon exhaust scale down continuously.
        </p>
      </div>
    </div>
  );
};

const Stat = ({
  label,
  value,
  unit,
  highlight,
}: {
  label: string;
  value: string;
  unit?: string;
  highlight?: boolean;
}) => (
  <div className="flex flex-col items-center justify-center text-center">
    <div className="text-[0.65rem] uppercase tracking-widest text-gray-500 mb-2">
      {label}
    </div>
    <div
      className={`text-xl font-light font-mono ${highlight ? 'text-[#00f0ff]' : 'text-white'}`}
    >
      {value}{' '}
      <span className="text-xs font-sans text-gray-600 ml-1">{unit}</span>
    </div>
  </div>
);

export default RelativisticRocket;
