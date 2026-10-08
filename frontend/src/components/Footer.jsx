import React from 'react';
import { Film, Instagram, Youtube, Linkedin } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

const Footer = () => {
  const { config } = useSiteConfig();

  return (
    <footer className="bg-brand-navy-light text-brand-muted py-8 md:py-10 relative border-t border-[var(--card-border)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 text-xs md:text-sm">
        {/* Brand & Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-electric to-brand-orange flex items-center justify-center text-white shadow-md shadow-brand-electric/20">
            <Film className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-bold text-brand-heading tracking-wide">{config.brandName || 'DIPTO VISUALS'}</span>
            <span className="block text-[11px] text-brand-muted font-mono">{config.tagline || 'Real Estate Video Editor'}</span>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-3">
          {config.instagram && (
            <a href={config.instagram} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-electric hover:text-white border border-[var(--card-border)] flex items-center justify-center transition-all text-brand-heading">
              <Instagram className="w-4 h-4" />
            </a>
          )}
          {config.youtube && (
            <a href={config.youtube} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-electric hover:text-white border border-[var(--card-border)] flex items-center justify-center transition-all text-brand-heading">
              <Youtube className="w-4 h-4" />
            </a>
          )}
          {config.linkedin && (
            <a href={config.linkedin} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-electric hover:text-white border border-[var(--card-border)] flex items-center justify-center transition-all text-brand-heading">
              <Linkedin className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Copyright */}
        <div className="text-center md:text-right text-brand-muted text-xs">
          <p>© {new Date().getFullYear()} {config.ownerName || 'Md Tohidul Islam'}. All Rights Reserved.</p>
          <p className="text-[11px] text-brand-subtle mt-0.5">Engineered for High-Converting Visual Storytelling</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
