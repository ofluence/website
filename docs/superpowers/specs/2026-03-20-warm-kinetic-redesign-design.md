# Ofluence Website Redesign — "Warm Kinetic"

**Date:** 2026-03-20
**Status:** Approved
**Direction:** Full site redesign — new visual identity, page restructuring, interactive components

## Context

The current Ofluence marketing site uses an editorial magazine aesthetic (Instrument Serif, vermillion accent, alternating L/R layouts). While well-crafted, it reads as generic/templated and doesn't reflect the brand's evolved positioning as a bold, energetic platform for brands, agencies, and creators. Competitors (modash.io) have raised the design bar. Conversion needs improvement — the current information hierarchy and CTA placement aren't optimized.

The redesign shifts to a "Warm Kinetic" identity: modern, dynamic, and approachable for all three audience segments.

## Design System

### Typography

| Role | Font | Weights | Details |
|------|------|---------|---------|
| Display/Headlines | **Sora** | 800 (hero), 700 (section), 600 (subsection) | Geometric sans-serif with wide letterforms. Letter-spacing: -2.5px hero, -1.5px section, -0.5px subsection |
| Body/UI | **Geist Sans** | 400, 450, 500 | Clean, precise. Used by Linear for body text. |
| Overline | Geist Sans | 600 | 12px, uppercase, letter-spacing: 2px, color: accent orange |

**Type Scale:**
- Hero: `clamp(36px, 6vw, 64px)`, Sora 800, -2.5px tracking
- Section: `clamp(28px, 4vw, 44px)`, Sora 700, -1.5px tracking
- Subsection: `clamp(20px, 3vw, 28px)`, Sora 600, -0.5px tracking
- Body: 16-17px, Geist 400, line-height 1.6
- Small: 13-14px, Geist 400/450

**Font Loading:** Install via `@fontsource/sora` and `@fontsource/geist-sans` (npm packages, self-hosted, no external requests). Remove `@fontsource/instrument-serif` and `@fontsource-variable/outfit`.

**Replaces:** Instrument Serif (display) + Outfit (body)

### Color Palette

**Light Mode (Primary):**
| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `#fafaf8` | Page background (warm white) |
| `--foreground` | `#1a1a1a` | Primary text (near-black) |
| `--accent` | `#f97316` | CTAs, badges, overlines, active states |
| `--surface` | `#f5f5f0` | Card backgrounds, containers (warm gray) |
| `--muted` | `#78716c` | Secondary text (stone) |
| `--border` | `#e7e5e4` | Borders, dividers |

**Dark Mode:**
| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `#0c0c0c` | Page background (true dark) |
| `--foreground` | `#f5f5f0` | Primary text (warm white) |
| `--accent` | `#fb923c` | Lighter orange for a11y on dark |
| `--surface` | `#161616` | Elevated surfaces |
| `--muted` | `#a8a29e` | Secondary text (stone light) |
| `--border` | `#1f1f1f` | Borders |

**Gradient Policy:** Gradients are used ONLY as atmospheric radial glows at ≤6% opacity. They provide subtle depth (like a warm lamp effect) without becoming decorative. One glow per section maximum. Never used on buttons, badges, text, or borders.

**Replaces:** OKLCH-based vermillion/navy system

### Spacing

- Section padding: `py-20` (5rem) / `py-28` (7rem) — balanced, not as spacious as current py-40
- Grid gaps: `gap-4` to `gap-6` within sections, `gap-8` to `gap-12` between groups
- Content max-width: `max-w-7xl` (1280px)
- Inner container max-width: `max-w-3xl` to `max-w-5xl` depending on content

### Border Radius

| Element | Radius |
|---------|--------|
| Page containers | 20px |
| Cards | 16px |
| Buttons | 10px |
| Inputs | 8px |
| Icons/small elements | 4px |
| Badges/tags | pill (999px) |

**Replaces:** 4px base radius (editorial sharp)

### Shadows

- Soft: `0 2px 8px rgba(0,0,0,0.04)` — cards at rest
- Medium: `0 4px 16px rgba(0,0,0,0.06)` — cards on hover
- Large: `0 8px 32px rgba(0,0,0,0.08)` — product screenshots, modals

### Glass Effect (Navbar)

- Backdrop blur: 16px, saturate 1.1x
- Background: warm white at 85% opacity (light) / #0c0c0c at 85% opacity (dark)
- Bottom border: 1px solid border color

## Motion Design

**Philosophy:** "Purposeful Play" — every animation responds to user action or marks a meaningful transition. Spring physics (not bezier) for a natural, alive feel.

### Spring Configuration

Default spring: `{ stiffness: 100, damping: 15 }`
Snappy spring (buttons): `{ stiffness: 200, damping: 20 }`

### Entry Animations

| Element | Animation | Timing |
|---------|-----------|--------|
| Hero (headline, subtext, CTAs) | Fade + rise (20px) | Staggered at 100ms, spring |
| Scroll sections | Fade + rise (20px) | On viewport entry, once, -80px margin |
| Card grids | Staggered reveal | Each card 80ms after previous, spring |
| Number counters | Spring from 0 to value | On scroll into view, once |

### Interaction States

| Element | Hover State |
|---------|------------|
| Cards | translateY(-4px) + shadow upgrade + subtle border glow |
| Buttons | scale(1.02) + shadow expansion |
| Links | Underline slides in from left (clip-path), color shifts to accent |
| Tabs | Indicator slides (layout animation), content cross-fades |

### Ambient Motion

- **Hero:** Soft radial gradient glow that slowly drifts (CSS animation, 20s loop, ≤6% opacity)
- **Feature sections:** Static dot grid background pattern for texture
- **Product screenshots:** Accent-colored glow behind screenshots (blurred, semi-transparent)

### Performance

- Only animate `transform` and `opacity` (GPU-composited)
- Respect `prefers-reduced-motion`: instant transitions, no fades
- Scroll-triggered animations fire once, never replay
- Library: Motion/React (already in project)

## Site Architecture

### Pages

| Page | Route | Status | Notes |
|------|-------|--------|-------|
| Home | `/` | **Redesign** | Full visual + structural overhaul (9 sections) |
| Pricing | `/pricing` | **Visual overhaul** | Same tier structure, new design system |
| Solutions | `/solutions` | **NEW** | Merges Use Cases + Integrations |
| Contact | `/contact` | **Visual overhaul** | Same content, new design system |
| Legal (Privacy, Terms, Cookies, GDPR) | `/privacy-policy`, etc. | **Spacing fix** | Align to new spacing/typography system |
| ~~About~~ | ~~`/about`~~ | **Removed** | Mission/company info moves to footer |
| ~~Use Cases~~ | ~~`/use-cases`~~ | **Removed** | Merged into Solutions |
| ~~Integrations~~ | ~~`/integrations`~~ | **Removed** | Merged into Solutions |

### Landing Page Sections (top → bottom)

**1. Navbar**
- Sticky with glass effect
- Larger Ofluence logo (brand mark + wordmark)
- Links: Features, Solutions, Pricing, Contact
- CTA button: "Get started"
- Theme toggle

**2. Hero**
- Full-bleed rounded container (surface background)
- Centered layout: overline badge → headline → subtext → dual CTAs
- Below CTAs: interactive product mockup with clickable tabs (Discovery / Campaigns / Analytics)
- Fade-in on load with staggered reveal (100ms between elements)
- Subtle radial glow behind mockup (≤6% opacity)

**3. Social Proof Bar**
- Compact horizontal row of 3 key metrics
- Spring-animated counters on scroll
- Minimal styling — numbers are the star

**4. Features — Bento Grid**
- Overline: "Features"
- Section headline
- Asymmetric bento grid: 2 large cards (span 2 cols) + 2 standard cards
- 4 capabilities: Discover, Manage, Measure, Pay
- Each card: icon + title + description + interactive mini-mockup
- Hover reveals more detail / activates the mockup
- Visual content: product screenshots and illustrations mixed
- Staggered card reveal on scroll

**5. How It Works**
- Tabbed section: Brands / Agencies / Creators
- Each tab: 3-4 numbered steps with icons and descriptions
- Tab indicator slides smoothly (layout animation)
- Content cross-fades between tabs

**6. Industry Pain Points**
- Merges current "editorial statement" + "problem statement"
- Bold headline (e.g., "The $24B problem no one's solving right")
- 3 pain point stat cards with animated counters
- Shorter and more impactful than the two current sections

**7. Pricing Preview**
- Compact tier cards (not full comparison table)
- Shows: tier name, price, key differentiator, CTA
- "See full pricing →" link to /pricing
- Billing toggle (monthly/annual)

**8. Final CTA**
- Full-bleed container (mirrors hero style)
- Bold headline + subtext + dual CTAs
- E.g., "Ready to grow? Start your free trial."

**9. Footer**
- Dark section background
- Includes About content: brief mission statement, key company info
- Newsletter signup (email input — cosmetic placeholder for now, no backend integration)
- Link columns: Product, Solutions, Company, Legal
- Social icons (Instagram, YouTube, LinkedIn)
- Compliance badges, trust indicators
- Theme toggle, back-to-top button, copyright

### Solutions Page (NEW — `/solutions`)

Combines Use Cases and Integrations into a single page:
- **Hero:** Section headline + subtext ("Find the right fit for your team")
- **Audience Tabs:** Brands / Agencies / Creators — tabbed with smooth indicator
  - Each tab: hero value proposition, 3-4 key features as cards, relevant integrations grid
  - Content sourced from current use-cases constants, restructured into card format
- **Integration Ecosystem:** Below the tabs, a grid of all integrations grouped by category (Social Platforms, Analytics, Payment, CRM). Each integration: icon + name + one-line description
- **CTA:** "Ready to get started?" section with dual CTAs
- Layout follows the same design system (bento-style cards, 16px radius, spring animations)

### Removed Page Redirects

- `/about` → redirect to `/` (home page)
- `/use-cases` → redirect to `/solutions`
- `/integrations` → redirect to `/solutions`
- Implement via TanStack Router redirect in route definitions, not nginx

### Legal Pages

- Apply new typography (Sora headings, Geist body)
- Align spacing to new system (py-20/py-28 sections)
- Consistent padding and margins across all legal pages
- Same legal-page-layout wrapper, updated styles

## Visual Content Strategy

| Context | Content Type | Source |
|---------|-------------|--------|
| Hero mockup, feature cards | Product screenshots | Pulse dashboard (interactive mockups) |
| Social proof, brand sections | Real photography | Stock (Unsplash/Pexels) initially, brand photos later |
| Conceptual sections, how-it-works | Illustrations | Custom vector style, swappable |

All visual content is designed to be swappable — start with the mix above and refine with real brand assets over time.

## Component Changes

### New Components
- `BentoGrid` / `BentoCard` — asymmetric grid layout for features
- `InteractiveMockup` — tabbed product showcase (hero + features)
- `SpringCounter` — spring-animated number counter (replaces current EditorialCounter)

### Updated Components
- `Button` — new radius (10px), updated hover (scale + shadow), new accent color
- `Badge` — new accent variants using #f97316 orange system
- `Card` — new radius (16px), updated hover (lift + shadow + glow)
- `AnimatedContainer` — spring physics replacing bezier easing
- `Tabs` — layout-animated indicator, cross-fade content

### Removed Components
- `EditorialReveal` → replaced by spring-based FadeInView
- `EditorialRule` → no longer used (editorial horizontal lines)
- `EditorialStaggerContainer/Item` → replaced by spring-based stagger

### Preserved
- `AnimatedPage` (page transitions)
- Theme toggle system
- PostHog analytics integration
- SEO component

## Files to Modify

### Core Design System
- `src/styles/global.styles.css` — complete rewrite: new CSS variables, typography, spacing, radius, shadows
- `src/utils/motion.utils.ts` — replace bezier presets with spring configs

### UI Primitives
- `src/components/ui/button.tsx` — new radius, hover, accent colors
- `src/components/ui/badge.tsx` — new orange-based variants
- `src/components/ui/card.tsx` — new radius, hover states
- `src/components/ui/animated-container.tsx` — spring physics, remove editorial components
- `src/components/ui/tabs.tsx` — layout animation for indicator

### Landing Components (all in `src/components/features/landing/`)
- `landing-navbar.component.tsx` — larger logo, updated nav links
- `landing-hero.component.tsx` — full-bleed container, centered, interactive mockup
- `landing-social-proof.component.tsx` — compact metrics bar
- `landing-features.component.tsx` — bento grid with interactive cards
- `landing-how-it-works.component.tsx` — updated tabs, cross-fade
- `landing-cta.component.tsx` — full-bleed container style
- `landing-footer.component.tsx` — expanded with About content
- `landing-pricing.component.tsx` — compact preview cards

### New Components
- `src/components/ui/bento-grid.tsx` — bento layout primitives
- `src/components/features/landing/product-preview/interactive-mockup.component.tsx` — tabbed product showcase
- `src/components/features/landing/landing-pain-points.component.tsx` — merged industry stats section

### Removed Components
- `landing-editorial-statement.component.tsx` — merged into pain points
- `landing-problem-statement.component.tsx` — merged into pain points

### Pages
- `src/pages/index.tsx` — updated section composition
- `src/pages/solutions.tsx` — NEW: merged use cases + integrations
- `src/pages/pricing.tsx` — visual overhaul
- `src/pages/contact.tsx` — visual overhaul
- Remove `src/pages/about.tsx`
- Remove `src/pages/use-cases.tsx`
- Remove `src/pages/integrations.tsx`
- Legal pages — spacing alignment only

### Constants
- `src/constants/landing.constants.ts` — updated for new section structure
- `src/constants/locale/default.constants.ts` — updated copy
- `src/constants/locale/india.constants.ts` — updated copy

### Layout
- `src/components/features/landing/landing-page-layout.component.tsx` — updated for new navbar/footer
- `src/components/features/landing/legal-page-layout.component.tsx` — spacing alignment

## Implementation Order

1. **Design system foundations** — CSS variables, typography, spacing, radius, shadows in global.styles.css
2. **Motion system** — Spring configs in motion.utils.ts, updated animated-container.tsx
3. **UI primitives** — Button, badge, card, tabs updates
4. **New components** — BentoGrid, InteractiveMockup, SpringCounter
5. **Landing sections** — Navbar → Hero → Social Proof → Features → How It Works → Pain Points → Pricing Preview → CTA → Footer
6. **Pages** — Landing page composition, Solutions page, remove About/Use Cases/Integrations
7. **Other pages** — Pricing, Contact visual overhaul
8. **Legal pages** — Spacing alignment
9. **Polish** — Cross-browser testing, dark mode verification, reduced-motion, performance audit

## Verification

1. `pnpm build` — TypeScript check + production build succeeds
2. `pnpm dev` — visual inspection of all pages in both light and dark modes
3. Check `prefers-reduced-motion` behavior — all animations instant
4. Verify interactive mockup tabs work and cross-fade
5. Test bento grid responsiveness at mobile/tablet/desktop breakpoints
6. Verify legal pages have consistent spacing
7. Confirm removed pages (about, use-cases, integrations) redirect or 404 correctly
8. Lighthouse performance audit — ensure motion doesn't degrade scores
