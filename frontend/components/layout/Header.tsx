'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Menu, X, ChevronDown, Sparkles, Palette, Layers, Code } from 'lucide-react'

interface NavItem {
  label: string
  href: string
  children?: NavItem[]
  icon?: React.ComponentType<{ className?: string }>
}

const navigation: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Work',
    href: '/work',
    children: [
      { label: 'Fine Art', href: '/work?category=art', icon: Palette },
      { label: 'Urban Planning', href: '/work?category=urban', icon: Layers },
      { label: 'Tech Lab', href: '/work?category=tech', icon: Code }
    ]
  },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' }
]

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-dark-primary/90 backdrop-blur-xl border-b border-white/10 shadow-2xl'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-blue to-accent-magenta rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl text-white group-hover:text-accent-blue transition-colors">
                GhondiClaude
              </span>
              <span className="text-xs text-gray-400 -mt-1">Tech Innovator</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300',
                    isActive(item.href) && 'text-accent-blue bg-accent-blue/10'
                  )}
                >
                  {item.icon && <item.icon className="h-5 w-5" />}
                  <span className="flex items-center">
                    {item.label}
                    {item.children && (
                      <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:rotate-180" />
                    )}
                  </span>
                </Link>

                {/* Dropdown Menu */}
                {item.children && (
                  <div className="absolute top-full left-0 mt-2 py-2 w-56 bg-dark-tertiary/95 backdrop-blur-md border border-white/10 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          'flex items-center space-x-2 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-colors',
                          isActive(child.href) && 'text-accent-blue bg-accent-blue/10'
                        )}
                      >
                        {child.icon && <child.icon className="h-4 w-4" />}
                        <span>{child.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden relative z-10 p-3 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-105"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative">
              {isOpen ? (
                <X className="h-6 w-6 transition-transform duration-300 rotate-90" />
              ) : (
                <Menu className="h-6 w-6 transition-transform duration-300" />
              )}
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'md:hidden transition-all duration-300 overflow-hidden',
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="py-4 space-y-2 border-t border-white/10">
            {navigation.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-colors',
                    isActive(item.href) && 'text-accent-blue bg-accent-blue/10'
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon && <item.icon className="h-5 w-5" />}
                  <span>{item.label}</span>
                </Link>
                {item.children && (
                  <div className="ml-4 space-y-1 mt-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          'flex items-center space-x-3 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors',
                          isActive(child.href) && 'text-accent-blue bg-accent-blue/10'
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {child.icon && <child.icon className="h-4 w-4" />}
                        <span>{child.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
