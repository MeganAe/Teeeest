import { useState } from 'react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { Select } from '@/components/ui/Select'
import { useNotificationStore } from '@/stores/notificationStore'
import { api } from '@/services/api'

export function MobileMoneyPayment() {
  const [form, setForm] = useState({ phone: '', operator: 'ORANGE', amount: 0 })
  const [loading, setLoading] = useState(false)
  const { showSuccess, showError } = useNotificationStore()

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await api.post('/payments/mobile-money', form)
      showSuccess('Paiement Mobile Money effectué avec succès')
      setForm({ phone: '', operator: 'ORANGE', amount: 0 })
    } catch (error) {
      showError('Erreur lors du paiement')
    } finally {
      setLoading(false)
    }
  }

  return (
    <GlassCard className="p-4">
      <h3 className="text-lg font-semibold mb-4">Paiement Mobile Money</h3>
      <div className="space-y-4">
        <Select
          label="Opérateur"
          options={[
            { value: 'ORANGE', label: 'Orange Money' },
            { value: 'VODACOM', label: 'M-Pesa' },
            { value: 'AIRTELL', label: 'Airtel Money' },
          ]}
          value={form.operator}
          onChange={(e) => setForm({ ...form, operator: e.target.value })}
        />
        <GlassInput
          label="Numéro de téléphone"
          placeholder="+243 XXX XXX XXX"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <GlassInput
          label="Montant (FC)"
          type="number"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: parseInt(e.target.value) })}
        />
        <GlassButton onClick={handleSubmit} loading={loading} className="w-full">
          Payer
        </GlassButton>
      </div>
    </GlassCard>
  )
}