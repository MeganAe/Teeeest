import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { api } from '@/services/api'
import { useNotificationStore } from '@/stores/notificationStore'
import { Printer, Download } from 'lucide-react'

export function RadiologyReport() {
  const [exams, setExams] = useState([])
  const [selectedExam, setSelectedExam] = useState(null)
  const [loading, setLoading] = useState(false)
  const { showSuccess } = useNotificationStore()
  const { register, handleSubmit } = useForm()

  useEffect(() => {
    api.get('/exams/pending?type=RADIOLOGIE').then(res => setExams(res.data))
  }, [])

  const onSubmit = async (data: any) => {
    setLoading(true)
    await api.post(`/exams/${selectedExam}/result`, data)
    showSuccess('Rapport radiologique enregistré')
    setSelectedExam(null)
    setLoading(false)
  }

  const printReport = (report: any) => {
    const printWindow = window.open('', '_blank')
    printWindow?.document.write(`
      <html>
        <head>
          <title>Rapport radiologique - AMKA</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            .header { text-align: center; margin-bottom: 30px; }
            .section { margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>AMKA Medical Center</h1>
            <h2>Rapport d'examen radiologique</h2>
          </div>
          <div class="section">
            <p><strong>Patient:</strong> ${report.patient?.nom} ${report.patient?.prenom}</p>
            <p><strong>Dossier:</strong> ${report.patient?.numeroDossier}</p>
            <p><strong>Examen:</strong> ${report.examType}</p>
            <p><strong>Date:</strong> ${new Date(report.createdAt).toLocaleString()}</p>
          </div>
          <div class="section">
            <h3>Constatations</h3>
            <p>${report.findings}</p>
          </div>
          <div class="section">
            <h3>Conclusion</h3>
            <p>${report.conclusion}</p>
          </div>
          <div class="section">
            <h3>Recommandations</h3>
            <p>${report.recommendations}</p>
          </div>
          <div class="section">
            <p><strong>Radiologue:</strong> Dr ${report.radiologue?.firstName} ${report.radiologue?.lastName}</p>
            <p><strong>Validé le:</strong> ${new Date(report.validatedAt).toLocaleString()}</p>
          </div>
        </body>
      </html>
    `)
    printWindow?.print()
  }

  if (!selectedExam) {
    return (
      <GlassCard className="p-4 mt-4">
        <h3 className="font-semibold mb-4">Sélectionner un examen</h3>
        <div className="space-y-2">
          {exams.map((exam: any) => (
            <button
              key={exam.id}
              onClick={() => setSelectedExam(exam.id)}
              className="w-full text-left p-3 rounded-lg border border-white/20 hover:bg-white/10 transition-colors"
            >
              <p className="font-medium">{exam.patient?.nom} {exam.patient?.prenom}</p>
              <p className="text-sm text-slate-500">{exam.description?.split('\n')[0]}</p>
            </button>
          ))}
        </div>
      </GlassCard>
    )
  }

  return (
    <GlassCard className="p-4 mt-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h3 className="font-semibold">Rapport radiologique</h3>
        <Textarea label="Constatations" placeholder="Description des images..." {...register('findings')} rows={6} />
        <Textarea label="Conclusion" placeholder="Conclusion diagnostique..." {...register('conclusion')} rows={3} />
        <Textarea label="Recommandations" placeholder="Recommandations..." {...register('recommendations')} rows={2} />
        <Select
          label="Qualité de l'examen"
          options={[
            { value: 'BONNE', label: 'Bonne' },
            { value: 'MOYENNE', label: 'Moyenne' },
            { value: 'MAUVAISE', label: 'Mauvaise' },
          ]}
          {...register('quality')}
        />
        <div className="flex gap-3">
          <GlassButton type="submit" loading={loading} className="flex-1">
            Enregistrer
          </GlassButton>
          <GlassButton type="button" variant="ghost" onClick={() => setSelectedExam(null)}>
            Annuler
          </GlassButton>
        </div>
      </form>
    </GlassCard>
  )
}