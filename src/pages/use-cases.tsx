import { useState } from 'react'

import { ArrowRight01Icon, Cancel01Icon } from '@hugeicons/core-free-icons'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Seo } from '@/components/features/global/seo.component'
import { LandingPageLayout } from '@/components/features/landing/landing-page-layout.component'

import { AUDIENCE_SEGMENTS, INDUSTRY_VERTICALS } from '@/constants/use-cases.constants'
import type { AudienceSegment } from '@/constants/use-cases.constants'

function SegmentContent({ segment }: { segment: AudienceSegment }) {
  return (
    <div className="mt-10 space-y-16">
      {/* Headline + description */}
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          {segment.headline}
        </h2>
        <p className="text-muted-foreground mt-4 text-lg leading-relaxed">{segment.description}</p>
      </div>

      {/* Pain points */}
      <FadeInView>
        <div className="mx-auto max-w-2xl">
          <h3 className="font-display text-center text-xl font-semibold">
            Challenges you face today
          </h3>
          <ul className="mt-6 flex flex-col gap-3">
            {segment.painPoints.map((point) => (
              <li
                key={point}
                className="border-border/50 flex items-start gap-3 rounded-lg border p-4"
              >
                <HugeiconsIcon
                  icon={Cancel01Icon}
                  size={18}
                  className="text-destructive mt-0.5 shrink-0"
                />
                <span className="text-muted-foreground">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </FadeInView>

      {/* Features grid */}
      <AnimatedStaggerGrid className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {segment.features.map((feature) => (
          <AnimatedStaggerItem key={feature.title}>
            <AnimatedCard>
              <Card className="h-full">
                <CardContent className="flex flex-col gap-4">
                  <div className="bg-primary/10 flex size-12 items-center justify-center rounded-xl">
                    <HugeiconsIcon icon={feature.icon} className="text-primary size-6" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-semibold">{feature.title}</h4>
                    <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </AnimatedCard>
          </AnimatedStaggerItem>
        ))}
      </AnimatedStaggerGrid>

      {/* Stat */}
      <FadeInView className="text-center">
        <p className="font-display text-primary text-5xl font-bold md:text-6xl">
          {segment.stat.value}
          {segment.stat.suffix}
        </p>
        <p className="text-muted-foreground mt-2 text-lg">{segment.stat.label}</p>
      </FadeInView>
    </div>
  )
}

const UseCasesPage = () => {
  const [activeTab, setActiveTab] = useState(AUDIENCE_SEGMENTS[0].id)

  return (
    <LandingPageLayout>
      <Seo
        title="Use Cases"
        description="See how brands, agencies, and creators use Ofluence to run influencer marketing campaigns. Solutions for every team size and industry."
        path="/use-cases"
      />

      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-8">
          <motion.div {...fadeInUp}>
            <p className="text-primary mb-4 text-sm font-medium tracking-widest uppercase">
              Use Cases
            </p>
            <h1 className="font-display text-4xl leading-tight font-semibold tracking-tight md:text-5xl lg:text-6xl">
              Built for how you work
            </h1>
            <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg leading-relaxed">
              Whether you&apos;re a brand scaling partnerships, an agency managing multiple clients,
              or a creator growing your career — Ofluence adapts to your workflow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Audience tabs */}
      <section className="bg-muted/30 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as string)}
          >
            <div className="flex justify-center">
              <TabsList>
                {AUDIENCE_SEGMENTS.map((segment) => (
                  <TabsTrigger key={segment.id} value={segment.id}>
                    {segment.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {AUDIENCE_SEGMENTS.map((segment) => (
              <TabsContent key={segment.id} value={segment.id}>
                <SegmentContent segment={segment} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Industry verticals */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <motion.div className="mb-12 text-center md:mb-16" {...fadeInUp}>
            <p className="text-primary mb-3 text-sm font-medium tracking-widest uppercase">
              Industries
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Trusted across industries
            </h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg leading-relaxed">
              From fashion to tech, brands in every vertical use Ofluence to power their influencer
              programs.
            </p>
          </motion.div>

          <AnimatedStaggerGrid className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRY_VERTICALS.map((vertical) => (
              <AnimatedStaggerItem key={vertical.name}>
                <AnimatedCard>
                  <Card className="h-full">
                    <CardContent className="flex flex-col gap-4">
                      <div className="bg-primary/10 flex size-12 items-center justify-center rounded-xl">
                        <HugeiconsIcon icon={vertical.icon} className="text-primary size-6" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-semibold">{vertical.name}</h3>
                        <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                          {vertical.description}
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
            See Ofluence in action for your team
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-lg text-lg leading-relaxed">
            Start your free trial or book a personalized demo to see how Ofluence fits your
            workflow.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" render={<Link to="/contact" />}>
              Start free trial
              <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
            </Button>
            <Button size="lg" variant="outline" render={<Link to="/contact" />}>
              Book a demo
            </Button>
          </div>
        </FadeInView>
      </section>
    </LandingPageLayout>
  )
}

export const Route = createFileRoute('/use-cases')({
  component: UseCasesPage,
})
