import { useState } from 'react'
import { Bed, Users, Calendar, Activity } from 'lucide-react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { AdmissionForm } from './AdmissionForm'
import { BedManagement } from './BedManagement'
import { DailyFollowup } from './DailyFollowup'
import { DischargeSummary } from './DischargeSummary'

export default function Hospitalisation() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
            Hospitalisation
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Gestion des hospitalisations
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Lits occupés</p>
              <p className="text-2xl font-bold">32/50</p>
            </div>
            <Bed className="h-8 w-8 text-blue-500" />
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Patients hospitalisés</p>
              <p className="text-2xl font-bold">28</p>
            </div>
            <Users className="h-8 w-8 text-green-500" />
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Sorties aujourd'hui</p>
              <p className="text-2xl font-bold">4</p>
            </div>
            <Calendar className="h-8 w-8 text-purple-500" />
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Durée moyenne</p>
              <p className="text-2xl font-bold">5.2j</p>
            </div>
            <Activity className="h-8 w-8 text-orange-500" />
          </div>
        </GlassCard>
      </div>

      <Tabs defaultValue="admission">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="admission">Admission</TabsTrigger>
          <TabsTrigger value="beds">Gestion des lits</TabsTrigger>
          <TabsTrigger value="followup">Suivi journalier</TabsTrigger>
          <TabsTrigger value="discharge">Sortie</TabsTrigger>
        </TabsList>
        
        <TabsContent value="admission">
          <AdmissionForm />
        </TabsContent>
        
        <TabsContent value="beds">
          <BedManagement />
        </TabsContent>
        
        <TabsContent value="followup">
          <DailyFollowup />
        </TabsContent>
        
        <TabsContent value="discharge">
          <DischargeSummary />
        </TabsContent>
      </Tabs>
    </div>
  )
}