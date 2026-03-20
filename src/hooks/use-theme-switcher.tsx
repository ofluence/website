import { useEffect } from 'react'

// Make sure this path is correct
import { useSystemThemeDetector } from '@/hooks/use-system-theme-detector'

import { useGlobalActions, useTheme, type Theme } from '@/states/global.state'

/**
 * Custom hook that manages theme switching functionality for the application.
 * Handles three theme modes: light, dark, and system (which follows OS preference).
 * Persists theme choice in localStorage and syncs with Zustand store.
 *
 * @returns {Object} An object containing:
 *   - theme: Current theme setting ('light' | 'dark' | 'system')
 *   - setThemeMode: Function to update the theme
 */
const useThemeSwitcher = (): {
  theme: Theme
  effectiveTheme: Theme
  setThemeMode: (_newTheme: Theme) => void
} => {
  // Get the user's system theme preference (light/dark)
  const systemTheme = useSystemThemeDetector()

  // Get current theme and effective theme from Zustand store
  const theme = useTheme()
  const { setTheme } = useGlobalActions()

  /**
   * Initialize theme from localStorage on component mount.
   * If no theme is saved, defaults to 'system' theme.
   */
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null
    setTheme(savedTheme || 'system')
  }, [setTheme])

  /**
   * Apply theme changes to the document by toggling the 'dark' class.
   * If theme is set to 'system', uses the detected system preference.
   * Skip execution during SSR (when window is undefined).
   */
  useEffect(() => {
    if (typeof window === 'undefined') return

    const effectiveTheme = theme === 'system' ? systemTheme : theme
    document.documentElement.classList.toggle('dark', effectiveTheme === 'dark')
  }, [theme, systemTheme])

  /**
   * Updates the theme in both localStorage and Zustand store.
   * @param {Theme} newTheme - The new theme to set ('light' | 'dark' | 'system')
   */
  const setThemeMode = (newTheme: Theme) => {
    localStorage.setItem('theme', newTheme)
    setTheme(newTheme)
  }

  return {
    theme,
    effectiveTheme: theme === 'system' ? systemTheme : theme,
    setThemeMode,
  }
}

export { useThemeSwitcher }
