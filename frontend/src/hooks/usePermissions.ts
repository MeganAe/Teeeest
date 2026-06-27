import { useAuthStore } from '@/stores/authStore'

const rolePermissions: Record<string, string[]> = {
  ADMIN: ['*'],
  MEDECIN_DIRECTEUR: ['consultations.*', 'patients.read', 'reports.medical'],
  RECEPTIONIST: ['patients.*', 'reception.*'],
  PERCEPTEUR: ['payments.*'],
  PHARMACIEN: ['pharmacy.*'],
}

export function usePermissions() {
  const { user } = useAuthStore()

  const hasPermission = (permission: string): boolean => {
    if (!user) return false
    const userPermissions = rolePermissions[user.role] || []
    if (userPermissions.includes('*')) return true
    return userPermissions.some(p => {
      if (p.endsWith('.*')) {
        const module = p.slice(0, -2)
        return permission.startsWith(module)
      }
      return p === permission
    })
  }

  const hasRole = (role: string | string[]): boolean => {
    if (!user) return false
    if (Array.isArray(role)) return role.includes(user.role)
    return user.role === role
  }

  return { hasPermission, hasRole, role: user?.role }
}