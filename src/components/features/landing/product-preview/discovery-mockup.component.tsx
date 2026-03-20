import { useState } from 'react'

import { CheckmarkCircle02Icon, Search01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { AnimatePresence, motion } from 'motion/react'

import { cn } from '@/utils/global.utils'

import { Badge } from '@/components/ui/badge'

interface CreatorData {
  name: string
  handle: string
  followers: string
  engagement: string
  match: string
  gradient: string
  niche: string
}

const ALL_CREATORS: CreatorData[] = [
  {
    name: 'Sophia Chen',
    handle: '@sophiastyle',
    followers: '1.2M',
    engagement: '4.8%',
    match: '96%',
    gradient: 'from-chart-1/30 to-chart-2/30',
    niche: 'fashion',
  },
  {
    name: 'Marcus Rivera',
    handle: '@marcusfit',
    followers: '890K',
    engagement: '5.2%',
    match: '92%',
    gradient: 'from-chart-2/30 to-chart-3/30',
    niche: 'fitness',
  },
  {
    name: 'Emma Taylor',
    handle: '@emmatravels',
    followers: '2.1M',
    engagement: '3.9%',
    match: '88%',
    gradient: 'from-chart-3/30 to-chart-4/30',
    niche: 'travel',
  },
  {
    name: 'Priya Sharma',
    handle: '@priyabeauty',
    followers: '650K',
    engagement: '6.1%',
    match: '85%',
    gradient: 'from-chart-4/30 to-chart-1/30',
    niche: 'lifestyle',
  },
  {
    name: 'Jake Thompson',
    handle: '@jakecooks',
    followers: '1.8M',
    engagement: '4.2%',
    match: '80%',
    gradient: 'from-chart-1/30 to-chart-3/30',
    niche: 'food',
  },
  {
    name: 'Aisha Patel',
    handle: '@aishatech',
    followers: '420K',
    engagement: '7.3%',
    match: '78%',
    gradient: 'from-chart-2/30 to-chart-4/30',
    niche: 'tech',
  },
]

interface FilterOption {
  label: string
  variant: 'coral' | 'sage' | 'sky' | 'lavender' | 'amber'
  matchField: 'niche' | 'followers' | 'engagement'
  matchValue?: string
}

const FILTER_OPTIONS: FilterOption[] = [
  { label: 'Fashion', variant: 'coral', matchField: 'niche', matchValue: 'fashion' },
  { label: 'Lifestyle', variant: 'sage', matchField: 'niche', matchValue: 'lifestyle' },
  { label: 'Travel', variant: 'sky', matchField: 'niche', matchValue: 'travel' },
  { label: 'Fitness', variant: 'lavender', matchField: 'niche', matchValue: 'fitness' },
  { label: 'ER > 5%', variant: 'amber', matchField: 'engagement' },
]

function ResultCount({ total, filtered }: { total: number; filtered: number }) {
  if (filtered === total) {
    return (
      <p className="text-muted-foreground text-center text-[10px]">
        Showing {Math.min(4, filtered)} of {total} creators
      </p>
    )
  }

  const suffix = filtered === 1 ? '' : 's'
  return (
    <p className="text-muted-foreground text-center text-[10px]">
      {filtered} result{suffix} found
    </p>
  )
}

export function DiscoveryMockup() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set())

  const toggleFilter = (label: string) => {
    setActiveFilters((previous) => {
      const next = new Set(previous)
      if (next.has(label)) {
        next.delete(label)
      } else {
        next.add(label)
      }
      return next
    })
  }

  const filteredCreators = ALL_CREATORS.filter((creator) => {
    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesSearch =
        creator.name.toLowerCase().includes(query) ||
        creator.handle.toLowerCase().includes(query) ||
        creator.niche.toLowerCase().includes(query)
      if (!matchesSearch) return false
    }

    // Active filter pills
    if (activeFilters.size > 0) {
      return [...activeFilters].some((filterLabel) => {
        const filter = FILTER_OPTIONS.find((f) => f.label === filterLabel)
        if (!filter) return false
        if (filter.matchField === 'niche') {
          return creator.niche === filter.matchValue
        }
        if (filter.matchField === 'engagement') {
          return Number.parseFloat(creator.engagement) > 5
        }
        return false
      })
    }

    return true
  })

  return (
    <div className="flex min-h-[320px] flex-col gap-3">
      {/* Search bar — functional */}
      <div className="bg-background/80 focus-within:ring-primary/20 flex items-center gap-2 rounded-lg px-3 py-2 transition-shadow focus-within:ring-2">
        <HugeiconsIcon icon={Search01Icon} className="text-muted-foreground size-3.5 shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search creators by name, handle, or niche..."
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

      {/* Filter pills — toggleable */}
      <div className="flex flex-wrap gap-1.5">
        {FILTER_OPTIONS.map((f) => {
          const isActive = activeFilters.has(f.label)
          return (
            <button key={f.label} onClick={() => toggleFilter(f.label)}>
              <Badge
                variant={f.variant}
                className={cn(
                  'h-5 cursor-pointer text-[9px] transition-all',
                  isActive && 'ring-primary/30 ring-1'
                )}
              >
                {isActive && (
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} className="mr-0.5 size-2.5" />
                )}
                {f.label}
              </Badge>
            </button>
          )
        })}
      </div>

      {/* Creator result cards */}
      <AnimatePresence mode="popLayout">
        {filteredCreators.length > 0 ? (
          filteredCreators.slice(0, 4).map((creator) => (
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
                  'flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br',
                  creator.gradient
                )}
              >
                <span className="text-foreground/60 text-[9px] font-bold">
                  {creator.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold">{creator.name}</p>
                <p className="text-muted-foreground text-[10px]">{creator.handle}</p>
                <div className="mt-0.5 flex gap-2">
                  <span className="text-muted-foreground text-[9px]">{creator.followers}</span>
                  <span className="text-muted-foreground text-[9px]">
                    {creator.engagement} eng.
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-display text-chart-2 text-xs font-bold">{creator.match}</p>
                <p className="text-muted-foreground text-[8px]">match</p>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-muted-foreground py-6 text-center text-xs"
          >
            No creators found. Try a different search or filter.
          </motion.div>
        )}
      </AnimatePresence>

      <ResultCount total={ALL_CREATORS.length} filtered={filteredCreators.length} />
    </div>
  )
}
