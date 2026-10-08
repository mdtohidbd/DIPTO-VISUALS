import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedShape = ({ position, color, speed, distort }) => {
    const meshRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        meshRef.current.position.y = position[1] + Math.sin(time * speed) * 0.5;
        meshRef.current.rotation.x = time * 0.2;
        meshRef.current.rotation.y = time * 0.3;
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <Sphere ref={meshRef} position={position} args={[1, 100, 200]} scale={0.8}>
                <MeshDistortMaterial
                    color={color}
                    attach="material"
                    distort={distort}
                    speed={speed}
                    roughness={0.2}
                    metalness={0.8}
                />
            </Sphere>
        </Float>
    );
};

const ThreeBackground = () => {
    return (
        <div className="fixed inset-0 z-[-2] pointer-events-none bg-slate-50">
            <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
                <ambientLight intensity={0.8} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#ef4444" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#38bdf8" />
                
                <AnimatedShape position={[6, 3, -2]} color="#fee2e2" speed={1.5} distort={0.4} />
                <AnimatedShape position={[-6, -4, 0]} color="#ccfbf1" speed={2} distort={0.5} />
                <AnimatedShape position={[0, -8, -5]} color="#fecaca" speed={1.2} distort={0.3} />
                <AnimatedShape position={[-2, 6, -3]} color="#e0f2fe" speed={1.8} distort={0.6} />

                <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
            </Canvas>
        </div>
    );
};

export default ThreeBackground;
