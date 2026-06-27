import { useEffect, useState } from 'react'
import { api } from '@/services/api'

export function ActivityHeatmap() {
  const [data, setData] = useState([])

  useEffect(() => {
    api.get('/dashboard/activity-heatmap').then(res => setData(res.data))
  }, [])

  const getColor = (count: number) => {
    if (count === 0) return 'bg-slate-100 dark:bg-slate-800'
    if (count < 5) return 'bg-green-100 dark:bg-green-900/30'
    if (count < 10) return 'bg-green-300 dark:bg-green-800/50'
    if (count < 20) return 'bg-green-500 dark:bg-green-700/70'
    return 'bg-green-700 dark:bg-green-600'
  }

  return (
    <div className="grid grid-cols-7 gap-1">
      {data.map((day: any, index: number) => (
        <div key={index} className="text-center">
          <div className={`h-12 rounded-md ${getColor(day.count)} transition-all duration-200 hover:scale-110`} title={`${day.date}: ${day.count} activités`} />
          <span className="text-xs text-slate-500 mt-1 block">{day.date.slice(8, 10)}</span>
        </div>
      ))}
    </div>
  )
}