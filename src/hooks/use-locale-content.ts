import { getLocaleContent } from '@/constants/locale/locale-resolver.constants'
import type { LocaleContent } from '@/constants/locale/locale-resolver.constants'

import { useGeoLocale } from '@/hooks/use-geo-locale'

interface LocaleContentResult extends LocaleContent {
  country: string
  countryCode: string
  isLoading: boolean
}

export function useLocaleContent(): LocaleContentResult {
  const { country, countryCode, isLoading } = useGeoLocale()
  const content = getLocaleContent(countryCode)

  return {
    ...content,
    country,
    countryCode,
    isLoading,
  }
}
