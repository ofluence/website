# Ofluence Website

Public marketing site for the Ofluence influencer marketing platform. Includes landing, about, pricing, contact, and legal pages.

## Technologies

### Core

- **React 19** - UI framework with React Compiler for automatic optimization
- **TypeScript** - Type-safe programming (strict mode)
- **Vite** - Build tool and development server

### Routing

- **TanStack Router** - File-based routing with type safety and auto code-splitting

### UI & Styling

- **shadcn/ui** - Modern UI component system
- **Base UI** - Accessible headless UI primitives
- **Tailwind CSS 4** - Utility-first styling (CSS-based config, no `tailwind.config.js`)
- **Motion** - Animation library
- **Hugeicons React** - Icon system

### State

- **Zustand** - Client state management (theme only)

### Analytics

- **PostHog** - Product analytics with session recording

### Development Tools

- **ESLint** - Code linting with filename enforcement
- **Prettier** - Code formatting with import sorting
- **Husky** - Git hooks
- **Commitizen** - Conventional commits

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- pnpm

### Installation

```bash
pnpm install
```

### Environment Setup

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Key variables:

| Variable | Purpose |
|----------|---------|
| `VITE_ENV` | Environment (`development` / `production`) |
| `VITE_PORT` | Dev server port |
| `VITE_WEBSITE_URL` | This site's URL |
| `VITE_APP_URL` | Pulse dashboard URL |
| `VITE_API_BASE_URL` | Core API URL |
| `VITE_POSTHOG_API_KEY` | PostHog project key |
| `VITE_POSTHOG_HOST` | PostHog ingest endpoint |
| `VITE_ENABLE_LOGS` | Toggle logger output |

### Development

```bash
pnpm dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | TypeScript check + Vite production build |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Run ESLint with auto-fix |
| `pnpm format` | Format code with Prettier |
| `pnpm format:check` | Check formatting without writing |
| `pnpm commit` | Create conventional commit |

## Project Structure

```
src/
├── main.tsx                # Entry point
├── assets/                 # Static assets (SVGs, images)
├── components/             # Reusable components
│   ├── errors/            # Error/fallback components
│   ├── features/          # Feature-specific components
│   │   ├── landing/       # Landing page sections (hero, pricing, CTA, etc.)
│   │   └── global/        # Shared components (SEO, theme toggle)
│   └── ui/                # shadcn/ui primitives
├── constants/             # App-wide constants
├── hooks/                 # Custom React hooks
├── observability/         # PostHog initialization
├── pages/                 # TanStack Router file-based routes
│   ├── __root.tsx         # Root layout
│   ├── index.tsx          # Landing page
│   ├── about.tsx          # About page
│   ├── pricing.tsx        # Pricing page
│   ├── contact.tsx        # Contact page
│   ├── solutions.tsx      # Solutions page
│   ├── use-cases.tsx      # Use cases page
│   ├── integrations.tsx   # Integrations page
│   ├── privacy-policy.tsx # Privacy policy
│   ├── terms-of-service.tsx
│   ├── cookie-policy.tsx
│   ├── gdpr.tsx
│   └── $.tsx              # Catch-all 404
├── services/              # Service layer (logger)
├── states/                # Zustand stores (*.state.ts)
├── styles/                # Global styles
├── types/                 # TypeScript declarations
└── utils/                 # Utility functions
```

## Deployment

Built as a static SPA served by nginx with gzip compression and client-side routing fallback. See `nginx/nginx.conf`.

## Related Repos

| Repo | Purpose |
|------|---------|
| [core](../core) | Backend API (Express, PostgreSQL, multi-tenant) |
| [pulse](../pulse) | React dashboard (auth, multi-tenant, analytics) |
| [felix](../felix) | Creator discovery & enrichment microservice |
| [infra](../infra) | Kubernetes + Skaffold orchestration |

## License

Private - All rights reserved by Ofluence PVT LTD
