import type { AccordionItem } from '../components/shared';

export const ONBOARDING_STEPS = [
  {
    step: '01',
    title: 'Initial discussion',
    description:
      'Understand your school’s requirements, current registers or spreadsheets, and how your academic and fee workflows operate today.',
  },
  {
    step: '02',
    title: 'Data preparation and migration',
    description:
      'Prepare student, teacher, and fee records using supported CSV import templates. Built-in validation, matching, and reconciliation highlight errors and ambiguous records before import confirmation.',
  },
  {
    step: '03',
    title: 'School setup and staff training',
    description:
      'Configure your academic structure—classes, sections, subjects, timetable, and school branding—and introduce administrators, teachers, and accounts staff to their workspaces.',
  },
  {
    step: '04',
    title: 'Go-live',
    description:
      'Begin running daily attendance, timetables, assignments, notices, and fee operations inside SchoolChakra.',
  },
];

export interface ChecklistRequirement {
  item: string;
  detail: string;
  required: boolean;
}

export const PREPARATION_CHECKLIST: ChecklistRequirement[] = [
  {
    item: 'School name and identity information',
    detail: 'Official institution name and basic school profile details.',
    required: true,
  },
  {
    item: 'Class and section information',
    detail: 'List of active classes and sections for the academic year.',
    required: true,
  },
  {
    item: 'Student records',
    detail: 'Student names, class/section assignments, and identifiers for ERP ID setup.',
    required: true,
  },
  {
    item: 'Teacher and staff records',
    detail: 'Administrator, teacher, and accounts staff details for role-based accounts.',
    required: true,
  },
  {
    item: 'Subject details',
    detail: 'Subject names and codes used across classes and timetables.',
    required: true,
  },
  {
    item: 'Academic timetable information',
    detail: 'Weekly period slots and teacher assignments (can also be configured during setup).',
    required: false,
  },
  {
    item: 'Existing fee records',
    detail: 'Prior fee balances or invoices where historical fee migration is required.',
    required: false,
  },
  {
    item: 'School logo and preferred brand color',
    detail: 'Optional branding assets to customize the school workspace theme.',
    required: false,
  },
];

export const AFTER_SETUP_ITEMS = [
  {
    title: 'Setup checklist completion',
    detail: 'Administrators verify classes, imports, timetable slots, and branding via the workspace checklist.',
  },
  {
    title: 'School-issued login identifiers',
    detail: 'Users receive their school-issued ERP identifiers to access their assigned accounts.',
  },
  {
    title: 'Role-specific workspaces',
    detail: 'Administrators, teachers, students, and accounts teams sign in to focused views scoped to their responsibilities.',
  },
  {
    title: 'Built-in User Guide & issue reporting',
    detail: 'Staff can consult the in-app User Guide for daily steps or report issues directly inside the application.',
  },
];

export const GETTING_STARTED_FAQS: AccordionItem[] = [
  {
    question: 'Can we migrate existing spreadsheet data?',
    answer:
      'Yes. SchoolChakra supports guided CSV import workflows for student, teacher, and fee records, with validation, row-level error reporting, and reconciliation before records are committed. Assisted migration is provided for Founding Pilot schools.',
  },
  {
    question: 'Do we need technical expertise?',
    answer:
      'No dedicated IT team is required for day-to-day setup. The Administrator workspace includes a guided setup checklist and structured CSV templates.',
  },
  {
    question: 'How do staff access their accounts?',
    answer:
      'Administrators create or import staff and student profiles, and users sign in with their school-issued ERP login identifiers.',
  },
  {
    question: 'Can we customize the school branding?',
    answer:
      'Yes. School administrators can upload the school logo and choose a brand theme color for their school workspace.',
  },
  {
    question: 'Is training available?',
    answer:
      'Every workspace includes the built-in User Guide for self-paced guidance. Hands-on staff training is included as part of the Founding School Pilot onboarding.',
  },
  {
    question: 'What if we discover an issue after going live?',
    answer:
      'Users can submit issues directly from inside the application using the Report an Issue option, or reach out through our Contact page for assistance.',
  },
];
