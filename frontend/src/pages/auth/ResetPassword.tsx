import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Lock, ArrowLeft } from 'lucide-react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { api } from '@/services/api'
import { useNotificationStore } from '@/stores/notificationStore'

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { showSuccess, showError } = useNotificationStore()
  const { register, handleSubmit, watch } = useForm()

  const token = searchParams.get('token')

  const onSubmit = async (data: any) => {
    if (data.newPassword !== data.confirmPassword) {
      showError('Les mots de passe ne correspondent pas')
      return
    }
    setLoading(true)
    try {
      await api.post('/auth/reset-password', {
        token,
        newPassword: data.newPassword,
      })
      showSuccess('Mot de passe réinitialisé avec succès')
      setTimeout(() => navigate('/login'), 2000)
    } catch (error) {
      showError('Lien invalide ou expiré')
    }
    setLoading(false)
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <GlassCard className="max-w-md w-full p-8">
          <div className="text-center">
            <p className="text-red-500">Lien de réinitialisation invalide</p>
            <Link to="/forgot-password" className="text-medical-primary hover:underline mt-4 inline-block">
              Demander un nouveau lien
            </Link>
          </div>
        </GlassCard>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <GlassCard className="max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">AMKA Medical Center</h1>
          <p className="text-slate-500 mt-2">Nouveau mot de passe</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            Réinitialiser le mot de passe
          </GlassButton>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-medical-primary hover:underline text-sm flex items-center justify-center gap-1">
            <ArrowLeft className="h-3 w-3" />
            Retour à la connexion
          </Link>
        </div>
      </GlassCard>
    </div>
  )
}