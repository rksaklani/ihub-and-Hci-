'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const bannerImages = [
  '/assets/img/hero/Banner_8.jpg',
  '/assets/img/hero/Banner_9.jpg',
  '/assets/img/hero/Banner_3.jpg',
  '/assets/img/hero/Banner_4.jpg',
  '/assets/img/hero/Banner_7.jpg',
]

const firstLine = 'Technology in Harmony'
const secondLine = 'with Human Needs'

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [featherPosition, setFeatherPosition] = useState({ x: 0, y: 0, angle: 0 })

  // Typing animation effect
  useEffect(() => {
    const lines = [firstLine, secondLine]
    let timeoutId: NodeJS.Timeout
    let lineIdx = 0
    let charIdx = 0

    const typeText = () => {
      if (lineIdx < lines.length) {
        const currentLineText = lines[lineIdx]
        if (charIdx < currentLineText.length) {
          setDisplayedText(() => {
            if (lineIdx === 0) {
              return currentLineText.substring(0, charIdx + 1)
            } else {
              return lines[0] + '\n' + currentLineText.substring(0, charIdx + 1)
            }
          })
          setCurrentCharIndex(charIdx)
          charIdx++
          timeoutId = setTimeout(typeText, 120) // Typing speed
        } else {
          // Move to next line
          lineIdx++
          charIdx = 0
          setCurrentLineIndex(lineIdx)
          if (lineIdx < lines.length) {
            timeoutId = setTimeout(typeText, 400) // Pause between lines
          } else {
            setIsTyping(false)
          }
        }
      }
    }

    // Reset and start typing when slide changes
    setDisplayedText('')
    setCurrentLineIndex(0)
    setCurrentCharIndex(0)
    setIsTyping(true)
    lineIdx = 0
    charIdx = 0
    timeoutId = setTimeout(typeText, 500) // Initial delay

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [currentIndex])

  // Feather circular motion animation
  useEffect(() => {
    if (!isTyping) return

    let animationFrame: number
    let angle = 0

    const animateFeather = () => {
      angle += 0.05 // Speed of rotation
      const radius = 15 // Radius of circular motion
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      
      setFeatherPosition({
        x,
        y,
        angle: angle * (180 / Math.PI), // Convert to degrees for rotation
      })

      animationFrame = requestAnimationFrame(animateFeather)
    }

    animateFeather()

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [isTyping, currentCharIndex])

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + bannerImages.length) % bannerImages.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % bannerImages.length)
  }

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden">
      {bannerImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image}
            alt={`Banner ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Blue Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-br from-black/40 via-blue-600/30 to-black/40"></div>

      {/* Slogan Text with Typing Animation and Feather */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="max-w-5xl px-4 text-center">
          <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            <div className="relative inline-block">
              <span className="relative z-10">
                {displayedText.split('\n').map((line, index) => (
                  <span key={index} className="block">
                    {index === 0 ? (
                      <span className="text-transparent bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]">
                        {line}
                      </span>
                    ) : (
                      <span className="text-transparent bg-gradient-to-r from-blue-200 via-white to-blue-200 bg-clip-text drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]">
                        {line}
                      </span>
                    )}
                  </span>
                ))}
                
                {/* Feather Animation - follows typing position */}
                {isTyping && (
                  <span
                    className="absolute inline-block transition-all duration-75 ease-out"
                    style={{
                      transform: `translate(${featherPosition.x}px, ${featherPosition.y}px) rotate(${featherPosition.angle}deg)`,
                      marginLeft: '0.3em',
                      filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.9)) drop-shadow(0 0 15px rgba(135,206,250,0.6))',
                    }}
                  >
                    {/* Feather SVG with glow trail */}
                    <svg
                      className="w-5 h-5 text-white sm:w-6 sm:h-6 md:w-7 md:h-7 animate-feather-glow"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      style={{
                        filter: 'drop-shadow(0 0 3px rgba(255,255,255,1))',
                      }}
                    >
                      {/* Main feather shape */}
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" opacity="0.95"/>
                      {/* Feather details */}
                      <path d="M8 12c-1.5 2-2 4-2 6 0 2 1 4 3 5 1 .5 2 .5 3 0 2-1 3-3 3-5 0-2-.5-4-2-6" opacity="0.6"/>
                      <path d="M10 8c-0.5 1-1 2-1 3 0 1 0.5 2 1.5 2.5 0.5 0.3 1 0.3 1.5 0 1-0.5 1.5-1.5 1.5-2.5 0-1-0.5-2-1-3" opacity="0.4"/>
                    </svg>
                    
                    {/* Glowing trail effect */}
                    <span
                      className="absolute inset-0 blur-md opacity-60"
                      style={{
                        background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(135,206,250,0.4) 50%, transparent 100%)',
                        transform: 'scale(1.5)',
                        animation: 'pulse-glow 2s ease-in-out infinite',
                      }}
                    />
                  </span>
                )}
              </span>
              
              {/* Glow effect behind text */}
              <div className="absolute inset-0 blur-2xl opacity-30">
                {displayedText.split('\n').map((line, index) => (
                  <span key={index} className="block">
                    <span className="text-transparent bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text">
                      {line}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </h2>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute z-20 p-2 transition-all -translate-y-1/2 rounded-full left-4 top-1/2 bg-white/80 hover:bg-white text-primary"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute z-20 p-2 transition-all -translate-y-1/2 rounded-full right-4 top-1/2 bg-white/80 hover:bg-white text-primary"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute z-20 flex gap-2 -translate-x-1/2 bottom-4 left-1/2">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-8' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
