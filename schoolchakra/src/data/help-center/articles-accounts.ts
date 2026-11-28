import type { HelpArticle } from './types';

export const ACCOUNTS_ARTICLES: HelpArticle[] = [
  {
    slug: 'accounts-dashboard',
    category: 'accounts',
    group: 'Overview',
    title: 'Accounts Dashboard & Daily Priorities',
    summary:
      'Monitor fee collections, overdue invoices, collection health indicators, weekly trends, and recent financial activity at a glance.',
    audience: ['Accounts'],
    accessPath: 'Sidebar → Dashboard',
    keywords: [
      'accounts dashboard',
      'kpis',
      'total collected',
      'outstanding',
      'overdue',
      'collection health',
      'today priorities',
      'quick actions',
      'notices',
    ],
    understanding: {
      whatItIs:
        'The Accounts Dashboard is the home workspace for school accountants and fee officers, summarizing campus fee collections, overdue counts, and daily action priorities.',
      whyYouNeedIt:
        'It highlights which invoices need attention today, tracks weekly collection momentum, and surfaces recent payment activity without running manual spreadsheets.',
      whatItProvides: [
        '4 KPI Cards: Total Collected, Total Outstanding, Overdue Invoices, and Payments Received (This Month) with a 4-week Collection Trend Chart.',
        'Collection Health Status indicators (Healthy, Needs Attention, Critical) for Collection Rate, Outstanding Invoices, and Recent Activity.',
        'Today’s Priorities shortcuts (Overdue Invoices, Invoices Due Today, Payments Received Today) that jump straight to Fees.',
        'Pending Invoice Overview (top 5 unpaid invoices by highest balance), Collection Snapshot bar, Notices accordion, and Recent Activity timeline.',
      ],
    },
    interfaceOverview: {
      elements: [
        {
          name: 'KPI Cards & Collection Trend Chart',
          kind: 'Chart',
          description:
            'Top 4 cards displaying Total Collected, Total Outstanding, Overdue Invoices, and this month’s Payments Received with hoverable weekly bars.',
        },
        {
          name: 'Collection Health Status',
          kind: 'Card',
          description:
            'Color-coded indicators rating Collection Rate (>80% Healthy, 60–80% Needs Attention, <60% Critical) and overdue volume.',
        },
        {
          name: 'Today’s Priorities',
          kind: 'Button',
          description:
            'Three clickable priority counters (Overdue Invoices, Invoices Due Today, Payments Received Today) that open Fees.',
        },
        {
          name: 'Pending Invoice Overview',
          kind: 'Table',
          description:
            'Lists up to 5 largest unpaid invoices with Student name, ERP ID, Invoice Amount, Outstanding balance, and Status, plus View All →.',
        },
        {
          name: 'Quick Actions',
          kind: 'Card',
          description:
            'Includes Record Payment, View Outstanding, and Generate Invoice shortcuts to Fees.',
        },
        {
          name: 'Notices Accordion & Recent Activity',
          kind: 'Card',
          description:
            'Right-column collapsible Notices list (title and date for Accounts/Everyone notices) and a 15-item timeline of recent billing and payment events.',
        },
      ],
    },
    instructions: [
      {
        steps: [
          {
            title: 'Review KPIs and Collection Health',
            location: 'Top of Accounts Dashboard',
            instruction:
              'Check Total Collected, Total Outstanding, Overdue Invoices, and hover over the 4 weekly bars on Payments Received to inspect weekly totals.',
            expectedResult: 'You have an immediate snapshot of this month’s collection progress.',
          },
          {
            title: 'Act on Today’s Priorities or Pending Invoices',
            location: 'Today’s Priorities or Pending Invoice Overview',
            instruction:
              'Click any priority row or click View All → in Pending Invoice Overview.',
            expectedResult: 'You move directly into Accounts & Fees to follow up or record payments.',
          },
          {
            title: 'Check Notices and Recent Activity',
            location: 'Right column cards',
            instruction:
              'Expand Notices to view recent announcements and scan Recent Activity for newly submitted UPI payments or invoices.',
            expectedResult: 'You catch incoming student UPI proofs and staff announcements.',
          },
        ],
      },
    ],
    notes: [
      {
        type: 'restriction',
        title: 'Bulk Data Import is Admin-only',
        body: 'The Import Data shortcut leads to Bulk Data Import, which is restricted to School Administrators. If you need spreadsheet records imported, ask your School Admin to run the import.',
      },
      {
        type: 'info',
        title: 'Notices on Accounts Dashboard',
        body: 'Accounts users can read notice titles and dates in the Notices accordion, but cannot create, edit, or delete announcements.',
      },
    ],
    expectedOutcome: {
      summary: 'You can monitor fee collection health and jump directly to overdue balances or incoming payments.',
      verifyAt: 'Click any item under Today’s Priorities to verify it opens the Accounts & Fees workspace.',
    },
    relatedSlugs: [
      { category: 'accounts', slug: 'fee-summary-history', reason: 'Search student balances and inspect transaction history.' },
      { category: 'accounts', slug: 'upi-verification-receipts', reason: 'Verify incoming student UPI payments.' },
    ],
  },
  {
    slug: 'fee-summary-history',
    category: 'accounts',
    group: 'Billing & Collections',
    title: 'Searching Student Balances & Transaction History',
    summary:
      'Look up any student’s fee standing, filter overdue or pending balances, and inspect, edit, or delete invoices and payments.',
    audience: ['Accounts', 'School Admin'],
    accessPath: 'Sidebar → Fees',
    keywords: [
      'fee summary',
      'transaction history',
      'search student',
      'overdue',
      'partial',
      'paid',
      'edit invoice',
      'delete invoice',
      'delete payment',
    ],
    understanding: {
      whatItIs:
        'The Student Fee Summary and Transaction History tabs inside Accounts & Fees serve as your day-to-day student ledger.',
      whyYouNeedIt:
        'Before billing a student or accepting a walk-in payment, you can check their current balance, filter by status, and review every past invoice or receipt.',
      whatItProvides: [
        'Student Fee Summary tab with search by name/ERP ID and status pills: NO FEES, PAID, PARTIAL, PENDING, and OVERDUE.',
        'One-click Create Invoice (for NO FEES students) or View History (jumps straight to Transaction History filtered to that student’s ERP ID).',
        'Transaction History tab searchable by student name, ERP ID, Reference No., or Invoice Number, with INVOICES / PAYMENTS filters and row actions to view PDF, edit, or delete.',
      ],
    },
    interfaceOverview: {
      elements: [
        {
          name: 'Student Fee Summary Tab',
          kind: 'Tab',
          description: 'Lists students with Class/Sec, Total Billed, Amount Due, Due Date, Status badge, and quick action button.',
        },
        {
          name: 'Status Filter Pills',
          kind: 'Filter',
          description: 'Filter Summary rows by NO FEES, PAID, PARTIAL, PENDING, or OVERDUE. Click an active pill again to clear the filter.',
        },
        {
          name: 'View History',
          kind: 'Button',
          description: 'Switches to Transaction History and automatically pre-fills the search box with that student’s ERP ID.',
        },
        {
          name: 'Transaction History Tab',
          kind: 'Tab',
          description: 'Infinite-scroll list showing Transaction icon/student, Amount, Details (invoice no. or mode/ref), Remarks, Date, and Actions.',
        },
        {
          name: 'Row Actions (View Document / Edit / Delete)',
          kind: 'Button',
          description: 'Open the PDF viewer/download page, edit invoice/payment details, or delete an entry after confirmation.',
        },
      ],
    },
    instructions: [
      {
        groupTitle: 'Checking a Student’s Balance',
        steps: [
          {
            title: 'Search or filter in Student Fee Summary',
            location: 'Sidebar → Fees → Student Fee Summary',
            instruction:
              'Type a student’s name or ERP ID in the search bar, or click a status pill such as OVERDUE or PARTIAL.',
            expectedResult: 'Matching student rows display with Total Billed, Amount Due, and Due Date.',
          },
          {
            title: 'Jump to the student’s transactions',
            instruction: 'Click View History on the student’s row (or Create Invoice if they show NO FEES).',
            expectedResult: 'Transaction History opens filtered to that student’s ERP ID.',
          },
        ],
      },
      {
        groupTitle: 'Editing or Deleting a Transaction',
        steps: [
          {
            title: 'Locate the invoice or payment in Transaction History',
            location: 'Fees → Transaction History',
            instruction:
              'Search by student, ERP ID, Reference No., or Invoice Number, and optionally toggle INVOICES or PAYMENTS pills.',
            expectedResult: 'The target transaction row appears.',
          },
          {
            title: 'Edit or Delete the entry',
            location: 'Actions column on the row',
            instruction:
              'Click the Edit (pencil) icon to adjust amount, due date, billing month/year, mode, reference, or remarks (student and linked invoice stay locked). Or click Delete (trash) and confirm in the dialog.',
            expectedResult: 'Changes are saved after confirmation.',
          },
        ],
      },
    ],
    notes: [
      {
        type: 'warning',
        title: 'Deleting an invoice also deletes its payments',
        body: 'If you delete a fee invoice that has linked payments, all associated payment records are deleted as well. Always double-check before confirming deletion.',
      },
      {
        type: 'info',
        title: 'If the list does not refresh immediately after saving',
        body: 'After creating or editing an invoice or payment, reload the page if the updated row or status does not appear automatically.',
      },
    ],
    expectedOutcome: {
      summary: 'You can locate any student’s fee standing, audit past transactions, and correct erroneous entries.',
      verifyAt: 'Search the student’s ERP ID in Transaction History (reload if needed) to confirm the updated list.',
    },
    relatedSlugs: [
      { category: 'accounts', slug: 'invoices-and-payments', reason: 'Create new fee invoices or record payments.' },
      { category: 'accounts', slug: 'upi-verification-receipts', reason: 'Open PDF documents and verify UPI submissions.' },
    ],
  },
  {
    slug: 'invoices-and-payments',
    category: 'accounts',
    group: 'Billing & Collections',
    title: 'Creating Fee Invoices & Recording Payments',
    summary:
      'Generate sequential student fee invoices and log Cash, Online Transfer, Cheque, or Card payments against outstanding invoices.',
    audience: ['Accounts', 'School Admin'],
    accessPath: 'Sidebar → Fees → + Add Transaction',
    prerequisites: ['Active student profiles must exist in the school.'],
    keywords: [
      'create invoice',
      'generate invoice',
      'record payment',
      'add transaction',
      'cash',
      'cheque',
      'card',
      'online transfer',
      'due date',
    ],
    understanding: {
      whatItIs:
        'The Add Transaction dialog handles both creating new fee invoices for students and recording payments received at the fee desk.',
      whyYouNeedIt:
        'Creating structured invoices assigns an automatic sequential invoice number and notifies the student, while recording payments keeps student balances and reports accurate.',
      whatItProvides: [
        'Mode switcher between Create Invoice and Record Payment.',
        'Searchable student selector showing ERP ID, class details, and current dues.',
        'Automatic invoice numbering and student notifications on both invoice creation and payment recording.',
      ],
    },
    interfaceOverview: {
      elements: [
        {
          name: '+ Add Transaction',
          kind: 'Button',
          description: 'Top-right button on Accounts & Fees that opens the Create Invoice / Record Payment modal.',
        },
        {
          name: 'Create Invoice Form',
          kind: 'Form Field',
          description: 'Includes Student selector, Amount (₹), optional Due Date, Billing Month, Billing Year, and Remarks.',
        },
        {
          name: 'Record Payment Form',
          kind: 'Form Field',
          description: 'Includes Student selector, Outstanding Invoice dropdown, Amount Paid (₹), Payment Mode (Cash, Online Transfer, Cheque, Credit/Debit Card), Reference No., and Remarks.',
        },
      ],
    },
    instructions: [
      {
        groupTitle: 'Creating a Fee Invoice',
        steps: [
          {
            title: 'Open Add Transaction in Create Invoice mode',
            location: 'Fees → + Add Transaction (or Create Invoice on a NO FEES student row)',
            instruction: 'Click + Add Transaction and select Create Invoice.',
            expectedResult: 'The Create Invoice fields appear.',
          },
          {
            title: 'Select the student and enter billing details',
            requiredInfo: 'Student, Amount (₹) greater than 0, Billing Month, Billing Year; Due Date and Remarks are optional.',
            instruction:
              'Search and select the Student, enter the Amount (₹), confirm Billing Month and Billing Year, and optionally set a Due Date and Remarks (such as "Tuition Fee").',
            expectedResult: 'The student’s class and current dues preview underneath the selector.',
          },
          {
            title: 'Click Create Invoice',
            instruction: 'Submit the form to generate the invoice.',
            expectedResult:
              'An invoice number (INV-YYYY-MM-...) is created and the student is notified. Reload the page if the new row does not appear immediately.',
          },
        ],
      },
      {
        groupTitle: 'Recording an Offline or Desk Payment',
        steps: [
          {
            title: 'Open Add Transaction in Record Payment mode',
            location: 'Fees → + Add Transaction → Record Payment',
            instruction: 'Click + Add Transaction and switch to Record Payment.',
            expectedResult: 'The payment recording fields appear.',
          },
          {
            title: 'Select Student and Outstanding Invoice',
            requiredInfo: 'Student, Outstanding Invoice, Amount Paid (₹), Payment Mode (Cash, Online Transfer, Cheque, or Credit/Debit Card).',
            instruction:
              'Choose the Student, pick the unpaid/partial invoice from Outstanding Invoice, enter Amount Paid (₹), choose Payment Mode, and optionally add Reference No. and Remarks.',
            expectedResult: 'Payment details are ready to save.',
          },
          {
            title: 'Click Record Payment',
            instruction: 'Submit the payment form.',
            expectedResult:
              'The payment is recorded as successful and the student receives a notification. Reload the page if needed to see the updated balance and history.',
          },
        ],
      },
    ],
    notes: [
      {
        type: 'warning',
        title: 'Set a Due Date for Fee Insights reporting',
        body: 'Fee Insights reports and Fee Defaulters filter invoices by their Due Date. Invoices created without a Due Date will not appear in Fee Insights calculations or Defaulters tables.',
      },
      {
        type: 'info',
        title: 'If an expected invoice is missing from Outstanding Invoice',
        body: 'The Outstanding Invoice dropdown pulls from invoices loaded in Transaction History. If an older invoice does not appear, search for the student in Transaction History first, then open Add Transaction.',
      },
    ],
    expectedOutcome: {
      summary: 'New student invoices and payments are saved and reflected in student balances and PDF documents.',
      verifyAt: 'Refresh Fees if needed and check Transaction History to confirm the new invoice or payment row.',
    },
    relatedSlugs: [
      { category: 'accounts', slug: 'fee-summary-history', reason: 'Inspect, edit, or delete transactions in History.' },
      { category: 'accounts', slug: 'fee-insights-reports', reason: 'Track collection rates and overdue defaulters.' },
    ],
  },
  {
    slug: 'upi-verification-receipts',
    category: 'accounts',
    group: 'Billing & Collections',
    title: 'Verifying Student UPI Payments & Issuing PDF Receipts',
    summary:
      'Review student-submitted UTR numbers and payment screenshots, approve or reject UPI transfers, and download PDF invoices or receipts.',
    audience: ['Accounts', 'School Admin'],
    accessPath: 'Sidebar → Fees → Verification tab / Transaction History → View Document',
    keywords: [
      'upi verification',
      'approve payment',
      'reject payment',
      'utr',
      'screenshot',
      'pdf receipt',
      'invoice pdf',
      'qr code',
    ],
    understanding: {
      whatItIs:
        'The Verification tab lists all student UPI payments waiting for confirmation, while Transaction History gives access to formatted PDF invoices and payment receipts.',
      whyYouNeedIt:
        'Verifying UTR references against your school bank account ensures only confirmed UPI transfers mark an invoice as paid and notify the student.',
      whatItProvides: [
        'Pending verification queue showing Student & Invoice, Amount, UTR No., Screenshot link, and Submitted At timestamp.',
        'Local search across student name, ERP ID, or UTR number.',
        'Approve and Reject actions with confirmation dialogs, plus QR-verifiable A4 PDF invoices and receipts.',
      ],
    },
    interfaceOverview: {
      elements: [
        {
          name: 'Verification Tab',
          kind: 'Tab',
          description: 'Third tab inside Accounts & Fees showing a pending counter badge and verification queue.',
        },
        {
          name: 'Verification Search Input',
          kind: 'Filter',
          description: 'Filters pending UPI submissions by student name, ERP ID, or UTR number.',
        },
        {
          name: 'Screenshot (View Link)',
          kind: 'Link',
          description: 'Opens the student’s uploaded UPI confirmation screenshot (shows None if not uploaded).',
        },
        {
          name: 'Approve / Reject',
          kind: 'Button',
          description: 'Opens a confirmation dialog to finalize the payment as approved or rejected.',
        },
        {
          name: 'View Document (Transaction History)',
          kind: 'Button',
          description: 'Opens the PDF viewer/download page for any invoice or approved payment receipt.',
        },
      ],
    },
    instructions: [
      {
        groupTitle: 'Verifying a Student UPI Payment',
        steps: [
          {
            title: 'Open the Verification tab',
            location: 'Sidebar → Fees → Verification',
            instruction: 'Switch to the Verification tab to see all pending UPI submissions.',
            expectedResult: 'Pending payments display with student name, invoice number, amount, and UTR No.',
          },
          {
            title: 'Inspect UTR and screenshot proof',
            instruction:
              'Check the UTR No. against your school bank statement and click View under Screenshot if an image was attached.',
            expectedResult: 'You confirm whether the transfer actually settled for the stated amount.',
          },
          {
            title: 'Approve or Reject the payment',
            instruction:
              'Click Approve (if verified) or Reject (if invalid or not received), then confirm in the dialog.',
            expectedResult:
              'The entry is removed from the pending queue, its status updates to SUCCESS or REJECTED, and the student receives a notification. If rejected, the student can retry Pay via UPI.',
          },
        ],
      },
      {
        groupTitle: 'Viewing or Downloading a PDF Invoice or Receipt',
        steps: [
          {
            title: 'Open View Document from Transaction History',
            location: 'Fees → Transaction History → Actions column',
            instruction: 'Click the View Document icon on any invoice or payment row.',
            expectedResult:
              'On desktop, an inline A4 PDF preview opens with school logo, status watermark, and QR code; click Download PDF to save a copy (mobile shows Download PDF directly).',
          },
        ],
      },
    ],
    notes: [
      {
        type: 'info',
        title: 'Already-verified payments',
        body: 'If another staff member (such as a School Admin) has already approved or rejected a payment, attempting to verify it again returns a notice that the payment was already processed.',
      },
    ],
    expectedOutcome: {
      summary: 'Pending UPI transfers are reconciled cleanly and official PDF receipts are ready for download.',
      verifyAt: 'Check Transaction History to see the approved payment in green and open its PDF receipt.',
    },
    relatedSlugs: [
      { category: 'student', slug: 'student-upi-payments', reason: 'See the student’s side of submitting a UPI UTR.' },
      { category: 'accounts', slug: 'fee-insights-reports', reason: 'See how approved payments reflect in Fee Insights.' },
    ],
  },
  {
    slug: 'fee-insights-reports',
    category: 'accounts',
    group: 'Reporting',
    title: 'Analyzing Fee Insights & Overdue Defaulters',
    summary:
      'Review expected vs. collected fees, payment method breakdowns, and overdue student defaulters filtered by date, class, and section.',
    audience: ['Accounts', 'School Admin'],
    accessPath: 'Sidebar → Reports (Fee Insights tab)',
    keywords: [
      'fee insights',
      'reports',
      'collection rate',
      'payment methods',
      'defaulters',
      'overdue',
      'expected amount',
      'date range',
    ],
    understanding: {
      whatItIs:
        'Fee Insights in Reports & Insights gives Accounts staff analytical visibility into billing targets, actual collections, payment channels, and overdue accounts.',
      whyYouNeedIt:
        'Filtering by month, term, or class helps you evaluate collection efficiency and quickly build a follow-up list of overdue students.',
      whatItProvides: [
        'Filter Bar with Date Range presets (Today, This Week, This Month, Last Month, This Year, Custom Range) plus optional Class and Section filters.',
        '4 KPI Cards: Expected Amount, Collected Amount, Outstanding, and Collection Rate.',
        'Payment Methods breakdown showing totals and percentages across Cash, UPI, Online, and other modes.',
        'Fee Defaulters table listing students with overdue unpaid balances and Days Overdue badges.',
      ],
    },
    interfaceOverview: {
      elements: [
        {
          name: 'Filter Bar',
          kind: 'Filter',
          description:
            'Includes Date Range preset (defaults to This Month), optional Class and Section dropdowns, and Apply Filters button.',
        },
        {
          name: 'Fee KPI Cards',
          kind: 'Card',
          description:
            'Displays Expected Amount, Collected Amount, Outstanding, and Collection Rate progress bar.',
        },
        {
          name: 'Payment Methods Card',
          kind: 'Chart',
          description:
            'Ranks confirmed payment modes (such as CASH, UPI, ONLINE) with rupee totals and share bars.',
        },
        {
          name: 'Fee Defaulters Table',
          kind: 'Table',
          description:
            'Infinite-scroll table showing Student, Class/Sec, Pending Amount, and Overdue days badge (red when over 30 days, amber otherwise).',
        },
      ],
    },
    instructions: [
      {
        steps: [
          {
            title: 'Open Reports',
            location: 'Left Sidebar → Reports',
            instruction: 'Click Reports in the sidebar. Accounts users open directly on Fee Insights.',
            expectedResult: 'The Filter Bar and default This Month analytics load.',
          },
          {
            title: 'Choose Date Range and optional Class/Section',
            location: 'Filter Bar',
            requiredInfo: 'If selecting Custom Range, both Start Date and End Date are required.',
            instruction:
              'Pick a Date Range preset (or Custom Range with Start and End Dates) and optionally narrow down to a Class and Section.',
            expectedResult: 'Filter controls reflect your chosen period and scope.',
          },
          {
            title: 'Click Apply Filters',
            instruction: 'Click Apply Filters to update KPIs, Payment Methods, and Fee Defaulters.',
            expectedResult: 'All four KPI cards, payment method bars, and the Fee Defaulters table refresh.',
          },
        ],
      },
    ],
    notes: [
      {
        type: 'warning',
        title: 'Invoices must have a Due Date to appear in Fee Insights',
        body: 'Fee Insights calculates Expected Amount, Collected Amount, and Fee Defaulters using invoices whose Due Date falls within your selected date range. Invoices created without a Due Date are excluded.',
      },
      {
        type: 'restriction',
        title: 'Attendance Insights is not available to Accounts',
        body: 'Accounts users only have access to the Fee Insights tab in Reports.',
      },
    ],
    expectedOutcome: {
      summary: 'You have an accurate view of collection efficiency, payment channels, and overdue student balances.',
      verifyAt: 'Scroll the Fee Defaulters table to review overdue students and days past due for your chosen filters.',
    },
    relatedSlugs: [
      { category: 'accounts', slug: 'invoices-and-payments', reason: 'Add due dates when creating invoices so they appear in reports.' },
      { category: 'accounts', slug: 'fee-summary-history', reason: 'Look up an individual defaulter’s full history.' },
    ],
  },
];
