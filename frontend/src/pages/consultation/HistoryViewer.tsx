import { useState, useEffect } from 'react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { api } from '@/services/api'
import { FileText, Pill, Microscope, Activity } from 'lucide-react'

interface HistoryViewerProps {
  patientId: string
}

export function HistoryViewer({ patientId }: HistoryViewerProps) {
  const [history, setHistory] = useState({ consultations: [], prescriptions: [], exams: [], hospitalizations: [] })

  useEffect(() => {
    if (patientId) {
      api.get(`/patients/${patientId}/history`).then(res => setHistory(res.data))
    }
  }, [patientId])

  return (
    <GlassCard className="p-4">
      <h3 className="text-lg font-semibold mb-4">Historique médical</h3>
      <Tabs defaultValue="consultations">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="consultations">Consultations</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="exams">Examens</TabsTrigger>
          <TabsTrigger value="hospitalizations">Hospitalisations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="consultations" className="space-y-3 mt-4">
          {history.consultations?.map((c: any) => (
            <div key={c.id} className="p-3 rounded-lg border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-medical-primary" />
                <span className="font-medium">{new Date(c.dateConsultation).toLocaleDateString()}</span>
              </div>
              <p className="text-sm"><strong>Motif:</strong> {c.motif}</p>
              {c.diagnostic && <p className="text-sm"><strong>Diagnostic:</strong> {c.diagnostic}</p>}
              {c.traitement && <p className="text-sm"><strong>Traitement:</strong> {c.traitement}</p>}
            </div>
          ))}
        </TabsContent>
        
        <TabsContent value="prescriptions" className="space-y-3 mt-4">
          {history.prescriptions?.map((p: any) => (
            <div key={p.id} className="p-3 rounded-lg border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <Pill className="w-4 h-4 text-green-500" />
                <span className="font-medium">{p.medicament}</span>
              </div>
              <p className="text-sm">Dosage: {p.dosage} - Durée: {p.duree}</p>
              {p.instructions && <p className="text-sm">Instructions: {p.instructions}</p>}
            </div>
          ))}
        </TabsContent>
        
        <TabsContent value="exams" className="space-y-3 mt-4">
          {history.exams?.map((e: any) => (
            <div key={e.id} className="p-3 rounded-lg border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <Microscope className="w-4 h-4 text-purple-500" />
                <span className="font-medium">{e.type}</span>
              </div>
              <p className="text-sm">Demandé le: {new Date(e.requestedAt).toLocaleDateString()}</p>
              {e.examResult && <p className="text-sm">Résultat: {e.examResult.result}</p>}
            </div>
          ))}
        </TabsContent>
        
        <TabsContent value="hospitalizations" className="space-y-3 mt-4">
          {history.hospitalizations?.map((h: any) => (
            <div key={h.id} className="p-3 rounded-lg border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-red-500" />
                <span className="font-medium">Lit {h.litNumber}</span>
              </div>
              <p className="text-sm">Admission: {new Date(h.dateAdmission).toLocaleDateString()}</p>
              <p className="text-sm">Diagnostic: {h.diagnostic}</p>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </GlassCard>
  )
}