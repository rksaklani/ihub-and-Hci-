'use client'

import { useState, useEffect } from 'react'

const heroImages = [
  '/assets/img/CHCINEw1.png',
  '/assets/img/chcinew2.png',
  '/assets/img/chcinew3.png',
]

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
          Centre for Human-Computer <br /> Interaction (CHCi)
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-200 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Driving innovation at the intersection of humans and technology,
          the Centre for Human-Computer Interaction (CHCi) at IIT Mandi is committed to shaping the future
          through intuitive design, inclusive research, and cutting-edge solutions.
        </p>
      </div>
    </div>
  )
}

