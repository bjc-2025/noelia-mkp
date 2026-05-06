import { client, isSanityConfigured } from './client'
import { heroCarouselQuery, serviceGalleryQuery } from './queries'

interface SanityImage {
  asset: { url: string }
  alt?: string
}

interface HeroCarouselData {
  images: SanityImage[]
}

interface ServiceGalleryData {
  heroImages: SanityImage[]
  galleryImages: SanityImage[]
}

export async function getHeroCarouselImages(): Promise<string[]> {
  if (!isSanityConfigured || !client) return []
  try {
    const data = await client.fetch<HeroCarouselData | null>(heroCarouselQuery)
    if (!data?.images?.length) return []
    return data.images.map((img) => img.asset.url)
  } catch {
    return []
  }
}

export async function getServiceGallery(
  serviceKey: string
): Promise<{ heroImages: string[]; galleryImages: string[] }> {
  if (!isSanityConfigured || !client) return { heroImages: [], galleryImages: [] }
  try {
    const data = await client.fetch<ServiceGalleryData | null>(
      serviceGalleryQuery,
      { serviceKey }
    )
    if (!data) return { heroImages: [], galleryImages: [] }
    return {
      heroImages: (data.heroImages || []).map((img) => img.asset.url),
      galleryImages: (data.galleryImages || []).map((img) => img.asset.url),
    }
  } catch {
    return { heroImages: [], galleryImages: [] }
  }
}
