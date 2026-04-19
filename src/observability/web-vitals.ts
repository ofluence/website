// src/observability/web-vitals.ts
//
// Wires the `web-vitals` library into PostHog so CWV (LCP/INP/CLS/FCP/TTFB)
// land as `web_vital` events keyed by route. Produces real-user metrics so we
// can measure performance changes over time per page.

import posthog from 'posthog-js'
import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from 'web-vitals'

function send(metric: Metric) {
  if (!posthog.__loaded) return
  posthog.capture('web_vital', {
    metric: metric.name,
    value: metric.value,
    rating: metric.rating,
    id: metric.id,
    navigation_type: metric.navigationType,
    $current_url: window.location.href,
  })
}

/**
 * Register web-vitals listeners. Safe to call once from a client-only effect;
 * library itself deduplicates internally.
 */
export function reportWebVitals() {
  if (typeof window === 'undefined') return
  onCLS(send)
  onINP(send)
  onLCP(send)
  onFCP(send)
  onTTFB(send)
}
