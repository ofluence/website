import { ComputerIcon, Moon02Icon, Sun03Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import { cn } from '@/utils/global.utils'
import { useThemeSwitcher } from '@/hooks/use-theme-switcher'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import type { Theme } from '@/states/global.state'

const themeOptions: { value: Theme; label: string; icon: typeof Sun03Icon }[] = [
  { value: 'light', label: 'Light', icon: Sun03Icon },
  { value: 'dark', label: 'Dark', icon: Moon02Icon },
  { value: 'system', label: 'System', icon: ComputerIcon },
]

const triggerIconMap: Record<string, typeof Sun03Icon> = {
  light: Sun03Icon,
  dark: Moon02Icon,
}

function ThemeToggle() {
  const { theme, effectiveTheme, setThemeMode } = useThemeSwitcher()

  const TriggerIcon = triggerIconMap[effectiveTheme] ?? Sun03Icon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon-sm" aria-label="Toggle theme" />}
      >
        <HugeiconsIcon icon={TriggerIcon} strokeWidth={2} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themeOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            className={cn(theme === option.value && 'bg-accent')}
            onSelect={() => setThemeMode(option.value)}
          >
            <HugeiconsIcon icon={option.icon} strokeWidth={2} />
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { ThemeToggle }
