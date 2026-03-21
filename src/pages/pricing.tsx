import { useState } from 'react'

import { Tick01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { m } from 'motion/react'

import { cn } from '@/utils/global.utils'
import { useLocaleContent } from '@/hooks/use-locale-content'

import { FadeInView } from '@/components/ui/animated-container'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { MagicCard } from '@/components/ui/magic-card'
import { Separator } from '@/components/ui/separator'
import { Seo } from '@/components/features/global/seo.component'
import { LandingPageLayout } from '@/components/features/landing/landing-page-layout.component'

import { LANDING_PRICING_TIERS } from '@/constants/landing.constants'

const TIER_KEYS = ['starter', 'growth', 'business', 'enterprise'] as const

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
    return <HugeiconsIcon icon={Tick01Icon} className="text-primary mx-auto size-4" />
  }
  if (value === false) {
    return <span className="text-muted-foreground/40">—</span>
  }
  return <span className="font-medium">{value}</span>
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
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <FadeInView className="text-center">
            <p className="text-overline">Pricing</p>
            <h1 className="text-display-section">Choose your plan.</h1>
            <p className="text-muted-foreground mx-auto mt-8 max-w-xl text-lg leading-relaxed">
              Start free and scale as you grow. No hidden fees, no surprises. Every plan includes a
              14-day free trial.
            </p>
          </FadeInView>
        </div>
      </section>

      {/* Billing toggle */}
      <section className="pb-16">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setIsAnnual(false)}
              className={cn(
                'relative cursor-pointer pb-1 text-sm tracking-wide transition-colors',
                isAnnual ? 'text-muted-foreground hover:text-foreground/70' : 'text-foreground'
              )}
            >
              Monthly
              {!isAnnual && (
                <m.span
                  layoutId="billing-indicator"
                  className="bg-foreground absolute -bottom-px left-0 h-px w-full"
                />
              )}
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={cn(
                'relative cursor-pointer pb-1 text-sm tracking-wide transition-colors',
                isAnnual ? 'text-foreground' : 'text-muted-foreground hover:text-foreground/70'
              )}
            >
              Annual
              {isAnnual && (
                <m.span
                  layoutId="billing-indicator"
                  className="bg-foreground absolute -bottom-px left-0 h-px w-full"
                />
              )}
            </button>
          </div>
          <Badge
            variant="accent"
            className={cn('text-xs transition-opacity', isAnnual ? 'opacity-100' : 'opacity-0')}
          >
            Save 20%
          </Badge>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          {/* Top 3 tiers — equal height */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {LANDING_PRICING_TIERS.slice(0, 3).map((tier, index) => {
              const localePricing = pricing[TIER_KEYS[index]]
              const displayPrice =
                isAnnual && localePricing.annualPrice
                  ? localePricing.annualPrice
                  : localePricing.price
              return (
                <FadeInView key={tier.name} className="h-full">
                  <MagicCard
                    className={cn(
                      'h-full rounded-lg',
                      tier.highlighted &&
                        '[&>div:nth-child(2)]:border-t-primary [&>div:nth-child(2)]:border-t-2'
                    )}
                  >
                    <div className="flex h-full flex-col p-6 sm:p-8">
                      {/* Fixed-height header zone so all cards align */}
                      <div className="mb-6">
                        <div className="h-7">
                          {tier.highlighted && (
                            <Badge variant="accent" className="self-start text-xs">
                              Most Popular
                            </Badge>
                          )}
                        </div>

                        <h3 className="font-display text-lg tracking-wide">{tier.name}</h3>
                        <p className="text-muted-foreground mt-1 min-h-10 text-sm">
                          {tier.description}
                        </p>

                        <div className="mt-6 flex items-baseline gap-1">
                          <span className="font-display text-4xl">{displayPrice}</span>
                          {tier.period && (
                            <span className="text-muted-foreground text-sm">
                              {isAnnual && localePricing.annualPrice
                                ? '/mo, billed annually'
                                : tier.period}
                            </span>
                          )}
                        </div>
                      </div>

                      <Separator />

                      <ul className="mt-6 flex flex-1 flex-col gap-3">
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2.5">
                            <HugeiconsIcon
                              icon={Tick01Icon}
                              className="text-foreground mt-0.5 size-3.5 shrink-0"
                            />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto pt-8">
                        {tier.ctaHref ? (
                          <Link
                            to={tier.ctaHref}
                            className="border-border text-foreground hover:bg-muted block rounded-lg border py-3 text-center text-sm font-medium tracking-wide transition-colors"
                          >
                            {tier.cta}
                          </Link>
                        ) : (
                          <a
                            href={`${import.meta.env.VITE_APP_URL}/login`}
                            className={cn(
                              'block rounded-lg py-3 text-center text-sm font-medium tracking-wide transition-colors',
                              tier.highlighted
                                ? 'bg-foreground text-background hover:bg-foreground/90'
                                : 'border-border text-foreground hover:bg-muted border'
                            )}
                          >
                            {tier.cta}
                          </a>
                        )}
                      </div>
                    </div>
                  </MagicCard>
                </FadeInView>
              )
            })}
          </div>

          {/* Enterprise — full-width horizontal card */}
          {(() => {
            const enterprise = LANDING_PRICING_TIERS[3]
            const enterprisePricing = pricing[TIER_KEYS[3]]
            return (
              <FadeInView className="mt-5">
                <MagicCard
                  className="rounded-lg"
                  gradientColor="var(--color-primary)"
                  gradientOpacity={0.05}
                >
                  <div className="flex flex-col gap-6 p-6 sm:gap-8 sm:p-8 md:flex-row md:items-start md:justify-between">
                    <div className="shrink-0 md:w-52">
                      <h3 className="font-display text-lg tracking-wide">{enterprise.name}</h3>
                      <p className="text-muted-foreground mt-1 text-sm">{enterprise.description}</p>
                      <div className="mt-4 flex items-baseline gap-1">
                        <span className="font-display text-4xl">{enterprisePricing.price}</span>
                      </div>
                    </div>

                    <ul className="grid flex-1 grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                      {enterprise.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <HugeiconsIcon
                            icon={Tick01Icon}
                            className="text-foreground mt-0.5 size-3.5 shrink-0"
                          />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/contact"
                      className="border-border text-foreground hover:bg-muted block shrink-0 self-start rounded-lg border px-8 py-3 text-center text-sm font-medium tracking-wide transition-colors"
                    >
                      {enterprise.cta}
                    </Link>
                  </div>
                </MagicCard>
              </FadeInView>
            )
          })()}

          <p className="text-muted-foreground mt-12 text-center text-sm tracking-wide">
            All paid plans include a 14-day free trial. No credit card required to start.
          </p>
        </div>
      </section>

      {/* Feature comparison table */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <FadeInView>
            <h2 className="text-display-section mb-16 text-center">Compare plans</h2>
          </FadeInView>

          <FadeInView>
            <div className="-mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
              <table className="w-full min-w-150 text-sm">
                <thead>
                  <tr className="border-border border-b">
                    <th className="bg-background text-muted-foreground sticky left-0 z-10 pr-4 pb-6 text-left text-xs font-normal tracking-[0.15em] uppercase md:static">
                      Feature
                    </th>
                    {LANDING_PRICING_TIERS.map((tier) => (
                      <th
                        key={tier.name}
                        className={cn(
                          'font-display pb-6 text-center text-base font-normal',
                          tier.highlighted && 'text-primary'
                        )}
                      >
                        {tier.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row) => (
                    <tr key={row.feature} className="border-border border-b">
                      <td className="bg-background text-muted-foreground sticky left-0 z-10 py-4 pr-4 md:static">
                        {row.feature}
                      </td>
                      {row.values.map((value, colIndex) => (
                        <td key={colIndex} className="py-4 text-center">
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
          <FadeInView className="mb-16 text-center">
            <h2 className="text-display-section">Frequently asked questions</h2>
          </FadeInView>

          <FadeInView>
            <div>
              {getFaqItems(paymentMethods).map((item, index) => (
                <div key={item.question}>
                  {index === 0 && <Separator />}
                  <Collapsible className="py-6">
                    <CollapsibleTrigger className="flex w-full cursor-pointer items-center justify-between text-left">
                      <span className="font-display text-base sm:text-lg">{item.question}</span>
                      <span className="text-muted-foreground ml-4 text-lg transition-transform in-data-panel-open:rotate-45 sm:ml-6">
                        +
                      </span>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="overflow-hidden transition-all duration-300 data-ending-style:h-0 data-starting-style:h-0">
                      <p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed">
                        {item.answer}
                      </p>
                    </CollapsibleContent>
                  </Collapsible>
                  <Separator />
                </div>
              ))}
            </div>
          </FadeInView>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <FadeInView className="mx-auto max-w-3xl px-6 text-center md:px-8">
          <h2 className="text-display-section">Ready to get started?</h2>
          <p className="text-muted-foreground mx-auto mt-8 max-w-lg text-lg leading-relaxed">
            Start your 14-day free trial today. No credit card required.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4">
            <Button render={<Link to="/contact" />}>Try for free</Button>
            <Button variant="ghost" render={<Link to="/contact" />}>
              Contact sales
            </Button>
          </div>
        </FadeInView>
      </section>
    </LandingPageLayout>
  )
}

export const Route = createFileRoute('/pricing')({
  component: PricingPage,
})
