export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'color',
      title: 'Color',
      type: 'color',
      options: {
        disableAlpha: true
      }
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Lucide icon name (e.g., "palette", "building", "code")'
    },
    {
      name: 'parent',
      title: 'Parent Category',
      type: 'reference',
      to: { type: 'category' }
    },
    {
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description'
    }
  },
  orderings: [
    {
      title: 'Sort Order',
      name: 'sortOrder',
      by: [
        { field: 'sortOrder', direction: 'asc' }
      ]
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [
        { field: 'name', direction: 'asc' }
      ]
    }
  ]
}
