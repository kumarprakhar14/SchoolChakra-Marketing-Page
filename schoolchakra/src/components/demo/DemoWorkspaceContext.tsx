'use client';

import { useState, type ReactNode } from 'react';
import type { DemoTabId } from '../demo-canvas';
import {
  DemoWorkspaceContext,
  type ExploreRoleId,
} from './demo-workspace-context';

export function DemoWorkspaceProvider({ children }: { children: ReactNode }) {
  const [canvasTab, setCanvasTab] = useState<DemoTabId>('dashboard');
  const [selectedRolePreview, setSelectedRolePreview] = useState<ExploreRoleId>('admin');

  return (
    <DemoWorkspaceContext.Provider
      value={{
        canvasTab,
        setCanvasTab,
        selectedRolePreview,
        setSelectedRolePreview,
      }}
    >
      {children}
    </DemoWorkspaceContext.Provider>
  );
}
