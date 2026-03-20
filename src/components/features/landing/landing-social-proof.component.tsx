import { Clock01Icon, EarthIcon, InstagramIcon, Radar01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import type { IconSvgElement } from '@hugeicons/react'

import { FadeInView } from '@/components/ui/animated-container'
import { Separator } from '@/components/ui/separator'

interface CapabilityStat {
  icon: IconSvgElement
  value: string
  label: string
}

const CAPABILITY_STATS: CapabilityStat[] = [
  { icon: InstagramIcon, value: 'Instagram + YouTube', label: 'Platforms Supported' },
  { icon: EarthIcon, value: '180+ Countries', label: 'Global Payment Coverage' },
  { icon: Radar01Icon, value: 'Real-time', label: 'Content Auto-tracking' },
  { icon: Clock01Icon, value: '5 min', label: 'Average Setup Time' },
]

function StatItem({ stat }: { stat: CapabilityStat }) {
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-4">
      <HugeiconsIcon icon={stat.icon} className="text-primary/60 size-5" />
      <span className="font-display text-lg font-bold md:text-xl">{stat.value}</span>
      <span className="text-muted-foreground text-sm">{stat.label}</span>
    </div>
  )
}

function LandingSocialProof() {
  return (
    <section className="bg-muted/50 border-border/50 border-y">
      <FadeInView className="mx-auto max-w-5xl px-6 py-8 md:px-8">
        <div className="grid grid-cols-2 md:flex md:items-center md:justify-center">
          {CAPABILITY_STATS.map((stat, index) => (
            <div key={stat.label} className="flex items-center">
              <StatItem stat={stat} />
              {index < CAPABILITY_STATS.length - 1 && (
                <Separator orientation="vertical" className="hidden h-8 md:block" />
              )}
            </div>
          ))}
        </div>
        <p className="text-muted-foreground/60 mt-4 text-center text-sm">
          Built for brands, agencies, and creators
        </p>
      </FadeInView>
    </section>
  )
}

export { LandingSocialProof }
