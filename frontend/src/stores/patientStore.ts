import { create } from 'zustand'

interface Patient {
  id: string
  numeroDossier: string
  nom: string
  postnom: string
  prenom: string
  sexe: 'M' | 'F'
  dateNaissance: string
  telephone: string
  adresse: string
  typeHandicap: string
  photo?: string
}

interface PatientState {
  patients: Patient[]
  selectedPatient: Patient | null
  isLoading: boolean
  setPatients: (patients: Patient[]) => void
  addPatient: (patient: Patient) => void
  updatePatient: (id: string, patient: Partial<Patient>) => void
  selectPatient: (patient: Patient | null) => void
  setLoading: (loading: boolean) => void
}

export const usePatientStore = create<PatientState>((set) => ({
  patients: [],
  selectedPatient: null,
  isLoading: false,
  setPatients: (patients) => set({ patients }),
  addPatient: (patient) => set((state) => ({ patients: [...state.patients, patient] })),
  updatePatient: (id, patientData) =>
    set((state) => ({
      patients: state.patients.map((p) =>
        p.id === id ? { ...p, ...patientData } : p
      ),
    })),
  selectPatient: (patient) => set({ selectedPatient: patient }),
  setLoading: (loading) => set({ isLoading: loading }),
}))