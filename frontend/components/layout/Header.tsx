'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  return (
    <>
      {/* Top Social Bar */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-2.5 hidden lg:block border-b border-white/5">
        <div className="container px-2 mx-auto sm:px-4 md:px-6">
          <div className="flex items-center justify-end gap-5">
            <a
              href="https://www.linkedin.com/company/ihubiitmandi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 transition-all duration-300 rounded-full bg-white/5 hover:bg-primary hover:scale-110 group"
              aria-label="LinkedIn"
            >
              <i className="text-sm transition-colors fab fa-linkedin-in group-hover:text-white"></i>
            </a>
            <a
              href="https://www.facebook.com/iitmandiihub"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 transition-all duration-300 rounded-full bg-white/5 hover:bg-primary hover:scale-110 group"
              aria-label="Facebook"
            >
              <i className="text-sm transition-colors fab fa-facebook-f group-hover:text-white"></i>
            </a>
            <a
              href="https://twitter.com/IITMandiiHub"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 transition-all duration-300 rounded-full bg-white/5 hover:bg-primary hover:scale-110 group"
              aria-label="Twitter"
            >
              <i className="text-sm transition-colors fab fa-twitter group-hover:text-white"></i>
            </a>
            <a
              href="https://www.instagram.com/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 transition-all duration-300 rounded-full bg-white/5 hover:bg-primary hover:scale-110 group"
              aria-label="Instagram"
            >
              <i className="text-sm transition-colors fab fa-instagram group-hover:text-white"></i>
            </a>
            <a
              href="https://www.youtube.com/@IITMandiiHubandHCIFoundation/featured"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 transition-all duration-300 rounded-full bg-white/5 hover:bg-primary hover:scale-110 group"
              aria-label="YouTube"
            >
              <i className="text-sm transition-colors fab fa-youtube group-hover:text-white"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-500 mx-4 rounded-l-2xl rounded-r-2xl ${
          isScrolled
            ? 'shadow-2xl'
            : 'shadow-lg'
        }`}
        style={{
          background: isScrolled
            ? 'rgba(255, 255, 255, 0.85)'
            : 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(24px) saturate(200%)',
          WebkitBackdropFilter: 'blur(24px) saturate(200%)',
          border: `1px solid ${isScrolled ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.3)'}`,
          borderBottom: `1px solid ${isScrolled ? 'rgba(13, 86, 158, 0.15)' : 'rgba(255, 255, 255, 0.3)'}`,
          boxShadow: isScrolled
            ? '0 8px 32px 0 rgba(13, 86, 158, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 0 rgba(255, 255, 255, 0.2)'
            : '0 4px 24px 0 rgba(13, 86, 158, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 0 rgba(255, 255, 255, 0.2)',
        }}
      >
        <div className="container px-2 mx-auto sm:px-4 md:px-6">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo Section */}
            <Link
              href="/"
              className="flex items-center transition-transform duration-300 group hover:scale-105"
            >
              <div className="relative">
                <div className="absolute inset-0 transition-opacity duration-300 rounded-lg opacity-0 bg-primary/5 blur-xl group-hover:opacity-100"></div>
                <Image
                  src="/assets/img/iHub-logo.png"
                  alt="iHub and HCi Foundation"
                  width={150}
                  height={60}
                  className="relative z-10 object-contain w-auto transition-all duration-300 h-14 md:h-16"
                />
              </div>
            </Link>

            {/* Desktop Navigation - Grouped with exact iHub menu items */}
            <nav className="items-center hidden gap-1 lg:flex">
              <Link
                href="/"
                className="px-4 py-2.5 text-gray-700 hover:text-primary transition-all duration-300 font-semibold text-sm rounded-lg hover:bg-primary/5 relative group"
              >
                <span className="relative z-10">Home</span>
                <span className="absolute inset-0 transition-transform duration-300 origin-center scale-0 rounded-lg bg-primary/10 group-hover:scale-100"></span>
              </Link>

              {/* About Dropdown - Groups About Us, Team */}
              <div className="relative group">
                <button className="px-4 py-2.5 text-gray-700 hover:text-primary transition-all duration-300 font-semibold text-sm flex items-center gap-1.5 rounded-lg hover:bg-primary/5 relative">
                  <span>About</span>
                  <svg
                    className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className="absolute left-0 z-50 invisible mt-2 overflow-hidden transition-all duration-300 opacity-0 top-full w-52 rounded-xl group-hover:opacity-100 group-hover:visible"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.85) 100%)',
                    backdropFilter: 'blur(30px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(30px) saturate(200%)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    boxShadow: '0 8px 32px 0 rgba(13, 86, 158, 0.15), 0 4px 16px 0 rgba(0, 0, 0, 0.05), inset 0 1px 0 0 rgba(255, 255, 255, 0.9), inset 0 -1px 0 0 rgba(255, 255, 255, 0.3)',
                  }}
                >
                  <div className="p-1">
                    <Link
                      href="/about"
                      className="block px-4 py-2.5 text-gray-700 hover:bg-gradient-to-r hover:from-primary hover:to-primary-dark hover:text-white rounded-lg text-sm font-medium transition-all duration-300 group/item"
                    >
                      <i className="mr-2 transition-colors fas fa-info-circle text-primary group-hover/item:text-white"></i>
                      About Us
                    </Link>
                    <Link
                      href="/faculty"
                      className="block px-4 py-2.5 text-gray-700 hover:bg-gradient-to-r hover:from-primary hover:to-primary-dark hover:text-white rounded-lg text-sm font-medium transition-all duration-300 group/item"
                    >
                      <i className="mr-2 transition-colors fas fa-users text-primary group-hover/item:text-white"></i>
                      Team
                    </Link>
                  </div>
                </div>
              </div>

              {/* Programs Dropdown - Groups Skill Development, Incubation, Collaborations, Research & Development */}
              <div className="relative group">
                <button className="px-4 py-2.5 text-gray-700 hover:text-primary transition-all duration-300 font-semibold text-sm flex items-center gap-1.5 rounded-lg hover:bg-primary/5 relative">
                  <span>Programs</span>
                  <svg
                    className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className="absolute left-0 z-50 invisible w-64 mt-2 overflow-hidden transition-all duration-300 opacity-0 top-full rounded-xl group-hover:opacity-100 group-hover:visible"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.85) 100%)',
                    backdropFilter: 'blur(30px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(30px) saturate(200%)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    boxShadow: '0 8px 32px 0 rgba(13, 86, 158, 0.15), 0 4px 16px 0 rgba(0, 0, 0, 0.05), inset 0 1px 0 0 rgba(255, 255, 255, 0.9), inset 0 -1px 0 0 rgba(255, 255, 255, 0.3)',
                  }}
                >
                  <div className="p-1">
                    <Link
                      href="/skill-development"
                      className="block px-4 py-2.5 text-gray-700 hover:bg-gradient-to-r hover:from-primary hover:to-primary-dark hover:text-white rounded-lg text-sm font-medium transition-all duration-300 group/item"
                    >
                      <i className="mr-2 transition-colors fas fa-graduation-cap text-primary group-hover/item:text-white"></i>
                      Skill Development
                    </Link>
                    <Link
                      href="/startups"
                      className="block px-4 py-2.5 text-gray-700 hover:bg-gradient-to-r hover:from-primary hover:to-primary-dark hover:text-white rounded-lg text-sm font-medium transition-all duration-300 group/item"
                    >
                      <i className="mr-2 transition-colors fas fa-rocket text-primary group-hover/item:text-white"></i>
                      Incubation
                    </Link>
                    <Link
                      href="/collaborations"
                      className="block px-4 py-2.5 text-gray-700 hover:bg-gradient-to-r hover:from-primary hover:to-primary-dark hover:text-white rounded-lg text-sm font-medium transition-all duration-300 group/item"
                    >
                      <i className="mr-2 transition-colors fas fa-handshake text-primary group-hover/item:text-white"></i>
                      Collaborations
                    </Link>
                    <Link
                      href="/research"
                      className="block px-4 py-2.5 text-gray-700 hover:bg-gradient-to-r hover:from-primary hover:to-primary-dark hover:text-white rounded-lg text-sm font-medium transition-all duration-300 group/item whitespace-nowrap"
                    >
                      <i className="mr-2 transition-colors fas fa-flask text-primary group-hover/item:text-white"></i>
                      Research & Development
                    </Link>
                  </div>
                </div>
              </div>

              {/* Resources Dropdown - Groups News & Media */}
              <div className="relative group">
                <button className="px-4 py-2.5 text-gray-700 hover:text-primary transition-all duration-300 font-semibold text-sm flex items-center gap-1.5 rounded-lg hover:bg-primary/5 relative">
                  <span>Resources</span>
                  <svg
                    className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className="absolute left-0 z-50 invisible w-56 mt-2 overflow-hidden transition-all duration-300 opacity-0 top-full rounded-xl group-hover:opacity-100 group-hover:visible"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.85) 100%)',
                    backdropFilter: 'blur(30px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(30px) saturate(200%)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    boxShadow: '0 8px 32px 0 rgba(13, 86, 158, 0.15), 0 4px 16px 0 rgba(0, 0, 0, 0.05), inset 0 1px 0 0 rgba(255, 255, 255, 0.9), inset 0 -1px 0 0 rgba(255, 255, 255, 0.3)',
                  }}
                >
                  <div className="p-1">
                    <div className="px-4 py-2 mb-1 text-xs font-bold uppercase border-b text-primary border-primary/20">
                      News & Media
                    </div>
                    <Link
                      href="/newsletter"
                      className="block px-4 py-2.5 text-gray-700 hover:bg-gradient-to-r hover:from-primary hover:to-primary-dark hover:text-white rounded-lg text-sm font-medium transition-all duration-300 group/item"
                    >
                      <i className="mr-2 transition-colors fas fa-newspaper text-primary group-hover/item:text-white"></i>
                      Newsletter
                    </Link>
                    <Link
                      href="/press"
                      className="block px-4 py-2.5 text-gray-700 hover:bg-gradient-to-r hover:from-primary hover:to-primary-dark hover:text-white rounded-lg text-sm font-medium transition-all duration-300 group/item"
                    >
                      <i className="mr-2 transition-colors fas fa-microphone text-primary group-hover/item:text-white"></i>
                      Press
                    </Link>
                    <Link
                      href="/brochure"
                      className="block px-4 py-2.5 text-gray-700 hover:bg-gradient-to-r hover:from-primary hover:to-primary-dark hover:text-white rounded-lg text-sm font-medium transition-all duration-300 group/item"
                    >
                      <i className="mr-2 transition-colors fas fa-book text-primary group-hover/item:text-white"></i>
                      Brochure
                    </Link>
                    <Link
                      href="/gallery"
                      className="block px-4 py-2.5 text-gray-700 hover:bg-gradient-to-r hover:from-primary hover:to-primary-dark hover:text-white rounded-lg text-sm font-medium transition-all duration-300 group/item"
                    >
                      <i className="mr-2 transition-colors fas fa-images text-primary group-hover/item:text-white"></i>
                      Gallery
                    </Link>
                  </div>
                </div>
              </div>

              {/* Center of Excellence (CHCI) - Direct Link */}
              <a
                href="https://chci.iitmandi.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 text-gray-700 hover:text-primary transition-all duration-300 font-semibold text-sm rounded-lg hover:bg-primary/5 relative group"
              >
                <span className="relative z-10">Center of Excellence (CHCI)</span>
                <span className="absolute inset-0 transition-transform duration-300 origin-center scale-0 rounded-lg bg-primary/10 group-hover:scale-100"></span>
              </a>

              {/* Careers - Direct Link */}
              <Link
                href="/careers"
                className="px-4 py-2.5 text-gray-700 hover:text-primary transition-all duration-300 font-semibold text-sm rounded-lg hover:bg-primary/5 relative group"
              >
                <span className="relative z-10">Careers</span>
                <span className="absolute inset-0 transition-transform duration-300 origin-center scale-0 rounded-lg bg-primary/10 group-hover:scale-100"></span>
              </Link>

              {/* Search Icon */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="px-3 py-2.5 text-gray-700 hover:text-primary transition-all duration-300 rounded-lg hover:bg-primary/5 relative group"
                aria-label="Search"
              >
                <i className="text-lg transition-transform duration-300 fas fa-search group-hover:scale-110"></i>
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-gray-700 p-2.5 rounded-lg hover:bg-primary/5 transition-all duration-300 relative group"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <svg
                  className={`w-6 h-6 absolute inset-0 transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg
                  className={`w-6 h-6 absolute inset-0 transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div
              className="py-4 duration-300 border-t lg:hidden animate-in slide-in-from-top"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                borderTop: '1px solid rgba(255, 255, 255, 0.5)',
                boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.6)',
              }}
            >
              <nav className="flex flex-col gap-1.5">
                <Link
                  href="/"
                  className="flex items-center gap-2 px-4 py-3 font-semibold text-gray-700 transition-all duration-300 rounded-lg hover:text-primary hover:bg-primary/10 group"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <i className="w-5 fas fa-home text-primary"></i>
                  <span>Home</span>
                </Link>

                {/* About Mobile */}
                <div className="overflow-hidden">
                  <button
                    className="flex items-center justify-between w-full px-4 py-3 font-semibold text-left text-gray-700 transition-all duration-300 rounded-lg hover:text-primary hover:bg-primary/10 group"
                    onClick={() => handleDropdownToggle('about')}
                  >
                    <div className="flex items-center gap-2">
                      <i className="w-5 fas fa-info-circle text-primary"></i>
                      <span>About</span>
                    </div>
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 text-primary ${
                        activeDropdown === 'about' ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      activeDropdown === 'about' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="pl-6 mt-1 space-y-1">
                      <Link
                        href="/about"
                        className="block px-4 py-2.5 text-gray-600 hover:text-primary hover:bg-primary/10 transition-all duration-300 rounded-lg text-sm font-medium flex items-center gap-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <i className="text-xs fas fa-info-circle text-primary"></i>
                        About Us
                      </Link>
                      <Link
                        href="/faculty"
                        className="block px-4 py-2.5 text-gray-600 hover:text-primary hover:bg-primary/10 transition-all duration-300 rounded-lg text-sm font-medium flex items-center gap-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <i className="text-xs fas fa-users text-primary"></i>
                        Team
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Programs Mobile */}
                <div className="overflow-hidden">
                  <button
                    className="flex items-center justify-between w-full px-4 py-3 font-semibold text-left text-gray-700 transition-all duration-300 rounded-lg hover:text-primary hover:bg-primary/10 group"
                    onClick={() => handleDropdownToggle('programs')}
                  >
                    <div className="flex items-center gap-2">
                      <i className="w-5 fas fa-briefcase text-primary"></i>
                      <span>Programs</span>
                    </div>
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 text-primary ${
                        activeDropdown === 'programs' ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      activeDropdown === 'programs' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="pl-6 mt-1 space-y-1">
                      <Link
                        href="/skill-development"
                        className="block px-4 py-2.5 text-gray-600 hover:text-primary hover:bg-primary/10 transition-all duration-300 rounded-lg text-sm font-medium flex items-center gap-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <i className="text-xs fas fa-graduation-cap text-primary"></i>
                        Skill Development
                      </Link>
                      <Link
                        href="/startups"
                        className="block px-4 py-2.5 text-gray-600 hover:text-primary hover:bg-primary/10 transition-all duration-300 rounded-lg text-sm font-medium flex items-center gap-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <i className="text-xs fas fa-rocket text-primary"></i>
                        Incubation
                      </Link>
                      <Link
                        href="/collaborations"
                        className="block px-4 py-2.5 text-gray-600 hover:text-primary hover:bg-primary/10 transition-all duration-300 rounded-lg text-sm font-medium flex items-center gap-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <i className="text-xs fas fa-handshake text-primary"></i>
                        Collaborations
                      </Link>
                      <Link
                        href="/research"
                        className="block px-4 py-2.5 text-gray-600 hover:text-primary hover:bg-primary/10 transition-all duration-300 rounded-lg text-sm font-medium flex items-center gap-2 whitespace-nowrap"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <i className="text-xs fas fa-flask text-primary"></i>
                        Research & Development
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Resources Mobile */}
                <div className="overflow-hidden">
                  <button
                    className="flex items-center justify-between w-full px-4 py-3 font-semibold text-left text-gray-700 transition-all duration-300 rounded-lg hover:text-primary hover:bg-primary/10 group"
                    onClick={() => handleDropdownToggle('resources')}
                  >
                    <div className="flex items-center gap-2">
                      <i className="w-5 fas fa-folder-open text-primary"></i>
                      <span>Resources</span>
                    </div>
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 text-primary ${
                        activeDropdown === 'resources' ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      activeDropdown === 'resources' ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="pl-6 mt-1 space-y-1">
                      <div className="px-4 py-2 mb-1 text-xs font-bold uppercase border-b text-primary border-primary/20">
                        News & Media
                      </div>
                      <Link
                        href="/newsletter"
                        className="block px-4 py-2.5 text-gray-600 hover:text-primary hover:bg-primary/10 transition-all duration-300 rounded-lg text-sm font-medium flex items-center gap-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <i className="text-xs fas fa-newspaper text-primary"></i>
                        Newsletter
                      </Link>
                      <Link
                        href="/press"
                        className="block px-4 py-2.5 text-gray-600 hover:text-primary hover:bg-primary/10 transition-all duration-300 rounded-lg text-sm font-medium flex items-center gap-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <i className="text-xs fas fa-microphone text-primary"></i>
                        Press
                      </Link>
                      <Link
                        href="/brochure"
                        className="block px-4 py-2.5 text-gray-600 hover:text-primary hover:bg-primary/10 transition-all duration-300 rounded-lg text-sm font-medium flex items-center gap-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <i className="text-xs fas fa-book text-primary"></i>
                        Brochure
                      </Link>
                      <Link
                        href="/gallery"
                        className="block px-4 py-2.5 text-gray-600 hover:text-primary hover:bg-primary/10 transition-all duration-300 rounded-lg text-sm font-medium flex items-center gap-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <i className="text-xs fas fa-images text-primary"></i>
                        Gallery
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Center of Excellence (CHCI) Mobile */}
                <a
                  href="https://chci.iitmandi.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 font-semibold text-gray-700 transition-all duration-300 rounded-lg hover:text-primary hover:bg-primary/10 group"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <i className="w-5 fas fa-star text-primary"></i>
                  <span>Center of Excellence (CHCI)</span>
                  <i className="ml-auto text-xs text-gray-400 fas fa-external-link-alt"></i>
                </a>

                {/* Careers Mobile */}
                <Link
                  href="/careers"
                  className="flex items-center gap-2 px-4 py-3 font-semibold text-gray-700 transition-all duration-300 rounded-lg hover:text-primary hover:bg-primary/10 group"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <i className="w-5 fas fa-briefcase text-primary"></i>
                  <span>Careers</span>
                </Link>

                {/* Search Mobile */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    setIsSearchOpen(true)
                  }}
                  className="flex items-center gap-2 px-4 py-3 font-semibold text-gray-700 transition-all duration-300 rounded-lg hover:text-primary hover:bg-primary/10 group"
                >
                  <i className="w-5 fas fa-search text-primary"></i>
                  <span>Search</span>
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

  
    </>
  )
}
