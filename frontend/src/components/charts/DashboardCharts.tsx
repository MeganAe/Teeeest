import { useState } from 'react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { RevenueChart } from './RevenueChart'
import { PatientStats } from './PatientStats'
import { ActivityHeatmap } from './ActivityHeatmap'
import { PieChartCard } from './PieChartCard'
import { api } from '@/services/api'
import { useEffect } from 'react'

export function DashboardCharts() {
  const [consultationStats, setConsultationStats] = useState([])

  useEffect(() => {
    api.get('/dashboard/consultations-stats').then(res => {
      const formatted = Object.entries(res.data.byMedecin).map(([name, count]) => ({ name, value: count }))
      setConsultationStats(formatted)
    })
  }, [])

  return (
    <div className="space-y-6">
      <GlassCard className="p-6">
        <Tabs defaultValue="revenue">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="revenue">Revenus</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="activity">Activité</TabsTrigger>
          </TabsList>
          <TabsContent value="revenue" className="pt-4">
            <RevenueChart />
          </TabsContent>
          <TabsContent value="patients" className="pt-4">
            <PatientStats />
          </TabsContent>
          <TabsContent value="activity" className="pt-4">
            <ActivityHeatmap />
          </TabsContent>
        </Tabs>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <PieChartCard data={consultationStats} title="Consultations par médecin" />
        </GlassCard>
        <GlassCard className="p-6">
          {/* Autre graphique */}
        </GlassCard>
      </div>
    </div>
  )
}