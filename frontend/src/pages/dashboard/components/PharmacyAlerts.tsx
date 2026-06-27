import { useState, useEffect } from 'react'
import { AlertTriangle, Package } from 'lucide-react'
import { api } from '@/services/api'

export function PharmacyAlerts() {
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    api.get('/dashboard/alerts').then(res => setAlerts(res.data.lowStock))
  }, [])

  return (
    <div className="space-y-3">
      {alerts.map((alert: any, index) => (
        <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
          <div className="flex-1">
            <p className="font-medium">{alert.name}</p>
            <p className="text-sm text-yellow-600 dark:text-yellow-400">Stock: {alert.stock} (Seuil: {alert.threshold})</p>
          </div>
          <Package className="w-4 h-4 text-slate-400" />
        </div>
      ))}
      {alerts.length === 0 && (
        <p className="text-center text-slate-500 py-4">Aucune alerte de stock</p>
      )}
    </div>
  )
}