# SchoolChakra Shared Application Elements & Common UI Guide

> **Scope:** Cross-role UI shell, authentication entry, global header/sidebar controls, notifications, profile page, bug reporting, and global feedback mechanisms.  
> **Source References:** `frontend/src/App.jsx`, `frontend/src/components/layout/Layout.jsx`, `frontend/src/components/layout/Navbar.jsx`, `frontend/src/components/layout/Sidebar.jsx`, `frontend/src/pages/Login.jsx`, `frontend/src/pages/Profile.jsx`, `frontend/src/pages/Notifications.jsx`, `frontend/src/pages/UserGuide.jsx`, `frontend/src/pages/NotFound.jsx`, `frontend/src/components/PushNotification.jsx`, `frontend/src/components/modals/ReportBugModal.jsx`, `frontend/src/components/ui/ConfirmDialog.jsx`, `frontend/src/components/ui/ErrorBoundary.jsx`, `frontend/src/lib/api.js`, `frontend/src/store/authStore.js`.

This guide documents all shared UI elements that appear across multiple non-Super Admin roles (**School Admin**, **Teacher**, **Student**, and **Accounts**). Role-specific guides reference this document to avoid repeating global UI instructions during video recording.

---

## 1. Login Screen (`/login`) & Session Entry

### Visible UI Elements
- **Brand Header:** Displays `/App_logo_light.png`, `"Welcome to"` heading with `/Logo_primary-removebg.png` logo, and subtitle `"Please sign in to your account"`.
- **Active Development Notice Banner (Dismissible):** Blue info box (`showGratitude`, open by default) thanking users and advising them to report bugs using `"Report an Issue"` in the navigation sidebar. Has an `X` close button.
- **Sign-In Card:**
  - **ERP ID** (`input[type="text"]`, required, placeholder `e.g. STU001`).
  - **Password** (`input[type="password"]`, required, placeholder `••••••••`).
  - **Sign in** button (shows spinner while authenticating).
  - **View User Guide** button (navigates to `/user-guide` without logging in).
- **Note on School Code/Selector:** Although `authStore.js` accepts an optional `schoolId` parameter in `login(erpId, password, schoolId)`, `Login.jsx` does not render a School ID/Code input field. The backend (`backend/src/controllers/authController.js`) looks up the user by `erpId` directly (`prisma.user.findFirst({ where: { erpId } })`).

### Validation, Errors & Rate Limiting
- **Backend Rate Limit (`backend/src/routes/auth.routes.js`):** Maximum **10 login attempts per 15 minutes per IP**. Exceeding this returns HTTP `429` with `"Too many login attempts. Please try again after 15 minutes."`
- **Zod Validation (`backend/src/validators/authSchemas.js`):** Both `erpId` and `password` must be non-empty strings.
- **Blocked Login States (`authController.js`):**
  - Wrong ERP ID or password → `"Invalid credentials"`
  - Archived user → `"Account is archived. Please contact administration."`
  - Disabled user → `"Account is disabled. Please contact administration."`
  - Archived school → `"School account is archived. Please contact administration."`
  - Inactive school → `"School account is inactive. Please contact administration."`
  - Expired school (`school.validUntil < now`) → **Teacher, Student, and Accounts** are blocked at login with `"School subscription has expired. Please contact administration."` (**School Admin** is permitted to log in at `/login`, though API calls using `schoolValidityMiddleware` return `403` with toast `"School subscription has expired. Please contact administration."`).

### Post-Login Redirect & Dynamic Theming
- On success, `token` and `refreshToken` are stored in `localStorage`.
- `authStore.applyTheme(user)` reads `user.schoolSettings.themeColor` (default `#3b82f6`) and sets the CSS variable `--app-theme-color` on `document.documentElement`. In `frontend/src/index.css`, Tailwind's `--color-blue-50` through `--color-blue-950` palette dynamically mixes `--app-theme-color`, instantly theming blue accents across the entire app per school.
- Redirects to:
  1. The originally requested route (`location.state.from`), or
  2. `?redirect=` query param / `sessionStorage.getItem('redirectAfterLogin')`, or
  3. `/` (which `DashboardRouter` resolves to the role's dashboard).

---

## 2. Application Shell (`Layout.jsx`)

Every authenticated route (except `/login` and `/user-guide`) renders inside `Layout.jsx`:
- **Left Sidebar (`Sidebar.jsx`):** Fixed slide-over drawer on mobile (`< md`), persistent `w-64` column on desktop (`md:relative`). Hidden automatically when printing (`print:hidden`).
- **Top Header (`Navbar.jsx`):** Sticky `h-16` bar (`sticky top-0`). Hidden when printing (`print:hidden`).
- **Main Content Area:** Scrollable container (`max-w-7xl mx-auto p-4 md:p-6`) wrapped in `<ErrorBoundary key={location.pathname}>`.

---

## 3. Left Sidebar & School Branding (`Sidebar.jsx`)

### School Identity Header
- Displays the school's uploaded logo (`user.schoolSettings.logoUrl`) if configured; otherwise renders a blue/indigo rounded square containing the first letter of `user.schoolName` (fallback `'E'`).
- Displays `user.schoolName` (truncated at `140px`, full name in `title` tooltip).
- On mobile, includes an `X` button to close the sidebar drawer.

### Role-Specific Navigation Menu
- Displays only the links defined in `roleNavItems[user.role]` (detailed in each role's guide).
- Active state highlights the item with a left blue indicator bar (`bg-blue-600`) and blue tinted background (`bg-blue-50/80`).

### Bottom Utility Cards (Visible to All Roles)
1. **"Found a bug?" Card:**
   - Displays `"Found a bug?"`, `"Help us improve the app by reporting any issues."`, and a **"Report an Issue"** button.
   - Clicking **"Report an Issue"** opens `ReportBugModal`.
2. **User Guide Button (`/user-guide`):**
   - Navigates to the standalone documentation viewer (`UserGuide.jsx`) containing `Introduction`, `Super Admin Guide`, `Admin Guide`, `Teacher Guide`, `Student Guide`, and `Accounts Guide` loaded from `/docs/*.md`, complete with a light/dark mode toggle (`localStorage.userGuideTheme`) and an `"On this page"` table of contents on `xl` screens.

---

## 4. Bug Reporting Modal (`ReportBugModal.jsx`)

Accessible from the Sidebar's **"Report an Issue"** button for all authenticated users.

### Fields & Controls
- **Issue Title** (`required`, text input, placeholder `"e.g., Cannot view student profile"`).
- **Description** (`required`, textarea, 4 rows, placeholder `"Please provide steps to reproduce the issue..."`).
- **Screenshots (Optional, max 3):** Drag-and-drop or file picker (`accept="image/*"`). Backend `cloudinary.js` permits `jpg`, `png`, `jpeg`, `pdf`, `doc`, `docx`. Selecting more than 3 images triggers toast `"You can only upload up to 3 screenshots."` Selected filenames appear as removable chips (`X` button).
- **Cancel** / **Submit Report** buttons.

### Behavior
- Submits `multipart/form-data` to `POST /api/bugs`.
- Backend (`bugController.js` + `bug.routes.js`) creates a `BugReport` with `status: 'OPEN'` linked to `reportedById` and uploads screenshots to Cloudinary.
- Success toast: `"Bug report submitted successfully! Thank you."` and modal closes.
- Error toast: `"Failed to submit bug report. Please try again later."`

---

## 5. Top Header (`Navbar.jsx`)

### A. Mobile Menu Toggle
- Hamburger icon (`Menu`) visible on mobile (`md:hidden`) to open the Sidebar.

### B. Global Search Bar
- Input placeholder: `"Search by names, ERP Id or notices..."`
- **Minimum Query Length:** Waits until **3 or more characters** are typed, then debounces for **300ms** before calling `GET /api/search?q=...` (cancelling in-flight requests via `AbortController`).
- **Keyboard Navigation:** Supports `ArrowDown`, `ArrowUp`, `Enter` (to open highlighted result), and `Escape` (to close dropdown).
- **Role-Scoped Search Results (`backend/src/services/searchService.js`):**
  - **School Admin (`ADMIN`):** Searches school-scoped `students`, `teachers`, `admins`, `accounts`, `invoices`, `payments`, and `notices` (up to 10 per category, prioritized by Exact ERP ID > Exact Name/Title > Starts With > Contains).
  - **Teacher (`TEACHER`):** Searches school-scoped `students`, `teachers`, `notices` (specifically notices with `targetRoles` containing `'TEACHER'`; note: `searchService.js` does not match notices with empty `targetRoles` / `"EVERYONE"`), and `assignments` created by that teacher (`createdBy: user.id`).
  - **Student (`STUDENT`):** Searches `notices` (`targetRoles` containing `'STUDENT'`; same caveat regarding empty `targetRoles`) and `assignments` belonging to the student's `sectionId`.
  - **Accounts (`ACCOUNTS`):** Searches school-scoped `students`, `invoices`, and `payments`.
- **Click Navigation (`Navbar.jsx` `routeMapper`):**
  - `notice` → `/`
  - `assignment` → `/assignments`
  - `invoice` / `payment` → `/fees`
  - `student` / `teacher` / `admin` / `accounts` → For **ADMIN**, navigates to `/admin/users/:id`. **For non-ADMIN roles (Teacher, Accounts), `routeMapper` returns `'#'`**, so clicking a student or teacher search result keeps the user on their current URL (no profile detail page exists for non-admins).

### C. Notification Bell & Popover
- Bell icon with red unread count badge (`99+` if over 99), loaded on mount via `GET /api/notifications?limit=5`.
- **Opening the Popover:** Automatically sends `PUT /api/notifications/read` with the IDs of any unread items among the 5 fetched notifications, updating the badge count immediately.
- **Browser Push Permission Notice inside Popover:**
  - If `Notification.permission === 'default'`, displays `"Enable browser notifications to receive notices and reminders instantly."` with an **"Enable Notifications"** button (calls `Notification.requestPermission()` directly).
  - If `Notification.permission === 'denied'`, displays amber bar `"Browser notifications disabled."`
- **Notification Items:** Up to 5 recent items showing title, unread blue dot, body preview (2-line clamp), and relative timestamp (`Just now`, `Xm ago`, etc.). Clicking an item navigates via `resolveNotificationRoute`:
  - `notice` → `/`
  - `assignment` → `/assignments`
  - `invoice` / `payment` → `/fees`
  - Unknown/null → `/notifications`
- **Footer Link:** `"View All Notifications →"` links to `/notifications`.

### D. Profile Menu & Sign Out
- Trigger button displays user avatar (`profilePicUrl` or `User` icon), `user.name`, and uppercase `user.role` (hidden on `< sm` mobile screens), plus a chevron.
- **Dropdown Options:**
  - **My Profile** → `/profile`
  - **School Settings** → `/admin/settings` (**Visible only to `ADMIN`**)
  - **Notification History** → `/notifications`
  - **Log out** → Opens `ConfirmDialog` (`"Sign Out"`, `"Are you sure you want to sign out of your account?"`). Confirming clears tokens and redirects to `/login`.

---

## 6. Browser Push Notification Dashboard Banner (`PushNotification.jsx`)

Displayed at the top of the Dashboard (`AdminDashboard`, `GeneralDashboard`, `AccountsDashboard`) when the browser supports Service Workers, PushManager, and Notifications:
- **Permission `'default'` (and not subscribed):** Shows `"Browser Notifications — Get notices, assignments, attendance updates and fee reminders instantly."` with **"Enable Notifications"** and dismiss (`X`) button. Dismissing hides it for 7 days on 1st dismiss, 30 days on 2nd dismiss, and permanently after 3rd dismiss (`localStorage.notificationBannerDismissState`).
- **Permission `'denied'`:** Shows red alert `"Notifications are blocked in your browser. Enable notifications from your browser settings to receive school updates."` with **"How to Enable"** (links to Google Chrome support) and dismiss (`X`) button.
- **Implementation Caveat (Verified Bug):** Clicking **"Enable Notifications"** on this dashboard banner invokes `subscribeToPush()` (`frontend/src/lib/pushNotification.js`), which calls `POST /api/notifications/subscribe`. However, the backend mounts push subscription routes at `POST /api/push/subscribe` (`backend/src/routes/index.routes.js`), causing the backend subscription save call to return `404` and display toast `"Failed to enable notifications. Please try again."`

---

## 7. Notification Center (`/notifications`)

Accessible from the Navbar notification popover footer (`"View All Notifications →"`) or the Profile menu (`"Notification History"`).
- **Header:** Back button (`navigate(-1)`), `"Notification Center"` title, subtitle `"Your recent alerts, notices, and reminders."`, and **"Mark all as read"** button (visible only when at least one loaded notification is unread; calls `PUT /api/notifications/read` with no body).
- **Grouped Timeline (`InfiniteScroll`, 20 per page):** Groups notifications into **Today**, **Yesterday**, **This Week** (last 7 days), and **Older**.
- **Notification Card:** Shows icon (blue if unread, gray if read), title, time (`HH:MM`), body, and `"NEW"` badge if unread. Clicking marks the notification read and routes via `resolveNotificationRoute`.
- **Empty State:** `"It's quiet here — You don't have any notifications yet."`

---

## 8. My Profile (`/profile`)

Accessible via Profile dropdown → **My Profile**.

### Read-Only Fields (All Roles)
- Header banner, circular avatar (clickable to open full-screen lightbox modal if `profilePicUrl` exists), user name, and role subtitle.
- **Account Details:** `ERP ID`, `School & Code`, `Role`.
- **Role-Specific Read-Only Profile Cards:**
  - **Teacher:** `Designation` (defaults to `'Teacher'`) and `Assigned Sections` badges (`Class-Section`, or `'None'`).
  - **Student:** `Class & Section` (`Class - Section`, or `'Not assigned'`).
  - **Accounts / Admin:** Account & Contact cards only.

### Role-Specific Behavior on `/profile`
- **Teacher, Student, and Accounts:**
  - Displays an amber banner: `"Please contact your school administrator to update your profile details."`
  - No edit pencil buttons, no camera upload button, no Update Profile button, and no Danger Zone. Strictly read-only.
- **School Admin (`ADMIN`):**
  - Shows a `PRIMARY ADMIN` gold badge if `user.isPrimary` is true.
  - Displays inline edit icons on **Name**, **Phone / Contact**, and **Password** (`••••••••`), plus a **"Update Profile"** button and a camera upload icon on the avatar.
  - **Implementation Mismatches for Admin Self-Service on `/profile`:**
    1. **Profile Picture Upload:** `Profile.jsx` uploads with FormData field `'profileImage'`, whereas `backend/src/routes/user.routes.js` expects `'profilePic'` (`upload.single('profilePic')`).
    2. **Delete Account (Non-Primary Admin):** `Profile.jsx` renders a **"Danger Zone"** with **"Delete Account"** for non-primary Admins that calls `DELETE /api/users/${user.id}`, but `user.routes.js` has no `DELETE` route (user deletion is replaced by archive/disable).

---

## 9. Global Feedback, Error Handling & Session Expiry

- **Toast Notifications (`sonner`):** Top-center pill toasts color-coded for success (emerald), error (red), warning (amber), and info (blue).
- **Confirmation Dialogs (`ConfirmDialog.jsx`):** Portal modal with backdrop blur used for Sign Out, Notice deletion, Section deletion, Timetable entry deletion, Calendar Override deletion, Fee Invoice/Payment deletion, and UPI Payment Approve/Reject.
- **Error Boundary (`ErrorBoundary.jsx`):** Catches component crashes inside `<Layout>` and displays `"Something went wrong"` with a **"Reload Page"** button.
- **404 Page (`NotFound.jsx`):** Unmatched URLs show `"404 — Page Not Found"` with a **"Back to Dashboard"** button linking to `/`.
- **Automatic Token Refresh & Forced Logout (`frontend/src/lib/api.js`):**
  - On `401 TOKEN_EXPIRED`, Axios queues concurrent requests and refreshes tokens via `POST /api/auth/refresh`.
  - If a user is disabled (`ACCOUNT_DISABLED`), archived (`ACCOUNT_ARCHIVED`), or a non-admin school's subscription expires (`SCHOOL_EXPIRED`), the browser shows a blocking `alert(...)` dialog and immediately redirects to `/login?redirect=...`.
