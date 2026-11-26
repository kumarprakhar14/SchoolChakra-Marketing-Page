export type ResourceCategory =
  | 'All'
  | 'School Administration'
  | 'Attendance & Academics'
  | 'Fee & Financial Management'
  | 'Digital Transformation'
  | 'School Technology';

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  'All',
  'School Administration',
  'Attendance & Academics',
  'Fee & Financial Management',
  'Digital Transformation',
  'School Technology',
];

export interface ResourceItem {
  id: string;
  category: Exclude<ResourceCategory, 'All'>;
  title: string;
  excerpt: string;
  status: 'upcoming' | 'published';
  publishedAt?: string;
  readingTime?: string;
}

/**
 * Maintainable resource listing.
 * Topics with status === 'upcoming' reflect planned editorial topics whose full articles are not yet published.
 */
export const RESOURCE_ITEMS: ResourceItem[] = [
  {
    id: 'excel-to-school-management-system',
    category: 'Digital Transformation',
    title: 'Moving from Excel to a School Management System',
    excerpt:
      'Key preparation steps for consolidating scattered student rosters, attendance logs, and fee sheets before migrating to a unified platform.',
    status: 'upcoming',
  },
  {
    id: 'checklist-digitizing-student-records',
    category: 'School Administration',
    title: 'A Practical Checklist for Digitizing Student Records',
    excerpt:
      'How to standardize student identifiers, class-section mappings, and contact details so CSV imports validate cleanly.',
    status: 'upcoming',
  },
  {
    id: 'reduce-errors-school-fee-management',
    category: 'Fee & Financial Management',
    title: 'How to Reduce Errors in School Fee Management',
    excerpt:
      'Structured invoicing, clear payment mode tracking, and verifying UPI UTR references before issuing receipts.',
    status: 'upcoming',
  },
  {
    id: 'attendance-records-beyond-spreadsheets',
    category: 'Attendance & Academics',
    title: 'Why Attendance Records Need More Than a Spreadsheet',
    excerpt:
      'Preventing accidental register changes with draft-and-lock workflows, working-day calculations, and low-attendance alerts.',
    status: 'upcoming',
  },
  {
    id: 'preparing-school-new-academic-year',
    category: 'School Administration',
    title: 'Preparing Your School for a New Academic Year',
    excerpt:
      'Structuring classes, sections, subject codes, academic calendars, and clash-free weekly timetables before term starts.',
    status: 'upcoming',
  },
  {
    id: 'considerations-choosing-school-erp',
    category: 'School Technology',
    title: 'What to Consider Before Choosing a School ERP',
    excerpt:
      'Evaluating role separation, data ownership, migration support, and operational clarity for administrators, teachers, students, and accounts teams.',
    status: 'upcoming',
  },
];
