// Initialize PostHog analytics BEFORE other imports
// This ensures session recording captures the full page lifecycle
import '@/observability/posthog'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { PostHogProvider } from '@posthog/react'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import posthog from 'posthog-js'

import { DefaultPending } from '@/components/errors/default-pending.component'
import { NotFound } from '@/components/errors/not-found.component'

import { routeTree } from '@/routeTree.gen'

import '@/styles/global.styles.css'

import { TooltipProvider } from '@/components/ui/tooltip'

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  defaultPendingComponent: DefaultPending,
  defaultNotFoundComponent: NotFound,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <PostHogProvider client={posthog}>
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </PostHogProvider>
  </StrictMode>
)
