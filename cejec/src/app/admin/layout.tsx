// src/app/admin/layout.tsx
import type { Metadata } from 'next'
import { AdminGuard } from '@/components/admin/AdminGuard'

export const metadata: Metadata = {
  title: { default: 'Admin', template: '%s | CEJEC Admin' },
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminGuard>{children}</AdminGuard>
}
