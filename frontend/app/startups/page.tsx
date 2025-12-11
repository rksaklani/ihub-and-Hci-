import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Incubation - iHub IIT Mandi',
  description: 'Explore incubation and acceleration programs for startups at iHub IIT Mandi.',
}

const fundingSchemes = [
  {
    name: 'EIR',
    amount: 'Up to ₹30K per month',
    stage: 'Idea Stage',
    link: 'https://www.ihubiitmandi.in/wp-content/uploads/2024/06/More-details-about-CPS-EIR.pdf',
  },
  {
    name: 'Prayas',
    amount: 'Up to ₹5L',
    stage: 'Prototype Stage',
    link: 'https://www.ihubiitmandi.in/wp-content/uploads/2024/06/More-details-about-CPS-PRAYAS.pdf',
  },
  {
    name: 'SSS',
    amount: 'Up to ₹50L',
    stage: 'Commercialization Stage',
    link: 'https://www.ihubiitmandi.in/wp-content/uploads/2024/06/More-details-about-CPS-SSS.pdf',
  },
  {
    name: 'Accelerator',
    amount: 'Raise ₹1Cr',
    stage: 'Post MVP/Early Revenue Stage',
    link: 'https://www.ihubiitmandi.in/wp-content/uploads/2024/06/More-details-about-CPS-DIAL.pdf',
  },
]

const startups = [
  { name: 'Brave Heart Solutions', category: 'Assistive Technologies', location: 'Noida', link: 'https://nrihelpline.com/' },
  { name: 'SVRC Techno Innovations Private Limited', category: 'Device Led Technologies', location: 'Noida', link: 'https://www.chiragtechnologies.com/' },
  { name: 'Electica Energy', category: 'Device Led Technologies', location: 'Madhya Pradesh', link: 'https://www.electica.in/' },
  { name: 'Dubverse', category: 'Gen AI (Audio)', location: 'Gurugram', link: 'https://dubverse.ai/' },
  { name: 'Minus Zero Robotics Private Limited', category: 'Device Led Technologies', location: 'Bengaluru', link: 'https://www.minuszero.ai/' },
  { name: 'Wellnesys Technologies Private Limited', category: 'Assistive Technologies', location: 'Bengaluru', link: 'https://www.yogifi.co.in/' },
  { name: 'Synsta Solutions Private Limited', category: 'Assistive Technologies', location: 'Kullu', link: 'https://www.synsta.io/' },
  { name: 'Square Comp Solutions Pvt. Ltd.', category: 'Experience Technologies', location: 'Chennai', link: 'https://grahasvr.com' },
  { name: 'Task Tracker', category: 'Assistive Technologies', location: 'Delhi', link: 'https://tasktracker.in/' },
  { name: 'ENORD', category: 'Device Technologies', location: 'Delhi', link: 'https://enord.co/' },
  { name: 'Bonv Technology Private Limited', category: 'Device Led Technologies', location: 'Bhubaneswar', link: 'https://bonvaero.com/' },
  { name: 'Embright Infotech Private Limited', category: 'Experience Technologies', location: 'Trivandrum', link: 'https://bonvaero.com/' },
  { name: 'Dectrocel Healthcare and Research Pvt Ltd', category: 'Assistive Technologies', location: 'Lucknow', link: 'https://aidigitalhealth.com/' },
  { name: 'DualSafe Private Limited', category: 'Device Led Technologies', location: 'Bengaluru', link: 'http://dualsafe.in/' },
  { name: 'Magnimus Systems Private Limited', category: 'Experience Technologies', location: 'Bengaluru', link: 'https://www.magnimus.com/' },
  { name: 'PYXILL HEALTH PRIVATE LIMITED', category: 'Device Led Technologies', location: 'Bengaluru', link: 'https://www.varidose.io/' },
  { name: '256 Bits Studio Private Limited', category: 'Experience Technologies', location: 'Ahmedabad', link: 'https://www.256bitsstudio.com/' },
  { name: 'Wundrsight Pvt. Ltd.', category: 'Experience Technologies', location: 'Bengaluru', link: 'https://www.wundrsight.com/' },
  { name: 'Parentheses Systems Pvt Ltd', category: 'Device Led Technologies', location: 'Pune', link: 'https://www.parentheses.systems/' },
  { name: 'MadVR Solutions Pvt. Ltd.', category: 'Experience Technologies', location: 'Bengaluru', link: 'https://www.madvr.in/' },
]

export default function StartupsPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary via-primary-light to-primary-dark text-white py-16 md:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-2 sm:px-4 md:px-6 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">Incubation</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-6">
            Supporting startups and innovation in Human-Computer Interaction
          </p>
          <nav className="flex justify-center gap-2 text-white/80">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Incubation</span>
          </nav>
        </div>
      </div>

      {/* Introduction */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white via-primary/5 to-white">
        <div className="container mx-auto px-2 sm:px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="glass-strong rounded-2xl p-8 md:p-10 border-2 border-primary/10 shadow-xl mb-8">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                In order to boost research, scale up skill development, and enable technology translation for industry, IIT Mandi iHub and HCi Foundation is providing financial assistance to Start-ups working in the domain of Human-Computer Interaction (HCi) through a variety of funding schemes and programs such as:
              </p>
              <div className="text-center">
                <Link
                  href="/call-for-innovation"
                  className="inline-block bg-gradient-to-r from-primary to-primary-dark text-white px-10 py-4 rounded-xl hover:from-primary-dark hover:to-primary transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <i className="fas fa-lightbulb mr-2"></i>
                  Call for Innovation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Funding Schemes */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-2 sm:px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary">Human-Computer Interaction</h2>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700">Cyber-Physical Systems (CPS)</h3>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
            {fundingSchemes.map((scheme, index) => (
              <a
                key={index}
                href={scheme.link}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-strong rounded-2xl p-6 md:p-8 text-center hover:shadow-2xl transition-all duration-300 border-2 border-primary/10 hover:border-primary/30 group"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <i className="fas fa-hand-holding-usd text-3xl text-primary"></i>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-3">{scheme.name}</h3>
                <p className="text-xl md:text-2xl font-bold text-gray-800 mb-2">{scheme.amount}</p>
                <p className="text-sm md:text-base text-gray-600 bg-primary/5 px-4 py-2 rounded-lg inline-block">{scheme.stage}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Support Services */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white via-primary/5 to-white">
        <div className="container mx-auto px-2 sm:px-4 md:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center text-primary">Support Services</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
            <Link
              href="/affiliated-faculty"
              className="glass-strong rounded-2xl p-6 md:p-8 text-center hover:shadow-2xl transition-all duration-300 border-2 border-primary/10 hover:border-primary/30 group"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <i className="fas fa-user-graduate text-3xl text-primary"></i>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-primary">Tech Mentoring</h3>
            </Link>
            <Link
              href="/labs"
              className="glass-strong rounded-2xl p-6 md:p-8 text-center hover:shadow-2xl transition-all duration-300 border-2 border-primary/10 hover:border-primary/30 group"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <i className="fas fa-building text-3xl text-primary"></i>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-primary">Cowork Space</h3>
            </Link>
            <Link
              href="/labs"
              className="glass-strong rounded-2xl p-6 md:p-8 text-center hover:shadow-2xl transition-all duration-300 border-2 border-primary/10 hover:border-primary/30 group"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <i className="fas fa-flask text-3xl text-primary"></i>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-primary">Access to Labs</h3>
            </Link>
            <Link
              href="/faculty"
              className="glass-strong rounded-2xl p-6 md:p-8 text-center hover:shadow-2xl transition-all duration-300 border-2 border-primary/10 hover:border-primary/30 group"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <i className="fas fa-briefcase text-3xl text-primary"></i>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-primary">Business Mentoring</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 md:py-24 bg-gradient-to-r from-primary via-primary-light to-primary-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-2 sm:px-4 md:px-6 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8">Innovative Ideas</h2>
          <p className="text-lg md:text-xl mb-8 text-white/90 max-w-4xl mx-auto leading-relaxed">
            Since our establishment at IIT Mandi, we have handpicked and supported over 75 innovation ideas. We have provided the seed funding to 11 startups, which have generated 198 employment and 93 internship opportunities. Our funded startups have received nearly 18 awards at the state, national, and international levels. Their work areas includes agriculture, healthcare, disaster management, waste management, clean energy, and education.
          </p>
        </div>
      </section>

      {/* iHub Invested Startups */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-2 sm:px-4 md:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 sm:mb-0">iHub Invested Startups</h2>
            <a
              href="http://dev.ihubiitmandi.in/wp-content/uploads/2022/06/new-3.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-dark font-bold text-lg inline-flex items-center gap-2"
            >
              View All
              <i className="fas fa-arrow-right"></i>
            </a>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {startups.map((startup, index) => (
              <div key={index} className="glass-strong rounded-2xl p-6 md:p-8 hover:shadow-2xl transition-all duration-300 border-2 border-primary/10 hover:border-primary/30 group">
                <h3 className="text-xl md:text-2xl font-bold text-primary mb-4 group-hover:text-primary-dark transition-colors">{startup.name}</h3>
                <div className="space-y-2 mb-6">
                  <p className="text-gray-700 text-sm md:text-base">
                    <strong className="text-primary">Thematic Category:</strong> {startup.category}
                  </p>
                  <p className="text-gray-600 text-sm md:text-base flex items-center gap-2">
                    <i className="fas fa-map-marker-alt text-primary"></i>
                    {startup.location}
                  </p>
                </div>
                <a
                  href={startup.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-dark transition-colors group/link"
                >
                  Visit Website
                  <i className="fas fa-external-link-alt group-hover/link:translate-x-1 transition-transform"></i>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

