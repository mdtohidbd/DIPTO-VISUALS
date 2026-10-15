import { Film } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { 
  InstagramIcon, 
  YouTubeIcon, 
  FacebookIcon, 
  WhatsAppIcon, 
  FiverrIcon, 
  UpworkIcon, 
  LinkedInIcon 
} from './SocialIcons';

const Footer = () => {
  const { config } = useSiteConfig();

  const rawWhatsapp = (config?.whatsapp || '01791315443').replace(/[^0-9]/g, '');
  const waNumber = rawWhatsapp.startsWith('0') ? '88' + rawWhatsapp : (rawWhatsapp.startsWith('88') ? rawWhatsapp : '880' + rawWhatsapp);

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
        <div className="flex items-center gap-2.5 flex-wrap justify-center">
          {config.instagram && (
            <a 
              href={config.instagram} 
              target="_blank" 
              rel="noreferrer" 
              title="Instagram"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-pink-600 hover:text-white border border-[var(--card-border)] flex items-center justify-center transition-all text-brand-heading"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
          )}
          {config.youtube && (
            <a 
              href={config.youtube} 
              target="_blank" 
              rel="noreferrer" 
              title="YouTube"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-red-600 hover:text-white border border-[var(--card-border)] flex items-center justify-center transition-all text-brand-heading"
            >
              <YouTubeIcon className="w-4 h-4" />
            </a>
          )}
          {config.facebook && (
            <a 
              href={config.facebook} 
              target="_blank" 
              rel="noreferrer" 
              title="Facebook"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-blue-600 hover:text-white border border-[var(--card-border)] flex items-center justify-center transition-all text-brand-heading"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>
          )}
          <a 
            href={`https://wa.me/${waNumber}?text=Hi%20Dipto,%20I'm%20interested%20in%20your%20video%20editing%20services!`} 
            target="_blank" 
            rel="noreferrer" 
            title="WhatsApp"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#25D366] hover:text-white border border-[var(--card-border)] flex items-center justify-center transition-all text-brand-heading"
          >
            <WhatsAppIcon className="w-4 h-4" />
          </a>
          {config.fiverr && (
            <a 
              href={config.fiverr} 
              target="_blank" 
              rel="noreferrer" 
              title="Fiverr"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-emerald-500 hover:text-white border border-[var(--card-border)] flex items-center justify-center transition-all text-brand-heading"
            >
              <FiverrIcon className="w-4 h-4" />
            </a>
          )}
          {config.upwork && (
            <a 
              href={config.upwork} 
              target="_blank" 
              rel="noreferrer" 
              title="Upwork"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#14a800] hover:text-white border border-[var(--card-border)] flex items-center justify-center transition-all text-brand-heading"
            >
              <UpworkIcon className="w-4 h-4" />
            </a>
          )}
          {config.linkedin && (
            <a 
              href={config.linkedin} 
              target="_blank" 
              rel="noreferrer" 
              title="LinkedIn"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-sky-600 hover:text-white border border-[var(--card-border)] flex items-center justify-center transition-all text-brand-heading"
            >
              <LinkedInIcon className="w-4 h-4" />
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
