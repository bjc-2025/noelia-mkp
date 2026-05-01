'use client'

import React from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import ContactForm from '@/components/contactForm'
import { ServiceOption } from '@/types'

interface ServicePageProps {
  title: string
  description: string
  heroImage: string
  subServices: string[]
  galleryImages: string[]
  serviceKey: ServiceOption
}

const ServicePage: React.FC<ServicePageProps> = ({
  title,
  description,
  heroImage,
  subServices,
  galleryImages,
  serviceKey,
}) => {
  const shouldReduceMotion = useReducedMotion()

  const fadeIn = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: shouldReduceMotion ? 0.2 : 0.6, ease: [0.25, 0.1, 0.25, 1] },
  }

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <Image
          src={heroImage}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-8 md:p-16"
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={{ ...fadeIn.transition, delay: 0.3 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-wider text-white uppercase">
            {title}
          </h1>
        </motion.div>
      </section>

      {/* Description & Sub-services */}
      <section className="px-6 md:px-10 lg:px-16 py-20 md:py-28">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={fadeIn.initial}
            whileInView={fadeIn.animate}
            viewport={{ once: true, margin: '-60px' }}
            transition={fadeIn.transition}
          >
            <p className="text-lg md:text-xl leading-relaxed text-neutral-700">
              {description}
            </p>
          </motion.div>

          <motion.div
            initial={fadeIn.initial}
            whileInView={fadeIn.animate}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ ...fadeIn.transition, delay: 0.15 }}
          >
            <h2 className="text-sm font-medium tracking-[0.2em] uppercase text-neutral-400 mb-6">
              What&apos;s Included
            </h2>
            <ul className="space-y-4">
              {subServices.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-neutral-800"
                >
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-400 flex-shrink-0" />
                  <span className="text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-6 md:px-10 lg:px-16 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-medium tracking-wider text-neutral-900 uppercase mb-10"
            initial={fadeIn.initial}
            whileInView={fadeIn.animate}
            viewport={{ once: true, margin: '-60px' }}
            transition={fadeIn.transition}
          >
            Gallery
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((src, idx) => (
              <motion.div
                key={idx}
                className="relative h-[400px] overflow-hidden"
                initial={fadeIn.initial}
                whileInView={fadeIn.animate}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ ...fadeIn.transition, delay: idx * 0.1 }}
              >
                <Image
                  src={src}
                  alt={`${title} gallery ${idx + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="px-6 md:px-10 lg:px-16 py-20 md:py-28 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={fadeIn.initial}
            whileInView={fadeIn.animate}
            viewport={{ once: true, margin: '-60px' }}
            transition={fadeIn.transition}
          >
            <h2 className="text-3xl md:text-4xl font-medium tracking-wider text-neutral-900 uppercase mb-4">
              Get in Touch
            </h2>
            <p className="text-neutral-600 mb-10">
              Interested in booking {title.toLowerCase()}? Fill out the form below and I&apos;ll get back to you shortly.
            </p>
          </motion.div>
          <ContactForm selectedService={serviceKey} />
        </div>
      </section>
    </main>
  )
}

export default ServicePage