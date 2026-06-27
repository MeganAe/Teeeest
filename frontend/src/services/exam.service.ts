import { api } from './api'

export const examService = {
  async getAll(params?: { type?: string; status?: string; patientId?: string }) {
    const res = await api.get('/exams', { params })
    return res.data
  },

  async getPending(type?: string) {
    const res = await api.get('/exams/pending', { params: { type } })
    return res.data
  },

  async request(data: { patientId: string; consultationId?: string; type: string; description?: string }) {
    const res = await api.post('/exams', data)
    return res.data
  },

  async submitResult(id: string, data: { result: string }, file?: File) {
    const formData = new FormData()
    formData.append('result', data.result)
    if (file) formData.append('file', file)
    const res = await api.post(`/exams/${id}/result`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return res.data
  },

  async validate(id: string) {
    const res = await api.put(`/exams/${id}/validate`)
    return res.data
  },

  async getStats(type: string, startDate?: Date, endDate?: Date) {
    const res = await api.get(`/exams/type/${type}/stats`, { params: { startDate, endDate } })
    return res.data
  },
}