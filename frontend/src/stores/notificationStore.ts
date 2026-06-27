import { create } from 'zustand'
import { toast } from 'sonner'

interface NotificationStore {
  showSuccess: (message: string) => void
  showError: (message: string) => void
  showWarning: (message: string) => void
  showInfo: (message: string) => void
}

export const useNotificationStore = create<NotificationStore>(() => ({
  showSuccess: (message) => toast.success(message),
  showError: (message) => toast.error(message),
  showWarning: (message) => toast.warning(message),
  showInfo: (message) => toast.info(message),
}))