import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-blush px-8 py-16">
      <div className="max-w-8xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          {/* Follow Us Section */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-medium tracking-wider text-neutral-800">FOLLOW US</h3>
            <div className="flex flex-col gap-2">
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-1"
              >
                Facebook
                <span className="text-xs">↗</span>
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-1"
              >
                Instagram
                <span className="text-xs">↗</span>
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-1"
              >
                YouTube
                <span className="text-xs">↗</span>
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-1"
              >
                TikTok
                <span className="text-xs">↗</span>
              </a>
            </div>
          </div>

          {/* Brand Name */}
          <div className="flex items-end">
            <h2 className="text-3xl md:text-4xl font-bold tracking-wider text-neutral-800">NOELIA MAKEUP</h2>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-neutral-300">
          <div className="flex justify-center">
            <p className="text-xs text-neutral-500">© 2024 Noelia MKP. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer