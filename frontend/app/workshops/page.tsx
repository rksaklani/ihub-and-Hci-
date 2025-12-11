import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Workshops - iHub IIT Mandi',
  description: 'Workshops and training sessions conducted by iHub IIT Mandi.',
}

const workshops = [
  {
    title: '4th Hybrid Winter School on Cognitive Modeling',
    description: 'An intensive workshop focusing on cognitive modeling techniques and their applications in Human-Computer Interaction research.',
  },
  {
    title: 'Workshop on Consciousness and Indian Knowledge System',
    description: 'Exploring the intersection of consciousness studies and traditional Indian knowledge systems in the context of modern HCI research.',
  },
]

export default function WorkshopsPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary via-primary-light to-primary-dark text-white py-16 md:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-2 sm:px-4 md:px-6 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">Workshops</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-6">
            Explore our workshops and training sessions
          </p>
          <nav className="flex justify-center gap-2 text-white/80">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Workshops</span>
          </nav>
        </div>
      </div>

      {/* Workshops List */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-primary/5 to-white">
        <div className="container mx-auto px-2 sm:px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary">Our Workshops</h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                Join us for intensive workshops and training sessions on various topics related to Human-Computer Interaction.
              </p>
            </div>

            {workshops.length === 0 ? (
              <div className="text-center py-12 glass-strong rounded-2xl border-2 border-primary/10">
                <i className="fas fa-chalkboard-teacher text-5xl text-gray-400 mb-4"></i>
                <p className="text-gray-600 text-lg">No workshops available at the moment</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
                {workshops.map((workshop, index) => (
                  <div
                    key={index}
                    className="glass-strong rounded-2xl p-8 md:p-10 hover:shadow-2xl transition-all duration-300 border-2 border-primary/10 hover:border-primary/30 group"
                  >
                    <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                      <i className="fas fa-chalkboard-teacher text-4xl text-primary"></i>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-4 text-primary text-center group-hover:text-primary-dark transition-colors">
                      {workshop.title}
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed text-center mb-6">
                      {workshop.description}
                    </p>
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 text-primary font-bold group-hover:text-primary-dark transition-colors">
                        <i className="fas fa-info-circle"></i>
                        Workshop Details
                        <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

