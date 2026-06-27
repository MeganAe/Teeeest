import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { api } from '@/services/api'
import { useNotificationStore } from '@/stores/notificationStore'

export function NursingCare() {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(false)
  const { showSuccess } = useNotificationStore()
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    api.get('/hospitalizations/active').then(res => setPatients(res.data))
  }, [])

  const careTypes = [
    { value: 'TOILETTE', label: 'Toilette' },
    { value: 'ALIMENTATION', label: 'Alimentation assistée' },
    { value: 'MOBILISATION', label: 'Mobilisation' },
    { value: 'PREVENTION_ESCARRE', label: 'Prévention escarres' },
    { value: 'SOIN_PLAIE', label: 'Soin de plaie' },
    { value: 'SONDAGE', label: 'Sondage' },
  ]

  const onSubmit = async (data: any) => {
    setLoading(true)
    await api.post('/treatments/soins', data)
    showSuccess('Soin enregistré')
    reset()
    setLoading(false)
  }

  return (
    <GlassCard className="p-4 mt-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Select label="Patient" options={patients.map((p: any) => ({ value: p.patientId, label: `${p.patient?.nom} ${p.patient?.prenom} - Lit ${p.litNumber}` }))} {...register('patientId', { required: true })} />
        <Select label="Type de soin" options={careTypes} {...register('type', { required: true })} />
        <Textarea label="Description" placeholder="Description détaillée du soin..." {...register('description')} rows={3} />
        <Textarea label="Produits utilisés" placeholder="Matériel et produits..." {...register('products')} rows={2} />
        <Textarea label="Observations" placeholder="État du patient, réactions..." {...register('observations')} rows={2} />
        <GlassButton type="submit" loading={loading} className="w-full">
          Enregistrer le soin
        </GlassButton>
      </form>
    </GlassCard>
  )
}