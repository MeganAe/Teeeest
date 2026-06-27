import { motion } from 'framer-motion'
import { Users, Stethoscope, Wallet, Pill, Activity, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'

interface StatsCardsProps {
  stats: {
    patientsJour: number
    consultationsJour: number
    recettesJour: number
    examensRealises: number
    hospitalisations: number
    ventesPharmacie: number
  }
}

const cards = [
  { key: 'patientsJour', label: 'Patients du jour', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10', trend: '+12%' },
  { key: 'consultationsJour', label: 'Consultations', icon: Stethoscope, color: 'text-green-500', bg: 'bg-green-500/10', trend: '+8%' },
  { key: 'recettesJour', label: 'Recettes du jour', icon: Wallet, color: 'text-yellow-500', bg: 'bg-yellow-500/10', trend: '+15%', format: 'currency' },
  { key: 'examensRealises', label: 'Examens réalisés', icon: Activity, color: 'text-purple-500', bg: 'bg-purple-500/10', trend: '+5%' },
  { key: 'hospitalisations', label: 'Hospitalisations', icon: TrendingUp, color: 'text-red-500', bg: 'bg-red-500/10', trend: '-2%' },
  { key: 'ventesPharmacie', label: 'Ventes pharmacie', icon: Pill, color: 'text-indigo-500', bg: 'bg-indigo-500/10', trend: '+18%', format: 'currency' },
]

export function StatsCards({ stats }: StatsCardsProps) {
  const formatValue = (value: number, format?: string) => {
    if (format === 'currency') {
      return new Intl.NumberFormat('fr-CD', { style: 'currency', currency: 'CDF' }).format(value)
    }
    return value.toLocaleString()
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <GlassCard className="p-4" hoverEffect="lift">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center`}>
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <div className="flex items-center gap-1 text-sm">
                {card.trend.startsWith('+') ? (
                  <ArrowUp className="w-3 h-3 text-green-500" />
                ) : (
                  <ArrowDown className="w-3 h-3 text-red-500" />
                )}
                <span className={card.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                  {card.trend}
                </span>
              </div>
            </div>
            <p className="text-2xl font-bold">
              {formatValue(stats[card.key as keyof typeof stats], card.format)}
            </p>
            <p className="text-sm text-slate-500 mt-1">{card.label}</p>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  )
}