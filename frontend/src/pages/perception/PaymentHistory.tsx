import { useState, useEffect } from 'react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { api } from '@/services/api'

export function PaymentHistory() {
  const [payments, setPayments] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/payments').then(res => {
      setPayments(res.data.payments)
      setLoading(false)
    })
  }, [])

  const filteredPayments = payments.filter(p =>
    p.receiptNumber.toLowerCase().includes(search.toLowerCase()) ||
    p.patient?.nom?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <GlassCard className="p-4">
      <div className="mb-4">
        <GlassInput
          placeholder="Rechercher par reçu ou patient..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Reçu</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead>Mode</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPayments.map((payment: any) => (
            <TableRow key={payment.id}>
              <TableCell className="font-medium">{payment.receiptNumber}</TableCell>
              <TableCell>{payment.patient?.nom} {payment.patient?.prenom}</TableCell>
              <TableCell>{new Date(payment.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>{payment.type}</TableCell>
              <TableCell className="font-bold">{payment.montant.toLocaleString()} FC</TableCell>
              <TableCell>{payment.modePaiement}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {filteredPayments.length === 0 && !loading && (
        <div className="text-center py-8 text-slate-500">Aucun paiement trouvé</div>
      )}
    </GlassCard>
  )
}