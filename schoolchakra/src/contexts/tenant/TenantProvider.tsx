import { useState, type ReactNode } from 'react';
import type { BrandThemeKey, SchoolTenant } from '../../types';
import { SCHOOL_TENANTS, getDefaultTenant } from '../../constants';
import { useTheme } from '../theme/theme-context';
import { TenantContext } from './tenant-context';

export function TenantProvider({ children }: { children: ReactNode }) {
  const [selectedTenantId, setSelectedTenantId] = useState<string>('dpa');
  const { setActiveThemeKey } = useTheme();

  const currentTenant = SCHOOL_TENANTS.find((t) => t.id === selectedTenantId) || getDefaultTenant();

  const handleTenantChange = (tenant: SchoolTenant) => {
    setSelectedTenantId(tenant.id);
    setActiveThemeKey(tenant.defaultTheme as BrandThemeKey);
  };

  return (
    <TenantContext.Provider
      value={{
        selectedTenantId,
        currentTenant,
        setSelectedTenantId,
        handleTenantChange,
        availableTenants: SCHOOL_TENANTS,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
}
