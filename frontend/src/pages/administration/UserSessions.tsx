import { useState, useEffect } from 'react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { Monitor, Smartphone, LogOut, RefreshCw } from 'lucide-react'
import { api } from '@/services/api'
import { useNotificationStore } from '@/stores/notificationStore'

export default function UserSessions() {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const { showSuccess } = useNotificationStore()

  useEffect(() => {
    loadSessions()
  }, [])

  const loadSessions = async () => {
    const res = await api.get('/admin/sessions')
    setSessions(res.data)
    setLoading(false)
  }

  const revokeSession = async (sessionId: string) => {
    await api.delete(`/admin/sessions/${sessionId}`)
    showSuccess('Session révoquée')
    loadSessions()
  }

  const revokeAllOtherSessions = async () => {
    await api.delete('/admin/sessions/other')
    showSuccess('Toutes les autres sessions ont été révoquées')
    loadSessions()
  }

  const getDeviceIcon = (userAgent: string) => {
    if (userAgent?.includes('Mobile')) return <Smartphone className="h-4 w-4" />
    return <Monitor className="h-4 w-4" />
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Sessions utilisateur</h1>
          <p className="text-slate-500 mt-1">Gérer les sessions actives</p>
        </div>
        <div className="flex gap-2">
          <GlassButton variant="ghost" onClick={loadSessions}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualiser
          </GlassButton>
          <GlassButton variant="destructive" onClick={revokeAllOtherSessions}>
            <LogOut className="w-4 h-4 mr-2" />
            Révoquer les autres
          </GlassButton>
        </div>
      </div>

      <GlassCard className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Appareil</TableHead>
              <TableHead>Navigateur</TableHead>
              <TableHead>IP</TableHead>
              <TableHead>Localisation</TableHead>
              <TableHead>Dernière activité</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((session: any) => (
              <TableRow key={session.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getDeviceIcon(session.userAgent)}
                    <span>{session.device || 'Ordinateur'}</span>
                  </div>
                </TableCell>
                <TableCell>{session.browser || '-'}</TableCell>
                <TableCell className="font-mono text-xs">{session.ipAddress}</TableCell>
                <TableCell>{session.location || '-'}</TableCell>
                <TableCell>{new Date(session.lastActivity).toLocaleString()}</TableCell>
                <TableCell>
                  {session.isCurrent ? (
                    <Badge variant="success">Actuelle</Badge>
                  ) : (
                    <Badge variant="warning">Active</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {!session.isCurrent && (
                    <GlassButton size="sm" variant="ghost" onClick={() => revokeSession(session.id)}>
                      <LogOut className="h-4 w-4" />
                    </GlassButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </GlassCard>
    </div>
  )
}