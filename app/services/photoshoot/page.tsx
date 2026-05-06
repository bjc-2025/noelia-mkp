import ServicePage from '@/components/servicePage'
import { getServiceGallery } from '@/sanity/loader'

export const metadata = {
  title: 'Photoshoot Makeup | Noelia Makeup',
  description: 'HD-ready glam that holds under studio lights. Professional photoshoot makeup services by Noelia Makeup.',
}

export default async function PhotoshootPage() {
  const { heroImages, galleryImages } = await getServiceGallery('photoshoot')

  return (
    <ServicePage
      title="Photoshoot"
      description="Whether it's an editorial spread, a brand campaign, or personal portraits, my photoshoot makeup is designed to look flawless on camera. I use HD-ready formulas that photograph beautifully under studio lighting while ensuring your skin looks natural and radiant."
      heroImages={heroImages}
      serviceKey="photoshoot"
      subServices={[
        'Full face HD makeup application',
        'Skin prep and priming for a flawless base',
        'Long-wear finish that lasts throughout the shoot',
        'On-set touch-ups available',
        'Lash application included',
        'Colour matching for studio and natural lighting',
        'Multiple look changes available',
      ]}
      galleryImages={galleryImages}
    />
  )
}
