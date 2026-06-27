import { useState } from 'react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { TrendingUp, BarChart3, DollarSign, Plus, X, Loader } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'

export default function Comptabilite() {
  const [showNewAccountingDialog, setShowNewAccountingDialog] = useState(false)
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    amount: '',
    type: 'EXPENSE',
    category: '',
  })

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['accounting'],
    queryFn: async () => {
      const response = await api.get('/accounting')
      return response.data
    },
    staleTime: 5 * 60 * 1000,
  })

  const transactions = data?.transactions || []
  const revenue = data?.revenue || 0
  const expenses = data?.expenses || 0
  const balance = revenue - expenses

  const handleAddTransaction = async () => {
    if (!newTransaction.description || !newTransaction.amount || !newTransaction.category) {
      alert('Veuillez remplir tous les champs')
      return
    }
    try {
      await api.post('/accounting', newTransaction)
      alert('Transaction enregistrée avec succès')
      setShowNewAccountingDialog(false)
      setNewTransaction({ description: '', amount: '', type: 'EXPENSE', category: '' })
      refetch()
    } catch (error) {
      alert('Erreur lors de l\'enregistrement de la transaction')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Comptabilité</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Gestion financière et rapports comptables</p>
        </div>
        <GlassButton variant="primary" className="flex items-center gap-2" onClick={() => setShowNewAccountingDialog(true)}>
          <Plus className="w-4 h-4" />
          Nouvelle transaction
        </GlassButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Revenus totaux</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'CDF' }).format(revenue)}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600 opacity-50" />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Dépenses totales</p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">
                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'CDF' }).format(expenses)}
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-red-600 opacity-50" />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Bilan net</p>
              <p className={`text-3xl font-bold ${balance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'} mt-2`}>
                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'CDF' }).format(balance)}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-600 opacity-50" />
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Transactions récentes</h2>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader className="w-6 h-6 animate-spin text-blue-500" />
          </div>
        ) : transactions.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400">Aucune transaction trouvée</p>
        ) : (
          <div className="space-y-3">
            {transactions.map((transaction: any) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-white/20 dark:bg-slate-800/20 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-slate-900 dark:text-white">{transaction.description}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{transaction.category}</p>
                </div>
                <div className="text-right">
                  <p
                    className={`text-lg font-bold ${
                      transaction.type === 'INCOME'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {transaction.type === 'INCOME' ? '+' : '-'}
                    {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'CDF' }).format(transaction.amount)}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-500">
                    {new Date(transaction.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </GlassCard>

      {showNewAccountingDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <GlassCard className="p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Nouvelle transaction</h2>
              <button onClick={() => setShowNewAccountingDialog(false)} className="text-slate-500 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Type</label>
                <select
                  value={newTransaction.type}
                  onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
                >
                  <option value="EXPENSE">Dépense</option>
                  <option value="INCOME">Revenu</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Description</label>
                <input
                  type="text"
                  value={newTransaction.description}
                  onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
                  placeholder="Description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Catégorie</label>
                <input
                  type="text"
                  value={newTransaction.category}
                  onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
                  placeholder="Ex: Salaires, Fournitures"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Montant (CDF)</label>
                <input
                  type="number"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
                  placeholder="Montant"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <GlassButton variant="primary" className="flex-1" onClick={handleAddTransaction}>
                Créer
              </GlassButton>
              <GlassButton variant="secondary" className="flex-1" onClick={() => setShowNewAccountingDialog(false)}>
                Annuler
              </GlassButton>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  )
}
