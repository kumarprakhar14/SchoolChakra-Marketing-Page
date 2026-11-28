import type { HelpArticle } from './types';

export const TEACHER_ARTICLES: HelpArticle[] = [
  {
    slug: 'teacher-dashboard-notices',
    category: 'teacher',
    group: 'Daily Workspace',
    title: 'Teacher Dashboard & Posting Announcements',
    summary:
      'Review today’s Academic Calendar status, read campus notices, launch daily tasks, and publish announcements to students or staff.',
    audience: ['Teacher'],
    accessPath: 'Sidebar → Dashboard',
    keywords: [
      'teacher dashboard',
      'notices',
      'announcements',
      'post notice',
      'edit notice',
      'delete notice',
      'shortcuts',
      'calendar status',
    ],
    understanding: {
      whatItIs:
        'The Teacher Dashboard is your home screen after signing in, bringing together school announcements, today’s working-day status, quick shortcuts, and an announcement composer.',
      whyYouNeedIt:
        'It gives you a morning check-in before classes begin and lets you broadcast updates to Students, Teachers, Accounts, or Everyone without leaving your home screen.',
      whatItProvides: [
        'Welcome Banner showing today’s date and Academic Calendar status (Working Day, Holiday, or Vacation).',
        'Notice Board displaying announcements targeted to Teachers or Everyone, newest first.',
        'Teacher Shortcuts for one-click access to Mark Attendance and Post Assignment.',
        'Post an Announcement card to publish new notices or edit and delete notices you authored.',
      ],
    },
    interfaceOverview: {
      elements: [
        {
          name: 'Welcome Banner',
          kind: 'Card',
          description:
            'Displays your greeting, school name, TEACHER Portal badge, and today’s Academic Calendar status badge.',
        },
        {
          name: 'Notice Board',
          kind: 'Card',
          description:
            'Left column feed of active announcements for Teachers and Everyone, showing audience pills, author role, and an Edited tag if updated.',
        },
        {
          name: 'Teacher Shortcuts',
          kind: 'Card',
          description:
            'Top-right quick links to Mark Attendance and Post Assignment.',
        },
        {
          name: 'Post an Announcement',
          kind: 'Form Field',
          description:
            'Bottom-right form with Subject title, announcement details, Target Audience toggles (Teachers, Students, Accounts), and Publish Notice button.',
        },
      ],
    },
    instructions: [
      {
        groupTitle: 'Posting a Targeted Announcement',
        steps: [
          {
            title: 'Enter a subject and announcement details',
            location: 'Dashboard → Post an Announcement (bottom-right)',
            requiredInfo: 'Subject title and announcement text.',
            instruction:
              'Type a short Subject title and write the full details in the announcement text box.',
            expectedResult: 'Your notice title and body are ready for audience selection.',
          },
          {
            title: 'Choose your Target Audience',
            location: 'Target Audience pills inside Post an Announcement',
            instruction:
              'Click Teachers, Students, or Accounts to restrict who sees the notice, or leave all pills unselected to send it to Everyone.',
            expectedResult: 'Selected audience pills highlight (selecting all three also sends to Everyone).',
          },
          {
            title: 'Click Publish Notice',
            instruction: 'Click Publish Notice at the bottom of the card.',
            expectedResult:
              'A confirmation toast appears, the form resets, the notice appears on the Notice Board immediately, and targeted users receive a notification.',
          },
        ],
      },
      {
        groupTitle: 'Editing or Deleting Your Own Notice',
        steps: [
          {
            title: 'Hover over a notice you created',
            location: 'Dashboard → Notice Board',
            instruction:
              'Move your cursor over an announcement card that you authored to reveal the Edit (pencil) and Delete (trash) icons.',
            expectedResult: 'Edit loads the notice into the composer as Edit Announcement; Delete opens a confirmation dialog.',
          },
        ],
      },
    ],
    notes: [
      {
        type: 'restriction',
        title: 'You can only edit or delete your own notices',
        body: 'Notices published by the School Admin or other Teachers are read-only for you—Edit and Delete icons only appear on notices you authored.',
      },
    ],
    expectedOutcome: {
      summary: 'Your announcement is published to the Notice Board and delivered to the selected audience.',
      verifyAt: 'Confirm your notice card appears at the top of the Notice Board with the expected audience pill.',
    },
    relatedSlugs: [
      { category: 'teacher', slug: 'teacher-attendance', reason: 'Jump into marking daily attendance.' },
      { category: 'teacher', slug: 'teacher-assignments', reason: 'Post homework for your classes.' },
    ],
  },
  {
    slug: 'teacher-timetable',
    category: 'teacher',
    group: 'Daily Workspace',
    title: 'Viewing Your Weekly Teaching Timetable',
    summary:
      'Check your personal Monday–Saturday teaching schedule, period timings, subjects, and assigned classes.',
    audience: ['Teacher'],
    accessPath: 'Sidebar → Time Table',
    keywords: [
      'timetable',
      'schedule',
      'periods',
      'teaching schedule',
      'free periods',
      'monday to saturday',
    ],
    understanding: {
      whatItIs:
        'The Time Table screen displays your personal weekly teaching schedule across Monday through Saturday, organized by school period timings.',
      whyYouNeedIt:
        'Use it to check which class, section, and subject you teach in each period and spot free slots in your day.',
      whatItProvides: [
        'A read-only Monday–Saturday grid scoped strictly to your scheduled periods.',
        'Period names and start/end times pinned on the left column.',
        'Subject Name and Class - Section displayed in each occupied slot, with Free shown for unscheduled slots.',
      ],
    },
    interfaceOverview: {
      elements: [
        {
          name: 'Period Column',
          kind: 'Table',
          description: 'Sticky left column showing each period name and its start–end time.',
        },
        {
          name: 'Scheduled Class Card',
          kind: 'Card',
          description: 'Displays the Subject Name and Class - Section for that day and period.',
        },
        {
          name: 'Free Slot',
          kind: 'Card',
          description: 'Dashed placeholder indicating you have no class assigned in that period.',
        },
      ],
    },
    instructions: [
      {
        steps: [
          {
            title: 'Open Time Table',
            location: 'Left Sidebar',
            instruction: 'Click Time Table in the sidebar.',
            expectedResult: 'Your Monday–Saturday teaching grid loads.',
          },
          {
            title: 'Review periods and classes',
            instruction:
              'Match each period time on the left against the day columns (Monday through Saturday). On smaller screens, scroll horizontally to see later days of the week.',
            expectedResult: 'You can see every class, section, and subject assigned to you for the week.',
          },
        ],
      },
    ],
    notes: [
      {
        type: 'info',
        title: 'Timetables are managed by your School Admin',
        body: 'Teachers have a read-only view of their schedule. If a period or subject needs changing, or if you see "No time table found.", contact your School Administrator.',
      },
    ],
    expectedOutcome: {
      summary: 'You know your daily teaching periods and which subject sections you will take.',
      verifyAt: 'Scheduled subjects also appear in your Daily Attendance dropdown on matching days of the week.',
    },
    relatedSlugs: [
      { category: 'teacher', slug: 'teacher-attendance', reason: 'See how timetable slots appear in Attendance.' },
      { category: 'teacher', slug: 'teacher-assigned-classes', reason: 'View students in your assigned classes.' },
    ],
  },
  {
    slug: 'teacher-assigned-classes',
    category: 'teacher',
    group: 'Daily Workspace',
    title: 'Viewing Assigned Classes & Student Rosters',
    summary:
      'Browse the classes and sections where you are assigned as Class Teacher and view enrolled students with their ERP IDs.',
    audience: ['Teacher'],
    accessPath: 'Sidebar → Academics',
    keywords: [
      'academics',
      'assigned classes',
      'class teacher',
      'student list',
      'roster',
      'erp id',
      'sections',
    ],
    understanding: {
      whatItIs:
        'The Academics page shows a read-only directory of the classes and sections assigned to you by your School Administrator.',
      whyYouNeedIt:
        'When you need to check which students are enrolled in your homeroom section or look up a student’s ERP ID, you can expand the section roster here.',
      whatItProvides: [
        'Class cards filtered to sections where you are assigned as Class Teacher.',
        'Student count per section.',
        'Expandable student roster showing student names and ERP IDs.',
      ],
    },
    interfaceOverview: {
      elements: [
        {
          name: 'Class Card',
          kind: 'Card',
          description: 'Displays the class name and lists the sections assigned to you.',
        },
        {
          name: 'Section Row',
          kind: 'Button',
          description: 'Shows the section letter, name, and student count. Click to expand or collapse the student roster.',
        },
        {
          name: 'Student Roster List',
          kind: 'Table',
          description: 'Appears below an expanded section row with each enrolled student’s name and ERP ID.',
        },
      ],
    },
    instructions: [
      {
        steps: [
          {
            title: 'Open Academics',
            location: 'Left Sidebar',
            instruction: 'Click Academics in the sidebar.',
            expectedResult: 'Classes containing your assigned sections appear.',
          },
          {
            title: 'Expand a section roster',
            location: 'Inside a Class card',
            instruction: 'Click any Section row to expand the enrolled student list.',
            expectedResult: 'Each student’s name and ERP ID appear underneath the section row.',
          },
        ],
      },
    ],
    notes: [
      {
        type: 'info',
        title: 'Class Teacher assignments vs. Timetable subject classes',
        body: 'Academics shows sections where you are assigned as Class Teacher. Subject classes that appear only on your timetable are shown in Time Table and in Daily Attendance on scheduled days.',
      },
    ],
    expectedOutcome: {
      summary: 'You can verify which students belong to your assigned sections and check their ERP IDs.',
      verifyAt: 'Expanding the section row lists all currently enrolled students.',
    },
    relatedSlugs: [
      { category: 'teacher', slug: 'teacher-timetable', reason: 'Check subject periods taught across other sections.' },
      { category: 'teacher', slug: 'teacher-attendance', reason: 'Take daily attendance for your assigned sections.' },
    ],
  },
  {
    slug: 'teacher-attendance',
    category: 'teacher',
    group: 'Classroom Operations',
    title: 'Marking, Locking & Finalizing Daily Attendance',
    summary:
      'Take daily roll call for your assigned classes or scheduled subject sections, save drafts, lock registers, and finalize records.',
    audience: ['Teacher'],
    accessPath: 'Sidebar → Attendance, or Dashboard → Mark Attendance shortcut',
    prerequisites: ['You must be assigned to at least one section as Class Teacher or scheduled for that day in the Timetable.'],
    keywords: [
      'mark attendance',
      'how do i mark attendance',
      'present',
      'absent',
      'save temp',
      'lock attendance',
      'unlock',
      'final save',
      '48 hours',
      'roll call',
    ],
    understanding: {
      whatItIs:
        'Daily Attendance lets teachers record Present or Absent status for students in their assigned classes or scheduled timetable periods for any date up to today.',
      whyYouNeedIt:
        'Keeping attendance accurate each day updates school-wide attendance tracking and lets you draft, lock for review, correct if needed, and permanently save registers.',
      whatItProvides: [
        'Assigned Classes dropdown combining your Class Teacher sections and subject sections scheduled on the selected day of the week.',
        'Quick toggles for Present and Absent per student, plus Mark All Present and Mark All Absent bulk controls.',
        'A three-stage safety workflow: Save Temp (draft), Lock Attendance (protected against edits), and Final Save (permanent).',
      ],
    },
    interfaceOverview: {
      elements: [
        {
          name: 'Date Picker',
          kind: 'Form Field',
          description: 'Defaults to today and allows past dates up to today (future dates cannot be selected). Changing the date updates which timetable subject classes appear.',
        },
        {
          name: 'Assigned Classes Dropdown',
          kind: 'Filter',
          description: 'Lists sections marked (Class Teacher) and sections from your timetable for the selected day marked with the subject name.',
        },
        {
          name: 'Fetch List',
          kind: 'Button',
          description: 'Loads the student roster and any previously saved attendance for that section and date.',
        },
        {
          name: 'Mark All Present / Mark All Absent',
          kind: 'Button',
          description: 'Sets every student in the loaded list to Present or Absent in one click (disabled once locked or finalized).',
        },
        {
          name: 'Present / Absent Toggle',
          kind: 'Button',
          description: 'Per-student toggle buttons. Students without an existing record default to Present when loaded.',
        },
        {
          name: 'Save Temp / Lock Attendance / Unlock / Final Save',
          kind: 'Button',
          description: 'Footer controls that move attendance between Draft, LOCKED, and FINAL SAVED states.',
        },
      ],
    },
    instructions: [
      {
        groupTitle: 'Step-by-Step Roll Call',
        steps: [
          {
            title: 'Open Daily Attendance',
            location: 'Left Sidebar → Attendance (or Dashboard → Mark Attendance)',
            instruction: 'Navigate to the Daily Attendance screen.',
            expectedResult: 'The Date picker, Assigned Classes dropdown, and Fetch List button appear.',
          },
          {
            title: 'Select the date and class section',
            location: 'Top selector card',
            requiredInfo: 'Date (today or earlier) and an Assigned Class section.',
            instruction:
              'Confirm or choose the Date first, then open Assigned Classes and select the section you want to mark.',
            expectedResult: 'The Fetch List button becomes enabled.',
          },
          {
            title: 'Load the student roster',
            instruction: 'Click Fetch List.',
            expectedResult:
              'The student list appears with each student defaulted to Present (or showing previously saved marks).',
          },
          {
            title: 'Mark Present or Absent',
            location: 'Student Attendance List',
            instruction:
              'Click Absent next to any absent students, or use Mark All Present / Mark All Absent for quick bulk updates.',
            expectedResult: 'Each student row reflects the updated Present or Absent selection.',
          },
          {
            title: 'Save a draft or Lock Attendance',
            location: 'Footer of the Student Attendance List',
            instruction:
              'Click Save Temp if you plan to return later, or click Lock Attendance once roll call is complete.',
            expectedResult:
              'Save Temp saves a draft. Lock Attendance locks the register and displays a LOCKED badge to prevent accidental edits.',
          },
          {
            title: 'Unlock to correct or Final Save to complete',
            location: 'Footer of a LOCKED register',
            instruction:
              'If a correction is needed before finalization, click Unlock, update the student, and lock again. When verified, click Final Save.',
            expectedResult:
              'The status badge updates to FINAL SAVED and the button changes to Permanently Saved.',
          },
        ],
      },
    ],
    notes: [
      {
        type: 'warning',
        title: 'Automatic finalization after 48 hours',
        body: 'Locked attendance records are automatically finalized after 48 hours during the nightly update. Once finalized, attendance cannot be unlocked or modified.',
      },
      {
        type: 'info',
        title: 'Changing the Date updates timetable options',
        body: 'Subject classes from your timetable only appear in Assigned Classes when the chosen Date falls on a day of the week where that class is scheduled. Your Class Teacher sections always appear.',
      },
      {
        type: 'warning',
        title: 'Unsaved changes prompt',
        body: 'If you try to leave or refresh the page while attendance is unlocked with unsaved changes, your browser will ask you to confirm before leaving.',
      },
    ],
    expectedOutcome: {
      summary: 'Daily attendance is saved, locked, or permanently finalized for the selected class section and date.',
      verifyAt: 'Confirm the status badge at the top of the student card reads LOCKED or FINAL SAVED.',
    },
    relatedSlugs: [
      { category: 'teacher', slug: 'teacher-timetable', reason: 'Check which days your subject classes are scheduled.' },
      { category: 'teacher', slug: 'teacher-assigned-classes', reason: 'Inspect students in your Class Teacher sections.' },
    ],
  },
  {
    slug: 'teacher-assignments',
    category: 'teacher',
    group: 'Classroom Operations',
    title: 'Creating Assignments & Reviewing Student Submissions',
    summary:
      'Post classwork or homework with due dates and optional attachments, and review files or links submitted by students.',
    audience: ['Teacher'],
    accessPath: 'Sidebar → Assignments, or Dashboard → Post Assignment shortcut',
    prerequisites: ['At least one Class and Section must exist in the school.'],
    keywords: [
      'assignments',
      'homework',
      'new assignment',
      'post assignment',
      'submissions',
      'view submissions',
      'attachment',
      'due date',
    ],
    understanding: {
      whatItIs:
        'The Assignments module allows teachers to publish homework or classwork instructions to a specific class section and inspect every student’s submitted file or link.',
      whyYouNeedIt:
        'Students receive an immediate notification when an assignment is posted and can turn in their work digitally for you to review in one place.',
      whatItProvides: [
        'Assignment cards showing title, instructions preview, due date, optional resource link, and submission count.',
        '+ New Assignment form with optional file attachment (JPG, JPEG, PNG, PDF, DOC, or DOCX).',
        'Expandable View Submissions panel listing each submitted student with a View link to open their file or URL.',
      ],
    },
    interfaceOverview: {
      elements: [
        {
          name: '+ New Assignment',
          kind: 'Button',
          description: 'Top-right button that opens the assignment creation modal.',
        },
        {
          name: 'Assignment Card',
          kind: 'Card',
          description: 'Shows the title, description preview, Due date pill, optional View Resource link, and Submissions count.',
        },
        {
          name: 'View Resource',
          kind: 'Link',
          description: 'Appears on cards that include an attached file; opens the attachment in a new tab.',
        },
        {
          name: 'View Submissions / Hide Submissions',
          kind: 'Button',
          description: 'Expands or collapses the list of students who have turned in work for that assignment.',
        },
      ],
    },
    instructions: [
      {
        groupTitle: 'Posting a New Assignment',
        steps: [
          {
            title: 'Open the New Assignment dialog',
            location: 'Assignments page → + New Assignment (or Dashboard → Post Assignment)',
            instruction: 'Click + New Assignment at the top right.',
            expectedResult: 'The New Assignment modal opens.',
          },
          {
            title: 'Fill in assignment details and target section',
            requiredInfo: 'Title, Instructions, Due Date, Class, Section, and optional File (JPG, PNG, PDF, DOC, DOCX).',
            instruction:
              'Enter the Title, Instructions, and Due Date, then choose the Class and Section. Optionally attach a worksheet or reference file.',
            expectedResult: 'All required fields are completed.',
          },
          {
            title: 'Double-check and click Post Assignment',
            instruction:
              'Review your title, instructions, due date, and selected section carefully, then click Post Assignment.',
            expectedResult:
              'The modal closes, the new assignment card appears on the page, and all students in that section receive a notification.',
          },
        ],
      },
      {
        groupTitle: 'Reviewing Student Submissions',
        steps: [
          {
            title: 'Expand Submissions on an assignment card',
            location: 'Assignments grid',
            instruction: 'Locate the assignment card and click View Submissions.',
            expectedResult: 'A list of students who have submitted work appears with their name and ERP ID.',
          },
          {
            title: 'Open a student’s submission',
            instruction: 'Click View next to a student’s name.',
            expectedResult: 'The student’s uploaded file or submitted link opens in a new browser tab.',
          },
        ],
      },
    ],
    notes: [
      {
        type: 'warning',
        title: 'Posted assignments cannot be edited or deleted',
        body: 'Once you click Post Assignment, there is no edit or delete option. Always verify the Title, Instructions, Due Date, Class/Section, and attachment before posting.',
      },
      {
        type: 'info',
        title: 'Supported attachment formats',
        body: 'Attachments must be JPG, JPEG, PNG, PDF, DOC, or DOCX files.',
      },
    ],
    expectedOutcome: {
      summary: 'Students in the selected section are notified of the new assignment and can submit work for you to review.',
      verifyAt: 'Confirm the new assignment card appears in the Assignments grid and students appear under View Submissions after turning in work.',
    },
    relatedSlugs: [
      { category: 'teacher', slug: 'teacher-dashboard-notices', reason: 'Post a reminder announcement on the Dashboard.' },
      { category: 'student', slug: 'student-assignments', reason: 'See how students view and turn in assignments.' },
    ],
  },
];
