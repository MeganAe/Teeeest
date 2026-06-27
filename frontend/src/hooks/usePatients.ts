import { useState, useEffect } from 'react'
import { patientService } from '@/services/patient.service'

export function usePatients(search?: string) {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadPatients = async () => {
      try {
        setLoading(true)
        const data = search 
          ? await patientService.search(search)
          : await patientService.getAll()
        setPatients(data.patients || data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadPatients()
  }, [search])

  return { patients, loading, error, refetch: () => {} }
}