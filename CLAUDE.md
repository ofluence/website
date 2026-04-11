# Website

Public marketing site for Ofluence. Promotes the platform, pricing, use cases, legal pages.

## Stack

React 19 (with React Compiler), TypeScript 6, Vite 8, TanStack Router (file-based), shadcn/ui + Tailwind CSS 4, Zustand, Motion (animations), PostHog analytics.

## Commands

```bash
pnpm dev              # Dev server (port 5555)
pnpm build            # tsc + Vite build → dist/
pnpm lint             # ESLint
pnpm format           # Prettier
pnpm commit           # Conventional commit (Commitizen)
```

## Architecture

- **Pages**: `src/pages/` — File-based routing. Landing, about, pricing, contact, solutions, use-cases, integrations, legal pages, 404 catch-all.
- **Components**: `src/components/ui/` (shadcn), `src/components/features/landing/` (hero, features, pain-points, social-proof, CTA, navbar, footer), `src/components/features/global/` (SEO, structured data, theme toggle)
- **Constants**: `src/constants/` — Landing content, pricing tiers, integrations, use cases
- **Locale**: `src/constants/locale/` — Geo-targeted content (default + India-specific pricing/currency)
- **Hooks**: `src/hooks/` — `use-geo-locale`, `use-locale-content`, `use-scroll-to-section`, `use-animated-counter`
- **State**: `src/states/` — Zustand (theme only)

## Key Patterns

- Geolocation-based content: detects user country, shows localized pricing/currency
- Fonts: Sora (display) + Geist Sans (body)
- Design: warm kinetic theme — warm white + near-black + orange accent (#f97316)
- SEO: `<SEO>` component for meta tags + `<StructuredData>` for JSON-LD
- PostHog: analytics + session recording with sensitive input masking
- Docker: multi-stage build → Nginx serving static SPA
- Path alias: `@/` → `src/`

## Ports

- Dev server: 5555
- Dashboard (Pulse): 5656
- Backend API: 4646
