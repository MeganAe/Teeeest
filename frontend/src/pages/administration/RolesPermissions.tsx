import { useState, useEffect } from 'react'
import { Shield, Edit, Save, X, Plus } from 'lucide-react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { Switch } from '@/components/ui/Switch'
import { Badge } from '@/components/ui/Badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { useNotificationStore } from '@/stores/notificationStore'
import { api } from '@/services/api'

const rolesList = [
  { value: 'ADMIN', label: 'Administrateur', color: 'red' },
  { value: 'RECEPTIONIST', label: 'Réceptionniste', color: 'blue' },
  { value: 'PERCEPTEUR', label: 'Percepteur', color: 'green' },
  { value: 'MEDECIN_DIRECTEUR', label: 'Médecin Directeur', color: 'purple' },
  { value: 'MEDECIN_PSYCHIATRE', label: 'Médecin Psychiatre', color: 'purple' },
  { value: 'MEDECIN_ORTHOPEDIEN', label: 'Médecin Orthopédien', color: 'purple' },
  { value: 'LABORANTIN', label: 'Laborantin', color: 'orange' },
  { value: 'TECHNICIEN_EEG', label: 'Technicien EEG', color: 'orange' },
  { value: 'TECHNICIEN_ECG', label: 'Technicien ECG', color: 'orange' },
  { value: 'RADIOLOGUE', label: 'Radiologue', color: 'orange' },
  { value: 'KINESITHERAPEUTE', label: 'Kinésithérapeute', color: 'cyan' },
  { value: 'INFIRMIER', label: 'Infirmier', color: 'cyan' },
  { value: 'PHARMACIEN', label: 'Pharmacien', color: 'teal' },
  { value: 'COMPTABLE', label: 'Comptable', color: 'yellow' },
]

const modules = [
  { id: 'dashboard', name: 'Tableau de bord', permissions: ['view'] },
  { id: 'patients', name: 'Patients', permissions: ['create', 'read', 'update', 'delete'] },
  { id: 'consultations', name: 'Consultations', permissions: ['create', 'read', 'update', 'delete'] },
  { id: 'payments', name: 'Paiements', permissions: ['create', 'read', 'update', 'refund'] },
  { id: 'pharmacy', name: 'Pharmacie', permissions: ['create', 'read', 'update', 'delete', 'sell'] },
  { id: 'exams', name: 'Examens', permissions: ['request', 'read', 'submit', 'validate'] },
  { id: 'hospitalizations', name: 'Hospitalisations', permissions: ['create', 'read', 'update', 'discharge'] },
  { id: 'reports', name: 'Rapports', permissions: ['view', 'export'] },
  { id: 'users', name: 'Utilisateurs', permissions: ['create', 'read', 'update', 'delete'] },
  { id: 'settings', name: 'Paramètres', permissions: ['read', 'update'] },
]

export default function RolesPermissions() {
  const [selectedRole, setSelectedRole] = useState('ADMIN')
  const [permissions, setPermissions] = useState<Record<string, string[]>>({})
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)
  const { showSuccess } = useNotificationStore()

  useEffect(() => {
    loadPermissions()
  }, [selectedRole])

  const loadPermissions = async () => {
    const res = await api.get(`/admin/roles/${selectedRole}/permissions`)
    setPermissions(res.data)
  }

  const handlePermissionChange = (moduleId: string, permission: string, checked: boolean) => {
    setPermissions(prev => ({
      ...prev,
      [moduleId]: checked
        ? [...(prev[moduleId] || []), permission]
        : (prev[moduleId] || []).filter(p => p !== permission)
    }))
  }

  const savePermissions = async () => {
    setLoading(true)
    await api.put(`/admin/roles/${selectedRole}/permissions`, { permissions })
    showSuccess('Permissions mises à jour')
    setEditing(false)
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Rôles et permissions</h1>
          <p className="text-slate-500 mt-1">Gérer les accès des utilisateurs</p>
        </div>
        {!editing ? (
          <GlassButton onClick={() => setEditing(true)}>
            <Edit className="w-4 h-4 mr-2" />
            Modifier
          </GlassButton>
        ) : (
          <div className="flex gap-2">
            <GlassButton onClick={savePermissions} loading={loading}>
              <Save className="w-4 h-4 mr-2" />
              Sauvegarder
            </GlassButton>
            <GlassButton variant="ghost" onClick={() => setEditing(false)}>
              <X className="w-4 h-4 mr-2" />
              Annuler
            </GlassButton>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Liste des rôles */}
        <GlassCard className="p-4 lg:col-span-1">
          <h3 className="font-semibold mb-4">Rôles</h3>
          <div className="space-y-2">
            {rolesList.map((role) => (
              <button
                key={role.value}
                onClick={() => setSelectedRole(role.value)}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  selectedRole === role.value
                    ? `bg-${role.color}-500/20 border border-${role.color}-500/30`
                    : 'hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span className="font-medium">{role.label}</span>
                </div>
              </button>
            ))}
          </div>
        </GlassCard>

        {/* Permissions */}
        <GlassCard className="p-4 lg:col-span-3">
          <div className="mb-4">
            <Badge variant="info" className="mb-2">
              {rolesList.find(r => r.value === selectedRole)?.label}
            </Badge>
            <h3 className="font-semibold">Permissions</h3>
          </div>

          <div className="space-y-4">
            {modules.map((module) => (
              <div key={module.id} className="border-b border-white/20 pb-4">
                <h4 className="font-medium mb-3">{module.name}</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {module.permissions.map((permission) => (
                    <label key={permission} className="flex items-center gap-2 text-sm">
                      <Switch
                        checked={permissions[module.id]?.includes(permission) || false}
                        onCheckedChange={(checked) => editing && handlePermissionChange(module.id, permission, checked)}
                        disabled={!editing}
                      />
                      <span className="capitalize">{permission}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}