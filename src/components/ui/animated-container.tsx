import { m, useInView, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useRef } from 'react'

import {
  defaultSpring,
  fadeInUp,
  scrollStagger,
  scrollStaggerItem,
} from '@/utils/motion.utils'

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
    if (!isInView) return
    motionValue.set(value)
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

export { FadeInView, SpringCounter, ScrollStaggerContainer, ScrollStaggerItem }
