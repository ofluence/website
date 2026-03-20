import { motion } from 'motion/react'

import { fadeInUp } from '@/utils/motion.utils'

import { AnimatedStaggerGrid } from '@/components/ui/animated-container'

import { StatCard, type IndustryStat } from './stat-card.component'

const INDUSTRY_STATS: IndustryStat[] = [
  {
    target: 211,
    decimals: 1,
    prefix: '$',
    suffix: 'B',
    label: 'Industry size in 2023',
    source: 'Influencer Marketing Hub',
    accent: 'from-chart-1/40 to-chart-1/10',
  },
  {
    target: 112,
    decimals: 1,
    prefix: '',
    suffix: 'x',
    label: 'Average ROI vs traditional digital',
    source: 'Influencer Marketing Hub',
    accent: 'from-chart-2/40 to-chart-2/10',
  },
  {
    target: 67,
    decimals: 0,
    prefix: '',
    suffix: '%',
    label: 'Brands increasing influencer budgets',
    source: 'Influencer Marketing Hub',
    accent: 'from-chart-3/40 to-chart-3/10',
  },
  {
    target: 82,
    decimals: 0,
    prefix: '',
    suffix: '%',
    label: 'Consumers trust influencer picks',
    source: 'Nielsen',
    accent: 'from-chart-4/40 to-chart-4/10',
  },
]

export function IndustryStats() {
  return (
    <div className="relative overflow-hidden bg-[oklch(0.15_0.01_60)] py-20 text-[oklch(0.985_0.005_80)] md:py-28">
      {/* Atmospheric gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/6 h-96 w-96 rounded-full bg-[oklch(0.3_0.06_25/0.15)] blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-[oklch(0.3_0.05_155/0.12)] blur-3xl" />
        <div className="absolute top-1/2 right-1/3 h-48 w-48 rounded-full bg-[oklch(0.3_0.04_300/0.08)] blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-8">
        <motion.div className="mb-12 text-center md:mb-16" {...fadeInUp}>
          <p className="mb-3 text-sm font-medium tracking-widest text-[oklch(0.72_0.1_25)] uppercase">
            The Opportunity
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            The $21B opportunity
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-[oklch(0.65_0.02_60)]">
            Influencer marketing is the fastest-growing channel in digital advertising. Here are the
            numbers.
          </p>
        </motion.div>

        <AnimatedStaggerGrid className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {INDUSTRY_STATS.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </AnimatedStaggerGrid>
      </div>
    </div>
  )
}
