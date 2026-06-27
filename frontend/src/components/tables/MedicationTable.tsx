import { Badge } from '@/components/ui/Badge'
import { DataTable } from './DataTable'

interface MedicationTableProps {
  medications: any[]
  isLoading?: boolean
}

export function MedicationTable({ medications, isLoading }: MedicationTableProps) {
  const columns = [
    { key: 'code', header: 'Code' },
    { key: 'name', header: 'Médicament' },
    { key: 'category', header: 'Catégorie' },
    { key: 'stock', header: 'Stock', render: (value: number, row: any) => (
      <span className={value <= row.threshold ? 'text-red-500 font-bold' : ''}>{value}</span>
    ) },
    { key: 'price', header: 'Prix', render: (value: number) => `${value.toLocaleString()} FC` },
  ]

  return <DataTable columns={columns} data={medications} loading={isLoading} />
}