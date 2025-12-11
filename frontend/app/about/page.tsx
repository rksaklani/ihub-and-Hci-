import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us - iHub IIT Mandi',
  description: 'Learn about iHub IIT Mandi, a Technology Innovation Hub focused on Human-Computer Interaction research and development.',
}

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary via-primary-light to-primary-dark text-white py-16 md:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-2 sm:px-4 md:px-6 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">About Us</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-6">
            Learn about our mission, vision, and the innovative work we do at iHub IIT Mandi.
          </p>
          <nav className="flex justify-center gap-2 text-white/80">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">About Us</span>
          </nav>
        </div>
      </div>

      {/* About iHub Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-primary/5 to-white">
        <div className="container mx-auto px-2 sm:px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            {/* About iHub */}
            <div className="mb-16 md:mb-20">
              <div className="glass-strong rounded-2xl p-8 md:p-10 lg:p-12 border-2 border-primary/10 shadow-xl">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8 text-primary">About iHub</h2>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                  IIT Mandi iHub and HCi Foundation (iHub) is a Technology Innovation Hub (TIH). The Hub was incorporated on 24th September 2020. It is hosted at the Indian Institute of Technology (IIT) Mandi under India's National Mission on Interdisciplinary Cyber-Physical Systems (NM-ICPS). The iHub has been planned with the objective of making India a world leader in Human-Computer Interaction (HCi)-based research.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="mb-16 md:mb-20">
              <div className="glass-strong rounded-2xl p-8 md:p-10 lg:p-12 border-2 border-primary/10 shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                    <i className="fas fa-eye text-3xl text-primary"></i>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">Vision of the iHub</h2>
                </div>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  To be an internationally recognized hub that nurtures HCi research, enables technology translation for industry, and scales skill development.
                </p>
              </div>
            </div>

            {/* Primary Activities */}
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 md:mb-12 text-primary text-center">Primary Activities of iHub</h2>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Research & Technology Development */}
                <div className="glass-strong rounded-2xl p-6 md:p-8 hover:shadow-2xl transition-all duration-300 border-2 border-primary/10 hover:border-primary/30 group">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <i className="fas fa-flask text-2xl text-primary"></i>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-primary">Research & Technology Development</h3>
                  </div>
                  <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
                    At IIT Mandi iHub, we are committed to promoting a results-driven approach to developing technological solutions that are rooted in real-life applications. Our focus is on innovations with significant market potential. Through our Call for Proposals (CfP) program, we actively support and advance translational research.
                  </p>
                  <Link
                    href="/research"
                    className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-dark transition-colors group/link"
                  >
                    Read More
                    <i className="fas fa-arrow-right group-hover/link:translate-x-1 transition-transform"></i>
                  </Link>
                </div>

                {/* Skill Development */}
                <div className="glass-strong rounded-2xl p-6 md:p-8 hover:shadow-2xl transition-all duration-300 border-2 border-primary/10 hover:border-primary/30 group">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <i className="fas fa-graduation-cap text-2xl text-primary"></i>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-primary">Skill Development</h3>
                  </div>
                  <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
                    As an approved training partner for central and state government-sponsored schemes such as PMKVY (Pradhan Mantri Kaushal Vikas Yojana) and HPKVN (Himachal Pradesh Kaushal Vikas Nigam), IIT Mandi iHub offers certified short-term skill courses in the area of Human-Computer Interaction. These programs are designed to equip participants with practical skills and cutting-edge knowledge to excel in the field of HCi.
                  </p>
                  <Link
                    href="/skill-development"
                    className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-dark transition-colors group/link"
                  >
                    Read More
                    <i className="fas fa-arrow-right group-hover/link:translate-x-1 transition-transform"></i>
                  </Link>
                </div>

                {/* Incubation & Acceleration */}
                <div className="glass-strong rounded-2xl p-6 md:p-8 hover:shadow-2xl transition-all duration-300 border-2 border-primary/10 hover:border-primary/30 group">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <i className="fas fa-rocket text-2xl text-primary"></i>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-primary">Incubation & Acceleration</h3>
                  </div>
                  <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
                    At IIT Mandi iHub, we are committed to supporting entrepreneurship and innovation through our various incubation and acceleration programs. Under our Call for Innovation (Cf I) program, we offer startups mentorship, funding support, and access to state-of-the-art infrastructure. By collaborating closely with entrepreneurs, we help turn their innovative ideas into practical solutions that can make a real impact.
                  </p>
                  <Link
                    href="/startups"
                    className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-dark transition-colors group/link"
                  >
                    Read More
                    <i className="fas fa-arrow-right group-hover/link:translate-x-1 transition-transform"></i>
                  </Link>
                </div>

                {/* Collaboration */}
                <div className="glass-strong rounded-2xl p-6 md:p-8 hover:shadow-2xl transition-all duration-300 border-2 border-primary/10 hover:border-primary/30 group">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <i className="fas fa-handshake text-2xl text-primary"></i>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-primary">Collaboration</h3>
                  </div>
                  <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
                    At IIT Mandi iHub, we are all about making a real difference by tackling everyday challenges. We actively collaborate with government and non-government organizations, both nationally and internationally, to work on a variety of projects. By teaming up, we aim to create practical solutions in the field of Human-Computer Interaction that address real-world problems.
                  </p>
                  <Link
                    href="/collaborations"
                    className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-dark transition-colors group/link"
                  >
                    Read More
                    <i className="fas fa-arrow-right group-hover/link:translate-x-1 transition-transform"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

