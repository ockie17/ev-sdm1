'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AppHeader } from '@/components/app-header'
import { AlertManager } from '@/components/alert-manager'

interface Alert {
  id: string
  metricName: string
  threshold: number
  condition: 'greater_than' | 'less_than'
  emails: string[]
  isActive: boolean
  lastTriggered?: string
}

export default function AlertsPage() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [alerts, setAlerts] = useState<Alert[]>([])
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/login')
      } else {
        setUser(user)
      }
      setLoading(false)
    }
    checkAuth()
  }, [router, supabase.auth])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const handleAddAlert = (newAlert: Alert) => {
    setAlerts([...alerts, newAlert])
    // TODO: Save to database
  }

  const handleDeleteAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id))
    // TODO: Delete from database
  }

  if (loading) return null

  return (
    <div className="min-h-screen bg-background">
      <AppHeader userEmail={user?.email} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">Alerts</h1>
          <p className="text-muted-foreground mt-1">Monitor your metrics and get notified when thresholds are exceeded</p>
        </div>

        <AlertManager 
          alerts={alerts}
          onAddAlert={handleAddAlert}
          onDeleteAlert={handleDeleteAlert}
        />
      </main>
    </div>
  )
}
