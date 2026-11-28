import type { Metadata } from 'next';
import { ChangelogPage } from '../../views/ChangelogPage';
import { buildPageMetadata } from '../../seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Changelog & Product Updates — SchoolChakra',
  description:
    'Follow verified SchoolChakra product improvements, new capabilities, and refinements.',
  canonicalPath: '/changelog',
});

export default function Page() {
  return <ChangelogPage />;
}
