import React from 'react';

interface SectionProps {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function Section({
  id,
  className = '',
  containerClassName = '',
  children,
  style,
}: SectionProps) {
  return (
    <section id={id} className={`section section-dark ${className}`} style={style}>
      <div className={`subpage-container ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
}

