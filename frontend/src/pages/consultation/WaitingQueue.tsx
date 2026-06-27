import { useState, useEffect } from 'react'
import { Clock, User, ChevronRight } from 'lucide-react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { api } from '@/services/api'
import { useConsultationStore } from '@/stores/consultationStore'

export function WaitingQueue() {
  const [waitingList, setWaitingList] = useState([])
  const { setCurrentConsultation } = useConsultationStore()

  useEffect(() => {
    api.get('/consultations/waiting-queue').then(res => setWaitingList(res.data))
  }, [])

  const startConsultation = async (item: any) => {
    await api.put(`/consultations/${item.id}/status`, { status: 'EN_COURS' })
    setCurrentConsultation(item)
    setWaitingList(waitingList.filter((w: any) => w.id !== item.id))
  }

  return (
    <GlassCard className="p-4">
      <h3 className="text-lg font-semibold mb-4">File d'attente</h3>
      <div className="space-y-3">
        {waitingList.map((item: any, index: number) => (
          <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border border-white/20">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-medical-primary/10 flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <div>
                <p className="font-medium">{item.patient.nom} {item.patient.prenom}</p>
                <p className="text-sm text-slate-500">Dossier: {item.patient.numeroDossier}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                  <Clock className="w-3 h-3" />
                  <span>Attente: {Math.floor((Date.now() - new Date(item.dateConsultation).getTime()) / 60000)} min</span>
                </div>
              </div>
            </div>
            <GlassButton size="sm" onClick={() => startConsultation(item)}>
              <User className="w-4 h-4 mr-2" />
              Consulter
            </GlassButton>
          </div>
        ))}
        {waitingList.length === 0 && (
          <p className="text-center text-slate-500 py-8">Aucun patient en attente</p>
        )}
      </div>
    </GlassCard>
  )
}