import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { GlassModal } from '@/components/glassmorphic/GlassModal'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { Select } from '@/components/ui/Select'
import { usePatientStore } from '@/stores/patientStore'
import { useNotificationStore } from '@/stores/notificationStore'
import { patientService } from '@/services/patient.service'

const patientSchema = z.object({
  nom: z.string().min(2, 'Nom requis'),
  postnom: z.string().optional(),
  prenom: z.string().min(2, 'Prénom requis'),
  sexe: z.enum(['M', 'F']),
  dateNaissance: z.string(),
  telephone: z.string().optional(),
  adresse: z.string().optional(),
  contactUrgence: z.string().optional(),
  typeHandicap: z.enum(['MOTEUR', 'VISUEL', 'AUDITIF', 'MENTAL', 'MULTIPLE']),
})

type PatientForm = z.infer<typeof patientSchema>

interface NewPatientModalProps {
  isOpen: boolean
  onClose: () => void
}

export function NewPatientModal({ isOpen, onClose }: NewPatientModalProps) {
  const [loading, setLoading] = useState(false)
  const { addPatient } = usePatientStore()
  const { showSuccess, showError } = useNotificationStore()
  const { register, handleSubmit, formState: { errors }, reset } = useForm<PatientForm>({
    resolver: zodResolver(patientSchema),
  })

  const onSubmit = async (data: PatientForm) => {
    setLoading(true)
    try {
      const newPatient = await patientService.create(data)
      addPatient(newPatient)
      showSuccess('Patient créé avec succès')
      reset()
      onClose()
    } catch (error) {
      showError('Erreur lors de la création du patient')
    } finally {
      setLoading(false)
    }
  }

  return (
    <GlassModal isOpen={isOpen} onClose={onClose} title="Nouveau patient" size="lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <GlassInput label="Nom" {...register('nom')} error={errors.nom?.message} />
          <GlassInput label="Postnom" {...register('postnom')} />
          <GlassInput label="Prénom" {...register('prenom')} error={errors.prenom?.message} />
          <Select
            label="Sexe"
            options={[
              { value: 'M', label: 'Masculin' },
              { value: 'F', label: 'Féminin' },
            ]}
            {...register('sexe')}
          />
          <GlassInput label="Date de naissance" type="date" {...register('dateNaissance')} />
          <GlassInput label="Téléphone" {...register('telephone')} />
          <Select
            label="Type de handicap"
            options={[
              { value: 'MOTEUR', label: 'Moteur' },
              { value: 'VISUEL', label: 'Visuel' },
              { value: 'AUDITIF', label: 'Auditif' },
              { value: 'MENTAL', label: 'Mental' },
              { value: 'MULTIPLE', label: 'Multiple' },
            ]}
            {...register('typeHandicap')}
          />
        </div>
        <GlassInput label="Adresse" {...register('adresse')} />
        <GlassInput label="Contact d'urgence" {...register('contactUrgence')} />
        
        <div className="flex justify-end gap-3 pt-4">
          <GlassButton type="button" variant="ghost" onClick={onClose}>
            Annuler
          </GlassButton>
          <GlassButton type="submit" loading={loading}>
            Créer le patient
          </GlassButton>
        </div>
      </form>
    </GlassModal>
  )
}