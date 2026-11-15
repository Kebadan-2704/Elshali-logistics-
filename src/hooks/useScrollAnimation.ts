'use client';

import { useEffect, useRef } from 'react';

/**
 * Universal scroll-triggered reveal animation hook.
 * Attaches an IntersectionObserver to child elements matching selector,
 * adding the 'visible' CSS class when scrolled into view.
 */
export function useScrollAnimation<T extends HTMLElement = HTMLElement>(
  selector = '.reveal, .animate-fade-up',
  threshold = 0.1
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const elements = el.querySelectorAll(selector);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [selector, threshold]);

  return ref;
}
