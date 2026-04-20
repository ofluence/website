import { useEffect, useState } from 'react'

type SystemTheme = 'dark' | 'light'

/**
 * Tracks the OS-level color-scheme preference. The lazy initializer reads
 * matchMedia synchronously on the client so the first render agrees with the
 * class the inline `themeBootstrapScript` in `__root.tsx` already applied;
 * otherwise `useThemeSwitcher`'s effect would clobber `.dark` on mount for
 * `theme: 'system'` users on a dark-preference OS, flashing them to light.
 * Server renders with `false` — the value is read only inside effects, never
 * rendered into HTML, so there is no hydration diff to worry about.
 */
const useSystemThemeDetector = (): SystemTheme => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

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
