'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AppHeader } from '@/components/app-header'
import { CreditCard, Check, AlertCircle, Loader2 } from 'lucide-react'

interface Plan {
  id: string
  name: string
  price: number
  description: string
  features: string[]
  priceId?: string
  isCurrentPlan?: boolean
}

export default function BillingPage() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null)
  const [upgrading, setUpgrading] = useState(false)
  const [selectedPlan] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/login')
      } else {
        setUser(user)
        // TODO: Fetch current subscription from database
        setCurrentPlan(plans[0]) // Default to Free plan for demo
      }
      setLoading(false)
    }
    checkAuth()
  }, [router, supabase.auth])

  const plans: Plan[] = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      description: 'Get started for free',
      features: ['1 dataset', '5 dashboards', 'Basic charts', 'Community support'],
      isCurrentPlan: currentPlan?.id === 'free',
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 29,
      description: 'For growing teams',
      features: [
        'Unlimited datasets',
        'Unlimited dashboards',
        'Advanced charts',
        'Email support',
        'Custom alerts',
        'Report generation',
      ],
      priceId: 'price_pro',
      isCurrentPlan: currentPlan?.id === 'pro',
    },
    {
      id: 'team',
      name: 'Team',
      price: 79,
      description: 'Per user per month',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Role-based access',
        'Priority support',
        'API access',
        'Custom integrations',
      ],
      priceId: 'price_team',
      isCurrentPlan: currentPlan?.id === 'team',
    },
  ]

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const handleUpgradePlan = async (plan: Plan) => {
    setUpgrading(true)
    try {
      // TODO: Call Stripe checkout API
      alert(`Redirecting to upgrade to ${plan.name} plan...`)
    } catch (error) {
      console.error('Error upgrading plan:', error)
      alert('Failed to process upgrade')
    } finally {
      setUpgrading(false)
    }
  }

  const handleManageBilling = async () => {
    try {
      // TODO: Redirect to Stripe customer portal
      alert('Redirecting to billing portal...')
    } catch (error) {
      console.error('Error accessing billing portal:', error)
      alert('Failed to access billing portal')
    }
  }

  if (loading) return null

  return (
    <div className="min-h-screen bg-background">
      <AppHeader userEmail={user?.email} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Current Plan Status */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Billing & Subscription</h1>
          <p className="text-muted-foreground">Manage your plan and billing information</p>
        </div>

        {currentPlan && (
          <div className="chart-card mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                  Current Plan: <span className="text-primary">{currentPlan.name}</span>
                </h2>
                <p className="text-muted-foreground">You&apos;re currently on the {currentPlan.name} plan</p>
              </div>
              <button
                onClick={handleManageBilling}
                className="btn-secondary flex items-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Manage Billing
              </button>
            </div>
          </div>
        )}

        {/* Plans Comparison */}
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-8">Choose Your Plan</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-lg border p-8 transition-all ${
                  plan.isCurrentPlan
                    ? 'border-primary bg-card scale-105 shadow-xl ring-2 ring-primary/20'
                    : 'border-border bg-card hover:border-primary'
                }`}
              >
                {plan.isCurrentPlan && (
                  <div className="mb-4 inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    Current Plan
                  </div>
                )}

                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-6">{plan.description}</p>

                <div className="mb-8">
                  <span className="text-5xl font-bold text-primary">${plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>

                <button
                  onClick={() => handleUpgradePlan(plan)}
                  disabled={plan.isCurrentPlan || upgrading}
                  className={`w-full py-2 px-4 rounded-lg font-medium mb-8 transition-colors ${
                    plan.isCurrentPlan
                      ? 'bg-border text-muted-foreground cursor-not-allowed'
                      : plan.id === 'team'
                      ? 'bg-primary text-primary-foreground hover:opacity-90'
                      : 'border border-border text-primary hover:bg-border/50'
                  }`}
                >
                  {upgrading && selectedPlan === plan.id ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </span>
                  ) : plan.isCurrentPlan ? (
                    'Current Plan'
                  ) : (
                    `Upgrade to ${plan.name}`
                  )}
                </button>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-foreground">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Billing Info */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="chart-card">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Method
            </h3>
            <p className="text-muted-foreground mb-4">Visa ending in 4242</p>
            <button className="btn-secondary">Update Payment Method</button>
          </div>

          <div className="chart-card">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Billing Information
            </h3>
            <p className="text-muted-foreground mb-4">Next billing date: March 15, 2026</p>
            <button className="btn-secondary">Download Invoice</button>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-12 p-8 rounded-lg bg-card border border-border text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">Need Help with Billing?</h3>
          <p className="text-muted-foreground mb-6">Contact our support team for questions about your subscription</p>
          <button className="btn-primary">Contact Support</button>
        </div>
      </main>
    </div>
  )
}
