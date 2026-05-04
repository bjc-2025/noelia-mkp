'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const services = [
  { label: 'Weddings', href: '/services/weddings' },
  { label: 'Photoshoot', href: '/services/photoshoot' },
  { label: 'Film & TV', href: '/services/film-tv' },
]

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 p-8 z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/50 backdrop-blur-sm border-b border-white/20' : 'bg-transparent'
        }`}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className={`text-white text-base font-medium tracking-wider transition-opacity duration-300 ${
              scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            NOELIA MAKEUP
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-white text-sm tracking-wider hover:opacity-70 transition-opacity"
            >
              HOME
            </Link>
            <Link
              href="/#about"
              className="text-white text-sm tracking-wider hover:opacity-70 transition-opacity"
            >
              ABOUT
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <span
                className="text-white text-sm tracking-wider hover:opacity-70 transition-opacity cursor-pointer"
              >
                SERVICES
              </span>
              {servicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                  <div className="bg-black/80 backdrop-blur-sm border border-white/20 rounded-md py-2 min-w-[160px]">
                    {services.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="block px-4 py-2 text-white text-sm tracking-wider hover:opacity-70 transition-opacity"
                      >
                        {service.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link
              href="/#contact"
              className="text-white text-sm tracking-wider hover:opacity-70 transition-opacity"
            >
              CONTACT
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/"
              className="text-white text-2xl tracking-wider hover:opacity-70 transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            >
              HOME
            </Link>
            <Link
              href="/#about"
              className="text-white text-2xl tracking-wider hover:opacity-70 transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            >
              ABOUT
            </Link>
            <div className="flex flex-col items-center gap-4">
              <span className="text-white text-2xl tracking-wider">SERVICES</span>
              {services.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="text-white/70 text-lg tracking-wider hover:opacity-70 transition-opacity"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {service.label}
                </Link>
              ))}
            </div>
            <Link
              href="/#contact"
              className="text-white text-2xl tracking-wider hover:opacity-70 transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            >
              CONTACT
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
