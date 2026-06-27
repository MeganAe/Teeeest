import { useState } from 'react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Stethoscope, Calendar, ClipboardList, Plus, X, Loader } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'

export default function Consultation() {
  const [showNewConsultationDialog, setShowNewConsultationDialog] = useState(false)
  const [newConsultation, setNewConsultation] = useState({
    patientId: '',
    doctorId: '',
    notes: '',
    symptoms: '',
  })

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['consultations'],
    queryFn: async () => {
      const response = await api.get('/consultations')
      return response.data
    },
    staleTime: 5 * 60 * 1000,
  })

  const consultations = data?.consultations || []
  const total = data?.total || 0

  const handleAddConsultation = async () => {
    if (!newConsultation.patientId || !newConsultation.doctorId) {
      alert('Veuillez remplir tous les champs requis')
      return
    }
    try {
      await api.post('/consultations', newConsultation)
      alert('Consultation créée avec succès')
      setShowNewConsultationDialog(false)
      setNewConsultation({ patientId: '', doctorId: '', notes: '', symptoms: '' })
      refetch()
    } catch (error) {
      alert('Erreur lors de la création de la consultation')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Consultation</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Gestion des consultations médicales</p>
        </div>
        <GlassButton variant="primary" className="flex items-center gap-2" onClick={() => setShowNewConsultationDialog(true)}>
          <Plus className="w-4 h-4" />
          Nouvelle consultation
        </GlassButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Total</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">{total}</p>
            </div>
            <Stethoscope className="w-8 h-8 text-blue-600 opacity-50" />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">En attente</p>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 mt-2">
                {consultations.filter((c: any) => c.status === 'EN_ATTENTE').length}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-orange-600 opacity-50" />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Complétées</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
                {consultations.filter((c: any) => c.status === 'COMPLETED').length}
              </p>
            </div>
            <ClipboardList className="w-8 h-8 text-green-600 opacity-50" />
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Consultations en cours</h2>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader className="w-6 h-6 animate-spin text-blue-500" />
          </div>
        ) : consultations.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400">Aucune consultation trouvée</p>
        ) : (
          <div className="space-y-3">
            {consultations.map((consultation: any) => (
              <div key={consultation.id} className="flex items-center justify-between p-4 bg-white/20 dark:bg-slate-800/20 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-slate-900 dark:text-white">Patient {consultation.patientId}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Médecin {consultation.doctorId}</p>
                  {consultation.notes && <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">{consultation.notes}</p>}
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    consultation.status === 'COMPLETED'
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200'
                  }`}
                >
                  {consultation.status === 'COMPLETED' ? 'Complétée' : 'En attente'}
                </span>
              </div>
            ))}
          </div>
        )}
      </GlassCard>

      {showNewConsultationDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <GlassCard className="p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Nouvelle consultation</h2>
              <button onClick={() => setShowNewConsultationDialog(false)} className="text-slate-500 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Patient ID</label>
                <input
                  type="text"
                  value={newConsultation.patientId}
                  onChange={(e) => setNewConsultation({ ...newConsultation, patientId: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
                  placeholder="ID du patient"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Médecin ID</label>
                <input
                  type="text"
                  value={newConsultation.doctorId}
                  onChange={(e) => setNewConsultation({ ...newConsultation, doctorId: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
                  placeholder="ID du médecin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Symptômes</label>
                <textarea
                  value={newConsultation.symptoms}
                  onChange={(e) => setNewConsultation({ ...newConsultation, symptoms: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
                  placeholder="Description des symptômes"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Remarques</label>
                <textarea
                  value={newConsultation.notes}
                  onChange={(e) => setNewConsultation({ ...newConsultation, notes: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
                  placeholder="Notes du médecin"
                  rows={3}
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <GlassButton variant="primary" className="flex-1" onClick={handleAddConsultation}>
                Créer
              </GlassButton>
              <GlassButton variant="secondary" className="flex-1" onClick={() => setShowNewConsultationDialog(false)}>
                Annuler
              </GlassButton>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  )
}
