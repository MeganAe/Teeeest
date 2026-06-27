import { useState, useEffect } from 'react'
import { Save, Globe, Bell, Shield, Palette } from 'lucide-react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { Switch } from '@/components/ui/Switch'
import { Select } from '@/components/ui/Select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { useNotificationStore } from '@/stores/notificationStore'
import { api } from '@/services/api'

export default function SystemSettings() {
  const [settings, setSettings] = useState({
    siteName: 'AMKA Medical Center',
    siteLogo: '',
    contactEmail: 'contact@amka.cd',
    contactPhone: '+243 XXX XXX XXX',
    address: 'Kindu, Maniema, RDC',
    currency: 'CDF',
    dateFormat: 'DD/MM/YYYY',
    timezone: 'Africa/Lubumbashi',
    emailNotifications: true,
    smsNotifications: false,
    twoFactorAuth: false,
    maintenanceMode: false,
    darkMode: true,
  })
  const [loading, setLoading] = useState(false)
  const { showSuccess } = useNotificationStore()

  useEffect(() => {
    api.get('/admin/settings').then(res => setSettings(res.data))
  }, [])

  const handleSubmit = async () => {
    setLoading(true)
    await api.put('/admin/settings', settings)
    showSuccess('Paramètres sauvegardés')
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Paramètres système</h1>
          <p className="text-slate-500 mt-1">Configuration de l'application</p>
        </div>
        <GlassButton onClick={handleSubmit} loading={loading}>
          <Save className="w-4 h-4 mr-2" />
          Sauvegarder
        </GlassButton>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
          <TabsTrigger value="appearance">Apparence</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <GlassCard className="p-4 mt-4">
            <div className="space-y-4">
              <GlassInput label="Nom du site" value={settings.siteName} onChange={(e) => setSettings({ ...settings, siteName: e.target.value })} />
              <GlassInput label="Email de contact" type="email" value={settings.contactEmail} onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })} />
              <GlassInput label="Téléphone" value={settings.contactPhone} onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })} />
              <GlassInput label="Adresse" value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} />
              <Select label="Devise" options={[{ value: 'CDF', label: 'Franc Congolais (FC)' }, { value: 'USD', label: 'Dollar US (USD)' }]} value={settings.currency} onChange={(e) => setSettings({ ...settings, currency: e.target.value })} />
              <Select label="Format de date" options={[{ value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' }, { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' }, { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' }]} value={settings.dateFormat} onChange={(e) => setSettings({ ...settings, dateFormat: e.target.value })} />
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="notifications">
          <GlassCard className="p-4 mt-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg border border-white/20">
                <div>
                  <p className="font-medium">Notifications par email</p>
                  <p className="text-sm text-slate-500">Recevoir les alertes par email</p>
                </div>
                <Switch checked={settings.emailNotifications} onCheckedChange={(v) => setSettings({ ...settings, emailNotifications: v })} />
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg border border-white/20">
                <div>
                  <p className="font-medium">Notifications SMS</p>
                  <p className="text-sm text-slate-500">Recevoir les alertes par SMS</p>
                </div>
                <Switch checked={settings.smsNotifications} onCheckedChange={(v) => setSettings({ ...settings, smsNotifications: v })} />
              </div>
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="security">
          <GlassCard className="p-4 mt-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg border border-white/20">
                <div>
                  <p className="font-medium">Authentification à deux facteurs</p>
                  <p className="text-sm text-slate-500">Sécurité renforcée pour les comptes admin</p>
                </div>
                <Switch checked={settings.twoFactorAuth} onCheckedChange={(v) => setSettings({ ...settings, twoFactorAuth: v })} />
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg border border-white/20">
                <div>
                  <p className="font-medium text-yellow-500">Mode maintenance</p>
                  <p className="text-sm text-slate-500">Rendre le site inaccessible aux utilisateurs</p>
                </div>
                <Switch checked={settings.maintenanceMode} onCheckedChange={(v) => setSettings({ ...settings, maintenanceMode: v })} />
              </div>
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="appearance">
          <GlassCard className="p-4 mt-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg border border-white/20">
                <div>
                  <p className="font-medium">Mode sombre par défaut</p>
                  <p className="text-sm text-slate-500">Thème sombre pour l'application</p>
                </div>
                <Switch checked={settings.darkMode} onCheckedChange={(v) => setSettings({ ...settings, darkMode: v })} />
              </div>
            </div>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </div>
  )
}