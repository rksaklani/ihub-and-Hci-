'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface AdminSidebarProps {
  onLogout: () => void
}

interface MenuItem {
  id: string
  label: string
  icon: string
  path?: string
  submenu?: Array<{ label: string; path: string }>
}

export default function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState<string[]>([])
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Load collapsed state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed')
    if (savedState !== null) {
      setIsCollapsed(JSON.parse(savedState))
    }
  }, [])

  // Save collapsed state to localStorage
  const toggleCollapse = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newState))
    // Dispatch custom event to notify layout
    window.dispatchEvent(new Event('sidebarToggle'))
  }

  const toggleMenu = (menu: string) => {
    setOpenMenus(prev => 
      prev.includes(menu) 
        ? prev.filter(m => m !== menu)
        : [...prev, menu]
    )
  }

  const isActive = (path: string) => pathname === path
  const isMenuOpen = (menu: string) => openMenus.includes(menu)

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'fas fa-tachometer-alt',
      path: '/admin/dashboard',
    },
    {
      id: 'team',
      label: 'Team',
      icon: 'fas fa-users',
      path: '/admin/team',
    },
    {
      id: 'program',
      label: 'Program',
      icon: 'fas fa-briefcase',
      path: '/admin/program',
    },
    {
      id: 'resources',
      label: 'Resources',
      icon: 'fas fa-folder-open',
      path: '/admin/resources',
    },
    {
      id: 'careers',
      label: 'Careers',
      icon: 'fas fa-briefcase',
      path: '/admin/careers',
    },
    {
      id: 'infrastructure',
      label: 'Office Infrastructure',
      icon: 'fas fa-building',
      path: '/admin/infrastructure',
    },
    {
      id: 'innovation',
      label: 'Call for Innovation',
      icon: 'fas fa-lightbulb',
      path: '/admin/call-for-innovation',
    },
    {
      id: 'tenders',
      label: 'Tenders',
      icon: 'fas fa-file-contract',
      path: '/admin/tenders',
    },
    {
      id: 'procurement',
      label: 'Procurement Policy',
      icon: 'fas fa-file-invoice',
      path: '/admin/procurement-policy',
    },
    {
      id: 'audit',
      label: 'Audit Reports',
      icon: 'fas fa-chart-line',
      path: '/admin/audit-reports',
    },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed z-50 p-2 bg-white border border-gray-200 rounded-lg shadow-lg lg:hidden top-4 left-4"
      >
        <i className={`fas ${isMobileOpen ? 'fa-times' : 'fa-bars'} text-gray-700`}></i>
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden bg-black/50"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 z-50 flex flex-col transition-all duration-300 ${
          isCollapsed ? 'lg:w-20' : 'lg:w-64'
        } ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:top-4 lg:bottom-4 lg:left-4 lg:rounded-2xl`}
      >
        <div className="flex flex-col px-4 pb-4 overflow-y-auto bg-gradient-to-b from-primary via-primary-light to-primary-dark border-r border-primary/20 lg:px-6 grow gap-y-5 rounded-2xl [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-primary/20 [&::-webkit-scrollbar-thumb]:bg-white/30 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-white/40">
          <div className="flex items-center justify-between h-16 border-b border-white/20 shrink-0">
            <Link
              href="/admin/dashboard"
              className={`flex items-center gap-2 transition-opacity ${isCollapsed ? 'lg:hidden' : ''}`}
              onClick={() => setIsMobileOpen(false)}
            >
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm shrink-0 ${isCollapsed ? 'lg:hidden' : ''}`}>
                <i className="text-lg text-white fas fa-cog"></i>
              </div>
              <span className={`text-xl font-bold text-white whitespace-nowrap ${isCollapsed ? 'hidden' : ''}`}>
                Admin Panel
              </span>
            </Link>
            <button
              onClick={toggleCollapse}
              className="items-center justify-center hidden w-8 h-8 transition-colors rounded-lg lg:flex hover:bg-white/20 shrink-0"
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <i className={`fas ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'} text-white text-sm`}></i>
            </button>
          </div>
        <nav className="flex flex-col flex-1">
          <ul role="list" className="flex flex-col flex-1 gap-y-1 list-none">
            {menuItems.map((item) => (
              <li key={item.id}>
                {item.path ? (
                  <Link
                    href={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-semibold leading-6 transition-colors group ${
                      isActive(item.path)
                        ? 'bg-white/20 text-white backdrop-blur-sm'
                        : 'text-white/90 hover:bg-white/10 hover:text-white'
                    }`}
                    title={isCollapsed ? item.label : ''}
                  >
                    <i className={`${item.icon} w-5 shrink-0`}></i>
                    <span className={`whitespace-nowrap ${isCollapsed ? 'hidden lg:block lg:opacity-0 lg:group-hover:opacity-100 lg:absolute lg:left-full lg:ml-2 lg:px-2 lg:py-1 lg:bg-gray-900 lg:text-white lg:text-xs lg:rounded lg:z-50' : ''}`}>
                      {item.label}
                    </span>
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => toggleMenu(item.id)}
                      className={`w-full flex items-center justify-between gap-x-2 rounded-lg px-3 py-2 text-sm font-semibold leading-6 transition-colors group whitespace-nowrap ${
                        isMenuOpen(item.id) || item.submenu?.some((sub: { label: string; path: string }) => isActive(sub.path))
                          ? 'bg-white/20 text-white backdrop-blur-sm'
                          : 'text-white/90 hover:bg-white/10 hover:text-white'
                      }`}
                      title={isCollapsed ? item.label : ''}
                    >
                      <div className="flex items-center flex-1 min-w-0 gap-x-3">
                        <i className={`${item.icon} w-5 shrink-0 ${isCollapsed ? 'lg:mx-auto' : ''}`}></i>
                        <span className={`whitespace-nowrap overflow-hidden text-ellipsis ${isCollapsed ? 'hidden' : ''}`}>
                          {item.label}
                        </span>
                      </div>
                      <i
                        className={`fas fa-chevron-down text-xs transition-transform shrink-0 ${isCollapsed ? 'hidden' : ''} ${
                          isMenuOpen(item.id) ? 'rotate-180' : ''
                        }`}
                      ></i>
                    </button>
                    {item.submenu && (
                      <ul
                        className={`mt-1 space-y-1 overflow-hidden transition-all duration-300 list-none ${
                          isMenuOpen(item.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        } ${isCollapsed ? 'lg:hidden' : ''}`}
                      >
                        {item.submenu.map((subItem: { label: string; path: string }) => (
                          <li key={subItem.path}>
                            <Link
                              href={subItem.path}
                              onClick={() => setIsMobileOpen(false)}
                              className={`block rounded-lg px-3 py-2 ${isCollapsed ? 'pl-3' : 'pl-11'} text-sm leading-6 transition-colors whitespace-nowrap ${
                                isActive(subItem.path)
                                  ? 'bg-white/20 text-white backdrop-blur-sm'
                                  : 'text-white/80 hover:bg-white/10 hover:text-white'
                              }`}
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
          <div className="pt-4 mt-auto border-t border-white/20">
            <button
              onClick={onLogout}
              className="flex items-center w-full px-3 py-2 text-sm font-semibold leading-6 text-red-300 transition-colors rounded-lg gap-x-3 hover:bg-red-500/30 hover:text-red-200 group"
              title={isCollapsed ? 'Logout' : ''}
            >
              <i className={`w-5 fas fa-sign-out-alt shrink-0 ${isCollapsed ? 'lg:mx-auto' : ''}`}></i>
              <span className={`whitespace-nowrap ${isCollapsed ? 'hidden' : ''}`}>
                Logout
              </span>
            </button>
          </div>
        </nav>
      </div>
    </div>
    </>
  )
}

