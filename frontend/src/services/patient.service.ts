import { api } from './api'

export interface Patient {
  id: string
  numeroDossier: string
  nom: string
  postnom?: string
  prenom: string
  sexe: 'M' | 'F'
  dateNaissance: string
  telephone?: string
  adresse?: string
  contactUrgence?: string
  typeHandicap: string
  photo?: string
  createdAt: string
}

export interface CreatePatientData {
  nom: string
  postnom?: string
  prenom: string
  sexe: 'M' | 'F'
  dateNaissance: string
  telephone?: string
  adresse?: string
  contactUrgence?: string
  typeHandicap: string
  photo?: string
}

export const patientService = {
  async getAll(params?: { page?: number; limit?: number; search?: string }): Promise<{ patients: Patient[]; total: number }> {
    const response = await api.get('/patients', { params })
    return response.data
  },

  async getById(id: string): Promise<Patient> {
    const response = await api.get(`/patients/${id}`)
    return response.data
  },

  async getByNumeroDossier(numeroDossier: string): Promise<Patient> {
    const response = await api.get(`/patients/numero/${numeroDossier}`)
    return response.data
  },

  async search(query: string): Promise<Patient[]> {
    const response = await api.get('/patients/search', { params: { q: query } })
    return response.data
  },

  async create(data: CreatePatientData): Promise<Patient> {
    const response = await api.post('/patients', data)
    return response.data
  },

  async update(id: string, data: Partial<CreatePatientData>): Promise<Patient> {
    const response = await api.put(`/patients/${id}`, data)
    return response.data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/patients/${id}`)
  },

  async getHistory(id: string): Promise<any> {
    const response = await api.get(`/patients/${id}/history`)
    return response.data
  },

  async uploadPhoto(id: string, file: File): Promise<{ photoUrl: string }> {
    const formData = new FormData()
    formData.append('photo', file)
    const response = await api.post(`/patients/${id}/photo`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  },
}