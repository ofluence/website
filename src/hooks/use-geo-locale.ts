import { useEffect, useState } from 'react'

import { logger } from '@/services/logger.service'

const STORAGE_KEY = 'ofluence-geo'
const DEFAULT_COUNTRY = 'India'
const DEFAULT_COUNTRY_CODE = 'IN'

interface GeoData {
  country: string
  countryCode: string
}

interface GeoLocaleState extends GeoData {
  isLoading: boolean
}

function getCachedGeo(): GeoData | null {
  if (typeof window === 'undefined') return null
  try {
    const cached = localStorage.getItem(STORAGE_KEY)
    if (cached) {
      return JSON.parse(cached) as GeoData
    }
  } catch {
    // ignore parse errors
  }
  return null
}

function setCachedGeo(data: GeoData): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // ignore storage errors
  }
}

export function useGeoLocale(): GeoLocaleState {
  // Always seed with the SSR default so server output matches the client's
  // first render. Cached / fetched values are applied inside the effect, after
  // hydration, to avoid a mismatch.
  const [state, setState] = useState<GeoLocaleState>({
    country: DEFAULT_COUNTRY,
    countryCode: DEFAULT_COUNTRY_CODE,
    isLoading: true,
  })

  useEffect(() => {
    const cached = getCachedGeo()
    if (cached) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState({ ...cached, isLoading: false })
      return
    }

    const controller = new AbortController()

    fetch('https://ipapi.co/json/', { signal: controller.signal })
      .then((response) => response.json())
      .then((data: { country_name?: string; country_code?: string }) => {
        const geo: GeoData = {
          country: data.country_name ?? DEFAULT_COUNTRY,
          countryCode: data.country_code ?? DEFAULT_COUNTRY_CODE,
        }
        setCachedGeo(geo)
        setState({ ...geo, isLoading: false })
        return null
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        logger.warn('Geo detection failed, defaulting to India', error)
        const fallback: GeoData = {
          country: DEFAULT_COUNTRY,
          countryCode: DEFAULT_COUNTRY_CODE,
        }
        setCachedGeo(fallback)
        setState({ ...fallback, isLoading: false })
      })

    return () => controller.abort()
  }, [])

  return state
}
