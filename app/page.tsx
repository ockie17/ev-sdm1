'use client'

import Link from 'next/link'
import { CheckCircle2, BarChart3, Database, Bell, Users, ArrowRight, Sparkles } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background grid-bg">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[hsl(270,100%,65%)] to-[hsl(280,100%,55%)] flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">DataViz</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors text-sm hidden md:block">
                Features
              </Link>
              <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors text-sm hidden md:block">
                Pricing
              </Link>
              <Link href="/auth/login" className="text-foreground hover:text-[hsl(270,100%,65%)] transition-colors text-sm">
                Login
              </Link>
              <Link href="/auth/sign-up" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[hsl(270,100%,65%)] rounded-full blur-[128px] opacity-20 pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-[hsl(150,100%,50%)] rounded-full blur-[128px] opacity-10 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsla(270,100%,65%,0.1)] border border-[hsla(270,100%,65%,0.3)] mb-8">
              <Sparkles className="w-4 h-4 text-[hsl(270,100%,65%)]" />
              <span className="text-sm text-[hsl(270,100%,75%)]">Now with real-time collaboration</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-balance mb-6 text-foreground leading-tight">
              Analytics that move at the
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(270,100%,65%)] to-[hsl(150,100%,50%)]"> speed of thought</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Import data, visualize metrics, generate reports, and set intelligent alerts. Built for teams who demand clarity and speed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/sign-up" className="btn-primary text-base px-8 py-3 inline-flex items-center justify-center gap-2 group">
                Start Free Trial
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/dashboard" className="btn-secondary text-base px-8 py-3 inline-flex items-center justify-center gap-2">
                View Demo
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto">
              {[
                { value: '10K+', label: 'Active Users' },
                { value: '50M+', label: 'Data Points' },
                { value: '99.9%', label: 'Uptime' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl md:text-4xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Everything you need</h2>
          <p className="text-muted-foreground text-lg">Powerful features to transform your data into actionable insights</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          {/* Large feature card */}
          <div className="md:col-span-2 glass-card p-8">
            <Database className="w-10 h-10 text-[hsl(270,100%,65%)] mb-6" />
            <h3 className="text-2xl font-semibold mb-3 text-foreground">Data Import & Storage</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Upload CSV and JSON files with automatic schema detection. We handle parsing, validation, and storage so you can focus on insights.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="metric-card">
                <div className="text-2xl font-bold text-foreground">CSV</div>
                <div className="text-sm text-muted-foreground">Auto-detect columns</div>
              </div>
              <div className="metric-card">
                <div className="text-2xl font-bold text-foreground">JSON</div>
                <div className="text-sm text-muted-foreground">Nested support</div>
              </div>
            </div>
          </div>

          {/* Small feature card */}
          <div className="glass-card p-8">
            <BarChart3 className="w-10 h-10 text-[hsl(150,100%,50%)] mb-6" />
            <h3 className="text-xl font-semibold mb-3 text-foreground">Real-time Charts</h3>
            <p className="text-muted-foreground leading-relaxed">
              Line, bar, area, and pie charts that update in real-time as your data changes.
            </p>
          </div>

          {/* Small feature card */}
          <div className="glass-card p-8">
            <Bell className="w-10 h-10 text-[hsl(45,100%,60%)] mb-6" />
            <h3 className="text-xl font-semibold mb-3 text-foreground">Smart Alerts</h3>
            <p className="text-muted-foreground leading-relaxed">
              Set threshold-based alerts and get notified via email when metrics need attention.
            </p>
          </div>

          {/* Large feature card */}
          <div className="md:col-span-2 glass-card p-8">
            <Users className="w-10 h-10 text-[hsl(330,100%,65%)] mb-6" />
            <h3 className="text-2xl font-semibold mb-3 text-foreground">Team Collaboration</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Invite your team, assign roles, and collaborate on dashboards in real-time. Everyone stays in sync with shared views and permissions.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-[hsl(270,100%,65%)] to-[hsl(280,100%,55%)] border-2 border-background flex items-center justify-center text-xs text-white font-medium">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">+2,400 teams using DataViz</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Simple, transparent pricing</h2>
          <p className="text-muted-foreground text-lg">Start free, scale as you grow</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: 'Free',
              price: '$0',
              description: 'Perfect for getting started',
              features: ['1 dataset', '5 dashboards', 'Basic charts', '7-day data retention', 'Community support'],
              highlighted: false,
            },
            {
              name: 'Pro',
              price: '$29',
              description: 'For growing teams',
              features: ['Unlimited datasets', 'Unlimited dashboards', 'All chart types', 'Unlimited retention', 'Custom alerts', 'Priority support'],
              highlighted: true,
            },
            {
              name: 'Team',
              price: '$79',
              description: 'Per user per month',
              features: ['Everything in Pro', 'Team collaboration', 'Role-based access', 'SSO & SAML', 'API access', 'Dedicated support'],
              highlighted: false,
            },
          ].map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl p-8 transition-all relative ${
                plan.highlighted
                  ? 'bg-gradient-to-b from-[hsla(270,100%,65%,0.1)] to-transparent border-2 border-[hsla(270,100%,65%,0.5)]'
                  : 'glass-card'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="badge">Most Popular</span>
                </div>
              )}
              <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
              <p className="text-muted-foreground mb-6 text-sm">{plan.description}</p>
              <div className="mb-8">
                <span className="text-5xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <button className={`w-full mb-8 ${plan.highlighted ? 'btn-primary' : 'btn-secondary'}`}>
                {plan.price === '$0' ? 'Get Started' : 'Start Trial'}
              </button>
              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-[hsl(150,100%,50%)] flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="glass-card p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[hsl(270,100%,65%)] rounded-full blur-[128px] opacity-20 pointer-events-none" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground relative">Ready to transform your data?</h2>
          <p className="text-xl text-muted-foreground mb-8 relative">Join thousands of teams already using DataViz</p>
          <Link href="/auth/sign-up" className="btn-primary inline-flex items-center gap-2 text-base px-8 py-3 relative group">
            Start Your Free Trial
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[hsl(270,100%,65%)] to-[hsl(280,100%,55%)] flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-foreground">DataViz</span>
            </div>
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Documentation</Link>
            </div>
            <p className="text-sm text-muted-foreground">2026 DataViz. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
