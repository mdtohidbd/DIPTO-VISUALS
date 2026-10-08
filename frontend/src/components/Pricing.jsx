import React from 'react';
import { motion } from 'framer-motion';
import { Check, CreditCard, ArrowRight } from 'lucide-react';

const packages = [
  {
    name: 'Standard Listing',
    price: '$150',
    desc: 'Perfect for standard family homes and fast turnaround.',
    features: [
      'Up to 2 minutes duration',
      'Basic Color Correction',
      'Standard Smooth Pacing',
      'Agent Logo Intro/Outro',
      '1 Revision Round'
    ],
    highlight: false
  },
  {
    name: 'Premium Cinematic',
    price: '$250',
    desc: 'Our most popular package for luxury homes.',
    features: [
      'Up to 4 minutes duration',
      'Hollywood Color Grading',
      'Advanced Sound Design',
      'Drone Footage Integration',
      'Speed Ramping & VFX',
      '2 Revision Rounds',
      'Vertical Reel Included'
    ],
    highlight: true
  },
  {
    name: 'Social Media Kit',
    price: '$100',
    desc: 'Designed exclusively for Instagram & TikTok reach.',
    features: [
      'Up to 60 seconds duration',
      'Vertical 9:16 Format',
      'Dynamic Subtitles',
      'Trending Audio Sync',
      'High-Retention Hooks',
      '1 Revision Round'
    ],
    highlight: false
  }
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-brand-navy border-t border-[var(--card-border)] relative z-10 overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-electric/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-electric/10 border border-brand-electric/20 text-brand-electric text-xs font-semibold tracking-widest uppercase mb-4">
            <CreditCard className="w-3.5 h-3.5" /> Transparent Pricing
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-brand-heading tracking-tight mb-4">
            Investment <span className="bg-gradient-to-r from-brand-electric to-brand-orange bg-clip-text text-transparent">Options</span>
          </h2>
          <p className="text-brand-muted max-w-2xl mx-auto text-base">
            Clear, straightforward packages. No hidden fees. Custom quotes available for multi-property retainers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className={`relative flex flex-col h-full p-8 rounded-3xl border transition-all duration-300 ${
                pkg.highlight 
                  ? 'bg-brand-navy-light border-brand-electric shadow-xl lg:-translate-y-4 ring-2 ring-brand-electric/30' 
                  : 'cinema-glass border-[var(--card-border)] hover:border-brand-electric/40'
              }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-brand-electric to-brand-orange text-white text-xs font-extrabold rounded-full uppercase tracking-wider shadow-lg keep-text-white badge-solid z-20">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-brand-heading mb-2">{pkg.name}</h3>
                <p className="text-brand-muted text-sm h-10">{pkg.desc}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-brand-heading">{pkg.price}</span>
                  <span className="text-brand-muted font-medium">/video</span>
                </div>
              </div>

              <ul className="flex-1 space-y-4 mb-8">
                {pkg.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 shrink-0 ${pkg.highlight ? 'text-brand-orange' : 'text-brand-electric'}`} />
                    <span className="text-brand-text text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <a 
                href="#contact" 
                className={`w-full py-4 rounded-xl flex justify-center items-center gap-2 font-bold transition-all duration-300 ${
                  pkg.highlight 
                    ? 'bg-gradient-to-r from-brand-electric to-brand-orange text-white hover:opacity-95 shadow-lg shadow-brand-electric/25 keep-text-white' 
                    : 'bg-white/5 hover:bg-brand-electric hover:text-white border border-[var(--card-border)] text-brand-heading'
                }`}
              >
                <span className={pkg.highlight ? 'text-white keep-text-white' : ''}>Book Now</span>
                <ArrowRight className={`w-4 h-4 ${pkg.highlight ? 'text-white' : ''}`} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
