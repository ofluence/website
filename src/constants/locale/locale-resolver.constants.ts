import { DEFAULT_LOCALE } from '@/constants/locale/default.constants'
import { INDIA_LOCALE } from '@/constants/locale/india.constants'
import type { LocaleContent } from '@/constants/locale/locale.constants'

const LOCALE_MAP: Record<string, LocaleContent> = {
  IN: INDIA_LOCALE,
}

export function getLocaleContent(countryCode: string): LocaleContent {
  return LOCALE_MAP[countryCode.toUpperCase()] ?? DEFAULT_LOCALE
}

export type { LocaleContent } from '@/constants/locale/locale.constants'
