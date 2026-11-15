'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { navLinks, siteConfig } from '@/data/site';
import { useQuote } from './QuoteProvider';

export default function Navbar() {
  const pathname = usePathname();
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

  // Scrollspy with IntersectionObserver (only on homepage)
  useEffect(() => {
    if (pathname !== '/') return;

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
  }, [pathname]);

  // Body lock when mobile menu is open
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

  // ESC key closes mobile menu
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

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    setMobileOpen(false);
    if (pathname === '/') {
      e.preventDefault();
      const targetHash = href.startsWith('/') ? href.slice(1) : href;
      const el = document.querySelector(targetHash);
      if (el) {
        const rect = el.getBoundingClientRect();
        const offsetTop = window.scrollY + rect.top - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        window.history.pushState(null, '', targetHash);
      }
    }
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
        <Link
          href="/#hero"
          className="navbar-brand"
          onClick={(e) => handleNavClick('#hero', e)}
          aria-label={`${siteConfig.name} Home`}
        >
          <div className="navbar-logo-tile">
            <Image
              src="/images/elshali-logo.webp"
              alt={`${siteConfig.name} Official Logo`}
              width={44}
              height={44}
              priority
            />
          </div>
          <div className="navbar-brand-text">
            <div className="navbar-brand-name">
              ELSHALI <span>LOGISTICS</span>
            </div>
          </div>
        </Link>

        {/* Link capsule */}
        <div className="navbar-capsule">
          {navLinks.map((link) => {
            const targetHref = `/${link.href}`;
            const isActive = pathname === '/' && activeSection === link.href;
            return (
              <Link
                key={link.href}
                href={targetHref}
                className={isActive ? 'active' : ''}
                onClick={(e) => handleNavClick(link.href, e)}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* CTA + mobile toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            className="nav-cta nav-cta-desktop"
            onClick={() => openQuote()}
            type="button"
          >
            GET A QUOTE
          </button>
          <button
            className={`mobile-toggle ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            type="button"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <div
        className={`mobile-sheet ${mobileOpen ? 'open' : ''}`}
        data-lenis-prevent="true"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={`/${link.href}`}
            className={pathname === '/' && activeSection === link.href ? 'active' : ''}
            onClick={(e) => handleNavClick(link.href, e)}
          >
            {link.label}
          </Link>
        ))}
        <button
          className="mobile-sheet-cta"
          onClick={() => {
            setMobileOpen(false);
            openQuote();
          }}
          type="button"
        >
          GET A QUOTE
        </button>
      </div>
    </>
  );
}
