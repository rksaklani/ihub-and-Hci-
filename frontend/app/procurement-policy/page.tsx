import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Procurement Policy - iHub IIT Mandi',
  description: 'View the procurement policy document of iHub IIT Mandi.',
}

export default function ProcurementPolicyPage() {
  const procurementPolicyUrl =
    'https://www.ihubiitmandi.in/wp-content/uploads/2023/12/Procurement-Policy.pdf'

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary via-primary-light to-primary-dark text-white py-16 md:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-2 sm:px-4 md:px-6 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
            Procurement Policy
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-6">
            View our procurement policy and guidelines
          </p>
          <nav className="flex justify-center gap-2 text-white/80">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Procurement Policy</span>
          </nav>
        </div>
      </div>

      {/* Procurement Policy Content */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white via-primary/5 to-white">
        <div className="container mx-auto px-2 sm:px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 lg:p-10 border-2 border-primary/10 shadow-xl">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-file-contract text-primary text-3xl"></i>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                  Procurement Policy Document
                </h2>
                <p className="text-gray-600 mb-6">
                  Download the complete procurement policy document to understand our procurement guidelines,
                  procedures, and standards.
                </p>
              </div>

              <div className="bg-white/50 rounded-xl p-6 md:p-8 border-2 border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                      <i className="fas fa-file-pdf text-primary text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-primary mb-1">Procurement Policy</h3>
                      <p className="text-sm text-gray-600">PDF Document</p>
                    </div>
                  </div>
                  <a
                    href={procurementPolicyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-3 rounded-lg hover:from-primary-dark hover:to-primary transition-all duration-300 font-semibold text-sm whitespace-nowrap"
                  >
                    <i className="fas fa-download"></i>
                    Download PDF
                  </a>
                </div>
              </div>

              <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/10">
                <div className="flex items-start gap-3">
                  <i className="fas fa-info-circle text-primary mt-1"></i>
                  <div className="text-sm text-gray-700">
                    <p className="font-semibold mb-1">Note:</p>
                    <p>
                      This document contains the official procurement policy of iHub IIT Mandi. For any queries
                      regarding procurement procedures, please contact us through our{' '}
                      <Link href="/contact" className="text-primary hover:underline font-semibold">
                        contact page
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

