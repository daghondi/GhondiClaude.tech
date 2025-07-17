'use client'

import type { Metadata } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { 
  ArrowLeft, 
  Play, 
  Download, 
  ExternalLink, 
  Layers, 
  Users, 
  Zap, 
  TreePine, 
  Car, 
  Building, 
  Brain,
  MapPin,
  BarChart3,
  Settings
} from 'lucide-react'
import Modal from '../../components/Modal'

// Note: Commenting out metadata since we're using 'use client'
// export const metadata: Metadata = {
//   title: 'Smart City Symphony | GhondiClaude.tech',
//   description: 'A comprehensive urban planning framework that orchestrates AI-driven traffic optimization with community-centered design principles.',
// }

const projectStats = [
  { label: "Development Time", value: "18 months", icon: BarChart3 },
  { label: "AI Models", value: "12", icon: Brain },
  { label: "Data Sources", value: "25+", icon: Settings },
  { label: "Pilot Cities", value: "3", icon: MapPin }
]

const keyFeatures = [
  {
    title: "AI Traffic Optimization",
    icon: Car,
    description: "Machine learning algorithms that analyze traffic patterns and optimize signal timing in real-time",
    details: [
      "Real-time traffic flow analysis",
      "Predictive congestion modeling",
      "Dynamic signal timing adjustment",
      "Multi-modal transportation integration"
    ]
  },
  {
    title: "Community Integration",
    icon: Users,
    description: "Citizen engagement tools that ensure community voices are heard in urban planning decisions",
    details: [
      "Public feedback collection system",
      "Community workshop facilitation tools",
      "Demographic impact analysis",
      "Cultural preservation guidelines"
    ]
  },
  {
    title: "Environmental Monitoring",
    icon: TreePine,
    description: "Comprehensive environmental impact tracking and sustainability optimization",
    details: [
      "Air quality monitoring",
      "Carbon footprint calculation",
      "Green space optimization",
      "Energy consumption tracking"
    ]
  },
  {
    title: "Smart Infrastructure",
    icon: Building,
    description: "IoT-enabled infrastructure that responds intelligently to urban dynamics",
    details: [
      "Smart lighting systems",
      "Adaptive building management",
      "Utility optimization",
      "Emergency response coordination"
    ]
  }
]

const technicalSpecs = [
  {
    category: "AI & Machine Learning",
    technologies: [
      "TensorFlow / PyTorch for deep learning models",
      "Real-time stream processing with Apache Kafka",
      "Computer vision for traffic analysis",
      "Natural language processing for community feedback"
    ]
  },
  {
    category: "Data Infrastructure",
    technologies: [
      "PostgreSQL with PostGIS for spatial data",
      "InfluxDB for time-series sensor data",
      "Redis for real-time caching",
      "Apache Airflow for data pipeline orchestration"
    ]
  },
  {
    category: "Frontend & Visualization",
    technologies: [
      "React with TypeScript for admin dashboard",
      "D3.js for interactive data visualizations",
      "Mapbox GL for geospatial visualization",
      "Three.js for 3D city modeling"
    ]
  },
  {
    category: "Infrastructure & DevOps",
    technologies: [
      "Kubernetes for container orchestration",
      "Docker for containerization",
      "AWS/Azure cloud infrastructure",
      "CI/CD with GitHub Actions"
    ]
  }
]

const caseStudies = [
  {
    city: "Metro City Pilot",
    population: "2.3M",
    challenge: "Traffic congestion reducing productivity by 25%",
    solution: "AI-optimized traffic signals with community input integration",
    results: [
      "32% reduction in average commute time",
      "18% decrease in vehicle emissions",
      "89% positive community feedback",
      "15% increase in public transport usage"
    ]
  },
  {
    city: "Riverside District",
    population: "450K",
    challenge: "Balancing development with environmental preservation",
    solution: "Integrated planning system with environmental impact modeling",
    results: [
      "25% increase in green space coverage",
      "40% reduction in urban heat island effect",
      "Enhanced community engagement by 200%",
      "Preserved 3 cultural heritage sites"
    ]
  }
]

export default function SmartCitySymphonyPage() {
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false)
  return (
    <main className="min-h-screen pt-16">
      {/* Back Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/work"
          className="inline-flex items-center text-accent-blue hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Work
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-tertiary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Layers className="w-8 h-8 text-accent-blue" />
                <span className="text-accent-blue font-medium tracking-wider uppercase text-sm">Flagship Project</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-accent-blue bg-clip-text text-transparent">
                  Smart City Symphony
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                A comprehensive urban planning framework that orchestrates AI-driven traffic optimization 
                with community-centered design principles, creating harmonious and sustainable cities.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <span className="px-4 py-2 bg-accent-blue/20 text-accent-blue rounded-full text-sm">Urban Planning</span>
                <span className="px-4 py-2 bg-white/20 text-white rounded-full text-sm">AI Integration</span>
                <span className="px-4 py-2 bg-accent-blue/20 text-accent-blue rounded-full text-sm">Community Focus</span>
              </div>
              <div className="flex gap-4">
                <button className="btn-primary group">
                  <Play className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                  View Demo
                </button>
                <button className="btn-ghost group">
                  <Download className="w-4 h-4 mr-2" />
                  Download Whitepaper
                </button>
              </div>
            </div>
            
            {/* Project Visualization */}
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-accent-blue/20 via-white/10 to-accent-blue/20 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-white/20 to-accent-blue/30 rounded-2xl flex items-center justify-center">
                      <Layers className="w-10 h-10 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-heading font-bold text-white">Interactive City Model</h3>
                      <p className="text-gray-300 text-sm">3D visualization of smart city systems</p>
                    </div>
                    <button className="bg-accent-blue/20 hover:bg-accent-blue/30 text-accent-blue px-4 py-2 rounded-lg transition-colors text-sm">
                      Launch 3D Model
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-3 h-3 bg-accent-blue/60 rounded-full animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-2 h-2 bg-white/40 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* Project Stats */}
      <section className="section bg-dark-secondary/30">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {projectStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-accent-blue to-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-heading font-bold text-accent-blue mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="section">
        <div className="section-container">
          <h2 className="text-4xl font-heading text-center mb-16">
            <span className="text-gradient">Core Components</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {keyFeatures.map((feature, index) => (
              <div key={feature.title} className="card">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-accent-blue to-white rounded-full flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-white">{feature.title}</h3>
                    <p className="text-accent-blue text-sm">Core Component #{index + 1}</p>
                  </div>
                </div>
                
                <p className="text-gray-400 mb-6 leading-relaxed">{feature.description}</p>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-white mb-3">Key Capabilities:</h4>
                  {feature.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-300">
                      <div className="w-1 h-1 bg-accent-blue rounded-full mr-3"></div>
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="section bg-dark-secondary/30">
        <div className="section-container">
          <h2 className="text-4xl font-heading text-center mb-16">
            <span className="text-gradient">Technical Architecture</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {technicalSpecs.map((spec) => (
              <div key={spec.category} className="card">
                <h3 className="text-xl font-heading font-bold text-accent-blue mb-6">{spec.category}</h3>
                <div className="space-y-3">
                  {spec.technologies.map((tech, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent-blue rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm leading-relaxed">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="section">
        <div className="section-container">
          <h2 className="text-4xl font-heading text-center mb-16">
            <span className="text-gradient">Real-World Impact</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudies.map((study) => (
              <div key={study.city} className="card">
                <div className="mb-6">
                  <h3 className="text-2xl font-heading font-bold text-white mb-2">{study.city}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {study.population} residents
                    </span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-accent-blue mb-2">Challenge:</h4>
                    <p className="text-gray-300 text-sm">{study.challenge}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-accent-blue mb-2">Solution:</h4>
                    <p className="text-gray-300 text-sm">{study.solution}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-accent-blue mb-3">Results:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {study.results.map((result, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-300">
                          <div className="w-1 h-1 bg-accent-blue rounded-full mr-2"></div>
                          {result}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="section bg-dark-secondary/30">
        <div className="section-container">
          <h2 className="text-4xl font-heading text-center mb-16">
            <span className="text-gradient">Implementation Approach</span>
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  phase: "Phase 1: Assessment & Planning",
                  duration: "3-6 months",
                  description: "Comprehensive city analysis, stakeholder engagement, and system design",
                  deliverables: ["Urban analysis report", "Stakeholder engagement plan", "Technical architecture", "Implementation roadmap"]
                },
                {
                  phase: "Phase 2: Core System Development",
                  duration: "6-12 months", 
                  description: "Development of AI models, data infrastructure, and core platform features",
                  deliverables: ["Traffic optimization AI", "Data collection systems", "Community portal", "Admin dashboard"]
                },
                {
                  phase: "Phase 3: Pilot Implementation",
                  duration: "6-9 months",
                  description: "Limited deployment in select areas with continuous monitoring and adjustment",
                  deliverables: ["Pilot deployment", "Performance monitoring", "Community feedback integration", "System optimization"]
                },
                {
                  phase: "Phase 4: Full Deployment",
                  duration: "3-6 months",
                  description: "City-wide rollout with comprehensive training and support programs",
                  deliverables: ["Full system deployment", "Staff training programs", "Ongoing support systems", "Impact assessment"]
                }
              ].map((phase, index) => (
                <div key={index} className="card">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-accent-blue to-white rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h3 className="text-lg font-heading font-bold text-white">{phase.phase}</h3>
                        <span className="text-accent-blue text-sm font-medium">{phase.duration}</span>
                      </div>
                      <p className="text-gray-400 mb-4">{phase.description}</p>
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-2">Key Deliverables:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {phase.deliverables.map((deliverable, idx) => (
                            <div key={idx} className="flex items-center text-sm text-gray-300">
                              <div className="w-1 h-1 bg-accent-blue rounded-full mr-2"></div>
                              {deliverable}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section bg-gradient-to-br from-dark-primary to-dark-secondary">
        <div className="section-container text-center">
          <h2 className="text-4xl font-heading mb-6">
            Ready to Transform <span className="text-gradient">Your City</span>?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Smart City Symphony can be adapted to cities of any size. Let's discuss how this framework 
            can address your specific urban challenges and community needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              <Layers className="w-5 h-5 mr-2" />
              Schedule Consultation
            </Link>
            <button 
              onClick={() => setIsCaseStudyOpen(true)}
              className="btn-secondary"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Case Study
            </button>
            <Link href="/portfolio/tech-projects" className="btn-ghost">
              <ExternalLink className="w-4 h-4 mr-2" />
              View More Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Comprehensive Case Study Modal */}
      <Modal
        isOpen={isCaseStudyOpen}
        onClose={() => setIsCaseStudyOpen(false)}
        title="Smart City Symphony - Complete Case Study"
        size="xl"
      >
        <div className="space-y-8">
          {/* Executive Summary */}
          <div>
            <h3 className="text-xl font-heading text-white mb-4">Executive Summary</h3>
            <p className="text-gray-300 mb-4">
              Smart City Symphony represents a paradigm shift in urban planning methodology, 
              integrating artificial intelligence, real-time data analytics, and community-centered 
              design to create more sustainable, efficient, and livable cities.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-accent-blue/10 rounded-lg p-3">
                <div className="text-lg font-bold text-accent-blue">3 Cities</div>
                <div className="text-gray-400 text-xs">Successfully Deployed</div>
              </div>
              <div className="bg-accent-blue/10 rounded-lg p-3">
                <div className="text-lg font-bold text-accent-blue">$2.4M</div>
                <div className="text-gray-400 text-xs">Cost Savings/Year</div>
              </div>
              <div className="bg-accent-blue/10 rounded-lg p-3">
                <div className="text-lg font-bold text-accent-blue">40%</div>
                <div className="text-gray-400 text-xs">Traffic Improvement</div>
              </div>
              <div className="bg-accent-blue/10 rounded-lg p-3">
                <div className="text-lg font-bold text-accent-blue">15K+</div>
                <div className="text-gray-400 text-xs">Citizens Engaged</div>
              </div>
            </div>
          </div>

          {/* Technical Deep Dive */}
          <div>
            <h3 className="text-xl font-heading text-white mb-4">Technical Architecture</h3>
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-accent-blue font-semibold mb-2">AI Processing Layer</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
                  <div>
                    <p><strong>Traffic Prediction:</strong> LSTM neural networks analyzing 3+ years of traffic data</p>
                    <p><strong>Demand Forecasting:</strong> Random Forest models for utility and service planning</p>
                  </div>
                  <div>
                    <p><strong>Risk Assessment:</strong> Ensemble methods combining multiple hazard indicators</p>
                    <p><strong>Optimization:</strong> Genetic algorithms for resource allocation</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-accent-blue font-semibold mb-2">Data Infrastructure</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
                  <div>
                    <p><strong>Real-time Ingestion:</strong> 1M+ data points/hour via Apache Kafka</p>
                    <p><strong>Storage:</strong> PostgreSQL with PostGIS for spatial data</p>
                  </div>
                  <div>
                    <p><strong>Processing:</strong> Apache Spark for distributed analytics</p>
                    <p><strong>Caching:</strong> Redis for sub-second response times</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-accent-blue font-semibold mb-2">Visualization Engine</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
                  <div>
                    <p><strong>3D Rendering:</strong> Three.js with WebGL optimization</p>
                    <p><strong>Interactive Maps:</strong> Mapbox GL with custom layers</p>
                  </div>
                  <div>
                    <p><strong>AR Integration:</strong> Web-based AR for mobile planning sessions</p>
                    <p><strong>Data Visualization:</strong> D3.js for dynamic charts and graphs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Implementation Timeline */}
          <div>
            <h3 className="text-xl font-heading text-white mb-4">Implementation Timeline</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-24 flex-shrink-0 text-accent-blue font-semibold text-sm">Phase 1</div>
                <div>
                  <h4 className="text-white font-semibold">Discovery & Planning (3 months)</h4>
                  <p className="text-gray-400 text-sm">Stakeholder interviews, data audit, technical architecture design</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-24 flex-shrink-0 text-accent-blue font-semibold text-sm">Phase 2</div>
                <div>
                  <h4 className="text-white font-semibold">Core Platform Development (6 months)</h4>
                  <p className="text-gray-400 text-sm">AI models, data infrastructure, core visualization features</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-24 flex-shrink-0 text-accent-blue font-semibold text-sm">Phase 3</div>
                <div>
                  <h4 className="text-white font-semibold">Pilot Deployment (4 months)</h4>
                  <p className="text-gray-400 text-sm">Barcelona pilot, user testing, iterative improvements</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-24 flex-shrink-0 text-accent-blue font-semibold text-sm">Phase 4</div>
                <div>
                  <h4 className="text-white font-semibold">Scale & Optimization (Ongoing)</h4>
                  <p className="text-gray-400 text-sm">Multi-city deployment, feature enhancement, AI model refinement</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quantitative Results */}
          <div>
            <h3 className="text-xl font-heading text-white mb-4">Quantitative Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-accent-blue font-semibold mb-3">Traffic & Transportation</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• 40% reduction in average commute times</li>
                  <li>• 25% decrease in traffic-related emissions</li>
                  <li>• 60% improvement in public transit efficiency</li>
                  <li>• 15% increase in cycling infrastructure usage</li>
                </ul>
              </div>
              <div>
                <h4 className="text-accent-blue font-semibold mb-3">Urban Planning Efficiency</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• 50% faster project approval processes</li>
                  <li>• 85% reduction in planning conflicts</li>
                  <li>• 200% increase in citizen participation</li>
                  <li>• 30% improvement in resource allocation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Challenges & Solutions */}
          <div>
            <h3 className="text-xl font-heading text-white mb-4">Challenges & Solutions</h3>
            <div className="space-y-4">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <h4 className="text-red-400 font-semibold mb-2">Challenge: Data Privacy Concerns</h4>
                <p className="text-gray-400 text-sm mb-2">
                  Citizens were initially hesitant about data collection and usage transparency.
                </p>
                <p className="text-green-400 text-sm">
                  <strong>Solution:</strong> Implemented zero-knowledge protocols, open-source privacy dashboard, 
                  and citizen data ownership controls.
                </p>
              </div>
              
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <h4 className="text-red-400 font-semibold mb-2">Challenge: Legacy System Integration</h4>
                <p className="text-gray-400 text-sm mb-2">
                  Existing city databases used incompatible formats and protocols.
                </p>
                <p className="text-green-400 text-sm">
                  <strong>Solution:</strong> Built flexible API gateway with multiple adapters, 
                  phased migration strategy over 18 months.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <h4 className="text-red-400 font-semibold mb-2">Challenge: AI Model Bias</h4>
                <p className="text-gray-400 text-sm mb-2">
                  Initial traffic models showed bias toward affluent neighborhoods.
                </p>
                <p className="text-green-400 text-sm">
                  <strong>Solution:</strong> Implemented fairness constraints, diverse training data, 
                  and continuous bias monitoring with community oversight.
                </p>
              </div>
            </div>
          </div>

          {/* Future Roadmap */}
          <div>
            <h3 className="text-xl font-heading text-white mb-4">Future Development</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-accent-blue text-2xl mb-2">🌐</div>
                <h4 className="text-white font-semibold mb-2">Global Network</h4>
                <p className="text-gray-400 text-sm">Connect 50+ cities for shared learning and best practices</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-accent-blue text-2xl mb-2">🤖</div>
                <h4 className="text-white font-semibold mb-2">AI Evolution</h4>
                <p className="text-gray-400 text-sm">Advanced predictive models using quantum computing</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-accent-blue text-2xl mb-2">🏗️</div>
                <h4 className="text-white font-semibold mb-2">Climate Integration</h4>
                <p className="text-gray-400 text-sm">Real-time climate adaptation and resilience planning</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex gap-4">
            <button 
              onClick={() => window.open('/smart-city-symphony-case-study.pdf', '_blank')}
              className="btn-primary"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF Report
            </button>
            <Link href="/contact" className="btn-secondary">
              Schedule Implementation Call
            </Link>
          </div>
        </div>
      </Modal>
    </main>
  )
}
