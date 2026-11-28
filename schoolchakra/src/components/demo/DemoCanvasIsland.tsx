'use client';

import { useTheme } from '../../contexts';
import type { BrandThemeKey } from '../../types';
import { DemoCanvas } from '../demo-canvas';
import { useDemoWorkspace } from './demo-workspace-context';

export function DemoCanvasIsland() {
  const { activeThemeKey, setActiveThemeKey } = useTheme();
  const { canvasTab, setCanvasTab } = useDemoWorkspace();

  return (
    <DemoCanvas
      defaultSchool="dpa"
      theme={activeThemeKey}
      activeTab={canvasTab}
      onTabChange={setCanvasTab}
      onThemeChange={(th) => setActiveThemeKey(th.id as BrandThemeKey)}
    />
  );
}
