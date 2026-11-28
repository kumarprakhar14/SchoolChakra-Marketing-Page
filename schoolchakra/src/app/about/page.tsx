import type { Metadata } from 'next';
import { AboutPage } from '../../views/AboutPage';
import { buildPageMetadata } from '../../seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'About SchoolChakra — Purpose & Approach',
  description:
    'Learn why SchoolChakra exists, our beliefs around clarity and connected school operations, and our practical approach to school management software.',
  canonicalPath: '/about',
});

export default function Page() {
  return <AboutPage />;
}
