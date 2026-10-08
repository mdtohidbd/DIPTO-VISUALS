import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film } from 'lucide-react';
import Cards from './Cards';
import VideoLightbox from './VideoLightbox';

// Real Estate Video Projects
const DEFAULT_VIDEO_PROJECTS = [
  {
    id: 'vid_1',
    title: 'Luxury Mansion Walkthrough - Beverly Hills',
    category: 'Property Tours',
    aspectRatio: '16:9',
    duration: '2:45',
    views: '120K Views',
    tools: ['Premiere Pro', 'DaVinci Resolve'],
    desc: 'Cinematic 4K walkthrough featuring speed ramps, smooth gimbal movements, and a warm, inviting color grade to highlight the $12M property.',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  },
  {
    id: 'vid_2',
    title: 'Modern Penthouse - Reel Hook',
    category: 'Reels & Shorts',
    aspectRatio: '9:16',
    duration: '0:45',
    views: '540K Views',
    tools: ['Premiere Pro', 'After Effects'],
    desc: 'High-retention vertical reel for Instagram/TikTok with beat-synced cuts, dynamic text tracking, and engaging sound design.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  },
  {
    id: 'vid_3',
    title: 'Coastal Estate Drone Showcase',
    category: 'Drone Footage',
    aspectRatio: '16:9',
    duration: '1:30',
    views: '85K Views',
    tools: ['DaVinci Resolve'],
    desc: 'Breathtaking aerial cinematography focusing on property lines, neighborhood context, and sunset color grading.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 'vid_4',
    title: 'Downtown Loft Listing Promo',
    category: 'Listing Ads',
    aspectRatio: '16:9',
    duration: '1:00',
    views: '220K Views',
    tools: ['Premiere Pro', 'After Effects'],
    desc: 'Fast-paced, energetic ad designed for Facebook/YouTube campaigns, featuring sleek lower thirds and agent branding.',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  },
  {
    id: 'vid_5',
    title: 'Agent Personal Branding Reel',
    category: 'Reels & Shorts',
    aspectRatio: '9:16',
    duration: '0:55',
    views: '310K Views',
    tools: ['Premiere Pro', 'CapCut Pro'],
    desc: 'Day-in-the-life agent reel designed to build trust and authority, edited with engaging captions and a fast pace.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  },
  {
    id: 'vid_6',
    title: 'Suburban Family Home Tour',
    category: 'Property Tours',
    aspectRatio: '16:9',
    duration: '3:15',
    views: '45K Views',
    tools: ['Premiere Pro', 'DaVinci Resolve'],
    desc: 'Smooth, natural-light focused edit highlighting the cozy, family-friendly aspects of the home with gentle acoustic music.',
    image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
  }
];

const DEFAULT_CATEGORIES = [
  'All',
  'Short-form / 9:16 Reels',
  'YouTube Long-form',
  'Commercials & Brand Ads',
  'Real Estate Cinematics',
  'Drone & Aerial Tours',
  '3D Motion & VFX'
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [projects, setProjects] = useState(DEFAULT_VIDEO_PROJECTS);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((item, index) => {
            const defaultItem = DEFAULT_VIDEO_PROJECTS[index % DEFAULT_VIDEO_PROJECTS.length];
            const rawVideo = item.videoUrl || defaultItem.videoUrl;
            const formattedVideo = rawVideo && rawVideo.startsWith('/uploads')
              ? `http://localhost:5000${rawVideo}`
              : rawVideo;

            const rawImage = item.image || defaultItem.image;
            const formattedImage = rawImage && rawImage.startsWith('/uploads')
              ? `http://localhost:5000${rawImage}`
              : rawImage;

            return {
              id: item.id || `proj_${index}`,
              title: item.title || defaultItem.title,
              category: item.category || defaultItem.category,
              aspectRatio: item.aspectRatio || defaultItem.aspectRatio,
              duration: item.duration || defaultItem.duration,
              views: item.views || defaultItem.views,
              tools: Array.isArray(item.tools)
                ? item.tools
                : typeof item.tools === 'string'
                ? item.tools.split(',').map((s) => s.trim()).filter(Boolean)
                : defaultItem.tools,
              desc: item.desc || defaultItem.desc,
              image: formattedImage,
              videoUrl: formattedVideo,
            };
          });
          setProjects(mapped);
        }
      })
      .catch(() => {
        // use defaults
      });
  }, []);

  const categories = useMemo(() => {
    const set = new Set(['All']);
    projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  return (
    <section id="projects" className="relative py-20 bg-brand-navy-light overflow-hidden border-t border-[var(--card-border)]">
      <div className="max-w-7xl mx-auto px-5 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-electric/10 border border-brand-electric/20 text-brand-electric text-xs font-semibold tracking-widest uppercase mb-4"
          >
            <Film className="w-3.5 h-3.5" /> Selected Works
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-brand-heading tracking-tight mb-4"
          >
            Premium Real Estate <span className="bg-gradient-to-r from-brand-electric to-brand-orange bg-clip-text text-transparent">Portfolio</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-brand-muted max-w-2xl mx-auto text-base"
          >
            A curated selection of property tours, viral social reels, and listing advertisements proven to captivate buyers.
          </motion.p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-5 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? 'text-white bg-brand-electric shadow-[0_0_20px_rgba(0,102,255,0.4)] border border-brand-electric'
                    : 'text-brand-muted bg-brand-navy border border-[var(--card-border)] hover:text-brand-heading hover:border-brand-electric/50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Video Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start"
        >
          <AnimatePresence>
            {filteredProjects.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4 }}
                className="w-full flex justify-center"
              >
                <Cards item={item} onSelect={(selected) => setSelectedVideo(selected)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <VideoLightbox
        project={selectedVideo}
        isOpen={Boolean(selectedVideo)}
        onClose={() => setSelectedVideo(null)}
      />
    </section>
  );
};

export default Projects;
