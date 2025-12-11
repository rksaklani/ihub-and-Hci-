import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Visits to iHub Office - iHub IIT Mandi',
  description: 'Record of visits to iHub IIT Mandi office by distinguished guests, researchers, and industry leaders.',
}

interface Visit {
  visitor: string
  organization: string
  location: string
  month?: string
}

const visits2023: { [key: string]: Visit[] } = {
  January: [
    {
      visitor: 'Mr. Vinay Kumar',
      organization: 'Datawise',
      location: 'Hyderabad, India',
    },
    {
      visitor: 'Dr. Rajesh Sannd',
      organization: 'Regional Ayurvedic Research Institute (RARI)',
      location: 'Mandi, India',
    },
  ],
  February: [
    {
      visitor: 'Mr. Arun Malhotra',
      organization: '',
      location: '',
    },
    {
      visitor: 'Mr. Vishal Anand and Ms. Namita',
      organization: 'Badrika Ashram',
      location: 'Sirmaur, India',
    },
    {
      visitor: 'Prof. Arvind Mahajan',
      organization: 'Texas A&M University',
      location: 'Texas, United States',
    },
    {
      visitor: 'Prof. Anjan Kumar Swain',
      organization: 'Indian Institute of Management',
      location: 'Kozhikode, Kerala, India',
    },
    {
      visitor: 'Mr. Venkatadri Ranganathan',
      organization: 'Tata Chemicals Limited',
      location: 'Mumbai, India',
    },
  ],
  April: [
    {
      visitor: 'Students',
      organization: 'Atal Bihari Vajpayee Government Institute of Engineering and Technology (ABVGIET)',
      location: 'Shimla, India',
    },
  ],
  November: [
    {
      visitor: 'Mr. Lawrence Lu',
      organization: 'Exofense (Founder)',
      location: 'Texas, USA',
      month: 'CEO of iHub and HCI Foundation at IIT Mandi, Mr. Somjit Amrit, takes pride in felicitating a visionary leader in GenAI',
    },
    {
      visitor: 'Mr. Sachin Rane',
      organization: 'Datamatics Global Services Limited',
      location: 'Mumbai (Maharashtra), India',
      month: 'Executive Vice President - Head of Software Solutions',
    },
  ],
}

const visits2022: Visit[] = [
  {
    visitor: 'Dr. Rajesh Kumar',
    organization: 'Bhabha Atomic Research Centre (BARC)',
    location: 'Mumbai, India',
  },
  {
    visitor: 'Dr. Akhilesh Gupta and Dr. Ekta Kapoor',
    organization: 'DST, Government of India',
    location: 'New Delhi, India',
  },
  {
    visitor: 'Dr. Kingshuk Banerjee',
    organization: 'R&D Centre, Hitachi',
    location: 'India',
  },
  {
    visitor: 'WooChan Chang',
    organization: 'Korea International Cooperation Agency (KOICA)',
    location: 'South Korea',
  },
  {
    visitor: 'Prof. Stuart Hameroff',
    organization: 'University of Arizona',
    location: 'United States',
  },
]

export default function VisitsToIhubOfficePage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary via-primary-light to-primary-dark text-white py-16 md:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-2 sm:px-4 md:px-6 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">Visits to iHub Office</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-6">
            Record of distinguished visits to our office
          </p>
          <nav className="flex justify-center gap-2 text-white/80">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link>
            <span>/</span>
            <span className="text-white">Visits to iHub Office</span>
          </nav>
        </div>
      </div>

      {/* Visits Content */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-primary/5 to-white">
        <div className="container mx-auto px-2 sm:px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            {/* 2023 Visits */}
            <div className="mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-primary text-center">
                Visits to iHub Office 2023
              </h2>

              <div className="space-y-12">
                {Object.entries(visits2023).map(([month, visits]) => (
                  <div key={month} className="glass-strong rounded-2xl p-6 md:p-8 lg:p-10 border-2 border-primary/10 shadow-xl">
                    <h3 className="text-2xl md:text-3xl font-bold mb-6 text-primary flex items-center gap-3">
                      <i className="fas fa-calendar-alt text-primary"></i>
                      {month}
                    </h3>
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
                      {visits.map((visit, index) => (
                        <div
                          key={index}
                          className="bg-white/50 rounded-xl p-6 border-2 border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                              <i className="fas fa-user-tie text-primary"></i>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-lg md:text-xl font-bold text-primary mb-2 group-hover:text-primary-dark transition-colors">
                                {visit.visitor}
                              </h4>
                              {visit.month && (
                                <p className="text-sm text-gray-600 mb-2 italic">{visit.month}</p>
                              )}
                              {visit.organization && (
                                <p className="text-base text-gray-700 mb-2">
                                  <i className="fas fa-building text-primary text-sm mr-2"></i>
                                  {visit.organization}
                                </p>
                              )}
                              {visit.location && (
                                <p className="text-sm text-gray-600 flex items-center gap-2">
                                  <i className="fas fa-map-marker-alt text-primary"></i>
                                  {visit.location}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2022 Visits */}
            <div className="mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-primary text-center">
                Visits to iHub Office 2022
              </h2>

              <div className="glass-strong rounded-2xl p-6 md:p-8 lg:p-10 border-2 border-primary/10 shadow-xl">
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visits2022.map((visit, index) => (
                    <div
                      key={index}
                      className="bg-white/50 rounded-xl p-6 border-2 border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                          <i className="fas fa-user-tie text-primary"></i>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg md:text-xl font-bold text-primary mb-2 group-hover:text-primary-dark transition-colors">
                            {visit.visitor}
                          </h4>
                          {visit.organization && (
                            <p className="text-base text-gray-700 mb-2">
                              <i className="fas fa-building text-primary text-sm mr-2"></i>
                              {visit.organization}
                            </p>
                          )}
                          {visit.location && (
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                              <i className="fas fa-map-marker-alt text-primary"></i>
                              {visit.location}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

