import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Calendar, MapPin, Layers, ExternalLink, Users } from 'lucide-react'
import { getProjects, getSiteSettings, urlFor } from '@/sanity/utils'

export const metadata: Metadata = {
  title: 'Urban Planning Projects | GhondiClaude.me',
  description: 'Explore my urban planning projects - sustainable city design, community development, and innovative planning solutions.',
}

export default async function UrbanPlanningPage() {
  // Fetch urban planning projects and site settings
  const allProjects = await getProjects()
  const siteSettings = await getSiteSettings()
  
  // Filter only urban planning projects
  const urbanProjects = allProjects.filter((project: any) => project.projectType === 'urban-planning')

  return (
    <main className="min-h-screen pt-20 bg-white">
      {/* Breadcrumb */}
      <section className="py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/work"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Work
          </Link>
        </div>
      </section>

      {/* Hero Section - Chris Do Style */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h6 className="text-xs uppercase tracking-widest text-gray-500 font-medium mb-8">
              Urban Planning Portfolio
            </h6>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold tracking-tight leading-none text-gray-900 mb-12">
              Urban Planning
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
              Sustainable city design, community development solutions, and innovative planning strategies that shape the future of urban living.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {urbanProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {urbanProjects.map((project: any) => (
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
                          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Layers className="w-8 h-8 text-gray-600" />
                          </div>
                          <p className="text-gray-500">Project Image</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Urban Planning Type Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full text-sm font-medium">
                        Urban Planning
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
                      {project.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span className="text-purple-600 font-medium">
                            {project.location}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-display font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                      {project.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {project.excerpt}
                    </p>
                    
                    {/* Action Links */}
                    <div className="flex items-center gap-4 pt-2">
                      <Link
                        href={`/projects/${project.slug.current}`}
                        className="text-purple-600 hover:text-purple-800 transition-colors inline-flex items-center gap-1 text-sm font-medium"
                      >
                        View Project
                        <ExternalLink className="w-4 h-4" />
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
                <Layers className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
                Urban Planning Projects Coming Soon
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                My urban planning projects will be displayed here. Upload your planning projects to see them appear automatically.
              </p>
              <Link href="/contact" className="btn-primary">
                Discuss a Project
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h6 className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-4">
            Need planning expertise?
          </h6>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-8">
            Let's Shape <span className="text-purple-400">Cities</span>
          </h2>
          <p className="text-lg text-gray-300 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            Looking for sustainable urban planning, community development strategies, or innovative city design solutions? Let's create better cities together.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact" className="group">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-purple-700">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h6 className="text-xs uppercase tracking-widest text-gray-400">Planning</h6>
                  <span className="text-base font-semibold text-white group-hover:text-purple-400 transition-colors">Start a Project</span>
                </div>
              </div>
            </Link>
            
            <Link href="/about" className="group">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-gray-100">
                  <Users className="w-6 h-6 text-gray-900" />
                </div>
                <div className="text-left">
                  <h6 className="text-xs uppercase tracking-widest text-gray-400">About</h6>
                  <span className="text-base font-semibold text-white group-hover:text-gray-300 transition-colors">My Approach</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
