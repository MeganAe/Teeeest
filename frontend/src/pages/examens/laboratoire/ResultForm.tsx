import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { api } from '@/services/api'
import { useNotificationStore } from '@/stores/notificationStore'

interface ResultFormProps {
  type: string
  onSuccess: () => void
}

export function ResultForm({ type, onSuccess }: ResultFormProps) {
  const [exams, setExams] = useState([])
  const [selectedExam, setSelectedExam] = useState(null)
  const [loading, setLoading] = useState(false)
  const { showSuccess } = useNotificationStore()
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    api.get(`/exams/pending?type=${type}`).then(res => setExams(res.data))
  }, [type])

  const onSubmit = async (data: any) => {
    setLoading(true)
    await api.post(`/exams/${selectedExam}/result`, data)
    showSuccess('Résultat enregistré')
    reset()
    setSelectedExam(null)
    onSuccess()
    setLoading(false)
  }

  return (
    <GlassCard className="p-4 mt-4">
      {!selectedExam ? (
        <div className="space-y-4">
          <h3 className="font-semibold">Sélectionner un examen</h3>
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
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h3 className="font-semibold">Saisie des résultats</h3>
          <Textarea label="Résultats" placeholder="Saisir les résultats d'analyse..." {...register('result', { required: true })} rows={6} />
          <div className="flex gap-3">
            <GlassButton type="submit" loading={loading} className="flex-1">
              Enregistrer
            </GlassButton>
            <GlassButton type="button" variant="ghost" onClick={() => setSelectedExam(null)}>
              Annuler
            </GlassButton>
          </div>
        </form>
      )}
    </GlassCard>
  )
}