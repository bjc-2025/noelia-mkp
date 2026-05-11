'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const serviceLabels: Record<string, string> = {
    bridal: 'Bridal Makeup',
    'special-event': 'Special Event Makeup',
    photoshoot: 'Photoshoot Makeup',
    lessons: 'Makeup Lessons',
    other: 'Other',
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    const serviceName = serviceLabels[formData.service] ?? 'General'

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: serviceName,
          message: formData.message,
        }),
      })

      if (!res.ok) throw new Error()

      setStatus('sent')
      setFormData({ name: '', email: '', phone: '', service: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-32 pb-20 px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-5xl md:text-6xl font-light text-white mb-6 text-center">
          Get In Touch
        </h1>
        <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Ready to enhance your beauty? Contact us to schedule your appointment or ask any questions about our services.
        </p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-sm rounded-lg p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-white text-sm font-light mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg border border-white/20 focus:border-white/40 focus:outline-none transition-all"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-white text-sm font-light mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg border border-white/20 focus:border-white/40 focus:outline-none transition-all"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="phone" className="block text-white text-sm font-light mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg border border-white/20 focus:border-white/40 focus:outline-none transition-all"
                placeholder="(123) 456-7890"
              />
            </div>

            <div>
              <label htmlFor="service" className="block text-white text-sm font-light mb-2">
                Service Interested In
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg border border-white/20 focus:border-white/40 focus:outline-none transition-all"
              >
                <option value="" className="bg-gray-900">Select a service</option>
                <option value="bridal" className="bg-gray-900">Bridal Makeup</option>
                <option value="special-event" className="bg-gray-900">Special Event Makeup</option>
                <option value="photoshoot" className="bg-gray-900">Photoshoot Makeup</option>
                <option value="lessons" className="bg-gray-900">Makeup Lessons</option>
                <option value="other" className="bg-gray-900">Other</option>
              </select>
            </div>
          </div>

          <div className="mb-8">
            <label htmlFor="message" className="block text-white text-sm font-light mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg border border-white/20 focus:border-white/40 focus:outline-none transition-all resize-none"
              placeholder="Tell us about your event or what you're looking for..."
            />
          </div>

          <div className="flex flex-col items-center gap-4">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="px-12 py-4 bg-white text-black rounded-full text-sm tracking-wider hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? 'SENDING...' : 'SEND MESSAGE'}
            </button>

            {status === 'sent' && (
              <p className="text-green-400 text-sm">Thank you! Your inquiry has been sent successfully.</p>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
            )}
          </div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-light text-white mb-6">Other Ways to Reach Us</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <div>
              <p className="text-gray-400 text-sm mb-2">EMAIL</p>
              <p className="text-white">hello@noeliamakeup.com</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">PHONE</p>
              <p className="text-white">(555) 123-4567</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">INSTAGRAM</p>
              <p className="text-white">@noeliamakeup</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ContactPage