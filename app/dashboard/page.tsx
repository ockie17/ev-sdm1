'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Plus, BarChart3 } from 'lucide-react'
import { AppHeader } from '@/components/app-header'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/login')
      } else {
        setUser(user)
      }
      setLoading(false)
    }
    getUser()
  }, [router, supabase.auth])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader userEmail={user?.email} onLogout={handleLogout} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Welcome back!</h1>
          <p className="text-muted-foreground">Your analytics dashboard is ready to use.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Datasets', value: '0', icon: '📊' },
            { label: 'Dashboards', value: '0', icon: '📈' },
            { label: 'Reports', value: '0', icon: '📋' },
            { label: 'Alerts', value: '0', icon: '🔔' },
          ].map((stat) => (
            <div key={stat.label} className="chart-card">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="chart-card hover:border-primary transition-all cursor-pointer group">
            <div className="flex items-center gap-4 mb-4">
              <Plus className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-foreground">Upload Dataset</h3>
            </div>
            <p className="text-muted-foreground mb-4">Import CSV or JSON files to start analyzing</p>
            <button className="btn-secondary w-full">Get Started</button>
          </div>

          <div className="chart-card hover:border-primary transition-all cursor-pointer group">
            <div className="flex items-center gap-4 mb-4">
              <BarChart3 className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-foreground">Create Dashboard</h3>
            </div>
            <p className="text-muted-foreground mb-4">Build visualizations with your data</p>
            <button className="btn-secondary w-full">Get Started</button>
          </div>
        </div>

        {/* Getting Started */}
        <div className="mt-12 p-8 bg-card rounded-lg border border-border">
          <h2 className="text-2xl font-bold text-foreground mb-4">Getting Started</h2>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</span>
              <div>
                <p className="font-semibold text-foreground">Upload your first dataset</p>
                <p className="text-muted-foreground">Go to Datasets and upload a CSV or JSON file</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</span>
              <div>
                <p className="font-semibold text-foreground">Create a dashboard</p>
                <p className="text-muted-foreground">Build charts and visualizations from your data</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</span>
              <div>
                <p className="font-semibold text-foreground">Set up alerts</p>
                <p className="text-muted-foreground">Get notified when metrics cross thresholds</p>
              </div>
            </li>
          </ol>
        </div>
      </main>
    </div>
  )
}
