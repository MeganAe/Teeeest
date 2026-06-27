import { useState, useEffect } from 'react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { Select } from '@/components/ui/Select'
import { api } from '@/services/api'
import { Search, Filter } from 'lucide-react'

export function AuditLogs() {
  const [logs, setLogs] = useState([])
  const [filters, setFilters] = useState({ entity: '', action: '', startDate: '', endDate: '' })

  useEffect(() => {
    const params = new URLSearchParams()
    if (filters.entity) params.append('entity', filters.entity)
    if (filters.action) params.append('action', filters.action)
    if (filters.startDate) params.append('startDate', filters.startDate)
    if (filters.endDate) params.append('endDate', filters.endDate)
    api.get(`/audit?${params.toString()}`).then(res => setLogs(res.data.logs))
  }, [filters])

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <GlassInput placeholder="Entité" value={filters.entity} onChange={(e) => setFilters({ ...filters, entity: e.target.value })} />
        <GlassInput placeholder="Action" value={filters.action} onChange={(e) => setFilters({ ...filters, action: e.target.value })} />
        <GlassInput type="date" placeholder="Du" value={filters.startDate} onChange={(e) => setFilters({ ...filters, startDate: e.target.value })} />
        <GlassInput type="date" placeholder="Au" value={filters.endDate} onChange={(e) => setFilters({ ...filters, endDate: e.target.value })} />
      </div>

      <GlassCard className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Utilisateur</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Entité</TableHead>
              <TableHead>ID Entité</TableHead>
              <TableHead>IP</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log: any) => (
              <TableRow key={log.id}>
                <TableCell>{new Date(log.createdAt).toLocaleString()}</TableCell>
                <TableCell>{log.user?.firstName} {log.user?.lastName}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.entity}</TableCell>
                <TableCell className="font-mono">{log.entityId || '-'}</TableCell>
                <TableCell>{log.ipAddress || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </GlassCard>
    </div>
  )
}