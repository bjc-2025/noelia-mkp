import { defineType, defineField } from 'sanity'

export const heroCarousel = defineType({
  name: 'heroCarousel',
  title: 'Hero Carousel',
  type: 'document',
  fields: [
    defineField({
      name: 'images',
      title: 'Carousel Images',
      description: 'Homepage hero slider images (max 5)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(5),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Hero Carousel' }
    },
  },
})
