'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const sliderImages = [
  '/images/hero/slider/DSC08484.jpeg',
  '/images/hero/slider/DSC08508.jpeg',
  '/images/hero/slider/DSC08593.jpeg',
  '/images/hero/slider/DSC08687.jpeg',
  '/images/hero/slider/DSC08711.jpeg',
]

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Desktop: 5 photos side by side, each sliding in from right */}
      <div className="hidden lg:flex h-full">
        {sliderImages.map((src, index) => (
          <motion.div
            key={index}
            className="relative h-full overflow-hidden"
            style={{ width: '20%' }}
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
              alt={`Noelia Makeup portfolio ${index + 1}`}
              fill
              className="object-cover"
              priority={index < 2}
            />
          </motion.div>
        ))}
      </div>

      {/* Mobile: slideshow one by one */}
      <div className="lg:hidden relative h-full">
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
              src={sliderImages[currentIndex]}
              alt={`Noelia Makeup portfolio ${currentIndex + 1}`}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* NOELIA text - left */}
      <motion.div
        className="absolute inset-0 flex items-end justify-start pl-4 sm:pl-8 pb-28 z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <h1 className="text-white text-[2rem] sm:text-[4rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] font-medium tracking-wider whitespace-nowrap leading-[0.85]">
          NOELIA
          <br />
          <span className="text-[1.5rem] sm:text-[3rem] md:text-[4.5rem] lg:text-[6rem] xl:text-[7.5rem]">MAKEUP</span>
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
  )
}

export default HeroSection
