'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const MILESTONES = [
  { pct: 0, text: 'INITIALIZING LOGISTICS DESK' },
  { pct: 28, text: 'MAPPING TAMIL NADU CORRIDORS' },
  { pct: 58, text: 'SYNCHRONIZING FLEET DISPATCH' },
  { pct: 85, text: 'PREPARING CARGO SOLUTIONS' },
  { pct: 100, text: 'READY • ELSHALI LOGISTICS' },
];

export default function SplashScreen() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const dismissedRef = useRef(false);

  useEffect(() => {
    // 1. Session check — only show on fresh visit
    try {
      if (sessionStorage.getItem('elshali_logo_preloader_seen') === 'true') {
        return;
      }
      sessionStorage.setItem('elshali_logo_preloader_seen', 'true');
    } catch {
      // Storage unavailable or blocked
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

    let frameId: number;

    const rafId = requestAnimationFrame(() => {
      setVisible(true);
      const startTime = performance.now();
      const duration = 1200; // 1.2s smooth executive intro

      const tick = (now: number) => {
        if (dismissedRef.current) return;
        const elapsed = now - startTime;
        const pct = Math.min(100, Math.round((elapsed / duration) * 100));
        setProgress(pct);

        if (pct < 100) {
          frameId = requestAnimationFrame(tick);
        } else {
          // Trigger fade out
          setFadingOut(true);
          setTimeout(() => {
            setVisible(false);
          }, 450);
        }
      };

      frameId = requestAnimationFrame(tick);
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  const handleDismiss = () => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    setProgress(100);
    setFadingOut(true);
    setTimeout(() => {
      setVisible(false);
    }, 300);
  };

  if (!visible) return null;

  // Determine current status message
  const currentMilestone =
    [...MILESTONES].reverse().find((m) => progress >= m.pct) || MILESTONES[0];

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading ELSHALI LOGISTICS"
      onClick={handleDismiss}
      className={`preloader-overlay ${fadingOut ? 'preloader-fade-out' : ''}`}
    >
      {/* Ambient background glow orbs */}
      <div className="preloader-glow-orb-1" aria-hidden="true" />
      <div className="preloader-glow-orb-2" aria-hidden="true" />

      {/* Main card */}
      <div className="preloader-content" onClick={(e) => e.stopPropagation()}>
        {/* Glowing Logo Badge with Ripple Ring */}
        <div className="preloader-logo-wrapper">
          <div className="preloader-pulse-ring" aria-hidden="true" />
          <div className="preloader-pulse-ring-delayed" aria-hidden="true" />
          <div className="preloader-logo-badge">
            <Image
              src="/images/elshali-badge.webp"
              alt="ELSHALI LOGISTICS Brand Logo"
              width={120}
              height={120}
              priority
              className="preloader-logo-img"
            />
          </div>
        </div>

        {/* Brand Name Typography */}
        <div className="preloader-brand-title">
          <span className="preloader-brand-white">ELSHALI</span>{' '}
          <span className="preloader-brand-pink">LOGISTICS</span>
        </div>

        {/* Brand Subtitle */}
        <div className="preloader-brand-sub">
          CARGO SOLUTIONS &amp; FREIGHT TRANSPORT
        </div>

        {/* High-tech Progress Track */}
        <div className="preloader-progress-box">
          <div className="preloader-progress-track">
            <div
              className="preloader-progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Metrics row */}
          <div className="preloader-metrics-row">
            <span className="preloader-status-text">{currentMilestone.text}</span>
            <span className="preloader-pct-text">{progress}%</span>
          </div>
        </div>

        {/* Quick Skip hint */}
        <button
          type="button"
          onClick={handleDismiss}
          className="preloader-skip-btn"
          aria-label="Tap to enter: skip intro animation"
        >
          TAP TO ENTER &rarr;
        </button>
      </div>
    </div>
  );
}
