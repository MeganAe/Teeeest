import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'

export function useRealtimeData(event: string) {
  const [data, setData] = useState(null)

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000')
    
    socket.on(event, (newData) => {
      setData(newData)
    })

    return () => {
      socket.disconnect()
    }
  }, [event])

  return data
}