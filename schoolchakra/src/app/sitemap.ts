import type { MetadataRoute } from 'next';
import { SITE_URL } from '../seo/metadata';
import { ALL_HELP_ARTICLES, HELP_CATEGORIES } from '../data/help-center';

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
  const staticEntries: MetadataRoute.Sitemap = PUBLIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route === '/' ? '/' : route}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.8,
  }));

  const helpCategoryEntries: MetadataRoute.Sitemap = HELP_CATEGORIES.map((category) => ({
    url: `${SITE_URL}/help/${category.slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  const helpArticleEntries: MetadataRoute.Sitemap = ALL_HELP_ARTICLES.map((article) => ({
    url: `${SITE_URL}/help/${article.category}/${article.slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticEntries, ...helpCategoryEntries, ...helpArticleEntries];
}
