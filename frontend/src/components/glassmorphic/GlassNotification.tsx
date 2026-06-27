import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GlassNotificationProps {
  isOpen: boolean
  onClose: () => void
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
}

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}

const colors = {
  success: 'text-green-500 border-green-500/30',
  error: 'text-red-500 border-red-500/30',
  warning: 'text-yellow-500 border-yellow-500/30',
  info: 'text-blue-500 border-blue-500/30',
}

export function GlassNotification({ isOpen, onClose, type, title, message, duration = 5000 }: GlassNotificationProps) {
  const Icon = icons[type]

  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [isOpen, duration, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className={cn('fixed bottom-4 right-4 z-50 w-80 rounded-xl glass border p-4 shadow-xl', colors[type])}
        >
          <div className="flex gap-3">
            <Icon className="h-5 w-5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="font-semibold text-sm">{title}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{message}</p>
            </div>
            <button onClick={onClose} className="flex-shrink-0">
              <X className="h-4 w-4 text-slate-400" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}