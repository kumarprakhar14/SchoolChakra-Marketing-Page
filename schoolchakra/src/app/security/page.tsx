import type { Metadata } from 'next';
import { SecurityPage } from '../../views/SecurityPage';
import { buildPageMetadata } from '../../seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Security & Data Ownership — SchoolChakra',
  description:
    'Learn how SchoolChakra enforces school-level data isolation, role-based access control, operational safeguards, and financial document integrity.',
  canonicalPath: '/security',
});

export default function Page() {
  return <SecurityPage />;
}
