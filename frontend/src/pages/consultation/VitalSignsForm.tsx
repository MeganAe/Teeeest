import { useForm } from 'react-hook-form'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { GlassButton } from '@/components/glassmorphic/GlassButton'

interface VitalSignsFormProps {
  onSubmit: (data: any) => void
  loading?: boolean
}

export function VitalSignsForm({ onSubmit, loading }: VitalSignsFormProps) {
  const { register, handleSubmit } = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <GlassInput label="Tension artérielle" placeholder="120/80" {...register('tension')} />
        <GlassInput label="Température (°C)" type="number" step="0.1" {...register('temperature')} />
        <GlassInput label="Pouls (bpm)" type="number" {...register('pouls')} />
        <GlassInput label="Oxygénation (%)" type="number" {...register('oxygenation')} />
        <GlassInput label="Poids (kg)" type="number" {...register('poids')} />
        <GlassInput label="Taille (cm)" type="number" {...register('taille')} />
      </div>
      <GlassButton type="submit" loading={loading} className="w-full">
        Enregistrer les constantes
      </GlassButton>
    </form>
  )
}