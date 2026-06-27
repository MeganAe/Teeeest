import { useForm } from 'react-hook-form'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Select } from '@/components/ui/Select'

interface PaymentFormProps {
  patientId?: string
  onSubmit: (data: any) => void
  loading?: boolean
}

export function PaymentForm({ patientId, onSubmit, loading }: PaymentFormProps) {
  const { register, handleSubmit } = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {!patientId && (
        <GlassInput label="ID Patient" {...register('patientId', { required: true })} />
      )}
      <GlassInput label="Montant (FC)" type="number" {...register('montant', { required: true })} />
      <Select label="Type de paiement" options={[
        { value: 'CONSULTATION', label: 'Consultation' },
        { value: 'EXAMEN', label: 'Examen' },
        { value: 'TRAITEMENT', label: 'Traitement' },
        { value: 'PHARMACIE', label: 'Pharmacie' },
        { value: 'HOSPITALISATION', label: 'Hospitalisation' },
      ]} {...register('type', { required: true })} />
      <Select label="Mode de paiement" options={[
        { value: 'ESPECES', label: 'Espèces' },
        { value: 'MOBILE_MONEY', label: 'Mobile Money' },
        { value: 'CARTE', label: 'Carte bancaire' },
      ]} {...register('modePaiement', { required: true })} />
      <GlassButton type="submit" loading={loading} className="w-full">
        Enregistrer le paiement
      </GlassButton>
    </form>
  )
}