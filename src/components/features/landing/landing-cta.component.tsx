import { ArrowRight01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Link } from '@tanstack/react-router'

import { FadeInView } from '@/components/ui/animated-container'
import { Button } from '@/components/ui/button'

function LandingCta() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="bg-card border-border rounded-xl border">
          <FadeInView className="mx-auto max-w-3xl px-6 py-20 text-center md:px-8 md:py-28">
            <h2 className="text-display-section text-foreground">
              Stop managing campaigns. Start building partnerships.
            </h2>

            <p className="text-muted-foreground mx-auto mt-6 max-w-lg text-lg leading-relaxed">
              Replace your scattered tools with one platform that handles discovery, campaigns,
              tracking, and payments — and proves what works.
            </p>

            {/* Button CTAs */}
            <div className="mt-10 flex flex-col items-center gap-4">
              <Button render={<a href={`${import.meta.env.VITE_APP_URL}/login`} />}>
                Start your free trial
                <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" data-icon="inline-end" />
              </Button>
              <Button variant="ghost" render={<Link to="/contact" />}>
                Or book a demo
              </Button>
            </div>

            {/* Benefit text — minimal */}
            <p className="text-muted-foreground/50 mt-8 text-xs font-medium tracking-widest uppercase">
              14-day free trial · No credit card · Cancel anytime
            </p>
          </FadeInView>
        </div>
      </div>
    </section>
  )
}

export { LandingCta }
