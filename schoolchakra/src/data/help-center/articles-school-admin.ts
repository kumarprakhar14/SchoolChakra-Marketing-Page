import type { HelpArticle } from './types';

export const SCHOOL_ADMIN_ARTICLES: HelpArticle[] = [
  {
    slug: 'admin-dashboard',
    category: 'school-admin',
    group: 'Overview & Setup',
    title: 'School Admin Dashboard & First-Time Setup',
    summary:
      'Use the Setup Mode checklist on a new campus or monitor daily school KPIs, action items, charts, and activity on the operational Dashboard.',
    audience: ['School Admin'],
    accessPath: 'Sidebar → Dashboard',
    keywords: [
      'admin dashboard',
      'setup mode',
      'onboarding checklist',
      'kpi cards',
      'action center',
      'attendance trends',
      'recent campus activities',
      'administrative shortcuts',
    ],
    understanding: {
      whatItIs:
        'The School Admin Dashboard is your command center. When a school is brand new, it opens in Setup Mode with a 5-step onboarding checklist; once classes, teachers, or students exist, it switches to the Operational Dashboard.',
      whyYouNeedIt:
        'It guides new schools through initial setup in the right sequence and helps established schools spot pending attendance, unpaid fees, recent imports, and daily activity in seconds.',
      whatItProvides: [
        'Setup Mode checklist linking straight to Classes & Sections, Users, and Time Table.',
        '6 School Overview KPI cards: Students, Teachers, Classes, Attendance, Collected Fees, and Pending Fees.',
        'School Operational Snapshot and Today’s Action Center with shortcuts to pending attendance, pending fees, notices, and Data Import.',
        'Recent Campus Activities timeline, Student Class Distribution bars, 7-day Attendance Trends chart, Financial Operations progress, Dispatch Announcement, and Administrative Shortcuts.',
      ],
    },
    interfaceOverview: {
      elements: [
        {
          name: 'Campus Setup Checklist (New Schools)',
          kind: 'Card',
          description:
            'Appears when a school has 0 active students, 0 teachers, and 0 classes. Guides you through Classes & Sections, Teachers, Students, Timetable, and your first Notice.',
        },
        {
          name: 'Welcome Banner',
          kind: 'Card',
          description:
            'Shows greeting, school name, today’s date, and today’s Academic Calendar Status badge (Working Day, Holiday, or Vacation).',
        },
        {
          name: 'School Overview KPI Cards',
          kind: 'Card',
          description:
            'Six live metrics summarizing active Students, active Teachers, Classes, today’s Attendance rate, Collected Fees, and Pending Fees.',
        },
        {
          name: 'Today’s Action Center',
          kind: 'Card',
          description:
            'Four cards highlighting Attendance Awaiting (with Mark Attendance →), Pending Fee Records (with Manage Fees →), Recent Notices, and Import Status.',
        },
        {
          name: 'Attendance Trends & Financial Operations',
          kind: 'Chart',
          description:
            '7-day attendance area chart (shown when attendance exists in the last 7 days) and Fee Collection Progress bar (shown when fee records exist).',
        },
        {
          name: 'Administrative Shortcuts',
          kind: 'Card',
          description:
            'Six quick-launch tiles at the bottom for Add Student, Add Teacher, Create Notice, Import Data, Manage Classes, and Manage Timetable.',
        },
      ],
    },
    instructions: [
      {
        groupTitle: 'For a Brand-New School (Setup Mode)',
        steps: [
          {
            title: 'Follow the Campus Setup Checklist in order',
            location: 'Admin Dashboard → Campus Setup Checklist',
            instruction:
              'Start with Set Up Classes to create Classes and Sections, then use Manage Teachers and Manage Students (or Data Import) to onboard your school, followed by Draft Timetable.',
            expectedResult:
              'Steps 1–3 check off automatically as records are added. Once you have data, the Operational Dashboard activates.',
          },
        ],
      },
      {
        groupTitle: 'Daily Campus Monitoring (Operational Dashboard)',
        steps: [
          {
            title: 'Check Welcome Banner and Today’s Action Center',
            location: 'Top of Admin Dashboard',
            instruction:
              'Verify today’s Academic Calendar badge, review the 6 KPI cards, and click Mark Attendance → or Manage Fees → on any pending Action Center card.',
            expectedResult: 'You jump directly to classes awaiting attendance or pending fee records.',
          },
          {
            title: 'Review Recent Campus Activities and Trends',
            location: 'Middle Dashboard columns',
            instruction:
              'Scan Recent Campus Activities for bulk imports, newly published notices, fee payments, and attendance submissions, and hover over Attendance Trends points to see daily percentages.',
            expectedResult: 'You have full visibility into campus activity without opening separate reports.',
          },
        ],
      },
    ],
    notes: [
      {
        type: 'info',
        title: 'Posting your first notice after Setup Mode',
        body: 'The Dispatch Announcement panel appears once your school leaves Setup Mode (after adding your first class, teacher, or student). You can then expand it anytime to publish your first notice.',
      },
    ],
    expectedOutcome: {
      summary: 'You can launch a new school cleanly and monitor daily attendance, fee collection, and campus activity from one screen.',
      verifyAt: 'Confirm your KPI counts and Operational Snapshot update automatically as staff mark attendance and record payments.',
    },
    relatedSlugs: [
      { category: 'school-admin', slug: 'school-settings', reason: 'Set your school logo, theme color, and UPI ID.' },
      { category: 'school-admin', slug: 'academics-classes-sections', reason: 'Create your school’s Classes and Sections first.' },
    ],
  },
  {
    slug: 'school-settings',
    category: 'school-admin',
    group: 'Overview & Setup',
    title: 'Configuring School Branding, Logo & UPI Settings',
    summary:
      'Customize your school’s theme color, logo, and description, and configure the Merchant Name and UPI ID used for student UPI payments.',
    audience: ['School Admin'],
    accessPath: 'Top-right Profile Menu → School Settings',
    keywords: [
      'school settings',
      'logo',
      'theme color',
      'branding',
      'upi id',
      'merchant name',
      'school name',
    ],
    understanding: {
      whatItIs:
        'School Settings lets School Administrators customize how the SchoolChakra workspace looks for everyone in the school and configure the UPI details students pay into.',
      whyYouNeedIt:
        'Uploading your school logo and choosing your brand color personalizes every user’s sidebar and PDF documents, while adding your Merchant Name and School UPI ID enables student UPI fee payments.',
      whatItProvides: [
        'Theme Color picker that immediately updates accent colors across the workspace.',
        'School Logo uploader (supports image files under 2 MB) with Remove Logo option.',
        'School Description text field.',
        'Merchant Name (UPI) and School UPI ID fields powering QR codes and UPI deep links.',
      ],
    },
    interfaceOverview: {
      elements: [
        {
          name: 'School Name',
          kind: 'Form Field',
          description: 'Read-only field displaying your registered school name.',
        },
        {
          name: 'Theme Color',
          kind: 'Form Field',
          description: 'Color picker and hex code input (defaults to blue) that themes accents across the entire school.',
        },
        {
          name: 'School Logo',
          kind: 'Form Field',
          description: 'Upload preview box accepting image files smaller than 2 MB, with a Remove Logo button.',
        },
        {
          name: 'Merchant Name (UPI) & School UPI ID',
          kind: 'Form Field',
          description: 'Your school’s official UPI payee name and UPI VPA (for example, schoolname@okaxis).',
        },
        {
          name: 'Save Changes',
          kind: 'Button',
          description: 'Saves branding and UPI settings and applies the updated logo and theme immediately.',
        },
      ],
    },
    instructions: [
      {
        steps: [
          {
            title: 'Open School Settings',
            location: 'Top-right Profile Menu → School Settings',
            instruction: 'Click your name/avatar in the top-right corner and select School Settings.',
            expectedResult: 'The School Settings form opens.',
          },
          {
            title: 'Update branding and description',
            requiredInfo: 'Optional Logo image under 2 MB, Theme Color, and School Description.',
            instruction:
              'Select your Theme Color, drag or upload a School Logo under 2 MB, and enter a brief School Description.',
            expectedResult: 'Logo preview and color selection update on screen.',
          },
          {
            title: 'Configure UPI payment details',
            requiredInfo: 'Merchant Name (UPI) and School UPI ID (required for student Pay via UPI).',
            instruction:
              'Enter your school’s Merchant Name (UPI) and official School UPI ID.',
            expectedResult: 'Both UPI fields are populated accurately.',
          },
          {
            title: 'Save Changes',
            instruction: 'Click Save Changes at the bottom of the form.',
            expectedResult:
              'Your theme color updates across SchoolChakra right away, your logo appears in the left sidebar and PDFs, and students can pay invoices via UPI.',
          },
        ],
      },
    ],
    notes: [
      {
        type: 'restriction',
        title: 'School Name is read-only',
        body: 'To change your school’s registered School Name, contact platform support or your onboarding coordinator.',
      },
      {
        type: 'warning',
        title: 'Logo size limit and UPI requirement',
        body: 'Logo uploads larger than 2 MB are rejected. Also, if School UPI ID is left blank, students clicking Pay via UPI will see a message asking them to contact administration.',
      },
    ],
    expectedOutcome: {
      summary: 'Your school workspace reflects your branding and is ready to accept student UPI submissions.',
      verifyAt: 'Check the top of the left sidebar for your updated logo and accent color.',
    },
    relatedSlugs: [
      { category: 'student', slug: 'student-upi-payments', reason: 'See how students use your configured UPI ID.' },
      { category: 'school-admin', slug: 'admin-fees-overview', reason: 'Verify incoming student UPI proofs in Fees.' },
    ],
  },
  {
    slug: 'academic-calendar',
    category: 'school-admin',
    group: 'Overview & Setup',
    title: 'Managing the Academic Calendar & Holidays',
    summary:
      'Declare holidays, vacations, and special working days so your Dashboard status and Attendance reports count working days accurately.',
    audience: ['School Admin'],
    accessPath: 'Sidebar → Academic Calendar',
    keywords: [
      'academic calendar',
      'holiday',
      'vacation',
      'working day',
      'override',
      'calendar',
      'working days',
    ],
    understanding: {
      whatItIs:
        'By default, SchoolChakra treats Monday through Saturday as Working Days and Sunday as a Holiday. Academic Calendar lets you add date overrides for exceptions.',
      whyYouNeedIt:
        'Declaring festival holidays, summer vacations, or special working Sundays updates today’s status badge on every Dashboard and ensures Attendance Insights calculates working days and percentages accurately.',
      whatItProvides: [
        'Month filter to inspect overrides for a specific month.',
        '+ Add Override modal supporting Working Day, Holiday, and Vacation date ranges.',
        'Edit and Delete actions on existing calendar overrides.',
      ],
    },
    interfaceOverview: {
      elements: [
        {
          name: 'Month Picker',
          kind: 'Filter',
          description: 'Filters the overrides table to a selected month.',
        },
        {
          name: '+ Add Override',
          kind: 'Button',
          description: 'Opens the modal to declare a Working Day, Holiday, or Vacation.',
        },
        {
          name: 'Overrides Table',
          kind: 'Table',
          description: 'Displays Start Date, End Date, color-coded Status badge (WORKING, HOLIDAY, VACATION), Reason, and Edit/Delete actions.',
        },
      ],
    },
    instructions: [
      {
        steps: [
          {
            title: 'Open Academic Calendar',
            location: 'Left Sidebar → Academic Calendar',
            instruction: 'Click Academic Calendar in the sidebar.',
            expectedResult: 'The default Mon–Sat / Sun rule notice and overrides table load.',
          },
          {
            title: 'Click + Add Override',
            location: 'Top-right of Academic Calendar',
            instruction: 'Click + Add Override to open the override form.',
            expectedResult: 'The Add Override dialog opens.',
          },
          {
            title: 'Select Status Type, Dates, and Reason',
            requiredInfo: 'Status Type (Working Day, Holiday, or Vacation), Start Date (today or future), End Date (for Vacation), and Reason / Occasion (required for Holiday and Vacation).',
            instruction:
              'Choose the Status Type, pick the Start Date (and End Date if Vacation), and enter the Reason / Occasion.',
            expectedResult: 'For Working Day and Holiday, End Date matches Start Date automatically.',
          },
          {
            title: 'Save Override',
            instruction: 'Click Save Override.',
            expectedResult:
              'The new override row appears in the table with its status badge, and today’s Welcome Banner updates if the override covers today.',
          },
        ],
      },
    ],
    notes: [
      {
        type: 'restriction',
        title: 'Future/current dates and no overlapping ranges',
        body: 'Start Date cannot be in the past, and overlapping date ranges with an existing override are blocked.',
      },
    ],
    expectedOutcome: {
      summary: 'Your school calendar reflects planned holidays, vacations, and special working days.',
      verifyAt: 'Check the overrides table and confirm Attendance Insights Working Days reflect your calendar.',
    },
    relatedSlugs: [
      { category: 'school-admin', slug: 'reports-and-insights', reason: 'See how Academic Calendar affects Attendance Insights.' },
      { category: 'school-admin', slug: 'admin-notices', reason: 'Announce an upcoming holiday on the Notice Board.' },
    ],
  },
  {
    slug: 'user-management',
    category: 'school-admin',
    group: 'People & Onboarding',
    title: 'Adding & Managing Students, Teachers & Staff',
    summary:
      'Create individual user accounts with auto-generated ERP IDs, update profiles and section assignments, or disable and archive accounts safely.',
    audience: ['School Admin'],
    accessPath: 'Sidebar → Users',
    prerequisites: ['Create Classes and Sections in Academics before adding Students or assigning sections to Teachers.'],
    keywords: [
      'users',
      'add user',
      'add student',
      'add teacher',
      'erp id',
      'disable user',
      'archive user',
      'restore user',
      'edit profile',
      'primary admin',
    ],
    understanding: {
      whatItIs:
        'User Management is the central directory for creating, searching, editing, disabling, and archiving Student, Teacher, Accounts, and School Admin profiles.',
      whyYouNeedIt:
        'Every person who signs in to SchoolChakra needs an account here with an ERP ID, role, and (for Students and Teachers) class/section assignments.',
      whatItProvides: [
        'Search by name or ERP ID and toggleable role filter pills (ADMIN, TEACHER, STUDENT, ACCOUNTS).',
        '+ Add User modal that auto-generates sequential ERP IDs on creation.',
        'Dedicated user detail view for inline editing of photo, name, role, phone/contact, Teacher designation/sections, or Student class/section.',
        'Non-destructive Disable/Enable and Archive/Restore controls so historical attendance and fee records stay intact.',
      ],
    },
    interfaceOverview: {
      elements: [
        {
          name: '+ Add User',
          kind: 'Button',
          description: 'Opens the Add User modal to create a Student, Teacher, Accounts staff member, or Admin.',
        },
        {
          name: 'Search & Role Filter Pills',
          kind: 'Filter',
          description: 'Search by user name or ERP ID, or toggle ADMIN, TEACHER, STUDENT, or ACCOUNTS pills (click again to clear).',
        },
        {
          name: 'Users Table',
          kind: 'Table',
          description: 'Shows User avatar and clickable name, ERP ID badge, Role & status badge (Active, Disabled, Archived), Details, and lifecycle Actions.',
        },
        {
          name: 'Lifecycle Action Buttons',
          kind: 'Button',
          description: 'Disable / Enable and Archive / Restore buttons on each non-primary user row.',
        },
      ],
    },
    instructions: [
      {
        groupTitle: 'Creating a New User',
        steps: [
          {
            title: 'Open Users and click + Add User',
            location: 'Left Sidebar → Users → + Add User',
            instruction: 'Navigate to Users and click + Add User at the top right.',
            expectedResult: 'The Add User modal opens.',
          },
          {
            title: 'Enter name, optional password, and role',
            requiredInfo: 'Full Name (required), Password (optional—minimum 6 characters if provided, otherwise uses default password), and Role.',
            instruction:
              'Type the user’s Full Name, optionally set a Password (at least 6 characters), and choose STUDENT, TEACHER, ACCOUNTS, or ADMIN.',
            expectedResult: 'Role-specific class or section fields appear underneath.',
          },
          {
            title: 'Complete role-specific assignments',
            instruction:
              'For a Student, select Class and Section (required). For a Teacher, optionally enter a Designation (defaults to Teacher) and check Assign Sections.',
            expectedResult: 'All required fields are filled.',
          },
          {
            title: 'Create the account and note the ERP ID',
            instruction: 'Click Create User and note the auto-generated ERP ID shown in the confirmation toast.',
            expectedResult: 'The user is created and appears in the Users list ready to sign in.',
          },
        ],
      },
      {
        groupTitle: 'Editing, Disabling, or Archiving a User',
        steps: [
          {
            title: 'Open a user’s profile page',
            location: 'Users Table → Click a user’s name (or select them from Global Search)',
            instruction: 'Click any user’s name to open their profile detail screen.',
            expectedResult: 'Their editable profile opens (ERP ID and School & Code remain read-only).',
          },
          {
            title: 'Edit fields and click Update Profile',
            instruction:
              'Click the pencil icon next to Name, Role, Phone / Contact, Designation / Assigned Sections, or Class & Section, optionally upload a photo via the camera icon, and click Update Profile.',
            expectedResult: 'Updated details save immediately.',
          },
          {
            title: 'Disable or Archive instead of deleting',
            location: 'Actions column in Users Table',
            instruction:
              'Click Disable to temporarily block sign-in, or Archive to mark the account archived and inactive. Use Enable or Restore later if they return.',
            expectedResult:
              'Archived and disabled accounts stay visible in Users so you can restore them anytime without losing historical attendance or fee records.',
          },
        ],
      },
    ],
    notes: [
      {
        type: 'restriction',
        title: 'Primary Admin protection',
        body: 'Accounts marked Primary Admin cannot be disabled or archived.',
      },
      {
        type: 'info',
        title: 'Password minimum length',
        body: 'If you enter a custom password when adding a user, it must be at least 6 characters long. Leave it blank if you want the default onboarding password assigned.',
      },
    ],
    expectedOutcome: {
      summary: 'Users are onboarded with ERP IDs and accurate class/section mappings, and inactive accounts are safely archived.',
      verifyAt: 'Search the user by name or ERP ID in Users to confirm their active status and role details.',
    },
    relatedSlugs: [
      { category: 'school-admin', slug: 'academics-classes-sections', reason: 'Set up Classes and Sections first.' },
      { category: 'school-admin', slug: 'bulk-data-import', reason: 'Import many students, teachers, or fee records at once.' },
    ],
  },
  {
    slug: 'bulk-data-import',
    category: 'school-admin',
    group: 'People & Onboarding',
    title: 'Importing Students, Teachers & Fees in Bulk',
    summary:
      'Download official spreadsheet templates and import Student, Teacher, or Fee Records from Excel or CSV files with row-level validation.',
    audience: ['School Admin'],
    accessPath: 'Sidebar → Data Import',
    prerequisites: ['For Fee Records import, students must already exist in SchoolChakra.'],
    keywords: [
      'data import',
      'bulk import',
      'csv',
      'excel',
      'xlsx',
      'template',
      'error report',
      'fee import wizard',
    ],
    understanding: {
      whatItIs:
        'Bulk Data Import lets School Administrators upload .xlsx, .xls, or .csv spreadsheets to create Student accounts, Teacher accounts, or historical Fee Records in one operation.',
      whyYouNeedIt:
        'When onboarding a new school or new academic intake, uploading spreadsheets saves hours compared to entering every student and fee ledger manually.',
      whatItProvides: [
        'Three dedicated tabs: Students, Teachers, and Fee Records.',
        'Downloadable CSV templates with exact required column headers.',
        'All-or-nothing validation for Students and Teachers with a downloadable Error Report (CSV) if any row has issues.',
        'A guided Fee Import Wizard showing reconciliation totals before final confirmation.',
      ],
    },
    interfaceOverview: {
      elements: [
        {
          name: 'Mode Tabs (Students / Teachers / Fee Records)',
          kind: 'Tab',
          description: 'Switches between Student import, Teacher import, and the guided Fee Import Wizard.',
        },
        {
          name: 'Download Template',
          kind: 'Button',
          description: 'Downloads the formatted CSV template for the selected tab.',
        },
        {
          name: 'Upload Zone (.xlsx, .xls, .csv)',
          kind: 'Form Field',
          description: 'Drag-and-drop or click to choose your populated spreadsheet file.',
        },
        {
          name: 'Start Import & Results Banner',
          kind: 'Button',
          description: 'Runs validation and import, showing either Records Imported + Time Taken or a Download Error Report (CSV) button.',
        },
      ],
    },
    instructions: [
      {
        groupTitle: 'Importing Students or Teachers',
        steps: [
          {
            title: 'Download the matching template',
            location: 'Left Sidebar → Data Import → Students or Teachers tab',
            instruction: 'Select Students or Teachers and click Download Template.',
            expectedResult:
              'Students template includes Student Name, Class, Section, Contact, Admission Date. Teachers template includes Teacher Name, Designation, Contact, Assigned Sections (e.g., "10-A, 10-B" or "All Sections").',
          },
          {
            title: 'Populate and upload your file',
            requiredInfo: 'Student Name and Class are required for Students; Teacher Name is required for Teachers.',
            instruction:
              'Fill in your rows in Excel or CSV without renaming headers, drag the file into the upload zone, and click Start Import.',
            expectedResult:
              'Missing Classes or Sections are created automatically, sequential ERP IDs are generated, and if any row fails validation, nothing is partially saved—click Download Error Report (CSV) to see exact row and field errors.',
          },
        ],
      },
      {
        groupTitle: 'Importing Fee Records (Fee Import Wizard)',
        steps: [
          {
            title: 'Upload and match student fee rows',
            location: 'Data Import → Fee Records tab',
            requiredInfo: 'Template columns include Total Fee, Amount Paid, Month, Year, and either ERP ID or Student Name.',
            instruction:
              'Download the Fee template, enter each student’s fee details (using ERP ID whenever possible for exact matching), and upload the file.',
            expectedResult:
              'The wizard matches rows by ERP ID first (or Student Name + Class Name + Section) and moves to Financial Reconciliation Preview.',
          },
          {
            title: 'Review Preview totals and confirm',
            instruction:
              'Inspect Total Fee Invoices, Total Paid, and Outstanding Balance in the preview step, then confirm the import.',
            expectedResult:
              'An "Import Successful!" banner confirms invoices and payments are committed, with an Import Another File button ready for additional sheets.',
          },
        ],
      },
    ],
    notes: [
      {
        type: 'warning',
        title: 'Fee validation & matching tips',
        body: 'Rows where Amount Paid is greater than Total Fee are rejected at preview. Always include accurate ERP IDs (or exact Student Name, Class Name, and Section) so every fee row matches cleanly without manual mapping.',
      },
      {
        type: 'info',
        title: 'Empty files',
        body: 'Uploading an empty file is rejected with a "File is empty" error.',
      },
    ],
    expectedOutcome: {
      summary: 'Your student rosters, teachers, or fee balances are imported cleanly with verified totals.',
      verifyAt: 'Open Users, Academics, or Fees to confirm the imported records appear.',
    },
    relatedSlugs: [
      { category: 'school-admin', slug: 'user-management', reason: 'Inspect newly imported users and generated ERP IDs.' },
      { category: 'school-admin', slug: 'admin-fees-overview', reason: 'Review imported invoices and payments in Fees.' },
    ],
  },
  {
    slug: 'academics-classes-sections',
    category: 'school-admin',
    group: 'Academics & Operations',
    title: 'Setting Up Classes, Sections & Student Rosters',
    summary:
      'Create and rename classes and sections, delete unused sections safely, and inspect enrolled students per section.',
    audience: ['School Admin'],
    accessPath: 'Sidebar → Academics',
    keywords: [
      'academics',
      'classes',
      'sections',
      'add class',
      'add section',
      'delete section',
      'student roster',
      'enrollment',
    ],
    understanding: {
      whatItIs:
        'Academics defines the grade/class and section structure of your school (for example, Class 10 with Section A and Section B).',
      whyYouNeedIt:
        'Almost every other module—Student enrollment, Teacher section assignment, Timetables, Attendance, and Assignments—depends on Classes and Sections configured here.',
      whatItProvides: [
        'Class cards showing section count and every section with enrolled student count.',
        'Controls to add or rename Classes and Sections, plus safe Delete Section with confirmation.',
        'Expandable section rows to inspect the student roster (names and ERP IDs).',
      ],
    },
    interfaceOverview: {
      elements: [
        {
          name: '+ Add Class',
          kind: 'Button',
          description: 'Top-right button to create a new Class/Grade.',
        },
        {
          name: 'Class Card',
          kind: 'Card',
          description: 'Shows Class name, inline Edit button, section count pill, Section rows, and + Add Section button.',
        },
        {
          name: 'Section Row',
          kind: 'Button',
          description: 'Click a section row to expand its enrolled student roster, or use its Edit Section / Delete Section icons.',
        },
      ],
    },
    instructions: [
      {
        steps: [
          {
            title: 'Create a Class',
            location: 'Left Sidebar → Academics → + Add Class',
            requiredInfo: 'Unique Class Name (e.g., 10, Nursery).',
            instruction: 'Click + Add Class, enter the Class Name, and save.',
            expectedResult: 'A new Class card appears in the grid.',
          },
          {
            title: 'Add Sections inside the Class',
            location: 'Inside the Class card → + Add Section',
            requiredInfo: 'Unique Section Name within that class (e.g., A, B).',
            instruction: 'Click + Add Section on the Class card, enter the Section Name, and submit.',
            expectedResult: 'The new section row appears with a 0 student count until students are enrolled.',
          },
          {
            title: 'Inspect enrolled students',
            instruction: 'Click any Section row to expand the roster underneath.',
            expectedResult: 'Enrolled students appear with initials, names, and ERP IDs.',
          },
        ],
      },
    ],
    notes: [
      {
        type: 'restriction',
        title: 'Deleting sections with existing records',
        body: 'You cannot delete a section while students, attendance marks, assignments, or timetable entries still reference it. Reassign or remove dependent records first. Also note that entire Classes can be renamed but not deleted from the UI.',
      },
    ],
    expectedOutcome: {
      summary: 'Your school’s class and section hierarchy is established for user enrollment and scheduling.',
      verifyAt: 'Confirm all classes and sections appear in the Academics grid and when adding students in Users.',
    },
    relatedSlugs: [
      { category: 'school-admin', slug: 'user-management', reason: 'Enroll students and assign teachers to your new sections.' },
      { category: 'school-admin', slug: 'timetable-management', reason: 'Build weekly timetables for each section.' },
    ],
  },
  {
    slug: 'timetable-management',
    category: 'school-admin',
    group: 'Academics & Operations',
    title: 'Building Clash-Free Weekly Timetables',
    summary:
      'Add school subjects and period time slots, build Monday–Saturday class schedules inline, and verify teacher workloads.',
    audience: ['School Admin'],
    accessPath: 'Sidebar → Time Table',
    prerequisites: ['Classes, Sections, and Teacher accounts must already exist.'],
    keywords: [
      'timetable',
      'add subject',
      'add period',
      'class view',
      'teacher view',
      'double booking',
      'conflict',
      'weekly schedule',
    ],
    understanding: {
      whatItIs:
        'The Time Table editor lets School Administrators define subjects and daily periods, then click directly into a Monday–Saturday grid to assign a Subject and Teacher to each slot.',
      whyYouNeedIt:
        'Building timetables here drives each Teacher’s personal schedule, each Student’s schedule and subject list, and prevents accidentally booking a teacher into two classes at the same time.',
      whatItProvides: [
        '+ Subject and + Period modals to establish your school’s curriculum subjects and period timings.',
        'Class View inline grid editor for Monday–Saturday across every defined period.',
        'Automatic double-booking prevention if a teacher is already scheduled during that day and period.',
        'Teacher View mode to inspect any teacher’s weekly schedule and Free slots.',
      ],
    },
    interfaceOverview: {
      elements: [
        {
          name: '+ Subject & + Period',
          kind: 'Button',
          description: 'Top-right buttons to create Subjects (name + optional code) and Period time slots (name, start time, end time). Hovering a period row lets you edit its times.',
        },
        {
          name: 'Class View / Teacher View Toggle',
          kind: 'Tab',
          description: 'Switches between editing a specific Class & Section schedule and inspecting a Teacher’s schedule.',
        },
        {
          name: 'Class & Section Dropdowns',
          kind: 'Filter',
          description: 'In Class View, select both Class and Section to enable inline editing of cells.',
        },
        {
          name: 'Timetable Cell (+ Add / Occupied)',
          kind: 'Button',
          description: 'Clicking any cell opens an inline popover to choose Subject and Teacher, Save/Update, or Delete Entry.',
        },
      ],
    },
    instructions: [
      {
        steps: [
          {
            title: 'Create Subjects and Periods first',
            location: 'Left Sidebar → Time Table',
            requiredInfo: 'Subject Name (+ optional Subject Code); Period Name, Start Time, and End Time.',
            instruction:
              'Click + Subject to add your subjects (for example, Mathematics / MAT101), then click + Period to define each period slot (for example, Period 1, 08:00–08:45).',
            expectedResult: 'Your periods appear as rows along the left side of the weekly grid.',
          },
          {
            title: 'Select Class and Section in Class View',
            location: 'Filter bar under Class View',
            instruction: 'Choose both a Class and a Section from the dropdowns.',
            expectedResult: 'Each grid cell becomes clickable with an + Add prompt.',
          },
          {
            title: 'Assign Subject and Teacher to cells',
            location: 'Monday–Saturday grid',
            instruction:
              'Click any cell, pick a Subject and Teacher from the inline popover, and click Save (or Update / Delete if editing an existing slot).',
            expectedResult:
              'The slot displays the Subject and Teacher immediately. If the teacher is already assigned elsewhere in that day and period, a conflict toast warns you and prevents double-booking.',
          },
          {
            title: 'Verify schedules in Teacher View',
            location: 'View mode toggle → Teacher View',
            instruction: 'Switch to Teacher View and choose any Teacher from the dropdown.',
            expectedResult: 'You see that teacher’s full weekly schedule and Free periods in one view.',
          },
        ],
      },
    ],
    notes: [
      {
        type: 'info',
        title: 'Both Class and Section must be selected to edit',
        body: 'In Class View, selecting only a Class previews combined entries, while cell editing enables only after choosing both Class and Section.',
      },
      {
        type: 'info',
        title: 'Double-check Subject and Period entries',
        body: 'Period timings can be edited by hovering over a period in the left column. Subject names cannot be edited or deleted from the interface once created.',
      },
    ],
    expectedOutcome: {
      summary: 'A clash-free weekly timetable is published for Teachers and Students automatically.',
      verifyAt: 'Toggle to Teacher View or check a Student’s Time Table to confirm the assigned slots appear.',
    },
    relatedSlugs: [
      { category: 'teacher', slug: 'teacher-timetable', reason: 'See how Teachers view their weekly schedule.' },
      { category: 'student', slug: 'student-academics-timetable', reason: 'See how timetable entries populate Student subjects.' },
    ],
  },
  {
    slug: 'admin-notices',
    category: 'school-admin',
    group: 'Academics & Operations',
    title: 'Publishing & Managing School Notices',
    summary:
      'Broadcast announcements to Everyone or specific school roles from the Dashboard, and edit or delete any published notice.',
    audience: ['School Admin'],
    accessPath: 'Dashboard → Dispatch Announcement & Published School Notices',
    keywords: [
      'notices',
      'dispatch announcement',
      'published school notices',
      'target audience',
      'everyone',
      'edit notice',
      'delete notice',
    ],
    understanding: {
      whatItIs:
        'School Admins can compose, target, update, and remove school announcements directly on the Operational Dashboard.',
      whyYouNeedIt:
        'Role-targeted notices ensure Teachers, Students, and Accounts staff receive only relevant announcements alongside school-wide circulars.',
      whatItProvides: [
        'Collapsible Dispatch Announcement composer on the Dashboard.',
        'Audience selector pills for Teachers, Students, Accounts, or Everyone.',
        'Published School Notices grid displaying all school notices with Edit and Delete controls on every notice.',
      ],
    },
    interfaceOverview: {
      elements: [
        {
          name: 'Dispatch Announcement',
          kind: 'Card',
          description: 'Expandable right-column card (or opened via the Create Notice shortcut) with Title, Content, and Target Audience pills.',
        },
        {
          name: 'Target Audience Pills',
          kind: 'Filter',
          description: 'Select Teachers, Students, and/or Accounts. Leave all unchecked (or select all three) to send to Everyone.',
        },
        {
          name: 'Published School Notices',
          kind: 'Card',
          description: '2-column grid showing all active school notices with audience tags, Edited badge if updated, and Edit / Delete buttons.',
        },
      ],
    },
    instructions: [
      {
        steps: [
          {
            title: 'Expand Dispatch Announcement',
            location: 'Operational Dashboard → Dispatch Announcement (or Administrative Shortcuts → Create Notice)',
            instruction: 'Click Expand on the Dispatch Announcement card.',
            expectedResult: 'Title, Content, and Target Audience pills appear.',
          },
          {
            title: 'Write your notice and choose an audience',
            requiredInfo: 'Title (required) and Content (required).',
            instruction:
              'Enter the Title and Content, then click Teachers, Students, or Accounts—or leave all unchecked for Everyone.',
            expectedResult: 'The notice is ready to broadcast.',
          },
          {
            title: 'Dispatch, edit, or delete notices',
            instruction:
              'Click Dispatch Announcement to publish. Later, click Edit (pencil) on any notice card to update it, or Trash to delete it after confirmation.',
            expectedResult: 'Targeted users receive a notification and see the notice on their Dashboard Notice Board.',
          },
        ],
      },
    ],
    notes: [
      {
        type: 'info',
        title: 'Admin moderation across all notices',
        body: 'Unlike Teachers (who can only edit or delete their own notices), School Administrators can see, edit, and delete any notice published across the school.',
      },
    ],
    expectedOutcome: {
      summary: 'Your announcement is visible on targeted dashboards and logged in Published School Notices.',
      verifyAt: 'Scroll to Published School Notices on the Dashboard to confirm the card and audience pill.',
    },
    relatedSlugs: [
      { category: 'school-admin', slug: 'admin-dashboard', reason: 'Return to the full Admin Dashboard guide.' },
      { category: 'common-help', slug: 'notifications-center', reason: 'See how users receive notice alerts.' },
    ],
  },
  {
    slug: 'admin-attendance-assignments',
    category: 'school-admin',
    group: 'Academics & Operations',
    title: 'Reviewing Daily Attendance & Assignments',
    summary:
      'Step in to mark, unlock, or finalize daily attendance for any class section, or post assignments and view submissions.',
    audience: ['School Admin'],
    accessPath: 'Dashboard Action Center → Mark Attendance → (or direct /attendance and /assignments)',
    keywords: [
      'admin attendance',
      'admin assignments',
      'mark attendance',
      'unlock attendance',
      'final save',
      'action center',
      'submissions',
    ],
    understanding: {
      whatItIs:
        'While Teachers handle daily attendance and homework in their sidebar, School Administrators can also access Daily Attendance and Assignments when stepping in for an absent teacher or finalizing pending registers.',
      whyYouNeedIt:
        'If Today’s Action Center flags classes awaiting attendance, you can jump straight in to mark or finalize them, and you can review or post assignments anytime.',
      whatItProvides: [
        'Full access to Daily Attendance across every Class and Section for any date up to today.',
        'Save Temp, Lock Attendance, Unlock, and Final Save controls.',
        'Ability to post new Assignments and expand View Submissions for any class section.',
      ],
    },
    interfaceOverview: {
      elements: [
        {
          name: 'Action Center → Mark Attendance →',
          kind: 'Button',
          description: 'Appears on the Admin Dashboard whenever one or more active sections have no attendance marked today.',
        },
        {
          name: 'Attendance Control Bar',
          kind: 'Filter',
          description: 'Dropdowns for Class, Section, Date (up to today), and Fetch List button.',
        },
        {
          name: 'Assignments Grid & + New Assignment',
          kind: 'Card',
          description: 'Displays school assignments with + New Assignment modal and expandable View Submissions panel.',
        },
      ],
    },
    instructions: [
      {
        groupTitle: 'Marking or Finalizing Attendance as Admin',
        steps: [
          {
            title: 'Open Daily Attendance',
            location: 'Dashboard → Today’s Action Center → Mark Attendance → (or visit /attendance)',
            instruction: 'Open the Daily Attendance screen.',
            expectedResult: 'Class, Section, and Date controls appear.',
          },
          {
            title: 'Fetch a section and save or finalize',
            instruction:
              'Choose Class, Section, and Date, click Fetch List, mark Present/Absent (or Mark All Present / Absent), and click Save Temp, Lock Attendance, Unlock, or Final Save.',
            expectedResult: 'Attendance status updates to LOCKED or FINAL SAVED and updates Dashboard KPIs.',
          },
        ],
      },
      {
        groupTitle: 'Posting or Reviewing Assignments',
        steps: [
          {
            title: 'Open Assignments',
            location: 'Visit /assignments or click an assignment notification',
            instruction:
              'Click + New Assignment to post instructions, due date, class/section, and optional file, or click View Submissions on an existing card.',
            expectedResult: 'Students in that section are notified, and submitted student files open via View.',
          },
        ],
      },
    ],
    notes: [
      {
        type: 'info',
        title: 'Where to find Attendance and Assignments as Admin',
        body: 'Attendance and Assignments are not listed in the Admin left sidebar to keep daily navigation focused. Use Dashboard → Today’s Action Center → Mark Attendance →, notifications, or the direct page address.',
      },
      {
        type: 'warning',
        title: 'Finalized records and posted assignments',
        body: 'Once attendance is Final Saved (or auto-finalized 48 hours after locking), it cannot be modified. Posted assignments also cannot be edited or deleted once published.',
      },
    ],
    expectedOutcome: {
      summary: 'Pending class attendance is resolved and assignment submissions can be audited anytime.',
      verifyAt: 'Return to the Admin Dashboard to confirm Attendance Awaiting decreases to 0.',
    },
    relatedSlugs: [
      { category: 'teacher', slug: 'teacher-attendance', reason: 'Detailed walkthrough of the 3-state attendance lifecycle.' },
      { category: 'school-admin', slug: 'reports-and-insights', reason: 'Analyze school-wide attendance trends in Reports.' },
    ],
  },
  {
    slug: 'admin-fees-overview',
    category: 'school-admin',
    group: 'Finance & Analytics',
    title: 'Managing Student Fees, Invoices & UPI Verification',
    summary:
      'Oversee all student fee balances, generate invoices, record payments, issue PDF receipts, and approve or reject UPI proofs.',
    audience: ['School Admin', 'Accounts'],
    accessPath: 'Sidebar → Fees',
    keywords: [
      'admin fees',
      'fee summary',
      'create invoice',
      'record payment',
      'upi verification',
      'pdf receipt',
      'pending fees',
    ],
    understanding: {
      whatItIs:
        'School Administrators share full Accounts & Fees capabilities with Accounts staff—covering Student Fee Summary, Transaction History, invoicing, payment recording, PDF documents, and UPI Verification.',
      whyYouNeedIt:
        'Principals and Admins can bill students, step in to record walk-in payments, verify UPI UTR submissions, or audit and correct fee records.',
      whatItProvides: [
        'Student Fee Summary tab with search and status filters (NO FEES, PAID, PARTIAL, PENDING, OVERDUE).',
        'Transaction History tab with INVOICES/PAYMENTS filters, PDF preview/download, Edit, and Delete.',
        '+ Add Transaction dialog for creating invoices and recording Cash, Online, Cheque, or Card payments.',
        'Verification tab for approving or rejecting student-submitted UPI UTR proofs.',
      ],
    },
    interfaceOverview: {
      elements: [
        {
          name: 'Student Fee Summary / Transaction History / Verification',
          kind: 'Tab',
          description: 'The three main tabs of the Accounts & Fees workspace.',
        },
        {
          name: '+ Add Transaction',
          kind: 'Button',
          description: 'Opens the modal to Create Invoice or Record Payment.',
        },
      ],
    },
    instructions: [
      {
        steps: [
          {
            title: 'Open Fees from the sidebar',
            location: 'Left Sidebar → Fees (or Dashboard Action Center → Manage Fees →)',
            instruction: 'Navigate to Accounts & Fees.',
            expectedResult: 'Student Fee Summary loads with search and status pills.',
          },
          {
            title: 'Bill, record payments, or verify UPI',
            instruction:
              'Use + Add Transaction to Create Invoice or Record Payment, switch to Verification to Approve/Reject student UPI proofs, or open Transaction History to view/download PDFs.',
            expectedResult: 'Student balances, Dashboard totals, and Fee Insights update.',
          },
        ],
      },
    ],
    notes: [
      {
        type: 'info',
        title: 'Detailed step-by-step Accounts guides',
        body: 'Because School Admins and Accounts staff share the exact same Fees screens, follow the dedicated Accounts articles linked below for detailed step-by-step walkthroughs of each tab.',
      },
    ],
    expectedOutcome: {
      summary: 'Your school’s fee invoices, payments, and UPI verifications stay accurate and up to date.',
      verifyAt: 'Check Student Fee Summary or reload Transaction History after saving to verify updated balances.',
    },
    relatedSlugs: [
      { category: 'accounts', slug: 'invoices-and-payments', reason: 'Full steps for creating invoices and recording payments.' },
      { category: 'accounts', slug: 'upi-verification-receipts', reason: 'Full steps for verifying UPI proofs and PDFs.' },
      { category: 'accounts', slug: 'fee-summary-history', reason: 'Full steps for searching, editing, and deleting records.' },
    ],
  },
  {
    slug: 'reports-and-insights',
    category: 'school-admin',
    group: 'Finance & Analytics',
    title: 'Viewing Attendance & Fee Insights Reports',
    summary:
      'Analyze school-wide attendance rates, top attendees, below-75% alerts, fee collection rates, payment methods, and overdue defaulters.',
    audience: ['School Admin'],
    accessPath: 'Sidebar → Reports',
    keywords: [
      'reports',
      'attendance insights',
      'fee insights',
      'low attendance',
      'below 75%',
      'top 10 attendance',
      'defaulters',
      'working days',
      'date range',
    ],
    understanding: {
      whatItIs:
        'Reports & Insights gives School Administrators two analytical dashboards—Attendance Insights and Fee Insights—powered by a shared Date Range, Class, and Section filter bar.',
      whyYouNeedIt:
        'Use it at the end of a week, month, or term to spot students falling below 75% attendance, recognize top attendance, and follow up on overdue fee balances.',
      whatItProvides: [
        'Shared Filter Bar with presets (Today, This Week, This Month, Last Month, This Year, Custom Range) and optional Class/Section filters.',
        'Attendance Insights: Working Days (adjusted by Academic Calendar overrides), Total Present, Total Absent, Avg. Attendance Rate, Top 10 Attendance, and Low Attendance (Below 75%) list.',
        'Fee Insights: Expected Amount, Collected Amount, Outstanding, Collection Rate, Payment Methods breakdown, and Fee Defaulters table.',
      ],
    },
    interfaceOverview: {
      elements: [
        {
          name: 'Attendance Insights / Fee Insights Tabs',
          kind: 'Tab',
          description: 'Switch between attendance analytics and financial collection analytics.',
        },
        {
          name: 'Filter Bar',
          kind: 'Filter',
          description: 'Select Date Range (defaults to This Month), optional Class, optional Section, and click Apply Filters.',
        },
        {
          name: 'Low Attendance (Below 75%)',
          kind: 'Table',
          description: 'Scrollable alert list highlighting students whose attendance rate is under 75% in the filtered window.',
        },
        {
          name: 'Fee Defaulters Table',
          kind: 'Table',
          description: 'Lists students with overdue unpaid invoices and Days Overdue badges (red over 30 days, amber otherwise).',
        },
      ],
    },
    instructions: [
      {
        steps: [
          {
            title: 'Open Reports & Insights',
            location: 'Left Sidebar → Reports',
            instruction: 'Click Reports in the sidebar. Attendance Insights opens by default.',
            expectedResult: 'The Filter Bar and default This Month attendance metrics appear.',
          },
          {
            title: 'Configure filters and click Apply Filters',
            requiredInfo: 'If choosing Custom Range, both Start Date and End Date are required (maximum 5-year range).',
            instruction:
              'Pick a Date Range preset (or Custom Range), optionally filter by Class and Section, and click Apply Filters.',
            expectedResult: 'All KPI cards, Top 10 rankings, and Low Attendance alerts update.',
          },
          {
            title: 'Switch to Fee Insights',
            location: 'Tab bar → Fee Insights',
            instruction: 'Click the Fee Insights tab to review collections and overdue defaulters for the selected filters.',
            expectedResult: 'Expected vs. Collected KPIs, Payment Methods, and Fee Defaulters populate.',
          },
        ],
      },
    ],
    notes: [
      {
        type: 'info',
        title: 'Working days and Due Date rules',
        body: 'Attendance Insights computes Working Days from your Academic Calendar (if a range has only Sundays/holidays, Working Days and Avg. Attendance Rate show 0). Fee Insights includes only invoices that have a Due Date falling within your chosen Date Range.',
      },
    ],
    expectedOutcome: {
      summary: 'You can evaluate campus attendance health and fee collection performance across any term or class.',
      verifyAt: 'Compare Working Days and Fee Defaulters after adjusting Date Range or Class/Section filters.',
    },
    relatedSlugs: [
      { category: 'school-admin', slug: 'academic-calendar', reason: 'Adjust holidays/working days used in Working Days calculations.' },
      { category: 'accounts', slug: 'fee-insights-reports', reason: 'See the Accounts guide for Fee Insights.' },
    ],
  },
];
