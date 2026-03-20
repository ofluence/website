import { createFileRoute } from '@tanstack/react-router'

import { NotFound } from '@/components/errors/not-found.component'

export const Route = createFileRoute('/$')({
  component: NotFound,
})
