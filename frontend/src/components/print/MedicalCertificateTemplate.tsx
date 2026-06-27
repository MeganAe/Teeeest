interface MedicalCertificateTemplateProps {
  patient: { nom: string; prenom: string; numeroDossier: string; dateNaissance: string }
  doctor: { firstName: string; lastName: string }
  diagnosis: string
  duration: string
  recommendations: string
  date: Date
}

export function MedicalCertificateTemplate({ patient, doctor, diagnosis, duration, recommendations, date }: MedicalCertificateTemplateProps) {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">AMKA Medical Center</h1>
        <h2 className="text-xl mt-2">CERTIFICAT MÉDICAL</h2>
        <p className="text-sm">Kindu, Maniema - République Démocratique du Congo</p>
      </div>
      
      <div className="mb-6">
        <p>Je soussigné(e), Dr {doctor.firstName} {doctor.lastName}, certifie avoir examiné le/la patient(e) :</p>
        <p className="mt-2"><strong>{patient.nom} {patient.prenom}</strong></p>
        <p>Né(e) le <strong>{new Date(patient.dateNaissance).toLocaleDateString()}</strong></p>
        <p>Dossier médical N° <strong>{patient.numeroDossier}</strong></p>
      </div>
      
      <div className="mb-6">
        <p>et déclare que son état de santé nécessite :</p>
        <p className="mt-2"><strong>Diagnostic:</strong> {diagnosis}</p>
        <p><strong>Durée d'arrêt / Repos:</strong> {duration}</p>
        <p><strong>Recommandations:</strong> {recommendations}</p>
      </div>
      
      <div className="mt-12">
        <p>Fait à Kindu, le {date.toLocaleDateString()}</p>
        <div className="mt-8 text-center">
          <p>Signature et cachet du médecin</p>
          <p className="mt-8">_________________________</p>
        </div>
      </div>
    </div>
  )
}