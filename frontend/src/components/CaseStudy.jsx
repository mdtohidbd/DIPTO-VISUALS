import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, CheckCircle, Video } from 'lucide-react';
import { useSiteConfig, DEFAULT_CASE_STUDY } from '../context/SiteConfigContext';
import { getMediaUrl } from '../utils/apiConfig';

const CaseStudy = () => {
  const { config } = useSiteConfig();
  const cs = config.caseStudy || DEFAULT_CASE_STUDY;

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const imageSrc = getMediaUrl(cs.image || DEFAULT_CASE_STUDY.image);

  const resultsList = Array.isArray(cs.results) && cs.results.length > 0
    ? cs.results
    : DEFAULT_CASE_STUDY.results;

  return (
    <section className="py-20 md:py-28 bg-brand-navy-light relative overflow-hidden border-t border-[var(--card-border)]">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-electric/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-semibold tracking-widest uppercase mb-4">
            {cs.badge || 'Proven Market Impact'}
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-brand-heading mb-4">
            {cs.title || 'Case Study: $4.8M Architectural Villa'}
          </h2>
          <p className="text-brand-muted max-w-2xl mx-auto text-base">
            {cs.subtitle || 'How transformative cinematic pacing and DaVinci color science turned a dormant listing into a bidding frenzy within 14 days.'}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Video Placeholder */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            data-cursor="play"
            data-cursor-text="CASE STUDY"
            className="relative rounded-2xl overflow-hidden aspect-video border border-[var(--card-border)] shadow-[0_0_40px_rgba(0,102,255,0.15)] group cursor-pointer"
          >
            <div className="absolute inset-0 bg-brand-navy/40 group-hover:bg-brand-navy/20 transition-colors z-10 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-brand-electric/90 backdrop-blur flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform text-white">
                <Video className="w-6 h-6 text-white" />
              </div>
            </div>
            {/* Image for case study */}
            <img 
              src={imageSrc} 
              alt={cs.title || "Luxury Villa Listing"}
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
              <h3 className="text-xl font-bold text-brand-heading mb-2 uppercase tracking-wide">
                {cs.challengeTitle || 'The Challenge'}
              </h3>
              <p className="text-brand-muted leading-relaxed">
                {cs.challengeDesc || DEFAULT_CASE_STUDY.challengeDesc}
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
              <h3 className="text-xl font-bold text-brand-heading mb-2 uppercase tracking-wide">
                {cs.solutionTitle || 'The Strategic Edit'}
              </h3>
              <p className="text-brand-muted leading-relaxed">
                {cs.solutionDesc || DEFAULT_CASE_STUDY.solutionDesc}
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
              <h3 className="text-xl font-bold text-brand-heading mb-2 uppercase tracking-wide">
                {cs.resultsTitle || 'The Results'}
              </h3>
              <ul className="space-y-2.5 text-brand-text">
                {resultsList.map((resItem, rIdx) => (
                  <li key={rIdx} className="flex items-center gap-2.5">
                    <TrendingUp className="w-4 h-4 text-emerald-400 flex-shrink-0" /> 
                    <span>
                      <strong className="font-bold text-brand-heading">{resItem.metric}</strong>{' '}
                      {resItem.label}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;
