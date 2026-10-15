import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Film } from 'lucide-react';
import Cards from '../components/Cards';
import VideoLightbox from '../components/VideoLightbox';

const DEFAULT_VIDEO_PROJECTS = [
  {
    id: 'vid_1',
    title: 'Beverly Hills Architectural Estate — 4K Walkthrough',
    category: 'Real Estate Cinematics',
    aspectRatio: '16:9',
    duration: '2:45',
    views: '140K Views',
    tools: ['Premiere Pro', 'DaVinci Resolve'],
    desc: 'Cinematic 4K walkthrough featuring speed ramps, smooth gimbal movements, and a warm, inviting Hollywood color grade to highlight a $12.5M luxury architectural property.',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
    videoUrl: '/videos/sample-video-1.mp4',
  },
  {
    id: 'vid_2',
    title: 'Manhattan Skyline Penthouse — Viral Reel Hook',
    category: 'Short-form / 9:16 Reels',
    aspectRatio: '9:16',
    duration: '0:45',
    views: '580K Views',
    tools: ['Premiere Pro', 'After Effects'],
    desc: 'High-retention 9:16 vertical edit engineered with 3-second visual hooks, kinetic motion typography, and beat-synced cuts.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    videoUrl: '/videos/sample-video-2.mp4',
  },
  {
    id: 'vid_3',
    title: 'Malibu Coastal Bluff — Aerial & Drone Showcase',
    category: 'Drone & Aerial Tours',
    aspectRatio: '16:9',
    duration: '1:30',
    views: '115K Views',
    tools: ['DaVinci Resolve', 'Premiere Pro'],
    desc: 'Sweeping aerial cinematography highlighting parcel boundaries, panoramic ocean vistas, and sunset DaVinci tone mapping.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    videoUrl: '/videos/sample-video-1.mp4',
  },
  {
    id: 'vid_4',
    title: 'Downtown Loft Modern Living — Targeted Listing Ad',
    category: 'Commercials & Brand Ads',
    aspectRatio: '16:9',
    duration: '1:00',
    views: '260K Views',
    tools: ['Premiere Pro', 'After Effects'],
    desc: 'Fast-paced promo engineered for high click-through ad campaigns, featuring agency lower thirds and licensed soundtrack.',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
    videoUrl: '/videos/sample-video-2.mp4',
  },
  {
    id: 'vid_5',
    title: 'Top Broker Personal Brand & Authority Reel',
    category: 'Short-form / 9:16 Reels',
    aspectRatio: '9:16',
    duration: '0:55',
    views: '340K Views',
    tools: ['Premiere Pro', 'CapCut Pro'],
    desc: 'Authority-building mobile reel showcasing listing negotiations, curated lifestyle, and active market insights.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    videoUrl: '/videos/sample-video-1.mp4',
  },
  {
    id: 'vid_6',
    title: 'The Haven Contemporary Residence — Twilight Tour',
    category: 'Real Estate Cinematics',
    aspectRatio: '16:9',
    duration: '3:15',
    views: '65K Views',
    tools: ['Premiere Pro', 'DaVinci Resolve'],
    desc: 'Atmospheric twilight tour capturing indoor-outdoor architectural harmony, ambient lighting, and rich spatial foley audio.',
    image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80',
    videoUrl: '/videos/sample-video-2.mp4',
  }
];

const AllProjects = () => {
  const [projects, setProjects] = useState(DEFAULT_VIDEO_PROJECTS);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    fetch('http://localhost:5000/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((item, index) => {
            const defaultItem = DEFAULT_VIDEO_PROJECTS[index % DEFAULT_VIDEO_PROJECTS.length];
            return {
              id: item.id || `proj_${index}`,
              title: item.title || defaultItem.title,
              category: item.category || defaultItem.category,
              aspectRatio: item.aspectRatio || defaultItem.aspectRatio,
              duration: item.duration || defaultItem.duration,
              views: item.views || defaultItem.views,
              tools: item.tools || defaultItem.tools,
              desc: item.desc || defaultItem.desc,
              image: item.image && item.image.startsWith('/uploads')
                ? `http://localhost:5000${item.image}`
                : item.image || defaultItem.image,
              videoUrl: item.videoUrl && item.videoUrl.startsWith('/uploads')
                ? `http://localhost:5000${item.videoUrl}`
                : (item.videoUrl || defaultItem.videoUrl),
            };
          });
          setProjects(mapped);
        }
      })
      .catch(() => {
        // use defaults
      });
  }, []);

  return (
    <div className="portfolio-app min-h-screen bg-brand-navy py-20 px-4 md:px-8 text-brand-text relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-brand-electric/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-brand-orange/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-[var(--card-border)] text-brand-heading font-medium transition-all duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </motion.div>

        {/* Heading */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-electric/10 border border-brand-electric/20 text-brand-electric text-xs font-semibold tracking-widest uppercase mb-3">
            <Film className="w-3.5 h-3.5" /> Full Archive
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-brand-heading">
            All <span className="bg-gradient-to-r from-brand-electric to-brand-orange bg-clip-text text-transparent">Video Works</span>
          </h1>
          <p className="mt-2 text-brand-muted text-sm md:text-base">
            Browse full production portfolio including property walkthroughs, viral reels, and commercial campaigns.
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
          {projects.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="w-full flex justify-center"
            >
              <Cards item={item} onSelect={(selected) => setSelectedVideo(selected)} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full-screen video modal using react-player */}
      <VideoLightbox
        project={selectedVideo}
        isOpen={Boolean(selectedVideo)}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
};

export default AllProjects;
