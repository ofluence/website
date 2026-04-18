import { ErrorComponent, type ErrorComponentProps, Link } from '@tanstack/react-router'

function DefaultCatchBoundary({ error, reset }: ErrorComponentProps) {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
      <h1 className="text-muted-foreground text-4xl font-extralight">Something went wrong</h1>
      <ErrorComponent error={error} />
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-80"
        >
          Try again
        </button>
        <Link
          to="/"
          className="text-muted-foreground hover:text-foreground rounded-md px-4 py-2 text-sm font-medium transition-colors"
        >
          Go home
        </Link>
      </div>
    </section>
  )
}

export { DefaultCatchBoundary }
