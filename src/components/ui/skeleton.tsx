import { cn } from '@/utils/global.utils'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        'from-muted via-muted/50 to-muted animate-[shimmer_1.8s_ease-in-out_infinite] rounded-md bg-gradient-to-r bg-[length:200%_100%]',
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
