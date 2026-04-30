'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BarChart3, CheckCircle2, Mail, ArrowRight } from 'lucide-react'

export default function SignUpSuccessPage() {
  const router = useRouter()

  const handleContinueToDashboard = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-background grid-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[hsl(150,100%,50%)] rounded-full blur-[128px] opacity-15 pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-[hsl(270,100%,65%)] rounded-full blur-[128px] opacity-15 pointer-events-none" />
      
      <div className="w-full max-w-md relative">
        <div className="glass-card p-8 text-center">
          {/* Success icon */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[hsla(150,100%,50%,0.15)] flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-[hsl(150,100%,50%)]" />
          </div>
          
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Account created successfully
          </h1>
          
          <p className="text-muted-foreground mb-8">
            We&apos;ve sent a confirmation email to your inbox. Please verify your email to get started.
          </p>

          {/* Email reminder */}
          <div className="flex items-center gap-3 p-4 rounded-lg bg-[hsla(0,0%,100%,0.03)] border border-[hsla(0,0%,100%,0.06)] mb-6">
            <div className="w-10 h-10 rounded-lg bg-[hsla(270,100%,65%,0.15)] flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-[hsl(270,100%,65%)]" />
            </div>
            <p className="text-sm text-muted-foreground text-left">
              Check your spam folder if you don&apos;t see our email
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleContinueToDashboard}
              className="btn-primary w-full flex items-center justify-center gap-2 py-2.5 group"
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <Link
              href="/auth/login"
              className="btn-secondary w-full block text-center py-2.5"
            >
              Back to Login
            </Link>
          </div>
        </div>

        {/* Logo at bottom */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-[hsl(270,100%,65%)] to-[hsl(280,100%,55%)] flex items-center justify-center">
            <BarChart3 className="w-3 h-3 text-white" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">OQviz</span>
        </div>
      </div>
    </div>
  )
}
