import { useState, useEffect } from 'react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { api } from '@/services/api'
import { Search, Printer, Download } from 'lucide-react'

export function CashJournal() {
  const [journal, setJournal] = useState({ incomes: [], expenses: [] })
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0])
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0])

  useEffect(() => {
    api.get(`/accounting/cash-journal?startDate=${startDate}&endDate=${endDate}`).then(res => setJournal(res.data))
  }, [startDate, endDate])

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <GlassInput type="date" label="Du" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <GlassInput type="date" label="Au" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <div className="flex gap-2 items-end">
          <GlassButton variant="secondary"><Printer className="w-4 h-4" /></GlassButton>
          <GlassButton variant="secondary"><Download className="w-4 h-4" /></GlassButton>
        </div>
      </div>

      <GlassCard className="p-4">
        <h3 className="font-semibold mb-4">Recettes</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Référence</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Mode</TableHead>
              <TableHead>Montant</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {journal.incomes.map((inc: any) => (
              <TableRow key={inc.id}>
                <TableCell>{new Date(inc.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{inc.reference}</TableCell>
                <TableCell>{inc.patient?.nom} {inc.patient?.prenom}</TableCell>
                <TableCell>{inc.type}</TableCell>
                <TableCell>{inc.modePaiement}</TableCell>
                <TableCell className="text-green-500 font-bold">{inc.montant.toLocaleString()} FC</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </GlassCard>

      <GlassCard className="p-4">
        <h3 className="font-semibold mb-4">Dépenses</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Compte</TableHead>
              <TableHead>Montant</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {journal.expenses.map((exp: any) => (
              <TableRow key={exp.id}>
                <TableCell>{new Date(exp.date).toLocaleDateString()}</TableCell>
                <TableCell>{exp.description}</TableCell>
                <TableCell>{exp.category}</TableCell>
                <TableCell>{exp.account}</TableCell>
                <TableCell className="text-red-500 font-bold">{exp.amount.toLocaleString()} FC</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </GlassCard>
    </div>
  )
}