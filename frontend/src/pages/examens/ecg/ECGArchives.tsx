import { useState, useEffect } from 'react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { Eye, Search } from 'lucide-react'
import { api } from '@/services/api'

export function ECGArchives() {
  const [exams, setExams] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    api.get('/exams?type=ECG&status=COMPLETED').then(res => setExams(res.data.exams))
  }, [])

  const filtered = exams.filter((e: any) =>
    e.patient?.nom?.toLowerCase().includes(search.toLowerCase()) ||
    e.patient?.prenom?.toLowerCase().includes(search.toLowerCase()) ||
    e.patient?.numeroDossier?.includes(search)
  )

  return (
    <GlassCard className="p-4 mt-4">
      <div className="mb-4">
        <GlassInput
          placeholder="Rechercher par patient..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<Search className="h-4 w-4" />}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Dossier</TableHead>
            <TableHead>Interprétation</TableHead>
            <TableHead>Médecin</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((exam: any) => (
            <TableRow key={exam.id}>
              <TableCell>{new Date(exam.requestedAt).toLocaleDateString()}</TableCell>
              <TableCell className="font-medium">{exam.patient?.nom} {exam.patient?.prenom}</TableCell>
              <TableCell>{exam.patient?.numeroDossier}</TableCell>
              <TableCell>
                <Badge variant={exam.examResult?.interpretation === 'NORMAL' ? 'success' : 'warning'}>
                  {exam.examResult?.interpretation || '-'}
                </Badge>
              </TableCell>
              <TableCell>{exam.consultation?.medecin?.firstName} {exam.consultation?.medecin?.lastName}</TableCell>
              <TableCell>
                <button className="p-1 hover:bg-white/10 rounded">
                  <Eye className="h-4 w-4" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </GlassCard>
  )
}