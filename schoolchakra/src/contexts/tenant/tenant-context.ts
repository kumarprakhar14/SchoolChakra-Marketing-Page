import { createContext, useContext } from 'react';
import type { SchoolTenant } from '../../types';

export interface TenantContextValue {
  selectedTenantId: string;
  currentTenant: SchoolTenant;
  setSelectedTenantId: (id: string) => void;
  handleTenantChange: (tenant: SchoolTenant) => void;
  availableTenants: SchoolTenant[];
}

export const TenantContext = createContext<TenantContextValue | undefined>(undefined);

export function useTenant(): TenantContextValue {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
}
