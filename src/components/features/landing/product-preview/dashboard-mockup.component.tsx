import { useState } from 'react'

import { Activity01Icon, Dollar01Icon, EyeIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import { cn } from '@/utils/global.utils'

import { Badge } from '@/components/ui/badge'

interface BarData {
  height: number
  day: string
  value: string
}

const BAR_DATA: BarData[] = [
  { height: 40, day: 'M', value: '12.4K' },
  { height: 55, day: 'T', value: '18.2K' },
  { height: 45, day: 'W', value: '14.8K' },
  { height: 70, day: 'T', value: '24.1K' },
  { height: 85, day: 'F', value: '31.6K' },
  { height: 75, day: 'S', value: '26.3K' },
  { height: 92, day: 'S', value: '38.9K' },
]

export function DashboardMockup() {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)

  const kpis = [
    {
      icon: EyeIcon,
      label: 'Total Reach',
      value: '2.4M',
      change: '+23%',
      iconBg: 'from-chart-1/30 to-chart-1/10',
      iconColor: 'text-chart-1',
    },
    {
      icon: Activity01Icon,
      label: 'Engagement',
      value: '4.7%',
      change: '+0.8%',
      iconBg: 'from-chart-2/30 to-chart-2/10',
      iconColor: 'text-chart-2',
    },
    {
      icon: Dollar01Icon,
      label: 'ROI',
      value: '8.2x',
      change: '+18%',
      iconBg: 'from-chart-4/30 to-chart-4/10',
      iconColor: 'text-chart-4',
    },
  ]

  const campaigns = [
    { name: 'Summer Collection', status: 'Active', variant: 'sage' as const, progress: 75 },
    { name: 'Tech Launch', status: 'Review', variant: 'lavender' as const, progress: 45 },
    { name: 'Holiday Push', status: 'Draft', variant: 'amber' as const, progress: 10 },
  ]

  return (
    <div className="flex flex-col gap-3">
      {/* KPI row */}
      <div className="grid grid-cols-3 gap-2">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-background/60 hover:bg-background/80 cursor-default rounded-xl px-3 py-2.5 transition-all duration-200 hover:shadow-sm"
          >
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  'flex size-6 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br',
                  kpi.iconBg
                )}
              >
                <HugeiconsIcon icon={kpi.icon} className={cn('size-3', kpi.iconColor)} />
              </div>
              <p className="text-muted-foreground text-[9px]">{kpi.label}</p>
            </div>
            <div className="mt-1.5 flex items-baseline gap-1.5">
              <p className="font-display text-sm font-bold">{kpi.value}</p>
              <span className="text-[9px] font-medium text-[oklch(0.55_0.1_155)]">
                {kpi.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart + campaigns */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {/* Bar chart */}
        <div className="bg-background/60 rounded-xl p-3">
          <p className="text-muted-foreground mb-2 text-[10px] font-medium">Weekly Performance</p>
          <div className="flex items-end gap-1.5" style={{ height: '60px' }}>
            {BAR_DATA.map((bar, index) => (
              <div
                key={index}
                className="relative flex-1"
                style={{ height: '100%' }}
                onMouseEnter={() => setHoveredBar(index)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {/* Tooltip */}
                {hoveredBar === index && (
                  <div className="absolute -top-6 left-1/2 z-10 -translate-x-1/2 rounded-md bg-[oklch(0.2_0.01_60)] px-1.5 py-0.5 text-[8px] font-medium whitespace-nowrap text-[oklch(0.9_0.02_60)]">
                    {bar.value}
                  </div>
                )}
                <div
                  className={cn(
                    'absolute inset-x-0 bottom-0 cursor-default rounded-t bg-gradient-to-t transition-all duration-200',
                    hoveredBar === index
                      ? 'from-chart-1/80 to-chart-1/50'
                      : 'from-chart-1/60 to-chart-1/30'
                  )}
                  style={{ height: `${bar.height}%` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-1 flex gap-1.5">
            {BAR_DATA.map((bar, index) => (
              <span
                key={index}
                className={cn(
                  'flex-1 text-center text-[8px] transition-colors',
                  hoveredBar === index ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {bar.day}
              </span>
            ))}
          </div>
        </div>

        {/* Active campaigns */}
        <div className="bg-background/60 rounded-xl p-3">
          <p className="text-muted-foreground mb-2 text-[10px] font-medium">Active Campaigns</p>
          <div className="flex flex-col gap-2">
            {campaigns.map((c) => (
              <div
                key={c.name}
                className="hover:bg-background/40 flex cursor-default items-center gap-2 rounded-lg px-1 py-0.5 transition-colors duration-150"
              >
                <div
                  className={cn(
                    'size-2 shrink-0 rounded-full',
                    c.variant === 'sage' && 'bg-chart-2',
                    c.variant === 'lavender' && 'bg-chart-3',
                    c.variant === 'amber' && 'bg-chart-4'
                  )}
                />
                <span className="flex-1 truncate text-[10px] font-semibold">{c.name}</span>
                <Badge variant={c.variant} className="h-4 px-1.5 text-[8px]">
                  {c.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
