import React from 'react'

import { Loading03Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import { cn } from '@/utils/global.utils'

export interface SuspenseFallbackProps {
  className?: string
  size?: 'small' | 'medium' | 'large'
  text?: string
}

/**
 * SuspenseFallback component that displays a loading spinner and optional text
 * @param className - Additional CSS classes for the container
 * @param size - Size of the loading indicator: small, medium, or large
 * @param text - Text to display below the loading indicator
 * @returns The SuspenseFallback component
 */
const SuspenseFallback: React.FC<SuspenseFallbackProps> = ({
  className,
  size = 'medium',
  text = 'Loading...',
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  }

  return (
    <div className={cn('flex flex-1 flex-col items-center justify-center', className)}>
      <HugeiconsIcon
        icon={Loading03Icon}
        strokeWidth={2}
        className={cn('text-primary animate-spin', sizeClasses[size])}
      />
      {text && <p className="text-muted-foreground mt-2 text-sm">{text}</p>}
    </div>
  )
}

export { SuspenseFallback }
