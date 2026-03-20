import { useAnimatedCounter } from '@/hooks/use-animated-counter'

import { AnimatedStaggerItem } from '@/components/ui/animated-container'
import { cn } from '@/utils/global.utils'

export interface IndustryStat {
  target: number
  decimals: number
  prefix: string
  suffix: string
  label: string
  source: string
  accent: string
}

export function StatCard({ stat }: { stat: IndustryStat }) {
  const animated = useAnimatedCounter(stat.target)
  const display =
    stat.decimals > 0
      ? (animated / Math.pow(10, stat.decimals)).toFixed(stat.decimals)
      : animated

  return (
    <AnimatedStaggerItem className="flex text-center">
      <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-[oklch(1_0_0/0.06)] bg-[oklch(0.2_0.015_60/0.4)] px-5 py-6 backdrop-blur-sm transition-colors duration-200 hover:border-[oklch(1_0_0/0.12)] hover:bg-[oklch(0.22_0.02_60/0.5)]">
        <div
          className={cn(
            'mb-3 flex size-8 items-center justify-center rounded-lg bg-gradient-to-br',
            stat.accent
          )}
        >
          <div className="size-2 rounded-full bg-[oklch(0.9_0.06_25)]" />
        </div>
        <p className="font-display bg-gradient-to-r from-[oklch(0.92_0.06_25)] to-[oklch(0.85_0.08_60)] bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
          {stat.prefix}
          {display}
          {stat.suffix}
        </p>
        <p className="mt-2 text-sm text-[oklch(0.75_0.02_60)]">{stat.label}</p>
        <p className="mt-1 text-[10px] text-[oklch(0.45_0.02_60)]">{stat.source}</p>
      </div>
    </AnimatedStaggerItem>
  )
}
