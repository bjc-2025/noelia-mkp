import ServicePage from '@/components/servicePage'
import { getImages } from '@/lib/getImages'

export const metadata = {
  title: 'Film & Television Makeup | Noelia Makeup',
  description: 'Camera-safe complexion with continuity in mind. Professional film and TV makeup services by Noelia Makeup.',
}

export default function FilmTvPage() {
  const heroImages = getImages('/images/services/film-tv/hero')
  const galleryImages = getImages('/images/services/film-tv/gallery', 20)

  return (
    <ServicePage
      title="Film & Television"
      description="From commercials to feature films, I deliver camera-safe makeup that maintains continuity across scenes and shooting days. My approach focuses on shine control, transfer-resistant formulas, and seamless blending that holds up under the demands of a production set."
      heroImages={heroImages}
      serviceKey="film-tv"
      subServices={[
        'Camera-ready makeup for HD and 4K production',
        'Shine and oil control for long shooting days',
        'Transfer-safe and sweat-proof formulas',
        'Continuity notes and documentation',
        'Character and beauty makeup',
        'On-set standby and touch-ups',
        'SFX and prosthetic application available',
      ]}
      galleryImages={galleryImages}
    />
  )
}