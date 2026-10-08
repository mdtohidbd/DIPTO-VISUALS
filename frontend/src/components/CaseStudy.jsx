import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, CheckCircle, Video } from 'lucide-react';

const CaseStudy = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-20 md:py-28 bg-brand-navy-light relative overflow-hidden border-t border-[var(--card-border)]">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-electric/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-brand-heading mb-4">
            Case Study: <span className="bg-gradient-to-r from-brand-electric to-brand-orange bg-clip-text text-transparent">Luxury Villa</span>
          </h2>
          <p className="text-brand-muted max-w-2xl mx-auto">
            How cinematic editing turned a stagnant $2.5M listing into a bidding war within 14 days.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Video Placeholder */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="relative rounded-2xl overflow-hidden aspect-video border border-[var(--card-border)] shadow-[0_0_40px_rgba(0,102,255,0.15)] group cursor-pointer"
          >
            <div className="absolute inset-0 bg-brand-navy/40 group-hover:bg-brand-navy/20 transition-colors z-10 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-brand-electric/90 backdrop-blur flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform text-white">
                <Video className="w-6 h-6 text-white" />
              </div>
            </div>
            {/* Placeholder image for case study */}
            <img 
              src="https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Luxury Villa Listing"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Right: Problem, Solution, Result */}
          <div className="space-y-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="relative pl-6 border-l-2 border-red-500/50"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-brand-navy border-2 border-red-500" />
              <h3 className="text-xl font-bold text-brand-heading mb-2 uppercase tracking-wide">The Problem</h3>
              <p className="text-brand-muted">
                The agency had standard raw drone and interior footage, but it lacked emotion. The property had been on the market for 6 months with minimal inquiries because the visuals felt flat and generic.
              </p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="relative pl-6 border-l-2 border-brand-electric/50"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-brand-navy border-2 border-brand-electric" />
              <h3 className="text-xl font-bold text-brand-heading mb-2 uppercase tracking-wide">The Solution</h3>
              <p className="text-brand-muted">
                I re-edited the timeline with a dynamic pacing strategy, added speed ramps to highlight architectural flow, implemented premium color grading to make the lighting pop, and layered a cinematic soundscape (birds, wind, subtle whooshes).
              </p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="relative pl-6 border-l-2 border-emerald-500/50"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-brand-navy border-2 border-emerald-500" />
              <h3 className="text-xl font-bold text-brand-heading mb-2 uppercase tracking-wide">The Result</h3>
              <ul className="space-y-2 text-brand-text">
                <li className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400 flex-shrink-0" /> 
                  <span><strong className="font-bold text-brand-heading">45,000+ Views</strong> across IG & YouTube in 48 hours.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" /> 
                  <span><strong className="font-bold text-brand-heading">12 Private Showings</strong> booked directly from the video.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" /> 
                  <span>Sold <strong className="font-bold text-brand-heading">above asking price</strong> in 14 days.</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;
