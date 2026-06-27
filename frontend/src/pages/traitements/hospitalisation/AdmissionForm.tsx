import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { api } from '@/services/api'
import { useNotificationStore } from '@/stores/notificationStore'

export function AdmissionForm() {
  const [patients, setPatients] = useState([])
  const [beds, setBeds] = useState([])
  const [loading, setLoading] = useState(false)
  const { showSuccess } = useNotificationStore()
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    api.get('/patients?limit=20').then(res => setPatients(res.data.patients))
    api.get('/hospitalizations/beds/available').then(res => setBeds(res.data))
  }, [])

  const onSubmit = async (data: any) => {
    setLoading(true)
    await api.post('/hospitalizations', data)
    showSuccess('Patient hospitalisé avec succès')
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
        <Select
          label="Lit"
          options={beds.map((b: any) => ({ value: b.number, label: `${b.number} - ${b.type || 'Standard'}` }))}
          {...register('litNumber', { required: true })}
        />
        <Textarea label="Diagnostic" placeholder="Diagnostic médical..." {...register('diagnostic', { required: true })} rows={3} />
        <Textarea label="Traitement initial" placeholder="Traitement prescrit..." {...register('initialTreatment')} rows={3} />
        <GlassButton type="submit" loading={loading} className="w-full">
          Hospitaliser le patient
        </GlassButton>
      </form>
    </GlassCard>
  )
}