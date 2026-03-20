import { cn } from '@/utils/global.utils'

import { Badge } from '@/components/ui/badge'

export function CampaignsMockup() {
  const campaigns = [
    {
      name: 'Summer Glow Collection',
      status: 'Active',
      statusVariant: 'sage' as const,
      platform: 'Instagram',
      platformVariant: 'sky' as const,
      creators: 12,
      budget: '$25K',
      stages: [true, true, false, false],
      deliverables: '8/12',
    },
    {
      name: 'Tech Unboxing Series',
      status: 'Review',
      statusVariant: 'lavender' as const,
      platform: 'YouTube',
      platformVariant: 'coral' as const,
      creators: 8,
      budget: '$40K',
      stages: [true, true, true, false],
      deliverables: '6/8',
    },
    {
      name: 'Holiday Gift Guide',
      status: 'Draft',
      statusVariant: 'amber' as const,
      platform: 'Multi',
      platformVariant: 'lavender' as const,
      creators: 5,
      budget: '$15K',
      stages: [true, false, false, false],
      deliverables: '0/10',
    },
  ]

  const stageLabels = ['Brief', 'Content', 'Review', 'Done']

  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold">All Campaigns</p>
          <Badge variant="lavender" className="h-4 px-1.5 text-[9px]">
            12
          </Badge>
        </div>
        <div className="flex gap-1.5">
          <span className="bg-background/80 rounded-md px-2 py-1 text-[9px]">All Statuses</span>
          <span className="bg-background/80 rounded-md px-2 py-1 text-[9px]">This Month</span>
        </div>
      </div>

      {/* Campaign cards */}
      {campaigns.map((c) => (
        <div
          key={c.name}
          className="bg-background/60 hover:bg-background/80 flex cursor-default flex-col gap-2.5 rounded-xl px-4 py-3 transition-all duration-200 hover:shadow-sm"
        >
          {/* Top: name + badges */}
          <div className="flex items-center gap-2">
            <p className="flex-1 text-xs font-semibold">{c.name}</p>
            <Badge variant={c.statusVariant} className="h-4 px-1.5 text-[9px]">
              {c.status}
            </Badge>
            <Badge variant={c.platformVariant} className="h-4 px-1.5 text-[9px]">
              {c.platform}
            </Badge>
          </div>

          {/* Middle: avatars + budget */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      'border-background/60 size-6 rounded-full border-2 bg-gradient-to-br',
                      index === 0 && 'from-chart-1/30 to-chart-2/30',
                      index === 1 && 'from-chart-2/30 to-chart-3/30',
                      index === 2 && 'from-chart-3/30 to-chart-4/30'
                    )}
                  />
                ))}
              </div>
              <span className="text-muted-foreground text-[10px]">+{c.creators - 3} creators</span>
            </div>
            <span className="font-display text-[10px] font-semibold">{c.budget}</span>
          </div>

          {/* Bottom: timeline + deliverables */}
          <div className="flex items-center gap-3">
            <div className="flex flex-1 items-center gap-0.5">
              {c.stages.map((done, index) => (
                <div key={index} className="flex flex-1 flex-col items-center gap-0.5">
                  <div className="flex w-full items-center">
                    <div
                      className={cn(
                        'size-2.5 shrink-0 rounded-full',
                        done ? 'bg-success' : 'bg-muted-foreground/30'
                      )}
                    />
                    {index < 3 && (
                      <div
                        className={cn(
                          'h-px flex-1',
                          done && c.stages[index + 1] !== undefined
                            ? 'bg-success/50'
                            : 'bg-muted-foreground/20'
                        )}
                      />
                    )}
                  </div>
                  <span className="text-muted-foreground text-[8px]">{stageLabels[index]}</span>
                </div>
              ))}
            </div>
            <span className="text-muted-foreground shrink-0 text-[9px]">
              {c.deliverables} deliverables
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
