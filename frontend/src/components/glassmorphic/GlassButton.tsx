import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

export const GlassButton = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'glass px-4 py-2 rounded-xl font-medium transition-all hover:scale-[0.98] active:scale-[0.96]',
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
GlassButton.displayName = 'GlassButton'
