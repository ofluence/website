# React Doctor Fixes — Design Spec

## Context

React Doctor scan scored **89/100** with 2 errors and 110 warnings. After investigation, most warnings are false positives (correct useEffect patterns, safe structured data injection) or apply to unused shadcn/ui components. This spec addresses the **3 real, actionable issues**.

## Scope

### Fix 1: React Compiler — `magic-card.tsx:70-71`

**Problem:** `useMotionTemplate` tagged template literals can't be optimized by React Compiler (`BuildHIR::lowerExpression` error).

**Fix:** Replace `useMotionTemplate` with `useTransform` using a callback that combines multiple motion values into a gradient string. This is compiler-compatible because it avoids tagged template syntax.

**File:** `src/components/ui/magic-card.tsx`

```tsx
// Before (lines 70-71):
const borderBackground = useMotionTemplate`radial-gradient(...)`
const spotlightBackground = useMotionTemplate`radial-gradient(...)`

// After:
const borderBackground = useTransform(
  [mouseX, mouseY],
  ([x, y]) =>
    `radial-gradient(${gradientSize}px circle at ${x}px ${y}px, ${gradientFrom}, ${gradientTo}, var(--color-border) 100%)`
)
const spotlightBackground = useTransform(
  [mouseX, mouseY],
  ([x, y]) =>
    `radial-gradient(${gradientSize}px circle at ${x}px ${y}px, ${gradientColor}, transparent 100%)`
)
```

**Import change:** Replace `useMotionTemplate` with `useTransform` in the import.

**Bonus cleanup:** Remove `useCallback` wrappers from `reset` (line 28) and `handlePointerMove` (line 33) — the project uses React Compiler which handles optimization automatically. Also remove the `useCallback` import from React.

---

### Fix 2: LazyMotion — ~30kb bundle savings

**Problem:** All 8 files import `motion` directly, bundling the full animation engine (~30kb).

**Fix:**
1. Add `LazyMotion` provider with `domMax` features in `src/main.tsx`
2. Replace `motion` → `m` in all 8 component files
3. Update `React.ComponentProps<typeof motion.div>` → `React.ComponentProps<typeof m.div>` in `animated-container.tsx` (7 occurrences)

**Why `domMax` not `domAnimation`:** `pricing.tsx` uses `layoutId="billing-indicator"` (lines 124, 139) for the billing toggle animation. `domAnimation` does **not** include layout animation support — only `domMax` does. Using `domAnimation` would silently break this animation. The bundle savings are still significant with `domMax`, just slightly less than `domAnimation`.

**Files to modify:**

| File | Change |
|------|--------|
| `src/main.tsx` | Wrap app in `<LazyMotion features={domMax}>`, import `LazyMotion`, `domMax` from `motion/react` |
| `src/components/ui/magic-card.tsx` | `motion` → `m` in import and JSX |
| `src/components/ui/animated-container.tsx` | `motion` → `m` in import, JSX, and 7x `ComponentProps<typeof motion.div>` → `ComponentProps<typeof m.div>` |
| `src/components/features/landing/landing-hero.component.tsx` | `motion` → `m` |
| `src/components/features/landing/landing-navbar.component.tsx` | `motion` → `m` |
| `src/components/features/landing/landing-features.component.tsx` | `motion` → `m` |
| `src/components/features/landing/landing-pain-points.component.tsx` | `motion` → `m` |
| `src/pages/pricing.tsx` | `motion` → `m` |
| `src/pages/contact.tsx` | `motion` → `m` |

---

### Fix 3: Footer social links — `landing-footer.component.tsx:98-124`

**Problem:** Three social media links (Instagram, YouTube, LinkedIn) use `href="#"` which is semantically incorrect and non-functional.

**Fix:** Replace `<a href="#">` with `<button>` elements since these are non-functional placeholders. Remove `target="_blank"` and `rel="noopener noreferrer"` attributes (not applicable to buttons). Keep the `aria-label` and styling.

**File:** `src/components/features/landing/landing-footer.component.tsx` (lines 98-124)

---

## What we're NOT fixing (and why)

| Warning | Reason to skip |
|---------|---------------|
| `useEffect` in `animated-container.tsx` and `__root.tsx` | Correctly implemented — PostHog tracking and IntersectionObserver are legitimate effects |
| Structured data component | Safe usage — JSON.stringify of internal data for JSON-LD schema |
| `preventDefault` on contact form | Standard SPA pattern, no server actions available |
| Accessibility warnings in `label.tsx`, `field.tsx`, `input-group.tsx`, `stepper.tsx`, `image.tsx` | All unused shadcn/ui components — not imported anywhere |
| 35 unused files / 54 unused exports | Unused shadcn/ui library components — available for future use |

## Verification

1. `pnpm build` — should succeed with no TypeScript errors
2. `pnpm dev` — verify:
   - Magic card hover effect still works on landing page
   - Pricing page billing toggle (`layoutId`) animates smoothly between Monthly/Annual
   - Footer social icons render correctly as buttons
3. Re-run `npx react-doctor@latest . --verbose --diff` — score should improve (0 errors)
4. Check browser DevTools network tab — motion chunk should be smaller with LazyMotion
