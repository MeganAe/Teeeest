import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { api } from '@/services/api'

interface RevenueChartProps {
  days?: number
}

export function RevenueChart({ days = 30 }: RevenueChartProps) {
  const [data, setData] = useState([])

  useEffect(() => {
    api.get(`/dashboard/revenue-timeline?days=${days}`).then(res => setData(res.data))
  }, [days])

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="date" stroke="#64748b" />
        <YAxis stroke="#64748b" tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
        <Tooltip
          formatter={(value: any) => `${value.toLocaleString()} FC`}
          contentStyle={{
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderRadius: '8px',
            border: 'none',
            backdropFilter: 'blur(8px)'
          }}
        />
        <Line type="monotone" dataKey="amount" stroke="#0EA5E9" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}