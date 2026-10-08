import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactPlayer from 'react-player';
import { X, Clock, Eye, Layers } from 'lucide-react';

/**
 * VideoLightbox — Full-screen cinematic modal for video project playback.
 * Powered by react-player with support for 16:9 and 9:16 aspect ratios.
 */
const VideoLightbox = ({ project, isOpen, onClose }) => {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!project) return null;

  const isVertical = project.aspectRatio === '9:16' || project.category?.includes('Short-form') || project.category?.includes('Reel');
  const rawUrl = project.videoUrl || project.video || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
  const videoSource = rawUrl && rawUrl.startsWith('/uploads') ? `http://localhost:5000${rawUrl}` : rawUrl;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-3 md:p-6 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Dark Cinematic Backdrop with Blur */}
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-2xl"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Container */}
          <motion.div
            className={`relative z-10 w-full ${
              isVertical ? 'max-w-xl' : 'max-w-5xl'
            } max-h-[92vh] flex flex-col rounded-3xl bg-[#090d16] border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden my-auto keep-text-white`}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, type: 'spring', bounce: 0.2 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/70 hover:bg-red-500/30 border border-white/15 hover:border-red-500/50 flex items-center justify-center text-white/80 hover:text-white transition-all duration-200"
              aria-label="Close video player"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Player Section */}
            <div className={`relative bg-black flex items-center justify-center overflow-hidden ${
              isVertical ? 'h-[500px] md:h-[580px] w-full' : 'aspect-video w-full'
            }`}>
              <ReactPlayer
                url={videoSource}
                playing={true}
                controls={true}
                width="100%"
                height="100%"
                style={{ maxHeight: '100%' }}
                config={{
                  file: {
                    attributes: {
                      controlsList: 'nodownload',
                      playsInline: true,
                    },
                  },
                }}
              />
            </div>

            {/* Details Footer */}
            <div className="p-6 md:p-8 bg-gradient-to-b from-[#090d16] to-[#04070e] space-y-4 overflow-y-auto">
              {/* Category, Duration, & Metric Pills */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-3 py-1 rounded-full bg-brand-electric/20 border border-brand-electric/40 text-brand-electric font-bold uppercase tracking-wider">
                  {project.category || 'Featured Edit'}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/90 font-mono flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-brand-orange" />
                  {project.duration || (isVertical ? '0:45' : '2:15')}
                </span>
                {project.views && (
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/90 font-mono flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                    {project.views}
                  </span>
                )}
                <span className="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-medium">
                  {isVertical ? '9:16 Vertical (Reels/Shorts)' : '16:9 Cinematic (4K)'}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                {project.title}
              </h2>

              {/* Description */}
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                {project.desc || project.description}
              </p>

              {/* Tools & Workflow Badges */}
              {project.tools && project.tools.length > 0 && (
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-white/60 font-medium flex items-center gap-1 mr-1">
                    <Layers className="w-3.5 h-3.5" /> Software:
                  </span>
                  {(Array.isArray(project.tools)
                    ? project.tools
                    : typeof project.tools === 'string'
                    ? project.tools.split(',').map((s) => s.trim()).filter(Boolean)
                    : ['Premiere Pro', 'After Effects']
                  ).map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 text-xs font-semibold rounded-md bg-white/10 border border-white/15 text-white/90"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoLightbox;
