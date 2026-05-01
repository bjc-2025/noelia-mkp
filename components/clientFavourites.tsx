'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Service, ClientFavouritesProps } from '@/types'

const DEFAULT_SERVICES: Service[] = [
  {
    id: 'srv-photoshoot',
    title: 'Photoshoot',
    blurb: 'HD-ready glam that holds under studio lights.',
    features: [
      'Flawless base',
      'Long-wear finish',
      'On-set touch-ups available'
    ],
    duration: '60–90 min',
    priceFrom: 'From $180',
    image: '/images/services/photoshoot.jpeg',
    layout: 'feature',
    alt: 'Makeup artist perfecting a model for a studio photoshoot'
  },
  {
    id: 'srv-film-tv',
    title: 'Film & Television',
    blurb: 'Camera-safe complexion with continuity in mind.',
    features: [
      'Shine control',
      'Transfer-safe formulas',
      'Continuity notes'
    ],
    duration: '60–120 min',
    priceFrom: 'From $220',
    image: '/images/services/tv.jpeg',
    layout: 'feature',
    alt: 'Film and TV set with makeup artist doing on-set touch-ups'
  },
  {
    id: 'srv-wedding',
    title: 'Weddings',
    blurb: 'Timeless bridal glam designed to last all day.',
    features: [
      'Bridal trial option',
      'Touch-up kit',
      'Bridal party add-ons'
    ],
    duration: '~90 min',
    priceFrom: 'From $280',
    image: '/images/services/weddings.jpeg',
    layout: 'feature',
    alt: 'Bride with elegant, long-lasting bridal makeup'
  }
]

const ClientFavourites: React.FC<ClientFavouritesProps> = ({
  services = DEFAULT_SERVICES
}) => {
  const shouldReduceMotion = useReducedMotion()

  const fadeInUp = {
    initial: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 30,
      scale: shouldReduceMotion ? 1 : 0.98
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1
    },
    transition: {
      duration: shouldReduceMotion ? 0.2 : 0.45,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  return (
    <section
      className="relative bg-gray-50 py-[88px] px-6 md:px-10 lg:px-16 min-h-screen"
      aria-labelledby="client-favourites-heading"
    >
      <div className="max-w-8xl flex flex-col justify-center min-h-[calc(100vh-176px)]">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-8 tracking-wider text-neutral-900">
            SERVICES
          </h1>

        <div className="w-full">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-60px" }}
          >
            {services.map((service, index) => (
              <motion.article
                key={service.id}
                className="group relative h-[600px] overflow-hidden"
                variants={fadeInUp}
              >
                <Link
                  href="/contact"
                  className="block h-full"
                  aria-label={`Book ${service.title} service`}
                >
                  <div className="relative h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Overlayed Text */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-3xl font-medium tracking-wider uppercase inline-flex items-center gap-3">
                        {service.title}
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ClientFavourites