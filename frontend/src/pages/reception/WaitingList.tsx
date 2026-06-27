import { useState, useEffect } from 'react'
import { Clock, User, ChevronRight, CheckCircle } from 'lucide-react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { api } from '@/services/api'

export function WaitingList() {
  const [waitingList, setWaitingList] = useState([])

  useEffect(() => {
    api.get('/consultations/waiting-queue').then(res => setWaitingList(res.data))
  }, [])

  const handleCall = async (id: string) => {
    await api.put(`/consultations/${id}/status`, { status: 'EN_COURS' })
    setWaitingList(waitingList.filter((w: any) => w.id !== id))
  }

  return (
    <div className="space-y-4">
      {waitingList.map((item: any, index: number) => (
        <GlassCard key={item.id} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-medical-primary/10 flex items-center justify-center text-lg font-bold">
                {index + 1}
              </div>
              <div>
                <p className="font-medium">{item.patient.nom} {item.patient.prenom}</p>
                <p className="text-sm text-slate-500">Dossier: {item.patient.numeroDossier}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                  <Clock className="w-3 h-3" />
                  <span>En attente depuis {Math.floor((Date.now() - new Date(item.dateConsultation).getTime()) / 60000)} min</span>
                </div>
              </div>
            </div>
            <GlassButton size="sm" onClick={() => handleCall(item.id)}>
              <User className="w-4 h-4 mr-2" />
              Appeler
            </GlassButton>
          </div>
        </GlassCard>
      ))}
      {waitingList.length === 0 && (
        <GlassCard className="p-8 text-center text-slate-500">
          <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
          <p>File d'attente vide</p>
        </GlassCard>
      )}
    </div>
  )
}