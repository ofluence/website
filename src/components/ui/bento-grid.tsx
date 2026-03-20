import { cn } from '@/utils/global.utils'

interface BentoGridProps extends React.ComponentProps<'div'> {
  /** Number of columns at desktop. Default: 3 */
  cols?: 2 | 3 | 4
}

function BentoGrid({ className, cols = 3, children, ...props }: BentoGridProps) {
  return (
    <div
      data-slot="bento-grid"
      className={cn(
        'grid grid-cols-1 gap-4 md:grid-cols-2',
        cols === 3 && 'lg:grid-cols-3',
        cols === 4 && 'lg:grid-cols-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface BentoCardProps extends React.ComponentProps<'div'> {
  /** Columns to span at desktop. Default: 1 */
  colSpan?: 1 | 2 | 3
  /** Rows to span. Default: 1 */
  rowSpan?: 1 | 2
}

function BentoCard({ className, colSpan = 1, rowSpan = 1, children, ...props }: BentoCardProps) {
  return (
    <div
      data-slot="bento-card"
      className={cn(
        'bg-card border-border/60 group/bento shadow-soft hover:border-primary/30 hover:shadow-soft-md relative overflow-hidden rounded-lg border p-6 transition-all duration-300',
        colSpan === 2 && 'md:col-span-2',
        colSpan === 3 && 'md:col-span-2 lg:col-span-3',
        rowSpan === 2 && 'md:row-span-2',
        className
      )}
      {...props}
    >
      {/* Edge shimmer on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover/bento:opacity-100">
        <div className="from-primary/8 to-primary/4 absolute inset-0 rounded-lg bg-linear-to-br via-transparent" />
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}

export { BentoGrid, BentoCard }
