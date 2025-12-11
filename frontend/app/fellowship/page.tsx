import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Fellowship - iHub IIT Mandi',
  description: 'Fellowship programs offered by iHub IIT Mandi for students and researchers.',
}

export default function FellowshipPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary via-primary-light to-primary-dark text-white py-16 md:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-2 sm:px-4 md:px-6 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">Fellowship</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-6">
            Ignite innovation and entrepreneurship potential through our fellowship programs
          </p>
          <nav className="flex justify-center gap-2 text-white/80">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Fellowship</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-primary/5 to-white">
        <div className="container mx-auto px-2 sm:px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-primary">
                Are You Looking for a Fellowship Program?
              </h2>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                At iHub, we strongly believe that the world can be changed for the better by the potential of young, original, and creative minds. So in order to ignite innovation and entrepreneurship potential, we offer different Fellowship Programs:
              </p>
            </div>

            <div className="space-y-6 md:space-y-8">
              {/* Anubhav Graduate Internship Fellowship */}
              <div className="glass-strong rounded-2xl p-6 md:p-8 lg:p-10 border-2 border-primary/10 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-start gap-6 mb-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                    <i className="fas fa-graduation-cap text-3xl text-primary"></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold mb-6 text-primary">
                      1. Anubhav Graduate Internship Fellowship
                    </h3>
                    <div className="mb-6">
                      <a
                        href="https://www.ihubiitmandi.in/wp-content/uploads/2024/01/Anubhav-fellow-5th-batch.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-bold mb-6 group/link"
                      >
                        <i className="fas fa-file-pdf"></i>
                        Anubhav fellow 5th batch
                        <i className="fas fa-external-link-alt text-sm group-hover/link:translate-x-1 transition-transform"></i>
                      </a>
                      <p className="font-bold text-lg text-gray-800 mb-4">Eligibility for Fellowship Programme:</p>
                      <ul className="space-y-3 text-gray-700 mb-6">
                        <li className="flex items-start gap-3">
                          <i className="fas fa-check-circle text-primary mt-1 flex-shrink-0"></i>
                          <span>Bachelor's degree holders or pursuing a bachelor's degree in Computer Science/Electrical/Electronics/Information Technology/ Mechanical/Cognitive Science/ Life Science from a recognized University/ Institute.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <i className="fas fa-check-circle text-primary mt-1 flex-shrink-0"></i>
                          <span>Applicants must be aspiring to work in the areas related to "Human-Computer Interaction (HCi)".</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <i className="fas fa-check-circle text-primary mt-1 flex-shrink-0"></i>
                          <span>The nationality of the candidate is not a constraint.</span>
                        </li>
                      </ul>
                      <a
                        href="https://www.ihubiitmandi.in/wp-content/uploads/2024/01/Anubhav-fellow-5th-batch.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-3 rounded-xl hover:from-primary-dark hover:to-primary transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        <i className="fas fa-file-pdf"></i>
                        Know More
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post Graduate Fellowship */}
              <div className="glass-strong rounded-2xl p-6 md:p-8 lg:p-10 border-2 border-primary/10 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                    <i className="fas fa-user-graduate text-3xl text-primary"></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
                      2. Post Graduate Fellowship
                    </h3>
                    <p className="text-lg text-gray-700">Details coming soon.</p>
                  </div>
                </div>
              </div>

              {/* Doctoral Fellowship */}
              <div className="glass-strong rounded-2xl p-6 md:p-8 lg:p-10 border-2 border-primary/10 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                    <i className="fas fa-user-tie text-3xl text-primary"></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
                      3. Doctoral Fellowship
                    </h3>
                    <p className="text-lg text-gray-700">Details coming soon.</p>
                  </div>
                </div>
              </div>

              {/* Post Doctoral Fellowship */}
              <div className="glass-strong rounded-2xl p-6 md:p-8 lg:p-10 border-2 border-primary/10 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                    <i className="fas fa-user-md text-3xl text-primary"></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
                      4. Post Doctoral Fellowship
                    </h3>
                    <p className="text-lg text-gray-700">Details coming soon.</p>
                  </div>
                </div>
              </div>

              {/* Faculty Fellowship */}
              <div className="glass-strong rounded-2xl p-6 md:p-8 lg:p-10 border-2 border-primary/10 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                    <i className="fas fa-chalkboard-teacher text-3xl text-primary"></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
                      5. Faculty Fellowship
                    </h3>
                    <p className="text-lg text-gray-700">Details coming soon.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

