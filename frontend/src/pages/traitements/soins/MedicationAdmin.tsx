import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { api } from '@/services/api'
import { useNotificationStore } from '@/stores/notificationStore'

export function MedicationAdmin() {
  const [patients, setPatients] = useState([])
  const [medications, setMedications] = useState([])
  const [loading, setLoading] = useState(false)
  const { showSuccess } = useNotificationStore()
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    api.get('/hospitalizations/active').then(res => setPatients(res.data))
    api.get('/pharmacy/medications').then(res => setMedications(res.data.medications))
  }, [])

  const onSubmit = async (data: any) => {
    setLoading(true)
    await api.post('/treatments/soins', { ...data, type: 'MEDICATION' })
    showSuccess('Administration enregistrée')
    reset()
    setLoading(false)
  }

  return (
    <GlassCard className="p-4 mt-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Select label="Patient" options={patients.map((p: any) => ({ value: p.patientId, label: `${p.patient?.nom} ${p.patient?.prenom}` }))} {...register('patientId', { required: true })} />
        <Select label="Médicament" options={medications.map((m: any) => ({ value: m.id, label: `${m.name} (${m.dosage})` }))} {...register('medicationId', { required: true })} />
        <GlassInput label="Dosage administré" placeholder="ex: 500mg" {...register('dosage')} />
        <Select label="Voie d'administration" options={[{ value: 'ORALE', label: 'Orale' }, { value: 'IV', label: 'Intraveineuse' }, { value: 'IM', label: 'Intramusculaire' }, { value: 'SC', label: 'Sous-cutanée' }]} {...register('route')} />
        <GlassInput label="Heure d'administration" type="time" {...register('time')} />
        <Textarea label="Observations" placeholder="Réaction, effet secondaire..." {...register('observations')} rows={2} />
        <GlassButton type="submit" loading={loading} className="w-full">
          Enregistrer l'administration
        </GlassButton>
      </form>
    </GlassCard>
  )
}