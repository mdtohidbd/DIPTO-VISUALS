import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Star, Sparkles, CheckCircle2, Film } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import profileImg from '../assets/profile.jpg';

const Hero = () => {
  const { config } = useSiteConfig();
  
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }
    })
  };

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex items-center bg-brand-navy overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-electric/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-brand-orange/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Left Content Column */}
          <div className="w-full lg:w-[55%] flex flex-col space-y-6 pt-6 lg:pt-0 z-20 relative">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-electric/10 border border-brand-electric/20 text-brand-electric font-semibold text-xs tracking-widest uppercase shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {config.heroBadge || 'Elite Real Estate Post-Production'}
              </div>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-brand-heading"
            >
              {config.heroHeadlineStart || 'Transforming Raw Footage Into'} <br />
              <span className="cinema-gradient-text bg-gradient-to-r from-brand-electric to-brand-orange bg-clip-text text-transparent">
                {config.heroHeadlineGradient || 'Multimillion-Dollar Cinema'}
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.3}
              className="text-brand-text text-base sm:text-lg leading-relaxed max-w-xl font-medium"
            >
              {config.heroDescription || 'High-converting architectural walkthroughs, cinematic drone storytelling, and viral vertical reels engineered to captivate luxury buyers and sell listings faster.'}
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.4}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href={config.heroCta1Link || '#projects'}
                className="group relative px-8 py-4 bg-brand-electric text-white font-bold rounded-2xl shadow-[0_0_25px_rgba(0,102,255,0.4)] hover:shadow-[0_0_35px_rgba(0,102,255,0.7)] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2.5"
              >
                <span>{config.heroCta1Text || 'EXPLORE SHOWREEL'}</span>
                <Play className="w-4 h-4 fill-white text-white" />
              </a>

              <a
                href={config.heroCta2Link || '#contact'}
                className="group px-8 py-4 bg-white/5 border border-[var(--card-border)] text-brand-heading font-bold rounded-2xl hover:bg-white/10 hover:border-brand-electric/40 transition-all duration-300 flex items-center gap-2.5"
              >
                <span>{config.heroCta2Text || 'GET A FREE QUOTE'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            {/* Software Stack */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.5}
              className="pt-6 flex flex-col gap-3"
            >
              <p className="text-xs text-brand-muted uppercase tracking-widest font-semibold">
                {config.toolsCaption || 'Engineered With Industry-Standard Software'}
              </p>
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-brand-navy-light border border-[var(--card-border)] text-xs font-bold text-brand-heading">
                  <span className="w-5 h-5 rounded bg-[#9999ff] text-[#00005c] flex items-center justify-center text-[10px] font-black">Pr</span>
                  Premiere Pro
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-brand-navy-light border border-[var(--card-border)] text-xs font-bold text-brand-heading">
                  <span className="w-5 h-5 rounded bg-[#9999ff] text-[#00005c] flex items-center justify-center text-[10px] font-black">Ae</span>
                  After Effects
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-brand-navy-light border border-[var(--card-border)] text-xs font-bold text-brand-heading">
                  <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-pink-500 via-amber-500 to-cyan-500 flex items-center justify-center text-[8px] text-white font-black">●</span>
                  DaVinci Resolve
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Photo Column - Featuring User's Portrait */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="w-full lg:w-[45%] relative z-10 flex justify-center lg:justify-end"
          >
            {/* Ambient Aura Glow behind portrait */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-brand-electric/30 to-brand-orange/30 rounded-[2.5rem] blur-2xl opacity-60 pointer-events-none" />

            {/* Main Portrait Card Container */}
            <div className="relative w-full max-w-[420px] aspect-[3/4] rounded-3xl overflow-hidden border border-white/15 shadow-2xl group transition-all duration-500 bg-brand-navy-light">
              
              {/* Portrait Image */}
              <img 
                src={
                  config.profileImage 
                    ? (config.profileImage.startsWith('/uploads') ? `http://localhost:5000${config.profileImage}` : config.profileImage)
                    : profileImg
                } 
                alt={config.ownerName || "Md Tohidul Islam"} 
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Bottom Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent z-10 pointer-events-none" />

              {/* Top Status Badge */}
              <div className="absolute top-4 right-4 z-20">
                <div className="px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/20 shadow-lg flex items-center gap-2 keep-text-white">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-bold text-white tracking-wide">{config.statusBadgeText || 'Available for New Projects'}</span>
                </div>
              </div>

              {/* Top Left Experience Pill */}
              <div className="absolute top-4 left-4 z-20">
                <div className="px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/20 shadow-lg flex items-center gap-1.5 keep-text-white">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-[11px] font-bold text-white tracking-wide">{config.experienceBadgeText || 'Top 1% Real Estate Editor'}</span>
                </div>
              </div>

              {/* Bottom Info Card Overlay */}
              <div className="absolute bottom-5 inset-x-5 z-20">
                <div className="p-4 bg-black/75 backdrop-blur-xl rounded-2xl border border-white/15 shadow-2xl flex items-center justify-between gap-3 keep-text-white">
                  <div className="min-w-0">
                    <h3 className="text-white font-extrabold text-base tracking-wide flex items-center gap-1.5 truncate">
                      {config.ownerName || 'Md Tohidul Islam'}
                      <CheckCircle2 className="w-4 h-4 text-brand-electric flex-shrink-0" />
                    </h3>
                    <p className="text-brand-orange text-xs font-semibold truncate">
                      {config.tagline || 'Luxury Real Estate & Cinematic Editor'}
                    </p>
                  </div>

                  <div className="flex-shrink-0 px-3 py-1.5 rounded-xl bg-brand-electric/20 border border-brand-electric/40 text-center">
                    <p className="text-[10px] text-slate-300 uppercase tracking-widest font-bold">Edited</p>
                    <p className="text-xs font-black text-white">{config.videosEdited || '500+'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Orbit Rings */}
            <div className="absolute -top-6 -right-6 w-28 h-28 border-2 border-dashed border-brand-electric/30 rounded-full animate-spin-slow pointer-events-none hidden sm:block" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 border-2 border-dashed border-brand-orange/30 rounded-full animate-spin-slow pointer-events-none hidden sm:block" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
