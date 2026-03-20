import {
  CheckmarkCircle02Icon,
  CreditCardIcon,
  Search01Icon,
  SecurityCheckIcon,
  UserGroupIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Link } from '@tanstack/react-router'
import { motion } from 'motion/react'

import { heroReveal, heroStagger } from '@/utils/motion.utils'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

function FloatingCard({
  className,
  children,
  delay = 0,
  rotate = 0,
}: {
  className?: string
  children: React.ReactNode
  delay?: number
  rotate?: number
}) {
  return (
    <motion.div
      className={className}
      style={{ rotate: `${rotate}deg` }}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{
        opacity: 1,
        y: [0, -10, 0],
        scale: 1,
        transition: {
          opacity: { duration: 0.6, delay: 0.5 + delay },
          scale: { duration: 0.6, delay: 0.5 + delay },
          y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: delay },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

function LandingHero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden pt-16">
      {/* Background gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-[oklch(0.95_0.04_25/0.2)] blur-3xl" />
        <div className="absolute right-1/4 bottom-1/3 h-72 w-72 rounded-full bg-[oklch(0.95_0.04_155/0.15)] blur-3xl" />
        <div className="absolute top-1/2 right-1/3 h-48 w-48 rounded-full bg-[oklch(0.95_0.04_230/0.1)] blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:px-8 md:py-28 lg:min-h-[85vh] lg:grid-cols-2 lg:py-0">
        {/* Text content */}
        <motion.div className="flex flex-col gap-6 text-center lg:text-left" {...heroStagger}>
          <motion.div variants={heroReveal} className="flex justify-center lg:justify-start">
            <Badge variant="coral">Influencer Marketing Platform</Badge>
          </motion.div>

          <motion.h1
            variants={heroReveal}
            className="font-display text-4xl leading-[1.1] tracking-tight md:text-6xl lg:text-7xl"
          >
            <span className="font-light">
              Discover, manage &{' '}
              <span className="font-semibold">
                <span className="text-primary">grow</span>
              </span>
            </span>
            <br />
            <span className="font-light">your influencer program</span>
          </motion.h1>

          <motion.p
            variants={heroReveal}
            className="text-muted-foreground mx-auto max-w-xl text-lg leading-relaxed lg:mx-0"
          >
            Replace the spreadsheets, scattered tools, and guesswork. Ofluence gives your team
            creator discovery, campaign management, content tracking, and payments — all connected,
            all measurable.
          </motion.p>

          <motion.div variants={heroReveal} className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Button size="lg" render={<Link to="/contact" />}>
                Try for free
              </Button>
              <Button size="lg" variant="outline" render={<Link to="/contact" />}>
                Request a demo
              </Button>
            </div>
            <p className="text-muted-foreground text-sm">
              14-day free trial · No credit card required
            </p>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={heroReveal}
            className="flex flex-wrap items-center justify-center gap-3 pt-2 lg:justify-start"
          >
            {['GDPR Compliant', 'ISO 27001', 'SOC 2'].map((badge) => (
              <span
                key={badge}
                className="border-border/60 text-muted-foreground/70 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium"
              >
                <HugeiconsIcon icon={SecurityCheckIcon} className="size-3" />
                {badge}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Floating visual cards — hidden on mobile, condensed stats on mobile */}
        <div className="relative lg:hidden">
          <div className="bg-muted/50 mx-auto flex max-w-sm items-center justify-around rounded-2xl px-4 py-3">
            <div className="text-center">
              <p className="font-display text-sm font-bold">Instagram + YouTube</p>
              <p className="text-muted-foreground text-[10px]">Platforms</p>
            </div>
            <div className="bg-border h-8 w-px" />
            <div className="text-center">
              <p className="font-display text-sm font-bold">Real-time</p>
              <p className="text-muted-foreground text-[10px]">Tracking</p>
            </div>
            <div className="bg-border h-8 w-px" />
            <div className="text-center">
              <p className="font-display text-sm font-bold">180+</p>
              <p className="text-muted-foreground text-[10px]">Countries</p>
            </div>
          </div>
        </div>

        <div className="relative hidden h-[500px] lg:block">
          <FloatingCard className="absolute top-8 right-4 z-10" delay={0} rotate={1}>
            <Card className="shadow-soft-md w-56 border-0 backdrop-blur-sm" size="sm">
              <CardContent className="flex items-center gap-3">
                <div className="from-chart-1/20 to-chart-1/5 flex size-10 items-center justify-center rounded-xl bg-gradient-to-br">
                  <HugeiconsIcon icon={Search01Icon} className="text-chart-1 size-5" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Creator Discovery</p>
                  <p className="font-display text-sm font-semibold">AI-Powered Search</p>
                </div>
              </CardContent>
            </Card>
          </FloatingCard>

          <FloatingCard className="absolute top-32 left-0 z-20" delay={0.5} rotate={-2}>
            <Card className="shadow-soft-md w-60 border-0 backdrop-blur-sm" size="sm">
              <CardContent className="flex items-center gap-3">
                <div className="from-chart-2/20 to-chart-2/5 flex size-10 items-center justify-center rounded-xl bg-gradient-to-br">
                  <HugeiconsIcon icon={UserGroupIcon} className="text-chart-2 size-5" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Campaign Management</p>
                  <p className="font-display text-sm font-semibold">End-to-End</p>
                </div>
              </CardContent>
            </Card>
          </FloatingCard>

          <FloatingCard className="absolute right-12 bottom-40 z-10" delay={1} rotate={2}>
            <Card className="shadow-soft-md w-52 border-0 backdrop-blur-sm" size="sm">
              <CardContent className="flex items-center gap-3">
                <div className="from-chart-4/20 to-chart-4/5 flex size-10 items-center justify-center rounded-xl bg-gradient-to-br">
                  <HugeiconsIcon icon={CreditCardIcon} className="text-chart-4 size-5" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Global Payments</p>
                  <p className="font-display text-sm font-semibold">180+ Countries</p>
                </div>
              </CardContent>
            </Card>
          </FloatingCard>

          <FloatingCard className="absolute bottom-20 left-8 z-20" delay={1.5} rotate={-1}>
            <Card className="shadow-soft-md w-48 border-0 backdrop-blur-sm" size="sm">
              <CardContent className="flex items-center gap-2">
                <div className="from-chart-3/20 to-chart-3/5 flex size-8 items-center justify-center rounded-lg bg-gradient-to-br">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} className="text-chart-3 size-4" />
                </div>
                <div>
                  <p className="text-xs font-medium">Content Tracking</p>
                  <div className="flex items-center gap-1.5">
                    <span className="animate-pulse-dot bg-success inline-block size-1.5 rounded-full" />
                    <span className="text-muted-foreground text-[10px]">Live</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FloatingCard>
        </div>
      </div>
    </section>
  )
}

export { LandingHero }
