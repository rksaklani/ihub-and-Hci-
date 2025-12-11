import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Get in touch today! - iHub IIT Mandi',
  description: 'Contact iHub IIT Mandi. Find our address, phone number, email, and working hours.',
}

export default function ContactPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary via-primary-light to-primary-dark text-white py-16 md:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-2 sm:px-4 md:px-6 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">Get in touch today!</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-6">
            We'd love to hear from you. Reach out to us through any of the channels below.
          </p>
          <nav className="flex justify-center gap-2 text-white/80">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Contact</span>
          </nav>
        </div>
      </div>

      {/* Contact Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-primary/5 to-white">
        <div className="container mx-auto px-2 sm:px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">Contact Us</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Have a question or want to collaborate? We're here to help.
              </p>
            </div>

            <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              {/* Contact Details */}
              <div className="space-y-6">
                <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-primary">Contact Details</h3>
                
                {/* Address Card */}
                <div className="glass-strong rounded-2xl p-6 md:p-8 hover:shadow-2xl transition-all duration-300 border-2 border-primary/10 hover:border-primary/30 group">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <i className="fas fa-map-marker-alt text-2xl text-primary"></i>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg md:text-xl font-bold mb-3 text-primary">Find Us</h4>
                      <p className="text-base text-gray-700 leading-relaxed">
                        IIT Mandi iHub and HCI Foundation<br />
                        C/o Indian Institute of Technology Mandi,<br />
                        North Campus, VPO Kamand,<br />
                        Near Mind Tree School, District Mandi,<br />
                        Himachal Pradesh, India. Pin 175075
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="glass-strong rounded-2xl p-6 md:p-8 hover:shadow-2xl transition-all duration-300 border-2 border-primary/10 hover:border-primary/30 group">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <i className="fas fa-phone text-2xl text-primary"></i>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg md:text-xl font-bold mb-3 text-primary">Phone</h4>
                      <a 
                        href="tel:+919015458338" 
                        className="text-lg md:text-xl text-gray-700 hover:text-primary transition-colors font-medium inline-block"
                      >
                        +91 90154 58338
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email Card */}
                <div className="glass-strong rounded-2xl p-6 md:p-8 hover:shadow-2xl transition-all duration-300 border-2 border-primary/10 hover:border-primary/30 group">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <i className="fas fa-envelope text-2xl text-primary"></i>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg md:text-xl font-bold mb-3 text-primary">Write to Us</h4>
                      <a
                        href="mailto:tih@iitmandi.ac.in"
                        className="text-lg md:text-xl text-gray-700 hover:text-primary transition-colors font-medium break-all"
                      >
                        tih@iitmandi.ac.in
                      </a>
                    </div>
                  </div>
                </div>

                {/* Working Hours Card */}
                <div className="glass-strong rounded-2xl p-6 md:p-8 hover:shadow-2xl transition-all duration-300 border-2 border-primary/10 hover:border-primary/30 group">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <i className="fas fa-clock text-2xl text-primary"></i>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg md:text-xl font-bold mb-3 text-primary">Working Hours</h4>
                      <div className="space-y-1 text-base text-gray-700">
                        <p className="font-medium">Mon-Fri: <span className="font-normal">8 AM - 5 PM</span></p>
                        <p className="font-medium">Sat-Sun: <span className="font-normal">8 AM - 2 PM</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-primary">Have A Question?</h3>
                <div className="glass-strong rounded-2xl p-6 md:p-8 lg:p-10 border-2 border-primary/10 shadow-xl">
                  <form className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Name <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your full name"
                        className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-white/50"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email <span className="text-primary">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-white/50"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        placeholder="What is this regarding?"
                        className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-white/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                        Message <span className="text-primary">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        placeholder="Tell us more about your inquiry..."
                        className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none bg-white/50"
                        required
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-xl hover:from-primary-dark hover:to-primary transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      <i className="fas fa-paper-plane mr-2"></i>
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
