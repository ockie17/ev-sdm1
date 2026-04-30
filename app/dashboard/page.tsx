'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Plus, BarChart3, Database, FileText, Bell, TrendingUp, Activity, Users, ArrowUpRight, Loader2 } from 'lucide-react'
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
      <div className="min-h-screen bg-background grid-bg flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[hsl(270,100%,65%)] mx-auto mb-4 animate-spin" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background grid-bg">
      <AppHeader userEmail={user?.email} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.email?.split('@')[0]}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Datasets', value: '0', change: '+0%', icon: Database, color: 'hsl(270,100%,65%)' },
            { label: 'Dashboards', value: '0', change: '+0%', icon: BarChart3, color: 'hsl(150,100%,50%)' },
            { label: 'Reports', value: '0', change: '+0%', icon: FileText, color: 'hsl(45,100%,60%)' },
            { label: 'Alerts', value: '0', change: '0 active', icon: Bell, color: 'hsl(330,100%,65%)' },
          ].map((stat) => (
            <div key={stat.label} className="metric-card group hover:border-[hsla(270,100%,65%,0.3)] transition-all">
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: `${stat.color}20` }}
                >
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <span className="text-xs text-muted-foreground">{stat.change}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Activity Chart Placeholder */}
          <div className="lg:col-span-2 glass-card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Activity Overview</h3>
                <p className="text-sm text-muted-foreground">Your data activity over time</p>
              </div>
              <select className="input-futuristic w-auto text-sm py-1.5 px-3">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            <div className="h-64 flex items-center justify-center border border-dashed border-border rounded-lg">
              <div className="text-center">
                <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Upload data to see activity</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass-card">
            <h3 className="text-lg font-semibold text-foreground mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <Link 
                href="/datasets"
                className="flex items-center gap-4 p-4 rounded-lg bg-[hsla(0,0%,100%,0.02)] hover:bg-[hsla(270,100%,65%,0.1)] border border-transparent hover:border-[hsla(270,100%,65%,0.3)] transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-[hsla(270,100%,65%,0.15)] flex items-center justify-center">
                  <Plus className="w-5 h-5 text-[hsl(270,100%,65%)]" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">Upload Dataset</p>
                  <p className="text-sm text-muted-foreground">Import CSV or JSON</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-[hsl(270,100%,65%)] transition-colors" />
              </Link>

              <Link 
                href="/dashboards"
                className="flex items-center gap-4 p-4 rounded-lg bg-[hsla(0,0%,100%,0.02)] hover:bg-[hsla(150,100%,50%,0.1)] border border-transparent hover:border-[hsla(150,100%,50%,0.3)] transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-[hsla(150,100%,50%,0.15)] flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-[hsl(150,100%,50%)]" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">New Dashboard</p>
                  <p className="text-sm text-muted-foreground">Create visualizations</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-[hsl(150,100%,50%)] transition-colors" />
              </Link>

              <Link 
                href="/alerts"
                className="flex items-center gap-4 p-4 rounded-lg bg-[hsla(0,0%,100%,0.02)] hover:bg-[hsla(45,100%,60%,0.1)] border border-transparent hover:border-[hsla(45,100%,60%,0.3)] transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-[hsla(45,100%,60%,0.15)] flex items-center justify-center">
                  <Bell className="w-5 h-5 text-[hsl(45,100%,60%)]" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">Set Alert</p>
                  <p className="text-sm text-muted-foreground">Monitor metrics</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-[hsl(45,100%,60%)] transition-colors" />
              </Link>
            </div>
          </div>
        </div>

        {/* Getting Started & Recent */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Getting Started */}
          <div className="glass-card">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-[hsl(270,100%,65%)]" />
              <h3 className="text-lg font-semibold text-foreground">Getting Started</h3>
            </div>
            <div className="space-y-4">
              {[
                { step: 1, title: 'Upload your first dataset', desc: 'Import CSV or JSON files', done: false },
                { step: 2, title: 'Create a dashboard', desc: 'Build charts from your data', done: false },
                { step: 3, title: 'Set up alerts', desc: 'Get notified on metric changes', done: false },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    item.done 
                      ? 'bg-[hsl(150,100%,50%)] text-black' 
                      : 'bg-[hsla(270,100%,65%,0.2)] text-[hsl(270,100%,65%)]'
                  }`}>
                    <span className="text-sm font-bold">{item.step}</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Activity */}
          <div className="glass-card">
            <div className="flex items-center gap-2 mb-6">
              <Users className="w-5 h-5 text-[hsl(150,100%,50%)]" />
              <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
            </div>
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <div className="w-16 h-16 rounded-full bg-[hsla(0,0%,100%,0.03)] flex items-center justify-center mb-4">
                <Activity className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground mb-2">No activity yet</p>
              <p className="text-sm text-muted-foreground">Start by uploading a dataset</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
