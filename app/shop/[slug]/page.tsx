import React from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Heart, Share, ShoppingCart, Eye, ZoomIn } from 'lucide-react'

// Mock data - In production, this would come from your CMS/database
const mockArtworks = [
  {
    id: 1,
    title: "Urban Dreams",
    slug: "urban-dreams",
    price: {
      original: 1250,
      print: 85
    },
    availability: {
      original: true,
      print: true
    },
    images: [
      "/api/placeholder/800/1000",
      "/api/placeholder/800/1000", 
      "/api/placeholder/800/1000"
    ],
    size: {
      original: "24\" × 30\"",
      print: "Multiple sizes available"
    },
    medium: "Acrylic on Canvas",
    year: 2024,
    category: "fine-art",
    featured: true,
    tags: ["urban", "contemporary", "colorful"],
    description: "A vibrant exploration of urban landscapes and the dreams they inspire. This piece captures the energy and dynamism of city life through bold colors and fluid forms.",
    story: "Inspired by the bustling energy of metropolitan areas, this artwork was created during a residency in downtown Los Angeles. The interplay of light and shadow in urban environments became the central theme.",
    dimensions: {
      original: {
        width: 24,
        height: 30,
        depth: 1.5
      }
    },
    printOptions: [
      { size: "8\" × 10\"", price: 45 },
      { size: "12\" × 15\"", price: 65 },
      { size: "16\" × 20\"", price: 85 },
      { size: "24\" × 30\"", price: 125 }
    ]
  }
]

interface ArtworkPageProps {
  params: {
    slug: string
  }
}

export default function ArtworkPage({ params }: ArtworkPageProps) {
  const artwork = mockArtworks.find(a => a.slug === params.slug)
  
  if (!artwork) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Back Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link 
          href="/shop" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>
      </div>

      {/* Artwork Details */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={artwork.images[0]}
                  alt={artwork.title}
                  width={800}
                  height={1000}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnail Gallery */}
              {artwork.images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto">
                  {artwork.images.map((image, index) => (
                    <div key={index} className="w-20 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={image}
                        alt={`${artwork.title} view ${index + 1}`}
                        width={160}
                        height={200}
                        className="w-full h-full object-cover cursor-pointer hover:opacity-75 transition-opacity"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Information */}
            <div className="space-y-8">
              {/* Title and Basics */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-500">{artwork.category.replace('-', ' ')}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-500">{artwork.year}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
                  {artwork.title}
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  {artwork.medium} • {artwork.size.original}
                </p>
              </div>

              {/* Description */}
              <div>
                <p className="text-gray-700 leading-relaxed">
                  {artwork.description}
                </p>
              </div>

              {/* Pricing and Availability */}
              <div className="space-y-6 border-t pt-8">
                {/* Original */}
                {artwork.availability.original && artwork.price.original && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Original Artwork</h3>
                        <p className="text-sm text-gray-600">One-of-a-kind piece</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">${artwork.price.original.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">Free shipping</div>
                      </div>
                    </div>
                    <button className="w-full btn-primary">
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Purchase Original
                    </button>
                  </div>
                )}

                {/* Prints */}
                {artwork.availability.print && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">High-Quality Prints</h3>
                      <p className="text-sm text-gray-600">Museum-quality reproduction</p>
                    </div>
                    <div className="space-y-3">
                      {artwork.printOptions.map((option, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-white rounded border">
                          <span className="font-medium">{option.size}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-semibold">${option.price}</span>
                            <button className="btn-secondary text-sm px-4 py-2">
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-6 border-t">
                <button className="btn-secondary flex-1">
                  <Heart className="w-5 h-5 mr-2" />
                  Add to Favorites
                </button>
                <button className="btn-secondary px-6">
                  <Share className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Additional Information Tabs */}
          <div className="mt-24 border-t pt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Artist Story */}
              <div>
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">Artist's Story</h3>
                <p className="text-gray-700 leading-relaxed">
                  {artwork.story}
                </p>
              </div>

              {/* Details */}
              <div>
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">Details</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Medium</dt>
                    <dd className="mt-1 text-gray-900">{artwork.medium}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Year</dt>
                    <dd className="mt-1 text-gray-900">{artwork.year}</dd>
                  </div>
                  {artwork.dimensions?.original && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Dimensions</dt>
                      <dd className="mt-1 text-gray-900">
                        {artwork.dimensions.original.width}" × {artwork.dimensions.original.height}" × {artwork.dimensions.original.depth}"
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Category</dt>
                    <dd className="mt-1 text-gray-900 capitalize">
                      {artwork.category.replace('-', ' ')}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Tags</dt>
                    <dd className="mt-1">
                      <div className="flex flex-wrap gap-2">
                        {artwork.tags.map(tag => (
                          <span key={tag} className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export async function generateStaticParams() {
  return mockArtworks.map((artwork) => ({
    slug: artwork.slug,
  }))
}
