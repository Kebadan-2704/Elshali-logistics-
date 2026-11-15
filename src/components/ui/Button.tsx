import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  variant?: 'primary' | 'outline' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
  style?: React.CSSProperties;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  children,
  external = false,
  style,
}: ButtonProps) {
  const variantClass = `btn-${variant}`;
  const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '';
  const classes = `btn ${variantClass} ${sizeClass} ${className}`;

  if (href) {
    if (external || href.startsWith('tel:') || href.startsWith('mailto:')) {
      return (
        <a
          href={href}
          onClick={onClick}
          className={classes}
          style={style}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} onClick={onClick} className={classes} style={style}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      style={style}
    >
      {children}
    </button>
  );
}

