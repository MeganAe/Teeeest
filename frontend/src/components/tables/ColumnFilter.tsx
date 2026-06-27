import { useState } from 'react'
import { Filter, X } from 'lucide-react'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { Select } from '@/components/ui/Select'

interface ColumnFilterProps {
  column: string
  onFilter: (value: string) => void
  options?: { value: string; label: string }[]
}

export function ColumnFilter({ column, onFilter, options }: ColumnFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState('')

  const applyFilter = () => {
    onFilter(value)
    setIsOpen(false)
  }

  const clearFilter = () => {
    setValue('')
    onFilter('')
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="p-1 hover:bg-white/10 rounded">
        <Filter className="h-3 w-3" />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 p-3 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-white/20 z-10 min-w-[200px]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Filtrer {column}</span>
            <button onClick={clearFilter} className="text-slate-400 hover:text-slate-600">
              <X className="h-3 w-3" />
            </button>
          </div>
          {options ? (
            <Select options={options} value={value} onChange={(e) => setValue(e.target.value)} />
          ) : (
            <GlassInput value={value} onChange={(e) => setValue(e.target.value)} className="mb-2" />
          )}
          <GlassButton size="sm" onClick={applyFilter} className="w-full mt-2">
            Appliquer
          </GlassButton>
        </div>
      )}
    </div>
  )
}