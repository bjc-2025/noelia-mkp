"use client";

import { motion } from "framer-motion";
import Script from "next/script";

export function InstagramSection() {
  return (
    <section id="gallery" className="relative py-16 px-4 overflow-hidden bg-blush min-h-screen flex items-center">
      <div className="mx-auto max-w-7xl px-8 w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="relative mb-6">
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-8 tracking-wider text-neutral-900">
            INSTAGRAM
          </h2>
         
        </motion.div>

        {/* Elfsight Instagram Feed Widget */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Script 
            src="https://static.elfsight.com/platform/platform.js" 
            strategy="lazyOnload"
          />
          <div 
            className="elfsight-app-6c2fa1e0-9ad3-4760-86c8-e89d3a403684" 
            data-elfsight-app-lazy
          />
        </motion.div>

     
      </div>
    </section>
  );
}