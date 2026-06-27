export type ConsultationStatus = 'EN_ATTENTE' | 'EN_COURS' | 'TERMINE' | 'ANNULE'

export interface Consultation {
  id: string
  patientId: string
  medecinId: string
  dateConsultation: string
  motif: string
  diagnostic?: string
  tension?: string
  temperature?: number
  poids?: number
  taille?: number
  traitement?: string
  notes?: string
  status: ConsultationStatus
  createdAt: string
  updatedAt: string
}

export interface Prescription {
  id: string
  consultationId: string
  medicament: string
  dosage: string
  duree: string
  instructions?: string
  createdAt: string
}

export interface CreateConsultationDto {
  patientId: string
  motif: string
  diagnostic?: string
  tension?: string
  temperature?: number
  poids?: number
  taille?: number
  traitement?: string
  notes?: string
}

export interface CreatePrescriptionDto {
  medicament: string
  dosage: string
  duree: string
  instructions?: string
}