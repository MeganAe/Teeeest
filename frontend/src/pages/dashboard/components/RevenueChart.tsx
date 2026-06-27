import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { api } from '@/services/api'

export function RevenueChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    api.get('/dashboard/revenue-timeline?days=7').then(res => setData(res.data))
  }, [])

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="date" stroke="#64748b" />
        <YAxis stroke="#64748b" />
        <Tooltip
          formatter={(value: any) => `${value.toLocaleString()} FC`}
          contentStyle={{
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderRadius: '8px',
            border: 'none',
            backdropFilter: 'blur(8px)'
          }}
        />
        <Bar dataKey="amount" fill="#0EA5E9" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}