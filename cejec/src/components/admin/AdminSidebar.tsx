// src/components/admin/AdminSidebar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import {
  LayoutDashboard, FileText, Users, Image,
  Mail, GraduationCap, LogOut, GraduationCap as Logo,
  BarChart3, Settings, Newspaper
} from 'lucide-react'

const navItems = [
  { label: 'Tableau de bord', icon: LayoutDashboard, href: '/admin' },
  { label: 'Publications', icon: Newspaper, href: '/admin/posts' },
  { label: 'Candidatures', icon: GraduationCap, href: '/admin/admissions' },
  { label: 'Messages', icon: Mail, href: '/admin/messages' },
  { label: 'Galerie', icon: Image, href: '/admin/gallery' },
  { label: 'Résultats', icon: BarChart3, href: '/admin/results' },
  { label: 'Utilisateurs', icon: Users, href: '/admin/users' },
  { label: 'Paramètres', icon: Settings, href: '/admin/settings' },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col min-h-screen"
      style={{ background: 'var(--color-surface)', borderRight: '1px solid var(--color-border)' }}>
      {/* Logo */}
      <div className="p-6" style={{ borderBottom: '1px solid var(--color-border)' }}>
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #1a2980, #26d0ce)' }}>
            <Logo className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>CEJEC Admin</p>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Tableau de bord</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ label, icon: Icon, href }) => {
          const isActive = pathname === href || (href !== '/admin' && pathname.startsWith(href))
          return (
            <Link key={href} href={href}
              className={`admin-sidebar-link ${isActive ? 'active' : ''}`}>
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* User */}
      <div className="p-4" style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-2"
          style={{ background: 'var(--color-surface-2)' }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #1a2980, #26d0ce)' }}>
            {session?.user?.name?.[0] || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold truncate" style={{ color: 'var(--color-text)' }}>
              {session?.user?.name}
            </p>
            <p className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>
              {(session?.user as any)?.role}
            </p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="admin-sidebar-link w-full text-red-500 hover:text-red-600 hover:bg-red-50">
          <LogOut className="w-4 h-4" />
          Se déconnecter
        </button>
      </div>
    </aside>
  )
}
