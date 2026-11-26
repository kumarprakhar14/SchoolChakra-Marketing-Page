import React, { useState, useMemo } from 'react';
import type { DemoCanvasProps, DemoTabId } from './types';
import { SCHOOLS, THEMES, TABS } from './mockData';
import { MockupTopBar } from './components/MockupTopBar';
import { MockupSidebar } from './components/MockupSidebar';
import { MockupStatusBar } from './components/MockupStatusBar';
import { UpiToast } from './components/UpiToast';
import { DashboardView } from './views/DashboardView';
import { UsersView } from './views/UsersView';
import { ImportView } from './views/ImportView';
import { FeesView } from './views/FeesView';

export const DemoCanvas: React.FC<DemoCanvasProps> = ({
  defaultSchool = 'dpa',
  theme: controlledTheme,
  defaultTheme = 'blue',
  defaultTab = 'dashboard',
  activeTab: controlledTab,
  className = '',
  showInternalBadges = false,
  onSchoolChange,
  onThemeChange,
  onTabChange,
}) => {
  const [overrideSchoolId, setOverrideSchoolId] = useState<string | null>(null);
  const [overrideThemeId, setOverrideThemeId] = useState<string | null>(null);
  const [internalTab, setInternalTab] = useState<DemoTabId>(defaultTab);
  const activeTab = controlledTab ?? internalTab;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [toastVisible, setToastVisible] = useState<boolean>(true);
  const [cronVisible, setCronVisible] = useState<boolean>(true);

  const selectedSchoolId = overrideSchoolId ?? defaultSchool;
  const selectedThemeId = controlledTheme ?? overrideThemeId ?? defaultTheme;

  // Active School resolution
  const currentSchool = useMemo(() => {
    return (
      SCHOOLS.find((s) => s.id === selectedSchoolId || s.code === selectedSchoolId) || SCHOOLS[0]
    );
  }, [selectedSchoolId]);

  // Active Theme resolution
  const currentTheme = useMemo(() => {
    return (
      THEMES.find((t) => t.id === selectedThemeId || t.name.toLowerCase() === selectedThemeId.toLowerCase()) ||
      THEMES[0]
    );
  }, [selectedThemeId]);

  const handleSchoolSelect = (school: typeof SCHOOLS[number]) => {
    setOverrideSchoolId(school.id);
    onSchoolChange?.(school);
  };

  const handleThemeSelect = (theme: typeof THEMES[number]) => {
    setOverrideThemeId(theme.id);
    onThemeChange?.(theme);
  };

  const handleTabSelect = (tabId: DemoTabId) => {
    setInternalTab(tabId);
    setIsMobileMenuOpen(false);
    onTabChange?.(tabId);
  };

  const currentTabLabel = TABS.find((t) => t.id === activeTab)?.label;

  return (
    <div
      className={`relative w-full rounded-2xl sm:rounded-3xl border border-gray-200/90 bg-white shadow-[0_25px_60px_-15px_rgba(15,23,42,0.12)] overflow-hidden flex flex-col min-h-[580px] sm:min-h-[640px] text-slate-800 ${className}`}
    >
      {/* ═══ TOP BAR (Responsive Desktop & Mobile Menubar) ═══ */}
      <MockupTopBar
        currentSchool={currentSchool}
        currentTheme={currentTheme}
        schools={SCHOOLS}
        themes={THEMES}
        onSelectSchool={handleSchoolSelect}
        onSelectTheme={handleThemeSelect}
        showLiveFeeBadge={showInternalBadges}
        onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
        activeTabLabel={currentTabLabel}
      />

      {/* ═══ MAIN WORKSPACE (Sidebar + Content) ═══ */}
      <div className="flex flex-1 relative">
        {/* ═══ SIDEBAR (Desktop Fixed & Mobile Slide Drawer) ═══ */}
        <MockupSidebar
          school={currentSchool}
          theme={currentTheme}
          activeTab={activeTab}
          tabs={TABS}
          onSelectTab={handleTabSelect}
          isOpenMobile={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* ═══ CONTENT CANVAS ═══ */}
        <main className={`flex-1 min-w-0 bg-gray-50/80 relative flex flex-col ${cronVisible ? 'pb-14 sm:pb-12' : ''}`}>
          {/* Active Screen View */}
          <div key={`${activeTab}-${currentSchool.id}`} className="p-3 sm:p-5 lg:p-6 animate-fadeIn flex-1 min-w-0">
            {activeTab === 'dashboard' && (
              <DashboardView school={currentSchool} theme={currentTheme} />
            )}
            {activeTab === 'users' && (
              <UsersView school={currentSchool} theme={currentTheme} />
            )}
            {activeTab === 'import' && (
              <ImportView theme={currentTheme} />
            )}
            {activeTab === 'fees' && (
              <FeesView school={currentSchool} theme={currentTheme} />
            )}
          </div>

          {/* ═══ OPTIONAL INTERNAL TOP-RIGHT FLOATING TOAST ═══ */}
          {showInternalBadges && toastVisible && (
            <UpiToast onDismiss={() => setToastVisible(false)} />
          )}

          {/* ═══ BOTTOM STATUS BAR ═══ */}
          <MockupStatusBar
            cronVisible={cronVisible}
            onDismissCron={() => setCronVisible(false)}
          />
        </main>
      </div>
    </div>
  );
};

export default DemoCanvas;
