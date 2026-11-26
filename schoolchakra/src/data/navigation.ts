export interface NavDropdownItem {
  label: string;
  description: string;
  to: string;
}

export interface NavGroup {
  id: string;
  label: string;
  to?: string;
  items?: NavDropdownItem[];
}

export const OPEN_APP_URL = 'https://erp.kumarprakhar.online';

export const HEADER_NAV_GROUPS: NavGroup[] = [
  {
    id: 'product',
    label: 'Product',
    items: [
      {
        label: 'Overview',
        description: 'See how SchoolChakra brings everyday school work together.',
        to: '/',
      },
      {
        label: 'Features',
        description: 'Explore attendance, timetables, assignments, fees, and reports.',
        to: '/features',
      },
      {
        label: 'Interactive Demo',
        description: 'Try the live SchoolChakra workspace preview.',
        to: '/demo',
      },
      {
        label: 'Security',
        description: 'School-level data isolation, role boundaries, and safeguards.',
        to: '/security',
      },
    ],
  },
  {
    id: 'solutions',
    label: 'Solutions',
    items: [
      {
        label: 'For School Administrators',
        description: 'School-wide visibility, setup, academic planning, and reports.',
        to: '/solutions#admin',
      },
      {
        label: 'For Teachers',
        description: 'Scoped attendance registers, timetables, and assignments.',
        to: '/solutions#teacher',
      },
      {
        label: 'For Students',
        description: 'Timetables, homework uploads, notices, and fee receipts.',
        to: '/solutions#student',
      },
      {
        label: 'For Accounts Teams',
        description: 'Fee invoices, UPI UTR verification, and collection reports.',
        to: '/solutions#accounts',
      },
    ],
  },
  {
    id: 'pricing',
    label: 'Pricing',
    to: '/pricing',
  },
  {
    id: 'resources',
    label: 'Resources',
    items: [
      {
        label: 'Getting Started',
        description: 'Onboarding steps, preparation checklist, and data migration.',
        to: '/getting-started',
      },
      {
        label: 'Pilot Program',
        description: 'Explore, test, and share feedback free of cost with no commitment.',
        to: '/pilot-program',
      },
      {
        label: 'Help Center',
        description: 'Role-based guides and everyday operational help.',
        to: '/help',
      },
      {
        label: 'Resources',
        description: 'Practical guides on school administration and digital workflows.',
        to: '/resources',
      },
      {
        label: 'Changelog',
        description: 'Product updates, improvements, and refinements.',
        to: '/changelog',
      },
    ],
  },
  {
    id: 'company',
    label: 'Company',
    items: [
      {
        label: 'About',
        description: 'Why SchoolChakra exists and how we approach school software.',
        to: '/about',
      },
      {
        label: 'Contact',
        description: 'Reach out for a walkthrough, pricing question, or migration.',
        to: '/contact',
      },
    ],
  },
];

export const FOOTER_COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Features', to: '/features' },
      { label: 'Demo', to: '/demo' },
      { label: 'Security', to: '/security' },
      { label: 'Pricing', to: '/pricing' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Administrators', to: '/solutions#admin' },
      { label: 'Teachers', to: '/solutions#teacher' },
      { label: 'Students', to: '/solutions#student' },
      { label: 'Accounts Teams', to: '/solutions#accounts' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Getting Started', to: '/getting-started' },
      { label: 'Pilot Program', to: '/pilot-program' },
      { label: 'Help Center', to: '/help' },
      { label: 'Resources', to: '/resources' },
      { label: 'Changelog', to: '/changelog' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Contact', to: '/contact' },
    ],
  },
] as const;
