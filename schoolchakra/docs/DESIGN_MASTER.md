# SchoolChakra Landing Page — Master Design & Visual Specification

> **Purpose:** This document captures **every visual, layout, interaction, animation, and design decision** on the SchoolChakra landing page — from button shapes to scroll-triggered animations. A designer or developer who has never seen the page can read this alongside [CONTENT_MAP.md](file:///c:/Users/hp/Desktop/KP%20Programming/Web%20Projects/SchoolChakra%20Landing%20Page/CONTENT_MAP.md) and fully reconstruct or critique every detail.

---

## Table of Contents

1. [Global Design System](#1-global-design-system)
2. [Navbar](#2-navbar)
3. [Hero Section](#3-hero-section)
4. [Interactive Demo Canvas](#4-interactive-demo-canvas)
5. [Problem Section (Disconnected Tools Hub)](#5-problem-section-disconnected-tools-hub)
6. [Role Switcher Section](#6-role-switcher-section)
7. [Bento Grid Section](#7-bento-grid-section)
8. [Architecture Section](#8-architecture-section)
9. [FAQ Section](#9-faq-section)
10. [Founding Pilot Section](#10-founding-pilot-section)
11. [Pilot Modal](#11-pilot-modal)
12. [Footer](#12-footer)
13. [Global Scroll & Page Behavior](#13-global-scroll--page-behavior)
14. [Responsive Breakpoints](#14-responsive-breakpoints)

---

## 1. Global Design System

### 1.1 Typography

| Role | Font Family | Weight | Tracking |
|---|---|---|---|
| **Primary (body, UI)** | `Plus Jakarta Sans` | 400–800 | Default |
| **Accent/Serif** | `Instrument Serif` | Normal (italic) | Default |
| **Monospace** | `JetBrains Mono` | 400–600 | 0.06em (badges/labels) |

- Fonts are loaded via Google Fonts (`useGoogleFonts` hook).
- `Instrument Serif` is used exclusively for select italic words in headlines (e.g., `"classroom."`, `"workspaces."`, `"done in minutes."`, `"joining the pilot."`, `"done-for-you"`).
- Antialiasing: `-webkit-font-smoothing: antialiased` and `-moz-osx-font-smoothing: grayscale`.

### 1.2 Dynamic Brand Theming

The entire page adapts to **4 brand color themes** — the active theme changes **all** accent colors, button fills, badge tints, gradients, ring colors, the `SchoolChakraHub` SVG accent (`--sc-primary`), and the hero atmospheric wash.

| Theme Key | Display Name | Hex | Hover Hex | Light BG | Border Light |
|---|---|---|---|---|---|
| `blue` | Cobalt Blue | `#2563EB` | `#1D4ED8` | `#EFF6FF` | `#BFDBFE` |
| `emerald` | Emerald Green | `#059669` | `#047857` | `#ECFDF5` | `#A7F3D0` |
| `violet` | Royal Violet | `#7C3AED` | `#6D28D9` | `#F5F3FF` | `#DDD6FE` |
| `crimson` | Heritage Crimson | `#E11D48` | `#BE123C` | `#FFF1F2` | `#FECDD3` |

> [!IMPORTANT]
> Theme changes are propagated via React context (`ThemeProvider`), which also updates `--brand-hex`, `--brand-light`, and `--brand-border` CSS variables on `document.documentElement`. Users switch the active theme via the 4-swatch theme palette picker in the Demo Canvas top bar (while switching schools changes tenant data independently). **Every accent element updates with a 700ms `transition-colors` on the atmospheric wash and dark pilot card, and 200ms on buttons/badges.**

### 1.3 Atmospheric Wash

A decorative radial gradient overlay at the top of the page (rendered in `PageShell` and `Hero`):

```css
background: radial-gradient(65% 55% at 50% 0%, [theme.lightBg] 0%, rgba(255,255,255,0) 100%);
```

- Height: `720px`, `pointer-events: none`, `absolute top-0 inset-x-0` position.
- **Transitions** color with `duration-700` on theme change.
- Creates a subtle colored haze behind the hero section.

### 1.4 Color Palette (Fixed)

| Color | Usage |
|---|---|
| `slate-900` (`#0F172A`) | Primary text, headlines |
| `slate-600` (`#475569`) | Body text, descriptions |
| `slate-500` (`#64748B`) | Muted labels |
| `slate-400` (`#94A3B8`) | Faint dividers, mono labels |
| `slate-200` (`#E2E8F0`) | Borders |
| `slate-100` (`#F1F5F9`) | Tab backgrounds, pill containers |
| `slate-50` (`#F8FAFC`) | Alternating section & card backgrounds |
| `emerald-600` (`#059669`) | Success indicators, checkmarks |
| `amber-600`/`700` | Warning states |
| `rose-600` (`#E11D48`) | Danger/error states |

### 1.5 Selection Color

```css
selection:bg-blue-600 selection:text-white
```

### 1.6 Custom Animations Defined in `index.css` & `HeroRotatingPill.css`

| Animation Name | Effect | Duration | Easing |
|---|---|---|---|
| `mockupFadeIn` (`.animate-fadeIn`) | `opacity 0→1, translateY 6px→0` | 350ms | ease-out |
| `mockupSlideInLeft` (`.animate-slideIn`) | `opacity 0→1, translateX -12px→0` | 300ms | ease-out |
| `mockupToastIn` (`.animate-toast`) | `opacity 0→1, translateX 20px→0` | 400ms | ease-out |
| `floatBadge1` (`.animate-float-1`) | `translateY 0→-8px→0` | 4s | ease-in-out, infinite |
| `floatBadge2` (`.animate-float-2`) | `translateY 0→-7px→0` | 5s | ease-in-out, infinite, 0.7s delay |
| `heroWordSlideIn` | `translateY(100%)→0, opacity 0→1` | 450ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `heroWordSlideOut` | `translateY(0)→-100%, opacity 1→0` | 450ms | `cubic-bezier(0.16, 1, 0.3, 1)` |

**Bar animation:**
```css
.bar-animate { transition: height 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
```

**Custom scrollbar (mockup canvas):**
- Width/Height: `4px`
- Thumb: `#d1d5db` → hover: `#9ca3af`
- Track: transparent, `border-radius: 999px`

---

## 2. Navbar

### Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│  [Logo Icon] SchoolChakra  │  Nav Links (4)  │  Open App  [Apply →] │
└──────────────────────────────────────────────────────────────────────┘
```

| Property | Value |
|---|---|
| **Position** | `sticky top-4 z-40 px-4 sm:px-6` — floats 16px from top of viewport |
| **Shape** | `rounded-full` (pill shape) |
| **Background** | `bg-white/85 backdrop-blur-md` (frosted glass) |
| **Border** | `border border-slate-200/90` |
| **Shadow** | `shadow-[0_8px_30px_rgb(15,23,42,0.06)]` |
| **Max width** | `max-w-7xl mx-auto` |
| **Padding** | `px-4 sm:px-6 py-2.5` |

### Logo Icon

- 32×32px (`w-8 h-8`) `rounded-lg` square filled with active theme color (`BRAND_THEMES[activeThemeKey].hex`)
- Contains an inline SVG: a chakra wheel (concentric circles + 8 radiating lines)
- `group-hover:scale-105` transition, links to `#top`

### Nav Links (desktop only, `hidden md:flex`)

- 4 anchor links (`#roles`, `#bento`, `#architecture`, `#pilot`), `text-sm font-medium text-slate-600`
- `hover:text-slate-900 transition-colors whitespace-nowrap`
- Gap: `gap-7`

### Right Action Group

- **Quiet "Open App" link (`hidden sm:inline-block`):** `text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors` — opens `https://erp.kumarprakhar.online` in a new tab
- **Primary CTA ("Apply for Pilot"):** `Button` component, `size="sm"` (`px-3 py-1.5 text-xs`), `rounded-full`, filled with active theme color, white text, `ArrowRight` (`w-3.5 h-3.5`) right icon, colored ring `0 0 0 2px ${theme.hex}45`, opens Pilot Modal

---

## 3. Hero Section

### Layout

```
Section: id="top", relative z-10 max-w-[1400px] mx-auto
         px-4 sm:px-6 lg:px-8 xl:px-12 pt-10 pb-16 sm:pb-20

Inner:   max-w-5xl mx-auto text-center
```

> [!NOTE]
> Sections alternate between `bg-white` and `bg-slate-50` full-width backgrounds rather than using `border-b` horizontal rules between every section.

### 3.1 Announcement Pill

```
┌─ ● Founding School Pilot Open — Rolling Intake │ Read terms › ─┐
```

| Property | Value |
|---|---|
| **Layout** | `inline-flex items-center gap-2`, centered |
| **Shape** | `rounded-full` |
| **Background** | `bg-white` |
| **Border** | `border border-slate-200/90` |
| **Shadow** | `shadow-2xs` |
| **Padding** | `px-3.5 py-1.5` |
| **Margin** | `mb-5 sm:mb-6` |

- Pulsing dot: `w-2 h-2 rounded-full animate-pulse`, color = `theme.hex`
- Text: `text-xs font-bold tracking-wide text-slate-900`
- Divider: `|` in `text-slate-300`
- `"Read terms"` link (`#pilot`): `text-xs font-bold`, color = `theme.hex`, `hover:underline`, with `ChevronRight` (`w-3 h-3`)

### 3.2 Headline

```
h1: text-4xl sm:text-5xl lg:text-[60px] font-extrabold tracking-tight
    text-slate-900 leading-[1.15] mb-4 sm:mb-5
```

- Line 1: `Every role. Every` **classroom.** (italic `Instrument Serif`, `font-normal italic px-1 inline-block`)
- Line 2 (`inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-1 sm:mt-1.5`): `[HeroRotatingPill] under one roof.`

### 3.3 HeroRotatingPill Component

A self-contained animated pill that cycles words (`Connected`, `Organized`, `Unified`, `Managed`) with vertical slide transitions.

**Visual structure:**
```
┌── ● [Animated Word] ──┐
│   colored border pill  │
└────────────────────────┘
```

| Property | Value |
|---|---|
| **Shape** | `rounded-full` with colored border (`inline-flex items-center gap-2.5 sm:gap-3 px-4 sm:px-6 py-0.5 sm:py-1`) |
| **Background** | `currentTheme.lightBg` (tints with each word's brand color) |
| **Border** | `currentTheme.borderLight` |
| **Text** | `text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-tight` |
| **Color** | Matches word's brand theme hex |
| **Dot** | `w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full`, same color |
| **Shadow** | `shadow-2xs` |
| **Transition (pill color)** | `transition-colors duration-500 ease-out` |

**Word rotation animation:**

| Property | Value |
|---|---|
| **Interval** | `2800ms` per word |
| **Transition duration** | `450ms` |
| **Slide-in keyframes** | `translateY(100%) → translateY(0)` + `opacity 0→1` |
| **Slide-out keyframes** | `translateY(0) → translateY(-100%)` + `opacity 1→0` |
| **Easing** | `cubic-bezier(0.16, 1, 0.3, 1)` |
| **Slot height & width** | `h-[1.32em] px-1`, smoothly animates `width` to measured width + `10px` safety clearance |
| **Reduced motion** | `prefers-reduced-motion: reduce` → no slide animation or width transition, `200ms` opacity transition |
| **Tab visibility** | Pauses cycling when `document.visibilityState === 'hidden'` |

### 3.4 Sub-headline

```
p: max-w-3xl mx-auto text-base sm:text-lg text-slate-600
   leading-relaxed mb-6 sm:mb-7 font-normal
```

### 3.5 Primary CTA Button

| Property | Value |
|---|---|
| **Size** | `xl` (`px-8 sm:px-10 py-4 sm:py-5`) |
| **Font** | `font-bold text-base sm:text-lg` |
| **Shape** | `rounded-full` |
| **Color** | White text on `theme.hex` background |
| **Shadow** | `shadow-xl hover:shadow-2xl` + colored shadow `0 14px 34px -6px ${theme.hex}60` |
| **Ring** | `ring-4 ring-offset-2` |
| **Hover / Active** | `hover:scale-[1.02]`, `active:scale-[0.98]` |
| **Transition** | `transition-all duration-200` |
| **Right icon** | `ArrowRight` (`w-5 h-5`) with `group-hover:translate-x-0.5` |
| **Action** | Opens Pilot Modal |

### 3.6 Trust Badges Strip (Positioned Directly Below Primary CTA)

```
Layout: flex flex-wrap items-center justify-center gap-x-6 gap-y-2
        text-xs font-medium text-slate-500 mt-5 sm:mt-6 mb-8 sm:mb-10 opacity-60
```

- 3 inline trust indicators directly above the Demo Canvas:
  - `CheckCircle2` (`w-4 h-4 text-emerald-600 shrink-0`) + label (`Set up by our team`, `Export your data anytime`, `Founder on WhatsApp`)

---

## 4. Interactive Demo Canvas

### Container (Inside Hero Section, Below Trust Badges)

```
Outer wrapper: relative max-w-7xl mx-auto mt-2 sm:mt-4
Inner bezel:   p-2 sm:p-3 bg-slate-100/90 rounded-2xl sm:rounded-3xl
               border border-slate-200/90
               shadow-[0_20px_50px_-15px_rgba(15,23,42,0.10)]
```

### Canvas Component (`DemoCanvas`)

```
relative w-full rounded-2xl sm:rounded-3xl border border-gray-200/90 bg-white
shadow-[0_25px_60px_-15px_rgba(15,23,42,0.12)] overflow-hidden
flex flex-col min-h-[580px] sm:min-h-[640px] text-slate-800
```

### Canvas Structure

```
┌─────────────────────────────────────────────────┐
│  Top Bar (school tenant pills + theme swatches) │
├──────────┬──────────────────────────────────────┤
│          │                                      │
│ Sidebar  │  Content Canvas (bg-gray-50/80)      │
│ (w-56 /  │  (Dashboard / Users / Import / Fees) │
│  w-60)   │                                      │
│          ├──────────────────────────────────────┤
│          │  Bottom Status Bar (overlay bottom)  │
└──────────┴──────────────────────────────────────┘
```

**Key design features:**
- **Desktop Top Bar (`md:flex`):** `"Switch School Tenant:"` horizontal row of pill buttons (active = `bg-gray-900 text-white shadow-sm`, inactive = `text-gray-500 hover:bg-gray-100`, each with colored dot) + `"Dynamic School Theme:"` pill containing 4 circular color swatches (`w-4 h-4 rounded-full`, active = `scale-125 ring-2 ring-offset-1 ring-slate-400`).
- **Mobile Top Bar (`< md`):** Two-row header — Row 1: hamburger menu button + school short badge + active tab label + compact theme swatch pill; Row 2: `"Tenant:"` horizontally scrollable chip strip.
- **Desktop Sidebar (`hidden md:flex w-56 lg:w-60`):** School header with gradient tint, 4 nav tabs (`Dashboard`, `Users`, `Import`, `Fees` with `94.2%` pill badge) with active left accent bar (`w-1`) and theme tint, plus bottom `"Found an issue? Report an Issue"` feedback card.
- **Mobile Sidebar:** Slide-in drawer overlay (`w-64 max-w-[80%] animate-slideIn`) over a blurred backdrop (`bg-slate-900/40 backdrop-blur-xs`).
- **Content Area:** `bg-gray-50/80`, `pb-14 sm:pb-12` clearance for status bar; view switches trigger `animate-fadeIn` (`350ms` fade + `6px` slide-up).
- **Bottom Status Bar (`MockupStatusBar`):** `absolute bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-md border-t`, showing `TENANT: {code}`, `ACTIVE` dot indicator, and a dismissible `Auto-Finalized` chip (`bg-blue-50 border-blue-200`).

---

## 5. Problem Section (Disconnected Tools Hub)

### Section Layout

```
Section: w-full bg-slate-50 py-16 sm:py-20
Inner:   max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center
```

- **Headline:** `text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3 sm:mb-4`
- **Context Subhead:** `text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8 sm:mb-12 font-normal leading-relaxed`
- **Infographic Container:** `w-full max-w-4xl mx-auto flex items-center justify-center`
- **Resolution Line (below SVG):** `mt-8 sm:mt-12 text-sm sm:text-base font-semibold text-slate-700 max-w-xl mx-auto`

### SchoolChakraHub SVG Animation (`SchoolChakraHub.tsx`)

> [!NOTE]
> `SchoolChakraHub` is a **self-contained animated SVG** (`viewBox="35 75 570 405"`) with CSS keyframe animations orchestrated across a **12-second play-once sequence** triggered by GSAP `ScrollTrigger`. The SVG inherits the active brand theme via `--sc-primary` (`theme.hex`).

**Trigger & State Lifecycle:**
- `idle` (`.sc-state-idle`): Before scrolling into view — camera at `scale(1)`, all 5 legacy tool cards visible around the empty central dashboard (`—` placeholders).
- **GSAP `ScrollTrigger`:** Fires once (`once: true`) when the SVG enters `70%` into the viewport (`top+=${min(height * 0.7, window.innerHeight * 0.7)}px bottom`), transitioning to `playing`.
- `playing` (`.sc-state-playing`): Runs the 12s CSS animation sequence once (`forwards`), then transitions to `done` after `12000ms`.
- `done` (`.sc-state-done`): Frozen at the final zoomed state (`scale(1.35)` centered on the synced dashboard).
- **Reduced Motion (`prefers-reduced-motion: reduce`):** Initializes directly in `done` with no animation and static zoomed dashboard.

**Animation Sequence (12s Play-Once Timeline):**

| Time | Event |
|---|---|
| 0–3s | 5 disconnected legacy tool cards float with gentle drift (`sc-dr0`–`sc-dr4`, 3.4–4.2s) |
| 2.2–6.4s | Curved Bézier connection paths (`sc-lines`) fade in + animated dot trails (`sc-dot0`–`sc-dot4`) |
| 3–5.6s | Legacy cards fly one-by-one into the central dashboard (`scale(1) → scale(0.25)` with `cubic-bezier(.55, 0, .8, .45)`) |
| 4.0–5.3s | Attendance (`97.8%` + progress bar), Fees (`₹56.0L`), Timetable (10-cell grid + `0 clashes`), Users (`960`), and Notices (`Sending to 8-B…` → `12 delivered ✓`) populate and highlight |
| 5.6–7.0s | Camera (`sc-cam`) smoothly zooms to `scale(1.35)` onto the unified dashboard (`47%–58%` of 12s) |
| 6.0–10.8s | Top-right role chip rotates: `Principal` → `Teacher` → `Accounts` → `Student` → `Principal` |
| 9.3–10.8s | Pulse ring (`sc-pulse`) expands on outer dashboard border, module highlights flash sequentially, and bottom-right green checkmark (`sc-chk`) locks in |

---

## 6. Role Switcher Section

### Section Layout

```
Section: id="roles", relative z-10 w-full bg-white py-16 sm:py-20
Inner:   max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12
```

### 6.1 Centered Section Header

- **Badge:** `Badge variant="outline" size="xs"` with `Users` icon (`w-3.5 h-3.5`)
- **Headline:** `text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 mt-2` (`"workspaces."` in italic `Instrument Serif`)
- **Sub-headline:** `text-slate-600 mt-2 text-xs sm:text-sm max-w-2xl mx-auto hidden sm:block`

### 6.2 Role Tab Bar

```
Outer:     flex items-center justify-center gap-2 sm:gap-3 px-2 mb-8 sm:mb-10
Prefix:    "I'm a:" (text-xs sm:text-sm font-medium text-slate-500)
Container: inline-flex flex-wrap items-center justify-center
           gap-1 sm:gap-1.5 p-1 sm:p-1.5
           rounded-2xl bg-slate-100/90 border border-slate-200/90 shadow-2xs
```

**Individual tabs (4 roles: `School Admin`, `Teachers`, `Accounts & Fees`, `Students`):**
- Inactive: `text-slate-600 hover:text-slate-900 hover:bg-white/60`
- Active: `text-white shadow-sm`, `backgroundColor: theme.hex`
- Shape: `rounded-xl`
- Size: `px-3 sm:px-4 py-1.5 sm:py-2.5 text-xs sm:text-sm font-semibold`
- Icons: `w-3.5 h-3.5 sm:w-4 sm:h-4` (`Building2`, `BookOpen`, `CreditCard`, `GraduationCap`)

### 6.3 Single Active Role Card (`animate-fadeIn`)

Instead of stacking all 4 cards on scroll, clicking a tab swaps the single visible role panel (`key={activeRoleDef.id}`) with `animate-fadeIn` (`350ms` fade + `6px` rise):

```
Outer: Card variant="elevated" padding="none" className="overflow-hidden"
Inner: bg-white rounded-2xl border border-slate-200 p-6 sm:p-8
       grid grid-cols-1 lg:grid-cols-12 gap-8 items-start
```

**Left column (`lg:col-span-5 space-y-6`):**
- Title: `text-2xl font-bold text-slate-900`
- Description: `text-sm text-slate-600 mt-2 leading-relaxed`
- Feature list (`space-y-3.5 text-sm text-slate-700`): `CheckCircle2` (`w-4 h-4`) in `theme.hex` + bold label + description text

**Right column (`lg:col-span-7`) — Interactive Preview Panel:**
```
rounded-2xl bg-gradient-to-b from-slate-50/90 via-slate-50/40 to-white
border border-slate-200/80 p-5 sm:p-6 shadow-xs
```

Each preview is an interactive micro-simulation:
- **School Admin (`AdminPreview`):** Low Attendance Alert (`<75%`) amber callout + Fee Defaulters table + folded **Timetable Conflict Guard** (`Simulate Double-Book` / `Clear Conflict` toggle showing `VALID SLOT` vs `CONFLICT!`).
- **Teachers (`TeacherPreview`):** Scoped Attendance Register (`1. Draft` | `2. Lock` | `3. Final (48h)` workflow toggles + student list) + folded **Notice Audience Normalization** (`Students` | `Teachers` | `Accounts` | `Everyone` toggle pills that normalize all roles to `EVERYONE (Normalized)`).
- **Accounts & Fees (`AccountsPreview`):** UPI Payment Verification card (`428910492817` UTR + `Screenshot_UPI.png`) with `Approve & Issue Receipt` (green) and `Reject` (red) buttons.
- **Students (`StudentPreview`):** 2-column grid (`grid-cols-1 sm:grid-cols-2 gap-4`) with Today's Period Schedule on the left and Active Assignment card (`Worksheet.pdf` + `Upload Solution` theme button) on the right.

---

## 7. Bento Grid Section

### Section Layout

```
Section: id="bento", relative z-10 w-full bg-slate-50 py-16 sm:py-20
Inner:   max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12
Header:  max-w-3xl mb-12 (left-aligned)
Grid:    grid grid-cols-1 lg:grid-cols-12 gap-6
```

### BentoCard Base Design

```
rounded-3xl bg-white border border-slate-200/80
p-6 sm:p-7 flex flex-col justify-between shadow-xs
hover:border-slate-300 transition-all
```

Each card has:
- **Eyebrow:** `text-xs font-mono font-semibold uppercase tracking-wider text-slate-500`
- **Optional right badge/controls**
- **Title:** `text-xl sm:text-2xl font-bold text-slate-900 tracking-tight`
- **Description:** `text-sm text-slate-600 mt-2 leading-relaxed`
- **Interactive content area** (`mt-5`)

### Grid Layout (3 Cards)

```
Row 1: [01 • CSV Data Migration Strip — lg:col-span-12 (Full Width)]
Row 2: [02 • Invoice Card — lg:col-span-6] [03 • Attendance Card — lg:col-span-6]
```

### Card-Specific Interactive Elements

**01 • CSV Data Migration (`CsvStripCard`, `lg:col-span-12`):**
- Outer inner tray: `bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs`
- **3-Stage clickable progression grid (`grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4`):**
  1. `1. Messy Sheet` (`Raw CSV` outline badge) — shows `Row 104` (`A. Sharma`) and `Row 319` (`₹12,O00` in rose)
  2. `2. Errors Flagged` (`2 Flags` warning badge) — highlights `Matches 2 students` (amber) and `Typo caught` (rose)
  3. `3. Clean Import` (`Resolved` success badge, **highlighted by default**) — shows resolved `STU-8A-02`, `₹12,000`, and `All 1,420 fee records reconciled.`
- Active card styling: Stages 1 & 2 get `bg-amber-50/70 border-amber-300 ring-2 ring-amber-400/30`; Stage 3 gets `bg-emerald-50/80 border-emerald-300 ring-2 ring-emerald-500/30 shadow-xs`.
- Bottom caption: `border-t border-slate-200/80 text-xs font-mono text-slate-600`.

**02 • Instant PDF Receipts (`InvoiceCard`, `lg:col-span-6`):**
- **Header status toggle pills** (`PAID | PARTIALLY PAID | PENDING`): `text-[10px] font-mono px-2 py-0.5 rounded border`, active = `bg-slate-900 text-white border-slate-900 font-bold`.
- **Invoice preview:** `bg-slate-50/70 rounded-2xl border border-slate-200 p-5 overflow-hidden shadow-2xs`
- **Dynamic angled watermark:** `absolute inset-0 -rotate-12 font-mono font-extrabold text-3xl sm:text-4xl tracking-widest opacity-10` — color shifts (`emerald-600` / `amber-600` / `rose-600`).
- **School mark + QR:** `w-7 h-7 rounded-md` `SC` icon in `theme.hex`, dynamic `currentTenant.name`, `QrCode` icon (`w-7 h-7`) inside `bg-white border rounded-lg`.
- **Status badge** (`success` / `warning` / `danger`) + `Operator: Accounts_02` + caption.

**03 • Attendance Integrity (`AttendanceCard`, `lg:col-span-6`):**
- **Header badge:** `Badge variant="warning" size="xs"` (`Auto-finalizes after 48h`).
- **Class bar:** `Class 12-B • 42 Students` + `"Mark All Present (count/42)"` button (enabled only when `bentoAttState === 'draft'`).
- **3 state buttons** (`1. Save Temp`, `2. Lock`, `3. Final Save`) in `grid grid-cols-3 gap-2`; active = `theme.hex` fill + white text.
- **Status bar:** `p-3 rounded-xl bg-white border border-slate-200/80 text-xs` showing state message + `"Unlock to Fix"` button when locked, followed by footer caption.

---

## 8. Architecture Section

### Layout

```
Section: id="architecture", relative z-10 w-full bg-white py-16 sm:py-20
Inner:   max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12
Header:  flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4
Cards:   grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6
```

- **Header Left:** Eyebrow (`text-xs font-mono font-bold tracking-wider text-slate-500 uppercase`) + Title (`text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-1.5`)
- **Header Right:** Sub-headline (`text-xs sm:text-sm text-slate-600 max-w-md`)

### 4 Governance Feature Cards

```
Card: p-5 sm:p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80
      hover:border-slate-300 transition-all
```

- **Icon container:** `w-8 h-8 rounded-xl mb-3` with soft tinted background + border + 16×16 (`w-4 h-4`) icon:
  1. `Tenant Data Isolation` — `blue-50` / `border-blue-200` / `text-blue-600` (`ShieldCheck`)
  2. `Strict Role Permissions` — `purple-50` / `border-purple-200` / `text-purple-600` (`Users`)
  3. `Assisted Data Migration` — `emerald-50` / `border-emerald-200` / `text-emerald-600` (`RefreshCw`)
  4. `Zero Vendor Lock-In` — `amber-50` / `border-amber-200` / `text-amber-600` (`CheckCircle2`)
- **Title:** `text-sm font-bold text-slate-900`
- **Description:** `text-xs text-slate-600 mt-1.5 leading-relaxed`

---

## 9. FAQ Section

### Section Layout

```
Section: id="faq", relative z-10 w-full bg-slate-50 py-16 sm:py-20
         border-t border-slate-200/70
Inner:   max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12
```

### 9.1 Centered Section Header

- `max-w-3xl mx-auto text-center mb-10 sm:mb-14`
- **Badge:** `Badge variant="outline" size="xs"` with `HelpCircle` (`w-3.5 h-3.5`)
- **Headline:** `text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 mt-2.5` (`"joining the pilot."` in italic `Instrument Serif`)
- **Sub-headline:** `text-slate-600 mt-2 text-xs sm:text-sm max-w-xl mx-auto`

### 9.2 Founder Trust Callout

```
Container: max-w-3xl mx-auto mb-10 p-5 sm:p-6 rounded-2xl
           bg-white border border-slate-200 shadow-2xs
           flex items-start gap-4
Icon Box:  w-10 h-10 rounded-xl text-white shrink-0 mt-0.5 (fill: theme.hex)
           with HeartHandshake (w-5 h-5)
```

### 9.3 Accordion List

```
Container: max-w-3xl mx-auto space-y-3
Item Card: rounded-2xl border border-slate-200 bg-white overflow-hidden
           transition-all shadow-2xs hover:border-slate-300
```

- **5 FAQ items**; first item (`openIndex = 0`) is expanded by default.
- **Trigger button:** `w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer`
  - Question text: `font-bold text-slate-900 text-sm sm:text-base pr-4`
  - Chevron: `ChevronDown` (`w-4 h-4 text-slate-500`), rotates `rotate-180 text-slate-900` (`duration-200`) when open.
- **Answer panel:** `px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-fadeIn`.

### 9.4 Bottom Trust Badges Bar

```
max-w-2xl mx-auto mt-10 pt-6 border-t border-slate-200/80
flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500
```

- 3 badges with icons (`CheckCircle2` in `emerald-600`, `Shield` in `blue-600`).

---

## 10. Founding Pilot Section

### Layout

```
Section: id="pilot", relative z-10 w-full bg-white py-16 sm:py-20
Inner:   max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12
```

### Dark Container

```
rounded-3xl p-7 sm:p-10 lg:p-12 text-white shadow-2xl
relative overflow-hidden transition-all duration-700
```

**Background:** Layered gradient incorporating the active theme color:
```css
background: radial-gradient(circle at top left, ${theme.hex}D9 0%, transparent 65%),
            linear-gradient(140deg, #1E293B 0%, #0B0F19 100%);
```

> [!TIP]
> The `D9` alpha suffix gives 85% opacity to the radial-gradient's theme color, creating a subtle ambient tint in the top-left corner over a deep slate-to-black diagonal base gradient.

### Left Column (`lg:col-span-7 space-y-5`)

- **Badge pill:** `inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-mono uppercase tracking-wider` with `Sparkles` (`w-3.5 h-3.5`)
- **Headline:** `text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight`
- **Italic serif word** (`"done-for-you"`): `font-normal italic underline decoration-white/40`
- **Description:** `text-white/85 text-sm sm:text-base leading-relaxed max-w-2xl`
- **Benefits grid:** `grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-white/90`, each with `CheckCircle2` (`w-4 h-4 text-emerald-300`)

### Right Column (`lg:col-span-5`) — 4-Step Go-Live Timeline Card

```
Container: bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-white/20
```

**Vertical 4-Step Timeline (`space-y-5 mb-6`):**
- Steps: `1. Day 0 (20-minute call)` → `2. Day 1–2 (We migrate your data)` → `3. Day 3 (Staff training)` → `4. Day 4 (Go-live)`.
- Each row (`animate-fadeIn`):
  - Numbered circle (`w-8 h-8 rounded-full text-white font-bold text-xs`, filled with `theme.hex`, `shadow-xs`)
  - Vertical connector line between steps 1–3 (`w-0.5 h-8 bg-slate-200 mt-2`)
  - Mono day label (`font-mono text-xs uppercase text-slate-500 font-semibold`) + milestone title (`text-sm font-bold text-slate-900 mt-0.5`)

**CTA button:**
- `Button fullWidth size="lg"` with `ArrowRight` (`w-4 h-4`)
- `backgroundColor: theme.hex`

---

## 11. Pilot Modal

### Overlay

```
fixed inset-0 z-50 flex items-center justify-center p-4
bg-slate-900/60 backdrop-blur-xs
animate-in fade-in duration-200
```

- Closes on: backdrop click, `Escape` key, or `X` button
- Body scroll locked (`document.body.style.overflow = 'hidden'`) while open

### Modal Container

```
bg-white rounded-3xl border border-slate-200
max-w-lg w-full p-6 sm:p-8 shadow-2xl relative
animate-in fade-in zoom-in-95 duration-200
max-h-[92vh] overflow-y-auto
```

### Close Button

```
absolute top-5 right-5
w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600
```

### Form Step (Step 1)

- **Badge:** `Badge variant="theme" size="sm"` (`FOUNDING PILOT COHORT • ROLLING INTAKE`)
- **Title:** `text-2xl font-extrabold tracking-tight text-slate-900`
- **Offline/Fallback Alert (if submission fails):** `p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900`
- **4 Input fields:**
  - School / Institution Name: `pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600` with left-aligned `Building` icon (`w-4 h-4 text-slate-400`)
  - Your Name & Principal/Admin Contact: `px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600`
  - Affiliation Board dropdown: `px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 font-medium text-xs sm:text-sm cursor-pointer`
- **Submit button:**
  - `fullWidth size="lg"`, `backgroundColor: theme.hex`
  - Shows `Loader2 animate-spin` during submission
  - Label: `"Request my free walkthrough"` → `"Sending…"`
- **Privacy note:** `text-[11px] text-center text-slate-500`

### Success Step (Step 2)

```
text-center py-2 space-y-5
animate-in fade-in duration-300
```

- **Success icon:** `w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 mx-auto shadow-sm`
- **Reference badge:** `inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-[11px] font-mono font-bold border border-slate-200` with `ShieldCheck` (`text-emerald-600`)
- **Confirmed Walkthrough Banner** (appears after Cal.com booking):
  ```
  p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-left
  animate-in fade-in slide-in-from-top-2
  ```
- **Primary Action (Cal.com scheduler):** `Button fullWidth size="lg"`, `backgroundColor: theme.hex` (`"Pick a time for your 20-minute walkthrough"`)
- **Secondary Action (WhatsApp):** Quiet underlined text link (`text-xs text-slate-600 hover:text-slate-900 underline`) opening prefilled `wa.me` link
- **Dismiss link:** `text-xs font-semibold text-slate-500 hover:text-slate-800` (`"Done • Back to Interactive Demo"`)

---

## 12. Footer

```
footer: border-t border-slate-200 bg-slate-50/60 py-12 px-4 sm:px-6 lg:px-8
Inner:  max-w-[1400px] mx-auto
        flex flex-col sm:flex-row items-center justify-between gap-6
        text-xs text-slate-500
```

**Left side:**
- Logo: `w-6 h-6 rounded-md` square with `theme.hex` fill + white `"S"` letter
- Brand: `font-bold text-slate-900` `"SchoolChakra"`
- Tagline: `• School ERP for fees, attendance, and timetables.`

**Right side:**
- 2 anchor links (`For Every Role` → `#roles`, `CSV & UPI Workflows` → `#bento`) + 1 button (`Apply for the Founding Pilot` → opens Pilot Modal), `hover:text-slate-900`
- Copyright: `font-mono text-slate-400` (`© 2026 SchoolChakra`)

---

## 13. Global Scroll & Page Behavior

### Page Structure

```
┌─── Navbar (sticky top-4 z-40) ──────────────────────────┐
├─── Hero (#top, bg-white + atmospheric wash) ────────────┤
│    - Announcement pill                                  │
│    - Headline with HeroRotatingPill                     │
│    - Sub-headline & Primary CTA button                  │
│    - Trust badges (3 items)                             │
│    - Interactive Demo Canvas                            │
├─── Problem (bg-slate-50) ───────────────────────────────┤
│    - 5-tools headline & subhead                         │
│    - SchoolChakraHub SVG (GSAP ScrollTrigger at 70%)    │
│    - Resolution line                                    │
├─── Role Switcher (#roles, bg-white) ────────────────────┤
│    - Centered header + "I'm a:" 4-tab switcher          │
│    - Single active role card (swaps with fadeIn)        │
├─── Bento Grid (#bento, bg-slate-50) ────────────────────┤
│    - Row 1: Full-width 3-stage CSV Migration strip      │
│    - Row 2: Watermarked Invoice + 48h Attendance cards  │
├─── Architecture (#architecture, bg-white) ────────────────┤
│    - Split header + 4 Governance feature cards          │
├─── FAQ (#faq, bg-slate-50, border-t) ───────────────────┤
│    - Founder Trust Callout                              │
│    - 5-item Accordion + Bottom Trust Badges Bar         │
├─── Founding Pilot (#pilot, bg-white) ───────────────────┤
│    - Dark theme-tinted card + 4-step Go-Live Timeline   │
├─── Footer (bg-slate-50/60, border-t) ───────────────────┤
└─────────────────────────────────────────────────────────┘
  [Pilot Modal: fixed overlay, z-50]
```

### Scroll & Motion Behavior

1. **Page overflow:** `overflow-x-clip` on the root shell prevents horizontal scrollbars while keeping `sticky` navbar functional.
2. **Alternating section rhythm:** Sections alternate cleanly between `bg-white` and `bg-slate-50` (`Hero` → `Problem` → `RoleSwitcher` → `BentoGrid` → `Architecture` → `FAQ` → `Pilot` → `Footer`).
3. **Anchor navigation:** Navbar and footer links target `#top`, `#roles`, `#bento`, `#architecture`, `#faq`, and `#pilot`.
4. **ScrollTrigger infographic:** `SchoolChakraHub` waits in `sc-state-idle` until scrolled 70% into the viewport, then plays its 12-second convergence animation once via GSAP `ScrollTrigger`.
5. **Modal scroll lock:** When `PilotModal` is open, `document.body.style.overflow = 'hidden'` prevents background scroll.

### Animation Performance & Accessibility

- `HeroRotatingPill` uses `will-change: transform, opacity`, pauses when tab is hidden, and falls back to a `200ms` opacity transition under `prefers-reduced-motion: reduce`.
- `SchoolChakraHub` respects `@media (prefers-reduced-motion: reduce)` and initializes directly in the completed zoomed dashboard state.

---

## 14. Responsive Breakpoints

The site uses Tailwind CSS v4 responsive breakpoints:

| Prefix | Min Width | Key Changes |
|---|---|---|
| (default) | 0px | Single column, compact padding, 2-row mobile DemoCanvas header |
| `sm:` | 640px | Navbar `"Open App"` visible, larger hero text, inline RoleSwitcher subhead, flex-row footer |
| `md:` | 768px | Navbar links visible, DemoCanvas desktop top bar & permanent sidebar appear, CSV 3-stage strip splits into 3 columns |
| `lg:` | 1024px | 12-column grids activate (RoleSwitcher 5/7, Bento Row 2 6/6, Pilot 7/5), 4-column Architecture grid |
| `xl:` | 1280px | Wider container horizontal padding (`xl:px-12`) |

### Mobile-Specific Design

- **Navbar:** Nav links hidden; `"Open App"` hidden below `sm:`; logo + `"Apply for Pilot"` button remain visible.
- **Demo Canvas:** Top bar splits into hamburger + active tab + compact theme dots on row 1, and horizontal-scrolling tenant chips on row 2; sidebar becomes a slide-in drawer overlay.
- **Role Switcher:** Tabs wrap (`flex-wrap`); active card stacks left narrative over right preview.
- **Bento Grid:** CSV 3-stage strip and Row 2 cards stack vertically (`grid-cols-1`).
- **Architecture & Pilot:** 4 governance cards stack (`1 → 2 → 4` columns); Pilot dark banner stacks copy above the 4-step timeline card.

---

## Cross-Reference to Content

> Every visual element described in this file has corresponding text documented in [CONTENT_MAP.md](file:///c:/Users/hp/Desktop/KP%20Programming/Web%20Projects/SchoolChakra%20Landing%20Page/CONTENT_MAP.md). The two files together provide a complete specification: **what** the page says and **how** the page looks, behaves, and animates.
