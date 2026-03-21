import {
  ApiIcon,
  GoogleIcon,
  InstagramIcon,
  ShopifyIcon,
  SlackIcon,
  StripeIcon,
  TiktokIcon,
  YoutubeIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { createFileRoute, Link } from '@tanstack/react-router'

import {
  FadeInView,
  ScrollStaggerContainer,
  ScrollStaggerItem,
} from '@/components/ui/animated-container'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MagicCard } from '@/components/ui/magic-card'
import { Separator } from '@/components/ui/separator'
import { Seo } from '@/components/features/global/seo.component'
import { LandingCta } from '@/components/features/landing/landing-cta.component'
import { LandingPageLayout } from '@/components/features/landing/landing-page-layout.component'

import { LANDING_FEATURES, LANDING_HOW_IT_WORKS } from '@/constants/landing.constants'

const AUDIENCE_KEYS = ['brands', 'agencies', 'creators'] as const

const AUDIENCE_BADGE_VARIANT: Record<string, 'accent' | 'ink' | 'stone'> = {
  brands: 'accent',
  agencies: 'ink',
  creators: 'stone',
}

const INTEGRATIONS = [
  { name: 'Instagram', icon: InstagramIcon },
  { name: 'YouTube', icon: YoutubeIcon },
  { name: 'TikTok', icon: TiktokIcon },
  { name: 'Shopify', icon: ShopifyIcon },
  { name: 'Google Analytics', icon: GoogleIcon },
  { name: 'Stripe', icon: StripeIcon },
  { name: 'Slack', icon: SlackIcon },
  { name: 'REST API', icon: ApiIcon },
]

function SolutionsPage() {
  return (
    <LandingPageLayout>
      <Seo
        title="Solutions — Ofluence"
        description="Discover how Ofluence helps brands, agencies, and creators run influencer marketing campaigns at scale."
        path="/solutions"
      />

      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <FadeInView className="text-center">
            <p className="text-overline">Solutions</p>
            <h1 className="text-display-section">
              Built for how
              <br className="hidden sm:block" /> you actually work
            </h1>
            <p className="text-muted-foreground mx-auto mt-8 max-w-xl text-lg leading-relaxed">
              Whether you&apos;re a brand, agency, or creator — Ofluence adapts to your workflow
              with tools designed for your specific needs.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <Button size="lg" render={<a href={`${import.meta.env.VITE_APP_URL}/login`} />}>
                Start free trial
              </Button>
              <Button variant="outline" size="lg" render={<Link to="/contact" />}>
                Book a demo
              </Button>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <FadeInView className="mb-16 text-center">
            <p className="text-overline mb-3">Who it&apos;s for</p>
            <h2 className="text-display-section">Tailored for every side of the partnership</h2>
          </FadeInView>

          <ScrollStaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {AUDIENCE_KEYS.map((key) => {
              const audience = LANDING_HOW_IT_WORKS[key]
              return (
                <ScrollStaggerItem key={key}>
                  <MagicCard className="rounded-2xl">
                    <div className="p-8">
                      <Badge variant={AUDIENCE_BADGE_VARIANT[key]} className="mb-4">
                        {audience.label}
                      </Badge>
                      <ol className="mt-6 flex flex-col gap-6">
                        {audience.steps.map((step, index) => (
                          <li key={step.title} className="flex gap-4">
                            <span className="text-muted-foreground/40 font-display text-2xl font-bold">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <div>
                              <h4 className="text-foreground text-sm font-semibold">
                                {step.title}
                              </h4>
                              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                                {step.description}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </MagicCard>
                </ScrollStaggerItem>
              )
            })}
          </ScrollStaggerContainer>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <Separator />
      </div>

      {/* Key Capabilities */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <FadeInView className="mb-16 text-center">
            <p className="text-overline mb-3">Platform</p>
            <h2 className="text-display-section">Everything you need, nothing you don&apos;t</h2>
          </FadeInView>

          <ScrollStaggerContainer className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {LANDING_FEATURES.map((feature) => (
              <ScrollStaggerItem key={feature.number}>
                <div className="flex gap-5">
                  <div className="bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-lg">
                    <HugeiconsIcon icon={feature.icon} className="text-primary size-5" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-display text-lg font-semibold">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                      {feature.headline} {feature.description}
                    </p>
                  </div>
                </div>
              </ScrollStaggerItem>
            ))}
          </ScrollStaggerContainer>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <Separator />
      </div>

      {/* Integrations */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <FadeInView className="mb-16 text-center">
            <p className="text-overline mb-3">Integrations</p>
            <h2 className="text-display-section">Works with your stack</h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-lg">
              Connect the platforms you already use. Pull data in, push results out.
            </p>
          </FadeInView>

          <ScrollStaggerContainer className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {INTEGRATIONS.map((integration) => (
              <ScrollStaggerItem key={integration.name}>
                <MagicCard className="rounded-xl">
                  <div className="flex flex-col items-center gap-3 p-6 text-center">
                    <HugeiconsIcon
                      icon={integration.icon}
                      className="text-muted-foreground size-8"
                    />
                    <span className="text-foreground text-sm font-medium">{integration.name}</span>
                  </div>
                </MagicCard>
              </ScrollStaggerItem>
            ))}
          </ScrollStaggerContainer>
        </div>
      </section>

      <LandingCta />
    </LandingPageLayout>
  )
}

export const Route = createFileRoute('/solutions')({
  component: SolutionsPage,
})
