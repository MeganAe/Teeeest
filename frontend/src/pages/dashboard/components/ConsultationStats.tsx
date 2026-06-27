import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { api } from '@/services/api'

const COLORS = ['#0EA5E9', '#6366F1', '#10B981', '#F59E0B', '#EF4444']

export function ConsultationStats() {
  const [data, setData] = useState([])

  useEffect(() => {
    api.get('/dashboard/consultations-stats').then(res => {
      const formatted = Object.entries(res.data.byMedecin).map(([name, count]) => ({ name, value: count }))
      setData(formatted)
    })
  }, [])

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}