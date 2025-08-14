import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Calendar, Palette, ExternalLink } from "lucide-react"
import { getProjects, getSiteSettings, urlFor } from '@/sanity/utils'

export const metadata: Metadata = {
  title: "Fine Art Collection | GhondiClaude.me",
  description: "Explore my fine art collection featuring paintings, digital art, and creative works.",
}

export default async function FineArtPage() {
  // Fetch fine art projects and site settings
  const allProjects = await getProjects()
  const siteSettings = await getSiteSettings()
  
  // Filter only fine art projects
  const fineArtProjects = allProjects.filter((project: any) => project.projectType === 'fine-art')

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
              Fine Art Collection
            </h6>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold tracking-tight leading-none text-gray-900 mb-12">
              Artistic Vision
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
              A curated collection of paintings, digital art, and creative expressions that explore the intersection of emotion, technology, and human experience.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {fineArtProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {fineArtProjects.map((project: any) => (
                <article key={project._id} className="card-hover group overflow-hidden">
                  {/* Project Image */}
                  <div className="aspect-square rounded-lg mb-6 overflow-hidden relative">
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
                            <Palette className="w-8 h-8 text-gray-600" />
                          </div>
                          <p className="text-gray-500">Artwork Image</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Art Type Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full text-sm font-medium">
                        Fine Art
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
                      {project.medium && (
                        <span className="text-blue-600 font-medium">{project.medium}</span>
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
                    
                    {/* View Project Link */}
                    <div className="pt-2">
                      <Link
                        href={`/projects/${project.slug.current}`}
                        className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1 text-sm font-medium"
                      >
                        View Artwork
                        <ExternalLink className="w-4 h-4" />
                      </Link>
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
                Collection Coming Soon
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                My fine art collection will be displayed here. Upload your projects to see them appear automatically.
              </p>
              <Link href="/contact" className="btn-primary">
                Commission a Piece
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h6 className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-4">
            Interested in my art?
          </h6>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-8">
            Commission <span className="text-blue-400">Original Work</span>
          </h2>
          <p className="text-lg text-gray-300 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            Looking for a custom piece? I create commissioned artworks that blend traditional techniques with contemporary vision.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact" className="group">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-blue-700">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h6 className="text-xs uppercase tracking-widest text-gray-400">Commission</h6>
                  <span className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors">Start a Project</span>
                </div>
              </div>
            </Link>
            
            <Link href="/shop" className="group">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-gray-100">
                  <ExternalLink className="w-6 h-6 text-gray-900" />
                </div>
                <div className="text-left">
                  <h6 className="text-xs uppercase tracking-widest text-gray-400">Shop</h6>
                  <span className="text-base font-semibold text-white group-hover:text-gray-300 transition-colors">Browse Collection</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
