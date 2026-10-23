'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function SplashScreen() {
  const [mounted, setMounted] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(12);
  const [statusText, setStatusText] = useState('INITIALIZING FLEET NETWORK...');

  const handleDismiss = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setMounted(false);
      try {
        sessionStorage.setItem('elsali_splash_shown', 'true');
      } catch {
        // Ignore storage errors in private browsing
      }
    }, 550);
  }, []);

  useEffect(() => {
    // Check if user already saw the splash screen in this session
    try {
      if (sessionStorage.getItem('elsali_splash_shown') === 'true') {
        setMounted(false);
        return;
      }
    } catch {
      // Ignore
    }

    // Progress timer
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 18) + 12;
        if (next >= 100) {
          clearInterval(interval);
          setStatusText('FLEET READY • PAN-INDIA');
          setTimeout(() => {
            handleDismiss();
          }, 350);
          return 100;
        }

        if (next > 70) {
          setStatusText('CONNECTING DISPATCH SYSTEM...');
        } else if (next > 35) {
          setStatusText('CALIBRATING HIGHWAY CORRIDORS...');
        }

        return next;
      });
    }, 180);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        handleDismiss();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
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

      {/* Top right skip button */}
      <button
        className="splash-skip-btn"
        onClick={(e) => {
          e.stopPropagation();
          handleDismiss();
        }}
        aria-label="Skip splash screen"
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
              width={88}
              height={88}
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
              <Sparkles size={13} className="splash-sparkle-icon" />
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
          <span>Click anywhere or press Esc to enter</span>
        </div>
      </div>
    </div>
  );
}
