import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { api } from '@/services/api'
import { useNotificationStore } from '@/stores/notificationStore'

export function DailyFollowup() {
  const [patients, setPatients] = useState([])
  const [selectedPatient, setSelectedPatient] = useState('')
  const [followups, setFollowups] = useState([])
  const [loading, setLoading] = useState(false)
  const { showSuccess } = useNotificationStore()
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    api.get('/hospitalizations/active').then(res => setPatients(res.data))
  }, [])

  useEffect(() => {
    if (selectedPatient) {
      api.get(`/hospitalizations/${selectedPatient}/daily-followups`).then(res => setFollowups(res.data))
    }
  }, [selectedPatient])

  const onSubmit = async (data: any) => {
    setLoading(true)
    await api.post(`/hospitalizations/${selectedPatient}/daily-followup`, data)
    showSuccess('Suivi journalier enregistré')
    reset()
    setLoading(false)
  }

  return (
    <GlassCard className="p-4 mt-4">
      <Select
        label="Patient hospitalisé"
        options={patients.map((p: any) => ({ value: p.id, label: `${p.patient?.nom} ${p.patient?.prenom} - Lit ${p.litNumber}` }))}
        value={selectedPatient}
        onChange={(e) => setSelectedPatient(e.target.value)}
        className="mb-4"
      />

      {selectedPatient && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <GlassInput label="Température (°C)" type="number" step="0.1" {...register('temperature')} />
            <GlassInput label="Tension artérielle" placeholder="120/80" {...register('tension')} />
            <GlassInput label="Poids (kg)" type="number" {...register('poids')} />
          </div>
          <Textarea label="Observations" placeholder="État général, évolution..." {...register('observations')} rows={3} />
          <Textarea label="Traitement administré" {...register('treatment')} rows={2} />
          <GlassButton type="submit" loading={loading} className="w-full">
            Enregistrer le suivi
          </GlassButton>
        </form>
      )}

      {followups.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold mb-3">Historique des suivis</h4>
          <div className="space-y-3">
            {followups.map((f: any) => (
              <div key={f.id} className="p-3 rounded-lg border border-white/20">
                <div className="flex justify-between text-sm text-slate-500">
                  <span>{new Date(f.date).toLocaleString()}</span>
                  <span>Par {f.user?.firstName} {f.user?.lastName}</span>
                </div>
                {f.temperature && <p className="text-sm mt-2">Température: {f.temperature}°C</p>}
                {f.tension && <p className="text-sm">Tension: {f.tension}</p>}
                <p className="text-sm mt-2">{f.observations}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </GlassCard>
  )
}