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
  ChevronRight,
  Palette,
  Code,
  Layers,
  Menu,
  X,
  ShoppingBag
} from 'lucide-react'

interface NavigationItem {
  id: string
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  subItems?: {
    id: string
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
  }[]
}

const ResponsiveNavigation: React.FC = () => {
  const siteSettings = useSiteSettings()
  
  // Create navigation from site settings with fallbacks
  const navigationItems: NavigationItem[] = [
    { 
      id: 'home', 
      label: siteSettings?.globalContent?.navigation?.homeLabel || 'Home', 
      href: '/', 
      icon: Home 
    },
    { 
      id: 'about', 
      label: siteSettings?.globalContent?.navigation?.aboutLabel || 'About', 
      href: '/about', 
      icon: User 
    },
    { 
      id: 'work', 
      label: siteSettings?.globalContent?.navigation?.workLabel || 'Work', 
      href: '/work', 
      icon: Briefcase,
      subItems: [
        { 
          id: 'fine-art', 
          label: siteSettings?.globalContent?.navigation?.fineArtLabel || 'Fine Art', 
          href: '/portfolio/fine-art', 
          icon: Palette 
        },
        { 
          id: 'tech-projects', 
          label: siteSettings?.globalContent?.navigation?.techLabLabel || 'Tech Projects', 
          href: '/portfolio/tech-projects', 
          icon: Code 
        },
        { 
          id: 'urban-planning', 
          label: siteSettings?.globalContent?.navigation?.urbanPlanningLabel || 'Urban Planning', 
          href: '/portfolio/urban-planning', 
          icon: Layers 
        }
      ]
    },
    { 
      id: 'shop', 
      label: 'Shop', 
      href: '/shop', 
      icon: ShoppingBag 
    },
    { 
      id: 'blog', 
      label: siteSettings?.globalContent?.navigation?.blogLabel || 'Blog', 
      href: '/blog', 
      icon: BookOpen 
    },
    { 
      id: 'contact', 
      label: siteSettings?.globalContent?.navigation?.contactLabel || 'Contact', 
      href: '/contact', 
      icon: Mail 
    },
  ]

  const [isVisible, setIsVisible] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const pathname = usePathname()

  // Show navigation after initial load and on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // Show immediately on page load
    setIsVisible(true)
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  const hasActiveSubItem = (item: NavigationItem) => {
    return item.subItems?.some(subItem => isActiveRoute(subItem.href)) || false
  }

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId)
    } else {
      newExpanded.add(itemId)
    }
    setExpandedItems(newExpanded)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      {/* Desktop Sidebar Navigation */}
      <div
        className={cn(
          'hidden lg:block fixed top-1/2 right-6 -translate-y-1/2 z-40 transition-all duration-500 ease-out',
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
        )}
      >
        <div className="relative">
          {/* Background */}
          <div className="absolute inset-0 bg-dark-secondary/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl" />
          
          {/* Navigation Items */}
          <div className="relative p-3 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = isActiveRoute(item.href) || hasActiveSubItem(item)
              const isExpanded = expandedItems.has(item.id)
              
              return (
                <div key={item.id} className="relative group">
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 cursor-hover relative overflow-hidden',
                        isActive
                          ? 'bg-gradient-to-br from-white to-accent-blue text-dark-primary shadow-lg scale-110'
                          : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white hover:scale-105'
                      )}
                    >
                      <Icon className="h-5 w-5 relative z-10" />
                      
                      {/* Active indicator */}
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-accent-blue/20 animate-pulse" />
                      )}
                      
                      {/* Ripple effect */}
                      <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" />
                    </Link>

                    {/* Expand button for items with subitems */}
                    {item.subItems && (
                      <button
                        onClick={() => toggleExpanded(item.id)}
                        className="ml-1 w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all duration-200"
                        aria-label={`Expand ${item.label} submenu`}
                        title={`Expand ${item.label} submenu`}
                      >
                        <ChevronRight 
                          className={cn(
                            "h-3 w-3 text-gray-400 transition-transform duration-200",
                            isExpanded && "rotate-90"
                          )} 
                        />
                      </button>
                    )}
                  </div>

                  {/* Subitems */}
                  {item.subItems && isExpanded && (
                    <div className="absolute right-full mr-3 top-0 bg-dark-secondary/90 backdrop-blur-xl rounded-xl border border-white/10 shadow-xl p-2 space-y-1 min-w-[180px]">
                      {item.subItems.map((subItem) => {
                        const SubIcon = subItem.icon
                        const isSubActive = isActiveRoute(subItem.href)
                        
                        return (
                          <Link
                            key={subItem.id}
                            href={subItem.href}
                            className={cn(
                              'flex items-center px-3 py-2 rounded-lg transition-all duration-200 text-sm',
                              isSubActive
                                ? 'bg-accent-blue text-white'
                                : 'text-gray-300 hover:text-white hover:bg-white/10'
                            )}
                          >
                            <SubIcon className="h-4 w-4 mr-3" />
                            {subItem.label}
                          </Link>
                        )
                      })}
                    </div>
                  )}

                  {/* Tooltip */}
                  <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <div className="bg-gray-900/95 backdrop-blur-md text-white text-sm px-3 py-2 rounded-lg border border-gray-700/50 whitespace-nowrap shadow-xl">
                      {item.label}
                      <ChevronRight className="inline-block ml-1 h-3 w-3" />
                    </div>
                  </div>

                  {/* Connection line to active item */}
                  {isActive && (
                    <div className="absolute left-1/2 -translate-x-1/2 -right-6 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-accent-blue to-transparent opacity-60" />
                  )}
                </div>
              )
            })}
          </div>

          {/* Progress indicator */}
          <div className="absolute -left-1 top-3 bottom-3 w-1 bg-white/10 rounded-full overflow-hidden">
            <div className="w-full bg-gradient-to-b from-white to-accent-blue rounded-full transition-all duration-500 h-full opacity-20" />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className={cn(
            'fixed top-6 right-6 z-50 w-12 h-12 rounded-xl transition-all duration-300 flex items-center justify-center',
            isMobileMenuOpen
              ? 'bg-accent-blue text-white'
              : 'bg-dark-secondary/80 backdrop-blur-xl border border-white/10 text-gray-300 hover:text-white'
          )}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={cn(
            'fixed inset-0 z-40 transition-all duration-300',
            isMobileMenuOpen
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          )}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={toggleMobileMenu}
          />
          
          {/* Menu Panel */}
          <div
            className={cn(
              'absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-dark-primary border-l border-white/10 transition-transform duration-300',
              isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            )}
          >
            <div className="p-6 pt-20">
              <h2 className="text-2xl font-heading text-white mb-8">Navigation</h2>
              
              <div className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  const isActive = isActiveRoute(item.href) || hasActiveSubItem(item)
                  const isExpanded = expandedItems.has(item.id)
                  
                  return (
                    <div key={item.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Link
                          href={item.href}
                          className={cn(
                            'flex items-center px-4 py-3 rounded-xl transition-all duration-200 flex-1',
                            isActive
                              ? 'bg-accent-blue text-white'
                              : 'text-gray-300 hover:text-white hover:bg-white/10'
                          )}
                        >
                          <Icon className="h-5 w-5 mr-3" />
                          {item.label}
                        </Link>
                        
                        {item.subItems && (
                          <button
                            onClick={() => toggleExpanded(item.id)}
                            className="ml-2 w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all duration-200"
                            aria-label={`Expand ${item.label} submenu`}
                            title={`Expand ${item.label} submenu`}
                          >
                            <ChevronRight 
                              className={cn(
                                "h-4 w-4 text-gray-400 transition-transform duration-200",
                                isExpanded && "rotate-90"
                              )} 
                            />
                          </button>
                        )}
                      </div>

                      {/* Mobile Subitems */}
                      {item.subItems && isExpanded && (
                        <div className="ml-4 space-y-1 border-l-2 border-white/10 pl-4">
                          {item.subItems.map((subItem) => {
                            const SubIcon = subItem.icon
                            const isSubActive = isActiveRoute(subItem.href)
                            
                            return (
                              <Link
                                key={subItem.id}
                                href={subItem.href}
                                className={cn(
                                  'flex items-center px-3 py-2 rounded-lg transition-all duration-200 text-sm',
                                  isSubActive
                                    ? 'bg-accent-blue/20 text-accent-blue'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                )}
                              >
                                <SubIcon className="h-4 w-4 mr-3" />
                                {subItem.label}
                              </Link>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResponsiveNavigation
