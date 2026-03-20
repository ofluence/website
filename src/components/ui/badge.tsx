import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/global.utils'

const badgeVariants = cva(
  'h-5 gap-1 rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium transition-all has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:size-3! inline-flex items-center justify-center w-fit whitespace-nowrap shrink-0 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive overflow-hidden group/badge',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground [a]:hover:bg-primary/80',
        secondary: 'bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80',
        destructive:
          'bg-destructive/10 [a]:hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive dark:bg-destructive/20',
        outline: 'border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground',
        ghost: 'hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50',
        link: 'text-primary underline-offset-4 hover:underline',
        coral:
          'bg-[oklch(0.95_0.03_25)] text-[oklch(0.45_0.12_25)] dark:bg-[oklch(0.30_0.05_25)] dark:text-[oklch(0.80_0.08_25)]',
        sage: 'bg-[oklch(0.95_0.03_155)] text-[oklch(0.40_0.10_155)] dark:bg-[oklch(0.30_0.05_155)] dark:text-[oklch(0.80_0.08_155)]',
        lavender:
          'bg-[oklch(0.95_0.03_300)] text-[oklch(0.40_0.08_300)] dark:bg-[oklch(0.30_0.05_300)] dark:text-[oklch(0.80_0.06_300)]',
        sky: 'bg-[oklch(0.95_0.03_230)] text-[oklch(0.40_0.10_230)] dark:bg-[oklch(0.30_0.05_230)] dark:text-[oklch(0.80_0.08_230)]',
        amber:
          'bg-[oklch(0.95_0.03_85)] text-[oklch(0.40_0.10_85)] dark:bg-[oklch(0.30_0.05_85)] dark:text-[oklch(0.80_0.08_85)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

function Badge({
  className,
  variant = 'default',
  render,
  ...props
}: useRender.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        className: cn(badgeVariants({ className, variant })),
      },
      props
    ),
    render,
    state: {
      slot: 'badge',
      variant,
    },
  })
}

export { Badge, badgeVariants }
