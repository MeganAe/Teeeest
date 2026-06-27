import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { api } from '@/services/api'
import { useNotificationStore } from '@/stores/notificationStore'

interface EEGRequestProps {
  onSuccess: () => void
}

export function EEGRequest({ onSuccess }: EEGRequestProps) {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(false)
  const { showSuccess } = useNotificationStore()
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    api.get('/patients?limit=20').then(res => setPatients(res.data.patients))
  }, [])

  const onSubmit = async (data: any) => {
    setLoading(true)
    await api.post('/exams', {
      patientId: data.patientId,
      type: 'EEG',
      description: data.description,
    })
    showSuccess('Demande d\'EEG envoyée')
    reset()
    onSuccess()
    setLoading(false)
  }

  return (
    <GlassCard className="p-4 mt-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Select
          label="Patient"
          options={patients.map((p: any) => ({ value: p.id, label: `${p.nom} ${p.prenom} - ${p.numeroDossier}` }))}
          {...register('patientId', { required: true })}
        />
        <Textarea label="Motif de l'examen" placeholder="Description clinique..." {...register('description')} rows={4} />
        <GlassInput label="Médicaments en cours" placeholder="Traitements médicamenteux..." {...register('medications')} />
        <GlassInput label="Dernier repas" placeholder="Heure du dernier repas..." {...register('lastMeal')} />
        <GlassInput label="Heures de sommeil" placeholder="Nombre d'heures de sommeil..." {...register('sleepHours')} />
        <GlassButton type="submit" loading={loading} className="w-full">
          Demander l'EEG
        </GlassButton>
      </form>
    </GlassCard>
  )
}