export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200,
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block'
        },
        {
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption'
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alt text'
            }
          ]
        }
      ]
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3
    },
    {
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      options: {
        list: [
          { title: 'Fine Art', value: 'fine-art' },
          { title: 'Urban Planning', value: 'urban-planning' },
          { title: 'Technology', value: 'technology' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Mark this project as featured'
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
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
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption'
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alt text'
            }
          ]
        }
      ]
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'date'
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'date'
    },
    {
      name: 'client',
      title: 'Client',
      type: 'string'
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string'
    },
    {
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'collaborators',
      title: 'Collaborators',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    // Commerce fields for fine art projects
    {
      name: 'pricing',
      title: 'Pricing & Availability',
      type: 'object',
      hidden: ({ document }: any) => document?.projectType !== 'fine-art',
      fields: [
        {
          name: 'originalPrice',
          title: 'Original Artwork Price ($)',
          type: 'number',
          description: 'Price for the original artwork'
        },
        {
          name: 'printPrice',
          title: 'Print Price ($)',
          type: 'number',
          description: 'Price for high-quality prints'
        },
        {
          name: 'originalAvailable',
          title: 'Original Available',
          type: 'boolean',
          description: 'Is the original artwork available for purchase?'
        },
        {
          name: 'printAvailable',
          title: 'Prints Available',
          type: 'boolean',
          description: 'Are prints available for purchase?'
        },
        {
          name: 'dimensions',
          title: 'Dimensions',
          type: 'object',
          fields: [
            {
              name: 'width',
              title: 'Width (inches)',
              type: 'number'
            },
            {
              name: 'height',
              title: 'Height (inches)',
              type: 'number'
            }
          ]
        },
        {
          name: 'medium',
          title: 'Medium',
          type: 'string',
          description: 'e.g., Oil on Canvas, Digital Art, Mixed Media'
        },
        {
          name: 'availability',
          title: 'Availability Status',
          type: 'string',
          options: {
            list: [
              { title: 'Available', value: 'available' },
              { title: 'Sold', value: 'sold' },
              { title: 'On Hold', value: 'on-hold' },
              { title: 'Not for Sale', value: 'not-for-sale' }
            ]
          },
          initialValue: 'available'
        }
      ]
    },
    {
      name: 'externalLinks',
      title: 'External Links',
      type: 'object',
      fields: [
        {
          name: 'liveDemo',
          title: 'Live Demo',
          type: 'url'
        },
        {
          name: 'repository',
          title: 'Repository',
          type: 'url'
        },
        {
          name: 'behance',
          title: 'Behance',
          type: 'url'
        },
        {
          name: 'dribbble',
          title: 'Dribbble',
          type: 'url'
        }
      ]
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tag' } }]
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: { type: 'category' }
    },
    {
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string'
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
          { title: 'Archived', value: 'archived' }
        ]
      },
      initialValue: 'draft'
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'projectType',
      media: 'featuredImage'
    }
  },
  orderings: [
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [
        { field: 'title', direction: 'asc' }
      ]
    },
    {
      title: 'Published Date New-Old',
      name: 'publishedAtDesc',
      by: [
        { field: 'publishedAt', direction: 'desc' }
      ]
    }
  ]
}
