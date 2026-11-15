'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { useQuote } from './QuoteProvider';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const { isOpen } = useQuote();

  // 1. Initialize Lenis on desktop pointer devices
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.5,
      infinite: false,
    });
    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // 2. Hash scroll handling across route transitions & on-page links with 80px navbar offset
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;

      setTimeout(() => {
        try {
          const el = document.querySelector(hash);
          if (el) {
            if (lenisRef.current) {
              lenisRef.current.scrollTo(el as HTMLElement, { offset: -80, duration: 0.9 });
            } else {
              const rect = el.getBoundingClientRect();
              const offsetTop = window.scrollY + rect.top - 80;
              window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
          }
        } catch {
          // ignore invalid selectors
        }
      }, 150);
    };

    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, [pathname]);

  // 3. Lock scroll when modal is open
  useEffect(() => {
    if (!lenisRef.current) return;
    if (isOpen) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [isOpen]);

  return <>{children}</>;
}
