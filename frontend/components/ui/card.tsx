import React from 'react'
import { cn } from '@/lib/utils'
import type { CardProps } from '@/types'

const Card: React.FC<CardProps> = ({
  variant = 'default',
  className,
  children,
  ...props
}) => {
  const baseClasses = 'rounded-lg p-6'
  
  const variantClasses = {
    default: 'bg-dark-tertiary/50 border border-white/10',
    hover: [
      'bg-dark-tertiary/50 border border-white/10',
      'transition-all duration-300 hover:bg-dark-tertiary/70',
      'hover:border-accent-blue/50 hover:shadow-lg hover:shadow-accent-blue/20'
    ].join(' '),
    glass: 'bg-white/5 backdrop-blur-md border border-white/10'
  }

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
