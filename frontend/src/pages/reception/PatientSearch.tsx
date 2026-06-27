import { useState, useEffect } from 'react'
import { Search, User, ChevronRight } from 'lucide-react'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { useDebounce } from '@/hooks/useDebounce'
import { patientService } from '@/services/patient.service'
import { usePatientStore } from '@/stores/patientStore'

export function PatientSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const debouncedSearch = useDebounce(searchTerm, 500)
  const { selectPatient } = usePatientStore()

  useEffect(() => {
    if (debouncedSearch.length > 2) {
      setLoading(true)
      patientService.search(debouncedSearch).then(data => {
        setResults(data)
        setLoading(false)
      })
    } else {
      setResults([])
    }
  }, [debouncedSearch])

  return (
    <div className="space-y-4">
      <GlassInput
        placeholder="Rechercher par nom, prénom ou numéro de dossier..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        icon={<Search className="h-4 w-4" />}
      />
      
      {loading && <div className="text-center py-4">Recherche en cours...</div>}
      
      {results.length > 0 && (
        <GlassCard className="p-2">
          {results.map((patient: any) => (
            <button
              key={patient.id}
              onClick={() => selectPatient(patient)}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-medical-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-medical-primary" />
                </div>
                <div className="text-left">
                  <p className="font-medium">{patient.nom} {patient.prenom}</p>
                  <p className="text-sm text-slate-500">Dossier: {patient.numeroDossier}</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          ))}
        </GlassCard>
      )}
    </div>
  )
}