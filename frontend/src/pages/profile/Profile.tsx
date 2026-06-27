import { useState } from 'react'
import { User, Mail, Shield, Bell, Activity } from 'lucide-react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { MyAccount } from './MyAccount'
import { MyActivities } from './MyActivities'
import { NotificationsSettings } from './NotificationsSettings'
import { useAuthStore } from '@/stores/authStore'

export default function Profile() {
  const { user } = useAuthStore()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
            Mon profil
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Gérez vos informations personnelles
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <GlassCard className="p-4 lg:col-span-1">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-medical-primary/20 flex items-center justify-center mb-4">
              <span className="text-3xl font-bold text-medical-primary">
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
              </span>
            </div>
            <h2 className="text-xl font-bold">{user?.firstName} {user?.lastName}</h2>
            <p className="text-sm text-slate-500">{user?.role}</p>
            <p className="text-sm text-slate-500 mt-1">{user?.email}</p>
          </div>
        </GlassCard>

        <GlassCard className="p-4 lg:col-span-3">
          <Tabs defaultValue="account">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="account">Mon compte</TabsTrigger>
              <TabsTrigger value="activities">Mes activités</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            
            <TabsContent value="account">
              <MyAccount />
            </TabsContent>
            
            <TabsContent value="activities">
              <MyActivities />
            </TabsContent>
            
            <TabsContent value="notifications">
              <NotificationsSettings />
            </TabsContent>
          </Tabs>
        </GlassCard>
      </div>
    </div>
  )
}