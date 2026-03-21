import { useCallback, useEffect } from 'react'

import { m, useMotionValue, useTransform } from 'motion/react'

import { cn } from '@/utils/global.utils'

interface MagicCardProps extends React.ComponentProps<'div'> {
  gradientSize?: number
  gradientColor?: string
  gradientOpacity?: number
  gradientFrom?: string
  gradientTo?: string
}

function MagicCard({
  children,
  className,
  gradientSize = 200,
  gradientColor = 'var(--color-primary)',
  gradientOpacity = 0.03,
  gradientFrom = 'var(--color-primary)',
  gradientTo = 'var(--color-primary)',
  ...props
}: MagicCardProps) {
  const mouseX = useMotionValue(-gradientSize)
  const mouseY = useMotionValue(-gradientSize)

  const reset = useCallback(() => {
    mouseX.set(-gradientSize)
    mouseY.set(-gradientSize)
  }, [mouseX, mouseY, gradientSize])

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    mouseX.set(event.clientX - rect.left)
    mouseY.set(event.clientY - rect.top)
  }

  useEffect(() => {
    reset()
  }, [reset])

  useEffect(() => {
    const handleGlobalPointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) {
        reset()
      }
    }

    const handleVisibility = () => {
      if (document.visibilityState !== 'visible') {
        reset()
      }
    }

    window.addEventListener('pointerout', handleGlobalPointerOut)
    window.addEventListener('blur', reset)
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      window.removeEventListener('pointerout', handleGlobalPointerOut)
      window.removeEventListener('blur', reset)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [reset])

  const borderBackground = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(${gradientSize}px circle at ${x}px ${y}px, ${gradientFrom}, ${gradientTo}, var(--color-border) 100%)`
  )
  const spotlightBackground = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(${gradientSize}px circle at ${x}px ${y}px, ${gradientColor}, transparent 100%)`
  )

  return (
    <div
      className={cn('group relative rounded-[inherit]', className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onPointerEnter={reset}
      {...props}
    >
      {/* Border gradient that follows mouse */}
      <m.div
        className="bg-border pointer-events-none absolute inset-0 rounded-[inherit] duration-300 group-hover:opacity-100"
        style={{ background: borderBackground }}
      />
      {/* Inner background to mask the border gradient */}
      <div className="bg-card absolute inset-px rounded-[inherit]" />
      {/* Spotlight overlay */}
      <m.div
        className="pointer-events-none absolute inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: spotlightBackground,
          opacity: gradientOpacity,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}

export { MagicCard }
