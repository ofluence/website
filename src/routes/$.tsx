import { createFileRoute } from '@tanstack/react-router'

import { NotFound } from '@/components/errors/not-found.component'

import { LandingPageLayout } from '@/components/features/landing/landing-page-layout.component'

const NotFoundPage = () => (
  <LandingPageLayout>
    <NotFound />
  </LandingPageLayout>
)

export const Route = createFileRoute('/$')({
  component: NotFoundPage,
})
