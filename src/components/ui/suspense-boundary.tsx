import { Suspense, type ReactNode } from 'react'

import { Loading03Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import { cn } from '@/utils/global.utils'

interface SuspenseBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  className?: string
}

/**
 * Default fallback component for Suspense boundaries
 * Shows a centered loading spinner with message
 */
export const DefaultSuspenseFallback = ({ message = 'Loading...' }: { message?: string }) => (
  <section className="flex h-full min-h-[400px] flex-col items-center justify-center">
    <HugeiconsIcon
      icon={Loading03Icon}
      strokeWidth={2}
      className="size-12 animate-spin text-green-500"
    />
    <p className="text-muted-foreground mt-2 text-sm">{message}</p>
  </section>
)

/**
 * Reusable Suspense boundary component
 * Wraps content with React Suspense and provides a consistent loading UI
 */
export const SuspenseBoundary = ({ children, fallback, className }: SuspenseBoundaryProps) => {
  return (
    <Suspense fallback={fallback || <DefaultSuspenseFallback />}>
      <div className={cn('h-full', className)}>{children}</div>
    </Suspense>
  )
}

/**
 * Inline suspense fallback for small sections
 */
export const InlineSuspenseFallback = () => (
  <div className="flex items-center gap-2 py-2">
    <HugeiconsIcon
      icon={Loading03Icon}
      strokeWidth={2}
      className="size-4 animate-spin text-green-500"
    />
    <span className="text-muted-foreground text-sm">Loading...</span>
  </div>
)
