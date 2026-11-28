import type { HelpArticle } from './types';

export const STUDENT_ARTICLES: HelpArticle[] = [
  {
    slug: 'student-dashboard',
    category: 'student',
    group: 'Daily School Life',
    title: 'Student Dashboard, Notices & Daily Status',
    summary:
      'Check today’s attendance status, see how many assignments are pending, and read school or teacher announcements.',
    audience: ['Student'],
    accessPath: 'Sidebar → Dashboard',
    keywords: [
      'student dashboard',
      'my status',
      'today attendance',
      'pending assignments',
      'notices',
      'announcements',
      'attendance history',
    ],
    understanding: {
      whatItIs:
        'The Student Dashboard is your daily overview screen showing school announcements, today’s Academic Calendar status, and a quick My Status summary.',
      whyYouNeedIt:
        'A quick glance each day tells you whether today is a working day or holiday, whether your attendance has been marked, and if any homework is due soon.',
      whatItProvides: [
        'Welcome Banner with today’s date, STUDENT Portal badge, and Academic Calendar status (Working Day, Holiday, or Vacation).',
        'Notice Board showing announcements targeted to Students or Everyone.',
        'My Status card displaying Today’s Attendance (PRESENT, ABSENT, or NOT MARKED) and your Pending Assignments count.',
      ],
    },
    interfaceOverview: {
      elements: [
        {
          name: 'Welcome Banner',
          kind: 'Card',
          description: 'Displays your greeting, school name, STUDENT Portal pill, and today’s Academic Calendar status badge.',
        },
        {
          name: 'Notice Board',
          kind: 'Card',
          description: 'Left-side feed of announcements for Students and Everyone, showing author, date, and an Edited tag when updated.',
        },
        {
          name: 'My Status Card',
          kind: 'Card',
          description: 'Right-side summary card showing Today’s Attendance pill and Pending Assignments count.',
        },
      ],
    },
    instructions: [
      {
        steps: [
          {
            title: 'Check today’s status on My Status',
            location: 'Dashboard → My Status (right side)',
            instruction:
              'Look at Today’s Attendance to see PRESENT (green), ABSENT (red), or NOT MARKED (gray), and check the amber Pending Assignments counter.',
            expectedResult: 'You immediately know your attendance status for today and how many upcoming assignments still need submission.',
          },
          {
            title: 'Read recent school and class notices',
            location: 'Dashboard → Notice Board (left side)',
            instruction:
              'Scroll through the Notice Board cards to read messages marked EVERYONE or STUDENT ONLY.',
            expectedResult: 'You stay informed about school announcements and reminders.',
          },
        ],
      },
    ],
    notes: [
      {
        type: 'info',
        title: 'Viewing attendance history',
        body: 'Currently, Students can view today’s attendance status on the Dashboard’s My Status card. A dedicated student attendance history page is marked as coming soon.',
      },
    ],
    expectedOutcome: {
      summary: 'You can verify today’s attendance, pending homework count, and latest notices in seconds.',
      verifyAt: 'Submitting a due assignment reduces the Pending Assignments count on My Status by 1.',
    },
    relatedSlugs: [
      { category: 'student', slug: 'student-academics-timetable', reason: 'View your enrolled subjects and weekly schedule.' },
      { category: 'student', slug: 'student-assignments', reason: 'Open pending assignments and turn in your work.' },
    ],
  },
  {
    slug: 'student-academics-timetable',
    category: 'student',
    group: 'Daily School Life',
    title: 'Checking Enrolled Subjects & Weekly Timetable',
    summary:
      'See the subjects taught in your section, which teachers teach them, and your Monday–Saturday period schedule.',
    audience: ['Student'],
    accessPath: 'Sidebar → Academics and Sidebar → Time Table',
    prerequisites: ['Your School Administrator must assign your Class, Section, and weekly timetable entries.'],
    keywords: [
      'subjects',
      'teachers',
      'timetable',
      'class schedule',
      'academics',
      'periods',
      'monday to saturday',
    ],
    understanding: {
      whatItIs:
        'Academics lists the subjects scheduled for your class section along with their assigned teachers, while Time Table displays your full Monday–Saturday period schedule.',
      whyYouNeedIt:
        'Use these two pages to check which teacher takes each subject and know which periods happen each day of the week.',
      whatItProvides: [
        'Subject cards in Academics showing each subject name and assigned teacher(s).',
        'Weekly Monday–Saturday grid in Time Table with Period names and start–end timings pinned on the left.',
      ],
    },
    interfaceOverview: {
      elements: [
        {
          name: 'Subject Cards (Academics)',
          kind: 'Card',
          description: 'Displays each subject in your section and lists ASSIGNED TEACHERS underneath.',
        },
        {
          name: 'Period Column (Time Table)',
          kind: 'Table',
          description: 'Left column showing Period Name and start–end times.',
        },
        {
          name: 'Class Period Cell (Time Table)',
          kind: 'Card',
          description: 'Displays the Subject Name and Teacher Name for each scheduled slot, or Free if unscheduled.',
        },
      ],
    },
    instructions: [
      {
        groupTitle: 'Checking Your Subjects',
        steps: [
          {
            title: 'Open Academics',
            location: 'Left Sidebar → Academics',
            instruction: 'Click Academics in the sidebar to view your subject cards.',
            expectedResult: 'Each card displays the subject name and the teacher(s) assigned to it.',
          },
        ],
      },
      {
        groupTitle: 'Checking Your Weekly Schedule',
        steps: [
          {
            title: 'Open Time Table',
            location: 'Left Sidebar → Time Table',
            instruction: 'Click Time Table in the sidebar.',
            expectedResult: 'Your Monday–Saturday period grid appears. Scroll horizontally on smaller screens if needed.',
          },
        ],
      },
    ],
    notes: [
      {
        type: 'info',
        title: 'Why a subject might not appear yet',
        body: 'Your subject list in Academics is built from your section’s weekly timetable. If a subject or timetable is empty, your School Administrator has not added timetable entries for your section yet.',
      },
    ],
    expectedOutcome: {
      summary: 'You know all subjects in your section, who teaches them, and your daily period timings.',
      verifyAt: 'Subjects shown in Academics match the subjects scheduled in your Time Table grid.',
    },
    relatedSlugs: [
      { category: 'student', slug: 'student-dashboard', reason: 'Return to My Status and notices.' },
      { category: 'student', slug: 'student-assignments', reason: 'View homework posted for your section.' },
    ],
  },
  {
    slug: 'student-assignments',
    category: 'student',
    group: 'Daily School Life',
    title: 'Viewing Homework & Submitting Assignments',
    summary:
      'Read class assignments, open teacher-attached resources, and turn in your completed work via link or file upload.',
    audience: ['Student'],
    accessPath: 'Sidebar → Assignments',
    keywords: [
      'how do i submit an assignment',
      'submit assignment',
      'turn in work',
      'homework',
      'upload file',
      'google drive link',
      'view resource',
    ],
    understanding: {
      whatItIs:
        'The Assignments page displays all homework and classwork posted for your section, along with due dates, teacher attachments, and a submission button.',
      whyYouNeedIt:
        'Instead of losing paper handouts or links, you can download instructions and submit your finished work directly from your Student account.',
      whatItProvides: [
        'Assignment cards filtered to your enrolled section.',
        'View Resource links whenever your teacher attaches a worksheet or document.',
        'Turn In Work modal supporting either a link (such as Google Drive or Google Docs) or a file upload.',
      ],
    },
    interfaceOverview: {
      elements: [
        {
          name: 'Assignment Card',
          kind: 'Card',
          description: 'Shows the title, description preview, Due date badge, and submission status.',
        },
        {
          name: 'View Resource',
          kind: 'Link',
          description: 'Appears if the teacher attached a file; opens the resource in a new tab.',
        },
        {
          name: 'Turn In Work',
          kind: 'Button',
          description: 'Opens the Submit Assignment dialog for unsubmitted assignments.',
        },
        {
          name: '✓ Submitted Badge',
          kind: 'Status Badge',
          description: 'Green confirmation indicator shown once your submission has been turned in.',
        },
      ],
    },
    instructions: [
      {
        steps: [
          {
            title: 'Open Assignments',
            location: 'Left Sidebar → Assignments',
            instruction: 'Click Assignments in the sidebar to see homework for your section.',
            expectedResult: 'All assignments for your section appear in a grid.',
          },
          {
            title: 'Open attached resources (if provided)',
            location: 'On an Assignment card',
            instruction: 'Click View Resource to open any file attached by your teacher.',
            expectedResult: 'The file or image opens in a new tab.',
          },
          {
            title: 'Click Turn In Work',
            location: 'Bottom of the Assignment card',
            instruction: 'Click Turn In Work on the assignment you are ready to submit.',
            expectedResult: 'The Submit Assignment dialog opens.',
          },
          {
            title: 'Provide a link or upload a file',
            location: 'Submit Assignment dialog',
            requiredInfo: 'Either a valid URL (such as a Google Drive/Docs link) OR a file (JPG, JPEG, PNG, PDF, DOC, or DOCX).',
            instruction:
              'Paste your link into the URL box or choose a file from your device. (If you provide both, the uploaded file is used.)',
            expectedResult: 'Your file or link is ready to submit.',
          },
          {
            title: 'Click Turn In',
            instruction: 'Review your attachment or link carefully, then click Turn In.',
            expectedResult:
              'A confirmation toast ("Assignment submitted successfully") appears and the card button updates to ✓ Submitted.',
          },
        ],
      },
    ],
    notes: [
      {
        type: 'warning',
        title: 'One-time submission only',
        body: 'Once you turn in an assignment and see ✓ Submitted, you cannot edit, unsubmit, or replace your submission. Check that you picked the right file or link before clicking Turn In.',
      },
      {
        type: 'restriction',
        title: 'Supported file formats',
        body: 'Uploaded files must be JPG, JPEG, PNG, PDF, DOC, or DOCX. Submitting without either a file or a URL will show an error.',
      },
    ],
    expectedOutcome: {
      summary: 'Your homework is submitted to your teacher and your pending count decreases.',
      verifyAt: 'Confirm the assignment card displays ✓ Submitted and your Dashboard Pending Assignments count updates.',
    },
    relatedSlugs: [
      { category: 'student', slug: 'student-dashboard', reason: 'Check Pending Assignments on your Dashboard.' },
      { category: 'common-help', slug: 'notifications-center', reason: 'Get notified whenever a new assignment is posted.' },
    ],
  },
  {
    slug: 'student-fees-pdfs',
    category: 'student',
    group: 'Fees & Payments',
    title: 'Viewing Fee Balances & Downloading PDF Invoices and Receipts',
    summary:
      'Check your total billed fees, remaining amount due, payment history, and download official PDF invoices and receipts.',
    audience: ['Student'],
    accessPath: 'Sidebar → Fees',
    keywords: [
      'fees',
      'pending fees',
      'where can i see pending fees',
      'invoice pdf',
      'receipt pdf',
      'fee summary',
      'transaction history',
      'download receipt',
    ],
    understanding: {
      whatItIs:
        'The Accounts & Fees section for students shows only your own fee balance, invoices, and payment history, along with official PDF documents.',
      whyYouNeedIt:
        'You can verify upcoming due dates, confirm when payments are approved, and download QR-verifiable PDF invoices and receipts for your records.',
      whatItProvides: [
        'Student Fee Summary tab showing Total Billed, Amount Due, Due Date, and current status (NO FEES, PAID, PARTIAL, PENDING, or OVERDUE).',
        'Transaction History tab listing every invoice and payment with status indicators.',
        'Official A4 PDF viewer and Download PDF button for every invoice and payment.',
      ],
    },
    interfaceOverview: {
      elements: [
        {
          name: 'Student Fee Summary Tab',
          kind: 'Tab',
          description: 'Displays your overall fee standing (Total Billed, Amount Due, Due Date, Status) and a View History button.',
        },
        {
          name: 'Transaction History Tab',
          kind: 'Tab',
          description: 'Lists all of your individual invoices and payments with INVOICES / PAYMENTS filter pills and a search bar.',
        },
        {
          name: 'View Document',
          kind: 'Button',
          description: 'Document icon on each row in Transaction History that opens the PDF invoice or payment receipt page.',
        },
        {
          name: 'Download PDF',
          kind: 'Button',
          description: 'Downloads the formatted PDF with school logo, status watermark, and verification QR code.',
        },
      ],
    },
    instructions: [
      {
        steps: [
          {
            title: 'Open Fees from the sidebar',
            location: 'Left Sidebar → Fees',
            instruction: 'Click Fees to open your Student Fee Summary.',
            expectedResult: 'Your current Total Billed, Amount Due, Due Date, and Status badge appear.',
          },
          {
            title: 'Switch to Transaction History',
            location: 'Student Fee Summary → View History (or Transaction History tab)',
            instruction: 'Click View History or select the Transaction History tab.',
            expectedResult: 'All of your fee invoices and payment entries appear in chronological order.',
          },
          {
            title: 'Open and download a PDF invoice or receipt',
            location: 'Actions column in Transaction History',
            instruction:
              'Click the View Document icon on any invoice or payment row. On desktop, preview the PDF inline and click Download PDF; on mobile, tap Download PDF directly.',
            expectedResult: 'The official PDF invoice or payment receipt downloads to your device.',
          },
        ],
      },
    ],
    notes: [
      {
        type: 'info',
        title: 'Your fee records are private',
        body: 'Students can only view and download their own fee summary, invoices, and payment receipts.',
      },
    ],
    expectedOutcome: {
      summary: 'You can verify your current fee balance and save official PDF invoices and receipts.',
      verifyAt: 'Open Transaction History to confirm each invoice’s status and download its PDF.',
    },
    relatedSlugs: [
      { category: 'student', slug: 'student-upi-payments', reason: 'Pay an unpaid invoice via UPI.' },
      { category: 'common-help', slug: 'notifications-center', reason: 'Receive alerts when new invoices or receipts are issued.' },
    ],
  },
  {
    slug: 'student-upi-payments',
    category: 'student',
    group: 'Fees & Payments',
    title: 'Paying Fees via UPI & Submitting Your UTR',
    summary:
      'Pay an unpaid or partially paid fee invoice using UPI and submit your UTR reference for Accounts verification.',
    audience: ['Student'],
    accessPath: 'Sidebar → Fees → Transaction History → Pay via UPI',
    prerequisites: [
      'An unpaid or partially paid fee invoice in your Transaction History.',
      'Your school must have its Merchant Name and UPI ID configured in School Settings.',
    ],
    keywords: [
      'upi',
      'pay fees',
      'pay via upi',
      'utr',
      'qr code',
      'verification pending',
      'rejected payment',
      'screenshot',
    ],
    understanding: {
      whatItIs:
        'The Pay via UPI workflow lets you transfer your exact remaining invoice balance using any UPI app and submit your transaction reference (UTR) so school Accounts staff can verify and approve it.',
      whyYouNeedIt:
        'Submitting the UTR and optional screenshot links your UPI transfer directly to the right invoice without needing to visit the fee desk.',
      whatItProvides: [
        'Automatic calculation of the remaining balance due on the invoice (accounting for any prior approved partial payments).',
        'A scannable QR code on desktop and a Pay Now with UPI App button on mobile devices.',
        'A two-step submission form for your UTR / Transaction Reference No and optional payment screenshot.',
      ],
    },
    interfaceOverview: {
      elements: [
        {
          name: 'Pay via UPI',
          kind: 'Button',
          description: 'Appears on unpaid or partially paid invoice rows in Transaction History.',
        },
        {
          name: 'UPI QR Code / Pay Now with UPI App',
          kind: 'Card',
          description: 'Step 1 view displaying Amount Due, Merchant name, Invoice No, UPI ID, and QR code (plus mobile deep-link button).',
        },
        {
          name: 'I have made the payment',
          kind: 'Button',
          description: 'Advances the dialog from Step 1 (QR/App) to Step 2 (UTR submission).',
        },
        {
          name: 'UTR / Transaction Reference No',
          kind: 'Form Field',
          description: 'Required reference number (for example, your 12-digit UPI UTR) from your UPI app.',
        },
        {
          name: 'Payment Screenshot (Optional)',
          kind: 'Form Field',
          description: 'Optional image upload of your UPI confirmation screen.',
        },
        {
          name: 'Verification Pending / Paid',
          kind: 'Status Badge',
          description: 'Status shown on the invoice row after submission and after approval.',
        },
      ],
    },
    instructions: [
      {
        steps: [
          {
            title: 'Locate an unpaid invoice',
            location: 'Sidebar → Fees → Transaction History',
            instruction: 'Find the invoice you want to pay and click Pay via UPI.',
            expectedResult: 'The UPI Payment dialog opens at Step 1 with the exact due amount.',
          },
          {
            title: 'Complete the UPI transfer',
            location: 'UPI Payment dialog — Step 1',
            instruction:
              'On desktop, scan the QR code using any UPI app; on mobile, tap Pay Now with UPI App. Complete the payment and copy your 12-digit UTR / Transaction Reference No.',
            expectedResult: 'Your UPI app confirms the transfer and displays a UTR number.',
          },
          {
            title: 'Advance to payment proof submission',
            instruction: 'Click I have made the payment.',
            expectedResult: 'The dialog moves to Step 2.',
          },
          {
            title: 'Enter your UTR and optional screenshot',
            location: 'UPI Payment dialog — Step 2',
            requiredInfo: 'UTR / Transaction Reference No (required) and Payment Screenshot (optional).',
            instruction:
              'Paste or type your UTR number, optionally attach a screenshot of the payment receipt, and click Submit Verification.',
            expectedResult:
              'Your payment is submitted for review by Accounts or School Admin, and they receive a notification.',
          },
          {
            title: 'Wait for Accounts verification',
            instruction:
              'Check Transaction History (refresh the page if the badge does not update right away) to see Verification Pending. Once approved, you receive a notification.',
            expectedResult:
              'When approved, the invoice status updates to Paid (or reflects the new remaining balance) and you can download the PDF receipt.',
          },
        ],
      },
    ],
    notes: [
      {
        type: 'info',
        title: 'UPI payments require manual verification',
        body: 'Invoices are not marked Paid automatically after submitting a UTR. Accounts staff or your School Admin verify the UTR against bank records first.',
      },
      {
        type: 'warning',
        title: 'If your UPI payment is rejected',
        body: 'Rejected UPI submissions appear in red in Transaction History, and the Pay via UPI button becomes available again on the invoice so you can submit a corrected payment or UTR.',
      },
      {
        type: 'restriction',
        title: 'If UPI is not configured for your school',
        body: 'If you see a message that the school UPI ID is not configured, contact your School Administration or Accounts desk for payment instructions.',
      },
    ],
    expectedOutcome: {
      summary: 'Your UPI payment proof is recorded as pending verification and linked to the selected invoice.',
      verifyAt: 'Reload Fees → Transaction History if needed and confirm the invoice shows Verification Pending (and Paid once approved).',
    },
    relatedSlugs: [
      { category: 'student', slug: 'student-fees-pdfs', reason: 'Download your updated PDF receipt once approved.' },
      { category: 'accounts', slug: 'upi-verification-receipts', reason: 'See how Accounts staff review and approve UPI submissions.' },
    ],
  },
];
