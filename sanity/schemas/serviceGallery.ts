import { defineType, defineField } from 'sanity'

export const serviceGallery = defineType({
  name: 'serviceGallery',
  title: 'Service Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'serviceKey',
      title: 'Service',
      type: 'string',
      options: {
        list: [
          { title: 'Bridal', value: 'bridal' },
          { title: 'Photoshoot', value: 'photoshoot' },
          { title: 'Film & TV', value: 'film-tv' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImages',
      title: 'Hero Images',
      description: 'Images shown in the hero section of the service page (3 recommended)',
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
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images',
      description: 'Images shown in the gallery grid',
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
    }),
  ],
  preview: {
    select: { title: 'serviceKey' },
    prepare({ title }) {
      const labels: Record<string, string> = {
        bridal: 'Bridal',
        photoshoot: 'Photoshoot',
        'film-tv': 'Film & TV',
      }
      return { title: `${labels[title] || title} Gallery` }
    },
  },
})
