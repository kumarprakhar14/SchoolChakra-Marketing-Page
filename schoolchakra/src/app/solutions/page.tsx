import type { Metadata } from 'next';
import { SolutionsPage } from '../../views/SolutionsPage';
import { buildPageMetadata } from '../../seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Solutions by School Role — SchoolChakra',
  description:
    'See how SchoolChakra serves School Administrators, Teachers, Students, and Accounts Teams with dedicated role-scoped workspaces.',
  canonicalPath: '/solutions',
});

export default function Page() {
  return <SolutionsPage />;
}
