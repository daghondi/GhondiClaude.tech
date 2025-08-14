import React from 'react'
import { getSiteSettings, getProducts } from '@/sanity/utils'
import ShopClient from './components/ShopClient'
import NewsletterForm from '@/components/newsletter/NewsletterForm'

export const metadata = {
  title: 'Art Shop | GhondiClaude.tech',
  description: 'Discover and purchase original artworks and high-quality prints from Ghondi Claude\'s collection.',
}

export default async function ShopPage() {
  // Fetch data with error handling
  let siteSettings = null
  let products = []

  try {
    [siteSettings, products] = await Promise.all([
      getSiteSettings(),
      getProducts()
    ])
  } catch (error) {
    console.error('Error fetching shop data:', error)
    // Continue with empty data - components will use fallbacks
  }

  const shopContent = siteSettings?.shopPageContent || {}

  return (
    <main className="min-h-screen pt-20 bg-white">
      {/* Hero Section - Chris Do Style */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h6 className="text-xs uppercase tracking-widest text-gray-500 font-medium mb-8">
              Art Collection
            </h6>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold tracking-tight leading-none text-gray-900 mb-12">
              {shopContent.heroTitle || 'Shop'}
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed mb-16">
              {shopContent.heroDescription || 'Discover original artworks and high-quality prints that bridge the worlds of fine art, urban planning, and technology'}
            </p>
            
            {/* Shop Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-display font-bold text-gray-900">
                  {Array.isArray(products) ? products.filter(p => p?.availability?.original).length : 0}
                </div>
                <p className="text-xs uppercase tracking-widest text-gray-500">Originals Available</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-display font-bold text-gray-900">
                  {Array.isArray(products) ? products.filter(p => p?.availability?.print).length : 0}
                </div>
                <p className="text-xs uppercase tracking-widest text-gray-500">Prints Available</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-display font-bold text-gray-900">
                  {Array.isArray(products) ? new Set(products.map(p => p?.category).filter(Boolean)).size : 0}
                </div>
                <p className="text-xs uppercase tracking-widest text-gray-500">Categories</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop Grid */}
      <ShopClient 
        products={Array.isArray(products) ? products : []} 
        siteSettings={siteSettings || {}} 
      />
      
      {/* Newsletter Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h6 className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-4">
            Stay Connected
          </h6>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">
            New Works <span className="text-blue-400">& Updates</span>
          </h2>
          <p className="text-lg text-gray-300 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            Be the first to know when new artworks become available and receive exclusive insights into my creative process
          </p>
          
          <div className="max-w-md mx-auto">
            <NewsletterForm 
              source="shop" 
              placeholder="Enter your email"
              buttonText="Subscribe"
              showName={false}
              className="w-full"
            />
          </div>
          
          <p className="text-sm text-gray-400 mt-4">
            Exclusive previews • No spam • Unsubscribe anytime
          </p>
        </div>
      </section>
    </main>
  )
}
