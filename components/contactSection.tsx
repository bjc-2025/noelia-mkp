'use client'

import React from 'react'
import { motion } from 'framer-motion'
import ContactForm from '@/components/contactForm'
import { ContactSectionProps } from '@/types'

const ContactSection: React.FC<ContactSectionProps> = ({ selectedService }) => {
  return (
    <section
      id="contact"
      className="relative bg-white py-24 px-6 md:px-10 lg:px-16 min-h-screen flex items-center"
    >
      <div className="max-w-4xl mx-auto w-full">
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
          <ContactForm selectedService={selectedService} />
        </motion.div>
      </div>
    </section>
  )
}

export default ContactSection
