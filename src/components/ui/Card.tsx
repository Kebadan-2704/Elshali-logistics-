import React from 'react';

interface CardProps {
  variant?: 'glass' | 'gradient' | 'outline';
  hoverLift?: boolean;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function Card({
  variant = 'glass',
  hoverLift = true,
  className = '',
  children,
  style,
}: CardProps) {
  const variantClass =
    variant === 'gradient'
      ? 'card-pink'
      : variant === 'outline'
      ? 'border border-white/10 bg-transparent'
      : 'glass-card-premium';

  return (
    <div
      className={`${variantClass} ${hoverLift ? 'hover-lift' : ''} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

