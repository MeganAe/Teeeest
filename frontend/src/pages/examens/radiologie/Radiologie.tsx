import { useState } from 'react'
import { Camera, Image, FileText, Clock, CheckCircle } from 'lucide-react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { RadiologyRequest } from './RadiologyRequest'
import { ImageUploader } from './ImageUploader'
import { ImageViewer } from './ImageViewer'
import { RadiologyReport } from './RadiologyReport'

export default function Radiologie() {
  const [refresh, setRefresh] = useState(0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
            Radiologie
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Gestion des examens radiologiques
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">En attente</p>
              <p className="text-2xl font-bold text-yellow-500">8</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Réalisés</p>
              <p className="text-2xl font-bold text-green-500">24</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Images stockées</p>
              <p className="text-2xl font-bold text-blue-500">156</p>
            </div>
            <Image className="h-8 w-8 text-blue-500" />
          </div>
        </GlassCard>
      </div>

      <Tabs defaultValue="request">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="request">Nouvelle demande</TabsTrigger>
          <TabsTrigger value="upload">Upload images</TabsTrigger>
          <TabsTrigger value="viewer">Visualisation</TabsTrigger>
          <TabsTrigger value="reports">Rapports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="request">
          <RadiologyRequest onSuccess={() => setRefresh(r => r + 1)} />
        </TabsContent>
        
        <TabsContent value="upload">
          <ImageUploader />
        </TabsContent>
        
        <TabsContent value="viewer">
          <ImageViewer />
        </TabsContent>
        
        <TabsContent value="reports">
          <RadiologyReport />
        </TabsContent>
      </Tabs>
    </div>
  )
}