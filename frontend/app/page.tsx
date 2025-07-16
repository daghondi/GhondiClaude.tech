import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GhondiClaude.tech | Multi-Dimensional Creative Portfolio',
  description: 'Welcome to Ghondi Claude\'s universe - where Fine Art, Urban Planning, and Technology converge in a symphony of creativity.',
}

export default function HomePage() {
  return (
    <main id="main-content" className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-tertiary" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-blue/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-magenta/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-accent-gold/10 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="space-y-8">
            {/* Main heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold">
              <span className="block text-gradient">Ghondi</span>
              <span className="block text-white">Claude</span>
            </h1>
            
            {/* Subtitle */}
            <div className="text-xl md:text-2xl lg:text-3xl font-lora text-gray-300 space-y-2">
              <p>Fine Artist</p>
              <p className="text-accent-blue">•</p>
              <p>Urban Planner (MEng)</p>
              <p className="text-accent-magenta">•</p>
              <p>Tech Enthusiast</p>
            </div>
            
            {/* Poetic introduction */}
            <div className="max-w-2xl mx-auto text-lg md:text-xl font-playfair text-gray-400 leading-relaxed">
              <p className="italic">
                &quot;Welcome to the intersection where brushstrokes meet blueprints, 
                where urban dreams are coded into reality, and where technology 
                becomes the canvas for tomorrow&apos;s cities.&quot;
              </p>
            </div>
            
            {/* Call to action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <button className="btn-primary">
                Explore Portfolio
              </button>
              <button className="btn-secondary">
                View Blog
              </button>
              <button className="btn-ghost">
                Get in Touch
              </button>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </section>
      
      {/* Quick navigation section */}
      <section className="section bg-dark-secondary/50">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Fine Art */}
            <div className="card-hover group cursor-pointer">
              <div className="h-64 bg-gradient-to-br from-accent-blue/20 to-accent-blue/5 rounded-lg mb-6 flex items-center justify-center">
                <div className="text-6xl">🎨</div>
              </div>
              <h3 className="text-2xl font-heading mb-4 group-hover:text-accent-blue transition-colors">
                Fine Art
              </h3>
              <p className="text-gray-400">
                Explore paintings, mixed media, and artistic expressions that capture the essence of human experience.
              </p>
            </div>
            
            {/* Urban Planning */}
            <div className="card-hover group cursor-pointer">
              <div className="h-64 bg-gradient-to-br from-accent-magenta/20 to-accent-magenta/5 rounded-lg mb-6 flex items-center justify-center">
                <div className="text-6xl">🏙️</div>
              </div>
              <h3 className="text-2xl font-heading mb-4 group-hover:text-accent-magenta transition-colors">
                Urban Planning
              </h3>
              <p className="text-gray-400">
                Discover innovative approaches to city design, sustainable development, and community planning.
              </p>
            </div>
            
            {/* Tech Lab */}
            <div className="card-hover group cursor-pointer">
              <div className="h-64 bg-gradient-to-br from-accent-gold/20 to-accent-gold/5 rounded-lg mb-6 flex items-center justify-center">
                <div className="text-6xl">💻</div>
              </div>
              <h3 className="text-2xl font-heading mb-4 group-hover:text-accent-gold transition-colors">
                Tech Lab
              </h3>
              <p className="text-gray-400">
                Dive into AI experiments, AR projects, and cybersecurity innovations that shape the future.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured work preview */}
      <section className="section">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-heading mb-6">
              <span className="text-gradient">Featured Work</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A curated selection of projects that showcase the intersection of art, planning, and technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Project showcase */}
            <div className="space-y-6">
              <div className="aspect-video bg-gradient-to-br from-dark-tertiary to-dark-quaternary rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-lg">Project Preview</span>
              </div>
              <div>
                <h3 className="text-2xl font-heading mb-3">Digital Urban Canvas</h3>
                <p className="text-gray-400 mb-4">
                  An interactive installation that visualizes urban data through artistic interpretation, 
                  combining real-time city metrics with generative art algorithms.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-accent-blue/20 text-accent-blue rounded-full text-sm">Art</span>
                  <span className="px-3 py-1 bg-accent-magenta/20 text-accent-magenta rounded-full text-sm">Urban</span>
                  <span className="px-3 py-1 bg-accent-gold/20 text-accent-gold rounded-full text-sm">Tech</span>
                </div>
              </div>
            </div>
            
            {/* Second project */}
            <div className="space-y-6">
              <div className="aspect-video bg-gradient-to-br from-dark-tertiary to-dark-quaternary rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-lg">Project Preview</span>
              </div>
              <div>
                <h3 className="text-2xl font-heading mb-3">Smart City Symphony</h3>
                <p className="text-gray-400 mb-4">
                  A comprehensive urban planning proposal that integrates AI-driven traffic optimization 
                  with community-centered design principles.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-accent-magenta/20 text-accent-magenta rounded-full text-sm">Planning</span>
                  <span className="px-3 py-1 bg-accent-gold/20 text-accent-gold rounded-full text-sm">AI</span>
                  <span className="px-3 py-1 bg-accent-indigo/20 text-accent-indigo rounded-full text-sm">Innovation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
