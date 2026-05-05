import ServicePage from '@/components/servicePage'
import { getImages } from '@/lib/getImages'

export const metadata = {
  title: 'Editorial Makeup | Noelia Makeup',
  description: 'Bold, creative makeup for editorial shoots. Professional editorial makeup services by Noelia Makeup.',
}

export default function EditorialPage() {
  const heroImages = getImages('/images/services/film-tv/hero')
  const galleryImages = getImages('/images/services/film-tv/gallery', 40)

  return (
    <ServicePage
      title="Editorial"
      description="From magazine covers to creative campaigns, I craft bold, trend-driven looks that tell a story through makeup. My approach focuses on precision, editorial vision, and collaborative artistry to bring creative concepts to life in front of the camera."
      heroImages={heroImages}
      serviceKey="film-tv"
      subServices={[
        'High-fashion and editorial makeup looks',
        'Magazine and print-ready application',
        'Creative and conceptual makeup artistry',
        'Collaboration with photographers and stylists',
        'Trend-forward and avant-garde styles',
        'On-set touch-ups and adjustments',
        'Beauty and skin-focused editorial looks',
      ]}
      galleryImages={galleryImages}
    />
  )
}