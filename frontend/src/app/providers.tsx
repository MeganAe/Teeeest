import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './queryClient'
import { ThemeProvider } from '@/components/glassmorphic/ThemeProvider'
import { Toaster } from 'sonner'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {children}
        <Toaster position="top-right" richColors />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
