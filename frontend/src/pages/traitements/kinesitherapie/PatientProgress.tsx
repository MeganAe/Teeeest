import { useState, useEffect } from 'react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { api } from '@/services/api'

export function PatientProgress() {
  const [patients, setPatients] = useState([])

  useEffect(() => {
    api.get('/treatments/kinesitherapie/patients').then(res => setPatients(res.data))
  }, [])

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return 'success'
    if (progress >= 50) return 'warning'
    return 'danger'
  }

  return (
    <GlassCard className="p-4 mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Diagnostic</TableHead>
            <TableHead>Séances réalisées</TableHead>
            <TableHead>Séances totales</TableHead>
            <TableHead>Progression</TableHead>
            <TableHead>Objectif</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient: any) => (
            <TableRow key={patient.id}>
              <TableCell className="font-medium">{patient.nom} {patient.prenom}</TableCell>
              <TableCell>{patient.diagnostic}</TableCell>
              <TableCell>{patient.sessionsCompleted}</TableCell>
              <TableCell>{patient.totalSessions}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-slate-200 rounded-full h-2">
                    <div className="bg-medical-primary h-2 rounded-full" style={{ width: `${patient.progress}%` }} />
                  </div>
                  <span>{patient.progress}%</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={getProgressColor(patient.progress)}>
                  {patient.progress >= 75 ? 'Atteint' : patient.progress >= 50 ? 'En cours' : 'Début'}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </GlassCard>
  )
}