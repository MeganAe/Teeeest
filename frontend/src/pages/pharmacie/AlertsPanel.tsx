import { useState, useEffect } from 'react'
import { AlertTriangle, Package, Clock } from 'lucide-react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { api } from '@/services/api'

export function AlertsPanel() {
  const [alerts, setAlerts] = useState({ lowStock: [], expiring: [] })

  useEffect(() => {
    api.get('/dashboard/alerts').then(res => setAlerts(res.data))
  }, [])

  return (
    <div className="space-y-4">
      <GlassCard className="p-4">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
          Stock critique
        </h3>
        {alerts.lowStock.length > 0 ? (
          <div className="space-y-2">
            {alerts.lowStock.map((item: any, index: number) => (
              <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-yellow-500/10">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-slate-500">Stock: {item.stock} / Seuil: {item.threshold}</p>
                </div>
                <GlassButton size="sm">Réapprovisionner</GlassButton>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-500 py-4">Aucune alerte de stock</p>
        )}
      </GlassCard>

      <GlassCard className="p-4">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-orange-500" />
          Produits bientôt expirés
        </h3>
        {alerts.expiring.length > 0 ? (
          <div className="space-y-2">
            {alerts.expiring.map((item: any, index: number) => (
              <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-orange-500/10">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-slate-500">Expire le: {new Date(item.expiryDate).toLocaleDateString()}</p>
                </div>
                <GlassButton size="sm" variant="warning">Utiliser en priorité</GlassButton>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-500 py-4">Aucun produit bientôt expiré</p>
        )}
      </GlassCard>
    </div>
  )
}