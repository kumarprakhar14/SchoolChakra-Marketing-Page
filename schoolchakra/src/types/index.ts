import type { ComponentType } from 'react';

export type BrandThemeKey = 'blue' | 'emerald' | 'violet' | 'crimson';

export interface BrandTheme {
  id: string;
  name: string;
  hex: string;
  hoverHex: string;
  lightBg: string;
  borderLight: string;
  textClass: string;
  bgClass: string;
  bgSoftClass: string;
  borderClass: string;
  ringClass: string;
  badgeClass: string;
}

export interface RotatingWordItem {
  text: string;
  color: BrandThemeKey | 'purple' | 'blue' | 'green' | 'pink';
}

export interface SchoolTenant {
  id: string;
  name: string;
  board: string;
  erpCode: string;
  defaultTheme: string;
  stats: Record<string, TenantStats>;
}

export interface TenantStats {
  students: string;
  attendance: string;
  feeRate: string;
  collected: string;
  notices: string | number;
  lowAttCount: number;
}

export interface ChecklistItem {
  id: number;
  label: string;
  done: boolean;
}

export interface RoleTab {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface FeatureFlag {
  key: keyof SuperAdminFlags;
  label: string;
}

export interface SuperAdminFlags {
  upiVerification: boolean;
  csvFeeWizard: boolean;
  autoFinalize48h: boolean;
  whatsappAlerts: boolean;
}

export interface PilotFormData {
  board: string;
  size: string;
  legacy: string;
  schoolName: string;
  contact: string;
}

export interface InvoiceStatusOption {
  value: string;
  label: string;
}

export interface AttendanceState {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
}

export interface SidebarNavItem {
  label: string;
  icon: ComponentType<{ className?: string }>;
  active?: boolean;
  badge?: string | number;
}

export interface StatCardData {
  label: string;
  value: string;
  subtext: string;
  subtextColor?: string;
  valueColor?: string;
}

export interface ChartBarData {
  day: string;
  pct: number;
  fee: string;
}

export interface FeeDefaulterRow {
  name: string;
  id: string;
  due: string;
  days: string;
  status: string;
}

export interface StudentRow {
  roll: string;
  name: string;
  present: boolean;
}

export interface TimetableSlot {
  class: string;
  subject: string;
  teacher: string;
  valid: boolean;
}

export interface NoticeAudience {
  label: string;
  active: boolean;
}

export interface BugStatusOption {
  label: string;
  active: boolean;
}