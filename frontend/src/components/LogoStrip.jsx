import React from 'react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { DynamicIcon } from '../utils/iconMap';
import { Building2 } from 'lucide-react';

const LogoStrip = () => {
  const { config } = useSiteConfig();
  const rawLogos = Array.isArray(config.logos) && config.logos.length > 0
    ? config.logos
    : [
        { name: "Century 21", icon: 'Building2' },
        { name: "RE/MAX", icon: 'Home' },
        { name: "Coldwell Banker", icon: 'Key' },
        { name: "Keller Williams", icon: 'MapPin' },
        { name: "Sotheby's", icon: 'Building2' },
        { name: "Compass", icon: 'Home' },
      ];

  // Duplicate array to create seamless loop
  const loopLogos = [...rawLogos, ...rawLogos, ...rawLogos];

  return (
    <section className="py-10 bg-brand-navy border-t border-[var(--card-border)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 mb-6 text-center">
        <p className="text-brand-muted text-xs font-semibold tracking-widest uppercase">
          {config.logosTitle || 'Trusted by top real estate agencies'}
        </p>
      </div>

      <div className="relative w-full flex items-center overflow-hidden h-20">
        {/* Left and Right fades for smooth entrance/exit */}
        <div className="absolute left-0 top-0 w-28 sm:w-36 h-full bg-gradient-to-r from-brand-navy to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-28 sm:w-36 h-full bg-gradient-to-l from-brand-navy to-transparent z-10 pointer-events-none" />

        <div className="flex animate-[film-roll_25s_linear_infinite] whitespace-nowrap items-center w-max">
          {loopLogos.map((logo, index) => {
            return (
              <div 
                key={index} 
                className="logo-strip-item flex items-center justify-center gap-2.5 px-10 text-brand-heading opacity-60 hover:opacity-100 transition-all duration-300 cursor-default"
              >
                <DynamicIcon name={logo.icon || 'Building2'} className="w-6 h-6 text-brand-electric" fallback={Building2} />
                <span className="text-lg sm:text-xl font-extrabold tracking-tight">{logo.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LogoStrip;
