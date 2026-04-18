// src/observability/posthog.ts
//
// PostHog analytics setup for the React frontend.
// This module initializes posthog-js with autocapture, session recording,
// and optional reverse proxy support for ad-blocker evasion.
// Import this BEFORE the main application to enable analytics from first render.

import posthog from 'posthog-js'

import { logger } from '@/services/logger.service'

import { POSTHOG_CONFIG } from '@/constants/posthog.constants'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string
const API_PREFIX = import.meta.env.VITE_API_PREFIX as string

/**
 * Masks sensitive input fields in session recordings.
 * Passwords and secret fields are replaced; all other inputs pass through.
 */
function maskSensitiveInputs(text: string, element?: HTMLElement): string {
  if (!element) return text

  const inputElement = element as HTMLInputElement
  const inputType = inputElement.type?.toLowerCase()
  const inputName = (inputElement.name || inputElement.id || '').toLowerCase()

  // Mask password, secret, and token fields
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

// Initialize PostHog when enabled (guard against SSR/SSG environment)
if (typeof window !== 'undefined' && POSTHOG_CONFIG.ENABLED) {
  // Determine the API host: route through backend proxy or direct to PostHog cloud
  const apiHost = POSTHOG_CONFIG.REVERSE_PROXY
    ? `${API_BASE_URL}${API_PREFIX}/collect`
    : POSTHOG_CONFIG.HOST

  posthog.init(POSTHOG_CONFIG.API_KEY, {
    api_host: apiHost,
    // Always point UI host to PostHog cloud so links (e.g. toolbar, surveys) work correctly
    ui_host: POSTHOG_CONFIG.HOST,

    // Autocapture clicks, form submissions, and other interactions
    autocapture: true,

    // Disable automatic pageview capture — we track manually on SPA route changes
    // to get accurate page titles and URLs from TanStack Router
    capture_pageview: false,
    capture_pageleave: 'if_capture_pageview',

    // Persistence strategy
    persistence: 'localStorage+cookie',

    // Session recording configuration
    session_recording: {
      maskAllInputs: false,
      maskInputFn: maskSensitiveInputs,
    },

    // Post-init callback
    loaded: (ph) => {
      if (POSTHOG_CONFIG.DEBUG) {
        ph.debug(true)
      }
      logger.info('[PostHog] SDK loaded', { host: apiHost })
    },
  })

  logger.info(
    `[PostHog] Initialized (debug=${POSTHOG_CONFIG.DEBUG}, proxy=${POSTHOG_CONFIG.REVERSE_PROXY})`
  )
} else {
  logger.info('[PostHog] Disabled — no API key configured')
}
