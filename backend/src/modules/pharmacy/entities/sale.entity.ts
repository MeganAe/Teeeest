export class SaleEntity {
  id: string
  medicationId: string
  quantity: number
  unitPrice: number
  totalPrice: number
  patientId?: string
  prescriptionId?: string
  soldBy: string
  soldAt: Date
}