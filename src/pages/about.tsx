import {
  BarChartIcon,
  EarthIcon,
  FlashIcon,
  Megaphone01Icon,
  UserGroupIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import type { IconSvgElement } from '@hugeicons/react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'motion/react'

import { fadeInUp } from '@/utils/motion.utils'
import { useLocaleContent } from '@/hooks/use-locale-content'

import {
  AnimatedCard,
  AnimatedStaggerGrid,
  AnimatedStaggerItem,
  FadeInView,
} from '@/components/ui/animated-container'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Seo } from '@/components/features/global/seo.component'
import { LandingPageLayout } from '@/components/features/landing/landing-page-layout.component'

interface ValueCardProps {
  icon: IconSvgElement
  title: string
  description: string
  gradient: string
}

const VALUES: ValueCardProps[] = [
  {
    icon: UserGroupIcon,
    title: 'Creators Are Professionals',
    description:
      'We don\u2019t treat creators as line items. They get fair payments, clear contracts, and tools that help them grow \u2014 because better creator relationships mean better campaigns for everyone.',
    gradient: 'from-chart-1/10 via-chart-1/15 to-chart-1/5 bg-gradient-to-br',
  },
  {
    icon: BarChartIcon,
    title: 'No Vanity Metrics',
    description:
      'We report on conversions, sales, and audience quality \u2014 not just likes and follower counts. Every number in Ofluence ties back to real business impact.',
    gradient: 'from-chart-2/10 via-chart-2/15 to-chart-2/5 bg-gradient-to-br',
  },
  {
    icon: FlashIcon,
    title: 'Public Pricing, Always',
    description:
      'Our pricing page shows exactly what you pay. No \u201Ccontact for a quote\u201D on standard plans, no hidden fees, and no surprise charges. What you see is what you get.',
    gradient: 'from-chart-3/10 via-chart-3/15 to-chart-3/5 bg-gradient-to-br',
  },
  {
    icon: EarthIcon,
    title: 'Built for Global Teams',
    description:
      'From day one, we designed for cross-border campaigns. 180+ countries, multi-currency payments, and localized compliance so your team can operate anywhere.',
    gradient: 'from-chart-4/10 via-chart-4/15 to-chart-4/5 bg-gradient-to-br',
  },
]

const AboutPage = () => {
  const { marketSize } = useLocaleContent()

  return (
    <LandingPageLayout>
      <Seo
        title="About"
        description="Learn about Ofluence — the influencer marketing platform built for brands, agencies, and creators. Our mission, values, and the team behind the product."
        path="/about"
      />

      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-8">
          <motion.div {...fadeInUp}>
            <p className="text-primary mb-4 text-sm font-medium tracking-widest uppercase">
              About Ofluence
            </p>
            <h1 className="font-display text-4xl leading-tight font-semibold tracking-tight md:text-5xl lg:text-6xl">
              We&apos;re building the future of influencer marketing
            </h1>
            <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg leading-relaxed">
              Ofluence connects brands with the right creators to build authentic partnerships at
              scale. Our platform replaces the spreadsheets, scattered tools, and guesswork with one
              unified system that makes influencer marketing measurable, manageable, and profitable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-muted/30 py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <FadeInView>
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                  Our Mission
                </h2>
                <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
                  The influencer marketing industry is worth {marketSize}, yet most teams still
                  manage campaigns through spreadsheets, email threads, and disconnected tools. We
                  believe there&apos;s a better way.
                </p>
                <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
                  Ofluence brings discovery, campaign management, content tracking, analytics, and
                  payments into one platform — so marketing teams can focus on building real
                  relationships instead of wrestling with logistics.
                </p>
              </div>
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                  Who We Serve
                </h2>
                <ul className="text-muted-foreground mt-4 flex flex-col gap-4 text-lg leading-relaxed">
                  <li>
                    <strong className="text-foreground">Brands</strong> — From startups to
                    enterprises running influencer campaigns in-house. We help you find the right
                    creators, manage collaborations, and prove ROI.
                  </li>
                  <li>
                    <strong className="text-foreground">Agencies</strong> — Marketing agencies
                    managing campaigns for multiple clients. Multi-tenant workspaces, white-label
                    reporting, and team management built for your workflow.
                  </li>
                  <li>
                    <strong className="text-foreground">Creators</strong> — Professional content
                    creators building their careers. Media kits, brand discovery, and streamlined
                    collaboration tools designed to help you grow.
                  </li>
                </ul>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <FadeInView>
            <p className="text-primary mb-3 text-sm font-medium tracking-widest uppercase">
              Our story
            </p>
            <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
              Why we built Ofluence
            </h2>
            <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
              Influencer marketing is a {marketSize} industry, yet the tools haven&apos;t kept up.
              Marketing teams manage campaigns across spreadsheets, email threads, payment portals,
              and analytics dashboards that don&apos;t talk to each other. Creators get lost in the
              shuffle, payments are delayed, and proving ROI feels like guesswork.
            </p>
            <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
              We started Ofluence to fix that. Our platform connects every step of the influencer
              marketing workflow — from finding the right creator to tracking the last conversion —
              so teams can stop managing logistics and start building partnerships that actually
              drive results.
            </p>

            {/* Milestones */}
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  icon: FlashIcon,
                  label: 'Founded',
                  detail: 'Built from the ground up for modern influencer marketing',
                },
                {
                  icon: Megaphone01Icon,
                  label: 'Platform Launch',
                  detail: 'Discovery, campaigns, tracking, and payments — all in one',
                },
                {
                  icon: EarthIcon,
                  label: 'Global Reach',
                  detail: '180+ countries with multi-currency payment support',
                },
              ].map((milestone) => (
                <div
                  key={milestone.label}
                  className="border-border/50 flex items-start gap-3 rounded-xl border p-4"
                >
                  <div className="bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-lg">
                    <HugeiconsIcon icon={milestone.icon} className="text-primary size-5" />
                  </div>
                  <div>
                    <p className="font-display font-semibold">{milestone.label}</p>
                    <p className="text-muted-foreground mt-0.5 text-sm">{milestone.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Metrics */}
      <section className="bg-muted/30 border-border/50 border-y py-12">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <FadeInView>
            <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
              {[
                { value: '180+', label: 'Countries Supported' },
                { value: '2', label: 'Platform Integrations' },
                { value: '5 min', label: 'Average Setup Time' },
                { value: '24/7', label: 'Platform Availability' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-primary text-3xl font-bold md:text-4xl">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground mt-1 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <motion.div className="mb-12 text-center md:mb-16" {...fadeInUp}>
            <p className="text-primary mb-3 text-sm font-medium tracking-widest uppercase">
              Our values
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              What drives us
            </h2>
          </motion.div>

          <AnimatedStaggerGrid className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {VALUES.map((value) => (
              <AnimatedStaggerItem key={value.title}>
                <AnimatedCard>
                  <Card className={value.gradient}>
                    <CardContent className="flex flex-col gap-4">
                      <div className="bg-background/60 flex size-12 items-center justify-center rounded-xl">
                        <HugeiconsIcon icon={value.icon} className="text-foreground/70 size-6" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-semibold">{value.title}</h3>
                        <p className="text-muted-foreground mt-2 leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              </AnimatedStaggerItem>
            ))}
          </AnimatedStaggerGrid>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-mesh-warm py-20 md:py-28">
        <FadeInView className="mx-auto max-w-3xl px-6 text-center md:px-8">
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Ready to transform your influencer marketing?
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-lg text-lg leading-relaxed">
            Join the brands and agencies using Ofluence to run measurable, profitable influencer
            campaigns.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" render={<Link to="/contact" />}>
              Start free trial
            </Button>
            <Button size="lg" variant="outline" render={<Link to="/contact" />}>
              Talk to sales
            </Button>
          </div>
        </FadeInView>
      </section>
    </LandingPageLayout>
  )
}

export const Route = createFileRoute('/about')({
  component: AboutPage,
})
