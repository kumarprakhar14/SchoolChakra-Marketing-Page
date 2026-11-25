import { useMemo } from 'react';
import { useTenant } from '../contexts';
import type { TenantStats } from '../types';

/**
 * Returns the aggregated stats for the currently selected tenant and date range.
 */
export function useTenantStats(dateRange: string): TenantStats {
  const { currentTenant } = useTenant();

  return useMemo(() => {
    return currentTenant.stats[dateRange] ?? currentTenant.stats.Today;
  }, [currentTenant, dateRange]);
}
