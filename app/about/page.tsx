import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getSiteSettings, urlFor } from '@/sanity/utils'
import ImageLightbox from '../components/ImageLightbox'
import { formatSkillsForDisplay, getActiveCertifications, linkedInProfile } from '@/lib/linkedinProfile'
import CertificateViewer from '@/components/CertificateViewer'
import SkillsCategory from '@/components/SkillsCategory'

export const metadata: Metadata = {
  title: 'About | GhondiClaude.me',
  description: 'Learn about Ghondi Claude\'s journey across Fine Art, Urban Planning, and Technology.',
}

export default async function AboutPage() {
  // Fetch site settings to get the professional headshot and content
  const siteSettings = await getSiteSettings()
  
  // Default journey items if not set in CMS
  const defaultJourneyItems = [
    {
      role: 'Fine Artist',
      period: '2015 - Present',
      title: 'Artistic Expression',
      description: 'My journey began with traditional fine arts, exploring the depths of human emotion through paintings and mixed media. Each piece tells a story of connection, transformation, and the beauty found in everyday moments.',
      emoji: '🎨',
      skills: ['Oil Painting', 'Mixed Media', 'Digital Art']
    },
    {
      role: 'Urban Planner',
      period: '2018 - Present', 
      title: 'Master of Engineering (MEng)',
      description: 'Pursuing a Master\'s in Urban Planning opened my eyes to the intricate dance between human behavior and built environments. I focus on sustainable development and community-centered design principles.',
      emoji: '🏙️',
      skills: ['Sustainable Design', 'Community Planning', 'Smart Cities']
    },
    {
      role: 'Tech Enthusiast',
      period: '2020 - Present',
      title: 'Digital Innovation', 
      description: 'Technology became the bridge connecting my artistic vision with urban planning solutions. I explore AI, AR, and emerging technologies to create immersive experiences and solve complex urban challenges.',
      emoji: '💻',
      skills: ['AI/ML', 'AR/VR', 'Cybersecurity']
    }
  ]

  // Default values if not set in CMS
  const defaultValues = [
    {
      title: 'Purpose-Driven',
      description: 'Every project serves a greater purpose in improving human experience and community well-being.',
      emoji: '🎯'
    },
    {
      title: 'Sustainable',
      description: 'Committed to creating solutions that consider environmental impact and long-term sustainability.',
      emoji: '🌱'
    },
    {
      title: 'Innovation',
      description: 'Constantly exploring emerging technologies to push the boundaries of what\'s possible.',
      emoji: '🚀'
    }
  ]

  // Default skill categories if not set in CMS
  const defaultSkillCategories = [
    {
      categoryTitle: 'Fine Art',
      skills: ['Oil & Acrylic Painting', 'Digital Illustration', 'Mixed Media', 'Color Theory', 'Composition', 'Art History']
    },
    {
      categoryTitle: 'Urban Planning',
      skills: ['Sustainable Design', 'Community Engagement', 'GIS Analysis', 'Policy Development', 'Traffic Planning', 'Environmental Impact']
    },
    {
      categoryTitle: 'Technology',
      skills: ['React/Next.js', 'Python/AI', 'Three.js/WebGL', 'AR/VR Development', 'Cybersecurity', 'Data Visualization']
    }
  ]

  return (
    <main className="min-h-screen pt-20 bg-white">
      {/* Hero Section - Chris Do Style */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              {/* Small label */}
              <h6 className="text-xs md:text-sm uppercase tracking-widest text-gray-500 font-medium mb-6">
                Get to know me
              </h6>
              
              {/* Massive title */}
              <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold tracking-tight leading-none text-gray-900 mb-8">
                {siteSettings?.aboutPageContent?.aboutTitle || "About"}
              </h1>
              
              {/* Clean subtitle */}
              <p className="text-lg lg:text-xl leading-relaxed text-gray-600 font-light mb-8 max-w-2xl">
                {siteSettings?.aboutPageContent?.aboutSubtitle || 
                  "A creative professional at the intersection of Fine Art, Urban Planning, and Technology"
                }
              </p>
              
              <div className="space-y-6 text-base text-gray-700 max-w-2xl">
                <p className="leading-relaxed">
                  {siteSettings?.aboutPageContent?.aboutDescription || 
                    "Welcome to my universe where brushstrokes meet blueprints, where urban dreams are coded into reality, and where technology becomes the canvas for tomorrow's cities."
                  }
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden border border-gray-200">
                {siteSettings?.aboutPagePhoto ? (
                  <ImageLightbox
                    src={urlFor(siteSettings.aboutPagePhoto).url()}
                    alt={siteSettings.aboutPagePhoto.alt || "Ghondi Claude - About Page Photo"}
                    fill={true}
                    aspectRatio="aspect-square"
                    className="rounded-2xl object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mx-auto mb-4"></div>
                      <p className="text-sm">Upload your photo in Sanity CMS</p>
                      <p className="text-xs text-gray-400 mt-2">Go to Site Settings → Professional Headshot</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline - Chris Do Style */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-20">
            <h6 className="text-xs uppercase tracking-widest text-gray-500 font-medium mb-4">
              Professional Journey
            </h6>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900">
              {siteSettings?.aboutPageExtraContent?.journeyTitle || "My Journey"}
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-16">
              {(siteSettings?.aboutPageExtraContent?.journeyItems || defaultJourneyItems).map((item: any, index: number) => (
                <div key={index} className="flex flex-col md:flex-row gap-12 items-start">
                  <div className="md:w-1/4 flex-shrink-0">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6">
                      <span className="text-white font-bold text-xl">{item.emoji}</span>
                    </div>
                    <h6 className="text-xs uppercase tracking-widest text-gray-500 mb-2">{item.period}</h6>
                    <div className="text-lg font-semibold text-gray-900">{item.role}</div>
                  </div>
                  <div className="md:w-3/4">
                    <h3 className="text-2xl lg:text-3xl font-display font-bold text-gray-900 mb-4">{item.title}</h3>
                    <p className="text-base text-gray-600 leading-relaxed mb-6">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill: string, skillIndex: number) => (
                        <span key={skillIndex} className="px-3 py-1 text-xs uppercase tracking-wide text-gray-500 font-medium">
                          {skill}
                          {skillIndex < item.skills.length - 1 && <span className="ml-2 text-gray-300">•</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy - Chris Do Style */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h6 className="text-xs uppercase tracking-widest text-gray-500 font-medium mb-4">
              Core Beliefs
            </h6>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-12">
              {siteSettings?.aboutPageExtraContent?.philosophyTitle || "My Philosophy"}
            </h2>
            <blockquote className="text-xl lg:text-2xl font-light text-gray-700 leading-relaxed mb-16 max-w-3xl mx-auto">
              "{siteSettings?.aboutPageContent?.philosophyQuote || 
                "At the intersection of art, planning, and technology lies the future of human experience. I believe in creating solutions that are not only functional but also beautiful, sustainable, and deeply human."
              }"
            </blockquote>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
              {(siteSettings?.aboutPageExtraContent?.values || defaultValues).map((value: any, index: number) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-blue-600 text-2xl">{value.emoji}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Professional Certifications - Chris Do Style */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h6 className="text-xs uppercase tracking-widest text-gray-500 font-medium mb-4">
              Credentials
            </h6>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900">
              Professional Certifications
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getActiveCertifications().map((cert, index) => {
              const isExpiring = cert.expirationDate && 
                new Date(cert.expirationDate) <= new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
              
              return (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                  {/* Certificate Image Preview */}
                  {(cert.certificateFile || cert.thumbnailImage) && (
                    <div className="mb-6 h-48 rounded-lg overflow-hidden bg-gray-50">
                      <CertificateViewer
                        certificateFile={cert.certificateFile}
                        thumbnailImage={cert.thumbnailImage}
                        fileType={cert.fileType}
                        certificateName={cert.name}
                        className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className="flex justify-end mb-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${
                      isExpiring 
                        ? 'bg-yellow-100 text-yellow-700' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {cert.expirationDate 
                        ? (isExpiring ? 'Expiring Soon' : 'Active')
                        : 'Permanent'
                      }
                    </div>
                  </div>
                  
                  {/* Certificate Info */}
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {cert.name}
                    </h3>
                    <p className="text-blue-600 font-medium text-sm uppercase tracking-wide">
                      {cert.issuer}
                    </p>
                  </div>
                  
                  {/* Dates */}
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div>
                      <span className="text-gray-500 text-xs uppercase tracking-wide">Issued:</span> {new Date(cert.issueDate).toLocaleDateString()}
                    </div>
                    {cert.expirationDate && (
                      <div className={isExpiring ? 'text-yellow-600' : ''}>
                        <span className="text-gray-500 text-xs uppercase tracking-wide">Expires:</span> {new Date(cert.expirationDate).toLocaleDateString()}
                      </div>
                    )}
                    {cert.credentialId && (
                      <div>
                        <span className="text-gray-500 text-xs uppercase tracking-wide">ID:</span> {cert.credentialId}
                      </div>
                    )}
                  </div>
                  
                  {/* Skills Tags */}
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {cert.skills.slice(0, 3).map((skill, skillIndex) => (
                        <span key={skillIndex} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          {skill}
                        </span>
                      ))}
                      {cert.skills.length > 3 && (
                        <span className="text-xs text-gray-500">+{cert.skills.length - 3} more</span>
                      )}
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        Verify
                      </a>
                    )}
                    {cert.certificateFile && (
                      <a
                        href={cert.certificateFile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                      >
                        Download
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Skills & Expertise - Chris Do Style with Show More */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h6 className="text-xs uppercase tracking-widest text-gray-500 font-medium mb-4">
              What I Do Best
            </h6>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-4">
              {siteSettings?.aboutPageExtraContent?.skillsTitle || "Skills & Expertise"}
            </h2>
            <p className="text-sm text-gray-500 uppercase tracking-wide">
              Last updated from LinkedIn: {new Date(linkedInProfile.lastUpdated).toLocaleDateString()}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {formatSkillsForDisplay().map((category, index) => (
              <SkillsCategory
                key={index}
                category={category}
                linkedInSkills={linkedInProfile.skills}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - Chris Do Style */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h6 className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-4">
            Ready to collaborate?
          </h6>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-8">
            {siteSettings?.aboutPageExtraContent?.ctaTitle || "Let's Create Something Amazing"}
          </h2>
          <p className="text-lg text-gray-300 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            {siteSettings?.aboutPageExtraContent?.ctaDescription || 
              "Whether you're looking for artistic collaboration, urban planning insights, or innovative technology solutions, I'd love to hear about your vision."
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/contact" 
              className="group"
            >
              <div className="flex items-center justify-center space-x-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-blue-700">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h6 className="text-xs uppercase tracking-widest text-gray-400">Contact</h6>
                  <span className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {siteSettings?.globalContent?.commonButtons?.getInTouch || "Get in Touch"}
                  </span>
                </div>
              </div>
            </Link>
            
            <Link 
              href="/work" 
              className="group"
            >
              <div className="flex items-center justify-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-gray-100">
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="text-left">
                  <h6 className="text-xs uppercase tracking-widest text-gray-400">Portfolio</h6>
                  <span className="text-base font-semibold text-white group-hover:text-gray-300 transition-colors">
                    {siteSettings?.globalContent?.commonButtons?.viewProject || "View My Work"}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
