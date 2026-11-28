import type { HelpArticle } from './types';

export const COMMON_HELP_ARTICLES: HelpArticle[] = [
  {
    slug: 'global-search',
    category: 'common-help',
    group: 'Shared Tools & Settings',
    title: 'Using Global Search',
    summary:
      'Quickly find students, staff, notices, assignments, invoices, or payments from the top header search bar.',
    audience: ['All Roles'],
    accessPath: 'Top Header Bar → Search input ("Search by names, ERP Id or notices...")',
    keywords: [
      'search',
      'global search',
      'find student',
      'erp id',
      'find invoice',
      'keyboard',
      'navbar',
    ],
    understanding: {
      whatItIs:
        'Global Search is the persistent search box at the top of SchoolChakra that searches across multiple record types at once, scoped strictly to what your role is permitted to view.',
      whyYouNeedIt:
        'Instead of opening separate pages to look up an ERP ID, notice, or fee invoice, you can jump straight to matching results from any screen.',
      whatItProvides: [
        'School Admin: searches Students, Teachers, Admins, Accounts staff, Invoices, Payments, and Notices.',
        'Teacher: searches Students, Teachers, Teacher-targeted notices, and assignments you created.',
        'Student: searches Student-targeted notices and assignments in your section.',
        'Accounts: searches Students, Invoices, and Payments.',
      ],
    },
    interfaceOverview: {
      elements: [
        {
          name: 'Search Input',
          kind: 'Form Field',
          description:
            'Located in the top header with placeholder "Search by names, ERP Id or notices...". Begins searching once you type at least 3 characters.',
        },
        {
          name: 'Search Results Dropdown',
          kind: 'Menu',
          description:
            'Groups matching records by category and prioritizes exact ERP ID and exact name/title matches first.',
        },
      ],
    },
    instructions: [
      {
        steps: [
          {
            title: 'Type at least 3 characters',
            location: 'Top Header Search Bar',
            requiredInfo: 'Minimum 3 characters (name, ERP ID, notice title, invoice number, etc.).',
            instruction:
              'Click the search bar at the top of the screen and enter your search term.',
            expectedResult: 'Matching results appear in a dropdown list below the search bar.',
          },
          {
            title: 'Navigate and select a result',
            instruction:
              'Click a result with your mouse, or use the Up/Down arrow keys and press Enter to open the highlighted item. Press Escape to close the dropdown.',
            expectedResult:
              'Notices open on the Dashboard, assignments open Assignments, invoices/payments open Fees, and for School Admins, user results open that user’s profile page.',
          },
        ],
      },
    ],
    notes: [
      {
        type: 'restriction',
        title: 'Clicking student or teacher results as Teacher or Accounts',
        body: 'Teachers and Accounts staff can see matching student and teacher names in search results, but detailed user profile pages are reserved for School Admins—clicking a person result does not open a profile page for non-admin roles.',
      },
      {
        type: 'info',
        title: 'Minimum character rule',
        body: 'Typing 1 or 2 characters will not trigger a search. Enter at least 3 characters to view results.',
      },
    ],
    expectedOutcome: {
      summary: 'You locate matching school records quickly without browsing manually through multiple menus.',
      verifyAt: 'The relevant module opens when you select a permitted result.',
    },
    relatedSlugs: [
      { category: 'getting-started', slug: 'navigating-the-workspace', reason: 'Overview of the top header and sidebar.' },
      { category: 'school-admin', slug: 'user-management', reason: 'Full user search and profile management for Admins.' },
    ],
  },
  {
    slug: 'notifications-center',
    category: 'common-help',
    group: 'Shared Tools & Settings',
    title: 'Managing Notifications & Alerts',
    summary:
      'Stay updated on new notices, assignments, fee invoices, and UPI payment verification updates through the Notification Bell and Notification Center.',
    audience: ['All Roles'],
    accessPath: 'Top Header → Notification Bell, or Profile Menu → Notification History',
    keywords: [
      'notifications',
      'bell',
      'unread',
      'mark all as read',
      'alerts',
      'history',
      'push notifications',
    ],
    understanding: {
      whatItIs:
        'SchoolChakra delivers in-app alerts whenever relevant notices, assignments, fee invoices, payments, or UPI verification updates occur for your account.',
      whyYouNeedIt:
        'Checking the Notification Bell or Notification Center ensures you never miss a newly posted assignment, fee receipt, or school announcement.',
      whatItProvides: [
        'Unread count badge on the top-right Notification Bell (displays 99+ when above 99).',
        'Quick popover showing your 5 most recent notifications.',
        'Full Notification Center timeline grouped into Today, Yesterday, This Week, and Older.',
      ],
    },
    interfaceOverview: {
      elements: [
        {
          name: 'Notification Bell',
          kind: 'Button',
          description: 'Top-right bell icon showing a red unread badge when unread alerts exist.',
        },
        {
          name: 'Notification Popover',
          kind: 'Menu',
          description:
            'Shows up to 5 recent notifications with title, 2-line preview, unread dot, and relative time. Clicking an item opens its related module.',
        },
        {
          name: 'View All Notifications →',
          kind: 'Link',
          description: 'Footer link inside the bell popover that opens the full Notification Center.',
        },
        {
          name: 'Mark all as read',
          kind: 'Button',
          description:
            'Appears in the Notification Center header whenever unread alerts remain loaded.',
        },
      ],
    },
    instructions: [
      {
        steps: [
          {
            title: 'Open recent alerts from the Notification Bell',
            location: 'Top-right Header',
            instruction: 'Click the Bell icon to view your 5 latest notifications.',
            expectedResult:
              'Opening the popover automatically marks those 5 displayed items as read and updates your unread badge.',
          },
          {
            title: 'Jump directly to the related module',
            location: 'Inside the Notification Popover or Notification Center',
            instruction:
              'Click any notification item (such as an assignment, notice, invoice, or payment alert).',
            expectedResult:
              'You are navigated directly to the Dashboard for notices, Assignments for homework, or Fees for invoice/payment alerts.',
          },
          {
            title: 'Review older alerts in Notification Center',
            location: 'Notification Popover → View All Notifications → (or Profile Menu → Notification History)',
            instruction:
              'Scroll through Today, Yesterday, This Week, and Older groups, or click Mark all as read to clear remaining unread badges.',
            expectedResult: 'All loaded unread notifications lose their NEW badge.',
          },
        ],
      },
    ],
    notes: [
      {
        type: 'info',
        title: 'Browser notification permission',
        body: 'Inside the Notification Bell popover, you can see whether browser notifications are currently enabled or blocked in your browser settings.',
      },
    ],
    expectedOutcome: {
      summary: 'You stay current with school updates and clear unread alert badges cleanly.',
      verifyAt: 'The red unread badge on the Notification Bell clears and items in Notification Center no longer show the NEW badge.',
    },
    relatedSlugs: [
      { category: 'common-help', slug: 'global-search', reason: 'Search notices and assignments directly.' },
      { category: 'common-help', slug: 'profile-and-sign-out', reason: 'Access Notification History from the Profile Menu.' },
    ],
  },
  {
    slug: 'profile-and-sign-out',
    category: 'common-help',
    group: 'Shared Tools & Settings',
    title: 'Viewing Your Profile & Signing Out',
    summary:
      'Review your ERP ID, school details, and role assignments on My Profile, and safely sign out of SchoolChakra.',
    audience: ['All Roles'],
    accessPath: 'Top-right Profile Menu → My Profile / Log out',
    keywords: [
      'profile',
      'my profile',
      'erp id',
      'logout',
      'sign out',
      'edit profile',
      'class and section',
      'assigned sections',
    ],
    understanding: {
      whatItIs:
        'The Profile Menu in the top-right corner gives you access to your personal My Profile screen, Notification History, School Settings (for School Admins), and Sign Out.',
      whyYouNeedIt:
        'Use My Profile to verify your ERP ID, school code, and assigned class or sections, and always sign out when using a shared school computer.',
      whatItProvides: [
        'Account Details card displaying your ERP ID, School & Code, and Role.',
        'Role-specific details: Teachers see Designation and Assigned Sections; Students see Class & Section.',
        'Safe sign-out confirmation dialog to prevent accidental logouts.',
      ],
    },
    interfaceOverview: {
      elements: [
        {
          name: 'Profile Menu Trigger',
          kind: 'Button',
          description: 'Top-right button showing your avatar, name, and role label.',
        },
        {
          name: 'My Profile',
          kind: 'Menu',
          description: 'Opens your personal profile summary page.',
        },
        {
          name: 'Account Details Card',
          kind: 'Card',
          description: 'Shows your read-only ERP ID, School & Code, and Role.',
        },
        {
          name: 'Log out',
          kind: 'Menu',
          description: 'Opens a Sign Out confirmation dialog before clearing your session.',
        },
      ],
    },
    instructions: [
      {
        groupTitle: 'Viewing Your Profile',
        steps: [
          {
            title: 'Open My Profile',
            location: 'Top-right Profile Menu',
            instruction: 'Click your name/avatar in the top-right corner and select My Profile.',
            expectedResult:
              'Your profile page opens with your avatar (click it to enlarge if a photo is set), ERP ID, School & Code, and role-specific details.',
          },
        ],
      },
      {
        groupTitle: 'Signing Out',
        steps: [
          {
            title: 'Choose Log out',
            location: 'Top-right Profile Menu',
            instruction: 'Click your name/avatar in the top-right corner and select Log out.',
            expectedResult: 'A Sign Out confirmation dialog appears.',
          },
          {
            title: 'Confirm Sign Out',
            instruction: 'Confirm in the dialog to end your current session.',
            expectedResult: 'Your session closes and you return to the Login screen.',
          },
        ],
      },
    ],
    notes: [
      {
        type: 'restriction',
        title: 'Read-only profiles for Teachers, Students, and Accounts',
        body: 'Teachers, Students, and Accounts users cannot edit their own profile fields directly. You will see a notice asking you to contact your School Administrator to update your profile details.',
      },
      {
        type: 'info',
        title: 'School Admins updating user profiles',
        body: 'School Administrators manage and update staff and student profile details—including photos, names, contacts, and class/section assignments—from Users in the sidebar.',
      },
    ],
    expectedOutcome: {
      summary: 'You can verify your school account details anytime and sign out securely when finished.',
      verifyAt: 'After signing out, you are returned to the SchoolChakra login screen.',
    },
    relatedSlugs: [
      { category: 'getting-started', slug: 'logging-in', reason: 'How to sign back in with your ERP ID.' },
      { category: 'school-admin', slug: 'user-management', reason: 'For Admins: how to update student and staff profiles.' },
    ],
  },
  {
    slug: 'reporting-issues',
    category: 'common-help',
    group: 'Shared Tools & Settings',
    title: 'Reporting an Issue in SchoolChakra',
    summary:
      'Submit a bug report with a description and optional screenshots directly from the sidebar without leaving the application.',
    audience: ['All Roles'],
    accessPath: 'Left Sidebar → Found a bug? card → Report an Issue',
    keywords: [
      'bug',
      'report an issue',
      'support',
      'screenshot',
      'error',
      'help',
      'feedback',
    ],
    understanding: {
      whatItIs:
        'The Report an Issue tool lets any signed-in user send a structured problem report—including screenshots—straight from the sidebar.',
      whyYouNeedIt:
        'If a screen does not behave as expected or shows an error, reporting it in-app captures the details cleanly so the product team can investigate.',
      whatItProvides: [
        'Quick access from the bottom of the left sidebar on every signed-in page.',
        'Title and step-by-step description fields.',
        'Drag-and-drop or file picker upload for up to 3 supporting screenshots.',
      ],
    },
    interfaceOverview: {
      elements: [
        {
          name: 'Report an Issue',
          kind: 'Button',
          description: 'Located inside the "Found a bug?" card near the bottom of the left sidebar.',
        },
        {
          name: 'Issue Title',
          kind: 'Form Field',
          description: 'Required short summary of the problem (e.g., "Cannot view student profile").',
        },
        {
          name: 'Description',
          kind: 'Form Field',
          description: 'Required multi-line field for steps to reproduce the issue.',
        },
        {
          name: 'Screenshots (Optional)',
          kind: 'Form Field',
          description: 'Attach up to 3 image files (JPG, JPEG, PNG) or documents; removable before submitting.',
        },
        {
          name: 'Submit Report',
          kind: 'Button',
          description: 'Sends your report and displays a confirmation toast.',
        },
      ],
    },
    instructions: [
      {
        steps: [
          {
            title: 'Open the issue report modal',
            location: 'Bottom of the Left Sidebar',
            instruction: 'Click Report an Issue inside the "Found a bug?" card.',
            expectedResult: 'The Report an Issue dialog opens over your current page.',
          },
          {
            title: 'Describe what happened',
            requiredInfo: 'Issue Title (required) and Description (required).',
            instruction:
              'Enter a clear Issue Title and describe the steps you took before the problem occurred.',
            expectedResult: 'Both required fields are populated.',
          },
          {
            title: 'Attach screenshots (optional)',
            requiredInfo: 'Up to 3 image files.',
            instruction:
              'Drag and drop screenshots into the upload box or click to choose up to 3 files. Remove any unwanted file with its X button.',
            expectedResult: 'Selected filenames appear as chips below the upload area.',
          },
          {
            title: 'Submit your report',
            instruction: 'Click Submit Report.',
            expectedResult:
              'A confirmation toast ("Bug report submitted successfully! Thank you.") appears and the dialog closes.',
          },
        ],
      },
    ],
    notes: [
      {
        type: 'warning',
        title: 'Maximum 3 screenshots',
        body: 'Selecting more than 3 screenshots shows a warning message. Keep attachments to 3 clear screenshots.',
      },
    ],
    expectedOutcome: {
      summary: 'Your issue report and attached screenshots are logged for review without interrupting your session.',
      verifyAt: 'Look for the confirmation toast and verify you remain on your current page.',
    },
    relatedSlugs: [
      { category: 'getting-started', slug: 'navigating-the-workspace', reason: 'Locate all sidebar utility cards.' },
    ],
  },
];
