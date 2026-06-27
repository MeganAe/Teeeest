import { useState, useEffect } from 'react'
import { consultationService } from '@/services/consultation.service'

export function useConsultations(patientId?: string) {
  const [consultations, setConsultations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadConsultations = async () => {
      try {
        setLoading(true)
        const data = patientId 
          ? await consultationService.getByPatient(patientId)
          : await consultationService.getAll()
        setConsultations(data.consultations || data)
      } finally {
        setLoading(false)
      }
    }
    loadConsultations()
  }, [patientId])

  return { consultations, loading }
}