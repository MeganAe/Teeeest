import { Badge } from '@/components/ui/Badge'
import { DataTable } from './DataTable'

interface ConsultationTableProps {
  consultations: any[]
  isLoading?: boolean
}

export function ConsultationTable({ consultations, isLoading }: ConsultationTableProps) {
  const columns = [
    { key: 'dateConsultation', header: 'Date', render: (value: string) => new Date(value).toLocaleString() },
    { key: 'patient', header: 'Patient', render: (_: any, row: any) => `${row.patient?.nom} ${row.patient?.prenom}` },
    { key: 'medecin', header: 'Médecin', render: (_: any, row: any) => `Dr ${row.medecin?.firstName} ${row.medecin?.lastName}` },
    { key: 'motif', header: 'Motif' },
    { key: 'diagnostic', header: 'Diagnostic' },
    { key: 'status', header: 'Statut', render: (value: string) => <Badge variant={value === 'TERMINE' ? 'success' : 'warning'}>{value}</Badge> },
  ]

  return <DataTable columns={columns} data={consultations} loading={isLoading} />
}