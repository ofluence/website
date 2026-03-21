import { useState } from 'react'

import { InstagramIcon, Search01Icon, TiktokIcon, YoutubeIcon } from '@hugeicons/core-free-icons'
import type { IconSvgElement } from '@hugeicons/react'
import { HugeiconsIcon } from '@hugeicons/react'
import { m } from 'motion/react'

import { cn } from '@/utils/global.utils'
import { scrollStagger, scrollStaggerItem } from '@/utils/motion.utils'
import {
  formatCompact,
  formatCurrency,
  randomFloat,
  randomInt,
  shuffle,
} from '@/utils/random.utils'
import { useLocaleContent } from '@/hooks/use-locale-content'

import { FadeInView } from '@/components/ui/animated-container'
import { Badge } from '@/components/ui/badge'
import { BentoGrid } from '@/components/ui/bento-grid'
import { MagicCard } from '@/components/ui/magic-card'

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

function CreatorCard({ creator, aspectRatio }: { creator: LocaleCreator; aspectRatio: string }) {
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
  const [shuffledCreators] = useState(() => shuffle(creators))
  const [shuffledRatios] = useState(() => shuffle([...MASONRY_RATIOS]))

  const filtered = shuffledCreators.filter((creator) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      creator.name.toLowerCase().includes(query) ||
      creator.niche.toLowerCase().includes(query) ||
      (creator.location?.toLowerCase().includes(query) ?? false)
    )
  })

  return (
    <div className="flex flex-col gap-5">
      {/* Search bar */}
      <div className="bg-card focus-within:ring-primary/40 ring-primary/30 flex items-center gap-3 rounded-xl px-4 py-3 ring-1 transition-shadow focus-within:ring-2">
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
      <div className="relative max-h-166 overflow-hidden">
        <div className="columns-1 gap-3 sm:columns-2 md:columns-3">
          {filtered.map((creator, index) => (
            <CreatorCard
              key={creator.handle}
              creator={creator}
              aspectRatio={shuffledRatios[index % shuffledRatios.length]}
            />
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
  const [shuffledCampaigns] = useState(() => shuffle(campaigns))
  const stages = [
    { label: 'Brief', status: 'done' },
    { label: 'Active', status: 'active' },
    { label: 'Review', status: 'pending' },
    { label: 'Done', status: 'pending' },
  ]
  return (
    <div className="flex flex-col gap-3">
      <div className="bg-card rounded-lg px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold">{shuffledCampaigns[0].name}</p>
            <p className="text-muted-foreground text-[10px]">
              {shuffledCampaigns[0].creatorCount} creators · {shuffledCampaigns[0].budget}
            </p>
          </div>
          <Badge variant={shuffledCampaigns[0].statusVariant} className="h-4 px-1.5 text-[9px]">
            {shuffledCampaigns[0].status}
          </Badge>
        </div>
        <div className="mt-6 ml-6 flex items-center gap-1">
          {stages.map((stage, index_) => (
            <div key={stage.label} className="flex flex-1 flex-col items-center gap-3">
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
              <span className="text-muted-foreground self-start text-[9px]">{stage.label}</span>
            </div>
          ))}
        </div>
      </div>
      {shuffledCampaigns[1] && (
        <div className="bg-card rounded-lg px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold">{shuffledCampaigns[1].name}</p>
              <p className="text-muted-foreground text-[10px]">
                {shuffledCampaigns[1].creatorCount} creators · {shuffledCampaigns[1].budget}
              </p>
            </div>
            <Badge variant={shuffledCampaigns[1].statusVariant} className="h-4 px-1.5 text-[9px]">
              {shuffledCampaigns[1].status}
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

function generateRandomBars(): BarData[] {
  return Array.from({ length: 7 }, () => {
    const height = randomInt(25, 95)
    const raw = randomInt(5000, 40000)
    return { height, value: formatCompact(raw) }
  })
}

function generateRandomMetrics() {
  const reach = randomInt(800_000, 2_500_000)
  const engagement = randomFloat(3.2, 6.8, 1)
  const roi = randomFloat(2.1, 5.5, 1)
  return [
    { label: 'Reach', value: formatCompact(reach), change: `+${randomInt(8, 35)}%` },
    { label: 'Engagement', value: `${engagement}%`, change: `+${randomFloat(0.1, 0.8, 1)}%` },
    { label: 'ROI', value: `${roi}x`, change: `+${randomInt(5, 25)}%` },
  ]
}

function AnalyticsMockup() {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)
  const [bars] = useState(generateRandomBars)
  const [metrics] = useState(generateRandomMetrics)
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-card rounded-lg px-2.5 py-2 text-center">
            <p className="font-display text-sm font-semibold">{metric.value}</p>
            <p className="text-muted-foreground text-[9px]">{metric.label}</p>
            <p className="text-success text-[9px] font-medium">{metric.change}</p>
          </div>
        ))}
      </div>
      <div className="bg-card rounded-lg p-3">
        <p className="text-muted-foreground mb-2 text-[10px] font-medium">Weekly Performance</p>
        <div className="flex items-end gap-1.5" style={{ height: 'clamp(40px, 12vw, 60px)' }}>
          {bars.map((bar, index_) => (
            <div
              key={index_}
              className="relative flex-1"
              style={{ height: '100%' }}
              onMouseEnter={() => setHoveredBar(index_)}
              onMouseLeave={() => setHoveredBar(null)}
            >
              {hoveredBar === index_ && (
                <div className="bg-foreground text-card absolute -top-6 left-1/2 z-10 -translate-x-1/2 rounded-md px-1.5 py-0.5 text-[8px] font-medium whitespace-nowrap">
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

const platformIconMap: Record<string, IconSvgElement> = {
  Instagram: InstagramIcon,
  YouTube: YoutubeIcon,
  TikTok: TiktokIcon,
}

function PaymentsMockup({
  payments,
  currencySymbol,
  regionCode,
}: {
  payments: LocalePayment[]
  currencySymbol: string
  regionCode: string
}) {
  const [visiblePayments] = useState(() => {
    const shuffled = shuffle(payments)
    const count = randomInt(3, Math.min(4, shuffled.length))
    return shuffled.slice(0, count)
  })

  const total = visiblePayments.reduce((sum, payment) => sum + payment.amountValue, 0)
  const formattedTotal = formatCurrency(total, currencySymbol, regionCode)

  return (
    <div className="flex flex-col gap-3">
      <div className="bg-card flex flex-wrap items-center justify-between gap-2 rounded-lg px-3 py-3 sm:px-4 sm:py-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <p className="text-sm font-semibold sm:text-base">Recent Payments</p>
          <p className="text-muted-foreground text-[10px]">
            {visiblePayments.length} of 12 creators paid this month
          </p>
        </div>
        <p className="font-display text-sm font-semibold">{formattedTotal}</p>
      </div>
      {visiblePayments.map((payment) => (
        <div
          key={payment.name}
          className="bg-card flex justify-between gap-3 rounded-lg px-3 py-3 sm:px-4"
        >
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <img
              src={payment.avatar}
              alt={payment.name}
              className="size-7 shrink-0 rounded-full object-cover sm:size-8"
            />
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold">{payment.name}</p>
              <p className="text-muted-foreground truncate text-[10px]">{payment.handle}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex flex-wrap items-center gap-2 text-[10px]">
              <div className="flex items-center gap-1.5">
                {payment.platforms.map((platform) => {
                  const icon = platformIconMap[platform]
                  if (!icon) return null
                  return (
                    <HugeiconsIcon
                      key={platform}
                      icon={icon}
                      className="text-muted-foreground/60 size-3.5"
                    />
                  )
                })}
              </div>
              <span className="text-muted-foreground">
                {payment.campaign} · {payment.duration}
              </span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {payment.roas} ROAS
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={payment.statusVariant} className="h-4 px-1.5 text-[9px]">
                {payment.status}
              </Badge>
              <p className="font-display text-xs font-semibold">{payment.amount}</p>
            </div>
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
    () => (
      <PaymentsMockup
        payments={locale.payments}
        currencySymbol={locale.region.currencySymbol}
        regionCode={locale.region.code}
      />
    ),
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
        <m.div {...scrollStagger}>
          <BentoGrid cols={3}>
            {LANDING_FEATURES.map((feature, index) => {
              const MockupComponent = featureMockups[index]
              const colSpanIndex = index === 3 ? 3 : 1
              const colSpan = index === 0 ? 2 : colSpanIndex
              const rowSpan = index === 0 ? 2 : 1
              return (
                <m.div
                  key={feature.title}
                  className={cn(
                    colSpan === 2 && 'md:col-span-2',
                    colSpan === 3 && 'md:col-span-2 lg:col-span-3',
                    rowSpan === 2 && 'md:row-span-2'
                  )}
                  {...scrollStaggerItem}
                >
                  <MagicCard className="rounded-lg">
                    <div className="flex h-full flex-col gap-3 p-6">
                      <div className="flex items-center gap-3">
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
                      <div
                        className={cn(
                          'border-border/60 bg-background mt-5 rounded-[12px] border p-4'
                        )}
                      >
                        <MockupComponent />
                      </div>
                    </div>
                  </MagicCard>
                </m.div>
              )
            })}
          </BentoGrid>
        </m.div>
      </div>
    </section>
  )
}

export { LandingFeatures }
