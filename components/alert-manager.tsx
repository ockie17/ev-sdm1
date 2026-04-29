'use client'

import { useState } from 'react'
import { Bell, Plus, Trash2, AlertCircle, CheckCircle2 } from 'lucide-react'

interface Alert {
  id: string
  metricName: string
  threshold: number
  condition: 'greater_than' | 'less_than'
  emails: string[]
  isActive: boolean
  lastTriggered?: string
}

interface AlertManagerProps {
  onAddAlert?: (alert: Alert) => void
  onDeleteAlert?: (id: string) => void
  alerts?: Alert[]
}

export function AlertManager({ onAddAlert, onDeleteAlert, alerts = [] }: AlertManagerProps) {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    metricName: '',
    threshold: '',
    condition: 'greater_than' as 'greater_than' | 'less_than',
    emails: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.metricName || !formData.threshold || !formData.emails) {
      alert('Please fill in all fields')
      return
    }

    const newAlert: Alert = {
      id: Math.random().toString(),
      metricName: formData.metricName,
      threshold: parseFloat(formData.threshold),
      condition: formData.condition,
      emails: formData.emails.split(',').map(e => e.trim()),
      isActive: true,
    }

    onAddAlert?.(newAlert)
    setFormData({
      metricName: '',
      threshold: '',
      condition: 'greater_than',
      emails: '',
    })
    setShowForm(false)
  }

  return (
    <div className="space-y-6">
      {/* Add Alert Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="btn-primary flex items-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Create Alert
      </button>

      {/* Add Alert Form */}
      {showForm && (
        <div className="chart-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">Create New Alert</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Metric Name
              </label>
              <input
                type="text"
                placeholder="e.g., CPU Usage, Response Time"
                value={formData.metricName}
                onChange={(e) => setFormData({ ...formData, metricName: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Condition
                </label>
                <select
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value as 'greater_than' | 'less_than' })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="greater_than">Greater Than</option>
                  <option value="less_than">Less Than</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Threshold Value
                </label>
                <input
                  type="number"
                  placeholder="e.g., 80"
                  value={formData.threshold}
                  onChange={(e) => setFormData({ ...formData, threshold: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Notification Emails (comma-separated)
              </label>
              <input
                type="text"
                placeholder="user@example.com, team@example.com"
                value={formData.emails}
                onChange={(e) => setFormData({ ...formData, emails: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button type="submit" className="btn-primary flex-1">
                Create Alert
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Alerts List */}
      {alerts.length === 0 ? (
        <div className="chart-card border-2 border-dashed border-border text-center p-8">
          <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No alerts created yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className="chart-card flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-foreground">{alert.metricName}</h3>
                  {alert.isActive ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <p className="text-muted-foreground text-sm mb-3">
                  Triggers when metric is <span className="font-medium">{alert.condition === 'greater_than' ? '>' : '<'} {alert.threshold}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {alert.emails.map((email) => (
                    <span key={email} className="px-2 py-1 rounded-full bg-border text-xs text-foreground">
                      {email}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => onDeleteAlert?.(alert.id)}
                className="p-2 text-muted-foreground hover:text-red-500 hover:bg-border/50 rounded-lg transition-colors flex-shrink-0"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
