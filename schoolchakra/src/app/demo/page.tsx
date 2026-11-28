import type { Metadata } from 'next';
import { DemoPage } from '../../views/DemoPage';
import { buildPageMetadata } from '../../seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Interactive Demo — SchoolChakra',
  description:
    'Explore the interactive SchoolChakra workspace preview across schools, brand themes, operational overview, users, CSV import, and fee ledger.',
  canonicalPath: '/demo',
});

export default function Page() {
  return <DemoPage />;
}
