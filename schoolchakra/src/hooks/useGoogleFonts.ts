import { useEffect } from 'react';

const GOOGLE_FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap';

/**
 * Injects the Google Fonts stylesheet used across the landing page and cleans it up on unmount.
 */
export function useGoogleFonts(href: string = GOOGLE_FONTS_URL) {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = href;
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [href]);
}
