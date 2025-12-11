import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Newsletter - iHub IIT Mandi',
  description: 'Subscribe to iHub IIT Mandi newsletter and access past editions.',
}

const newsletters = [
  {
    title: 'Convergence Jan-Apr 2023',
    pdf: 'https://ihubiitmandi.in/wp-content/uploads/2023/05/Convergence-E-2.pdf',
    image: 'https://ihubiitmandi.in/wp-content/uploads/2023/05/Convergence-E-2.pdf',
  },
  {
    title: 'Convergence May-July 2023',
    pdf: 'https://www.ihubiitmandi.in/wp-content/uploads/2023/09/iHub_Newsletter_03.pdf',
    link: 'https://www.ihubiitmandi.in/newsletter-may-july-2023/',
  },
  {
    title: 'Convergence Sept-Dec 2022',
    pdf: 'https://ihubiitmandi.in/wp-content/uploads/2023/05/IIT-Mandi-iHub-Newsletter-1.pdf',
    image: 'https://ihubiitmandi.in/wp-content/uploads/2023/01/IIT-Mandi-iHub-Newsletter.pdf',
  },
  {
    title: 'Convergence Jan-Apr 2024',
    pdf: 'https://www.ihubiitmandi.in/wp-content/uploads/2024/06/IIT_Mandi_iHub_and_HCI_Foundation_Newsletter_4th_Edition_April_2024.pdf',
    image: 'https://ihubiitmandi.in/wp-content/uploads/2023/05/Convergence-E-2.pdf',
  },
]

export default function NewsletterPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary via-primary-light to-primary-dark text-white py-16 md:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-2 sm:px-4 md:px-6 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">NEWSLETTER</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-6">
            Stay updated with our quarterly newsletter - Convergence
          </p>
          <nav className="flex justify-center gap-2 text-white/80">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Newsletter</span>
          </nav>
        </div>
      </div>

      {/* Newsletter List */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-primary/5 to-white">
        <div className="container mx-auto px-2 sm:px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary">Past Editions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Download and read our previous newsletter editions
            </p>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {newsletters.map((newsletter, index) => (
              <div
                key={index}
                className="glass-strong rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-primary/10 hover:border-primary/30 group"
              >
                {newsletter.image && (
                  <div className="relative h-48 sm:h-56 md:h-64 bg-primary/5 flex items-center justify-center">
                    <div className="w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <i className="fas fa-file-pdf text-5xl text-primary"></i>
                    </div>
                  </div>
                )}
                <div className="p-6 md:p-8 text-center">
                  <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-primary">{newsletter.title}</h3>
                  <div className="flex flex-col gap-3">
                    {newsletter.pdf && (
                      <a
                        href={newsletter.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-3 rounded-xl hover:from-primary-dark hover:to-primary transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        <i className="fas fa-file-pdf"></i>
                        Download PDF
                      </a>
                    )}
                    {newsletter.link && (
                      <a
                        href={newsletter.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-6 py-3 rounded-xl hover:bg-primary hover:text-white transition-all duration-300 font-bold"
                      >
                        Read Online
                        <i className="fas fa-external-link-alt"></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

