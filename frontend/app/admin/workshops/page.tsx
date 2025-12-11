'use client'

export default function WorkshopsAdmin() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Our Workshops</h1>
        <p className="mt-2 text-sm text-gray-600">Manage workshops</p>
      </div>

      <div className="glass-strong rounded-xl p-6 border-2 border-primary/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Workshops</h2>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
            <i className="fas fa-plus mr-2"></i>
            Add Workshop
          </button>
        </div>
        <div className="text-center py-12 text-gray-500">
          <i className="fas fa-chalkboard-teacher text-4xl mb-4"></i>
          <p>No workshops added yet</p>
        </div>
      </div>
    </div>
  )
}

