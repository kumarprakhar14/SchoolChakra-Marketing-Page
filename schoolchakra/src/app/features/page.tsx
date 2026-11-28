import type { Metadata } from 'next';
import { FeaturesPage } from '../../views/FeaturesPage';
import { buildPageMetadata } from '../../seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Features — SchoolChakra School Management Software',
  description:
    'Explore SchoolChakra capabilities across student and user management, attendance workflows, academic timetables, assignments, notices, UPI fee collection, and reporting.',
  canonicalPath: '/features',
});

export default function Page() {
  return <FeaturesPage />;
}
