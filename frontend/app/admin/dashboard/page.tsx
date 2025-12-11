'use client'

export default function AdminDashboard() {
  const stats = [
    { name: 'Total Team Members', value: '0', icon: 'fas fa-users', color: 'bg-blue-500' },
    { name: 'Active Projects', value: '0', icon: 'fas fa-project-diagram', color: 'bg-green-500' },
    { name: 'Newsletters', value: '0', icon: 'fas fa-newspaper', color: 'bg-yellow-500' },
    { name: 'Total Programs', value: '0', icon: 'fas fa-briefcase', color: 'bg-purple-500' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">Welcome to the admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="glass-strong rounded-xl p-6 border-2 border-primary/10">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <i className={`${stat.icon} text-white text-xl`}></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="glass-strong rounded-xl p-6 border-2 border-primary/10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <a href="/admin/team/board-of-directors" className="block p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
              <div className="flex items-center gap-3">
                <i className="fas fa-users text-primary"></i>
                <span className="text-gray-700 font-medium">Manage Team</span>
              </div>
            </a>
            <a href="/admin/projects-funding/call-for-proposals" className="block p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
              <div className="flex items-center gap-3">
                <i className="fas fa-file-alt text-primary"></i>
                <span className="text-gray-700 font-medium">Manage Projects</span>
              </div>
            </a>
            <a href="/admin/resources/newsletter" className="block p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
              <div className="flex items-center gap-3">
                <i className="fas fa-newspaper text-primary"></i>
                <span className="text-gray-700 font-medium">Manage Resources</span>
              </div>
            </a>
          </div>
        </div>

        <div className="glass-strong rounded-xl p-6 border-2 border-primary/10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="text-sm text-gray-600">
              <p>No recent activity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

