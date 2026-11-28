# SchoolChakra Role-Based Help Guides & Video Documentation

This directory contains source-code-verified, role-based user stories, module workflows, permission boundaries, and help-video recording plans for **SchoolChakra**, a multi-tenant School ERP platform.

> **Scope Note:** Per project requirements, **Super Admin (`SUPER_ADMIN`)** workflows, dashboards, and platform administration modules are intentionally excluded.  
> **Role Audit Result:** Inspection of `backend/prisma/schema.prisma` (`enum UserRole`) confirms there are exactly five roles in the codebase: `SUPER_ADMIN` (excluded), `ADMIN`, `TEACHER`, `STUDENT`, and `ACCOUNTS`. No additional non-super-admin roles exist.

---

## Documentation Index

| Document | Target Role / Scope | Link |
|---|---|---|
| **Common UI & Shared Elements Guide** | All non-Super Admin roles (Login, Header, Search, Sidebar, Notifications, Profile, Bug Reporting, Error Handling) | [shared/common-ui-guide.md](./shared/common-ui-guide.md) |
| **School Admin Guide** | `ADMIN` — School setup, users, bulk import, calendar, academics, timetable, attendance, assignments, fees, reports, settings | [school-admin/user-guide.md](./school-admin/user-guide.md) |
| **Teacher Guide** | `TEACHER` — Notices, attendance marking/locking/finalizing, personal timetable, assigned classes, assignments | [teacher/user-guide.md](./teacher/user-guide.md) |
| **Student Guide** | `STUDENT` — Notices, daily status, enrolled subjects, timetable, homework submission, fee summary/PDFs/UPI payments | [student/user-guide.md](./student/user-guide.md) |
| **Accounts Guide** | `ACCOUNTS` — Financial dashboard, invoices, payments, PDF receipts, UPI verification, fee insights reports | [accounts/user-guide.md](./accounts/user-guide.md) |

---

## Suggested Video Production Order

Recording videos in the following sequence minimizes repeated explanations and builds naturally on real school setup dependencies:

1. **Video 0 — Shared Navigation & Common UI Essentials** ([Common UI Guide](./shared/common-ui-guide.md))
   - Covers Login (`/login`), school branding/theming, Sidebar & Bug Reporting, Global Search, Notification Bell & Center (`/notifications`), and Profile (`/profile`) so role videos can stay focused on role-specific workflows.
2. **Video 1 — School Admin Walkthrough** ([School Admin Guide](./school-admin/user-guide.md))
   - Records first because Admin creates Classes/Sections, Users, Timetables, Academic Calendar overrides, School Settings (including UPI ID), and initial Fee Invoices required for the other role demos.
3. **Video 2 — Teacher Walkthrough** ([Teacher Guide](./teacher/user-guide.md))
   - Demonstrates consuming the Admin-created timetable/sections to mark attendance, post assignments, and publish targeted notices.
4. **Video 3 — Student Walkthrough** ([Student Guide](./student/user-guide.md))
   - Demonstrates the Student receiving the Teacher's attendance/assignments/notices and paying an invoice via UPI.
5. **Video 4 — Accounts Walkthrough** ([Accounts Guide](./accounts/user-guide.md))
   - Closes the loop by verifying the Student's submitted UPI payment, issuing receipts, recording offline payments, and reviewing Fee Insights reports.

---

## Route-to-Role Coverage Audit

Every non-Super Admin route in `frontend/src/App.jsx` has been audited against `frontend/src/components/layout/Sidebar.jsx` and backend `roleMiddleware` checks:

| Route | `ADMIN` | `TEACHER` | `STUDENT` | `ACCOUNTS` | Implementation Notes |
|---|---|---|---|---|---|
| `/` | `AdminDashboard` | `GeneralDashboard` | `GeneralDashboard` | `AccountsDashboard` | `DashboardRouter` routes non-Super Admin to `Dashboard` |
| `/login` | Public | Public | Public | Public | Redirects to `/` when authenticated |
| `/user-guide` | Public | Public | Public | Public | Loads `/docs/*.md` standalone viewer |
| `/admin/users` | Sidebar + Route | Blocked (`Access Denied`) | Blocked (`Access Denied`) | Blocked (`Access Denied`) | Protected by `allowedRoles={['ADMIN']}` |
| `/admin/users/:id` | Click user / Search | Blocked (`Access Denied`) | Blocked (`Access Denied`) | Blocked (`Access Denied`) | Protected by `allowedRoles={['ADMIN']}` |
| `/admin/import` | Sidebar + Route | Blocked (`Access Denied`) | Blocked (`Access Denied`) | **Broken link on Dashboard** → `Access Denied` | `AccountsDashboard` links here, but route & API are `ADMIN`-only |
| `/admin/academic-calendar` | Sidebar + Route | Blocked (`Access Denied`) | Blocked (`Access Denied`) | Blocked (`Access Denied`) | Protected by `allowedRoles={['ADMIN']}` |
| `/admin/settings` | Profile menu + Route | Blocked (`Access Denied`) | Blocked (`Access Denied`) | Blocked (`Access Denied`) | Protected by `allowedRoles={['ADMIN']}` |
| `/students` | Placeholder | Placeholder | Placeholder | Placeholder | Renders `"Students Module Coming Soon..."` |
| `/academics` | Sidebar + CRUD | Sidebar + Assigned Read-Only | Sidebar + Subjects Grid | No sidebar (unrestricted route, read-only) | Mutations `ADMIN`-only in `class.routes.js` |
| `/attendance` | Action Center + Full Flow | Sidebar + Full Flow | Placeholder (`Coming Soon`) | No sidebar (unrestricted route) | Writes `ADMIN`/`TEACHER` only in `attendance.routes.js` |
| `/timetable` | Sidebar + Full Editor | Sidebar + Personal Read-Only | Sidebar + Section Read-Only | No sidebar (unrestricted route) | Mutations `ADMIN`-only in `timetable.routes.js` |
| `/assignments` | Direct URL + Create/View | Sidebar + Create/View | Sidebar + View/Submit | No sidebar (unrestricted route) | Create/Submissions: `ADMIN`/`TEACHER`; Submit: `STUDENT` |
| `/fees` | Sidebar + Full + Verify | No sidebar (API read unprotected, writes `403`) | Sidebar + Own + UPI Pay | Sidebar + Full + Verify | Self-scoped for `STUDENT`; full for `ADMIN`/`ACCOUNTS` |
| `/invoices/:invoiceId` | From Fees History | `403` | Own Invoices Only | From Fees History | `ADMIN`, `ACCOUNTS`, `STUDENT` in `fee.routes.js` |
| `/payments/:paymentId` | From Fees History | `403` | Own Payments Only | From Fees History | `ADMIN`, `ACCOUNTS`, `STUDENT` in `fee.routes.js` |
| `/reports` | Sidebar (Both Tabs) | `Access Denied` | `Access Denied` | Sidebar (`Fee Insights` only) | Client guard + `reports.routes.js` `roleMiddleware` |
| `/profile` | Profile menu (Editable*) | Profile menu (Read-only) | Profile menu (Read-only) | Profile menu (Read-only) | *See Admin self-profile bugs below |
| `/notifications` | Bell / Profile menu | Bell / Profile menu | Bell / Profile menu | Bell / Profile menu | Scoped to `req.user.userId` |
| `*` (404) | `NotFound` | `NotFound` | `NotFound` | `NotFound` | Displays 404 with link back to `/` |

---

## Known Implementation Gaps & Discrepancies Found During Audit

These verified code-level findings should be kept in mind when scripting help videos or planning QA fixes:

1. **Accounts Dashboard "Import Data" Quick Action (`AccountsDashboard.jsx`):** Navigates to `/admin/import`, which is blocked for `ACCOUNTS` by both `App.jsx` (`allowedRoles={['ADMIN']}`) and `import.routes.js` (`roleMiddleware(['ADMIN', 'SUPER_ADMIN'])`), resulting in an `"Access Denied"` screen.
2. **`Fees.jsx` Post-Save Refresh Bug (`Fees.jsx` lines 189, 207, 782):** Creating/updating an invoice, recording/updating a payment, or submitting a UPI payment calls `fetchData()`, which is undefined in `Fees.jsx` (the component defines `fetchSummaryData` and `fetchHistoryData`). This triggers an error toast after the API succeeds and prevents automatic list refresh until page reload.
3. **Browser Push Subscription Endpoint Mismatch (`frontend/src/lib/pushNotification.js` line 99 vs `backend/src/routes/index.routes.js` line 44):** The frontend calls `POST /api/notifications/subscribe` and `/notifications/unsubscribe`, whereas the backend mounts push routes at `/api/push/subscribe` and `/api/push/unsubscribe`. Clicking **Enable Notifications** on the dashboard banner fails with `404`.
4. **Student Attendance Page Placeholder (`frontend/src/pages/Attendance.jsx` lines 184–190):** Visiting `/attendance` as a `STUDENT` renders `"Student Attendance View Coming Soon"`, even though `GET /api/attendance` supports student self-scoping and `GeneralDashboard` displays today's attendance status.
5. **Admin "Make Primary" Confirmation Modal Missing (`frontend/src/pages/admin/UserManagement.jsx`):** Clicking **Make Primary** sets `showPrimaryConfirm = true`, but no `<ConfirmDialog>` is rendered in JSX, so clicking the button has no visible effect.
6. **Admin Self-Profile Upload & Delete Mismatches (`frontend/src/pages/Profile.jsx` vs `backend/src/routes/user.routes.js`):**
   - `Profile.jsx` uploads avatar under field name `profileImage`, whereas `user.routes.js` expects `profilePic`.
   - `Profile.jsx` renders a **"Delete Account"** button for non-primary Admins calling `DELETE /api/users/:id`, which does not exist in `user.routes.js`.
7. **Fee Import Wizard Ambiguity Dropdown Bug (`frontend/src/pages/admin/FeeImportWizard.jsx` lines 55–56):** Calls `/users?role=STUDENT&limit=5000` and sets `allStudents(stuRes.data)` directly, without unwrapping the paginated `{ data, pagination }` envelope returned by `userController.js` (which also caps `limit` at `100`).
8. **Global Search Navigation for Non-Admins (`frontend/src/components/layout/Navbar.jsx` line 35):** `routeMapper` returns `'#'` for `student`/`teacher` results when `role !== 'ADMIN'`, so clicking a student or teacher search result as a Teacher or Accounts user does not navigate anywhere. Also, `searchService.js` notice search for `TEACHER` and `STUDENT` filters by `targetRoles: { hasSome: [role] }` without `{ isEmpty: true }`, omitting `"EVERYONE"` notices from search results.
9. **Setup Mode `#post-notice` Anchor (`frontend/src/pages/dashboard/AdminDashboard.jsx` line 165):** On a brand-new school (`isNewSchool: true`), step 5 ("Post Your First Notice") attempts to scroll to `#post-notice`, which is only rendered in the operational dashboard view (`isNewSchool: false`).
10. **Assignments Card Metadata & Teacher Filter Scope (`frontend/src/pages/Assignments.jsx` & `backend/src/controllers/assignmentController.js`):**
    - `Assignments.jsx` displays `assign.teacher?.name` and `assign.class?.name`, but `getAssignments` only includes `section.class` (not `teacher` or top-level `class`).
    - When Teachers open `+ New Assignment`, the Class/Section dropdowns display all school classes/sections rather than filtering strictly to the Teacher's assigned sections.
11. **Unused / Partially Implemented Backend Features:**
    - `FeeStructure` / `FeeStructureItems` tables exist in Prisma and are queried by `getAccountsDashboardStats`, but no API routes or UI exist to manage fee structures.
    - `GET /api/reports/attendance/chronic-absentees` returns a placeholder message, and `GET /api/reports/attendance/comparative` returns `501 Not Implemented Yet`.
    - `AttendanceStatus.LEAVE` exists in Prisma and Zod schemas, but the UI only provides `PRESENT` and `ABSENT`.
    - `SchoolSettings.contactInfo` is rendered on PDF invoices/receipts (`InvoiceDocument.jsx`, `PaymentReceiptDocument.jsx`), but `Settings.jsx` has no input field to edit it.
    - `"Added By"` (`creator` / `receivedBy`) is tracked on the backend for invoices/payments, but is not displayed in `Fees.jsx` or PDF templates.
    - `/students` route in `App.jsx` renders `"Students Module Coming Soon..."` (student management lives in `/admin/users`).
