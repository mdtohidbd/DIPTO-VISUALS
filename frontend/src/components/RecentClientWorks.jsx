import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, MeshWobbleMaterial } from '@react-three/drei';
import TechFloatingIcons from './TechFloatingIcons';
import { Film, ExternalLink, Sparkles } from 'lucide-react';
import { API_BASE_URL, getMediaUrl } from '../utils/apiConfig';
import Cropt from '../assets/cropt.png';
import Sub4sub from '../assets/Sub4sub.png';
import MVP from '../assets/MVP.png';

gsap.registerPlugin(ScrollTrigger);

const Scene = () => {
  return (
    <Canvas className="absolute inset-0 z-0 pointer-events-none" camera={{ position: [0, 0, 5], fov: 75 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#0066FF" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#FF7A00" />

        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <Sphere args={[1, 64, 64]} scale={2.2} position={[3, 1, -2]}>
            <MeshDistortMaterial
              color="#1e1b4b"
              attach="material"
              distort={0.4}
              speed={2}
              roughness={0.2}
            />
          </Sphere>
        </Float>

        <Float speed={2} rotationIntensity={0.8} floatIntensity={1}>
          <Sphere args={[1, 64, 64]} scale={1.8} position={[-4, -2, -1]}>
            <MeshWobbleMaterial
              color="#0f172a"
              attach="material"
              factor={0.4}
              speed={1.5}
            />
          </Sphere>
        </Float>
      </Suspense>
    </Canvas>
  );
};

const AnimatedImage = ({ src, title }) => {
  return (
    <div className="relative w-full h-[380px] md:h-[480px] group rounded-3xl overflow-hidden p-1 bg-gradient-to-br from-brand-electric/20 via-white/5 to-brand-orange/20 shadow-2xl border border-[var(--card-border)]">
      <div className="relative z-10 w-full h-full rounded-[1.4rem] overflow-hidden bg-black/80">
        <img
          src={src}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
      </div>
    </div>
  );
};

const DEFAULT_CLIENT_WORKS = [
  {
    id: 'work_1',
    title: 'CoinGrow365 — FinTech Brand Film & Motion Promo',
    description: 'Produced a high-converting 3D animated promotional film, combining 3D screen mockups, kinetic typography, and deep spatial audio design. Generated 1.8M organic views and 34% increase in user signups.',
    image: Cropt,
    link: 'https://www.coingrow365.com/',
    buttonText: 'Watch Case Study',
    metrics: '1.8M Views • +34% Conversion',
    techStack: ['After Effects', 'Premiere Pro', 'Blender 3D', 'Sound Design', 'DaVinci Resolve'],
  },
  {
    id: 'work_2',
    title: 'Sub4Sub — Viral Social Engagement Campaign',
    description: 'Engineered a viral short-form editing strategy with fast-paced beat cuts, aggressive hook retention, dynamic auto-captions, and custom sound effects for multi-channel syndication across TikTok and Reels.',
    image: Sub4sub,
    link: 'https://sub4submvo.netlify.app/login',
    buttonText: 'View Campaign',
    metrics: '3.4M Impressions • 92% AVD',
    techStack: ['CapCut Pro', 'Premiere Pro', 'Color Grading', 'Viral Hooks'],
  },
  {
    id: 'work_3',
    title: 'Nexus MVP — Tech Product Launch Commercial',
    description: 'Full-cycle commercial production from storyboard assembly to Hollywood-grade color science in DaVinci Resolve. Built bespoke 3D camera sweeps and HUD graphics in After Effects.',
    image: MVP,
    link: '#',
    buttonText: 'Explore Production',
    metrics: '4K Cinema • 60 FPS HDR',
    techStack: ['DaVinci Resolve', 'After Effects', 'Cinema 4K', 'Foley Mixing'],
  },
];

const RecentClientWorks = () => {
  const [works, setWorks] = useState(DEFAULT_CLIENT_WORKS);
  const headingRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/client-works`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((w, index) => {
            const fallback = DEFAULT_CLIENT_WORKS[index % DEFAULT_CLIENT_WORKS.length];
            return {
              id: w.id || fallback.id,
              title: w.title || fallback.title,
              description: w.description || fallback.description,
              image: getMediaUrl(w.image || fallback.image),
              link: w.link || fallback.link,
              buttonText: w.buttonText || fallback.buttonText,
              metrics: w.metrics || fallback.metrics,
              techStack: w.techStack || fallback.techStack,
            };
          });
          setWorks(mapped);
        }
      })
      .catch(() => {
        // use defaults
      });
  }, []);

  return (
    <section
      id="client-works"
      ref={containerRef}
      className="relative py-28 px-4 md:px-8 bg-brand-navy border-t border-[var(--card-border)] overflow-hidden text-brand-text"
    >
      {/* 3D Tech Icons Background — desktop only to preserve mobile GPU */}
      <div className="hidden md:block absolute inset-0 z-0 opacity-25 pointer-events-none">
        <TechFloatingIcons />
      </div>

      {/* Three.js 3D Background — desktop only */}
      <div className="hidden md:block absolute inset-0 z-0 pointer-events-none">
        <Scene />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-electric/10 border border-brand-electric/20 text-brand-electric text-xs font-semibold tracking-widest uppercase mb-4">
            <Film className="w-3.5 h-3.5" /> High-Impact Productions
          </div>
          <h2
            ref={headingRef}
            className="text-4xl lg:text-6xl font-extrabold tracking-tight text-brand-heading"
          >
            Recent <span className="bg-gradient-to-r from-brand-electric to-brand-orange bg-clip-text text-transparent">Client Works</span>
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-brand-electric to-brand-orange mx-auto mt-5 rounded-full shadow-[0_0_15px_rgba(0,102,255,0.5)]" />
        </div>

        {/* Client Works Showcase Cards */}
        <div className="flex flex-col gap-20">
          {works.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={item.id || index}
                className={`flex flex-col ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } items-center gap-10 lg:gap-14 p-6 md:p-10 rounded-3xl bg-brand-navy-light border border-[var(--card-border)] backdrop-blur-xl shadow-2xl hover:border-brand-electric/30 transition-all duration-500`}
              >
                {/* Media Image / Visual */}
                <div className="w-full lg:w-1/2">
                  <AnimatedImage src={item.image} title={item.title} />
                </div>

                {/* Content Text & Details */}
                <div className="w-full lg:w-1/2 space-y-5">
                  {item.metrics && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-electric/10 border border-brand-electric/20 text-brand-electric text-xs font-mono font-medium">
                      <Sparkles className="w-3.5 h-3.5" />
                      {item.metrics}
                    </div>
                  )}

                  <h3 className="text-2xl md:text-3xl font-extrabold text-brand-heading tracking-tight leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-brand-muted text-sm md:text-base leading-relaxed">
                    {item.description}
                  </p>

                  {/* Software & Production Stack */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {item.techStack.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg text-xs font-semibold bg-white/5 border border-[var(--card-border)] text-brand-muted"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  {/* Action Link */}
                  {item.link && (
                    <div className="pt-3">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-electric to-brand-orange text-white font-bold text-sm shadow-[0_0_20px_rgba(0,102,255,0.3)] hover:shadow-[0_0_30px_rgba(0,102,255,0.6)] hover:scale-105 transition-all duration-300"
                      >
                        <span>{item.buttonText || 'View Project'}</span>
                        <ExternalLink className="w-4 h-4 text-white" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RecentClientWorks;
