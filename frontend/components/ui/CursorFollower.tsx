'use client'

import React, { useEffect, useState } from 'react'

interface CursorFollowerProps {
  className?: string
}

const CursorFollower: React.FC<CursorFollowerProps> = ({ className = '' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    // Track mouse movement
    window.addEventListener('mousemove', updateMousePosition)

    // Track hover states for interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, .cursor-hover'
    )

    interactiveElements.forEach((element) => {
      element.addEventListener('mouseenter', handleMouseEnter)
      element.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      interactiveElements.forEach((element) => {
        element.removeEventListener('mouseenter', handleMouseEnter)
        element.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <>
      {/* Main cursor dot */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-all duration-100 ease-out ${className}`}
        style={{
          transform: `translate(${mousePosition.x - 4}px, ${mousePosition.y - 4}px)`,
        }}
      >
        <div
          className={`w-2 h-2 bg-white rounded-full transition-all duration-300 ${
            isHovering ? 'scale-150 bg-accent-blue' : 'scale-100'
          }`}
        />
      </div>

      {/* Outer cursor ring */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[9998] transition-all duration-200 ease-out`}
        style={{
          transform: `translate(${mousePosition.x - 20}px, ${mousePosition.y - 20}px)`,
        }}
      >
        <div
          className={`w-10 h-10 border border-white/30 rounded-full transition-all duration-300 ${
            isHovering 
              ? 'scale-150 border-accent-blue/60 bg-accent-blue/10' 
              : 'scale-100'
          }`}
        />
      </div>

      {/* Glow effect */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[9997] transition-all duration-300 ease-out`}
        style={{
          transform: `translate(${mousePosition.x - 50}px, ${mousePosition.y - 50}px)`,
        }}
      >
        <div
          className={`w-24 h-24 bg-gradient-to-r from-accent-blue/20 to-accent-magenta/20 rounded-full blur-xl transition-all duration-500 ${
            isHovering ? 'scale-125 opacity-80' : 'scale-100 opacity-40'
          }`}
        />
      </div>
    </>
  )
}

export default CursorFollower
