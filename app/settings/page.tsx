'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Settings, Users } from 'lucide-react'

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('general')
  const [user, setUser] = useState<any>(null)
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

  if (loading) return null

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-8">Settings</h1>
        
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-4 py-3 font-medium transition-colors border-b-2 ${
              activeTab === 'general'
                ? 'text-primary border-primary'
                : 'text-muted-foreground border-transparent hover:text-foreground'
            }`}
          >
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              General
            </div>
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`px-4 py-3 font-medium transition-colors border-b-2 ${
              activeTab === 'team'
                ? 'text-primary border-primary'
                : 'text-muted-foreground border-transparent hover:text-foreground'
            }`}
          >
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Team
            </div>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'general' && (
          <div className="chart-card">
            <h2 className="text-2xl font-semibold text-foreground mb-6">General Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-4 py-2 rounded-lg bg-border text-muted-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Account Type</label>
                <input
                  type="text"
                  value="Free Plan"
                  disabled
                  className="w-full px-4 py-2 rounded-lg bg-border text-muted-foreground"
                />
              </div>
              <button className="btn-primary mt-6">Save Changes</button>
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="chart-card">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Team Management</h2>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">Create or join a team to collaborate</p>
              <button className="btn-primary">Create Team</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
