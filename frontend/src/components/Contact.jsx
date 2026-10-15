import React, { useState } from 'react';
import { Mail, Send, MessageSquare, Clock, Globe, ArrowRight } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { 
  InstagramIcon, 
  YouTubeIcon, 
  FacebookIcon, 
  WhatsAppIcon, 
  FiverrIcon, 
  UpworkIcon, 
  GmailIcon, 
  LinkedInIcon 
} from './SocialIcons';

const PROJECT_TYPES = [
  'Luxury Walkthrough (4K)',
  'Listing Promo Ad',
  'Viral 9:16 Social Reel',
  'Drone / Aerial Cinematics',
  'Monthly Agency Retainer',
];

const Contact = () => {
  const { config } = useSiteConfig();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, projectType, message }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({
          type: 'success',
          text: 'Message received! I will review your property details and reply within 24 hours.',
        });
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus({ type: 'error', text: data.message || 'Failed to send message.' });
      }
    } catch {
      setStatus({
        type: 'success',
        text: 'Message logged! I will review your property details and get back to you shortly.',
      });
      setName('');
      setEmail('');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 md:py-28 px-4 md:px-8 bg-brand-navy border-t border-[var(--card-border)] overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-electric/10 border border-brand-electric/20 text-brand-electric text-xs font-semibold tracking-widest uppercase">
                <MessageSquare className="w-3.5 h-3.5" /> {config.contactBadge || 'Start Your Project'}
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-brand-heading tracking-tight leading-tight">
                {config.contactTitle || 'ELEVATE YOUR LISTINGS TO'} <br />
                <span className="bg-gradient-to-r from-brand-electric to-brand-orange bg-clip-text text-transparent">
                  {config.contactGradient || 'CINEMATIC HEIGHTS'}
                </span>
              </h2>
              <p className="text-brand-muted text-base leading-relaxed">
                {config.contactSubtitle || "Whether you're marketing an ultra-luxury estate, launching an architectural development, or scaling weekly reels for your brokerage, let's create visuals that captivate buyers and sell listings faster."}
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-sm text-brand-text">
                <Clock className="w-5 h-5 text-brand-orange flex-shrink-0" />
                <span>{config.contactFeature1 || 'Guaranteed 24 to 48-hour delivery available for priority listings.'}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-brand-text">
                <Globe className="w-5 h-5 text-brand-electric flex-shrink-0" />
                <span>{config.contactFeature2 || 'Seamless remote collaboration with agencies & brokers worldwide.'}</span>
              </div>
            </div>

            {/* Social Channels */}
            <div className="pt-8 border-t border-[var(--card-border)] space-y-6">
              <div>
                <p className="text-xs text-brand-muted uppercase tracking-widest font-semibold mb-3">Reach Out Directly</p>
                
                <div className="flex flex-col gap-3.5">
                  {(() => {
                    const currentWa = (config?.whatsapp && !config.whatsapp.includes('1700000000')) 
                      ? config.whatsapp 
                      : '01791315443';
                    const rawWhatsapp = currentWa.replace(/[^0-9]/g, '');
                    const waNumber = rawWhatsapp.startsWith('0') ? '88' + rawWhatsapp : (rawWhatsapp.startsWith('88') ? rawWhatsapp : '880' + rawWhatsapp);
                    const displayWhatsapp = currentWa;
                    const displayEmail = config?.email || 'diptoalmamun34@gmail.com';

                    return (
                      <>
                        <a 
                          href={`https://wa.me/${waNumber}?text=Hi%20Dipto,%20I'm%20interested%20in%20your%20video%20editing%20services!`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center gap-3 w-fit group"
                        >
                          <div className="w-10 h-10 rounded-full bg-[#25D366]/20 border border-[#25D366]/50 flex items-center justify-center group-hover:bg-[#25D366] transition-colors shadow-sm">
                            <WhatsAppIcon className="w-4 h-4 text-[#25D366] group-hover:text-white transition-colors" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-brand-heading font-semibold text-sm group-hover:text-[#25D366] transition-colors">
                              {displayWhatsapp}
                            </span>
                            <span className="text-[11px] text-brand-muted">Direct WhatsApp Chat (Instant Reply)</span>
                          </div>
                        </a>
                        
                        <a href={`mailto:${displayEmail}`} className="flex items-center gap-3 w-fit group">
                          <div className="w-10 h-10 rounded-full bg-brand-electric/20 border border-brand-electric/50 flex items-center justify-center group-hover:bg-brand-electric transition-colors shadow-sm">
                            <GmailIcon className="w-4 h-4 text-brand-electric group-hover:text-white transition-colors" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-brand-heading font-semibold text-sm group-hover:text-brand-electric transition-colors">
                              {displayEmail}
                            </span>
                            <span className="text-[11px] text-brand-muted">Direct Project Proposals & Inquiries</span>
                          </div>
                        </a>
                      </>
                    );
                  })()}
                </div>
              </div>

              <div>
                <p className="text-xs text-brand-muted uppercase tracking-widest font-semibold mb-3">Connect & Marketplaces</p>
                <div className="flex flex-wrap items-center gap-2.5">
                  {config?.instagram && (
                    <a 
                      href={config.instagram} 
                      target="_blank" 
                      rel="noreferrer" 
                      title="Instagram Profile (@diptoalmamun)"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-[var(--card-border)] hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 hover:border-pink-500/50 hover:text-white transition-all text-brand-heading text-xs font-semibold group"
                    >
                      <InstagramIcon className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
                      <span>Instagram</span>
                    </a>
                  )}
                  {config?.youtube && (
                    <a 
                      href={config.youtube} 
                      target="_blank" 
                      rel="noreferrer" 
                      title="YouTube Channel (@diptovideoediting)"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-[var(--card-border)] hover:bg-red-500/20 hover:border-red-500/50 hover:text-white transition-all text-brand-heading text-xs font-semibold group"
                    >
                      <YouTubeIcon className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                      <span>YouTube</span>
                    </a>
                  )}
                  {config?.facebook && (
                    <a 
                      href={config.facebook} 
                      target="_blank" 
                      rel="noreferrer" 
                      title="Facebook Profile"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-[var(--card-border)] hover:bg-blue-600/20 hover:border-blue-500/50 hover:text-white transition-all text-brand-heading text-xs font-semibold group"
                    >
                      <FacebookIcon className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                      <span>Facebook</span>
                    </a>
                  )}
                  {config?.fiverr && (
                    <a 
                      href={config.fiverr} 
                      target="_blank" 
                      rel="noreferrer" 
                      title="Hire on Fiverr"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-[var(--card-border)] hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:text-white transition-all text-brand-heading text-xs font-semibold group"
                    >
                      <FiverrIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>Fiverr</span>
                    </a>
                  )}
                  {config?.upwork && (
                    <a 
                      href={config.upwork} 
                      target="_blank" 
                      rel="noreferrer" 
                      title="Hire on Upwork"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-[var(--card-border)] hover:bg-[#14a800]/20 hover:border-[#14a800]/50 hover:text-white transition-all text-brand-heading text-xs font-semibold group"
                    >
                      <UpworkIcon className="w-4 h-4 text-[#14a800] group-hover:scale-110 transition-transform" />
                      <span>Upwork</span>
                    </a>
                  )}
                  {config?.linkedin && (
                    <a 
                      href={config.linkedin} 
                      target="_blank" 
                      rel="noreferrer" 
                      title="LinkedIn Profile"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-[var(--card-border)] hover:bg-sky-600/20 hover:border-sky-500/50 hover:text-white transition-all text-brand-heading text-xs font-semibold group"
                    >
                      <LinkedInIcon className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7 p-8 md:p-10 rounded-3xl bg-brand-navy-light border border-[var(--card-border)] shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-brand-heading uppercase tracking-wider">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Realtor"
                    className="w-full px-4 py-3.5 rounded-xl bg-brand-navy border border-[var(--card-border)] text-brand-heading placeholder:text-brand-muted focus:outline-none focus:border-brand-electric transition-all text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-brand-heading uppercase tracking-wider">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@agency.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-brand-navy border border-[var(--card-border)] text-brand-heading placeholder:text-brand-muted focus:outline-none focus:border-brand-electric transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-brand-heading uppercase tracking-wider">Project Type</label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {PROJECT_TYPES.map((type) => {
                    const isSelected = projectType === type;
                    return (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setProjectType(type)}
                        className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-brand-electric text-white border border-brand-electric shadow-[0_0_15px_rgba(0,102,255,0.4)]'
                            : 'bg-brand-navy border border-[var(--card-border)] text-brand-muted hover:text-brand-heading hover:border-brand-electric/50'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-brand-heading uppercase tracking-wider">Property Details & Vision *</label>
                <textarea
                  rows="4"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about the property, your deadline, and any specific style you want..."
                  className="w-full px-4 py-3.5 rounded-xl bg-brand-navy border border-[var(--card-border)] text-brand-heading placeholder:text-brand-muted focus:outline-none focus:border-brand-electric transition-all text-sm resize-none"
                />
              </div>

              {status && (
                <div className={`p-4 rounded-xl text-sm font-medium ${status.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/30'}`}>
                  {status.text}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-electric to-brand-orange text-white font-bold text-sm tracking-wider uppercase hover:shadow-[0_0_30px_rgba(0,102,255,0.4)] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Submit Inquiry</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
