export class PrescriptionEntity {
  id: string
  consultationId: string
  medicament: string
  dosage: string
  duree: string
  instructions?: string
  createdAt: Date
}