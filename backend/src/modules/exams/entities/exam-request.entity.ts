export class ExamRequestEntity {
  id: string
  patientId: string
  consultationId?: string
  type: string
  description?: string
  status: string
  requestedBy: string
  requestedAt: Date
}