import { Bell, Search, Settings, User, Moon, Sun } from 'lucide-react'
import { useThemeStore } from '@/stores/themeStore'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Avatar, AvatarFallback } from '@/components/ui/Avatar'
import { useAuthStore } from '@/stores/authStore'

export default function TopBar() {
  const { theme, toggleTheme } = useThemeStore()
  const { user } = useAuthStore()

  return (
    <div className="flex h-16 items-center justify-between px-6 border-b border-white/20 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full h-10 rounded-xl bg-white/50 dark:bg-slate-800/50 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-medical-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <GlassButton size="sm" variant="ghost" onClick={toggleTheme} className="rounded-lg p-2">
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </GlassButton>
        
        <GlassButton size="sm" variant="ghost" className="rounded-lg p-2 relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </GlassButton>
        
        <GlassButton size="sm" variant="ghost" className="rounded-lg p-2">
          <Settings className="h-4 w-4" />
        </GlassButton>
        
        <div className="flex items-center gap-3 ml-2 pl-3 border-l border-white/20">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-medical-primary/20 text-medical-primary">
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
            <p className="text-xs text-slate-500">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}