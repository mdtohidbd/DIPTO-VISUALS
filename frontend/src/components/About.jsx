import React from 'react';
import { motion } from 'framer-motion';
import { Film, Award, TrendingUp, Users, Video, Sparkles, CheckCircle2 } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

const About = () => {
  const { config } = useSiteConfig();

  const stats = [
    { label: 'Total Views Driven', value: config.viewsGenerated || '100M+', icon: <TrendingUp className="w-5 h-5 text-brand-electric" /> },
    { label: 'Videos Produced', value: config.videosEdited || '500+', icon: <Video className="w-5 h-5 text-brand-orange" /> },
    { label: 'Client Satisfaction', value: config.clientSatisfaction || '99%', icon: <Users className="w-5 h-5 text-brand-electric" /> },
    { label: 'Years Experience', value: config.experienceYears || '5+', icon: <Award className="w-5 h-5 text-brand-orange" /> },
  ];

  const tools = [
    { name: 'Adobe Premiere Pro', badge: 'Pr', color: '#9999ff', desc: 'Narrative Assembly & Pacing' },
    { name: 'Adobe After Effects', badge: 'Ae', color: '#cf96fd', desc: 'VFX & Kinetic Motion' },
    { name: 'DaVinci Resolve Studio', badge: 'DVR', color: '#ff5722', desc: 'Color Science & Grading' },
    { name: 'CapCut Pro', badge: 'CC', color: '#00f0ff', desc: 'Viral Hook Optimization' },
    { name: 'Blender 3D', badge: 'BL', color: '#f59e0b', desc: '3D Assets & Camera Tracking' },
    { name: 'Adobe Audition', badge: 'Au', color: '#2dd4bf', desc: 'Foley & Audio Mastering' },
  ];

  return (
    <section id="about" className="relative py-14 md:py-18 bg-brand-navy text-brand-text overflow-hidden border-t border-[var(--card-border)]">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-brand-electric/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-brand-orange/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-electric/10 border border-brand-electric/20 text-brand-electric text-xs font-semibold tracking-widest uppercase mb-4"
          >
            <Film className="w-3.5 h-3.5" /> Creative Identity
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-brand-heading"
          >
            Behind the <span className="bg-gradient-to-r from-brand-electric to-brand-orange bg-clip-text text-transparent">Timeline</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-brand-muted text-base md:text-lg leading-relaxed"
          >
            I'm {config.ownerName || 'Md Tohidul Islam'} — a {config.tagline || 'Cinematic Real Estate Video Editor'} obsessed with psychological retention, dynamic pacing, and cinematic color science.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-brand-navy-light border border-[var(--card-border)] text-center flex flex-col items-center justify-center gap-2 hover:border-brand-electric/30 transition-all duration-300 group"
            >
              <div className="p-2.5 rounded-xl bg-white/5 border border-[var(--card-border)] group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <span className="text-3xl md:text-4xl font-extrabold text-brand-heading tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs md:text-sm text-brand-muted font-medium">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* 2-Column Story & Toolset */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Story Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-brand-heading tracking-tight">
              Transforming Raw Footage into High-Converting Narratives
            </h3>
            <p className="text-brand-muted text-base leading-relaxed">
              In an era of 3-second attention spans, ordinary editing is no longer enough. Every cut must have purpose, every sound effect must accentuate tension, and every motion design element must guide viewer psychology.
            </p>
            <p className="text-brand-muted text-base leading-relaxed">
              Whether editing retention-driven property walkthroughs or directing commercial spots for top agencies, I fuse technical precision in DaVinci Resolve and Premiere Pro with deep visual storytelling instincts.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'High-AVD (Average View Duration) pattern interrupts',
                'Hollywood-grade color grading with custom film balances',
                'Bespoke sound design with spatial Foley & sub-bass impacts',
              ].map((point, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm text-brand-text">
                  <CheckCircle2 className="w-5 h-5 text-brand-electric flex-shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Software Tool Arsenal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 p-7 rounded-3xl bg-brand-navy-light border border-[var(--card-border)] shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[var(--card-border)]">
              <h4 className="text-lg font-bold text-brand-heading flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-electric" /> Post-Production Arsenal
              </h4>
              <span className="text-xs text-brand-muted font-mono">Industry Standards</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {tools.map((tool, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white/5 border border-[var(--card-border)] hover:border-brand-electric/40 transition-all flex items-center gap-3"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center font-extrabold text-sm shadow-md"
                    style={{ backgroundColor: `${tool.color}20`, color: tool.color, border: `1px solid ${tool.color}40` }}
                  >
                    {tool.badge}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-brand-heading">{tool.name}</p>
                    <p className="text-[11px] text-brand-muted">{tool.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
