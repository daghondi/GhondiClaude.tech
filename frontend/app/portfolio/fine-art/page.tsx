import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ShoppingCart, Calendar, DollarSign } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Fine Art Collection | Professional Artworks by Ghondi Claude',
  description: 'Discover and purchase original (or Prints) fine art pieces by Ghondi Claude. Contemporary paintings, mixed media works, and limited edition prints available.',
}

const artworks = [
  {
    id: 1,
    title: "Convergence of Dreams",
    medium: "Oil on Canvas",
    dimensions: "36\" x 48\"",
    year: "2024",
    collection: "Urban Reflections",
    description: "A powerful exploration of the intersection between reality and aspiration, where urban landscapes meet the realm of dreams. This piece captures the ethereal moment when cityscape and imagination converge.",
    tags: ["Oil Painting", "Urban Art", "Contemporary"],
    price: 4500,
    originalPrice: null,
    status: "Available",
    featured: true,
    image: "/api/placeholder/600/800",
  },
  {
    id: 2,
    title: "Digital Echoes",
    medium: "Mixed Media on Canvas",
    dimensions: "24\" x 36\"",
    year: "2024",
    collection: "Urban Reflections",
    description: "This innovative piece examines how digital connectivity shapes our emotional landscapes in modern city life. Mixed media elements create texture and depth.",
    tags: ["Mixed Media", "Digital Art", "Contemporary"],
    price: 2800,
    originalPrice: 3200,
    status: "Available",
    featured: false,
    image: "/api/placeholder/600/800",
  },
  {
    id: 3,
    title: "Metropolitan Pulse",
    medium: "Acrylic on Canvas",
    dimensions: "48\" x 60\"",
    year: "2023",
    collection: "Urban Reflections",
    description: "A vibrant representation of city energy, capturing the rhythm and movement of urban life through bold strokes and dynamic composition.",
    tags: ["Acrylic", "Large Format", "Urban"],
    price: 6500,
    originalPrice: null,
    status: "Sold",
    featured: false,
    image: "/api/placeholder/600/800",
  },
  {
    id: 4,
    title: "Silent Connections",
    medium: "Oil on Canvas",
    dimensions: "30\" x 40\"",
    year: "2023",
    collection: "Human Stories",
    description: "An intimate study of human connection in spaces of solitude, exploring the paradox of urban loneliness through masterful portraiture.",
    tags: ["Portrait", "Oil Painting", "Figurative"],
    price: 3800,
    originalPrice: null,
    status: "Available",
    featured: true,
    image: "/api/placeholder/600/800",
  },
  {
    id: 5,
    title: "Tomorrow's Blueprint",
    medium: "Digital Mixed Media Print",
    dimensions: "20\" x 30\"",
    year: "2024",
    collection: "Future Visions",
    description: "A forward-looking piece that imagines the intersection of technology and human creativity. Limited edition of 25 prints.",
    tags: ["Digital Art", "Limited Edition", "Futurism"],
    price: 850,
    originalPrice: null,
    status: "Available",
    featured: false,
    image: "/api/placeholder/600/800",
  },
  {
    id: 6,
    title: "Harmony in Chaos",
    medium: "Oil on Canvas",
    dimensions: "42\" x 54\"",
    year: "2023",
    collection: "Urban Reflections",
    description: "Finding beauty and order within the apparent chaos of modern urban environments. This large-format piece commands attention and contemplation.",
    tags: ["Oil Painting", "Abstract", "Large Format"],
    price: 5200,
    originalPrice: null,
    status: "Available",
    featured: false,
    image: "/api/placeholder/600/800",
  }
]

export default function FineArtPortfolioPage() {
  const featuredArtworks = artworks.filter(art => art.featured && art.status === 'Available')
  const availableArtworks = artworks.filter(art => art.status === 'Available')
  
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
      </div>

      {/* Hero Section - Clean and Professional */}
      <section className="relative py-20 backdrop-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-gray-900 mb-6">
              Fine Art Collection
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
              Original paintings and limited edition works exploring the intersection of 
              urban life, human connection, and contemporary experience.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium">
                {availableArtworks.length} Available Works
              </span>
              <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full font-medium">
                3 Collections
              </span>
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium">
                Worldwide Shipping
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      {featuredArtworks.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
                Featured Works
              </h2>
              <p className="text-lg text-gray-600">
                Highlighted pieces from the current collection
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {featuredArtworks.map((artwork) => (
                <div key={artwork.id} className="group">
                  <div className="relative overflow-hidden rounded-2xl mb-6 artwork-hover">
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-96 object-cover"
                    />
                    {artwork.status === 'Available' && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                          <Star className="w-4 h-4 mr-1" />
                          Featured
                        </span>
                      </div>
                    )}
                    {artwork.originalPrice && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold uppercase">Sale</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">
                        {artwork.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{artwork.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {artwork.tags.map((tag, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="text-sm text-gray-500 space-y-1">
                        <p>{artwork.medium} • {artwork.dimensions}</p>
                        <p>{artwork.year}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-3xl font-bold text-gray-900">
                          ${artwork.price.toLocaleString()}
                        </span>
                        {artwork.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">
                            ${artwork.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      
                      {artwork.status === 'Available' ? (
                        <button className="bg-black text-white hover:bg-gray-800 font-bold tracking-wide px-8 py-4 text-base rounded-lg transition-all duration-200 inline-flex items-center">
                          <ShoppingCart className="w-5 h-5 mr-2" />
                          Buy Now
                        </button>
                      ) : (
                        <span className="px-6 py-3 bg-gray-300 text-gray-600 rounded-lg font-semibold">
                          Sold
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Artworks Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Complete Collection
            </h2>
            <p className="text-lg text-gray-600">
              Browse all available artworks and prints
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {artworks.map((artwork) => (
              <div key={artwork.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm overflow-hidden group transition-all duration-300 hover:shadow-lg hover:border-gray-300">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {artwork.status === 'Sold' && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-lg">
                        SOLD
                      </span>
                    </div>
                  )}
                  {artwork.featured && artwork.status === 'Available' && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        Featured
                      </span>
                    </div>
                  )}
                  {artwork.originalPrice && artwork.status === 'Available' && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold uppercase">Sale</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-display font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {artwork.title}
                  </h3>
                  
                  <div className="text-sm text-gray-600">
                    <p>{artwork.medium}</p>
                    <p>{artwork.dimensions} • {artwork.year}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {artwork.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-gray-900">
                        ${artwork.price.toLocaleString()}
                      </span>
                      {artwork.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          ${artwork.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    
                    {artwork.status === 'Available' ? (
                      <button className="bg-blue-600 text-white hover:bg-blue-700 shadow-sm px-6 py-3 rounded-lg transition-all duration-200 inline-flex items-center text-sm font-semibold">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </button>
                    ) : (
                      <span className="text-sm text-gray-500 font-medium">
                        Sold
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About the Artist - Professional CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
            Invest in Original Art
          </h2>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Each piece is an original work, carefully crafted to capture moments of human 
            experience and urban beauty. All artworks come with a certificate of authenticity 
            and include worldwide shipping.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Authenticity Guaranteed</h3>
              <p className="text-gray-600">Each piece includes certificate of authenticity</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Purchase</h3>
              <p className="text-gray-600">Safe and secure payment processing</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Shipping</h3>
              <p className="text-gray-600">Worldwide shipping within 3-5 business days</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-black text-white hover:bg-gray-800 font-bold tracking-wide px-10 py-5 text-xl rounded-lg transition-all duration-200 inline-flex items-center justify-center">
              Commission Custom Work
            </Link>
            <Link href="/contact" className="border border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm px-10 py-5 text-xl rounded-lg transition-all duration-200 inline-flex items-center justify-center font-semibold">
              Ask a Question
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
