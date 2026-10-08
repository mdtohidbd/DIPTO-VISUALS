import { useState, useEffect } from 'react';

/**
 * Detects device GPU capabilities and returns performance tier flags.
 * Used to switch between WebGL 3D scenes and CSS fallback modes.
 */
export function useGPUTier() {
  const [tier, setTier] = useState({
    isMobile: false,
    isLowEnd: false,
    prefersReducedMotion: false,
  });

  useEffect(() => {
    // Check if WebGL is supported
    let hasWebGL = false;
    let isSoftwareRenderer = false;

    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl');

      if (gl) {
        hasWebGL = true;
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase();
          // Only flag software CPU fallbacks
          const softwareKeywords = ['llvmpipe', 'swiftshader', 'microsoft basic render'];
          if (softwareKeywords.some((kw) => renderer.includes(kw))) {
            isSoftwareRenderer = true;
          }
        }
      }
    } catch {
      hasWebGL = false;
    }

    // Only fallback if WebGL is completely missing or running on software CPU emulator
    const isLowEnd = !hasWebGL || isSoftwareRenderer;
    const isMobile = window.innerWidth < 640;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    setTier({ isMobile, isLowEnd, prefersReducedMotion });
  }, []);

  return tier;
}
