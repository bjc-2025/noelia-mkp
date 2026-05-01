import { StaticImageData } from 'next/image'

// Hero Section Types
export type HeroPair = {
  left: { src: string; alt: string }
  right: { src: string; alt: string }
}

// Makeup Section Types
export interface MakeupSectionProps {
  headline?: string
  copy?: string
  leftImageA?: StaticImageData | string
  leftImageB?: StaticImageData | string
  productImage?: StaticImageData | string
  productImageBg?: StaticImageData | string
}

// About Section Types (if any additional props needed in future)
export type AboutSectionProps = Record<string, never>

// Header Types (if any additional props needed in future)
export type HeaderProps = Record<string, never>

// Footer Types (if any additional props needed in future)
export type FooterProps = Record<string, never>

// Instagram Section Types (if any additional props needed in future)
export type InstagramSectionProps = Record<string, never>

// Service Types for Client Favourites
export interface Service {
  id: string
  title: string
  blurb: string
  features: [string, string, string]
  duration: string
  priceFrom: string
  image: string
  layout: 'feature' | 'standard'
  alt: string
}

export interface ClientFavouritesProps {
  services?: Service[]
}

// Contact Form Types
export type ServiceOption = 'photoshoot' | 'film-tv' | 'wedding'

export interface ContactFormProps {
  selectedService?: ServiceOption
}

export interface ContactSectionProps {
  selectedService?: ServiceOption
}