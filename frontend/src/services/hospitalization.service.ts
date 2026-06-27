import { api } from './api'

export interface Hospitalization {
  id: string
  patientId: string
  litNumber: string
  dateAdmission: string
  dateSortie?: string
  diagnostic: string
  status: 'ACTIVE' | 'DISCHARGED' | 'TRANSFERRED'
}

export interface DailyFollowup {
  id: string
  hospitalizationId: string
  date: string
  temperature?: number
  tension?: string
  poids?: number
  observations?: string
  treatment?: string
}

export const hospitalizationService = {
  async getAll(params?: { status?: string; page?: number; limit?: number }) {
    const res = await api.get('/hospitalizations', { params })
    return res.data
  },

  async getActive() {
    const res = await api.get('/hospitalizations/active')
    return res.data
  },

  async getById(id: string) {
    const res = await api.get(`/hospitalizations/${id}`)
    return res.data
  },

  async getByPatient(patientId: string) {
    const res = await api.get(`/hospitalizations/patient/${patientId}`)
    return res.data
  },

  async getBedOccupancy() {
    const res = await api.get('/hospitalizations/beds')
    return res.data
  },

  async create(data: Omit<Hospitalization, 'id'>) {
    const res = await api.post('/hospitalizations', data)
    return res.data
  },

  async update(id: string, data: Partial<Hospitalization>) {
    const res = await api.put(`/hospitalizations/${id}`, data)
    return res.data
  },

  async discharge(id: string, dischargeSummary: string) {
    const res = await api.post(`/hospitalizations/${id}/discharge`, { dischargeSummary })
    return res.data
  },

  async addDailyFollowup(id: string, data: Omit<DailyFollowup, 'id' | 'hospitalizationId' | 'date'>) {
    const res = await api.post(`/hospitalizations/${id}/daily-followup`, data)
    return res.data
  },

  async getDailyFollowups(id: string) {
    const res = await api.get(`/hospitalizations/${id}/daily-followups`)
    return res.data
  },
}