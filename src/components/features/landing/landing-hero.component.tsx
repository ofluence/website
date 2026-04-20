import { Link } from '@tanstack/react-router'
import { m } from 'motion/react'

import { heroReveal, heroStagger } from '@/utils/motion.utils'
import { useLocaleContent } from '@/hooks/use-locale-content'

import { Button } from '@/components/ui/button'

function LandingHero() {
  const { country, countryCode, isLoading } = useLocaleContent()

  return (
    <section className="px-4 pt-8 pb-8 md:px-6">
      {/* Full-bleed rounded container */}
      <div className="surface-container relative mx-auto max-w-7xl overflow-hidden px-5 py-14 sm:px-6 sm:py-20 md:px-12 md:py-28">
        {/* Subtle ambient glow */}
        <div
          className="bg-primary/6 ambient-glow pointer-events-none absolute -top-20 left-1/2 h-64 w-80 -translate-x-1/2 rounded-full blur-3xl sm:-top-30 sm:h-100 sm:w-125"
          aria-hidden="true"
        />

        {/* initial={false} keeps the H1 visible on first paint — without it
            Motion hides then reveals the hero after hydration, pushing LCP
            to the end of the animation (~5.4s on throttled mobile). */}
        <m.div
          className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 text-center"
          {...heroStagger}
          initial={false}
        >
          {/* Overline badge */}
          <m.div variants={heroReveal}>
            <span className="gap-1.5 px-3 py-1 text-base">Influencer platform built for speed</span>
          </m.div>

          {/* Headline */}
          <m.h1 variants={heroReveal} className="text-display-hero text-foreground">
            Replace spreadsheets, scattered tools, and guesswork.
          </m.h1>

          {/* Subtext */}
          <m.p
            variants={heroReveal}
            className="text-muted-foreground max-w-xl text-lg leading-relaxed"
          >
            Discover creators, launch campaigns, and measure — all from one workspace designed to
            move as fast as you do.
          </m.p>

          {/* Dual CTAs */}
          <m.div variants={heroReveal} className="flex flex-wrap items-center gap-3 pt-2">
            <Button size="lg" render={<a href={`${import.meta.env.VITE_APP_URL}/login`} />}>
              Start free trial
            </Button>
            <Button variant="outline" size="lg" render={<Link to="/contact" />}>
              Book a demo
            </Button>
          </m.div>

          {/* Sub-CTA text */}
          <m.p variants={heroReveal} className="text-muted-foreground text-sm">
            14-day free trial · No credit card required
          </m.p>
        </m.div>

        {/* Trust badges */}
        {/* <m.div
          className="relative mt-16 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          {compliance.map((badge) => (
            <span
              key={badge}
              className="text-muted-foreground/50 inline-flex items-center gap-1 text-[10px] font-medium tracking-widest uppercase"
            >
              <HugeiconsIcon icon={SecurityCheckIcon} className="size-3" />
              {badge}
            </span>
          ))}
        </m.div> */}

        {/* Geo-targeting */}
        {!isLoading && countryCode !== 'IN' && (
          <m.p
            className="text-muted-foreground/40 mt-4 text-center text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            Currently available in India. Coming to {country} soon.
          </m.p>
        )}
      </div>
    </section>
  )
}

export { LandingHero }
