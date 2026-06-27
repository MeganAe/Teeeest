import { api } from './api'

export const paymentService = {
  async getAll(params?: { page?: number; limit?: number; startDate?: string; endDate?: string }) {
    const response = await api.get('/payments', { params })
    return response.data
  },

  async getById(id: string) {
    const response = await api.get(`/payments/${id}`)
    return response.data
  },

  async create(data: any) {
    const response = await api.post('/payments', data)
    return response.data
  },

  async update(id: string, data: any) {
    const response = await api.put(`/payments/${id}`, data)
    return response.data
  },

  async delete(id: string) {
    await api.delete(`/payments/${id}`)
  },

  async getStatistics(startDate?: string, endDate?: string) {
    const response = await api.get('/payments/statistics', { params: { startDate, endDate } })
    return response.data
  },
}
