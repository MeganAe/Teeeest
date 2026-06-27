import { useState } from 'react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Activity, CheckCircle, Clock, Plus, X, Loader } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'

export default function Examens() {
  const [showNewExamDialog, setShowNewExamDialog] = useState(false)
  const [newExam, setNewExam] = useState({ patientId: '', type: 'RADIOGRAPHIE', notes: '' })

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['exams'],
    queryFn: async () => {
      const response = await api.get('/exams')
      return response.data
    },
    staleTime: 5 * 60 * 1000,
  })

  const exams = data?.exams || []
  const total = data?.total || 0

  const handleAddExam = async () => {
    if (!newExam.patientId || !newExam.type) {
      alert('Veuillez remplir tous les champs')
      return
    }
    try {
      await api.post('/exams', newExam)
      alert('Examen créé avec succès')
      setShowNewExamDialog(false)
      setNewExam({ patientId: '', type: 'RADIOGRAPHIE', notes: '' })
      refetch()
    } catch (error) {
      alert('Erreur lors de la création de l\'examen')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Examens</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Gestion des examens et analyses</p>
        </div>
        <GlassButton variant="primary" className="flex items-center gap-2" onClick={() => setShowNewExamDialog(true)}>
          <Plus className="w-4 h-4" />
          Nouvel examen
        </GlassButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Total d\'examens</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">{total}</p>
            </div>
            <Activity className="w-8 h-8 text-blue-600 opacity-50" />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">En cours</p>
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">
                {exams.filter((e: any) => e.status === 'EN_COURS').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600 opacity-50" />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Complétés</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
                {exams.filter((e: any) => e.status === 'COMPLETED').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600 opacity-50" />
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Examens récents</h2>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader className="w-6 h-6 animate-spin text-blue-500" />
          </div>
        ) : exams.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400">Aucun examen trouvé</p>
        ) : (
          <div className="space-y-3">
            {exams.map((exam: any) => (
              <div
                key={exam.id}
                className="flex items-center justify-between p-4 bg-white/20 dark:bg-slate-800/20 rounded-lg border border-white/30 dark:border-slate-700/30"
              >
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">{exam.type}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Patient {exam.patientId} - {exam.result || 'En attente'}</p>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    exam.status === 'COMPLETED'
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                  }`}
                >
                  {exam.status === 'COMPLETED' ? 'Complété' : 'En attente'}
                </span>
              </div>
            ))}
          </div>
        )}
      </GlassCard>

      {showNewExamDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <GlassCard className="p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Nouvel examen</h2>
              <button onClick={() => setShowNewExamDialog(false)} className="text-slate-500 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Patient ID</label>
                <input
                  type="text"
                  value={newExam.patientId}
                  onChange={(e) => setNewExam({ ...newExam, patientId: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
                  placeholder="ID du patient"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Type d\'examen</label>
                <select
                  value={newExam.type}
                  onChange={(e) => setNewExam({ ...newExam, type: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
                >
                  <option value="RADIOGRAPHIE">Radiographie</option>
                  <option value="LABORATOIRE">Laboratoire</option>
                  <option value="ECG">ECG</option>
                  <option value="ECHOGRAPHIE">Échographie</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Remarques</label>
                <textarea
                  value={newExam.notes}
                  onChange={(e) => setNewExam({ ...newExam, notes: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
                  placeholder="Notes optionnelles"
                  rows={3}
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <GlassButton variant="primary" className="flex-1" onClick={handleAddExam}>
                Créer
              </GlassButton>
              <GlassButton variant="secondary" className="flex-1" onClick={() => setShowNewExamDialog(false)}>
                Annuler
              </GlassButton>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  )
}
