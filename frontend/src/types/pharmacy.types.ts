export interface Medication {
  id: string
  code: string
  name: string
  description?: string
  category: string
  unit: string
  price: number
  stock: number
  threshold: number
  expiryDate?: string
  createdAt: string
  updatedAt: string
}

export interface Sale {
  id: string
  medicationId: string
  medication?: Medication
  quantity: number
  unitPrice: number
  totalPrice: number
  patientId?: string
  prescriptionId?: string
  soldBy: string
  soldAt: string
}

export interface CreateMedicationDto {
  name: string
  description?: string
  category: string
  unit: string
  price: number
  stock?: number
  threshold?: number
  expiryDate?: string
}

export interface UpdateStockDto {
  stock: number
}

export interface SellMedicationDto {
  medicationId: string
  quantity: number
  patientId?: string
  prescriptionId?: string
}