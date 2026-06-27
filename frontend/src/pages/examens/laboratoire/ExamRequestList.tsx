import { useState, useEffect } from 'react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { api } from '@/services/api'
import { Eye, Clipboard } from 'lucide-react'

interface ExamRequestListProps {
  type: string
  onRefresh: () => void
}

export function ExamRequestList({ type, onRefresh }: ExamRequestListProps) {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/exams/pending?type=${type}`).then(res => {
      setRequests(res.data)
      setLoading(false)
    })
  }, [type])

  const startExam = async (id: string) => {
    await api.put(`/exams/${id}/start`)
    onRefresh()
  }

  return (
    <GlassCard className="p-4 mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Dossier</TableHead>
            <TableHead>Demandé par</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((req: any) => (
            <TableRow key={req.id}>
              <TableCell className="font-medium">{req.patient?.nom} {req.patient?.prenom}</TableCell>
              <TableCell>{req.patient?.numeroDossier}</TableCell>
              <TableCell>{req.consultation?.medecin?.firstName} {req.consultation?.medecin?.lastName}</TableCell>
              <TableCell>{new Date(req.requestedAt).toLocaleDateString()}</TableCell>
              <TableCell>{req.description || '-'}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <GlassButton size="sm" variant="ghost" onClick={() => startExam(req.id)}>
                    <Clipboard className="w-4 h-4" />
                  </GlassButton>
                  <GlassButton size="sm" variant="ghost">
                    <Eye className="w-4 h-4" />
                  </GlassButton>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {requests.length === 0 && !loading && (
        <div className="text-center py-8 text-slate-500">Aucune demande en attente</div>
      )}
    </GlassCard>
  )
}   