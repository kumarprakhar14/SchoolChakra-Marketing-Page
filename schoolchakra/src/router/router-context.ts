import { createContext, useContext } from 'react';

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

export const RouterContext = createContext<RouterContextValue | undefined>(undefined);

export function useRouter(): RouterContextValue {
  const ctx = useContext(RouterContext);
  if (!ctx) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return ctx;
}
