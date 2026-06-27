interface ReceiptTemplateProps {
  receipt: {
    receiptNumber: string
    createdAt: string
    patient: { nom: string; prenom: string; numeroDossier: string }
    montant: number
    type: string
    modePaiement: string
    collector: { firstName: string; lastName: string }
  }
}

export function ReceiptTemplate({ receipt }: ReceiptTemplateProps) {
  return (
    <div className="font-mono text-center p-8 max-w-sm mx-auto">
      <div className="border-b pb-4 mb-4">
        <h2 className="text-xl font-bold">AMKA Medical Center</h2>
        <p className="text-sm">Kindu, Maniema - RDC</p>
        <p className="text-sm">Tél: +243 XXX XXX XXX</p>
      </div>
      
      <div className="mb-4">
        <p className="font-bold">REÇU DE PAIEMENT</p>
        <p className="text-sm">N° {receipt.receiptNumber}</p>
      </div>
      
      <div className="text-left space-y-2 mb-4">
        <p><strong>Date:</strong> {new Date(receipt.createdAt).toLocaleString()}</p>
        <p><strong>Patient:</strong> {receipt.patient.nom} {receipt.patient.prenom}</p>
        <p><strong>Dossier:</strong> {receipt.patient.numeroDossier}</p>
        <p><strong>Montant:</strong> {receipt.montant.toLocaleString()} FC</p>
        <p><strong>Type:</strong> {receipt.type}</p>
        <p><strong>Mode:</strong> {receipt.modePaiement}</p>
        <p><strong>Perçu par:</strong> {receipt.collector.firstName} {receipt.collector.lastName}</p>
      </div>
      
      <div className="border-t pt-4 mt-4">
        <p className="text-sm">Merci pour votre confiance</p>
        <p className="text-xs mt-2">Ce reçu fait office de justificatif de paiement</p>
      </div>
    </div>
  )
}