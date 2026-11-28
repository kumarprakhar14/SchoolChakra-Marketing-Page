import type { Metadata } from 'next';
import { GettingStartedPage } from '../../views/GettingStartedPage';
import { buildPageMetadata } from '../../seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Getting Started & Onboarding — SchoolChakra',
  description:
    'Learn how schools transition from spreadsheets and manual registers to SchoolChakra through guided setup, CSV migration, and staff onboarding.',
  canonicalPath: '/getting-started',
});

export default function Page() {
  return <GettingStartedPage />;
}
