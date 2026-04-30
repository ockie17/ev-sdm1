'use client'

import Link from 'next/link'
import { AppHeader } from '@/components/app-header'
import { BarChart3, Database, FileText, Bell } from 'lucide-react'

export default function DashboardPage() {
  const handleLogout = () => {
    // Logout logic
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader userEmail="user@example.com" onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Welcome to OQviz</h1>
          <p className="text-xl text-muted-foreground">Your analytics dashboard is ready to use</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="chart-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Datasets</p>
                <p className="text-3xl font-bold text-foreground">0</p>
              </div>
              <Database className="w-10 h-10 text-purple-500" />
            </div>
          </div>

          <div className="chart-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Active Dashboards</p>
                <p className="text-3xl font-bold text-foreground">0</p>
              </div>
              <BarChart3 className="w-10 h-10 text-blue-500" />
            </div>
          </div>

          <div className="chart-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Reports Generated</p>
                <p className="text-3xl font-bold text-foreground">0</p>
              </div>
              <FileText className="w-10 h-10 text-green-500" />
            </div>
          </div>

          <div className="chart-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Active Alerts</p>
                <p className="text-3xl font-bold text-foreground">0</p>
              </div>
              <Bell className="w-10 h-10 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/datasets" className="chart-card hover:border-primary transition-all hover:shadow-lg cursor-pointer">
              <div className="flex items-center gap-4">
                <Database className="w-12 h-12 text-purple-500" />
                <div>
                  <h3 className="font-semibold text-foreground">Upload Dataset</h3>
                  <p className="text-sm text-muted-foreground">Add CSV or JSON files</p>
                </div>
              </div>
            </Link>

            <Link href="/dashboards" className="chart-card hover:border-primary transition-all hover:shadow-lg cursor-pointer">
              <div className="flex items-center gap-4">
                <BarChart3 className="w-12 h-12 text-blue-500" />
                <div>
                  <h3 className="font-semibold text-foreground">Create Dashboard</h3>
                  <p className="text-sm text-muted-foreground">Visualize your data</p>
                </div>
              </div>
            </Link>

            <Link href="/reports" className="chart-card hover:border-primary transition-all hover:shadow-lg cursor-pointer">
              <div className="flex items-center gap-4">
                <FileText className="w-12 h-12 text-green-500" />
                <div>
                  <h3 className="font-semibold text-foreground">Generate Report</h3>
                  <p className="text-sm text-muted-foreground">Export analytics</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Getting Started */}
        <div className="chart-card border-2 border-dashed border-border/50">
          <h2 className="text-xl font-bold text-foreground mb-4">Getting Started</h2>
          <ol className="space-y-3 text-muted-foreground">
            <li className="flex gap-3">
              <span className="font-bold text-primary">1.</span>
              <span>Upload your first dataset</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary">2.</span>
              <span>Create a dashboard to visualize your data</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary">3.</span>
              <span>Set up alerts for important metrics</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary">4.</span>
              <span>Generate reports and share with your team</span>
            </li>
          </ol>
        </div>
      </main>
    </div>
  )
}
