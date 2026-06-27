import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { api } from '@/services/api'
import { useNotificationStore } from '@/stores/notificationStore'
import { Printer } from 'lucide-react'

export function DischargeSummary() {
  const [patients, setPatients] = useState([])
  const [selectedPatient, setSelectedPatient] = useState('')
  const [loading, setLoading] = useState(false)
  const { showSuccess } = useNotificationStore()
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    api.get('/hospitalizations/active').then(res => setPatients(res.data))
  }, [])

  const onSubmit = async (data: any) => {
    setLoading(true)
    await api.post(`/hospitalizations/${selectedPatient}/discharge`, data)
    showSuccess('Patient sorti avec succès')
    reset()
    setSelectedPatient('')
    setLoading(false)
  }

  const printSummary = () => {
    const printWindow = window.open('', '_blank')
    printWindow?.document.write(`
      <html>
        <head>
          <title>Compte rendu d'hospitalisation - AMKA</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
          </style>
        </head>
        <body>
          <h1>AMKA Medical Center</h1>
          <h2>Compte rendu d'hospitalisation</h2>
          <hr />
          <p><strong>Patient:</strong> Nom Prénom</p>
          <p><strong>Date d'admission:</strong> --/--/----</p>
          <p><strong>Date de sortie:</strong> ${new Date().toLocaleDateString()}</p>
          <p><strong>Diagnostic:</strong> ...</p>
          <p><strong>Traitement reçu:</strong> ...</p>
          <p><strong>Recommandations:</strong> ...</p>
          <hr />
          <p>Signature du médecin: _________________</p>
        </body>
      </html>
    `)
    printWindow?.print()
  }

  return (
    <GlassCard className="p-4 mt-4">
      <Select
        label="Patient à sortir"
        options={patients.map((p: any) => ({ value: p.id, label: `${p.patient?.nom} ${p.patient?.prenom} - Lit ${p.litNumber}` }))}
        value={selectedPatient}
        onChange={(e) => setSelectedPatient(e.target.value)}
        className="mb-4"
      />

      {selectedPatient && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Textarea label="Résumé d'hospitalisation" placeholder="Synthèse médicale..." {...register('summary')} rows={4} />
          <Textarea label="Traitement de sortie" placeholder="Médicaments prescrits..." {...register('treatment')} rows={2} />
          <Textarea label="Recommandations" placeholder="Consignes post-hospitalisation..." {...register('recommendations')} rows={2} />
          <Textarea label="Suivi nécessaire" placeholder="Consultations de contrôle..." {...register('followup')} rows={2} />
          <div className="flex gap-3">
            <GlassButton type="submit" loading={loading} className="flex-1">
              Sortir le patient
            </GlassButton>
            <GlassButton type="button" variant="secondary" onClick={printSummary}>
              <Printer className="w-4 h-4 mr-2" />
              Imprimer
            </GlassButton>
          </div>
        </form>
      )}
    </GlassCard>
  )
}