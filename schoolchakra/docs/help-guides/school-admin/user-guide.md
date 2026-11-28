# School Admin (`ADMIN`) User Guide & Help Video Documentation

> **Role Code:** `ADMIN`  
> **Primary Entry Route:** `/` (`AdminDashboard`)  
> **Shared UI Reference:** See [Common UI Guide](../shared/common-ui-guide.md) for Login, Top Search Bar, Notifications, Bug Reporting, and Profile controls.

---

## A. Role Overview

- **Who This Role Represents:** The School Administrator (Principal, Vice-Principal, or School ERP Coordinator) responsible for configuring and overseeing day-to-day operations for a single school tenant.
- **Key Responsibilities in SchoolChakra:**
  - Onboarding and managing all school users (Students, Teachers, Accounts staff, and additional Admins).
  - Bulk importing student, teacher, and historical/current fee records via spreadsheets.
  - Defining the academic structure (Classes and Sections) and building weekly Timetables (Subjects, Periods, Teacher/Class schedules).
  - Managing the Academic Calendar (declaring holidays, vacations, and special working days).
  - Configuring school branding, description, and UPI payment settings.
  - Publishing, editing, and deleting school-wide or role-targeted Notices.
  - Monitoring daily attendance, fee collection, UPI payment verifications, and Attendance/Fee Insights reports.
- **Accessible Modules:**
  - Dashboard (`/`)
  - User Management (`/admin/users`, `/admin/users/:id`)
  - Data Import (`/admin/import`)
  - Academic Calendar (`/admin/academic-calendar`)
  - Academics (`/academics`)
  - Time Table (`/timetable`)
  - Daily Attendance (`/attendance` — accessible via Dashboard Action Center or direct URL; not in sidebar)
  - Assignments (`/assignments` — accessible via direct URL or notifications; not in sidebar)
  - Accounts & Fees (`/fees`, `/invoices/:invoiceId`, `/payments/:paymentId`)
  - Reports & Insights (`/reports` — both Attendance Insights & Fee Insights)
  - School Settings (`/admin/settings` — via Profile dropdown)
  - My Profile (`/profile`) & Notifications (`/notifications`)
- **Restrictions (Cannot Access or Modify):**
  - Cannot access Super Admin platform routes (`/super-admin/*`), school creation/deletion, subscription plans, billing orders, global feature flags, or platform bug triage.
  - Cannot change the school's official name or subscription expiry (`validUntil`) in School Settings (must contact Super Admin).
  - Cannot disable, archive, or remove primary status from another primary Admin unless they themselves hold `isPrimary: true`.
  - Cannot see data from any other school (strict `schoolId` isolation on all API endpoints).
- **Interactions with Other Roles:**
  - Creates accounts and assigns classes/sections for **Students** and **Teachers**, and creates accounts for **Accounts** staff and co-Admins.
  - Publishes notices targeted to **Everyone**, **Teachers**, **Students**, and/or **Accounts**.
  - Reviews attendance marked by **Teachers** (and can mark/lock/unlock/finalize attendance directly if needed).
  - Shares **Accounts & Fees** management and **UPI Verification** capabilities with **Accounts** users.

---

## B. Login & First-Time Experience

1. **Logging In:** The School Admin navigates to `/login`, enters their ERP ID (e.g., `{SCHOOL_CODE}001` for the initial primary admin) and password, and clicks **Sign in**.
2. **Post-Authentication:** JWT access/refresh tokens are saved in `localStorage`, the school's `themeColor` is applied via `--app-theme-color`, and the user is routed to `/` (`DashboardRouter` renders `Dashboard` → `AdminDashboard`).
3. **First-Time Empty School State (`stats.isNewSchool === true`):**
   - If the school has **0 active students**, **0 active teachers**, and **0 classes**, `AdminDashboard` renders a dedicated **Setup Mode** onboarding view instead of operational metrics.
   - Displays a welcome banner (`"Setup Mode"`, `"Good Morning/Afternoon/Evening, School Admin!"`, school name, current date, `"Initial Onboarding Checklist"`).
   - Displays the **Campus Setup Checklist** with 5 guided steps and direct action buttons:
     1. **Create Classes & Sections** → **"Set Up Classes"** (`/academics`) — auto-checks when `classCount > 0`.
     2. **Add or Import Teachers** → **"Manage Teachers"** (`/admin/users`) — auto-checks when `teacherCount > 0`.
     3. **Add or Import Students** → **"Manage Students"** (`/admin/users`) — auto-checks when `studentCount > 0`.
     4. **Set Up Class Timetable** → **"Draft Timetable"** (`/timetable`) — informational step (stays unchecked).
     5. **Post Your First Notice** → **"Publish Notice"** (scrolls to `#post-notice` — *note: `#post-notice` is only rendered once `isNewSchool` becomes `false`*) — auto-checks when `notices.length > 0`.
4. **Operational Layout (Once Setup Has Data):**
   - **Header (`Navbar`):** Search bar (searches students, teachers, admins, accounts, invoices, payments, notices), notification bell, and profile menu (includes **School Settings** link for Admins).
   - **Sidebar (`Sidebar`):** School logo & name, 8 navigation links (`Dashboard`, `Users`, `Data Import`, `Academic Calendar`, `Academics`, `Time Table`, `Fees`, `Reports`), `"Found a bug?"` card, and `"User Guide"` button.
   - **Subscription Expired Edge Case:** Unlike Teacher/Student/Accounts, an Admin can log in when `school.validUntil < now`, but API calls protected by `schoolValidityMiddleware` return `403` (`SCHOOL_EXPIRED_ADMIN`) with toast `"School subscription has expired. Please contact administration."` and the dashboard shows `FallbackDashboard` (`"Failed to load your dashboard"` + Retry).

---

## C. Dashboard: Detailed Breakdown (`AdminDashboard.jsx`)

Data is loaded in parallel on mount via `GET /api/notices`, `GET /api/dashboard/stats`, and `GET /api/academic-calendar/today`. If `/api/dashboard/stats` fails, `FallbackDashboard` renders with a **Retry** button.

### 1. Browser Push Notification Banner (`PushNotification`)
- **Displays:** Opt-in banner (`"Browser Notifications"`) or blocked-permission warning.
- **Source & Interactivity:** Browser Notification API + `localStorage` dismissal state. *(Known issue: clicking "Enable Notifications" posts to `/api/notifications/subscribe` instead of `/api/push/subscribe`, returning 404.)*

### 2. Welcome Banner
- **Displays:** Time-based greeting (`"Good Morning/Afternoon/Evening, {user.name}"`), `"Welcome back to {schoolName}"`, today's **Academic Calendar Status Badge** (e.g., `Working Day`, `HOLIDAY • Diwali`, `VACATION • Summer Break`), formatted date (`en-IN`), and `"Active Campus Monitoring"`.
- **Source:** `user` from `authStore` + `GET /api/academic-calendar/today`. Static display (not clickable).

### 3. School Overview KPI Cards (6-Card Grid)
All fetched dynamically from `GET /api/dashboard/stats` (non-clickable informational cards):
1. **Students:** Count of active, non-archived students (`total`).
2. **Teachers:** Count of active, non-archived teachers (`total`).
3. **Classes:** Count of classes in the school (`grades`).
4. **Attendance:** Today's attendance rate (`%` of `PRESENT + LEAVE` over total marked today). Shows `"Pending"` if today's rate is `0%` and classes await marking, or `"0%"` otherwise.
5. **Collected Fees:** Total payments summed across the school (formatted in `₹` or `₹X.XXL` when ≥ 1,00,000; note: `dashboardService` sums all `Payment` records without filtering by `status`). Shows `"no fee records yet"` if both collected and pending are `0`.
6. **Pending Fees:** `max(0, totalInvoiced - feesCollected)`. Shows `"no fee records yet"` if both are `0`.

### 4. School Operational Snapshot
- **Displays:** Header badge `"{N} Items Need Attention"` (if `pendingActionsCount > 0`, where count = pending attendance sections + 1 if any invoice is unpaid) and 5 status tiles:
  - **Students:** `"{count} active"`
  - **Teachers:** `"{count} active"`
  - **Attendance:** `"✓ X% attendance marked"`, `"Pending: N classes"`, or `"Attendance pending today"`
  - **Fee Status:** `"✓ ₹X collected (Y%)"` or `"No fee records yet"`
  - **Last Import:** Auto-detected summary if ≥ 5 students or teachers were created within the same minute (e.g., `"25 students on Jun 12"`), or `"No recent data imports"`.
- **Interactivity:** Informational only.

### 5. Today's Action Center (4 Cards)
1. **Attendance Awaiting:** Shows count of active, non-archived sections with no attendance marked today. If `> 0`, displays **"Mark Attendance →"** button navigating to `/attendance`.
2. **Pending Fee Records:** Shows count of invoices where `sum(payments) < totalAmount`. If `> 0`, displays **"Manage Fees →"** button navigating to `/fees`.
3. **Recent Notices:** Displays count of notices published in the last 7 days or latest notice title. Button **"View Notice Board →"** smooth-scrolls to `#notices-sec`.
4. **Import Status:** Displays recent bulk import status text. Button **"Import Data Wizard →"** navigates to `/admin/import`.

### 6. Recent Campus Activities (Left Column, Top)
- **Displays:** Up to 15 chronological timeline events merged from newly created users (grouped as `"Bulk import completed successfully"` if ≥ 5 created in one minute), published notices, fee payments (received / pending verification / rejected), and attendance submissions (grouped per class-section/date/minute).
- **Empty State:** `"No active operations logged today."`
- **Interactivity:** Read-only timeline with color-coded icons and relative timestamps (`Just now`, `Xm ago`, `Xh ago`, `Yesterday`, or `MMM D`).

### 7. Student Class Distribution (Left Column, Bottom)
- **Displays:** Scrollable horizontal progress bars showing active student counts per class (`Class {name}`, hiding classes with 0 students).
- **Empty State:** `"No student enrollments registered yet."`

### 8. Attendance Trends (Right Column, Top — Conditional)
- **Visibility:** Rendered only when at least 1 day in the last 7 days has recorded attendance.
- **Displays:** Custom SVG area line chart (`AttendanceTrendChart`) showing daily attendance rate over the last 7 days, with hover tooltips (`"{date}: {rate}%"`).

### 9. Financial Operations Snapshot (Right Column, Middle — Conditional)
- **Visibility:** Rendered only when `feesCollected > 0 || pendingFees > 0`.
- **Displays:** Two summary tiles (`Collected` and `Pending` in `₹`) and a `"Fee Collection Progress"` percentage bar.

### 10. Dispatch Announcement Accordion (`#post-notice`, Right Column, Bottom)
- **Displays:** Collapsible card titled **"Dispatch Announcement"** (changes to **"Edit Announcement"** when editing) with **Expand / Collapse** toggle.
- **Interactive Form:** Title (required), Content (required), Target Audience multi-select pills (`Teachers`, `Students`, `Accounts`; leave all unchecked for `Everyone` — selecting all 3 also normalizes to `Everyone`), and **Dispatch Announcement** / **Update Notice** (+ **Cancel** when editing) buttons.

### 11. Published School Notices (`#notices-sec`, Conditional)
- **Visibility:** Rendered only when `notices.length > 0`.
- **Displays:** 2-column scrollable grid of all non-archived school notices (Admins see notices for all audiences). Each card shows title, audience pills (`EVERYONE`, `TEACHER ONLY`, or individual role pills), `"Edited"` badge if updated > 1s after creation, **Edit** (`Edit` icon) and **Delete** (`Trash2` icon) buttons, content (clamped to 4 lines), author name, and creation date.
- **Delete Flow:** Clicking Trash opens `ConfirmDialog` (`"Delete Notice"`).

### 12. Administrative Shortcuts (Bottom Card)
6 quick-navigation tiles:
- **Add Student** → `/admin/users`
- **Add Teacher** → `/admin/users`
- **Create Notice** → Expands Dispatch Announcement accordion and scrolls to `#post-notice`
- **Import Data** → `/admin/import`
- **Manage Classes** → `/academics`
- **Manage Timetable** → `/timetable`

### Recommended First-Time Dashboard Walkthrough Sequence
1. Explain **Welcome Banner** & **Academic Calendar Status** badge.
2. Point out **Setup Mode Checklist** (for brand-new schools) vs. **School Overview KPI Cards**.
3. Review **School Operational Snapshot** and **Today's Action Center** (highlighting clickable shortcuts to `/attendance`, `/fees`, `/admin/import`).
4. Walk through **Recent Campus Activities**, **Student Class Distribution**, **Attendance Trends**, and **Financial Operations**.
5. Expand **Dispatch Announcement**, post a test notice, verify it appears in **Published School Notices** (with edit/delete controls).
6. Show **Administrative Shortcuts** at the bottom before moving to Sidebar modules.

---

## D. Navigation & Module Inventory

### Sidebar Items
| Navigation Label | Route | Purpose | Subpages / Tabs | Access & Dependencies |
|---|---|---|---|---|
| **Dashboard** | `/` | Campus overview, KPIs, notices, quick actions | Setup Mode (if new) / Operational Dashboard | All school stats, notices, calendar today |
| **Users** | `/admin/users` | Create, search, filter, enable/disable/archive users | User list + Add User Modal + User Detail (`/admin/users/:id`) | Requires Classes/Sections first for Students & Teachers |
| **Data Import** | `/admin/import` | Spreadsheet bulk onboarding | 3 Tabs: `Students`, `Teachers`, `Fee Records` (4-step wizard) | Fee wizard requires existing Students |
| **Academic Calendar** | `/admin/academic-calendar` | Manage holiday/vacation/working overrides | Overrides list + Month filter + Add/Edit Modal | Used by Dashboard & Attendance Reports |
| **Academics** | `/academics` | Create/edit classes and sections, inspect student rosters | Class cards + expandable Section rosters | Prerequisite for Users, Attendance, Timetable, Assignments |
| **Time Table** | `/timetable` | Manage subjects, periods, and weekly schedules | 2 View Modes (`Class View`, `Teacher View`) + Subject/Period Modals | Requires Classes, Sections, Teachers |
| **Fees** | `/fees` | Manage invoices, payments, and UPI proofs | 3 Tabs (`Student Fee Summary`, `Transaction History`, `Verification`) + `/invoices/:invoiceId` + `/payments/:paymentId` | Requires Students; UPI requires School Settings UPI config |
| **Reports** | `/reports` | Attendance & Fee analytics | 2 Tabs (`Attendance Insights`, `Fee Insights`) + Filter Bar | Depends on Attendance, Academic Calendar, Fees |

### Non-Sidebar Accessible Routes
| Route | How Accessed | Purpose |
|---|---|---|
| `/admin/settings` | Profile Dropdown → **School Settings** | Update school logo, theme color, description, UPI Merchant Name & UPI ID |
| `/admin/users/:id` | Click user row in `/admin/users` or Global Search result | Inline edit user details, role, section assignments, lifecycle actions |
| `/attendance` | Dashboard Action Center → **Mark Attendance** (when classes pending) or direct URL | Mark, save temp, lock, unlock, and finalize daily attendance |
| `/assignments` | Notification click (`assignment`) or direct URL | Create assignments and view student submissions |
| `/invoices/:invoiceId` | Fees → History → View Document icon | Desktop PDF viewer & PDF download with QR code |
| `/payments/:paymentId` | Fees → History → View Document icon | Desktop PDF receipt viewer & PDF download with QR code |
| `/profile` | Profile Dropdown → **My Profile** | View/edit Admin profile (see caveats in Shared UI Guide) |
| `/notifications` | Bell popover → **View All Notifications** or Profile menu | Grouped notification history |

---

## E. Detailed Module-by-Module User Stories

### Module 1: User Management (`/admin/users` & `/admin/users/:id`)

#### 1. Module Introduction
Used to onboard, search, inspect, update, suspend, archive, and manage Admin/Teacher/Student/Accounts accounts. Supports the complete staff and student lifecycle.

#### 2. Initial Screen & UI Elements
- **Header:** `"User Management"`, subtitle `"Manage teachers, students, and staff"`, and **"+ Add User"** button.
- **Filter Toolbar:** Search input (`"Search user or ERP ID..."`, 500ms debounce) and 4 toggleable role filter pills: `ADMIN`, `TEACHER`, `STUDENT`, `ACCOUNTS` (clicking active pill clears filter).
- **Responsive Table / Mobile Cards (`InfiniteScroll`, 20 per page, includes archived users):**
  - Columns: **User** (avatar + clickable name), **ERP ID** (monospace badge), **Role** (colored role pill + status badge: `Active`, `Disabled`, or `Archived`), **Details** (designation for Teacher, `"Student Profile"`, `"Accounts Staff"`, `"Administrator"`), **Actions** (`Primary` star badge, `Make Primary` button for non-primary Admins when viewer is `isPrimary`, `Archive`/`Restore`, `Disable`/`Enable`).

#### 3. Available User Actions
- **Add User (`+ Add User` modal → `POST /api/users`):**
  - **Fields:** `Full Name` (required), `Password` (optional; backend defaults to `'password123'`, or minimum 6 characters if provided), `Role` (`STUDENT`, `TEACHER`, `ACCOUNTS`, `ADMIN`).
  - If `Role === 'TEACHER'`: `Designation` (optional, defaults to `'Teacher'`) and `Assign Sections` (checkbox chips grouped by Class).
  - If `Role === 'STUDENT'`: `Class` (required) and `Section` (required, enabled after selecting Class).
  - **ERP ID:** Auto-generated sequentially by backend (`{schoolCode}001`, `{schoolCode}002`, etc.) and displayed in the success toast: `"User created! ERP ID is {erpId}"`.
- **View / Edit User (`/admin/users/:id`):**
  - Clicking a user's name opens `AdminUserProfile.jsx`.
  - **Editable Inline:** Profile picture (camera icon), `Name`, `Role` (`STUDENT`/`TEACHER`/`ACCOUNTS`/`ADMIN`), `Phone / Contact` (`contactDetails`), `Designation` & `Assigned Sections` (if Teacher), `Class & Section` (if Student). `ERP ID` and `School & Code` are read-only.
  - Clicking **Update Profile** sends `multipart/form-data` `PUT /api/users/:id`.
- **Lifecycle Actions (`PATCH /api/users/:id/{disable|enable|archive|restore}`):**
  - Hidden for users with `isPrimary: true` (backend also blocks with `403 Cannot disable/archive primary account`).
  - **Disable / Enable:** Toggles `isActive` (disabled users cannot log in or use active sessions).
  - **Archive / Restore:** Archiving sets `isArchived: true` and `isActive: false`; restoring re-activates both.
- **Make Primary (`isPrimary` transfer):**
  - **Implemented on backend (`PUT /api/users/:id` with `{ isPrimary: true }`), partially implemented in frontend:** Clicking **Make Primary** sets `showPrimaryConfirm = true`, but `UserManagement.jsx` does not render a `<ConfirmDialog>` component, so the confirmation dialog does not appear on screen.

#### 4. Step-by-Step User Flow (Creating & Updating a Student or Teacher)
1. Click **Users** in the sidebar.
2. Click **Add User** at the top right.
3. Enter **Full Name**, optionally enter a **Password** (min 6 chars, else `password123`), and choose **Role**.
4. Select **Class** and **Section** (for Student) or enter **Designation** and check **Assigned Sections** (for Teacher).
5. Click **Create User** and note the auto-generated **ERP ID** in the toast notification.
6. To edit details later, click the user's name to open `/admin/users/:id`, click the pencil icon next to any field, upload a photo if needed, and click **Update Profile**.

#### 5. Important Edge Cases
- **No Classes Created Yet:** Student creation requires a Class and Section; Teacher section assignment shows `"No classes available"`.
- **Password Too Short:** Entering 1–5 characters triggers Zod 400 error `"Password must be at least 6 characters"`.
- **Archived/Disabled Users:** Still appear in `/admin/users` (`includeArchived=true`) so Admins can restore or re-enable them.
- **Primary Admin Protection:** Cannot be disabled or archived from list or profile view.

#### 6. Related Modules
- **Academics (`/academics`):** Provides Classes and Sections required for Student enrollment and Teacher section mapping.
- **Data Import (`/admin/import`):** Alternative bulk method for creating Students and Teachers.

---

### Module 2: Bulk Data Import (`/admin/import`)

#### 1. Module Introduction
Allows School Admins to onboard Students, Teachers, and Fee Records in bulk from `.xlsx`, `.xls`, or `.csv` files.

#### 2. Initial Screen & UI Elements
- **Header:** `"Bulk Data Import"` with explanatory subtitle.
- **3 Mode Tabs:** `Students`, `Teachers`, `Fee Records`.
- **Students / Teachers Tab UI:** **Download Template** button, drag-and-drop file zone (`.xlsx, .xls, .csv`), **Start Import** button, and Results banner (Success card showing Records Imported + Time Taken, OR Error card with **Download Error Report (CSV)**).
- **Fee Records Tab UI (`FeeImportWizard`):** Guided multi-stage wizard (`Upload & Validate` → `Manual Mapping` if needed → `Financial Reconciliation Preview` → `Import Successful!`).

#### 3. Available User Actions
- **Download Template (`GET /api/import/template/{students|teachers|fees}`):**
  - `students_template.csv`: `Student Name,Class,Section,Contact,Admission Date`
  - `teachers_template.csv`: `Teacher Name,Designation,Contact,Assigned Sections` (e.g., `"10-A, 10-B"`)
  - `fees_template.csv`: `ERP ID,Student Name,Father Name,Class Name,Section,Total Fee,Amount Paid,Month,Year,Payment Mode,Reference No,Remarks`
- **Import Students (`POST /api/import/students`):**
  - Validates `Student Name` and `Class` required on every row. Automatically creates missing Classes and Sections on the fly. Generates sequential ERP IDs and sets default password `'password123'`.
  - Runs in an all-or-nothing transaction: any validation failure returns HTTP `400` with a downloadable CSV error report (`Row,Field,Error`).
- **Import Teachers (`POST /api/import/teachers`):**
  - Validates `Teacher Name` required and `Assigned Sections` formatted as `"Class-Section"` (comma-separated, or `"All Sections"`). Automatically creates missing Classes, Sections, and a `'Default Year'` academic year if none is current. Default password `'password123'`.
- **Fee Import Wizard (`FeeImportWizard.jsx`):**
  - **Step 1 (Upload & Auto-Match):** Uploads file (`POST /api/import/fees/upload`), validates mandatory columns (`Total Fee`, `Amount Paid`, `Month`, `Year`, plus either `ERP ID` or `Student Name`), matches students by `ERP ID` first then `Student Name + Class Name + Section`, and reconciles.
  - **Step 2 (Manual Mapping — if `AWAITING_RESOLUTION`):** Displays ambiguous/unmatched rows with a student dropdown. *(Verified Bug: `FeeImportWizard.jsx` calls `/users?role=STUDENT&limit=5000` and assigns `res.data` instead of `res.data.data`, which fails to populate the dropdown array when pagination is triggered.)*
  - **Step 3 (Preview):** Displays **Total Fee Invoices**, **Total Paid**, and **Outstanding Balance** (`POST /api/import/fees/:jobId/preview`). Rejects rows where `Amount Paid > Total Fee`.
  - **Step 4 (Confirm):** Commits invoices and payments transactionally (`POST /api/import/fees/:jobId/confirm`) and displays **Import Successful!** with **Import Another File** button.

#### 4. Step-by-Step User Flow (Students/Teachers)
1. Navigate to **Data Import** and select **Students** or **Teachers**.
2. Click **Download Template** and populate rows in Excel/CSV.
3. Drag and drop or select the file in the upload zone and click **Start Import**.
4. If successful, review the imported count; if validation errors occur, click **Download Error Report (CSV)**, fix the flagged rows, and re-upload.

#### 5. Important Edge Cases
- **Empty File:** Rejected with CSV error `"File is empty"`.
- **Fee Import Amount Paid > Total Fee:** Rejected at preview with 400 error.
- **Ambiguous Student Matching in Fee Wizard:** Blocked by the frontend pagination unwrapping bug noted above if a school has unmatched/ambiguous rows.

#### 6. Related Modules
- **Users (`/admin/users`)** and **Academics (`/academics`)** reflect newly imported users and auto-created classes/sections.
- **Fees (`/fees`)** reflects committed fee invoices and payments.

---

### Module 3: Academic Calendar (`/admin/academic-calendar`)

#### 1. Module Introduction
Configures exceptions to the school's default calendar schedule (Monday–Saturday = Working Day; Sunday = Holiday) so dashboards and attendance reports accurately count working days.

#### 2. Initial Screen & UI Elements
- **Header:** `"Academic Calendar"`, month picker (`<input type="month">`), and **"+ Add Override"** button.
- **Info Alert:** Explains default Mon–Sat working / Sun holiday rule.
- **Overrides Table (`ResponsiveTable`):** Columns `Start Date`, `End Date`, `Status` badge (`WORKING` green, `HOLIDAY` red, `VACATION` blue), `Reason`, and `Actions` (`Edit2`, `Trash2`).

#### 3. Available User Actions
- **Filter by Month:** Selecting a month filters overrides via `GET /api/academic-calendar?startDate=...&endDate=...`.
- **Add Override (`POST /api/academic-calendar`):**
  - `Status Type`: `Working Day` (`WORKING`), `Holiday` (`HOLIDAY`), or `Vacation` (`VACATION`).
  - `Start Date` (`min` = today; backend rejects past dates).
  - `End Date` (enabled only for `VACATION`; auto-locked to `Start Date` for `WORKING` and `HOLIDAY`).
  - `Reason / Occasion` (required for `HOLIDAY` and `VACATION`; optional for `WORKING`).
- **Edit Override (`PUT /api/academic-calendar/:id`)** and **Delete Override (`DELETE /api/academic-calendar/:id` via `ConfirmDialog`)**.

#### 4. Step-by-Step User Flow
1. Open **Academic Calendar** from the sidebar.
2. Click **Add Override**.
3. Choose **Status Type** (`Holiday`, `Vacation`, or `Working Day`).
4. Pick **Start Date** (and **End Date** if `Vacation`) and enter **Reason / Occasion**.
5. Click **Save Override**. Verify the badge appears in the table and updates today's banner on the Dashboard if applicable.

#### 5. Important Edge Cases
- **Overlapping Dates:** Backend returns HTTP `409` (`"An overlapping override already exists for this date range."`).
- **Past Dates:** Blocked by both input `min` and Zod validation (`"startDate cannot be in the past"`).

#### 6. Related Modules
- **Dashboard (`/`):** Displays today's effective status badge in the Welcome Banner.
- **Reports (`/reports`):** Uses `academicCalendarService.countWorkingDays` to compute Attendance Insights working days and attendance percentage.

---

### Module 4: Academics (`/academics`)

#### 1. Module Introduction
Manages the school's class hierarchy (Classes/Grades and Sections) and lets Admins inspect enrolled students per section.

#### 2. Initial Screen & UI Elements
- **Header:** `"Academics"`, subtitle `"Manage classes, sections, and subjects"`, and **"+ Add Class"** button.
- **Class Cards Grid:** Each card displays `"Class {name}"`, an inline **Edit** button, a `"{N} Sections"` pill, a list of Section rows (showing badge letter, `"Section {name}"`, student count icon, **Edit Section** book icon, **Delete Section** trash icon), and a full-width **"+ Add Section"** button.
- **Empty State:** `"No classes found. Click "Add Class" to get started."`

#### 3. Available User Actions
- **Add Class (`POST /api/classes`):** Modal with required `Class Name` (unique per school).
- **Edit Class (`PUT /api/classes/:classId`):** Modal to rename class.
- **Add Section (`POST /api/classes/:classId/sections`):** Modal with required `Section Name` (unique within class).
- **Edit Section (`PUT /api/classes/sections/:sectionId`):** Modal to rename section.
- **Delete Section (`DELETE /api/classes/sections/:sectionId`):** Opens `ConfirmDialog` warning that students and timetable data for the section are affected. *(Note: Deleting an entire Class is not exposed in the UI or API.)*
- **Inspect Section Roster:** Clicking any section row expands an accordion below it fetching `GET /api/classes/sections/:sectionId/students` and listing student initials, names, and ERP IDs (or `"No students in this section."`).

#### 4. Step-by-Step User Flow
1. Open **Academics** from the sidebar.
2. Click **Add Class**, enter the grade name (e.g., `10`), and submit.
3. Click **Add Section** inside the newly created Class card, enter `A`, and submit.
4. Click a Section row to expand and verify enrolled students.

#### 5. Important Edge Cases
- **Duplicate Class/Section Name:** Backend returns `409` conflict.
- **Delete Section with Dependent Records:** Prisma foreign key constraint (`P2003`) blocks deletion if attendance, assignments, timetable entries, or students reference the section, returning `"Cannot complete this action because it references related records. Please remove dependent data first."`

#### 6. Related Modules
- **Users**, **Time Table**, **Attendance**, **Assignments**, and **Reports** all depend on Classes and Sections created here.

---

### Module 5: Time Table (`/timetable`)

#### 1. Module Introduction
Configures school subjects and period time slots, builds weekly Monday–Saturday class schedules via an inline grid editor, and lets Admins inspect individual teachers' weekly schedules.

#### 2. Initial Screen & UI Elements
- **Header:** `"Time Table"`, subtitle (`"Click any cell to edit directly"` when a class & section are selected in Class View), plus **"+ Subject"** and **"+ Period"** buttons.
- **View Mode & Filter Card:**
  - Segmented toggle: **Class View** / **Teacher View**.
  - **Class View Filters:** `Select Class...` dropdown and `Select Section...` dropdown.
  - **Teacher View Filters:** `Select Teacher...` dropdown.
- **Weekly Grid (`MONDAY`–`SATURDAY` columns × `Periods` rows):**
  - Left sticky `Period` column shows period name and `startTime - endTime`, plus a hover edit button (`BookOpen` icon) for Admins.
  - Empty prompt when nothing is selected: `"Please select a class to view or manage the timetable."` or `"Please select a teacher to view their schedule."`

#### 3. Available User Actions
- **Create Subject (`+ Subject` → `POST /api/timetable/subjects`):** Required `Subject Name` + optional `Subject Code`. *(Note: UI has no edit/delete subject controls, though backend supports `DELETE /api/timetable/subjects/:id`.)*
- **Create / Edit Period (`+ Period` / hover icon → `POST /api/timetable/periods` or `PUT /api/timetable/periods/:id`):** Required `Period Name`, `Start Time` (`time`), `End Time` (`time`). *(Delete period exists on backend only.)*
- **Assign / Edit / Delete Timetable Cell (`Class View` with both Class and Section selected):**
  - Clicking any cell (filled or `+ Add`) opens an inline popover (`Day · Period Name`).
  - Select `Subject` (required) and `Teacher` (required), then click **Save** / **Update** (`DELETE /api/timetable/:id` if editing existing, then `POST /api/timetable`).
  - Clicking the trash icon inside an occupied cell's popover triggers `ConfirmDialog` (`"Delete Entry"`).
- **Inspect Teacher Schedule (`Teacher View`):** Read-only purple-tinted grid showing `"Class - Section"` and `Subject` per slot, or `"Free"`.

#### 4. Step-by-Step User Flow
1. Open **Time Table** from the sidebar.
2. Click **+ Subject** to add subjects (e.g., Mathematics / `MAT101`) and **+ Period** to define time slots (e.g., `Period 1`, `08:00`–`08:45`).
3. In **Class View**, choose a **Class** and **Section**.
4. Click an empty **Add** cell for a day and period, pick a **Subject** and **Teacher**, and click **Save**.
5. Switch to **Teacher View** and pick a teacher to confirm there are no scheduling conflicts.

#### 5. Important Edge Cases
- **Double-Booking Conflict (`409`):** If a teacher is already scheduled in another class during that period/day, or the slot is already occupied, a specific toast displays: `"{Teacher} is already assigned to another class during {Period} on {Day}."`
- **No Section Selected in Class View:** Notice that `fetchTimetable` runs when `selectedClassId` is set even before `selectedSectionId` is chosen, showing combined entries, while `canEdit` requires both `selectedClassId` and `selectedSectionId` to be selected.

#### 6. Related Modules
- **Academics (`/academics`):** Provides Classes and Sections.
- **Users (`/admin/users`):** Provides Teachers (`teacherProfile.id`).
- **Student Academics & Teacher Attendance:** Student `/academics` derives enrolled subjects from timetable entries; Teacher `/attendance` combines timetable slots with assigned sections.

---

### Module 6: Daily Attendance (`/attendance`)

> **Access Note:** Not listed in the Admin sidebar; accessed via **Admin Dashboard → Today's Action Center → "Mark Attendance →"** (when pending) or directly via `/attendance`.

#### 1. Module Introduction
Allows Admins to view, mark, save, lock, unlock, or finalize daily attendance for any class/section on any date up to today.

#### 2. Initial Screen & UI Elements
- **Header:** `"Daily Attendance"`.
- **Control Bar:** `Class` dropdown, `Section` dropdown, `Date` picker (`max` = today), and **Fetch List** button.
- **Student Roster Card (after fetching):** Header with student count and status badge (`LOCKED` or `FINAL SAVED`), **Mark All Present** / **Mark All Absent** buttons, per-student `Present` / `Absent` toggle buttons, and footer state buttons.

#### 3. Available User Actions
- **Mark & Save Temp (`Save Temp` → `POST /api/attendance`):** Saves attendance as a draft (`isLocked: false, isSaved: false`). Pre-fills unmarked students as `PRESENT`. *(Note: Backend schema supports `LEAVE`, but UI only provides `PRESENT` and `ABSENT` toggles.)*
- **Lock Attendance (`Lock Attendance` → `POST /api/attendance` + `PUT /api/attendance/lock`):** Saves and locks records (`isLocked: true`), preventing edits until unlocked. Auto-finalized by a nightly midnight cron job after **48 hours**.
- **Unlock (`Unlock` → `PUT /api/attendance/unlock`):** Available when `isLocked && !isSaved` to reopen edits.
- **Final Save (`Final Save` → `PUT /api/attendance/save`):** Permanently commits attendance (`isSaved: true`). Button changes to disabled **Permanently Saved**.

#### 4. Step-by-Step User Flow
1. Navigate to `/attendance` (from Dashboard Action Center or URL).
2. Select **Class**, **Section**, and **Date**, then click **Fetch List**.
3. Toggle **Present** or **Absent** per student (or use **Mark All Present / Absent**).
4. Click **Save Temp** for a draft, **Lock Attendance** to lock, or **Final Save** once locked to finalize permanently.

#### 5. Important Edge Cases
- **Unsaved Changes Warning:** Navigating away with unsaved/unlocked edits triggers a browser `beforeunload` confirmation prompt.
- **Editing Locked/Finalized Attendance:** Backend blocks `POST /api/attendance` with `400` (`"Cannot modify attendance as it is locked or saved."`).

---

### Module 7: Assignments (`/assignments`)

> **Access Note:** Not listed in the Admin sidebar; accessible via `/assignments` or clicking an assignment notification.

#### 1. Module Introduction
Allows Admins (alongside Teachers) to post classwork/homework assignments and inspect student submissions.

#### 2. Initial Screen & UI Elements
- **Header:** `"Assignments"` and **"+ New Assignment"** button.
- **Assignment Cards Grid:** Title, description (2-line clamp), due date box, metadata (`By {teacher?.name} • Class {class?.name} ({section.name})`), optional **View Resource** link, and **Submissions ({count})** expandable drawer. *(Note: Backend `/api/assignments` includes `section.class`, not `teacher` or top-level `class`, so `"By • Class"` may show blank names unless populated.)*

#### 3. Available User Actions
- **Create Assignment (`+ New Assignment` → `POST /api/assignments`):** Required `Title`, `Instructions` (`description`), `Due Date`, `Class`, `Section`, and optional file attachment (`jpg`, `png`, `jpeg`, `pdf`, `doc`, `docx`). Sends push notifications to students in the section.
- **View Submissions (`GET /api/assignments/:assignmentId/submissions`):** Expands a scrollable list of submitted students (`name`, `erpId`) with **View** links to uploaded URLs/files.

#### 4. Step-by-Step User Flow
1. Open `/assignments` and click **New Assignment**.
2. Fill in title, instructions, due date, Class, Section, and optional attachment, then click **Post Assignment**.
3. On any assignment card with submissions, click **View Submissions** and click **View** next to a student to inspect their file.

---

### Module 8: Accounts & Fees (`/fees`, `/invoices/:invoiceId`, `/payments/:paymentId`)

#### 1. Module Introduction
Full student fee billing, payment recording, transaction ledger, PDF invoice/receipt generation, and student UPI payment verification.

#### 2. Initial Screen & UI Elements
- **Header:** `"Accounts & Fees"` and **"+ Add Transaction"** button.
- **3 Tabs:**
  1. **Student Fee Summary**
  2. **Transaction History**
  3. **Verification** (`PaymentVerification`)

#### 3. Available User Actions by Tab
- **Tab 1: Student Fee Summary (`GET /api/fees/summary`):**
  - Search by student name/ERP ID (350ms debounce) and filter by status pills: `NO FEES`, `PAID`, `PARTIAL` (`PARTIALLY_PAID`), `PENDING`, `OVERDUE`.
  - Infinite-scroll table showing Student, Class/Sec, Total Billed, Amount Due, Due Date, Status badge, and **Create Invoice** (for `NO_FEES` students) or **View History** (pre-filters History tab by that student's ERP ID).
- **Tab 2: Transaction History (`GET /api/fees/history`):**
  - Search by student, ERP ID, Ref No, or Invoice Number; filter pills for `INVOICES` and `PAYMENTS`.
  - Table shows Transaction icon/student, Amount (`+₹...` in green for non-rejected payments), Details (Invoice Number, Billing Month/Year or Mode + Ref No), Remarks, Date, and 3 row actions:
    - **View Document** (`FileText`) → opens `/invoices/:id` or `/payments/:id` (A4 PDF viewer on desktop, PDF Download button on mobile, status watermark, QR verification code).
    - **Edit** (`Edit2`) → opens transaction modal in edit mode (`PUT /api/fees/invoice/:id` or `PUT /api/fees/payment/:id`).
    - **Delete** (`Trash2`) → opens `ConfirmDialog` (`DELETE /api/fees/invoice/:id` warns if deleting an invoice will also delete associated payments; `DELETE /api/fees/payment/:id` deletes payment).
- **Add Transaction Modal (`+ Add Transaction`):**
  - Mode switcher: **Create Invoice** / **Record Payment**.
  - **Create Invoice (`POST /api/fees/invoice`):** Searchable `EntityCombobox` for Student (shows ERP ID, class, and current dues), `Amount (₹)`, optional `Due Date`, `Billing Month`, `Billing Year`, `Remarks`. Generates `INV-{year}-{month}-{8hex}` and notifies student.
  - **Record Payment (`POST /api/fees/payment`):** Searchable Student combobox, `Outstanding Invoice` dropdown (lists unpaid/partial invoices from loaded history), `Amount Paid (₹)`, `Payment Mode` (`CASH`, `ONLINE`, `CHEQUE`, `CARD`), optional `Reference No.`, `Remarks`. Notifies student.
- **Tab 3: Verification (`PaymentVerification.jsx`):**
  - Lists `PENDING_VERIFICATION` UPI payments (`GET /api/fees/upi/pending`), searchable locally by student name, ERP ID, or UTR.
  - Displays Student & Invoice, Amount, UTR No., Screenshot (`View` external link), Submitted At, and **Approve** / **Reject** buttons (`ConfirmDialog` → `POST /api/fees/upi/:paymentId/verify` with `{ action: 'approve' | 'reject' }`), updating status to `SUCCESS` or `REJECTED` and notifying the student.

#### 4. Step-by-Step User Flow (Creating Invoice & Verifying UPI Payment)
1. Click **Fees** in the sidebar.
2. Click **Add Transaction**, choose **Create Invoice**, search and select a student, enter amount, month, year, optional due date/remarks, and click **Create Invoice**.
3. To verify a student's UPI submission, switch to the **Verification** tab, review the UTR number and screenshot, click **Approve** (or **Reject**), and confirm in the dialog.

#### 5. Important Edge Cases
- **Frontend Refresh Bug (`Fees.jsx`):** Lines 189, 207, and 782 invoke an undefined `fetchData()` function right after saving an invoice/payment, which causes the `catch` handler to display an error toast (`"Failed to save invoice/payment"`) even after the backend `POST`/`PUT` succeeds. Refreshing the page shows the saved record.
- **Payment Invoice Dropdown Scope:** The `Outstanding Invoice` dropdown filters from currently loaded `feeHistory` pages; if a student's invoice isn't in the loaded pages, scrolling History or searching first ensures it appears.
- **"Added By" Field:** Backend stores `createdBy` / `receivedBy` and returns `creator` on invoices, but `Fees.jsx` and the PDF components do not render staff creator/receiver names in the UI.

---

### Module 9: Reports & Insights (`/reports`)

#### 1. Module Introduction
Provides school-wide analytical summaries, student attendance rankings, low-attendance alerts, fee collection breakdowns, and defaulter tracking.

#### 2. Initial Screen & UI Elements
- **Header:** `"Reports & Insights"`.
- **Two Tabs (Admin sees both):** `Attendance Insights` (default) and `Fee Insights`.
- **Shared Filter Bar (`ReportFilterBar.jsx`):**
  - `Date Range` preset (`Today`, `This Week`, `This Month` [default], `Last Month`, `This Year`, `Custom Range` revealing Start/End Date inputs).
  - `Class (Optional)` and `Section (Optional)` dropdowns.
  - **Apply Filters** button.

#### 3. Available User Actions & Visuals
- **Attendance Insights Tab (`AttendanceReportTab.jsx`):**
  - 4 KPI cards: `Working Days` (resolved via Academic Calendar overrides), `Total Present`, `Total Absent`, `Avg. Attendance Rate` progress bar.
  - **Top 10 Attendance:** Ranked list with `#1`–`#10`, student name, ERP ID, percentage, and present days.
  - **Low Attendance (`Below 75%`):** Infinite-scroll alert list of students below 75% attendance.
  - *(Backend note: `GET /api/reports/attendance/chronic-absentees` and `/comparative` are backend placeholders returning a future-implementation message / `501`, and are not wired into the UI.)*
- **Fee Insights Tab (`FeeReportTab.jsx`):**
  - 4 KPI cards: `Expected Amount`, `Collected Amount`, `Outstanding`, `Collection Rate` progress bar (all scoped to invoices whose `dueDate` falls in the selected date range).
  - **Payment Methods:** Progress-bar breakdown of `SUCCESS` payments grouped by `paymentMode` (`CASH`, `UPI`, `ONLINE`, etc.).
  - **Fee Defaulters Table:** Infinite-scroll table showing Student, Class/Sec, Pending Amount, and `Days Overdue` badge (red if `> 30` days, amber otherwise) for past-due unpaid invoices.

#### 4. Step-by-Step User Flow
1. Click **Reports** in the sidebar.
2. Select a **Date Range** preset (or **Custom Range** with start/end dates) and optionally filter by **Class** and **Section**, then click **Apply Filters**.
3. Inspect Attendance KPIs, Top 10 ranking, and Low Attendance alerts.
4. Switch to **Fee Insights** to inspect expected vs. collected amounts, payment modes, and overdue defaulters.

#### 5. Important Edge Cases
- **Custom Range Validation:** Clicking **Apply Filters** without both Start and End dates triggers toast `"Please select both Start Date and End Date for Custom Range."` Backend rejects windows over 5 years.
- **No Working Days:** If a custom range contains only Sundays/holidays, Working Days is `0` and Avg. Attendance Rate shows `0%`.
- **Invoices Without Due Dates:** `FeeReportRepository` queries invoices by `dueDate` within the date range, so invoices created without a `dueDate` are excluded from Fee Insights calculations and Defaulters.

---

### Module 10: School Settings (`/admin/settings`)

#### 1. Module Introduction
Configures school branding (theme color, logo, description) and UPI payment details used for student UPI payments.

#### 2. Initial Screen & UI Elements
- Accessed via **Top-Right Profile Menu → School Settings**.
- Form fields:
  - **School Name** (read-only gray field with note: `"Please contact super admin to update your school's name."`).
  - **Theme Color** (native `<input type="color">` + hex readout, default `#3b82f6`).
  - **School Logo** (drag/click preview box, max 2MB image, **Remove Logo** button).
  - **School Description** (4-row textarea).
  - **Merchant Name (UPI)** (text input, e.g., `ABC Public School`).
  - **School UPI ID** (text input, e.g., `abcschool@okaxis`).
  - **Save Changes** button.

#### 3. Step-by-Step User Flow
1. Open Profile dropdown (top right) → **School Settings**.
2. Adjust **Theme Color**, upload a **School Logo** (< 2MB), update **Description**, and enter **Merchant Name (UPI)** and **School UPI ID**.
3. Click **Save Changes** (`PUT /api/schools/settings`).
4. Verify the CSS `--app-theme-color` updates immediately across the UI and the logo updates in the sidebar.

#### 4. Important Edge Cases
- **Logo > 2MB:** Blocked client-side with toast `"Image size should be less than 2MB"`.
- **Missing UPI Settings:** Students attempting `"Pay via UPI"` receive `"UPI ID is not configured for this school. Please contact administration."`
- **`contactInfo` Field:** While PDF invoices/receipts look for `school.settings.contactInfo`, `Settings.jsx` has no input field for `contactInfo`.

---

## F. Complete Role-Based User Journeys

### Journey 1: New School Initial Setup
- **Objective:** Take a newly provisioned school from Setup Mode to an active operational campus.
- **Starting Point:** Login → `AdminDashboard` (Setup Mode).
- **Sequence:** `AdminDashboard` → **Academics** (`/academics`) → **Users** (`/admin/users`) or **Data Import** (`/admin/import`) → **Time Table** (`/timetable`) → **School Settings** (`/admin/settings`) → **Dashboard** (`/`).
- **Actions & Results:** Create Classes & Sections → Add/Import Teachers (with section assignments) and Students → Create Subjects, Periods, and Weekly Timetable cells → Set Theme Color, Logo, and School UPI ID → Post first Notice → Operational KPIs and charts activate on Dashboard.

### Journey 2: Daily Operations & Monitoring
- **Objective:** Check campus health, resolve pending attendance, verify student UPI payments, and review reports.
- **Starting Point:** Operational `AdminDashboard` (`/`).
- **Sequence:** `AdminDashboard` → **Attendance** (`/attendance`) → **Fees → Verification** (`/fees`) → **Reports** (`/reports`).
- **Actions & Results:** Review KPIs and Action Center → Open pending class attendance if needed and lock/finalize → Approve or reject student UPI proofs with UTR/screenshot review → Apply monthly filter in Reports to monitor <75% attendance alerts and fee defaulters.

### Journey 3: Managing Academic Calendar Exceptions & Announcements
- **Objective:** Declare an upcoming festival holiday and notify the campus.
- **Starting Point:** Sidebar → **Academic Calendar** (`/admin/academic-calendar`).
- **Sequence:** `/admin/academic-calendar` → **Dashboard** (`/`).
- **Actions & Results:** Add `HOLIDAY` override with date and occasion → Return to Dashboard → Expand **Dispatch Announcement**, select `Everyone` (leave checkboxes unchecked) or specific roles, and publish notice.

---

## G. Permissions & Role Boundaries

| Capability / Resource | UI Access | Backend Enforcement (`roleMiddleware` & Scoping) |
|---|---|---|
| **Users (All Roles in School)** | Full CRUD-like management (Create, View, Edit, Disable/Enable, Archive/Restore; no hard Delete) | `ADMIN` (school-scoped via `req.user.schoolId`). Cannot disable/archive `isPrimary` accounts. |
| **Bulk Data Import** | Full access (`Students`, `Teachers`, `Fee Records`) | `ADMIN` & `SUPER_ADMIN` (`schoolId`-scoped). |
| **Academic Calendar** | View + Create/Edit/Delete overrides | `ADMIN` & `SUPER_ADMIN` (`schoolId`-scoped). |
| **Academics (Classes/Sections)** | Create/Edit Classes; Create/Edit/Delete Sections; View Students | `ADMIN` only for mutations (`class.routes.js`). |
| **Time Table (Subjects/Periods/Slots)** | Full Class View editing + Teacher View read-only | `ADMIN` only for all Subject, Period, and Entry mutations (`timetable.routes.js`). |
| **Daily Attendance** | Mark, Save Temp, Lock, Unlock, Finalize | `ADMIN` & `TEACHER` (`attendance.routes.js`). |
| **Assignments** | Create assignments & view submissions (cannot submit as student) | `ADMIN` & `TEACHER` (`assignment.routes.js`). |
| **Fees & UPI Verification** | View Summary/History, Create/Edit/Delete Invoices & Payments, Approve/Reject UPI | `ADMIN` & `ACCOUNTS` (`fee.routes.js`). |
| **Reports & Insights** | Both `Attendance Insights` and `Fee Insights` | `ADMIN` allowed on `/reports/attendance/*` and `/reports/fees/*`. |
| **School Settings** | View & update theme, logo, description, UPI info (name read-only) | `ADMIN` only (`school.routes.js`). |
| **Notices** | View all school notices; Create, Edit & Delete any notice in school | `ADMIN` can edit/delete any notice in their school (`noticeController.js`). |
| **Super Admin & Cross-School Data** | Not accessible (`Access Denied` on `/super-admin/*`) | Blocked by `roleMiddleware(['SUPER_ADMIN'])` & `schoolId` filtering. |

---

## H. Suggested Help Video Recording Sequence

| Segment | Screen | User Action | Narration Objective | Expected Result | Prerequisites |
|---|---|---|---|---|---|
| 1. Intro & Login | `/login` | Enter Admin ERP ID & password, click **Sign in** | Introduce the School Admin role and show login + school branding theme | Redirects to `/` with school theme applied | Active school & Admin credentials |
| 2. Onboarding / Dashboard | `/` | Walk through Setup Checklist (if new) or KPI cards, Action Center, Charts, Activity Feed | Explain how the Admin monitors attendance, fees, and campus activity at a glance | Viewer understands KPIs vs. actionable links | Seeded school data (or fresh school for Setup Mode) |
| 3. School Settings | `/admin/settings` | Open Profile menu → **School Settings**, pick Theme Color, upload Logo, enter UPI ID, click **Save Changes** | Show how branding and UPI payment details are configured once | Theme color and sidebar logo update immediately | Logo image (< 2MB) |
| 4. Academic Structure | `/academics` | Click **Add Class**, add a **Section**, click a section row to expand students | Show how Classes and Sections form the foundation of the ERP | New class/section card appears and expands student list | None |
| 5. Users & Bulk Import | `/admin/users` & `/admin/import` | Create a Teacher/Student via **Add User**; open **Data Import**, download CSV template | Compare single user creation (with auto ERP ID) vs. bulk spreadsheet onboarding | Toast displays generated ERP ID; template downloads | Classes/Sections exist |
| 6. Academic Calendar | `/admin/academic-calendar` | Click **Add Override**, select `Holiday`, pick date, enter reason, save | Explain Mon–Sat default working rule and how overrides affect reports/dashboard | Holiday row appears in table | Future date |
| 7. Time Table | `/timetable` | Add Subject & Period, select Class & Section, click cell to assign Subject + Teacher, toggle **Teacher View** | Demonstrate inline cell scheduling and conflict prevention | Schedule grid populates; Teacher View shows teacher load | Classes, Sections, Teachers exist |
| 8. Notices & Daily Ops | `/` & `/attendance` | Expand **Dispatch Announcement**, select audience, publish; open `/attendance` from Action Center | Show multi-audience announcements and how Admin can inspect/finalize attendance | Notice appears in Published Notices; attendance list loads | Pending attendance or active sections |
| 9. Fees & Verification | `/fees` | Create an Invoice, record a Payment, open PDF receipt, switch to **Verification** tab | Demonstrate billing lifecycle and reviewing student UPI proofs | Invoice/Payment saved; PDF preview opens; UPI verified | Students exist; UPI configured |
| 10. Reports & Global Controls | `/reports`, Navbar | Filter **Attendance Insights** & **Fee Insights**; demo Global Search, Notifications, Bug Report, Sign Out | Tie operational data back to insights and close with global navigation tools | Charts, Top 10, Low Attendance, and Defaulters render | Attendance & fee data in date range |
