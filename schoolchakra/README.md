# SchoolChakra — Interactive Landing Page (Next.js App Router)

A Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4 marketing site and interactive product preview for SchoolChakra.

## Getting started

```bash
npm install
npm run dev        # start Next.js development server
npm run typecheck  # run TypeScript type checking
npm run lint       # run oxlint on src/
npm run build      # create production build
npm run start      # serve production build
```

## Environment variables

Copy `.env.example` to `.env` and configure:

- `NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL` — Google Apps Script Web App URL for lead & Cal.com booking capture (falls back to local browser demo mode when unset).
- `NEXT_PUBLIC_CALCOM_LINK` — Cal.com event slug (default: `schoolchakra/walkthrough`).
- `NEXT_PUBLIC_WHATSAPP_PHONE` — WhatsApp number (country code + digits, no `+` or spaces).
- `NEXT_PUBLIC_SITE_URL` — Canonical site origin used for metadata, Open Graph, `robots.txt`, and `sitemap.xml` (default: `https://schoolchakra.com`).

## Project structure

```text
src/
├── app/                      # Next.js App Router routes, metadata, OG image, sitemap, robots, error boundaries
├── views/                    # Page view components rendered by src/app/*/page.tsx
├── components/
│   ├── ui/                   # Reusable UI primitives
│   ├── sections/             # Landing page sections and interactive islands
│   ├── demo-canvas/          # Interactive multi-tenant workspace preview
│   ├── providers/            # Client AppProviders wrapper (Theme, Tenant, UI)
│   └── shared/               # Cross-page layout & CTA components
├── config/env.ts             # Public NEXT_PUBLIC_* environment config
├── constants/                # Brand themes, school tenants, rotating hero config
├── contexts/                 # React contexts (Theme, Tenant, UI)
├── data/                     # Static marketing & documentation data
├── hooks/                    # Reusable hooks
├── router/                   # App Router navigation helpers (Link, useRouter)
├── seo/metadata.ts           # Shared Metadata API builder & JSON-LD schema
├── services/leadService.ts   # Lead & Cal.com booking persistence
├── types/                    # Shared TypeScript interfaces
├── utils/                    # Cal.com embed controller & formatting helpers
└── index.css                 # Tailwind v4 entry & brand CSS custom properties
```
