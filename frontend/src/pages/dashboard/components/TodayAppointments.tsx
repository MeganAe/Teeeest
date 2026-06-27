import { useState, useEffect } from 'react'
import { Calendar, Clock, User } from 'lucide-react'
import { api } from '@/services/api'

export function TodayAppointments() {
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    api.get('/consultations/today').then(res => setAppointments(res.data))
  }, [])

  return (
    <div className="space-y-3">
      {appointments.map((apt: any) => (
        <div key={apt.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors">
          <div className="w-10 h-10 rounded-full bg-medical-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-medical-primary" />
          </div>
          <div className="flex-1">
            <p className="font-medium">{apt.patient?.nom} {apt.patient?.prenom}</p>
            <p className="text-sm text-slate-500">Motif: {apt.motif}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">{new Date(apt.dateConsultation).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
            <p className="text-xs text-slate-500">{apt.status === 'EN_ATTENTE' ? 'En attente' : 'En cours'}</p>
          </div>
        </div>
      ))}
      {appointments.length === 0 && (
        <p className="text-center text-slate-500 py-4">Aucun rendez-vous aujourd'hui</p>
      )}
    </div>
  )
}