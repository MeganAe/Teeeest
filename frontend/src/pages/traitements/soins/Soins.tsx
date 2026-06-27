import { useState } from 'react'
import { Syringe, Bandage, Pill, Calendar } from 'lucide-react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { NursingCare } from './NursingCare'
import { PlatrePansement } from './PlatrePansement'
import { MedicationAdmin } from './MedicationAdmin'

export default function Soins() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
            Soins infirmiers
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Gestion des soins quotidiens
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Soins aujourd'hui</p>
              <p className="text-2xl font-bold text-blue-500">18</p>
            </div>
            <Syringe className="h-8 w-8 text-blue-500" />
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Pansements</p>
              <p className="text-2xl font-bold text-green-500">7</p>
            </div>
            <Bandage className="h-8 w-8 text-green-500" />
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Médicaments</p>
              <p className="text-2xl font-bold text-purple-500">42</p>
            </div>
            <Pill className="h-8 w-8 text-purple-500" />
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Patients</p>
              <p className="text-2xl font-bold text-orange-500">12</p>
            </div>
            <Calendar className="h-8 w-8 text-orange-500" />
          </div>
        </GlassCard>
      </div>

      <Tabs defaultValue="nursing">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="nursing">Soins infirmiers</TabsTrigger>
          <TabsTrigger value="platre">Plâtre / Pansement</TabsTrigger>
          <TabsTrigger value="medication">Administration médicaments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="nursing">
          <NursingCare />
        </TabsContent>
        
        <TabsContent value="platre">
          <PlatrePansement />
        </TabsContent>
        
        <TabsContent value="medication">
          <MedicationAdmin />
        </TabsContent>
      </Tabs>
    </div>
  )
}