import { lazy } from 'react'

export const routes = [
  { path: '/dashboard', name: 'Tableau de bord', icon: 'LayoutDashboard', component: lazy(() => import('@/pages/dashboard/Dashboard')) },
  { path: '/reception', name: 'Réception', icon: 'Users', component: lazy(() => import('@/pages/reception/Reception')) },
  { path: '/perception', name: 'Perception', icon: 'Wallet', component: lazy(() => import('@/pages/perception/Perception')) },
  { path: '/consultation', name: 'Consultation', icon: 'Stethoscope', component: lazy(() => import('@/pages/consultation/Consultation')) },
  { path: '/examens', name: 'Examens', icon: 'Activity', component: lazy(() => import('@/pages/examens/Examens')) },
  { path: '/traitements', name: 'Traitements', icon: 'Pill', component: lazy(() => import('@/pages/traitements/Traitements')) },
  { path: '/pharmacie', name: 'Pharmacie', icon: 'Pill', component: lazy(() => import('@/pages/pharmacie/Pharmacy')) },
  { path: '/comptabilite', name: 'Comptabilité', icon: 'FileText', component: lazy(() => import('@/pages/comptabilite/Comptabilite')) },
  { path: '/rapports', name: 'Rapports', icon: 'BarChart3', component: lazy(() => import('@/pages/rapports/Rapports')) },
  { path: '/impression', name: 'Impression', icon: 'Printer', component: lazy(() => import('@/pages/impression/Impression')) },
  { path: '/administration', name: 'Administration', icon: 'Settings', component: lazy(() => import('@/pages/administration/UsersManagement')) },
]
