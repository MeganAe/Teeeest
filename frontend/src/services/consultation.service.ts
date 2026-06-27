import { api } from './api'

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
  status: string
}

export interface Prescription {
  id: string
  consultationId: string
  medicament: string
  dosage: string
  duree: string
  instructions?: string
}

export interface CreateConsultationData {
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

export const consultationService = {
  async getAll(params?: { patientId?: string; medecinId?: string; date?: string }): Promise<Consultation[]> {
    const response = await api.get('/consultations', { params })
    return response.data
  },

  async getById(id: string): Promise<Consultation> {
    const response = await api.get(`/consultations/${id}`)
    return response.data
  },

  async create(data: CreateConsultationData): Promise<Consultation> {
    const response = await api.post('/consultations', data)
    return response.data
  },

  async update(id: string, data: Partial<CreateConsultationData>): Promise<Consultation> {
    const response = await api.put(`/consultations/${id}`, data)
    return response.data
  },

  async addPrescription(consultationId: string, data: Omit<Prescription, 'id' | 'consultationId'>): Promise<Prescription> {
    const response = await api.post(`/consultations/${consultationId}/prescriptions`, data)
    return response.data
  },

  async getPrescriptions(consultationId: string): Promise<Prescription[]> {
    const response = await api.get(`/consultations/${consultationId}/prescriptions`)
    return response.data
  },

  async getWaitingQueue(): Promise<any[]> {
    const response = await api.get('/consultations/waiting-queue')
    return response.data
  },

  async updateStatus(id: string, status: string): Promise<Consultation> {
    const response = await api.patch(`/consultations/${id}/status`, { status })
    return response.data
  },
}