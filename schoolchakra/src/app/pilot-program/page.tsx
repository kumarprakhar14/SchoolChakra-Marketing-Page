import type { Metadata } from 'next';
import { PilotProgramPage } from '../../views/PilotProgramPage';
import { buildPageMetadata } from '../../seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'SchoolChakra Pilot Program | Explore, Test & Grow Together',
  description:
    'Explore SchoolChakra during its active development through a completely free, voluntary pilot program for schools. Share feedback and opt out anytime.',
  canonicalPath: '/pilot-program',
});

export default function Page() {
  return <PilotProgramPage />;
}
