import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, XCircle, Mail, ArrowLeft } from 'lucide-react'
import UnsubscribeForm from '@/app/components/UnsubscribeForm'

export const metadata: Metadata = {
  title: 'Unsubscribe | GhondiClaude.me Newsletter',
  description: 'Unsubscribe from GhondiClaude.me newsletter.',
}

interface PageProps {
  searchParams: {
    email?: string
    token?: string
    status?: 'success' | 'error' | 'invalid'
  }
}

export default function UnsubscribePage({ searchParams }: PageProps) {
  const { email, token, status } = searchParams

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link 
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          {status === 'success' ? (
            <>
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              
              <h1 className="text-4xl font-display font-bold text-gray-900 mb-6">
                Successfully Unsubscribed
              </h1>
              
              <p className="text-lg text-gray-600 mb-8">
                You have been successfully removed from our newsletter list. 
                We're sorry to see you go, but you can resubscribe at any time.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Continue Reading Blog
                </Link>
                
                <Link
                  href="/"
                  className="inline-flex items-center justify-center border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Back to Home
                </Link>
              </div>
            </>
          ) : status === 'error' ? (
            <>
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <XCircle className="w-12 h-12 text-red-600" />
              </div>
              
              <h1 className="text-4xl font-display font-bold text-gray-900 mb-6">
                Unsubscribe Failed
              </h1>
              
              <p className="text-lg text-gray-600 mb-8">
                We encountered an error while processing your unsubscribe request. 
                Please try again or contact us if the problem persists.
              </p>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <UnsubscribeForm defaultEmail={email} />
              </div>
            </>
          ) : status === 'invalid' ? (
            <>
              <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <XCircle className="w-12 h-12 text-yellow-600" />
              </div>
              
              <h1 className="text-4xl font-display font-bold text-gray-900 mb-6">
                Invalid Link
              </h1>
              
              <p className="text-lg text-gray-600 mb-8">
                This unsubscribe link is invalid or has expired. 
                Please enter your email address below to unsubscribe manually.
              </p>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <UnsubscribeForm />
              </div>
            </>
          ) : (
            <>
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <Mail className="w-12 h-12 text-blue-600" />
              </div>
              
              <h1 className="text-4xl font-display font-bold text-gray-900 mb-6">
                Unsubscribe from Newsletter
              </h1>
              
              <p className="text-lg text-gray-600 mb-8">
                We're sorry to see you go! Enter your email address below to unsubscribe 
                from our newsletter.
              </p>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <UnsubscribeForm defaultEmail={email} />
              </div>
            </>
          )}
        </div>

        {/* Additional Information */}
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <div className="flex items-center justify-center mb-3">
            <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
            <span className="font-medium text-gray-900">Privacy Guaranteed</span>
          </div>
          <p className="text-sm text-gray-600">
            Your email will be permanently removed from our system. 
            We respect your privacy and will not contact you again unless you resubscribe.
          </p>
        </div>
        
        {/* Footer CTA */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600 mb-4">
            Change your mind? You can always resubscribe from our blog or homepage.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blog"
              className="text-blue-600 hover:text-blue-700 underline font-medium"
            >
              Visit Blog
            </Link>
            <Link
              href="/contact"
              className="text-blue-600 hover:text-blue-700 underline font-medium"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
