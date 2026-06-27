import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface GlassTableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  variant?: 'default' | 'striped' | 'bordered'
}

export const GlassTable = forwardRef<HTMLTableElement, GlassTableProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    return (
      <div className="relative w-full overflow-auto rounded-xl glass">
        <table
          ref={ref}
          className={cn(
            'w-full caption-bottom text-sm',
            variant === 'striped' && '[&_tbody_tr:nth-child(odd)]:bg-white/5',
            variant === 'bordered' && 'border-collapse',
            className
          )}
          {...props}
        >
          {children}
        </table>
      </div>
    )
  }
)
GlassTable.displayName = 'GlassTable'