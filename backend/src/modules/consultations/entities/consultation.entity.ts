import { ConsultationStatus } from '@prisma/client'

export class ConsultationEntity {
  id: string
  patientId: string
  medecinId: string
  dateConsultation: Date
  motif: string
  diagnostic?: string
  tension?: string
  temperature?: number
  poids?: number
  taille?: number
  traitement?: string
  notes?: string
  status: ConsultationStatus
  createdAt: Date
  updatedAt: Date
}