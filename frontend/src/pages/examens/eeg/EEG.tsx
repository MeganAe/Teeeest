import { useState } from 'react'
import { Brain, Activity, Clock, CheckCircle } from 'lucide-react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { EEGRequest } from './EEGRequest'
import { EEGResult } from './EEGResult'

export default function EEG() {
  const [refresh, setRefresh] = useState(0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
            Électroencéphalogramme (EEG)
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Gestion des examens EEG
          </p>
        </div>
      </div>

      <Tabs defaultValue="request">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="request">Nouvel examen</TabsTrigger>
          <TabsTrigger value="results">Saisie des résultats</TabsTrigger>
          <TabsTrigger value="archive">Archives</TabsTrigger>
        </TabsList>
        
        <TabsContent value="request">
          <EEGRequest onSuccess={() => setRefresh(r => r + 1)} />
        </TabsContent>
        
        <TabsContent value="results">
          <EEGResult />
        </TabsContent>
      </Tabs>
    </div>
  )
}