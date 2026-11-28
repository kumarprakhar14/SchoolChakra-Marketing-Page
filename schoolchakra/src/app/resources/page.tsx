import type { Metadata } from 'next';
import { ResourcesPage } from '../../views/ResourcesPage';
import { buildPageMetadata } from '../../seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Educational Resources & Guides — SchoolChakra',
  description:
    'Explore school administration topics, attendance and fee management guides, and practical resources for schools adopting digital workflows.',
  canonicalPath: '/resources',
});

export default function Page() {
  return <ResourcesPage />;
}
