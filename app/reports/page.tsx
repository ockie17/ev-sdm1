'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AppHeader } from '@/components/app-header'
import { FileText, Download, Trash2, Plus, Calendar } from 'lucide-react'

interface Report {
  id: string
  title: string
  generatedAt: string
  generatedBy: string
  filters: Record<string, any>
  format: 'pdf' | 'csv'
}

export default function ReportsPage() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [reports, setReports] = useState<Report[]>([])
  const [showGenerateModal, setShowGenerateModal] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    dashboardId: '',
    format: 'pdf' as 'pdf' | 'csv',
    dateRange: 'last30days' as string,
  })
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

  const handleGenerateReport = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title) {
      alert('Please enter a report title')
      return
    }

    const newReport: Report = {
      id: Math.random().toString(),
      title: formData.title,
      generatedAt: new Date().toLocaleString(),
      generatedBy: user?.email || 'Unknown',
      filters: {
        dateRange: formData.dateRange,
        format: formData.format,
      },
      format: formData.format,
    }

    setReports([newReport, ...reports])
    setFormData({
      title: '',
      dashboardId: '',
      format: 'pdf',
      dateRange: 'last30days',
    })
    setShowGenerateModal(false)
  }

  const handleDownloadReport = (reportId: string) => {
    const report = reports.find(r => r.id === reportId)
    if (report) {
      alert(`Downloading ${report.title}...`)
    }
  }

  const handleDeleteReport = (reportId: string) => {
    setReports(reports.filter(r => r.id !== reportId))
  }

  if (loading) return null

  return (
    <div className="min-h-screen bg-background">
      <AppHeader userEmail={user?.email} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Reports</h1>
            <p className="text-muted-foreground mt-1">Generate and manage reports from your dashboards</p>
          </div>
          <button
            onClick={() => setShowGenerateModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Generate Report
          </button>
        </div>

        {/* Generate Report Modal */}
        {showGenerateModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-card rounded-lg border border-border max-w-lg w-full p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Generate New Report</h2>
              <form onSubmit={handleGenerateReport} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Report Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Monthly Analytics Report"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Date Range
                    </label>
                    <select
                      value={formData.dateRange}
                      onChange={(e) => setFormData({ ...formData, dateRange: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary transition-colors"
                    >
                      <option value="last7days">Last 7 Days</option>
                      <option value="last30days">Last 30 Days</option>
                      <option value="last90days">Last 90 Days</option>
                      <option value="all">All Time</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Format
                    </label>
                    <select
                      value={formData.format}
                      onChange={(e) => setFormData({ ...formData, format: e.target.value as 'pdf' | 'csv' })}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary transition-colors"
                    >
                      <option value="pdf">PDF</option>
                      <option value="csv">CSV</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="submit" className="btn-primary flex-1">
                    Generate Report
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowGenerateModal(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Reports List */}
        {reports.length === 0 ? (
          <div className="chart-card border-2 border-dashed border-border p-12 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">No reports yet</h2>
            <p className="text-muted-foreground mb-6">Generate your first report from a dashboard</p>
            <button
              onClick={() => setShowGenerateModal(true)}
              className="btn-primary"
            >
              Generate Report
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {reports.map((report) => (
              <div key={report.id} className="chart-card hover:border-primary transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{report.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {report.generatedAt}
                      </span>
                      <span>{report.format.toUpperCase()}</span>
                      <span>By {report.generatedBy}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleDownloadReport(report.id)}
                      className="p-2 text-muted-foreground hover:text-primary hover:bg-border/50 rounded-lg transition-colors"
                      title="Download"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteReport(report.id)}
                      className="p-2 text-muted-foreground hover:text-red-500 hover:bg-border/50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
