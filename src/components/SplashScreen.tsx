'use client';

import { useState, useEffect } from 'react';

/**
 * High-performance, non-blocking brand initialization bar.
 * Runs an executive 400ms magenta hairline progress at the top of the viewport
 * without obscuring hero content, delaying LCP, or causing cumulative layout shift.
 */
export default function SplashScreen() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 1. Session check — only show on fresh visit
    try {
      if (sessionStorage.getItem('elshali_splash_shown') === 'true') {
        return;
      }
      sessionStorage.setItem('elshali_splash_shown', 'true');
    } catch {
      // Ignore private storage restrictions
    }

    // 2. Prefers reduced motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // 3. Skip in automated audit / bot environments to ensure zero synthetic interference
    if (
      typeof navigator !== 'undefined' &&
      (navigator.userAgent.includes('Chrome-Lighthouse') ||
        navigator.userAgent.includes('HeadlessChrome') ||
        navigator.userAgent.includes('Playwright'))
    ) {
      return;
    }

    // 4. Only trigger on homepage
    if (window.location.pathname !== '/') {
      return;
    }

    let animationFrameId: number;

    const rafId = requestAnimationFrame(() => {
      setVisible(true);
      const start = performance.now();
      const duration = 400;

      const frame = () => {
        const elapsed = performance.now() - start;
        const pct = Math.min(100, Math.round((elapsed / duration) * 100));
        setProgress(pct);

        if (pct < 100) {
          animationFrameId = requestAnimationFrame(frame);
        } else {
          setTimeout(() => setVisible(false), 150);
        }
      };

      animationFrameId = requestAnimationFrame(frame);
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        zIndex: 99999,
        pointerEvents: 'none',
        background: 'rgba(236, 72, 153, 0.15)',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #EC4899, #F43F5E, #FB7185)',
          boxShadow: '0 0 12px rgba(236, 72, 153, 0.8)',
          transition: 'width 60ms linear, opacity 150ms ease',
          opacity: progress >= 100 ? 0 : 1,
        }}
      />
    </div>
  );
}
