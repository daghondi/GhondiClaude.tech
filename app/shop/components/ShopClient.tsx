'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Filter, Grid, List, ChevronDown, Tag, Heart, ShoppingCart, Eye, ExternalLink } from 'lucide-react'
import { urlFor } from '@/sanity/utils'

interface Product {
  _id: string
  title: string
  slug: { current: string }
  images?: any[]
  pricing?: {
    originalPrice?: number | null
    printPrice?: number
  }
  availability?: {
    original?: boolean
    print?: boolean
  }
  specifications?: {
    dimensions?: {
      original?: string | null
      print?: string
    }
    medium?: string
    year?: number
  }
  category?: string
  featured?: boolean
  tags?: string[]
}

interface ShopClientProps {
  products: Product[]
  siteSettings: any
}

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'fine-art', label: 'Fine Art' },
  { value: 'digital-art', label: 'Digital Art' },
  { value: 'urban-planning', label: 'Urban Planning' }
]

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' }
]

const priceRanges = [
  { value: 'all', label: 'All Prices' },
  { value: '0-100', label: '$0 - $100' },
  { value: '100-500', label: '$100 - $500' },
  { value: '500-1000', label: '$500 - $1,000' },
  { value: '1000+', label: '$1,000+' }
]

export default function ShopClient({ products, siteSettings }: ShopClientProps) {
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [currentCategory, setCurrentCategory] = useState('all')
  const [currentSort, setCurrentSort] = useState('featured')
  const [currentPriceRange, setCurrentPriceRange] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)
  const [hoveredImageIndex, setHoveredImageIndex] = useState<{ [key: string]: number }>({})

  const shopContent = siteSettings?.shopPageContent

  useEffect(() => {
    let filtered = [...products]

    // Filter by category
    if (currentCategory !== 'all') {
      filtered = filtered.filter(product => product.category === currentCategory)
    }

    // Filter by price range
    if (currentPriceRange !== 'all') {
      const [min, max] = currentPriceRange.split('-').map(p => p === '' ? Infinity : parseInt(p))
      filtered = filtered.filter(product => {
        const originalPrice = product.availability?.original && product.pricing?.originalPrice 
          ? product.pricing.originalPrice 
          : null
        const printPrice = product.pricing?.printPrice || 0
        const price = originalPrice || printPrice
        return price >= min && (max === Infinity ? true : price <= max)
      })
    }

    // Sort products
    switch (currentSort) {
      case 'featured':
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
      case 'price-low':
        filtered.sort((a, b) => {
          const priceA = (a.availability?.original && a.pricing?.originalPrice) ? a.pricing.originalPrice : (a.pricing?.printPrice || 0)
          const priceB = (b.availability?.original && b.pricing?.originalPrice) ? b.pricing.originalPrice : (b.pricing?.printPrice || 0)
          return priceA - priceB
        })
        break
      case 'price-high':
        filtered.sort((a, b) => {
          const priceA = (a.availability?.original && a.pricing?.originalPrice) ? a.pricing.originalPrice : (a.pricing?.printPrice || 0)
          const priceB = (b.availability?.original && b.pricing?.originalPrice) ? b.pricing.originalPrice : (b.pricing?.printPrice || 0)
          return priceB - priceA
        })
        break
      case 'newest':
        filtered.sort((a, b) => (b.specifications?.year || 0) - (a.specifications?.year || 0))
        break
    }

    setFilteredProducts(filtered)
  }, [products, currentCategory, currentSort, currentPriceRange])

  const handleImageHover = (productId: string, imageIndex: number) => {
    setHoveredImageIndex(prev => ({ ...prev, [productId]: imageIndex }))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Featured Section */}
      {products.some(product => product.featured) && (
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              {shopContent?.featuredSectionTitle || 'Featured Artworks'}
            </h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {products.filter(product => product.featured).slice(0, 3).map((product) => (
              <div 
                key={product._id}
                className="group relative bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-500"
                onMouseEnter={() => setHoveredProduct(product._id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.images?.[hoveredImageIndex[product._id] || 0] 
                      ? urlFor(product.images[hoveredImageIndex[product._id] || 0]).width(600).height(600).url()
                      : '/api/placeholder/600/600'
                    }
                    alt={product.title || 'Artwork'}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Featured Badge */}
                  <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Featured
                  </div>

                  {/* Image Navigation */}
                  {product.images && product.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {product.images.map((_, index) => (
                        <button
                          key={index}
                          onMouseEnter={() => handleImageHover(product._id, index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            (hoveredImageIndex[product._id] || 0) === index
                              ? 'bg-white scale-125'
                              : 'bg-white/60 hover:bg-white/80'
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className={`absolute inset-0 bg-black/40 flex items-center justify-center space-x-4 transition-opacity duration-300 ${
                    hoveredProduct === product._id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <Link
                      href={`/shop/${product.slug.current}`}
                      className="bg-white text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors flex items-center space-x-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </Link>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-display font-semibold text-gray-900 mb-1">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-600">{product.specifications?.medium} • {product.specifications?.year}</p>
                    </div>
                    <div className="text-right">
                      {product.availability?.original && product.pricing?.originalPrice && (
                        <p className="text-lg font-semibold text-gray-900">${product.pricing.originalPrice.toLocaleString()}</p>
                      )}
                      {product.availability?.print && product.pricing?.printPrice && (
                        <p className="text-sm text-gray-600">Prints from ${product.pricing.printPrice}</p>
                      )}
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="flex items-center space-x-4 mb-4">
                    {product.availability?.original && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Original Available
                      </span>
                    )}
                    {product.availability?.print && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Prints Available
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  {product.tags && product.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Filters and Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 space-y-4 lg:space-y-0">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          {/* Category Filter */}
          <div className="relative">
            <select
              value={currentCategory}
              onChange={(e) => setCurrentCategory(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {/* Price Range Filter */}
          <div className="relative">
            <select
              value={currentPriceRange}
              onChange={(e) => setCurrentPriceRange(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {priceRanges.map(range => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={currentSort}
              onChange={(e) => setCurrentSort(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">{filteredProducts.length} artworks</span>
          <div className="flex bg-gray-100 rounded-lg p-1 ml-4">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section>
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-8">
          {shopContent?.allProductsTitle || 'All Artworks'}
        </h2>
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-gray-600">No artworks found matching your criteria.</p>
            <button
              onClick={() => {
                setCurrentCategory('all')
                setCurrentPriceRange('all')
                setCurrentSort('featured')
              }}
              className="mt-4 text-blue-500 hover:text-blue-600 font-medium"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product) => (
              <div 
                key={product._id}
                className={`group relative bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-500 ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
                onMouseEnter={() => setHoveredProduct(product._id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className={`relative overflow-hidden ${
                  viewMode === 'list' ? 'w-1/3 aspect-square' : 'aspect-square'
                }`}>
                  <img
                    src={product.images?.[hoveredImageIndex[product._id] || 0] 
                      ? urlFor(product.images[hoveredImageIndex[product._id] || 0]).width(400).height(400).url()
                      : '/api/placeholder/400/400'
                    }
                    alt={product.title || 'Artwork'}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Image Navigation */}
                  {product.images && product.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {product.images.map((_, index) => (
                        <button
                          key={index}
                          onMouseEnter={() => handleImageHover(product._id, index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            (hoveredImageIndex[product._id] || 0) === index
                              ? 'bg-white scale-125'
                              : 'bg-white/60 hover:bg-white/80'
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
                    hoveredProduct === product._id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <Link
                      href={`/shop/${product.slug.current}`}
                      className="bg-white text-gray-900 px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors flex items-center space-x-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </Link>
                  </div>
                </div>

                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-display font-semibold text-gray-900 mb-1">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-600">{product.specifications?.medium} • {product.specifications?.year}</p>
                    </div>
                    <div className="text-right">
                      {product.availability?.original && product.pricing?.originalPrice && (
                        <p className="text-lg font-semibold text-gray-900">${product.pricing.originalPrice.toLocaleString()}</p>
                      )}
                      {product.availability?.print && product.pricing?.printPrice && (
                        <p className="text-sm text-gray-600">Prints from ${product.pricing.printPrice}</p>
                      )}
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="flex items-center space-x-2 mb-4">
                    {product.availability?.original && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Original
                      </span>
                    )}
                    {product.availability?.print && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Prints
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  {product.tags && product.tags.length > 0 && viewMode === 'list' && (
                    <div className="flex flex-wrap gap-2">
                      {product.tags.slice(0, 4).map((tag, index) => (
                        <span key={index} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* About Artwork Section */}
      {shopContent?.aboutArtworkTitle && (
        <section className="mt-24 py-16 bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
              {shopContent.aboutArtworkTitle}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {shopContent.aboutArtworkDescription}
            </p>
            {shopContent.purchaseNotice && (
              <p className="text-sm text-gray-500 italic">
                {shopContent.purchaseNotice}
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  )
}
