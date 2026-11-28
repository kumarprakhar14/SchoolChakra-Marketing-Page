import type { HelpArticle } from './types';

export const GETTING_STARTED_ARTICLES: HelpArticle[] = [
  {
    slug: 'intro-to-schoolchakra',
    category: 'getting-started',
    group: 'First Steps',
    title: 'Introduction to SchoolChakra & Role Workspaces',
    summary:
      'Understand how SchoolChakra organizes school operations into four focused workspaces based on your assigned school role.',
    audience: ['All Roles'],
    accessPath: 'Sign-in screen → Automatic role workspace redirect',
    keywords: [
      'introduction',
      'roles',
      'workspaces',
      'erp id',
      'school admin',
      'teacher',
      'student',
      'accounts',
      'getting started',
    ],
    understanding: {
      whatItIs:
        'SchoolChakra is a school management platform where principals, teachers, students, and accounts staff sign in to the same portal and automatically see only the tools relevant to their daily responsibilities.',
      whyYouNeedIt:
        'Role-based separation keeps sensitive fee records, administrative setup, and classroom registers organized while preventing accidental edits to areas outside your role.',
      whatItProvides: [
        'School Admin workspace for campus setup, users, bulk imports, academic calendar, timetables, attendance, assignments, fees, and reports.',
        'Teacher workspace for daily attendance, personal timetables, assigned class rosters, homework assignments, and announcements.',
        'Student workspace for daily attendance status, notices, subjects, weekly timetable, assignment submissions, and fee/UPI payments.',
        'Accounts workspace for financial KPIs, student fee summaries, invoicing, payment recording, UPI verification, PDF receipts, and Fee Insights.',
      ],
    },
    interfaceOverview: {
      intro: 'Each user signs in with a school-issued ERP ID and opens a workspace scoped to their role.',
      elements: [
        {
          name: 'ERP ID',
          kind: 'Form Field',
          description:
            'A unique school identifier assigned to every student, teacher, accountant, and administrator (for example, STU001 or your school code followed by a number).',
        },
        {
          name: 'Left Sidebar',
          kind: 'Menu',
          description:
            'Displays your school name or logo at the top and only the navigation links available to your role.',
        },
        {
          name: 'Dashboard Home',
          kind: 'Card',
          description:
            'Your primary landing screen after login, showing today’s date, Academic Calendar status, notices, and role-specific priorities.',
        },
      ],
    },
    instructions: [
      {
        steps: [
          {
            title: 'Confirm your school role and ERP ID',
            instruction:
              'Obtain your ERP ID and initial password from your School Administrator before your first session.',
            expectedResult: 'You have the credentials needed to sign in to the correct school and role.',
          },
          {
            title: 'Sign in at the login screen',
            location: 'Login page',
            instruction:
              'Enter your ERP ID and password, then click Sign in.',
            expectedResult:
              'SchoolChakra detects your school branding and opens your role-specific Dashboard automatically.',
          },
          {
            title: 'Review your sidebar menu',
            location: 'Left navigation sidebar',
            instruction:
              'Check the available links on the left side of the screen (on mobile, tap the menu icon in the top-left corner) to explore your accessible modules.',
            expectedResult: 'You can jump directly to any module permitted for your role.',
          },
        ],
      },
    ],
    notes: [
      {
        type: 'info',
        title: 'Each school has its own branding and data',
        body: 'Once you log in, SchoolChakra applies your school’s logo and accent color across buttons and menus, and keeps all records isolated to your school.',
      },
    ],
    expectedOutcome: {
      summary:
        'You understand which workspace you belong to and how your ERP ID connects you to your school’s data.',
      verifyAt: 'Check your name and role label in the top-right Profile Menu after logging in.',
    },
    relatedSlugs: [
      { category: 'getting-started', slug: 'logging-in', reason: 'Step-by-step instructions for signing in.' },
      {
        category: 'getting-started',
        slug: 'navigating-the-workspace',
        reason: 'Learn how the sidebar, search bar, and notifications work.',
      },
    ],
  },
  {
    slug: 'logging-in',
    category: 'getting-started',
    group: 'First Steps',
    title: 'Logging In to Your SchoolChakra Account',
    summary:
      'Sign in using your school-issued ERP ID and password, and learn how to handle common login messages.',
    audience: ['All Roles'],
    accessPath: 'Application Login Screen',
    prerequisites: ['An active SchoolChakra account with an ERP ID and password issued by your School Admin.'],
    keywords: [
      'login',
      'sign in',
      'password',
      'erp id',
      'default password',
      'locked out',
      'rate limit',
      'expired',
      'first login',
    ],
    understanding: {
      whatItIs:
        'The login screen is the entry point for all School Admins, Teachers, Students, and Accounts staff.',
      whyYouNeedIt:
        'Signing in verifies your identity, loads your school’s custom theme and logo, and opens the dashboard assigned to your role.',
      whatItProvides: [
        'Direct sign-in using only your ERP ID and password—no separate school code field is required.',
        'A View User Guide button right on the login screen so you can check instructions before signing in.',
        'Automatic redirect to your intended page if you opened a direct link while signed out.',
      ],
    },
    interfaceOverview: {
      elements: [
        {
          name: 'ERP ID',
          kind: 'Form Field',
          description: 'Required text input for your school-assigned ID (for example, STU001).',
        },
        {
          name: 'Password',
          kind: 'Form Field',
          description: 'Required masked password input.',
        },
        {
          name: 'Sign in',
          kind: 'Button',
          description: 'Authenticates your credentials and opens your role dashboard.',
        },
        {
          name: 'View User Guide',
          kind: 'Button',
          description: 'Opens the built-in user guide without requiring you to log in first.',
        },
        {
          name: 'Notice Banner',
          kind: 'Card',
          description:
            'Dismissible top banner reminding users that issues can be submitted anytime via Report an Issue once logged in.',
        },
      ],
    },
    instructions: [
      {
        steps: [
          {
            title: 'Open the SchoolChakra login page',
            instruction: 'Navigate to your school’s SchoolChakra web address.',
            expectedResult: 'The sign-in card appears with the SchoolChakra logo.',
          },
          {
            title: 'Enter your ERP ID and Password',
            location: 'Sign-In Card',
            requiredInfo: 'Your ERP ID and password (accounts created in bulk or without a custom password start with the default password set during onboarding).',
            instruction: 'Type your ERP ID into the ERP ID field and enter your password in the Password field.',
            expectedResult: 'Both fields are filled and ready for sign-in.',
          },
          {
            title: 'Click Sign in',
            location: 'Bottom of the Sign-In Card',
            instruction: 'Click the Sign in button and wait briefly while your workspace loads.',
            expectedResult:
              'Your school’s theme color is applied and you are redirected to your role dashboard.',
          },
        ],
      },
    ],
    notes: [
      {
        type: 'warning',
        title: 'Login attempt limit',
        body: 'For security, there is a limit of 10 login attempts per 15 minutes from the same network address. If you see a "Too many login attempts" message, wait 15 minutes before trying again.',
      },
      {
        type: 'restriction',
        title: 'Disabled, archived, or expired accounts',
        body: 'If your account is disabled or archived, or if your school’s subscription has expired (for Teachers, Students, and Accounts staff), sign-in is blocked with an explanatory message. Contact your School Administrator for assistance.',
      },
    ],
    expectedOutcome: {
      summary: 'You are signed in and viewing your role’s Dashboard with your school’s logo and theme applied.',
      verifyAt: 'Confirm your school name appears at the top of the left sidebar and your name appears in the top-right profile button.',
    },
    relatedSlugs: [
      { category: 'getting-started', slug: 'navigating-the-workspace', reason: 'Tour the layout you see after logging in.' },
      { category: 'common-help', slug: 'profile-and-sign-out', reason: 'Learn how to view your profile and safely sign out.' },
    ],
  },
  {
    slug: 'navigating-the-workspace',
    category: 'getting-started',
    group: 'First Steps',
    title: 'Understanding the Application Layout',
    summary:
      'Learn where to find the sidebar menu, global search, notification bell, profile menu, and in-app help tools.',
    audience: ['All Roles'],
    accessPath: 'Visible on every signed-in screen',
    keywords: [
      'sidebar',
      'navbar',
      'header',
      'menu',
      'mobile',
      'navigation',
      'layout',
      'school logo',
      'user guide',
    ],
    understanding: {
      whatItIs:
        'Every signed-in page in SchoolChakra shares a consistent frame made up of a left navigation sidebar, a sticky top header bar, and a central workspace area.',
      whyYouNeedIt:
        'Knowing where global controls live lets you switch modules quickly, find records from any screen, and reach notifications or issue reporting without losing your place.',
      whatItProvides: [
        'Persistent left sidebar on desktop and slide-out menu drawer on mobile screens.',
        'Sticky top bar with Global Search, Notification Bell, and your Profile Menu.',
        'Bottom sidebar utility cards for Report an Issue and the built-in User Guide.',
      ],
    },
    interfaceOverview: {
      elements: [
        {
          name: 'School Identity Header',
          kind: 'Card',
          description:
            'Top of the left sidebar showing your school’s uploaded logo (or initial icon) and truncated school name.',
        },
        {
          name: 'Role Navigation Menu',
          kind: 'Menu',
          description:
            'Lists only the modules available to your role, with a highlighted active bar on the page you are currently viewing.',
        },
        {
          name: 'Mobile Menu Toggle',
          kind: 'Button',
          description:
            'Hamburger icon at the top-left on smaller screens that opens and closes the sidebar drawer.',
        },
        {
          name: 'Global Search Bar',
          kind: 'Form Field',
          description:
            'Located in the top header. Type at least 3 characters to search names, ERP IDs, or notices permitted for your role.',
        },
        {
          name: 'Notification Bell',
          kind: 'Button',
          description:
            'Top-right bell icon with an unread badge count. Opens recent alerts and links to Notification Center.',
        },
        {
          name: 'Profile Menu',
          kind: 'Menu',
          description:
            'Top-right button showing your avatar, name, and role. Opens My Profile, Notification History, School Settings (Admins only), and Log out.',
        },
        {
          name: 'Found a bug? / Report an Issue',
          kind: 'Card',
          description: 'Sidebar utility card allowing any signed-in user to submit an issue report with screenshots.',
        },
        {
          name: 'User Guide',
          kind: 'Button',
          description: 'Sidebar button that opens the standalone in-app documentation viewer.',
        },
      ],
    },
    instructions: [
      {
        steps: [
          {
            title: 'Move between modules using the left sidebar',
            location: 'Left Sidebar (or Hamburger menu on mobile)',
            instruction:
              'Click any item in your role menu to open that module. The active page is highlighted in your school’s accent color.',
            expectedResult: 'The main workspace area updates to the selected module.',
          },
          {
            title: 'Use the top header for quick actions anywhere',
            location: 'Top Header Bar',
            instruction:
              'Use the search bar to look up records, click the Bell icon to check recent alerts, or click your profile name on the far right to open My Profile or Log out.',
            expectedResult: 'You can check alerts or search without leaving your current screen.',
          },
        ],
      },
    ],
    notes: [
      {
        type: 'info',
        title: 'Clean printing for PDFs and reports',
        body: 'When printing pages from SchoolChakra, the sidebar and top header hide automatically so only the main content prints.',
      },
    ],
    expectedOutcome: {
      summary: 'You can move comfortably across modules and use global header and sidebar tools on desktop or mobile.',
      verifyAt: 'Click any module in the left sidebar and check that the active highlight moves with you.',
    },
    relatedSlugs: [
      { category: 'common-help', slug: 'global-search', reason: 'Learn what you can search by role.' },
      { category: 'common-help', slug: 'notifications-center', reason: 'See how notifications and unread badges work.' },
      { category: 'common-help', slug: 'reporting-issues', reason: 'Learn how to submit a bug report.' },
    ],
  },
];
