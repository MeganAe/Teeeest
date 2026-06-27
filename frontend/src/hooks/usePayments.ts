import { useState, useEffect } from 'react'
import { api } from '@/services/api'

export function usePayments(filters?: { startDate?: string; endDate?: string; type?: string }) {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const loadPayments = async () => {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        if (filters?.startDate) params.append('startDate', filters.startDate)
        if (filters?.endDate) params.append('endDate', filters.endDate)
        if (filters?.type) params.append('type', filters.type)
        const res = await api.get(`/payments?${params.toString()}`)
        setPayments(res.data.payments)
        setTotal(res.data.totalAmount)
      } finally {
        setLoading(false)
      }
    }
    loadPayments()
  }, [filters])

  return { payments, loading, total }
}