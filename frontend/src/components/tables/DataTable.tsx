import { useState } from 'react'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { GlassButton } from '@/components/glassmorphic/GlassButton'

interface Column {
  key: string
  header: string
  render?: (value: any, row: any) => React.ReactNode
}

interface DataTableProps {
  columns: Column[]
  data: any[]
  onSearch?: (search: string) => void
  onPageChange?: (page: number) => void
  totalPages?: number
  currentPage?: number
  loading?: boolean
}

export function DataTable({ columns, data, onSearch, onPageChange, totalPages = 1, currentPage = 1, loading = false }: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    onSearch?.(value)
  }

  return (
    <div className="space-y-4">
      {onSearch && (
        <div className="max-w-sm">
          <GlassInput
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            icon={<Search className="h-4 w-4" />}
          />
        </div>
      )}

      <div className="rounded-lg border border-white/20 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.key}>{col.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-8">
                  Chargement...
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-8 text-slate-500">
                  Aucune donnée
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {onPageChange && totalPages > 1 && (
        <div className="flex justify-end gap-2">
          <GlassButton
            size="sm"
            variant="ghost"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </GlassButton>
          <span className="px-4 py-2 text-sm">
            Page {currentPage} sur {totalPages}
          </span>
          <GlassButton
            size="sm"
            variant="ghost"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </GlassButton>
        </div>
      )}
    </div>
  )
}