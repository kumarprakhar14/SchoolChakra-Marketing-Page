export interface FeatureCategory {
  id: string;
  code: string;
  title: string;
  summary: string;
  highlights: {
    title: string;
    detail: string;
  }[];
  previewType: 'users' | 'attendance' | 'academics' | 'communication' | 'fees' | 'reports';
}

export const FEATURE_CATEGORIES: FeatureCategory[] = [
  {
    id: 'student-user-management',
    code: '01 • STUDENT & USER MANAGEMENT',
    title: 'Structured profiles for every person on campus',
    summary:
      'Maintain clean records for students, teachers, and accounts staff with school-issued ERP IDs, section allocations, and lifecycle controls that protect historical records.',
    previewType: 'users',
    highlights: [
      {
        title: 'Student profiles & ERP IDs',
        detail: 'Assign consistent school-issued ERP identifiers and keep class and section enrollment organized.',
      },
      {
        title: 'Teacher & staff management',
        detail: 'Create and manage Administrator, Teacher, and Accounts profiles from a single directory.',
      },
      {
        title: 'Class & section allocation',
        detail: 'Link students to classes and sections so attendance, timetables, and notices stay scoped accurately.',
      },
      {
        title: 'Profile & contact information',
        detail: 'Keep essential user profile details and contact information accessible within role permissions.',
      },
      {
        title: 'Account suspension & archival',
        detail: 'Suspend or archive accounts when someone leaves without deleting linked attendance or fee records.',
      },
    ],
  },
  {
    id: 'attendance-management',
    code: '02 • ATTENDANCE MANAGEMENT',
    title: 'Daily attendance with draft, lock, and audit safeguards',
    summary:
      'Give teachers a fast daily register while protecting school records from accidental edits or lost work.',
    previewType: 'attendance',
    highlights: [
      {
        title: 'Daily Present / Absent marking',
        detail: 'Mark individual students Present or Absent cleanly for assigned classes and sections.',
      },
      {
        title: 'Mark All functionality',
        detail: 'Speed up morning roll call by marking the whole class present and adjusting exceptions.',
      },
      {
        title: 'Draft, lock & final-save workflow',
        detail: 'Save temporary drafts, lock registers after roll call, or unlock for corrections before finalization.',
      },
      {
        title: 'Unsaved-changes warnings',
        detail: 'Browser exit guards warn staff before navigating away from unsubmitted register edits.',
      },
      {
        title: 'Attendance reports & low-attendance alerts',
        detail: 'Review attendance trends and flag students dropping below attendance thresholds.',
      },
    ],
  },
  {
    id: 'academic-management',
    code: '03 • ACADEMIC MANAGEMENT',
    title: 'Classes, subjects, timetables, and academic calendar',
    summary:
      'Define your academic structure once so weekly schedules, subject codes, and working days stay aligned across every workspace.',
    previewType: 'academics',
    highlights: [
      {
        title: 'Academic structure, classes & sections',
        detail: 'Configure your school’s grade hierarchy and sections in a structured setup flow.',
      },
      {
        title: 'Subject management & codes',
        detail: 'Maintain subjects with standard codes and map teachers to their assigned subjects.',
      },
      {
        title: 'Timetable builder & weekly schedules',
        detail: 'Build weekly class schedules that immediately appear inside Teacher and Student workspaces.',
      },
      {
        title: 'Double-booking prevention',
        detail: 'Detect and block teacher and section period conflicts before a schedule goes live.',
      },
      {
        title: 'Academic calendar & overrides',
        detail: 'Track holidays, vacations, and special working days alongside standard working schedules.',
      },
    ],
  },
  {
    id: 'assignments-communication',
    code: '04 • ASSIGNMENTS & COMMUNICATION',
    title: 'Homework distribution and targeted school notices',
    summary:
      'Keep class assignments and official announcements organized in one place instead of scattered across chat threads.',
    previewType: 'communication',
    highlights: [
      {
        title: 'Assignment creation & due dates',
        detail: 'Publish assignments by class and section with clear due dates and optional reference attachments.',
      },
      {
        title: 'Student downloads & submissions',
        detail: 'Students download assignment materials and submit their work directly through their workspace.',
      },
      {
        title: 'Teacher submission lists',
        detail: 'Teachers review and track student submissions per assignment in one organized list.',
      },
      {
        title: 'Targeted notices & role visibility',
        detail: 'Publish notices scoped to specific roles or audiences, with clear indicators when notices are edited.',
      },
    ],
  },
  {
    id: 'fee-financial-management',
    code: '05 • FEE & FINANCIAL MANAGEMENT',
    title: 'Invoices, UPI verification, and verifiable PDF receipts',
    summary:
      'Track billed fees, record cash, online, or cheque payments, verify student-submitted UPI proofs, and issue QR-verifiable documents.',
    previewType: 'fees',
    highlights: [
      {
        title: 'Fee structure & automatic invoice numbering',
        detail: 'Generate structured fee invoices with consistent automatic invoice numbering.',
      },
      {
        title: 'Multi-mode payment recording',
        detail: 'Record Cash, Online, and Cheque payments with complete transaction history.',
      },
      {
        title: 'UPI QR/deep-link & UTR verification',
        detail: 'Students pay via UPI and submit UTR details; accounts staff verify proofs before approval.',
      },
      {
        title: 'QR-verifiable PDF invoices & receipts',
        detail: 'Generate downloadable PDF invoices and receipts stamped with status and QR verification.',
      },
      {
        title: 'Collection reports & defaulter tracking',
        detail: 'Monitor outstanding dues, overdue accounts, and fee collection progress.',
      },
    ],
  },
  {
    id: 'reports-insights',
    code: '06 • REPORTS & INSIGHTS',
    title: 'Attendance trends and financial visibility',
    summary:
      'Turn daily register and fee activity into clear summaries for administrators and accounts teams.',
    previewType: 'reports',
    highlights: [
      {
        title: 'Attendance summaries & trends',
        detail: 'Track class and school-wide attendance patterns using accurate working-day calculations.',
      },
      {
        title: 'Low-attendance student alerts',
        detail: 'Spot students needing follow-up early with automatic threshold alerts.',
      },
      {
        title: 'Expected vs collected & collection rate',
        detail: 'Compare total billed fees against collected amounts and monitor outstanding balances.',
      },
      {
        title: 'Payment-method & defaulter reports',
        detail: 'Break down collections by payment mode and review actionable defaulter lists.',
      },
    ],
  },
];

export const CONNECTED_WORKFLOW_STEPS = [
  {
    step: '01',
    role: 'Administrator',
    title: 'Creates academic structure',
    detail: 'Classes, sections, subjects, and users are configured once.',
  },
  {
    step: '02',
    role: 'Admin → Staff & Students',
    title: 'Timetables become visible',
    detail: 'Weekly schedules populate automatically in Teacher and Student views.',
  },
  {
    step: '03',
    role: 'Teacher',
    title: 'Marks daily attendance',
    detail: 'Registers move cleanly from Draft to Lock and 48-hour finalization.',
  },
  {
    step: '04',
    role: 'Administrator',
    title: 'Monitors attendance reports',
    detail: 'Summaries, working-day counts, and low-attendance alerts update automatically.',
  },
  {
    step: '05',
    role: 'Accounts',
    title: 'Generates fee invoices',
    detail: 'Auto-numbered invoices reflect fee structures and student balances.',
  },
  {
    step: '06',
    role: 'Student',
    title: 'Submits UPI payment proof',
    detail: 'Students view fee details, pay via UPI, and submit their UTR reference.',
  },
  {
    step: '07',
    role: 'Accounts',
    title: 'Verifies payment & issues receipt',
    detail: 'Staff review the proof, approve the transaction, and issue a QR-verifiable receipt.',
  },
];
