import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '@react-three/drei';

/**
 * CinematicLoader — Preloader with strict fallback safety timer (2500ms max).
 * Integrates with @react-three/drei useProgress() to track real 3D asset loading.
 * Guarantees force unmount after 2.5s even if any asset hangs or fails.
 */
const CinematicLoader = ({ onFinish }) => {
  const { progress, active } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isUnmounting, setIsUnmounting] = useState(false);

  useEffect(() => {
    let unmounted = false;

    // Strict 2.5s safety fallback timer to force unmount
    const fallbackTimer = setTimeout(() => {
      if (!unmounted) {
        setIsUnmounting(true);
        setTimeout(() => {
          onFinish?.();
        }, 300);
      }
    }, 2500);

    // Dynamic timer to smoothly interpolate display progress up to 100% within 2.2s
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const timedProgress = Math.min(100, Math.round((elapsed / 2200) * 100));
      const realProgress = typeof progress === 'number' ? progress : 0;
      const combined = Math.max(timedProgress, realProgress);

      setDisplayProgress(combined);

      if (combined >= 100 || (!active && elapsed > 600)) {
        clearInterval(progressInterval);
        clearTimeout(fallbackTimer);
        if (!unmounted) {
          setIsUnmounting(true);
          setTimeout(() => {
            onFinish?.();
          }, 300);
        }
      }
    }, 40);

    return () => {
      unmounted = true;
      clearTimeout(fallbackTimer);
      clearInterval(progressInterval);
    };
  }, [progress, active, onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isUnmounting ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030712] ${
        isUnmounting ? 'pointer-events-none' : ''
      }`}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-red-500/10 blur-[140px]" />
        <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      {/* Film Reel / Camera Aperture Icon */}
      <motion.div
        className="relative z-10 mb-8"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      >
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_30px_rgba(239,68,68,0.5)]"
        >
          {/* Outer ring */}
          <circle cx="40" cy="40" r="36" stroke="#ef4444" strokeWidth="2.5" fill="none" opacity="0.8" />
          <circle cx="40" cy="40" r="28" stroke="#ef4444" strokeWidth="1" fill="none" opacity="0.3" />
          {/* Center hub */}
          <circle cx="40" cy="40" r="6" fill="#ef4444" />
          {/* Sprocket holes */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x = 40 + 32 * Math.cos(rad);
            const y = 40 + 32 * Math.sin(rad);
            return (
              <circle
                key={angle}
                cx={x}
                cy={y}
                r="4"
                fill="none"
                stroke="#ef4444"
                strokeWidth="1.5"
                opacity="0.6"
              />
            );
          })}
          {/* Inner detail circles */}
          {[0, 120, 240].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x = 40 + 18 * Math.cos(rad);
            const y = 40 + 18 * Math.sin(rad);
            return <circle key={angle} cx={x} cy={y} r="5" fill="#ef4444" opacity="0.4" />;
          })}
        </svg>
      </motion.div>

      {/* Loading Text */}
      <motion.p
        className="relative z-10 text-white/70 text-xs font-body tracking-[0.4em] uppercase mb-4"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        LOADING EXPERIENCE
      </motion.p>

      {/* Progress percentage */}
      <p className="relative z-10 text-white/40 text-[10px] font-mono tracking-widest mb-4">
        {Math.min(100, Math.round(displayProgress))}%
      </p>

      {/* Progress Bar */}
      <div className="relative z-10 w-56 h-[3px] bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-red-500 via-orange-500 to-cyan-400 rounded-full"
          style={{ width: `${Math.min(100, Math.round(displayProgress))}%` }}
          transition={{ ease: 'easeOut', duration: 0.1 }}
        />
      </div>

      {/* Film strip borders */}
      <div className="absolute top-0 left-0 right-0 h-8 flex">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 border-r border-white/5 flex items-center justify-center"
          >
            <div className="w-2.5 h-3 rounded-[2px] bg-white/5" />
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-8 flex">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 border-r border-white/5 flex items-center justify-center"
          >
            <div className="w-2.5 h-3 rounded-[2px] bg-white/5" />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CinematicLoader;
