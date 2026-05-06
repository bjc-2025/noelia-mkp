import { defineType, defineField } from 'sanity'

export const editorialGallery = defineType({
  name: 'editorialGallery',
  title: 'Editorial',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImages',
      title: 'Hero Images',
      description: 'Images for the editorial page hero section (max 3)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt Text', type: 'string' },
          ],
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images',
      description: 'Images for the editorial gallery grid',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt Text', type: 'string' },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Editorial' }
    },
  },
})
