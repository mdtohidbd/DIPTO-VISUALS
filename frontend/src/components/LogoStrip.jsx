import React from 'react';
import { Building2, Home, Key, MapPin } from 'lucide-react';

const logos = [
  { icon: Building2, name: "Century 21" },
  { icon: Home, name: "RE/MAX" },
  { icon: Key, name: "Coldwell Banker" },
  { icon: MapPin, name: "Keller Williams" },
  { icon: Building2, name: "Sotheby's" },
  { icon: Home, name: "Compass" },
];

const LogoStrip = () => {
  // Duplicate array to create seamless loop
  const loopLogos = [...logos, ...logos, ...logos];

  return (
    <section className="py-10 bg-brand-navy border-t border-[var(--card-border)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 mb-6 text-center">
        <p className="text-brand-muted text-xs font-semibold tracking-widest uppercase">
          Trusted by top real estate agencies
        </p>
      </div>

      <div className="relative w-full flex items-center overflow-hidden h-20">
        {/* Left and Right fades for smooth entrance/exit */}
        <div className="absolute left-0 top-0 w-28 sm:w-36 h-full bg-gradient-to-r from-brand-navy to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-28 sm:w-36 h-full bg-gradient-to-l from-brand-navy to-transparent z-10 pointer-events-none" />

        <div className="flex animate-[film-roll_25s_linear_infinite] whitespace-nowrap items-center w-max">
          {loopLogos.map((logo, index) => {
            const Icon = logo.icon;
            return (
              <div 
                key={index} 
                className="logo-strip-item flex items-center justify-center gap-2.5 px-10 text-brand-heading opacity-50 hover:opacity-100 transition-all duration-300 cursor-default"
              >
                <Icon className="w-6 h-6 text-brand-electric" />
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
