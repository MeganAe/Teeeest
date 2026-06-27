import { useState, useEffect } from 'react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { api } from '@/services/api'
import { useNotificationStore } from '@/stores/notificationStore'

export function ValidationQueue() {
  const [results, setResults] = useState([])
  const { showSuccess } = useNotificationStore()

  useEffect(() => {
    api.get('/exams/results/pending').then(res => setResults(res.data))
  }, [])

  const validate = async (id: string) => {
    await api.put(`/exams/results/${id}/validate`)
    showSuccess('Résultat validé')
    setResults(results.filter(r => r.id !== id))
  }

  return (
    <GlassCard className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Analyse</TableHead>
            <TableHead>Technicien</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((result: any) => (
            <TableRow key={result.id}>
              <TableCell>{result.examRequest?.patient?.nom} {result.examRequest?.patient?.prenom}</TableCell>
              <TableCell>{result.examRequest?.type}</TableCell>
              <TableCell>{result.technician?.firstName} {result.technician?.lastName}</TableCell>
              <TableCell><Badge variant="warning">En attente</Badge></TableCell>
              <TableCell>
                <GlassButton size="sm" onClick={() => validate(result.id)}>
                  Valider
                </GlassButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </GlassCard>
  )
}