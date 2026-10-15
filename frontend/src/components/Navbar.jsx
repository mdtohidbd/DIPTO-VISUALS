import React, { useState, useEffect } from 'react';
import { Menu, X, Home, ArrowUpRight } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

const Navbar = () => {
  const { config } = useSiteConfig();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Works', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Reviews', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
  ];

  const brandParts = (config.brandName || 'DIPTO VISUALS').split(' ');
  const brandFirst = brandParts[0] || 'DIPTO';
  const brandRest = brandParts.slice(1).join(' ') || 'VISUALS';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 py-3 pointer-events-none transition-all duration-300">
      <div
        className={`pointer-events-auto w-full max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full transition-all duration-500 ${
          scrolled
            ? 'cinema-glass-heavy shadow-2xl'
            : 'bg-transparent border border-transparent'
        }`}
      >
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group outline-none flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-electric to-brand-orange flex items-center justify-center shadow-[0_0_15px_rgba(0,102,255,0.4)] group-hover:scale-105 transition-transform text-white">
            <Home className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-brand-heading whitespace-nowrap">
              {brandFirst} <span className="bg-gradient-to-r from-brand-electric to-brand-orange bg-clip-text text-transparent">{brandRest}</span>
            </span>
            <span className="text-[10px] font-medium text-brand-muted tracking-widest uppercase whitespace-nowrap">
              {config.tagline || 'Real Estate Video Editing'}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center space-x-1.5 bg-white/[0.04] border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-1.5 text-sm font-semibold text-brand-muted hover:text-brand-heading transition-colors duration-200 relative group whitespace-nowrap"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-brand-electric to-brand-orange rounded-full transition-all duration-300 group-hover:w-3/4" />
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-4 flex-shrink-0">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal', { detail: { package: null } }))}
            className="group relative inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-brand-electric to-brand-orange text-white text-sm font-bold shadow-lg shadow-brand-electric/30 hover:shadow-brand-electric/50 hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer"
          >
            <span>Get a Quote</span>
            <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="xl:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-brand-heading hover:text-brand-electric transition-colors pointer-events-auto"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto fixed inset-0 z-40 bg-brand-navy/98 backdrop-blur-2xl flex flex-col items-center justify-center p-8 space-y-8 xl:hidden animate-in fade-in duration-200">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 text-brand-heading"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex flex-col items-center space-y-6 text-center">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-bold text-brand-heading hover:text-brand-electric transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-8 w-full max-w-xs">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                window.dispatchEvent(new CustomEvent('open-booking-modal', { detail: { package: null } }));
              }}
              className="flex justify-center items-center gap-2 w-full py-4 rounded-full bg-gradient-to-r from-brand-electric to-brand-orange text-white font-bold shadow-lg shadow-brand-electric/40 text-lg cursor-pointer"
            >
              Get a Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
