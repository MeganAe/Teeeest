import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { api } from '@/services/api'
import { useNotificationStore } from '@/stores/notificationStore'

interface RadiologyRequestProps {
  onSuccess: () => void
}

const EXAM_TYPES = [
  { value: 'RADIOGRAPHIE', label: 'Radiographie standard' },
  { value: 'ECHOGRAPHIE', label: 'Échographie' },
  { value: 'SCANNER', label: 'Scanner' },
  { value: 'IRM', label: 'IRM' },
  { value: 'MAMMOGRAPHIE', label: 'Mammographie' },
]

const BODY_PARTS = [
  { value: 'CRANE', label: 'Crâne' },
  { value: 'THORAX', label: 'Thorax' },
  { value: 'ABDOMEN', label: 'Abdomen' },
  { value: 'COLONNE', label: 'Colonne vertébrale' },
  { value: 'MEMBRE_SUPERIEUR', label: 'Membre supérieur' },
  { value: 'MEMBRE_INFERIEUR', label: 'Membre inférieur' },
  { value: 'BASSIN', label: 'Bassin' },
]

export function RadiologyRequest({ onSuccess }: RadiologyRequestProps) {
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
      type: 'RADIOLOGIE',
      description: `Examen: ${data.examType} - ${data.bodyPart}\nIndications cliniques: ${data.indications}`,
    })
    showSuccess('Demande d\'examen radiologique envoyée')
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
        <Select label="Type d'examen" options={EXAM_TYPES} {...register('examType', { required: true })} />
        <Select label="Région anatomique" options={BODY_PARTS} {...register('bodyPart', { required: true })} />
        <Textarea label="Indications cliniques" placeholder="Description clinique..." {...register('indications')} rows={3} />
        <Textarea label="Questions spécifiques" placeholder="Questions au radiologue..." {...register('questions')} rows={2} />
        <GlassInput label="Examens antérieurs" placeholder="Références d'examens précédents..." {...register('previousExams')} />
        <GlassButton type="submit" loading={loading} className="w-full">
          Demander l'examen
        </GlassButton>
      </form>
    </GlassCard>
  )
}