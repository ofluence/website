import { m, useInView, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useRef } from 'react'

import { cn } from '@/utils/global.utils'
import {
  defaultSpring,
  fadeInUp,
  pageTransition,
  scrollStagger,
  scrollStaggerItem,
  snappySpring,
  staggerContainer,
  staggerItem,
} from '@/utils/motion.utils'

/** Wraps page content with enter/exit animation */
function AnimatedPage({ className, children, ...props }: React.ComponentProps<typeof m.div>) {
  return (
    <m.div className={className} {...pageTransition} {...props}>
      {children}
    </m.div>
  )
}

/** Grid/flex container with staggered child animations */
function AnimatedStaggerGrid({
  className,
  children,
  ...props
}: React.ComponentProps<typeof m.div>) {
  return (
    <m.div className={className} {...staggerContainer} {...props}>
      {children}
    </m.div>
  )
}

/** Single item inside an AnimatedStaggerGrid */
function AnimatedStaggerItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof m.div>) {
  return (
    <m.div className={className} {...staggerItem} {...props}>
      {children}
    </m.div>
  )
}

/** Card wrapper — hover lift + shadow */
function AnimatedCard({ className, children, ...props }: React.ComponentProps<typeof m.div>) {
  return (
    <m.div
      className={cn('transition-all duration-200', className)}
      whileHover={{ y: -4, transition: { type: 'spring', ...snappySpring } }}
      {...props}
    >
      {children}
    </m.div>
  )
}

/** Scroll-triggered fade-in-up reveal */
function FadeInView({ className, children, ...props }: React.ComponentProps<typeof m.div>) {
  return (
    <m.div className={className} {...fadeInUp} {...props}>
      {children}
    </m.div>
  )
}

/** Spring-animated number counter — counts up when scrolled into view */
function SpringCounter({
  value,
  suffix = '',
  prefix = '',
  className,
}: {
  value: number
  suffix?: string
  prefix?: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { ...defaultSpring })
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, motionValue, value])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(latest)}${suffix}`
      }
    })
    return unsubscribe
  }, [springValue, prefix, suffix])

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  )
}

/** Scroll-triggered stagger container */
function ScrollStaggerContainer({
  className,
  children,
  ...props
}: React.ComponentProps<typeof m.div>) {
  return (
    <m.div className={className} {...scrollStagger} {...props}>
      {children}
    </m.div>
  )
}

/** Single item inside a ScrollStaggerContainer */
function ScrollStaggerItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof m.div>) {
  return (
    <m.div className={className} {...scrollStaggerItem} {...props}>
      {children}
    </m.div>
  )
}

export {
  AnimatedPage,
  AnimatedStaggerGrid,
  AnimatedStaggerItem,
  AnimatedCard,
  FadeInView,
  SpringCounter,
  ScrollStaggerContainer,
  ScrollStaggerItem,
}
