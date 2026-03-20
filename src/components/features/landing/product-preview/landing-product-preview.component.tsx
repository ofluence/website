import { useState } from 'react'

import {
  AnalyticsUpIcon,
  ArrowRight01Icon,
  Megaphone01Icon,
  Search01Icon,
  SecurityCheckIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import type { IconSvgElement } from '@hugeicons/react'
import { Link } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'motion/react'

import { cn } from '@/utils/global.utils'

import { FadeInView } from '@/components/ui/animated-container'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

import { CampaignsMockup } from './campaigns-mockup.component'
import { DashboardMockup } from './dashboard-mockup.component'
import { DiscoveryMockup } from './discovery-mockup.component'
import { IndustryStats } from './industry-stats.component'

interface PreviewTab {
  id: string
  label: string
  icon: IconSvgElement
  mockup: () => React.JSX.Element
}

const PREVIEW_TABS: PreviewTab[] = [
  { id: 'dashboard', label: 'Dashboard', icon: AnalyticsUpIcon, mockup: DashboardMockup },
  { id: 'discovery', label: 'Creator Discovery', icon: Search01Icon, mockup: DiscoveryMockup },
  { id: 'campaigns', label: 'Campaigns', icon: Megaphone01Icon, mockup: CampaignsMockup },
]

function BrowserChrome({ tabId }: { tabId: string }) {
  return (
    <CardHeader className="border-border/50 bg-muted/30 border-b px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[oklch(0.65_0.15_25)]" />
          <span className="size-2.5 rounded-full bg-[oklch(0.80_0.10_85)]" />
          <span className="size-2.5 rounded-full bg-[oklch(0.70_0.12_155)]" />
        </div>
        <div className="flex flex-1 items-center gap-1.5 rounded-md bg-[oklch(0.96_0.005_80)] px-2.5 py-1 dark:bg-[oklch(0.2_0.005_80)]">
          <HugeiconsIcon icon={SecurityCheckIcon} className="text-muted-foreground/60 size-3" />
          <span className="text-muted-foreground text-[11px]">app.ofluence.com/{tabId}</span>
        </div>
      </div>
    </CardHeader>
  )
}

function ProductPreview() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const activePreview = PREVIEW_TABS.find((t) => t.id === activeTab) ?? PREVIEW_TABS[0]
  const MockupComponent = activePreview.mockup

  return (
    <div className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <FadeInView className="mb-12 text-center md:mb-16">
          <Badge variant="sage" className="mb-4">
            Product Preview
          </Badge>
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            See Ofluence in action
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-lg text-lg leading-relaxed">
            Everything you need to run influencer campaigns — from discovery to payment.
          </p>
        </FadeInView>

        <FadeInView className="mx-auto max-w-4xl">
          {/* Tab buttons */}
          <div className="mb-6 flex justify-center gap-2">
            {PREVIEW_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all',
                  activeTab === tab.id
                    ? 'bg-primary/10 text-primary shadow-sm'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <HugeiconsIcon icon={tab.icon} className="size-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Gradient border wrapper */}
          <div className="shadow-soft-lg rounded-2xl bg-gradient-to-br from-[oklch(0.85_0.06_25/0.3)] via-transparent to-[oklch(0.85_0.06_155/0.2)] p-px">
            <Card className="overflow-hidden rounded-[calc(1rem-1px)] border-0">
              <BrowserChrome tabId={activePreview.id} />
              <CardContent className="min-h-[360px] p-4 md:p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <MockupComponent />
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <Button size="lg" render={<Link to="/contact" />}>
              Try it free
              <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
            </Button>
          </div>
        </FadeInView>
      </div>
    </div>
  )
}

export function LandingProductPreview() {
  return (
    <section>
      <IndustryStats />
      <ProductPreview />
    </section>
  )
}
