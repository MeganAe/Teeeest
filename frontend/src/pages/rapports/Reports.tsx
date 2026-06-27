import { useState } from 'react'
import { FileText, TrendingUp, Activity, Pill, Download, Printer } from 'lucide-react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { useReports } from '@/hooks/useReports'
import { useNotificationStore } from '@/stores/notificationStore'

export default function Reports() {
  const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0])
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0])
  const [reportType, setReportType] = useState('financial')
  const [reportData, setReportData] = useState(null)
  const { generateReport, exportPDF, exportExcel, loading } = useReports()
  const { showSuccess, showError } = useNotificationStore()

  const generate = async () => {
    try {
      const data = await generateReport(reportType, { startDate, endDate })
      setReportData(data)
      showSuccess('Rapport généré avec succès')
    } catch (error) {
      showError('Erreur lors de la génération du rapport')
    }
  }

  const handleExportPDF = async () => {
    if (reportData) {
      await exportPDF(reportData)
    }
  }

  const handleExportExcel = async () => {
    if (reportData) {
      await exportExcel(reportData)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
            Rapports
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Génération et export des rapports
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="p-4 lg:col-span-1">
          <h3 className="font-semibold mb-4">Filtres</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Type de rapport</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'financial', label: 'Financier', icon: TrendingUp },
                  { value: 'medical', label: 'Médical', icon: Activity },
                  { value: 'pharmacy', label: 'Pharmacie', icon: Pill },
                ].map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setReportType(type.value)}
                    className={`p-3 rounded-xl border transition-all ${
                      reportType === type.value
                        ? 'border-medical-primary bg-medical-primary/10 text-medical-primary'
                        : 'border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <type.icon className="h-5 w-5 mx-auto mb-2" />
                    <span className="text-sm">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <GlassInput label="Date début" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <GlassInput label="Date fin" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            <GlassButton onClick={generate} loading={loading} className="w-full">
              Générer le rapport
            </GlassButton>
          </div>
        </GlassCard>

        <GlassCard className="p-4 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Aperçu du rapport</h3>
            {reportData && (
              <div className="flex gap-2">
                <GlassButton size="sm" variant="ghost" onClick={handleExportPDF}>
                  <Printer className="h-4 w-4 mr-2" />
                  PDF
                </GlassButton>
                <GlassButton size="sm" variant="ghost" onClick={handleExportExcel}>
                  <Download className="h-4 w-4 mr-2" />
                  Excel
                </GlassButton>
              </div>
            )}
          </div>
          
          {reportData ? (
            <div className="space-y-4 max-h-[500px] overflow-auto">
              <div className="text-center border-b border-white/20 pb-4">
                <h2 className="text-xl font-bold">AMKA Medical Center</h2>
                <p className="text-sm text-slate-500">Période: {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}</p>
              </div>
              
              {reportData.summary && (
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(reportData.summary).map(([key, value]) => (
                    <div key={key} className="p-3 rounded-lg bg-white/10">
                      <p className="text-sm text-slate-500">{key}</p>
                      <p className="text-lg font-bold">{(value as number).toLocaleString()} FC</p>
                    </div>
                  ))}
                </div>
              )}
              
              {reportData.breakdown && (
                <div>
                  <h4 className="font-medium mb-2">Détail par type</h4>
                  <div className="space-y-2">
                    {Object.entries(reportData.breakdown.byType).map(([type, amount]) => (
                      <div key={type} className="flex justify-between p-2 border-b border-white/10">
                        <span>{type}</span>
                        <span className="font-bold">{(amount as number).toLocaleString()} FC</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
              <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Sélectionnez les filtres et générez un rapport</p>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  )
}