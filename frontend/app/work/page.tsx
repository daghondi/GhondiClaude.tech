import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio | GhondiClaude.tech',
  description: 'Explore my multidisciplinary work across Fine Art, Urban Planning, and Technology.',
}

export default function WorkPage() {
  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-tertiary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6">
              <span className="text-gradient">Portfolio</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              A curated collection of work spanning three disciplines: 
              Fine Art, Urban Planning, and Technology
            </p>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mt-12">
              <button className="px-6 py-3 bg-accent-blue text-white rounded-full hover:bg-accent-blue/90 transition-colors">
                All Work
              </button>
              <button className="px-6 py-3 border border-accent-blue text-accent-blue rounded-full hover:bg-accent-blue hover:text-white transition-colors">
                Fine Art
              </button>
              <button className="px-6 py-3 border border-accent-magenta text-accent-magenta rounded-full hover:bg-accent-magenta hover:text-white transition-colors">
                Urban Planning
              </button>
              <button className="px-6 py-3 border border-accent-gold text-accent-gold rounded-full hover:bg-accent-gold hover:text-white transition-colors">
                Tech Lab
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="section">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project Cards - These will be populated dynamically */}
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="card-hover group cursor-pointer">
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-gray-500">Project {item}</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-accent-blue/20 text-accent-blue rounded-full text-sm">
                      Fine Art
                    </span>
                    <span className="text-gray-500 text-sm">2024</span>
                  </div>
                  <h3 className="text-xl font-heading group-hover:text-accent-blue transition-colors">
                    Project Title {item}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    A brief description of this project showcasing the intersection of creativity and technology.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">React</span>
                    <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">Three.js</span>
                    <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">AI</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="btn-primary">
              Load More Projects
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section bg-dark-secondary/50">
        <div className="section-container text-center">
          <h2 className="text-4xl font-heading mb-6">
            Interested in <span className="text-gradient">Collaborating</span>?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Let's explore how we can bring your vision to life through the intersection 
            of art, urban design, and technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              Start a Project
            </button>
            <button className="btn-secondary">
              View Process
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
