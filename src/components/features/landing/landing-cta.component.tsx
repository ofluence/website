import { Calendar03Icon, CreditCardIcon, SecurityCheckIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Link } from '@tanstack/react-router'

import { FadeInView } from '@/components/ui/animated-container'
import { Button } from '@/components/ui/button'

const BENEFITS = [
  { icon: CreditCardIcon, text: 'No credit card required' },
  { icon: Calendar03Icon, text: '14-day free trial' },
  { icon: SecurityCheckIcon, text: 'Cancel anytime' },
] as const

function LandingCta() {
  return (
    <section className="bg-mesh-warm relative py-20 md:py-28">
      <FadeInView className="relative mx-auto max-w-3xl px-6 text-center md:px-8">
        <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
          Stop guessing. Start proving ROI.
        </h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-lg text-lg leading-relaxed">
          Replace your spreadsheets with a platform that tracks every campaign from creator
          discovery to payment — and proves what&apos;s working.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" render={<Link to="/contact" />}>
            Try for free
          </Button>
          <Button size="lg" variant="outline" render={<Link to="/contact" />}>
            Request a demo
          </Button>
        </div>
        {/* Benefit icons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
          {BENEFITS.map((benefit) => (
            <div key={benefit.text} className="flex items-center gap-2">
              <HugeiconsIcon icon={benefit.icon} className="text-muted-foreground/60 size-4" />
              <span className="text-muted-foreground text-sm">{benefit.text}</span>
            </div>
          ))}
        </div>
      </FadeInView>
    </section>
  )
}

export { LandingCta }
