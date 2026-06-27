import { useState } from 'react'
import { Plus, Edit, Trash2, UserCheck, Shield, Search, Loader, X } from 'lucide-react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'

export default function UsersManagement() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [showNewUserDialog, setShowNewUserDialog] = useState(false)
  const [editingUser, setEditingUser] = useState<any>(null)
  const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', role: 'RECEPTIONIST' })

  const { data, isLoading, error } = useQuery({
    queryKey: ['users', page, search],
    queryFn: async () => {
      const response = await api.get('/users', {
        params: { page, limit: 10, search: search || undefined },
      })
      return response.data
    },
    staleTime: 5 * 60 * 1000,
  })

  const users = data?.users || data?.data || []
  const total = data?.total || users.length
  const totalPages = data?.totalPages || 1

  const handleAddUser = async () => {
    if (!newUser.firstName || !newUser.email) {
      alert('Veuillez remplir tous les champs requis')
      return
    }
    try {
      await api.post('/users', newUser)
      alert('Utilisateur créé avec succès')
      setShowNewUserDialog(false)
      setNewUser({ firstName: '', lastName: '', email: '', role: 'RECEPTIONIST' })
    } catch (error) {
      alert('Erreur lors de la création de l\'utilisateur')
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur?')) {
      try {
        await api.delete(`/users/${userId}`)
        alert('Utilisateur supprimé')
        window.location.reload()
      } catch (error) {
        alert('Erreur lors de la suppression')
      }
    }
  }

  const handleEditUser = (user: any) => {
    setEditingUser(user)
    setShowNewUserDialog(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Administration</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Gestion des utilisateurs et permissions</p>
        </div>
        <GlassButton variant="primary" className="flex items-center gap-2" onClick={() => setShowNewUserDialog(true)}>
          <Plus className="w-4 h-4" />
          Nouvel utilisateur
        </GlassButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Total des utilisateurs</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">{total}</p>
            </div>
            <UserCheck className="w-8 h-8 text-blue-600 opacity-50" />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Utilisateurs actifs</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
                {users.filter((u: any) => u.isActive).length}
              </p>
            </div>
            <Shield className="w-8 h-8 text-green-600 opacity-50" />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Rôles</p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">
                {new Set(users.map((u: any) => u.role)).size}
              </p>
            </div>
            <Shield className="w-8 h-8 text-purple-600 opacity-50" />
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Utilisateurs</h2>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-500"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader className="w-6 h-6 animate-spin text-blue-500" />
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-600 dark:text-red-400">
            Erreur lors du chargement des utilisateurs
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-8 text-slate-600 dark:text-slate-400">
            Aucun utilisateur trouvé
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Nom</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Rôle</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Statut</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: any) => (
                  <tr
                    key={user.id}
                    className="border-b border-slate-200 dark:border-slate-700 hover:bg-white/30 dark:hover:bg-slate-800/30"
                  >
                    <td className="py-3 px-4 text-slate-900 dark:text-white font-medium">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full">
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          user.isActive
                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                            : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                        }`}
                      >
                        {user.isActive ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <GlassButton variant="secondary" className="text-sm flex items-center gap-1" onClick={() => handleEditUser(user)}>
                          <Edit className="w-3 h-3" />
                          Éditer
                        </GlassButton>
                        <GlassButton
                          variant="secondary"
                          className="text-sm flex items-center gap-1 hover:text-red-600"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                          Supprimer
                        </GlassButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && !isLoading && (
          <div className="flex justify-center gap-2 mt-6">
            <GlassButton
              variant="secondary"
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
            >
              Précédent
            </GlassButton>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => page + i - 2).map(
              (p) =>
                p > 0 && (
                  <GlassButton
                    key={p}
                    variant={p === page ? 'primary' : 'secondary'}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </GlassButton>
                )
            )}
            <GlassButton
              variant="secondary"
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
            >
              Suivant
            </GlassButton>
          </div>
        )}
      </GlassCard>

      {showNewUserDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <GlassCard className="p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {editingUser ? 'Éditer l\'utilisateur' : 'Nouvel utilisateur'}
              </h2>
              <button onClick={() => { setShowNewUserDialog(false); setEditingUser(null); }} className="text-slate-500 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Prénom</label>
                <input
                  type="text"
                  value={newUser.firstName}
                  onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
                  placeholder="Prénom"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Nom</label>
                <input
                  type="text"
                  value={newUser.lastName}
                  onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
                  placeholder="Nom"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
                  placeholder="Email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Rôle</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
                >
                  <option value="RECEPTIONIST">Réceptionniste</option>
                  <option value="MEDECIN_DIRECTEUR">Médecin</option>
                  <option value="PHARMACIEN">Pharmacien</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <GlassButton variant="primary" className="flex-1" onClick={handleAddUser}>
                {editingUser ? 'Mettre à jour' : 'Créer'}
              </GlassButton>
              <GlassButton variant="secondary" className="flex-1" onClick={() => { setShowNewUserDialog(false); setEditingUser(null); }}>
                Annuler
              </GlassButton>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  )
}