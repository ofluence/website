import { useState } from 'react'

import {
  Building01Icon,
  Crown02Icon,
  Plant01Icon,
  RocketIcon,
  Tick01Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import type { IconSvgElement } from '@hugeicons/react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'motion/react'

import { cn } from '@/utils/global.utils'
import { fadeInUp } from '@/utils/motion.utils'
import { useLocaleContent } from '@/hooks/use-locale-content'

import {
  AnimatedCard,
  AnimatedStaggerGrid,
  AnimatedStaggerItem,
  FadeInView,
} from '@/components/ui/animated-container'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Seo } from '@/components/features/global/seo.component'
import { LandingPageLayout } from '@/components/features/landing/landing-page-layout.component'

import { LANDING_PRICING_TIERS } from '@/constants/landing.constants'

const TIER_CONFIG: {
  icon: IconSvgElement
  gradient: string
  iconColor: string
}[] = [
  {
    icon: Plant01Icon,
    gradient: 'from-chart-1/8 to-transparent bg-gradient-to-b',
    iconColor: 'text-chart-1',
  },
  {
    icon: RocketIcon,
    gradient: 'from-chart-2/8 to-transparent bg-gradient-to-b',
    iconColor: 'text-chart-2',
  },
  {
    icon: Building01Icon,
    gradient: 'from-chart-3/8 to-transparent bg-gradient-to-b',
    iconColor: 'text-chart-3',
  },
  {
    icon: Crown02Icon,
    gradient: 'from-chart-4/8 to-transparent bg-gradient-to-b',
    iconColor: 'text-chart-4',
  },
]

function getFaqItems(paymentMethodsText: string) {
  return [
    {
      question: 'Can I switch plans at any time?',
      answer:
        'Yes. You can upgrade or downgrade your plan at any time. When upgrading, you will be charged the prorated difference. When downgrading, the credit will be applied to your next billing cycle.',
    },
    {
      question: 'What happens after my free trial ends?',
      answer:
        'Your trial converts to the plan you selected. If you do not choose a paid plan, you will be moved to the Starter (free) tier. No data is lost — you can upgrade anytime.',
    },
    {
      question: 'Do you offer annual billing?',
      answer:
        'Yes. Annual billing saves you 20% compared to monthly billing. Use the toggle above the pricing cards to see annual prices.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: paymentMethodsText,
    },
    {
      question: 'Can I cancel anytime?',
      answer:
        'Absolutely. There are no long-term contracts. You can cancel your subscription at any time from your account settings. Your access continues until the end of the current billing period.',
    },
    {
      question: 'Do you offer discounts for agencies?',
      answer:
        'Yes. Our Enterprise plan includes multi-tenant management designed for agencies. Contact sales for custom pricing based on the number of client brands you manage.',
    },
  ]
}

function ComparisonCell({ value }: { value: string | boolean }) {
  if (value === true) {
    return <HugeiconsIcon icon={Tick01Icon} className="text-success mx-auto size-4" />
  }
  if (value === false) {
    return <span className="text-muted-foreground/40">—</span>
  }
  return <span className="font-medium">{value}</span>
}

const TIER_KEYS = ['starter', 'growth', 'business', 'enterprise'] as const

const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(false)
  const { pricing, paymentMethods } = useLocaleContent()

  return (
    <LandingPageLayout>
      <Seo
        title="Pricing"
        description="Simple, transparent pricing for Ofluence. Start free and scale as you grow. Plans for individuals, growing brands, scaling teams, and enterprises."
        path="/pricing"
      />

      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-8">
          <motion.div {...fadeInUp}>
            <p className="text-primary mb-4 text-sm font-medium tracking-widest uppercase">
              Pricing
            </p>
            <h1 className="font-display text-4xl leading-tight font-semibold tracking-tight md:text-5xl lg:text-6xl">
              Simple, transparent pricing
            </h1>
            <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg leading-relaxed">
              Start free and scale as you grow. No hidden fees, no surprises. Every plan includes a
              14-day free trial.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Billing toggle */}
      <section className="pb-8">
        <div className="flex items-center justify-center gap-3">
          <span
            className={cn(
              'text-sm font-medium transition-colors',
              isAnnual ? 'text-muted-foreground' : 'text-foreground'
            )}
          >
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={cn(
              'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors',
              isAnnual ? 'bg-primary' : 'bg-muted-foreground/30'
            )}
            role="switch"
            aria-checked={isAnnual}
          >
            <span
              className={cn(
                'bg-background pointer-events-none block size-5 rounded-full shadow-sm transition-transform',
                isAnnual ? 'translate-x-5' : 'translate-x-0'
              )}
            />
          </button>
          <span
            className={cn(
              'text-sm font-medium transition-colors',
              isAnnual ? 'text-foreground' : 'text-muted-foreground'
            )}
          >
            Annual
          </span>
          {isAnnual && (
            <Badge variant="sage" className="text-xs">
              Save 20%
            </Badge>
          )}
        </div>
      </section>

      {/* Pricing cards */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <AnimatedStaggerGrid className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {LANDING_PRICING_TIERS.map((tier, index) => {
              const config = TIER_CONFIG[index]
              const localePricing = pricing[TIER_KEYS[index]]
              const displayPrice =
                isAnnual && localePricing.annualPrice
                  ? localePricing.annualPrice
                  : localePricing.price
              return (
                <AnimatedStaggerItem key={tier.name} className="flex">
                  <AnimatedCard className="flex flex-1">
                    <Card
                      className={cn(
                        'relative flex flex-1 flex-col',
                        config.gradient,
                        tier.highlighted && 'ring-primary shadow-soft-md ring-2'
                      )}
                    >
                      {tier.highlighted && (
                        <div className="absolute -top-3 right-4">
                          <Badge variant="coral">Most Popular</Badge>
                        </div>
                      )}
                      <CardHeader>
                        <div className="mb-2 flex items-center gap-2">
                          <HugeiconsIcon
                            icon={config.icon}
                            className={cn('size-5', config.iconColor)}
                          />
                          <CardTitle className="font-display text-lg">{tier.name}</CardTitle>
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="font-display text-4xl font-bold">{displayPrice}</span>
                          {tier.period && (
                            <span className="text-muted-foreground text-sm">
                              {isAnnual && localePricing.annualPrice
                                ? '/mo, billed annually'
                                : tier.period}
                            </span>
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
                                className={cn('mt-0.5 size-4 shrink-0', config.iconColor)}
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
                          render={<Link to={tier.ctaHref ?? '/register'} />}
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

          <p className="text-muted-foreground mt-8 text-center text-sm">
            All paid plans include a 14-day free trial. No credit card required to start.
          </p>
        </div>
      </section>

      {/* Feature comparison table */}
      <section className="bg-muted/30 py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <FadeInView>
            <h2 className="font-display mb-12 text-center text-2xl font-semibold tracking-tight md:text-3xl">
              Compare plans
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-border border-b">
                    <th className="text-muted-foreground pb-4 text-left font-medium">Feature</th>
                    {LANDING_PRICING_TIERS.map((tier) => (
                      <th
                        key={tier.name}
                        className={cn(
                          'pb-4 text-center font-semibold',
                          tier.highlighted && 'text-primary'
                        )}
                      >
                        {tier.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-border divide-y">
                  {COMPARISON_ROWS.map((row) => (
                    <tr key={row.feature}>
                      <td className="text-muted-foreground py-3">{row.feature}</td>
                      {row.values.map((value, colIndex) => (
                        <td key={colIndex} className="py-3 text-center">
                          <ComparisonCell value={value} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 md:px-8">
          <motion.div className="mb-12 text-center" {...fadeInUp}>
            <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
              Frequently asked questions
            </h2>
          </motion.div>
          <FadeInView>
            <div className="divide-border divide-y">
              {getFaqItems(paymentMethods).map((item) => (
                <Collapsible key={item.question} className="py-5">
                  <CollapsibleTrigger className="flex w-full cursor-pointer items-center justify-between text-left font-medium">
                    {item.question}
                    <span className="text-muted-foreground ml-4 text-lg transition-transform [[data-panel-open]_&]:rotate-45">
                      +
                    </span>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="overflow-hidden transition-all duration-300 data-[ending-style]:h-0 data-[starting-style]:h-0">
                    <p className="text-muted-foreground mt-3 leading-relaxed">{item.answer}</p>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </FadeInView>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-mesh-warm py-20 md:py-28">
        <FadeInView className="mx-auto max-w-3xl px-6 text-center md:px-8">
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Ready to get started?
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-lg text-lg leading-relaxed">
            Start your 14-day free trial today. No credit card required.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" render={<Link to="/contact" />}>
              Try for free
            </Button>
            <Button size="lg" variant="outline" render={<Link to="/contact" />}>
              Contact sales
            </Button>
          </div>
        </FadeInView>
      </section>
    </LandingPageLayout>
  )
}

const COMPARISON_ROWS: { feature: string; values: (string | boolean)[] }[] = [
  { feature: 'Creator searches', values: ['50/mo', '300/mo', '800/mo', 'Unlimited'] },
  { feature: 'Active creators', values: ['—', '100', '250', 'Unlimited'] },
  { feature: 'Team members', values: ['1', '2', '5', 'Unlimited'] },
  { feature: 'Analytics dashboard', values: ['Basic', true, true, true] },
  { feature: 'Content tracking', values: [false, true, true, true] },
  { feature: 'Priority discovery', values: [false, false, true, true] },
  { feature: 'Team management & roles', values: [false, false, true, true] },
  { feature: 'API access', values: [false, false, true, true] },
  { feature: 'SSO & advanced security', values: [false, false, false, true] },
  { feature: 'Dedicated success manager', values: [false, false, false, true] },
  { feature: 'Custom integrations', values: [false, false, false, true] },
  { feature: 'SLA guarantee', values: [false, false, false, true] },
  { feature: 'Payout fees', values: ['—', '5%', '5%', '0%'] },
  { feature: 'Support', values: ['Community', 'Email', 'Priority', 'Dedicated'] },
]

export const Route = createFileRoute('/pricing')({
  component: PricingPage,
})
