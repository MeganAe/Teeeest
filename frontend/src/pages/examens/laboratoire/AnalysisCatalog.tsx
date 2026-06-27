import { useState } from 'react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { Search } from 'lucide-react'

const analyses = [
  { code: 'NFS', name: 'Numération Formule Sanguine', price: 5000, preparation: 'Aucune', delay: '2h' },
  { code: 'GLU', name: 'Glycémie', price: 3000, preparation: 'Jeûne 8h', delay: '1h' },
  { code: 'CREAT', name: 'Créatininémie', price: 4000, preparation: 'Aucune', delay: '2h' },
  { code: 'UREE', name: 'Urée', price: 4000, preparation: 'Aucune', delay: '2h' },
  { code: 'CHOL', name: 'Cholestérol total', price: 5000, preparation: 'Jeûne 12h', delay: '2h' },
  { code: 'TG', name: 'Triglycérides', price: 5000, preparation: 'Jeûne 12h', delay: '2h' },
  { code: 'ASAT', name: 'ASAT', price: 6000, preparation: 'Aucune', delay: '3h' },
  { code: 'ALAT', name: 'ALAT', price: 6000, preparation: 'Aucune', delay: '3h' },
  { code: 'CRP', name: 'Protéine C réactive', price: 7000, preparation: 'Aucune', delay: '2h' },
  { code: 'VS', name: 'Vitesse de sédimentation', price: 3000, preparation: 'Aucune', delay: '1h' },
]

export function AnalysisCatalog() {
  const [search, setSearch] = useState('')
  const filtered = analyses.filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || a.code.toLowerCase().includes(search.toLowerCase()))

  return (
    <GlassCard className="p-4">
      <div className="mb-4">
        <GlassInput
          placeholder="Rechercher une analyse..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<Search className="h-4 w-4" />}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Analyse</TableHead>
            <TableHead>Préparation</TableHead>
            <TableHead>Délai</TableHead>
            <TableHead>Prix</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((analysis) => (
            <TableRow key={analysis.code}>
              <TableCell className="font-mono">{analysis.code}</TableCell>
              <TableCell>{analysis.name}</TableCell>
              <TableCell>{analysis.preparation}</TableCell>
              <TableCell>{analysis.delay}</TableCell>
              <TableCell>{analysis.price.toLocaleString()} FC</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </GlassCard>
  )
}