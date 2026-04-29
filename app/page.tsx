'use client'

import Link from 'next/link'
import { CheckCircle2, BarChart3, Zap } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-foreground">DataViz</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/auth/login" className="text-foreground hover:text-primary transition-colors">
                Login
              </Link>
              <Link href="/auth/sign-up" className="btn-primary">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-balance mb-6 text-foreground">
              Real-time Analytics for Your Team
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Import data, visualize metrics, generate reports, and set alerts all in one place. Designed for small teams who move fast.
            </p>
            <div className="flex gap-4">
              <Link href="/auth/sign-up" className="btn-primary text-lg px-8 py-3">
                Start Free
              </Link>
              <button className="btn-secondary text-lg px-8 py-3">
                View Demo
              </button>
            </div>
          </div>
          <div className="bg-card rounded-lg border border-border p-8 h-96 flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-24 h-24 text-primary/50 mx-auto mb-4" />
              <p className="text-muted-foreground">Dashboard Preview</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Powerful Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Data Visualization',
              description: 'Create stunning charts and dashboards with real-time data updates',
              icon: BarChart3,
            },
            {
              title: 'Easy Data Import',
              description: 'Upload CSV and JSON files. We handle the parsing and mapping.',
              icon: Zap,
            },
            {
              title: 'Reports & Alerts',
              description: 'Generate automated reports and get notified when metrics cross thresholds',
              icon: CheckCircle2,
            },
          ].map((feature) => (
            <div key={feature.title} className="chart-card hover:border-primary transition-colors">
              <feature.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Simple Pricing</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: 'Free',
              price: '$0',
              description: 'Get started for free',
              features: ['1 dataset', '5 dashboards', 'Basic charts', 'Community support'],
              highlighted: false,
            },
            {
              name: 'Pro',
              price: '$29',
              description: 'For growing teams',
              features: ['Unlimited datasets', 'Unlimited dashboards', 'Advanced charts', 'Email support', 'Custom alerts'],
              highlighted: true,
            },
            {
              name: 'Team',
              price: '$79',
              description: 'Per user per month',
              features: ['Everything in Pro', 'Team collaboration', 'Role-based access', 'Priority support', 'API access'],
              highlighted: false,
            },
          ].map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg border p-8 transition-all ${
                plan.highlighted
                  ? 'border-primary bg-card scale-105 shadow-xl'
                  : 'border-border bg-card hover:border-primary'
              }`}
            >
              <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
              <p className="text-muted-foreground mb-4">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-primary">{plan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <button className={plan.highlighted ? 'btn-primary w-full mb-6' : 'btn-secondary w-full mb-6'}>
                Choose Plan
              </button>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl font-bold mb-6 text-foreground">Ready to Get Started?</h2>
        <p className="text-xl text-muted-foreground mb-8">Join teams already using DataViz to make sense of their data.</p>
        <Link href="/auth/sign-up" className="btn-primary inline-block text-lg px-8 py-3">
          Create Your Free Account
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; 2026 DataViz. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
