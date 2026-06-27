import { useState, useEffect } from 'react'
import { ChevronRight, User } from 'lucide-react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { api } from '@/services/api'

export function RecentPatients() {
  const [patients, setPatients] = useState([])

  useEffect(() => {
    api.get('/patients/recent?limit=5').then(res => setPatients(res.data))
  }, [])

  return (
    <GlassCard className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Patients récents</h2>
        <button className="text-medical-primary text-sm hover:underline">Voir tout</button>
      </div>
      <div className="space-y-3">
        {patients.map((patient: any) => (
          <div key={patient.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-medical-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-medical-primary" />
              </div>
              <div>
                <p className="font-medium">{patient.nom} {patient.prenom}</p>
                <p className="text-sm text-slate-500">Dossier: {patient.numeroDossier}</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
        ))}
      </div>
    </GlassCard>
  )
}