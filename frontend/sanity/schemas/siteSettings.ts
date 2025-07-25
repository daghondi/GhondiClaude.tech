export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: [
    // Prevents users from creating and deleting the document
    'update',
    'publish'
  ],
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt text'
        }
      ]
    },
    {
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Upload a square image (minimum 32x32px)'
    },
    {
      name: 'socialImage',
      title: 'Default Social Share Image',
      type: 'image',
      description: 'Used for social media sharing (recommended: 1200x630px)',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt text'
        }
      ]
    },
    {
      name: 'professionalHeadshot',
      title: 'Professional Headshot',
      type: 'image',
      description: 'Upload your professional headshot (recommended: 800x1000px or higher)',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt text',
          initialValue: 'Ghondi Claude - Professional Headshot'
        }
      ]
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        {
          name: 'twitter',
          title: 'Twitter',
          type: 'url'
        },
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url'
        },
        {
          name: 'github',
          title: 'GitHub',
          type: 'url'
        },
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url'
        },
        {
          name: 'behance',
          title: 'Behance',
          type: 'url'
        }
      ]
    },
    {
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'Email',
          type: 'email'
        },
        {
          name: 'phone',
          title: 'Phone',
          type: 'string'
        },
        {
          name: 'address',
          title: 'Address',
          type: 'text',
          rows: 3
        }
      ]
    },
    {
      name: 'theme',
      title: 'Theme Settings',
      type: 'object',
      fields: [
        {
          name: 'primaryColor',
          title: 'Primary Color',
          type: 'string',
          options: {
            list: [
              { title: 'Blue', value: '#3B82F6' },
              { title: 'Green', value: '#10B981' },
              { title: 'Purple', value: '#8B5CF6' },
              { title: 'Red', value: '#EF4444' },
              { title: 'Yellow', value: '#F59E0B' },
              { title: 'Pink', value: '#EC4899' },
              { title: 'Indigo', value: '#6366F1' }
            ]
          }
        },
        {
          name: 'secondaryColor',
          title: 'Secondary Color',
          type: 'string',
          options: {
            list: [
              { title: 'Blue', value: '#3B82F6' },
              { title: 'Green', value: '#10B981' },
              { title: 'Purple', value: '#8B5CF6' },
              { title: 'Red', value: '#EF4444' },
              { title: 'Yellow', value: '#F59E0B' },
              { title: 'Pink', value: '#EC4899' },
              { title: 'Indigo', value: '#6366F1' }
            ]
          }
        },
        {
          name: 'accentColor',
          title: 'Accent Color',
          type: 'string',
          options: {
            list: [
              { title: 'Blue', value: '#3B82F6' },
              { title: 'Green', value: '#10B981' },
              { title: 'Purple', value: '#8B5CF6' },
              { title: 'Red', value: '#EF4444' },
              { title: 'Yellow', value: '#F59E0B' },
              { title: 'Pink', value: '#EC4899' },
              { title: 'Indigo', value: '#6366F1' }
            ]
          }
        }
      ]
    },
    
    // Global Navigation & UI Content
    {
      name: 'globalContent',
      title: 'Global Navigation & UI',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true
      },
      fields: [
        {
          name: 'brandName',
          title: 'Brand Name',
          type: 'string',
          initialValue: 'GhondiClaude'
        },
        {
          name: 'brandShort',
          title: 'Brand Short Name (for logo)',
          type: 'string',
          initialValue: 'GC'
        },
        {
          name: 'navigation',
          title: 'Navigation Menu',
          type: 'object',
          fields: [
            {
              name: 'homeLabel',
              title: 'Home Menu Label',
              type: 'string',
              initialValue: 'Home'
            },
            {
              name: 'workLabel',
              title: 'Work Menu Label',
              type: 'string',
              initialValue: 'Work'
            },
            {
              name: 'blogLabel',
              title: 'Blog Menu Label',
              type: 'string',
              initialValue: 'Blog'
            },
            {
              name: 'aboutLabel',
              title: 'About Menu Label',
              type: 'string',
              initialValue: 'About'
            },
            {
              name: 'contactLabel',
              title: 'Contact Menu Label',
              type: 'string',
              initialValue: 'Contact'
            },
            {
              name: 'fineArtLabel',
              title: 'Fine Art Submenu Label',
              type: 'string',
              initialValue: 'Fine Art'
            },
            {
              name: 'urbanPlanningLabel',
              title: 'Urban Planning Submenu Label',
              type: 'string',
              initialValue: 'Urban Planning'
            },
            {
              name: 'techLabLabel',
              title: 'Tech Lab Submenu Label',
              type: 'string',
              initialValue: 'Tech Lab'
            }
          ]
        },
        {
          name: 'commonButtons',
          title: 'Common Button Labels',
          type: 'object',
          fields: [
            {
              name: 'getInTouch',
              title: 'Get In Touch Button',
              type: 'string',
              initialValue: 'Get in Touch'
            },
            {
              name: 'learnMore',
              title: 'Learn More Button',
              type: 'string',
              initialValue: 'Learn More'
            },
            {
              name: 'viewProject',
              title: 'View Project Button',
              type: 'string',
              initialValue: 'View Project'
            },
            {
              name: 'readMore',
              title: 'Read More Button',  
              type: 'string',
              initialValue: 'Read More'
            },
            {
              name: 'startProject',
              title: 'Start Project Button',
              type: 'string',
              initialValue: 'Start a Project'
            },
            {
              name: 'sendMessage',
              title: 'Send Message Button',
              type: 'string',
              initialValue: 'Send Message'
            }
          ]
        }
      ]
    },

    // Footer Content
    {
      name: 'footerContent',
      title: 'Footer Content',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true
      },
      fields: [
        {
          name: 'brandDescription',
          title: 'Brand Description',
          type: 'text',
          rows: 3,
          initialValue: 'Multidisciplinary creator exploring the intersections of art, technology, and urban innovation.'
        },
        {
          name: 'portfolioSection',
          title: 'Portfolio Section',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
              initialValue: 'Portfolio'
            },
            {
              name: 'fineArtLink',
              title: 'Fine Art Link Text',
              type: 'string',
              initialValue: 'Fine Art'
            },
            {
              name: 'urbanPlanningLink',
              title: 'Urban Planning Link Text',
              type: 'string',
              initialValue: 'Urban Planning'
            },
            {
              name: 'techLabLink',
              title: 'Tech Lab Link Text',
              type: 'string',
              initialValue: 'Tech Lab'
            },
            {
              name: 'allWorkLink',
              title: 'All Work Link Text',
              type: 'string',
              initialValue: 'All Work'
            }
          ]
        },
        {
          name: 'contentSection',
          title: 'Content Section',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
              initialValue: 'Content'
            },
            {
              name: 'blogLink',
              title: 'Blog Link Text',
              type: 'string',
              initialValue: 'Blog'
            },
            {
              name: 'urbanFlowLink',
              title: 'Urban Flow Link Text',
              type: 'string',
              initialValue: 'Urban Flow'
            },
            {
              name: 'artSoulLink',
              title: 'Art & Soul Link Text',
              type: 'string',
              initialValue: 'Art & Soul'
            },
            {
              name: 'techExplorationsLink',
              title: 'Tech Explorations Link Text',
              type: 'string',
              initialValue: 'Tech Explorations'
            }
          ]
        },
        {
          name: 'connectSection',
          title: 'Connect Section',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
              initialValue: 'Connect'
            },
            {
              name: 'aboutLink',
              title: 'About Link Text',
              type: 'string',
              initialValue: 'About'
            },
            {
              name: 'contactLink',
              title: 'Contact Link Text',
              type: 'string',
              initialValue: 'Contact'
            },
            {
              name: 'collaborateLink',
              title: 'Collaborate Link Text',
              type: 'string',
              initialValue: 'Collaborate'
            },
            {
              name: 'speakingLink',
              title: 'Speaking Link Text',
              type: 'string',
              initialValue: 'Speaking'
            }
          ]
        },
        {
          name: 'copyrightText',
          title: 'Copyright Text',
          type: 'string',
          initialValue: 'All rights reserved.'
        },
        {
          name: 'madeWithLove',
          title: 'Made With Love Text',
          type: 'string',
          initialValue: 'Made with ❤️ and lots of caffeine'
        }
      ]
    },
    
    // Homepage Content
    {
      name: 'homepageContent',
      title: 'Homepage Content',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: false
      },
      fields: [
        {
          name: 'heroTitle',
          title: 'Hero Title',
          type: 'string',
          initialValue: 'Ghondi Claude'
        },
        {
          name: 'heroSubtitle',
          title: 'Hero Subtitle',
          type: 'text',
          rows: 3,
          initialValue: 'Where Fine Art meets Urban Planning, and Technology bridges the creative divide.'
        },
        {
          name: 'roleDescriptions',
          title: 'Role Descriptions',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'role',
                  title: 'Role Title',
                  type: 'string'
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 2
                }
              ]
            }
          ]
        }
      ]
    },

    // About Page Content
    {
      name: 'aboutPageContent',
      title: 'About Page Content',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true
      },
      fields: [
        {
          name: 'aboutTitle',
          title: 'About Title',
          type: 'string',
          initialValue: 'About'
        },
        {
          name: 'aboutSubtitle',
          title: 'About Subtitle',
          type: 'text',
          rows: 3,
          initialValue: 'A creative professional at the intersection of Fine Art, Urban Planning, and Technology'
        },
        {
          name: 'aboutDescription',
          title: 'About Description',
          type: 'text',
          rows: 4,
          initialValue: 'Welcome to my universe where brushstrokes meet blueprints, where urban dreams are coded into reality, and where technology becomes the canvas for tomorrow\'s cities.'
        },
        {
          name: 'philosophyQuote',
          title: 'Philosophy Quote',
          type: 'text',
          rows: 3,
          initialValue: 'At the intersection of art, planning, and technology lies the future of human experience. I believe in creating solutions that are not only functional but also beautiful, sustainable, and deeply human.'
        }
      ]
    },

    // Contact Page Content
    {
      name: 'contactPageContent',
      title: 'Contact Page Content',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true
      },
      fields: [
        {
          name: 'contactTitle',
          title: 'Contact Title',
          type: 'string',
          initialValue: 'Let\'s Create Something Amazing Together'
        },
        {
          name: 'contactSubtitle',
          title: 'Contact Subtitle',
          type: 'text',
          rows: 3,
          initialValue: 'Whether you\'re looking for artistic collaboration, urban planning consultation, or innovative technology solutions, I\'d love to hear about your vision.'
        },
        {
          name: 'formPlaceholders',
          title: 'Form Placeholders',
          type: 'object',
          fields: [
            {
              name: 'namePlaceholder',
              title: 'Name Placeholder',
              type: 'string',
              initialValue: 'Your full name'
            },
            {
              name: 'emailPlaceholder',
              title: 'Email Placeholder',
              type: 'string',
              initialValue: 'your.email@example.com'
            },
            {
              name: 'phonePlaceholder',
              title: 'Phone Placeholder',
              type: 'string',
              initialValue: '+1 (555) 123-4567'
            },
            {
              name: 'companyPlaceholder',
              title: 'Company Placeholder',
              type: 'string',
              initialValue: 'Your company'
            },
            {
              name: 'subjectPlaceholder',
              title: 'Subject Placeholder',
              type: 'string',
              initialValue: 'Brief subject of your inquiry'
            },
            {
              name: 'messagePlaceholder',
              title: 'Message Placeholder',
              type: 'string',
              initialValue: 'Tell me about your project, vision, or how we can collaborate...'
            }
          ]
        }
      ]
    },

    // Blog Page Content
    {
      name: 'blogPageContent',
      title: 'Blog Page Content',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true
      },
      fields: [
        {
          name: 'blogTitle',
          title: 'Blog Title',
          type: 'string',
          initialValue: 'Insights'
        },
        {
          name: 'blogSubtitle',
          title: 'Blog Subtitle',
          type: 'text',
          rows: 2,
          initialValue: 'Thoughts on art, technology, urban planning, and the beautiful intersections between them'
        },
        {
          name: 'searchPlaceholder',
          title: 'Search Placeholder',
          type: 'string',
          initialValue: 'Search articles...'
        },
        {
          name: 'newsletterTitle',
          title: 'Newsletter Title',
          type: 'string',
          initialValue: 'Stay Updated'
        },
        {
          name: 'newsletterDescription',
          title: 'Newsletter Description',
          type: 'text',
          rows: 2,
          initialValue: 'Get the latest insights on art, technology, and urban planning delivered to your inbox.'
        },
        {
          name: 'emailPlaceholder',
          title: 'Email Placeholder',
          type: 'string',
          initialValue: 'Enter your email'
        }
      ]
    },

    // Work Page Content
    {
      name: 'workPageContent',
      title: 'Work Page Content',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true
      },
      fields: [
        {
          name: 'workTitle',
          title: 'Work Page Title',
          type: 'string',
          initialValue: 'My Work'
        },
        {
          name: 'workSubtitle',
          title: 'Work Page Subtitle',
          type: 'text',
          rows: 3,
          initialValue: 'A curated collection of projects spanning Fine Art, Urban Planning, and Technology'
        },
        {
          name: 'featuredSectionTitle',
          title: 'Featured Section Title',
          type: 'string',
          initialValue: 'Featured Projects'
        },
        {
          name: 'featuredSectionSubtitle',
          title: 'Featured Section Subtitle',
          type: 'string',
          initialValue: 'Explore my latest work across different disciplines'
        },
        {
          name: 'noProjectsTitle',
          title: 'No Projects Title',
          type: 'string',
          initialValue: 'More Projects Upon Request'
        },
        {
          name: 'noProjectsDescription',
          title: 'No Projects Description',
          type: 'text',
          rows: 3,
          initialValue: "I'm constantly working on new projects across art, technology, and urban planning. Reach out to see my latest work or discuss potential collaborations."
        },
        {
          name: 'ctaTitle',
          title: 'Call-to-Action Title',
          type: 'string',
          initialValue: 'Interested in Collaboration?'
        },
        {
          name: 'ctaDescription',
          title: 'Call-to-Action Description',
          type: 'text',
          rows: 3,
          initialValue: "Whether you are looking for artistic collaboration, urban planning insights, or innovative technology solutions, let's create something amazing together."
        }
      ]
    },

    {
      name: 'analytics',
      title: 'Analytics',
      type: 'object',
      fields: [
        {
          name: 'googleAnalyticsId',
          title: 'Google Analytics ID',
          type: 'string',
          description: 'e.g., G-XXXXXXXXXX'
        },
        {
          name: 'hotjarId',
          title: 'Hotjar ID',
          type: 'string'
        }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings'
      }
    }
  }
}
