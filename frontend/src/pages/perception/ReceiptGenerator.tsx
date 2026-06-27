import { useState } from 'react'
import { Printer, Download, Receipt } from 'lucide-react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { api } from '@/services/api'

export function ReceiptGenerator() {
  const [receiptNumber, setReceiptNumber] = useState('')
  const [receipt, setReceipt] = useState(null)

  const searchReceipt = async () => {
    const res = await api.get(`/payments/receipt/${receiptNumber}`)
    setReceipt(res.data)
  }

  const printReceipt = () => {
    const printWindow = window.open('', '_blank')
    printWindow?.document.write(`
      <html>
        <head><title>Reçu AMKA</title></head>
        <body>
          <div style="font-family: monospace; padding: 20px;">
            <h2>AMKA Medical Center</h2>
            <p>Reçu N°: ${receipt.receiptNumber}</p>
            <p>Date: ${new Date(receipt.createdAt).toLocaleDateString()}</p>
            <p>Patient: ${receipt.patient?.nom} ${receipt.patient?.prenom}</p>
            <p>Montant: ${receipt.montant.toLocaleString()} FC</p>
            <p>Mode: ${receipt.modePaiement}</p>
            <hr />
            <p>Merci de votre confiance</p>
          </div>
        </body>
      </html>
    `)
    printWindow?.print()
  }

  return (
    <GlassCard className="p-4">
      <div className="flex gap-3 mb-4">
        <GlassInput
          placeholder="Numéro de reçu"
          value={receiptNumber}
          onChange={(e) => setReceiptNumber(e.target.value)}
          className="flex-1"
        />
        <GlassButton onClick={searchReceipt}>
          <Receipt className="w-4 h-4 mr-2" />
          Rechercher
        </GlassButton>
      </div>
      
      {receipt && (
        <div className="border-t border-white/20 pt-4">
          <div className="text-center mb-4">
            <h3 className="font-bold">AMKA Medical Center</h3>
            <p className="text-sm">Kindu, Maniema - RDC</p>
          </div>
          <div className="space-y-2 text-sm">
            <p><strong>Reçu N°:</strong> {receipt.receiptNumber}</p>
            <p><strong>Date:</strong> {new Date(receipt.createdAt).toLocaleString()}</p>
            <p><strong>Patient:</strong> {receipt.patient?.nom} {receipt.patient?.prenom}</p>
            <p><strong>Dossier:</strong> {receipt.patient?.numeroDossier}</p>
            <p><strong>Montant:</strong> {receipt.montant.toLocaleString()} FC</p>
            <p><strong>Type:</strong> {receipt.type}</p>
            <p><strong>Mode:</strong> {receipt.modePaiement}</p>
            <p><strong>Perçu par:</strong> {receipt.collector?.firstName} {receipt.collector?.lastName}</p>
          </div>
          <div className="flex gap-3 mt-4">
            <GlassButton onClick={printReceipt} variant="secondary" className="flex-1">
              <Printer className="w-4 h-4 mr-2" />
              Imprimer
            </GlassButton>
            <GlassButton variant="outline" className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              PDF
            </GlassButton>
          </div>
        </div>
      )}
    </GlassCard>
  )
}