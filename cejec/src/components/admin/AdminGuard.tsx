// src/components/admin/AdminGuard.tsx
'use client'

import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { AdminSidebar } from './AdminSidebar'
import { Loader2 } from 'lucide-react'

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status === 'unauthenticated' && pathname !== '/admin/login') {
      router.push('/admin/login')
    }
  }, [status, router, pathname])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: 'var(--color-bg)' }}>
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Chargement...</p>
        </div>
      </div>
    )
  }

  if (pathname === '/admin/login') return <>{children}</>

  if (!session) return null

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--color-bg)' }}>
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
