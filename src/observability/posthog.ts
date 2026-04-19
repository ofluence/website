// src/observability/posthog.ts
//
// PostHog analytics setup. Deferred to idle time so analytics never blocks
// first paint / first interaction. Session replay is gated behind an explicit
// call (see SESSION_RECORDING_DELAY_MS) — replay is the single biggest INP
// contributor in the posthog-js bundle.

import posthog from 'posthog-js'

import { logger } from '@/services/logger.service'

import { POSTHOG_CONFIG } from '@/constants/posthog.constants'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string
const API_PREFIX = import.meta.env.VITE_API_PREFIX as string

// Delay before starting session recording after init. Keeps the replay
// bundle off the critical path on short/bounced visits.
const SESSION_RECORDING_DELAY_MS = 10_000

function maskSensitiveInputs(text: string, element?: HTMLElement): string {
  if (!element) return text

  const inputElement = element as HTMLInputElement
  const inputType = inputElement.type?.toLowerCase()
  const inputName = (inputElement.name || inputElement.id || '').toLowerCase()

  if (
    inputType === 'password' ||
    inputName.includes('password') ||
    inputName.includes('secret') ||
    inputName.includes('token')
  ) {
    return '***'
  }

  return text
}

let initialized = false

function runInit() {
  if (initialized) return
  initialized = true

  const apiHost = POSTHOG_CONFIG.REVERSE_PROXY
    ? `${API_BASE_URL}${API_PREFIX}/collect`
    : POSTHOG_CONFIG.HOST

  posthog.init(POSTHOG_CONFIG.API_KEY, {
    api_host: apiHost,
    ui_host: POSTHOG_CONFIG.HOST,

    // Autocapture is expensive on INP and low-signal on a marketing site.
    // We emit pageviews manually from the router effect.
    autocapture: false,

    capture_pageview: false,
    capture_pageleave: 'if_capture_pageview',

    persistence: 'localStorage+cookie',

    // Start with replay off; opt-in after SESSION_RECORDING_DELAY_MS so short
    // visits don't pay the replay cost.
    disable_session_recording: true,
    session_recording: {
      maskAllInputs: false,
      maskInputFn: maskSensitiveInputs,
    },

    loaded: (ph) => {
      if (POSTHOG_CONFIG.DEBUG) ph.debug(true)
      logger.info('[PostHog] SDK loaded', { host: apiHost })
      setTimeout(() => ph.startSessionRecording(), SESSION_RECORDING_DELAY_MS)
    },
  })

  logger.info(
    `[PostHog] Initialized (debug=${POSTHOG_CONFIG.DEBUG}, proxy=${POSTHOG_CONFIG.REVERSE_PROXY})`
  )
}

/**
 * Defer PostHog initialization until the browser is idle. Call once from a
 * client-only effect in the root component. SSR-safe: no-op on the server.
 */
export function initPostHogDeferred() {
  if (typeof window === 'undefined' || !POSTHOG_CONFIG.ENABLED) {
    if (!POSTHOG_CONFIG.ENABLED && typeof window !== 'undefined') {
      logger.info('[PostHog] Disabled — no API key configured')
    }
    return
  }

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(runInit, { timeout: 3000 })
  } else {
    setTimeout(runInit, 1)
  }
}
