import ServicePage from '@/components/servicePage'
import { getImages } from '@/lib/getImages'

export const metadata = {
  title: 'Bridal Makeup | Noelia Makeup',
  description: 'Timeless bridal glam designed to last all day. Professional bridal makeup services by Noelia Makeup.',
}

export default function BridalPage() {
  const heroImages = getImages('/images/services/bridal/hero')
  const galleryImages = getImages('/images/services/bridal/gallery', 40)

  return (
    <ServicePage
      title="Bridal"
      description="Your wedding day deserves makeup that feels as beautiful as it looks. I create timeless, long-lasting bridal looks tailored to your style — from soft and romantic to bold and glamorous. Every application is designed to last from the first look through the last dance."
      heroImages={heroImages}
      serviceKey="bridal"
      subServices={[
        'Bridal trial consultation included',
        'Full face bridal makeup application',
        'Long-lasting, tear-proof formulas',
        'Personalised touch-up kit for the day',
        'Lash application included',
        'Bridal party makeup add-ons available',
        'On-location service available',
      ]}
      galleryImages={galleryImages}
    />
  )
}
