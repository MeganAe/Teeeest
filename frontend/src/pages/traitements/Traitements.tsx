import { useState } from 'react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Pill, AlertCircle, CheckCircle, Plus, X, Loader } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'

export default function Traitements() {
  const [showNewTreatmentDialog, setShowNewTreatmentDialog] = useState(false)
  const [newTreatment, setNewTreatment] = useState({
    patientId: '',
    medication: '',
    dosage: '',
    frequency: '',
    duration: '',
  })

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['treatments'],
    queryFn: async () => {
      const response = await api.get('/treatments')
      return response.data
    },
    staleTime: 5 * 60 * 1000,
  })

  const treatments = data?.treatments || []
  const total = data?.total || 0

  const handleAddTreatment = async () => {
    if (!newTreatment.patientId || !newTreatment.medication) {
      alert('Veuillez remplir tous les champs')
      return
    }
    try {
      await api.post('/treatments', newTreatment)
      alert('Traitement créé avec succès')
      setShowNewTreatmentDialog(false)
      setNewTreatment({ patientId: '', medication: '', dosage: '', frequency: '', duration: '' })
      refetch()
    } catch (error) {
      alert('Erreur lors de la création du traitement')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Traitements</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Gestion des traitements et prescriptions</p>
        </div>
        <GlassButton variant="primary" className="flex items-center gap-2" onClick={() => setShowNewTreatmentDialog(true)}>
          <Plus className="w-4 h-4" />
          Nouveau traitement
        </GlassButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Total</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">{total}</p>
            </div>
            <Pill className="w-8 h-8 text-blue-600 opacity-50" />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">En cours</p>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 mt-2">
                {treatments.filter((t: any) => t.status === 'ACTIVE').length}
              </p>
            </div>
            <AlertCircle className="w-8 h-8 text-orange-600 opacity-50" />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Complétés</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
                {treatments.filter((t: any) => t.status === 'COMPLETED').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600 opacity-50" />
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Traitements en cours</h2>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader className="w-6 h-6 animate-spin text-blue-500" />
          </div>
        ) : treatments.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400">Aucun traitement trouvé</p>
        ) : (
          <div className="space-y-3">
            {treatments.map((treatment: any) => (
              <div key={treatment.id} className="flex items-center justify-between p-4 bg-white/20 dark:bg-slate-800/20 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-slate-900 dark:text-white">Patient {treatment.patientId}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{treatment.medication} - {treatment.dosage}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">{treatment.frequency} • {treatment.duration}</p>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                  Actif
                </span>
              </div>
            ))}
          </div>
        )}
      </GlassCard>

      {showNewTreatmentDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <GlassCard className="p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Nouveau traitement</h2>
              <button onClick={() => setShowNewTreatmentDialog(false)} className="text-slate-500 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Patient ID</label>
                <input
                  type="text"
                  value={newTreatment.patientId}
                  onChange={(e) => setNewTreatment({ ...newTreatment, patientId: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
                  placeholder="ID du patient"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Médicament</label>
                <input
                  type="text"
                  value={newTreatment.medication}
                  onChange={(e) => setNewTreatment({ ...newTreatment, medication: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
                  placeholder="Nom du médicament"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Dosage</label>
                <input
                  type="text"
                  value={newTreatment.dosage}
                  onChange={(e) => setNewTreatment({ ...newTreatment, dosage: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
                  placeholder="Ex: 500mg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Fréquence</label>
                <input
                  type="text"
                  value={newTreatment.frequency}
                  onChange={(e) => setNewTreatment({ ...newTreatment, frequency: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
                  placeholder="Ex: x3 par jour"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Durée</label>
                <input
                  type="text"
                  value={newTreatment.duration}
                  onChange={(e) => setNewTreatment({ ...newTreatment, duration: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
                  placeholder="Ex: 7 jours"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <GlassButton variant="primary" className="flex-1" onClick={handleAddTreatment}>
                Créer
              </GlassButton>
              <GlassButton variant="secondary" className="flex-1" onClick={() => setShowNewTreatmentDialog(false)}>
                Annuler
              </GlassButton>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  )
}
