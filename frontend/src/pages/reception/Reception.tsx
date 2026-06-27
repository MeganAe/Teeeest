import { useState } from 'react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Users, Calendar, Clock, Search, Plus, Loader, X } from 'lucide-react'
import { usePatients } from '@/hooks/usePatients'
import { patientService } from '@/services/patient.service'
import { useQuery } from '@tanstack/react-query'

export default function Reception() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [showNewPatientDialog, setShowNewPatientDialog] = useState(false)
  const [newPatient, setNewPatient] = useState({
    nom: '',
    postnom: '',
    prenom: '',
    sexe: 'M',
    dateNaissance: '',
    telephone: '',
    adresse: '',
  })

  const { data, isLoading, error } = useQuery({
    queryKey: ['patients', page, limit, search],
    queryFn: async () => {
      const result = await patientService.getAll({ page, limit, search: search || undefined })
      return result
    },
    staleTime: 5 * 60 * 1000,
  })

  const patients = data?.patients || []
  const total = data?.total || 0
  const totalPages = data?.totalPages || 1

  const handleAddPatient = async () => {
    if (!newPatient.nom || !newPatient.prenom) {
      alert('Veuillez remplir au minimum le nom et le prénom')
      return
    }
    try {
      await patientService.create(newPatient)
      alert('Patient créé avec succès')
      setShowNewPatientDialog(false)
      setNewPatient({ nom: '', postnom: '', prenom: '', sexe: 'M', dateNaissance: '', telephone: '', adresse: '' })
      window.location.reload()
    } catch (error) {
      alert('Erreur lors de la création du patient')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Réception</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">Gestion des patients et rendez-vous</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Total des patients</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">{total}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600 opacity-50" />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Page actuelle</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{page}/{totalPages}</p>
            </div>
            <Calendar className="w-8 h-8 text-green-600 opacity-50" />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Patients affichés</p>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 mt-2">{patients.length}</p>
            </div>
            <Clock className="w-8 h-8 text-orange-600 opacity-50" />
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Rechercher un patient</h2>
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Nom, prénom, numéro de dossier..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              className="w-full pl-10 pr-4 py-2 bg-white/30 dark:bg-slate-800/30 border border-white/20 dark:border-slate-700/20 rounded-lg text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <GlassButton variant="primary" className="flex items-center gap-2" onClick={() => setShowNewPatientDialog(true)}>
            <Plus className="w-4 h-4" />
            Nouveau patient
          </GlassButton>
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Liste des patients</h2>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader className="w-6 h-6 animate-spin text-blue-500" />
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-600 dark:text-red-400">
            Erreur lors du chargement des patients
          </div>
        ) : patients.length === 0 ? (
          <div className="text-center py-8 text-slate-600 dark:text-slate-400">
            Aucun patient trouvé
          </div>
        ) : (
          <div className="space-y-3">
            {patients.map((patient: any) => (
              <div
                key={patient.id}
                className="flex items-center justify-between p-4 bg-white/30 dark:bg-slate-800/30 rounded-lg hover:bg-white/40 dark:hover:bg-slate-800/40 transition"
              >
                <div className="flex-1">
                  <p className="font-medium text-slate-900 dark:text-white">
                    {patient.nom} {patient.postnom} {patient.prenom}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    N° Dossier: {patient.numeroDossier} • {patient.sexe === 'M' ? 'Homme' : 'Femme'} •{' '}
                    {new Date(patient.dateNaissance).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <GlassButton variant="secondary" className="text-sm">
                    Dossier
                  </GlassButton>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            <GlassButton
              variant="secondary"
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
            >
              Précédent
            </GlassButton>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <GlassButton
                key={p}
                variant={p === page ? 'primary' : 'secondary'}
                onClick={() => setPage(p)}
              >
                {p}
              </GlassButton>
            ))}
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

      {showNewPatientDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <GlassCard className="p-8 max-w-md w-full max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Nouveau patient</h2>
              <button onClick={() => setShowNewPatientDialog(false)} className="text-slate-500 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nom</label>
                <input
                  type="text"
                  value={newPatient.nom}
                  onChange={(e) => setNewPatient({ ...newPatient, nom: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Postnom</label>
                <input
                  type="text"
                  value={newPatient.postnom}
                  onChange={(e) => setNewPatient({ ...newPatient, postnom: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Prénom</label>
                <input
                  type="text"
                  value={newPatient.prenom}
                  onChange={(e) => setNewPatient({ ...newPatient, prenom: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Sexe</label>
                <select
                  value={newPatient.sexe}
                  onChange={(e) => setNewPatient({ ...newPatient, sexe: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-white"
                >
                  <option value="M">Homme</option>
                  <option value="F">Femme</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date de naissance</label>
                <input
                  type="date"
                  value={newPatient.dateNaissance}
                  onChange={(e) => setNewPatient({ ...newPatient, dateNaissance: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Téléphone</label>
                <input
                  type="text"
                  value={newPatient.telephone}
                  onChange={(e) => setNewPatient({ ...newPatient, telephone: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Adresse</label>
                <input
                  type="text"
                  value={newPatient.adresse}
                  onChange={(e) => setNewPatient({ ...newPatient, adresse: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <GlassButton variant="primary" className="flex-1 text-sm" onClick={handleAddPatient}>
                Créer
              </GlassButton>
              <GlassButton variant="secondary" className="flex-1 text-sm" onClick={() => setShowNewPatientDialog(false)}>
                Annuler
              </GlassButton>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  )
}