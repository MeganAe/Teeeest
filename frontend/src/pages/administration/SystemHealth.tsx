import { useState, useEffect } from 'react'
import { Activity, Database, Server, Clock, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { api } from '@/services/api'

export default function SystemHealth() {
  const [health, setHealth] = useState({
    status: 'healthy',
    uptime: 0,
    database: { status: 'connected', latency: 0 },
    api: { status: 'online', latency: 0 },
    memory: { used: 0, total: 0, percentage: 0 },
    disk: { used: 0, total: 0, percentage: 0 },
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadHealth()
  }, [])

  const loadHealth = async () => {
    const res = await api.get('/admin/health')
    setHealth(res.data)
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Santé du système</h1>
          <p className="text-slate-500 mt-1">État de fonctionnement du serveur</p>
        </div>
        <GlassButton variant="ghost" onClick={loadHealth}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Actualiser
        </GlassButton>
      </div>

      {/* Statut global */}
      <GlassCard className="p-4">
        <div className="flex items-center gap-4">
          {health.status === 'healthy' ? (
            <CheckCircle className="h-12 w-12 text-green-500" />
          ) : (
            <AlertCircle className="h-12 w-12 text-red-500" />
          )}
          <div>
            <h2 className="text-xl font-bold">
              {health.status === 'healthy' ? 'Système opérationnel' : 'Problème détecté'}
            </h2>
            <p className="text-slate-500">
              Temps de fonctionnement: {Math.floor(health.uptime / 3600)}h {Math.floor((health.uptime % 3600) / 60)}m
            </p>
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* API */}
        <GlassCard className="p-4">
          <div className="flex items-center justify-between mb-3">
            <Server className="h-8 w-8 text-blue-500" />
            <span className={`text-sm ${health.api.status === 'online' ? 'text-green-500' : 'text-red-500'}`}>
              {health.api.status === 'online' ? 'En ligne' : 'Hors ligne'}
            </span>
          </div>
          <p className="text-2xl font-bold">{health.api.latency}ms</p>
          <p className="text-sm text-slate-500">Latence API</p>
        </GlassCard>

        {/* Base de données */}
        <GlassCard className="p-4">
          <div className="flex items-center justify-between mb-3">
            <Database className="h-8 w-8 text-purple-500" />
            <span className={`text-sm ${health.database.status === 'connected' ? 'text-green-500' : 'text-red-500'}`}>
              {health.database.status === 'connected' ? 'Connectée' : 'Déconnectée'}
            </span>
          </div>
          <p className="text-2xl font-bold">{health.database.latency}ms</p>
          <p className="text-sm text-slate-500">Latence DB</p>
        </GlassCard>

        {/* Mémoire */}
        <GlassCard className="p-4">
          <div className="flex items-center justify-between mb-3">
            <Activity className="h-8 w-8 text-green-500" />
            <span className="text-sm">{health.memory.percentage}%</span>
          </div>
          <p className="text-2xl font-bold">{(health.memory.used / 1024 / 1024 / 1024).toFixed(1)} GB</p>
          <p className="text-sm text-slate-500">sur {(health.memory.total / 1024 / 1024 / 1024).toFixed(1)} GB</p>
          <div className="mt-2 w-full bg-slate-200 rounded-full h-1.5">
            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${health.memory.percentage}%` }} />
          </div>
        </GlassCard>

        {/* Disque */}
        <GlassCard className="p-4">
          <div className="flex items-center justify-between mb-3">
            <Database className="h-8 w-8 text-orange-500" />
            <span className="text-sm">{health.disk.percentage}%</span>
          </div>
          <p className="text-2xl font-bold">{(health.disk.used / 1024 / 1024 / 1024).toFixed(1)} GB</p>
          <p className="text-sm text-slate-500">sur {(health.disk.total / 1024 / 1024 / 1024).toFixed(1)} GB</p>
          <div className="mt-2 w-full bg-slate-200 rounded-full h-1.5">
            <div className={`h-1.5 rounded-full ${health.disk.percentage > 80 ? 'bg-red-500' : 'bg-orange-500'}`} style={{ width: `${health.disk.percentage}%` }} />
          </div>
        </GlassCard>
      </div>
    </div>
  )
}