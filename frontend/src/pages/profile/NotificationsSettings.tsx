import { useState } from 'react'
import { Switch } from '@/components/ui/Switch'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { useNotificationStore } from '@/stores/notificationStore'

export function NotificationsSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    appointmentReminders: true,
    paymentAlerts: true,
    systemUpdates: false,
  })
  const { showSuccess } = useNotificationStore()

  const handleSave = () => {
    // Sauvegarder les préférences
    showSuccess('Préférences sauvegardées')
  }

  return (
    <div className="space-y-4">
      <GlassCard className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Notifications par email</p>
            <p className="text-sm text-slate-500">Recevoir les notifications par email</p>
          </div>
          <Switch checked={settings.emailNotifications} onCheckedChange={(v) => setSettings({ ...settings, emailNotifications: v })} />
        </div>
      </GlassCard>

      <GlassCard className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Notifications push</p>
            <p className="text-sm text-slate-500">Recevoir les notifications dans le navigateur</p>
          </div>
          <Switch checked={settings.pushNotifications} onCheckedChange={(v) => setSettings({ ...settings, pushNotifications: v })} />
        </div>
      </GlassCard>

      <GlassCard className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Rappels de rendez-vous</p>
            <p className="text-sm text-slate-500">Être notifié avant un rendez-vous</p>
          </div>
          <Switch checked={settings.appointmentReminders} onCheckedChange={(v) => setSettings({ ...settings, appointmentReminders: v })} />
        </div>
      </GlassCard>

      <GlassCard className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Alertes de paiement</p>
            <p className="text-sm text-slate-500">Notifications pour les transactions</p>
          </div>
          <Switch checked={settings.paymentAlerts} onCheckedChange={(v) => setSettings({ ...settings, paymentAlerts: v })} />
        </div>
      </GlassCard>

      <GlassButton onClick={handleSave} className="w-full">
        Sauvegarder les préférences
      </GlassButton>
    </div>
  )
}