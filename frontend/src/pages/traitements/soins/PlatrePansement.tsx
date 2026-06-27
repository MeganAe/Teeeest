import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { api } from '@/services/api'
import { useNotificationStore } from '@/stores/notificationStore'

export function PlatrePansement() {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(false)
  const { showSuccess } = useNotificationStore()
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    api.get('/patients?limit=20').then(res => setPatients(res.data.patients))
  }, [])

  const onSubmit = async (data: any) => {
    setLoading(true)
    await api.post('/treatments/soins', { ...data, type: 'PLATRE_PANSEMENT' })
    showSuccess('Pansement/Plâtre enregistré')
    reset()
    setLoading(false)
  }

  return (
    <GlassCard className="p-4 mt-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Select label="Patient" options={patients.map((p: any) => ({ value: p.id, label: `${p.nom} ${p.prenom} - ${p.numeroDossier}` }))} {...register('patientId', { required: true })} />
        <Select label="Type" options={[{ value: 'PLATRE', label: 'Plâtre' }, { value: 'PANSEMENT', label: 'Pansement simple' }, { value: 'PANSEMENT_COMPRESSE', label: 'Pansement compressif' }]} {...register('type', { required: true })} />
        <GlassInput label="Localisation" placeholder="Membre concerné..." {...register('location')} />
        <GlassInput label="Date de pose" type="date" {...register('applicationDate')} />
        <GlassInput label="Date de retrait prévue" type="date" {...register('removalDate')} />
        <Textarea label="Instructions" placeholder="Consignes au patient..." {...register('instructions')} rows={2} />
        <GlassButton type="submit" loading={loading} className="w-full">
          Enregistrer
        </GlassButton>
      </form>
    </GlassCard>
  )
}