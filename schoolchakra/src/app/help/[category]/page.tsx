import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HELP_CATEGORIES, getCategoryMeta } from '../../../data/help-center';
import { buildPageMetadata } from '../../../seo/metadata';
import { HelpCategoryPage } from '../../../views/HelpCategoryPage';

interface PageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return HELP_CATEGORIES.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryMeta(slug);
  if (!category) {
    return buildPageMetadata({
      title: 'Guide Not Found — SchoolChakra Help Center',
      description: 'The requested Help Center guide could not be found.',
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: `${category.title} — SchoolChakra Help Center`,
    description: category.description,
    canonicalPath: `/help/${category.slug}`,
  });
}

export default async function Page({ params }: PageProps) {
  const { category: slug } = await params;
  const category = getCategoryMeta(slug);
  if (!category) {
    notFound();
  }

  return <HelpCategoryPage category={category} />;
}
