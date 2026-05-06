'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import ContactForm from '@/components/contactForm'
import { ServiceOption } from '@/types'

interface ServicePageProps {
  title: string
  description: string
  heroImages: string[]
  subServices: string[]
  galleryImages: string[]
  serviceKey: ServiceOption
}

const ServicePage: React.FC<ServicePageProps> = ({
  title,
  description,
  heroImages,
  subServices,
  galleryImages,
  serviceKey,
}) => {
  const shouldReduceMotion = useReducedMotion()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    if (heroImages.length === 0) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [heroImages.length])

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [lightboxIndex])

  const lightboxPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null
    )
  }, [galleryImages.length])

  const lightboxNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % galleryImages.length : null
    )
  }, [galleryImages.length])

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowLeft') lightboxPrev()
      if (e.key === 'ArrowRight') lightboxNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxIndex, lightboxPrev, lightboxNext])

  const fadeIn = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: shouldReduceMotion ? 0.2 : 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  }

  return (
    <>
      <Header />
      <main className="bg-white">
        {/* Hero Section - 3 images side by side on desktop, slideshow on mobile */}
        <section className="relative h-screen w-full overflow-hidden bg-black">
          {/* Desktop: 3 photos side by side */}
          <div className="hidden lg:flex h-full">
            {heroImages.map((src, index) => (
              <motion.div
                key={index}
                className="relative h-full overflow-hidden"
                style={{ width: `${100 / heroImages.length}%` }}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: 'easeOut',
                  delay: index * 0.15,
                }}
              >
                <Image
                  src={src}
                  alt={`${title} ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index < 2}
                />
              </motion.div>
            ))}
          </div>

          {/* Mobile: slideshow */}
          <div className="lg:hidden relative h-full">
            {heroImages.length > 0 && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  className="absolute inset-0"
                  initial={{ x: '100%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: '-100%', opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                  <Image
                    src={heroImages[currentIndex]}
                    alt={`${title} ${currentIndex + 1}`}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Title overlay */}
          <motion.div
            className="absolute inset-0 flex items-end justify-start pl-4 sm:pl-8 pb-28 z-10 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <h1 className="text-white text-[clamp(2.5rem,12vw,3.5rem)] sm:text-[4rem] md:text-[6rem] lg:text-[8rem] font-medium tracking-wider sm:whitespace-nowrap leading-[0.85] uppercase">
              {title}
            </h1>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4, repeat: Infinity, repeatType: 'reverse', repeatDelay: 1 }}
          >
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-2 bg-white/50 rounded-full mt-2" />
            </div>
          </motion.div>
        </section>

        {/* Description & Sub-services */}
        <section className="px-6 md:px-10 lg:px-16 py-36 md:py-52">
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
        <section className="px-6 md:px-10 lg:px-16 py-36 md:py-52 bg-blush">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-wider text-neutral-900 mb-16"
              initial={fadeIn.initial}
              whileInView={fadeIn.animate}
              viewport={{ once: true, margin: '-60px' }}
              transition={fadeIn.transition}
            >
              Gallery
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {galleryImages.map((src, idx) => (
                <motion.div
                  key={idx}
                  className="relative h-[300px] md:h-[350px] overflow-hidden cursor-pointer"
                  initial={fadeIn.initial}
                  whileInView={fadeIn.animate}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ ...fadeIn.transition, delay: (idx % 4) * 0.08 }}
                  onClick={() => setLightboxIndex(idx)}
                >
                  <Image
                    src={src}
                    alt={`${title} gallery ${idx + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setLightboxIndex(null)}
            >
              {/* Close button */}
              <button
                className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close lightbox"
              >
                <X className="h-8 w-8" />
              </button>

              {/* Previous button */}
              <button
                className="absolute left-4 md:left-8 text-white/70 hover:text-white transition-colors z-10"
                onClick={(e) => { e.stopPropagation(); lightboxPrev() }}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-10 w-10" />
              </button>

              {/* Image */}
              <div
                className="relative w-[90vw] h-[80vh] max-w-5xl"
                onClick={(e) => e.stopPropagation()}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={lightboxIndex}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image
                      src={galleryImages[lightboxIndex]}
                      alt={`${title} gallery ${lightboxIndex + 1}`}
                      fill
                      className="object-contain"
                      sizes="90vw"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Next button */}
              <button
                className="absolute right-4 md:right-8 text-white/70 hover:text-white transition-colors z-10"
                onClick={(e) => { e.stopPropagation(); lightboxNext() }}
                aria-label="Next image"
              >
                <ChevronRight className="h-10 w-10" />
              </button>

              {/* Counter */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm tracking-wider">
                {lightboxIndex + 1} / {galleryImages.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact Form */}
        <section className="px-6 md:px-10 lg:px-16 py-36 md:py-52">
          <div className="max-w-6xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-wider text-neutral-900 mb-4">
                GET IN TOUCH
              </h2>
              <p className="text-neutral-500 text-base md:text-lg tracking-wide max-w-xl">
                Ready to book your session? Fill out the form below and I&apos;ll get back to you within 24 hours.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <ContactForm selectedService={serviceKey} />
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default ServicePage