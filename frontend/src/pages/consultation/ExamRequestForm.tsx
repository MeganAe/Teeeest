import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { api } from '@/services/api'
import { useNotificationStore } from '@/stores/notificationStore'

interface ExamRequestFormProps {
  patientId: string
  consultationId?: string
  onSuccess: () => void
}

const EXAM_TYPES = [
  { value: 'LABORATOIRE', label: 'Laboratoire' },
  { value: 'RADIOLOGIE', label: 'Radiologie' },
  { value: 'EEG', label: 'Électroencéphalogramme' },
  { value: 'ECG', label: 'Électrocardiogramme' },
]

export function ExamRequestForm({ patientId, consultationId, onSuccess }: ExamRequestFormProps) {
  const [loading, setLoading] = useState(false)
  const { showSuccess } = useNotificationStore()
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (data: any) => {
    setLoading(true)
    await api.post('/exams', {
      patientId,
      consultationId,
      type: data.type,
      description: data.description,
    })
    showSuccess('Demande d\'examen envoyée')
    reset()
    onSuccess()
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Select label="Type d'examen" options={EXAM_TYPES} {...register('type', { required: true })} />
      <Textarea label="Description / Questions cliniques" placeholder="Description détaillée..." {...register('description')} rows={3} />
      <GlassButton type="submit" loading={loading} className="w-full">
        Demander l'examen
      </GlassButton>
    </form>
  )
}