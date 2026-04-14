/* eslint-disable react/no-unknown-property */
import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

const Rocket3D = ({
  v,
  isPlaying,
  xProgress,
}: {
  v: number;
  isPlaying: boolean;
  xProgress: number;
}) => {
  const exhaustRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    // Pulse exhaust
    if (exhaustRef.current) {
      const time = state.clock.getElapsedTime();
      // Even when not playing, add a slight flicker so it looks "alive"
      // When playing, make the exhaust scale with v
      const baseScaleX = isPlaying ? v * 2 + 0.5 : 0.2;
      const flicker = 1 + Math.sin(time * 30) * 0.1;
      exhaustRef.current.scale.set(baseScaleX * flicker, 1, 1);
      exhaustRef.current.position.x = -1.2 - exhaustRef.current.scale.x * 0.5; // align to nozzle

      const mat = exhaustRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = isPlaying
        ? 0.8 + Math.random() * 0.2
        : 0.3 + Math.random() * 0.1;
    }

    // Move rocket across the screen based on xProgress (0 to 1)
    if (groupRef.current) {
      const startX = -4;
      const endX = 4;
      groupRef.current.position.x = startX + (endX - startX) * xProgress;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
        {/* Rocket Body */}
        <mesh rotation={[0, 0, -Math.PI / 2]}>
          <cylinderGeometry args={[0.3, 0.4, 2, 16]} />
          <meshStandardMaterial
            color="#3b82f6"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Nose Cone */}
        <mesh position={[1.3, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.3, 0.6, 16]} />
          <meshStandardMaterial
            color="#60a5fa"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Fins */}
        <mesh position={[-0.7, 0.4, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.4, 0.5, 0.1]} />
          <meshStandardMaterial
            color="#1e3a8a"
            metalness={0.5}
            roughness={0.5}
          />
        </mesh>
        <mesh position={[-0.7, -0.4, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.4, 0.5, 0.1]} />
          <meshStandardMaterial
            color="#1e3a8a"
            metalness={0.5}
            roughness={0.5}
          />
        </mesh>
        <mesh position={[-0.7, 0, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
          <boxGeometry args={[0.4, 0.5, 0.1]} />
          <meshStandardMaterial
            color="#1e3a8a"
            metalness={0.5}
            roughness={0.5}
          />
        </mesh>
        <mesh position={[-0.7, 0, -0.4]} rotation={[Math.PI / 2, 0, 0]}>
          <boxGeometry args={[0.4, 0.5, 0.1]} />
          <meshStandardMaterial
            color="#1e3a8a"
            metalness={0.5}
            roughness={0.5}
          />
        </mesh>

        {/* Engine Nozzle */}
        <mesh position={[-1.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.3, 0.4, 16]} />
          <meshStandardMaterial
            color="#111827"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Exhaust Flame */}
        <mesh ref={exhaustRef} position={[-1.4, 0, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial color="#f59e0b" transparent opacity={0.8} />
        </mesh>
      </Float>
    </group>
  );
};

const MovingStars = ({ v }: { v: number }) => {
  const starsRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (starsRef.current) {
      // Move stars leftward based on rocket velocity
      starsRef.current.position.x -= v * delta * 10;
      if (starsRef.current.position.x < -20) {
        starsRef.current.position.x = 0;
      }
    }
  });

  return (
    <group ref={starsRef}>
      <Stars
        radius={50}
        depth={50}
        count={2000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      <group position={[20, 0, 0]}>
        <Stars
          radius={50}
          depth={50}
          count={2000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
      </group>
    </group>
  );
};

const RelativisticRocket = () => {
  const [tau, setTau] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>();

  const maxTau = 4; // Animate up to proper time = 4 years
  const durationMs = 15000; // 15 seconds to reach maxTau

  const tauRef = useRef(tau);

  useEffect(() => {
    tauRef.current = tau;
  }, [tau]);

  useEffect(() => {
    const animate = (time: number) => {
      if (startTimeRef.current === undefined) {
        startTimeRef.current = time - (tauRef.current / maxTau) * durationMs;
      }
      const elapsed = time - startTimeRef.current;
      let nextTau = (elapsed / durationMs) * maxTau;

      if (nextTau >= maxTau) {
        nextTau = maxTau;
        setIsPlaying(false);
      }

      setTau(nextTau);

      if (nextTau < maxTau) {
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
  }, [isPlaying, maxTau]);

  const handlePlayPause = () => {
    if (tau >= maxTau) {
      setTau(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setTau(0);
  };

  // Kinematics calculations (natural units c=1, g=1 lyr/yr^2 approx)
  const v = Math.tanh(tau);
  const gamma = Math.cosh(tau);
  const t = Math.sinh(tau);
  const x = Math.cosh(tau) - 1;
  const massRatio = Math.exp(-tau);

  // Visuals mapping
  const maxX = Math.cosh(maxTau) - 1;
  const xProgress = x / maxX;

  return (
    <div className="my-8 rounded-xl border border-gray-700 bg-gray-900 p-6 text-white shadow-xl">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-bold tracking-tight text-blue-300">
          1g Relativistic Journey (3D)
        </h3>
        <div className="flex gap-2">
          <button
            onClick={handlePlayPause}
            className="rounded bg-blue-600 px-4 py-2 font-medium hover:bg-blue-500 transition"
          >
            {isPlaying ? 'Pause' : tau >= maxTau ? 'Restart' : 'Play'}
          </button>
          <button
            onClick={handleReset}
            className="rounded bg-gray-700 px-4 py-2 font-medium hover:bg-gray-600 transition"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="relative mb-8 h-48 rounded-lg bg-gray-950 overflow-hidden border border-gray-800">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <MovingStars v={v} />
          <Rocket3D v={v} isPlaying={isPlaying} xProgress={xProgress} />
        </Canvas>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <MetricCard
          label="Proper Time (τ)"
          value={tau.toFixed(2)}
          unit="years"
        />
        <MetricCard label="Earth Time (t)" value={t.toFixed(2)} unit="years" />
        <MetricCard
          label="Velocity (v)"
          value={(v * 100).toFixed(2)}
          unit="% c"
        />
        <MetricCard label="Distance (x)" value={x.toFixed(2)} unit="lyr" />
        <MetricCard label="Gamma (γ)" value={gamma.toFixed(2)} />
        <MetricCard
          label="Mass Ratio (M/M₀)"
          value={(massRatio * 100).toFixed(2)}
          unit="%"
          highlight={true}
        />
      </div>

      <div className="mt-6 text-sm text-gray-400">
        <p>
          This animation demonstrates a photon rocket maintaining 1g proper
          acceleration (g &approx; 1 lyr/yr²). Note how Earth time and distance
          grow exponentially compared to the crew&apos;s proper time, while the
          mass must be almost entirely converted to energy to sustain this.
        </p>
      </div>
    </div>
  );
};

const MetricCard = ({
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
  <div
    className={`rounded-lg p-4 flex flex-col items-center justify-center text-center ${highlight ? 'bg-orange-900/30 border border-orange-700/50' : 'bg-gray-800'}`}
  >
    <div className="text-xs uppercase tracking-wider text-gray-400 mb-1">
      {label}
    </div>
    <div
      className={`text-2xl font-mono font-semibold ${highlight ? 'text-orange-400' : 'text-blue-400'}`}
    >
      {value} <span className="text-sm font-sans text-gray-500">{unit}</span>
    </div>
  </div>
);

export default RelativisticRocket;
