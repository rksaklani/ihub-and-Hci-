'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function ProgramLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const tabs = [
    { 
      id: 'skill-development', 
      label: 'Skill Development', 
      path: '/admin/program/skill-development',
      icon: 'fas fa-graduation-cap'
    },
    { 
      id: 'incubation', 
      label: 'Incubation', 
      path: '/admin/program/incubation',
      icon: 'fas fa-rocket'
    },
    { 
      id: 'collaborations', 
      label: 'Collaborations', 
      path: '/admin/program/collaborations',
      icon: 'fas fa-handshake'
    },
    { 
      id: 'research-development', 
      label: 'Research & Development', 
      path: '/admin/program/research-development',
      icon: 'fas fa-flask'
    },
  ]

  // Determine active tab based on current pathname
  const getActiveTab = () => {
    if (pathname === '/admin/program') return 'skill-development'
    return tabs.find(tab => pathname === tab.path || pathname.startsWith(tab.path + '/'))?.id || 'skill-development'
  }

  const activeTab = getActiveTab()

  return (
    <div>
      {/* Header Section */}
      <div className="mb-8">
        <div 
          className="glass-strong rounded-2xl p-6 border-4 border-primary/30 shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
            backdropFilter: 'blur(30px) saturate(200%)',
            WebkitBackdropFilter: 'blur(30px) saturate(200%)',
            border: '3px solid rgba(13, 86, 158, 0.3)',
            boxShadow: '0 8px 32px 0 rgba(13, 86, 158, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.9), inset 0 -1px 0 0 rgba(255, 255, 255, 0.3)',
          }}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary via-primary-light to-primary-dark flex items-center justify-center shadow-xl border-2 border-white/50">
              <i className="fas fa-briefcase text-white text-xl"></i>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Program Management</h1>
              <p className="text-sm text-gray-600">Manage all program-related content and initiatives</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="mb-6">
        <div 
          className="glass-strong rounded-xl p-2 border-2 border-primary/20 shadow-lg bg-gradient-to-br from-white via-primary/5 to-white"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(13, 86, 158, 0.05) 50%, rgba(255, 255, 255, 0.98) 100%)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          }}
        >
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <Link
                  key={tab.id}
                  href={tab.path}
                  className={`group relative px-5 py-2.5 font-semibold text-sm rounded-xl transition-all duration-300 flex items-center gap-2 flex-1 min-w-[140px] ${
                    isActive
                      ? 'bg-gradient-to-r from-primary via-primary-light to-primary-dark text-white shadow-lg shadow-primary/30 border border-primary/30'
                      : 'bg-white/90 text-gray-700 hover:bg-white hover:text-primary border border-gray-300/50 hover:border-primary/40 hover:shadow-md'
                  }`}
                >
                  <div className={`flex items-center justify-center w-7 h-7 rounded-lg transition-all flex-shrink-0 ${
                    isActive 
                      ? 'bg-white/20 backdrop-blur-sm' 
                      : 'bg-primary/10 group-hover:bg-primary/20'
                  }`}>
                    <i className={`${tab.icon} ${isActive ? 'text-white' : 'text-primary group-hover:text-primary-dark'} text-sm transition-colors`}></i>
                  </div>
                  <span className="font-heading whitespace-nowrap">{tab.label}</span>
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2/3 h-1 bg-white rounded-full"></div>
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="animate-fade-in">
        {children}
      </div>
    </div>
  )
}

