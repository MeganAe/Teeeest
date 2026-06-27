import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Users,
  Wallet,
  Stethoscope,
  Microscope,
  Activity,
  Pill,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Heart,
  Calendar,
  Syringe,
  FileBarChart,
  Printer,
} from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { cn } from '@/lib/utils'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

const menuItems = [
  { path: '/dashboard', name: 'Tableau de bord', icon: LayoutDashboard },
  { path: '/reception', name: 'Réception', icon: Users },
  { path: '/perception', name: 'Perception', icon: Wallet },
  { path: '/consultation', name: 'Consultation', icon: Stethoscope },
  { path: '/examens', name: 'Examens', icon: Microscope, submenu: true },
  { path: '/traitements', name: 'Traitements', icon: Activity, submenu: true },
  { path: '/pharmacie', name: 'Pharmacie', icon: Pill },
  { path: '/comptabilite', name: 'Comptabilité', icon: FileText },
  { path: '/rapports', name: 'Rapports', icon: FileBarChart },
  { path: '/impression', name: 'Impression', icon: Printer },
  { path: '/administration', name: 'Administration', icon: Settings },
]

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { user, logout } = useAuthStore()

  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? 288 : 80 }}
      className="fixed left-0 top-0 h-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border-r border-white/20 dark:border-white/10 shadow-2xl z-30"
    >
      {/* Logo */}
      <div className={cn('flex h-16 items-center justify-between px-4 border-b border-white/20', isOpen ? 'justify-between' : 'justify-center')}>
        {isOpen && (
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-medical-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-medical-primary to-medical-secondary bg-clip-text text-transparent">
              AMKA
            </span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="rounded-lg p-1.5 hover:bg-white/20 transition-colors"
        >
          {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-medical-primary/10 text-medical-primary'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-white/10',
                    !isOpen && 'justify-center'
                  )
                }
              >
                <item.icon className="h-5 w-5" />
                {isOpen && <span>{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Section */}
      <div className="border-t border-white/20 p-4">
        <div className={cn('flex items-center gap-3', !isOpen && 'justify-center')}>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-medical-primary/20 text-medical-primary">
            <span className="text-sm font-semibold">
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </span>
          </div>
          {isOpen && (
            <div className="flex-1">
              <p className="text-sm font-medium">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{user?.role}</p>
            </div>
          )}
          {isOpen && (
            <button
              onClick={logout}
              className="rounded-lg p-2 hover:bg-red-500/10 text-red-500 transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </motion.aside>
  )
}