import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Audit Reports - iHub IIT Mandi',
  description: 'View all audit reports and financial statements from iHub IIT Mandi.',
}

interface AuditReport {
  year: string
  pdfUrl: string
}

const auditReports: AuditReport[] = [
  {
    year: '2023-24',
    pdfUrl: 'https://www.ihubiitmandi.in/wp-content/uploads/2025/03/Audited-Final-Accounts-23-24.pdf',
  },
  {
    year: '2022-23',
    pdfUrl: 'https://www.ihubiitmandi.in/wp-content/uploads/2023/11/Audited-Final-Accounts-22-23.pdf',
  },
  {
    year: '2021-22',
    pdfUrl: 'https://www.ihubiitmandi.in/wp-content/uploads/2023/11/Audited-Final-Accounts-21-22.pdf',
  },
  {
    year: '2020-21',
    pdfUrl: 'https://www.ihubiitmandi.in/wp-content/uploads/2023/11/Audited-Final-Accounts-20-21.pdf',
  },
]

export default function AuditReportsPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary via-primary-light to-primary-dark text-white py-16 md:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-2 sm:px-4 md:px-6 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">Audit Reports</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-6">
            View all audit reports and financial statements
          </p>
          <nav className="flex justify-center gap-2 text-white/80">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Audit Reports</span>
          </nav>
        </div>
      </div>

      {/* Audit Reports List */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white via-primary/5 to-white">
        <div className="container mx-auto px-2 sm:px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            {auditReports.length === 0 ? (
              <div className="text-center py-12 glass-strong rounded-2xl border-2 border-primary/10">
                <i className="fas fa-file-invoice text-5xl text-gray-400 mb-4"></i>
                <p className="text-gray-600 text-lg">No audit reports available at the moment</p>
              </div>
            ) : (
              <div className="glass-strong rounded-2xl p-6 md:p-8 lg:p-10 border-2 border-primary/10 shadow-xl">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
                  Financial Year Audit Reports
                </h2>
                <div className="space-y-4">
                  {auditReports.map((report, index) => (
                    <div
                      key={index}
                      className="bg-white/50 rounded-xl p-5 md:p-6 border-2 border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <i className="fas fa-file-pdf text-primary text-xl"></i>
                          </div>
                          <div>
                            <h3 className="text-lg md:text-xl font-bold text-primary mb-1">
                              Financial Year {report.year}
                            </h3>
                            <p className="text-sm text-gray-600">Audited Final Accounts</p>
                          </div>
                        </div>
                        <a
                          href={report.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-5 py-3 rounded-lg hover:from-primary-dark hover:to-primary transition-all duration-300 font-semibold text-sm whitespace-nowrap"
                        >
                          <i className="fas fa-download"></i>
                          Download PDF
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

