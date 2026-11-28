import type { Metadata } from 'next';
import { NotFoundPage } from '../views/NotFoundPage';
import { buildPageMetadata } from '../seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Page Not Found — SchoolChakra',
  description: 'The requested page could not be found on SchoolChakra.',
  noIndex: true,
});

export default function NotFound() {
  return <NotFoundPage />;
}
