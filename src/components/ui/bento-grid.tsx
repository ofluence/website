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

export { BentoGrid }
