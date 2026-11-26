export interface SolutionRoleData {
  id: 'admin' | 'teacher' | 'student' | 'accounts';
  badge: string;
  roleName: string;
  headline: string;
  description: string;
  capabilities: string[];
}

export const SOLUTION_ROLES: SolutionRoleData[] = [
  {
    id: 'admin',
    badge: 'ROLE 01 • SCHOOL ADMINISTRATORS',
    roleName: 'School Administrators',
    headline: 'See your whole school in one place.',
    description:
      'Principals and school administrators get clear operational oversight across attendance, academics, user records, notices, and fee visibility without piecing together spreadsheets.',
    capabilities: [
      'School-wide operational dashboard',
      'Student and staff management',
      'Academic setup (classes, sections & subjects)',
      'Timetable builder with conflict guard',
      'Academic calendar & special working days',
      'Targeted school notices',
      'Fee visibility & defaulter oversight',
      'Attendance and financial reports & insights',
      'School logo and brand color settings',
    ],
  },
  {
    id: 'teacher',
    badge: 'ROLE 02 • TEACHERS',
    roleName: 'Teachers',
    headline: 'Spend less time managing registers.',
    description:
      'Teachers work inside a scoped workspace showing only their assigned classes and sections—making roll call, homework distribution, and weekly schedules straightforward.',
    capabilities: [
      'Assigned classes and sections only',
      'Daily attendance with draft, lock & final workflow',
      'Weekly timetable schedule',
      'Assignment creation with due dates & attachments',
      'Student submission tracking & downloads',
      'School notices relevant to staff and classes',
      'Academic structure and subject information',
    ],
  },
  {
    id: 'student',
    badge: 'ROLE 03 • STUDENTS',
    roleName: 'Students',
    headline: 'Your school day, organized.',
    description:
      'Students get a focused workspace to check their daily schedule, track attendance status, download and submit assignments, read school notices, and manage fee invoices.',
    capabilities: [
      'Personal academic dashboard',
      'Attendance status visibility',
      'Weekly class timetable',
      'Enrolled subjects and assigned teachers',
      'Pending assignments with due dates',
      'Assignment downloads and file submissions',
      'Fee summary, invoices & PDF receipts',
      'UPI payment and UTR proof submission workflow',
      'Targeted school notices',
    ],
  },
  {
    id: 'accounts',
    badge: 'ROLE 04 • ACCOUNTS & FINANCE STAFF',
    roleName: 'Accounts & Finance Staff',
    headline: 'From invoice to collection, stay organized.',
    description:
      'Accounts teams manage billing, payment recording, manual UPI UTR verification, receipt generation, and collection reporting in a dedicated financial ledger.',
    capabilities: [
      'Student fee summaries',
      'Structured invoice generation with auto-numbering',
      'Cash, online & cheque payment recording',
      'Complete payment transaction history',
      'UPI UTR submission review & verification',
      'QR-verifiable PDF invoices and receipts',
      'Fee collection and payment-method reports',
      'Outstanding dues & defaulter tracking',
    ],
  },
];

export const CONNECTED_SCHOOL_DAY = [
  {
    time: 'Step 1 • Setup',
    actor: 'Administrator',
    action: 'Configures the academic structure',
    detail: 'Classes, sections, subjects, teachers, and period slots are established.',
  },
  {
    time: 'Step 2 • Morning',
    actor: 'Teacher',
    action: 'Marks daily attendance',
    detail: 'Roll call is recorded in the scoped class register and locked safely.',
  },
  {
    time: 'Step 3 • Class Hours',
    actor: 'Students',
    action: 'Follow schedules and assignments',
    detail: 'Weekly periods, subject teachers, due assignments, and notices stay visible.',
  },
  {
    time: 'Step 4 • Fee Counter',
    actor: 'Accounts Staff',
    action: 'Records and verifies fee payments',
    detail: 'Cash/online payments are logged and UPI UTR proofs are verified for receipts.',
  },
  {
    time: 'Step 5 • End of Day',
    actor: 'Administrator',
    action: 'Reviews school-wide reports',
    detail: 'Attendance trends, low-attendance alerts, and collection summaries reflect live activity.',
  },
];

export const SCHOOL_SUITABILITY = [
  {
    title: 'Small schools replacing registers and spreadsheets',
    description:
      'Move away from paper attendance books and manual Excel sheets into organized digital records without overwhelming staff.',
  },
  {
    title: 'Growing schools adding students and staff',
    description:
      'Keep class sections, teacher timetables, ERP IDs, and student accounts structured as enrollment expands.',
  },
  {
    title: 'Schools needing stronger attendance and financial oversight',
    description:
      'Gain clear visibility into working-day attendance trends, overdue invoices, and staff-verified UPI payments.',
  },
  {
    title: 'Schools transitioning from manual processes',
    description:
      'Adopt digital workflows gradually using CSV templates, guided onboarding checklists, and role-scoped workspaces.',
  },
];
