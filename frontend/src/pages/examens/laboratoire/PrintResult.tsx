import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Printer, Download } from 'lucide-react'

interface PrintResultProps {
  result: any
}

export function PrintResult({ result }: PrintResultProps) {
  const printResult = () => {
    const printWindow = window.open('', '_blank')
    printWindow?.document.write(`
      <html>
        <head>
          <title>Résultat d'analyse - AMKA</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .info { margin-bottom: 20px; }
            .result-box { border: 1px solid #ccc; padding: 15px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>AMKA Medical Center</h1>
            <h2>Résultat d'analyse de laboratoire</h2>
          </div>
          <div class="info">
            <p><strong>Patient:</strong> ${result.examRequest?.patient?.nom} ${result.examRequest?.patient?.prenom}</p>
            <p><strong>Dossier:</strong> ${result.examRequest?.patient?.numeroDossier}</p>
            <p><strong>Date:</strong> ${new Date(result.validatedAt).toLocaleString()}</p>
          </div>
          <div class="result-box">
            ${result.result}
          </div>
          <div>
            <p>Technicien: ${result.technician?.firstName} ${result.technician?.lastName}</p>
            <p>Validé le: ${new Date(result.validatedAt).toLocaleString()}</p>
          </div>
        </body>
      </html>
    `)
    printWindow?.print()
  }

  return (
    <GlassCard className="p-4">
      <div className="prose max-w-none">
        <h3>Résultat d'analyse</h3>
        <div className="whitespace-pre-wrap">{result.result}</div>
      </div>
      <div className="flex gap-3 mt-4">
        <GlassButton onClick={printResult} variant="secondary" className="flex-1">
          <Printer className="w-4 h-4 mr-2" />
          Imprimer
        </GlassButton>
        <GlassButton variant="outline" className="flex-1">
          <Download className="w-4 h-4 mr-2" />
          PDF
        </GlassButton>
      </div>
    </GlassCard>
  )
}