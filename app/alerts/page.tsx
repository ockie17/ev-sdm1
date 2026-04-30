'use client'

import { useState } from 'react'
import { AppHeader } from '@/components/app-header'
import { AlertManager } from '@/components/alert-manager'
import { Bell } from 'lucide-react'

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
  const [alerts, setAlerts] = useState<Alert[]>([])

  const handleAddAlert = (newAlert: Alert) => {
    setAlerts([...alerts, newAlert])
  }

  const handleDeleteAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id))
  }

  const handleLogout = () => {
    // Logout logic
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader userEmail="user@example.com" onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">Alerts</h1>
          <p className="text-muted-foreground mt-1">Monitor your metrics and get notified when thresholds are exceeded</p>
        </div>

        {alerts.length === 0 ? (
          <div className="chart-card border-2 border-dashed border-border p-12 text-center">
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">No alerts set up yet</h2>
            <p className="text-muted-foreground mb-6">Create alerts to get notified of important metric changes</p>
            <button className="btn-primary">Create Alert</button>
          </div>
        ) : (
          <AlertManager 
            alerts={alerts}
            onAddAlert={handleAddAlert}
            onDeleteAlert={handleDeleteAlert}
          />
        )}
      </main>
    </div>
  )
}
