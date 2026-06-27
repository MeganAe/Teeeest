import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { Select } from '@/components/ui/Select'
import { api } from '@/services/api'

export function EvolutionTracker() {
  const [patientId, setPatientId] = useState('')
  const [evolution, setEvolution] = useState([])

  useEffect(() => {
    if (patientId) {
      api.get(`/treatments/kinesitherapie/evolution/${patientId}`).then(res => setEvolution(res.data))
    }
  }, [patientId])

  return (
    <GlassCard className="p-4 mt-4">
      <Select
        label="Patient"
        options={[]}
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
        className="mb-4"
      />
      
      {evolution.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={evolution}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="session" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip />
            <Line type="monotone" dataKey="mobilite" stroke="#0EA5E9" name="Mobilité" />
            <Line type="monotone" dataKey="force" stroke="#10B981" name="Force" />
            <Line type="monotone" dataKey="douleur" stroke="#EF4444" name="Douleur" />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="text-center py-12 text-slate-500">
          Sélectionnez un patient pour voir son évolution
        </div>
      )}
    </GlassCard>
  )
}