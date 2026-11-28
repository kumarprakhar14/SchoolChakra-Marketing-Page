import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  ALL_HELP_ARTICLES,
  getArticle,
  getCategoryMeta,
} from '../../../../data/help-center';
import { buildPageMetadata } from '../../../../seo/metadata';
import { HelpArticlePage } from '../../../../views/HelpArticlePage';

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

export function generateStaticParams() {
  return ALL_HELP_ARTICLES.map((article) => ({
    category: article.category,
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const article = getArticle(category, slug);
  const categoryMeta = getCategoryMeta(category);

  if (!article || !categoryMeta) {
    return buildPageMetadata({
      title: 'Article Not Found — SchoolChakra Help Center',
      description: 'The requested Help Center article could not be found.',
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: `${article.title} — ${categoryMeta.title} | SchoolChakra`,
    description: article.summary,
    canonicalPath: `/help/${article.category}/${article.slug}`,
    ogType: 'article',
  });
}

export default async function Page({ params }: PageProps) {
  const { category, slug } = await params;
  const article = getArticle(category, slug);
  if (!article) {
    notFound();
  }

  return <HelpArticlePage article={article} />;
}
