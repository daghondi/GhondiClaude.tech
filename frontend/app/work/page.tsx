import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Palette, Code, Layers, Play, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Portfolio | GhondiClaude.tech',
  description: 'Explore my multidisciplinary work across Fine Art, Urban Planning, and Technology.',
}

export default function WorkPage() {
  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-tertiary">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-2 h-2 bg-accent-blue rounded-full animate-ping" />
          <div className="absolute top-40 right-32 w-1 h-1 bg-white rounded-full animate-pulse" />
          <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-accent-blue rounded-full animate-bounce" />
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white/60 rounded-full animate-pulse delay-1000" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-white to-accent-blue rounded-full flex items-center justify-center">
                <Palette className="w-4 h-4 text-dark-primary" />
              </div>
              <span className="text-accent-blue font-medium tracking-wider uppercase text-sm">Portfolio</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-accent-blue bg-clip-text text-transparent">
                Three Worlds, One Vision
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Journey through my multidisciplinary portfolio where 
              <span className="text-white font-semibold"> artistic expression</span>, 
              <span className="text-accent-blue font-semibold"> technological innovation</span>, and 
              <span className="text-white font-semibold"> urban planning expertise</span> converge 
              to create solutions that are both beautiful and functional.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Sections */}
      <section className="section relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-6 h-full">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="border border-white/10" />
            ))}
          </div>
        </div>
        
        <div className="section-container relative">
          <div className="space-y-32">
            
            {/* 01. Fine Art */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-white/20 to-accent-blue rounded-2xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">01</span>
                  </div>
                  <div className="h-px bg-gradient-to-r from-accent-blue to-transparent flex-1" />
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Palette className="w-8 h-8 text-accent-blue" />
                    <h2 className="text-4xl lg:text-5xl font-heading font-bold">Fine Art</h2>
                  </div>
                  
                  <p className="text-xl text-gray-300 leading-relaxed">
                    Explore my artistic journey through paintings, mixed media, and digital art that captures 
                    the essence of human experience. Each piece tells a story of emotion, color, and form 
                    converging to create visual poetry.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-dark-tertiary/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">Featured Collection</h3>
                      <p className="text-gray-400 mb-4">
                        "Urban Reflections" - A series exploring the intersection of city life and human emotion
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-accent-blue/20 text-accent-blue rounded-full text-sm">Oil on Canvas</span>
                        <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm">Mixed Media</span>
                        <span className="px-3 py-1 bg-accent-blue/20 text-accent-blue rounded-full text-sm">2023-2024</span>
                      </div>
                    </div>
                    
                    <Link href="/portfolio/fine-art" className="btn-primary group inline-flex">
                      <Palette className="w-5 h-5 mr-2" />
                      View Art Portfolio
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="relative group">
                {/* Featured Artwork Placeholder */}
                <div className="aspect-[4/5] bg-gradient-to-br from-white/10 via-accent-blue/10 to-white/5 rounded-2xl border border-white/10 overflow-hidden group-hover:scale-105 transition-all duration-500 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-accent-blue/15 flex items-center justify-center">
                    <div className="text-center space-y-6 p-8">
                      <div className="w-24 h-24 mx-auto bg-gradient-to-br from-white/20 to-accent-blue/30 rounded-2xl flex items-center justify-center">
                        <Palette className="w-12 h-12 text-white" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-heading font-bold text-white">Featured Painting</h3>
                        <p className="text-gray-300">"Convergence of Dreams"</p>
                        <p className="text-sm text-gray-400">Oil on Canvas • 36" x 48" • 2024</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Overlay for interactivity */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Floating accent elements */}
                <div className="absolute -top-6 -right-6 w-3 h-3 bg-accent-blue/60 rounded-full animate-pulse" />
                <div className="absolute -bottom-6 -left-6 w-2 h-2 bg-white/40 rounded-full animate-bounce" />
              </div>
            </div>

            {/* 02. Tech Projects */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1 relative group">
                <div className="aspect-video bg-gradient-to-br from-accent-blue/20 via-white/10 to-accent-blue/20 rounded-2xl border border-white/10 overflow-hidden group-hover:scale-105 transition-all duration-500 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-dark-tertiary/80 to-dark-quaternary/80 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-20 h-20 mx-auto bg-gradient-to-br from-white/20 to-accent-blue/30 rounded-2xl flex items-center justify-center">
                        <Code className="w-10 h-10 text-white" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-heading font-bold text-white">AI Innovation Lab</h3>
                        <p className="text-gray-300 text-sm">Interactive Demos & Case Studies</p>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-accent-blue text-sm">
                        <Play className="w-4 h-4" />
                        <span>Explore Projects</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Interactive overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 to-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Tech accent elements */}
                <div className="absolute -top-4 -left-4 w-4 h-4 bg-white/60 rounded-full animate-ping" />
                <div className="absolute -bottom-4 -right-4 w-3 h-3 bg-accent-blue/80 rounded-full animate-bounce" />
              </div>
              
              <div className="order-1 lg:order-2 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-white/20 to-accent-blue rounded-2xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">02</span>
                  </div>
                  <div className="h-px bg-gradient-to-r from-accent-blue to-transparent flex-1" />
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Code className="w-8 h-8 text-accent-blue" />
                    <h2 className="text-4xl lg:text-5xl font-heading font-bold">Tech Projects</h2>
                  </div>
                  
                  <p className="text-xl text-gray-300 leading-relaxed">
                    Dive into my technology laboratory where AI experiments, machine learning models, 
                    and innovative software solutions come to life. Each project represents a step 
                    toward the future of human-computer interaction.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-dark-tertiary/30 backdrop-blur-sm border border-white/10 rounded-lg p-4">
                        <h4 className="font-semibold text-white mb-2">AI & Machine Learning</h4>
                        <p className="text-gray-400 text-sm">Neural networks, computer vision, and intelligent systems</p>
                      </div>
                      <div className="bg-dark-tertiary/30 backdrop-blur-sm border border-white/10 rounded-lg p-4">
                        <h4 className="font-semibold text-white mb-2">Web Applications</h4>
                        <p className="text-gray-400 text-sm">Full-stack solutions and interactive experiences</p>
                      </div>
                    </div>
                    
                    <Link href="/portfolio/tech-projects" className="btn-primary group inline-flex">
                      <Code className="w-5 h-5 mr-2" />
                      Explore Tech Lab
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* 03. Smart City Symphony */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-white/20 to-accent-blue rounded-2xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">03</span>
                  </div>
                  <div className="h-px bg-gradient-to-r from-accent-blue to-transparent flex-1" />
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Layers className="w-8 h-8 text-accent-blue" />
                    <h2 className="text-4xl lg:text-5xl font-heading font-bold">Smart City Symphony</h2>
                  </div>
                  
                  <p className="text-xl text-gray-300 leading-relaxed">
                    A comprehensive urban planning framework that orchestrates AI-driven traffic optimization 
                    with community-centered design principles. This flagship project demonstrates how technology 
                    can serve human needs while preserving cultural identity.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-dark-tertiary/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-white mb-4">Project Highlights</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-accent-blue rounded-full"></div>
                          <span className="text-gray-300">AI Traffic Optimization</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                          <span className="text-gray-300">Community Integration</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-accent-blue rounded-full"></div>
                          <span className="text-gray-300">Sustainable Design</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                          <span className="text-gray-300">Real-time Analytics</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <Link href="/work/smart-city-symphony" className="btn-primary group">
                        <Layers className="w-5 h-5 mr-2" />
                        View Project
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <button className="btn-ghost group">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Case Study
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative group">
                <div className="aspect-video bg-gradient-to-br from-accent-blue/20 via-white/10 to-accent-blue/20 rounded-2xl border border-white/10 overflow-hidden group-hover:scale-105 transition-all duration-500 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-dark-tertiary/80 to-dark-quaternary/80 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-20 h-20 mx-auto bg-gradient-to-br from-white/20 to-accent-blue/30 rounded-2xl flex items-center justify-center">
                        <Layers className="w-10 h-10 text-white" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-heading font-bold text-white">3D City Visualization</h3>
                        <p className="text-gray-300 text-sm">Interactive Urban Planning Model</p>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-accent-blue text-sm">
                        <Play className="w-4 h-4" />
                        <span>Explore Model</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 to-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Urban planning accent elements */}
                <div className="absolute -top-6 -right-6 w-3 h-3 bg-white/60 rounded-full animate-pulse" />
                <div className="absolute -bottom-6 -left-6 w-2 h-2 bg-accent-blue/80 rounded-full animate-bounce" />
                <div className="absolute top-1/2 -left-8 w-1 h-1 bg-white/40 rounded-full animate-ping" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy & Approach */}
      <section className="section bg-gradient-to-b from-dark-secondary/30 to-dark-primary relative">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-accent-blue rounded-full animate-ping" />
          <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-white/40 rounded-full animate-pulse" />
          <div className="absolute top-1/2 right-1/6 w-3 h-3 bg-accent-blue/60 rounded-full animate-bounce" />
        </div>
        
        <div className="section-container relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold">
              <span className="bg-gradient-to-r from-white to-accent-blue bg-clip-text text-transparent">
                Where Disciplines Converge
              </span>
            </h2>
            
            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed">
              Each project in my portfolio represents more than individual expertise—they showcase the 
              <span className="text-accent-blue font-semibold"> transformative power</span> that emerges 
              when artistic vision, technical innovation, and urban planning methodology 
              <span className="text-white font-semibold"> unite</span> to solve complex challenges.
            </p>
            
            <div className="pt-8">
              <blockquote className="text-xl lg:text-2xl font-playfair italic text-gray-200 relative">
                <span className="text-4xl text-white/30 absolute -top-4 -left-2">&ldquo;</span>
                True innovation happens at the intersections—where different ways of thinking 
                collide and create something entirely new.
                <span className="text-4xl text-white/30 absolute -bottom-2 -right-2">&rdquo;</span>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/5 via-white/3 to-accent-blue/5" />
        <div className="absolute inset-0">
          <div className="grid grid-cols-8 h-full opacity-5">
            {Array.from({ length: 32 }).map((_, i) => (
              <div key={i} className="border border-white/20" />
            ))}
          </div>
        </div>
        
        <div className="section-container relative">
          <div className="text-center space-y-8">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold">
              <span className="text-white">Ready to </span>
              <span className="bg-gradient-to-r from-white to-accent-blue bg-clip-text text-transparent">
                Collaborate?
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Whether you're interested in commissioning artwork, need urban planning consultation, 
              or want to explore cutting-edge technology solutions—let's create something extraordinary together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/contact" className="btn-primary btn-lg group">
                <Code className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                Start a Project
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/about" className="btn-secondary btn-lg group">
                <Play className="w-5 h-5 mr-2" />
                My Process
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
