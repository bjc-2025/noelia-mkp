'use client'

import React, { useState } from 'react'
import { ContactFormProps, ServiceOption } from '@/types'

const SERVICE_OPTIONS: { value: ServiceOption | ''; label: string }[] = [
  { value: '', label: 'Select a service' },
  { value: 'photoshoot', label: 'Photoshoot' },
  { value: 'film-tv', label: 'Editorial' },
  { value: 'bridal', label: 'Bridal' },
]

const ContactForm: React.FC<ContactFormProps> = ({ selectedService }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: selectedService ?? '',
    date: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    const serviceName = SERVICE_OPTIONS.find(s => s.value === formData.service)?.label ?? 'General'

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: serviceName,
          date: formData.date,
          message: formData.message,
        }),
      })

      if (!res.ok) throw new Error()

      setStatus('sent')
      setFormData({ name: '', email: '', service: '', date: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputClasses =
    'w-full bg-transparent border-b border-neutral-400 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none transition-colors text-sm tracking-wide'

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          value={formData.name}
          onChange={handleChange}
          className={inputClasses}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
          className={inputClasses}
        />
        <select
          name="service"
          required
          value={formData.service}
          onChange={handleChange}
          className={`${inputClasses} bg-transparent appearance-none cursor-pointer`}
        >
          {SERVICE_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
              {opt.label}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={`${inputClasses} cursor-pointer`}
        />
      </div>

      <textarea
        name="message"
        placeholder="Tell me about your vision..."
        rows={4}
        value={formData.message}
        onChange={handleChange}
        className={`${inputClasses} resize-none`}
      />

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center gap-2 border border-neutral-900 px-10 py-3 text-sm tracking-widest uppercase text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Sending...' : 'Send Inquiry'}
      </button>

      {status === 'sent' && (
        <p className="text-green-700 text-sm tracking-wide">Thank you! Your inquiry has been sent successfully.</p>
      )}
      {status === 'error' && (
        <p className="text-red-600 text-sm tracking-wide">Something went wrong. Please try again.</p>
      )}
    </form>
  )
}

export default ContactForm
