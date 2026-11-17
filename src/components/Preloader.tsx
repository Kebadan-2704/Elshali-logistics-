'use client';

import { useEffect, useRef, useState } from 'react';
import './preloader.css';

const KEY = 'elshali_preloader_seen';
const PLAY_MS = 2800;
const FAILSAFE_MS = 6000;

type Props = { logoSrc?: string };

export default function Preloader({ logoSrc }: Props) {
  const [gone, setGone] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbitRef = useRef<SVGPathElement>(null);
  const cometRef = useRef<SVGCircleElement>(null);
  const emblemRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const glintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;

    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(KEY) === '1' || html.dataset.preloader === 'skip';
    } catch {}

    if (alreadySeen) {
      requestAnimationFrame(() => setGone(true));
      return;
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timers: number[] = [];
    let raf = 0;
    let cometRaf = 0;
    let finished = false;
    let animDone = false;
    let pageLoaded = document.readyState === 'complete';
    const anims: Animation[] = [];
    const prevOverflow = html.style.overflow;
    html.style.overflow = 'hidden';

    const later = (fn: () => void, ms: number) => {
      timers.push(window.setTimeout(fn, ms));
    };

    const ease = (
      el: Element | null,
      frames: Keyframe[],
      dur: number,
      delay = 0,
      easing = 'cubic-bezier(.2,.8,.2,1)'
    ) => {
      if (!el || typeof el.animate !== 'function') return;
      anims.push(el.animate(frames, { duration: dur, delay, easing, fill: 'forwards' }));
    };

    const finish = () => {
      if (finished) return;
      finished = true;
      try {
        sessionStorage.setItem(KEY, '1');
      } catch {}
      setLeaving(true);
      later(() => {
        html.style.overflow = prevOverflow;
        setGone(true);
      }, 500);
    };

    const maybeFinish = () => {
      if (animDone && pageLoaded) finish();
    };

    const onLoad = () => {
      pageLoaded = true;
      maybeFinish();
    };

    if (!pageLoaded) {
      window.addEventListener('load', onLoad);
    }
    later(finish, FAILSAFE_MS);

    // sparks
    const cv = canvasRef.current;
    const ctx = cv?.getContext('2d') ?? null;
    type P = { x: number; y: number; vx: number; vy: number; life: number; dec: number; s: number };
    let parts: P[] = [];

    const size = () => {
      if (!cv || !ctx) return;
      const d = window.devicePixelRatio || 1;
      cv.width = window.innerWidth * d;
      cv.height = window.innerHeight * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
    };

    const loop = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      parts = parts.filter((p) => p.life > 0);
      ctx.globalCompositeOperation = 'lighter';
      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.985;
        p.vy = p.vy * 0.985 - 0.01;
        p.life -= p.dec;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,${110 + Math.round(p.life * 70)},40,${Math.max(p.life, 0)})`;
        ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = parts.length ? requestAnimationFrame(loop) : 0;
    };

    const burst = () => {
      const r = emblemRef.current?.getBoundingClientRect();
      if (!r || !ctx) return;
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      for (let i = 0; i < 46; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = 1.2 + Math.random() * 3.4;
        parts.push({
          x: cx + Math.cos(a) * r.width * 0.3,
          y: cy + Math.sin(a) * r.width * 0.22,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp - 0.6,
          life: 1,
          dec: 0.012 + Math.random() * 0.014,
          s: 1 + Math.random() * 2.2,
        });
      }
      if (!raf) raf = requestAnimationFrame(loop);
    };

    // comet that travels along the orbit path
    const runComet = () => {
      const path = orbitRef.current;
      const dot = cometRef.current;
      if (!path || !dot) return;
      try {
        const len = typeof path.getTotalLength === 'function' ? path.getTotalLength() : 0;
        if (!len) return;
        const t0 = performance.now();
        const D = 1100;
        dot.style.opacity = '1';
        const step = (now: number) => {
          const k = Math.min((now - t0) / D, 1);
          const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
          const pt = path.getPointAtLength(e * len);
          dot.setAttribute('cx', String(pt.x));
          dot.setAttribute('cy', String(pt.y));
          if (k < 1) {
            cometRaf = requestAnimationFrame(step);
          } else {
            dot.style.opacity = '0';
          }
        };
        cometRaf = requestAnimationFrame(step);
      } catch {}
    };

    if (reduce) {
      ease(rootRef.current, [{ opacity: 0 }, { opacity: 1 }], 300);
      later(() => {
        animDone = true;
        maybeFinish();
      }, 1200);
    } else {
      size();
      window.addEventListener('resize', size);
      ease(
        orbitRef.current,
        [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }],
        1100,
        0,
        'cubic-bezier(.5,0,.2,1)'
      );
      runComet();
      ease(
        emblemRef.current?.querySelector('.elp-globe') ?? null,
        [{ opacity: 0, transform: 'scale(.82)' }, { opacity: 1, transform: 'scale(1)' }],
        700,
        450,
        'cubic-bezier(.2,.9,.2,1.15)'
      );
      later(burst, 1000);
      Array.from(lettersRef.current?.children ?? []).forEach((s, i) =>
        ease(
          s,
          [{ opacity: 0, transform: 'translateY(60%)' }, { opacity: 1, transform: 'translateY(0)' }],
          520,
          1150 + i * 60
        )
      );
      ease(ruleRef.current, [{ width: '0%' }, { width: '100%' }], 600, 1400);
      ease(subRef.current, [{ opacity: 0 }, { opacity: 1 }], 500, 1650);
      ease(glintRef.current, [{ left: '-45%' }, { left: '130%' }], 750, 1900, 'ease-in-out');
      later(() => {
        animDone = true;
        maybeFinish();
      }, PLAY_MS);
    }

    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(cometRaf);
      anims.forEach((a) => {
        try {
          a.cancel();
        } catch {}
      });
      window.removeEventListener('load', onLoad);
      window.removeEventListener('resize', size);
      html.style.overflow = prevOverflow;
    };
  }, []);

  if (gone) return null;

  return (
    <div
      ref={rootRef}
      className={`elp${leaving ? ' elp-out' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading ELSHALI LOGISTICS"
    >
      <canvas ref={canvasRef} className="elp-fx" aria-hidden="true" />
      <div className="elp-lockup">
        <div ref={emblemRef} className="elp-emblem" aria-hidden="true">
          <svg viewBox="0 0 200 200" overflow="visible">
            <defs>
              <linearGradient id="elp-rg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#8f0f33" />
                <stop offset="0.6" stopColor="#e01d4b" />
                <stop offset="1" stopColor="#ff6f8a" />
              </linearGradient>
              <radialGradient id="elp-gb" cx="0.35" cy="0.3" r="0.9">
                <stop offset="0" stopColor="var(--elp-silver-a,#f2f2f4)" />
                <stop offset="0.55" stopColor="#c9a0a8" />
                <stop offset="1" stopColor="#7a0e2c" />
              </radialGradient>
              <clipPath id="elp-gc">
                <circle cx="100" cy="100" r="58" />
              </clipPath>
            </defs>
            <g className="elp-globe">
              {logoSrc ? (
                <image
                  href={logoSrc}
                  x="30"
                  y="30"
                  width="140"
                  height="140"
                  preserveAspectRatio="xMidYMid meet"
                />
              ) : (
                <>
                  <circle cx="100" cy="100" r="58" fill="url(#elp-gb)" />
                  <g clipPath="url(#elp-gc)" fill="none" stroke="rgba(90,10,30,.45)" strokeWidth="1.4">
                    <ellipse cx="100" cy="100" rx="58" ry="22" />
                    <ellipse cx="100" cy="100" rx="22" ry="58" />
                    <ellipse cx="100" cy="100" rx="42" ry="58" />
                    <path d="M42 100h116M52 72h96M52 128h96" />
                  </g>
                  <circle cx="100" cy="100" r="58" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="1.5" />
                </>
              )}
            </g>
            <g transform="rotate(-14 100 100)">
              <path
                ref={orbitRef}
                className="elp-ring"
                pathLength={1}
                d="M26 122 C 46 158, 128 164, 172 118 C 196 90, 160 54, 100 54 C 56 54, 22 82, 26 122 Z"
              />
              <circle ref={cometRef} className="elp-comet" r="5" cx="26" cy="122" />
            </g>
          </svg>
        </div>
        <div className="elp-word">
          <div ref={lettersRef} className="elp-a">
            {'ELSHALI'.split('').map((c, i) => (
              <span key={i} className={i === 3 ? 'l' : undefined}>
                {c}
              </span>
            ))}
          </div>
          <div ref={subRef} className="elp-b">
            LOGISTICS &amp; TRANSPORT
          </div>
          <div ref={ruleRef} className="elp-rule" />
          <div ref={glintRef} className="elp-glint" />
        </div>
      </div>
    </div>
  );
}
