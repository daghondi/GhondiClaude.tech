import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Calendar, Code, ExternalLink, Github } from 'lucide-react'
import { getProjects, getSiteSettings, urlFor } from '@/sanity/utils'

export const metadata: Metadata = {
  title: 'Tech Projects | GhondiClaude.me',
  description: 'Explore my technology projects - AI experiments, web applications, and innovative software solutions.',
}

export default async function TechProjectsPage() {
  // Fetch tech projects and site settings
  const allProjects = await getProjects()
  const siteSettings = await getSiteSettings()
  
  // Filter only technology projects
  const techProjects = allProjects.filter((project: any) => project.projectType === 'technology')

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
              Technology Portfolio
            </h6>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold tracking-tight leading-none text-gray-900 mb-12">
              Tech Projects
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
              Innovative software solutions, AI experiments, and web applications that bridge creativity with cutting-edge technology.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {techProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {techProjects.map((project: any) => (
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
                            <Code className="w-8 h-8 text-gray-600" />
                          </div>
                          <p className="text-gray-500">Project Image</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Tech Type Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full text-sm font-medium">
                        Tech
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
                        <span className="text-blue-600 font-medium">
                          {project.technologies[0]}
                          {project.technologies.length > 1 && ` +${project.technologies.length - 1}`}
                        </span>
                      )}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-display font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
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
                        className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1 text-sm font-medium"
                      >
                        View Project
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-gray-700 transition-colors"
                          title="View on GitHub"
                        >
                          <Github className="w-4 h-4" />
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
                <Code className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
                Tech Projects Coming Soon
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                My technology projects will be displayed here. Upload your tech projects to see them appear automatically.
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
            Need a tech solution?
          </h6>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-8">
            Let's Build <span className="text-blue-400">Something</span>
          </h2>
          <p className="text-lg text-gray-300 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            Looking for custom software development, AI solutions, or innovative web applications? Let's discuss your next project.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact" className="group">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-blue-700">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h6 className="text-xs uppercase tracking-widest text-gray-400">Development</h6>
                  <span className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors">Start a Project</span>
                </div>
              </div>
            </Link>
            
            <Link href="/about" className="group">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-gray-100">
                  <ExternalLink className="w-6 h-6 text-gray-900" />
                </div>
                <div className="text-left">
                  <h6 className="text-xs uppercase tracking-widest text-gray-400">About</h6>
                  <span className="text-base font-semibold text-white group-hover:text-gray-300 transition-colors">My Expertise</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
