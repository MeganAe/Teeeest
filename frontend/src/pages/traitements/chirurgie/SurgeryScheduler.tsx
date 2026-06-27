import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { api } from '@/services/api'
import { useNotificationStore } from '@/stores/notificationStore'

export function SurgeryScheduler() {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(false)
  const { showSuccess } = useNotificationStore()
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    api.get('/patients?limit=20').then(res => setPatients(res.data.patients))
  }, [])

  const surgeryTypes = [
    { value: 'ORTHOPEDIQUE', label: 'Chirurgie orthopédique' },
    { value: 'GENERALE', label: 'Chirurgie générale' },
    { value: 'VASCULAIRE', label: 'Chirurgie vasculaire' },
    { value: 'UROLOGIQUE', label: 'Chirurgie urologique' },
    { value: 'NEUROCHIRURGIE', label: 'Neurochirurgie' },
  ]

  const onSubmit = async (data: any) => {
    setLoading(true)
    await api.post('/treatments/chirurgie', data)
    showSuccess('Intervention planifiée')
    reset()
    setLoading(false)
  }

  return (
    <GlassCard className="p-4 mt-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Select label="Patient" options={patients.map((p: any) => ({ value: p.id, label: `${p.nom} ${p.prenom} - ${p.numeroDossier}` }))} {...register('patientId', { required: true })} />
        <Select label="Type d'intervention" options={surgeryTypes} {...register('type', { required: true })} />
        <GlassInput label="Date prévue" type="datetime-local" {...register('scheduledDate', { required: true })} />
        <Textarea label="Diagnostic pré-opératoire" placeholder="Diagnostic..." {...register('preOpDiagnosis')} rows={2} />
        <Textarea label="Description de l'intervention" placeholder="Description détaillée..." {...register('description')} rows={3} />
        <Textarea label="Risques et complications" placeholder="Risques..." {...register('risks')} rows={2} />
        <GlassButton type="submit" loading={loading} className="w-full">
          Planifier l'intervention
        </GlassButton>
      </form>
    </GlassCard>
  )
}