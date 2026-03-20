import React from 'react'

import { useNavigate } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'

/**
 * NotFound component that displays a 404 error message
 * @returns The NotFound component
 */
const NotFound: React.FC = () => {
  const navigate = useNavigate()

  return (
    <>
      <title>404 | Ofluence</title>
      <section className="flex flex-1 flex-col items-center justify-center">
        <h1 className="text-muted-foreground mb-8 text-4xl font-extralight">404</h1>
        <p className="text-foreground mb-2 text-6xl">Oops!</p>
        <p className="text-foreground mb-16 text-5xl">Page not found.</p>
        <Button variant="link" onClick={() => navigate({ to: '/' })}>
          Go Home
        </Button>
      </section>
    </>
  )
}

export { NotFound }
