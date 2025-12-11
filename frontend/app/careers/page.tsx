import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Careers - iHub IIT Mandi',
  description: 'Explore career opportunities and job vacancies at iHub IIT Mandi. Join our team and be part of innovation in Human-Computer Interaction.',
}

// This would typically come from an API
const jobVacancies = [
  {
    id: '1',
    title: 'Applications are invited for the position of Lead- Grants Acquisition & Funding Management',
    department: 'Administration',
    location: 'IIT Mandi, Himachal Pradesh',
    type: 'Full-time',
    postedDate: '2024-01-15',
    deadline: '2024-02-15',
    description: 'We are seeking an experienced professional to lead our grants acquisition and funding management initiatives.',
    requirements: [
      'Master\'s degree in relevant field',
      'Minimum 5 years of experience in grants management',
      'Strong communication and negotiation skills',
      'Experience with government and private funding agencies',
    ],
    link: 'https://www.ihubiitmandi.in/applications-are-invited-for-the-position-of-lead-grants-acquisition-funding-management/',
  },
  {
    id: '2',
    title: 'Applications are invited for the position of Senior Associate/Assistant Manager-Purchase & Sourcing',
    department: 'Administration',
    location: 'IIT Mandi, Himachal Pradesh',
    type: 'Full-time',
    postedDate: '2024-01-15',
    deadline: '2024-02-15',
    description: 'Join our team to manage procurement and sourcing activities for the organization.',
    requirements: [
      'Bachelor\'s degree in relevant field',
      'Minimum 3 years of experience in procurement',
      'Knowledge of government procurement procedures',
      'Strong analytical and negotiation skills',
    ],
    link: 'https://www.ihubiitmandi.in/applications-are-invited-for-the-position-of-senior-associate-assistant-manager-purchase-sourcing/',
  },
  {
    id: '3',
    title: 'Applications are invited for the position of Computer Vision Engineer',
    department: 'Research & Development',
    location: 'IIT Mandi, Himachal Pradesh',
    type: 'Full-time',
    postedDate: '2024-01-10',
    deadline: '2024-02-10',
    description: 'We are looking for a skilled Computer Vision Engineer to join our research team.',
    requirements: [
      'Master\'s or PhD in Computer Science, Electrical Engineering, or related field',
      'Strong background in computer vision and machine learning',
      'Experience with deep learning frameworks',
      'Published research papers preferred',
    ],
    link: 'https://www.ihubiitmandi.in/applications-are-invited-for-the-position-of-computer-vision-engineer/',
  },
  {
    id: '4',
    title: 'Advertisement for Post-Doctoral Fellowship',
    department: 'Research',
    location: 'IIT Mandi, Himachal Pradesh',
    type: 'Fellowship',
    postedDate: '2024-01-05',
    deadline: '2024-03-05',
    description: 'Post-doctoral fellowship opportunities in Human-Computer Interaction research.',
    requirements: [
      'PhD in relevant field',
      'Strong research background',
      'Publications in reputed journals',
      'Research proposal aligned with iHub objectives',
    ],
    link: 'https://www.ihubiitmandi.in/advertisement-for-post-doctoral-fellowship/',
  },
]

export default function CareersPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary via-primary-light to-primary-dark text-white py-16 md:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-2 sm:px-4 md:px-6 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">Careers</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-6">
            Join our team and be part of innovation in Human-Computer Interaction
          </p>
          <nav className="flex justify-center gap-2 text-white/80">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Careers</span>
          </nav>
        </div>
      </div>

      {/* Introduction */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white via-primary/5 to-white">
        <div className="container mx-auto px-2 sm:px-4 md:px-6">
          <div className="max-w-6xl mx-auto text-center mb-12">
            <div className="glass-strong rounded-2xl p-8 md:p-10 border-2 border-primary/10 shadow-xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-primary">Join Our Team</h2>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                At iHub IIT Mandi, we're building the future of Human-Computer Interaction. We're looking for passionate,
                innovative individuals who want to make a difference. Explore our current openings and become part of our
                mission to advance technology for humanity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Job Vacancies */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-2 sm:px-4 md:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 md:mb-12 text-primary text-center">Current Openings</h2>
          
          {/* Wrapper Card */}
          <div className="glass-strong rounded-2xl p-6 md:p-8 lg:p-10 border-2 border-primary/10 shadow-xl max-w-7xl mx-auto">
            {/* First 3 Jobs - Displayed as Cards */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {jobVacancies.slice(0, 3).map((job) => (
                <div
                  key={job.id}
                  className="bg-white/50 rounded-xl p-5 md:p-6 border-2 border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
                >
                  <h3 className="text-lg md:text-xl font-bold text-primary mb-3 group-hover:text-primary-dark transition-colors line-clamp-2">{job.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="flex items-center gap-1.5 text-xs text-gray-700 bg-primary/5 px-2 py-1 rounded">
                      <i className="fas fa-building text-primary text-xs"></i>
                      <span className="font-medium">{job.department}</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-gray-700 bg-primary/5 px-2 py-1 rounded">
                      <i className="fas fa-briefcase text-primary text-xs"></i>
                      <span className="font-medium">{job.type}</span>
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-4 leading-relaxed line-clamp-3">{job.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <i className="fas fa-calendar-alt text-primary"></i>
                      {new Date(job.postedDate).toLocaleDateString()}
                    </span>
                  </div>
                  <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-4 py-2 rounded-lg hover:from-primary-dark hover:to-primary transition-all duration-300 font-semibold text-sm w-full justify-center"
                  >
                    <i className="fas fa-paper-plane"></i>
                    Apply Now
                  </a>
                </div>
              ))}
            </div>

            {/* Remaining Jobs - Horizontal Scroll */}
            {jobVacancies.length > 3 && (
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-primary">More Openings</h3>
                <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-100">
                  <div className="flex gap-6 min-w-max">
                    {jobVacancies.slice(3).map((job) => (
                      <div
                        key={job.id}
                        className="bg-white/50 rounded-xl p-5 md:p-6 border-2 border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group min-w-[320px] max-w-[320px]"
                      >
                        <h3 className="text-lg md:text-xl font-bold text-primary mb-3 group-hover:text-primary-dark transition-colors line-clamp-2">{job.title}</h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="flex items-center gap-1.5 text-xs text-gray-700 bg-primary/5 px-2 py-1 rounded">
                            <i className="fas fa-building text-primary text-xs"></i>
                            <span className="font-medium">{job.department}</span>
                          </span>
                          <span className="flex items-center gap-1.5 text-xs text-gray-700 bg-primary/5 px-2 py-1 rounded">
                            <i className="fas fa-briefcase text-primary text-xs"></i>
                            <span className="font-medium">{job.type}</span>
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-4 leading-relaxed line-clamp-3">{job.description}</p>
                        <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-4">
                          <span className="flex items-center gap-1">
                            <i className="fas fa-calendar-alt text-primary"></i>
                            {new Date(job.postedDate).toLocaleDateString()}
                          </span>
                        </div>
                        <a
                          href={job.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-4 py-2 rounded-lg hover:from-primary-dark hover:to-primary transition-all duration-300 font-semibold text-sm w-full justify-center"
                        >
                          <i className="fas fa-paper-plane"></i>
                          Apply Now
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white via-primary/5 to-white">
        <div className="container mx-auto px-2 sm:px-4 md:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 md:mb-16 text-center text-primary">Why Join iHub?</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            <div className="glass-strong rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 border-2 border-primary/10 hover:border-primary/30 group">
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <i className="fas fa-lightbulb text-4xl text-primary"></i>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-primary">Innovation</h3>
              <p className="text-gray-700 leading-relaxed">
                Work on cutting-edge research and technology projects that shape the future of Human-Computer Interaction.
              </p>
            </div>
            <div className="glass-strong rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 border-2 border-primary/10 hover:border-primary/30 group">
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <i className="fas fa-users text-4xl text-primary"></i>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-primary">Collaboration</h3>
              <p className="text-gray-700 leading-relaxed">
                Join a diverse team of researchers, engineers, and innovators working together to solve real-world challenges.
              </p>
            </div>
            <div className="glass-strong rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 border-2 border-primary/10 hover:border-primary/30 group">
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <i className="fas fa-graduation-cap text-4xl text-primary"></i>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-primary">Growth</h3>
              <p className="text-gray-700 leading-relaxed">
                Continuous learning opportunities, professional development, and career advancement in a supportive environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-24 bg-gradient-to-r from-primary via-primary-light to-primary-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-2 sm:px-4 md:px-6 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Don't See a Position That Fits?</h2>
          <p className="text-lg md:text-xl mb-10 text-white/90 max-w-3xl mx-auto">
            We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <a
            href="mailto:tih@ihubiitmandi.in?subject=General Application"
            className="inline-block bg-white text-primary px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            <i className="fas fa-envelope mr-2"></i>
            Send Your Resume
          </a>
        </div>
      </section>
    </div>
  )
}

