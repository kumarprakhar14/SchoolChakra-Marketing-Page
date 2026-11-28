import type { Metadata } from 'next';
import { ContactPage } from '../../views/ContactPage';
import { buildPageMetadata } from '../../seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact Us — SchoolChakra',
  description:
    'Get in touch with SchoolChakra for a product demonstration, pricing guidance, data migration questions, or Founding Pilot enquiries.',
  canonicalPath: '/contact',
});

export default function Page() {
  return <ContactPage />;
}
