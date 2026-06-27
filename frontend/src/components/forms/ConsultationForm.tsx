import { useForm } from 'react-hook-form'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Textarea } from '@/components/ui/Textarea'

interface ConsultationFormProps {
  onSubmit: (data: any) => void
  loading?: boolean
}

export function ConsultationForm({ onSubmit, loading }: ConsultationFormProps) {
  const { register, handleSubmit } = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Textarea label="Motif de la consultation" {...register('motif', { required: true })} rows={3} />
      <div className="grid grid-cols-2 gap-4">
        <GlassInput label="Tension artérielle" placeholder="120/80" {...register('tension')} />
        <GlassInput label="Température (°C)" type="number" step="0.1" {...register('temperature')} />
        <GlassInput label="Poids (kg)" type="number" {...register('poids')} />
        <GlassInput label="Taille (cm)" type="number" {...register('taille')} />
      </div>
      <Textarea label="Diagnostic" {...register('diagnostic')} rows={3} />
      <Textarea label="Traitement prescrit" {...register('traitement')} rows={3} />
      <Textarea label="Notes" {...register('notes')} rows={2} />
      <GlassButton type="submit" loading={loading} className="w-full">
        Enregistrer la consultation
      </GlassButton>
    </form>
  )
}