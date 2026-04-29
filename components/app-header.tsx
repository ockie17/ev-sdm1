'use client'

import Link from 'next/link'
import { LogOut, Settings, Home, Database, BarChart3, FileText, Bell, Menu, X } from 'lucide-react'
import { useState } from 'react'

interface AppHeaderProps {
  userEmail?: string
  onLogout?: () => void
}

export function AppHeader({ userEmail, onLogout }: AppHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { href: '/dashboard', icon: Home, label: 'Dashboard' },
    { href: '/datasets', icon: Database, label: 'Datasets' },
    { href: '/dashboards', icon: BarChart3, label: 'Dashboards' },
    { href: '/reports', icon: FileText, label: 'Reports' },
    { href: '/alerts', icon: Bell, label: 'Alerts' },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <BarChart3 className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-foreground hidden md:inline">DataViz</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:bg-border/50 transition-colors flex items-center gap-2"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline truncate max-w-[200px]">{userEmail}</span>
            
            <Link
              href="/settings"
              className="p-2 text-muted-foreground hover:text-primary hover:bg-border/50 rounded-lg transition-colors"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </Link>

            <button
              onClick={onLogout}
              className="p-2 text-muted-foreground hover:text-primary hover:bg-border/50 rounded-lg transition-colors hidden sm:block"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 hover:bg-border/50 rounded-lg transition-colors"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-border space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-foreground font-medium rounded-lg hover:bg-border/50 transition-colors flex items-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => {
                onLogout?.()
                setMenuOpen(false)
              }}
              className="w-full text-left px-4 py-2 text-muted-foreground rounded-lg hover:bg-border/50 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
