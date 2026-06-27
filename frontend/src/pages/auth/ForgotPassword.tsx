import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Mail, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { api } from '@/services/api'
import { useNotificationStore } from '@/stores/notificationStore'

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { showSuccess, showError } = useNotificationStore()
  const { register, handleSubmit } = useForm()

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      await api.post('/auth/forgot-password', data)
      showSuccess('Email de réinitialisation envoyé')
      setSubmitted(true)
    } catch (error) {
      showError('Erreur lors de l\'envoi')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <GlassCard className="max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">AMKA Medical Center</h1>
          <p className="text-slate-500 mt-2">Réinitialisation du mot de passe</p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <GlassInput
              label="Adresse email"
              type="email"
              placeholder="votre@email.com"
              icon={<Mail className="h-4 w-4" />}
              {...register('email', { required: true })}
            />
            <GlassButton type="submit" loading={loading} className="w-full">
              Envoyer le lien de réinitialisation
            </GlassButton>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-green-500 mb-4">
              Un email de réinitialisation a été envoyé à votre adresse.
            </p>
            <p className="text-sm text-slate-500">
              Vérifiez votre boîte de réception et suivez les instructions.
            </p>
          </div>
        )}

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