import type { AccordionItem } from '../components/shared';

export const GETTING_STARTED_GUIDES = [
  {
    title: 'First login',
    description:
      'Sign in using the school-issued credentials and login identifier provided by your school administrator.',
  },
  {
    title: 'Understanding the dashboard',
    description:
      'View the operational metrics, alerts, schedules, or tasks relevant to your assigned school role.',
  },
  {
    title: 'Completing the setup checklist',
    description:
      'Administrators follow the built-in setup checklist to configure classes, sections, imports, timetables, and branding.',
  },
  {
    title: 'Understanding school-issued ERP IDs',
    description:
      'Each student, teacher, and staff profile receives an ERP identifier used across attendance, fee, and user lookups.',
  },
  {
    title: 'Navigating role-specific workspaces',
    description:
      'Administrator, Teacher, Student, and Accounts accounts each open a workspace scoped to their daily tasks.',
  },
];

export interface RoleGuideCategory {
  id: 'admin' | 'teacher' | 'student' | 'accounts';
  title: string;
  summary: string;
  topics: {
    name: string;
    detail: string;
  }[];
}

export const ROLE_HELP_GUIDES: RoleGuideCategory[] = [
  {
    id: 'admin',
    title: 'Administrator Guide',
    summary: 'Managing users, academic structures, timetables, notices, imports, reports, and school branding.',
    topics: [
      {
        name: 'User management',
        detail: 'Create student, teacher, and accounts profiles with ERP IDs, or suspend and archive accounts safely.',
      },
      {
        name: 'Academic structure',
        detail: 'Set up classes, sections, subjects, subject codes, and the school academic calendar.',
      },
      {
        name: 'Timetable setup',
        detail: 'Build weekly class schedules with automatic detection for teacher and section double-booking.',
      },
      {
        name: 'Notices',
        detail: 'Publish announcements targeted to specific school roles or across the entire school.',
      },
      {
        name: 'Data imports',
        detail: 'Use supported CSV templates to import student, teacher, and fee records with row-level validation.',
      },
      {
        name: 'Reports',
        detail: 'Review attendance trends, low-attendance alerts, fee collections, and defaulter summaries.',
      },
      {
        name: 'School settings',
        detail: 'Configure school identity details, logo, and workspace brand color.',
      },
    ],
  },
  {
    id: 'teacher',
    title: 'Teacher Guide',
    summary: 'Daily attendance workflows, assignments, weekly schedules, notices, and submission tracking.',
    topics: [
      {
        name: 'Attendance',
        detail: 'Mark Present/Absent or Mark All in assigned classes, save drafts, lock registers, or unlock before 48h finalization.',
      },
      {
        name: 'Assignments',
        detail: 'Create class assignments with due dates and optional reference attachments.',
      },
      {
        name: 'Weekly timetable',
        detail: 'Check your assigned periods, classes, and subjects for the week.',
      },
      {
        name: 'Notices',
        detail: 'Read notices scoped to teachers or specific classes and broadcast updates where permitted.',
      },
      {
        name: 'Submission management',
        detail: 'Track which students have submitted work and review teacher submission lists.',
      },
    ],
  },
  {
    id: 'student',
    title: 'Student Guide',
    summary: 'Personal dashboard, attendance status, timetables, assignments, fee records, and UPI payments.',
    topics: [
      {
        name: 'Dashboard',
        detail: 'See an overview of your classes, recent notices, pending assignments, and attendance status.',
      },
      {
        name: 'Attendance',
        detail: 'Review your recorded attendance status and overall attendance summary.',
      },
      {
        name: 'Timetable',
        detail: 'View your weekly class timetable along with assigned subjects and teachers.',
      },
      {
        name: 'Assignments',
        detail: 'Download assignment attachments and upload your completed submissions.',
      },
      {
        name: 'Fee records',
        detail: 'Check fee invoices, payment status, and download official PDF invoices and receipts.',
      },
      {
        name: 'UPI payment workflow',
        detail: 'Pay via UPI QR/deep link and submit your UTR payment reference for accounts staff verification.',
      },
    ],
  },
  {
    id: 'accounts',
    title: 'Accounts Guide',
    summary: 'Invoicing, payment recording, transaction logs, UPI verification, receipts, and financial reports.',
    topics: [
      {
        name: 'Fee invoices',
        detail: 'Generate structured fee invoices with automatic sequential invoice numbering.',
      },
      {
        name: 'Payment recording',
        detail: 'Record Cash, Online, and Cheque payments against student fee invoices.',
      },
      {
        name: 'Transactions',
        detail: 'Inspect full payment transaction history across students and payment modes.',
      },
      {
        name: 'UPI verification',
        detail: 'Review student-submitted UPI UTR numbers and proofs before approving and updating invoice status.',
      },
      {
        name: 'Receipts',
        detail: 'Generate and download QR-verifiable PDF invoices and official fee receipts.',
      },
      {
        name: 'Financial reports',
        detail: 'Monitor expected vs. collected fees, collection rates, payment-method breakdowns, and defaulters.',
      },
    ],
  },
];

export const HELP_FAQS: AccordionItem[] = [
  {
    question: 'Why does a teacher only see certain classes in the attendance dropdown?',
    answer:
      'Teacher workspaces are scoped to their assigned classes and sections so roll call stays fast and avoids accidental edits to other classes.',
  },
  {
    question: 'Can a locked attendance record be edited?',
    answer:
      'Yes, teachers can unlock a locked register to make corrections before the 48-hour automatic finalization window completes.',
  },
  {
    question: 'Are UPI payments approved automatically after a student submits a UTR?',
    answer:
      'No. After a student pays via UPI and submits the UTR proof, Accounts staff manually verify the reference before marking the invoice as paid and issuing the receipt.',
  },
  {
    question: 'What happens to records if a student or staff account is archived?',
    answer:
      'SchoolChakra supports disabling and archiving accounts instead of immediate destructive deletion, so historical attendance and fee records remain preserved.',
  },
  {
    question: 'How does SchoolChakra prevent timetable double-booking?',
    answer:
      'When building weekly timetables, the system checks period assignments and prevents scheduling the same teacher or class section into conflicting slots.',
  },
  {
    question: 'Where can users report a bug or operational issue?',
    answer:
      'Signed-in users can use the in-app Report an Issue option directly from the application, or prospective schools can reach out via the Contact page.',
  },
];
