import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Textarea } from '@/components/ui/Textarea'
import { api } from '@/services/api'
import { useNotificationStore } from '@/stores/notificationStore'

interface PrescriptionFormProps {
  consultationId: string
  onSuccess: () => void
}

export function PrescriptionForm({ consultationId, onSuccess }: PrescriptionFormProps) {
  const [loading, setLoading] = useState(false)
  const { showSuccess } = useNotificationStore()
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (data: any) => {
    setLoading(true)
    await api.post(`/consultations/${consultationId}/prescriptions`, data)
    showSuccess('Prescription ajoutée')
    reset()
    onSuccess()
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <GlassInput label="Médicament" placeholder="Nom du médicament" {...register('medicament', { required: true })} />
      <GlassInput label="Dosage" placeholder="ex: 500mg" {...register('dosage', { required: true })} />
      <GlassInput label="Durée" placeholder="ex: 7 jours" {...register('duree', { required: true })} />
      <Textarea label="Instructions" placeholder="Instructions particulières..." {...register('instructions')} />
      <GlassButton type="submit" loading={loading}>
        Ajouter la prescription
      </GlassButton>
    </form>
  )
}