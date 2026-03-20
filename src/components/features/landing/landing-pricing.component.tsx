import { ArrowRight01Icon, Tick01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Link } from '@tanstack/react-router'
import { motion } from 'motion/react'

import { cn } from '@/utils/global.utils'
import { fadeInUp } from '@/utils/motion.utils'
import { useLocaleContent } from '@/hooks/use-locale-content'

import {
  AnimatedCard,
  AnimatedStaggerGrid,
  AnimatedStaggerItem,
} from '@/components/ui/animated-container'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import { LANDING_PRICING_TIERS } from '@/constants/landing.constants'

const TIER_COLORS = ['text-chart-1', 'text-chart-2', 'text-chart-3', 'text-chart-4']

const TIER_GRADIENTS = [
  'from-chart-1/8 to-transparent bg-gradient-to-b',
  'from-chart-2/8 to-transparent bg-gradient-to-b',
  'from-chart-3/8 to-transparent bg-gradient-to-b',
  'from-chart-4/8 to-transparent bg-gradient-to-b',
]

function LandingPricing() {
  const { pricing } = useLocaleContent()
  const TIER_KEYS = ['starter', 'growth', 'business', 'enterprise'] as const

  return (
    <section id="pricing" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Section header */}
        <motion.div className="mb-12 text-center md:mb-16" {...fadeInUp}>
          <p className="text-primary mb-3 text-sm font-medium tracking-widest uppercase">Pricing</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            Simple, transparent pricing
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-lg text-lg">
            Start free and scale as you grow. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        <AnimatedStaggerGrid className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {LANDING_PRICING_TIERS.map((tier, index) => {
            const localePricing = pricing[TIER_KEYS[index]]
            const displayPrice = localePricing.price
            return (
              <AnimatedStaggerItem key={tier.name} className="flex">
                <AnimatedCard className="flex flex-1">
                  <Card
                    className={cn(
                      'relative flex flex-1 flex-col',
                      TIER_GRADIENTS[index],
                      tier.highlighted && 'ring-primary shadow-soft-md ring-2'
                    )}
                  >
                    {tier.highlighted && (
                      <div className="absolute -top-3 right-4">
                        <Badge variant="coral">Most Popular</Badge>
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="font-display text-lg">{tier.name}</CardTitle>
                      <div className="flex items-baseline gap-1">
                        <span className="font-display text-4xl font-bold">{displayPrice}</span>
                        {tier.period && (
                          <span className="text-muted-foreground text-sm">{tier.period}</span>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm">{tier.description}</p>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ul className="flex flex-col gap-3">
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <HugeiconsIcon
                              icon={Tick01Icon}
                              className={cn('mt-0.5 size-4 shrink-0', TIER_COLORS[index])}
                            />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        variant={tier.highlighted ? 'default' : 'outline'}
                        render={<Link to="/contact" />}
                      >
                        {tier.cta}
                      </Button>
                    </CardFooter>
                  </Card>
                </AnimatedCard>
              </AnimatedStaggerItem>
            )
          })}
        </AnimatedStaggerGrid>

        {/* Link to full pricing page */}
        <div className="mt-10 text-center">
          <Button variant="ghost" render={<Link to="/pricing" />}>
            Compare all plans in detail
            <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" data-icon="inline-end" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export { LandingPricing }
