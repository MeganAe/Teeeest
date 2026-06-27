import { useState, useEffect } from 'react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { Eye, Search } from 'lucide-react'
import { api } from '@/services/api'

export function SurgeryHistory() {
  const [surgeries, setSurgeries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    api.get('/treatments/chirurgie?status=COMPLETED').then(res => setSurgeries(res.data.surgeries))
  }, [])

  const filtered = surgeries.filter((s: any) =>
    s.patient?.nom?.toLowerCase().includes(search.toLowerCase()) ||
    s.patient?.prenom?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <GlassCard className="p-4 mt-4">
      <div className="mb-4">
        <GlassInput placeholder="Rechercher par patient..." value={search} onChange={(e) => setSearch(e.target.value)} icon={<Search className="h-4 w-4" />} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Intervention</TableHead>
            <TableHead>Chirurgien</TableHead>
            <TableHead>Résultat</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((surgery: any) => (
            <TableRow key={surgery.id}>
              <TableCell>{new Date(surgery.performedDate || surgery.scheduledDate).toLocaleDateString()}</TableCell>
              <TableCell className="font-medium">{surgery.patient?.nom} {surgery.patient?.prenom}</TableCell>
              <TableCell>{surgery.type}</TableCell>
              <TableCell>{surgery.surgeon?.firstName} {surgery.surgeon?.lastName}</TableCell>
              <TableCell><Badge variant={surgery.outcome === 'SUCCES' ? 'success' : 'destructive'}>{surgery.outcome}</Badge></TableCell>
              <TableCell><button className="p-1 hover:bg-white/10 rounded"><Eye className="h-4 w-4" /></button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </GlassCard>
  )
}