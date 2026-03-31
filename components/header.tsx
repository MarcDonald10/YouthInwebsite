'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const NAV_LINKS = [
  { href: '/', label: 'Accueil' },
  { href: '/concours', label: 'Concours 2026' },
  { href: '/mentors', label: 'Mentors' },
  { href: '/communaute', label: 'Communauté' },
  { href: '/apropos', label: 'À propos' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg shadow-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              
              <img
                src={'/logo-icon-black.png'}
                alt="YouthIn Logo"
                className="w-5 h-5"
              />
            </div>
            <span className="font-bold text-xl text-accent hidden sm:inline">YouthIn</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(({ href, label }) => {
              const active = isActive(href)
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative py-1 text-sm font-medium transition-colors duration-300 group ${active
                      ? 'text-accent'
                      : 'text-foreground hover:text-accent'
                    }`}
                >
                  {label}

                  {/* Soulignement animé */}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-accent rounded-full transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                  />

                  {/* Point actif sous le lien */}
                  {active && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/soumettre">
              <Button
                className={`transition-all ${isActive('/soumettre')
                    ? 'bg-accent/80 text-primary-foreground ring-2 ring-accent ring-offset-2 ring-offset-background'
                    : 'bg-accent text-primary-foreground hover:bg-accent/90'
                  }`}
              >
                Soumettre
              </Button>
            </Link>
            <Link href="/voter">
              <Button
                variant="outline"
                className={`transition-all ${isActive('/voter')
                    ? 'border-accent bg-accent/10 text-accent ring-2 ring-accent ring-offset-2 ring-offset-background'
                    : 'border-accent text-accent hover:bg-accent/10'
                  }`}
              >
                Voter
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-foreground"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-card border-t border-border p-4 space-y-1">
            {NAV_LINKS.map(({ href, label }) => {
              const active = isActive(href)
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${active
                      ? 'bg-accent/15 text-accent font-semibold'
                      : 'text-foreground hover:text-accent hover:bg-accent/5'
                    }`}
                >
                  {/* Barre latérale active */}
                  <span
                    className={`w-1 h-4 rounded-full transition-all ${active ? 'bg-accent' : 'bg-transparent'
                      }`}
                  />
                  {label}
                </Link>
              )
            })}

            <hr className="border-border my-3" />

            <Link href="/soumettre" onClick={() => setMobileOpen(false)}>
              <Button className="w-full bg-accent text-primary-foreground hover:bg-accent/90">
                Soumettre un Projet
              </Button>
            </Link>
            <Link href="/voter" onClick={() => setMobileOpen(false)}>
              <Button
                variant="outline"
                className="w-full border-accent text-accent hover:bg-accent/10 mt-2"
              >
                Voter
              </Button>
            </Link>
          </div>
        )}
      </header>

      {/* Banner Contest */}
      {/* <div className="hidden lg:block fixed top-20 left-0 right-0 z-40 bg-green-600/20 border-b border-green-600/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-sm">
          <span className="text-foreground">
            ✨ Le vote public est ouvert ! Soutiens ton projet préféré —{' '}
            <Link href="/concours" className="text-accent font-semibold hover:underline">
              Voter maintenant
            </Link>
          </span>
          <button className="text-muted-foreground hover:text-foreground">×</button>
        </div>
      </div> */}
    </>
  )
}