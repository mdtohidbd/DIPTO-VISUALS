import React, { useState, useEffect, useRef } from 'react';
import { getMediaUrl } from '../utils/apiConfig';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, 
  Activity, 
  Clock, 
  ShieldCheck, 
  MessageSquare, 
  Layers, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Smartphone, 
  Monitor
} from 'lucide-react';
import { useSiteConfig, DEFAULT_WHY_CHOOSE_US } from '../context/SiteConfigContext';

const getIcon = (iconName, isActive) => {
  const baseClasses = "w-5 h-5 transition-transform duration-300";
  const activeClasses = isActive ? "scale-110" : "opacity-80";
  
  switch ((iconName || '').toLowerCase()) {
    case 'palette': 
      return <Palette className={`${baseClasses} ${activeClasses} ${isActive ? 'text-brand-electric' : 'text-blue-400'}`} />;
    case 'activity': 
      return <Activity className={`${baseClasses} ${activeClasses} ${isActive ? 'text-brand-orange' : 'text-orange-400'}`} />;
    case 'clock': 
      return <Clock className={`${baseClasses} ${activeClasses} ${isActive ? 'text-amber-400' : 'text-yellow-400'}`} />;
    case 'shield': 
      return <ShieldCheck className={`${baseClasses} ${activeClasses} ${isActive ? 'text-emerald-400' : 'text-green-400'}`} />;
    case 'messagesquare':
    case 'message': 
      return <MessageSquare className={`${baseClasses} ${activeClasses} ${isActive ? 'text-cyan-400' : 'text-teal-400'}`} />;
    case 'layers':
    case 'maximize': 
      return <Layers className={`${baseClasses} ${activeClasses} ${isActive ? 'text-purple-400' : 'text-violet-400'}`} />;
    default: 
      return <CheckCircle2 className={`${baseClasses} ${activeClasses} ${isActive ? 'text-brand-electric' : 'text-slate-400'}`} />;
  }
};

const WhyChooseUs = () => {
  const { config } = useSiteConfig();
  
  // Normalize items array
  const rawItems = Array.isArray(config.whyChooseUsItems) && config.whyChooseUsItems.length > 0
    ? config.whyChooseUsItems
    : DEFAULT_WHY_CHOOSE_US.items;

  // Fallback if legacy strings reasons exist
  const items = rawItems.map((item, idx) => {
    if (typeof item === 'string') {
      const fallbackTemplate = DEFAULT_WHY_CHOOSE_US.items[idx] || DEFAULT_WHY_CHOOSE_US.items[0];
      return {
        ...fallbackTemplate,
        id: `reason-${idx}`,
        title: item
      };
    }
    return item;
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [aspectRatio, setAspectRatio] = useState('16:9'); // '16:9' or '9:16'
  const [isPausedByUser, setIsPausedByUser] = useState(false);
  const videoRef = useRef(null);

  const activeItem = items[activeIndex] || items[0] || DEFAULT_WHY_CHOOSE_US.items[0];

  // Auto-cycle through advantages smoothly every 6 seconds unless user manually interacts
  useEffect(() => {
    if (isPausedByUser) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [items.length, isPausedByUser]);

  // Video playback sync
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [activeIndex, isPlaying, isMuted]);

  const handleSelectReason = (index) => {
    setActiveIndex(index);
    setIsPausedByUser(true);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
    setIsPausedByUser(true);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    setIsPausedByUser(true);
  };

  // Video source resolution: check active item first, then section video, then default
  const formatMediaUrl = (url) => {
    return getMediaUrl(url);
  };

  const currentMediaUrl = formatMediaUrl(
    activeItem.videoUrl || config.whyChooseUsVideoUrl || DEFAULT_WHY_CHOOSE_US.videoUrl
  );
  const currentImageUrl = formatMediaUrl(
    activeItem.image || config.whyChooseUsImage || DEFAULT_WHY_CHOOSE_US.image
  );

  const rawWhatsapp = (config?.whatsapp || '01791315443').replace(/[^0-9]/g, '');
  const waNumber = rawWhatsapp.startsWith('0') ? '88' + rawWhatsapp : (rawWhatsapp.startsWith('88') ? rawWhatsapp : '880' + rawWhatsapp);

  return (
    <section id="why-us" className="py-20 md:py-28 bg-brand-navy border-t border-[var(--card-border)] relative overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-electric/10 via-brand-orange/5 to-transparent pointer-events-none blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-electric/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Interactive Advantage Features */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/25 text-brand-orange text-xs font-semibold tracking-widest uppercase mb-4 shadow-sm">
                <Star className="w-3.5 h-3.5 fill-brand-orange text-brand-orange" />
                <span>{config.whyChooseUsBadge || 'The Dipto Visuals Advantage'}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-heading leading-[1.15] tracking-tight">
                {config.whyChooseUsTitle || 'Visual Storytelling That'}{' '}
                <span className="bg-gradient-to-r from-brand-electric to-brand-orange bg-clip-text text-transparent">
                  {config.whyChooseUsGradient || 'Commands High Valuation'}
                </span>
              </h2>

              <p className="text-brand-muted text-sm sm:text-base mt-4 leading-relaxed max-w-xl">
                {config.whyChooseUsSubtitle || DEFAULT_WHY_CHOOSE_US.subtitle}
              </p>
            </div>

            {/* Interactive Advantage Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {items.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={item.id || index}
                    type="button"
                    onClick={() => handleSelectReason(index)}
                    className={`relative text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 group overflow-hidden ${
                      isActive
                        ? 'bg-brand-navy-light border-brand-electric/60 shadow-[0_0_25px_rgba(0,102,255,0.25)] ring-1 ring-brand-electric/50'
                        : 'bg-brand-navy-light/40 hover:bg-brand-navy-light/80 border-[var(--card-border)] hover:border-brand-electric/30'
                    }`}
                  >
                    {/* Active progress indicator bar */}
                    {isActive && (
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 6, ease: 'linear' }}
                        className="absolute bottom-0 left-0 h-[2.5px] bg-gradient-to-r from-brand-electric via-brand-orange to-brand-electric"
                      />
                    )}

                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-xl flex-shrink-0 transition-colors ${
                        isActive 
                          ? 'bg-brand-electric/20 text-brand-electric border border-brand-electric/40' 
                          : 'bg-white/5 text-brand-muted border border-white/5 group-hover:bg-white/10 group-hover:text-brand-heading'
                      }`}>
                        {getIcon(item.icon, isActive)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className={`font-bold text-xs sm:text-sm truncate transition-colors ${
                          isActive ? 'text-brand-heading' : 'text-brand-heading/80 group-hover:text-brand-heading'
                        }`}>
                          {item.title}
                        </h3>

                        <p className="text-[11px] text-brand-muted leading-tight line-clamp-2 mt-1">
                          {item.subtitle || item.tag || 'Engineered for luxury real estate results.'}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Actions Row */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-electric to-brand-orange hover:from-brand-electric-hover hover:to-brand-orange text-white text-xs sm:text-sm font-bold shadow-lg shadow-brand-electric/30 hover:scale-[1.02] transition-all"
              >
                <span>Book This Editing Pipeline</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${waNumber}?text=Hi%20Dipto,%20I'm%20interested%20in%20your%20video%20editing%20services!`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-[var(--card-border)] hover:border-emerald-500/40 text-xs sm:text-sm font-semibold text-brand-heading transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Clean, Unobstructed Video Showcase */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className="w-full relative max-w-xl">
              
              {/* Aspect Ratio Switcher Header */}
              <div className="flex items-center justify-between mb-3 px-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono uppercase tracking-wider text-[11px] text-brand-heading font-bold">
                    Clean Showcase Video
                  </span>
                </div>

                {/* Aspect Ratio Toggle: 16:9 Cinema vs 9:16 Short Video Reel */}
                <div className="flex items-center gap-1.5 bg-brand-navy-light border border-[var(--card-border)] p-1 rounded-xl shadow-sm">
                  <button
                    type="button"
                    onClick={() => setAspectRatio('16:9')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${
                      aspectRatio === '16:9'
                        ? 'bg-brand-electric text-white shadow-md'
                        : 'text-brand-muted hover:text-brand-heading'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>16:9 Cinema</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAspectRatio('9:16')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${
                      aspectRatio === '9:16'
                        ? 'bg-brand-orange text-white shadow-md'
                        : 'text-brand-muted hover:text-brand-heading'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>9:16 Reel</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Video Stage - Crystal Clean & Unobstructed */}
              <motion.div 
                layout
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`relative mx-auto rounded-3xl overflow-hidden shadow-2xl border border-[var(--card-border)] bg-black transition-all ${
                  aspectRatio === '9:16' 
                    ? 'w-full max-w-[320px] aspect-[9/16]' 
                    : 'w-full aspect-[16/10] sm:aspect-[16/9]'
                }`}
              >
                {/* Video Playback Layer */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeItem.id}-${aspectRatio}-${currentMediaUrl}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 w-full h-full cursor-pointer"
                    onClick={togglePlay}
                  >
                    <video
                      ref={videoRef}
                      src={currentMediaUrl}
                      poster={currentImageUrl}
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Subtle top bar controls (Mute & Play) - Minimal and Elegant */}
                <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMute();
                    }}
                    title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                    className="p-2.5 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/20 text-white transition-transform active:scale-90 shadow-lg"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-slate-200" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                    title={isPlaying ? 'Pause' : 'Play'}
                    className="p-2.5 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/20 text-white transition-transform active:scale-90 shadow-lg"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 text-slate-200" /> : <Play className="w-4 h-4 text-brand-electric fill-brand-electric" />}
                  </button>
                </div>

                {/* Center Play Button Overlay if Paused */}
                {!isPlaying && (
                  <div 
                    onClick={togglePlay}
                    className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center cursor-pointer z-10 transition-opacity"
                  >
                    <div className="w-16 h-16 rounded-full bg-brand-electric/90 text-white flex items-center justify-center shadow-2xl shadow-brand-electric/50 hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 fill-white text-white translate-x-0.5" />
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Clean External Info Pill - Below the Video (No Text Overlay on Video!) */}
              <div className="mt-3.5 p-3 rounded-2xl bg-brand-navy-light border border-[var(--card-border)] flex items-center justify-between gap-3 shadow-md">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-brand-electric flex-shrink-0" />
                  <div className="truncate">
                    <span className="text-[11px] text-brand-muted font-medium block">
                      Active Advantage Showcase
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-brand-heading truncate">
                      {activeItem.title}
                    </h4>
                  </div>
                </div>

                {activeItem.stat && (
                  <div className="px-3 py-1 rounded-xl bg-white/5 border border-[var(--card-border)] text-right flex-shrink-0">
                    <span className="text-xs sm:text-sm font-black text-brand-heading font-mono block leading-none">
                      {activeItem.stat}
                    </span>
                    <span className="text-[10px] text-brand-muted font-medium block mt-0.5">
                      {activeItem.statLabel || 'Feature Metric'}
                    </span>
                  </div>
                )}
              </div>

              {/* Decorative Glow Orbs */}
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-brand-electric/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
