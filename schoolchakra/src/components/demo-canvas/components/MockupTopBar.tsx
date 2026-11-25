import React from 'react';
import { Menu } from 'lucide-react';
import type { DemoSchool, DemoTheme } from '../types';
import { LiveFeeBadge } from './LiveFeeBadge';

interface MockupTopBarProps {
  currentSchool: DemoSchool;
  currentTheme: DemoTheme;
  schools: DemoSchool[];
  themes: DemoTheme[];
  onSelectSchool: (school: DemoSchool) => void;
  onSelectTheme: (theme: DemoTheme) => void;
  showLiveFeeBadge?: boolean;
  onToggleMobileMenu?: () => void;
  activeTabLabel?: string;
}

export const MockupTopBar: React.FC<MockupTopBarProps> = ({
  currentSchool,
  currentTheme,
  schools,
  themes,
  onSelectSchool,
  onSelectTheme,
  showLiveFeeBadge = false,
  onToggleMobileMenu,
  activeTabLabel,
}) => {
  return (
    <header className="bg-white border-b border-gray-200 px-3 sm:px-4 py-2 shrink-0 z-30 relative select-none">
      {/* ═══ MOBILE TOP MENUBAR (< md) ═══ */}
      <div className="flex md:hidden items-center justify-between gap-2 pb-2">
        {/* Left: Hamburger menu toggle + Active screen branding */}
        <div className="flex items-center gap-2 min-w-0">
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="p-1.5 -ml-1 rounded-lg text-slate-700 hover:bg-slate-100 active:bg-slate-200 transition-colors cursor-pointer shrink-0"
            title="Open navigation menu"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 min-w-0">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center text-white font-bold text-[11px] shadow-xs shrink-0"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.text})`,
              }}
            >
              {currentSchool.short}
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-gray-900 truncate block">
                {activeTabLabel || currentSchool.name}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Mobile Dynamic Theme Dots in a neat pill container */}
        <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200/90 rounded-full px-2 py-1 shadow-2xs shrink-0">
          {themes.map((th) => {
            const isSelected = th.id === currentTheme.id;
            return (
              <button
                key={th.id}
                type="button"
                onClick={() => onSelectTheme(th)}
                className={`w-3.5 h-3.5 rounded-full transition-all cursor-pointer ${
                  isSelected
                    ? 'scale-125 ring-2 ring-offset-1 ring-slate-400'
                    : 'opacity-65 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: th.dot,
                }}
                title={`Set Theme: ${th.name}`}
              />
            );
          })}
        </div>
      </div>

      {/* ═══ MOBILE TENANT SWITCHER CHIPS ROW (< md) ═══ */}
      <div className="flex md:hidden items-center gap-1.5 overflow-x-auto pt-1.5 pb-0.5 border-t border-gray-100 custom-scrollbar">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider shrink-0 mr-0.5">
          Tenant:
        </span>
        {schools.map((school) => {
          const isSelected = school.id === currentSchool.id;
          return (
            <button
              key={school.id}
              type="button"
              onClick={() => onSelectSchool(school)}
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-bold transition-all shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-gray-900 text-white shadow-2xs'
                  : 'text-gray-500 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <span
                className="w-1.5 h-1.5 rounded-full inline-block shrink-0"
                style={{ backgroundColor: school.dot }}
              />
              <span className="truncate">{school.name}</span>
            </button>
          );
        })}
      </div>

      {/* ═══ DESKTOP TOP BAR (md and up) ═══ */}
      <div className="hidden md:flex items-center justify-between gap-3">
        {/* Optional Hanging Live Fee Badge */}
        {showLiveFeeBadge && (
          <div className="absolute -top-0 left-3 z-50">
            <LiveFeeBadge school={currentSchool} theme={currentTheme} />
          </div>
        )}

        {/* Multi-Tenancy School Switcher */}
        <div
          className={`flex items-center gap-1.5 lg:gap-2 overflow-x-auto py-0.5 custom-scrollbar ${
            showLiveFeeBadge ? 'ml-44' : ''
          }`}
        >
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-1 shrink-0">
            Switch School Tenant:
          </span>
          {schools.map((school) => {
            const isSelected = school.id === currentSchool.id;
            return (
              <button
                key={school.id}
                type="button"
                onClick={() => onSelectSchool(school)}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full inline-block shrink-0"
                  style={{ backgroundColor: school.dot }}
                />
                <span className="truncate">{school.name}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Color Theme Switcher - Sleek Small Pill */}
        <div className="flex items-center gap-2 shrink-0 ml-auto">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-0.5 hidden lg:inline">
            Dynamic School Theme:
          </span>
          <div className="flex items-center gap-1.5 bg-slate-100/90 border border-slate-200/80 rounded-full px-2.5 py-1 shadow-2xs">
            {themes.map((th) => {
              const isSelected = th.id === currentTheme.id;
              return (
                <button
                  key={th.id}
                  type="button"
                  onClick={() => onSelectTheme(th)}
                  className={`w-4 h-4 rounded-full transition-transform cursor-pointer shrink-0 ${
                    isSelected
                      ? 'scale-125 ring-2 ring-offset-1 ring-slate-400 shadow-xs'
                      : 'opacity-65 hover:opacity-100 hover:scale-110'
                  }`}
                  style={{
                    backgroundColor: th.dot,
                  }}
                  title={`Set Theme: ${th.name}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
