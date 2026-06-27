import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Lock } from 'lucide-react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { useAuthStore } from '@/stores/authStore'
import { useNotificationStore } from '@/stores/notificationStore'
import { api } from '@/services/api'

export default function TwoFactorAuth() {
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuthStore()
  const { showError } = useNotificationStore()

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await api.post('/auth/2fa/verify', { code })
      login(res.data.user, res.data.token, res.data.refreshToken)
      navigate('/dashboard')
    } catch (error) {
      showError('Code invalide')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <GlassCard className="max-w-md w-full p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-medical-primary/20 flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-medical-primary" />
          </div>
          <h1 className="text-2xl font-bold">Authentification à deux facteurs</h1>
          <p className="text-slate-500 mt-2">
            Entrez le code de vérification envoyé à votre appareil
          </p>
        </div>

        <div className="space-y-6">
          <GlassInput
            label="Code de vérification"
            type="text"
            placeholder="000000"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
          />
          <GlassButton onClick={handleSubmit} loading={loading} className="w-full">
            Vérifier
          </GlassButton>
        </div>
      </GlassCard>
    </div>
  )
}