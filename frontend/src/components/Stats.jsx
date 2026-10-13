import React from 'react';
import { motion } from 'framer-motion';
import { useSiteConfig } from '../context/SiteConfigContext';

const Stats = () => {
  const { config } = useSiteConfig();

  const statsList = Array.isArray(config.stats) && config.stats.length > 0
    ? config.stats
    : [
        { value: config.videosEdited || '500+', label: 'Videos Edited' },
        { value: config.viewsGenerated || '100M+', label: 'Views Generated' },
        { value: config.experienceYears || '5+', label: 'Years Experience' },
        { value: config.clientSatisfaction || '99%', label: 'Client Satisfaction' }
      ];

  return (
    <section className="py-12 bg-brand-navy border-t border-[var(--card-border)] relative z-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-[var(--card-border)]">
          {statsList.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="flex flex-col items-center justify-center text-center px-4"
            >
              <h3 className="text-4xl sm:text-5xl font-black text-brand-heading mb-2 tracking-tight">
                {stat.value}
              </h3>
              <p className="text-brand-muted text-xs sm:text-sm uppercase tracking-widest font-semibold">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
