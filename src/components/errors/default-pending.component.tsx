import React from 'react'

import { Spinner } from '@/components/ui/spinner'

/**
 * DefaultPending component that displays a default pending message
 * @returns The DefaultPending component
 */
const DefaultPending: React.FC = () => {
  return (
    <>
      <title>Loading... | Ofluence</title>
      <section className="flex h-full min-h-screen items-center justify-center">
        <Spinner />
        <p className="text-muted-foreground mt-2 text-sm">Loading...</p>
      </section>
    </>
  )
}

export { DefaultPending }
