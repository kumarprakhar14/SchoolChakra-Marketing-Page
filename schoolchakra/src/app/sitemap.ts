import type { MetadataRoute } from 'next';
import { SITE_URL } from '../seo/metadata';

const LAST_MODIFIED = new Date('2026-11-28T00:00:00.000Z');

const PUBLIC_ROUTES = [
  '/',
  '/features',
  '/solutions',
  '/pricing',
  '/security',
  '/demo',
  '/getting-started',
  '/pilot-program',
  '/contact',
  '/about',
  '/resources',
  '/changelog',
  '/help',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route === '/' ? '/' : route}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.8,
  }));
}
