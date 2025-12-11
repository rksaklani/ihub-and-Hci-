'use client'

import Image from 'next/image'

export default function KeyHighlights() {
  const stats = [
    { 
      value: 0, 
      label: 'Technologies Developed', 
      suffix: '',
      image: '/assets/img/digital-services-300x300.png',
    },
    { 
      value: 0, 
      label: 'Startups Incubated', 
      suffix: '',
      image: '/assets/img/start-up-300x300.png',
    },
    { 
      value: 0, 
      label: 'Manpower Trained', 
      suffix: '+',
      image: '/assets/img/skills-300x300.png',
    },
    { 
      value: 0, 
      label: 'Collaborations', 
      suffix: '',
      image: '/assets/img/partners/partnership-300x300.png',
    },
  ]

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-primary/5">
      <div className="container mx-auto px-2 sm:px-4 md:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-primary">
          Key Highlights of iHub
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="glass-strong rounded-lg p-6 md:p-8 text-center hover:shadow-xl transition-shadow border-2 border-primary/10"
            >
              <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 md:mb-6">
                <Image
                  src={stat.image}
                  alt={stat.label}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-3 md:mb-4">
                {stat.value}
                {stat.suffix}
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-800">{stat.label}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

