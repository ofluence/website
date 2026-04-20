/**
 * Warm Kinetic motion presets — spring physics for natural, alive feel.
 * Use with motion/react components: <motion.div {...fadeInUp} />
 */

/** Default spring — natural, smooth */
export const defaultSpring = { stiffness: 100, damping: 15 } as const

/** Hero section stagger */
export const heroStagger = {
  initial: 'hidden' as const,
  animate: 'visible' as const,
  variants: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
} as const

/** Hero item reveal */
export const heroReveal = {
  variants: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, ...defaultSpring },
    },
  },
} as const

/** Scroll-triggered fade + rise — general purpose */
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { type: 'spring' as const, ...defaultSpring },
} as const

/** Scroll-triggered stagger container */
export const scrollStagger = {
  initial: 'hidden' as const,
  whileInView: 'visible' as const,
  viewport: { once: true, margin: '-80px' },
  variants: {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  },
} as const

/** Scroll stagger item */
export const scrollStaggerItem = {
  variants: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, ...defaultSpring },
    },
  },
} as const
