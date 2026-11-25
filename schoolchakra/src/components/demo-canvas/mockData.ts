import type {
  DemoSchool,
  DemoTheme,
  DemoTab,
  DemoUser,
  DemoChecklistItem,
  DemoFeeRecord,
  FeeStatus,
  UserRole,
} from './types';

export const SCHOOLS: DemoSchool[] = [
  {
    id: 'dpa',
    name: 'Delhi Public Academy',
    short: 'DP',
    board: 'CBSE • New Delhi',
    code: 'SCH-DPA-01',
    dot: '#10b981',
    students: 2480,
    teachers: 86,
    classes: 24,
    attendance: 96.4,
    feesCollected: 4280000,
    feesPending: 180000,
  },
  {
    id: 'stx',
    name: "St. Xavier's High School",
    short: 'SX',
    board: 'ICSE • Mumbai',
    code: 'SCH-STX-02',
    dot: '#f59e0b',
    students: 1820,
    teachers: 64,
    classes: 18,
    attendance: 94.1,
    feesCollected: 3150000,
    feesPending: 420000,
  },
  {
    id: 'lvi',
    name: 'Lotus Valley International',
    short: 'LV',
    board: 'IB • Gurugram',
    code: 'SCH-LVI-03',
    dot: '#8b5cf6',
    students: 960,
    teachers: 42,
    classes: 12,
    attendance: 97.8,
    feesCollected: 5600000,
    feesPending: 95000,
  },
];

export const THEMES: DemoTheme[] = [
  {
    id: 'blue',
    name: 'Cobalt Blue',
    primary: '#2563eb',
    bg: '#eff6ff',
    light: '#dbeafe',
    border: '#bfdbfe',
    text: '#1e40af',
    ring: '#93c5fd',
    dot: '#2563eb',
    sidebar: 'from-blue-600 to-indigo-600',
    btnGrad: 'from-blue-600 to-indigo-600',
  },
  {
    id: 'emerald',
    name: 'Emerald Green',
    primary: '#059669',
    bg: '#ecfdf5',
    light: '#d1fae5',
    border: '#a7f3d0',
    text: '#065f46',
    ring: '#6ee7b7',
    dot: '#059669',
    sidebar: 'from-emerald-600 to-teal-600',
    btnGrad: 'from-emerald-600 to-teal-600',
  },
  {
    id: 'violet',
    name: 'Royal Violet',
    primary: '#7c3aed',
    bg: '#f5f3ff',
    light: '#ede9fe',
    border: '#ddd6fe',
    text: '#5b21b6',
    ring: '#c4b5fd',
    dot: '#7c3aed',
    sidebar: 'from-violet-600 to-purple-600',
    btnGrad: 'from-violet-600 to-purple-600',
  },
  {
    id: 'crimson',
    name: 'Heritage Crimson',
    primary: '#e11d48',
    bg: '#fff1f2',
    light: '#ffe4e6',
    border: '#fecdd3',
    text: '#9f1239',
    ring: '#fda4af',
    dot: '#e11d48',
    sidebar: 'from-rose-600 to-pink-600',
    btnGrad: 'from-rose-600 to-pink-600',
  },
];

export const TABS: DemoTab[] = [
  { id: 'dashboard', label: 'Operational Overview', icon: 'chart' },
  { id: 'users', label: 'Users', icon: 'users' },
  { id: 'import', label: 'Data Import', icon: 'upload' },
  { id: 'fees', label: 'Fee & UPI Ledger', icon: 'dollar' },
];

export const INITIAL_CHECKLIST: DemoChecklistItem[] = [
  { id: 1, title: 'Configure Academic Classes & Sections', done: true },
  { id: 2, title: 'Import Students & Fee Ledger via CSV Wizard', done: true },
  { id: 3, title: 'Assign Subject Teachers & Period Slots', done: true },
  { id: 4, title: 'Set Brand Color & Upload School Logo', done: true },
  { id: 5, title: 'Broadcast Welcome Notice to Parents & Staff', done: false },
];

export const INITIAL_USERS: DemoUser[] = [
  { id: 'u1', name: 'Rajesh Kumar', erpId: 'ERP-TCH-001', role: 'ADMIN', details: 'Primary Administrator', isPrimary: true, active: true },
  { id: 'u2', name: 'Priya Sharma', erpId: 'ERP-TCH-002', role: 'TEACHER', details: 'Mathematics, Sr.', isPrimary: false, active: true },
  { id: 'u3', name: 'Amit Verma', erpId: 'ERP-TCH-003', role: 'TEACHER', details: 'Science Teacher', isPrimary: false, active: true },
  { id: 'u4', name: 'Sneha Gupta', erpId: 'ERP-ACC-001', role: 'ACCOUNTS', details: 'Accounts Staff', isPrimary: false, active: true },
  { id: 'u5', name: 'Arjun Singh', erpId: 'ERP-STU-001', role: 'STUDENT', details: 'Class X-A', isPrimary: false, active: true },
  { id: 'u6', name: 'Meera Patel', erpId: 'ERP-STU-002', role: 'STUDENT', details: 'Class IX-B', isPrimary: false, active: true },
  { id: 'u7', name: 'Rohan Joshi', erpId: 'ERP-STU-003', role: 'STUDENT', details: 'Class VIII-A', isPrimary: false, active: false },
  { id: 'u8', name: 'Kavita Reddy', erpId: 'ERP-TCH-004', role: 'TEACHER', details: 'English Teacher', isPrimary: false, active: true },
  { id: 'u9', name: 'Vikram Chauhan', erpId: 'ERP-STU-004', role: 'STUDENT', details: 'Class XII-A', isPrimary: false, active: true },
  { id: 'u10', name: 'Ananya Mishra', erpId: 'ERP-STU-005', role: 'STUDENT', details: 'Class VII-C', isPrimary: false, active: true },
];

export const ROLE_CONFIG: Record<UserRole, { bg: string; text: string; border: string }> = {
  ADMIN: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' },
  TEACHER: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200' },
  ACCOUNTS: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' },
  STUDENT: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
};

export const INITIAL_FEES: DemoFeeRecord[] = [
  { id: 'f1', name: 'Arjun Singh', erpId: 'ERP-STU-001', cls: 'X-A', billed: 4500000, due: 0, dueDate: '2026-10-15', status: 'PAID' },
  { id: 'f2', name: 'Meera Patel', erpId: 'ERP-STU-002', cls: 'IX-B', billed: 4200000, due: 1200000, dueDate: '2026-11-01', status: 'PARTIALLY_PAID' },
  { id: 'f3', name: 'Rohan Joshi', erpId: 'ERP-STU-003', cls: 'VIII-A', billed: 3800000, due: 3800000, dueDate: '2026-09-30', status: 'OVERDUE' },
  { id: 'f4', name: 'Vikram Chauhan', erpId: 'ERP-STU-004', cls: 'XII-A', billed: 5500000, due: 2200000, dueDate: '2026-11-15', status: 'PENDING' },
  { id: 'f5', name: 'Ananya Mishra', erpId: 'ERP-STU-005', cls: 'VII-C', billed: 3200000, due: 0, dueDate: '2026-10-01', status: 'PAID' },
  { id: 'f6', name: 'Ishaan Reddy', erpId: 'ERP-STU-006', cls: 'VI-A', billed: 0, due: 0, dueDate: null, status: 'NO_FEES' },
  { id: 'f7', name: 'Nisha Kapoor', erpId: 'ERP-STU-007', cls: 'XI-B', billed: 4800000, due: 4800000, dueDate: '2026-10-20', status: 'OVERDUE' },
  { id: 'f8', name: 'Siddharth Mehta', erpId: 'ERP-STU-008', cls: 'X-B', billed: 4500000, due: 1500000, dueDate: '2026-11-10', status: 'PARTIALLY_PAID' },
];

export const FEE_STATUS_CONFIG: Record<FeeStatus, { label: string; bg: string; text: string; border: string }> = {
  NO_FEES: { label: 'NO FEES', bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200' },
  PAID: { label: 'PAID', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100' },
  PARTIALLY_PAID: { label: 'PARTIAL', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100' },
  PENDING: { label: 'PENDING', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100' },
  OVERDUE: { label: 'OVERDUE', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-100' },
};

export function fmt(n: number): string {
  return n >= 100000 ? (n / 100000).toFixed(1) + 'L' : n.toLocaleString('en-IN');
}

export function fmtCurrency(n: number): string {
  return '₹' + fmt(n);
}

export function fmtRupeesFromPaisa(paisa: number): string {
  return '₹' + (paisa / 100).toLocaleString('en-IN', { minimumFractionDigits: 2 });
}

