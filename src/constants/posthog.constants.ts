// src/constants/posthog.constants.ts
//
// PostHog configuration constants for the frontend application.
// These constants control analytics behavior and service identification.

/**
 * PostHog project API key for analytics
 * Must be specified in environment variables via VITE_POSTHOG_API_KEY
 *
 * @export
 * @constant {string} POSTHOG_API_KEY
 * @example
 * VITE_POSTHOG_API_KEY=phc_xxxxxxxxxx
 */
export const POSTHOG_API_KEY = import.meta.env.VITE_POSTHOG_API_KEY as string

/**
 * PostHog host URL
 * Defaults to US cloud if not specified
 *
 * @export
 * @constant {string} POSTHOG_HOST
 * @example
 * VITE_POSTHOG_HOST=https://us.i.posthog.com
 */
export const POSTHOG_HOST =
  (import.meta.env.VITE_POSTHOG_HOST as string) || 'https://us.i.posthog.com'

/**
 * Enable PostHog debug logging
 * Useful during development to verify events are being sent
 *
 * @export
 * @constant {boolean} POSTHOG_DEBUG
 * @example
 * VITE_POSTHOG_DEBUG=true
 */
export const POSTHOG_DEBUG = import.meta.env.VITE_POSTHOG_DEBUG === 'true'

/**
 * Route PostHog requests through the backend reverse proxy
 * When enabled, analytics traffic is sent via the core backend to avoid ad-blockers
 *
 * @export
 * @constant {boolean} POSTHOG_REVERSE_PROXY
 * @example
 * VITE_POSTHOG_REVERSE_PROXY=true
 */
export const POSTHOG_REVERSE_PROXY = import.meta.env.VITE_POSTHOG_REVERSE_PROXY === 'true'

/**
 * Whether PostHog is enabled
 * Automatically disabled when the API key is not configured
 *
 * @export
 * @constant {boolean} POSTHOG_ENABLED
 */
export const POSTHOG_ENABLED = !!POSTHOG_API_KEY

/**
 * Aggregate configuration object for convenience
 *
 * @export
 * @constant {object} POSTHOG_CONFIG
 */
export const POSTHOG_CONFIG = {
  ENABLED: POSTHOG_ENABLED,
  API_KEY: POSTHOG_API_KEY,
  HOST: POSTHOG_HOST,
  DEBUG: POSTHOG_DEBUG,
  REVERSE_PROXY: POSTHOG_REVERSE_PROXY,
} as const
