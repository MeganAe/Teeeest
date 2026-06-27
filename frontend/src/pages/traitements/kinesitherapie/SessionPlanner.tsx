import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Calendar, Clock, User, Plus } from 'lucide-react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { api } from '@/services/api'
import { useNotificationStore } from '@/stores/notificationStore'

export function SessionPlanner() {
  const [sessions, setSessions] = useState([])
  const [showForm, setShowForm] = useState(false)
  const { showSuccess } = useNotificationStore()
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    api.get('/treatments/kinesitherapie').then(res => setSessions(res.data.sessions))
  }, [])

  const onSubmit = async (data: any) => {
    await api.post('/treatments/kinesitherapie', data)
    showSuccess('Séance planifiée')
    reset()
    setShowForm(false)
  }

  return (
    <div className="space-y-4 mt-4">
      <div className="flex justify-end">
        <GlassButton onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Planifier une séance
        </GlassButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {sessions.map((session: any) => (
          <GlassCard key={session.id} className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium">{session.patient?.nom} {session.patient?.prenom}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(session.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{session.duration} min</span>
                  </div>
                </div>
                {session.exercises && (
                  <p className="text-sm mt-2">{session.exercises}</p>
                )}
              </div>
              <div className={`px-2 py-1 rounded-full text-xs ${
                session.status === 'COMPLETED' ? 'bg-green-500/20 text-green-500' :
                session.status === 'EN_COURS' ? 'bg-blue-500/20 text-blue-500' :
                'bg-yellow-500/20 text-yellow-500'
              }`}>
                {session.status === 'COMPLETED' ? 'Terminée' :
                 session.status === 'EN_COURS' ? 'En cours' : 'Planifiée'}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {showForm && (
        <GlassCard className="p-4">
          <h3 className="font-semibold mb-4">Planifier une séance</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Select label="Patient" options={[]} {...register('patientId', { required: true })} />
            <GlassInput label="Date" type="datetime-local" {...register('date', { required: true })} />
            <GlassInput label="Durée (minutes)" type="number" {...register('duration', { required: true })} />
            <Textarea label="Exercices prescrits" placeholder="Liste des exercices..." {...register('exercises')} rows={3} />
            <Textarea label="Observations" {...register('observations')} rows={2} />
            <div className="flex gap-3">
              <GlassButton type="submit" className="flex-1">Planifier</GlassButton>
              <GlassButton type="button" variant="ghost" onClick={() => setShowForm(false)}>Annuler</GlassButton>
            </div>
          </form>
        </GlassCard>
      )}
    </div>
  )
}