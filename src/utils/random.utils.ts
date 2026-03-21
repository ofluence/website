/* eslint-disable sonarjs/pseudo-random -- Math.random is safe here: used only for UI shuffling, not security */

/**
 * Fisher-Yates shuffle — returns a new array in random order.
 * O(n), unbiased.
 */
export function shuffle<T>(array: readonly T[]): T[] {
  const result = [...array]
  for (let index = result.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[result[index], result[swapIndex]] = [result[swapIndex], result[index]]
  }
  return result
}

/** Returns a random integer between min (inclusive) and max (inclusive). */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/** Returns a random float between min and max, rounded to `decimals` places. */
export function randomFloat(min: number, max: number, decimals = 1): number {
  const value = Math.random() * (max - min) + min
  const factor = 10 ** decimals
  return Math.round(value * factor) / factor
}

/** Formats a number into compact form: 8200 → "8.2K", 1200000 → "1.2M" */
export function formatCompact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

/** Formats a currency value with locale-appropriate grouping. */
export function formatCurrency(value: number, currencySymbol: string, regionCode: string): string {
  const locale = regionCode === 'IN' ? 'en-IN' : 'en-US'
  const formatted = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
  }).format(value)
  return `${currencySymbol}${formatted}`
}
