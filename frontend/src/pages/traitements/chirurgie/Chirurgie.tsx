import { useState } from 'react'
import { Scissors, Calendar, Clock, Activity } from 'lucide-react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { SurgeryScheduler } from './SurgeryScheduler'
import { OperationReport } from './OperationReport'
import { SurgeryHistory } from './SurgeryHistory'

export default function Chirurgie() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
            Chirurgie
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Gestion des interventions chirurgicales
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Planifiées</p>
              <p className="text-2xl font-bold text-yellow-500">4</p>
            </div>
            <Calendar className="h-8 w-8 text-yellow-500" />
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Aujourd'hui</p>
              <p className="text-2xl font-bold text-blue-500">2</p>
            </div>
            <Clock className="h-8 w-8 text-blue-500" />
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Réalisées</p>
              <p className="text-2xl font-bold text-green-500">156</p>
            </div>
            <Scissors className="h-8 w-8 text-green-500" />
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Taux de succès</p>
              <p className="text-2xl font-bold text-green-500">98%</p>
            </div>
            <Activity className="h-8 w-8 text-green-500" />
          </div>
        </GlassCard>
      </div>

      <Tabs defaultValue="scheduler">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="scheduler">Planification</TabsTrigger>
          <TabsTrigger value="report">Compte rendu</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
        </TabsList>
        
        <TabsContent value="scheduler">
          <SurgeryScheduler />
        </TabsContent>
        
        <TabsContent value="report">
          <OperationReport />
        </TabsContent>
        
        <TabsContent value="history">
          <SurgeryHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
}