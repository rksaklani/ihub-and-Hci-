import Image from 'next/image'

const partners = [
  {
    name: 'Partner 1',
    image: '/assets/img/partners/Our-Affiliations-01-1.png',
  },
  {
    name: 'Partner 2',
    image: '/assets/img/partners/Our-Affiliations-03.png',
  },
  {
    name: 'Partner 3',
    image: '/assets/img/partners/Our-Affiliations-04.png',
  },
]

export default function OurPartners() {
  return (
    <section className="py-16 bg-gradient-to-b from-primary/5 to-white">
      <div className="container mx-auto px-2 sm:px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">Our Partners</h2>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="glass rounded-lg p-4 md:p-6 hover:shadow-xl transition-shadow flex items-center justify-center"
            >
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                <Image
                  src={partner.image}
                  alt={partner.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

