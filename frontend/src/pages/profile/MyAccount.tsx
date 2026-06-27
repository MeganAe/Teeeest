import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { useAuthStore } from '@/stores/authStore'
import { useNotificationStore } from '@/stores/notificationStore'
import { api } from '@/services/api'

export function MyAccount() {
  const { user, updateUser } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const { showSuccess, showError } = useNotificationStore()
  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
    }
  })

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      const res = await api.put('/users/me', data)
      updateUser(res.data)
      showSuccess('Profil mis à jour')
    } catch (error) {
      showError('Erreur lors de la mise à jour')
    }
    setLoading(false)
  }

  const onChangePassword = async (data: any) => {
    if (data.newPassword !== data.confirmPassword) {
      showError('Les mots de passe ne correspondent pas')
      return
    }
    setLoading(true)
    try {
      await api.post('/auth/change-password', {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      })
      showSuccess('Mot de passe modifié')
    } catch (error) {
      showError('Erreur lors du changement de mot de passe')
    }
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h3 className="font-semibold">Informations personnelles</h3>
        <div className="grid grid-cols-2 gap-4">
          <GlassInput label="Prénom" {...register('firstName')} />
          <GlassInput label="Nom" {...register('lastName')} />
          <GlassInput label="Email" type="email" {...register('email')} disabled />
        </div>
        <GlassButton type="submit" loading={loading}>
          Mettre à jour
        </GlassButton>
      </form>

      <div className="border-t border-white/20 pt-6">
        <h3 className="font-semibold mb-4">Changer le mot de passe</h3>
        <form onSubmit={handleSubmit(onChangePassword)} className="space-y-4">
          <GlassInput label="Mot de passe actuel" type="password" {...register('currentPassword', { required: true })} />
          <GlassInput label="Nouveau mot de passe" type="password" {...register('newPassword', { required: true, minLength: 6 })} />
          <GlassInput label="Confirmer le mot de passe" type="password" {...register('confirmPassword', { required: true })} />
          <GlassButton type="submit" variant="secondary" loading={loading}>
            Changer le mot de passe
          </GlassButton>
        </form>
      </div>
    </div>
  )
}