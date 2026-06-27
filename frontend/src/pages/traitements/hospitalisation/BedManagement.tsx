import { useState, useEffect } from 'react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { api } from '@/services/api'

export function BedManagement() {
  const [beds, setBeds] = useState([])

  useEffect(() => {
    api.get('/hospitalizations/beds').then(res => setBeds(res.data.beds))
  }, [])

  return (
    <GlassCard className="p-4 mt-4">
      <div className="grid grid-cols-5 gap-2 mb-4">
        {['Bloc A', 'Bloc B', 'Bloc C', 'Bloc D', 'Bloc E'].map(block => (
          <div key={block} className="text-center font-semibold p-2 bg-white/10 rounded-lg">
            {block}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-2">
        {beds.map((bed: any) => (
          <div
            key={bed.number}
            className={`p-3 rounded-lg text-center ${
              bed.isOccupied ? 'bg-red-500/20 border border-red-500/30' : 'bg-green-500/20 border border-green-500/30'
            }`}
          >
            <p className="font-bold">{bed.number}</p>
            {bed.isOccupied ? (
              <>
                <p className="text-xs mt-1">{bed.patient?.nom} {bed.patient?.prenom}</p>
                <p className="text-xs text-slate-400">Depuis {new Date(bed.admissionDate).toLocaleDateString()}</p>
              </>
            ) : (
              <p className="text-xs text-green-500 mt-1">Disponible</p>
            )}
          </div>
        ))}
      </div>
    </GlassCard>
  )
}