'use client';

import { createContext, useContext } from 'react';
import type { DemoTabId } from '../demo-canvas';

export type ExploreRoleId = 'admin' | 'teacher' | 'student' | 'accounts';

export interface DemoWorkspaceContextValue {
  canvasTab: DemoTabId;
  setCanvasTab: (tab: DemoTabId) => void;
  selectedRolePreview: ExploreRoleId;
  setSelectedRolePreview: (role: ExploreRoleId) => void;
}

export const DemoWorkspaceContext = createContext<DemoWorkspaceContextValue | undefined>(
  undefined
);

export function useDemoWorkspace() {
  const ctx = useContext(DemoWorkspaceContext);
  if (!ctx) {
    throw new Error('useDemoWorkspace must be used within DemoWorkspaceProvider');
  }
  return ctx;
}
