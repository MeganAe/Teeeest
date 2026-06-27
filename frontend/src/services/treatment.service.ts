import { api } from './api'

export interface KineSession {
  id: string
  patientId: string
  date: string
  duration: number
  exercises?: string
  observations?: string
  status: string
}

export interface Surgery {
  id: string
  patientId: string
  type: string
  scheduledDate: string
  performedDate?: string
  description?: string
  report?: string
  status: string
}

export interface NursingCare {
  id: string
  patientId: string
  type: string
  description?: string
  products?: string
  observations?: string
  createdAt: string
}

export const treatmentService = {
  // Kinésithérapie
  async getKineSessions(params?: { patientId?: string; status?: string }) {
    const res = await api.get('/treatments/kinesitherapie', { params })
    return res.data
  },

  async getKineSessionsByPatient(patientId: string) {
    const res = await api.get(`/treatments/kinesitherapie/patient/${patientId}`)
    return res.data
  },

  async createKineSession(data: Omit<KineSession, 'id'>) {
    const res = await api.post('/treatments/kinesitherapie', data)
    return res.data
  },

  async updateKineSession(id: string, data: Partial<KineSession>) {
    const res = await api.put(`/treatments/kinesitherapie/${id}`, data)
    return res.data
  },

  // Chirurgie
  async getSurgeries(params?: { patientId?: string; status?: string }) {
    const res = await api.get('/treatments/chirurgie', { params })
    return res.data
  },

  async getSurgeriesByPatient(patientId: string) {
    const res = await api.get(`/treatments/chirurgie/patient/${patientId}`)
    return res.data
  },

  async createSurgery(data: Omit<Surgery, 'id'>) {
    const res = await api.post('/treatments/chirurgie', data)
    return res.data
  },

  async updateSurgery(id: string, data: Partial<Surgery>) {
    const res = await api.put(`/treatments/chirurgie/${id}`, data)
    return res.data
  },

  // Soins infirmiers
  async getNursingCares(params?: { patientId?: string; type?: string }) {
    const res = await api.get('/treatments/soins', { params })
    return res.data
  },

  async getNursingCaresByPatient(patientId: string) {
    const res = await api.get(`/treatments/soins/patient/${patientId}`)
    return res.data
  },

  async createNursingCare(data: Omit<NursingCare, 'id' | 'createdAt'>) {
    const res = await api.post('/treatments/soins', data)
    return res.data
  },

  async updateNursingCare(id: string, data: Partial<NursingCare>) {
    const res = await api.put(`/treatments/soins/${id}`, data)
    return res.data
  },
}