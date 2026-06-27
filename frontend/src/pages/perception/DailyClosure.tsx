import { useState, useEffect } from 'react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { api } from '@/services/api'
import { TrendingUp, TrendingDown, Printer, Download } from 'lucide-react'

export function DailyClosure() {
  const [closure, setClosure] = useState(null)
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  useEffect(() => {
    api.get(`/payments/daily?date=${date}`).then(res => setClosure(res.data))
  }, [date])

  const printClosure = () => {
    const printWindow = window.open('', '_blank')
    printWindow?.document.write(`
      <html>
        <head><title>Clôture journalière - AMKA</title></head>
        <body style="font-family: monospace; padding: 20px;">
          <h2 style="text-align: center;">AMKA Medical Center</h2>
          <h3 style="text-align: center;">Clôture journalière du ${new Date(date).toLocaleDateString()}</h3>
          <hr />
          <p><strong>Total encaissé:</strong> ${closure?.total.toLocaleString()} FC</p>
          <p><strong>Nombre de transactions:</strong> ${closure?.count}</p>
          <h4>Par mode de paiement:</h4>
          <ul>
            <li>Espèces: ${closure?.byMethod.ESPECES?.toLocaleString() || 0} FC</li>
            <li>Mobile Money: ${closure?.byMethod.MOBILE_MONEY?.toLocaleString() || 0} FC</li>
            <li>Carte: ${closure?.byMethod.CARTE?.toLocaleString() || 0} FC</li>
          </ul>
          <hr />
          <p>Signature du percepteur: _________________</p>
          <p>Signature du comptable: _________________</p>
        </body>
      </html>
    `)
    printWindow?.print()
  }

  return (
    <GlassCard className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Clôture journalière</h3>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="px-3 py-1 rounded-lg border border-white/20 bg-white/50 dark:bg-slate-900/50"
        />
      </div>
      
      {closure && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-green-500/10 text-center">
              <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-500">{closure.total.toLocaleString()} FC</p>
              <p className="text-sm">Total encaissé</p>
            </div>
            <div className="p-4 rounded-lg bg-blue-500/10 text-center">
              <p className="text-2xl font-bold">{closure.count}</p>
              <p className="text-sm">Transactions</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Détail par mode de paiement</h4>
            <div className="space-y-2">
              <div className="flex justify-between p-2 rounded-lg bg-white/10">
                <span>Espèces</span>
                <span className="font-bold">{closure.byMethod.ESPECES?.toLocaleString() || 0} FC</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-white/10">
                <span>Mobile Money</span>
                <span className="font-bold">{closure.byMethod.MOBILE_MONEY?.toLocaleString() || 0} FC</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-white/10">
                <span>Carte bancaire</span>
                <span className="font-bold">{closure.byMethod.CARTE?.toLocaleString() || 0} FC</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <GlassButton onClick={printClosure} className="flex-1">
              <Printer className="w-4 h-4 mr-2" />
              Imprimer
            </GlassButton>
            <GlassButton variant="secondary" className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </GlassButton>
          </div>
        </div>
      )}
    </GlassCard>
  )
}