import * as PDFDocument from 'pdfkit'

export class PDFUtil {
  static async generateReceipt(data: any): Promise<Buffer> {
    return new Promise((resolve) => {
      const chunks: Buffer[] = []
      const doc = new PDFDocument({ margin: 50 })
      doc.on('data', chunks.push.bind(chunks))
      doc.on('end', () => resolve(Buffer.concat(chunks)))

      doc.fontSize(18).text('AMKA Medical Center', { align: 'center' })
      doc.fontSize(12).text('Reçu de paiement', { align: 'center' })
      doc.moveDown()
      doc.text(`Numéro: ${data.receiptNumber}`)
      doc.text(`Date: ${new Date(data.date).toLocaleDateString()}`)
      doc.text(`Patient: ${data.patientName}`)
      doc.text(`Montant: ${data.amount} FC`)
      doc.text(`Mode: ${data.method}`)
      doc.moveDown()
      doc.text('Merci pour votre confiance', { align: 'center' })
      doc.end()
    })
  }
}