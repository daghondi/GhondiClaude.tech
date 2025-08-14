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
            <div>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Palette className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-display font-bold text-gray-900 mb-2">{projectsByType['fine-art'].length}</h3>
              <p className="text-sm uppercase tracking-widest text-gray-500">Fine Art Projects</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-accent-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-accent-blue" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-2">{projectsByType['technology'].length}</h3>
              <p className="text-gray-400">Tech Projects</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Layers className="w-8 h-8 text-accent-blue" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-2">{projectsByType['urban-planning'].length}</h3>
              <p className="text-gray-400">Urban Planning Projects</p>
            </div>
          </div>
        </div>
      </section>

      {/* All Projects Grid */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading mb-6">
              <span className="text-gradient">
                {siteSettings?.workPageContent?.featuredSectionTitle || "Featured Projects"}
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {siteSettings?.workPageContent?.featuredSectionSubtitle || 
                "Explore my latest work across different disciplines"
              }
            </p>
          </div>

          {allProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allProjects.map((project: any) => (
                <article key={project._id} className="card group overflow-hidden">
                  {/* Project Image */}
                  <div className="aspect-video rounded-lg mb-6 overflow-hidden relative">
                    {project.featuredImage ? (
                      <img
                        src={urlFor(project.featuredImage).url()}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-accent-blue/20 to-white/10 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                            {project.projectType === 'fine-art' && <Palette className="w-6 h-6 text-accent-blue" />}
                            {project.projectType === 'technology' && <Code className="w-6 h-6 text-accent-blue" />}
                            {project.projectType === 'urban-planning' && <Layers className="w-6 h-6 text-accent-blue" />}
                          </div>
                          <p className="text-gray-400 text-sm">Project Image</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Project Type Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-dark-primary/80 backdrop-blur-sm text-accent-blue rounded-full text-sm font-medium capitalize">
                        {project.projectType?.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                  
                  {/* Project Info */}
                  <div className="space-y-4">
                    {/* Meta Information */}
                    <div className="flex items-center gap-4 text-sm text-gray-400">
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
                    <h3 className="text-xl font-heading font-bold group-hover:text-accent-blue transition-colors">
                      {project.title}
                    </h3>
                    
                    {/* Excerpt */}
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {project.excerpt}
                    </p>
                    
                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4">
                      <Link
                        href={`/projects/${project.slug.current}`}
                        className="text-accent-blue hover:text-white transition-colors inline-flex items-center gap-1 text-sm font-medium"
                      >
                        View Project
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors"
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
              <div className="w-24 h-24 bg-gradient-to-br from-white/5 to-accent-blue/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Palette className="w-12 h-12 text-accent-blue/60" />
              </div>
              <h3 className="text-2xl font-heading mb-4 text-gray-300">
                {siteSettings?.workPageContent?.noProjectsTitle || "More Projects Upon Request"}
              </h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
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

      {/* Call to Action */}
      <section className="section bg-dark-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-heading mb-6">
            {siteSettings?.workPageContent?.ctaTitle || "Interested in"} <span className="text-gradient">Collaboration</span>?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            {siteSettings?.workPageContent?.ctaDescription || 
              "Whether you are looking for artistic collaboration, urban planning insights, or innovative technology solutions, let's create something amazing together."
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Start a Project
            </Link>
            <Link href="/about" className="btn-secondary">
              Learn More About Me
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
