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
