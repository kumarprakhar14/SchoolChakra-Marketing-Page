# Teacher (`TEACHER`) User Guide & Help Video Documentation

> **Role Code:** `TEACHER`  
> **Primary Entry Route:** `/` (`GeneralDashboard`)  
> **Shared UI Reference:** See [Common UI Guide](../shared/common-ui-guide.md) for Login, Top Search Bar, Notifications, Bug Reporting, and Profile controls.

---

## A. Role Overview

- **Who This Role Represents:** A faculty member or class teacher who teaches assigned classes/sections, marks daily student attendance, views their personal weekly teaching schedule, posts announcements, and creates/reviews homework assignments.
- **Key Responsibilities in SchoolChakra:**
  - Reviewing school notices and posting announcements to targeted audiences (Everyone, Students, Teachers, Accounts).
  - Marking, drafting, locking, and finalizing daily attendance for assigned classes and scheduled sections.
  - Checking their personal weekly teaching timetable.
  - Viewing enrolled student rosters in their assigned class sections.
  - Creating class assignments with instructions and file attachments, and reviewing student submissions.
- **Accessible Modules:**
  - Dashboard (`/`)
  - Daily Attendance (`/attendance`)
  - Time Table (`/timetable`)
  - Academics (`/academics`)
  - Assignments (`/assignments`)
  - My Profile (`/profile` — read-only) & Notifications (`/notifications`)
- **Restrictions (Cannot Access or Modify):**
  - **Blocked on Frontend & Backend:** Cannot access User Management (`/admin/users`), Data Import (`/admin/import`), Academic Calendar management (`/admin/academic-calendar`), School Settings (`/admin/settings`), or Reports & Insights (`/reports` — displays `"Access Denied"`).
  - **Read-Only Modules:** Cannot create/edit/delete Classes, Sections, Subjects, Periods, or Timetable entries. Cannot edit their own profile details (`"Please contact your school administrator to update your profile details."`).
  - **Notice Restrictions:** Can only edit or delete notices they authored (`createdBy === userId`).
  - **Fees Module:** Not in Teacher sidebar; backend `fee.routes.js` restricts invoice/payment creation, editing, deletion, PDF invoice/receipt endpoints, and UPI verification to `ADMIN`/`ACCOUNTS` (and `STUDENT` for own PDFs).
  - **Global Search Behavior:** Can search students, teachers, teacher-targeted notices, and own assignments in the Navbar search bar, **but clicking a student or teacher result navigates to `'#'` (no-op)** because non-admins do not have a user profile detail route.
- **Interactions with Other Roles:**
  - Receives section assignments (`Class Teacher`) and timetable schedules from **School Admin**.
  - Marks attendance and publishes assignments for **Students** in their sections.
  - Shares announcements with **Students**, fellow **Teachers**, and **Accounts** via the Dashboard Notice Board.

---

## B. Login & First-Time Experience

1. **Logging In:** Navigate to `/login`, enter the ERP ID and password provided by the School Admin (default bulk-import password is `password123`), and click **Sign in**.
2. **Post-Authentication:** Redirects to `/` (`DashboardRouter` → `Dashboard` → `GeneralDashboard`). The school's custom `themeColor` is applied automatically.
3. **Initial Application Layout:**
   - **Header (`Navbar`):** Global search bar, Notification Bell (shows unread count + dropdown), and Profile Menu (shows `My Profile`, `Notification History`, `Log out`; does *not* show `School Settings`).
   - **Sidebar (`Sidebar`):** School logo & name, 5 navigation items (`Dashboard`, `Attendance`, `Time Table`, `Academics`, `Assignments`), `"Found a bug?"` card, and `"User Guide"` link.
4. **Empty / Unassigned State:**
   - If the Teacher has not yet been assigned any sections or timetable entries by the Admin:
     - **Dashboard (`/`)** still loads normally (because `/api/dashboard/stats` returns `{}` for Teachers) and shows the Welcome Banner, empty Notice Board (`"You're all caught up!"`), Teacher Shortcuts, and Post Announcement form.
     - **Attendance (`/attendance`)** `"Assigned Classes"` dropdown contains no sections.
     - **Time Table (`/timetable`)** displays all periods as `"Free"` (or `"No time table found."` if no periods exist).
     - **Academics (`/academics`)** displays `"No classes found."`

---

## C. Dashboard: Detailed Breakdown (`GeneralDashboard.jsx`)

Data is fetched from `GET /api/notices`, `GET /api/dashboard/stats` (returns `{}` for `TEACHER`), and `GET /api/academic-calendar/today`.

### 1. Browser Push Notification Banner (`PushNotification`)
- **Displays:** Opt-in browser notification prompt or blocked-permission alert.
- **Interactivity:** Dismissible or clickable (`"Enable Notifications"` — *see [Common UI Guide](../shared/common-ui-guide.md) regarding the `/notifications/subscribe` vs `/api/push/subscribe` bug*).

### 2. Welcome Banner
- **Displays:** Gradient blue-to-indigo card containing `"TEACHER Portal"` pill, greeting (`"Good Morning/Afternoon/Evening, {user.name}!"`), `"Here is what's happening at {schoolName} today."`, **Academic Calendar Status Badge** (`Working Day`, `HOLIDAY • ...`, or `VACATION • ...`), and today's full date (`en-GB`).
- **Source:** `user` store + `GET /api/academic-calendar/today`. Non-interactive.

### 3. Notice Board (Left 2/3 Column)
- **Displays:** School announcements targeted to `TEACHER` or `EVERYONE` (empty `targetRoles`), ordered newest first (`GET /api/notices`).
- **Per-Notice Card Elements:**
  - Title, Audience badges (`EVERYONE`, `TEACHER ONLY`, or role pills), `"Edited"` tag (if edited > 1s after creation).
  - **Hover Actions (Only on notices authored by this Teacher):** `Edit` (pencil icon) and `Delete` (trash icon) appear on hover (`opacity-0 group-hover:opacity-100`).
  - Full content (`whitespace-pre-wrap`), Author name + role (`"{name} ({role})"`), and date/time stamp.
- **Empty State:** Checkmark icon + `"You're all caught up! No announcements published yet."`

### 4. Teacher Shortcuts (Right Column, Top)
- **Displays:** Two quick-action cards:
  1. **Mark Attendance** → navigates to `/attendance`.
  2. **Post Assignment** → navigates to `/assignments`.
- **What the User Should Understand:** One-click entry points for daily classroom tasks.

### 5. Post / Edit Announcement Form (Right Column, Bottom)
- **Displays:** Always-expanded card titled **"Post an Announcement"** (switches to **"Edit Announcement"** when editing an existing notice).
- **Fields & Controls:**
  - `Subject title` (required text input).
  - `Write announcement details...` (required 3-row textarea).
  - `Target Audience` toggle pills: `Teachers`, `Students`, `Accounts` (leave all unchecked for `Everyone`; selecting all 3 also normalizes to `Everyone` `[]`).
  - **Publish Notice** (or **Update Notice** + **X** cancel button when editing).
- **Feedback:** Submits `POST /api/notices` (or `PUT /api/notices/:id`), shows success toast, resets form, and refreshes Notice Board immediately. Triggers push/in-app notifications to targeted roles.

### Recommended First-Time Dashboard Walkthrough Sequence
1. Orient the viewer to the **Welcome Banner**, role badge (`TEACHER Portal`), and today's **Academic Calendar Status**.
2. Show the **Notice Board** on the left and demonstrate hovering over a self-authored notice to **Edit** or **Delete** it.
3. Demonstrate posting an announcement via **Post an Announcement** with audience targeting on the bottom-right.
4. Highlight **Teacher Shortcuts** (`Mark Attendance`, `Post Assignment`) as quick launchers into daily workflows.

---

## D. Navigation & Module Inventory

| Navigation Label | Route | Purpose | Subpages / Tabs | Access & Dependencies |
|---|---|---|---|---|
| **Dashboard** | `/` | Announcements, daily status, quick shortcuts | Single view (`GeneralDashboard`) | Calendar status + Notices |
| **Attendance** | `/attendance` | Mark, save, lock, unlock, and finalize daily attendance | Single view with Class/Date selector & student list | Uses `teacherAssignments` + `timetable` entries for selected day |
| **Time Table** | `/timetable` | View personal Monday–Saturday teaching schedule | Single read-only grid | Populated by School Admin |
| **Academics** | `/academics` | View assigned classes/sections and enrolled students | Class cards + expandable Section rosters | Filtered by `teacherAssignments` (`Class Teacher`) |
| **Assignments** | `/assignments` | Create assignments & review student submissions | Assignment cards + New Assignment Modal + expandable Submissions list | Class/Section data from `/api/classes` |
| *(Header / Sidebar)* | `/profile`, `/notifications`, `/user-guide` | Read-only profile, notifications, help docs, bug report modal | See [Common UI Guide](../shared/common-ui-guide.md) | Authenticated session |

---

## E. Detailed Module-by-Module User Stories

### Module 1: Daily Attendance (`/attendance`)

#### 1. Module Introduction
Supports the teacher's core daily workflow of taking roll call for their assigned classes or scheduled subject periods, saving drafts, locking attendance for review, and finalizing permanent records.

#### 2. Initial Screen & UI Elements
- **Header:** `"Daily Attendance"`, subtitle `"Mark and view student attendance"`.
- **Selector Card:**
  - **Assigned Classes** dropdown (`"Select Assigned Section..."`). Dynamically merges:
    1. Sections directly assigned to the teacher as Class Teacher (`"(Class Teacher)"`), AND
    2. Sections from the teacher's timetable matching the selected **Date's day of the week** (`"({Subject Name})"`).
  - **Date** picker (defaults to today; `max` = today's date — cannot mark future dates).
  - **Fetch List** button (disabled until a section is selected).
- **Student Attendance List (visible after fetching):**
  - Header bar showing `"Students ({count})"`, status badge (`LOCKED` amber or `FINAL SAVED` blue), and bulk action buttons **Mark All Present** / **Mark All Absent**.
  - Per-student rows showing initial avatar, student name, ERP ID, and segmented **Present** / **Absent** toggle buttons.
  - Footer action buttons based on current record state.

#### 3. Available User Actions
- **Fetch List (`GET /api/classes/sections/:sectionId/students` + `GET /api/attendance?sectionId=...&date=...`):** Loads students and any existing attendance records for that date. Unmarked students default to `PRESENT`.
- **Toggle Individual / Bulk Status:** Click **Present** or **Absent** per student, or **Mark All Present** / **Mark All Absent** (disabled once locked or final saved).
- **Save Temp (`Save Temp` → `POST /api/attendance`):** Saves draft attendance (`isLocked: false, isSaved: false`). Shows toast `"Attendance saved temporarily! Remember to lock it."`
- **Lock Attendance (`Lock Attendance` → `POST /api/attendance` then `PUT /api/attendance/lock`):** Saves records and locks them (`isLocked: true`), preventing accidental edits. Shows toast `"Attendance Locked!"` *(Note: A daily midnight cron job automatically marks locked records older than 48 hours as permanently saved.)*
- **Unlock (`Unlock` → `PUT /api/attendance/unlock`):** Available when `isLocked && !isSaved` to make corrections before final save.
- **Final Save (`Final Save` → `PUT /api/attendance/save`):** Available when `isLocked && !isSaved` to permanently commit (`isSaved: true`). Once finalized, buttons are replaced by disabled **Permanently Saved**.

#### 4. Step-by-Step User Flow
1. Click **Attendance** in the sidebar (or **Mark Attendance** on the Dashboard).
2. Confirm or change the **Date** (cannot be in the future).
3. Open **Assigned Classes** and choose the target section.
4. Click **Fetch List** to load the student roster.
5. Mark **Absent** for absent students (or click **Mark All Present** / **Mark All Absent**).
6. Click **Save Temp** if you need to pause, or **Lock Attendance** when done.
7. Review the locked list; click **Unlock** if a correction is needed, or click **Final Save** to finalize permanently.

#### 5. Important Edge Cases
- **Changing Date Changes Timetable Options:** Because timetable-derived options in the dropdown depend on the day of the week of the chosen `date`, selecting a Sunday or a day with no scheduled classes leaves only `(Class Teacher)` sections in the dropdown.
- **Unsaved/Unlocked Exit Warning:** Leaving or refreshing the page with unsaved changes while unlocked triggers a browser `beforeunload` warning.
- **Empty Section:** If no students are enrolled in the section, the student list card does not render (`students.length > 0` check), and no error is shown.
- **Attempting to Edit Finalized Records:** Backend returns HTTP `400` (`"Cannot modify attendance as it is locked or saved."`).
- **Missing `LEAVE` Option in UI:** Although backend schema permits `LEAVE`, the Teacher UI only offers `PRESENT` and `ABSENT`.

#### 6. Related Modules
- **Time Table (`/timetable`):** Supplies day-specific subject classes to the dropdown.
- **Academics (`/academics`):** Supplies Class Teacher (`teacherAssignments`) sections.
- **Admin Dashboard & Reports:** Attendance rates immediately update Admin's KPIs and Attendance Insights.

---

### Module 2: Time Table (`/timetable`)

#### 1. Module Introduction
Lets the teacher view their personal weekly teaching schedule across Monday through Saturday.

#### 2. Initial Screen & UI Elements
- **Header:** `"Time Table"`, subtitle `"Manage and view class schedules"`. *(Note: Teachers do not see `+ Subject`, `+ Period`, or the Class/Teacher View toggle.)*
- **Schedule Grid (`MONDAY`–`SATURDAY` × `Periods`):**
  - Left column shows Period Name and `startTime - endTime`.
  - Filled cells show blue-gradient cards with **Subject Name** and **Class - Section** (teacher's own name is hidden for `TEACHER` role).
  - Unscheduled cells show dashed `"Free"` placeholders.
- **Empty State:** `"No time table found."` if no periods are defined.

#### 3. Available User Actions
- **Read-Only Inspection:** Clicking cells or periods performs no edit action (`canEdit` is false). Data is strictly scoped on the backend (`timeTableController.js` forces `where.teacherId = profile.id` for `TEACHER`).

#### 4. Step-by-Step User Flow
1. Click **Time Table** in the sidebar.
2. Review your period timings down the left column and scheduled subjects/classes across `Mon`–`Sat`.

#### 5. Important Edge Cases
- **No TeacherProfile:** Backend returns `[]`, showing `"Free"` for all periods.
- **Scrollable on Small Screens:** Table has `min-w-[800px]` with horizontal scroll and a sticky left Period column.

#### 6. Related Modules
- **Attendance (`/attendance`):** Uses these timetable entries to populate subject sections for the selected date.

---

### Module 3: Academics (`/academics`)

#### 1. Module Introduction
Provides a read-only directory of the classes and sections directly assigned to the teacher (`teacherAssignments`), along with student rosters for each section.

#### 2. Initial Screen & UI Elements
- **Header:** `"Academics"`, subtitle `"Manage classes, sections, and subjects"` (no `+ Add Class` button for Teachers).
- **Filtered Class Cards:** Displays only classes containing at least one section where `sec.teacherAssignments` includes the logged-in teacher (`ta.teacher?.user?.id === user.id`).
- **Section Rows:** Show section letter badge, `"Section {name}"`, and enrolled student count. Clicking a row expands the student roster (`name` + `erpId`).

#### 3. Available User Actions
- **Expand / Collapse Section Roster:** Click any assigned section row to fetch `GET /api/classes/sections/:sectionId/students` and view enrolled students.
- **Strictly Read-Only:** No Add/Edit/Delete buttons appear for Classes or Sections, and backend `class.routes.js` enforces `ADMIN` role for all mutations.

#### 4. Step-by-Step User Flow
1. Click **Academics** in the sidebar.
2. Locate one of your assigned Class cards.
3. Click a **Section** row to expand the list of enrolled students and verify their ERP IDs.

#### 5. Important Edge Cases
- **Timetable-Only Sections Excluded:** Unlike `/attendance`, `/academics` filters strictly by `teacherAssignments` (direct Class Teacher assignments), not `TimeTableEntry`. If a teacher only has timetable slots and no `teacherAssignments`, `/academics` appears empty even though `/attendance` lists their timetable sections!
- **No Classes in School:** Shows `"No classes found."` (Note: if `classes` is non-empty in the school, but none are assigned to this teacher, the grid renders empty without the `"No classes found."` message because that check uses `classes.length === 0` before filtering.)

#### 6. Related Modules
- **Attendance (`/attendance`):** Uses the same `teacherAssignments` to flag `(Class Teacher)` sections.

---

### Module 4: Assignments (`/assignments`)

#### 1. Module Introduction
Enables teachers to publish homework or classwork assignments to a class/section with due dates and optional attachments, and to inspect files/links submitted by students.

#### 2. Initial Screen & UI Elements
- **Header:** `"Assignments"`, subtitle `"Manage classwork and homework"`, and **"+ New Assignment"** button.
- **Assignment Cards Grid (`GET /api/assignments`):**
  - Displays assignment title, description (2-line clamp), `"Due: {date}"` pill, `"By {teacher?.name} • Class {class?.name} ({section.name})"` footer *(note: backend returns `section.class`, not `teacher` or top-level `class`, so teacher/class labels in this line may render blank except for `section.name`)*, optional **View Resource** link, and **Submissions ({count})** section with **View Submissions** / **Hide Submissions** toggle (visible when count > 0, else `"No submissions yet."`).
- **Empty State:** `"No assignments found."`

#### 3. Available User Actions
- **Create Assignment (`+ New Assignment` modal → `POST /api/assignments`):**
  - **Fields:** `Title` (required), `Instructions` (`description`, required), `Due Date` (`date`, required), `Class` (required), `Section` (required, enabled once Class is selected), `File` (optional attachment; `cloudinary.js` allows `jpg`, `png`, `jpeg`, `pdf`, `doc`, `docx`).
  - **Result:** Uploads file (if attached), creates assignment, notifies all students in the selected `sectionId`, closes modal, and refreshes list. *(Note: On error, `Assignments.jsx` uses native `alert('Failed to post assignment')` instead of a toast.)*
  - **Important UI vs. Assignment Scope Detail:** In `Assignments.jsx`, the `Class` and `Section` dropdowns show **all** classes and sections returned by `/api/classes` (not filtered to the teacher's assigned sections), and `GET /api/assignments` returns all assignments in the school (not filtered by `createdBy`).
- **View Submissions (`View Submissions` → `GET /api/assignments/:assignmentId/submissions`):**
  - Lazy-loads and caches submissions in `submissionsMap`, displaying a scrollable list of students (`name`, `erpId`) with a **View** button opening `sub.fileUrl` in a new tab.
- **No Edit / Delete Assignment:** Neither `Assignments.jsx` nor `assignment.routes.js` exposes assignment editing or deletion.

#### 4. Step-by-Step User Flow
1. Click **Assignments** in the sidebar (or **Post Assignment** on the Dashboard).
2. Click **New Assignment**.
3. Enter **Title**, **Instructions**, and **Due Date**.
4. Select **Class** and **Section**, optionally attach a resource file, and click **Post Assignment**.
5. To review student work, locate the assignment card, click **View Submissions**, and click **View** next to a student's name to open their submitted file or URL.

#### 5. Important Edge Cases
- **Cannot Edit or Delete Posted Assignments:** Verify title, section, due date, and attachment before clicking **Post Assignment**.
- **Unsupported File Formats:** Non-image/document formats outside `jpg, png, jpeg, pdf, doc, docx` are rejected by Cloudinary storage middleware.
- **Error Feedback Inconsistency:** Creation failure shows a browser `alert()` rather than a `sonner` toast; submission loading failure shows a toast.

#### 6. Related Modules
- **Notifications:** Creating an assignment automatically triggers push and in-app notifications (`entityType: 'assignment'`) to students in the targeted section.
- **Global Search:** Teachers can search assignments they created (`createdBy: user.id`) from the Navbar search bar.

---

## F. Complete Role-Based User Journeys

### Journey 1: Morning Classroom Routine
- **Objective:** Review announcements, check today's teaching periods, and mark attendance.
- **Starting Point:** Dashboard (`/`).
- **Sequence:** Dashboard (`/`) → Time Table (`/timetable`) → Attendance (`/attendance`).
- **Actions & Results:** Check calendar status & new notices → Verify today's scheduled classes → Open Attendance, choose today's section, mark absentees, click **Lock Attendance** (and **Final Save** once verified).

### Journey 2: Assigning & Reviewing Homework
- **Objective:** Distribute homework to a section and review student uploads.
- **Starting Point:** Dashboard (`/`) → **Post Assignment** shortcut (or Sidebar → **Assignments**).
- **Sequence:** Dashboard (`/`) → Assignments (`/assignments`) → Dashboard (`/`).
- **Actions & Results:** Post new assignment with attachment and due date → Optionally post a companion notice on Dashboard targeting `Students` → Return later to **Assignments**, click **View Submissions**, and open each student's **View** link.

### Journey 3: Inspecting Assigned Class Roster & Posting a Targeted Announcement
- **Objective:** Verify enrolled students in a homeroom section and send a reminder notice to fellow teachers or students.
- **Starting Point:** Academics (`/academics`) → Dashboard (`/`).
- **Sequence:** `/academics` → `/`.
- **Actions & Results:** Expand assigned section to check student list → Go to Dashboard → Fill **Post an Announcement**, toggle `Students` (or `Teachers`), and publish.

---

## G. Permissions & Role Boundaries

| Capability / Resource | UI Access | Backend Enforcement (`roleMiddleware` & Scoping) |
|---|---|---|
| **Dashboard Stats** | Sees Welcome Banner, Notice Board, Shortcuts, Post Notice | `/api/dashboard/stats` returns `{}` for `TEACHER`. |
| **Notices** | View `TEACHER` & `EVERYONE` notices; Create, Edit & Delete **own** notices only | `noticeController.js` allows `ADMIN`/`TEACHER` to POST/PUT/DELETE, blocking edits/deletes where `notice.createdBy !== userId` (`403`). |
| **Daily Attendance** | Mark, Save Temp, Lock, Unlock, Finalize for school sections | `attendance.routes.js` allows `ADMIN` & `TEACHER` (school-scoped via section). |
| **Time Table** | Read-only personal weekly schedule | `timeTableController.js` scopes `GET /api/timetable` to teacher's `teacherProfile.id`; mutations require `ADMIN`. |
| **Academics** | Read-only view of assigned classes/sections + section students | Mutations require `ADMIN` (`class.routes.js`). |
| **Assignments** | View assignments, create assignments, view submissions | `assignment.routes.js` allows `TEACHER` & `ADMIN` to POST and view submissions; `submit` is `STUDENT` only. |
| **Fees & Reports** | Not in sidebar; `/reports` shows `"Access Denied"` | Fee write/verification/PDF endpoints and `/reports/*` return `403` (`fee.routes.js`, `reports.routes.js`). *(Note: `GET /api/fees/summary` & `/history` lack `roleMiddleware`, though Teachers have no sidebar link to `/fees`.)* |
| **Admin Modules (`/admin/*`)** | Blocked by `<ProtectedRoute allowedRoles={['ADMIN']} />` (`Access Denied`) | Blocked by `roleMiddleware(['ADMIN'])` (`user.routes.js`, `import.routes.js`, `school.routes.js`, `academicCalendar.routes.js`). |
| **Profile (`/profile`)** | Strictly read-only | No self-update endpoint for non-admins (`user.routes.js` requires `ADMIN`/`SUPER_ADMIN`). |

---

## H. Suggested Help Video Recording Sequence

| Segment | Screen | User Action | Narration Objective | Expected Result | Prerequisites |
|---|---|---|---|---|---|
| 1. Intro & Login | `/login` | Sign in with Teacher ERP ID & password | Introduce the Teacher role and login flow | Redirects to Teacher Portal dashboard (`/`) | Active Teacher account |
| 2. Dashboard Orientation | `/` | Review Welcome Banner, Calendar badge, Notice Board, Shortcuts | Explain how teachers stay updated on campus notices and calendar days | Viewer identifies notices and quick action buttons | At least 1 published notice |
| 3. Announcements | `/` | Fill **Post an Announcement**, toggle `Students`, publish, then hover to Edit/Delete | Show how teachers communicate with specific school roles | Notice appears with role pill and `"Edited"` tag after update | Logged-in Teacher |
| 4. Time Table | `/timetable` | Scroll through `Mon`–`Sat` grid | Show how to check daily periods, subjects, and assigned classes | Displays teacher's personal schedule and free slots | Timetable entries assigned by Admin |
| 5. Academics | `/academics` | Click an assigned Section row to expand students | Show how to view enrolled students in assigned classes | Student list with ERP IDs expands smoothly | Teacher assigned to ≥1 section with students |
| 6. Daily Attendance | `/attendance` | Pick Date & Assigned Class, **Fetch List**, toggle Present/Absent, **Save Temp**, **Lock**, **Final Save** | Walk through the complete 3-state attendance lifecycle and 48h auto-save rule | Status transitions Draft → `LOCKED` → `FINAL SAVED` | Teacher has assigned/scheduled section with students |
| 7. Assignments | `/assignments` | Click **New Assignment**, attach file, submit; expand **View Submissions** on an existing card | Demonstrate posting homework and reviewing student uploads | New assignment card appears; submission links open | At least 1 class/section & 1 student submission |
| 8. Global Controls & Profile | Navbar, Sidebar, `/profile` | Demo Search bar, Notification Bell, Bug Report modal, read-only Profile, Sign Out | Wrap up with notifications, issue reporting, and read-only profile note | Search results, notification drawer, and profile details render | Sample notifications |
