import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Star } from 'lucide-react';
import { useSiteConfig, DEFAULT_WHY_CHOOSE_US } from '../context/SiteConfigContext';

const WhyChooseUs = () => {
  const { config } = useSiteConfig();
  const reasonsList = Array.isArray(config.whyChooseUsReasons) && config.whyChooseUsReasons.length > 0
    ? config.whyChooseUsReasons
    : DEFAULT_WHY_CHOOSE_US.reasons;

  const imgSrc = config.whyChooseUsImage && config.whyChooseUsImage.startsWith('/uploads')
    ? `http://localhost:5000${config.whyChooseUsImage}`
    : (config.whyChooseUsImage || DEFAULT_WHY_CHOOSE_US.image);

  return (
    <section id="why-us" className="py-20 md:py-28 bg-brand-navy border-t border-[var(--card-border)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-electric/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-semibold tracking-widest uppercase mb-4">
              <Star className="w-3.5 h-3.5" /> {config.whyChooseUsBadge || 'The Dipto Visuals Advantage'}
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-brand-heading leading-tight mb-6">
              {config.whyChooseUsTitle || 'Visual Storytelling That'}{' '}
              <span className="bg-gradient-to-r from-brand-electric to-brand-orange bg-clip-text text-transparent">
                {config.whyChooseUsGradient || 'Commands High Valuation'}
              </span>
            </h2>
            <p className="text-brand-muted text-base md:text-lg mb-8 leading-relaxed">
              {config.whyChooseUsSubtitle || DEFAULT_WHY_CHOOSE_US.subtitle}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reasonsList.map((reason, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-brand-electric flex-shrink-0" />
                  <span className="text-brand-heading font-semibold text-sm sm:text-base">{reason}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-square md:aspect-[4/3] shadow-2xl border border-[var(--card-border)] group">
              <div className="absolute inset-0 bg-brand-navy/20 group-hover:bg-transparent transition-colors z-10" />
              <img 
                src={imgSrc} 
                alt="Premium Editing Workspace"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-electric/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-orange/20 rounded-full blur-2xl pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
