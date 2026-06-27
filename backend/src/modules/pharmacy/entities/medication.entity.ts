export class MedicationEntity {
  id: string
  code: string
  name: string
  description?: string
  category: string
  unit: string
  price: number
  stock: number
  threshold: number
  expiryDate?: Date
  createdAt: Date
  updatedAt: Date
}