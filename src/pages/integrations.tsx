import { ArrowRight01Icon, CheckmarkCircle02Icon, Clock01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'motion/react'

import { fadeInUp } from '@/utils/motion.utils'

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

import {
  INTEGRATION_CATEGORIES,
  INTEGRATIONS,
} from '@/constants/integrations.constants'
import type { Integration } from '@/constants/integrations.constants'

function IntegrationCard({ integration }: { integration: Integration }) {
  const isActive = integration.status === 'active'

  return (
    <AnimatedCard>
      <Card className="h-full">
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div className="bg-primary/10 flex size-12 items-center justify-center rounded-xl">
              <HugeiconsIcon icon={integration.icon} className="text-primary size-6" />
            </div>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                isActive
                  ? 'bg-success/10 text-success'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              <HugeiconsIcon
                icon={isActive ? CheckmarkCircle02Icon : Clock01Icon}
                size={12}
              />
              {isActive ? 'Active' : 'Coming Soon'}
            </span>
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold">{integration.name}</h3>
            <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
              {integration.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </AnimatedCard>
  )
}

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Connect',
    description: 'Authorize your accounts with secure OAuth. No passwords stored, no data shared.',
  },
  {
    step: '02',
    title: 'Sync',
    description:
      'Creator profiles, content, and metrics flow into Ofluence automatically in real time.',
  },
  {
    step: '03',
    title: 'Automate',
    description:
      'Trigger workflows, generate reports, and track performance across all connected platforms.',
  },
]

const IntegrationsPage = () => {
  return (
    <LandingPageLayout>
      <Seo
        title="Integrations"
        description="Connect Ofluence with your favorite platforms. Instagram, YouTube, Shopify, and more — sync data and automate your influencer marketing workflow."
        path="/integrations"
      />

      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-8">
          <motion.div {...fadeInUp}>
            <p className="text-primary mb-4 text-sm font-medium tracking-widest uppercase">
              Integrations
            </p>
            <h1 className="font-display text-4xl leading-tight font-semibold tracking-tight md:text-5xl lg:text-6xl">
              Connect your stack
            </h1>
            <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg leading-relaxed">
              Ofluence plugs into the platforms you already use. Sync creator data, track content
              performance, and automate workflows — all from one unified dashboard.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Integration categories */}
      {INTEGRATION_CATEGORIES.map((category) => {
        const categoryIntegrations = INTEGRATIONS.filter((integration) => integration.category === category.id)
        if (categoryIntegrations.length === 0) return null

        return (
          <section
            key={category.id}
            className={category.id === 'social' || category.id === 'crm' ? 'bg-muted/30 py-20 md:py-28' : 'py-20 md:py-28'}
          >
            <div className="mx-auto max-w-7xl px-6 md:px-8">
              <FadeInView>
                <p className="text-primary mb-3 text-sm font-medium tracking-widest uppercase">
                  {category.title}
                </p>
                <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                  {category.description}
                </h2>
              </FadeInView>

              <AnimatedStaggerGrid className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {categoryIntegrations.map((integration) => (
                  <AnimatedStaggerItem key={integration.name}>
                    <IntegrationCard integration={integration} />
                  </AnimatedStaggerItem>
                ))}
              </AnimatedStaggerGrid>
            </div>
          </section>
        )
      })}

      {/* How Integrations Work */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <motion.div className="mb-12 text-center md:mb-16" {...fadeInUp}>
            <p className="text-primary mb-3 text-sm font-medium tracking-widest uppercase">
              How it works
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Three steps to connected workflows
            </h2>
          </motion.div>

          <AnimatedStaggerGrid className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {HOW_IT_WORKS.map((item) => (
              <AnimatedStaggerItem key={item.step}>
                <div className="text-center">
                  <span className="font-display text-primary/30 text-5xl font-bold">
                    {item.step}
                  </span>
                  <h3 className="font-display mt-4 text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground mt-2 leading-relaxed">{item.description}</p>
                </div>
              </AnimatedStaggerItem>
            ))}
          </AnimatedStaggerGrid>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-mesh-warm py-20 md:py-28">
        <FadeInView className="mx-auto max-w-3xl px-6 text-center md:px-8">
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Ready to connect your platforms?
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-lg text-lg leading-relaxed">
            Start your free trial and see how Ofluence integrates with the tools you already use.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" render={<Link to="/contact" />}>
              Start free trial
              <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
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

export const Route = createFileRoute('/integrations')({
  component: IntegrationsPage,
})
