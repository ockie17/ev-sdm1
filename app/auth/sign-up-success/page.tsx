'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

export default function SignUpSuccessPage() {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleContinueToDashboard = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg border border-border p-8 text-center">
          <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
          
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Account Created!
          </h1>
          
          <p className="text-muted-foreground mb-6">
            Your account has been successfully created. Check your email to confirm your email address, then you can start using DataViz.
          </p>

          <div className="space-y-3">
            <button
              onClick={handleContinueToDashboard}
              className="w-full px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
            >
              Go to Dashboard
            </button>
            
            <Link
              href="/auth/login"
              className="block px-4 py-2 rounded-lg border border-border text-foreground hover:bg-border/50 font-medium transition-colors"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
