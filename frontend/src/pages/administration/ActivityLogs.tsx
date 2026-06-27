import { useState, useEffect } from 'react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { Select } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'
import { Search, Filter, Eye } from 'lucide-react'
import { api } from '@/services/api'

export default function ActivityLogs() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ entity: '', action: '', startDate: '', endDate: '' })
  const [selectedLog, setSelectedLog] = useState(null)

  useEffect(() => {
    loadLogs()
  }, [filters])

  const loadLogs = async () => {
    const params = new URLSearchParams()
    if (filters.entity) params.append('entity', filters.entity)
    if (filters.action) params.append('action', filters.action)
    if (filters.startDate) params.append('startDate', filters.startDate)
    if (filters.endDate) params.append('endDate', filters.endDate)
    const res = await api.get(`/audit?${params.toString()}`)
    setLogs(res.data.logs)
    setLoading(false)
  }

  const getActionColor = (action: string) => {
    if (action.includes('CREATE')) return 'success'
    if (action.includes('UPDATE')) return 'warning'
    if (action.includes('DELETE')) return 'destructive'
    return 'info'
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Journal d'activité</h1>
        <p className="text-slate-500 mt-1">Historique complet des actions système</p>
      </div>

      {/* Filtres */}
      <GlassCard className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <GlassInput
            placeholder="Entité"
            value={filters.entity}
            onChange={(e) => setFilters({ ...filters, entity: e.target.value })}
            icon={<Filter className="h-4 w-4" />}
          />
          <GlassInput
            placeholder="Action"
            value={filters.action}
            onChange={(e) => setFilters({ ...filters, action: e.target.value })}
          />
          <GlassInput
            type="date"
            placeholder="Date début"
            value={filters.startDate}
            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
          />
          <GlassInput
            type="date"
            placeholder="Date fin"
            value={filters.endDate}
            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
          />
        </div>
      </GlassCard>

      {/* Tableau des logs */}
      <GlassCard className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Utilisateur</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Entité</TableHead>
              <TableHead>IP</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log: any) => (
              <TableRow key={log.id}>
                <TableCell>{new Date(log.createdAt).toLocaleString()}</TableCell>
                <TableCell>{log.user?.firstName} {log.user?.lastName}</TableCell>
                <TableCell>
                  <Badge variant={getActionColor(log.action)}>{log.action}</Badge>
                </TableCell>
                <TableCell>{log.entity}</TableCell>
                <TableCell className="font-mono text-xs">{log.ipAddress || '-'}</TableCell>
                <TableCell>
                  <button onClick={() => setSelectedLog(log)} className="p-1 hover:bg-white/10 rounded">
                    <Eye className="h-4 w-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </GlassCard>

      {/* Modal détails */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedLog(null)}>
          <GlassCard className="max-w-2xl w-full p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-4">Détails de l'activité</h3>
            <div className="space-y-3">
              <p><strong>Date:</strong> {new Date(selectedLog.createdAt).toLocaleString()}</p>
              <p><strong>Utilisateur:</strong> {selectedLog.user?.firstName} {selectedLog.user?.lastName} ({selectedLog.user?.email})</p>
              <p><strong>Action:</strong> {selectedLog.action}</p>
              <p><strong>Entité:</strong> {selectedLog.entity}</p>
              <p><strong>ID Entité:</strong> {selectedLog.entityId || '-'}</p>
              <p><strong>IP:</strong> {selectedLog.ipAddress || '-'}</p>
              <p><strong>User Agent:</strong> {selectedLog.userAgent || '-'}</p>
              {selectedLog.oldValues && (
                <div>
                  <strong>Anciennes valeurs:</strong>
                  <pre className="mt-2 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs overflow-auto">
                    {JSON.stringify(selectedLog.oldValues, null, 2)}
                  </pre>
                </div>
              )}
              {selectedLog.newValues && (
                <div>
                  <strong>Nouvelles valeurs:</strong>
                  <pre className="mt-2 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs overflow-auto">
                    {JSON.stringify(selectedLog.newValues, null, 2)}
                  </pre>
                </div>
              )}
            </div>
            <GlassButton onClick={() => setSelectedLog(null)} className="mt-6 w-full">
              Fermer
            </GlassButton>
          </GlassCard>
        </div>
      )}
    </div>
  )
}