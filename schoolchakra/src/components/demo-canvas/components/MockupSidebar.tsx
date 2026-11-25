import React from 'react';
import {
  LayoutDashboard,
  Users,
  Upload,
  IndianRupee,
  X,
} from 'lucide-react';
import type { DemoSchool, DemoTheme, DemoTab, DemoTabId } from '../types';

interface MockupSidebarProps {
  school: DemoSchool;
  theme: DemoTheme;
  activeTab: DemoTabId;
  tabs: DemoTab[];
  onSelectTab: (tabId: DemoTabId) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const MockupSidebar: React.FC<MockupSidebarProps> = ({
  school,
  theme,
  activeTab,
  tabs,
  onSelectTab,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const getTabIcon = (iconName: string) => {
    switch (iconName) {
      case 'chart':
        return <LayoutDashboard className="w-5 h-5" />;
      case 'users':
        return <Users className="w-5 h-5" />;
      case 'upload':
        return <Upload className="w-5 h-5" />;
      case 'dollar':
        return <IndianRupee className="w-5 h-5" />;
      default:
        return <LayoutDashboard className="w-5 h-5" />;
    }
  };

  const handleTabClick = (tabId: DemoTabId) => {
    onSelectTab(tabId);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const renderNavContent = (isMobile: boolean = false) => (
    <>
      {/* School Header */}
      <div
        className="h-14 flex items-center justify-between px-4 sm:px-5 border-b border-gray-100 transition-colors shrink-0"
        style={{
          background: `linear-gradient(to right, ${theme.bg}, transparent)`,
        }}
      >
        <div className="flex items-center min-w-0">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md shrink-0 transition-all"
            style={{
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.text})`,
            }}
          >
            {school.short}
          </div>
          <span className="ml-3 font-semibold text-gray-800 text-xs sm:text-sm tracking-tight truncate">
            {school.name}
          </span>
        </div>

        {/* Mobile Close Button */}
        {isMobile && onCloseMobile && (
          <button
            type="button"
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-black/5 transition-colors cursor-pointer ml-2"
            title="Close navigation"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabClick(tab.id)}
              className={`w-full flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 group relative overflow-hidden text-left cursor-pointer ${
                active
                  ? 'font-medium shadow-xs'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              }`}
              style={
                active
                  ? {
                      color: theme.text,
                      backgroundColor: theme.bg,
                    }
                  : undefined
              }
            >
              {/* Active Left Indicator Bar */}
              {active && (
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 rounded-r-md"
                  style={{ backgroundColor: theme.primary }}
                />
              )}

              {/* Icon */}
              <span
                className={`mr-3 transition-transform duration-300 ${
                  active ? 'scale-110' : 'group-hover:scale-110'
                }`}
                style={active ? { color: theme.primary } : undefined}
              >
                {getTabIcon(tab.icon)}
              </span>

              {/* Label */}
              <span className="relative z-10 text-xs sm:text-sm truncate">{tab.label}</span>

              {/* Badges */}
              {tab.id === 'fees' && (
                <span
                  className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-md shrink-0 transition-colors"
                  style={{
                    backgroundColor: theme.bg,
                    color: theme.text,
                  }}
                >
                  94.2%
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </>
  );

  return (
    <>
      {/* ═══ DESKTOP PERMANENT SIDEBAR (md and up) ═══ */}
      <aside className="hidden md:flex w-56 lg:w-60 bg-white/95 backdrop-blur-xl border-r border-gray-200/70 flex-col shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        {renderNavContent(false)}
      </aside>

      {/* ═══ MOBILE DRAWER OVERLAY (under md) ═══ */}
      {isOpenMobile && (
        <div className="md:hidden absolute inset-0 z-50 flex">
          {/* Backdrop Blur Overlay */}
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs animate-fadeIn transition-opacity"
            onClick={onCloseMobile}
          />

          {/* Slide-out Drawer */}
          <aside className="relative z-10 w-64 max-w-[80%] bg-white h-full shadow-2xl flex flex-col animate-slideIn border-r border-gray-200 overflow-y-auto">
            {renderNavContent(true)}
          </aside>
        </div>
      )}
    </>
  );
};
