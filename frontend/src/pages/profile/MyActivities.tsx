import { useState, useEffect } from 'react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { Activity, Eye } from 'lucide-react'
import { api } from '@/services/api'

export function MyActivities() {
  const [activities, setActivities] = useState([])

  useEffect(() => {
    api.get('/audit/user/me').then(res => setActivities(res.data.logs))
  }, [])

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <GlassCard className="p-3 text-center">
          <p className="text-2xl font-bold">{activities.length}</p>
          <p className="text-sm text-slate-500">Total activités</p>
        </GlassCard>
        <GlassCard className="p-3 text-center">
          <p className="text-2xl font-bold">{activities.filter((a: any) => new Date(a.createdAt).toDateString() === new Date().toDateString()).length}</p>
          <p className="text-sm text-slate-500">Aujourd'hui</p>
        </GlassCard>
        <GlassCard className="p-3 text-center">
          <p className="text-2xl font-bold">{activities.filter((a: any) => a.action.includes('CREATE')).length}</p>
          <p className="text-sm text-slate-500">Créations</p>
        </GlassCard>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Entité</TableHead>
            <TableHead>IP</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity: any) => (
            <TableRow key={activity.id}>
              <TableCell>{new Date(activity.createdAt).toLocaleString()}</TableCell>
              <TableCell>{activity.action}</TableCell>
              <TableCell>{activity.entity}</TableCell>
              <TableCell>{activity.ipAddress || '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}