import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface GlassProgressBarProps {
  value: number
  max?: number
  label?: string
  showPercentage?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'success' | 'warning' | 'danger'
  className?: string
}

const sizes = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
}

const colors = {
  primary: 'bg-medical-primary',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  danger: 'bg-red-500',
}

export function GlassProgressBar({ value, max = 100, label, showPercentage = false, size = 'md', color = 'primary', className }: GlassProgressBarProps) {
  const percentage = Math.min(100, (value / max) * 100)

  return (
    <div className={cn('space-y-2', className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between text-sm">
          {label && <span>{label}</span>}
          {showPercentage && <span>{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className={cn('w-full rounded-full glass overflow-hidden', sizes[size])}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={cn('rounded-full', colors[color], sizes[size])}
        />
      </div>
    </div>
  )
}