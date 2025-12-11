import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Donation - iHub IIT Mandi',
  description: 'Support iHub IIT Mandi through donations. All contributions are tax-exempt under section 80G.',
}

export default function DonationPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary via-primary-light to-primary-dark text-white py-16 md:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-2 sm:px-4 md:px-6 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">Donation</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-6">
            Support our mission to advance Human-Computer Interaction research and innovation
          </p>
          <nav className="flex justify-center gap-2 text-white/80">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Donation</span>
          </nav>
        </div>
      </div>

      {/* Donation Content */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-primary/5 to-white">
        <div className="container mx-auto px-2 sm:px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="glass-strong rounded-2xl p-8 md:p-10 lg:p-12 border-2 border-primary/10 shadow-xl mb-12">
              <div className="flex items-start gap-6 mb-6">
                <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                  <i className="fas fa-heart text-3xl text-primary"></i>
                </div>
                <div className="flex-1">
                  <p className="text-lg md:text-xl text-gray-700 mb-4 leading-relaxed">
                    IT Mandi iHub and HCI Foundation is taking initiatives to encourage research, foster industry adoption, and build scale in skill development related to the domain of Human-Computer Interaction (HCI) in India.
                  </p>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                    We appreciate your consideration of supporting the IIT Mandi iHub and HCI Foundation. You can contribute to the foundation by various modes described below. All contributions to the foundation are exempt from income tax under section 80G of the Income Tax Act, 1961 (India). A formal tax exemption receipt for all donations will be issued.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 md:mb-12 text-primary text-center">Donations can be made through</h3>

            {/* Payment Methods */}
            <div className="space-y-8 md:space-y-12">
              {/* Cheque/DD */}
              <div className="glass-strong rounded-2xl p-6 md:p-8 lg:p-10 border-2 border-primary/10 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-start gap-6 mb-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                    <i className="fas fa-file-invoice text-3xl text-primary"></i>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-primary">1. Payment through Cheques/ Demand Drafts</h4>
                    <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
                      We welcome contributions through Cheque/DD. Please send Cheque/DD along with a cover letter specifying the project/purpose, contact details, and PAN No. to the following addresses:
                    </p>
                    <div className="bg-primary/5 p-6 rounded-xl border-2 border-primary/10">
                      <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                        Write your cheques to <strong className="text-primary">"IIT Mandi iHub and HCI Foundation."</strong> Please send it to IIT Mandi iHub and HCI Foundation C/o Indian Institute of Technology Mandi, North Campus, VPO Kamand, Near Mind Tree School, District Mandi, Himachal Pradesh, India. Pin 175075
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bank Transfer */}
              <div className="glass-strong rounded-2xl p-6 md:p-8 lg:p-10 border-2 border-primary/10 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-start gap-6 mb-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                    <i className="fas fa-university text-3xl text-primary"></i>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl md:text-3xl font-bold mb-6 text-primary">2. Bank Transfer</h4>
                    <div className="glass rounded-xl overflow-hidden border-2 border-primary/10">
                      <table className="w-full border-collapse text-sm md:text-base">
                        <tbody className="text-gray-700">
                          <tr className="border-b-2 border-primary/10 bg-primary/5">
                            <td className="py-3 md:py-4 px-4 md:px-6 font-bold text-primary">Account Name</td>
                            <td className="py-3 md:py-4 px-4 md:px-6">IIT Mandi iHub and HCI Foundation</td>
                          </tr>
                          <tr className="border-b-2 border-primary/10">
                            <td className="py-3 md:py-4 px-4 md:px-6 font-bold text-primary">Account Number</td>
                            <td className="py-3 md:py-4 px-4 md:px-6">39786879702</td>
                          </tr>
                          <tr className="border-b-2 border-primary/10 bg-primary/5">
                            <td className="py-3 md:py-4 px-4 md:px-6 font-bold text-primary">Bank Name</td>
                            <td className="py-3 md:py-4 px-4 md:px-6">STATE BANK OF INDIA (SBI)</td>
                          </tr>
                          <tr className="border-b-2 border-primary/10">
                            <td className="py-3 md:py-4 px-4 md:px-6 font-bold text-primary">Branch Name</td>
                            <td className="py-3 md:py-4 px-4 md:px-6">SBI, IIT Kamand, Mandi (H.P)</td>
                          </tr>
                          <tr className="border-b-2 border-primary/10 bg-primary/5">
                            <td className="py-3 md:py-4 px-4 md:px-6 font-bold text-primary">Address</td>
                            <td className="py-3 md:py-4 px-4 md:px-6">
                              IIT Mandi iHub and HCI Foundation C/o Indian Institute of Technology Mandi, North Campus, VPO Kamand, Near Mind Tree School, District Mandi, Himachal Pradesh, India. Pin 175075
                            </td>
                          </tr>
                          <tr className="border-b-2 border-primary/10">
                            <td className="py-3 md:py-4 px-4 md:px-6 font-bold text-primary">Account Type</td>
                            <td className="py-3 md:py-4 px-4 md:px-6">Savings Bank Account</td>
                          </tr>
                          <tr className="border-b-2 border-primary/10 bg-primary/5">
                            <td className="py-3 md:py-4 px-4 md:px-6 font-bold text-primary">IFSC Code</td>
                            <td className="py-3 md:py-4 px-4 md:px-6 font-mono text-lg">SBIN0013711</td>
                          </tr>
                          <tr className="border-b-2 border-primary/10">
                            <td className="py-3 md:py-4 px-4 md:px-6 font-bold text-primary">MICR Code</td>
                            <td className="py-3 md:py-4 px-4 md:px-6 font-mono">175002103</td>
                          </tr>
                          <tr className="bg-primary/5">
                            <td className="py-3 md:py-4 px-4 md:px-6 font-bold text-primary">SWIFT Code</td>
                            <td className="py-3 md:py-4 px-4 md:px-6 font-mono">SBININBB288</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
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

