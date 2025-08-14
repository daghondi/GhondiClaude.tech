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

          {allProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allProjects.map((project: any) => (
                <article key={project._id} className="card-hover group overflow-hidden">
                  {/* Project Image */}
                  <div className="aspect-video rounded-lg mb-6 overflow-hidden relative">
                    {project.featuredImage ? (
                      <img
                        src={urlFor(project.featuredImage).url()}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-2">
                            {project.projectType === 'fine-art' && <Palette className="w-6 h-6 text-gray-600" />}
                            {project.projectType === 'technology' && <Code className="w-6 h-6 text-gray-600" />}
                            {project.projectType === 'urban-planning' && <Layers className="w-6 h-6 text-gray-600" />}
                          </div>
                          <p className="text-gray-500 text-sm">Project Image</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Project Type Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full text-sm font-medium capitalize">
                        {project.projectType?.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                  
                  {/* Project Info */}
                  <div className="space-y-4">
                    {/* Meta Information */}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(project.publishedAt).getFullYear()}
                      </div>
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {project.technologies[0]}
                          {project.technologies.length > 1 && ` +${project.technologies.length - 1}`}
                        </div>
                      )}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-display font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    
                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {project.excerpt}
                    </p>
                    
                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4">
                      <Link
                        href={`/projects/${project.slug.current}`}
                        className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1 text-sm font-medium"
                      >
                        View Project
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-gray-700 transition-colors"
                          title="View Live Project"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* No Projects Fallback */
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
