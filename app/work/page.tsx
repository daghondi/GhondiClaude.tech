import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Palette, Code, Layers, ExternalLink, Calendar, Tag } from 'lucide-react'
import { getProjects, getSiteSettings, urlFor } from '@/sanity/utils'

export const metadata: Metadata = {
  title: 'Portfolio | GhondiClaude.me',
  description: 'Explore my multidisciplinary work across Fine Art, Urban Planning, and Technology.',
}

export default async function WorkPage() {
  // Fetch all projects and site settings
  const allProjects = await getProjects()
  const siteSettings = await getSiteSettings()
  
  // Group projects by type for stats
  const projectsByType = {
    'fine-art': allProjects.filter((p: any) => p.projectType === 'fine-art'),
    'technology': allProjects.filter((p: any) => p.projectType === 'technology'),
    'urban-planning': allProjects.filter((p: any) => p.projectType === 'urban-planning')
  }

  return (
    <main className="min-h-screen pt-20 bg-white">
      {/* Hero Section - Chris Do Style */}
      <section className="relative py-24">        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h6 className="text-xs uppercase tracking-widest text-gray-500 font-medium mb-8">
              Professional Portfolio
            </h6>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold tracking-tight leading-none text-gray-900 mb-12">
              {siteSettings?.workPageContent?.workTitle || "My Work"}
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
              {siteSettings?.workPageContent?.workSubtitle || 
                "A curated collection of projects spanning Fine Art, Urban Planning, and Technology"
              }
            </p>
          </div>
        </div>
      </section>

      {/* Projects Overview Stats - Chris Do Style */}
      <section className="py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <Link href="/portfolio/fine-art" className="group cursor-pointer">
              <div className="card-hover transition-all duration-300 group-hover:scale-105">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                  <Palette className="w-8 h-8 text-blue-600 group-hover:text-blue-700" />
                </div>
                <h3 className="text-3xl font-display font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{projectsByType['fine-art'].length}</h3>
                <h6 className="text-xs uppercase tracking-widest text-gray-500 font-medium group-hover:text-blue-600 transition-colors">Fine Art Projects</h6>
                <p className="text-sm text-gray-400 mt-2 group-hover:text-blue-500 transition-colors">View Collection →</p>
              </div>
            </Link>
            <Link href="/portfolio/tech-projects" className="group cursor-pointer">
              <div className="card-hover transition-all duration-300 group-hover:scale-105">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                  <Code className="w-8 h-8 text-blue-600 group-hover:text-blue-700" />
                </div>
                <h3 className="text-3xl font-display font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{projectsByType['technology'].length}</h3>
                <h6 className="text-xs uppercase tracking-widest text-gray-500 font-medium group-hover:text-blue-600 transition-colors">Tech Projects</h6>
                <p className="text-sm text-gray-400 mt-2 group-hover:text-blue-500 transition-colors">View Projects →</p>
              </div>
            </Link>
            <Link href="/work?category=urban" className="group cursor-pointer">
              <div className="card-hover transition-all duration-300 group-hover:scale-105">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                  <Layers className="w-8 h-8 text-blue-600 group-hover:text-blue-700" />
                </div>
                <h3 className="text-3xl font-display font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{projectsByType['urban-planning'].length}</h3>
                <h6 className="text-xs uppercase tracking-widest text-gray-500 font-medium group-hover:text-blue-600 transition-colors">Urban Planning Projects</h6>
                <p className="text-sm text-gray-400 mt-2 group-hover:text-blue-500 transition-colors">View Plans →</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* All Projects Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h6 className="text-xs uppercase tracking-widest text-gray-500 font-medium mb-6">
              Portfolio
            </h6>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-8">
              {siteSettings?.workPageContent?.featuredSectionTitle || "Featured Projects"}
            </h2>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
              {siteSettings?.workPageContent?.featuredSectionSubtitle || 
                "Explore my latest work across different disciplines"
              }
            </p>
          </div>

          {/* Featured Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Fine Art Category */}
            <Link href="/portfolio/fine-art" className="group">
              <article className="card-hover group overflow-hidden h-full">
                {/* Category Image */}
                <div className="aspect-[4/3] rounded-lg mb-6 overflow-hidden relative">
                  {projectsByType['fine-art'][0]?.featuredImage ? (
                    <img
                      src={urlFor(projectsByType['fine-art'][0].featuredImage).url()}
                      alt="Fine Art Portfolio"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Palette className="w-10 h-10 text-blue-600" />
                        </div>
                        <p className="text-blue-600 font-medium">Fine Art Portfolio</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full text-sm font-medium">
                      Fine Art
                    </span>
                  </div>
                  
                  {/* Project Count */}
                  <div className="absolute bottom-4 right-4">
                    <span className="px-3 py-1 bg-black/70 text-white rounded-full text-sm font-medium">
                      {projectsByType['fine-art'].length} projects
                    </span>
                  </div>
                </div>
                
                {/* Category Info */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-display font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    Fine Art Collection
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Original artworks, prints, and creative explorations that bridge traditional and contemporary artistic practices.
                  </p>
                  
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-blue-600 font-medium inline-flex items-center gap-1 text-sm">
                      Explore Collection
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Palette className="w-3 h-3" />
                      Visual Arts
                    </div>
                  </div>
                </div>
              </article>
            </Link>

            {/* Tech Projects Category */}
            <Link href="/portfolio/tech-projects" className="group">
              <article className="card-hover group overflow-hidden h-full">
                {/* Category Image */}
                <div className="aspect-[4/3] rounded-lg mb-6 overflow-hidden relative">
                  {projectsByType['technology'][0]?.featuredImage ? (
                    <img
                      src={urlFor(projectsByType['technology'][0].featuredImage).url()}
                      alt="Technology Portfolio"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Code className="w-10 h-10 text-green-600" />
                        </div>
                        <p className="text-green-600 font-medium">Tech Portfolio</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full text-sm font-medium">
                      Tech
                    </span>
                  </div>
                  
                  {/* Project Count */}
                  <div className="absolute bottom-4 right-4">
                    <span className="px-3 py-1 bg-black/70 text-white rounded-full text-sm font-medium">
                      {projectsByType['technology'].length} projects
                    </span>
                  </div>
                </div>
                
                {/* Category Info */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-display font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                    Tech Projects
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Innovative software solutions, AI experiments, and web applications that solve real-world challenges.
                  </p>
                  
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-green-600 font-medium inline-flex items-center gap-1 text-sm">
                      View Projects
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Code className="w-3 h-3" />
                      Development
                    </div>
                  </div>
                </div>
              </article>
            </Link>

            {/* Urban Planning Category */}
            <Link href="/work?category=urban" className="group">
              <article className="card-hover group overflow-hidden h-full">
                {/* Category Image */}
                <div className="aspect-[4/3] rounded-lg mb-6 overflow-hidden relative">
                  {projectsByType['urban-planning'][0]?.featuredImage ? (
                    <img
                      src={urlFor(projectsByType['urban-planning'][0].featuredImage).url()}
                      alt="Urban Planning Portfolio"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Layers className="w-10 h-10 text-purple-600" />
                        </div>
                        <p className="text-purple-600 font-medium">Urban Planning</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full text-sm font-medium">
                      Urban Planning
                    </span>
                  </div>
                  
                  {/* Project Count */}
                  <div className="absolute bottom-4 right-4">
                    <span className="px-3 py-1 bg-black/70 text-white rounded-full text-sm font-medium">
                      {projectsByType['urban-planning'].length} projects
                    </span>
                  </div>
                </div>
                
                {/* Category Info */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-display font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                    Urban Planning
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Strategic city planning, sustainable development solutions, and community-focused design initiatives.
                  </p>
                  
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-purple-600 font-medium inline-flex items-center gap-1 text-sm">
                      View Plans
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Layers className="w-3 h-3" />
                      Planning
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          </div>

          {/* Fallback message if no projects */}
          {allProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Palette className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
                {siteSettings?.workPageContent?.noProjectsTitle || "More Projects Upon Request"}
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {siteSettings?.workPageContent?.noProjectsDescription || 
                  "I'm constantly working on new projects across art, technology, and urban planning. Reach out to see my latest work or discuss potential collaborations."
                }
              </p>
              <Link href="/contact" className="btn-primary">
                Get in Touch
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action - Chris Do Style */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h6 className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-4">
            Let's collaborate
          </h6>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-8">
            {siteSettings?.workPageContent?.ctaTitle || "Ready to Create"} <span className="text-blue-400">Something Amazing</span>?
          </h2>
          <p className="text-lg text-gray-300 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            {siteSettings?.workPageContent?.ctaDescription || 
              "Whether you are looking for artistic collaboration, urban planning insights, or innovative technology solutions, let's create something amazing together."
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact" className="group">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-blue-700">
                  <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="text-left">
                  <h6 className="text-xs uppercase tracking-widest text-gray-400">Contact</h6>
                  <span className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors">Start a Project</span>
                </div>
              </div>
            </Link>
            
            <Link href="/about" className="group">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-gray-100">
                  <ArrowRight className="w-6 h-6 text-gray-900 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="text-left">
                  <h6 className="text-xs uppercase tracking-widest text-gray-400">About</h6>
                  <span className="text-base font-semibold text-white group-hover:text-gray-300 transition-colors">Learn More About Me</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
