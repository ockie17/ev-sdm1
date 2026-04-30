'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogOut, Settings, Home, Database, BarChart3, FileText, Bell, Menu, X, ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface AppHeaderProps {
  userEmail?: string
  onLogout?: () => void
}

export function AppHeader({ userEmail, onLogout }: AppHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: '/dashboard', icon: Home, label: 'Overview' },
    { href: '/datasets', icon: Database, label: 'Datasets' },
    { href: '/dashboards', icon: BarChart3, label: 'Dashboards' },
    { href: '/reports', icon: FileText, label: 'Reports' },
    { href: '/alerts', icon: Bell, label: 'Alerts' },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[hsl(270,100%,65%)] to-[hsl(280,100%,55%)] flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-foreground hidden sm:inline">DataViz</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  isActive(item.href)
                    ? 'bg-[hsla(270,100%,65%,0.15)] text-[hsl(270,100%,65%)] border border-[hsla(270,100%,65%,0.3)]'
                    : 'text-muted-foreground hover:text-foreground hover:bg-[hsla(0,0%,100%,0.05)]'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* User dropdown */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[hsla(0,0%,100%,0.03)] border border-[hsla(0,0%,100%,0.06)]">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[hsl(270,100%,65%)] to-[hsl(280,100%,55%)] flex items-center justify-center text-xs text-white font-medium">
                {userEmail?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="text-sm text-foreground truncate max-w-[120px]">
                {userEmail?.split('@')[0]}
              </span>
              <ChevronDown className="w-3 h-3 text-muted-foreground" />
            </div>
            
            <Link
              href="/settings"
              className={`p-2 rounded-lg transition-colors ${
                isActive('/settings')
                  ? 'bg-[hsla(270,100%,65%,0.15)] text-[hsl(270,100%,65%)]'
                  : 'text-muted-foreground hover:text-foreground hover:bg-[hsla(0,0%,100%,0.05)]'
              }`}
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </Link>

            <button
              onClick={onLogout}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-[hsla(0,0%,100%,0.05)] rounded-lg transition-colors hidden sm:block"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 hover:bg-[hsla(0,0%,100%,0.05)] rounded-lg transition-colors"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-2.5 rounded-lg transition-colors flex items-center gap-3 ${
                  isActive(item.href)
                    ? 'bg-[hsla(270,100%,65%,0.15)] text-[hsl(270,100%,65%)]'
                    : 'text-foreground hover:bg-[hsla(0,0%,100%,0.05)]'
                }`}
                onClick={() => setMenuOpen(false)}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
            <Link
              href="/settings"
              className="block px-4 py-2.5 text-foreground rounded-lg hover:bg-[hsla(0,0%,100%,0.05)] transition-colors flex items-center gap-3"
              onClick={() => setMenuOpen(false)}
            >
              <Settings className="w-4 h-4" />
              Settings
            </Link>
            <button
              onClick={() => {
                onLogout?.()
                setMenuOpen(false)
              }}
              className="w-full text-left px-4 py-2.5 text-muted-foreground rounded-lg hover:bg-[hsla(0,0%,100%,0.05)] transition-colors flex items-center gap-3"
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
