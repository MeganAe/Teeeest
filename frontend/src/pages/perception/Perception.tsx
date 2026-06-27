import { useState } from 'react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { DollarSign, Receipt, TrendingUp, Loader, X } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { paymentService } from '@/services/payment.service'

export default function Perception() {
  const [page, setPage] = useState(1)
  const [formData, setFormData] = useState({patient: '', amount: ''})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showJournalDialog, setShowJournalDialog] = useState(false)
  const [showCloseDialog, setShowCloseDialog] = useState(false)
  const [closeData, setCloseData] = useState({ reason: '', notes: '' })

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['payments', page],
    queryFn: async () => {
      const result = await paymentService.getAll({ page, limit: 10 })
      return result
    },
    staleTime: 5 * 60 * 1000,
  })

  const payments = data?.payments || data?.data || []
  const total = data?.totalAmount || 0
  const totalPages = data?.totalPages || 1
  const paymentCount = data?.total || payments.length

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.patient || !formData.amount) {
      alert('Veuillez remplir tous les champs')
      return
    }

    setIsSubmitting(true)
    try {
      await paymentService.create({
        patientId: formData.patient,
        amount: parseFloat(formData.amount),
        type: 'PAYMENT',
      })
      setFormData({ patient: '', amount: '' })
      refetch()
      alert('Paiement enregistré avec succès')
    } catch (error) {
      alert('Erreur lors de l\'enregistrement du paiement')
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleViewJournal = () => {
    setShowJournalDialog(true)
  }

  const handleCloseCash = async () => {
    if (!closeData.reason) {
      alert('Veuillez spécifier la raison de la clôture')
      return
    }
    try {
      alert(`Clôture enregistrée\nRaison: ${closeData.reason}\nMontant total: ${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'CDF' }).format(total)}`)
      setShowCloseDialog(false)
      setCloseData({ reason: '', notes: '' })
    } catch (error) {
      alert('Erreur lors de la clôture')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Perception</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Gestion des encaissements et facturation</p>
        </div>
        <div className="flex gap-2">
          <GlassButton variant="secondary" onClick={handleViewJournal}>Journal</GlassButton>
          <GlassButton variant="primary" onClick={() => setShowCloseDialog(true)}>Clôture</GlassButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Recettes totales</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'CDF' }).format(total)}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600 opacity-50" />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Nombre de transactions</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">{paymentCount}</p>
            </div>
            <Receipt className="w-8 h-8 text-blue-600 opacity-50" />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Montant moyen</p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">
                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'CDF' }).format(
                  paymentCount > 0 ? total / paymentCount : 0
                )}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600 opacity-50" />
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Nouveau paiement</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">Patient ID</label>
            <input
              type="text"
              placeholder="ID du patient..."
              value={formData.patient}
              onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">Montant (CDF)</label>
            <input
              type="number"
              placeholder="0"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <GlassButton
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2"
            variant="primary"
          >
            {isSubmitting ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Enregistrement...
              </>
            ) : (
              'Enregistrer le paiement'
            )}
          </GlassButton>
        </form>
      </GlassCard>

      <GlassCard className="p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Derniers paiements</h2>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader className="w-6 h-6 animate-spin text-blue-500" />
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-600 dark:text-red-400">
            Erreur lors du chargement des paiements
          </div>
        ) : payments.length === 0 ? (
          <div className="text-center py-8 text-slate-600 dark:text-slate-400">
            Aucun paiement trouvé
          </div>
        ) : (
          <div className="space-y-3">
            {payments.map((payment: any, idx: number) => (
              <div
                key={payment.id || idx}
                className="flex items-center justify-between p-3 bg-white/30 dark:bg-slate-800/30 rounded-lg hover:bg-white/40 dark:hover:bg-slate-800/40 transition"
              >
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">
                    {payment.reference || `Récépissé #${1001 + idx}`}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {new Date(payment.createdAt || new Date()).toLocaleDateString('fr-FR')} -{' '}
                    {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'CDF' }).format(payment.amount || 0)}
                  </p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full ${
                  payment.status === 'PAID' || payment.status === 'paid'
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                    : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                }`}>
                  {payment.status === 'PAID' || payment.status === 'paid' ? 'Payé' : payment.status || 'En attente'}
                </span>
              </div>
            ))}
          </div>
        )}
      </GlassCard>

      {showJournalDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <GlassCard className="p-8 max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Journal des paiements</h2>
              <button onClick={() => setShowJournalDialog(false)} className="text-slate-500 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {payments.map((payment: any, idx: number) => (
                <div key={idx} className="flex justify-between items-center p-3 border-b border-slate-300 dark:border-slate-600">
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {new Date(payment.createdAt || new Date()).toLocaleString('fr-FR')}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Patient {payment.patientId}</p>
                  </div>
                  <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                    +{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'CDF' }).format(payment.amount || 0)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-slate-300 dark:border-slate-600 pt-4">
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold text-slate-900 dark:text-white">Total</p>
                <p className="text-lg font-bold text-green-600 dark:text-green-400">
                  {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'CDF' }).format(total)}
                </p>
              </div>
            </div>

            <GlassButton variant="secondary" className="w-full mt-6" onClick={() => setShowJournalDialog(false)}>
              Fermer
            </GlassButton>
          </GlassCard>
        </div>
      )}

      {showCloseDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <GlassCard className="p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Clôture de caisse</h2>
              <button onClick={() => setShowCloseDialog(false)} className="text-slate-500 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Montant total à clôturer:
              </p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'CDF' }).format(total)}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Raison de la clôture</label>
                <select
                  value={closeData.reason}
                  onChange={(e) => setCloseData({ ...closeData, reason: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
                >
                  <option value="">-- Sélectionner une raison --</option>
                  <option value="FIN_JOURNEE">Fin de journée</option>
                  <option value="FIN_SEMAINE">Fin de semaine</option>
                  <option value="FIN_MOIS">Fin de mois</option>
                  <option value="VERIFICATION">Vérification</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Remarques (optionnel)</label>
                <textarea
                  value={closeData.notes}
                  onChange={(e) => setCloseData({ ...closeData, notes: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
                  placeholder="Notes..."
                  rows={3}
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <GlassButton variant="primary" className="flex-1" onClick={handleCloseCash}>
                Confirmer clôture
              </GlassButton>
              <GlassButton variant="secondary" className="flex-1" onClick={() => setShowCloseDialog(false)}>
                Annuler
              </GlassButton>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  )
}