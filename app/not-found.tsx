'use client'

import React from 'react'
import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-4">
        {/* Chris Do Style 404 Display */}
        <div className="mb-16">
          <h6 className="text-xs uppercase tracking-widest text-gray-500 font-medium mb-8">
            Error 404
          </h6>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold tracking-tight leading-none text-gray-900 mb-8">
            Page Not Found
          </h1>
          
          <p className="text-lg lg:text-xl text-gray-600 font-light max-w-xl mx-auto leading-relaxed mb-12">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        {/* Navigation Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/" 
            className="inline-flex items-center justify-center bg-gray-900 text-white px-8 py-4 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
          >
            <Home className="w-4 h-4 mr-3" />
            Go Home
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center border border-gray-900 text-gray-900 px-8 py-4 text-sm font-medium uppercase tracking-wider hover:bg-gray-900 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-3" />
            Go Back
          </button>
        </div>
        
        {/* Additional Navigation */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            Or explore these sections:
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/about" className="text-gray-600 hover:text-gray-900 underline">
              About
            </Link>
            <Link href="/work" className="text-gray-600 hover:text-gray-900 underline">
              Work
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-gray-900 underline">
              Blog
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
