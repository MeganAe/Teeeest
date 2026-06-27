import { useState } from 'react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Pill, Package, TrendingDown, AlertCircle, Plus, X, Loader } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'

export default function Pharmacy() {
  const [showNewMedicationDialog, setShowNewMedicationDialog] = useState(false)
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    quantity: '',
    expiryDate: '',
  })

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['pharmacy'],
    queryFn: async () => {
      const response = await api.get('/pharmacy')
      return response.data
    },
    staleTime: 5 * 60 * 1000,
  })

  const medications = data?.medications || []
  const total = data?.total || 0
  const lowStock = medications.filter((m: any) => m.quantity < 10).length

  const handleAddMedication = async () => {
    if (!newMedication.name || !newMedication.dosage || !newMedication.quantity) {
      alert('Veuillez remplir tous les champs')
      return
    }
    try {
      await api.post('/pharmacy', newMedication)
      alert('Médicament ajouté avec succès')
      setShowNewMedicationDialog(false)
      setNewMedication({ name: '', dosage: '', quantity: '', expiryDate: '' })
      refetch()
    } catch (error) {
      alert('Erreur lors de l\'ajout du médicament')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Pharmacie</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Gestion des stocks et médicaments</p>
        </div>
        <GlassButton variant="primary" className="flex items-center gap-2" onClick={() => setShowNewMedicationDialog(true)}>
          <Plus className="w-4 h-4" />
          Nouveau médicament
        </GlassButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Total des articles</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">{total}</p>
            </div>
            <Package className="w-8 h-8 text-blue-600 opacity-50" />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Stock faible</p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">{lowStock}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-600 opacity-50" />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Disponibles</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
                {medications.filter((m: any) => m.quantity > 10).length}
              </p>
            </div>
            <TrendingDown className="w-8 h-8 text-green-600 opacity-50" />
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Médicaments en stock</h2>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader className="w-6 h-6 animate-spin text-blue-500" />
          </div>
        ) : medications.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400">Aucun médicament trouvé</p>
        ) : (
          <div className="space-y-3">
            {medications.map((medication: any) => (
              <div key={medication.id} className="flex items-center justify-between p-4 bg-white/20 dark:bg-slate-800/20 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-slate-900 dark:text-white">{medication.name}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Dosage: {medication.dosage} • Stock: {medication.quantity} unités
                  </p>
                  {medication.expiryDate && (
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                      Expiration: {new Date(medication.expiryDate).toLocaleDateString('fr-FR')}
                    </p>
                  )}
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    medication.quantity < 5
                      ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                      : medication.quantity < 10
                      ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                      : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                  }`}
                >
                  {medication.quantity < 5 ? 'Critique' : medication.quantity < 10 ? 'Faible' : 'Normal'}
                </span>
              </div>
            ))}
          </div>
        )}
      </GlassCard>

      {showNewMedicationDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <GlassCard className="p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Nouveau médicament</h2>
              <button onClick={() => setShowNewMedicationDialog(false)} className="text-slate-500 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Nom du médicament</label>
                <input
                  type="text"
                  value={newMedication.name}
                  onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
                  placeholder="Nom du médicament"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Dosage</label>
                <input
                  type="text"
                  value={newMedication.dosage}
                  onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
                  placeholder="Ex: 500mg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Quantité</label>
                <input
                  type="number"
                  value={newMedication.quantity}
                  onChange={(e) => setNewMedication({ ...newMedication, quantity: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
                  placeholder="Nombre d'unités"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Date d'expiration</label>
                <input
                  type="date"
                  value={newMedication.expiryDate}
                  onChange={(e) => setNewMedication({ ...newMedication, expiryDate: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <GlassButton variant="primary" className="flex-1" onClick={handleAddMedication}>
                Créer
              </GlassButton>
              <GlassButton variant="secondary" className="flex-1" onClick={() => setShowNewMedicationDialog(false)}>
                Annuler
              </GlassButton>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  )
}
