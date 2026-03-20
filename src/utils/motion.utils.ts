/**
 * Reusable motion presets for the Soft Modern aesthetic.
 * Use with motion/react components: <motion.div {...motionPresets.fadeInUp} />
 */

/** Soft ease-out curve */
const softEase = [0.25, 0.46, 0.45, 0.94] as const

/** Page enter/exit transitions */
export const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.3, ease: softEase },
} as const

/** Stagger container — apply to parent grid/flex */
export const staggerContainer = {
  initial: 'hidden',
  animate: 'visible',
  variants: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  },
} as const

/** Stagger item — apply to each child in a stagger container */
export const staggerItem = {
  variants: {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: softEase },
    },
  },
} as const

/** Card hover lift — subtle y translation */
export const cardHover = {
  whileHover: { y: -2, transition: { duration: 0.2, ease: 'easeOut' } },
} as const

/** Scroll-triggered fade in from below */
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5, ease: softEase },
} as const

/** Hero section — large dramatic entrance */
export const heroReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: softEase },
  },
} as const

/** Hero section stagger container */
export const heroStagger = {
  initial: 'hidden',
  animate: 'visible',
  variants: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  },
} as const

/** Scroll-triggered fade in from left */
export const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, ease: softEase },
} as const

/** Scroll-triggered fade in from right */
export const fadeInRight = {
  initial: { opacity: 0, x: 30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, ease: softEase },
} as const
