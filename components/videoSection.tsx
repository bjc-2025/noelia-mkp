"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'

const words = ['Freedom', 'Artistry', 'Experience', 'Beauty', 'Adaptive']

export default function VideoSection() {
  const [isMuted, setIsMuted] = useState(true)
  const [wordIndex, setWordIndex] = useState(0)

  const toggleMute = () => setIsMuted(!isMuted)

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/images/make-up-artist-doing-make-up-for-the-actress-2025-08-28-09-40-43-utc.mov" type="video/mp4" />
          <source src="/images/make-up-artist-doing-make-up-for-the-actress-2025-08-28-09-40-43-utc.mov" type="video/quicktime" />
          {/* Fallback for browsers that don't support video */}
          Your browser does not support the video tag.
        </video>

        {/* Darker overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>


      {/* Slideshow Words - Bottom Left */}
      <div className="absolute bottom-24 left-4 z-10 pointer-events-none sm:left-8 md:left-12 lg:left-16">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            className="block text-white/70 text-[2rem] sm:text-[4rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] font-medium tracking-wider uppercase leading-[0.85]"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            {words[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Video Controls - Bottom Right */}
      <div className="absolute bottom-8 right-8 z-20">
        <button
          onClick={toggleMute}
          className="rounded-full bg-white/10 p-3 backdrop-blur-md transition-all hover:bg-white/20"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? (
            <VolumeX className="h-5 w-5 text-white" />
          ) : (
            <Volume2 className="h-5 w-5 text-white" />
          )}
        </button>
      </div>
    </section>
  )
}