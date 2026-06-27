import { useState } from 'react'
import { api } from '@/services/api'

export function useReports() {
  const [loading, setLoading] = useState(false)

  const generateReport = async (type: string, params: any) => {
    setLoading(true)
    try {
      const res = await api.get(`/reports/${type}`, { params })
      return res.data
    } finally {
      setLoading(false)
    }
  }

  const exportPDF = async (data: any) => {
    setLoading(true)
    try {
      const res = await api.post('/reports/export/pdf', data, { responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `rapport-${Date.now()}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } finally {
      setLoading(false)
    }
  }

  const exportExcel = async (data: any) => {
    setLoading(true)
    try {
      const res = await api.post('/reports/export/excel', data, { responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `rapport-${Date.now()}.xlsx`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } finally {
      setLoading(false)
    }
  }

  return { generateReport, exportPDF, exportExcel, loading }
}