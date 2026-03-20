# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Ofluence Website** is the public marketing site for the Ofluence influencer marketing platform. It includes a landing page, about, pricing, contact, and legal pages (privacy policy, terms of service, cookie policy, GDPR). There is no authentication, API integration, or dashboard functionality — those live in the separate `pulse` repo.

### Ecosystem

| Repo | Purpose |
|------|---------|
| **website** (this repo) | Public marketing site |
| **pulse** | React dashboard (auth, multi-tenant, API) |
| **core** | Backend API (Express, PostgreSQL) |
| **infra** | Kubernetes + Skaffold orchestration |

## Build & Development Commands

```bash
pnpm dev              # Start dev server (port via VITE_PORT env, default 5555)
pnpm build            # TypeScript check + Vite production build
pnpm lint             # Run ESLint
pnpm lint:fix         # ESLint with auto-fix
pnpm format           # Prettier format all files
pnpm format:check     # Check formatting without writing
pnpm preview          # Preview production build locally
pnpm commit           # Commitizen conventional commits
```

Package manager is **pnpm**. No test runner is configured.

## Architecture

### Tech Stack

- **React 19** with React Compiler (auto-optimization, no manual memoization)
- **Vite** with TanStack Router plugin (file-based routing, auto code-splitting)
- **Tailwind CSS 4** via `@tailwindcss/vite` (no `tailwind.config.js` — config is in CSS)
- **shadcn/ui** components built on Base UI (`@base-ui/react`) primitives
- **Zustand** for client state (theme only)
- **PostHog** for analytics with session recording

### Component Hierarchy

```
Pages (src/pages/)
  └── Layout Components (landing-page-layout, legal-page-layout)
        └── Feature Components (src/components/features/)
              └── UI Primitives (src/components/ui/)
```

- **Pages** (`src/pages/`): TanStack Router file-based routes — `index.tsx`, `about.tsx`, `pricing.tsx`, `contact.tsx`, plus legal pages and a `$.tsx` catch-all 404
- **Layouts**: `landing-page-layout.component.tsx` wraps marketing pages (navbar + footer); `legal-page-layout.component.tsx` wraps legal pages
- **Feature components** (`src/components/features/landing/`): Hero, social proof, features, how-it-works, product preview, pricing, CTA, navbar, footer
- **Global components** (`src/components/features/global/`): Theme toggle, SEO head tags, structured data (JSON-LD)
- **Error components** (`src/components/errors/`): Not found (404), default pending/suspense fallback

### State

Only theme state exists via `src/states/global.state.ts` (Zustand with `devtools` + `persist` + `immer` middleware). No other client state. No server state management.

### Analytics

PostHog is initialized before React renders (`src/observability/posthog.ts`). SPA pageviews are tracked on route changes in `src/pages/__root.tsx`. Session recording is enabled with sensitive field masking.

### Deployment

nginx serves the SPA (`nginx/nginx.conf`) with gzip, client-side routing fallback, and static assets from `/pulse/` (Vite's `assetsDir`).

## Code Conventions

### File Naming (ESLint-enforced)

All files use `kebab-case`. Directory-specific suffixes:

- `src/hooks/` → `use-*.ts`
- `src/states/` → `*.state.ts`
- `src/utils/` → `*.utils.ts`
- `src/constants/` → `*.constants.ts`
- `src/services/` → `*.service.ts`
- `src/components/ui/` → `*.tsx` (no suffix)
- `src/components/!(ui)/` (features, errors) → `*.component.tsx`
- `src/types/` → `*.d.ts` or `*.types.ts`

### Exports

Always use named exports. Never use default exports.

### Imports

Use `@/*` path aliases (mapped to `src/*`). Never use relative imports across directories. Import order is enforced by Prettier plugin (`@ianvs/prettier-plugin-sort-imports`) — see `prettier.config.cjs` for the full order.

### React 19 + React Compiler

The React Compiler is enabled via `@rolldown/plugin-babel` + `reactCompilerPreset()`. Never use `useMemo`, `useCallback`, or `React.memo` — the compiler handles optimization automatically.

### TypeScript

- Strict mode enabled (`noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly`)
- Use `interface` for object shapes/props, `type` for unions/intersections
- Never use `any` (use `unknown` if needed)
- Prefix unused params with `_`

### Logging

Use `logger` from `@/services/logger.service` instead of `console.log`. ESLint enforces `no-console`.

### Zustand Stores

Use `devtools` + `persist` + `immer` middleware stack. Separate `Actions` interface with actions nested under an `actions` key. Use `partialize` to control what gets persisted. Export selector hooks (e.g., `useTheme`).

### Formatting (Prettier)

2 spaces, single quotes, no semicolons, 100 char line width, trailing commas (ES5), LF line endings.

### Icons

Use Hugeicons: `import { IconName } from '@hugeicons/core-free-icons'` and render with `<HugeiconsIcon icon={IconName} />`.

### UI Components

Built on Base UI (`@base-ui/react`) primitives, wrapped in shadcn/ui style. Located in `src/components/ui/`.

## Key Reference Files

- `src/main.tsx` — app entry point with providers (PostHog, Router, Tooltip)
- `src/pages/__root.tsx` — root route with theme switching and PostHog pageview tracking
- `src/pages/index.tsx` — landing page
- `src/components/features/landing/landing-page-layout.component.tsx` — marketing page wrapper
- `src/states/global.state.ts` — Zustand store pattern (theme)
- `src/observability/posthog.ts` — PostHog initialization
- `vite.config.ts` — Vite config with React Compiler, TanStack Router, Tailwind, SVG plugins
- `eslint.config.mjs` — ESLint flat config with filename enforcement rules
- `prettier.config.cjs` — Prettier config with import ordering

## Environment Variables

Key `VITE_*` variables (see `.env.example` for full list):

- `VITE_ENV` — environment (`development` / `production`)
- `VITE_PORT` — dev server port (default 5555 per `.env.example`)
- `VITE_WEBSITE_URL` / `VITE_APP_URL` / `VITE_API_BASE_URL` — service URLs
- `VITE_POSTHOG_API_KEY` / `VITE_POSTHOG_HOST` — PostHog analytics config
- `VITE_ENABLE_LOGS` — toggle logger output
- `VITE_ENABLE_TS_ROUTER_DEVTOOLS` — TanStack Router devtools toggle
