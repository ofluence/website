import { useCallback, useEffect, useState } from 'react'

export type SystemTheme = 'dark' | 'light'

/**
 * A React hook that detects and monitors the user's system theme preference.
 * It listens for changes to the system's color scheme preference and returns
 * the current theme setting.
 *
 * @returns {SystemTheme} The current system theme ('dark' | 'light')
 *
 * @example
 * const MyComponent = () => {
 *   const systemTheme = useSystemThemeDetector();
 *   return <div>Current system theme: {systemTheme}</div>;
 * };
 */
const useSystemThemeDetector = (): SystemTheme => {
  /**
   * Checks the current system theme preference.
   * Uses the matchMedia API to detect if dark mode is enabled.
   *
   * @returns {boolean} True if dark mode is enabled, false otherwise
   */
  const getCurrentSystemTheme = useCallback((): boolean => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }, [])

  // State to track if the system is using dark theme
  const [isDarkSystemTheme, setIsDarkSystemTheme] = useState<boolean>(getCurrentSystemTheme())

  useEffect(() => {
    // Skip setup if running in non-browser environment (e.g., SSR)
    if (typeof window === 'undefined') return

    // Create media query to detect system dark mode preference
    const darkSystemThemeMq = window.matchMedia('(prefers-color-scheme: dark)')

    /**
     * Handler for system theme change events.
     * Updates the state when the system color scheme preference changes.
     *
     * @param {MediaQueryListEvent} event - The media query change event
     */
    const mediaQueryListener = (event: MediaQueryListEvent): void => {
      setIsDarkSystemTheme(event.matches)
    }

    // Subscribe to system theme changes
    darkSystemThemeMq.addEventListener('change', mediaQueryListener)

    // Cleanup subscription on unmount
    return () => darkSystemThemeMq.removeEventListener('change', mediaQueryListener)
  }, [])

  // Convert boolean to theme type
  return isDarkSystemTheme ? 'dark' : 'light'
}

export { useSystemThemeDetector }
