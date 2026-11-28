import type { Metadata } from 'next';
import { HelpPage } from '../../views/HelpPage';
import { buildPageMetadata } from '../../seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Help Center & User Guidance — SchoolChakra',
  description:
    'Practical guidance for getting started with SchoolChakra and using Administrator, Teacher, Student, and Accounts workspaces.',
  canonicalPath: '/help',
});

export default function Page() {
  return <HelpPage />;
}
