import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Download, ExternalLink, Play, Palette, Calendar, Tag } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Fine Art Portfolio | GhondiClaude.tech',
  description: 'Explore Ghondi Claude\'s fine art collection - paintings, mixed media, and artistic expressions that capture the essence of human experience.',
}

const artworks = [
  {
    id: 1,
    title: "Convergence of Dreams",
    medium: "Oil on Canvas",
    dimensions: "36\" x 48\"",
    year: "2024",
    collection: "Urban Reflections",
    description: "A powerful exploration of the intersection between reality and aspiration, where urban landscapes meet the realm of dreams.",
    tags: ["Oil Painting", "Urban Art", "Contemporary"],
    price: "Available on Request",
    status: "Available"
  },
  {
    id: 2,
    title: "Digital Echoes",
    medium: "Mixed Media",
    dimensions: "24\" x 36\"",
    year: "2024",
    collection: "Urban Reflections",
    description: "This piece examines how digital connectivity shapes our emotional landscapes in modern city life.",
    tags: ["Mixed Media", "Digital Art", "Contemporary"],
    price: "Available on Request",
    status: "Available"
  },
  {
    id: 3,
    title: "Metropolitan Pulse",
    medium: "Acrylic on Canvas",
    dimensions: "48\" x 60\"",
    year: "2023",
    collection: "Urban Reflections",
    description: "A vibrant representation of city energy, capturing the rhythm and movement of urban life.",
    tags: ["Acrylic", "Large Format", "Urban"],
    price: "Available on Request",
    status: "Sold"
  },
  {
    id: 4,
    title: "Silent Connections",
    medium: "Oil on Canvas",
    dimensions: "30\" x 40\"",
    year: "2023",
    collection: "Human Stories",
    description: "An intimate study of human connection in spaces of solitude, exploring the paradox of urban loneliness.",
    tags: ["Portrait", "Oil Painting", "Figurative"],
    price: "Available on Request",
    status: "Available"
  },
  {
    id: 5,
    title: "Tomorrow's Blueprint",
    medium: "Digital Mixed Media",
    dimensions: "20\" x 30\"",
    year: "2024",
    collection: "Future Visions",
    description: "A forward-looking piece that imagines the intersection of technology and human creativity.",
    tags: ["Digital Art", "Futurism", "Technology"],
    price: "Available on Request",
    status: "Available"
  },
  {
    id: 6,
    title: "Harmony in Chaos",
    medium: "Oil on Canvas",
    dimensions: "42\" x 54\"",
    year: "2023",
    collection: "Urban Reflections",
    description: "Finding beauty and order within the apparent chaos of modern urban environments.",
    tags: ["Oil Painting", "Abstract", "Large Format"],
    price: "Available on Request",
    status: "Available"
  }
]

const collections = [
  {
    name: "Urban Reflections",
    count: 4,
    description: "Examining the relationship between city life and human emotion"
  },
  {
    name: "Human Stories",
    count: 1,
    description: "Intimate portraits of connection and solitude"
  },
  {
    name: "Future Visions", 
    count: 1,
    description: "Imagining the intersection of technology and creativity"
  }
]

export default function FineArtPortfolioPage() {
  return (
    <main className="min-h-screen pt-16">
      {/* Back Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/"
          className="inline-flex items-center text-accent-blue hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-tertiary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Palette className="w-8 h-8 text-accent-blue" />
              <span className="text-accent-blue font-medium tracking-wider uppercase text-sm">Fine Art Portfolio</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-accent-blue bg-clip-text text-transparent">
                Artistic Expression
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              A journey through color, form, and emotion. Each piece tells a story of 
              human experience, urban life, and the beauty found in moments of connection.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="px-4 py-2 bg-accent-blue/20 text-accent-blue rounded-full">6 Original Works</span>
              <span className="px-4 py-2 bg-white/20 text-white rounded-full">3 Collections</span>
              <span className="px-4 py-2 bg-accent-blue/20 text-accent-blue rounded-full">2015 - Present</span>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Overview */}
      <section className="section">
        <div className="section-container">
          <h2 className="text-4xl font-heading text-center mb-16">
            <span className="text-gradient">Collections</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {collections.map((collection, index) => (
              <div key={collection.name} className="card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-accent-blue to-white rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-white">{collection.name}</h3>
                    <p className="text-accent-blue text-sm">{collection.count} pieces</p>
                  </div>
                </div>
                <p className="text-gray-400">{collection.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section bg-dark-secondary/30">
        <div className="section-container">
          <h2 className="text-4xl font-heading text-center mb-16">
            <span className="text-gradient">Gallery</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artworks.map((artwork) => (
              <div key={artwork.id} className="card group hover:border-accent-blue/50 transition-colors">
                {/* Artwork Image Placeholder */}
                <div className="aspect-[4/5] bg-gradient-to-br from-white/10 via-accent-blue/10 to-white/5 rounded-lg mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                  <div className="text-center">
                    <Palette className="w-12 h-12 text-accent-blue mb-4 mx-auto" />
                    <p className="text-gray-400 text-sm">High-res image</p>
                    <p className="text-gray-500 text-xs">Coming soon</p>
                  </div>
                </div>
                
                {/* Artwork Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-accent-blue transition-colors">
                      {artwork.title}
                    </h3>
                    <p className="text-accent-blue text-sm font-medium">{artwork.collection}</p>
                  </div>
                  
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {artwork.description}
                  </p>
                  
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex justify-between">
                      <span>Medium:</span>
                      <span className="text-gray-300">{artwork.medium}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dimensions:</span>
                      <span className="text-gray-300">{artwork.dimensions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Year:</span>
                      <span className="text-gray-300">{artwork.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className={artwork.status === 'Available' ? 'text-accent-blue' : 'text-gray-500'}>
                        {artwork.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {artwork.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-accent-blue/20 text-accent-blue rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-3 pt-2">
                    <button className="btn-primary btn-sm flex-1">
                      <Play className="w-4 h-4 mr-1" />
                      View Details
                    </button>
                    {artwork.status === 'Available' && (
                      <button className="btn-ghost btn-sm" title="Inquire about artwork">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artist Statement */}
      <section className="section">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-heading mb-8">
              <span className="text-gradient">Artist Statement</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                My artistic journey is deeply rooted in the exploration of human connection within 
                the context of modern urban life. Through painting and mixed media, I seek to capture 
                the subtle emotions that emerge from our relationship with the built environment.
              </p>
              <p>
                Each piece begins with observation—watching how light falls on concrete, how people 
                move through spaces, how technology shapes our interactions. I'm fascinated by the 
                paradoxes of city life: isolation within crowds, stillness within movement, 
                nature within artifice.
              </p>
              <p>
                My work bridges traditional techniques with contemporary themes, using oil and acrylic 
                alongside digital elements to create layered narratives. The urban landscape becomes 
                a canvas for exploring deeper questions about identity, belonging, and our collective future.
              </p>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/10">
              <blockquote className="text-2xl font-playfair italic text-gray-200 mb-4">
                "Art is not what you see, but what you make others see through the lens of shared humanity."
              </blockquote>
              <p className="text-accent-blue font-medium">— Ghondi Claude</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section bg-gradient-to-br from-dark-primary to-dark-secondary">
        <div className="section-container text-center">
          <h2 className="text-4xl font-heading mb-6">
            Interested in <span className="text-gradient">Commissioning</span> a Piece?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            I create custom artwork for collectors, businesses, and spaces that value 
            original artistic expression. Let's discuss your vision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              <Palette className="w-5 h-5 mr-2" />
              Commission Artwork
            </Link>
            <Link href="/about" className="btn-secondary">
              Learn About My Process
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
