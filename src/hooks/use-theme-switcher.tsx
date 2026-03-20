import { useEffect } from 'react'

import { useSystemThemeDetector } from '@/hooks/use-system-theme-detector'

import { useGlobalActions, useTheme, type Theme } from '@/states/global.state'

const useThemeSwitcher = (): {
  theme: Theme
  effectiveTheme: Theme
  setThemeMode: (_newTheme: Theme) => void
} => {
  const systemTheme = useSystemThemeDetector()
  const theme = useTheme()
  const { setTheme } = useGlobalActions()

  const effectiveTheme = theme === 'system' ? systemTheme : theme

  useEffect(() => {
    if (typeof window === 'undefined') return
    document.documentElement.classList.toggle('dark', effectiveTheme === 'dark')
  }, [effectiveTheme])

  const setThemeMode = (newTheme: Theme) => {
    setTheme(newTheme)
  }

  return { theme, effectiveTheme, setThemeMode }
}

export { useThemeSwitcher }
