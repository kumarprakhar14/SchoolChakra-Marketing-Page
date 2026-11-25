# SchoolChakra Landing Page — Content & Text Map

> **Purpose:** This document captures **every piece of text, copy, label, and data** visible on the SchoolChakra landing page, organized section-by-section in scroll order. A reviewer who has never seen the page can read this file alone and know exactly what message each section communicates. For the companion **visual/design breakdown**, see [DESIGN_MASTER.md](file:///c:/Users/hp/Desktop/KP%20Programming/Web%20Projects/SchoolChakra%20Landing%20Page/DESIGN_MASTER.md).

---

## Table of Contents

1. [Navbar](#1-navbar)
2. [Hero Section](#2-hero-section)
3. [Interactive Demo Canvas (Hero Embed)](#3-interactive-demo-canvas-hero-embed)
4. [Problem Section (Disconnected Tools Hub)](#4-problem-section-disconnected-tools-hub)
5. [Role Switcher (Separate Workspaces Section)](#5-role-switcher-separate-workspaces-section)
6. [Day-One Workflows — Bento Grid](#6-day-one-workflows--bento-grid)
7. [Architecture Section (Security & Data)](#7-architecture-section-security--data)
8. [Frequently Asked Questions (FAQ & Founder Proof)](#8-frequently-asked-questions-faq--founder-proof)
9. [Founding Pilot Section](#9-founding-pilot-section)
10. [Pilot Application Modal](#10-pilot-application-modal)
11. [Footer](#11-footer)
12. [SEO & Meta Tags](#12-seo--meta-tags)

---

## 1. Navbar

| Element | Text | Destination / Action |
|---|---|---|
| **Brand name** | `SchoolChakra` | Link to `#top` |
| **Nav link 1** | `For Every Role` | `#roles` |
| **Nav link 2** | `Day-One Workflows` | `#bento` |
| **Nav link 3** | `Security & Data` | `#architecture` |
| **Nav link 4** | `Pilot Cohort` | `#pilot` |
| **Quiet link** | `Open App` | Opens `https://erp.kumarprakhar.online` in a new tab |
| **Primary CTA** | `Apply for Pilot` | Opens Pilot Application Modal |

> [!NOTE]
> The navbar contains an **inline SVG chakra logo** rendered with the active brand theme color.

---

## 2. Hero Section

### 2a. Announcement Pill (top-of-hero)

```
● Founding School Pilot Open — Rolling Intake  |  Read terms ›
```

- The dot (●) **pulses** with the active brand accent color.
- "Read terms" links to `#pilot`.

### 2b. Headline

```
Every role. Every classroom.
[Rotating Word] under one roof.
```

The word **"classroom."** is styled in italic serif (`Instrument Serif`).

The **rotating word** cycles through four concrete school modules every 2.8 seconds:

| Order | Module Word | Accent Color Token | Hex Code |
|---|---|---|---|
| 1 | **Fees** | Royal Violet | `#7C3AED` |
| 2 | **Attendance** | Cobalt Blue | `#2563EB` |
| 3 | **Timetables** | Emerald Green | `#059669` |
| 4 | **Notices** | Heritage Crimson | `#E11D48` |

### 2c. Sub-headline

```
SchoolChakra runs fees, attendance, timetables, and notices for Indian schools.
Principals, teachers, accounts staff, and students each get their own workspace,
colored in your school's brand.
```

### 2d. Primary CTA

```
Apply for the Founding Pilot  →
```

- Opens the Pilot Application Modal.

### 2e. Trust Badges (below Primary CTA)

```
✓ Set up by our team    ✓ Export your data anytime    ✓ Founder on WhatsApp
```

---

## 3. Interactive Demo Canvas (Hero Embed)

A fully interactive micro-app embedded directly beneath the Hero headline:

### Controls Bar
- **School selector dropdown:**
  - `Delhi Public Academy` (CBSE · New Delhi) — ERP Code: `SCH-DPA-01`
  - `St. Xavier's High School` (ICSE · Mumbai) — ERP Code: `SCH-SXH-04`
  - `Lotus Valley International` (IB & CBSE · Bengaluru) — ERP Code: `SCH-LVI-09`
- **Theme color selector pills:** Cobalt Blue, Emerald Green, Royal Violet, Heritage Crimson.

### Sidebar Tabs
- `Dashboard` (active by default)
- `Users`
- `Import`
- `Fees`

### Live Metric Cards (Sample: Delhi Public Academy "Today")
- Students: `2,480`
- Attendance: `96.4%` (Present today)
- Fee Collection Rate: `94.2%`
- Collected: `₹42.8L` (via UPI & cash)
- Notices: `12`
- Low Attendance (<75%): `14`

### Bottom Status Bar
- `TENANT: DPA` • `ACTIVE`
- Notification chip: `Auto-Finalized` — `Class 10-A Attendance record finalized after 48h` (dismissible)

---

## 4. Problem Section (Disconnected Tools Hub)

### Section Header

**Headline:**
```
Today your school runs on five different tools.
```

**Context subhead:**
```
Attendance in a paper register, fees in Excel, the timetable on a wall,
notices in a WhatsApp group, and user lists that never match.
```

### Animated SVG Infographic (`SchoolChakraHub`)

Visualizes the 5 scattered tools converging into one synced SchoolChakra dashboard:

1. **Incoming Disconnected Tools:**
   - `Paper registers` (attendance check/cross register)
   - `Excel fee sheets` (spreadsheet with `#REF!` error and warning badge)
   - `Wall timetable` (pinned schedule grid)
   - `Chat-group notices` (chat bubbles with `99+` unread count)
   - `Separate user lists` (disconnected staff/student lists with missing entries)

2. **Central Unified Dashboard:**
   - ATTENDANCE: `97.8%` — `Present today`
   - FEES COLLECTED: `₹56.0L` — `via UPI & cash`
   - TIMETABLE: 10-period grid — `0 clashes`
   - USERS: `960` — `4 roles · Workspaces`
   - NOTICES: `12 delivered` — `By class, role & section`
   - Scoped Role indicator toggles: `Principal` → `Teacher` → `Accounts` → `Student`
   - Bottom confirmation: `All modules in sync · one source of truth` ✓

### Post-Animation Resolution Line

```
One dashboard instead. Attendance, fees, timetable, users, and notices update together.
```

---

## 5. Role Switcher (Separate Workspaces Section)

> **Section ID:** `#roles`

### Section Header

**Badge:** `SEPARATE WORKSPACES FOR EVERY ROLE`

**Headline:**
```
One platform. 4 specialized workspaces.
```
("workspaces." in italic serif)

**Sub-headline:**
```
Pick a role to see the screen that person actually uses.
```

### Role Switcher Tabs (Prompt: "I'm a:")

| Tab Label | Icon | Role ID |
|---|---|---|
| School Admin | Building2 | `admin` |
| Teachers | BookOpen | `teacher` |
| Accounts & Fees | CreditCard | `accounts` |
| Students | GraduationCap | `student` |

---

### Role 01: School Admin

**Title:**
```
Attendance, fees, and defaulters in one view — no spreadsheet digging.
```

**Description:**
```
From first-run setup to daily attendance and financial snapshots, Principals
and School Admins get actionable alerts without digging through spreadsheets.
```

**Feature Bullets:**
1. **Actionable Insights:** Top 10 best-attending students, low-attendance alert list (<75%), and fee defaulters with overdue days.
2. **Lifecycle User Management:** Create Teacher, Student, and Accounts profiles with photo uploads; suspend or soft-archive without data loss.
3. **Academic Calendar & Overrides:** Mon–Sat default working days with holiday overlap detection and instant month filtering.

**Interactive Preview:**
- Header: `Admin Reports & Defaulters Watchlist` (Class X • Section A)
- Alert: `Low Attendance Alert (<75%): 3 students in Class 10-A fell below board threshold this month.` [Auto-Flagged]
- **Defaulters Table:**
  - Aarav Mehta (`STU-10A-04`): `₹18,500` · `19 days overdue` · `OVERDUE`
  - Diya Kulkarni (`STU-10A-12`): `₹9,200` · `11 days overdue` · `PARTIALLY PAID`
  - Rohan Verma (`STU-10B-08`): `₹18,500` · `7 days overdue` · `PENDING`
- **Timetable Conflict Guard Simulation:**
  - `Monday • Period 3 (10:15 AM)`
  - Button: `Simulate Double-Book` / `Clear Conflict`
  - Conflict State: `Class 10-B • Physics (PHY)` — `Blocked: Mr. R. Sharma already in 10-A (Period 3)` [CONFLICT!]

---

### Role 02: Teachers

**Title:**
```
Scoped class views and locked attendance records.
```

**Description:**
```
Teachers never see irrelevant classes. Dropdowns automatically scope to
their assigned sections, making daily attendance and homework distribution effortless.
```

**Feature Bullets:**
1. **Draft, lock, auto-finalize:** Mark all present in one tap, save temp drafts, lock records, or unlock to fix before 48-hour auto-finalization.
2. **Assignments & Submissions:** Publish PDFs/worksheets with due dates by section and download student submissions in one place.
3. **Multi-Audience Announcements:** Broadcast notices to specific roles; selecting all roles automatically normalizes to "Everyone."

**Interactive Preview:**
- Header: `Scoped Attendance Register` (Class 10-A Mathematics)
- State Toggle Buttons: `1. Draft` | `2. Lock` | `3. Final (48h)`
- Student Rows:
  - `#01 Aanya Sharma` — PRESENT
  - `#02 Kabir Nair` — PRESENT
  - `#03 Reyansh Joshi` — ABSENT
- Tally: `40/42 Present`
- **Notice Audience Normalization Demo:**
  - Audience Pills: `Students` | `Teachers` | `Accounts` | `Everyone`
  - Dynamic Target Output: `Target: EVERYONE (Normalized)`

---

### Role 03: Accounts & Fees

**Title:**
```
Built for Indian fee workflows: UPI UTR verification & QR receipts.
```

**Description:**
```
Eliminate manual receipt books and WhatsApp payment confusion.
Accounts staff get a dedicated ledger with full staff audit trails.
```

**Feature Bullets:**
1. **UPI Payment Proof Queue:** Inspect student-submitted UTR numbers and screenshots; approve or reject with instant invoice status updates.
2. **Watermarked PDF Invoices:** Auto-numbered invoices with school logo, dynamic status watermark (`PAID / PARTIALLY PAID`), and QR verification.
3. **"Added By" Staff Accountability:** Every logged payment records which Accounts staff member created the transaction.

**Interactive Preview:**
- Student Proof: `Vihaan Malhotra (Class 9-B)`
- Invoice Info: `INV-2026-0891 • Amount: ₹14,500 • Mode: UPI QR`
- UTR: `428910492817` • File: `Screenshot_UPI.png`
- Test Verification Action: `Approve & Issue Receipt` (Green) | `Reject` (Red)

---

### Role 04: Students

**Title:**
```
A clean daily companion for timetables, homework, and fee receipts.
```

**Description:**
```
Students and parents get a distraction-free portal showing enrolled subjects,
daily period schedules, pending assignments, and instant PDF receipt downloads.
```

**Feature Bullets:**
1. **Live Daily & Weekly Timetable:** Always in sync with admin period slots and subject teachers.
2. **Before-Due-Date Assignment Uploads:** Download teacher reference files and submit homework directly from mobile or desktop.
3. **Transparent Fee History:** View paid, pending, or partially paid invoices, submit UPI UTR proofs, and download official receipts.

**Interactive Preview:**
- Student: `Ananya Rao • Class 10-A • Roll #04` [Fees: All Clear]
- Schedule:
  - `08:30 • P1` Mathematics (R. Sharma)
  - `09:20 • P2` Physics Lab (S. Iyer)
  - `10:15 • P3` English Lit (M. Das)
- Active Assignment: `Quadratic Equations Problem Set #4 (PDF attached)` [Due Tomorrow]
- Action: `Worksheet.pdf` download + `Upload Solution` button

---

## 6. Day-One Workflows — Bento Grid

> **Section ID:** `#bento`

### Section Header

**Badge:** `ENGINEERED FOR REAL-WORLD SCHOOL CHAOS`

**Headline:**
```
Three jobs that eat your office's week, done in minutes.
```
("done in minutes." in italic serif)

**Sub-headline:**
```
Tap around. These are our real screens, filled with sample data.
```

---

### Card 01: CSV Data Migration

**Eyebrow:** `01 • ZERO-FRICTION DATA MIGRATION`

**Title:**
```
Migrate thousands of students and fee ledgers without silent failures.
```

**Description:**
```
Legacy ERPs fail on a single typo. SchoolChakra guides admins through a step-by-step
reconciliation pipeline with row-level errors that say exactly what to fix and downloadable
failed-row CSV reports.
```

**3-Stage Progression Strip:**
1. `1. Messy Sheet` [Raw CSV]
   - Row 104 (Class 8-A): A. Sharma
   - Row 319 (Q3 Tuition Fee): invalid numeric `₹12,O00` (letter O)
2. `2. Errors Flagged` [2 Flags]
   - Row 104: Matches 2 students
   - Row 319: Typo caught
3. `3. Clean Import` [Resolved]
   - Row 104 Resolved: `STU-8A-02`
   - Row 319 Amount: `₹12,000`
   - Status: `All 1,420 fee records reconciled.` ✓
- Caption: `Row 319: typo caught, ₹12,O00 → ₹12,000`

---

### Card 02: Instant PDF Receipts

**Eyebrow:** `02 • INSTANT PDF RECEIPTS`

**Status Toggle Pills:** `PAID` | `PARTIALLY PAID` | `PENDING`

**Title:**
```
Watermarked PDF invoices with QR verification.
```

**Description:**
```
Inline desktop preview and 1-tap mobile download. Toggle the status pills
above to inspect the live watermark.
```

**Interactive Preview:**
- School Logo: `SC`
- School Name: Dynamic from tenant (e.g. `Delhi Public Academy`)
- Invoice: `INV-2026-0842 • Oct 2026 Term`
- QR code tile
- Student: `Ishaanvi Nair (Class 11-A)`
- Total Billed: `₹24,000`
- Amount Paid: `₹24,000` / `₹12,000` / `₹0` (dynamic)
- Operator: `Accounts_02`
- Large angled background watermark: `PAID` / `PARTIALLY PAID` / `PENDING`
- Caption: `One tap on mobile sends the PDF to the parent.`

---

### Card 03: Attendance Integrity

**Eyebrow:** `03 • ATTENDANCE INTEGRITY`

**Badge:** `Auto-finalizes after 48h`

**Title:**
```
Draft, Lock, and 48-hour Auto-Finalization.
```

**Description:**
```
Teachers can save temporary drafts or lock attendance. If left locked,
the record finalizes automatically after 48 hours.
```

**Interactive Preview:**
- Header: `Class 12-B • 42 Students`
- Action: `Mark All Present (42/42)`
- State Toggles: `1. Save Temp` | `2. Lock` | `3. Final Save`
- Live Status States:
  - Draft: `● Unsaved Exit Browser Warning Active` — `Editable`
  - Locked: `● Locked, auto-finalizing in 47h 59m` — `Unlock to Fix`
  - Finalized: `● Finalized — record locked` — `Immutable`
- Caption: `Locked registers auto-finalize into permanent audit records after 48 hours.`

---

## 7. Architecture Section (Security & Data)

> **Section ID:** `#architecture`

### Section Header

**Eyebrow:** `OPERATIONAL INTEGRITY & GOVERNANCE`

**Headline:**
```
Your school's data, walled off and exportable.
```

**Sub-headline:**
```
Schools cannot afford downtime, corrupted CSV imports, or accidental cross-school data leakage.
```

### 4 Governance Cards

| Card | Title | Description |
|---|---|---|
| **01** | **Tenant Data Isolation** | Every record is tagged to your school and filtered out of every other school's view — enforced on every database query, not just in the interface. |
| **02** | **Strict Role Permissions** | Granular permissions ensure teachers only access their assigned grade registers, accounts staff access billing, and students see only their reports. |
| **03** | **Assisted Data Migration** | Founding schools receive dedicated engineering assistance to clean up legacy Excel or ERP data with automated row-by-row checks. |
| **04** | **Zero Vendor Lock-In** | Export complete student rosters, attendance logs, and fee receipts to raw CSV / Excel at any time with one click. |

---

## 8. Frequently Asked Questions (FAQ & Founder Proof)

> **Section ID:** `#faq`

### Section Header

**Badge:** `FREQUENTLY ASKED QUESTIONS`

**Headline:**
```
Everything leadership asks before joining the pilot.
```
("joining the pilot." in italic serif)

**Sub-headline:**
```
Honest answers to common questions about pricing, data ownership, curriculum support, and staff onboarding.
```

### Founder Trust Callout

```
Built alongside 20+ Indian school administrators
Most ERPs fail because they were adapted from corporate HR tools or foreign universities.
We sat inside administrative offices watching fee queues on fee day, paper registers during
morning roll call, and timetable conflict chaos on Monday mornings — so SchoolChakra solves
what actually breaks.
```

### 5 Accordion Questions & Answers

1. **What does the Founding Pilot cost?**
   > *The 30-day pilot is completely free with zero setup fees and no credit card required. Founding partner schools receive done-for-you CSV data migration, custom brand styling, and lock in our founding-partner subscription pricing for life when transitioning to production.*

2. **What happens after the 30-day pilot ends?**
   > *At the end of 30 days, your leadership team decides whether SchoolChakra reduced your staff’s administrative load. If you choose to continue, your locked-in founding partner rate activates. If not, we hand you a complete export of all your data in standard CSV/Excel format with zero friction.*

3. **Which boards and school structures are supported?**
   > *CBSE, ICSE, State Boards, and IB/IGCSE. SchoolChakra is built specifically for Indian school workflows — supporting term-wise and quarterly fee schedules, UPI UTR verification, 6-day academic timetables with double-booking prevention, and CBSE board attendance thresholds (<75%).*

4. **Who owns our school’s data, and can we export it?**
   > *Your school owns 100% of its data. Every record is strictly isolated to your school tenant on every database query. You can export complete student rosters, fee ledgers, and attendance archives to raw CSV or Excel anytime with a single click. There is zero vendor lock-in.*

5. **How much effort does onboarding require from our staff?**
   > *Under 20 minutes of initial leadership time. On Day 0, we do a 20-minute kickoff call. On Days 1–2, our engineering team migrates and cleans your legacy Excel sheets. On Day 3, we train your teachers and accounts staff. On Day 4, your school is live.*

### Bottom Trust Strip

```
✓ No credit card required    🛡 Zero vendor lock-in    ✓ 4-day assisted go-live
```

---

## 9. Founding Pilot Section

> **Section ID:** `#pilot`

### Left Side — Value Proposition

**Badge Pill:** `✨ Founding School Pilot Program • Rolling Intake`

**Headline:**
```
Bring SchoolChakra to your campus with done-for-you setup.
```
("done-for-you" in italic serif with underline)

**Description:**
```
We are partnering with a select cohort of schools ready to get off Excel for our Founding Pilot
Program. Our engineers migrate your CSV records, apply your school's brand colors, and train
your staff. You don't set anything up yourself.
```

**Benefits Checklist (✅ Green Checkmarks):**
1. Assisted CSV Student & Fee Migration
2. Custom School Logo & Brand Theme Setup
3. Direct Priority Founder & Engineering Support
4. Founding-partner pricing, locked for life

### Right Side — 4-Step Go-Live Timeline Card

| Step | Day | Milestone |
|---|---|---|
| **1** | **Day 0** | 20-minute call |
| **2** | **Day 1–2** | We migrate your data |
| **3** | **Day 3** | Staff training |
| **4** | **Day 4** | Go-live |

**Primary CTA Button:**
```
Apply for the Founding Pilot  →
```
- Triggers Pilot Application Modal.

---

## 10. Pilot Application Modal

A full-screen modal overlay triggered from primary CTA buttons on the page.

### Step 1 — Application Form

**Badge:** `FOUNDING PILOT COHORT • ROLLING INTAKE`

**Title:**
```
Apply for Founding School Pilot
```

**Sub-headline:**
```
We'll set up a private demo of SchoolChakra in your school's brand colors
and walk your leadership through the Admin, Teacher, Accounts, and Student screens.
```

**Form Fields:**
1. **School / Institution Name\*** — placeholder: `e.g., Heritage International School, Pune`
2. **Your Name\*** — placeholder: `e.g., Dr. Rajesh Sharma`
3. **Principal / Administrator Phone or Email\*** — placeholder: `+91 98765 43210 or principal@school.edu.in`
4. **Affiliation Board** — dropdown: `CBSE` | `ICSE` | `State Board` | `IB / IGCSE`

**Submit Button:**
```
Request my free walkthrough  →
```
(Displays `Sending…` with spinner when submitted)

**Privacy Note:**
```
We only use your details to set up your pilot, and we never share them.
```

**Offline / Network Fallback Message:**
```
We couldn't send your details just now, but they're saved on this device.
You can still pick a time below.
```

### Step 2 — Success & Next Steps

**Reference Badge:** `REF: SC-PILOT-XXXXXXXX`

**Headline:**
```
Thank you. We've received your request for [School Name].
```

**Follow-up Next Step / SLA:**
```
Pick a time now, or we'll call you within one working day.
```

**Primary Action (Cal.com Booking):**
```
Pick a time for your 20-minute walkthrough
```
- After confirmation: `Walkthrough confirmed! Scheduled for: [Date/Time]`

**Secondary Quiet WhatsApp Action:**
- Text link: `Prefer WhatsApp? Message the founder`
- Directly opens WhatsApp prefilled with school name, board, and reference ID to the founder phone (`917289949342`).

**Dismiss:** `Done • Back to Interactive Demo`

---

## 11. Footer

| Element | Copy / Target |
|---|---|
| **Brand Badge** | `S` (brand square) + **SchoolChakra** + `• School ERP for fees, attendance, and timetables.` |
| **Link 1** | `For Every Role` → `#roles` |
| **Link 2** | `CSV & UPI Workflows` → `#bento` |
| **Link 3** | `Apply for the Founding Pilot` → opens Pilot Application Modal |
| **Copyright** | `© 2026 SchoolChakra` |

---

## 12. SEO & Meta Tags

### Document Title
```html
<title>SchoolChakra: School ERP for Fees, Attendance &amp; Timetables (India)</title>
```

### Meta Description
```html
<meta
  name="description"
  content="SchoolChakra runs fees, UPI receipts, attendance, timetables, and notices for Indian schools — with separate workspaces for principals, teachers, accounts staff, and students. Apply for the founding pilot."
/>
```

---

## Cross-Reference to Design

> Every section in this content file corresponds directly to layout, styling, and animation specs defined in [DESIGN_MASTER.md](file:///c:/Users/hp/Desktop/KP%20Programming/Web%20Projects/SchoolChakra%20Landing%20Page/DESIGN_MASTER.md). The two documents together provide an exhaustive, authoritative single source of truth for the SchoolChakra landing page.
