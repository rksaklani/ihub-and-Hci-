import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Call for Innovation - iHub IIT Mandi',
  description: 'Call for Innovation from iHub IIT Mandi.',
}

export default function CallForInnovationPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary via-primary-light to-primary-dark text-white py-16 md:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-2 sm:px-4 md:px-6 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">Call for Innovation</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-6">
            Submit your innovative ideas and solutions in Human-Computer Interaction
          </p>
          <nav className="flex justify-center gap-2 text-white/80">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Call for Innovation</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-primary/5 to-white">
        <div className="container mx-auto px-2 sm:px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-8 md:p-10 lg:p-12 text-center border-2 border-primary/10 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <i className="fas fa-lightbulb text-5xl text-primary"></i>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-primary">Call for Innovation</h2>
              <p className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed">
                IIT Mandi iHub and HCi Foundation invites innovative ideas and solutions in the field of Human-Computer Interaction (HCi).
              </p>
              <a
                href="https://www.ihubiitmandi.in/call-for-innovation/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-dark text-white px-10 py-4 rounded-xl hover:from-primary-dark hover:to-primary transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <i className="fas fa-external-link-alt text-xl"></i>
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

