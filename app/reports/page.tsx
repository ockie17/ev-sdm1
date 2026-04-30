'use client'

import { AppHeader } from '@/components/app-header'
import { Plus, FileText } from 'lucide-react'

export default function ReportsPage() {
  const handleLogout = () => {
    // Logout logic
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader userEmail="user@example.com" onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Reports</h1>
            <p className="text-muted-foreground mt-1">Generate and manage reports from your dashboards</p>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Generate Report
          </button>
        </div>

        <div className="chart-card border-2 border-dashed border-border p-12 text-center">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-foreground mb-2">No reports yet</h2>
          <p className="text-muted-foreground mb-6">Generate your first report from a dashboard</p>
          <button className="btn-primary">Generate Report</button>
        </div>
      </main>
    </div>
  )
}
