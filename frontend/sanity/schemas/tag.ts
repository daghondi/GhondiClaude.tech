export default {
  name: 'tag',
  title: 'Tag',
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
        maxLength: 50,
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2
    },
    {
      name: 'color',
      title: 'Color',
      type: 'color',
      options: {
        disableAlpha: true
      }
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
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [
        { field: 'name', direction: 'asc' }
      ]
    }
  ]
}
