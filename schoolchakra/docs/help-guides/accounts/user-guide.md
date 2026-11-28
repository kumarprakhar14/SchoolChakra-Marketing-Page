# Accounts (`ACCOUNTS`) User Guide & Help Video Documentation

> **Role Code:** `ACCOUNTS`  
> **Primary Entry Route:** `/` (`AccountsDashboard`)  
> **Shared UI Reference:** See [Common UI Guide](../shared/common-ui-guide.md) for Login, Top Search Bar, Notifications, Bug Reporting, and Profile controls.

---

## A. Role Overview

- **Who This Role Represents:** The School Accountant, Bursar, or Fee Collection Officer responsible for managing student fee billing, recording payments, verifying student UPI payment proofs, issuing PDF invoices/receipts, and tracking fee collection reports and defaulters.
- **Key Responsibilities in SchoolChakra:**
  - Monitoring real-time fee collection KPIs, collection health status, overdue counts, and weekly collection trends on the Accounts Dashboard.
  - Generating monthly fee invoices for students and updating/deleting invoices when needed.
  - Recording offline/online fee payments (`CASH`, `ONLINE`, `CHEQUE`, `CARD`) against outstanding invoices.
  - Reviewing and approving or rejecting UPI payment proofs (UTR + optional screenshot) submitted by students.
  - Viewing and downloading PDF invoices and payment receipts.
  - Analyzing Fee Insights reports (expected vs. collected amounts, payment mode breakdown, and overdue defaulters).
- **Accessible Modules:**
  - Dashboard (`/`)
  - Accounts & Fees (`/fees`, `/invoices/:invoiceId`, `/payments/:paymentId`)
  - Reports & Insights (`/reports` — **Fee Insights tab only**)
  - My Profile (`/profile` — read-only) & Notifications (`/notifications`)
- **Restrictions (Cannot Access or Modify):**
  - **Blocked on Frontend & Backend:** Cannot access User Management (`/admin/users`), Data Import (`/admin/import`), Academic Calendar management (`/admin/academic-calendar`), School Settings (`/admin/settings`), or Super Admin routes (`/super-admin/*`).
  - **Important Dashboard Button Caveat:** The **Import Data** quick-action button on `AccountsDashboard.jsx` navigates to `/admin/import`, which is restricted to `ADMIN` only in both `App.jsx` (`<ProtectedRoute allowedRoles={['ADMIN']} />`) and `import.routes.js` (`roleMiddleware(['ADMIN', 'SUPER_ADMIN'])`). Clicking it shows **"Access Denied"**.
  - **Reports Scope:** On `/reports`, only the **Fee Insights** tab is accessible; Attendance Reports endpoints (`/reports/attendance/*`) return `403`.
  - **Notices:** Can view school notices targeted to `ACCOUNTS` or `EVERYONE` via the Dashboard **Notice Peek** drawer, **cannot** create, edit, or delete notices (`notice.routes.js` restricts writes to `ADMIN` and `TEACHER`).
  - **Academic / Classroom Writes:** Not in sidebar; cannot mark attendance, create assignments, modify classes/sections, or edit timetables.
  - **Global Search Behavior:** Can search students, invoices, and payments in the Navbar search bar (`searchService.js`), **but clicking a student result navigates to `'#'` (no-op)** because non-admins have no user profile detail route. Clicking an invoice or payment opens `/fees`.
- **Interactions with Other Roles:**
  - Collaborates with **School Admin** on fee management, invoice/payment corrections, and UPI verification.
  - Receives UPI payment submissions from **Students** and sends approval/rejection notifications back to Students.
  - Receives notices published by **School Admin** and **Teachers**.

---

## B. Login & First-Time Experience

1. **Logging In:** Navigate to `/login`, enter the Accounts staff ERP ID and password created by the School Admin, and click **Sign in**.
2. **Post-Authentication:** Redirects to `/` (`DashboardRouter` → `Dashboard` → `AccountsDashboard`). Note that `Dashboard` delegates rendering entirely to `AccountsDashboard`, which independently fetches `GET /api/dashboard/accounts` and `GET /api/academic-calendar/today`.
3. **Initial Application Layout:**
   - **Header (`Navbar`):** Global search bar (students, invoices, payments), Notification Bell, and Profile Menu (`My Profile`, `Notification History`, `Log out`).
   - **Sidebar (`Sidebar`):** School logo & name, 3 navigation items (`Dashboard`, `Fees`, `Reports`), `"Found a bug?"` card, and `"User Guide"` button.
4. **Empty / Error State:**
   - If the school has no invoices or payments yet, KPIs show `₹0` and `0`, **Collection Snapshot** displays `"No collection data yet."`, **Pending Invoice Overview** displays `"No pending invoices at the moment."`, **Recent Activity** displays `"No recent activity recorded."`, and **Notices** displays `"No recent notices published."`
   - If `GET /api/dashboard/accounts` fails, `AccountsDashboard` returns `null` (blank content area — unlike Admin/Teacher/Student, it does not render `FallbackDashboard`).

---

## C. Dashboard: Detailed Breakdown (`AccountsDashboard.jsx`)

All dashboard data is fetched dynamically from `GET /api/dashboard/accounts` and `GET /api/academic-calendar/today`.

### 1. Browser Push Notification Banner (`PushNotification`)
- **Displays:** Opt-in browser notification prompt or blocked-permission warning (*see [Common UI Guide](../shared/common-ui-guide.md) regarding the `/notifications/subscribe` bug*).

### 2. Welcome Banner
- **Displays:** Time-based greeting (`"Good Morning/Afternoon/Evening, {user.name}"`), `"Welcome back to {schoolName}."`, **Academic Calendar Status Badge** (`Working Day`, `HOLIDAY • ...`, or `VACATION • ...`), formatted current date (`en-US`), and `"Fee Collection Workspace"`.
- **Interactivity:** Non-interactive header.

### 3. KPI Cards (4-Card Grid)
1. **Total Collected:** Sum of all payments in the school (`₹`, formatted with `en-IN` commas; *note: `getAccountsDashboardStats` sums all `Payment` records regardless of `status`*).
2. **Total Outstanding:** Sum of `(invoice.totalAmount - sum(payments))` across unpaid/partially paid invoices.
3. **Overdue Invoices:** Count of unpaid/partially paid invoices where `dueDate < todayStart`.
4. **Payments Received (`This Month`):** Count of payments received in the current calendar month, paired with a 4-bar **CollectionTrendChart** (`Week 1` days 1–7, `Week 2` days 8–14, `Week 3` days 15–21, `Week 4` days 22–end of month) showing hover tooltips with weekly `₹` totals.

### 4. Collection Health Status (Left Area, Top-Left Card)
Displays 3 rule-based health indicators:
- **Collection Rate (`{collectionRate}%`):** `Healthy` (>80%, green), `Needs Attention` (60–80%, amber), `Critical` (<60%, red).
- **Outstanding Invoices:** `Healthy` (≤10 overdue), `Needs Attention` (11–50 overdue), `Critical` (>50 overdue).
- **Recent Activity:** `Active` (≥1 payment this month, blue) or `Quiet` (0 payments this month, gray).

### 5. Today's Priorities (Left Area, Top-Right Card)
Three interactive buttons that all navigate directly to `/fees`:
- **Overdue Invoices** (count badge in red).
- **Invoices Due Today** (count badge in amber).
- **Payments Received Today** (count badge in emerald).

### 6. Pending Invoice Overview (Left Area, Bottom Table)
- **Displays:** Top 5 unpaid invoices sorted by largest `outstandingAmount` first, with a **"View All →"** link to `/fees`.
- **Columns / Mobile Cards:** `Student` (`name` + `erpId`), `Invoice Amount`, `Outstanding`, and `Status` (`OVERDUE` red or `PENDING` amber).
- **Empty State:** `"No pending invoices at the moment."`

### 7. Quick Actions (Right Column, Top Card)
4 action tiles:
1. **Record Payment** → navigates to `/fees`
2. **View Outstanding** → navigates to `/fees`
3. **Generate Invoice** → navigates to `/fees`
4. **Import Data** → navigates to `/admin/import` *(**Inaccessible Caveat:** Blocked by `ADMIN`-only `ProtectedRoute`, resulting in `"Access Denied"` for `ACCOUNTS` users).*

### 8. Collection Snapshot (Right Column, Second Card)
- **Displays:** Segmented horizontal progress bar (`Paid` emerald, `Pending` amber, `Overdue` red) with hover tooltips showing exact `₹` values and compact `₹K` / `₹L` readouts below.
- **Empty State:** `"No collection data yet."`

### 9. Notices Accordion (Right Column, Third Card)
- **Displays:** Collapsible `"Notices"` header showing a `"{N} New"` pill when collapsed and notices exist (fetches up to 3 latest active notices targeted to `ACCOUNTS` or `EVERYONE`).
- **Expanded Content:** Shows each notice's **title** and **date** *(note: unlike `AdminDashboard`/`GeneralDashboard`, full notice content is not displayed in `AccountsDashboard`, and clicking a notice card does not navigate or open a modal despite having `cursor-pointer` styling)*.
- **Empty State:** `"No recent notices published."`

### 10. Recent Activity Timeline (Right Column, Bottom Card)
- **Displays:** Up to 15 recent financial events (`PAYMENT_RECEIVED`, `PAYMENT_PENDING`, `PAYMENT_REJECTED`, `INVOICE_GENERATED`, `FEE_STRUCTURE_CREATED`) sorted newest first with color-coded icons and timestamps.
- **Empty State:** `"No recent activity recorded."`

### Recommended First-Time Dashboard Walkthrough Sequence
1. Start at the **Welcome Banner** (`Fee Collection Workspace`) and **4 KPI Cards** (highlighting the `CollectionTrendChart` hover tooltip).
2. Review **Collection Health** and **Today's Priorities** (demonstrate clicking a priority item to jump to `/fees`).
3. Inspect **Pending Invoice Overview** and **Collection Snapshot** on the right.
4. Expand **Notices** and **Recent Activity** to show incoming UPI submissions and invoices.
5. Mention **Quick Actions** (and advise viewers that **Import Data** is reserved for School Admins).

---

## D. Navigation & Module Inventory

| Navigation Label | Route | Purpose | Subpages / Tabs | Access & Dependencies |
|---|---|---|---|---|
| **Dashboard** | `/` | Financial KPIs, collection health, priorities, top pending invoices | Single view (`AccountsDashboard`) | Invoices, Payments, FeeStructures, Notices, Calendar |
| **Fees** | `/fees` | Complete student fee billing, payment recording, UPI verification, PDFs | 3 Tabs: `Student Fee Summary`, `Transaction History`, `Verification` + `/invoices/:invoiceId` + `/payments/:paymentId` | Requires enrolled Students; UPI requires School Settings UPI config |
| **Reports** | `/reports` | Financial analytics & defaulter tracking | 1 Tab (`Fee Insights`) + `ReportFilterBar` | `Attendance Insights` tab hidden/blocked |
| *(Header / Sidebar)* | `/profile`, `/notifications`, `/user-guide` | Read-only profile, notifications, help docs, bug report modal | See [Common UI Guide](../shared/common-ui-guide.md) | Authenticated session |

---

## E. Detailed Module-by-Module User Stories

### Module 1: Accounts & Fees (`/fees`, `/invoices/:invoiceId`, `/payments/:paymentId`)

#### 1. Module Introduction
The primary operational workspace for Accounts staff: track each student's billing status, issue invoices, record offline/online payments, edit/delete erroneous transactions, print/download PDF invoices and receipts, and verify student UPI payment proofs.

#### 2. Initial Screen & UI Elements
- **Header:** `"Accounts & Fees"`, subtitle `"Manage student fee records and transactions"`, and **"+ Add Transaction"** button.
- **3 Tabs:** `Student Fee Summary`, `Transaction History`, `Verification`.

#### 3. Available User Actions by Tab

##### Tab 1: Student Fee Summary (`GET /api/fees/summary`)
- **Search & Filter:**
  - Search input (`"Search student or ERP ID..."`, 350ms debounce).
  - Status pills: `NO FEES`, `PAID`, `PARTIAL` (`PARTIALLY_PAID`), `PENDING`, `OVERDUE` (click active pill to clear back to `ALL`).
- **Table / Mobile Cards (InfiniteScroll, 20 per page):**
  - Columns: `Student` (`name`, `erpId`), `Class/Sec`, `Total Billed` (`₹`), `Amount Due` (`₹`), `Due Date`, `Status` badge, `Action`.
  - **Quick Action:** `NO_FEES` students display **Create Invoice** (opens Add Transaction modal pre-selected to that student); all other students display **View History** (switches to History tab and pre-populates search with the student's ERP ID).

##### Tab 2: Transaction History (`GET /api/fees/history`)
- **Search & Filter:**
  - Search input (`"Search student, ERP ID, Ref No, or Invoice..."`, 350ms debounce).
  - Type pills: `INVOICES` and `PAYMENTS` (client-side filter over loaded rows).
- **Table / Mobile Cards (InfiniteScroll, 20 per page):**
  - Columns: `Transaction` (direction icon + student name/ERP ID; rejected payments show red `X`), `Amount` (`+₹...` emerald for non-rejected payments, red for rejected), `Details` (Invoice No + billing month/year OR payment mode + reference no), `Remarks`, `Date`, `Actions`.
  - **Row Actions:**
    - **View Document** (`FileText`) → opens `/invoices/:id` or `/payments/:id` (inline A4 PDF viewer on desktop, PDF download button on mobile, status watermark, QR code).
    - **Edit** (`Edit2`) → opens transaction modal in Edit mode (`PUT /api/fees/invoice/:id` or `PUT /api/fees/payment/:id`). Note: student and linked invoice are locked during edit.
    - **Delete** (`Trash2`) → opens `ConfirmDialog` (`DELETE /api/fees/invoice/:id` or `DELETE /api/fees/payment/:id`). Deleting an invoice with payments warns that all associated payments will also be deleted.
  - **Implementation Note on `"Added By"` Tracking:** Although backend queries store/return `creator` (`createdBy`) and `receiver` (`receivedBy`), neither `Fees.jsx` nor `InvoiceDocument.jsx` / `PaymentReceiptDocument.jsx` renders `"Added By"` in the UI.

##### Add / Edit Transaction Modal (`+ Add Transaction`)
- **Mode Switcher:** **Create Invoice** vs **Record Payment**.
- **Create Invoice (`POST /api/fees/invoice`):**
  - `Student` (required, searchable `EntityCombobox` showing `name`, `erpId`, `classDetails`, and current due badge, plus a Student Details preview card showing Class, Admission No, and Outstanding Fees).
  - `Amount (₹)` (required, `number`, `step="0.01"`, validated `> 0`).
  - `Due Date (Optional)` (`date`).
  - `Billing Month` (required, `January`–`December`, defaults to current month).
  - `Billing Year` (required, `number`, `2000`–`2100`, defaults to current year).
  - `Remarks` (optional, e.g., `"Tuition Fee"`).
  - Generates invoice number `INV-{year}-{month}-{8hex}` and sends push/in-app notification to the student.
- **Record Payment (`POST /api/fees/payment`):**
  - `Student` (required, searchable `EntityCombobox`).
  - `Outstanding Invoice` (required on create; dropdown populated from unpaid/partial invoices in loaded `feeHistory` for that student).
  - `Amount Paid (₹)` (required, positive number).
  - `Payment Mode` (required in UI: `Cash` [`CASH`], `Online Transfer` [`ONLINE`], `Cheque` [`CHEQUE`], `Credit/Debit Card` [`CARD`]).
  - `Reference No.` (optional).
  - `Remarks` (optional).
  - Records `Payment` with `status: 'SUCCESS'` and sends push/in-app notification to the student.

##### Tab 3: Verification (`PaymentVerification.jsx`)
- **Search & Badge:** Local search input (`"Search student, ERP ID, or UTR..."`) and `"{N} pending"` counter.
- **Pending Queue (`GET /api/fees/upi/pending`, 20 per page):**
  - Displays `Student & Invoice` (`name`, `erpId`, `invoiceNumber`), `Amount` (`₹`), `UTR No.`, `Screenshot` (`View` external link or `None`), `Submitted At`, and **Approve** / **Reject** buttons.
- **Verify Action (`POST /api/fees/upi/:paymentId/verify`):**
  - Clicking **Approve** or **Reject** opens `ConfirmDialog` (`"Approve Payment"` / `"Reject Payment"`).
  - Confirming updates payment status to `SUCCESS` (if approved) or `REJECTED` (if rejected), removes it from the pending queue, and notifies the student.

#### 4. Step-by-Step User Flow (Generate Invoice, Record Payment, Verify UPI)
1. Click **Fees** in the sidebar.
2. To bill a student, click **Add Transaction** (or **Create Invoice** next to a `NO FEES` student), pick the student, enter amount, month, year, optional due date and remarks, and click **Create Invoice**.
3. To log an offline payment, click **Add Transaction** → **Record Payment**, select the student and their outstanding invoice, enter amount, mode, and optional reference number, and click **Record Payment**.
4. To review a student's UPI payment, open the **Verification** tab, check the **UTR No.** and **Screenshot**, click **Approve** (or **Reject**), and confirm.
5. In **Transaction History**, click the document icon on any invoice or payment to view or download the PDF.

#### 5. Important Edge Cases
- **Frontend Refresh Bug (`Fees.jsx`):** Lines 189, 207, and 782 invoke an undefined `fetchData()` function after `POST`/`PUT` invoice or payment succeeds, causing the `catch` block to show an error toast (`"Failed to save invoice"` / `"Failed to save payment"`) even though the backend persisted the record. Reloading the page displays the new/updated entry.
- **Student Dropdown Limit:** `fetchStudentsData()` fetches `GET /api/users?role=STUDENT&limit=100`, so schools with more than 100 students will only see the first 100 in the `EntityCombobox`.
- **Outstanding Invoice Dropdown Dependency:** Populated from currently loaded `feeHistory` items; if an older invoice hasn't been scrolled/searched into `feeHistory` yet, search for the student in History first.
- **Already-Verified Payment (`400`):** Attempting to approve/reject a payment that is no longer `PENDING_VERIFICATION` returns `"Payment is already {STATUS}"`.

#### 6. Related Modules
- **Dashboard (`/`):** Updates Total Collected, Total Outstanding, Overdue Invoices, Today's Priorities, and Recent Activity.
- **Reports (`/reports`):** Feeds Fee Collection Summary, Payment Methods, and Fee Defaulters.

---

### Module 2: Reports & Insights — Fee Insights (`/reports`)

#### 1. Module Introduction
Gives Accounts staff analytical visibility into expected vs. collected fees, payment mode distribution, and overdue defaulters across configurable dates, classes, and sections.

#### 2. Initial Screen & UI Elements
- **Header:** `"Reports & Insights"`, subtitle `"Analyze school performance and financials."`
- **Tab Bar:** Shows only **Fee Insights** (`Attendance Insights` is hidden for `ACCOUNTS`).
- **Filter Bar (`ReportFilterBar.jsx`):**
  - `Date Range` (`Today`, `This Week`, `This Month` [default], `Last Month`, `This Year`, `Custom Range` with Start/End Date).
  - `Class (Optional)` and `Section (Optional)` (populated from `GET /api/classes`).
  - **Apply Filters** button.

#### 3. Available User Actions & Data Breakdown
- **4 KPI Cards (`GET /api/reports/fees/collection-summary`):**
  1. `Expected Amount` (sum of `totalAmount` on invoices whose `dueDate` falls within the selected date range).
  2. `Collected Amount` (sum of `SUCCESS` payments for those invoices).
  3. `Outstanding` (`max(0, expected - collected)`).
  4. `Collection Rate` (`collected / expected * 100` progress bar).
- **Payment Methods (`GET /api/reports/fees/payment-methods`):**
  - Sorted list of payment modes (`CASH`, `UPI`, `ONLINE`, `Unknown`, etc.) with `₹` totals and percentage progress bars.
- **Fee Defaulters (`GET /api/reports/fees/defaulters`):**
  - Infinite-scroll `ResponsiveTable` listing overdue unpaid invoices (`dueDate` within selected range AND `dueDate < CURRENT_DATE` AND `pendingAmount > 0`), showing `Student`, `Class/Sec`, `Pending Amount`, and `Overdue` (`{daysOverdue} Days`, red if `> 30` else amber).
  - **Empty State:** `"No fee defaulters found for this period."`

#### 4. Step-by-Step User Flow
1. Click **Reports** in the sidebar.
2. Choose a **Date Range** preset (or **Custom Range**) and optionally select a **Class** and **Section**.
3. Click **Apply Filters**.
4. Review the 4 collection KPI cards, Payment Methods breakdown, and Fee Defaulters table (scroll to load more defaulters if needed).

#### 5. Important Edge Cases
- **Due Date Requirement:** All three Fee Insights queries filter invoices by `dueDate` within `[startDate, endDate]`. Invoices created *without* a `dueDate` will not appear in Fee Insights or Fee Defaulters.
- **Custom Range Validation:** Missing Start or End Date shows toast `"Please select both Start Date and End Date for Custom Range."` Windows > 5 years or `startDate > endDate` are rejected by `ReportEngine`.

---

## F. Complete Role-Based User Journeys

### Journey 1: Daily Fee Collection & UPI Verification
- **Objective:** Check overdue priorities, verify student UPI payments, and record walk-in cash/cheque payments.
- **Starting Point:** `AccountsDashboard` (`/`).
- **Sequence:** Dashboard (`/`) → Fees → Verification (`/fees`) → Fees → Summary / History (`/fees`) → Payment Receipt PDF (`/payments/:paymentId`).
- **Actions & Results:** Review `Today's Priorities` → Open **Fees**, switch to **Verification**, inspect UTR and screenshot, and **Approve** → Switch to **Student Fee Summary**, search walk-in student, click **Add Transaction → Record Payment** → Open **Transaction History** and download PDF receipt.

### Journey 2: Monthly Fee Billing & Defaulter Follow-Up
- **Objective:** Bill students for a new month and identify overdue defaulters for follow-up.
- **Starting Point:** Fees (`/fees`).
- **Sequence:** Fees (`/fees`) → Invoice PDF (`/invoices/:invoiceId`) → Reports (`/reports`).
- **Actions & Results:** Create monthly invoices with due dates → Preview/download PDF invoice → Open **Reports → Fee Insights**, filter by `This Month` or `Last Month` and target Class/Section, and review the **Fee Defaulters** list.

---

## G. Permissions & Role Boundaries

| Capability / Resource | UI Access | Backend Enforcement (`roleMiddleware` & Scoping) |
|---|---|---|
| **Accounts Dashboard** | Full access to financial KPIs, health, priorities, activity, notices | `dashboard.routes.js` restricts `GET /api/dashboard/accounts` to `ACCOUNTS` only. |
| **Fees (Summary, History, Invoices, Payments, UPI Verify)** | Full access to Summary, History, Create/Edit/Delete Invoices & Payments, Verify UPI, PDFs | `fee.routes.js` allows `ADMIN` & `ACCOUNTS` on all write/verify/PDF routes (`schoolId`-scoped). |
| **Reports (`Fee Insights`)** | `Fee Insights` tab only; `Attendance Insights` hidden | `reports.routes.js` allows `ADMIN` & `ACCOUNTS` on `/reports/fees/*`; `/reports/attendance/*` returns `403`. |
| **Notices** | Read-only Notice Peek (title + date) on Dashboard | `noticeController.js` scopes `GET` to `ACCOUNTS`/`EVERYONE`; `POST/PUT/DELETE` return `403`. |
| **Bulk Data Import (`/admin/import`)** | Dashboard **Import Data** button navigates there, but hits `"Access Denied"` | Blocked by `ProtectedRoute allowedRoles={['ADMIN']}` and `import.routes.js` `roleMiddleware(['ADMIN', 'SUPER_ADMIN'])`. |
| **Admin Modules (`/admin/users`, `/admin/settings`, `/admin/academic-calendar`)** | `"Access Denied"` | Blocked by `ProtectedRoute` and backend `roleMiddleware` (`403`). |
| **Attendance & Assignments** | Not in sidebar (no UI route guard, but write actions blocked) | `POST/PUT` attendance and assignments return `403`. |
| **Profile (`/profile`)** | Strictly read-only | No self-update endpoint for non-admins. |

---

## H. Suggested Help Video Recording Sequence

| Segment | Screen | User Action | Narration Objective | Expected Result | Prerequisites |
|---|---|---|---|---|---|
| 1. Intro & Login | `/login` | Enter Accounts ERP ID & password, click **Sign in** | Introduce the Accounts Officer role and login experience | Redirects to `AccountsDashboard` (`/`) | Active Accounts user |
| 2. Dashboard Orientation | `/` | Walk through 4 KPI cards, Weekly Trend tooltip, Collection Health, Today's Priorities, Pending Invoices, Collection Snapshot, Notices, Recent Activity | Explain how Accounts monitors cashflow and daily priorities (and note that Import Data is Admin-only) | Viewer understands every financial metric on the dashboard | Existing invoices & payments |
| 3. Student Fee Summary | `/fees` | Open **Fees**, search a student, toggle status pills (`PENDING`, `OVERDUE`, `PAID`), click **View History** | Show how to look up any student's billing standing | Table filters dynamically and jumps to student's history | Students with varied fee statuses |
| 4. Create Invoice & Record Payment | `/fees` | Click **Add Transaction**, create an invoice via `EntityCombobox`, then record a payment against an outstanding invoice | Demonstrate billing a student and logging offline/online payments | Records are created (note refresh if `fetchData` error toast occurs) | Active students |
| 5. PDF Invoices & Receipts | `/invoices/:id`, `/payments/:id` | Click **View Document** in **Transaction History**, preview PDF, click **Download PDF** | Show formatted PDF documents with status watermark and verification QR code | PDF previews inline on desktop and downloads cleanly | Existing invoice & payment |
| 6. Verify Student UPI Payments | `/fees` (`Verification` tab) | Switch to **Verification**, inspect UTR & screenshot link, click **Approve** (or **Reject**) and confirm | Walk through reconciling student-submitted UPI transfers | Payment status updates and student is notified | At least 1 `PENDING_VERIFICATION` UPI payment |
| 7. Fee Insights Reports | `/reports` | Select Date Range & Class/Section, click **Apply Filters**, inspect KPIs, Payment Methods, and Fee Defaulters | Show how to track collection efficiency and overdue defaulters | Charts and defaulters table update to match filters | Invoices with `dueDate` in range |
| 8. Global Controls & Profile | Navbar, `/notifications`, `/profile` | Demo Search bar (for invoice/payment), Bell popover, read-only Profile, Bug Report, Sign Out | Wrap up with global search, notifications, and profile boundaries | Search opens `/fees`; profile shows read-only notice | Sample notifications |
