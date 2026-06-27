import { useState } from 'react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Printer, Download, FileText, Calendar } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'

export default function Impression() {
  const [documentType, setDocumentType] = useState('DOSSIER_PATIENT')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [patientId, setPatientId] = useState('')

  const { data: printHistory } = useQuery({
    queryKey: ['impressions'],
    queryFn: async () => {
      try {
        const response = await api.get('/impressions')
        return response.data
      } catch {
        return { impressions: [], total: 0 }
      }
    },
    staleTime: 5 * 60 * 1000,
  })

  const impressions = printHistory?.impressions || [
    {
      id: '1',
      type: 'DOSSIER_PATIENT',
      documentName: 'Dossier Patient - Tshimanga',
      date: new Date().toISOString(),
      pages: 5,
      user: 'Admin User',
    },
    {
      id: '2',
      type: 'ORDONNANCE',
      documentName: 'Ordonnance Médicale - Mwepu',
      date: new Date(Date.now() - 86400000).toISOString(),
      pages: 1,
      user: 'Dr. Médecin',
    },
    {
      id: '3',
      type: 'RAPPORT_MEDICAL',
      documentName: 'Rapport Médical - Kalunga',
      date: new Date(Date.now() - 172800000).toISOString(),
      pages: 8,
      user: 'Dr. Médecin',
    },
  ]

  const handlePrint = () => {
    if (!documentType) {
      alert('Veuillez sélectionner un type de document')
      return
    }
    if (documentType === 'DOSSIER_PATIENT' && !patientId) {
      alert('Veuillez sélectionner un patient')
      return
    }
    alert(`📄 Impression lancée: ${documentType}`)
    window.print()
  }

  const handleDownload = (id: string) => {
    alert(`📥 Téléchargement du document ${id}...`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Impression</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Gestion des impressions et téléchargements de documents</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Total d'impressions</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                {impressions.length}
              </p>
            </div>
            <Printer className="w-8 h-8 text-blue-600 opacity-50" />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Pages imprimées</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
                {impressions.reduce((sum, imp) => sum + (imp.pages || 0), 0)}
              </p>
            </div>
            <FileText className="w-8 h-8 text-green-600 opacity-50" />
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Nouvelle impression</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">Type de document</label>
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            >
              <option value="DOSSIER_PATIENT">Dossier Patient Complet</option>
              <option value="ORDONNANCE">Ordonnance Médicale</option>
              <option value="DIAGNOSTIC">Diagnostic et Examens</option>
              <option value="RAPPORT_MEDICAL">Rapport Médical</option>
              <option value="FACTURE">Facture</option>
              <option value="RECU_PAIEMENT">Reçu de Paiement</option>
            </select>
          </div>

          {documentType === 'DOSSIER_PATIENT' && (
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">Patient</label>
              <input
                type="text"
                placeholder="ID ou nom du patient..."
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-500"
              />
            </div>
          )}

          {(documentType === 'RAPPORT_MEDICAL' || documentType === 'DIAGNOSTIC') && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">Date début</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">Date fin</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <GlassButton variant="primary" className="flex-1 flex items-center justify-center gap-2" onClick={handlePrint}>
              <Printer className="w-4 h-4" />
              Imprimer
            </GlassButton>
            <GlassButton variant="secondary" className="flex-1 flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              PDF
            </GlassButton>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Historique des impressions</h2>
        <div className="space-y-3">
          {impressions.length === 0 ? (
            <p className="text-center py-8 text-slate-600 dark:text-slate-400">Aucune impression</p>
          ) : (
            impressions.map((impression) => (
              <div
                key={impression.id}
                className="flex items-center justify-between p-4 bg-white/30 dark:bg-slate-800/30 rounded-lg hover:bg-white/40 dark:hover:bg-slate-800/40 transition"
              >
                <div className="flex-1">
                  <p className="font-medium text-slate-900 dark:text-white">{impression.documentName}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(impression.date).toLocaleDateString('fr-FR')} • {impression.pages} pages • Par {impression.user}
                  </p>
                </div>
                <div className="flex gap-2">
                  <GlassButton
                    variant="secondary"
                    size="sm"
                    onClick={() => handleDownload(impression.id)}
                  >
                    Télécharger
                  </GlassButton>
                </div>
              </div>
            ))
          )}
        </div>
      </GlassCard>
    </div>
  )
}
