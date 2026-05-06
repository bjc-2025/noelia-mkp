import { groq } from 'next-sanity'

export const heroCarouselQuery = groq`
  *[_type == "heroCarousel"][0]{
    images[]{
      asset->{url},
      alt,
      hotspot
    }
  }
`

export const serviceGalleryQuery = groq`
  *[_type == $type][0]{
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
