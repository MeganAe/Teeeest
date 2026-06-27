import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Printer, Download } from 'lucide-react'

interface ConsultationReportProps {
  consultation: any
}

export function ConsultationReport({ consultation }: ConsultationReportProps) {
  const printReport = () => {
    const printWindow = window.open('', '_blank')
    printWindow?.document.write(`
      <html>
        <head>
          <title>Compte rendu consultation - AMKA</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .section { margin-bottom: 20px; }
            .section-title { font-weight: bold; border-bottom: 1px solid #ccc; margin-bottom: 10px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>AMKA Medical Center</h1>
            <h2>Compte rendu de consultation médicale</h2>
            <p>Kindu, Maniema - République Démocratique du Congo</p>
          </div>
          
          <div class="section">
            <div class="section-title">Informations patient</div>
            <p><strong>Nom:</strong> ${consultation.patient?.nom} ${consultation.patient?.prenom}</p>
            <p><strong>Numéro dossier:</strong> ${consultation.patient?.numeroDossier}</p>
            <p><strong>Date naissance:</strong> ${new Date(consultation.patient?.dateNaissance).toLocaleDateString()}</p>
          </div>
          
          <div class="section">
            <div class="section-title">Consultation</div>
            <p><strong>Date:</strong> ${new Date(consultation.dateConsultation).toLocaleString()}</p>
            <p><strong>Médecin:</strong> ${consultation.medecin?.firstName} ${consultation.medecin?.lastName}</p>
            <p><strong>Motif:</strong> ${consultation.motif}</p>
          </div>
          
          <div class="section">
            <div class="section-title">Constantes vitales</div>
            <p><strong>Tension:</strong> ${consultation.tension || 'N/A'}</p>
            <p><strong>Température:</strong> ${consultation.temperature || 'N/A'} °C</p>
            <p><strong>Poids:</strong> ${consultation.poids || 'N/A'} kg</p>
            <p><strong>Taille:</strong> ${consultation.taille || 'N/A'} cm</p>
          </div>
          
          <div class="section">
            <div class="section-title">Diagnostic</div>
            <p>${consultation.diagnostic || 'Non renseigné'}</p>
          </div>
          
          <div class="section">
            <div class="section-title">Traitement prescrit</div>
            <p>${consultation.traitement || 'Non renseigné'}</p>
          </div>
          
          <div class="section">
            <div class="section-title">Prescriptions médicamenteuses</div>
            ${consultation.prescriptions?.map((p: any) => `
              <div style="margin-bottom: 10px;">
                <strong>${p.medicament}</strong> - ${p.dosage} - ${p.duree}
                ${p.instructions ? `<br/><em>${p.instructions}</em>` : ''}
              </div>
            `).join('') || '<p>Aucune prescription</p>'}
          </div>
          
          <div class="section">
            <div class="section-title">Notes complémentaires</div>
            <p>${consultation.notes || 'Aucune note'}</p>
          </div>
          
          <div style="margin-top: 50px; text-align: center;">
            <p>Signature du médecin: _________________</p>
            <p>Cachet du centre: _________________</p>
          </div>
        </body>
      </html>
    `)
    printWindow?.print()
  }

  return (
    <GlassCard className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Compte rendu de consultation</h3>
        <div className="flex gap-2">
          <GlassButton size="sm" variant="ghost" onClick={printReport}>
            <Printer className="w-4 h-4 mr-2" />
            Imprimer
          </GlassButton>
          <GlassButton size="sm" variant="ghost">
            <Download className="w-4 h-4 mr-2" />
            PDF
          </GlassButton>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm text-slate-500">Patient</p>
          <p className="font-medium">{consultation.patient?.nom} {consultation.patient?.prenom}</p>
          <p className="text-sm">Dossier: {consultation.patient?.numeroDossier}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-500">Date</p>
            <p>{new Date(consultation.dateConsultation).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Médecin</p>
            <p>Dr {consultation.medecin?.firstName} {consultation.medecin?.lastName}</p>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-slate-500">Motif</p>
          <p>{consultation.motif}</p>
        </div>
        
        {consultation.diagnostic && (
          <div>
            <p className="text-sm text-slate-500">Diagnostic</p>
            <p>{consultation.diagnostic}</p>
          </div>
        )}
        
        {consultation.traitement && (
          <div>
            <p className="text-sm text-slate-500">Traitement</p>
            <p>{consultation.traitement}</p>
          </div>
        )}
        
        {consultation.prescriptions?.length > 0 && (
          <div>
            <p className="text-sm text-slate-500">Prescriptions</p>
            <ul className="list-disc list-inside">
              {consultation.prescriptions.map((p: any) => (
                <li key={p.id}>{p.medicament} - {p.dosage} ({p.duree})</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </GlassCard>
  )
}