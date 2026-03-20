import { motion } from 'motion/react'

import { cn } from '@/utils/global.utils'
import {
  cardHover,
  fadeInUp,
  pageTransition,
  staggerContainer,
  staggerItem,
} from '@/utils/motion.utils'

/** Wraps page content with enter/exit animation */
function AnimatedPage({ className, children, ...props }: React.ComponentProps<typeof motion.div>) {
  return (
    <motion.div className={className} {...pageTransition} {...props}>
      {children}
    </motion.div>
  )
}

/** Grid/flex container with staggered child animations */
function AnimatedStaggerGrid({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) {
  return (
    <motion.div className={className} {...staggerContainer} {...props}>
      {children}
    </motion.div>
  )
}

/** Single item inside an AnimatedStaggerGrid */
function AnimatedStaggerItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) {
  return (
    <motion.div className={className} {...staggerItem} {...props}>
      {children}
    </motion.div>
  )
}

/** Card wrapper with hover lift effect */
function AnimatedCard({ className, children, ...props }: React.ComponentProps<typeof motion.div>) {
  return (
    <motion.div className={cn('will-change-transform', className)} {...cardHover} {...props}>
      {children}
    </motion.div>
  )
}

/** Scroll-triggered fade-in-up reveal */
function FadeInView({ className, children, ...props }: React.ComponentProps<typeof motion.div>) {
  return (
    <motion.div className={className} {...fadeInUp} {...props}>
      {children}
    </motion.div>
  )
}

export { AnimatedPage, AnimatedStaggerGrid, AnimatedStaggerItem, AnimatedCard, FadeInView }
