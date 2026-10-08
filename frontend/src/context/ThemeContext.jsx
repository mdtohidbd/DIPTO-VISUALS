import React, { createContext, useContext, useState, useEffect } from 'react';

const DEFAULT_THEME = {
  presetId: 'midnight-sapphire',
  name: 'Midnight Sapphire & Gold',
  bgPrimary: '#060B19',
  bgSurface: '#0F172A',
  accentPrimary: '#0066FF',
  accentSecondary: '#FF7A00',
  glowIntensity: 'medium',
  bgStyle: 'aurora-mesh'
};

const ThemeContext = createContext({
  theme: DEFAULT_THEME,
  isLight: false,
  setTheme: () => {},
  refreshTheme: () => {}
});

export function hexToRgba(hex, alpha = 1) {
  if (!hex || typeof hex !== 'string') return `rgba(0, 102, 255, ${alpha})`;
  let c = hex.replace('#', '').trim();
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  if (c.length !== 6) return `rgba(0, 102, 255, ${alpha})`;
  const num = parseInt(c, 16);
  if (isNaN(num)) return `rgba(0, 102, 255, ${alpha})`;
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function getLuminance(hex) {
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
  if (!hex || typeof hex !== 'string') return { h: 215, s: 100, l: 50 };
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

// Calculate mathematically verified high-contrast text color from accent
export function getHighContrastAccent(hex, isLightBg) {
  if (!hex || typeof hex !== 'string') return isLightBg ? '#0040CC' : '#38BDF8';
  const hsl = hexToHsl(hex);
  if (isLightBg) {
    // For light backgrounds (white/pearl/light gray):
    // Force lightness to a deep, rich jewel-tone (28% - 35%) with high saturation so text stands out crisply
    const targetL = Math.min(hsl.l, 34);
    const targetS = Math.max(hsl.s, 85);
    return hslToHex(hsl.h, targetS, targetL);
  } else {
    // For dark backgrounds:
    // Ensure lightness is vibrant and luminous (58% - 68%)
    const targetL = Math.max(hsl.l, 60);
    const targetS = Math.max(hsl.s, 85);
    return hslToHex(hsl.h, targetS, targetL);
  }
}

export const applyThemeToDOM = (t) => {
  if (!t || typeof document === 'undefined') return;
  const root = document.documentElement;
  const baseBg = t.bgPrimary || '#060B19';
  const surfaceBg = t.bgSurface || '#0F172A';
  const accent1 = t.accentPrimary || '#0066FF';
  const accent2 = t.accentSecondary || '#FF7A00';
  const glow = t.glowIntensity || 'medium';

  const luminance = getLuminance(baseBg);
  const isLight = luminance > 0.42;

  const contrastAccent1 = getHighContrastAccent(accent1, isLight);
  const contrastAccent2 = getHighContrastAccent(accent2, isLight);

  const glowMult = glow === 'vibrant' ? 1.5 : glow === 'high' ? 1.25 : glow === 'low' ? 0.6 : 1.0;

  // Set active theme mode attribute on <html>
  root.setAttribute('data-theme-mode', isLight ? 'light' : 'dark');
  root.style.colorScheme = isLight ? 'light' : 'dark';

  // Core Theme Palette
  root.style.setProperty('--brand-navy', baseBg);
  root.style.setProperty('--brand-navy-light', surfaceBg);
  root.style.setProperty('--brand-electric', accent1);
  root.style.setProperty('--brand-orange', accent2);

  // High-Contrast Text & Gradient Accents
  root.style.setProperty('--brand-electric-text', contrastAccent1);
  root.style.setProperty('--brand-orange-text', contrastAccent2);
  root.style.setProperty('--heading-gradient', `linear-gradient(135deg, ${contrastAccent1}, ${contrastAccent2})`);

  // Cinema Aliases
  root.style.setProperty('--cinema-bg', baseBg);
  root.style.setProperty('--cinema-surface', surfaceBg);
  root.style.setProperty('--cinema-accent', accent1);
  root.style.setProperty('--cinema-rim', accent2);

  // Dynamic Typography & Contrast Colors
  if (isLight) {
    root.style.setProperty('--brand-text', '#1E293B');
    root.style.setProperty('--brand-heading', '#090D1A');
    root.style.setProperty('--brand-muted', '#475569');
    root.style.setProperty('--brand-subtle', '#64748B');
    root.style.setProperty('--card-bg', '#FFFFFF');
    root.style.setProperty('--card-surface', '#F8FAFC');
    root.style.setProperty('--card-border', 'rgba(15, 23, 42, 0.08)');
    root.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.94)');
    root.style.setProperty('--glass-heavy', 'rgba(255, 255, 255, 0.98)');
    root.style.setProperty('--glass-border', 'rgba(15, 23, 42, 0.09)');
    root.style.setProperty('--input-bg', '#FFFFFF');
    root.style.setProperty('--input-border', 'rgba(15, 23, 42, 0.16)');
    root.style.setProperty('--input-text', '#090D1A');
    root.style.setProperty('--pill-bg', 'rgba(15, 23, 42, 0.05)');
    root.style.setProperty('--pill-border', 'rgba(15, 23, 42, 0.09)');
    root.style.setProperty('--pill-text', '#1E293B');
    root.style.setProperty('--btn-secondary-bg', '#FFFFFF');
    root.style.setProperty('--btn-secondary-border', 'rgba(15, 23, 42, 0.14)');
    root.style.setProperty('--btn-secondary-text', '#090D1A');
    root.style.setProperty('--theme-shadow', '0 10px 30px -5px rgba(0, 0, 0, 0.07), 0 2px 6px -1px rgba(0, 0, 0, 0.04)');
    document.body.style.color = '#1E293B';
  } else {
    root.style.setProperty('--brand-text', '#F1F5F9');
    root.style.setProperty('--brand-heading', '#FFFFFF');
    root.style.setProperty('--brand-muted', '#94A3B8');
    root.style.setProperty('--brand-subtle', '#64748B');
    root.style.setProperty('--card-bg', hexToRgba(surfaceBg, 0.78));
    root.style.setProperty('--card-surface', surfaceBg);
    root.style.setProperty('--card-border', 'rgba(255, 255, 255, 0.09)');
    root.style.setProperty('--glass-bg', hexToRgba(surfaceBg, 0.65));
    root.style.setProperty('--glass-heavy', hexToRgba(baseBg, 0.88));
    root.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.09)');
    root.style.setProperty('--input-bg', hexToRgba(surfaceBg, 0.65));
    root.style.setProperty('--input-border', 'rgba(255, 255, 255, 0.12)');
    root.style.setProperty('--input-text', '#F8FAFC');
    root.style.setProperty('--pill-bg', 'rgba(255, 255, 255, 0.07)');
    root.style.setProperty('--pill-border', 'rgba(255, 255, 255, 0.12)');
    root.style.setProperty('--pill-text', '#F1F5F9');
    root.style.setProperty('--btn-secondary-bg', 'rgba(255, 255, 255, 0.07)');
    root.style.setProperty('--btn-secondary-border', 'rgba(255, 255, 255, 0.16)');
    root.style.setProperty('--btn-secondary-text', '#FFFFFF');
    root.style.setProperty('--theme-shadow', '0 20px 40px -15px rgba(0, 0, 0, 0.5)');
    document.body.style.color = '#F1F5F9';
  }

  // Atmospheric Glow Tokens
  root.style.setProperty('--glow-primary-40', hexToRgba(accent1, Math.min(0.4 * glowMult, 0.8)));
  root.style.setProperty('--glow-primary-30', hexToRgba(accent1, Math.min(0.3 * glowMult, 0.7)));
  root.style.setProperty('--glow-primary-15', hexToRgba(accent1, Math.min(0.15 * glowMult, 0.5)));
  root.style.setProperty('--glow-primary-10', hexToRgba(accent1, Math.min(0.10 * glowMult, 0.3)));

  root.style.setProperty('--glow-secondary-40', hexToRgba(accent2, Math.min(0.4 * glowMult, 0.8)));
  root.style.setProperty('--glow-secondary-30', hexToRgba(accent2, Math.min(0.3 * glowMult, 0.7)));
  root.style.setProperty('--glow-secondary-15', hexToRgba(accent2, Math.min(0.15 * glowMult, 0.5)));

  document.body.style.backgroundColor = baseBg;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try {
      const cached = localStorage.getItem('portfolio_active_theme');
      if (cached) {
        const parsed = JSON.parse(cached);
        applyThemeToDOM(parsed);
        return parsed;
      }
    } catch {
      // ignore
    }
    applyThemeToDOM(DEFAULT_THEME);
    return DEFAULT_THEME;
  });

  const isLight = getLuminance(theme?.bgPrimary || '#060B19') > 0.42;

  const updateThemeState = (newTheme) => {
    if (newTheme && newTheme.bgPrimary) {
      setTheme(newTheme);
      applyThemeToDOM(newTheme);
      try {
        localStorage.setItem('portfolio_active_theme', JSON.stringify(newTheme));
      } catch (e) {
        // ignore
      }
    }
  };

  const fetchThemeFromServer = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/settings/theme');
      if (res.ok) {
        const data = await res.json();
        if (data && data.bgPrimary) {
          updateThemeState(data);
        }
      }
    } catch (err) {
      console.warn('Backend offline or failed to fetch theme settings, using cached/default theme.');
    }
  };

  useEffect(() => {
    fetchThemeFromServer();

    // 1. Listen for BroadcastChannel updates from Admin panel
    let bc;
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        bc = new BroadcastChannel('portfolio_theme_sync');
        bc.onmessage = (event) => {
          if (event.data && event.data.bgPrimary) {
            updateThemeState(event.data);
          }
        };
      } catch (e) {
        // ignore
      }
    }

    // 2. Listen for localStorage changes across tabs
    const handleStorage = (e) => {
      if (e.key === 'portfolio_active_theme' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          updateThemeState(parsed);
        } catch (err) {
          // ignore
        }
      }
    };
    window.addEventListener('storage', handleStorage);

    // 3. Re-fetch on window focus
    const handleFocus = () => {
      fetchThemeFromServer();
    };
    window.addEventListener('focus', handleFocus);

    // 4. Gentle periodic poll every 5s
    const pollInterval = setInterval(fetchThemeFromServer, 5000);

    return () => {
      if (bc) bc.close();
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('focus', handleFocus);
      clearInterval(pollInterval);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, isLight, setTheme: updateThemeState, refreshTheme: fetchThemeFromServer }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
export default ThemeContext;
