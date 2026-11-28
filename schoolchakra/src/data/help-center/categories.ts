import type { HelpCategoryMeta } from './types';

export const HELP_CATEGORIES: HelpCategoryMeta[] = [
  {
    slug: 'getting-started',
    title: 'Getting Started',
    shortTitle: 'Getting Started',
    roleLabel: 'All Roles',
    description:
      'Essential first-time guides for logging in, understanding ERP IDs, and navigating your SchoolChakra workspace.',
    overviewIntro:
      'Whether you manage the school, teach classes, review homework, or handle fee collections, every user starts from the same sign-in screen and opens a workspace tailored to their role.',
    gettingStartedNote:
      'Ask your School Administrator for your school-issued ERP ID and initial password before signing in for the first time.',
    popularTasks: [
      { label: 'How do I log in with my ERP ID?', slug: 'logging-in' },
      { label: 'Which workspace will I see?', slug: 'intro-to-schoolchakra' },
      { label: 'How do I navigate the sidebar and top bar?', slug: 'navigating-the-workspace' },
    ],
    groups: ['First Steps'],
  },
  {
    slug: 'school-admin',
    title: 'School Admin Guide',
    shortTitle: 'School Admin',
    roleLabel: 'School Admin',
    description:
      'Set up classes, onboard users, import records, manage the academic calendar, build timetables, publish notices, and review reports.',
    overviewIntro:
      'As a School Administrator, you configure your campus foundation and oversee daily academic and fee operations across the entire school.',
    gettingStartedNote:
      'For a brand-new school, complete your setup in order: School Settings, Classes & Sections, Staff & Students, Weekly Timetable, and your first Notice.',
    popularTasks: [
      { label: 'Complete the Setup Mode checklist', slug: 'admin-dashboard' },
      { label: 'Add students, teachers, and staff', slug: 'user-management' },
      { label: 'Import records using CSV/Excel templates', slug: 'bulk-data-import' },
      { label: 'Build a clash-free weekly timetable', slug: 'timetable-management' },
    ],
    groups: [
      'Overview & Setup',
      'People & Onboarding',
      'Academics & Operations',
      'Finance & Analytics',
    ],
  },
  {
    slug: 'teacher',
    title: 'Teacher Guide',
    shortTitle: 'Teacher',
    roleLabel: 'Teacher',
    description:
      'Mark, lock, and finalize daily attendance, view your personal timetable, review assigned class rosters, and manage assignments.',
    overviewIntro:
      'The Teacher workspace keeps daily classroom work focused: check school notices, review your teaching schedule, mark roll call, and share homework with your sections.',
    gettingStartedNote:
      'If your Assigned Classes or Time Table appear empty on first login, ask your School Administrator to assign your sections or timetable periods.',
    popularTasks: [
      { label: 'Mark and lock daily attendance', slug: 'teacher-attendance' },
      { label: 'Post an assignment with attachments', slug: 'teacher-assignments' },
      { label: 'Check your weekly teaching timetable', slug: 'teacher-timetable' },
    ],
    groups: ['Daily Workspace', 'Classroom Operations'],
  },
  {
    slug: 'student',
    title: 'Student Guide',
    shortTitle: 'Student',
    roleLabel: 'Student',
    description:
      'Check today’s attendance and notices, view your subjects and timetable, turn in assignments, download fee PDFs, and pay via UPI.',
    overviewIntro:
      'The Student portal brings together everything you need for the school day—from announcements and homework deadlines to your class schedule and official fee receipts.',
    gettingStartedNote:
      'Your subjects and timetable appear automatically once your School Administrator assigns your Class, Section, and weekly periods.',
    popularTasks: [
      { label: 'Submit a homework assignment', slug: 'student-assignments' },
      { label: 'Pay a fee invoice via UPI and submit UTR', slug: 'student-upi-payments' },
      { label: 'Download official PDF invoices and receipts', slug: 'student-fees-pdfs' },
    ],
    groups: ['Daily School Life', 'Fees & Payments'],
  },
  {
    slug: 'accounts',
    title: 'Accounts Guide',
    shortTitle: 'Accounts',
    roleLabel: 'Accounts',
    description:
      'Monitor fee collections, generate student invoices, record offline/online payments, verify student UPI proofs, and track defaulters.',
    overviewIntro:
      'The Accounts workspace gives fee collection officers and school accountants clear tools for billing, payment reconciliation, PDF receipts, and overdue follow-up.',
    gettingStartedNote:
      'Make sure your School Administrator has configured the school’s Merchant Name and UPI ID in School Settings before students submit UPI payments.',
    popularTasks: [
      { label: 'Create a student fee invoice', slug: 'invoices-and-payments' },
      { label: 'Approve or reject a student UPI payment', slug: 'upi-verification-receipts' },
      { label: 'Check Fee Insights and overdue defaulters', slug: 'fee-insights-reports' },
    ],
    groups: ['Overview', 'Billing & Collections', 'Reporting'],
  },
  {
    slug: 'common-help',
    title: 'Common Help',
    shortTitle: 'Common Help',
    roleLabel: 'All Roles',
    description:
      'Shared tools available across roles: Global Search, Notification Center, My Profile, signing out, and reporting an issue.',
    overviewIntro:
      'Every logged-in SchoolChakra user shares the same header search bar, notification bell, profile view, and in-app issue reporting tools.',
    popularTasks: [
      { label: 'Search students, notices, or invoices', slug: 'global-search' },
      { label: 'View and mark notifications as read', slug: 'notifications-center' },
      { label: 'Report an issue from the sidebar', slug: 'reporting-issues' },
    ],
    groups: ['Shared Tools & Settings'],
  },
];
