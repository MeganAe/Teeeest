import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

export const GlassInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'glass w-full px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-medical-primary/50',
          className
        )}
        {...props}
      />
    )
  }
)
GlassInput.displayName = 'GlassInput'
