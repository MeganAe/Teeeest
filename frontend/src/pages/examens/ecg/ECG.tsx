import { useState } from 'react'
import { Heart, Activity, Clock, FileText } from 'lucide-react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { ECGRequest } from './ECGRequest'
import { ECGResult } from './ECGResult'
import { ECGArchives } from './ECGArchives'

export default function ECG() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
            Électrocardiogramme (ECG)
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Gestion des examens ECG
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">En attente</p>
              <p className="text-2xl font-bold text-yellow-500">6</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Réalisés</p>
              <p className="text-2xl font-bold text-green-500">142</p>
            </div>
            <Heart className="h-8 w-8 text-green-500" />
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Anormaux</p>
              <p className="text-2xl font-bold text-red-500">23</p>
            </div>
            <Activity className="h-8 w-8 text-red-500" />
          </div>
        </GlassCard>
      </div>

      <Tabs defaultValue="request">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="request">Nouvel examen</TabsTrigger>
          <TabsTrigger value="results">Saisie des résultats</TabsTrigger>
          <TabsTrigger value="archives">Archives</TabsTrigger>
        </TabsList>
        
        <TabsContent value="request">
          <ECGRequest />
        </TabsContent>
        
        <TabsContent value="results">
          <ECGResult />
        </TabsContent>
        
        <TabsContent value="archives">
          <ECGArchives />
        </TabsContent>
      </Tabs>
    </div>
  )
}