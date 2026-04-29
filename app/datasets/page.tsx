'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AppHeader } from '@/components/app-header'
import { FileUploadArea } from '@/components/file-upload-area'
import { BarChart3, Loader2 } from 'lucide-react'

export default function DatasetsPage() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [datasets, setDatasets] = useState<any[]>([])
  const [uploading, setUploading] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
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

  const handleFileSelect = async (file: File) => {
    setUploading(true)
    try {
      const fileName = `${Date.now()}-${file.name}`
      
      const { error: uploadError } = await supabase.storage
        .from('datasets')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      // Parse file content
      const content = await file.text()
      let parsedData = []
      
      if (file.name.endsWith('.csv')) {
        parsedData = parseCSV(content)
      } else if (file.name.endsWith('.json')) {
        parsedData = JSON.parse(content)
      }

      // Create dataset record
      const { data: datasetRecord, error: dbError } = await supabase
        .from('datasets')
        .insert([
          {
            name: file.name.replace(/\.[^/.]+$/, ''),
            description: `Uploaded on ${new Date().toLocaleString()}`,
            file_path: fileName,
            data_type: file.name.endsWith('.csv') ? 'csv' : 'json',
            row_count: Array.isArray(parsedData) ? parsedData.length : 0,
            created_by: user.id,
          },
        ])
        .select()

      if (dbError) throw dbError

      setDatasets([...datasets, datasetRecord[0]])
      setShowUploadModal(false)
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload dataset')
    } finally {
      setUploading(false)
    }
  }

  const parseCSV = (content: string): any[] => {
    const lines = content.trim().split('\n')
    if (lines.length === 0) return []

    const headers = lines[0].split(',').map(h => h.trim())
    const data = lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim())
      const obj: any = {}
      headers.forEach((header, i) => {
        obj[header] = values[i] || null
      })
      return obj
    })

    return data
  }

  if (loading) return null

  return (
    <div className="min-h-screen bg-background">
      <AppHeader userEmail={user?.email} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Datasets</h1>
            <p className="text-muted-foreground mt-1">Manage your data files and metrics</p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <BarChart3 className="w-5 h-5" />
            Upload Dataset
          </button>
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-card rounded-lg border border-border max-w-2xl w-full p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Upload a Dataset</h2>
              <FileUploadArea onFileSelect={handleFileSelect} />
              {uploading && (
                <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Uploading...</span>
                </div>
              )}
              <button
                onClick={() => setShowUploadModal(false)}
                disabled={uploading}
                className="mt-6 w-full px-4 py-2 rounded-lg border border-border text-foreground hover:bg-border/50 transition-colors disabled:opacity-50"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Datasets List */}
        {datasets.length === 0 ? (
          <div className="chart-card border-2 border-dashed border-border p-12 text-center">
            <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">No datasets yet</h2>
            <p className="text-muted-foreground mb-6">Upload your first CSV or JSON file to get started</p>
            <button
              onClick={() => setShowUploadModal(true)}
              className="btn-primary"
            >
              Upload File
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {datasets.map((dataset) => (
              <div key={dataset.dataset_id} className="chart-card hover:border-primary transition-colors cursor-pointer">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{dataset.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{dataset.description}</p>
                    <div className="flex gap-4 mt-4 text-sm text-muted-foreground">
                      <span>{dataset.row_count} rows</span>
                      <span>{dataset.data_type.toUpperCase()}</span>
                      <span>{new Date(dataset.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <button className="btn-secondary">View</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
