import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/use-cases')({
  beforeLoad: () => {
    throw redirect({ to: '/solutions' })
  },
})
