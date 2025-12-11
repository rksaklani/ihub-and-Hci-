import Image from 'next/image'

export default function HCISectors() {
  const sectors = [
    {
      title: 'Assistive Technologies',
      description: 'Ensure that everyone can access and use technology, regardless of their abilities.',
      icon: 'fas fa-universal-access',
      image: '/assets/img/sectors/Working-areas-01.svg',
    },
    {
      title: 'Device-Led Technologies',
      description: 'Use of features and capabilities of the devices (sensors, touchscreens, and cameras) with voice, touch, and gestures to enhance the user\'s intuitive interaction with technology.',
      icon: 'fas fa-mobile-alt',
      image: '/assets/img/sectors/Working-areas-02.svg',
    },
    {
      title: 'Experience Technologies',
      description: 'Creating immersive experiences that ensure technology is functional as well as enjoyable to use.',
      icon: 'fas fa-vr-cardboard',
      image: '/assets/img/sectors/Working-areas-03.svg',
    },
    {
      title: 'Generative Design',
      description: 'Exploring and exploiting technologies based on Generative AI leading to business use cases across learning, business support, and contextual content creation.',
      icon: 'fas fa-robot',
      image: '/assets/img/sectors/Working-areas-04.svg',
      hasStrong: true,
    },
  ]

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-primary/5 to-white">
      <div className="container mx-auto px-2 sm:px-4 md:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-primary">
          The sectors addressed in Human-Computer Interaction
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {sectors.map((sector, index) => (
            <div
              key={index}
              className="glass-strong border-2 border-primary/20 rounded-lg p-4 md:p-6 hover:border-primary hover:shadow-xl transition-all"
            >
              {sector.image ? (
                <div className="relative w-full h-32 md:h-40 mb-3 md:mb-4 rounded-lg overflow-hidden bg-primary/5 flex items-center justify-center p-4">
                  <div className="svg-blue w-full h-full">
                    <Image
                      src={sector.image}
                      alt={sector.title}
                      width={200}
                      height={200}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>
              ) : (
                <div className="text-primary text-4xl md:text-5xl mb-3 md:mb-4">
                  <i className={sector.icon}></i>
                </div>
              )}
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-primary">{sector.title}</h3>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                {sector.hasStrong ? (
                  <>
                    Exploring and exploiting technologies based on <strong>Generative AI</strong> leading to business use cases across learning, business support, and contextual content creation.
                  </>
                ) : (
                  sector.description
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

