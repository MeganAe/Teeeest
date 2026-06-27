import { useState } from 'react'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { usePatientStore } from '@/stores/patientStore'
import { useNotificationStore } from '@/stores/notificationStore'
import { patientService } from '@/services/patient.service'

export function QuickRegistration() {
  const [form, setForm] = useState({ nom: '', prenom: '', telephone: '', typeHandicap: 'MOTEUR' })
  const [loading, setLoading] = useState(false)
  const { addPatient } = usePatientStore()
  const { showSuccess, showError } = useNotificationStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const newPatient = await patientService.create({
        ...form,
        sexe: 'M',
        dateNaissance: new Date().toISOString().split('T')[0],
      })
      addPatient(newPatient)
      showSuccess('Patient enregistré rapidement')
      setForm({ nom: '', prenom: '', telephone: '', typeHandicap: 'MOTEUR' })
    } catch (error) {
      showError('Erreur lors de l\'enregistrement')
    } finally {
      setLoading(false)
    }
  }

  return (
    <GlassCard className="p-4">
      <h3 className="font-semibold mb-3">Enregistrement rapide</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <GlassInput placeholder="Nom" value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} required />
        <GlassInput placeholder="Prénom" value={form.prenom} onChange={(e) => setForm({ ...form, prenom: e.target.value })} required />
        <GlassInput placeholder="Téléphone" value={form.telephone} onChange={(e) => setForm({ ...form, telephone: e.target.value })} />
        <select
          className="w-full h-10 rounded-md border border-white/20 bg-white/50 dark:bg-slate-900/50 px-3 text-sm"
          value={form.typeHandicap}
          onChange={(e) => setForm({ ...form, typeHandicap: e.target.value })}
        >
          <option value="MOTEUR">Moteur</option>
          <option value="VISUEL">Visuel</option>
          <option value="AUDITIF">Auditif</option>
          <option value="MENTAL">Mental</option>
          <option value="MULTIPLE">Multiple</option>
        </select>
        <GlassButton type="submit" loading={loading} className="w-full">
          Enregistrer
        </GlassButton>
      </form>
    </GlassCard>
  )
}