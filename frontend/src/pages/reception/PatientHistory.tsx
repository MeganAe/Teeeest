import { useState, useEffect } from 'react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { usePatientStore } from '@/stores/patientStore'
import { api } from '@/services/api'
import { Clock, FileText, Pill, DollarSign, Activity } from 'lucide-react'

export function PatientHistory() {
  const { selectedPatient } = usePatientStore()
  const [history, setHistory] = useState({ consultations: [], payments: [], prescriptions: [] })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (selectedPatient) {
      setLoading(true)
      api.get(`/patients/${selectedPatient.id}/history`).then(res => {
        setHistory(res.data)
        setLoading(false)
      })
    }
  }, [selectedPatient])

  if (!selectedPatient) return null

  return (
    <GlassCard className="p-6">
      <h3 className="text-lg font-semibold mb-4">Historique du patient</h3>
      <Tabs defaultValue="consultations">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="consultations">Consultations</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="payments">Paiements</TabsTrigger>
          <TabsTrigger value="hospitalizations">Hospitalisations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="consultations" className="space-y-3 mt-4">
          {history.consultations?.map((c: any) => (
            <div key={c.id} className="flex items-start gap-3 p-3 rounded-lg border border-white/20">
              <div className="w-8 h-8 rounded-full bg-medical-primary/10 flex items-center justify-center">
                <FileText className="w-4 h-4 text-medical-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{new Date(c.dateConsultation).toLocaleDateString('fr-FR')}</p>
                <p className="text-sm text-slate-500">Motif: {c.motif}</p>
                {c.diagnostic && <p className="text-sm">Diagnostic: {c.diagnostic}</p>}
              </div>
            </div>
          ))}
        </TabsContent>
        
        <TabsContent value="prescriptions" className="space-y-3 mt-4">
          {history.prescriptions?.map((p: any) => (
            <div key={p.id} className="flex items-start gap-3 p-3 rounded-lg border border-white/20">
              <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                <Pill className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{p.medicament}</p>
                <p className="text-sm text-slate-500">Dosage: {p.dosage} - Durée: {p.duree}</p>
                {p.instructions && <p className="text-sm">{p.instructions}</p>}
              </div>
            </div>
          ))}
        </TabsContent>
        
        <TabsContent value="payments" className="space-y-3 mt-4">
          {history.payments?.map((p: any) => (
            <div key={p.id} className="flex items-start gap-3 p-3 rounded-lg border border-white/20">
              <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-yellow-500" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{p.montant.toLocaleString()} FC</p>
                <p className="text-sm text-slate-500">Type: {p.type} - {new Date(p.createdAt).toLocaleDateString('fr-FR')}</p>
              </div>
            </div>
          ))}
        </TabsContent>
        
        <TabsContent value="hospitalizations" className="space-y-3 mt-4">
          {history.hospitalizations?.map((h: any) => (
            <div key={h.id} className="flex items-start gap-3 p-3 rounded-lg border border-white/20">
              <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Activity className="w-4 h-4 text-purple-500" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Lit {h.litNumber}</p>
                <p className="text-sm text-slate-500">Admission: {new Date(h.dateAdmission).toLocaleDateString('fr-FR')}</p>
                <p className="text-sm">Diagnostic: {h.diagnostic}</p>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </GlassCard>
  )
}