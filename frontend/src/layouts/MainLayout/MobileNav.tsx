import { motion, AnimatePresence } from 'framer-motion'
import { X, LayoutDashboard, Users, Wallet, Stethoscope, Microscope, Activity, Pill, FileText, Settings, LogOut, Printer } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { path: '/dashboard', name: 'Tableau de bord', icon: LayoutDashboard },
  { path: '/reception', name: 'Réception', icon: Users },
  { path: '/perception', name: 'Perception', icon: Wallet },
  { path: '/consultation', name: 'Consultation', icon: Stethoscope },
  { path: '/examens', name: 'Examens', icon: Microscope },
  { path: '/traitements', name: 'Traitements', icon: Activity },
  { path: '/pharmacie', name: 'Pharmacie', icon: Pill },
  { path: '/comptabilite', name: 'Comptabilité', icon: FileText },
  { path: '/rapports', name: 'Rapports', icon: FileText },
  { path: '/impression', name: 'Impression', icon: Printer },
  { path: '/administration', name: 'Administration', icon: Settings },
]

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const { logout } = useAuthStore()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-0 top-0 h-full w-72 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl z-50 shadow-2xl"
          >
            <div className="flex justify-between items-center p-4 border-b border-white/20">
              <span className="text-xl font-bold bg-gradient-to-r from-medical-primary to-medical-secondary bg-clip-text text-transparent">
                AMKA Medical
              </span>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/20">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <nav className="p-4">
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                          isActive
                            ? 'bg-medical-primary/10 text-medical-primary'
                            : 'text-slate-600 dark:text-slate-300 hover:bg-white/10'
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </NavLink>
                  </li>
                ))}
                <li className="pt-4 mt-4 border-t border-white/20">
                  <button
                    onClick={() => { logout(); onClose(); }}
                    className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Déconnexion</span>
                  </button>
                </li>
              </ul>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}