import { FadeInView, SpringCounter } from '@/components/ui/animated-container'
import { Separator } from '@/components/ui/separator'

import { LANDING_STATS } from '@/constants/landing.constants'

function LandingSocialProof() {
  return (
    <section className="py-20 md:py-28">
      <FadeInView className="mx-auto max-w-5xl px-6 md:px-8">
        <div className="grid grid-cols-3 items-center">
          {LANDING_STATS.map((stat, index) => (
            <div key={stat.label} className="flex items-center">
              <div className="flex flex-1 flex-col items-center gap-2 px-4 py-6">
                <span className="font-display text-4xl md:text-6xl">
                  <SpringCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </span>
                <span className="text-muted-foreground text-xs font-medium tracking-[0.15em] uppercase">
                  {stat.label}
                </span>
              </div>
              {index < LANDING_STATS.length - 1 && (
                <Separator orientation="vertical" className="h-12 md:h-16" />
              )}
            </div>
          ))}
        </div>
      </FadeInView>
    </section>
  )
}

export { LandingSocialProof }
