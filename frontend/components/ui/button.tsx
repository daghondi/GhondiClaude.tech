import React from 'react'
import { cn } from '@/lib/utils'
import type { ButtonProps } from '@/types'

const Button: React.FC<ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  className,
  onClick,
  ...props
}) => {
  const baseClasses = [
    'inline-flex items-center justify-center rounded-md font-medium',
    'transition-colors duration-200 focus-visible:outline-none',
    'focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2',
    'focus-visible:ring-offset-dark-primary disabled:opacity-50',
    'disabled:pointer-events-none'
  ].join(' ')

  const variantClasses = {
    primary: 'bg-accent-blue text-white hover:bg-accent-blue/90 active:bg-accent-blue/80',
    secondary: 'border border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-white',
    ghost: 'text-gray-300 hover:text-white hover:bg-white/10',
    outline: 'border border-gray-600 text-gray-300 hover:border-accent-blue hover:text-accent-blue'
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        loading && 'cursor-wait',
        className
      )}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <svg
          className="mr-2 h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  )
}

export default Button
