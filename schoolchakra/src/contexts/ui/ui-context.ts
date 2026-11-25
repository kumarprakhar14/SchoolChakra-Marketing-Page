import { createContext, useContext } from 'react';
import type { ChecklistItem, SuperAdminFlags } from '../../types';

export interface UIContextValue {
  heroDateRange: string;
  setHeroDateRange: (range: string) => void;
  checklistItems: ChecklistItem[];
  setChecklistItems: (items: ChecklistItem[] | ((prev: ChecklistItem[]) => ChecklistItem[])) => void;
  toggleChecklist: (id: number) => void;
  completedChecklistCount: number;
  activeRole: string;
  setActiveRole: (role: string) => void;
  upiProofStatus: string;
  setUpiProofStatus: (status: string) => void;
  roleAttendanceState: string;
  setRoleAttendanceState: (state: string) => void;
  superAdminFlags: SuperAdminFlags;
  setSuperAdminFlags: (flags: SuperAdminFlags | ((prev: SuperAdminFlags) => SuperAdminFlags)) => void;
  bugStatus: string;
  setBugStatus: (status: string) => void;
  csvStep: number;
  setCsvStep: (step: number) => void;
  ambiguitiesResolved: boolean;
  setAmbiguitiesResolved: (resolved: boolean) => void;
  invoiceStatus: string;
  setInvoiceStatus: (status: string) => void;
  bentoAttState: string;
  setBentoAttState: (state: string) => void;
  presentCount: number;
  setPresentCount: (count: number) => void;
  selectedPeriodSlot: string;
  setSelectedPeriodSlot: (slot: string) => void;
  conflictAttempt: boolean;
  setConflictAttempt: (attempt: boolean) => void;
  noticeAudiences: string[];
  setNoticeAudiences: (audiences: string[] | ((prev: string[]) => string[])) => void;
  toggleAudience: (role: string) => void;
  noticeEdited: boolean;
  setNoticeEdited: (edited: boolean) => void;
  isPilotModalOpen: boolean;
  setIsPilotModalOpen: (open: boolean) => void;
  openPilotModal: () => void;
  pilotBoard: string;
  setPilotBoard: (board: string) => void;
  pilotSize: string;
  setPilotSize: (size: string) => void;
  pilotLegacy: string;
  setPilotLegacy: (legacy: string) => void;
  pilotSchoolName: string;
  setPilotSchoolName: (name: string) => void;
  pilotContactName: string;
  setPilotContactName: (name: string) => void;
  pilotContact: string;
  setPilotContact: (contact: string) => void;
  pilotSubmitted: boolean;
  setPilotSubmitted: (submitted: boolean) => void;
}

export const UIContext = createContext<UIContextValue | undefined>(undefined);

export function useUI(): UIContextValue {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}
