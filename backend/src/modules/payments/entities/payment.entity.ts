import { PaymentStatus, PaymentMethod } from '@prisma/client'

export class PaymentEntity {
  id: string
  patientId: string
  montant: number
  type: string
  reference: string
  modePaiement: PaymentMethod
  status: PaymentStatus
  receiptNumber: string
  collectedBy: string
  createdAt: Date
}