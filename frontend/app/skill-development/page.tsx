import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Skill Development Programs - iHub IIT Mandi',
  description: 'Explore skill development programs and training opportunities at iHub IIT Mandi.',
}

const jobRoles = [
  {
    title: 'AR/VR Developer',
    link: 'https://docs.google.com/forms/d/e/1FAIpQLSd1KAkqzz3TB7FweaJ65z8vAWzsNk49O4-KDvIVQmQmBWy-QQ/viewform',
  },
  {
    title: 'UI/UX Designer',
    link: 'https://docs.google.com/forms/d/e/1FAIpQLScGx5e9rhd1feLl6kVufhO5gCJLo3tuWzLafE6N-VpnnpAKcg/viewform',
  },
  {
    title: 'Data Analyst',
    link: 'https://docs.google.com/forms/d/e/1FAIpQLSdbkUWDXQwGNwU-1XvTRKxJE3L6CseU4w4Y_uIzh3YxM164UA/viewform',
  },
]

export default function SkillDevelopmentPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary via-primary-light to-primary-dark text-white py-16 md:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-2 sm:px-4 md:px-6 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">Skill Development Programs</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-6">
            Empowering individuals with industry-relevant skills in Human-Computer Interaction
          </p>
          <nav className="flex justify-center gap-2 text-white/80">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Skill Development Programs</span>
          </nav>
        </div>
      </div>

      {/* Training Partners */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white via-primary/5 to-white">
        <div className="container mx-auto px-2 sm:px-4 md:px-6">
          <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
            {/* PMKVY */}
            <div className="glass-strong rounded-2xl p-8 md:p-10 border-2 border-primary/10 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-start gap-6 mb-6">
                <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                  <i className="fas fa-certificate text-3xl text-primary"></i>
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-primary">Training Partner for PMKVY</h2>
                  <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                    <p>
                      IIT Mandi iHub and HCi Foundation, the Technology Innovation Hub focusing on Human-Computer Interaction (HCi), has been selected as a Skill Hub by National Skill Development Corporation (NSDC) to provide training on Future Skills under the Pradhan Mantri Kaushal Vikas Yojana (PMKVY) 4.0 program.
                    </p>
                    <p>
                      PMKVY is a flagship scheme of the Ministry of Skill Development and Entrepreneurship (MSDE) implemented by National Skill Development Corporation to enable Indian youth to take up industry-relevant skill training to help them to secure better livelihoods.
                    </p>
                  </div>
                  <a
                    href="https://ihubiitmandi.in/iit-mandi-ihub-and-hci-foundation-selected-as-training-partner-for-pradhan-mantri-kaushal-vikas-yojana-pmkvy-4-0/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-dark transition-colors mt-6 group/link"
                  >
                    Read More
                    <i className="fas fa-arrow-right group-hover/link:translate-x-1 transition-transform"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* HPKVN */}
            <div className="glass-strong rounded-2xl p-8 md:p-10 border-2 border-primary/10 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-start gap-6 mb-6">
                <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                  <i className="fas fa-university text-3xl text-primary"></i>
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-primary">Training Partner for HPKVN</h2>
                  <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                    <p>
                      At IIT Mandi iHub and HCi Foundation, we are proud to partner with Himachal Pradesh Kaushal Vikas Nigam (HPKVN) to provide a range of skill development courses aimed at enhancing the employability and capabilities of youth in Himachal Pradesh. Our mission is to empower individuals with the skills and knowledge required to excel in today's dynamic job market.
                    </p>
                  </div>
                  <a
                    href="https://www.ihubiitmandi.in/iit-mandi-ihub-and-hci-foundation-selected-as-training-partner-for-himachal-pradesh-kaushal-vikas-nigam-hpkvn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-dark transition-colors mt-6 group/link"
                  >
                    Read More
                    <i className="fas fa-arrow-right group-hover/link:translate-x-1 transition-transform"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Roles */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-2 sm:px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary">Job Roles</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore available training programs and apply for skill development courses
            </p>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {jobRoles.map((role, index) => (
              <a
                key={index}
                href={role.link}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-strong rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 border-2 border-primary/10 hover:border-primary/30 group"
              >
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <i className="fas fa-briefcase text-4xl text-primary"></i>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-primary mb-3">{role.title}</h3>
                <p className="text-gray-600 mb-4">Click to apply</p>
                <div className="inline-flex items-center gap-2 text-primary font-bold group-hover:text-primary-dark transition-colors">
                  Apply Now
                  <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Webinars & Workshops */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white via-primary/5 to-white">
        <div className="container mx-auto px-2 sm:px-4 md:px-6">
          <div className="glass-strong rounded-2xl p-8 md:p-10 lg:p-12 border-2 border-primary/10 shadow-xl text-center max-w-4xl mx-auto">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-video text-4xl text-primary"></i>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-primary">Webinars & Workshops</h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Stay tuned for upcoming webinars and workshops on various topics related to Human-Computer Interaction.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

