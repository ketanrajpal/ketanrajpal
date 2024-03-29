export const post = {
  name: 'post',
  type: 'document',
  title: 'Post',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 200,
      },
    },
    {
      name: 'featured',
      type: 'boolean',
      title: 'Featured',
    },
    {
      title: 'Banner',
      name: 'banner',
      type: 'image',
    },
    {
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'category',
      type: 'array',
      title: 'Category',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'category',
            },
          ],
        },
      ],
    },
    {
      name: 'keywords',
      type: 'array',
      title: 'Keywords',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'keyword',
            },
          ],
        },
      ],
    },
  ],
}
