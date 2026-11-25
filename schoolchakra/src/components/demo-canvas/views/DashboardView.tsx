import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import type { DemoSchool, DemoTheme, DemoChecklistItem } from '../types';
import { INITIAL_CHECKLIST, fmtCurrency } from '../mockData';

interface DashboardViewProps {
  school: DemoSchool;
  theme: DemoTheme;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ school, theme }) => {
  const [dateRange, setDateRange] = useState<'Today' | 'This Week' | 'This Month'>('Today');
  const [checklist, setChecklist] = useState<DemoChecklistItem[]>(INITIAL_CHECKLIST);
  const [barsLoaded, setBarsLoaded] = useState(false);

  // Trigger smooth bar entrance animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setBarsLoaded(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const rates = [97, 95, 96, 94, 98, 92];

  const toggleChecklist = (id: number) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const doneCount = checklist.filter((c) => c.done).length;
  const totalFees = school.feesCollected + school.feesPending;
  const feePercentage =
    totalFees > 0 ? ((school.feesCollected / totalFees) * 100).toFixed(1) : '0.0';

  return (
    <div className="max-w-5xl mx-auto space-y-4 sm:space-y-5">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2.5 sm:gap-2">
        <div>
          <h1 className="text-base sm:text-xl font-black text-gray-900 tracking-tight">
            School Admin Operational Dashboard
          </h1>
          <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">
            <span className="font-mono text-gray-500 font-semibold">RBAC: SCHOOL_ADMIN</span> ·
            Real-time attendance & fee status
          </p>
        </div>
        <div className="grid grid-cols-3 sm:flex gap-1 bg-white border border-gray-200 rounded-lg p-0.5 shadow-2xs w-full sm:w-auto">
          {(['Today', 'This Week', 'This Month'] as const).map((range) => {
            const isSelected = dateRange === range;
            return (
              <button
                key={range}
                type="button"
                onClick={() => setDateRange(range)}
                className={`px-2 sm:px-3 py-1.5 text-[11px] sm:text-xs font-bold rounded-md transition-all cursor-pointer text-center ${
                  isSelected ? 'shadow-2xs' : 'text-gray-500 hover:bg-gray-50 font-medium'
                }`}
                style={
                  isSelected
                    ? {
                        backgroundColor: theme.bg,
                        color: theme.text,
                      }
                    : undefined
                }
              >
                {range}
              </button>
            );
          })}
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {/* Total Enrolled */}
        <div className="bg-white p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
          <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 font-bold">
            Total Enrolled
          </span>
          <div className="mt-1 sm:mt-1.5 text-xl sm:text-2xl font-black text-slate-900 font-mono">
            {school.students.toLocaleString()}
          </div>
          <div
            className="text-xs font-semibold mt-1 transition-colors truncate"
            style={{ color: theme.primary }}
          >
            100% ERP Assigned
          </div>
        </div>

        {/* Attendance Rate */}
        <div className="bg-white p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
          <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 font-bold">
            Attendance Rate
          </span>
          <div className="mt-1 sm:mt-1.5 text-xl sm:text-2xl font-black text-slate-900 font-mono">
            {school.attendance}%
          </div>
          <div className="text-xs font-semibold text-amber-700 mt-1 truncate">
            14 students &lt;75% alert
          </div>
        </div>

        {/* Fee Collection */}
        <div className="bg-white p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
          <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 font-bold">
            Fee Collection
          </span>
          <div className="mt-1 sm:mt-1.5 text-xl sm:text-2xl font-black text-slate-900 font-mono">
            {fmtCurrency(school.feesCollected)}
          </div>
          <div
            className="text-xs font-semibold mt-1 transition-colors truncate"
            style={{ color: theme.primary }}
          >
            {feePercentage}% collected
          </div>
        </div>

        {/* Targeted Notices */}
        <div className="bg-white p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
          <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 font-bold">
            Targeted Notices
          </span>
          <div className="mt-1 sm:mt-1.5 text-xl sm:text-2xl font-black text-slate-900 font-mono">12</div>
          <div className="text-xs font-semibold text-slate-500 mt-1 truncate">
            Instant push delivery
          </div>
        </div>
      </div>

      {/* Middle Row: Chart (3 cols) + Checklist (2 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {/* Attendance & Fee Mode Distribution Chart */}
        <div className="lg:col-span-3 bg-white p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap justify-between items-start gap-2 mb-3 sm:mb-4">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Attendance Distribution
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                  Filtered by: {dateRange} • All Classes (I to XII)
                </p>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span
                  className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-md transition-colors"
                  style={{ backgroundColor: theme.bg, color: theme.text }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: theme.primary }}
                  />{' '}
                  ReportEngine
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  DTD
                </span>
              </div>
            </div>

            {/* Bars container */}
            <div className="flex items-end justify-between gap-2 sm:gap-3.5 h-32 sm:h-36 px-1 sm:px-2 pt-2">
              {days.map((day, i) => {
                const targetPct = rates[i];
                const isHighlight = i === 4;
                return (
                  <div key={day} className="flex-1 flex flex-col items-center gap-1 sm:gap-1.5 group">
                    <span className="text-[11px] sm:text-xs font-bold text-slate-600 font-mono">
                      {targetPct}%
                    </span>
                    <div className="w-full bg-slate-100/90 rounded-lg h-20 sm:h-24 flex items-end overflow-hidden p-0.5">
                      <div
                        className="w-full rounded-md bar-animate transition-all duration-300"
                        style={{
                          height: barsLoaded ? `${targetPct}%` : '0%',
                          background: isHighlight
                            ? theme.primary
                            : `linear-gradient(to top, ${theme.primary}CC, ${theme.primary}77)`,
                          boxShadow: isHighlight ? `0 2px 8px -2px ${theme.primary}80` : undefined,
                          minHeight: '6px',
                        }}
                      />
                    </div>
                    <span className="text-[11px] sm:text-xs font-bold text-slate-500">{day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center mt-3 sm:mt-4 pt-3 border-t border-slate-100 gap-2">
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500">
              Best-Attending & Defaulters Table Ready
            </span>
            <span
              className="text-[11px] sm:text-xs font-bold font-mono transition-colors"
              style={{ color: theme.text }}
            >
              UPI Verified: 72%
            </span>
          </div>
        </div>

        {/* First-Run Setup Checklist */}
        <div className="lg:col-span-2 bg-white p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                Setup Checklist
              </h3>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-md transition-colors"
                style={{ backgroundColor: theme.bg, color: theme.text }}
              >
                {doneCount}/{checklist.length} Done
              </span>
            </div>

            <div className="space-y-2">
              {checklist.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleChecklist(item.id)}
                  className="w-full text-left flex items-start gap-2.5 group cursor-pointer p-1.5 rounded-lg hover:bg-slate-50 active:bg-slate-100 transition-colors"
                >
                  <div
                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                      item.done ? 'shadow-2xs' : 'border border-slate-300 bg-white group-hover:border-slate-400'
                    }`}
                    style={
                      item.done
                        ? {
                            backgroundColor: theme.bg,
                            color: theme.primary,
                            border: `1px solid ${theme.border}`,
                          }
                        : undefined
                    }
                  >
                    {item.done && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span
                    className={`text-xs leading-snug transition-colors ${
                      item.done
                        ? 'font-semibold line-through'
                        : 'font-medium text-slate-700 group-hover:text-slate-900'
                    }`}
                    style={item.done ? { color: theme.text } : undefined}
                  >
                    {item.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mt-3 sm:mt-4 pt-3 border-t border-slate-100">
            <span className="text-[11px] sm:text-xs text-slate-500 font-semibold">
              Tap any task to test state
            </span>
            <span
              className="text-[11px] sm:text-xs font-bold font-mono transition-colors"
              style={{ color: theme.text }}
            >
              Day-1 Ready
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
