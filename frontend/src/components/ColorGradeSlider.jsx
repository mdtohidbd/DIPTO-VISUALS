import React, { useState, useRef, useCallback } from 'react';
import { Palette, Sliders, Activity } from 'lucide-react';
import colorGradeStill from '../assets/color_grade_still.jpg';

const ColorGradeSlider = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    if (e.currentTarget && e.currentTarget.setPointerCapture) {
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // Fallback
      }
    }
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    if (e.currentTarget && e.currentTarget.releasePointerCapture) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }
  };

  const setPreset = (percent) => {
    setSliderPos(percent);
  };

  return (
    <section
      id="color-grade"
      className="py-12 md:py-16 px-3 sm:px-6 md:px-8 bg-brand-navy text-brand-text relative overflow-hidden border-t border-[var(--card-border)]"
    >
      {/* Ambient background studio lighting */}
      <div className="absolute top-1/3 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-brand-electric/5 rounded-full blur-[120px] md:blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-brand-orange/5 rounded-full blur-[100px] md:blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-electric/10 border border-brand-electric/20 text-brand-electric text-xs font-semibold tracking-widest uppercase mb-4">
            <Palette className="w-3.5 h-3.5" /> Live Color Grading Suite
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight px-2 text-brand-heading">
            Raw Camera Log{' '}
            <span className="bg-gradient-to-r from-brand-electric to-brand-orange bg-clip-text text-transparent">
              vs Hollywood Master Grade
            </span>
          </h2>
          <p className="mt-3 md:mt-4 text-brand-muted max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2">
            Drag the slider or tap anywhere to see how flat, desaturated camera sensor data is transformed into rich 35mm film emulation using DaVinci Resolve Studio.
          </p>

          {/* Quick preset switches */}
          <div className="flex items-center justify-center gap-2 mt-5">
            <button
              onClick={() => setPreset(10)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all duration-300 ${
                sliderPos <= 20
                  ? 'bg-brand-electric text-white border border-brand-electric shadow-lg'
                  : 'bg-white/5 text-brand-muted border border-[var(--card-border)] hover:text-brand-heading'
              }`}
            >
              100% RAW LOG
            </button>
            <button
              onClick={() => setPreset(50)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all duration-300 ${
                sliderPos > 20 && sliderPos < 80
                  ? 'bg-brand-electric/30 text-brand-heading border border-brand-electric shadow-lg'
                  : 'bg-white/5 text-brand-muted border border-[var(--card-border)] hover:text-brand-heading'
              }`}
            >
              50 / 50 SPLIT
            </button>
            <button
              onClick={() => setPreset(90)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all duration-300 ${
                sliderPos >= 80
                  ? 'bg-brand-orange text-white border border-brand-orange shadow-lg'
                  : 'bg-white/5 text-brand-muted border border-[var(--card-border)] hover:text-brand-heading'
              }`}
            >
              100% MASTER GRADE
            </button>
          </div>
        </div>

        {/* Interactive Comparison Frame */}
        <div className="max-w-5xl mx-auto">
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            style={{ touchAction: 'none' }}
            data-cursor="drag"
            className="relative aspect-video w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[var(--card-border)] select-none cursor-ew-resize group touch-none"
          >
            {/* 1. Base Layer */}
            <div className="absolute inset-0 w-full h-full bg-black">
              <img
                src={colorGradeStill}
                alt="Finished Color Grade"
                draggable={false}
                className="w-full h-full object-cover filter contrast-[1.2] saturate-[1.3] brightness-[1.05] pointer-events-none select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
            </div>

            {/* 2. Top Layer */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <img
                src={colorGradeStill}
                alt="Raw S-Log3 Camera Footage"
                draggable={false}
                className="w-full h-full object-cover filter contrast-[0.62] saturate-[0.18] brightness-[1.18] sepia-[0.08] pointer-events-none select-none"
              />
            </div>

            {/* Slider Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-[2px] sm:w-[3px] bg-white shadow-[0_0_20px_rgba(255,255,255,1)] pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-navy border-2 border-brand-electric flex items-center justify-center shadow-lg text-brand-electric text-xs font-bold transition-transform group-hover:scale-110 active:scale-95">
                <Sliders className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
              </div>
            </div>

            {/* Left Top Badge: RAW LOG */}
            <div className="absolute top-2.5 sm:top-4 left-2.5 sm:left-4 z-10 pointer-events-none keep-text-white">
              <div className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-mono font-bold flex items-center gap-1.5 sm:gap-2 shadow-xl">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-slate-400" />
                <span>RAW LOG</span>
              </div>
            </div>

            {/* Right Top Badge: FINISHED GRADE */}
            <div className="absolute top-2.5 sm:top-4 right-2.5 sm:right-4 z-10 pointer-events-none keep-text-white">
              <div className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-brand-electric/90 backdrop-blur-md border border-brand-electric/50 text-white text-[10px] sm:text-xs font-mono font-bold flex items-center gap-1.5 sm:gap-2 shadow-xl">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white animate-ping" />
                <span>MASTER GRADE</span>
              </div>
            </div>

            {/* Bottom Scopes HUD Overlay */}
            <div className="absolute bottom-2.5 sm:bottom-4 left-2.5 sm:left-4 right-2.5 sm:right-4 z-10 flex items-center justify-between text-[10px] sm:text-xs font-mono text-white/80 pointer-events-none keep-text-white">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/15">
                <Activity className="w-3.5 h-3.5 text-brand-electric" />
                <span>TEMP: 5600K • TINT: +2 • REC.709</span>
              </div>

              <div className="px-2.5 sm:px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/15 text-brand-orange font-bold ml-auto">
                SPLIT: {Math.round(sliderPos)}%
              </div>
            </div>
          </div>

          {/* Color Science Capabilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-8 md:mt-10">
            <div className="p-5 sm:p-6 rounded-2xl bg-brand-navy-light border border-[var(--card-border)] backdrop-blur-md space-y-2 hover:border-brand-electric/40 transition-colors">
              <span className="text-xs font-mono text-brand-electric font-bold uppercase tracking-wider">
                01 • Shot Matching
              </span>
              <h4 className="font-bold text-brand-heading text-base">Multi-Camera Normalization</h4>
              <p className="text-brand-muted text-xs sm:text-sm leading-relaxed">
                Seamlessly balancing exposure and skin tones across Sony FX3, Arri Alexa, RED, and drone footage so every shot feels like part of one cohesive world.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-brand-navy-light border border-[var(--card-border)] backdrop-blur-md space-y-2 hover:border-brand-orange/40 transition-colors">
              <span className="text-xs font-mono text-brand-orange font-bold uppercase tracking-wider">
                02 • Film Emulation
              </span>
              <h4 className="font-bold text-brand-heading text-base">Kodak 2383 Print Chemistry</h4>
              <p className="text-brand-muted text-xs sm:text-sm leading-relaxed">
                Authentic 35mm optical grain structure, subtle edge halation around specular highlights, and rich cinematic color contrast.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-brand-navy-light border border-[var(--card-border)] backdrop-blur-md space-y-2 hover:border-brand-electric/40 transition-colors">
              <span className="text-xs font-mono text-brand-electric font-bold uppercase tracking-wider">
                03 • Gamut Precision
              </span>
              <h4 className="font-bold text-brand-heading text-base">HDR & Rec.709 Mastering</h4>
              <p className="text-brand-muted text-xs sm:text-sm leading-relaxed">
                Calibrated on reference monitors to ensure colors look punchy, rich, and consistent across OLED phone displays, retina laptops, and 4K TVs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ColorGradeSlider;
