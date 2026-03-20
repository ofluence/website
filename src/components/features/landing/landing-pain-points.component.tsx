import { motion } from 'motion/react'

import { scrollStagger, scrollStaggerItem } from '@/utils/motion.utils'

import { FadeInView, SpringCounter } from '@/components/ui/animated-container'

const PAIN_POINTS = [
  {
    value: 22,
    suffix: '+',
    label:
      'official languages across India — global platforms treat it as one market. We don\u2019t.',
  },
  {
    value: 80,
    suffix: 'M+',
    label:
      'content creators in India, the fastest-growing creator economy. Finding the right one takes more than a keyword search.',
  },
  {
    value: 3,
    suffix: 'x',
    label:
      'higher engagement when brands match with region-native creators who speak the audience\u2019s language.',
  },
] as const

function LandingPainPoints() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <FadeInView className="mb-12 text-center">
          <p className="text-overline mb-3">Why Ofluence</p>
          <h2 className="text-display-section text-foreground">
            Built for the world&apos;s most diverse
            <br className="hidden sm:block" /> creator economy
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            Global platforms weren&apos;t designed for India&apos;s regional complexity. Ofluence is
            — with localization at its core and creator discovery that understands every market.
          </p>
        </FadeInView>

        <motion.div className="grid grid-cols-1 gap-6 md:grid-cols-3" {...scrollStagger}>
          {PAIN_POINTS.map((point) => (
            <motion.div
              key={point.label}
              className="bg-card border-border/60 shadow-soft rounded-lg border p-6 pt-12 text-center"
              {...scrollStaggerItem}
            >
              <SpringCounter
                value={point.value}
                suffix={point.suffix}
                className="font-display text-foreground text-4xl font-bold md:text-5xl"
              />
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{point.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export { LandingPainPoints }
