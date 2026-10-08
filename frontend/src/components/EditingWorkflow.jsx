import React from 'react';
import { motion } from 'framer-motion';
import {
  FolderArchive,
  Scissors,
  Flame,
  Layers,
  Volume2,
  Sparkles,
  Clock,
} from 'lucide-react';

const STAGES = [
  {
    step: '01',
    title: 'Ingest & Proxy Architecture',
    subtitle: 'Footage Curation & Multicam Sync',
    desc: 'Organizing raw terabytes of multi-cam footage, building lightweight ProRes proxies, syncing studio audio, and extracting the golden takes.',
    icon: <FolderArchive className="w-6 h-6 text-brand-electric" />,
    badge: 'Day 01',
    tags: ['Proxy Workflow', 'Audio Sync', 'Curation'],
  },
  {
    step: '02',
    title: 'The Assembly & Retention Cut',
    subtitle: 'Narrative Pacing & Dead-Air Removal',
    desc: 'Sculpting the emotional spine of the story. Ruthlessly trimming filler words and dead air to ensure the narrative moves forward with relentless momentum.',
    icon: <Scissors className="w-6 h-6 text-brand-orange" />,
    badge: 'A-Roll Sculpting',
    tags: ['AVD Pacing', 'Story Arc', 'Tight Cuts'],
  },
  {
    step: '03',
    title: 'Hook & Pattern Interrupts',
    subtitle: 'Algorithmic Retention Engineering',
    desc: 'Engineering the crucial first 3-second visual hook. Injecting dynamic punch-ins, B-roll overlays, split screens, and pattern interrupts every 4-6 seconds.',
    icon: <Flame className="w-6 h-6 text-brand-orange" />,
    badge: 'High CTR & AVD',
    tags: ['Viral Hook', 'Pattern Interrupts', 'Punch-Ins'],
  },
  {
    step: '04',
    title: 'Kinetic Motion & 3D VFX',
    subtitle: 'After Effects & Blender Compositing',
    desc: 'Integrating kinetic auto-captions, custom 3D element tracking, paper-tear collage animations, screen mockups, and sleek lower thirds.',
    icon: <Layers className="w-6 h-6 text-brand-electric" />,
    badge: 'Visual Dopamine',
    tags: ['3D Tracking', 'Kinetic Typography', 'CGI Compositing'],
  },
  {
    step: '05',
    title: 'Immersive Foley & Sound Architecture',
    subtitle: 'Spatial Transitions & Sub-Bass Impacts',
    desc: 'Layering cinematic whooshes, atmospheric room tone, tactile Foley, riser builds, and sub-bass drops mixed to broadcast loudness standards.',
    icon: <Volume2 className="w-6 h-6 text-emerald-400" />,
    badge: 'Spatial Audio',
    tags: ['Foley Design', 'Sub Impacts', 'Voice Clarity'],
  },
  {
    step: '06',
    title: 'DaVinci Color Science & Master 4K',
    subtitle: 'Shot-Matching & Film Emulation Delivery',
    desc: 'Balancing skin tones, applying Kodak 2383 35mm film emulation, halation, and rendering crisp master deliverables optimized for YouTube 4K & Reels.',
    icon: <Sparkles className="w-6 h-6 text-brand-electric" />,
    badge: 'Cinema Master',
    tags: ['Kodak 2383', 'Rec.709 HDR', '16:9 & 9:16 Delivery'],
  },
];

const EditingWorkflow = () => {
  return (
    <section
      id="workflow"
      className="py-12 md:py-16 px-4 md:px-8 bg-brand-navy text-brand-text relative overflow-hidden border-t border-[var(--card-border)]"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-brand-electric/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-electric/10 border border-brand-electric/20 text-brand-electric text-xs font-semibold tracking-widest uppercase mb-4">
            <Clock className="w-3.5 h-3.5" /> Systematic Post-Production
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-brand-heading">
            From Raw Footage to{' '}
            <span className="bg-gradient-to-r from-brand-electric to-brand-orange bg-clip-text text-transparent">
              4K Master Delivery
            </span>
          </h2>
          <p className="mt-4 text-brand-muted max-w-2xl mx-auto text-base md:text-lg">
            A battle-tested 6-stage post-production pipeline engineered to eliminate friction, maximize audience watch time, and deliver broadcast-grade polish on time, every time.
          </p>
        </div>

        {/* 6-Stage Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {STAGES.map((stage, index) => (
            <motion.div
              key={stage.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-7 rounded-3xl bg-brand-navy-light border border-[var(--card-border)] hover:border-brand-electric/40 backdrop-blur-xl shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header: Step Number & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-[var(--card-border)] group-hover:bg-brand-electric/10 group-hover:border-brand-electric/30 transition-colors">
                    {stage.icon}
                  </div>
                  <span className="text-2xl font-black font-mono text-brand-muted/40 group-hover:text-brand-electric transition-colors">
                    {stage.step}
                  </span>
                </div>

                {/* Badge & Subtitle */}
                <div className="mb-2">
                  <span className="text-[11px] font-mono font-bold text-brand-electric uppercase tracking-widest">
                    {stage.subtitle}
                  </span>
                  <h3 className="text-xl font-extrabold text-brand-heading mt-1 group-hover:text-brand-electric transition-colors">
                    {stage.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-brand-muted text-sm leading-relaxed mt-3">
                  {stage.desc}
                </p>
              </div>

              {/* Tags Footer */}
              <div className="pt-6 mt-6 border-t border-[var(--card-border)] flex flex-wrap gap-2">
                {stage.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-medium bg-white/5 text-brand-muted border border-[var(--card-border)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EditingWorkflow;
