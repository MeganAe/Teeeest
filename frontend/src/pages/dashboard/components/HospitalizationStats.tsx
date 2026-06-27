import { useState, useEffect } from 'react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { api } from '@/services/api'

export function HospitalizationStats() {
  const [stats, setStats] = useState({ active: 0, discharged: 0, occupancyRate: 0 })

  useEffect(() => {
    api.get('/dashboard/hospitalization-stats').then(res => setStats(res.data))
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-2xl font-bold">{stats.active}</p>
          <p className="text-sm text-slate-500">Hospitalisations actives</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{stats.occupancyRate.toFixed(1)}%</p>
          <p className="text-sm text-slate-500">Taux d'occupation</p>
        </div>
      </div>
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
        <div className="bg-medical-primary h-2 rounded-full transition-all duration-500" style={{ width: `${stats.occupancyRate}%` }} />
      </div>
    </div>
  )
}