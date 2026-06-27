import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { api } from '@/services/api'
import { useNotificationStore } from '@/stores/notificationStore'

export function OperationReport() {
  const [surgeries, setSurgeries] = useState([])
  const [selectedSurgery, setSelectedSurgery] = useState(null)
  const [loading, setLoading] = useState(false)
  const { showSuccess } = useNotificationStore()
  const { register, handleSubmit } = useForm()

  useEffect(() => {
    api.get('/treatments/chirurgie?status=PLANIFIE').then(res => setSurgeries(res.data.surgeries))
  }, [])

  const onSubmit = async (data: any) => {
    setLoading(true)
    await api.put(`/treatments/chirurgie/${selectedSurgery}`, {
      ...data,
      status: 'COMPLETED',
      performedDate: new Date(),
    })
    showSuccess('Compte rendu opératoire enregistré')
    setSelectedSurgery(null)
    setLoading(false)
  }

  if (!selectedSurgery) {
    return (
      <GlassCard className="p-4 mt-4">
        <h3 className="font-semibold mb-4">Sélectionner une intervention</h3>
        <div className="space-y-2">
          {surgeries.map((surgery: any) => (
            <button
              key={surgery.id}
              onClick={() => setSelectedSurgery(surgery.id)}
              className="w-full text-left p-3 rounded-lg border border-white/20 hover:bg-white/10 transition-colors"
            >
              <p className="font-medium">{surgery.patient?.nom} {surgery.patient?.prenom}</p>
              <p className="text-sm text-slate-500">{surgery.type} - {new Date(surgery.scheduledDate).toLocaleDateString()}</p>
            </button>
          ))}
        </div>
      </GlassCard>
    )
  }

  return (
    <GlassCard className="p-4 mt-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h3 className="font-semibold">Compte rendu opératoire</h3>
        <Textarea label="Procédure réalisée" placeholder="Description détaillée..." {...register('procedure')} rows={4} />
        <Textarea label="Constations per-opératoires" placeholder="Observations..." {...register('findings')} rows={3} />
        <Textarea label="Suites opératoires" placeholder="Complications, évolution..." {...register('postOp')} rows={2} />
        <Select label="Résultat" options={[{ value: 'SUCCES', label: 'Succès' }, { value: 'COMPLICATIONS', label: 'Complications' }, { value: 'ECHEC', label: 'Échec' }]} {...register('outcome')} />
        <div className="flex gap-3">
          <GlassButton type="submit" loading={loading} className="flex-1">Enregistrer</GlassButton>
          <GlassButton type="button" variant="ghost" onClick={() => setSelectedSurgery(null)}>Annuler</GlassButton>
        </div>
      </form>
    </GlassCard>
  )
}