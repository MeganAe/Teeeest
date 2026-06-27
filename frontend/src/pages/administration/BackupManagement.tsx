import { useState, useEffect } from 'react'
import { Database, Download, Upload, Trash2, RefreshCw } from 'lucide-react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { useNotificationStore } from '@/stores/notificationStore'
import { api } from '@/services/api'

export default function BackupManagement() {
  const [backups, setBackups] = useState([])
  const [loading, setLoading] = useState(false)
  const { showSuccess, showError } = useNotificationStore()

  useEffect(() => {
    loadBackups()
  }, [])

  const loadBackups = async () => {
    const res = await api.get('/admin/backups')
    setBackups(res.data)
  }

  const createBackup = async () => {
    setLoading(true)
    try {
      await api.post('/admin/backups')
      showSuccess('Backup créé avec succès')
      loadBackups()
    } catch (error) {
      showError('Erreur lors de la création du backup')
    }
    setLoading(false)
  }

  const restoreBackup = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir restaurer ce backup ? Toutes les données actuelles seront remplacées.')) {
      setLoading(true)
      try {
        await api.post(`/admin/backups/${id}/restore`)
        showSuccess('Backup restauré avec succès')
      } catch (error) {
        showError('Erreur lors de la restauration')
      }
      setLoading(false)
    }
  }

  const downloadBackup = async (id: string) => {
    const res = await api.get(`/admin/backups/${id}/download`, { responseType: 'blob' })
    const url = window.URL.createObjectURL(new Blob([res.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `backup-${id}.sql`)
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  const deleteBackup = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce backup ?')) {
      await api.delete(`/admin/backups/${id}`)
      showSuccess('Backup supprimé')
      loadBackups()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Sauvegardes</h1>
          <p className="text-slate-500 mt-1">Gestion des backups de la base de données</p>
        </div>
        <GlassButton onClick={createBackup} loading={loading}>
          <Database className="w-4 h-4 mr-2" />
          Nouveau backup
        </GlassButton>
      </div>

      <GlassCard className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Liste des sauvegardes</h3>
          <GlassButton size="sm" variant="ghost" onClick={loadBackups}>
            <RefreshCw className="w-4 h-4" />
          </GlassButton>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Taille</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Créé par</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {backups.map((backup: any) => (
              <TableRow key={backup.id}>
                <TableCell>{new Date(backup.createdAt).toLocaleString()}</TableCell>
                <TableCell>{(backup.size / 1024 / 1024).toFixed(2)} MB</TableCell>
                <TableCell>{backup.type === 'auto' ? 'Automatique' : 'Manuel'}</TableCell>
                <TableCell>{backup.createdBy?.firstName} {backup.createdBy?.lastName}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <GlassButton size="sm" variant="ghost" onClick={() => restoreBackup(backup.id)}>
                      <Upload className="w-4 h-4" />
                    </GlassButton>
                    <GlassButton size="sm" variant="ghost" onClick={() => downloadBackup(backup.id)}>
                      <Download className="w-4 h-4" />
                    </GlassButton>
                    <GlassButton size="sm" variant="ghost" className="text-red-500" onClick={() => deleteBackup(backup.id)}>
                      <Trash2 className="w-4 h-4" />
                    </GlassButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </GlassCard>
    </div>
  )
}