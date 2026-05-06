import { defineType, defineField } from 'sanity'

export const photoshootGallery = defineType({
  name: 'photoshootGallery',
  title: 'Photoshoot',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImages',
      title: 'Hero Images',
      description: 'Images for the photoshoot page hero section (max 3)',
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
      description: 'Images for the photoshoot gallery grid',
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
      return { title: 'Photoshoot' }
    },
  },
})
