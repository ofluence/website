import { Suspense, useEffect } from 'react'

import { usePostHog } from '@posthog/react'
import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { useThemeSwitcher } from '@/hooks/use-theme-switcher'

import { Toaster } from '@/components/ui/sonner'
import { OrganizationStructuredData } from '@/components/features/global/structured-data.component'

const RootComponent = () => {
  useThemeSwitcher()

  // Track SPA pageviews on route changes
  const posthog = usePostHog()
  const location = useLocation()

  useEffect(() => {
    if (posthog) {
      posthog.capture('$pageview', {
        $current_url: window.location.href,
      })
    }
  }, [location.pathname, posthog])

  return (
    <>
      <OrganizationStructuredData />
      <Outlet />
      <Toaster />
      <Suspense>
        {import.meta.env.VITE_ENABLE_TS_ROUTER_DEVTOOLS === 'true' && (
          <TanStackRouterDevtools initialIsOpen={false} />
        )}
      </Suspense>
    </>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
})
