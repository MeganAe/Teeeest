import { useForm } from 'react-hook-form'
import { GlassModal } from '@/components/glassmorphic/GlassModal'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Select } from '@/components/ui/Select'
import { api } from '@/services/api'
import { useNotificationStore } from '@/stores/notificationStore'

interface UserFormProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  user?: any
}

const roles = [
  { value: 'ADMIN', label: 'Administrateur' },
  { value: 'RECEPTIONIST', label: 'Réceptionniste' },
  { value: 'PERCEPTEUR', label: 'Percepteur' },
  { value: 'MEDECIN_DIRECTEUR', label: 'Médecin Directeur' },
  { value: 'MEDECIN_PSYCHIATRE', label: 'Médecin Psychiatre' },
  { value: 'MEDECIN_ORTHOPEDIEN', label: 'Médecin Orthopédien' },
  { value: 'LABORANTIN', label: 'Laborantin' },
  { value: 'TECHNICIEN_EEG', label: 'Technicien EEG' },
  { value: 'TECHNICIEN_ECG', label: 'Technicien ECG' },
  { value: 'RADIOLOGUE', label: 'Radiologue' },
  { value: 'KINESITHERAPEUTE', label: 'Kinésithérapeute' },
  { value: 'INFIRMIER', label: 'Infirmier' },
  { value: 'PHARMACIEN', label: 'Pharmacien' },
  { value: 'COMPTABLE', label: 'Comptable' },
]

export function UserForm({ isOpen, onClose, onSuccess, user }: UserFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: user })
  const { showSuccess } = useNotificationStore()

  const onSubmit = async (data: any) => {
    if (user) {
      await api.put(`/users/${user.id}`, data)
      showSuccess('Utilisateur modifié')
    } else {
      await api.post('/users', data)
      showSuccess('Utilisateur créé')
    }
    onSuccess()
  }

  return (
    <GlassModal isOpen={isOpen} onClose={onClose} title={user ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur'}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <GlassInput label="Prénom" {...register('firstName', { required: true })} />
        <GlassInput label="Nom" {...register('lastName', { required: true })} />
        <GlassInput label="Email" type="email" {...register('email', { required: true })} />
        {!user && <GlassInput label="Mot de passe" type="password" {...register('password', { required: !user, minLength: 6 })} />}
        <Select label="Rôle" options={roles} {...register('role', { required: true })} />
        <div className="flex gap-3">
          <GlassButton type="submit" className="flex-1">{user ? 'Modifier' : 'Créer'}</GlassButton>
          <GlassButton type="button" variant="ghost" onClick={onClose}>Annuler</GlassButton>
        </div>
      </form>
    </GlassModal>
  )
}