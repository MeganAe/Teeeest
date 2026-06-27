import { useState, useEffect } from 'react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { api } from '@/services/api'
import { useNotificationStore } from '@/stores/notificationStore'

export function TariffManager() {
  const [tariffs, setTariffs] = useState([])
  const [editing, setEditing] = useState(null)
  const { showSuccess } = useNotificationStore()

  useEffect(() => {
    api.get('/settings/tariffs').then(res => setTariffs(res.data))
  }, [])

  const updateTariff = async (id: string, value: number) => {
    await api.put(`/settings/tariffs/${id}`, { value })
    showSuccess('Tarif mis à jour')
    setEditing(null)
    api.get('/settings/tariffs').then(res => setTariffs(res.data))
  }

  return (
    <GlassCard className="p-4">
      <h3 className="text-lg font-semibold mb-4">Gestion des tarifs</h3>
      <div className="space-y-3">
        {tariffs.map((tariff: any) => (
          <div key={tariff.id} className="flex items-center justify-between p-3 rounded-lg border border-white/20">
            <div>
              <p className="font-medium">{tariff.name}</p>
              {editing === tariff.id ? (
                <GlassInput
                  type="number"
                  defaultValue={tariff.value}
                  onBlur={(e) => updateTariff(tariff.id, parseInt(e.target.value))}
                  className="w-32 mt-1"
                  autoFocus
                />
              ) : (
                <p className="text-sm text-slate-500">{tariff.value.toLocaleString()} FC</p>
              )}
            </div>
            <GlassButton size="sm" variant="ghost" onClick={() => setEditing(tariff.id)}>
              Modifier
            </GlassButton>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}