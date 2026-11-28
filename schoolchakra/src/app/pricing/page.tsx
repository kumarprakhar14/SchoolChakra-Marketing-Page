import type { Metadata } from 'next';
import { PricingPage } from '../../views/PricingPage';
import { buildPageMetadata } from '../../seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Pricing & Founding Pilot — SchoolChakra School ERP',
  description:
    'Join the SchoolChakra Founding School Pilot — free of cost and cancellable anytime. Details for upcoming Free, Starter, Growth, and Enterprise plans are coming soon.',
  canonicalPath: '/pricing',
});

export default function Page() {
  return <PricingPage />;
}
