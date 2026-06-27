import { useState, useEffect } from 'react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { api } from '@/services/api'
import { Search, TrendingUp } from 'lucide-react'

export function SalesHistory() {
  const [sales, setSales] = useState([])
  const [search, setSearch] = useState('')
  const [stats, setStats] = useState({ total: 0, count: 0 })

  useEffect(() => {
    api.get('/pharmacy/sales').then(res => {
      setSales(res.data.sales)
      setStats({ total: res.data.totalAmount, count: res.data.total })
    })
  }, [])

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total des ventes</p>
              <p className="text-2xl font-bold text-green-500">{stats.total.toLocaleString()} FC</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Nombre de ventes</p>
              <p className="text-2xl font-bold">{stats.count}</p>
            </div>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-4">
        <GlassInput
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<Search className="h-4 w-4" />}
          className="mb-4"
        />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Médicament</TableHead>
              <TableHead>Quantité</TableHead>
              <TableHead>Prix unitaire</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Patient</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales.map((sale: any) => (
              <TableRow key={sale.id}>
                <TableCell>{new Date(sale.soldAt).toLocaleString()}</TableCell>
                <TableCell>{sale.medication?.name}</TableCell>
                <TableCell>{sale.quantity}</TableCell>
                <TableCell>{sale.unitPrice.toLocaleString()} FC</TableCell>
                <TableCell className="font-bold">{sale.totalPrice.toLocaleString()} FC</TableCell>
                <TableCell>{sale.patientId || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </GlassCard>
    </div>
  )
}