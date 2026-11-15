import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getSiteUrl, getCanonicalUrl } from '@/lib/siteUrl';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  // Generate JSON-LD BreadcrumbList Schema
  const breadcrumbListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: getSiteUrl(),
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        ...(item.href ? { item: getCanonicalUrl(item.href) } : {}),
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListJsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className={`subpage-container ${className}`}
        style={{ marginBottom: '24px', paddingTop: '16px' }}
      >
        <ol
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            listStyle: 'none',
            padding: 0,
            margin: 0,
            fontSize: '13px',
            color: '#94A3B8',
            flexWrap: 'wrap',
          }}
        >
          <li style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <Link href="/" style={{ color: '#94A3B8', textDecoration: 'none' }} className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight size={14} aria-hidden="true" style={{ color: '#94A3B8' }} />
          </li>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li
                key={index}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                aria-current={isLast ? 'page' : undefined}
              >
                {item.href && !isLast ? (
                  <>
                    <Link href={item.href} style={{ color: '#94A3B8', textDecoration: 'none' }} className="hover:text-white transition-colors">
                      {item.label}
                    </Link>
                    <ChevronRight size={14} aria-hidden="true" style={{ color: '#94A3B8' }} />
                  </>
                ) : (
                  <span style={{ color: '#EC4899', fontWeight: 600 }}>{item.label}</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
