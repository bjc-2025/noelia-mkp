import { client, isSanityConfigured } from '@/sanity/client'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  if (!isSanityConfigured || !client) {
    return NextResponse.json({ error: 'Sanity not configured', isSanityConfigured })
  }

  try {
    const hero = await client.fetch(`*[_type == "heroCarousel"]{ _id, _type, "imageCount": count(images) }`)
    const bridal = await client.fetch(`*[_type == "bridalGallery"]{ _id, _type, "heroCount": count(heroImages), "galleryCount": count(galleryImages) }`)
    const photoshoot = await client.fetch(`*[_type == "photoshootGallery"]{ _id, _type, "heroCount": count(heroImages), "galleryCount": count(galleryImages) }`)
    const editorial = await client.fetch(`*[_type == "editorialGallery"]{ _id, _type, "heroCount": count(heroImages), "galleryCount": count(galleryImages) }`)

    return NextResponse.json({
      isSanityConfigured,
      hero,
      bridal,
      photoshoot,
      editorial,
    })
  } catch (err) {
    return NextResponse.json({ error: String(err) })
  }
}
