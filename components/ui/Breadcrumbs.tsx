'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href: string
  isCurrentPage?: boolean
}

const pathLabels: Record<string, string> = {
  'about': 'About',
  'work': 'Work',
  'portfolio': 'Portfolio',
  'fine-art': 'Fine Art',
  'tech-projects': 'Tech Projects',
  'smart-city-symphony': 'Smart City Symphony',
  'blog': 'Blog',
  'contact': 'Contact'
}

const Breadcrumbs: React.FC = () => {
  const pathname = usePathname()

  const getBreadcrumbs = (): BreadcrumbItem[] => {
    if (pathname === '/') return []

    const pathSegments = pathname.split('/').filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/' }
    ]

    let currentPath = ''
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const isLastSegment = index === pathSegments.length - 1
      
      breadcrumbs.push({
        label: pathLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
        href: currentPath,
        isCurrentPage: isLastSegment
      })
    })

    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs()

  if (breadcrumbs.length <= 1) return null

  return (
    <nav className="bg-dark-secondary/30 border-b border-white/5" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center py-3 text-sm">
          <ol className="flex items-center space-x-2">
            {breadcrumbs.map((breadcrumb, index) => (
              <li key={breadcrumb.href} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 text-gray-500 mr-2" />
                )}
                
                {breadcrumb.isCurrentPage ? (
                  <span className="text-accent-blue font-medium flex items-center">
                    {index === 0 && <Home className="w-4 h-4 mr-1" />}
                    {breadcrumb.label}
                  </span>
                ) : (
                  <Link
                    href={breadcrumb.href}
                    className={cn(
                      "text-gray-400 hover:text-white transition-colors duration-200 flex items-center",
                      index === 0 && "hover:text-accent-blue"
                    )}
                  >
                    {index === 0 && <Home className="w-4 h-4 mr-1" />}
                    {breadcrumb.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </nav>
  )
}

export default Breadcrumbs
