'use client';

import { usePathname, useRouter as useNextRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export type AppRoute =
  | '/'
  | '/features'
  | '/solutions'
  | '/pricing'
  | '/security'
  | '/demo'
  | '/getting-started'
  | '/pilot-program'
  | '/about'
  | '/resources'
  | '/changelog'
  | '/help'
  | '/contact';

export interface RouterContextValue {
  pathname: string;
  hash: string;
  navigate: (to: string) => void;
  isActive: (path: string) => boolean;
}

function normalizePath(path: string): string {
  if (!path || path === '/') return '/';
  return path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;
}

function scrollToHash(hash: string) {
  if (!hash) return;
  const id = hash.startsWith('#') ? hash.slice(1) : hash;
  if (!id) return;

  const attemptScroll = (tries = 0) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (tries < 6) {
      requestAnimationFrame(() => attemptScroll(tries + 1));
    }
  };
  requestAnimationFrame(() => attemptScroll());
}

export function useRouter(): RouterContextValue {
  const rawPathname = usePathname() || '/';
  const pathname = normalizePath(rawPathname);
  const nextRouter = useNextRouter();
  const [hash, setHash] = useState('');

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash || '');
    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, [pathname]);

  const navigate = useCallback(
    (to: string) => {
      if (to.startsWith('#')) {
        window.history.pushState({}, '', `${pathname}${to}`);
        setHash(to);
        scrollToHash(to);
        return;
      }

      const [rawTargetPath, rawTargetHash] = to.split('#');
      const targetPath = normalizePath(rawTargetPath || '/');
      const targetHash = rawTargetHash ? `#${rawTargetHash}` : '';

      if (targetPath === pathname && targetHash) {
        window.history.pushState({}, '', `${pathname}${targetHash}`);
        setHash(targetHash);
        scrollToHash(targetHash);
        return;
      }

      nextRouter.push(to);
      if (targetHash) {
        setTimeout(() => scrollToHash(targetHash), 80);
      }
    },
    [nextRouter, pathname]
  );

  const isActive = useCallback(
    (path: string) => normalizePath(path) === pathname,
    [pathname]
  );

  return {
    pathname,
    hash,
    navigate,
    isActive,
  };
}
