import React from 'react';
import { motion } from 'framer-motion';
import { Video, Home, Wind, Zap, Camera, Scissors, PaintBucket, Type, Headphones } from 'lucide-react';

const services = [
  { icon: Home, title: 'Property Walkthroughs', desc: 'Smooth, stabilizing-gimbal tours that highlight architectural flow and space.' },
  { icon: Zap, title: 'Listing Ads', desc: 'Fast-paced, energetic promos engineered to stop the scroll on social media.' },
  { icon: Wind, title: 'Drone Footage', desc: 'Aerial cinematography showcasing property lines, neighborhoods, and epic views.' },
  { icon: Camera, title: 'Natural B-Roll', desc: 'Detail shots of premium finishes, lighting fixtures, and lifestyle elements.' },
  { icon: Video, title: 'Reels & Shorts', desc: 'Vertical 9:16 optimized content with engaging hooks for IG and TikTok.' },
  { icon: Scissors, title: 'Cinematic Editing', desc: 'Pacing that tells a story, keeping viewers engaged from start to finish.' },
  { icon: PaintBucket, title: 'Color Grading', desc: 'Professional color correction making skies bluer and interiors warmer.' },
  { icon: Type, title: 'Dynamic Captions', desc: 'Burned-in animated text to convey key property stats and agent info.' },
  { icon: Headphones, title: 'Sound Design', desc: 'Layered audio tracks (wind, birds, subtle whooshes) for immersive viewing.' },
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-brand-navy border-t border-[var(--card-border)] relative z-10">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-electric/10 border border-brand-electric/20 text-brand-electric text-xs font-semibold tracking-widest uppercase mb-4"
          >
            <Scissors className="w-3.5 h-3.5" /> What I Do
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-brand-heading tracking-tight mb-4"
          >
            End-to-End <span className="bg-gradient-to-r from-brand-electric to-brand-orange bg-clip-text text-transparent">Post-Production</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-brand-muted max-w-2xl mx-auto text-base"
          >
            Everything you need to turn raw camera files into a polished, high-converting listing video.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 rounded-2xl bg-brand-navy-light border border-[var(--card-border)] hover:border-brand-electric/50 hover:shadow-[0_10px_30px_rgba(0,102,255,0.15)] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-navy border border-[var(--card-border)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg group-hover:bg-brand-electric/10 group-hover:border-brand-electric/30">
                  <Icon className="w-6 h-6 text-brand-electric" />
                </div>
                <h3 className="text-xl font-bold text-brand-heading mb-2">{service.title}</h3>
                <p className="text-brand-muted text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
