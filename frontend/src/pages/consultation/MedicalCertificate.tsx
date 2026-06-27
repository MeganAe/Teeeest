import { useState } from 'react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { Textarea } from '@/components/ui/Textarea'
import { Printer, Download } from 'lucide-react'

interface MedicalCertificateProps {
  patient: any
  doctor: any
}

export function MedicalCertificate({ patient, doctor }: MedicalCertificateProps) {
  const [form, setForm] = useState({
    diagnosis: '',
    duration: '',
    recommendations: '',
  })

  const printCertificate = () => {
    const printWindow = window.open('', '_blank')
    printWindow?.document.write(`
      <html>
        <head>
          <title>Certificat médical - AMKA</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            .header { text-align: center; margin-bottom: 40px; }
            .content { margin-bottom: 30px; }
            .signature { margin-top: 50px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>AMKA Medical Center</h1>
            <h2>CERTIFICAT MÉDICAL</h2>
            <p>Kindu, Maniema - République Démocratique du Congo</p>
          </div>
          
          <div class="content">
            <p>Je soussigné(e), Dr ${doctor?.firstName} ${doctor?.lastName}, certifie avoir examiné le/la patient(e) :</p>
            <p><strong>${patient?.nom} ${patient?.prenom}</strong></p>
            <p>Né(e) le <strong>${new Date(patient?.dateNaissance).toLocaleDateString()}</strong></p>
            <p>Dossier médical N° <strong>${patient?.numeroDossier}</strong></p>
          </div>
          
          <div class="content">
            <p>et déclare que son état de santé nécessite :</p>
            <p><strong>Diagnostic:</strong> ${form.diagnosis}</p>
            <p><strong>Durée d'arrêt / Repos:</strong> ${form.duration}</p>
            <p><strong>Recommandations:</strong> ${form.recommendations}</p>
          </div>
          
          <div class="signature">
            <p>Fait à Kindu, le ${new Date().toLocaleDateString()}</p>
            <p style="margin-top: 50px;">Signature et cachet du médecin</p>
          </div>
        </body>
      </html>
    `)
    printWindow?.print()
  }

  return (
    <GlassCard className="p-4">
      <h3 className="text-lg font-semibold mb-4">Certificat médical</h3>
      
      <div className="space-y-4">
        <div className="p-3 rounded-lg bg-medical-primary/10">
          <p className="text-sm text-slate-500">Patient</p>
          <p className="font-medium">{patient?.nom} {patient?.prenom}</p>
          <p className="text-sm">Dossier: {patient?.numeroDossier}</p>
        </div>
        
        <GlassInput
          label="Diagnostic"
          placeholder="Diagnostic médical..."
          value={form.diagnosis}
          onChange={(e) => setForm({ ...form, diagnosis: e.target.value })}
        />
        
        <GlassInput
          label="Durée d'arrêt / Repos"
          placeholder="ex: 7 jours, Repos absolu..."
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
        />
        
        <Textarea
          label="Recommandations"
          placeholder="Recommandations médicales..."
          value={form.recommendations}
          onChange={(e) => setForm({ ...form, recommendations: e.target.value })}
          rows={3}
        />
        
        <div className="flex gap-3">
          <GlassButton onClick={printCertificate} className="flex-1">
            <Printer className="w-4 h-4 mr-2" />
            Générer
          </GlassButton>
          <GlassButton variant="secondary" className="flex-1">
            <Download className="w-4 h-4 mr-2" />
            PDF
          </GlassButton>
        </div>
      </div>
    </GlassCard>
  )
}