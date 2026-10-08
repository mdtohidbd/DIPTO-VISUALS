import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../utils/api';
import { 
  Palette, 
  Sparkles, 
  Eye, 
  Check, 
  RefreshCw, 
  Layers, 
  Zap, 
  Sliders, 
  SunMedium, 
  Moon, 
  Flame,
  Star,
  Monitor,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Compass
} from 'lucide-react';

const PRESET_THEMES = [
  // --- Dark & Cinematic Themes ---
  {
    id: 'midnight-sapphire',
    name: 'Midnight Sapphire & Gold',
    category: 'Signature Real Estate',
    mode: 'dark',
    description: 'Deep luxury navy with electric blue and sunset orange. High-end property aesthetic.',
    bgPrimary: '#060B19',
    bgSurface: '#0F172A',
    accentPrimary: '#0066FF',
    accentSecondary: '#FF7A00',
    glowIntensity: 'medium',
    bgStyle: 'aurora-mesh'
  },
  {
    id: 'cyber-emerald',
    name: 'Cyber Emerald & Obsidian',
    category: 'Sci-Fi & High-Tech',
    mode: 'dark',
    description: 'Deep obsidian with radioactive mint emerald & hyper cyan. Futuristic visual effects tone.',
    bgPrimary: '#050B0E',
    bgSurface: '#0C181D',
    accentPrimary: '#10B981',
    accentSecondary: '#06B6D4',
    glowIntensity: 'high',
    bgStyle: 'aurora-mesh'
  },
  {
    id: 'neon-violet',
    name: 'Electric Neon & Dark Amethyst',
    category: 'Creative & Hollywood',
    mode: 'dark',
    description: 'Astral violet background with royal purple and cyber magenta. Music videos & aesthetic edits.',
    bgPrimary: '#090414',
    bgSurface: '#140A28',
    accentPrimary: '#8B5CF6',
    accentSecondary: '#EC4899',
    glowIntensity: 'high',
    bgStyle: 'aurora-mesh'
  },
  {
    id: 'golden-hour',
    name: 'Golden Hour & Cinematic Amber',
    category: 'Luxury Commercial',
    mode: 'dark',
    description: 'Smoked espresso onyx with warm radiant champagne gold and sunset orange.',
    bgPrimary: '#0A0908',
    bgSurface: '#161311',
    accentPrimary: '#EAB308',
    accentSecondary: '#F97316',
    glowIntensity: 'medium',
    bgStyle: 'studio-glow'
  },
  {
    id: 'crimson-ruby',
    name: 'Crimson Cyber & Ruby Flame',
    category: 'High-Energy Action',
    mode: 'dark',
    description: 'Blood onyx with laser ruby red and coral accents. High-retention trailers and gaming reels.',
    bgPrimary: '#0D0507',
    bgSurface: '#1A0A0E',
    accentPrimary: '#EF4444',
    accentSecondary: '#F43F5E',
    glowIntensity: 'high',
    bgStyle: 'aurora-mesh'
  },
  {
    id: 'oled-titanium',
    name: 'OLED Pitch Black & Titanium Cyan',
    category: 'Apple Minimalist',
    mode: 'dark',
    description: 'Zero pure black with cold titanium gray and icy hyper-cyan. Ultra-clean modern studio look.',
    bgPrimary: '#000000',
    bgSurface: '#0D0D11',
    accentPrimary: '#00E5FF',
    accentSecondary: '#6366F1',
    glowIntensity: 'medium',
    bgStyle: 'cinematic-grid'
  },
  {
    id: 'royal-velvet',
    name: 'Royal Velvet & Rose Gold',
    category: 'Luxury Brand & Fashion',
    mode: 'dark',
    description: 'Deep plum noir with radiant rose gold and champagne amber accents. Premium editorial tone.',
    bgPrimary: '#0E0716',
    bgSurface: '#190E26',
    accentPrimary: '#F43F5E',
    accentSecondary: '#F59E0B',
    glowIntensity: 'medium',
    bgStyle: 'aurora-mesh'
  },
  {
    id: 'deep-forest',
    name: 'Deep Forest & Aurora Mint',
    category: 'Nature & Cinematic Drone',
    mode: 'dark',
    description: 'Rich dark pine with radioactive jade mint and lime rim lighting. Ideal for travel & nature edits.',
    bgPrimary: '#041009',
    bgSurface: '#0B1E13',
    accentPrimary: '#059669',
    accentSecondary: '#84CC16',
    glowIntensity: 'medium',
    bgStyle: 'aurora-mesh'
  },
  {
    id: 'monochrome-matrix',
    name: 'Monochrome Matrix & Silver Steel',
    category: 'Sleek Tech Minimalist',
    mode: 'dark',
    description: 'Carbon graphite black with sleek silver steel and sky-blue glowing edge accents.',
    bgPrimary: '#0A0A0C',
    bgSurface: '#141418',
    accentPrimary: '#38BDF8',
    accentSecondary: '#94A3B8',
    glowIntensity: 'low',
    bgStyle: 'cinematic-grid'
  },

  // --- Luxury Light & White Themes ---
  {
    id: 'pure-titanium-white',
    name: 'Pure Titanium Studio (White)',
    category: 'Clean Minimalist Luxury',
    mode: 'light',
    description: 'Ultra-clean pure white canvas with crisp slate surfaces, cobalt electric blue, and gold accents.',
    bgPrimary: '#FFFFFF',
    bgSurface: '#F8FAFC',
    accentPrimary: '#0052FF',
    accentSecondary: '#EA580C',
    glowIntensity: 'medium',
    bgStyle: 'minimal'
  },
  {
    id: 'luxury-pearl-gold',
    name: 'Luxury Pearl & Champagne (Light)',
    category: 'Editorial Luxury',
    mode: 'light',
    description: 'Warm off-white pearl background with ivory card tones, champagne gold, and bronze accents.',
    bgPrimary: '#FAF9F6',
    bgSurface: '#FFFFFF',
    accentPrimary: '#B45309',
    accentSecondary: '#C2410C',
    glowIntensity: 'medium',
    bgStyle: 'aurora-mesh'
  },
  {
    id: 'nordic-frosted-glacier',
    name: 'Nordic Frosted Glacier (Light)',
    category: 'Modern Scandinavian',
    mode: 'light',
    description: 'Crisp ice-mist light background with frosty porcelain surfaces, deep ocean cyan, and teal glows.',
    bgPrimary: '#F0F4F8',
    bgSurface: '#FFFFFF',
    accentPrimary: '#0369A1',
    accentSecondary: '#0F766E',
    glowIntensity: 'medium',
    bgStyle: 'aurora-mesh'
  },
  {
    id: 'minimalist-platinum',
    name: 'Minimalist Platinum & Charcoal (Light)',
    category: 'Apple Cupertino Style',
    mode: 'light',
    description: 'High-end tech studio aesthetic with platinum-white body, deep charcoal text, and electric sky highlights.',
    bgPrimary: '#F5F5F7',
    bgSurface: '#FFFFFF',
    accentPrimary: '#0284C7',
    accentSecondary: '#334155',
    glowIntensity: 'low',
    bgStyle: 'cinematic-grid'
  }
];

function getLuminance(hex) {
  if (!hex || typeof hex !== 'string') return 0;
  let c = hex.replace('#', '').trim();
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  if (c.length !== 6) return 0;
  const num = parseInt(c, 16);
  if (isNaN(num)) return 0;
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

function hexToHsl(hex) {
  let c = hex.replace('#', '').trim();
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  if (c.length !== 6) return { h: 215, s: 100, l: 50 };
  let r = parseInt(c.substring(0, 2), 16) / 255;
  let g = parseInt(c.substring(2, 4), 16) / 255;
  let b = parseInt(c.substring(4, 6), 16) / 255;
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const rgb = [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
  return '#' + rgb.map(x => x.toString(16).padStart(2, '0')).join('');
}

function getHighContrastAccent(hex, isLightBg) {
  if (!hex || typeof hex !== 'string') return isLightBg ? '#0040CC' : '#38BDF8';
  const hsl = hexToHsl(hex);
  if (isLightBg) {
    const targetL = Math.min(hsl.l, 36);
    const targetS = Math.max(hsl.s, 80);
    return hslToHex(hsl.h, targetS, targetL);
  } else {
    const targetL = Math.max(hsl.l, 58);
    const targetS = Math.max(hsl.s, 85);
    return hslToHex(hsl.h, targetS, targetL);
  }
}

const ManageTheme = () => {
  const [theme, setTheme] = useState({
    presetId: 'midnight-sapphire',
    name: 'Midnight Sapphire & Gold',
    bgPrimary: '#060B19',
    bgSurface: '#0F172A',
    accentPrimary: '#0066FF',
    accentSecondary: '#FF7A00',
    glowIntensity: 'medium',
    bgStyle: 'aurora-mesh'
  });

  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'dark' | 'light'
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState('');
  const [saveError, setSaveError] = useState('');

  // Fetch current theme settings on load
  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const data = await api.getTheme();
        if (data && data.bgPrimary) {
          setTheme({
            presetId: data.presetId || 'custom',
            name: data.name || 'Custom Theme',
            bgPrimary: data.bgPrimary,
            bgSurface: data.bgSurface,
            accentPrimary: data.accentPrimary,
            accentSecondary: data.accentSecondary,
            glowIntensity: data.glowIntensity || 'medium',
            bgStyle: data.bgStyle || 'aurora-mesh'
          });
        }
      } catch (err) {
        console.warn('Could not fetch theme from server, using defaults.', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTheme();
  }, []);

  const isCurrentThemeLight = useMemo(() => {
    return getLuminance(theme.bgPrimary) > 0.45;
  }, [theme.bgPrimary]);

  const contrastAccent1 = useMemo(() => {
    return getHighContrastAccent(theme.accentPrimary, isCurrentThemeLight);
  }, [theme.accentPrimary, isCurrentThemeLight]);

  const contrastAccent2 = useMemo(() => {
    return getHighContrastAccent(theme.accentSecondary, isCurrentThemeLight);
  }, [theme.accentSecondary, isCurrentThemeLight]);

  const filteredPresets = useMemo(() => {
    if (activeTab === 'dark') return PRESET_THEMES.filter(t => t.mode === 'dark');
    if (activeTab === 'light') return PRESET_THEMES.filter(t => t.mode === 'light');
    return PRESET_THEMES;
  }, [activeTab]);

  const handleSelectPreset = (preset) => {
    setTheme({
      presetId: preset.id,
      name: preset.name,
      bgPrimary: preset.bgPrimary,
      bgSurface: preset.bgSurface,
      accentPrimary: preset.accentPrimary,
      accentSecondary: preset.accentSecondary,
      glowIntensity: preset.glowIntensity,
      bgStyle: preset.bgStyle
    });
  };

  const handleCustomColorChange = (field, value) => {
    setTheme(prev => ({
      ...prev,
      presetId: 'custom',
      name: 'Custom Theme',
      [field]: value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveSuccess('');
    setSaveError('');
    try {
      await api.updateTheme(theme);
      try {
        localStorage.setItem('portfolio_active_theme', JSON.stringify(theme));
        if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
          const bc = new BroadcastChannel('portfolio_theme_sync');
          bc.postMessage(theme);
          bc.close();
        }
      } catch (e) {
        // ignore
      }
      setSaveSuccess('Theme saved & applied globally across your live portfolio!');
      setTimeout(() => setSaveSuccess(''), 4000);
    } catch (err) {
      setSaveError(err.message || 'Failed to update theme.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight flex items-center gap-3">
            <Palette className="w-8 h-8 text-teal-400" />
            Theme & Visual Customizer
          </h1>
          <p className="text-slate-400 mt-1 text-sm">
            Control portfolio background colors (Dark, Light, White & Neon styles), accent glows, and cinematic styling in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="http://localhost:5173"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-all"
          >
            <ExternalLink className="w-4 h-4 text-slate-400" />
            View Live Portfolio
          </a>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-sm shadow-lg shadow-teal-500/20 transition-all flex items-center gap-2"
          >
            {saving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Save & Publish
              </>
            )}
          </button>
        </div>
      </div>

      {/* Success / Error Feedback */}
      {saveSuccess && (
        <div className="p-4 bg-teal-500/10 border border-teal-500/30 text-teal-300 text-sm rounded-2xl flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0" />
          <span>{saveSuccess}</span>
        </div>
      )}
      {saveError && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-2xl flex items-center gap-3">
          <span>{saveError}</span>
        </div>
      )}

      {/* Grid: Presets & Controls on Left, Live Interactive Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Preset Selection + Custom Color Pickers */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Preset Palettes */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-400" />
                Curated Cinema Color Presets ({PRESET_THEMES.length})
              </h2>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'all'
                      ? 'bg-teal-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  All ({PRESET_THEMES.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('dark')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    activeTab === 'dark'
                      ? 'bg-teal-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Moon className="w-3 h-3" />
                  Dark & Cinematic
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('light')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    activeTab === 'light'
                      ? 'bg-teal-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <SunMedium className="w-3 h-3" />
                  Luxury Light / White
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Click any theme below to apply instantly. All cards, headings, typography, and contrast automatically adapt to look pristine.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {filteredPresets.map((preset) => {
                const isSelected = theme.presetId === preset.id;
                return (
                  <div
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className={`group relative p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? 'bg-slate-800/90 border-teal-500 ring-2 ring-teal-500/30 shadow-lg shadow-teal-500/10'
                        : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/50 text-[10px]">
                          {preset.category}
                        </span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                          preset.mode === 'light' 
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                            : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        }`}>
                          {preset.mode === 'light' ? 'Light / White' : 'Dark Mode'}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center text-slate-950">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    <h3 className="font-bold text-slate-200 text-sm mb-1 group-hover:text-teal-300 transition-colors">
                      {preset.name}
                    </h3>
                    <p className="text-slate-400 text-xs line-clamp-2 mb-3">
                      {preset.description}
                    </p>

                    {/* Color Swatch Dots */}
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-800/60">
                      <div className="flex items-center gap-1.5">
                        <div
                          className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                          style={{ backgroundColor: preset.bgPrimary }}
                          title={`Base: ${preset.bgPrimary}`}
                        />
                        <div
                          className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                          style={{ backgroundColor: preset.bgSurface }}
                          title={`Surface: ${preset.bgSurface}`}
                        />
                        <div
                          className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                          style={{ backgroundColor: preset.accentPrimary }}
                          title={`Primary Accent: ${preset.accentPrimary}`}
                        />
                        <div
                          className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                          style={{ backgroundColor: preset.accentSecondary }}
                          title={`Secondary Accent: ${preset.accentSecondary}`}
                        />
                      </div>
                      <span className="text-[11px] text-slate-400 ml-auto font-mono">
                        {preset.accentPrimary}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Precision Color Pickers */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-teal-400" />
                Custom Color Adjustments
              </h2>
              {theme.presetId === 'custom' && (
                <span className="text-xs px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 font-semibold">
                  Custom Mode Active
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Primary Background */}
              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">
                  Primary Background (Base)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={theme.bgPrimary}
                    onChange={(e) => handleCustomColorChange('bgPrimary', e.target.value)}
                    className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0 p-0"
                  />
                  <input
                    type="text"
                    value={theme.bgPrimary}
                    onChange={(e) => handleCustomColorChange('bgPrimary', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-slate-100 text-xs font-mono rounded-xl px-3 py-2 uppercase"
                  />
                </div>
                <p className="text-[11px] text-slate-400">Deepest base canvas (Dark, White, or Colored)</p>
              </div>

              {/* Surface / Card Color */}
              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">
                  Surface / Card Tone
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={theme.bgSurface}
                    onChange={(e) => handleCustomColorChange('bgSurface', e.target.value)}
                    className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0 p-0"
                  />
                  <input
                    type="text"
                    value={theme.bgSurface}
                    onChange={(e) => handleCustomColorChange('bgSurface', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-slate-100 text-xs font-mono rounded-xl px-3 py-2 uppercase"
                  />
                </div>
                <p className="text-[11px] text-slate-400">Card containers, secondary sections & cards</p>
              </div>

              {/* Primary Accent Color */}
              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">
                  Primary Accent & Buttons
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={theme.accentPrimary}
                    onChange={(e) => handleCustomColorChange('accentPrimary', e.target.value)}
                    className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0 p-0"
                  />
                  <input
                    type="text"
                    value={theme.accentPrimary}
                    onChange={(e) => handleCustomColorChange('accentPrimary', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-slate-100 text-xs font-mono rounded-xl px-3 py-2 uppercase"
                  />
                </div>
                <p className="text-[11px] text-slate-400">Call-to-actions, badges, main neon glow aura</p>
              </div>

              {/* Secondary Accent Color */}
              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">
                  Secondary Gradient Tone
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={theme.accentSecondary}
                    onChange={(e) => handleCustomColorChange('accentSecondary', e.target.value)}
                    className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0 p-0"
                  />
                  <input
                    type="text"
                    value={theme.accentSecondary}
                    onChange={(e) => handleCustomColorChange('accentSecondary', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-slate-100 text-xs font-mono rounded-xl px-3 py-2 uppercase"
                  />
                </div>
                <p className="text-[11px] text-slate-400">Gradient text highlights, rim light, secondary tags</p>
              </div>
            </div>

            {/* Ambient Atmosphere & Style Settings */}
            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">
                  Ambient Glow Intensity
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['low', 'medium', 'high', 'vibrant'].map((intensity) => (
                    <button
                      key={intensity}
                      type="button"
                      onClick={() => setTheme(prev => ({ ...prev, glowIntensity: intensity }))}
                      className={`py-2 text-xs font-bold capitalize rounded-xl border transition-all ${
                        theme.glowIntensity === intensity
                          ? 'bg-teal-500/20 text-teal-300 border-teal-500'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {intensity}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">
                  Background Visual Pattern
                </label>
                <select
                  value={theme.bgStyle}
                  onChange={(e) => setTheme(prev => ({ ...prev, bgStyle: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2.5 focus:border-teal-500 focus:outline-none"
                >
                  <option value="aurora-mesh">Aurora Light Mesh (Recommended)</option>
                  <option value="cinematic-grid">Cinematic Studio Grid</option>
                  <option value="studio-glow">Conical Studio Spotlight</option>
                  <option value="minimal">Minimal Soft Vignette</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Interactive Mockup Preview */}
        <div className="lg:col-span-5 space-y-6">
          <div className="sticky top-6 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Eye className="w-5 h-5 text-teal-400" />
                Live Portfolio Preview
              </h2>
              <span className={`text-[11px] px-2.5 py-0.5 rounded-full border font-semibold ${
                isCurrentThemeLight
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  : 'bg-teal-500/10 text-teal-400 border-teal-500/20'
              }`}>
                {isCurrentThemeLight ? '☀️ Light Mode Active' : '🌙 Dark Mode Active'}
              </span>
            </div>

            {/* Simulated Miniature Portfolio Mockup Card */}
            <div
              className="relative rounded-2xl p-5 border overflow-hidden transition-all duration-500 shadow-2xl space-y-5"
              style={{
                backgroundColor: theme.bgPrimary,
                borderColor: isCurrentThemeLight ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                boxShadow: isCurrentThemeLight 
                  ? '0 15px 35px -5px rgba(0, 0, 0, 0.1)' 
                  : `0 20px 50px -10px ${theme.accentPrimary}33`
              }}
            >
              {/* Background ambient mesh glow simulation */}
              <div
                className="absolute top-0 right-0 w-44 h-44 rounded-full blur-3xl pointer-events-none transition-all duration-700"
                style={{ 
                  backgroundColor: theme.accentPrimary,
                  opacity: isCurrentThemeLight ? 0.18 : 0.4
                }}
              />
              <div
                className="absolute bottom-0 left-0 w-36 h-36 rounded-full blur-3xl pointer-events-none transition-all duration-700"
                style={{ 
                  backgroundColor: theme.accentSecondary,
                  opacity: isCurrentThemeLight ? 0.15 : 0.3
                }}
              />

              {/* Mockup Topbar */}
              <div 
                className="relative z-10 flex items-center justify-between pb-3 border-b"
                style={{
                  borderColor: isCurrentThemeLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.1)'
                }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full animate-pulse"
                    style={{ backgroundColor: contrastAccent1 }}
                  />
                  <span 
                    className="text-xs font-extrabold tracking-wider"
                    style={{ color: isCurrentThemeLight ? '#0F172A' : '#FFFFFF' }}
                  >
                    DIPTO VISUALS
                  </span>
                </div>
                <div
                  className="px-2.5 py-1 rounded-full text-[10px] font-bold text-white shadow-sm"
                  style={{ backgroundColor: theme.accentPrimary }}
                >
                  LET'S TALK
                </div>
              </div>

              {/* Mockup Hero Headline */}
              <div className="relative z-10 space-y-2">
                <div
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border"
                  style={{
                    backgroundColor: isCurrentThemeLight ? 'rgba(0, 0, 0, 0.04)' : `${theme.accentPrimary}15`,
                    borderColor: isCurrentThemeLight ? 'rgba(0, 0, 0, 0.1)' : `${theme.accentPrimary}40`,
                    color: contrastAccent1
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: contrastAccent1 }} />
                  REAL ESTATE VIDEO EDITOR
                </div>

                <h3 
                  className="text-lg font-black leading-tight"
                  style={{ color: isCurrentThemeLight ? '#0F172A' : '#FFFFFF' }}
                >
                  Turn Property Footage Into{' '}
                  <span
                    className="inline-block font-extrabold"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${contrastAccent1}, ${contrastAccent2})`,
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      color: 'transparent'
                    }}
                  >
                    Cinematic Masterpieces
                  </span>
                </h3>

                <p 
                  className="text-[11px] leading-relaxed font-medium"
                  style={{ color: isCurrentThemeLight ? '#334155' : '#CBD5E1' }}
                >
                  High-converting property walkthroughs, drone edits, and viral reels that captivate high-ticket buyers.
                </p>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <div
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white shadow-md flex items-center gap-1 transition-all"
                    style={{
                      backgroundColor: theme.accentPrimary,
                      boxShadow: `0 0 15px ${theme.accentPrimary}60`
                    }}
                  >
                    View Projects
                  </div>
                  <div 
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold border"
                    style={{
                      backgroundColor: isCurrentThemeLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.05)',
                      borderColor: isCurrentThemeLight ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.2)',
                      color: isCurrentThemeLight ? '#0F172A' : '#E2E8F0'
                    }}
                  >
                    Pricing
                  </div>
                </div>
              </div>

              {/* Mockup Project Card */}
              <div
                className="relative z-10 rounded-xl p-3 border transition-all duration-300 shadow-sm"
                style={{
                  backgroundColor: isCurrentThemeLight ? '#FFFFFF' : theme.bgSurface,
                  borderColor: isCurrentThemeLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)'
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-lg bg-cover bg-center border flex-shrink-0 relative overflow-hidden"
                    style={{
                      borderColor: isCurrentThemeLight ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                      backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=200&q=80')`
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-40"
                      style={{
                        background: `linear-gradient(to top, ${theme.bgPrimary}, transparent)`
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p 
                      className="text-[11px] font-bold truncate"
                      style={{ color: isCurrentThemeLight ? '#0F172A' : '#FFFFFF' }}
                    >
                      Beverly Hills Luxury Villa
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span
                        className="text-[9px] font-medium px-1.5 py-0.2 rounded"
                        style={{
                          backgroundColor: isCurrentThemeLight ? 'rgba(0, 0, 0, 0.04)' : `${theme.accentSecondary}20`,
                          color: contrastAccent2
                        }}
                      >
                        4K Drone Tour
                      </span>
                      <span 
                        className="text-[9px]"
                        style={{ color: isCurrentThemeLight ? '#475569' : '#94A3B8' }}
                      >
                        120K Views
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Active Specs */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2 text-xs">
              <p className="font-bold text-slate-300 flex items-center justify-between">
                <span>Active Configuration:</span>
                <span className="text-teal-400 font-mono text-[11px]">{theme.name}</span>
              </p>
              <div className="grid grid-cols-2 gap-2 text-slate-400 text-[11px]">
                <div>Base: <span className="font-mono text-slate-200">{theme.bgPrimary}</span></div>
                <div>Surface: <span className="font-mono text-slate-200">{theme.bgSurface}</span></div>
                <div>Primary: <span className="font-mono text-slate-200">{theme.accentPrimary}</span></div>
                <div>Secondary: <span className="font-mono text-slate-200">{theme.accentSecondary}</span></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ManageTheme;
