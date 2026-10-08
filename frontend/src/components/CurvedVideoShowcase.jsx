import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Play, ChevronLeft, ChevronRight, Film, Clock, Eye, Sparkles } from 'lucide-react';
import VideoLightbox from './VideoLightbox';

const DEFAULT_SHOWCASE_PROJECTS = [
  {
    id: 'showcase_1',
    title: 'Alpha Hustle — High-Retention Finance Reel',
    desc: 'Retention-engineered vertical storytelling featuring 3-second visual pattern interrupts, dynamic kinetic captions, and aggressive SFX risers.',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    category: 'Short-form / Reels',
    aspectRatio: '9:16',
    duration: '0:48',
    views: '1.8M Views',
    tools: ['Premiere Pro', 'After Effects', 'Sound Foley'],
    accent: '#0066FF',
  },
  {
    id: 'showcase_2',
    title: 'The Architecture of Modern Storytelling',
    desc: 'Deep narrative documentary essay with bespoke paper-tear collages, custom 3D map animations, and pacing structured for 68% average view duration.',
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1400&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    category: 'YouTube Long-form',
    aspectRatio: '16:9',
    duration: '14:22',
    views: '840K Views',
    tools: ['DaVinci Resolve', 'Premiere Pro', 'Audition'],
    accent: '#FF7A00',
  },
  {
    id: 'showcase_3',
    title: 'CyberStrike — High-Tech Brand Launch Film',
    desc: 'High-octane commercial spot featuring 3D product tracking, futuristic HUD motion graphics, neon volumetric lighting, and heavy cinematic sub-bass.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    category: 'Commercials & Ads',
    aspectRatio: '16:9',
    duration: '1:15',
    views: '420K Views',
    tools: ['After Effects', 'Blender 3D', 'DaVinci Resolve'],
    accent: '#0066FF',
  },
];

const CATEGORIES = ['All Reels', 'Short-form / Reels', 'YouTube Long-form', 'Commercials & Ads'];

const CurvedVideoShowcase = () => {
  const [projects, setProjects] = useState(DEFAULT_SHOWCASE_PROJECTS);
  const [activeCategory, setActiveCategory] = useState('All Reels');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const getImageUrl = (imgStr) => {
            if (!imgStr) return 'https://placehold.co/800x450/0a0f1c/ef4444?text=Cinema+Reel';
            if (imgStr.startsWith('http://') || imgStr.startsWith('https://')) return imgStr;
            return `http://localhost:5000${imgStr}`;
          };
          const mapped = data.map((item, index) => {
            const fb = DEFAULT_SHOWCASE_PROJECTS[index % DEFAULT_SHOWCASE_PROJECTS.length];
            return {
              id: item.id || fb.id,
              title: item.title || fb.title,
              desc: item.desc || fb.desc,
              image: getImageUrl(item.image) || fb.image,
              videoUrl: item.videoUrl || fb.videoUrl,
              category: item.category || fb.category,
              aspectRatio: item.aspectRatio || fb.aspectRatio,
              duration: item.duration || fb.duration,
              views: item.views || fb.views,
              tools: Array.isArray(item.tools)
                ? item.tools
                : typeof item.tools === 'string'
                ? item.tools.split(',').map((s) => s.trim()).filter(Boolean)
                : fb.tools,
              accent: fb.accent,
            };
          });
          setProjects(mapped);
        }
      })
      .catch(() => {
        // use defaults
      });
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All Reels') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  const activeProject = filteredProjects[activeIndex] || filteredProjects[0];

  return (
    <section
      id="curved-showcase"
      className="relative py-12 md:py-16 bg-brand-navy overflow-hidden border-t border-[var(--card-border)] text-brand-text"
    >
      {/* Cinematic Ambient Atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-electric/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-6 md:mb-8">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-electric/10 border border-brand-electric/25 text-brand-electric text-xs font-mono font-semibold tracking-widest uppercase mb-4"
          >
            <Film className="w-3.5 h-3.5" /> 3D COVERFLOW SCREENINGS
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-brand-heading"
          >
            Featured{' '}
            <span className="bg-gradient-to-r from-brand-electric to-brand-orange bg-clip-text text-transparent">
              Cinema Reels
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 md:mt-4 text-brand-muted max-w-2xl mx-auto text-sm sm:text-base md:text-lg"
          >
            Swipe or drag across 3D reels to explore retention edits, commercial spots, and cinematic color grades. Click any card to launch the 4K theater player.
          </motion.p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-8">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setActiveIndex(0);
                  }}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-brand-electric to-brand-orange text-white shadow-[0_0_25px_rgba(0,102,255,0.5)] scale-105'
                      : 'bg-white/5 border border-[var(--card-border)] text-brand-muted hover:text-brand-heading hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Coverflow Swiper Carousel Container */}
        <div className="relative w-full py-1 sm:py-2">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            initialSlide={1}
            loop={filteredProjects.length > 2}
            speed={850}
            slideToClickedSlide={true}
            watchSlidesProgress={true}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            coverflowEffect={{
              rotate: 15,
              stretch: 0,
              depth: 180,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={{
              clickable: true,
              el: '.cinema-swiper-pagination',
            }}
            navigation={{
              prevEl: '.cinema-swiper-prev',
              nextEl: '.cinema-swiper-next',
            }}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="w-full pb-6 overflow-visible"
          >
            {filteredProjects.map((project, idx) => (
              <SwiperSlide
                key={project.id || idx}
                style={{
                  width: 'min(92vw, 680px)',
                }}
                className="transition-all duration-700"
              >
                {({ isActive }) => (
                  <div
                    onClick={() => {
                      if (isActive) {
                        setSelectedVideo(project);
                      }
                    }}
                    className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-out group select-none ${
                      isActive
                        ? 'ring-2 ring-brand-electric shadow-[0_25px_90px_rgba(0,102,255,0.35)] scale-100 opacity-100 blur-0 brightness-100'
                        : 'opacity-35 scale-[0.88] blur-[6px] sm:blur-[7px] brightness-75 hover:opacity-60 ring-1 ring-[var(--card-border)]'
                    }`}
                  >
                    {/* Cinema 16:9 Display Aspect Ratio Frame */}
                    <div className="relative aspect-video w-full bg-black overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Cinematic Lighting Vignette Gradients */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 pointer-events-none" />

                      {/* Top Bar HUD */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 keep-text-white">
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[11px] font-mono font-bold text-white shadow-lg">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                          <span>4K DCI • 60 FPS</span>
                        </div>

                        <div className="px-3 py-1 rounded-full bg-brand-electric/30 backdrop-blur-md border border-brand-electric/50 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                          {project.category}
                        </div>
                      </div>

                      {/* Center Glowing Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                        <div
                          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand-electric flex items-center justify-center text-white shadow-[0_0_40px_rgba(0,102,255,0.8)] transition-transform duration-500 ${
                            isActive ? 'group-hover:scale-110 scale-100 ring-4 ring-white/30' : 'scale-75 opacity-70'
                          }`}
                        >
                          <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-white ml-1 text-white" />
                        </div>
                      </div>

                      {/* Bottom Info HUD on Card */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 z-10 bg-gradient-to-t from-black/90 via-black/60 to-transparent keep-text-white">
                        <div className="flex items-center gap-3 mb-2 text-xs text-white/80 font-mono">
                          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/10 backdrop-blur-sm">
                            <Clock className="w-3.5 h-3.5 text-brand-orange" />
                            {project.duration}
                          </span>
                          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/10 backdrop-blur-sm">
                            <Eye className="w-3.5 h-3.5 text-cyan-400" />
                            {project.views}
                          </span>
                        </div>

                        <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight group-hover:text-brand-electric transition-colors line-clamp-1">
                          {project.title}
                        </h3>

                        <p className="text-slate-300 text-xs sm:text-sm mt-1.5 line-clamp-2 leading-relaxed">
                          {project.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows */}
          <button
            className="cinema-swiper-prev absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-brand-navy-light/90 backdrop-blur-xl border border-[var(--card-border)] hover:border-brand-electric text-brand-heading flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group"
            aria-label="Previous Reel"
          >
            <ChevronLeft className="w-6 h-6 group-hover:text-brand-electric transition-colors" />
          </button>

          <button
            className="cinema-swiper-next absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-brand-navy-light/90 backdrop-blur-xl border border-[var(--card-border)] hover:border-brand-electric text-brand-heading flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group"
            aria-label="Next Reel"
          >
            <ChevronRight className="w-6 h-6 group-hover:text-brand-electric transition-colors" />
          </button>

          <div className="cinema-swiper-pagination flex items-center justify-center gap-2 pt-3" />
        </div>

        {/* Active Reel Interactive Control Bar */}
        {activeProject && (
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl mx-auto mt-3 p-4 sm:p-5 rounded-2xl bg-brand-navy-light border border-[var(--card-border)] backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl"
          >
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-brand-electric/10 border border-brand-electric/30 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-brand-electric" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-brand-electric tracking-wider">
                  Now Selected in 3D Theater
                </span>
                <h4 className="text-brand-heading font-bold text-sm sm:text-base truncate max-w-sm">
                  {activeProject.title}
                </h4>
              </div>
            </div>

            <button
              onClick={() => setSelectedVideo(activeProject)}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-electric to-brand-orange text-white text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(0,102,255,0.4)] hover:shadow-[0_0_30px_rgba(0,102,255,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Play className="w-3.5 h-3.5 fill-white text-white" />
              <span>Watch Full Theater Cut</span>
            </button>
          </motion.div>
        )}
      </div>

      <VideoLightbox
        project={selectedVideo}
        isOpen={Boolean(selectedVideo)}
        onClose={() => setSelectedVideo(null)}
      />
    </section>
  );
};

export default CurvedVideoShowcase;
