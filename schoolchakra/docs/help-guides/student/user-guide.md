# Student (`STUDENT`) User Guide & Help Video Documentation

> **Role Code:** `STUDENT`  
> **Primary Entry Route:** `/` (`GeneralDashboard`)  
> **Shared UI Reference:** See [Common UI Guide](../shared/common-ui-guide.md) for Login, Top Search Bar, Notifications, Bug Reporting, and Profile controls.

---

## A. Role Overview

- **Who This Role Represents:** An enrolled student at a school using SchoolChakra to stay informed about campus announcements, track daily attendance status, check their class timetable and subjects, submit homework assignments, and view/pay personal fee invoices.
- **Key Responsibilities in SchoolChakra:**
  - Reading school and teacher announcements on the Notice Board.
  - Checking today's attendance status and pending assignment count on the Dashboard.
  - Viewing enrolled subjects and assigned teachers under Academics.
  - Checking their section's weekly Monday–Saturday class timetable.
  - Downloading assignment resources and turning in homework via URL or file upload.
  - Monitoring personal fee summary, viewing/downloading PDF invoices and payment receipts, and paying outstanding invoices via UPI + UTR/screenshot submission.
- **Accessible Modules:**
  - Dashboard (`/`)
  - Academics (`/academics`)
  - Time Table (`/timetable`)
  - Assignments (`/assignments`)
  - Fees (`/fees`, `/invoices/:invoiceId`, `/payments/:paymentId`)
  - My Profile (`/profile` — read-only) & Notifications (`/notifications`)
- **Restrictions (Cannot Access or Modify):**
  - **Blocked on Frontend & Backend:** Cannot access Admin routes (`/admin/*`), Super Admin routes (`/super-admin/*`), or Reports & Insights (`/reports` — displays `"Access Denied"`).
  - **No Attendance History Page Yet:** Although `/attendance` exists in `App.jsx`, visiting `/attendance` as a Student displays a placeholder: `"Student Attendance View Coming Soon"`. Students can only see **today's** attendance status on the Dashboard.
  - **Strictly Self-Scoped Data:**
    - Cannot view other students' fee summaries, fee histories, invoices, or payment receipts (`feeController.js`, `invoice.controller.js`, `payment.controller.js`).
    - Cannot view other students' assignment submissions (`assignmentController.js` returns `403`).
    - Cannot create, edit, or delete Notices, Assignments, Classes, Timetable entries, Invoices, or Payments.
    - Cannot edit their own profile (`"Please contact your school administrator to update your profile details."`).
- **Interactions with Other Roles:**
  - Enrolled into a Class & Section by the **School Admin**.
  - Receives daily attendance marks and homework assignments from **Teachers**, and submits work back to Teachers.
  - Receives fee invoices and payment approvals/rejections from **Accounts** or **School Admin**.

---

## B. Login & First-Time Experience

1. **Logging In:** Navigate to `/login`, enter the Student's ERP ID (e.g., `STU001` or `{SCHOOL_CODE}003`) and password (default bulk-import password is `password123`), and click **Sign in**.
2. **Post-Authentication:** Redirects to `/` (`DashboardRouter` → `Dashboard` → `GeneralDashboard`). The school's `themeColor` is applied automatically.
3. **Initial Application Layout:**
   - **Header (`Navbar`):** Global search bar (searches student-targeted notices and the student's section assignments), Notification Bell, and Profile Menu (`My Profile`, `Notification History`, `Log out`).
   - **Sidebar (`Sidebar`):** School logo & name, 5 navigation items (`Dashboard`, `Academics`, `Time Table`, `Assignments`, `Fees`), `"Found a bug?"` card, and `"User Guide"` button.
4. **Empty / Unassigned State (e.g., No Section or Timetable Yet):**
   - **Dashboard (`/`):** Loads normally; `"My Status"` shows Today's Attendance as `NOT MARKED` and Pending Assignments as `0`. Notice Board shows `"You're all caught up!"` if no notices exist.
   - **Academics (`/academics`):** Shows `"No subjects or timetable assigned yet."`
   - **Time Table (`/timetable`):** Shows all periods as `"Free"` (or `"No time table found."` if no periods exist).
   - **Assignments (`/assignments`):** Shows `"No assignments found."`
   - **Fees (`/fees`):** Summary shows the student's row with `NO FEES` status (`₹0.00` billed and due) and History shows `"No fee records found for this student."`

---

## C. Dashboard: Detailed Breakdown (`GeneralDashboard.jsx`)

Data is fetched via `GET /api/notices`, `GET /api/dashboard/stats` (`getStudentDashboardStats`), and `GET /api/academic-calendar/today`. If `/api/dashboard/stats` fails, `FallbackDashboard` displays with a **Retry** button.

### 1. Browser Push Notification Banner (`PushNotification`)
- **Displays:** Opt-in browser notification banner or blocked-permission warning.
- **Interactivity:** Dismissible or clickable (*see [Common UI Guide](../shared/common-ui-guide.md) regarding the `/notifications/subscribe` vs `/api/push/subscribe` mismatch*).

### 2. Welcome Banner
- **Displays:** Blue-to-indigo gradient banner with `"STUDENT Portal"` pill, `"Good Morning/Afternoon/Evening, {user.name}!"`, `"Here is what's happening at {schoolName} today."`, **Academic Calendar Status Badge** (`Working Day`, `HOLIDAY • ...`, or `VACATION • ...`), and formatted current date (`en-GB`).
- **Interactivity:** Static informational header.

### 3. Notice Board (Left 2/3 Column)
- **Displays:** Non-archived school announcements targeted to `STUDENT` or `EVERYONE` (`targetRoles: []`), ordered newest first (`GET /api/notices`).
- **Per-Notice Card:** Title, Audience pills (`EVERYONE`, `STUDENT ONLY`, or role pills), `"Edited"` badge (if edited > 1s after creation), full notice body, author name + role (`"{name} ({role})"`), and date/time stamp.
- **Empty State:** `"You're all caught up! No announcements published yet."`
- **Interactivity:** Read-only (no Edit/Delete buttons for Students).

### 4. My Status Card (Right Column)
- **Displays:** Two status summary rows fetched dynamically from `GET /api/dashboard/stats`:
  1. **Today's Attendance:** Color-coded status pill:
     - `PRESENT` (emerald green)
     - `ABSENT` (red)
     - `NOT MARKED` / `LEAVE` / `PENDING` (gray — displays `stats.attendanceStatus.replace('_', ' ')` or `'PENDING'`)
  2. **Pending Assignments:** Amber badge displaying the count of assignments in the student's `sectionId` whose `dueDate >= now` and for which the student has **no submission** yet.
- **Interactivity:** Informational only (does not navigate on click).
- **Note:** Unlike Teachers, Students do **not** see `Teacher Shortcuts` or the `Post an Announcement` form.

### Recommended First-Time Dashboard Walkthrough Sequence
1. Point out the **Welcome Banner**, `"STUDENT Portal"` badge, and today's **Academic Calendar Status**.
2. Highlight the **My Status** widget on the right (`Today's Attendance` and `Pending Assignments`) as the student's daily check-in.
3. Walk through the **Notice Board** on the left, explaining audience badges (`STUDENT ONLY` vs `EVERYONE`) and the `"Edited"` indicator.

---

## D. Navigation & Module Inventory

| Navigation Label | Route | Purpose | Subpages / Tabs | Access & Dependencies |
|---|---|---|---|---|
| **Dashboard** | `/` | Announcements, today's attendance, pending homework count | Single view (`GeneralDashboard`) | StudentProfile section + Attendance + Assignments + Notices |
| **Academics** | `/academics` | View enrolled subjects and subject teachers | Subject card grid | Derived from `/api/timetable` entries for the student's section |
| **Time Table** | `/timetable` | View weekly Monday–Saturday class schedule | Single read-only grid | Populated by School Admin for the student's section |
| **Assignments** | `/assignments` | View section homework, download resources, turn in work | Assignment cards + Submit Assignment Modal | Filtered to student's `sectionId` |
| **Fees** | `/fees` | View fee summary, transaction history, pay via UPI, open PDFs | 2 Tabs (`Student Fee Summary`, `Transaction History`) + `UpiPaymentModal` + `/invoices/:invoiceId` + `/payments/:paymentId` | Self-scoped to logged-in Student |
| *(Direct URL — Placeholder)* | `/attendance` | Currently displays `"Student Attendance View Coming Soon"` | Placeholder only | Not in Student sidebar |
| *(Header / Sidebar)* | `/profile`, `/notifications`, `/user-guide` | Read-only profile (shows Class & Section), notifications, docs, bug report | See [Common UI Guide](../shared/common-ui-guide.md) | Authenticated session |

---

## E. Detailed Module-by-Module User Stories

### Module 1: Academics (`/academics`)

#### 1. Module Introduction
Shows the student a clean overview of every subject taught in their section and which teacher(s) teach each subject.

#### 2. Initial Screen & UI Elements
- **Header:** `"Academics"`, subtitle `"Manage classes, sections, and subjects"` (no `+ Add Class` button).
- **Subject Cards Grid:** Derived dynamically by grouping `GET /api/timetable` entries by `subject.id`. Each card shows a book icon, Subject Name, and `"ASSIGNED TEACHERS"` with comma-separated teacher names.
- **Empty State:** `"No subjects or timetable assigned yet."`

#### 3. Available User Actions
- **Read-Only Viewing:** No interactive filters or edit buttons.
- **Important Dependency:** Because `Academics.jsx` builds the subject list from `/api/timetable`, a subject only appears here once the School Admin has added at least one timetable entry for that subject in the student's section.

#### 4. Step-by-Step User Flow
1. Click **Academics** in the sidebar.
2. Browse the subject cards to confirm your enrolled subjects and assigned teachers.

---

### Module 2: Time Table (`/timetable`)

#### 1. Module Introduction
Displays the student's weekly Monday–Saturday class schedule by period timing.

#### 2. Initial Screen & UI Elements
- **Header:** `"Time Table"`, subtitle `"Manage and view class schedules"`.
- **Weekly Grid (`MONDAY`–`SATURDAY` × `Periods`):**
  - Left sticky column lists Period Name and `startTime - endTime`.
  - Filled cells show **Subject Name** and **Teacher Name** (Class/Section label is hidden for `STUDENT`).
  - Empty slots show `"Free"`.
- **Empty State:** `"No time table found."` if no periods are configured.

#### 3. Available User Actions
- **Read-Only Viewing:** Backend `timeTableController.js` automatically scopes `GET /api/timetable` to the student's `StudentProfile.sectionId`.

#### 4. Step-by-Step User Flow
1. Click **Time Table** in the sidebar.
2. Check each day column (`Mon`–`Sat`) against the period times on the left.

---

### Module 3: Assignments (`/assignments`)

#### 1. Module Introduction
Lets students view homework/classwork posted for their section, open teacher-attached resources, and submit their completed work.

#### 2. Initial Screen & UI Elements
- **Header:** `"Assignments"`, subtitle `"Manage classwork and homework"` (no `+ New Assignment` button).
- **Assignment Cards Grid (`GET /api/assignments`):**
  - Shows Title, Description (2-line clamp), `"Due: {date}"`, `"By {teacher?.name} • Class {class?.name} ({section.name})"` *(note: backend returns `section.class`, not `teacher` or top-level `class`, so teacher/class labels may display blank except `(section.name)`)*, optional **View Resource** link (opens `assign.fileUrl` in new tab), and submission status footer:
    - If already submitted (`assign.submissions?.length > 0`): green `"✓ Submitted"` badge.
    - If not yet submitted: **"Turn In Work"** button.
- **Empty State:** `"No assignments found."`

#### 3. Available User Actions
- **View Resource:** Click **View Resource** on any assignment with an attachment to open the file in a new tab.
- **Turn In Work (`Submit Assignment` modal → `POST /api/assignments/:assignmentId/submit`):**
  - **Fields:**
    - `Paste URL (Google Drive, Docs, etc.)` (`input[type="url"]`), **OR**
    - File picker (`input[type="file"]`; Cloudinary permits `jpg`, `png`, `jpeg`, `pdf`, `doc`, `docx`).
  - **Submission:** Click **Turn In**.
  - **Backend Validation & Rules (`assignmentController.js` + Prisma schema):**
    - At least one of `file` or `fileUrl` is required (`400: "A file or URL is required for submission."`).
    - Prisma `AssignmentSubmission` has `@@unique([assignmentId, studentId])`, preventing duplicate submissions (`409` if re-submitted).
    - **Note:** Currently there is no UI or API support for unsubmitting or replacing a submitted assignment, and no validation preventing submission after `dueDate` has passed.

#### 4. Step-by-Step User Flow
1. Click **Assignments** in the sidebar.
2. Locate an assignment and click **View Resource** (if available) to read attached materials.
3. Click **Turn In Work**.
4. Either paste a link (e.g., Google Drive/Docs URL) or select a file from your device.
5. Click **Turn In**. Verify the toast `"Assignment submitted successfully"` and confirm the button changes to `"✓ Submitted"`.

#### 5. Important Edge Cases
- **Submitting Empty Form:** Backend returns `400`; UI displays error toast `"Failed to submit assignment"`.
- **Both URL and File Provided:** Backend prioritizes `req.file.path` (`if (req.file) fileUrl = req.file.path`).
- **One-Time Submission:** Once `"✓ Submitted"` appears, the student cannot re-upload or edit their submission.

#### 6. Related Modules
- **Dashboard (`/`):** Pending Assignments counter decreases by 1 once a due assignment is submitted.

---

### Module 4: Fees & UPI Payments (`/fees`, `/invoices/:invoiceId`, `/payments/:paymentId`)

#### 1. Module Introduction
Allows students to check their fee balance, review every invoice and payment, open/download official PDF invoices and receipts, and submit UPI payments for pending invoices.

#### 2. Initial Screen & UI Elements
- **Header:** `"Accounts & Fees"`, subtitle `"Manage student fee records and transactions"` (no `+ Add Transaction` button).
- **2 Tabs Visible to Students:**
  1. **Student Fee Summary** (no `Verification` tab for Students)
  2. **Transaction History**
- **Tab 1: Student Fee Summary (`GET /api/fees/summary`):**
  - Displays search bar (`"Search student or ERP ID..."`) and status filter pills (`NO FEES`, `PAID`, `PARTIAL`, `PENDING`, `OVERDUE`), though backend restricts results strictly to the logged-in student (`studentId = req.user.userId`).
  - Shows a single row/card for the student with `Total Billed`, `Amount Due`, `Due Date`, `Status` badge, and **View History** button.
- **Tab 2: Transaction History (`GET /api/fees/history`):**
  - Search bar (`"Search student, ERP ID, Ref No, or Invoice..."`) and type pills (`INVOICES`, `PAYMENTS` — note arrow directions flip for `STUDENT` so Invoices show incoming charge arrows and Payments show outgoing payment arrows).
  - Table / Mobile Cards show Transaction type icon, Amount (`+₹...` in green for approved/pending payments, red for `REJECTED`), Details (Invoice No, Billing Month/Year or Mode + Ref No), Remarks, Date, and **Actions**:
    - **View Document** (`FileText` icon) → opens `/invoices/:id` or `/payments/:id` (desktop inline PDF viewer + **Download PDF** button with school logo, status watermark, and verification QR code; mobile shows **Download PDF** button).
    - **For `Invoice` rows:**
      - If `SUCCESS` payments ≥ invoice amount → shows green `"Paid"` label.
      - Else if a `PENDING_VERIFICATION` payment exists for that invoice → shows amber `"Verification Pending"` badge.
      - Else → shows **"Pay via UPI"** button (`QrCode` icon).

#### 3. Available User Actions
- **View / Download PDF Invoice (`/invoices/:invoiceId`) or Payment Receipt (`/payments/:paymentId`):**
  - Displays formatted A4 PDF (`InvoiceDocument` / `PaymentReceiptDocument`) with `PAID` / `PARTIALLY PAID` / `PENDING` / `PAYMENT SUCCESSFUL` watermark and QR code.
- **Pay via UPI (`UpiPaymentModal.jsx`):**
  - **Step 1 (Scan / Pay):** Fetches `GET /api/fees/upi/:invoiceId/uri` which computes `dueAmount = totalAmount - sum(SUCCESS payments)` and builds `upi://pay?pa=...&pn=...&am=...&cu=INR&tn=...&tr=...`.
    - On mobile devices, displays **"Pay Now with UPI App"** deep link button + smaller QR code.
    - On desktop, displays a scannable `250px` QR code.
    - Displays `Amount Due`, `Merchant`, `Invoice No`, and `UPI ID`.
    - Click **"I have made the payment"** to advance to Step 2.
  - **Step 2 (Submit Payment Details):**
    - `UTR / Transaction Reference No` (required, e.g., 12-digit UTR).
    - `Payment Screenshot (Optional)` (`accept="image/*"`).
    - Click **Submit Verification** (`POST /api/fees/upi/:invoiceId/submit`).
    - Backend creates a `Payment` record with `paymentMode: 'UPI'`, `status: 'PENDING_VERIFICATION'`, and notifies `ADMIN` and `ACCOUNTS` roles.
    - *(Note: After `onSuccess()` fires, `Fees.jsx` line 782 attempts to call an undefined `fetchData()` function, so refreshing `/fees` may be needed to immediately see the `"Verification Pending"` badge if an uncaught error occurs.)*

#### 4. Step-by-Step User Flow (Paying an Invoice via UPI)
1. Click **Fees** in the sidebar.
2. Review your balance on **Student Fee Summary**, then click **View History** (or switch to **Transaction History**).
3. Find an unpaid invoice and click **Pay via UPI**.
4. On desktop, scan the QR code with any UPI app (on mobile, tap **Pay Now with UPI App**), complete the transfer, and copy the 12-digit UTR number.
5. Click **I have made the payment**, enter the **UTR / Transaction Reference No**, optionally upload a payment screenshot, and click **Submit Verification**.
6. Wait for **Accounts** or **School Admin** to approve the payment; once approved, you receive a notification and can download the updated PDF receipt.

#### 5. Important Edge Cases
- **School UPI Not Configured:** Clicking **Pay via UPI** displays toast `"UPI ID is not configured for this school. Please contact administration."` and closes the modal.
- **Rejected UPI Payment:** Rejected payments appear in Transaction History in red (`fee.status === 'REJECTED'`), and the **Pay via UPI** button becomes available again on the invoice so the student can retry.
- **Partial Payments:** `generateUpiUri` and `submitPayment` compute `dueAmount` after subtracting existing `SUCCESS` payments, so the QR code automatically requests only the remaining balance.

#### 6. Related Modules
- **Notifications:** Students receive notifications for new invoices, recorded offline payments, and UPI approval/rejection outcomes.

---

## F. Complete Role-Based User Journeys

### Journey 1: Daily Student Check-In & Homework Submission
- **Objective:** Check notices, attendance, class schedule, and turn in an assignment.
- **Starting Point:** Dashboard (`/`).
- **Sequence:** Dashboard (`/`) → Time Table (`/timetable`) → Assignments (`/assignments`).
- **Actions & Results:** Verify today's attendance pill & pending assignment count → Read new notices → Check today's classes in Time Table → Open Assignments, review attached resource, and submit homework via file or URL.

### Journey 2: Checking Fee Dues & Paying via UPI
- **Objective:** Inspect an outstanding fee invoice, download the PDF, pay via UPI, and submit verification proof.
- **Starting Point:** Fees (`/fees`).
- **Sequence:** Fees Summary (`/fees`) → Transaction History → Invoice PDF (`/invoices/:invoiceId`) → Back to Fees → `UpiPaymentModal`.
- **Actions & Results:** Check due amount in Summary → Switch to History → Preview/download PDF invoice → Click **Pay via UPI**, scan QR, submit UTR + screenshot → Invoice enters `"Verification Pending"` until approved.

---

## G. Permissions & Role Boundaries

| Capability / Resource | UI Access | Backend Enforcement (`roleMiddleware` & Scoping) |
|---|---|---|
| **Dashboard Stats** | Sees Welcome Banner, Notice Board, and `My Status` | `dashboardController.js` returns only the logged-in student's attendance today & pending assignment count. |
| **Notices** | Read-only (`STUDENT` & `EVERYONE` notices) | `noticeController.js` filters to `targetRoles` containing `STUDENT` or empty; `POST/PUT/DELETE` return `403`. |
| **Academics** | Read-only grid of own subjects & teachers (from timetable) | Mutations in `class.routes.js` blocked (`403`). |
| **Time Table** | Read-only personal section schedule | `timeTableController.js` forces `where.sectionId = profile.sectionId`; mutations blocked (`403`). |
| **Daily Attendance** | `/attendance` shows `"Student Attendance View Coming Soon"` | `GET /api/attendance` forces `whereClause.studentId = req.user.userId`; all write routes blocked (`403`). |
| **Assignments** | View section assignments & submit own work once | `assignmentController.js` scopes `GET /` to `profile.sectionId`; `POST /` & `/:id/submissions` return `403`; `POST /:id/submit` is `STUDENT`-only. |
| **Fees & PDFs** | View own summary/history, download own PDFs, submit UPI proof | `feeController.js`, `invoice.controller.js`, `payment.controller.js` enforce `studentId = req.user.userId`; invoice/payment CRUD & UPI verify return `403`. |
| **Reports & Admin Modules** | `"Access Denied"` on `/reports` and `/admin/*` | Blocked by `roleMiddleware` (`403`). |
| **Profile (`/profile`)** | Strictly read-only (shows Class & Section) | No self-update endpoint for students. |

---

## H. Suggested Help Video Recording Sequence

| Segment | Screen | User Action | Narration Objective | Expected Result | Prerequisites |
|---|---|---|---|---|---|
| 1. Intro & Login | `/login` | Enter Student ERP ID & password, click **Sign in** | Introduce the Student Portal and login experience | Redirects to Student Dashboard (`/`) | Active Student account with assigned section |
| 2. Dashboard Orientation | `/` | Point out **Welcome Banner**, **My Status**, and **Notice Board** | Show how students check today's attendance, pending homework count, and notices | Viewer understands daily status pills and notice badges | Sample notice & today's attendance marked |
| 3. Academics & Time Table | `/academics`, `/timetable` | Open **Academics**, then **Time Table** | Show where to find subject teachers and the weekly period schedule | Subject cards and `Mon`–`Sat` grid display | Timetable populated for student's section |
| 4. Assignments | `/assignments` | Click **View Resource**, click **Turn In Work**, upload file/URL, click **Turn In** | Demonstrate downloading instructions and submitting homework | Toast confirms submission; button updates to `"✓ Submitted"` | At least 1 unsubmitted assignment |
| 5. Fees & PDFs | `/fees`, `/invoices/:id` | Review **Student Fee Summary**, click **View History**, click **View Document** | Show how to inspect balances and download official PDF invoices/receipts | PDF viewer loads with status watermark & QR code | At least 1 student fee invoice |
| 6. Paying via UPI | `/fees` (`UpiPaymentModal`) | Click **Pay via UPI**, show QR/UPI details, advance to Step 2, enter UTR & screenshot, submit | Walk through the 2-step UPI payment and UTR submission flow | Payment enters pending verification | School UPI ID configured in Settings |
| 7. Notifications, Profile & Bug Report | Navbar, `/notifications`, `/profile` | Check Bell popover, Notification Center, read-only Profile, Bug Report, Sign Out | Show global tools and remind students to contact Admin for profile edits | Notifications marked read; profile shows Class & Section | Sample notifications |
