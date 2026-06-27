import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { api } from '@/services/api'
import { useNotificationStore } from '@/stores/notificationStore'

export function EEGResult() {
  const [exams, setExams] = useState([])
  const [selectedExam, setSelectedExam] = useState(null)
  const [loading, setLoading] = useState(false)
  const { showSuccess } = useNotificationStore()
  const { register, handleSubmit } = useForm()

  useEffect(() => {
    api.get('/exams/pending?type=EEG').then(res => setExams(res.data))
  }, [])

  const onSubmit = async (data: any) => {
    setLoading(true)
    await api.post(`/exams/${selectedExam}/result`, data)
    showSuccess('Résultat EEG enregistré')
    setSelectedExam(null)
    setLoading(false)
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
        <h3 className="font-semibold">Résultats EEG</h3>
        <Textarea label="Description de l'activité cérébrale" placeholder="Description détaillée..." {...register('description')} rows={4} />
        <Textarea label="Conclusion" placeholder="Conclusion de l'examen..." {...register('conclusion')} rows={3} />
        <Select
          label="Interprétation"
          options={[
            { value: 'NORMAL', label: 'Normal' },
            { value: 'ANORMAL', label: 'Anormal' },
            { value: 'PATHOLOGIQUE', label: 'Pathologique' },
          ]}
          {...register('interpretation')}
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