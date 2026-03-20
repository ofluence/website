# Ofluence Pulse

A modern React-based dashboard for the Ofluence influencer marketing platform, built with TypeScript and Vite.

## Technologies Used

### Core

- **React 19.2** - UI framework with React Compiler for automatic optimization
- **TypeScript** - Type-safe programming (strict mode)
- **Vite** - Build tool and development server

### State Management

- **Zustand** - Client state management (stores IDs only)
- **TanStack Query** - Server state management and data fetching
- **nuqs** - URL state management

### Routing & Forms

- **TanStack Router** - File-based routing with type safety
- **TanStack Form** - Form handling
- **Zod** - Schema validation

### UI & Styling

- **shadcn/ui** - Modern UI component system
- **Base UI** - Accessible headless UI components
- **Tailwind CSS 4** - Utility-first styling
- **Motion** - Animation library
- **Hugeicons React** - Icon system

### Data Visualization

- **Recharts** - Charting library

### HTTP & API

- **Axios** - HTTP client

### Observability & Analytics

- **OpenTelemetry** - Distributed tracing and instrumentation
- **PostHog** - Product analytics

### Development Tools

- **Immer** - Immutable state updates
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- pnpm, npm, or yarn

### Installation

1. Clone the repository
2. Install dependencies using your preferred package manager:

```cmd
pnpm install
# or
npm install
# or
yarn
```

### Environment Setup

Create a `.env.development` file in the root directory with the following variables:

```env
VITE_ENV=development
VITE_CLIENT_NAME=Ofluence

VITE_PORT=6060
VITE_APP_URL=http://localhost:6060

VITE_API_BASE_URL=http://localhost:4040
VITE_API_PREFIX=/api/v1

VITE_AUTH_STORAGE_KEY=a:stig
VITE_AUTH_ENCRYPTION_KEY=your-secret-key

# Posthog Configuration
VITE_POSTHOG_API_KEY=phc_DNY2DOJwLSahi1vgmreguHCsHGAzEGyQ95nwvBVNC8n
VITE_POSTHOG_HOST=https://us.i.posthog.com
VITE_POSTHOG_DEBUG=true
VITE_POSTHOG_REVERSE_PROXY=false

# Tanstack Configuration
VITE_ENABLE_TS_ROUTER_DEVTOOLS=false
VITE_ENABLE_TS_QUERY_DEVTOOLS=false
```

### Development

Start the development server:

```cmd
pnpm dev
# or
npm run dev
# or
yarn dev
```

The development server will start at `http://localhost:6060`

### Available Scripts

- `dev` - Start development server
- `build` - Build for production
- `preview` - Preview production build
- `lint` - Run ESLint
- `lint:fix` - Run ESLint with auto-fix
- `prettier` - Format code

## Project Structure

```
src/
├── main.tsx                # Entry point
├── assets/                 # Static assets
├── components/             # Reusable components
│   ├── errors/            # Error handling components (boundaries, fallbacks)
│   ├── features/          # Feature-specific components
│   └── ui/                # shadcn/ui components (primitives)
├── constants/             # App-wide constants
├── endpoints/             # API endpoint definitions
├── hooks/                 # Custom React hooks
├── http/                  # HTTP client and interceptors
├── observability/         # OpenTelemetry tracing configuration
├── pages/                 # TanStack Router file-based routes
│   ├── __root.tsx        # Root layout
│   ├── _auth/            # Auth routes (login, register, etc.)
│   ├── _protected/       # Protected routes (dashboard, etc.)
│   └── ...
├── queries/               # TanStack Query definitions (*.queries.ts)
├── schemas/               # Zod validation schemas (*.schema.ts)
├── services/              # Service layer (logger, etc.)
├── states/                # Zustand stores (*.state.ts)
├── styles/                # Global styles
├── types/                 # TypeScript declarations (*.d.ts)
└── utils/                 # Utility functions (*.utils.ts)
```

### Architecture Overview

The project follows a modern React architecture with clear separation of concerns:

- **URL → Zustand → TanStack Query**: State flows from URL parameters (tenant) to Zustand (IDs only) to TanStack Query (full objects)
- **File-based routing**: Routes are defined in `pages/` directory following TanStack Router conventions
- **Server state in TanStack Query**: All API data is managed through TanStack Query
- **Client state in Zustand**: Only tenant identifiers and UI state
- **React 19 Compiler**: No manual memoization needed (`useMemo`, `useCallback`, `React.memo`)

For detailed architectural patterns, see [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) and [`AGENTS.md`](AGENTS.md).

## Contributing

Please ensure you format your code before committing:

```cmd
pnpm prettier
```

## License

Private - All rights reserved by Ofluence PVT LTD
