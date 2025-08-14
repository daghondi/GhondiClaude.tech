'use client'

import { useState } from 'react'
import { Mail, CheckCircle, AlertCircle } from 'lucide-react'

interface NewsletterFormProps {
  source?: 'footer' | 'blog' | 'shop' | 'contact'
  placeholder?: string
  buttonText?: string
  showName?: boolean
  className?: string
  compact?: boolean
}

export default function NewsletterForm({
  source = 'footer',
  placeholder = 'Enter your email',
  buttonText = 'Subscribe',
  showName = false,
  className = '',
  compact = false
}: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setMessage('Please enter your email address')
      return
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address')
      return
    }
    
    setIsLoading(true)
    setMessage('')
    
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name: showName ? name : undefined,
          source
        }),
      })
      
      const result = await response.json()
      
      if (result.success) {
        setSuccess(true)
        setMessage(result.message)
        setEmail('')
        setName('')
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSuccess(false)
          setMessage('')
        }, 5000)
      } else {
        setMessage(result.error || 'Failed to subscribe')
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className={`${className}`}>
        <div className={`flex items-center justify-center p-4 bg-green-50 border border-green-200 rounded-lg ${
          compact ? 'text-sm' : ''
        }`}>
          <CheckCircle className={`text-green-600 mr-2 ${compact ? 'w-4 h-4' : 'w-5 h-5'}`} />
          <span className="text-green-800 font-medium">{message}</span>
        </div>
      </div>
    )
  }

  return (
    <div className={`${className}`}>
      <form onSubmit={handleSubmit} className={compact ? 'flex gap-2' : 'space-y-4'}>
        {showName && !compact && (
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}
        
        <div className={compact ? 'flex-1' : ''}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            className={`w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              compact 
                ? 'px-3 py-2 rounded-l-lg text-sm' 
                : 'px-4 py-3 rounded-lg'
            }`}
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className={`font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            compact
              ? 'px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 text-sm'
              : 'w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className={`animate-spin rounded-full border-2 border-white border-t-transparent mr-2 ${
                compact ? 'w-3 h-3' : 'w-4 h-4'
              }`}></div>
              {compact ? '...' : 'Subscribing...'}
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Mail className={`mr-2 ${compact ? 'w-3 h-3' : 'w-4 h-4'}`} />
              {buttonText}
            </div>
          )}
        </button>
      </form>
      
      {message && !success && (
        <div className={`flex items-center p-3 bg-red-50 border border-red-200 rounded-lg ${
          compact ? 'mt-2 text-sm' : 'mt-4'
        }`}>
          <AlertCircle className={`text-red-600 mr-2 ${compact ? 'w-4 h-4' : 'w-5 h-5'}`} />
          <span className="text-red-800">{message}</span>
        </div>
      )}
    </div>
  )
}
