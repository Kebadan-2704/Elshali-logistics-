import { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/siteUrl';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();

  const routeConfig = [
    { path: '', changeFrequency: 'daily', priority: 1.0 },
    { path: '/services', changeFrequency: 'daily', priority: 0.9 },
    { path: '/vehicles', changeFrequency: 'daily', priority: 0.9 },
    { path: '/quote', changeFrequency: 'daily', priority: 0.9 },
    { path: '/contact', changeFrequency: 'daily', priority: 0.9 },
    { path: '/routes', changeFrequency: 'weekly', priority: 0.85 },
    { path: '/routes/coimbatore-to-chennai', changeFrequency: 'weekly', priority: 0.85 },
    { path: '/pan-india', changeFrequency: 'weekly', priority: 0.85 },
    { path: '/business-solutions', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/industrial', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/regular-transport', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.75 },
    { path: '/company', changeFrequency: 'monthly', priority: 0.75 },
    { path: '/why-choose-us', changeFrequency: 'monthly', priority: 0.75 },
    { path: '/process', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/documentation', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
  ] as const;

  return routeConfig.map((item) => ({
    url: `${baseUrl}${item.path}`,
    lastModified: new Date(),
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));
}
