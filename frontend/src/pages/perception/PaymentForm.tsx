import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Select } from '@/components/ui/Select'
import { usePatientStore } from '@/stores/patientStore'
import { useNotificationStore } from '@/stores/notificationStore'
import { paymentService } from '@/services/payment.service'

export function PaymentForm() {
  const { selectedPatient } = usePatientStore()
  const [loading, setLoading] = useState(false)
  const { showSuccess, showError } = useNotificationStore()
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (data: any) => {
    if (!selectedPatient) {
      showError('Veuillez sélectionner un patient')
      return
    }
    setLoading(true)
    try {
      await paymentService.create({
        patientId: selectedPatient.id,
        montant: parseFloat(data.montant),
        type: data.type,
        modePaiement: data.modePaiement,
      })
      showSuccess('Paiement enregistré avec succès')
      reset()
    } catch (error) {
      showError('Erreur lors de l\'enregistrement')
    } finally {
      setLoading(false)
    }
  }

  return (
    <GlassCard className="p-4">
      <h3 className="text-lg font-semibold mb-4">Nouveau paiement</h3>
      {selectedPatient ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="p-3 rounded-lg bg-medical-primary/10 mb-3">
            <p className="text-sm">Patient: {selectedPatient.nom} {selectedPatient.prenom}</p>
            <p className="text-xs text-slate-500">Dossier: {selectedPatient.numeroDossier}</p>
          </div>
          <GlassInput label="Montant (FC)" type="number" {...register('montant', { required: true })} />
          <Select
            label="Type de paiement"
            options={[
              { value: 'CONSULTATION', label: 'Consultation' },
              { value: 'EXAMEN', label: 'Examen' },
              { value: 'TRAITEMENT', label: 'Traitement' },
              { value: 'PHARMACIE', label: 'Pharmacie' },
              { value: 'HOSPITALISATION', label: 'Hospitalisation' },
            ]}
            {...register('type', { required: true })}
          />
          <Select
            label="Mode de paiement"
            options={[
              { value: 'ESPECES', label: 'Espèces' },
              { value: 'MOBILE_MONEY', label: 'Mobile Money' },
              { value: 'CARTE', label: 'Carte bancaire' },
            ]}
            {...register('modePaiement', { required: true })}
          />
          <GlassButton type="submit" loading={loading} className="w-full">
            Enregistrer le paiement
          </GlassButton>
        </form>
      ) : (
        <p className="text-center text-slate-500 py-8">Sélectionnez un patient pour effectuer un paiement</p>
      )}
    </GlassCard>
  )
}