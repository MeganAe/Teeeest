import { GlassCard } from '@/components/glassmorphic/GlassCard'

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Tableau de bord</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <GlassCard className="p-6">
          <h2 className="text-xl font-semibold">Bienvenue sur AMKA</h2>
          <p>Système de gestion du Centre pour Handicapés</p>
        </GlassCard>
      </div>
    </div>
  )
}
