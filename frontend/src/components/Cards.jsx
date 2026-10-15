import React, { useRef, useState } from 'react';
import Tilt from 'react-parallax-tilt';
import { Play, Clock, Eye } from 'lucide-react';

const Cards = ({ item, onSelect }) => {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const formatMedia = (url, fallback = '') => {
    if (!url) return fallback;
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('blob:') || url.startsWith('data:')) return url;
    return `http://localhost:5000${url.startsWith('/') ? '' : '/'}${url}`;
  };

  const isVertical = item.aspectRatio === '9:16' || item.category?.includes('Short-form') || item.category?.includes('Reel');
  const videoUrl = formatMedia(
    item.videoUrl || item.video,
    '/videos/sample-video-1.mp4'
  );
  const imageUrl = formatMedia(
    item.image,
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80'
  );

  const toolList = Array.isArray(item.tools)
    ? item.tools
    : typeof item.tools === 'string'
    ? item.tools.split(',').map((s) => s.trim()).filter(Boolean)
    : ['Premiere Pro', 'After Effects'];

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <Tilt
      tiltMaxAngleX={6}
      tiltMaxAngleY={6}
      perspective={1000}
      transitionSpeed={1000}
      scale={1.015}
      tiltEnable={typeof window !== 'undefined' && window.innerWidth >= 768}
      glareEnable={false}
      gyroscope={false}
      className="w-full h-full cursor-pointer group"
    >
      <div
        data-cursor="play"
        onClick={() => onSelect?.(item)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative flex flex-col h-full rounded-2xl overflow-hidden bg-brand-navy-light border border-[var(--card-border)] hover:border-brand-electric/50 shadow-xl hover:shadow-[0_15px_40px_rgba(0,102,255,0.25)] transition-all duration-300 transform-gpu"
      >
        {/* Uniform 16:9 Media Aspect Ratio across ALL cards */}
        <div className="relative aspect-video w-full bg-black overflow-hidden select-none">
          {isVertical ? (
            /* Vertical 9:16 Shorts/Reels rendered in a clean cinema showcase frame */
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-brand-navy to-brand-navy-light">
              {/* Blurred atmospheric background backdrop */}
              <img
                src={imageUrl}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover blur-xl opacity-35 scale-125 pointer-events-none"
              />

              {/* Centered vertical phone frame */}
              <div className="relative h-full aspect-[9/16] overflow-hidden rounded-lg shadow-2xl border border-white/20 z-[2]">
                <img
                  src={imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    isHovered ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
                  }`}
                />
                <video
                  ref={videoRef}
                  src={videoUrl}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                />
              </div>
            </div>
          ) : (
            /* Standard 16:9 Cinema Landscape Cut */
            <div className="relative w-full h-full">
              <img
                src={imageUrl}
                alt={item.title}
                loading="lazy"
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  isHovered ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
                }`}
              />
              <video
                ref={videoRef}
                src={videoUrl}
                muted
                loop
                playsInline
                preload="metadata"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              />
            </div>
          )}

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/50 pointer-events-none z-[3]" />

          {/* Top Badges: Category & Aspect Ratio */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10 keep-text-white">
            <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md border border-white/15 text-brand-orange shadow-md">
              {item.category || 'Video Edit'}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-black/70 backdrop-blur-md border border-white/15 text-white/90 shadow-md">
              {isVertical ? '9:16 Reels' : '16:9 4K'}
            </span>
          </div>

          {/* Center Play Icon Overlay on Hover */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div
              className={`w-14 h-14 rounded-full bg-brand-electric/90 text-white flex items-center justify-center shadow-[0_0_30px_rgba(0,102,255,0.7)] backdrop-blur-sm transition-all duration-300 ${
                isHovered ? 'scale-110 opacity-100 ring-4 ring-brand-electric/40' : 'scale-90 opacity-80'
              }`}
            >
              <Play className="w-6 h-6 fill-white ml-0.5 text-white" />
            </div>
          </div>

          {/* Bottom Video Meta: Duration & Views */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90 pointer-events-none z-10 keep-text-white">
            <span className="px-2.5 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/15 font-mono text-[11px] flex items-center gap-1.5 shadow-md">
              <Clock className="w-3 h-3 text-brand-orange" />
              {item.duration || (isVertical ? '0:45' : '3:15')}
            </span>
            {item.views && (
              <span className="px-2.5 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/15 font-mono text-[11px] flex items-center gap-1.5 shadow-md">
                <Eye className="w-3 h-3 text-cyan-400" />
                {item.views}
              </span>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 flex flex-col flex-grow justify-between gap-3 bg-brand-navy-light">
          <div>
            <h3 className="font-bold text-base sm:text-lg text-brand-heading group-hover:text-brand-electric transition-colors line-clamp-1">
              {item.title}
            </h3>
            <p className="text-brand-muted text-xs sm:text-sm mt-1.5 leading-relaxed line-clamp-2 min-h-[2.5rem]">
              {item.desc || item.description}
            </p>
          </div>

          {/* Software Tool Tags */}
          <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-[var(--card-border)]">
            {toolList.map((tool, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded text-[11px] font-semibold bg-white/5 text-brand-muted border border-[var(--card-border)]"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Tilt>
  );
};

export default Cards;
