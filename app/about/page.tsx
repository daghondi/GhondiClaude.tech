import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getSiteSettings, urlFor } from '@/sanity/utils'
import ImageLightbox from '../components/ImageLightbox'
import { formatSkillsForDisplay, getActiveCertifications, linkedInProfile } from '@/lib/linkedinProfile'
import CertificateViewer from '@/components/CertificateViewer'

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

      {/* Skills & Expertise - Chris Do Style */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h6 className="text-xs uppercase tracking-widest text-gray-500 font-medium mb-4">
              What I Do Best
            </h6>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-4">
              {siteSettings?.aboutPageExtraContent?.skillsTitle || "Skills & Expertise"}
            </h2>
            <p className="text-gray-400 text-sm">
              Last updated from LinkedIn: {new Date(linkedInProfile.lastUpdated).toLocaleDateString()}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {formatSkillsForDisplay().map((category, index) => (
              <div key={index} className="card group hover:shadow-xl hover:shadow-accent-blue/20 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-accent-blue to-accent-purple rounded-lg flex items-center justify-center mr-3">
                    {category.categoryTitle === 'Fine Art' && <span className="text-white">🎨</span>}
                    {category.categoryTitle === 'Technology' && <span className="text-white">💻</span>}
                    {category.categoryTitle === 'Leadership' && <span className="text-white">👥</span>}
                    {category.categoryTitle === 'Languages' && <span className="text-white">🌐</span>}
                  </div>
                  <h3 className="text-2xl font-heading text-accent-blue group-hover:text-white transition-colors">
                    {category.categoryTitle}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {category.skills.map((skill: string, skillIndex: number) => {
                    const skillData = linkedInProfile.skills.find(s => s.name === skill);
                    const endorsements = skillData?.endorsements || 0;
                    const maxEndorsements = 50; // For progress bar calculation
                    const progressWidth = (endorsements / maxEndorsements) * 100;
                    
                    return (
                      <div key={skillIndex} className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-800/70 transition-all duration-200">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <span className="font-medium text-gray-200">{skill}</span>
                            {skillData?.verified && (
                              <span className="ml-2 text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full flex items-center">
                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Verified
                              </span>
                            )}
                          </div>
                          {skillData?.endorsements && (
                            <span className="text-xs text-accent-blue font-semibold">
                              {skillData.endorsements} endorsements
                            </span>
                          )}
                        </div>
                        
                        {/* Skill level indicator */}
                        {skillData?.level && (
                          <div className="flex items-center mb-2">
                            <span className="text-xs text-gray-400 mr-2">Level:</span>
                            <div className="flex space-x-1">
                              {[1, 2, 3, 4, 5].map(level => (
                                <div
                                  key={level}
                                  className={`w-2 h-2 rounded-full ${
                                    level <= (skillData.level === 'expert' ? 5 : 
                                             skillData.level === 'advanced' ? 4 :
                                             skillData.level === 'intermediate' ? 3 : 2)
                                      ? 'bg-accent-blue' : 'bg-gray-600'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-400 ml-2 capitalize">{skillData.level}</span>
                          </div>
                        )}
                        
                        {/* Endorsement progress bar */}
                        {endorsements > 0 && (
                          <div className="mt-2">
                            <div className="w-full bg-gray-700 rounded-full h-1">
                              <div 
                                className={`bg-gradient-to-r from-accent-blue to-accent-purple h-1 rounded-full transition-all duration-500 ${
                                  progressWidth >= 80 ? 'w-4/5' :
                                  progressWidth >= 60 ? 'w-3/5' :
                                  progressWidth >= 40 ? 'w-2/5' :
                                  progressWidth >= 20 ? 'w-1/5' : 'w-1/12'
                                }`}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications - New Section */}
      <section className="section bg-dark-secondary/50">
        <div className="section-container">
          <h2 className="text-4xl font-heading text-center mb-16">
            <span className="text-gradient">Professional Certifications</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getActiveCertifications().map((cert, index) => {
              const isExpiring = cert.expirationDate && 
                new Date(cert.expirationDate) <= new Date(Date.now() + 90 * 24 * 60 * 60 * 1000); // 90 days
              
              return (
                <div key={index} className="card group hover:shadow-xl hover:shadow-accent-blue/20 transition-all duration-300 relative overflow-hidden">
                  {/* Background pattern */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-accent-blue/10 to-transparent rounded-bl-full" />
                  
                  {/* Certificate Preview/Viewer */}
                  {(cert.certificateFile || cert.thumbnailImage) && (
                    <div className="mb-4 h-48 rounded-lg overflow-hidden">
                      <CertificateViewer
                        certificateFile={cert.certificateFile}
                        thumbnailImage={cert.thumbnailImage}
                        fileType={cert.fileType}
                        certificateName={cert.name}
                        className="h-full"
                      />
                    </div>
                  )}
                  
                  {/* Certificate icon - only show if no file */}
                  {!cert.certificateFile && !cert.thumbnailImage && (
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-accent-blue to-accent-purple rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 2L3 7v11c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V7l-7-5zm0 2.41L15.09 8H4.91L10 4.41zm0 11.18c-2.07 0-3.75-1.68-3.75-3.75S7.93 5.09 10 5.09s3.75 1.68 3.75 3.75-1.68 3.75-3.75 3.75zm0-6c-1.24 0-2.25 1.01-2.25 2.25S8.76 12.09 10 12.09s2.25-1.01 2.25-2.25S11.24 7.84 10 7.84z" clipRule="evenodd" />
                        </svg>
                      </div>
                      
                      {/* Status indicator */}
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        isExpiring 
                          ? 'bg-yellow-500/20 text-yellow-300' 
                          : 'bg-green-500/20 text-green-300'
                      }`}>
                        {cert.expirationDate 
                          ? (isExpiring ? 'Expiring Soon' : 'Active')
                          : 'No Expiration'
                        }
                      </div>
                    </div>
                  )}
                  
                  {/* Status indicator - positioned differently when there's a file */}
                  {(cert.certificateFile || cert.thumbnailImage) && (
                    <div className="flex justify-end mb-4">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        isExpiring 
                          ? 'bg-yellow-500/20 text-yellow-300' 
                          : 'bg-green-500/20 text-green-300'
                      }`}>
                        {cert.expirationDate 
                          ? (isExpiring ? 'Expiring Soon' : 'Active')
                          : 'No Expiration'
                        }
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-accent-blue transition-colors">
                      {cert.name}
                    </h3>
                    <p className="text-accent-blue font-medium flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v2H7V5zm6 4H7v2h6V9zm-6 4h6v2H7v-2z" clipRule="evenodd" />
                      </svg>
                      {cert.issuer}
                    </p>
                  </div>
                  
                  <div className="space-y-3 text-sm mb-4">
                    <div className="flex items-center text-gray-400">
                      <svg className="w-4 h-4 mr-2 text-accent-blue" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      Issued: {new Date(cert.issueDate).toLocaleDateString()}
                    </div>
                    
                    {cert.expirationDate && (
                      <div className={`flex items-center ${isExpiring ? 'text-yellow-300' : 'text-gray-400'}`}>
                        <svg className="w-4 h-4 mr-2 text-accent-blue" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        Expires: {new Date(cert.expirationDate).toLocaleDateString()}
                      </div>
                    )}
                    
                    {cert.credentialId && (
                      <div className="flex items-center text-gray-400">
                        <svg className="w-4 h-4 mr-2 text-accent-blue" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-.257-.257A6 6 0 1118 8zM2 8a6 6 0 1010.196 4.196L12 12l.204-.204A6 6 0 002 8zm6-2a2 2 0 100 4 2 2 0 000-4z" clipRule="evenodd" />
                        </svg>
                        ID: {cert.credentialId}
                      </div>
                    )}
                  </div>
                  
                  {cert.skills && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {cert.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="text-xs bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 text-accent-blue px-3 py-1 rounded-full border border-accent-blue/30">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-accent-blue hover:text-white text-sm font-medium transition-colors group flex-1"
                      >
                        <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-1a1 1 0 10-2 0v1H5V7h1a1 1 0 000-2H5z" />
                        </svg>
                        Verify
                      </a>
                    )}
                    
                    {cert.certificateFile && (
                      <a
                        href={cert.certificateFile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-gray-400 hover:text-accent-blue text-sm font-medium transition-colors group"
                      >
                        <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
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

      {/* Call to Action */}
      <section className="section bg-gradient-to-br from-dark-primary to-dark-secondary">
        <div className="section-container text-center">
          <h2 className="text-4xl font-heading mb-6">
            <span className="text-gradient">
              {siteSettings?.aboutPageExtraContent?.ctaTitle || "Let's Create Something Amazing"}
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            {siteSettings?.aboutPageExtraContent?.ctaDescription || 
              "Whether you're looking for artistic collaboration, urban planning insights, or innovative technology solutions, I'd love to hear about your vision."
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              {siteSettings?.globalContent?.commonButtons?.getInTouch || "Get in Touch"}
            </Link>
            <Link href="/work" className="btn-secondary">
              {siteSettings?.globalContent?.commonButtons?.viewProject || "View My Work"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
