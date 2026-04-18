import { Suspense, useEffect } from 'react'
import type { ReactNode } from 'react'

import { PostHogProvider, usePostHog } from '@posthog/react'
import { createRootRoute, HeadContent, Scripts, useLocation } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { domMax, LazyMotion } from 'motion/react'
import posthog from 'posthog-js'

import { useThemeSwitcher } from '@/hooks/use-theme-switcher'

import { DefaultCatchBoundary } from '@/components/errors/default-catch-boundary.component'
import { NotFound } from '@/components/errors/not-found.component'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'

import { seo } from '@/utils/seo.utils'

// Initialize PostHog (guarded against SSR via typeof window check in the module)
import '@/observability/posthog'

import appCss from '@/styles/global.styles.css?url'

const SITE_URL = 'https://ofluence.ai'

// Inline script that applies the persisted theme class to <html> before React
// hydrates, avoiding a flash of light theme for users on dark mode. Reads the
// zustand-persisted store keyed by `global-storage` and falls back to the OS
// preference for `system`/missing values.
const themeBootstrapScript = `
try {
  var s = localStorage.getItem('global-storage');
  var t = s ? (JSON.parse(s).state && JSON.parse(s).state.theme) : 'system';
  var dark = t === 'dark' || (t !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', dark);
} catch (e) {}
`

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Ofluence',
  url: SITE_URL,
  logo: `${SITE_URL}/logos/logo-192x192.png`,
  description: 'The all-in-one influencer marketing platform for brands, agencies, and creators.',
  email: 'support@ofluence.ai',
  sameAs: [
    // Add official social/profile URLs here as the brand grows
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'support@ofluence.ai',
    url: `${SITE_URL}/contact`,
  },
}

function AppShell({ children }: { children: ReactNode }) {
  useThemeSwitcher()

  const ph = usePostHog()
  const location = useLocation()

  useEffect(() => {
    if (ph) {
      ph.capture('$pageview', {
        $current_url: window.location.href,
      })
    }
  }, [location.pathname, ph])

  return (
    <>
      {children}
      <Toaster />
      <Suspense>
        {import.meta.env.VITE_ENABLE_TS_ROUTER_DEVTOOLS === 'true' && (
          <TanStackRouterDevtools initialIsOpen={false} />
        )}
      </Suspense>
    </>
  )
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <PostHogProvider client={posthog}>
          <LazyMotion features={domMax} strict>
            <TooltipProvider>
              <AppShell>{children}</AppShell>
            </TooltipProvider>
          </LazyMotion>
        </PostHogProvider>
        <Scripts />
      </body>
    </html>
  )
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { title: 'Ofluence — Influencer Marketing Platform' },
      ...seo({
        title: 'Ofluence — Influencer Marketing Platform',
        description:
          'The all-in-one influencer marketing platform for brands, agencies, and creators. Discover creators, manage campaigns, track performance, and process payments.',
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', type: 'image/x-icon', href: '/favicons/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png' },
    ],
    scripts: [
      { children: themeBootstrapScript },
      {
        type: 'application/ld+json',
        children: JSON.stringify(organizationSchema),
      },
    ],
  }),
  errorComponent: (props) => (
    <RootDocument>
      <DefaultCatchBoundary {...props} />
    </RootDocument>
  ),
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
})
