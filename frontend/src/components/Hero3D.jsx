import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  PresentationControls,
  Float,
  PerspectiveCamera,
} from '@react-three/drei';
import * as THREE from 'three';
import { useGPUTier } from '../hooks/useGPUTier';

/* ──────────────────────────────────────────────
   ATMOSPHERIC DUST PARTICLES
   200 floating point-sprites drifting upward
   ────────────────────────────────────────────── */
const DustParticles = ({ count = 200 }) => {
  const pointsRef = useRef();

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
      sz[i] = Math.random() * 3 + 0.5;
    }
    return [pos, sz];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const posArray = pointsRef.current.geometry.attributes.position.array;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      // Slow upward drift
      posArray[i * 3 + 1] += 0.003;
      // Gentle horizontal sway
      posArray[i * 3] += Math.sin(time * 0.3 + i) * 0.001;

      // Wrap particles back to bottom
      if (posArray[i * 3 + 1] > 7) {
        posArray[i * 3 + 1] = -7;
        posArray[i * 3] = (Math.random() - 0.5) * 20;
        posArray[i * 3 + 2] = (Math.random() - 0.5) * 12;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#fca5a5"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

/* ──────────────────────────────────────────────
   STUDIO FLOOR — Reflective ground plane
   ────────────────────────────────────────────── */
const StudioFloor = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
      <planeGeometry args={[30, 30]} />
      <meshStandardMaterial
        color="#0a0f1c"
        metalness={0.95}
        roughness={0.15}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
};

/* ──────────────────────────────────────────────
   FILM STRIP — Floating decorative film strips
   ────────────────────────────────────────────── */
const FilmStrip = ({ position, rotation, scale = 1 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.z = rotation[2] + Math.sin(t * 0.5) * 0.05;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.7) * 0.15;
  });

  return (
    <group ref={meshRef} position={position} rotation={rotation} scale={scale}>
      {/* Film strip body */}
      <mesh>
        <boxGeometry args={[0.4, 2.5, 0.02]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Sprocket holes */}
      {[-0.9, -0.5, -0.1, 0.3, 0.7].map((y, i) => (
        <mesh key={i} position={[0, y, 0.015]}>
          <boxGeometry args={[0.18, 0.14, 0.01]} />
          <meshStandardMaterial
            color="#030712"
            emissive="#ef4444"
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
    </group>
  );
};

/* ──────────────────────────────────────────────
   CAMERA RIG — Interactive floating 3D camera model
   ────────────────────────────────────────────── */
const CameraRig = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    // Subtle breathing animation
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.15;
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.08;
  });

  return (
    <group ref={groupRef}>
      {/* Main Cinema Camera body */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1.6, 1.1, 1.3]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.88}
          roughness={0.18}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Camera Neon Accent Trim Strip */}
      <mesh position={[0, 0.56, 0]}>
        <boxGeometry args={[1.62, 0.04, 1.32]} />
        <meshStandardMaterial
          color="#ef4444"
          emissive="#ef4444"
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* Camera Side Ribs / Heat Sinks */}
      {[-0.3, 0, 0.3].map((y, i) => (
        <mesh key={i} position={[-0.81, y, 0]}>
          <boxGeometry args={[0.04, 0.12, 0.9]} />
          <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}

      {/* Lens barrel mount */}
      <mesh position={[0, 0, 0.75]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.42, 0.46, 0.4, 32]} />
        <meshStandardMaterial color="#1e293b" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Cinema Prime Lens Barrel */}
      <mesh position={[0, 0, 1.1]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.38, 0.42, 0.6, 32]} />
        <meshStandardMaterial color="#334155" metalness={0.92} roughness={0.15} />
      </mesh>

      {/* Lens Focus Gear Ring */}
      <mesh position={[0, 0, 1.05]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.43, 0.43, 0.12, 32]} />
        <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.4} />
      </mesh>

      {/* Cinema Matte Box Hood */}
      <mesh position={[0, 0, 1.45]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.52, 0.42, 0.25, 4]} />
        <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.4} />
      </mesh>

      {/* Matte Box Top Flag (Barn Door) */}
      <mesh position={[0, 0.48, 1.45]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[0.9, 0.03, 0.35]} />
        <meshStandardMaterial color="#1e293b" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Lens glass (front element) with bright anamorphic glow */}
      <mesh position={[0, 0, 1.41]}>
        <circleGeometry args={[0.34, 32]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={1.4}
          metalness={0.9}
          roughness={0.05}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Anamorphic Lens Ring Flare */}
      <mesh position={[0, 0, 1.39]}>
        <ringGeometry args={[0.32, 0.38, 32]} />
        <meshStandardMaterial
          color="#ef4444"
          emissive="#ef4444"
          emissiveIntensity={2.8}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* ──────────────────────────────────────────────
         ARTICULATED SIDE MONITOR / TIMELINE VIEWPORT
         ────────────────────────────────────────────── */}
      <group position={[0.8, 0.2, 0.3]}>
        {/* Articulated Mounting Arm */}
        <mesh position={[0.18, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 0.35, 16]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Swivel Joint */}
        <mesh position={[0.35, 0, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#ef4444" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Monitor Assembly angled toward viewer */}
        <group position={[0.42, 0, 0.1]} rotation={[0, -0.4, 0]}>
          {/* Monitor Frame */}
          <mesh castShadow>
            <boxGeometry args={[1.35, 0.9, 0.08]} />
            <meshStandardMaterial color="#1e293b" metalness={0.85} roughness={0.25} />
          </mesh>

          {/* Screen Glass Bezel */}
          <mesh position={[0, 0, 0.045]}>
            <planeGeometry args={[1.25, 0.8]} />
            <meshBasicMaterial color="#020617" />
          </mesh>

          {/* Timeline Viewport Screen Display */}
          {/* Top Video Preview Area */}
          <mesh position={[0, 0.15, 0.05]}>
            <planeGeometry args={[1.18, 0.42]} />
            <meshStandardMaterial
              color="#0c2340"
              emissive="#0284c7"
              emissiveIntensity={0.6}
              roughness={0.3}
            />
          </mesh>

          {/* Timecode & REC Tally on Monitor */}
          <mesh position={[-0.38, 0.3, 0.055]}>
            <circleGeometry args={[0.025, 16]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
          <mesh position={[0.4, 0.3, 0.055]}>
            <planeGeometry args={[0.25, 0.03]} />
            <meshBasicMaterial color="#22c55e" />
          </mesh>

          {/* Timeline Track V2 (Clips) */}
          <mesh position={[-0.2, -0.15, 0.05]}>
            <planeGeometry args={[0.5, 0.07]} />
            <meshBasicMaterial color="#a855f7" />
          </mesh>
          <mesh position={[0.25, -0.15, 0.05]}>
            <planeGeometry args={[0.35, 0.07]} />
            <meshBasicMaterial color="#ec4899" />
          </mesh>

          {/* Timeline Track V1 (Base Video Track) */}
          <mesh position={[-0.35, -0.24, 0.05]}>
            <planeGeometry args={[0.3, 0.06]} />
            <meshBasicMaterial color="#06b6d4" />
          </mesh>
          <mesh position={[0.1, -0.24, 0.05]}>
            <planeGeometry args={[0.55, 0.06]} />
            <meshBasicMaterial color="#f97316" />
          </mesh>

          {/* Audio Waveform Track A1 */}
          <mesh position={[0, -0.32, 0.05]}>
            <planeGeometry args={[1.15, 0.05]} />
            <meshBasicMaterial color="#10b981" opacity={0.9} transparent />
          </mesh>

          {/* Scrubbing Playhead (Red Vertical Cursor Line) */}
          <mesh position={[0.05, -0.22, 0.055]}>
            <planeGeometry args={[0.02, 0.26]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
        </group>
      </group>

      {/* Top Handle */}
      <mesh position={[0, 0.95, 0]}>
        <boxGeometry args={[0.85, 0.08, 0.1]} />
        <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.4} />
      </mesh>
      {/* Handle supports */}
      <mesh position={[-0.35, 0.78, 0]}>
        <boxGeometry args={[0.08, 0.35, 0.08]} />
        <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.4} />
      </mesh>
      <mesh position={[0.35, 0.78, 0]}>
        <boxGeometry args={[0.08, 0.35, 0.08]} />
        <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.4} />
      </mesh>

      {/* Viewfinder on Top-Left */}
      <mesh position={[-0.5, 0.7, -0.2]}>
        <boxGeometry args={[0.3, 0.28, 0.45]} />
        <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Viewfinder Eyepiece Cup */}
      <mesh position={[-0.5, 0.7, -0.45]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.14, 0.1, 0.12, 24]} />
        <meshStandardMaterial color="#020617" roughness={0.9} />
      </mesh>

      {/* V-Mount Battery on Camera Back */}
      <mesh position={[0, 0, -0.75]}>
        <boxGeometry args={[0.9, 0.8, 0.3]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Battery Status LED indicators */}
      {[-0.25, -0.1, 0.05, 0.2].map((x, i) => (
        <mesh key={i} position={[x, 0.25, -0.91]}>
          <circleGeometry args={[0.025, 12]} />
          <meshBasicMaterial color={i < 3 ? "#22c55e" : "#eab308"} />
        </mesh>
      ))}

      {/* Recording indicator Tally Light (Red Dot) */}
      <mesh position={[0.68, 0.45, 0.66]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color="#ef4444"
          emissive="#ef4444"
          emissiveIntensity={5}
        />
      </mesh>
    </group>
  );
};

/* ──────────────────────────────────────────────
   MOUSE PARALLAX GROUP — wraps scene content
   ────────────────────────────────────────────── */
const ParallaxGroup = ({ children }) => {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const { x, y } = state.pointer;
    // Smooth lerp toward mouse position
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      x * 0.18,
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -y * 0.1,
      0.05
    );
  });

  return <group ref={groupRef}>{children}</group>;
};

/* ──────────────────────────────────────────────
   MAIN 3D SCENE
   ────────────────────────────────────────────── */
const StudioScene = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.25, 5.6]} fov={48} />

      {/* Studio Lighting — High-Impact Dramatic Cinematic Lighting */}
      <ambientLight intensity={1.5} color="#f1f5f9" />

      {/* Warm key light */}
      <spotLight
        position={[6, 7, 5]}
        intensity={200}
        angle={0.55}
        penumbra={0.7}
        color="#fb923c"
        castShadow
      />

      {/* Cyan rim/back light */}
      <spotLight
        position={[-5, 4, -2]}
        intensity={160}
        angle={0.65}
        penumbra={0.8}
        color="#38bdf8"
      />

      {/* Front camera lens fill light */}
      <pointLight position={[1.5, 1, 4]} intensity={60} color="#ffffff" distance={10} />

      {/* Red accent fill light */}
      <pointLight position={[2, -2, 3]} intensity={45} color="#ef4444" distance={12} />

      {/* Soft top fill */}
      <pointLight position={[0, 6, 0]} intensity={30} color="#e2e8f0" distance={15} />

      <ParallaxGroup>
        {/* Interactive Camera Rig — Prominently offset to right side with large scale */}
        <PresentationControls
          global={false}
          cursor={true}
          config={{ mass: 2, tension: 350 }}
          snap={{ mass: 3, tension: 800 }}
          rotation={[0.06, -0.38, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 3, Math.PI / 3]}
        >
          <Float
            speed={1.8}
            rotationIntensity={0.35}
            floatIntensity={0.5}
          >
            <group position={[1.45, 0, 0]} scale={1.22}>
              <CameraRig />
            </group>
          </Float>
        </PresentationControls>

        {/* Floating Film Strips */}
        <FilmStrip position={[-4.5, 1.5, -2]} rotation={[0, 0.3, 0.15]} scale={0.8} />
        <FilmStrip position={[4.2, 0.5, -3]} rotation={[0, -0.2, -0.1]} scale={0.7} />
        <FilmStrip position={[-3, -1, -4]} rotation={[0, 0.5, 0.3]} scale={0.5} />

        {/* Studio Floor */}
        <StudioFloor />

        {/* Atmospheric Dust */}
        <DustParticles count={180} />
      </ParallaxGroup>
    </>
  );
};

/* ──────────────────────────────────────────────
   MOBILE CSS FALLBACK
   ────────────────────────────────────────────── */
const MobileFallback = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-[#0a0f1c] to-gray-950" />

      {/* Ambient glow spots */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-red-500/8 blur-[100px]" />
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-cyan-500/8 blur-[80px]" />

      {/* Floating camera icon (CSS animated) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-float-slow">
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-20"
        >
          <rect x="20" y="35" width="80" height="50" rx="8" stroke="#ef4444" strokeWidth="2" />
          <circle cx="60" cy="60" r="18" stroke="#22d3ee" strokeWidth="2" />
          <circle cx="60" cy="60" r="10" fill="#ef4444" fillOpacity="0.2" />
          <rect x="40" y="25" width="20" height="10" rx="3" stroke="#ef4444" strokeWidth="1.5" opacity="0.5" />
          <circle cx="90" cy="42" r="3" fill="#ef4444" />
        </svg>
      </div>

      {/* CSS particle dots */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="cinema-particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${8 + Math.random() * 12}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
};

/* ──────────────────────────────────────────────
   HERO3D EXPORT — switches between WebGL & CSS
   ────────────────────────────────────────────── */
const Hero3D = () => {
  const { isMobile, isLowEnd } = useGPUTier();
  const useFallback = isMobile || isLowEnd;

  return (
    <div className="absolute inset-0 z-0">
      {useFallback ? (
        <MobileFallback />
      ) : (
        <div className="w-full h-full r3f-canvas">
          <Canvas
            shadows
            dpr={[1, 1.5]}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
            }}
            style={{ background: 'transparent' }}
          >
            <Suspense fallback={null}>
              <StudioScene />
            </Suspense>
          </Canvas>
        </div>
      )}
    </div>
  );
};

export default Hero3D;
