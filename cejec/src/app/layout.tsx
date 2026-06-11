// src/app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { Providers } from '@/components/ui/Providers'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: {
    default: 'CEJEC — Centre d\'Excellence pour la Jeunesse et l\'Éducation en Haïti',
    template: '%s | CEJEC',
  },
  description: 'CEJEC offre des programmes de licence et de certificat de haute qualité en Haïti. Formation en Administration, Comptabilité, Informatique et plus.',
  keywords: ['CEJEC', 'université Haiti', 'formation Haiti', 'licence Haiti', 'éducation supérieure'],
  authors: [{ name: 'CEJEC' }],
  openGraph: {
    type: 'website',
    locale: 'fr_HT',
    url: 'https://cejec.edu.ht',
    siteName: 'CEJEC',
    title: 'CEJEC — Centre d\'Excellence pour la Jeunesse et l\'Éducation',
    description: 'Rejoignez CEJEC et construisez votre avenir professionnel en Haïti.',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@cejec_ht',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f9ff' },
    { media: '(prefers-color-scheme: dark)', color: '#070a1a' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
