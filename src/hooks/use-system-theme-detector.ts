import { useEffect, useState } from 'react'

type SystemTheme = 'dark' | 'light'

/**
 * Tracks the OS-level color-scheme preference. Initial state is `light` so the
 * hook returns the same value on the server and on the first client render
 * (avoiding a hydration mismatch); the real value is synced inside an effect
 * after mount, where the inline `themeBootstrapScript` in `__root.tsx` has
 * already applied the correct class to <html> to prevent a visible flash.
 */
const useSystemThemeDetector = (): SystemTheme => {
  const [isDark, setIsDark] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDark(mq.matches)

    const listener = (event: MediaQueryListEvent): void => {
      setIsDark(event.matches)
    }

    mq.addEventListener('change', listener)
    return () => mq.removeEventListener('change', listener)
  }, [])

  return isDark ? 'dark' : 'light'
}

export { useSystemThemeDetector }
