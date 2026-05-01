'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <section id="about" className="min-h-screen bg-white py-20 px-8 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-medium mb-8 tracking-wider text-neutral-900"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              NOE
            </motion.h2>
            
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-neutral-600 leading-relaxed font-bold">
               For the past 10 years, makeup has been both my craft and my way of understanding expression, identity, and transformation.
              </p>
              
              <p className="text-lg text-neutral-600 leading-relaxed">
                Originally from South America, I was shaped by a culture where celebration is part of everyday life — where colour, movement, and creativity come together in powerful ways. That influence continues to guide how I approach my work today.
My journey has taken me across Argentina, France, and Australia, allowing me to learn from different perspectives and evolve my style through diverse cultures and experiences. I see myself as a global artist — constantly exploring, learning, and refining my craft.
With a background in psychology, I’m deeply interested in identity and how we express it. I don’t see makeup as something that corrects, but something that reveals — a tool for storytelling, emotion, and individuality.
Whether it’s a natural look or something more experimental, my work is always guided by expression, transformation, and the unique story behind every face.
              </p>
            </motion.div>

            
          </div>

          {/* Image */}
          <motion.div 
            className="order-1 lg:order-2 relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative aspect-[4/5] w-full max-w-lg mx-auto lg:ml-auto lg:mr-0">
              <div className="absolute inset-0 bg-neutral-100 rounded-sm"></div>
              <Image
                src="/images/noe.JPG"
                alt="Noelia - Professional Makeup Artist"
                fill
                className="object-cover rounded-sm grayscale"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                priority
              />
              
            
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About