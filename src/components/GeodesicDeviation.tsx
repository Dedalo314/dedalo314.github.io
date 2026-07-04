/* eslint-disable react/no-unknown-property */
import { useState, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const OrbitingLab = ({ omega, isPlaying, reset, setTime }: { omega: number, isPlaying: boolean, reset: boolean, setTime: (t: number) => void }) => {
  const astronautRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);
  const v0 = 0.5; // Initial radial throw velocity

  // Generate the exact theoretical ellipse path
  const points = useMemo(() => {
    const curve = new THREE.EllipseCurve(
      0, -2 * v0 / omega,            // aX, aY
      v0 / omega, 2 * v0 / omega,    // xRadius, yRadius
      0, 2 * Math.PI,                // aStartAngle, aEndAngle
      false,                         // aClockwise
      Math.PI / 2                    // aRotation
    );
    return curve.getPoints(100);
  }, [omega]);

  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  useEffect(() => {
    if (reset) {
      timeRef.current = 0;
      setTime(0);
      if (astronautRef.current) astronautRef.current.position.set(0, 0, 0);
    }
  }, [reset, setTime]);

  useFrame((_, delta) => {
    if (isPlaying) {
      timeRef.current += delta;
      setTime(timeRef.current);
      const t = timeRef.current;
      
      // Analytical Hill's Equations
      const x = (v0 / omega) * Math.sin(omega * t);
      const y = (2 * v0 / omega) * (Math.cos(omega * t) - 1);
      
      if (astronautRef.current) astronautRef.current.position.set(x, y, 0);
    }
  });

  return (
    <group>
      <ambientLight intensity={1} />
      {/* Trajectory Trace */}
      <line geometry={geometry}>
        <lineBasicMaterial color="#444444" />
      </line>
      {/* Lab Center */}
      <mesh>
        <ringGeometry args={[0.08, 0.1, 32]} />
        <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
      </mesh>
      {/* Astronaut/Object */}
      <mesh ref={astronautRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#ff0000" />
      </mesh>
      {/* Grid mapping Local Frame */}
      <gridHelper args={[10, 20, '#222', '#222']} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  );
};

const GeodesicDeviation = () => {
  const [omega, setOmega] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [reset, setReset] = useState(false);
  const [time, setTime] = useState(0);

  const labAngle = omega * time;

  return (
    <div className="my-8 border border-gray-800 bg-black shadow-2xl font-sans rounded-sm text-gray-200 relative overflow-hidden">
      <div className="p-4 bg-gray-900 flex justify-between items-center border-b border-gray-800">
        <div>
          <h3 className="text-sm font-semibold text-white">Orbital Mechanics: Clohessy-Wiltshire Simulation</h3>
          <p className="text-[10px] text-gray-400">Red: Object &bull; White: Lab Center &bull; Gray: Analytical Trajectory</p>
        </div>
        <div className="text-[10px] bg-black px-2 py-1 rounded text-green-400 font-mono">ω = {omega.toFixed(1)} rad/s</div>
      </div>
      
      <div className="h-96 relative">
        {/* Global Inertial Minimap (Earth View) */}
        <div className="absolute top-4 right-4 w-24 h-24 bg-black/80 rounded-full border border-gray-700 flex items-center justify-center z-10 shadow-lg pointer-events-none">
          <div className="absolute text-[8px] text-gray-500 top-2 uppercase tracking-widest">Earth View</div>
          <div className="w-6 h-6 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
          <div 
            className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_5px_white]" 
            style={{ transform: `rotate(${-labAngle}rad) translateY(-32px)` }}
          />
        </div>
        
        <Canvas camera={{ position: [0, -1, 4] }}>
          <ambientLight intensity={1} />
          <OrbitingLab omega={omega} isPlaying={isPlaying} reset={reset} setTime={setTime} />
        </Canvas>
      </div>
      
      <div className="p-4 flex gap-4 items-center bg-gray-900 border-t border-gray-800">
        <label htmlFor="speed-range" className="text-xs text-gray-300 font-mono">Speed (ω):</label>
        <input 
          id="speed-range"
          type="range" 
          min="0.5" 
          max="3" 
          step="0.1" 
          value={omega} 
          onChange={(e) => { 
            setOmega(parseFloat(e.target.value)); 
            setReset(true); 
            setTimeout(() => setReset(false), 50); 
          }} 
          className="accent-blue-500 cursor-pointer" 
        />
        <button onClick={() => setIsPlaying(!isPlaying)} className="border border-gray-600 rounded px-4 py-1 text-xs hover:bg-gray-700 transition-colors">
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button onClick={() => { setReset(true); setIsPlaying(false); setTimeout(() => setReset(false), 50); }} className="border border-gray-600 rounded px-4 py-1 text-xs hover:bg-gray-700 transition-colors">
          Reset
        </button>
        <div className="ml-auto text-xs font-mono text-gray-500">t = {time.toFixed(2)}s</div>
      </div>
    </div>
  );
};

export default GeodesicDeviation;
