import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { api } from '@/services/api'
import { useNotificationStore } from '@/stores/notificationStore'

export function ECGResult() {
  const [exams, setExams] = useState([])
  const [selectedExam, setSelectedExam] = useState(null)
  const [loading, setLoading] = useState(false)
  const { showSuccess } = useNotificationStore()
  const { register, handleSubmit } = useForm()

  useEffect(() => {
    api.get('/exams/pending?type=ECG').then(res => setExams(res.data))
  }, [])

  const onSubmit = async (data: any) => {
    setLoading(true)
    await api.post(`/exams/${selectedExam}/result`, data)
    showSuccess('Résultat ECG enregistré')
    setSelectedExam(null)
    setLoading(false)
  }

  const interpretations = [
    { value: 'NORMAL', label: 'ECG Normal' },
    { value: 'BRADYCARDIE', label: 'Bradycardie sinusale' },
    { value: 'TACHYCARDIE', label: 'Tachycardie sinusale' },
    { value: 'FA', label: 'Fibrillation auriculaire' },
    { value: 'BBD', label: 'Bloc de branche droit' },
    { value: 'BBG', label: 'Bloc de branche gauche' },
    { value: 'HVG', label: 'Hypertrophie ventriculaire gauche' },
    { value: 'ISCHEMIE', label: 'Signes d\'ischémie' },
    { value: 'STEMI', label: 'Infarctus du myocarde' },
  ]

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
              <p className="text-sm text-slate-500">Demandé le {new Date(exam.requestedAt).toLocaleDateString()}</p>
            </button>
          ))}
        </div>
      </GlassCard>
    )
  }

  return (
    <GlassCard className="p-4 mt-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h3 className="font-semibold">Résultats ECG</h3>
        <Select label="Interprétation principale" options={interpretations} {...register('interpretation')} />
        <Textarea label="Fréquence cardiaque" placeholder="ex: 75 bpm" {...register('heartRate')} />
        <Textarea label="Rythme" placeholder="Description du rythme..." {...register('rhythm')} rows={2} />
        <Textarea label="Axe" placeholder="Axe cardiaque..." {...register('axis')} />
        <Textarea label="Intervalles" placeholder="PR, QRS, QT..." {...register('intervals')} />
        <Textarea label="Conclusion" placeholder="Conclusion médicale..." {...register('conclusion')} rows={3} />
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