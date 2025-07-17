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
