import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, XCircle, Mail, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Unsubscribe | GhondiClaude.me Newsletter',
  description: 'Unsubscribe from GhondiClaude.me newsletter.',
}

interface PageProps {
  searchParams: {
    success?: string
    error?: string
    already_unsubscribed?: string
    email?: string
  }
}

export default function NewsletterUnsubscribePage({ searchParams }: PageProps) {
  const { success, error, already_unsubscribed, email } = searchParams

  return (
    <main className="min-h-screen pt-20 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="text-center">
          {/* Success State */}
          {success && (
            <>
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              
              <h1 className="text-4xl font-display font-bold text-gray-900 mb-6">
                Successfully Unsubscribed
              </h1>
              
              <p className="text-lg text-gray-600 mb-8">
                You have been successfully removed from our newsletter list. 
                We're sorry to see you go!
              </p>
              
              <div className="bg-blue-50 rounded-lg p-6 mb-8">
                <h2 className="font-semibold text-gray-900 mb-2">Changed your mind?</h2>
                <p className="text-sm text-gray-600 mb-4">
                  You can always subscribe again at any time by visiting our website 
                  and signing up for the newsletter.
                </p>
                <Link href="/#newsletter" className="text-blue-600 hover:text-blue-800 font-medium">
                  Subscribe Again →
                </Link>
              </div>
            </>
          )}

          {/* Already Unsubscribed State */}
          {already_unsubscribed && (
            <>
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <Mail className="w-12 h-12 text-gray-600" />
              </div>
              
              <h1 className="text-4xl font-display font-bold text-gray-900 mb-6">
                Already Unsubscribed
              </h1>
              
              <p className="text-lg text-gray-600 mb-8">
                You are already unsubscribed from our newsletter.
              </p>
            </>
          )}

          {/* Error State */}
          {error && (
            <>
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <XCircle className="w-12 h-12 text-red-600" />
              </div>
              
              <h1 className="text-4xl font-display font-bold text-gray-900 mb-6">
                Unsubscribe Failed
              </h1>
              
              <p className="text-lg text-gray-600 mb-8">
                {error === 'invalid_token' && 'The unsubscribe link is invalid or has expired.'}
                {error === 'not_found' && 'Email address not found in our newsletter list.'}
                {error === 'failed' && 'There was a problem processing your request.'}
                {error === 'server_error' && 'A server error occurred. Please try again later.'}
                {!['invalid_token', 'not_found', 'failed', 'server_error'].includes(error) && 
                  'Sorry, we couldn\'t process your unsubscribe request.'}
              </p>
              
              <div className="bg-red-50 rounded-lg p-6 mb-8">
                <h2 className="font-semibold text-gray-900 mb-2">Need help?</h2>
                <p className="text-sm text-gray-600">
                  If you continue to have problems unsubscribing, please contact our support team 
                  and we'll manually remove you from our list.
                </p>
              </div>
            </>
          )}

          {/* Default State - Manual Unsubscribe Form */}
          {!success && !error && !already_unsubscribed && (
            <>
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <Mail className="w-12 h-12 text-gray-600" />
              </div>
              
              <h1 className="text-4xl font-display font-bold text-gray-900 mb-6">
                Unsubscribe from Newsletter
              </h1>
              
              <p className="text-lg text-gray-600 mb-8">
                We're sorry to see you go! Enter your email address below to unsubscribe 
                from our newsletter.
              </p>
              
              <UnsubscribeForm defaultEmail={email} />
              
              <div className="bg-gray-50 rounded-lg p-6 mt-8">
                <h2 className="font-semibold text-gray-900 mb-2">Before you go...</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Was there something specific that made you want to unsubscribe? 
                  Your feedback helps us improve our content.
                </p>
                <Link href="/contact" className="text-blue-600 hover:text-blue-800 font-medium">
                  Share Feedback →
                </Link>
              </div>
            </>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link href="/" className="btn-primary">
              Return Home
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

// Client component for the unsubscribe form
'use client'

import { useState } from 'react'

function UnsubscribeForm({ defaultEmail }: { defaultEmail?: string }) {
  const [email, setEmail] = useState(defaultEmail || '')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setMessage('Please enter your email address')
      return
    }
    
    setIsLoading(true)
    setMessage('')
    
    try {
      const response = await fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      
      const result = await response.json()
      
      if (result.success) {
        setSuccess(true)
        setMessage(result.message)
      } else {
        setMessage(result.error || 'Failed to unsubscribe')
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="bg-green-50 rounded-lg p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-4">
          <CheckCircle className="w-6 h-6 text-green-600" />
        </div>
        <p className="text-green-800 font-medium">{message}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>
      
      {message && (
        <div className={`mb-4 p-3 rounded-lg ${
          success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {message}
        </div>
      )}
      
      <button
        type="submit"
        disabled={isLoading}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Processing...' : 'Unsubscribe'}
      </button>
    </form>
  )
}
