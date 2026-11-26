export type DemoTabId = 'dashboard' | 'users' | 'import' | 'fees';

export interface DemoSchool {
  id: string;
  name: string;
  short: string;
  board: string;
  code: string;
  dot: string;
  students: number;
  teachers: number;
  classes: number;
  attendance: number;
  feesCollected: number;
  feesPending: number;
}

export interface DemoTheme {
  id: string;
  name: string;
  primary: string;
  bg: string;
  light: string;
  border: string;
  text: string;
  ring: string;
  dot: string;
  sidebar: string;
  btnGrad: string;
}

export interface DemoTab {
  id: DemoTabId;
  label: string;
  icon: 'chart' | 'users' | 'upload' | 'dollar';
}

export type UserRole = 'ADMIN' | 'TEACHER' | 'STUDENT' | 'ACCOUNTS';

export interface DemoUser {
  id: string;
  name: string;
  erpId: string;
  role: UserRole;
  details: string;
  isPrimary?: boolean;
  active: boolean;
}

export interface DemoChecklistItem {
  id: number;
  title: string;
  done: boolean;
}

export type FeeStatus = 'NO_FEES' | 'PAID' | 'PARTIALLY_PAID' | 'PENDING' | 'OVERDUE';

export interface DemoFeeRecord {
  id: string;
  name: string;
  erpId: string;
  cls: string;
  billed: number;
  due: number;
  dueDate: string | null;
  status: FeeStatus;
}

export interface DemoCanvasProps {
  /** Initial or controlled school ID (e.g., 'dpa', 'stx', 'lvi') */
  defaultSchool?: string;
  /** Controlled theme key (e.g., 'blue', 'emerald', 'violet', 'crimson') */
  theme?: string;
  /** Initial theme ID (e.g., 'blue', 'emerald', 'violet', 'crimson') */
  defaultTheme?: string;
  /** Initial tab (e.g., 'dashboard', 'users', 'import', 'fees') */
  defaultTab?: DemoTabId;
  /** Optional controlled active tab */
  activeTab?: DemoTabId;
  /** Optional container CSS classes */
  className?: string;
  /** Whether to show ambient floating badges natively inside the canvas (default: false) */
  showInternalBadges?: boolean;
  /** Callback when school changes */
  onSchoolChange?: (school: DemoSchool) => void;
  /** Callback when theme changes */
  onThemeChange?: (theme: DemoTheme) => void;
  /** Callback when active tab changes */
  onTabChange?: (tab: DemoTabId) => void;
}

