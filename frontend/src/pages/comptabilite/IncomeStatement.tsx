import { useState, useEffect } from 'react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { api } from '@/services/api'
import { TrendingUp, TrendingDown } from 'lucide-react'

export function IncomeStatement() {
  const [statement, setStatement] = useState(null)
  const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0])
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0])

  useEffect(() => {
    api.get(`/accounting/income-statement?startDate=${startDate}&endDate=${endDate}`).then(res => setStatement(res.data))
  }, [startDate, endDate])

  if (!statement) return null

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <GlassInput type="date" label="Du" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <GlassInput type="date" label="Au" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>

      <GlassCard className="p-4">
        <h3 className="font-semibold mb-4">Produits (Revenus)</h3>
        <div className="space-y-2">
          {Object.entries(statement.revenue?.byType || {}).map(([type, amount]) => (
            <div key={type} className="flex justify-between p-2 border-b border-white/20">
              <span>{type}</span>
              <span>{(amount as number).toLocaleString()} FC</span>
            </div>
          ))}
          <div className="flex justify-between p-3 bg-green-500/10 rounded-lg mt-2">
            <span className="font-bold">TOTAL PRODUITS</span>
            <span className="font-bold text-green-600">{statement.revenue?.total.toLocaleString()} FC</span>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-4">
        <h3 className="font-semibold mb-4">Charges (Dépenses)</h3>
        <div className="space-y-2">
          {Object.entries(statement.expenses?.byCategory || {}).map(([category, amount]) => (
            <div key={category} className="flex justify-between p-2 border-b border-white/20">
              <span>{category}</span>
              <span>{(amount as number).toLocaleString()} FC</span>
            </div>
          ))}
          <div className="flex justify-between p-3 bg-red-500/10 rounded-lg mt-2">
            <span className="font-bold">TOTAL CHARGES</span>
            <span className="font-bold text-red-600">{statement.expenses?.total.toLocaleString()} FC</span>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-4">
        <div className="flex justify-between items-center p-4 rounded-xl" style={{
          backgroundColor: statement.netIncome >= 0 ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)'
        }}>
          <div className="flex items-center gap-3">
            {statement.netIncome >= 0 ? <TrendingUp className="w-6 h-6 text-green-500" /> : <TrendingDown className="w-6 h-6 text-red-500" />}
            <span className="text-lg font-bold">RÉSULTAT NET</span>
          </div>
          <span className={`text-2xl font-bold ${statement.netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {statement.netIncome.toLocaleString()} FC
          </span>
        </div>
      </GlassCard>
    </div>
  )
}