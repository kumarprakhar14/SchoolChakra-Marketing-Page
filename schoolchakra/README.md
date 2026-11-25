# SchoolChakra — Interactive Landing Page

A modular React + TypeScript + Vite + Tailwind CSS v4 implementation of the SchoolChakra
multi-tenant SaaS ERP landing page, converted from the single-file mockup in `../mockup/`.

## Getting started

```bash
npm install
npm run dev      # start dev server
npm run build    # type-check + production build
npm run lint     # lint
npm run preview  # preview the production build
```

## Project structure

```
src/
├── main.tsx                  # React entry point
├── App.tsx                   # Composition root: providers + page shell
├── index.css                 # Tailwind v4 entry (@import + @theme tokens)
│
├── constants/                # Static, non-reactive configuration
│   ├── brand.ts              # BRAND_THEMES, BrandThemeKey helpers
│   ├── tenants.ts            # SCHOOL_TENANTS + lookup helpers
│   └── index.ts
│
├── types/                    # Shared TypeScript types
│   └── index.ts
│
├── contexts/                 # Global state (React Context + hooks)
│   ├── theme/
│   │   ├── theme-context.ts  # Context object, value type, useTheme()
│   │   └── ThemeProvider.tsx # Provider component
│   ├── tenant/
│   │   ├── tenant-context.ts
│   │   └── TenantProvider.tsx
│   ├── ui/
│   │   ├── ui-context.ts
│   │   └── UIProvider.tsx
│   └── index.ts              # Public barrel
│
├── hooks/                    # Reusable, composable logic
│   ├── useGoogleFonts.ts     # Injects the Google Fonts stylesheet
│   ├── useTenantStats.ts     # Stats for the active tenant + date range
│   ├── useChecklistProgress.ts
│   ├── useNoticeAudience.ts  # Notice audience + "Everyone" normalization
│   └── index.ts
│
├── components/
│   ├── ui/                   # Reusable, presentational primitives
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── Pill.tsx          # Pill + SegmentedControl
│   │   ├── Progress.tsx      # Progress + CircularProgress
│   │   ├── Avatar.tsx        # Avatar + AvatarGroup
│   │   ├── GridCrosshair.tsx # GridCrosshair + GridLines
│   │   └── index.ts
│   └── sections/             # Page-level, feature-scoped sections
│       ├── Navbar.tsx
│       ├── Hero.tsx
│       ├── RoleSwitcher.tsx
│       ├── BentoGrid.tsx
│       ├── Architecture.tsx
│       ├── Pilot.tsx
│       ├── Footer.tsx
│       ├── PilotModal.tsx
│       └── index.ts
│
└── utils/
```

## Architecture conventions

**Layering.** `App.tsx` is the only place that knows about every provider. Sections depend on
contexts and hooks — never on each other. UI primitives know nothing about page content.

**Context layout.** Each context lives in its own folder and is split into a
`<name>-context.ts` file (context object, value type, and the `use<Name>()` hook — no JSX) and a
`<Name>Provider.tsx` file (the provider component). This keeps Fast Refresh working and lets the
hook be imported without pulling in a component.

**State ownership.**
- `ThemeContext` — active brand theme; exposes the resolved `theme` and writes
  `--brand-*` CSS variables to `:root`.
- `TenantContext` — active school tenant; switching a tenant also applies its default theme.
- `UIContext` — all remaining interactive state (role switcher, CSV wizard, invoice status,
  attendance machine, notice audiences, pilot modal/form).

**Styling.** Tailwind v4 is configured CSS-first in `src/index.css` (no `tailwind.config.js`).
The `tailwindcss()` Vite plugin handles the build. Brand colors are applied via inline `style`
props resolved from the active theme, since they are dynamic per tenant.

## Section inventory

| Section | Anchor | Interactive state |
| --- | --- | --- |
| Navbar | — | Brand theme switcher, pilot modal trigger |
| Hero | `#top` | Tenant switcher, date range filter, setup checklist |
| Role Switcher | `#roles` | 5 role tabs, per-role workflow simulators |
| Bento Grid | `#bento` | CSV 7-step wizard, invoice status, attendance state machine, timetable conflict guard, notice audiences |
| Architecture | `#architecture` | Static orbital diagram + metrics |
| Pilot | `#pilot` | Onboarding estimator (board, size, legacy system) |
| Pilot Modal | — | Form, validation, success state |
| Footer | — | Pilot modal trigger |
