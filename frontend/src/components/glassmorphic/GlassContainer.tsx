import { cn } from '@/lib/utils'
import { forwardRef } from 'react'
import { motion } from 'framer-motion'

interface GlassContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: 'light' | 'medium' | 'heavy'
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  animated?: boolean
}

const intensityStyles = {
  light: 'bg-white/30 dark:bg-black/30 backdrop-blur-md',
  medium: 'bg-white/50 dark:bg-black/50 backdrop-blur-xl',
  heavy: 'bg-white/70 dark:bg-black/70 backdrop-blur-2xl',
}

const roundedStyles = {
  sm: 'rounded-lg',
  md: 'rounded-xl',
  lg: 'rounded-2xl',
  xl: 'rounded-3xl',
  '2xl': 'rounded-[2rem]',
  full: 'rounded-full',
}

export const GlassContainer = forwardRef<HTMLDivElement, GlassContainerProps>(
  ({ className, intensity = 'medium', rounded = 'xl', animated = false, children, ...props }, ref) => {
    const Comp = animated ? motion.div : 'div'
    return (
      <Comp
        ref={ref}
        className={cn(
          'border border-white/20 dark:border-white/10 shadow-lg',
          intensityStyles[intensity],
          roundedStyles[rounded],
          className
        )}
        {...(animated && { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 } })}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
GlassContainer.displayName = 'GlassContainer'