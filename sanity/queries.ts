import { groq } from 'next-sanity'

export const heroCarouselQuery = groq`
  *[_id == "heroCarousel"][0]{
    images[]{
      asset->{url},
      alt,
      hotspot
    }
  }
`

export const serviceGalleryQuery = groq`
  *[_id == $type][0]{
    heroImages[]{
      asset->{url},
      alt,
      hotspot
    },
    galleryImages[]{
      asset->{url},
      alt,
      hotspot
    }
  }
`
