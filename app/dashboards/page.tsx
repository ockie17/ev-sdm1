'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AppHeader } from '@/components/app-header'
import { LineChartComponent, AreaChartComponent, BarChartComponent, PieChartComponent } from '@/components/charts'
import { BarChart3, Plus } from 'lucide-react'

export default function DashboardsPage() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [dashboards, setDashboards] = useState<any[]>([])
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

  // Sample data for preview
  const sampleLineData = [
    { date: 'Jan 1', value: 400 },
    { date: 'Jan 2', value: 520 },
    { date: 'Jan 3', value: 480 },
    { date: 'Jan 4', value: 650 },
    { date: 'Jan 5', value: 720 },
  ]

  const sampleBarData = [
    { name: 'Product A', sales: 2400 },
    { name: 'Product B', sales: 1398 },
    { name: 'Product C', sales: 9800 },
    { name: 'Product D', sales: 3908 },
  ]

  const samplePieData = [
    { name: 'Desktop', value: 400 },
    { name: 'Mobile', value: 300 },
    { name: 'Tablet', value: 200 },
  ]

  if (loading) return null

  return (
    <div className="min-h-screen bg-background">
      <AppHeader userEmail={user?.email} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Dashboards</h1>
            <p className="text-muted-foreground mt-1">Create and manage your analytics dashboards</p>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            New Dashboard
          </button>
        </div>

        {dashboards.length === 0 ? (
          <div>
            {/* Empty State with Chart Preview */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Chart Types Available</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <LineChartComponent 
                  data={sampleLineData} 
                  title="Line Chart" 
                  dataKey="value"
                  description="Visualize trends over time"
                />
                <AreaChartComponent 
                  data={sampleLineData} 
                  title="Area Chart" 
                  dataKey="value"
                  description="Filled area for emphasis"
                />
                <BarChartComponent 
                  data={sampleBarData} 
                  title="Bar Chart" 
                  dataKey="sales"
                  description="Compare values across categories"
                />
                <PieChartComponent 
                  data={samplePieData} 
                  title="Pie Chart" 
                  nameKey="name"
                  valueKey="value"
                  description="Show proportions and percentages"
                />
              </div>
            </div>

            {/* Create First Dashboard CTA */}
            <div className="chart-card border-2 border-dashed border-border p-12 text-center">
              <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-foreground mb-2">No dashboards yet</h2>
              <p className="text-muted-foreground mb-6">Create your first dashboard to visualize your data with interactive charts</p>
              <button className="btn-primary">Create Dashboard</button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            {dashboards.map((dashboard) => (
              <div key={dashboard.dashboard_id} className="chart-card hover:border-primary transition-colors cursor-pointer">
                <h3 className="text-lg font-semibold text-foreground mb-2">{dashboard.name}</h3>
                <p className="text-muted-foreground mb-4">Created {new Date(dashboard.created_at).toLocaleDateString()}</p>
                <button className="btn-secondary">View Dashboard</button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
