import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './queryClient'
import { ThemeProvider } from '@/components/glassmorphic/ThemeProvider'
import { Toaster } from 'sonner'
import MainLayout from '@/layouts/MainLayout/MainLayout'
import Login from '@/pages/auth/Login'
import { useAuthStore } from '@/stores/authStore'

// Lazy load pages
const Dashboard = lazy(() => import('@/pages/dashboard/Dashboard'))
const Reception = lazy(() => import('@/pages/reception/Reception'))
const Perception = lazy(() => import('@/pages/perception/Perception'))
const Consultation = lazy(() => import('@/pages/consultation/Consultation'))
const Examens = lazy(() => import('@/pages/examens/Examens'))
const Traitements = lazy(() => import('@/pages/traitements/Traitements'))
const Pharmacy = lazy(() => import('@/pages/pharmacie/Pharmacy'))
const Comptabilite = lazy(() => import('@/pages/comptabilite/Comptabilite'))
const Rapports = lazy(() => import('@/pages/rapports/Rapports'))
const Impression = lazy(() => import('@/pages/impression/Impression'))
const UsersManagement = lazy(() => import('@/pages/administration/UsersManagement'))

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
)

// Protected Route Component
const ProtectedRoute = ({ element }: { element: React.ReactElement }) => {
  const { isAuthenticated } = useAuthStore()
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return element
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute element={<MainLayout />} />
              }
            >
              <Route index element={<Navigate to="/dashboard" />} />
              <Route path="dashboard" element={<Suspense fallback={<LoadingFallback />}><Dashboard /></Suspense>} />
              <Route path="reception" element={<Suspense fallback={<LoadingFallback />}><Reception /></Suspense>} />
              <Route path="perception" element={<Suspense fallback={<LoadingFallback />}><Perception /></Suspense>} />
              <Route path="consultation" element={<Suspense fallback={<LoadingFallback />}><Consultation /></Suspense>} />
              <Route path="examens" element={<Suspense fallback={<LoadingFallback />}><Examens /></Suspense>} />
              <Route path="traitements" element={<Suspense fallback={<LoadingFallback />}><Traitements /></Suspense>} />
              <Route path="pharmacie" element={<Suspense fallback={<LoadingFallback />}><Pharmacy /></Suspense>} />
              <Route path="comptabilite" element={<Suspense fallback={<LoadingFallback />}><Comptabilite /></Suspense>} />
              <Route path="rapports" element={<Suspense fallback={<LoadingFallback />}><Rapports /></Suspense>} />
              <Route path="impression" element={<Suspense fallback={<LoadingFallback />}><Impression /></Suspense>} />
              <Route path="administration" element={<Suspense fallback={<LoadingFallback />}><UsersManagement /></Suspense>} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster position="top-right" richColors />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
