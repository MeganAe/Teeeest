import { useState } from 'react'
import { Activity, Calendar, TrendingUp, Users } from 'lucide-react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { SessionPlanner } from './SessionPlanner'
import { EvolutionTracker } from './EvolutionTracker'
import { PatientProgress } from './PatientProgress'

export default function Kinesitherapie() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
            Kinésithérapie
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Gestion des séances de rééducation
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Séances aujourd'hui</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-500" />
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Patients actifs</p>
              <p className="text-2xl font-bold">28</p>
            </div>
            <Users className="h-8 w-8 text-green-500" />
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Taux d'amélioration</p>
              <p className="text-2xl font-bold text-green-500">85%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Séances totales</p>
              <p className="text-2xl font-bold">342</p>
            </div>
            <Activity className="h-8 w-8 text-purple-500" />
          </div>
        </GlassCard>
      </div>

      <Tabs defaultValue="planner">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="planner">Planification</TabsTrigger>
          <TabsTrigger value="evolution">Évolution</TabsTrigger>
          <TabsTrigger value="progress">Progrès patients</TabsTrigger>
        </TabsList>
        
        <TabsContent value="planner">
          <SessionPlanner />
        </TabsContent>
        
        <TabsContent value="evolution">
          <EvolutionTracker />
        </TabsContent>
        
        <TabsContent value="progress">
          <PatientProgress />
        </TabsContent>
      </Tabs>
    </div>
  )
}