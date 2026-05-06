import imageUrlBuilder from '@sanity/image-url'
import { client, isSanityConfigured } from './client'

const builder = isSanityConfigured && client ? imageUrlBuilder(client) : null

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  if (!builder) throw new Error('Sanity is not configured')
  return builder.image(source)
}
