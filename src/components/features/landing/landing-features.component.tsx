import { useState } from 'react'

import { Search01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { AnimatePresence, motion } from 'motion/react'

import { cn } from '@/utils/global.utils'
import { fadeInLeft, fadeInRight, fadeInUp } from '@/utils/motion.utils'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

import { LANDING_FEATURES } from '@/constants/landing.constants'
import type { LocaleCampaign, LocaleCreator, LocalePayment } from '@/constants/locale/locale.constants'

import { useLocaleContent } from '@/hooks/use-locale-content'

/* ─── Discover Mockup ─── */

function DiscoverMockup({ creators }: { creators: LocaleCreator[] }) {
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = creators.filter((creator) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      creator.name.toLowerCase().includes(query) ||
      creator.handle.toLowerCase().includes(query) ||
      creator.niche.toLowerCase().includes(query)
    )
  })

  return (
    <div className="flex min-h-[196px] flex-col gap-3">
      {/* Search bar — functional */}
      <div className="bg-background/80 focus-within:ring-primary/20 flex items-center gap-2 rounded-lg px-3 py-2 transition-shadow focus-within:ring-2">
        <HugeiconsIcon icon={Search01Icon} className="text-muted-foreground size-4 shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search creators by niche, location..."
          className="text-foreground placeholder:text-muted-foreground min-w-0 flex-1 bg-transparent text-xs outline-none"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-muted-foreground hover:text-foreground text-[10px] transition-colors"
          >
            Clear
          </button>
        )}
      </div>
      {/* Creator cards */}
      <AnimatePresence mode="popLayout">
        {filtered.length > 0 ? (
          filtered.slice(0, 3).map((creator) => (
            <motion.div
              key={creator.handle}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-background/60 hover:bg-background/80 flex cursor-default items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 hover:shadow-sm"
            >
              <div
                className={cn(
                  'size-9 shrink-0 rounded-full bg-gradient-to-br',
                  creator.gradient
                )}
              />
              <div className="flex-1">
                <p className="text-xs font-semibold">{creator.name}</p>
                <p className="text-muted-foreground text-[10px]">{creator.handle}</p>
              </div>
              <div className="text-right">
                <p className="font-display text-xs font-semibold">{creator.followers}</p>
                <Badge variant="coral" className="h-4 px-1.5 text-[9px]">
                  {creator.niche}
                </Badge>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-muted-foreground flex min-h-[130px] items-center justify-center text-xs"
          >
            No creators match your search.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Campaign Mockup ─── */

function CampaignMockup({ campaigns }: { campaigns: LocaleCampaign[] }) {
  const stages = [
    { label: 'Brief', status: 'done' },
    { label: 'Active', status: 'active' },
    { label: 'Review', status: 'pending' },
    { label: 'Done', status: 'pending' },
  ]
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-background/60 hover:bg-background/80 cursor-default rounded-xl px-4 py-3 transition-all duration-200 hover:shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold">{campaigns[0].name}</p>
            <p className="text-muted-foreground text-[10px]">
              {campaigns[0].creatorCount} creators · {campaigns[0].budget}
            </p>
          </div>
          <Badge variant={campaigns[0].statusVariant} className="h-4 px-1.5 text-[9px]">
            {campaigns[0].status}
          </Badge>
        </div>
        {/* Timeline */}
        <div className="mt-3 flex items-center gap-1">
          {stages.map((stage, index_) => (
            <div key={stage.label} className="flex flex-1 flex-col items-center gap-1">
              <div className="flex w-full items-center">
                <div
                  className={cn(
                    'size-3 shrink-0 rounded-full',
                    stage.status === 'done' && 'bg-success',
                    stage.status === 'active' && 'bg-primary',
                    stage.status === 'pending' && 'bg-muted-foreground/30'
                  )}
                />
                {index_ < stages.length - 1 && (
                  <div
                    className={cn(
                      'h-px flex-1',
                      stage.status === 'done' ? 'bg-success/50' : 'bg-muted-foreground/20'
                    )}
                  />
                )}
              </div>
              <span className="text-muted-foreground text-[9px]">{stage.label}</span>
            </div>
          ))}
        </div>
      </div>
      {campaigns[1] && (
        <div className="bg-background/60 hover:bg-background/80 cursor-default rounded-xl px-4 py-3 transition-all duration-200 hover:shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold">{campaigns[1].name}</p>
              <p className="text-muted-foreground text-[10px]">
                {campaigns[1].creatorCount} creators · {campaigns[1].budget}
              </p>
            </div>
            <Badge variant={campaigns[1].statusVariant} className="h-4 px-1.5 text-[9px]">
              {campaigns[1].status}
            </Badge>
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── Analytics Mockup ─── */

interface BarData {
  height: number
  value: string
}

const ANALYTICS_BARS: BarData[] = [
  { height: 35, value: '8.2K' },
  { height: 52, value: '14.6K' },
  { height: 45, value: '11.9K' },
  { height: 68, value: '21.3K' },
  { height: 82, value: '29.7K' },
  { height: 75, value: '24.1K' },
  { height: 90, value: '35.4K' },
]

function AnalyticsMockup() {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)

  const metrics = [
    { label: 'Reach', value: '1.2M', change: '+23%' },
    { label: 'Engagement', value: '4.7%', change: '+0.3%' },
    { label: 'ROI', value: '3.2x', change: '+18%' },
  ]
  return (
    <div className="flex flex-col gap-3">
      {/* Metrics row */}
      <div className="grid grid-cols-3 gap-2">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="bg-background/60 hover:bg-background/80 cursor-default rounded-lg px-2.5 py-2 text-center transition-all duration-200 hover:shadow-sm"
          >
            <p className="font-display text-sm font-bold">{metric.value}</p>
            <p className="text-muted-foreground text-[9px]">{metric.label}</p>
            <p className="text-[9px] font-medium text-[oklch(0.55_0.1_155)]">{metric.change}</p>
          </div>
        ))}
      </div>
      {/* Bar chart */}
      <div className="bg-background/60 rounded-xl p-3">
        <p className="text-muted-foreground mb-2 text-[10px] font-medium">Weekly Performance</p>
        <div className="flex items-end gap-1.5" style={{ height: '60px' }}>
          {ANALYTICS_BARS.map((bar, index_) => (
            <div
              key={index_}
              className="relative flex-1"
              style={{ height: '100%' }}
              onMouseEnter={() => setHoveredBar(index_)}
              onMouseLeave={() => setHoveredBar(null)}
            >
              {hoveredBar === index_ && (
                <div className="absolute -top-6 left-1/2 z-10 -translate-x-1/2 rounded-md bg-[oklch(0.2_0.01_60)] px-1.5 py-0.5 text-[8px] font-medium whitespace-nowrap text-[oklch(0.9_0.02_60)]">
                  {bar.value}
                </div>
              )}
              <div
                className={cn(
                  'absolute inset-x-0 bottom-0 cursor-default rounded-t bg-gradient-to-t transition-all duration-200',
                  hoveredBar === index_
                    ? 'from-chart-3/80 to-chart-3/50'
                    : 'from-chart-3/60 to-chart-3/30'
                )}
                style={{ height: `${bar.height}%` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Payments Mockup ─── */

function PaymentsMockup({
  payments,
  paymentTotal,
}: {
  payments: LocalePayment[]
  paymentTotal: string
}) {
  return (
    <div className="flex flex-col gap-2">
      {/* Header */}
      <div className="bg-background/60 hover:bg-background/80 cursor-default rounded-xl px-4 py-2.5 transition-all duration-200 hover:shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold">Recent Payments</p>
          <p className="font-display text-sm font-bold">{paymentTotal}</p>
        </div>
        <p className="text-muted-foreground text-[10px]">3 of 12 creators paid this month</p>
      </div>
      {/* Payment rows */}
      {payments.map((payment) => (
        <div
          key={payment.name}
          className="bg-background/60 hover:bg-background/80 flex cursor-default items-center gap-3 rounded-xl px-4 py-2.5 transition-all duration-200 hover:shadow-sm"
        >
          <div className="from-chart-4/30 to-chart-4/10 size-8 shrink-0 rounded-full bg-gradient-to-br" />
          <div className="flex-1">
            <p className="text-xs font-semibold">{payment.name}</p>
          </div>
          <div className="text-right">
            <p className="font-display text-xs font-semibold">{payment.amount}</p>
            <Badge variant={payment.statusVariant} className="h-4 px-1.5 text-[9px]">
              {payment.status}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  )
}

function LandingFeatures() {
  const locale = useLocaleContent()

  const featureMockups = [
    () => <DiscoverMockup creators={locale.creators} />,
    () => <CampaignMockup campaigns={locale.campaigns} />,
    () => <AnalyticsMockup />,
    () => <PaymentsMockup payments={locale.payments} paymentTotal={locale.paymentTotal} />,
  ]

  return (
    <section id="features" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Section header */}
        <motion.div className="mb-16 text-center md:mb-24" {...fadeInUp}>
          <p className="text-primary mb-3 text-sm font-medium tracking-widest uppercase">
            Platform
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            One platform. Every workflow.
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            Replace scattered tools with a single, connected platform that handles discovery,
            campaigns, tracking, and payments.
          </p>
        </motion.div>

        {/* Feature blocks */}
        <div className="flex flex-col gap-20 md:gap-28">
          {LANDING_FEATURES.map((feature, index) => {
            const isEven = index % 2 === 1
            const MockupComponent = featureMockups[index]
            return (
              <div
                key={feature.title}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                {/* Text */}
                <motion.div
                  className={cn('flex flex-col gap-4', isEven && 'lg:order-last')}
                  {...(isEven ? fadeInRight : fadeInLeft)}
                >
                  <Badge variant={feature.badgeVariant} className="w-fit">
                    {feature.title}
                  </Badge>
                  <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl">
                    {feature.headline}
                  </h3>
                  <p className="text-muted-foreground max-w-lg text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>

                {/* Visual mockup card */}
                <motion.div {...(isEven ? fadeInLeft : fadeInRight)}>
                  <Card
                    className={cn(
                      'hover:shadow-soft-lg border-0 transition-shadow duration-300',
                      feature.gradient
                    )}
                  >
                    <CardContent className="p-4 md:p-6">
                      <MockupComponent />
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export { LandingFeatures }
