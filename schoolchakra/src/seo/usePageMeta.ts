import { useEffect } from 'react';

export interface PageMetaOptions {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: 'website' | 'article';
  structuredData?: Record<string, unknown> | null;
}

function upsertMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function usePageMeta({
  title,
  description,
  canonicalPath,
  ogType = 'website',
  structuredData = null,
}: PageMetaOptions) {
  useEffect(() => {
    document.title = title;
    const origin =
      typeof window !== 'undefined' && window.location.origin
        ? window.location.origin
        : 'https://schoolchakra.com';
    const canonicalUrl = `${origin}${canonicalPath === '/' ? '/' : canonicalPath}`;

    upsertMetaTag('name', 'description', description);
    upsertCanonical(canonicalUrl);

    upsertMetaTag('property', 'og:title', title);
    upsertMetaTag('property', 'og:description', description);
    upsertMetaTag('property', 'og:url', canonicalUrl);
    upsertMetaTag('property', 'og:type', ogType);
    upsertMetaTag('property', 'og:site_name', 'SchoolChakra');

    upsertMetaTag('name', 'twitter:card', 'summary_large_image');
    upsertMetaTag('name', 'twitter:title', title);
    upsertMetaTag('name', 'twitter:description', description);

    const scriptId = 'schoolchakra-structured-data';
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    if (structuredData) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    return () => {
      const activeScript = document.getElementById(scriptId);
      if (activeScript) {
        activeScript.remove();
      }
    };
  }, [title, description, canonicalPath, ogType, structuredData]);
}
