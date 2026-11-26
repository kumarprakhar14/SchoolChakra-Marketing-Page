export interface PermissionRow {
  module: string;
  admin: string;
  teacher: string;
  student: string;
  accounts: string;
}

export const ROLE_PERMISSION_MATRIX: PermissionRow[] = [
  {
    module: 'School Setup & Branding',
    admin: 'Full access',
    teacher: 'No access',
    student: 'No access',
    accounts: 'No access',
  },
  {
    module: 'User & Profile Management',
    admin: 'Full access',
    teacher: 'Assigned classes view',
    student: 'Own profile only',
    accounts: 'Billing lookup',
  },
  {
    module: 'Attendance Registers',
    admin: 'School-wide reports',
    teacher: 'Assigned sections',
    student: 'Own attendance',
    accounts: 'No access',
  },
  {
    module: 'Timetable & Calendar',
    admin: 'Build & manage',
    teacher: 'Own schedule view',
    student: 'Class schedule view',
    accounts: 'Calendar view',
  },
  {
    module: 'Assignments',
    admin: 'Oversight',
    teacher: 'Create & review',
    student: 'Download & submit',
    accounts: 'No access',
  },
  {
    module: 'Fee Invoices & Receipts',
    admin: 'Visibility & reports',
    teacher: 'No access',
    student: 'Own fees & UPI submit',
    accounts: 'Full ledger & verify',
  },
];

export const OPERATIONAL_SAFEGUARDS = [
  {
    title: 'Attendance integrity',
    badge: '48-HOUR AUTO-FINALIZE',
    points: [
      'Structured Draft, Lock, and Final Save lifecycle for daily class registers.',
      'Teachers can unlock locked attendance to fix entries before finalization.',
      'Browser unsaved-changes warnings prevent accidental loss of roll-call edits.',
      'Locked attendance records automatically finalize after 48 hours.',
    ],
  },
  {
    title: 'Timetable integrity',
    badge: 'CONFLICT GUARD',
    points: [
      'Prevents assigning the same teacher to two classes in the same period slot.',
      'Prevents double-booking a class section during weekly schedule creation.',
      'Flags scheduling conflicts before timetable changes take effect.',
    ],
  },
  {
    title: 'Data import integrity',
    badge: 'CSV RECONCILIATION',
    points: [
      'Guided CSV import workflows for student, teacher, and fee records.',
      'Row-level validation catches formatting typos and missing fields before commit.',
      'Matching and reconciliation require human resolution of ambiguous records first.',
    ],
  },
  {
    title: 'Account integrity',
    badge: 'NON-DESTRUCTIVE ARCHIVAL',
    points: [
      'Disable and archive accounts instead of immediate destructive deletion.',
      'Associated attendance history, assignments, and financial records stay intact.',
    ],
  },
];

export const FINANCIAL_INTEGRITY_POINTS = [
  {
    title: 'Automatic invoice numbering',
    detail: 'Invoices receive sequential system-generated identifiers to prevent duplicates or gaps.',
  },
  {
    title: 'Payment transaction history',
    detail: 'Cash, online, cheque, and UPI payments are recorded with clear status tracking.',
  },
  {
    title: 'QR-coded invoices and receipts',
    detail: 'Generated PDF invoices and receipts carry QR verification details.',
  },
  {
    title: 'Manual UPI verification',
    detail: 'Students submit UPI UTR references and proofs for review; accounts staff verify them before marking paid.',
  },
];
