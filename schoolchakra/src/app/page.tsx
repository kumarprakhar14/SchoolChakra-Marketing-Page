import type { Metadata } from 'next';
import { HomePage } from '../views/HomePage';
import {
  buildPageMetadata,
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  HOME_SOFTWARE_JSON_LD,
} from '../seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  canonicalPath: '/',
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(HOME_SOFTWARE_JSON_LD).replace(/</g, '\\u003c'),
        }}
      />
      <HomePage />
    </>
  );
}
