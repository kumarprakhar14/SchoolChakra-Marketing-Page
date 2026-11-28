'use client';

import type { ReactNode } from 'react';
import { ThemeProvider, TenantProvider, UIProvider } from '../../contexts';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <TenantProvider>
        <UIProvider>{children}</UIProvider>
      </TenantProvider>
    </ThemeProvider>
  );
}
