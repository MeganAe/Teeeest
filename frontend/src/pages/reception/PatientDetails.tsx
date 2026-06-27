import { usePatientStore } from '@/stores/patientStore'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Phone, MapPin, Calendar, FileText, Activity } from 'lucide-react'

export function PatientDetails() {
  const { selectedPatient } = usePatientStore()

  if (!selectedPatient) {
    return (
      <GlassCard className="p-6 text-center text-slate-500">
        Sélectionnez un patient pour voir ses détails
      </GlassCard>
    )
  }

  return (
    <GlassCard className="p-6">
      <div className="flex items-start gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={selectedPatient.photo} />
          <AvatarFallback className="text-2xl bg-medical-primary/20 text-medical-primary">
            {selectedPatient.nom?.charAt(0)}{selectedPatient.prenom?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h2 className="text-xl font-bold">{selectedPatient.nom} {selectedPatient.prenom}</h2>
          <p className="text-sm text-slate-500">Dossier: {selectedPatient.numeroDossier}</p>
          <div className="flex flex-wrap gap-4 mt-3">
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-slate-400" />
              <span>{selectedPatient.telephone || 'Non renseigné'}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>{selectedPatient.adresse || 'Non renseignée'}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{new Date(selectedPatient.dateNaissance).toLocaleDateString('fr-FR')}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Activity className="w-4 h-4 text-slate-400" />
              <span>{selectedPatient.typeHandicap}</span>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}