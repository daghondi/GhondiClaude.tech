'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { 
  Home, 
  User, 
  Briefcase, 
  BookOpen, 
  Mail,
  ChevronRight 
} from 'lucide-react'

interface TaskbarItem {
  id: string
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const taskbarItems: TaskbarItem[] = [
  { id: 'home', label: 'Home', href: '#', icon: Home },
  { id: 'about', label: 'About', href: '#about', icon: User },
  { id: 'work', label: 'Work', href: '#work', icon: Briefcase },
  { id: 'blog', label: 'Blog', href: '#blog', icon: BookOpen },
  { id: 'contact', label: 'Contact', href: '#contact', icon: Mail },
]

const Taskbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show taskbar after scrolling down a bit
      if (window.scrollY > 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

      // Update active section based on scroll position
      const sections = taskbarItems.map(item => item.id)
      let currentSection = 'home'

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section
          }
        }
      }

      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleItemClick = (href: string, id: string) => {
    setActiveSection(id)
    
    if (href.startsWith('#')) {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <div
      className={cn(
        'fixed top-1/2 right-6 -translate-y-1/2 z-40 transition-all duration-500 ease-out',
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
      )}
    >
      {/* Taskbar Container */}
      <div className="relative">
        {/* Background */}
        <div className="absolute inset-0 bg-dark-secondary/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl" />
        
        {/* Items */}
        <div className="relative p-3 space-y-2">
          {taskbarItems.map((item, index) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            
            return (
              <div key={item.id} className="relative group">
                <Link
                  href={item.href}
                  onClick={(e) => {
                    if (item.href.startsWith('#')) {
                      e.preventDefault()
                      handleItemClick(item.href, item.id)
                    }
                  }}
                  className={cn(
                    'flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 cursor-hover relative overflow-hidden',
                    isActive
                      ? 'bg-gradient-to-br from-accent-blue to-accent-magenta text-white shadow-lg scale-110'
                      : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white hover:scale-105'
                  )}
                >
                  <Icon className="h-5 w-5 relative z-10" />
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 to-accent-magenta/20 animate-pulse" />
                  )}
                  
                  {/* Ripple effect */}
                  <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" />
                </Link>

                {/* Tooltip */}
                <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                  <div className="bg-dark-tertiary/95 backdrop-blur-md text-white text-sm px-3 py-2 rounded-lg border border-white/10 whitespace-nowrap shadow-xl">
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
          <div 
            className="w-full bg-gradient-to-b from-accent-blue to-accent-magenta rounded-full transition-all duration-500"
            style={{
              height: `${((taskbarItems.findIndex(item => item.id === activeSection) + 1) / taskbarItems.length) * 100}%`
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Taskbar
