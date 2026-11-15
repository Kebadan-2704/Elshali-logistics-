import React from 'react';

interface PageHeroProps {
  badge?: string;
  badgeIcon?: React.ReactNode;
  title: string;
  highlight?: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function PageHero({
  badge,
  badgeIcon,
  title,
  highlight,
  subtitle,
  className = '',
  children,
}: PageHeroProps) {
  return (
    <section className={`page-hero ${className}`}>
      <div className="page-hero-glow" aria-hidden="true" />
      {badge && (
        <div className="section-badge">
          {badgeIcon}
          <span>{badge}</span>
        </div>
      )}
      <h1 className="page-hero-title">
        {title}{' '}
        {highlight && <span className="highlight">{highlight}</span>}
      </h1>
      {subtitle && <p className="page-hero-subtitle">{subtitle}</p>}
      {children}
    </section>
  );
}

