import { Badge } from '@/components/ui/Badge'
import { DataTable } from './DataTable'

interface PaymentTableProps {
  payments: any[]
  isLoading?: boolean
}

export function PaymentTable({ payments, isLoading }: PaymentTableProps) {
  const columns = [
    { key: 'receiptNumber', header: 'Reçu' },
    { key: 'patient', header: 'Patient', render: (_: any, row: any) => `${row.patient?.nom} ${row.patient?.prenom}` },
    { key: 'createdAt', header: 'Date', render: (value: string) => new Date(value).toLocaleDateString() },
    { key: 'type', header: 'Type' },
    { key: 'modePaiement', header: 'Mode', render: (value: string) => <Badge variant="info">{value}</Badge> },
    { key: 'montant', header: 'Montant', render: (value: number) => `${value.toLocaleString()} FC` },
    { key: 'status', header: 'Statut', render: (value: string) => <Badge variant={value === 'COMPLETED' ? 'success' : 'warning'}>{value === 'COMPLETED' ? 'Payé' : 'En attente'}</Badge> },
  ]

  return <DataTable columns={columns} data={payments} loading={isLoading} />
}