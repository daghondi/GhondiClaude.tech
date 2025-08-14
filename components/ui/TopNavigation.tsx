'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useSiteSettings } from '@/contexts/SiteSettingsContext'
import { 
  Home, 
  User, 
  Briefcase, 
  BookOpen, 
  Mail,
  Menu,
  X,
  ChevronDown
} from 'lucide-react'

interface TopNavItem {
  label: string
  href: string
  subItems?: {
    label: string
    href: string
  }[]
}

const TopNavigation: React.FC = () => {
  const siteSettings = useSiteSettings()
  
  // Create navigation from site settings with fallbacks
  const navItems: TopNavItem[] = [
    { label: siteSettings?.globalContent?.navigation?.homeLabel || 'Home', href: '/' },
    { label: siteSettings?.globalContent?.navigation?.aboutLabel || 'About', href: '/about' },
    { 
      label: siteSettings?.globalContent?.navigation?.workLabel || 'Work', 
      href: '/work',
      subItems: [
        { 
          label: siteSettings?.globalContent?.navigation?.fineArtLabel || 'Fine Art Portfolio', 
          href: '/portfolio/fine-art' 
        },
        { 
          label: siteSettings?.globalContent?.navigation?.techLabLabel || 'Tech Projects', 
          href: '/portfolio/tech-projects' 
        }
      ]
    },
    { label: 'Shop', href: '/shop' },
    { label: siteSettings?.globalContent?.navigation?.blogLabel || 'Blog', href: '/blog' },
    { label: siteSettings?.globalContent?.navigation?.contactLabel || 'Contact', href: '/contact' },
  ]
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedDropdowns, setExpandedDropdowns] = useState<Set<string>>(new Set())
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setExpandedDropdowns(new Set())
  }, [pathname])

  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  const hasActiveSubItem = (item: TopNavItem) => {
    return item.subItems?.some(subItem => isActiveRoute(subItem.href)) || false
  }

  const toggleDropdown = (label: string) => {
    const newExpanded = new Set(expandedDropdowns)
    if (newExpanded.has(label)) {
      newExpanded.delete(label)
    } else {
      newExpanded.add(label)
    }
    setExpandedDropdowns(newExpanded)
  }

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 text-xl font-heading font-bold text-gray-900 hover:text-blue-600 transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {siteSettings?.globalContent?.brandShort || 'GC'}
              </span>
            </div>
            <span className="hidden sm:block">
              {siteSettings?.globalContent?.brandName || 'Ghondi Claude'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = isActiveRoute(item.href) || hasActiveSubItem(item)
              
              return (
                <div key={item.label} className="relative group">
                  <Link
                    href={item.href}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center',
                      isActive
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                    )}
                  >
                    {item.label}
                    {item.subItems && (
                      <ChevronDown className="ml-1 h-3 w-3 group-hover:rotate-180 transition-transform duration-200" />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.subItems && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white/95 backdrop-blur-xl rounded-lg border border-gray-200 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="py-2">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className={cn(
                              'block px-4 py-2 text-sm transition-colors duration-200',
                              isActiveRoute(subItem.href)
                                ? 'text-blue-600 bg-blue-50'
                                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                            )}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5 text-gray-700" />
            ) : (
              <Menu className="h-5 w-5 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'md:hidden transition-all duration-300 overflow-hidden',
            isMobileMenuOpen ? 'max-h-screen pb-4' : 'max-h-0'
          )}
        >
          <div className="space-y-1 pt-4 border-t border-gray-200">
            {navItems.map((item) => {
              const isActive = isActiveRoute(item.href) || hasActiveSubItem(item)
              const isExpanded = expandedDropdowns.has(item.label)
              
              return (
                <div key={item.label} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      className={cn(
                        'flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200',
                        isActive
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                      )}
                    >
                      {item.label}
                    </Link>
                    
                    {item.subItems && (
                      <button
                        onClick={() => toggleDropdown(item.label)}
                        className="mr-2 w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200"
                        aria-label={`Toggle ${item.label} submenu`}
                      >
                        <ChevronDown 
                          className={cn(
                            "h-4 w-4 text-gray-600 transition-transform duration-200",
                            isExpanded && "rotate-180"
                          )} 
                        />
                      </button>
                    )}
                  </div>

                  {/* Mobile Submenus */}
                  {item.subItems && isExpanded && (
                    <div className="ml-4 space-y-1 border-l-2 border-gray-200 pl-4">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className={cn(
                            'block px-3 py-2 rounded-lg text-sm transition-colors duration-200',
                            isActiveRoute(subItem.href)
                              ? 'text-blue-600 bg-blue-50'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          )}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default TopNavigation
