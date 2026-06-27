import { useState, useEffect } from 'react'
import { Plus, Search, Edit, Trash2, AlertTriangle } from 'lucide-react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { api } from '@/services/api'
import { MedicationEntry } from './MedicationEntry'

export function StockManagement() {
  const [medications, setMedications] = useState([])
  const [search, setSearch] = useState('')
  const [showEntry, setShowEntry] = useState(false)

  useEffect(() => {
    api.get('/pharmacy/medications').then(res => setMedications(res.data.medications))
  }, [])

  const filtered = medications.filter((m: any) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.code.toLowerCase().includes(search.toLowerCase())
  )

  const isLowStock = (stock: number, threshold: number) => stock <= threshold

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex-1 max-w-md">
          <GlassInput
            placeholder="Rechercher un médicament..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search className="h-4 w-4" />}
          />
        </div>
        <GlassButton onClick={() => setShowEntry(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nouveau médicament
        </GlassButton>
      </div>

      <GlassCard className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Médicament</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Unité</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Seuil</TableHead>
              <TableHead>Prix unitaire</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((med: any) => (
              <TableRow key={med.id}>
                <TableCell className="font-mono">{med.code}</TableCell>
                <TableCell className="font-medium">{med.name}</TableCell>
                <TableCell>{med.category}</TableCell>
                <TableCell>{med.unit}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {isLowStock(med.stock, med.threshold) && (
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    )}
                    <span className={isLowStock(med.stock, med.threshold) ? 'text-yellow-500 font-bold' : ''}>
                      {med.stock}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{med.threshold}</TableCell>
                <TableCell>{med.price.toLocaleString()} FC</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <GlassButton size="sm" variant="ghost">
                      <Edit className="w-4 h-4" />
                    </GlassButton>
                    <GlassButton size="sm" variant="ghost" className="text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </GlassButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </GlassCard>

      <MedicationEntry isOpen={showEntry} onClose={() => setShowEntry(false)} onSuccess={() => {
        setShowEntry(false)
        api.get('/pharmacy/medications').then(res => setMedications(res.data.medications))
      }} />
    </div>
  )
}