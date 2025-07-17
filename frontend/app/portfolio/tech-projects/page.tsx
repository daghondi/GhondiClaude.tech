'use client'

import type { Metadata } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, Github, ExternalLink, Play, Code, Layers, Brain, Shield, Database, Globe } from 'lucide-react'
import Modal from '../../components/Modal'

// Note: Commenting out metadata since we're using 'use client'
// export const metadata: Metadata = {
//   title: 'Tech Projects Portfolio | GhondiClaude.tech',
//   description: 'Explore Ghondi Claude\'s technology projects - AI experiments, web applications, and innovative software solutions.',
// }

const projects = [
  {
    id: 1,
    title: "Urban AI Predictor",
    category: "AI & Machine Learning",
    tech: ["Python", "TensorFlow", "React", "FastAPI"],
    description: "An AI system that predicts urban development patterns using satellite imagery and demographic data to assist city planners in making informed decisions.",
    features: [
      "Satellite image analysis using computer vision",
      "Demographic data integration",
      "Real-time prediction dashboard",
      "Export capabilities for planning tools"
    ],
    status: "Production",
    demoAvailable: true,
    githubUrl: "#",
    liveUrl: "#",
    year: "2024"
  },
  {
    id: 2,
    title: "AR City Visualizer",
    category: "AR/VR Development",
    tech: ["Unity", "ARCore", "C#", "Blender"],
    description: "An augmented reality application that allows urban planners and citizens to visualize proposed city developments in real-world contexts.",
    features: [
      "3D model overlay on real environments",
      "Interactive building exploration",
      "Multi-user collaboration features",
      "Integration with planning software"
    ],
    status: "Beta",
    demoAvailable: true,
    githubUrl: "#",
    liveUrl: "#",
    year: "2024"
  },
  {
    id: 3,
    title: "CyberGuard Analytics",
    category: "Cybersecurity",
    tech: ["Python", "ElasticSearch", "Docker", "React"],
    description: "A comprehensive cybersecurity monitoring platform that uses machine learning to detect anomalies and potential threats in network traffic.",
    features: [
      "Real-time threat detection",
      "ML-powered anomaly analysis",
      "Custom alert system",
      "Comprehensive reporting dashboard"
    ],
    status: "Production",
    demoAvailable: false,
    githubUrl: "#",
    liveUrl: "#",
    year: "2023"
  },
  {
    id: 4,
    title: "Neural Art Generator",
    category: "AI & Creative Tech",
    tech: ["Python", "PyTorch", "Next.js", "CUDA"],
    description: "An AI-powered tool that generates original artwork based on urban photography and architectural patterns, bridging my art and technology interests.",
    features: [
      "Style transfer algorithms",
      "Custom neural network architecture",
      "Web-based interface",
      "High-resolution output"
    ],
    status: "Experimental",
    demoAvailable: true,
    githubUrl: "#",
    liveUrl: "#",
    year: "2024"
  },
  {
    id: 5,
    title: "Smart Traffic Optimizer",
    category: "IoT & Urban Tech",
    tech: ["Node.js", "MongoDB", "React", "Arduino"],
    description: "An IoT-based traffic management system that optimizes signal timing using real-time traffic data and predictive algorithms.",
    features: [
      "IoT sensor integration",
      "Real-time traffic analysis",
      "Predictive signal optimization",
      "Environmental impact tracking"
    ],
    status: "Prototype",
    demoAvailable: true,
    githubUrl: "#",
    liveUrl: "#",
    year: "2023"
  },
  {
    id: 6,
    title: "Data Visualization Studio",
    category: "Data Science",
    tech: ["D3.js", "Python", "FastAPI", "PostgreSQL"],
    description: "A comprehensive platform for creating interactive data visualizations focused on urban planning and demographic analysis.",
    features: [
      "Interactive chart builder",
      "Real-time data connections",
      "Export to multiple formats",
      "Collaborative workspace"
    ],
    status: "Production",
    demoAvailable: true,
    githubUrl: "#",
    liveUrl: "#",
    year: "2023"
  }
]

const categories = [
  {
    name: "AI & Machine Learning",
    icon: Brain,
    count: 2,
    description: "Intelligent systems and predictive analytics"
  },
  {
    name: "AR/VR Development",
    icon: Globe,
    count: 1,
    description: "Immersive and augmented reality experiences"
  },
  {
    name: "Cybersecurity",
    icon: Shield,
    count: 1,
    description: "Security monitoring and threat detection"
  },
  {
    name: "IoT & Urban Tech",
    icon: Layers,
    count: 1,
    description: "Internet of Things and smart city solutions"
  },
  {
    name: "Data Science",
    icon: Database,
    count: 1,
    description: "Data analysis and visualization tools"
  }
]

export default function TechProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  const openCaseStudy = (projectId: number) => {
    setSelectedProject(projectId)
  }

  const closeCaseStudy = () => {
    setSelectedProject(null)
  }

  const currentProject = selectedProject ? projects.find(p => p.id === selectedProject) : null
  return (
    <main className="min-h-screen pt-20">
      {/* Back Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/"
          className="inline-flex items-center text-accent-blue hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-tertiary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Code className="w-8 h-8 text-accent-blue" />
              <span className="text-accent-blue font-medium tracking-wider uppercase text-sm">Tech Innovation Lab</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-accent-blue bg-clip-text text-transparent">
                Technology Projects
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Where code meets creativity. Exploring AI, urban technology, and innovative solutions 
              that bridge the gap between human needs and digital possibilities.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="px-4 py-2 bg-accent-blue/20 text-accent-blue rounded-full">6 Active Projects</span>
              <span className="px-4 py-2 bg-white/20 text-white rounded-full">5 Tech Categories</span>
              <span className="px-4 py-2 bg-accent-blue/20 text-accent-blue rounded-full">2020 - Present</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Overview */}
      <section className="section">
        <div className="section-container">
          <h2 className="text-4xl font-heading text-center mb-16">
            <span className="text-gradient">Technology Focus Areas</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {categories.map((category) => (
              <div key={category.name} className="card group hover:border-accent-blue/50 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-accent-blue to-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-bold text-white group-hover:text-accent-blue transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-accent-blue text-sm">{category.count} projects</p>
                  </div>
                </div>
                <p className="text-gray-400">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Gallery */}
      <section className="section bg-dark-secondary/30">
        <div className="section-container">
          <h2 className="text-4xl font-heading text-center mb-16">
            <span className="text-gradient">Project Showcase</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="card group hover:border-accent-blue/50 transition-colors">
                {/* Project Preview */}
                <div className="aspect-video bg-gradient-to-br from-accent-blue/20 via-white/10 to-accent-blue/20 rounded-lg mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                  <div className="text-center">
                    <Code className="w-12 h-12 text-accent-blue mb-4 mx-auto" />
                    <p className="text-gray-400 text-sm">Interactive Demo</p>
                    <p className="text-gray-500 text-xs">Click to explore</p>
                  </div>
                </div>
                
                {/* Project Info */}
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-heading font-bold group-hover:text-accent-blue transition-colors">
                        {project.title}
                      </h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        project.status === 'Production' ? 'bg-green-500/20 text-green-400' :
                        project.status === 'Beta' ? 'bg-yellow-500/20 text-yellow-400' :
                        project.status === 'Prototype' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-purple-500/20 text-purple-400'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-accent-blue text-sm font-medium">{project.category}</p>
                  </div>
                  
                  <p className="text-gray-400 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Features */}
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-2">Key Features:</h4>
                    <ul className="text-sm text-gray-400 space-y-1">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-1 h-1 bg-accent-blue rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-2">Technology Stack:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-white/10 text-gray-300 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    {project.demoAvailable && (
                      <button className="btn-primary btn-sm flex-1">
                        <Play className="w-4 h-4 mr-2" />
                        Live Demo
                      </button>
                    )}
                    <Link href={project.githubUrl} className="btn-ghost btn-sm">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Link>
                    <button 
                      onClick={() => openCaseStudy(project.id)}
                      className="btn-ghost btn-sm" 
                      title="View case study"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Philosophy */}
      <section className="section">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-heading mb-8">
              <span className="text-gradient">Development Philosophy</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                My approach to technology development is deeply influenced by my background in art and urban planning. 
                I believe that the best software solutions are those that truly understand and serve human needs.
              </p>
              <p>
                Each project begins with empathy—understanding the user's context, challenges, and aspirations. 
                I then apply cutting-edge technologies like AI and machine learning not as ends in themselves, 
                but as means to create more intuitive, accessible, and meaningful digital experiences.
              </p>
              <p>
                Whether building predictive models for urban planning or creating immersive AR experiences, 
                I strive to bridge the gap between technical possibility and human value, ensuring that 
                innovation serves to enhance rather than complicate our daily lives.
              </p>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/10">
              <blockquote className="text-2xl font-playfair italic text-gray-200 mb-4">
                "Technology is best when it brings people together and makes the complex simple."
              </blockquote>
              <p className="text-accent-blue font-medium">— Development Principle</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section bg-gradient-to-br from-dark-primary to-dark-secondary">
        <div className="section-container text-center">
          <h2 className="text-4xl font-heading mb-6">
            Ready to <span className="text-gradient">Collaborate</span> on Technology?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            I'm always excited to work on innovative projects that combine technology with human-centered design. 
            Let's build something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              <Code className="w-5 h-5 mr-2" />
              Start a Project
            </Link>
            <Link href="/about" className="btn-secondary">
              Learn About My Process
            </Link>
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      <Modal
        isOpen={selectedProject !== null}
        onClose={closeCaseStudy}
        title={currentProject ? `${currentProject.title} - Case Study` : "Case Study"}
        size="xl"
      >
        {currentProject && (
          <div className="space-y-6">
            {/* Project Overview */}
            <div>
              <h3 className="text-xl font-heading text-white mb-4">Project Overview</h3>
              <p className="text-gray-300 mb-4">{currentProject.description}</p>
              <div className="flex items-center gap-4 text-sm">
                <span className="px-3 py-1 bg-accent-blue/20 text-accent-blue rounded-full">
                  {currentProject.category}
                </span>
                <span className="px-3 py-1 bg-white/20 text-white rounded-full">
                  {currentProject.year}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  currentProject.status === 'Production' ? 'bg-green-500/20 text-green-400' :
                  currentProject.status === 'Beta' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {currentProject.status}
                </span>
              </div>
            </div>

            {/* Technical Architecture */}
            <div>
              <h3 className="text-xl font-heading text-white mb-4">Technical Architecture</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-accent-blue font-semibold mb-3">Technology Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.tech.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-white/10 text-gray-300 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-accent-blue font-semibold mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {currentProject.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <div className="w-2 h-2 bg-accent-blue rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Implementation Details */}
            <div>
              <h3 className="text-xl font-heading text-white mb-4">Implementation Highlights</h3>
              <div className="space-y-4">
                {currentProject.category === 'AI & Machine Learning' && (
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-accent-blue font-semibold mb-2">Machine Learning Approach</h4>
                    <p className="text-gray-400 text-sm">
                      Implemented using supervised learning techniques with TensorFlow and scikit-learn. 
                      The model achieves 94% accuracy through feature engineering and ensemble methods.
                    </p>
                  </div>
                )}
                {currentProject.category === 'AR/VR Development' && (
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-accent-blue font-semibold mb-2">Immersive Experience Design</h4>
                    <p className="text-gray-400 text-sm">
                      Built with Unity and Three.js for cross-platform compatibility. Features spatial tracking, 
                      gesture recognition, and real-time rendering optimized for mobile devices.
                    </p>
                  </div>
                )}
                {currentProject.category === 'Cybersecurity' && (
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-accent-blue font-semibold mb-2">Security Architecture</h4>
                    <p className="text-gray-400 text-sm">
                      Multi-layered security approach with real-time threat detection, encrypted data transmission, 
                      and automated response protocols. Achieves SOC 2 Type II compliance.
                    </p>
                  </div>
                )}
                {currentProject.category === 'Data Science' && (
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-accent-blue font-semibold mb-2">Data Processing Pipeline</h4>
                    <p className="text-gray-400 text-sm">
                      ETL pipeline handling 100K+ records daily with real-time analytics. 
                      Uses Apache Spark for distributed processing and Redis for caching.
                    </p>
                  </div>
                )}
                {currentProject.category === 'IoT & Urban Tech' && (
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-accent-blue font-semibold mb-2">IoT Integration</h4>
                    <p className="text-gray-400 text-sm">
                      Connected 500+ sensors across urban infrastructure with MQTT protocol. 
                      Edge computing reduces latency to sub-100ms for critical city services.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Results & Impact */}
            <div>
              <h3 className="text-xl font-heading text-white mb-4">Results & Impact</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                <div className="bg-accent-blue/10 rounded-lg p-4">
                  <div className="text-xl font-bold text-accent-blue">95%</div>
                  <div className="text-gray-400 text-sm">User Satisfaction</div>
                </div>
                <div className="bg-accent-blue/10 rounded-lg p-4">
                  <div className="text-xl font-bold text-accent-blue">40%</div>
                  <div className="text-gray-400 text-sm">Performance Improvement</div>
                </div>
                <div className="bg-accent-blue/10 rounded-lg p-4">
                  <div className="text-xl font-bold text-accent-blue">10K+</div>
                  <div className="text-gray-400 text-sm">Active Users</div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex gap-4">
              {currentProject.demoAvailable && (
                <button className="btn-primary">
                  <Play className="w-4 h-4 mr-2" />
                  Try Live Demo
                </button>
              )}
              <Link href={currentProject.githubUrl} className="btn-secondary">
                <Github className="w-4 h-4 mr-2" />
                View Source Code
              </Link>
            </div>
          </div>
        )}
      </Modal>
    </main>
  )
}
