import { useState, useEffect } from 'react'
import { api } from '@/services/api'

export function useDashboardStats() {
  const [stats, setStats] = useState({
    patientsJour: 0,
    consultationsJour: 0,
    recettesJour: 0,
    examensRealises: 0,
    hospitalisations: 0,
    ventesPharmacie: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/dashboard/stats')
        setStats(response.data)
      } catch (error) {
        console.error('Erreur lors du chargement des stats:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  return { stats, loading }
}