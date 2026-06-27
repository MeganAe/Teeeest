import { Badge } from '@/components/ui/Badge'
import { DataTable } from './DataTable'

interface UserTableProps {
  users: any[]
  isLoading?: boolean
}

export function UserTable({ users, isLoading }: UserTableProps) {
  const columns = [
    { key: 'firstName', header: 'Nom', render: (_: any, row: any) => `${row.firstName} ${row.lastName}` },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Rôle', render: (value: string) => <Badge variant="info">{value}</Badge> },
    { key: 'isActive', header: 'Statut', render: (value: boolean) => <Badge variant={value ? 'success' : 'destructive'}>{value ? 'Actif' : 'Inactif'}</Badge> },
    { key: 'lastLogin', header: 'Dernière connexion', render: (value: string) => value ? new Date(value).toLocaleString() : '-' },
  ]

  return <DataTable columns={columns} data={users} loading={isLoading} />
}