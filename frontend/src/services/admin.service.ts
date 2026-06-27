import { api } from './api'

export const adminService = {
  async getAuditLogs(params?: { entity?: string; action?: string; startDate?: string; endDate?: string }) {
    const res = await api.get('/audit', { params })
    return res.data
  },

  async getSystemHealth() {
    const res = await api.get('/admin/health')
    return res.data
  },

  async getBackups() {
    const res = await api.get('/admin/backups')
    return res.data
  },

  async createBackup() {
    const res = await api.post('/admin/backups')
    return res.data
  },

  async restoreBackup(backupId: string) {
    const res = await api.post(`/admin/backups/${backupId}/restore`)
    return res.data
  },

  async getSettings() {
    const res = await api.get('/admin/settings')
    return res.data
  },

  async updateSettings(settings: any) {
    const res = await api.put('/admin/settings', settings)
    return res.data
  },
}