import { ChevronLeft, ChevronRight } from 'lucide-react'
import { GlassButton } from '@/components/glassmorphic/GlassButton'

interface TablePaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function TablePagination({ currentPage, totalPages, onPageChange }: TablePaginationProps) {
  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
    if (totalPages <= 5) return i + 1
    if (currentPage <= 3) return i + 1
    if (currentPage >= totalPages - 2) return totalPages - 4 + i
    return currentPage - 2 + i
  })

  return (
    <div className="flex items-center justify-end gap-2 mt-4">
      <GlassButton size="sm" variant="ghost" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        <ChevronLeft className="h-4 w-4" />
      </GlassButton>
      
      {pages[0] > 1 && (
        <>
          <GlassButton size="sm" variant="ghost" onClick={() => onPageChange(1)}>1</GlassButton>
          {pages[0] > 2 && <span className="px-2">...</span>}
        </>
      )}
      
      {pages.map(page => (
        <GlassButton key={page} size="sm" variant={currentPage === page ? 'primary' : 'ghost'} onClick={() => onPageChange(page)}>
          {page}
        </GlassButton>
      ))}
      
      {pages[pages.length - 1] < totalPages && (
        <>
          {pages[pages.length - 1] < totalPages - 1 && <span className="px-2">...</span>}
          <GlassButton size="sm" variant="ghost" onClick={() => onPageChange(totalPages)}>{totalPages}</GlassButton>
        </>
      )}
      
      <GlassButton size="sm" variant="ghost" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        <ChevronRight className="h-4 w-4" />
      </GlassButton>
    </div>
  )
}