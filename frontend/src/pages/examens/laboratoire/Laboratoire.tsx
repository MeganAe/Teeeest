import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Microscope, ClipboardList, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { ExamRequestList } from './ExamRequestList'
import { ResultForm } from './ResultForm'
import { api } from '@/services/api'

export default function Laboratoire() {
  const [stats, setStats] = useState({ pending: 0, completed: 0, today: 0 })
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    api.get('/exams/type/LABORATOIRE/stats').then(res => setStats(res.data))
  }, [refresh])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
            Laboratoire
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Gestion des examens de laboratoire
          </p>
        </div>
        <GlassButton variant="secondary">
          <Microscope className="mr-2 h-4 w-4" />
          Nouvelle analyse
        </GlassButton>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">En attente</p>
              <p className="text-2xl font-bold text-yellow-500">{stats.pending}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Traités</p>
              <p className="text-2xl font-bold text-green-500">{stats.completed}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Aujourd'hui</p>
              <p className="text-2xl font-bold text-blue-500">{stats.today}</p>
            </div>
            <ClipboardList className="h-8 w-8 text-blue-500" />
          </div>
        </GlassCard>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="requests">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="requests">Demandes en attente</TabsTrigger>
          <TabsTrigger value="results">Saisie des résultats</TabsTrigger>
        </TabsList>
        
        <TabsContent value="requests">
          <ExamRequestList type="LABORATOIRE" onRefresh={() => setRefresh(r => r + 1)} />
        </TabsContent>
        
        <TabsContent value="results">
          <ResultForm type="LABORATOIRE" onSuccess={() => setRefresh(r => r + 1)} />
        </TabsContent>
      </Tabs>
    </div>
  )
}