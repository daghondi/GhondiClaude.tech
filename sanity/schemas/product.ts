export default {
  name: 'product',
  title: 'Shop Products',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Product Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title'
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Product Description',
      type: 'text',
      rows: 4
    },
    {
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [
        {
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
        }
      ],
      validation: (Rule: any) => Rule.min(1)
    },
    {
      name: 'pricing',
      title: 'Pricing',
      type: 'object',
      fields: [
        {
          name: 'originalPrice',
          title: 'Original Artwork Price ($)',
          type: 'number',
          description: 'Leave empty if original is not for sale'
        },
        {
          name: 'printPrice',
          title: 'Print Price ($)',
          type: 'number'
        }
      ]
    },
    {
      name: 'availability',
      title: 'Availability',
      type: 'object',
      fields: [
        {
          name: 'originalAvailable',
          title: 'Original Available',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'printAvailable',
          title: 'Print Available',
          type: 'boolean',
          initialValue: true
        }
      ]
    },
    {
      name: 'specifications',
      title: 'Specifications',
      type: 'object',
      fields: [
        {
          name: 'originalSize',
          title: 'Original Size',
          type: 'string',
          description: 'e.g., 24" × 30"'
        },
        {
          name: 'printSizes',
          title: 'Available Print Sizes',
          type: 'string',
          description: 'e.g., Multiple sizes available'
        },
        {
          name: 'medium',
          title: 'Medium',
          type: 'string',
          description: 'e.g., Acrylic on Canvas'
        },
        {
          name: 'year',
          title: 'Year Created',
          type: 'number'
        }
      ]
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Fine Art', value: 'fine-art' },
          { title: 'Digital Art', value: 'digital-art' },
          { title: 'Urban Planning', value: 'urban-planning' },
          { title: 'Mixed Media', value: 'mixed-media' }
        ]
      }
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      initialValue: false,
      description: 'Display prominently on shop page'
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Draft', value: 'draft' },
          { title: 'Sold Out', value: 'sold-out' },
          { title: 'Archived', value: 'archived' }
        ]
      },
      initialValue: 'active'
    },
    {
      name: 'linkedProject',
      title: 'Linked Project',
      type: 'reference',
      to: [{ type: 'project' }],
      description: 'Link to related portfolio project'
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }
  ],
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [
        { field: 'publishedAt', direction: 'desc' }
      ]
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'publishedAt', direction: 'desc' }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
      price: 'pricing.printPrice',
      featured: 'featured'
    },
    prepare({ title, media, price, featured }: any) {
      return {
        title: title,
        subtitle: `$${price} ${featured ? '⭐ Featured' : ''}`,
        media
      }
    }
  }
}
