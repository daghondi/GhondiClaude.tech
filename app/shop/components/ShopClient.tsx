'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Filter, Grid, List, ChevronDown, Tag, Heart, ShoppingCart, Eye, ExternalLink } from 'lucide-react'

interface Artwork {
  id: number
  title: string
  slug: string
  price: {
    original: number | null
    print: number
  }
  availability: {
    original: boolean
    print: boolean
  }
  images: string[]
  size: {
    original: string | null
    print: string
  }
  medium: string
  year: number
  category: string
  featured: boolean
  tags: string[]
}

interface ShopClientProps {
  artworks: Artwork[]
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
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' }
]

const priceRanges = [
  { value: 'all', label: 'All Prices' },
  { value: '0-100', label: '$0 - $100' },
  { value: '100-500', label: '$100 - $500' },
  { value: '500-1000', label: '$500 - $1,000' },
  { value: '1000+', label: '$1,000+' }
]

export default function ShopClient({ artworks, siteSettings }: ShopClientProps) {
  const [filteredArtworks, setFilteredArtworks] = useState(artworks)
  const [currentCategory, setCurrentCategory] = useState('all')
  const [currentSort, setCurrentSort] = useState('featured')
  const [currentPriceRange, setCurrentPriceRange] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [hoveredArtwork, setHoveredArtwork] = useState<number | null>(null)
  const [hoveredImageIndex, setHoveredImageIndex] = useState<{ [key: number]: number }>({})

  useEffect(() => {
    let filtered = [...artworks]

    // Filter by category
    if (currentCategory !== 'all') {
      filtered = filtered.filter(artwork => artwork.category === currentCategory)
    }

    // Filter by price range
    if (currentPriceRange !== 'all') {
      const [min, max] = currentPriceRange.split('-').map(p => p === '' ? Infinity : parseInt(p))
      filtered = filtered.filter(artwork => {
        const price = artwork.availability.original && artwork.price.original 
          ? artwork.price.original 
          : artwork.price.print
        return price >= min && (max === Infinity ? true : price <= max)
      })
    }

    // Sort artworks
    switch (currentSort) {
      case 'featured':
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
      case 'price-low':
        filtered.sort((a, b) => {
          const priceA = a.availability.original && a.price.original ? a.price.original : a.price.print
          const priceB = b.availability.original && b.price.original ? b.price.original : b.price.print
          return priceA - priceB
        })
        break
      case 'price-high':
        filtered.sort((a, b) => {
          const priceA = a.availability.original && a.price.original ? a.price.original : a.price.print
          const priceB = b.availability.original && b.price.original ? b.price.original : b.price.print
          return priceB - priceA
        })
        break
      case 'newest':
        filtered.sort((a, b) => b.year - a.year)
        break
      case 'oldest':
        filtered.sort((a, b) => a.year - b.year)
        break
    }

    setFilteredArtworks(filtered)
  }, [artworks, currentCategory, currentSort, currentPriceRange])

  const cycleImage = (artworkId: number) => {
    const artwork = artworks.find(a => a.id === artworkId)
    if (!artwork || artwork.images.length <= 1) return

    setHoveredImageIndex(prev => ({
      ...prev,
      [artworkId]: ((prev[artworkId] || 0) + 1) % artwork.images.length
    }))
  }

  const getDisplayPrice = (artwork: Artwork) => {
    if (artwork.availability.original && artwork.price.original) {
      return {
        price: artwork.price.original,
        type: 'Original',
        hasAlternative: artwork.availability.print
      }
    } else if (artwork.availability.print) {
      return {
        price: artwork.price.print,
        type: 'Print',
        hasAlternative: false
      }
    }
    return null
  }

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters and Controls - Chris Do Style */}
        <div className="mb-16">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Category Filter */}
              <div className="relative">
                <select
                  value={currentCategory}
                  onChange={(e) => setCurrentCategory(e.target.value)}
                  className="input pr-10 appearance-none cursor-pointer"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Price Filter */}
              <div className="relative">
                <select
                  value={currentPriceRange}
                  onChange={(e) => setCurrentPriceRange(e.target.value)}
                  className="input pr-10 appearance-none cursor-pointer"
                >
                  {priceRanges.map(range => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Sort and View Controls */}
            <div className="flex items-center gap-4">
              {/* Sort */}
              <div className="relative">
                <select
                  value={currentSort}
                  onChange={(e) => setCurrentSort(e.target.value)}
                  className="input pr-10 appearance-none cursor-pointer"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* View Mode */}
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 transition-colors ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 transition-colors ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing {filteredArtworks.length} of {artworks.length} artworks
            </p>
          </div>
        </div>

        {/* Artworks Grid/List */}
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" 
          : "space-y-8"
        }>
          {filteredArtworks.map((artwork) => {
            const displayPrice = getDisplayPrice(artwork)
            const currentImageIndex = hoveredImageIndex[artwork.id] || 0
            
            return (
              <div
                key={artwork.id}
                className={`group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-500 ${
                  viewMode === 'list' ? 'flex gap-6' : ''
                }`}
                onMouseEnter={() => setHoveredArtwork(artwork.id)}
                onMouseLeave={() => setHoveredArtwork(null)}
              >
                {/* Image Container */}
                <div 
                  className={`relative overflow-hidden bg-gray-100 ${
                    viewMode === 'list' ? 'w-64 h-48 flex-shrink-0' : 'aspect-[4/5]'
                  }`}
                  onMouseMove={() => {
                    if (hoveredArtwork === artwork.id && artwork.images.length > 1) {
                      const timer = setTimeout(() => cycleImage(artwork.id), 800)
                      return () => clearTimeout(timer)
                    }
                  }}
                >
                  <img
                    src={artwork.images[currentImageIndex]}
                    alt={artwork.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay with quick actions */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-3">
                      <Link
                        href={`/shop/${artwork.slug}`}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5 text-gray-700" />
                      </Link>
                      <button
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                        title="Add to Favorites"
                      >
                        <Heart className="w-5 h-5 text-gray-700" />
                      </button>
                    </div>
                  </div>

                  {/* Availability Tags */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {artwork.availability.original && (
                      <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                        Original
                      </span>
                    )}
                    {artwork.availability.print && (
                      <span className="px-3 py-1 bg-gray-900 text-white text-xs font-medium rounded-full">
                        Print
                      </span>
                    )}
                  </div>

                  {/* Image indicator dots */}
                  {artwork.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1">
                      {artwork.images.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  {/* Title and Price */}
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                      {artwork.title}
                    </h3>
                    {displayPrice && (
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-gray-900">
                          ${displayPrice.price.toLocaleString()}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          displayPrice.type === 'Original' 
                            ? 'bg-blue-100 text-blue-600' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {displayPrice.type}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="text-sm text-gray-600 mb-4 space-y-1">
                    <p>{artwork.medium} • {artwork.year}</p>
                    {displayPrice?.type === 'Original' && artwork.size.original && (
                      <p>{artwork.size.original}</p>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {artwork.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Link
                      href={`/shop/${artwork.slug}`}
                      className="flex-1 btn-primary text-center"
                    >
                      View Details
                    </Link>
                    {displayPrice?.hasAlternative && (
                      <Link
                        href={`/shop/${artwork.slug}?variant=print`}
                        className="btn-secondary text-sm px-4"
                        title="View Print Options"
                      >
                        Prints
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* No Results */}
        {filteredArtworks.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Tag className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">No Artworks Found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Try adjusting your filters or browse all categories to discover our full collection.
            </p>
            <button
              onClick={() => {
                setCurrentCategory('all')
                setCurrentPriceRange('all')
              }}
              className="btn-primary"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
