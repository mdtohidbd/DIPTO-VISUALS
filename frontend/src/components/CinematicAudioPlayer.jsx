import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';

/**
 * CinematicAudioPlayer
 * Generates an atmospheric, rich cinematic ambient soundscape (432Hz warm analog pad)
 * entirely via the Web Audio API — 100% reliable, zero external network downloads,
 * zero CORS issues, and instantly interactive.
 */
const CinematicAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const [hasInteracted, setHasInteracted] = useState(false);

  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const nodesRef = useRef([]);

  // Initialize Web Audio Synth
  const startAmbience = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Filter: Warm 24dB low-pass filter (cuts harsh highs, leaves warm filmic drone)
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, ctx.currentTime);
      filter.Q.setValueAtTime(3.5, ctx.currentTime);
      filter.connect(masterGain);

      // Warm cinematic chord frequencies (D minor / cinematic root: D2, A2, F3, A3)
      const frequencies = [73.42, 110.0, 174.61, 220.0];
      const createdNodes = [];

      frequencies.forEach((freq, i) => {
        // Oscillator
        const osc = ctx.createOscillator();
        osc.type = i % 2 === 0 ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Individual gentle detune for lush chorus warmth
        osc.detune.setValueAtTime((i - 1.5) * 6, ctx.currentTime);

        // Sub gain for each note
        const noteGain = ctx.createGain();
        noteGain.gain.setValueAtTime(0.12 / frequencies.length, ctx.currentTime);

        // Slow LFO for organic cinematic breathing
        const lfo = ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.15 + i * 0.05, ctx.currentTime);

        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(noteGain.gain.value * 0.4, ctx.currentTime);

        lfo.connect(lfoGain);
        lfoGain.connect(noteGain.gain);

        osc.connect(noteGain);
        noteGain.connect(filter);

        osc.start();
        lfo.start();

        createdNodes.push(osc, lfo, noteGain, lfoGain);
      });

      nodesRef.current = createdNodes;
      setIsPlaying(true);
    } catch (err) {
      console.warn('Web Audio ambience could not start:', err);
    }
  };

  const stopAmbience = () => {
    try {
      if (audioCtxRef.current && gainNodeRef.current) {
        const ctx = audioCtxRef.current;
        gainNodeRef.current.gain.setTargetAtTime(0, ctx.currentTime, 0.15);
        setTimeout(() => {
          nodesRef.current.forEach((node) => {
            try {
              if (node.stop) node.stop();
              if (node.disconnect) node.disconnect();
            } catch {
              // ignore
            }
          });
          nodesRef.current = [];
          setIsPlaying(false);
        }, 200);
      } else {
        setIsPlaying(false);
      }
    } catch {
      setIsPlaying(false);
    }
  };

  const togglePlayback = () => {
    setHasInteracted(true);
    if (isPlaying) {
      stopAmbience();
    } else {
      startAmbience();
    }
  };

  // Adjust volume
  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(newVol, audioCtxRef.current.currentTime, 0.05);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAmbience();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div id="cinematic-audio-player" data-cursor="audio" className="fixed bottom-4 left-4 sm:bottom-8 sm:left-8 z-[9990]">
      <div className="flex items-center gap-2.5 p-2 sm:px-3 sm:py-2 rounded-full cinema-glass-heavy shadow-2xl transition-all duration-300 hover:border-brand-electric/50">
        
        {/* Toggle Play / Pause Ambient Audio Button */}
        <button
          onClick={togglePlayback}
          className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            isPlaying
              ? 'bg-gradient-to-r from-brand-electric to-brand-orange text-white shadow-[0_0_20px_rgba(0,102,255,0.7)] scale-105'
              : 'bg-white/10 text-brand-heading hover:bg-brand-electric hover:text-white'
          }`}
          title={isPlaying ? 'Mute Ambient Music' : 'Play Cinematic Ambient Music'}
          aria-label={isPlaying ? 'Mute Ambience' : 'Play Ambience'}
        >
          {isPlaying ? (
            <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse text-white" />
          ) : (
            <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </button>

        {/* Text & Waveform Indicator */}
        <div className="hidden sm:flex flex-col pr-1 cursor-pointer select-none" onClick={togglePlayback}>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-brand-heading tracking-wider uppercase font-mono">
              {isPlaying ? 'Ambience ON' : 'Cinema Sound'}
            </span>
            {isPlaying && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            )}
          </div>
          <span className="text-[9px] font-mono text-brand-muted">
            {isPlaying ? '432Hz Master Drone' : 'Click to Immersion'}
          </span>
        </div>

        {/* Animated Sound Waveform Bars */}
        {isPlaying && (
          <div className="flex items-end gap-0.5 h-4 px-1.5 py-0.5">
            {[6, 14, 9, 15, 8].map((h, i) => (
              <div
                key={i}
                className="w-1 bg-gradient-to-t from-brand-electric to-brand-orange rounded-full animate-pulse"
                style={{
                  height: `${h}px`,
                  animationDuration: `${0.6 + i * 0.15}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Subtle volume slider (visible on desktop hover) */}
        {isPlaying && (
          <div className="hidden md:flex items-center pl-1 pr-2">
            <input
              type="range"
              min="0"
              max="0.5"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-14 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-brand-electric"
              title="Volume"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CinematicAudioPlayer;
