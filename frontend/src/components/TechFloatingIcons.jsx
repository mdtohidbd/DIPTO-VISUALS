import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, PerspectiveCamera, Stars } from '@react-three/drei';
import * as THREE from 'three';

const Icon3D = ({ label, code, position, color, secondaryColor }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(time * 0.8 + position[0]) * 0.25;
    meshRef.current.rotation.y = Math.sin(time * 0.4) * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={0.6}>
      <group ref={meshRef} position={position}>
        {/* Sleek 3D Glass Badge */}
        <mesh>
          <boxGeometry args={[1.5, 1.5, 0.25]} />
          <meshPhysicalMaterial
            color="#0f172a"
            emissive={color}
            emissiveIntensity={0.15}
            transmission={0.85}
            thickness={0.6}
            roughness={0.15}
            metalness={0.2}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Outer Glow Ring / Border */}
        <mesh position={[0, 0, 0.13]}>
          <ringGeometry args={[0.75, 0.82, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>

        {/* Software Abbreviation Code (Pr, Ae, DVR, CC, BL, etc.) */}
        <Text
          position={[0, 0.12, 0.18]}
          fontSize={0.45}
          color={color}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.03}
          outlineColor="#000000"
        >
          {code}
        </Text>

        {/* Software Full Name */}
        <Text
          position={[0, -0.38, 0.18]}
          fontSize={0.17}
          color="#f8fafc"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#030712"
        >
          {label}
        </Text>
      </group>
    </Float>
  );
};

const TechFloatingIcons = () => {
  // Video editing & motion graphics powerhouse tools
  const tools = [
    { label: "Premiere Pro", code: "Pr", color: "#9999ff", secondaryColor: "#5856d6", pos: [-6, 3, -2] },
    { label: "After Effects", code: "Ae", color: "#cf96fd", secondaryColor: "#9333ea", pos: [-4, -3, 0] },
    { label: "DaVinci Resolve", code: "DVR", color: "#ff5722", secondaryColor: "#ea580c", pos: [6, 3.5, -2] },
    { label: "CapCut Pro", code: "CC", color: "#00f0ff", secondaryColor: "#06b6d4", pos: [5, -3.5, 1] },
    { label: "Blender 3D", code: "BL", color: "#f59e0b", secondaryColor: "#d97706", pos: [-7, 0, -3] },
    { label: "Photoshop", code: "Ps", color: "#38bdf8", secondaryColor: "#0284c7", pos: [7, 0, -3] },
    { label: "Audition", code: "Au", color: "#2dd4bf", secondaryColor: "#0d9488", pos: [0, 4.5, -4] },
  ];

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} />
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#ef4444" />
          <pointLight position={[-10, -10, -10]} intensity={1.2} color="#06b6d4" />

          {tools.map((tool, i) => (
            <Icon3D
              key={i}
              label={tool.label}
              code={tool.code}
              position={tool.pos}
              color={tool.color}
              secondaryColor={tool.secondaryColor}
            />
          ))}

          <Stars radius={45} depth={40} count={600} factor={3} saturation={0.5} fade speed={1} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default TechFloatingIcons;
