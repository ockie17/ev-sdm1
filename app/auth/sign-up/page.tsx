'use client'

import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BarChart3, Loader2, CheckCircle2 } from 'lucide-react'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (password !== repeatPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) throw error
      router.push('/auth/sign-up-success')
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background grid-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[hsl(270,100%,65%)] rounded-full blur-[128px] opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[hsl(150,100%,50%)] rounded-full blur-[128px] opacity-10 pointer-events-none" />
      
      <div className="w-full max-w-md relative">
        <div className="glass-card p-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[hsl(270,100%,65%)] to-[hsl(280,100%,55%)] flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">OQviz</span>
          </Link>

          <h1 className="text-2xl font-bold text-foreground mb-2">Create your account</h1>
          <p className="text-muted-foreground mb-8">Start your free trial today</p>

          {/* Benefits */}
          <div className="flex flex-wrap gap-3 mb-8">
            {['14-day free trial', 'No credit card required', 'Cancel anytime'].map((benefit) => (
              <div key={benefit} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CheckCircle2 className="w-3.5 h-3.5 text-[hsl(150,100%,50%)]" />
                {benefit}
              </div>
            ))}
          </div>

          <form onSubmit={handleSignUp} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-futuristic"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Create a strong password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-futuristic"
              />
            </div>

            <div>
              <label htmlFor="repeat-password" className="block text-sm font-medium text-foreground mb-2">
                Confirm password
              </label>
              <input
                id="repeat-password"
                type="password"
                placeholder="Repeat your password"
                required
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                className="input-futuristic"
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-[hsla(0,85%,60%,0.1)] border border-[hsla(0,85%,60%,0.3)] text-[hsl(0,85%,65%)] text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-2.5"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create account'
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-[hsl(270,100%,65%)] hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
