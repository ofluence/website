# Architecture Guide

## Tech Stack

- **React 19.2** with React Compiler for automatic optimization
- **Vite** for build tooling with auto code-splitting
- **TanStack Router** for type-safe, file-based routing
- **Tailwind CSS 4** via `@tailwindcss/vite` (JIT, no config file — styles defined in CSS)
- **shadcn/ui** components built on **Base UI** (`@base-ui/react`) primitives
- **Zustand** for minimal client state (theme only)
- **PostHog** for analytics and session recording
- **OpenTelemetry** for browser tracing

## Component Hierarchy

```
Pages (src/pages/)
  └── Layout Components
        ├── landing-page-layout.component.tsx  (navbar + content + footer)
        └── legal-page-layout.component.tsx    (navbar + legal content + footer)
              └── Feature Components (src/components/features/)
                    └── UI Primitives (src/components/ui/)
```

### Pages

All pages are public — no authentication or protected routes. TanStack Router handles file-based routing with automatic code-splitting.

| Route | Page | Description |
|-------|------|-------------|
| `/` | `index.tsx` | Landing page with hero, features, social proof, pricing, CTA |
| `/about` | `about.tsx` | About Ofluence |
| `/pricing` | `pricing.tsx` | Pricing plans |
| `/contact` | `contact.tsx` | Contact form |
| `/privacy-policy` | `privacy-policy.tsx` | Privacy policy |
| `/terms-of-service` | `terms-of-service.tsx` | Terms of service |
| `/cookie-policy` | `cookie-policy.tsx` | Cookie policy |
| `/gdpr` | `gdpr.tsx` | GDPR compliance |
| `*` | `$.tsx` | Catch-all 404 |

### Landing Page Components

The landing page (`index.tsx`) is composed of feature components in `src/components/features/landing/`:

1. `landing-navbar.component.tsx` — Navigation bar
2. `landing-hero.component.tsx` — Hero section
3. `landing-social-proof.component.tsx` — Testimonials and social proof
4. `landing-features.component.tsx` — Feature highlights
5. `landing-how-it-works.component.tsx` — Step-by-step flow
6. `landing-product-preview.component.tsx` — Product demo/preview
7. `landing-pricing.component.tsx` — Pricing table
8. `landing-cta.component.tsx` — Call to action
9. `landing-footer.component.tsx` — Footer

### Global Components

`src/components/features/global/`:

- `theme-toggle.component.tsx` — Dark/light/system theme switcher
- `suspense-fallback.component.tsx` — Loading fallback for Suspense boundaries
- `root-hydrate-fallback.component.tsx` — Initial hydration fallback

## State Management

Minimal — only theme state exists:

```
Zustand (global.state.ts)
  └── theme: 'light' | 'dark' | 'system'
```

The Zustand store uses `devtools` + `persist` + `immer` middleware. Theme preference is persisted to localStorage. The `useThemeSwitcher` hook in `__root.tsx` applies the theme on every route.

No server state management — TanStack Query is included as a dependency (required by TanStack Router context) but has no active queries.

## Analytics & Observability

### PostHog

- Initialized before React renders (`src/observability/posthog.ts`)
- SPA pageview tracking on route changes (`src/pages/__root.tsx`)
- Session recording with sensitive field masking
- Config in `src/constants/posthog.constants.ts`

### OpenTelemetry

Browser tracing is configured but primarily useful when running with the full Ofluence stack via the `infra` repo's Kubernetes setup (OTEL Collector → Tempo → Grafana).

## Build & Deployment

### Vite Configuration

Key plugins in `vite.config.ts`:
1. **TanStack Router** — file-based routing from `./src/pages`
2. **React** — via `@vitejs/plugin-react`
3. **Babel** — React Compiler via `@rolldown/plugin-babel` + `reactCompilerPreset()`
4. **SVGR** — SVGs as React components
5. **Tailwind CSS** — via `@tailwindcss/vite`

Dev server proxies `/api` to `VITE_API_BASE_URL` (for local development with the core backend).

### nginx

Production deployment uses nginx (`nginx/nginx.conf`):
- Static assets served from `/pulse/` directory (Vite's `assetsDir` config)
- Client-side routing fallback to `/index.html`
- Gzip compression enabled

## React 19 + React Compiler

The React Compiler is enabled via Babel preset. It automatically memoizes components and values. **Never use `useMemo`, `useCallback`, or `React.memo`** — the compiler handles this.

## Relationship to Other Repos

This website repo is the public-facing marketing site. The full Ofluence platform includes:

- **pulse** — React dashboard with auth, multi-tenant support, TanStack Query, forms
- **core** — Express backend with PostgreSQL, JWT auth, multi-tenant API
- **infra** — Kubernetes + Skaffold orchestration for local development

The website shares the same tech foundation as Pulse (React 19, Vite, TanStack Router, Tailwind, shadcn/ui) but is stripped of all dashboard features (auth, tenants, API calls, forms, server state).
