import { useState, useEffect } from 'react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { api } from '@/services/api'

export function BalanceSheet() {
  const [balance, setBalance] = useState(null)
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  useEffect(() => {
    api.get(`/accounting/balance-sheet?date=${date}`).then(res => setBalance(res.data))
  }, [date])

  if (!balance) return null

  return (
    <div className="space-y-4">
      <GlassInput type="date" label="Date" value={date} onChange={(e) => setDate(e.target.value)} className="max-w-xs" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-4">
          <h3 className="font-semibold mb-4 text-green-600">ACTIFS</h3>
          <div className="space-y-2">
            <div className="flex justify-between p-2">
              <span>Trésorerie</span>
              <span className="font-bold">{balance.assets.toLocaleString()} FC</span>
            </div>
            <div className="flex justify-between p-2 bg-green-500/10 rounded-lg">
              <span className="font-bold">TOTAL ACTIFS</span>
              <span className="font-bold text-green-600">{balance.assets.toLocaleString()} FC</span>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <h3 className="font-semibold mb-4 text-red-600">PASSIFS</h3>
          <div className="space-y-2">
            <div className="flex justify-between p-2">
              <span>Dettes fournisseurs</span>
              <span>{balance.liabilities.toLocaleString()} FC</span>
            </div>
            <div className="flex justify-between p-2">
              <span>Autres dettes</span>
              <span>0 FC</span>
            </div>
            <div className="flex justify-between p-2 bg-red-500/10 rounded-lg">
              <span className="font-bold">TOTAL PASSIFS</span>
              <span className="font-bold text-red-600">{balance.liabilities.toLocaleString()} FC</span>
            </div>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-4">
        <div className="flex justify-between items-center p-4 bg-medical-primary/10 rounded-xl">
          <span className="text-lg font-bold">CAPITAUX PROPRES</span>
          <span className="text-2xl font-bold text-medical-primary">{balance.equity.toLocaleString()} FC</span>
        </div>
      </GlassCard>
    </div>
  )
}