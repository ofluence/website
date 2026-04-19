import { createRouter } from '@tanstack/react-router'

import { DefaultCatchBoundary } from '@/components/errors/default-catch-boundary.component'
import { DefaultPending } from '@/components/errors/default-pending.component'
import { NotFound } from '@/components/errors/not-found.component'

import { routeTree } from './routeTree.gen'

export function getRouter() {
  const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    defaultViewTransition: true,
    defaultPendingComponent: DefaultPending,
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: NotFound,
    scrollRestoration: true,
  })
  return router
}
