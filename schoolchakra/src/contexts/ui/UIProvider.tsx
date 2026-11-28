'use client';

import { useState, type ReactNode } from 'react';
import type { ChecklistItem, SuperAdminFlags } from '../../types';
import { UIContext } from './ui-context';

const initialChecklistItems: ChecklistItem[] = [
  { id: 1, label: 'Configure Academic Classes & Sections', done: true },
  { id: 2, label: 'Import Students & Fee Ledger via CSV Wizard', done: true },
  { id: 3, label: 'Assign Subject Teachers & Period Slots', done: true },
  { id: 4, label: 'Set Brand Color & Upload School Logo', done: true },
  { id: 5, label: 'Broadcast Welcome Notice to Parents & Staff', done: false },
];

const initialSuperAdminFlags: SuperAdminFlags = {
  upiVerification: true,
  csvFeeWizard: true,
  autoFinalize48h: true,
  whatsappAlerts: false,
};

export function UIProvider({ children }: { children: ReactNode }) {
  const [heroDateRange, setHeroDateRange] = useState('Today');
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(initialChecklistItems);
  const [activeRole, setActiveRole] = useState('admin');
  const [upiProofStatus, setUpiProofStatus] = useState('pending');
  const [roleAttendanceState, setRoleAttendanceState] = useState('locked');
  const [superAdminFlags, setSuperAdminFlags] = useState<SuperAdminFlags>(initialSuperAdminFlags);
  const [bugStatus, setBugStatus] = useState('In Progress');
  const [csvStep, setCsvStep] = useState(4);
  const [ambiguitiesResolved, setAmbiguitiesResolved] = useState(false);
  const [invoiceStatus, setInvoiceStatus] = useState('PAID');
  const [bentoAttState, setBentoAttState] = useState('locked');
  const [presentCount, setPresentCount] = useState(38);
  const [selectedPeriodSlot, setSelectedPeriodSlot] = useState('P3-10A');
  const [conflictAttempt, setConflictAttempt] = useState(false);
  const [noticeAudiences, setNoticeAudiences] = useState<string[]>(['Students', 'Teachers']);
  const [noticeEdited, setNoticeEdited] = useState(true);
  const [isPilotModalOpen, setIsPilotModalOpen] = useState(false);
  const [pilotBoard, setPilotBoard] = useState('CBSE');
  const [pilotSize, setPilotSize] = useState('500–1,500');
  const [pilotLegacy, setPilotLegacy] = useState('Excel / Tally');
  const [pilotSchoolName, setPilotSchoolName] = useState('');
  const [pilotContactName, setPilotContactName] = useState('');
  const [pilotContact, setPilotContact] = useState('');
  const [pilotSubmitted, setPilotSubmitted] = useState(false);

  const completedChecklistCount = checklistItems.filter((i) => i.done).length;

  const toggleChecklist = (id: number) => {
    setChecklistItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const toggleAudience = (role: string) => {
    if (role === 'Everyone') {
      setNoticeAudiences(['Students', 'Teachers', 'Accounts']);
      return;
    }
    setNoticeAudiences((prev) => {
      const exists = prev.includes(role);
      const next = exists ? prev.filter((r) => r !== role) : [...prev, role];
      return next.length === 0 ? ['Students'] : next;
    });
    setNoticeEdited(true);
  };

  const openPilotModal = () => {
    setPilotSubmitted(false);
    setIsPilotModalOpen(true);
  };

  return (
    <UIContext.Provider
      value={{
        heroDateRange,
        setHeroDateRange,
        checklistItems,
        setChecklistItems,
        toggleChecklist,
        completedChecklistCount,
        activeRole,
        setActiveRole,
        upiProofStatus,
        setUpiProofStatus,
        roleAttendanceState,
        setRoleAttendanceState,
        superAdminFlags,
        setSuperAdminFlags,
        bugStatus,
        setBugStatus,
        csvStep,
        setCsvStep,
        ambiguitiesResolved,
        setAmbiguitiesResolved,
        invoiceStatus,
        setInvoiceStatus,
        bentoAttState,
        setBentoAttState,
        presentCount,
        setPresentCount,
        selectedPeriodSlot,
        setSelectedPeriodSlot,
        conflictAttempt,
        setConflictAttempt,
        noticeAudiences,
        setNoticeAudiences,
        toggleAudience,
        noticeEdited,
        setNoticeEdited,
        isPilotModalOpen,
        setIsPilotModalOpen,
        openPilotModal,
        pilotBoard,
        setPilotBoard,
        pilotSize,
        setPilotSize,
        pilotLegacy,
        setPilotLegacy,
        pilotSchoolName,
        setPilotSchoolName,
        pilotContactName,
        setPilotContactName,
        pilotContact,
        setPilotContact,
        pilotSubmitted,
        setPilotSubmitted,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}
