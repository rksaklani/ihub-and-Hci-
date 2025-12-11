import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Tenders - iHub IIT Mandi',
  description: 'View all tenders and Expression of Interest (EOI) notices from iHub IIT Mandi.',
}

interface Tender {
  dated: string
  refNo: string
  details: string
  dateOfIssue: string
  startDate: string
  lastDate: string
  openingDate: string
  downloadLink?: string
  corrigendumLink?: string
  extensionNotice?: string
}

const tenders: Tender[] = [
  {
    dated: '16.10.2025',
    refNo: 'iHub//EOI/2025‐2026/05',
    details: 'Expression of Interest (EOI) for skill development training partnership.',
    dateOfIssue: 'Oct 16,2025',
    startDate: 'Oct 17,2025',
    lastDate: 'Nov 07,2025 up to 5:00pm',
    openingDate: 'Nov 10,2025 at 3:00pm',
    downloadLink: '#',
  },
  {
    dated: '01.04.2025',
    refNo: 'iHub/e-Tender/2025-26/001',
    details: 'Supply and Installation/Setup of Hybrid Video Conferencing and Live Streaming Solution for 12 rooms in Himachal Pradesh',
    dateOfIssue: '01.04.2025',
    startDate: '01/04/2025 11:00 AM',
    lastDate: '07/04/2025 02:30 PM',
    openingDate: '08/04/2025 11:00 AM',
    downloadLink: '#',
  },
  {
    dated: '21.01.2025',
    refNo: 'iHub//EOI/2025-2026/04',
    details: 'Expression of Interest (EOI) for skill development training partnership.',
    dateOfIssue: 'Jan 21,2025',
    startDate: 'Jan 22,2025',
    lastDate: 'Feb 06,2025 up to 5:00pm',
    openingDate: 'Feb 07,2025 at 3:00pm',
    downloadLink: '#',
  },
  {
    dated: '21.01.2025',
    refNo: 'iHub//EOI/2025-2026/03',
    details: 'Expression of Interest (EOI) for skill development training partnership.',
    dateOfIssue: 'Jan 21,2025',
    startDate: 'Jan 22,2025',
    lastDate: 'Feb 06,2025 up to 5:00pm',
    openingDate: 'Feb 07,2025 at 3:00pm',
    downloadLink: '#',
  },
  {
    dated: '31.12.2024',
    refNo: 'iHub//EOI/2024-2025/02',
    details: 'Expression of Interest (EOI) for onboarding Remote pilot training organizations (RPTOs) registered under Directorate general of civil aviation for providing Remote pilot certification (RPC) to skill development students enrolled in drone courses.',
    dateOfIssue: 'Dec 31, 2024',
    startDate: 'Jan 01, 2025',
    lastDate: 'Jan 15,2025 up to 5:00pm',
    openingDate: 'Jan 16,2025 at 5:00pm',
    downloadLink: '#',
  },
  {
    dated: '17.10.2024',
    refNo: 'iHub//EOI/2024-2025/01',
    details: 'Expression of Interest (EOI) for renting of building for hostel accommodation for students, staff and training activities.',
    dateOfIssue: '17 Oct 2024',
    startDate: '18 Oct 2024',
    lastDate: '25 Nov 2024 up to 3.00 PM',
    openingDate: '26 Nov 2024 at 3.00 PM',
    downloadLink: '#',
    extensionNotice: '#',
  },
  {
    dated: '10.10.2022',
    refNo: 'iHub/eTender/2022-23/001',
    details: 'Tender is invited for the Supply and Installation of 256 Channel EEG with Biofeedback System at IIT Mandi iHub and HCI Foundation as per the specifications given in the Tender Notice CPPP portal.',
    dateOfIssue: '10.10.2022',
    startDate: '10.10.2022',
    lastDate: '20.10.2022 (03.00 PM)',
    openingDate: '21.10.2022 (03.00 PM)',
    downloadLink: '#',
    corrigendumLink: '#',
  },
]

export default function TenderPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary via-primary-light to-primary-dark text-white py-16 md:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-2 sm:px-4 md:px-6 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">Tenders</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-6">
            View all tenders and Expression of Interest (EOI) notices
          </p>
          <nav className="flex justify-center gap-2 text-white/80">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Tenders</span>
          </nav>
        </div>
      </div>

      {/* Tenders List */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white via-primary/5 to-white">
        <div className="container mx-auto px-2 sm:px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            {tenders.length === 0 ? (
              <div className="text-center py-12 glass-strong rounded-2xl border-2 border-primary/10">
                <i className="fas fa-file-contract text-5xl text-gray-400 mb-4"></i>
                <p className="text-gray-600 text-lg">No tenders available at the moment</p>
              </div>
            ) : (
              <div className="glass-strong rounded-2xl p-6 md:p-8 lg:p-10 border-2 border-primary/10 shadow-xl">
                {/* First 3 Tenders - Displayed as Cards */}
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {tenders.slice(0, 3).map((tender, index) => (
                    <div
                      key={index}
                      className="bg-white/50 rounded-xl p-5 md:p-6 border-2 border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <i className="fas fa-file-contract text-primary"></i>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-600 font-medium truncate">Dated: {tender.dated}</p>
                          <p className="text-sm font-bold text-primary truncate">{tender.refNo}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-4 leading-relaxed line-clamp-3">{tender.details}</p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <i className="fas fa-calendar-alt text-primary text-xs"></i>
                          <span className="truncate">{tender.dateOfIssue}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <i className="fas fa-clock text-primary text-xs"></i>
                          <span className="truncate">Last: {tender.lastDate.split(' up to')[0]}</span>
                        </div>
                      </div>
                      {tender.downloadLink && (
                        <a
                          href={tender.downloadLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-4 py-2 rounded-lg hover:from-primary-dark hover:to-primary transition-all duration-300 font-semibold text-sm w-full justify-center"
                        >
                          <i className="fas fa-download"></i>
                          Download
                        </a>
                      )}
                    </div>
                  ))}
                </div>

                {/* Remaining Tenders - Vertical Scroll */}
                {tenders.length > 3 && (
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-4 text-primary">More Tenders</h3>
                    <div className="max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-100">
                      <div className="space-y-6">
                        {tenders.slice(3).map((tender, index) => (
                          <div
                            key={index + 3}
                            className="bg-white/50 rounded-xl p-5 md:p-6 border-2 border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <i className="fas fa-file-contract text-primary"></i>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-600 font-medium">Dated: {tender.dated}</p>
                                <p className="text-sm font-bold text-primary">{tender.refNo}</p>
                              </div>
                            </div>
                            <p className="text-sm text-gray-700 mb-4 leading-relaxed">{tender.details}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                              <div className="flex items-center gap-2 text-xs text-gray-600">
                                <i className="fas fa-calendar-alt text-primary text-xs"></i>
                                <span>Issue: {tender.dateOfIssue}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-gray-600">
                                <i className="fas fa-clock text-primary text-xs"></i>
                                <span>Last: {tender.lastDate.split(' up to')[0]}</span>
                              </div>
                            </div>
                            {tender.downloadLink && (
                              <a
                                href={tender.downloadLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-4 py-2 rounded-lg hover:from-primary-dark hover:to-primary transition-all duration-300 font-semibold text-sm"
                              >
                                <i className="fas fa-download"></i>
                                Download
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

