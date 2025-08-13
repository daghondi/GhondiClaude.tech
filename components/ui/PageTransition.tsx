'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const PageTransition: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-blue to-white z-50 transition-all duration-300',
        isLoading ? 'opacity-100' : 'opacity-0'
      )}
    >
      <div className={cn(
        "h-full bg-gradient-to-r from-white to-accent-blue transition-all duration-300",
        isLoading ? "animate-pulse" : ""
      )} />
    </div>
  )
}

export default PageTransition
