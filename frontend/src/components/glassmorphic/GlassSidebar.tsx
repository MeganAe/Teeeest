import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'

interface GlassSidebarProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export function GlassSidebar({ isOpen, onClose, children }: GlassSidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={cn(
              'fixed left-0 top-0 h-full w-72 z-50',
              'bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl',
              'border-r border-white/20 dark:border-white/10',
              'shadow-2xl'
            )}
          >
            <div className="flex justify-end p-4 lg:hidden">
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
            {children}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}