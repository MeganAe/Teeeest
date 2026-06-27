import { useForm } from 'react-hook-form'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'

interface DiagnosticFormProps {
  onSubmit: (data: any) => void
  loading?: boolean
}

const CIM10_CODES = [
  { value: 'A00', label: 'A00 - Choléra' },
  { value: 'B20', label: 'B20 - VIH/SIDA' },
  { value: 'E10', label: 'E10 - Diabète type 1' },
  { value: 'E11', label: 'E11 - Diabète type 2' },
  { value: 'I10', label: 'I10 - Hypertension' },
  { value: 'J45', label: 'J45 - Asthme' },
  { value: 'M54', label: 'M54 - Lombalgie' },
  { value: 'N18', label: 'N18 - Insuffisance rénale' },
]

export function DiagnosticForm({ onSubmit, loading }: DiagnosticFormProps) {
  const { register, handleSubmit } = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Select label="Code CIM-10" options={CIM10_CODES} {...register('codeCIM10')} />
      <GlassInput label="Diagnostic principal" placeholder="Diagnostic..." {...register('diagnostic', { required: true })} />
      <GlassInput label="Diagnostic secondaire" placeholder="Diagnostic secondaire..." {...register('diagnosticSecondaire')} />
      <Textarea label="Évolution" placeholder="Évolution de l'état du patient..." {...register('evolution')} rows={2} />
      <Textarea label="Recommandations" placeholder="Recommandations médicales..." {...register('recommandations')} rows={2} />
      <GlassButton type="submit" loading={loading} className="w-full">
        Valider le diagnostic
      </GlassButton>
    </form>
  )
}