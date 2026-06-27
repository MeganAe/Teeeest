import { useState, useEffect } from 'react'
import { api } from '@/services/api'

export function usePharmacy() {
  const [medications, setMedications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMedications = async () => {
      try {
        const res = await api.get('/pharmacy/medications')
        setMedications(res.data.medications)
      } finally {
        setLoading(false)
      }
    }
    loadMedications()
  }, [])

  const sellMedication = async (data: any) => {
    const res = await api.post('/pharmacy/sales', data)
    return res.data
  }

  const updateStock = async (id: string, stock: number) => {
    await api.put(`/pharmacy/medications/${id}/stock`, { stock })
  }

  return { medications, loading, sellMedication, updateStock }
}