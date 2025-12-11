import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative mt-20 overflow-hidden bg-[#0c4b8b] text-white">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10 px-2 mx-auto sm:px-4 md:px-6 py-6 md:py-8">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 mb-6">
          {/* Address Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <i className="fas fa-map-marker-alt text-lg text-white"></i>
              </div>
              <h3 className="text-lg font-bold">Address</h3>
            </div>
            <div className="space-y-2 text-white/90">
              <div className="flex items-start gap-2">
                <i className="fas fa-map-marker-alt mt-1 text-white/70 flex-shrink-0 text-sm"></i>
                <span className="leading-relaxed text-sm">
                  IIT Mandi iHub and HCi Foundation c/o Indian Institute of Technology Mandi, North Campus, VPO Kamand, Near Mind Tree School, District Mandi, Himachal Pradesh, India. Pin 175075
                </span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-phone text-white/70 text-sm"></i>
                <a href="tel:+919015458338" className="hover:text-white transition-colors font-medium text-sm">
                  +91 - 90154 58338
                </a>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-envelope text-white/70 text-sm"></i>
                <a href="mailto:tih@ihubiitmandi.in" className="hover:text-white transition-colors font-medium text-sm">
                  tih@ihubiitmandi.in
                </a>
              </div>
            </div>
          </div>

          {/* Our Company */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <i className="fas fa-building text-lg text-white"></i>
              </div>
              <h3 className="text-lg font-bold">Our Company</h3>
            </div>
            <div className="space-y-2">
              <div>
                <Link href="/about" className="text-white/90 hover:text-white transition-colors inline-flex items-center gap-1.5 group text-sm">
                  <i className="fas fa-chevron-right text-xs group-hover:translate-x-1 transition-transform"></i>
                  About Us
                </Link>
              </div>
              <div>
                <Link href="/faculty" className="text-white/90 hover:text-white transition-colors inline-flex items-center gap-1.5 group text-sm">
                  <i className="fas fa-chevron-right text-xs group-hover:translate-x-1 transition-transform"></i>
                  Team
                </Link>
              </div>
              <div>
                <Link href="/infrastructure" className="text-white/90 hover:text-white transition-colors inline-flex items-center gap-1.5 group text-sm">
                  <i className="fas fa-chevron-right text-xs group-hover:translate-x-1 transition-transform"></i>
                  Infrastructure
                </Link>
              </div>
              <div>
                <Link href="/contact" className="text-white/90 hover:text-white transition-colors inline-flex items-center gap-1.5 group text-sm">
                  <i className="fas fa-chevron-right text-xs group-hover:translate-x-1 transition-transform"></i>
                  Contact Us
                </Link>
              </div>
              <div>
                <Link
                  href="/donation"
                  className="text-white/90 hover:text-white transition-colors inline-flex items-center gap-1.5 group text-sm"
                >
                  <i className="fas fa-chevron-right text-xs group-hover:translate-x-1 transition-transform"></i>
                  Donation
                </Link>
              </div>
            </div>
          </div>

          {/* Activities */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <i className="fas fa-tasks text-lg text-white"></i>
              </div>
              <h3 className="text-lg font-bold">Activities</h3>
            </div>
            <div className="space-y-2">
              <div>
                <Link
                  href="/careers"
                  className="text-white/90 hover:text-white transition-colors inline-flex items-center gap-1.5 group text-sm"
                >
                  <i className="fas fa-chevron-right text-xs group-hover:translate-x-1 transition-transform"></i>
                  Careers
                </Link>
              </div>
              <div>
                <Link
                  href="/press"
                  className="text-white/90 hover:text-white transition-colors inline-flex items-center gap-1.5 group text-sm"
                >
                  <i className="fas fa-chevron-right text-xs group-hover:translate-x-1 transition-transform"></i>
                  Press
                </Link>
              </div>
              <div>
                <Link
                  href="/call-for-proposals"
                  className="text-white/90 hover:text-white transition-colors inline-flex items-center gap-1.5 group text-sm"
                >
                  <i className="fas fa-chevron-right text-xs group-hover:translate-x-1 transition-transform"></i>
                  Call for Proposals
                </Link>
              </div>
              <div>
                <a
                  href="https://innovometer.ihubiitmandi.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/90 hover:text-white transition-colors inline-flex items-center gap-1.5 group text-sm"
                >
                  <i className="fas fa-chevron-right text-xs group-hover:translate-x-1 transition-transform"></i>
                  Readiness Calculator
                </a>
              </div>
              <div>
                <Link
                  href="/call-for-innovation"
                  className="text-white/90 hover:text-white transition-colors inline-flex items-center gap-1.5 group text-sm"
                >
                  <i className="fas fa-chevron-right text-xs group-hover:translate-x-1 transition-transform"></i>
                  Call for Innovation
                </Link>
              </div>
              <div>
                <Link
                  href="/newsletter"
                  className="text-white/90 hover:text-white transition-colors inline-flex items-center gap-1.5 group text-sm"
                >
                  <i className="fas fa-chevron-right text-xs group-hover:translate-x-1 transition-transform"></i>
                  Newsletter
                </Link>
              </div>
            </div>
          </div>

          {/* Gallery */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <i className="fas fa-images text-lg text-white"></i>
              </div>
              <h3 className="text-lg font-bold">Gallery</h3>
            </div>
            <div className="space-y-2">
              <div>
                <Link
                  href="/visits-to-ihub-office"
                  className="text-white/90 hover:text-white transition-colors inline-flex items-center gap-1.5 group text-sm"
                >
                  <i className="fas fa-chevron-right text-xs group-hover:translate-x-1 transition-transform"></i>
                  Visits to iHub Office
                </Link>
              </div>
              <div>
                <Link
                  href="/workshops"
                  className="text-white/90 hover:text-white transition-colors inline-flex items-center gap-1.5 group text-sm"
                >
                  <i className="fas fa-chevron-right text-xs group-hover:translate-x-1 transition-transform"></i>
                  Workshops
                </Link>
              </div>
            </div>
          </div>

          {/* Updates */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <i className="fas fa-bell text-lg text-white"></i>
              </div>
              <h3 className="text-lg font-bold">Updates</h3>
            </div>
            <div className="space-y-2">
              <div>
                <Link
                  href="/news"
                  className="text-white/90 hover:text-white transition-colors inline-flex items-center gap-1.5 group text-sm"
                >
                  <i className="fas fa-chevron-right text-xs group-hover:translate-x-1 transition-transform"></i>
                  News
                </Link>
              </div>
              <div>
                <Link
                  href="/startups"
                  className="text-white/90 hover:text-white transition-colors inline-flex items-center gap-1.5 group text-sm"
                >
                  <i className="fas fa-chevron-right text-xs group-hover:translate-x-1 transition-transform"></i>
                  Startups
                </Link>
              </div>
              <div>
                <Link
                  href="/tender"
                  className="text-white/90 hover:text-white transition-colors inline-flex items-center gap-1.5 group text-sm"
                >
                  <i className="fas fa-chevron-right text-xs group-hover:translate-x-1 transition-transform"></i>
                  Tenders
                </Link>
              </div>
              <div>
                <Link
                  href="/procurement-policy"
                  className="text-white/90 hover:text-white transition-colors inline-flex items-center gap-1.5 group text-sm"
                >
                  <i className="fas fa-chevron-right text-xs group-hover:translate-x-1 transition-transform"></i>
                  Procurement Policy
                </Link>
              </div>
              <div>
                <Link
                  href="/audit-reports"
                  className="text-white/90 hover:text-white transition-colors inline-flex items-center gap-1.5 group text-sm"
                >
                  <i className="fas fa-chevron-right text-xs group-hover:translate-x-1 transition-transform"></i>
                  Audit Reports
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center gap-4 mb-4 pb-4 border-b border-white/20">
          <a
            href="https://www.linkedin.com/company/ihubiitmandi"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-white hover:text-white transition-all duration-300 transform hover:scale-110"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin-in text-lg"></i>
          </a>
          <a
            href="https://www.facebook.com/iitmandiihub"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-white hover:text-white transition-all duration-300 transform hover:scale-110"
            aria-label="Facebook"
          >
            <i className="fab fa-facebook-f text-lg"></i>
          </a>
          <a
            href="https://twitter.com/IITMandiiHub"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-white hover:text-white transition-all duration-300 transform hover:scale-110"
            aria-label="Twitter"
          >
            <i className="fab fa-twitter text-lg"></i>
          </a>
          <a
            href="https://www.instagram.com/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-white hover:text-white transition-all duration-300 transform hover:scale-110"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram text-lg"></i>
          </a>
          <a
            href="https://www.youtube.com/@IITMandiiHubandHCIFoundation/featured"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-white hover:text-white transition-all duration-300 transform hover:scale-110"
            aria-label="YouTube"
          >
            <i className="fab fa-youtube text-lg"></i>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-white/90 text-sm">
            Copyright {currentYear} © IIT Mandi IHub and HCI foundation
          </p>
        </div>
      </div>
    </footer>
  )
}
