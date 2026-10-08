import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Film } from 'lucide-react';
import Cards from '../components/Cards';
import VideoLightbox from '../components/VideoLightbox';

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
    <div className="min-h-screen bg-brand-navy py-20 px-4 md:px-8 text-brand-text relative overflow-hidden">
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
