import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const CinematicBackground = () => {
  const { theme, isLight } = useTheme();
  const bgStyle = theme?.bgStyle || 'aurora-mesh';

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: theme.bgPrimary }}
    >
      {/* 1. Aurora Mesh Style */}
      {bgStyle === 'aurora-mesh' && (
        <div className="absolute inset-0 overflow-hidden">
          {/* Top-Left Glowing Ambient Orb */}
          <motion.div
            animate={{
              x: [0, 60, -30, 0],
              y: [0, 40, -50, 0],
              scale: [1, 1.15, 0.95, 1],
              opacity: isLight ? [0.15, 0.25, 0.15, 0.15] : [0.35, 0.5, 0.3, 0.35]
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] rounded-full blur-[140px]"
            style={{ backgroundColor: theme.accentPrimary }}
          />

          {/* Bottom-Right Secondary Accent Orb */}
          <motion.div
            animate={{
              x: [0, -50, 40, 0],
              y: [0, -60, 30, 0],
              scale: [1, 0.9, 1.2, 1],
              opacity: isLight ? [0.12, 0.22, 0.12, 0.12] : [0.25, 0.45, 0.2, 0.25]
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2
            }}
            className="absolute -bottom-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full blur-[150px]"
            style={{ backgroundColor: theme.accentSecondary }}
          />

          {/* Center Midpoint Ambient Core */}
          <motion.div
            animate={{
              scale: [0.8, 1.1, 0.9, 0.8],
              opacity: isLight ? [0.08, 0.15, 0.08] : [0.15, 0.3, 0.15]
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute top-[35%] left-[30%] w-[40vw] h-[40vw] rounded-full blur-[160px]"
            style={{ backgroundColor: theme.accentPrimary }}
          />
        </div>
      )}

      {/* 2. Cinematic Studio Grid Style */}
      {bgStyle === 'cinematic-grid' && (
        <div className="absolute inset-0">
          {/* Subtle Grid Lines */}
          <div 
            className="absolute inset-0"
            style={{
              opacity: isLight ? 0.05 : 0.07,
              backgroundImage: `linear-gradient(to right, ${theme.accentPrimary} 1px, transparent 1px), linear-gradient(to bottom, ${theme.accentPrimary} 1px, transparent 1px)`,
              backgroundSize: '48px 48px'
            }}
          />
          {/* Horizon glow */}
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] h-[400px] rounded-full blur-[140px]"
            style={{ 
              backgroundColor: theme.accentPrimary,
              opacity: isLight ? 0.12 : 0.3
            }}
          />
        </div>
      )}

      {/* 3. Conical Studio Spotlight Style */}
      {bgStyle === 'studio-glow' && (
        <div className="absolute inset-0">
          <div
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-[70vw] h-[600px] rounded-[100%] blur-[130px]"
            style={{
              opacity: isLight ? 0.18 : 0.35,
              background: `radial-gradient(ellipse at top, ${theme.accentPrimary}, ${theme.accentSecondary} 60%, transparent 80%)`
            }}
          />
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[400px] rounded-[100%] blur-[150px]"
            style={{ 
              backgroundColor: theme.accentSecondary,
              opacity: isLight ? 0.12 : 0.25
            }}
          />
        </div>
      )}

      {/* 4. Minimal Vignette Falloff Style */}
      {bgStyle === 'minimal' && (
        <div className="absolute inset-0">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] h-[500px] rounded-full blur-[160px]"
            style={{ 
              backgroundColor: theme.accentPrimary,
              opacity: isLight ? 0.1 : 0.2
            }}
          />
        </div>
      )}

      {/* Top Edge Studio Rim Light Gradient */}
      <div 
        className="absolute top-0 inset-x-0 h-px"
        style={{
          opacity: isLight ? 0.2 : 0.35,
          background: `linear-gradient(90deg, transparent, ${theme.accentPrimary}, ${theme.accentSecondary}, transparent)`
        }}
      />

      {/* Cinematic Vignette Overlay (Adaptive for dark vs light) */}
      {!isLight && (
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, transparent 60%, rgba(0, 0, 0, 0.7) 100%)'
          }}
        />
      )}

      {/* Tactile 35mm Film Grain Noise */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{
          opacity: isLight ? 0.015 : 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />
    </div>
  );
};

export default CinematicBackground;
