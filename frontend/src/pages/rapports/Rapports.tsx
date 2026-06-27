import { useState } from 'react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { FileText, TrendingUp, Activity, Download, Loader } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'

export default function Rapports() {
  const [reportType, setReportType] = useState('FINANCIAL')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['reports'],
    queryFn: async () => {
      const response = await api.get('/reports')
      return response.data
    },
    staleTime: 5 * 60 * 1000,
  })

  const reports = data?.reports || []
  const total = data?.total || 0

  const handleGenerateReport = async () => {
    if (!startDate || !endDate) {
      alert('Veuillez sélectionner les dates')
      return
    }
    setIsGenerating(true)
    try {
      await api.post('/reports/generate', {
        type: reportType,
        startDate,
        endDate,
      })
      alert('Rapport généré avec succès')
      refetch()
      setStartDate('')
      setEndDate('')
    } catch (error) {
      alert('Erreur lors de la génération du rapport')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownloadReport = (reportId: string) => {
    alert(`Téléchargement du rapport ${reportId}...`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Rapports</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Génération et consultation des rapports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Rapports générés</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">{total}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600 opacity-50" />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Financiers</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
                {reports.filter((r: any) => r.type === 'FINANCIAL').length}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600 opacity-50" />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Médicaux</p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">
                {reports.filter((r: any) => r.type === 'MEDICAL').length}
              </p>
            </div>
            <Activity className="w-8 h-8 text-purple-600 opacity-50" />
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Générer un rapport</h2>
        <div className="space-y-4">
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
          >
            <option value="FINANCIAL">Rapport financier</option>
            <option value="MEDICAL">Rapport médical</option>
            <option value="ACTIVITY">Rapport d'activité</option>
            <option value="STOCK">Rapport de stock</option>
          </select>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Date de début</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Date de fin</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>
          <GlassButton
            className="w-full flex items-center justify-center gap-2"
            variant="primary"
            onClick={handleGenerateReport}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Génération...
              </>
            ) : (
              'Générer le rapport'
            )}
          </GlassButton>
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Rapports disponibles</h2>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader className="w-6 h-6 animate-spin text-blue-500" />
          </div>
        ) : reports.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400">Aucun rapport disponible</p>
        ) : (
          <div className="space-y-3">
            {reports.map((report: any) => (
              <div key={report.id} className="flex items-center justify-between p-4 bg-white/30 dark:bg-slate-800/30 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-slate-900 dark:text-white">{report.title}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Type: {report.type} • Généré le {new Date(report.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                  {report.dateRange && (
                    <p className="text-xs text-slate-500 dark:text-slate-500">
                      Période: {report.dateRange.start} au {report.dateRange.end}
                    </p>
                  )}
                </div>
                <GlassButton
                  variant="secondary"
                  className="flex items-center gap-2"
                  onClick={() => handleDownloadReport(report.id)}
                >
                  <Download className="w-4 h-4" />
                  Télécharger
                </GlassButton>
              </div>
            ))}
          </div>
        )}
      </GlassCard>
    </div>
  )
}
