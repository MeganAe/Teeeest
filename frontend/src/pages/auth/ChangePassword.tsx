import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Lock } from 'lucide-react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { useNotificationStore } from '@/stores/notificationStore'
import { api } from '@/services/api'

export default function ChangePassword() {
  const [loading, setLoading] = useState(false)
  const { showSuccess, showError } = useNotificationStore()
  const { register, handleSubmit, watch, reset } = useForm()

  const onSubmit = async (data: any) => {
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
      showSuccess('Mot de passe modifié avec succès')
      reset()
    } catch (error) {
      showError('Mot de passe actuel incorrect')
    }
    setLoading(false)
  }

  return (
    <GlassCard className="p-6">
      <h2 className="text-xl font-semibold mb-6">Changer le mot de passe</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <GlassInput
          label="Mot de passe actuel"
          type="password"
          placeholder="••••••"
          icon={<Lock className="h-4 w-4" />}
          {...register('currentPassword', { required: true })}
        />
        <GlassInput
          label="Nouveau mot de passe"
          type="password"
          placeholder="••••••"
          icon={<Lock className="h-4 w-4" />}
          {...register('newPassword', { required: true, minLength: 6 })}
        />
        <GlassInput
          label="Confirmer le mot de passe"
          type="password"
          placeholder="••••••"
          icon={<Lock className="h-4 w-4" />}
          {...register('confirmPassword', { required: true })}
        />
        <GlassButton type="submit" loading={loading} className="w-full">
          Changer le mot de passe
        </GlassButton>
      </form>
    </GlassCard>
  )
}