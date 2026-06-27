import { api } from './api'

export const reportService = {
  async getFinancialReport(startDate: Date, endDate: Date) {
    const res = await api.get('/reports/financial', { params: { startDate, endDate } })
    return res.data
  },

  async getMedicalReport(startDate: Date, endDate: Date) {
    const res = await api.get('/reports/medical', { params: { startDate, endDate } })
    return res.data
  },

  async getActivityReport(startDate: Date, endDate: Date) {
    const res = await api.get('/reports/activity', { params: { startDate, endDate } })
    return res.data
  },

  async getPharmacyReport(startDate: Date, endDate: Date) {
    const res = await api.get('/reports/pharmacy', { params: { startDate, endDate } })
    return res.data
  },

  async exportToPDF(data: any) {
    const res = await api.post('/reports/export/pdf', data, { responseType: 'blob' })
    return res.data
  },

  async exportToExcel(data: any) {
    const res = await api.post('/reports/export/excel', data, { responseType: 'blob' })
    return res.data
  },
}