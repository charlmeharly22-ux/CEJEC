// src/components/layout/Navbar.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sun, Moon, Menu, X, ChevronDown,
  GraduationCap, Info, Building2, BookOpen,
  Newspaper, Phone
} from 'lucide-react'

const navItems = [
  {
    label: 'À Propos',
    icon: Info,
    href: '/about',
    children: [
      { label: 'Notre Histoire', href: '/about/histoire' },
      { label: 'Vision & Mission', href: '/about/vision' },
      { label: 'Nos Valeurs', href: '/about/valeurs' },
      { label: 'Nos Services', href: '/about/services' },
      { label: 'Nos Professeurs', href: '/about/professeurs' },
      { label: 'Nos Partenaires', href: '/about/partenaires' },
    ],
  },
  {
    label: 'Gouvernance',
    icon: Building2,
    href: '/governance',
    children: [
      { label: 'Direction Générale', href: '/governance/direction' },
      { label: 'Coordination Générale', href: '/governance/coordination' },
      { label: 'Comité des Étudiants', href: '/governance/comite' },
      { label: 'Règlement Intérieur', href: '/governance/reglement' },
    ],
  },
  {
    label: 'Études',
    icon: BookOpen,
    href: '/etudes',
    children: [
      { label: 'Offre de Formation', href: '/etudes/formation' },
      { label: 'Certificats & Diplômes', href: '/etudes/diplomes' },
      { label: 'Admission & Inscription', href: '/etudes/admission' },
      { label: 'Projets', href: '/etudes/projets' },
      { label: 'Vie Estudiantine', href: '/etudes/vie-estudiantine' },
      { label: 'Résultats', href: '/etudes/resultats' },
    ],
  },
  {
    label: 'Actualités',
    icon: Newspaper,
    href: '/actualites',
    children: [
      { label: 'Médias', href: '/actualites/medias' },
      { label: 'Communiqués', href: '/actualites/communiques' },
      { label: 'Activités', href: '/actualites/activites' },
      { label: 'Vidéos', href: '/actualites/videos' },
      { label: 'Galerie', href: '/actualites/galerie' },
    ],
  },
  { label: 'Contact', icon: Phone, href: '/contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
  useEffect(() => { setMobileOpen(false) }, [pathname])

  const openDropdown = (label: string) => {
    clearTimeout(timeoutRef.current)
    setActiveDropdown(label)
  }
  const closeDropdown = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-[var(--color-surface)]/95 backdrop-blur-xl shadow-[0_2px_24px_rgba(26,41,128,0.1)]'
        : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #1a2980, #26d0ce)' }}>
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold font-display"
                style={{ color: 'var(--color-text)' }}>
                CEJEC
              </span>
              <p className="text-[10px] font-medium leading-none" style={{ color: 'var(--color-text-muted)' }}>
                Excellence & Savoir
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.label} className="relative"
                onMouseEnter={() => item.children && openDropdown(item.label)}
                onMouseLeave={closeDropdown}>
                <Link
                  href={item.href}
                  className={`nav-link flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    pathname.startsWith(item.href) ? 'active' : ''
                  }`}>
                  {item.label}
                  {item.children && (
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${
                      activeDropdown === item.label ? 'rotate-180' : ''
                    }`} />
                  )}
                </Link>

                {/* Dropdown */}
                {item.children && (
                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-56 rounded-2xl shadow-xl overflow-hidden"
                        style={{
                          background: 'var(--color-surface)',
                          border: '1px solid var(--color-border)',
                        }}
                        onMouseEnter={() => openDropdown(item.label)}
                        onMouseLeave={closeDropdown}>
                        <div className="p-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-2.5 rounded-xl text-sm transition-all duration-200 font-medium"
                              style={{ color: 'var(--color-text-muted)' }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(26,41,128,0.08)'
                                e.currentTarget.style.color = '#1a2980'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = ''
                                e.currentTarget.style.color = ''
                              }}>
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{ background: 'var(--color-surface-2)', color: 'var(--color-text-muted)' }}
                aria-label="Toggle theme">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={theme}
                    initial={{ scale: 0.8, rotate: -90, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0.8, rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}>
                    {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </motion.div>
                </AnimatePresence>
              </button>
            )}

            {/* CTA */}
            <Link href="/etudes/admission" className="hidden md:flex btn-primary text-sm py-2.5 px-5">
              S'inscrire
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
              style={{ background: 'var(--color-surface-2)', color: 'var(--color-text)' }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu">
              <AnimatePresence mode="wait">
                <motion.div key={mobileOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}>
                  {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="lg:hidden overflow-hidden"
            style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navItems.map((item, i) => (
                <motion.div key={item.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200"
                    style={{ color: 'var(--color-text)' }}
                    onClick={() => setMobileOpen(false)}>
                    <item.icon className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-11 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link key={child.href} href={child.href}
                          className="block px-4 py-2 rounded-lg text-sm transition-colors duration-200"
                          style={{ color: 'var(--color-text-muted)' }}
                          onClick={() => setMobileOpen(false)}>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              <div className="pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
                <Link href="/etudes/admission" className="btn-primary w-full justify-center text-sm">
                  S'inscrire maintenant
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
