import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GlassCard } from '@/components/glassmorphic/GlassCard'

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard className="p-6">
            <Outlet />
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}