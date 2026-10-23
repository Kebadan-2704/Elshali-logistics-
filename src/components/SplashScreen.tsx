'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function SplashScreen() {
  const [mounted, setMounted] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('CONNECTING FLEET SATELLITE NETWORK...');
  const [isComplete, setIsComplete] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleDismiss = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      setMounted(false);
    }, 600);
  }, [isExiting]);

  useEffect(() => {
    // Ensure document starts at the very top of Home on load/reload
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Smooth deterministic animation over ~1.8 seconds
    const startTime = Date.now();
    const duration = 1800; // 1.8 seconds guaranteed viewing time

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 35) {
        setStatusText('CONNECTING FLEET SATELLITE NETWORK...');
      } else if (pct < 70) {
        setStatusText('CALIBRATING PAN-INDIA HIGHWAY CORRIDORS...');
      } else if (pct < 100) {
        setStatusText('DISPATCH READY • COIMBATORE CENTRAL HUB...');
      } else {
        setStatusText('WELCOME TO ELSALI LOGISTICS');
        setIsComplete(true);
        clearInterval(interval);

        timerRef.current = setTimeout(() => {
          handleDismiss();
        }, 400);
      }
    }, 30);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        handleDismiss();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleDismiss]);

  if (!mounted) return null;

  return (
    <div
      className={`splash-overlay ${isExiting ? 'splash-exiting' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to ELSALI LOGISTICS"
      onClick={handleDismiss}
    >
      {/* Background ambient lighting & grid */}
      <div className="splash-ambient-glow" />
      <div className="splash-grid-lines" />
      <div className="splash-light-streak" />

      {/* Top right skip button */}
      <button
        className="splash-skip-btn"
        onClick={(e) => {
          e.stopPropagation();
          handleDismiss();
        }}
        aria-label="Skip intro"
      >
        <span>SKIP</span>
        <ArrowRight size={14} />
      </button>

      {/* Central hero box */}
      <div className="splash-center" onClick={(e) => e.stopPropagation()}>
        {/* Glowing Logo Tile */}
        <div className="splash-logo-wrapper">
          <div className="splash-logo-glow" />
          <div className="splash-logo-tile">
            <Image
              src="/images/elsali-logo.webp"
              alt="ELSALI LOGISTICS Logo"
              width={96}
              height={96}
              priority
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>

        {/* Brand Title */}
        <div className="splash-brand-group">
          <div className="splash-pill-tag">
            <span className="splash-dot-pulse" />
            <span>TRANSPORT SERVICES</span>
            <span className="splash-tag-bullet">•</span>
            <span className="splash-tag-accent">PAN INDIA</span>
          </div>

          <h1 className="splash-brand-title">
            ELSALI <span className="splash-highlight">LOGISTICS</span>
          </h1>

          <p className="splash-brand-tagline">
            Reliable Transportation. Professional Service. Pan-India Reach.
          </p>
        </div>

        {/* Progress & Speedometer Tracker */}
        <div className="splash-progress-card">
          <div className="splash-progress-header">
            <span className="splash-status-label">
              {isComplete ? (
                <CheckCircle2 size={13} className="splash-check-icon" />
              ) : (
                <Sparkles size={13} className="splash-sparkle-icon" />
              )}
              {statusText}
            </span>
            <span className="splash-percent-label">{progress}%</span>
          </div>

          <div className="splash-progress-track">
            <div
              className="splash-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="splash-meta-strip">
            <span>COIMBATORE HUB</span>
            <span className="splash-meta-sep">/</span>
            <span>LCV &amp; HCV FLEET</span>
            <span className="splash-meta-sep">/</span>
            <span>24x7 DISPATCH</span>
          </div>
        </div>

        <div className="splash-footer-hint">
          <span>Click anywhere to enter</span>
        </div>
      </div>
    </div>
  );
}
