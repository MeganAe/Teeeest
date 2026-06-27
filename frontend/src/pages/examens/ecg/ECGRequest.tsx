import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { api } from '@/services/api'
import { useNotificationStore } from '@/stores/notificationStore'

export function ECGRequest() {
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
      type: 'ECG',
      description: `Motif: ${data.motif}\nSymptômes: ${data.symptoms}\nTraitements: ${data.medications}`,
    })
    showSuccess('Demande d\'ECG envoyée')
    reset()
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
        <Textarea label="Motif de l'examen" placeholder="Pourquoi cet ECG ?" {...register('motif')} rows={2} />
        <Textarea label="Symptômes" placeholder="Douleurs thoraciques, palpitations, essoufflement..." {...register('symptoms')} rows={2} />
        <GlassInput label="Traitements en cours" placeholder="Médicaments..." {...register('medications')} />
        <Textarea label="Antécédents cardiaques" placeholder="ATCD cardiaques..." {...register('history')} rows={2} />
        <GlassButton type="submit" loading={loading} className="w-full">
          Demander l'ECG
        </GlassButton>
      </form>
    </GlassCard>
  )
}