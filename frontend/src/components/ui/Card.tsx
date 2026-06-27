import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

export const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('rounded-xl border border-white/20 bg-white/50 dark:bg-slate-900/50 p-6', className)}
        {...props}
      />
    )
  }
)
Card.displayName = 'Card'
