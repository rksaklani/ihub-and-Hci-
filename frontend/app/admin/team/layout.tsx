'use client'

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
              <i className="fas fa-users text-white text-xl"></i>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Team Management</h1>
              <p className="text-sm text-gray-600">Manage all team members and faculty</p>
            </div>
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

