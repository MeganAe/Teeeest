import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'

export function AppointmentCalendar() {
  const [date, setDate] = useState(new Date())
  const [appointments, setAppointments] = useState([])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <GlassCard className="p-4">
        <Calendar
          onChange={setDate}
          value={date}
          className="border-0 w-full"
          tileClassName="rounded-lg hover:bg-medical-primary/10"
        />
      </GlassCard>
      <GlassCard className="p-4">
        <h3 className="font-semibold mb-4">Rendez-vous du {date.toLocaleDateString('fr-FR')}</h3>
        {appointments.length === 0 ? (
          <p className="text-center text-slate-500 py-8">Aucun rendez-vous</p>
        ) : (
          <div className="space-y-3">
            {/* Liste des rendez-vous */}
          </div>
        )}
        <GlassButton className="w-full mt-4" variant="secondary">
          Nouveau rendez-vous
        </GlassButton>
      </GlassCard>
    </div>
  )
}