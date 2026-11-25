import React from 'react';
import type { DemoSchool, DemoTheme } from '../types';
import { fmtCurrency } from '../mockData';

interface LiveFeeBadgeProps {
  school: DemoSchool;
  theme: DemoTheme;
}

export const LiveFeeBadge: React.FC<LiveFeeBadgeProps> = ({ school, theme }) => {
  const total = school.feesCollected + school.feesPending;
  const percentage = total > 0 ? ((school.feesCollected / total) * 100).toFixed(1) : '0.0';

  return (
    <div className="bg-white border border-gray-200 rounded-b-xl px-3 py-1 shadow-sm flex items-center gap-2 select-none">
      <span className="text-[10px] font-semibold text-gray-500 whitespace-nowrap">Live Fee Collection</span>
      <span className="text-xs font-black transition-colors" style={{ color: theme.primary }}>
        {fmtCurrency(school.feesCollected)}{' '}
        <span className="text-gray-400 font-semibold font-mono">({percentage}%)</span>
      </span>
    </div>
  );
};
