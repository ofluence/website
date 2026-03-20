import { useState } from 'react'

import { Search01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { motion } from 'motion/react'

import { cn } from '@/utils/global.utils'
import { scrollStagger, scrollStaggerItem } from '@/utils/motion.utils'
import { useLocaleContent } from '@/hooks/use-locale-content'

import { FadeInView } from '@/components/ui/animated-container'
import { Badge } from '@/components/ui/badge'
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid'

import { LANDING_FEATURES } from '@/constants/landing.constants'
import type {
  LocaleCampaign,
  LocaleCreator,
  LocalePayment,
} from '@/constants/locale/locale.constants'

/* ─── Discover Mockup — Pinterest-style Masonry Grid ─── */

/** Varying aspect ratios for masonry effect */
const MASONRY_RATIOS = [
  'aspect-[3/4]',
  'aspect-[2/3]',
  'aspect-[4/5]',
  'aspect-[3/5]',
  'aspect-[3/4]',
  'aspect-[4/5]',
  'aspect-[2/3]',
  'aspect-[3/5]',
  'aspect-[4/5]',
  'aspect-[3/4]',
  'aspect-[2/3]',
  'aspect-[3/5]',
  'aspect-[3/4]',
  'aspect-[4/5]',
  'aspect-[2/3]',
  'aspect-[3/4]',
  'aspect-[3/5]',
  'aspect-[4/5]',
] as const

function CreatorCard({ creator, index }: { creator: LocaleCreator; index: number }) {
  const aspectRatio = MASONRY_RATIOS[index % MASONRY_RATIOS.length]

  return (
    <div className="group/creator relative mb-2.5 cursor-default break-inside-avoid overflow-hidden rounded-xl">
      <div className={cn('relative w-full', aspectRatio)}>
        {creator.thumbnail ? (
          <img
            src={creator.thumbnail}
            alt={`${creator.name} content`}
            className="size-full object-cover transition-transform duration-300 group-hover/creator:scale-105"
            loading="lazy"
          />
        ) : (
          <div className={cn('size-full bg-linear-to-br', creator.gradient)} />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

        {/* Category badge — top-right */}
        <Badge
          variant="accent"
          className="absolute top-2 right-2 h-4 px-1.5 text-[9px] backdrop-blur-sm"
        >
          {creator.niche}
        </Badge>

        {/* Overlaid creator details — bottom */}
        <div className="absolute inset-x-0 bottom-0 p-2.5">
          <p className="text-xs font-semibold text-white">{creator.name}</p>
          <p className="text-[10px] text-white/70">{creator.followers} followers</p>
          <div className="mt-1 flex flex-wrap items-center gap-1">
            {creator.location && (
              <span className="rounded-full bg-white/15 px-1.5 py-0.5 text-[8px] font-medium text-white/90 backdrop-blur-sm">
                {creator.location}
              </span>
            )}
            {creator.demographic && (
              <span className="rounded-full bg-white/15 px-1.5 py-0.5 text-[8px] font-medium text-white/90 backdrop-blur-sm">
                {creator.demographic}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function DiscoverMockup({ creators }: { creators: LocaleCreator[] }) {
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = creators.filter((creator) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      creator.name.toLowerCase().includes(query) ||
      creator.niche.toLowerCase().includes(query) ||
      (creator.location?.toLowerCase().includes(query) ?? false)
    )
  })

  return (
    <div className="flex flex-col gap-3">
      {/* Search bar */}
      <div className="bg-background focus-within:ring-primary/20 flex items-center gap-2 rounded-xl px-4 py-3 transition-shadow focus-within:ring-2">
        <HugeiconsIcon icon={Search01Icon} className="text-muted-foreground size-5 shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search by niche, location..."
          className="text-foreground placeholder:text-muted-foreground min-w-0 flex-1 bg-transparent text-sm outline-none"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-muted-foreground hover:text-foreground text-xs transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {/* Masonry grid — clipped with fade-out */}
      <div className="relative max-h-160 overflow-hidden">
        <div className="columns-3 gap-2.5">
          {filtered.map((creator, index) => (
            <CreatorCard key={creator.handle} creator={creator} index={index} />
          ))}
        </div>
        {/* Fade-out gradient at bottom */}
        <div className="from-card pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t to-transparent" />
      </div>
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
      <div className="bg-background rounded-lg px-4 py-3">
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
        <div className="bg-background rounded-lg px-4 py-3">
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
      <div className="grid grid-cols-3 gap-2">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-background rounded-lg px-2.5 py-2 text-center">
            <p className="font-display text-sm font-semibold">{metric.value}</p>
            <p className="text-muted-foreground text-[9px]">{metric.label}</p>
            <p className="text-success text-[9px] font-medium">{metric.change}</p>
          </div>
        ))}
      </div>
      <div className="bg-background rounded-lg p-3">
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
                <div className="bg-foreground text-background absolute -top-6 left-1/2 z-10 -translate-x-1/2 rounded-md px-1.5 py-0.5 text-[8px] font-medium whitespace-nowrap">
                  {bar.value}
                </div>
              )}
              <div
                className={cn(
                  'absolute inset-x-0 bottom-0 cursor-default rounded-t-md bg-linear-to-t transition-all duration-200',
                  hoveredBar === index_
                    ? 'from-foreground/40 to-foreground/20'
                    : 'from-foreground/25 to-foreground/10'
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
      <div className="bg-background rounded-lg px-4 py-2.5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold">Recent Payments</p>
          <p className="font-display text-sm font-semibold">{paymentTotal}</p>
        </div>
        <p className="text-muted-foreground text-[10px]">3 of 12 creators paid this month</p>
      </div>
      {payments.map((payment) => (
        <div
          key={payment.name}
          className="bg-background flex items-center gap-3 rounded-lg px-4 py-2.5"
        >
          <div className="bg-muted size-8 shrink-0 rounded-full" />
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

/* ─── Main Features Section — Bento Grid ─── */

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
        <FadeInView className="mb-12 text-center">
          <p className="text-overline mb-3">Features</p>
          <h2 className="text-display-section text-foreground">
            Everything you need to run
            <br className="hidden sm:block" /> influencer campaigns
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            From discovery to payment, manage your entire influencer workflow in one platform.
          </p>
        </FadeInView>

        {/* Bento grid — asymmetric: 1 hero (2×2), 2 standard, 1 full-width */}
        <motion.div {...scrollStagger}>
          <BentoGrid cols={3}>
            {LANDING_FEATURES.map((feature, index) => {
              const MockupComponent = featureMockups[index]
              const colSpan = index === 0 ? 2 : index === 3 ? 3 : 1
              const rowSpan = index === 0 ? 2 : 1
              return (
                <motion.div
                  key={feature.title}
                  className={cn(
                    colSpan === 2 && 'md:col-span-2',
                    colSpan === 3 && 'md:col-span-2 lg:col-span-3',
                    rowSpan === 2 && 'md:row-span-2'
                  )}
                  {...scrollStaggerItem}
                >
                  <BentoCard className="flex h-full flex-col gap-5">
                    <div className="flex items-center gap-3">
                      {/* <div className="bg-primary/10 flex size-10 items-center justify-center rounded-md">
                        <HugeiconsIcon icon={feature.icon} className="text-primary size-5" />
                      </div> */}
                      <div>
                        <Badge variant="accent" className="mb-1">
                          {feature.title}
                        </Badge>
                        <h3 className="text-display-subsection text-foreground">
                          {feature.headline}
                        </h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                    <div className={cn('border-border/60 bg-card mt-5 rounded-[12px] border p-4')}>
                      <MockupComponent />
                    </div>
                  </BentoCard>
                </motion.div>
              )
            })}
          </BentoGrid>
        </motion.div>
      </div>
    </section>
  )
}

export { LandingFeatures }
