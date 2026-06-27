import { Badge } from '@/components/ui/Badge'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Eye } from 'lucide-react'
import { DataTable } from './DataTable'

interface PatientTableProps {
  patients: any[]
  isLoading?: boolean
  onView?: (patient: any) => void
}

export function PatientTable({ patients, isLoading, onView }: PatientTableProps) {
  const columns = [
    { key: 'numeroDossier', header: 'Dossier' },
    { key: 'nom', header: 'Nom', render: (_: any, row: any) => `${row.nom} ${row.prenom}` },
    { key: 'sexe', header: 'Sexe' },
    { key: 'dateNaissance', header: 'Âge', render: (value: string) => `${new Date().getFullYear() - new Date(value).getFullYear()} ans` },
    { key: 'typeHandicap', header: 'Handicap', render: (value: string) => <Badge variant="info">{value}</Badge> },
    { key: 'telephone', header: 'Téléphone' },
    {
      key: 'actions',
      header: 'Actions',
      render: (_: any, row: any) => (
        <GlassButton size="sm" variant="ghost" onClick={() => onView?.(row)}>
          <Eye className="h-4 w-4" />
        </GlassButton>
      )
    },
  ]

  return <DataTable columns={columns} data={patients} loading={isLoading} />
}