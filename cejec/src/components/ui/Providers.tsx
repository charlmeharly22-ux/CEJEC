// src/components/ui/Providers.tsx
'use client'

import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'var(--color-surface)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
            },
            success: {
              iconTheme: { primary: '#1a2980', secondary: '#fff' },
            },
            error: {
              iconTheme: { primary: '#e53e3e', secondary: '#fff' },
            },
          }}
        />
      </ThemeProvider>
    </SessionProvider>
  )
}
