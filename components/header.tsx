'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 p-8 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/50 backdrop-blur-sm border-b border-white/20' : 'bg-transparent'
      }`}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <nav className="flex items-center justify-between">
        <span
          className={`text-white text-base font-medium tracking-wider transition-opacity duration-300 ${
            scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          NOELIA MAKEUP
        </span>
        <div className="flex items-center gap-8">
        <a
          href="#about"
          onClick={(e) => handleScrollTo(e, 'about')}
          className="text-white text-sm tracking-wider hover:opacity-70 transition-opacity cursor-pointer"
        >
          ABOUT
        </a>
        <a
          href="#services"
          onClick={(e) => handleScrollTo(e, 'services')}
          className="text-white text-sm tracking-wider hover:opacity-70 transition-opacity cursor-pointer"
        >
          SERVICES
        </a>
        <a
          href="#gallery"
          onClick={(e) => handleScrollTo(e, 'gallery')}
          className="text-white text-sm tracking-wider hover:opacity-70 transition-opacity cursor-pointer"
        >
          GALLERY
        </a>
        <Link href="/contact" className="text-white text-sm tracking-wider hover:opacity-70 transition-opacity">
          CONTACT
        </Link>
        </div>
      </nav>
    </motion.header>
  )
}

export default Header
