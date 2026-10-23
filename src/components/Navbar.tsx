'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { navLinks } from '@/data/site';
import { useQuote } from './QuoteProvider';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');
  const { openQuote } = useQuote();
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scrollspy with IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace('#', ''));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach((s) => observerRef.current?.observe(s));
    return () => observerRef.current?.disconnect();
  }, []);

  // Body lock
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // ESC key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) setMobileOpen(false);
    },
    [mobileOpen]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      window.location.assign(href.startsWith('/') ? href : `/${href}`);
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        role="navigation"
        aria-label="Main navigation"
        id="main-nav"
      >
        {/* Brand */}
        <a href="#hero" className="navbar-brand" onClick={() => handleNavClick('#hero')}>
          <div className="navbar-logo-tile">
            <Image
              src="/images/elsali-logo.webp"
              alt="ELSALI LOGISTICS Logo"
              width={44}
              height={44}
              priority
            />
          </div>
          <div className="navbar-brand-text">
            <div className="navbar-brand-name">
              ELSALI <span>LOGISTICS</span>
            </div>
          </div>
        </a>

        {/* Link capsule */}
        <div className="navbar-capsule">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={activeSection === link.href ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA + mobile toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            className="nav-cta nav-cta-desktop"
            onClick={() => openQuote()}
          >
            GET A QUOTE
          </button>
          <button
            className={`mobile-toggle ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <div className={`mobile-sheet ${mobileOpen ? 'open' : ''}`} role="dialog" aria-modal="true">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={activeSection === link.href ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(link.href);
            }}
          >
            {link.label}
          </a>
        ))}
        <button
          className="mobile-sheet-cta"
          onClick={() => {
            setMobileOpen(false);
            openQuote();
          }}
        >
          GET A QUOTE
        </button>
      </div>
    </>
  );
}
