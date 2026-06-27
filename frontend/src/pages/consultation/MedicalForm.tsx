import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Textarea } from '@/components/ui/Textarea'
import { useConsultationStore } from '@/stores/consultationStore'
import { api } from '@/services/api'
import { useNotificationStore } from '@/stores/notificationStore'

export function MedicalForm() {
  const { currentConsultation, setCurrentConsultation } = useConsultationStore()
  const [loading, setLoading] = useState(false)
  const { showSuccess } = useNotificationStore()
  const { register, handleSubmit } = useForm()

  const onSubmit = async (data: any) => {
    setLoading(true)
    await api.put(`/consultations/${currentConsultation.id}`, data)
    showSuccess('Informations médicales enregistrées')
    setCurrentConsultation(null)
    setLoading(false)
  }

  if (!currentConsultation) {
    return (
      <GlassCard className="p-8 text-center text-slate-500">
        Sélectionnez un patient dans la file d'attente
      </GlassCard>
    )
  }

  return (
    <GlassCard className="p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Consultation médicale</h3>
        <p className="text-sm text-slate-500">
          Patient: {currentConsultation.patient?.nom} {currentConsultation.patient?.prenom}
        </p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <GlassInput label="Tension artérielle" placeholder="ex: 120/80" {...register('tension')} />
          <GlassInput label="Température (°C)" type="number" step="0.1" {...register('temperature')} />
          <GlassInput label="Poids (kg)" type="number" {...register('poids')} />
          <GlassInput label="Taille (cm)" type="number" {...register('taille')} />
        </div>
        
        <Textarea label="Diagnostic" placeholder="Diagnostic médical..." {...register('diagnostic')} rows={3} />
        <Textarea label="Traitement prescrit" placeholder="Traitement..." {...register('traitement')} rows={3} />
        <Textarea label="Notes supplémentaires" placeholder="Notes..." {...register('notes')} rows={2} />
        
        <div className="flex gap-3">
          <GlassButton type="submit" loading={loading} className="flex-1">
            Enregistrer
          </GlassButton>
          <GlassButton type="button" variant="ghost" onClick={() => setCurrentConsultation(null)}>
            Annuler
          </GlassButton>
        </div>
      </form>
    </GlassCard>
  )
}