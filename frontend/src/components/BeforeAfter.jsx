import React, { useState, useRef, useCallback } from 'react';
import { Sliders, Sun } from 'lucide-react';

const BeforeAfter = () => {
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
      try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
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
      try { e.currentTarget.releasePointerCapture(e.pointerId); } catch {}
    }
  };

  return (
    <section id="before-after" className="py-20 md:py-28 bg-brand-navy border-t border-[var(--card-border)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-semibold tracking-widest uppercase mb-4">
            <Sun className="w-3.5 h-3.5" /> Professional Color Grading
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-brand-heading mb-4">
            From Dull to <span className="bg-gradient-to-r from-brand-electric to-brand-orange bg-clip-text text-transparent">Desirable</span>
          </h2>
          <p className="text-brand-muted max-w-2xl mx-auto">
            Raw camera footage looks flat and grey. We color grade every clip to ensure skies are blue, grass is green, and interiors feel warm, inviting, and premium.
          </p>
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
            className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-[var(--card-border)] select-none cursor-ew-resize group touch-none"
          >
            {/* 1. Base Layer: Finished Master Grade */}
            <div className="absolute inset-0 w-full h-full bg-black">
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Finished Color Grade"
                draggable={false}
                className="w-full h-full object-cover filter contrast-[1.1] saturate-[1.2] brightness-[1.05] pointer-events-none select-none"
              />
            </div>

            {/* 2. Top Layer: Flat RAW (Clipped to Slider Position) */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Raw Camera Footage"
                draggable={false}
                className="w-full h-full object-cover filter contrast-[0.7] saturate-[0.3] brightness-[1.1] pointer-events-none select-none"
              />
            </div>

            {/* Slider Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-[3px] bg-white shadow-[0_0_15px_rgba(255,255,255,1)] pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              {/* Circular Draggable Thumb Handle */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-brand-navy border-2 border-brand-electric flex items-center justify-center shadow-lg text-brand-electric transition-transform group-hover:scale-110 active:scale-95">
                <Sliders className="w-5 h-5 animate-pulse" />
              </div>
            </div>

            {/* Left Top Badge: RAW */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none keep-text-white">
              <div className="px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-xs font-bold shadow-xl">
                RAW FOOTAGE
              </div>
            </div>

            {/* Right Top Badge: FINAL */}
            <div className="absolute top-4 right-4 z-10 pointer-events-none keep-text-white">
              <div className="px-3.5 py-1.5 rounded-full bg-brand-electric/90 backdrop-blur-md border border-brand-electric/50 text-white text-xs font-bold shadow-xl flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                FINAL GRADE
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
