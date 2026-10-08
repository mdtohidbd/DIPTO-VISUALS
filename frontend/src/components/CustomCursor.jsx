import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { Play, ArrowUpRight, MoveHorizontal, Volume2 } from 'lucide-react';

/**
 * Smart Aesthetic Cinematic Custom Cursor
 * - Instant Precision Lead Dot (Zero Input Lag)
 * - Trailing Fluid Halo with Velocity-Responsive Physics & ARRI/RED Camera Reticle ticks
 * - Context-Aware Smart Modes: 'play' | 'view' | 'drag' | 'pointer' | 'text' | 'audio' | 'custom'
 * - Ambient Neon Glow Flare (Atmospheric Lighting)
 * - Tactile Click Shockwave & Squash Feedback
 * - Touch & Mobile Device Safe
 */
const CustomCursor = () => {
  const [cursorMode, setCursorMode] = useState('default');
  const [customText, setCustomText] = useState('');
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [clickRipples, setClickRipples] = useState([]);

  // Motion values for smooth 60/120fps hardware-accelerated movement
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth trailing spring for the outer halo (cinematic inertia)
  const haloSpringConfig = { stiffness: 320, damping: 26, mass: 0.4 };
  const haloX = useSpring(mouseX, haloSpringConfig);
  const haloY = useSpring(mouseY, haloSpringConfig);

  // Ultra-responsive spring for the lead dot (precision feel)
  const dotSpringConfig = { stiffness: 1200, damping: 48, mass: 0.1 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  // Ambient aura spring (soft floating inertia)
  const auraSpringConfig = { stiffness: 160, damping: 28, mass: 0.8 };
  const auraX = useSpring(mouseX, auraSpringConfig);
  const auraY = useSpring(mouseY, auraSpringConfig);

  // Velocity calculation for dynamic stretch
  const prevPos = useRef({ x: 0, y: 0, time: Date.now() });
  const [velocityScale, setVelocityScale] = useState({ scaleX: 1, scaleY: 1, angle: 0 });

  useEffect(() => {
    // Detect touch / mobile device
    const checkTouch = () => {
      const hasTouch =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches;
      setIsTouchDevice(hasTouch);
    };
    checkTouch();

    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Calculate velocity and motion angle for dynamic fluid trailing
      const now = Date.now();
      const dt = Math.max(now - prevPos.current.time, 16);
      const dx = e.clientX - prevPos.current.x;
      const dy = e.clientY - prevPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const speed = dist / dt; // pixels per ms

      if (speed > 0.15) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        const stretch = Math.min(1 + speed * 0.12, 1.25);
        const squeeze = Math.max(1 - speed * 0.06, 0.85);
        setVelocityScale({ scaleX: stretch, scaleY: squeeze, angle });
      } else {
        setVelocityScale({ scaleX: 1, scaleY: 1, angle: 0 });
      }

      prevPos.current = { x: e.clientX, y: e.clientY, time: now };
    };

    const handleMouseDown = (e) => {
      setIsClicking(true);
      // Generate unique ripple at click location
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };
      setClickRipples((prev) => [...prev.slice(-4), newRipple]);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Intelligent context detector
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target || !(target instanceof HTMLElement)) return;

      // 1. Explicit custom text
      const customTextEl = target.closest('[data-cursor-text]');
      if (customTextEl) {
        const text = customTextEl.getAttribute('data-cursor-text');
        setCustomText(text || '');
        setCursorMode('custom');
        return;
      }

      // 2. Explicit cursor type or video/play element
      const playEl =
        target.closest('[data-cursor="play"]') ||
        target.closest('[data-cursor-type="play"]') ||
        target.closest('.video-card') ||
        target.closest('.play-button') ||
        target.tagName.toLowerCase() === 'video' ||
        target.closest('[aria-label*="play" i]');
      if (playEl) {
        setCursorMode('play');
        setCustomText('PLAY');
        return;
      }

      // 3. Audio / sound element
      const audioEl =
        target.closest('[data-cursor="audio"]') ||
        target.closest('#cinematic-audio-player') ||
        target.closest('.audio-player-btn');
      if (audioEl) {
        setCursorMode('audio');
        setCustomText('LISTEN');
        return;
      }

      // 4. Drag / Slider element (BeforeAfter, ColorGrade, Range slider)
      const dragEl =
        target.closest('[data-cursor="drag"]') ||
        target.closest('.cursor-ew-resize') ||
        target.closest('[role="slider"]') ||
        (target.tagName.toLowerCase() === 'input' && target.getAttribute('type') === 'range') ||
        target.closest('.swiper-slide') ||
        target.closest('.color-grade-container');
      if (dragEl) {
        setCursorMode('drag');
        setCustomText('DRAG');
        return;
      }

      // 5. Case Study / Project View element
      const viewEl =
        target.closest('[data-cursor="view"]') ||
        target.closest('.case-study-card') ||
        target.closest('.project-view-card');
      if (viewEl) {
        setCursorMode('view');
        setCustomText('VIEW');
        return;
      }

      // 6. Text input / selectable text
      const textEl =
        target.tagName.toLowerCase() === 'input' ||
        target.tagName.toLowerCase() === 'textarea' ||
        target.getAttribute('contenteditable') === 'true';
      if (textEl) {
        setCursorMode('text');
        return;
      }

      // 7. Interactive clickable element (Buttons, links, tabs)
      const clickableEl =
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'select' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.classList.contains('cursor-pointer');
      if (clickableEl) {
        setCursorMode('pointer');
        return;
      }

      // Default state
      setCursorMode('default');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  // Clean up ripples after animation
  const removeRipple = (id) => {
    setClickRipples((prev) => prev.filter((r) => r.id !== id));
  };

  if (isTouchDevice) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden select-none hidden md:block">
      {/* 1. Ambient Cinema Neon Aura (Subtle atmospheric backlight) */}
      <motion.div
        style={{
          x: auraX,
          y: auraY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible ? (cursorMode === 'play' || cursorMode === 'view' ? 0.35 : 0.2) : 0,
          scale: cursorMode === 'play' ? 1.6 : cursorMode === 'pointer' ? 1.3 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 w-36 h-36 rounded-full blur-2xl pointer-events-none bg-gradient-to-r from-cyan-500/30 via-blue-600/25 to-amber-500/20"
      />

      {/* 2. Tactile Click Shockwave Ripples */}
      <AnimatePresence>
        {clickRipples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0.3, opacity: 0.9 }}
            animate={{ scale: 2.6, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={() => removeRipple(ripple.id)}
            style={{
              left: ripple.x,
              top: ripple.y,
              translateX: '-50%',
              translateY: '-50%',
            }}
            className="fixed w-10 h-10 rounded-full border-2 border-cyan-400 pointer-events-none shadow-[0_0_20px_rgba(0,240,255,0.7)]"
          />
        ))}
      </AnimatePresence>

      {/* 3. Trailing Dynamic Morphing Halo / HUD Capsule */}
      <motion.div
        style={{
          x: haloX,
          y: haloY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.9 : 1,
        }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 flex items-center justify-center pointer-events-none"
      >
        {/* Dynamic Mode Containers */}
        {cursorMode === 'default' && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              rotate: velocityScale.angle,
              scaleX: velocityScale.scaleX,
              scaleY: velocityScale.scaleY,
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-9 h-9 rounded-full flex items-center justify-center"
          >
            {/* Ambient Neon Ring */}
            <div className="absolute inset-0 rounded-full border border-cyan-400/50 shadow-[0_0_12px_rgba(0,240,255,0.35),inset_0_0_8px_rgba(0,102,255,0.2)] bg-cyan-500/[0.03]" />
            
            {/* Cinema Camera Reticle Crosshair Ticks */}
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-1 bg-cyan-300/80 rounded-full" />
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0.5 h-1 bg-cyan-300/80 rounded-full" />
            <span className="absolute -left-1 top-1/2 -translate-y-1/2 h-0.5 w-1 bg-cyan-300/80 rounded-full" />
            <span className="absolute -right-1 top-1/2 -translate-y-1/2 h-0.5 w-1 bg-cyan-300/80 rounded-full" />
          </motion.div>
        )}

        {cursorMode === 'pointer' && (
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 450, damping: 25 }}
            className="relative w-12 h-12 rounded-full flex items-center justify-center"
          >
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400/80 bg-cyan-500/10 backdrop-blur-[2px] shadow-[0_0_20px_rgba(0,240,255,0.6),inset_0_0_12px_rgba(0,102,255,0.4)] animate-pulse" />
            {/* Expanded precision corner ticks */}
            <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1 h-1.5 bg-amber-400 rounded-full shadow-[0_0_8px_#FF7A00]" />
            <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1.5 bg-amber-400 rounded-full shadow-[0_0_8px_#FF7A00]" />
            <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 h-1 w-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#00F0FF]" />
            <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 h-1 w-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#00F0FF]" />
          </motion.div>
        )}

        {cursorMode === 'play' && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -15 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            className="relative w-20 h-20 rounded-full flex flex-col items-center justify-center backdrop-blur-md bg-brand-navy/90 border border-cyan-400/80 shadow-[0_0_30px_rgba(0,240,255,0.5),inset_0_0_15px_rgba(0,102,255,0.3)]"
          >
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-tr from-brand-electric to-cyan-400 text-white shadow-lg mb-0.5 ml-0.5">
              <Play className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-heading font-black text-[9px] tracking-widest text-cyan-300 uppercase drop-shadow-[0_0_6px_rgba(0,240,255,0.8)]">
              {customText || 'PLAY'}
            </span>
          </motion.div>
        )}

        {cursorMode === 'view' && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            className="relative w-16 h-16 rounded-full flex flex-col items-center justify-center backdrop-blur-md bg-brand-navy/90 border border-amber-400/80 shadow-[0_0_25px_rgba(255,122,0,0.5),inset_0_0_12px_rgba(255,122,0,0.25)]"
          >
            <ArrowUpRight className="w-4 h-4 text-amber-400 mb-0.5" />
            <span className="font-heading font-black text-[9px] tracking-widest text-amber-300 uppercase drop-shadow-[0_0_6px_rgba(255,122,0,0.8)]">
              {customText || 'VIEW'}
            </span>
          </motion.div>
        )}

        {cursorMode === 'drag' && (
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            className="relative px-3.5 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-md bg-brand-navy/90 border border-amber-400/80 shadow-[0_0_25px_rgba(255,122,0,0.5),inset_0_0_12px_rgba(0,102,255,0.3)]"
          >
            <MoveHorizontal className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="font-heading font-black text-[10px] tracking-wider text-white uppercase drop-shadow-[0_0_6px_rgba(255,255,255,0.8)] whitespace-nowrap">
              {customText || 'DRAG'}
            </span>
          </motion.div>
        )}

        {cursorMode === 'audio' && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            className="relative px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-md bg-brand-navy/90 border border-cyan-400/80 shadow-[0_0_25px_rgba(0,240,255,0.5)]"
          >
            <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-heading font-black text-[9px] tracking-widest text-cyan-300 uppercase">
              {customText || 'AUDIO'}
            </span>
            {/* Equalizer Micro-bars */}
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 h-2 bg-cyan-400 animate-pulse rounded-full" />
              <span className="w-0.5 h-3 bg-amber-400 animate-pulse rounded-full delay-75" />
              <span className="w-0.5 h-1.5 bg-cyan-400 animate-pulse rounded-full delay-150" />
            </div>
          </motion.div>
        )}

        {cursorMode === 'text' && (
          <motion.div
            initial={{ scaleY: 0.3, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0.3, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="w-1 h-7 rounded-full bg-gradient-to-b from-cyan-400 via-blue-500 to-cyan-400 shadow-[0_0_10px_#00F0FF] animate-pulse"
          />
        )}

        {cursorMode === 'custom' && (
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            className="relative px-3.5 py-1.5 rounded-full flex items-center justify-center backdrop-blur-md bg-brand-navy/90 border border-cyan-400/80 shadow-[0_0_25px_rgba(0,240,255,0.5)]"
          >
            <span className="font-heading font-black text-[10px] tracking-widest text-cyan-300 uppercase drop-shadow-[0_0_6px_rgba(0,240,255,0.8)] whitespace-nowrap">
              {customText}
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* 4. Ultra-Fast Precision Lead Dot (Zero-Lag Pointer) */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible && cursorMode !== 'text' && cursorMode !== 'play' && cursorMode !== 'view' && cursorMode !== 'drag' ? 1 : 0,
          scale: isClicking ? 0.6 : cursorMode === 'pointer' ? 1.4 : 1,
        }}
        transition={{ duration: 0.1 }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#00F0FF,0_0_20px_#0066FF] pointer-events-none"
      />
    </div>
  );
};

export default CustomCursor;
