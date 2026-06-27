import { create } from 'zustand'

interface Consultation {
  id: string
  patientId: string
  medecinId: string
  dateConsultation: string
  motif: string
  diagnostic?: string
  tension?: string
  temperature?: number
  poids?: number
  taille?: number
  traitement?: string
  notes?: string
  status: string
}

interface ConsultationState {
  currentConsultation: Consultation | null
  waitingQueue: Consultation[]
  isLoading: boolean
  setCurrentConsultation: (consultation: Consultation | null) => void
  setWaitingQueue: (queue: Consultation[]) => void
  addToWaitingQueue: (consultation: Consultation) => void
  removeFromWaitingQueue: (id: string) => void
  updateConsultationStatus: (id: string, status: string) => void
  setLoading: (loading: boolean) => void
}

export const useConsultationStore = create<ConsultationState>((set) => ({
  currentConsultation: null,
  waitingQueue: [],
  isLoading: false,
  setCurrentConsultation: (consultation) => set({ currentConsultation: consultation }),
  setWaitingQueue: (queue) => set({ waitingQueue: queue }),
  addToWaitingQueue: (consultation) => set((state) => ({ waitingQueue: [...state.waitingQueue, consultation] })),
  removeFromWaitingQueue: (id) => set((state) => ({ waitingQueue: state.waitingQueue.filter((c) => c.id !== id) })),
  updateConsultationStatus: (id, status) =>
    set((state) => ({
      waitingQueue: state.waitingQueue.map((c) => (c.id === id ? { ...c, status } : c)),
    })),
  setLoading: (loading) => set({ isLoading: loading }),
}))