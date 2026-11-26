import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { RouterContext } from './router-context';

function normalizePath(path: string): string {
  if (!path || path === '/') return '/';
  return path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;
}

function parseDestination(to: string): { path: string; hash: string } {
  if (to.startsWith('#')) {
    return {
      path: normalizePath(window.location.pathname),
      hash: to,
    };
  }
  const [rawPath, rawHash] = to.split('#');
  return {
    path: normalizePath(rawPath || '/'),
    hash: rawHash ? `#${rawHash}` : '',
  };
}

function scrollToHashOrTop(hash: string) {
  if (hash) {
    const id = hash.slice(1);
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
  } else {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [pathname, setPathname] = useState<string>(() =>
    typeof window !== 'undefined' ? normalizePath(window.location.pathname) : '/'
  );
  const [hash, setHash] = useState<string>(() =>
    typeof window !== 'undefined' ? window.location.hash : ''
  );

  useEffect(() => {
    const handlePopState = () => {
      const nextPath = normalizePath(window.location.pathname);
      const nextHash = window.location.hash;
      setPathname(nextPath);
      setHash(nextHash);
      scrollToHashOrTop(nextHash);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      scrollToHashOrTop(window.location.hash);
    }
  }, []);

  const navigate = useCallback(
    (to: string) => {
      const { path, hash: nextHash } = parseDestination(to);
      const targetUrl = `${path}${nextHash}`;
      const currentUrl = `${pathname}${hash}`;

      if (targetUrl !== currentUrl) {
        window.history.pushState({}, '', targetUrl);
        setPathname(path);
        setHash(nextHash);
      }

      scrollToHashOrTop(nextHash);
    },
    [pathname, hash]
  );

  const isActive = useCallback(
    (path: string) => normalizePath(path) === pathname,
    [pathname]
  );

  return (
    <RouterContext.Provider value={{ pathname, hash, navigate, isActive }}>
      {children}
    </RouterContext.Provider>
  );
}
