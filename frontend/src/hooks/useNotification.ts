import { useUIStore } from '@/stores/uiStore'
import { useCallback } from 'react'

export function useNotification() {
  const { addNotification } = useUIStore()

  const notifySuccess = useCallback((title: string, message: string) => {
    addNotification({ id: Date.now().toString(), title, message, type: 'success', read: false, createdAt: new Date() })
  }, [addNotification])

  const notifyError = useCallback((title: string, message: string) => {
    addNotification({ id: Date.now().toString(), title, message, type: 'error', read: false, createdAt: new Date() })
  }, [addNotification])

  const notifyWarning = useCallback((title: string, message: string) => {
    addNotification({ id: Date.now().toString(), title, message, type: 'warning', read: false, createdAt: new Date() })
  }, [addNotification])

  const notifyInfo = useCallback((title: string, message: string) => {
    addNotification({ id: Date.now().toString(), title, message, type: 'info', read: false, createdAt: new Date() })
  }, [addNotification])

  return { notifySuccess, notifyError, notifyWarning, notifyInfo }
}