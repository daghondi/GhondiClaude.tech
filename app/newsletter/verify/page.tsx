import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, XCircle, Mail, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Email Verification | GhondiClaude.me',
  description: 'Verify your email address to complete your newsletter subscription.',
}

interface PageProps {
  searchParams: {
    token?: string
    success?: string
    error?: string
    already_verified?: string
  }
}

export default function NewsletterVerifyPage({ searchParams }: PageProps) {
  const { token, success, error, already_verified } = searchParams

  // If no token provided, show instructions
  if (!token && !success && !error && !already_verified) {
    return (
      <main className="min-h-screen pt-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Mail className="w-12 h-12 text-blue-600" />
            </div>
            
            <h1 className="text-4xl font-display font-bold text-gray-900 mb-6">
              Email Verification Required
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              To complete your newsletter subscription, please check your email for a verification link.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="font-semibold text-gray-900 mb-2">Didn't receive the email?</h2>
              <ul className="text-sm text-gray-600 space-y-1 text-left">
                <li>• Check your spam or junk folder</li>
                <li>• Make sure you entered the correct email address</li>
                <li>• The email may take a few minutes to arrive</li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="btn-primary">
                Return Home
              </Link>
              <Link href="/contact" className="btn-secondary">
                Need Help?
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-20 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          {/* Success State */}
          {(success || already_verified) && (
            <>
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              
              <h1 className="text-4xl font-display font-bold text-gray-900 mb-6">
                {already_verified ? 'Already Verified!' : 'Email Verified!'}
              </h1>
              
              <p className="text-lg text-gray-600 mb-8">
                {already_verified 
                  ? 'Your email address has already been verified. You\'re all set to receive our newsletter!'
                  : 'Thank you for verifying your email address. You\'re now subscribed to our newsletter!'
                }
              </p>
              
              <div className="bg-blue-50 rounded-lg p-6 mb-8">
                <h2 className="font-semibold text-gray-900 mb-2">What's next?</h2>
                <p className="text-sm text-gray-600">
                  You'll receive updates about my latest art projects, technology experiments, 
                  and urban planning insights directly in your inbox.
                </p>
              </div>
            </>
          )}

          {/* Error State */}
          {error && (
            <>
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <XCircle className="w-12 h-12 text-red-600" />
              </div>
              
              <h1 className="text-4xl font-display font-bold text-gray-900 mb-6">
                Verification Failed
              </h1>
              
              <p className="text-lg text-gray-600 mb-8">
                Sorry, we couldn't verify your email address. The verification link may be invalid or expired.
              </p>
              
              <div className="bg-red-50 rounded-lg p-6 mb-8">
                <h2 className="font-semibold text-gray-900 mb-2">What can you do?</h2>
                <ul className="text-sm text-gray-600 space-y-1 text-left">
                  <li>• Try subscribing again to get a new verification link</li>
                  <li>• Make sure you're using the latest verification link</li>
                  <li>• Contact us if you continue to have problems</li>
                </ul>
              </div>
            </>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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

// Server-side verification when token is present
export async function generateStaticParams() {
  return []
}

// This will run on the server when a verification link is clicked
async function verifyEmailToken(token: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/newsletter/verify?token=${token}`)
    const result = await response.json()
    return result
  } catch (error) {
    console.error('Verification error:', error)
    return { success: false, error: 'Verification failed' }
  }
}
