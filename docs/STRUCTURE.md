# Website Frontend Structure

This document provides a detailed overview of the Ofluence website structure.

## Overview

A **public marketing website** built with:

- **Build Tool**: Vite
- **Framework**: React 19 (with Compiler)
- **Router**: TanStack Router (file-based routing)
- **State**: Zustand (theme only)
- **UI**: shadcn/ui + Base UI + Tailwind CSS 4
- **Analytics**: PostHog
- **Package Manager**: pnpm

---

## Directory Tree

```
website/
├── .husky/                  # Git hooks
├── nginx/                   # Nginx deployment config
│   └── nginx.conf
├── public/                  # Static assets
│   └── favicons/            # Favicon files
├── docs/                    # Documentation
│   ├── ARCHITECTURE.md
│   └── STRUCTURE.md
├── src/                     # Main source code
│   ├── assets/              # SVG, images
│   ├── components/          # React components
│   │   ├── errors/          # Error handling components
│   │   ├── features/        # Feature-specific components
│   │   │   ├── global/      # Theme toggle, suspense fallback
│   │   │   └── landing/     # Landing page sections
│   │   └── ui/              # shadcn/ui primitives
│   ├── constants/           # App-wide constants
│   ├── hooks/               # Custom React hooks
│   ├── observability/       # PostHog initialization
│   ├── pages/               # File-based routes
│   ├── services/            # Logger service
│   ├── states/              # Zustand stores (theme)
│   ├── styles/              # Global CSS (Tailwind v4)
│   ├── types/               # TypeScript definitions
│   ├── utils/               # Utility functions
│   ├── main.tsx             # Entry point
│   └── routeTree.gen.ts     # Auto-generated routes (do not edit)
├── index.html               # HTML entry point
└── [config files]           # Various configs
```

---

## Root Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies, scripts, project metadata |
| `vite.config.ts` | Vite build config with React Compiler, TanStack Router, Tailwind, SVGR plugins |
| `tsconfig.json` | Base TypeScript configuration |
| `tsconfig.app.json` | App-specific TypeScript config (strict mode) |
| `tsconfig.node.json` | Node.js TypeScript config |
| `eslint.config.mjs` | ESLint flat config with filename enforcement |
| `prettier.config.cjs` | Code formatting and import ordering |
| `components.json` | shadcn/ui configuration |
| `.editorconfig` | Editor-agnostic formatting |
| `Dockerfile` | Container build instructions |
| `index.html` | HTML entry point for Vite |
| `CLAUDE.md` | Claude Code project instructions |

---

## Source Code (`src/`)

### Entry Points

**`src/main.tsx`** — Application entry point:

- Initializes PostHog analytics (before React)
- Sets up QueryClient (required by router context)
- Creates router instance with default preloading
- Wraps app in PostHog, QueryClient, Tooltip providers

**`src/routeTree.gen.ts`** — Auto-generated route tree (do not edit manually).

---

### `src/pages/`

File-based routing with TanStack Router. All pages are public.

```
pages/
├── __root.tsx               # Root layout (theme, PostHog pageview tracking, toaster)
├── index.tsx                # Landing page
├── about.tsx                # About page
├── pricing.tsx              # Pricing page
├── contact.tsx              # Contact page
├── privacy-policy.tsx       # Privacy policy
├── terms-of-service.tsx     # Terms of service
├── cookie-policy.tsx        # Cookie policy
├── gdpr.tsx                 # GDPR compliance
└── $.tsx                    # Catch-all 404 route
```

**Routing Patterns**:

- `__root.tsx` — Root layout, wraps entire app (theme switching, PostHog, toaster)
- `$.tsx` — Catch-all route for 404 pages

---

### `src/components/`

React components organized by purpose.

```
components/
├── errors/                          # Error handling
│   ├── error-boundary.component.tsx # React error boundary
│   ├── not-found.component.tsx      # 404 page
│   ├── access-denied.component.tsx  # 403 page
│   ├── resource-not-found.component.tsx
│   └── default-pending.component.tsx
├── features/                        # Feature-specific components
│   ├── global/                      # App-wide components
│   │   ├── theme-toggle.component.tsx
│   │   ├── suspense-fallback.component.tsx
│   │   └── root-hydrate-fallback.component.tsx
│   └── landing/                     # Landing page sections
│       ├── landing-navbar.component.tsx
│       ├── landing-hero.component.tsx
│       ├── landing-social-proof.component.tsx
│       ├── landing-features.component.tsx
│       ├── landing-how-it-works.component.tsx
│       ├── landing-product-preview.component.tsx
│       ├── landing-pricing.component.tsx
│       ├── landing-cta.component.tsx
│       ├── landing-footer.component.tsx
│       ├── landing-page-layout.component.tsx
│       └── legal-page-layout.component.tsx
└── ui/                              # shadcn/ui primitives (Base UI)
    ├── button.tsx
    ├── card.tsx
    ├── dialog.tsx
    ├── field.tsx
    ├── tooltip.tsx
    └── ... (many more)
```

**Component Types**:

| Location | Naming | Purpose |
|----------|--------|---------|
| `errors/` | `*.component.tsx` | Error boundaries and error pages |
| `features/` | `*.component.tsx` | Business/feature components |
| `ui/` | `*.tsx` (no suffix) | Reusable UI primitives (shadcn) |

---

### `src/states/`

Zustand store for client state.

```
states/
└── global.state.ts          # Theme state (light/dark/system)
```

Uses `devtools` + `persist` + `immer` middleware. Exports selector hooks: `useTheme()`, `useGlobalActions()`.

---

### `src/hooks/`

Custom React hooks.

```
hooks/
├── use-animated-counter.ts         # Animated number counter
├── use-mobile.ts                   # Mobile viewport detection
├── use-on-window-resize.ts         # Window resize handler
├── use-scroll-to-section.ts        # Smooth scroll to page sections
├── use-system-theme-detector.ts    # System theme detection
└── use-theme-switcher.tsx          # Theme toggle functionality
```

---

### `src/utils/`

Utility functions.

```
utils/
├── global.utils.ts          # General utilities
├── motion.utils.ts          # Animation/motion helpers
└── string.utils.ts          # String manipulation
```

---

### `src/constants/`

App-wide constants.

```
constants/
├── landing.constants.ts     # Landing page content data
├── posthog.constants.ts     # PostHog analytics config
└── testimonial.constants.ts # Testimonial content
```

---

### `src/observability/`

Analytics setup.

```
observability/
└── posthog.ts               # PostHog initialization with session recording
```

---

### `src/services/`

Service layer.

```
services/
└── logger.service.ts        # Logging service (replaces console.log)
```

---

### `src/types/`

TypeScript type definitions.

```
types/
├── global.d.ts              # Global type declarations
├── svg.d.ts                 # SVG module declarations
└── vite-env.d.ts            # Vite environment types
```

---

### `src/assets/`

Static assets (SVGs, images) imported in code.

---

### `src/styles/`

```
styles/
└── global.styles.css        # Tailwind v4 directives, CSS variables (OKLch color space)
```

---

## File Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Page | `{name}.tsx` | `pricing.tsx` |
| Feature component | `{name}.component.tsx` | `landing-hero.component.tsx` |
| UI component | `{name}.tsx` | `button.tsx` |
| State | `{domain}.state.ts` | `global.state.ts` |
| Hook | `use-{name}.ts` | `use-mobile.ts` |
| Utility | `{name}.utils.ts` | `motion.utils.ts` |
| Constants | `{name}.constants.ts` | `landing.constants.ts` |
| Service | `{name}.service.ts` | `logger.service.ts` |
| Types | `{domain}.d.ts` or `{domain}.types.ts` | `svg.d.ts` |
