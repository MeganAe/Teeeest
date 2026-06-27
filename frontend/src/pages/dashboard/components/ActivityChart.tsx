import { useState, useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { api } from '@/services/api'

export function ActivityChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    api.get('/dashboard/activity-timeline').then(res => setData(res.data))
  }, [])

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="date" stroke="#64748b" />
        <YAxis stroke="#64748b" />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderRadius: '8px',
            border: 'none',
            backdropFilter: 'blur(8px)'
          }}
        />
        <Area type="monotone" dataKey="consultations" stackId="1" stroke="#0EA5E9" fill="#0EA5E9" fillOpacity={0.3} />
        <Area type="monotone" dataKey="patients" stackId="1" stroke="#6366F1" fill="#6366F1" fillOpacity={0.3} />
      </AreaChart>
    </ResponsiveContainer>
  )
}