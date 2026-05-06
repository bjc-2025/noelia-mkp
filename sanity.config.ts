import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { schemaTypes } from './sanity/schemas'
import { apiVersion, dataset, projectId } from './sanity/env'
import type { StructureBuilder } from 'sanity/structure'

const singletons = [
  { type: 'heroCarousel', title: 'Hero Carousel' },
  { type: 'bridalGallery', title: 'Bridal' },
  { type: 'photoshootGallery', title: 'Photoshoot' },
  { type: 'editorialGallery', title: 'Editorial' },
]

const singletonTypes = new Set(singletons.map((s) => s.type))

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter((t) => !singletonTypes.has(t.id)),
  },
  plugins: [
    structureTool({
      structure: (S: StructureBuilder) =>
        S.list()
          .title('Content')
          .items(
            singletons.map((s) =>
              S.listItem()
                .title(s.title)
                .id(s.type)
                .child(
                  S.document()
                    .schemaType(s.type)
                    .documentId(s.type)
                    .title(s.title)
                )
            )
          ),
    }),
    media(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    newDocumentOptions: (prev) =>
      prev.filter((item) => !singletonTypes.has(item.templateId)),
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(
            (action) =>
              action.action &&
              ['publish', 'discardChanges', 'restore'].includes(action.action)
          )
        : input,
  },
})
