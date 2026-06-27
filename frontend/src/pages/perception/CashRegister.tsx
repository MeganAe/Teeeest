import { useState, useEffect } from 'react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { api } from '@/services/api'

export function CashRegister() {
  const [cashStatus, setCashStatus] = useState({ openingBalance: 0, currentBalance: 0, expectedBalance: 0 })
  const [openingAmount, setOpeningAmount] = useState(0)

  useEffect(() => {
    api.get('/cash-register/status').then(res => setCashStatus(res.data))
  }, [])

  const openRegister = async () => {
    await api.post('/cash-register/open', { amount: openingAmount })
    window.location.reload()
  }

  const closeRegister = async () => {
    await api.post('/cash-register/close')
    window.location.reload()
  }

  return (
    <GlassCard className="p-4">
      <h3 className="text-lg font-semibold mb-4">Caisse enregistreuse</h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-blue-500/10">
            <p className="text-sm text-slate-500">Solde d'ouverture</p>
            <p className="text-xl font-bold">{cashStatus.openingBalance.toLocaleString()} FC</p>
          </div>
          <div className="p-3 rounded-lg bg-green-500/10">
            <p className="text-sm text-slate-500">Solde actuel</p>
            <p className="text-xl font-bold text-green-500">{cashStatus.currentBalance.toLocaleString()} FC</p>
          </div>
        </div>
        
        {cashStatus.openingBalance === 0 ? (
          <div className="space-y-3">
            <GlassInput
              type="number"
              placeholder="Montant d'ouverture"
              value={openingAmount}
              onChange={(e) => setOpeningAmount(parseInt(e.target.value))}
            />
            <GlassButton onClick={openRegister} className="w-full">
              Ouvrir la caisse
            </GlassButton>
          </div>
        ) : (
          <GlassButton onClick={closeRegister} variant="destructive" className="w-full">
            Fermer la caisse
          </GlassButton>
        )}
      </div>
    </GlassCard>
  )
}