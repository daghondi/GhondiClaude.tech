import React from 'react'
import Link from 'next/link'
import { getSiteSettings } from '@/sanity/utils'
import ShopClient from './components/ShopClient'

export const metadata = {
  title: 'Art Shop | GhondiClaude.tech',
  description: 'Discover and purchase original artworks and high-quality prints from Ghondi Claude\'s collection.',
}

// Mock artwork data - this would come from Sanity CMS in production
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
      "/api/placeholder/600/750",
      "/api/placeholder/600/750", 
      "/api/placeholder/600/750"
    ],
    size: {
      original: "24\" × 30\"",
      print: "Multiple sizes available"
    },
    medium: "Acrylic on Canvas",
    year: 2024,
    category: "fine-art",
    featured: true,
    tags: ["urban", "contemporary", "colorful"]
  },
  {
    id: 2,
    title: "Digital Convergence",
    slug: "digital-convergence", 
    price: {
      original: 950,
      print: 65
    },
    availability: {
      original: true,
      print: true
    },
    images: [
      "/api/placeholder/600/600",
      "/api/placeholder/600/600"
    ],
    size: {
      original: "20\" × 20\"",
      print: "Multiple sizes available"
    },
    medium: "Mixed Media",
    year: 2024,
    category: "digital-art",
    featured: false,
    tags: ["digital", "abstract", "modern"]
  },
  {
    id: 3,
    title: "City Planning Study",
    slug: "city-planning-study",
    price: {
      original: null,
      print: 45
    },
    availability: {
      original: false,
      print: true
    },
    images: [
      "/api/placeholder/800/600",
      "/api/placeholder/800/600"
    ],
    size: {
      original: null,
      print: "Multiple sizes available"
    },
    medium: "Digital Illustration",
    year: 2024,
    category: "urban-planning",
    featured: false,
    tags: ["planning", "architectural", "study"]
  },
  {
    id: 4,
    title: "Algorithmic Beauty",
    slug: "algorithmic-beauty",
    price: {
      original: 1500,
      print: 95
    },
    availability: {
      original: true,
      print: true
    },
    images: [
      "/api/placeholder/500/700",
      "/api/placeholder/500/700",
      "/api/placeholder/500/700"
    ],
    size: {
      original: "18\" × 25\"",
      print: "Multiple sizes available"
    },
    medium: "Digital Art Print",
    year: 2024,
    category: "digital-art",
    featured: true,
    tags: ["algorithmic", "generative", "abstract"]
  },
  {
    id: 5,
    title: "Sustainable Spaces",
    slug: "sustainable-spaces",
    price: {
      original: 850,
      print: 55
    },
    availability: {
      original: false,
      print: true
    },
    images: [
      "/api/placeholder/700/500",
      "/api/placeholder/700/500"
    ],
    size: {
      original: "30\" × 22\"",
      print: "Multiple sizes available"
    },
    medium: "Watercolor & Digital",
    year: 2023,
    category: "urban-planning",
    featured: false,
    tags: ["sustainable", "green", "architecture"]
  },
  {
    id: 6,
    title: "Abstract Frequencies",
    slug: "abstract-frequencies",
    price: {
      original: 1100,
      print: 75
    },
    availability: {
      original: true,
      print: true
    },
    images: [
      "/api/placeholder/600/800",
      "/api/placeholder/600/800",
      "/api/placeholder/600/800",
      "/api/placeholder/600/800"
    ],
    size: {
      original: "16\" × 24\"",
      print: "Multiple sizes available"
    },
    medium: "Oil on Canvas",
    year: 2024,
    category: "fine-art",
    featured: false,
    tags: ["abstract", "frequencies", "vibrant"]
  }
]

export default async function ShopPage() {
  const siteSettings = await getSiteSettings()

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
              Shop
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed mb-16">
              Discover original artworks and high-quality prints that bridge the worlds of fine art, urban planning, and technology
            </p>
            
            {/* Shop Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-display font-bold text-gray-900">{mockArtworks.filter(a => a.availability.original).length}</div>
                <p className="text-xs uppercase tracking-widest text-gray-500">Originals Available</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-display font-bold text-gray-900">{mockArtworks.filter(a => a.availability.print).length}</div>
                <p className="text-xs uppercase tracking-widest text-gray-500">Prints Available</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-display font-bold text-gray-900">{new Set(mockArtworks.map(a => a.category)).size}</div>
                <p className="text-xs uppercase tracking-widest text-gray-500">Categories</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop Grid */}
      <ShopClient artworks={mockArtworks} siteSettings={siteSettings} />
      
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
          
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="input flex-1"
            />
            <button type="submit" className="btn-primary">
              Subscribe
            </button>
          </form>
          
          <p className="text-sm text-gray-400 mt-4">
            Exclusive previews • No spam • Unsubscribe anytime
          </p>
        </div>
      </section>
    </main>
  )
}
