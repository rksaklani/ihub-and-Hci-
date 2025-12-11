import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Collaborations - iHub IIT Mandi',
  description: 'Explore collaborations and partnerships at iHub IIT Mandi.',
}

const collaborations = [
  {
    title: 'Collaboration With Naxon Labs',
    description: 'IIT Mandi iHub and HCi Foundation signed a Memorandum of Understanding (MoU) with Naxon Labs on 30th January 2023. Naxon […]',
    link: 'https://www.ihubiitmandi.in/mou-with-naxon-labs/',
  },
  {
    title: 'Collaboration With Furhat Robotics',
    description: 'IIT Mandi iHub and HCi Foundation signed a Memorandum of Understanding (MoU) with Furhat Robotics. Furhat Robotics is a conversational AI and social robotics company...',
    link: 'https://www.ihubiitmandi.in/furhat-robotics/',
  },
  {
    title: 'Collaboration With Catalyst',
    description: 'IIT Mandi Catalyst has launched incubation programs to develop startups working in Human-Computer Interaction (HCi). The program is supported by IIT Mandi iHub and HCi...',
    link: 'https://www.ihubiitmandi.in/catalyst/',
  },
  {
    title: 'Neuroleap',
    description: 'NeuroLeap ( www.NeuroLeap.science) and IIT Mandi iHub & HCi Foundation(iHub), India (www.ihubiitmandi.in) have signed a wide-ranging MoU to harness […]',
    link: 'https://www.ihubiitmandi.in/neuroleap/',
  },
  {
    title: 'Collaboration With Rubiscape',
    description: 'IIT Mandi iHub & HCi Foundation, India (www.ihubiitmandi.in) and Rubiscape Pvt Ltd – India\'s first unified Data Science product company, (www.rubiscape.io) have signed a wide-ranging...',
    link: 'https://www.ihubiitmandi.in/rubiscape/',
  },
  {
    title: 'Collaboration With ITRA',
    description: 'ITRA Co., Ltd. (ITRA), a subsidiary of Internet Business Japan Co., Ltd. (IBJ), Japan (https://www.ibj.co.jp) and IIT Mandi iHub & HCi Foundation, India (www.ihubiitmandi.in) have...',
    link: 'https://www.ihubiitmandi.in/itra/',
  },
]

export default function CollaborationsPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary via-primary-light to-primary-dark text-white py-16 md:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-2 sm:px-4 md:px-6 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">Collaborations</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-6">
            Building partnerships to advance Human-Computer Interaction research and innovation
          </p>
          <nav className="flex justify-center gap-2 text-white/80">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Collaborations</span>
          </nav>
        </div>
      </div>

      {/* Collaborations List */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-primary/5 to-white">
        <div className="container mx-auto px-2 sm:px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary">Our Collaborations</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Working together with leading organizations to drive innovation
            </p>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {collaborations.map((collab, index) => (
              <div
                key={index}
                className="glass-strong rounded-2xl p-6 md:p-8 hover:shadow-2xl transition-all duration-300 border-2 border-primary/10 hover:border-primary/30 group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <i className="fas fa-handshake text-2xl text-primary"></i>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-primary group-hover:text-primary-dark transition-colors">
                    <a
                      href={collab.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary-dark transition-colors"
                    >
                      {collab.title}
                    </a>
                  </h3>
                </div>
                <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed">{collab.description}</p>
                <a
                  href={collab.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-dark transition-colors group/link"
                >
                  Read More
                  <i className="fas fa-arrow-right group-hover/link:translate-x-1 transition-transform"></i>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

