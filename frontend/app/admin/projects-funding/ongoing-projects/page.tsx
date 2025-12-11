'use client'

import { useState } from 'react'

interface OngoingProject {
  id: string
  sno: number
  title: string
  instituteName: string
  principalInvestigator: string
  coPrincipalInvestigator: string
  amountSanctioned: string
  durationFrom: string
  durationTo: string
}

export default function OngoingProjectsAdmin() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projects, setProjects] = useState<OngoingProject[]>([])
  const [formData, setFormData] = useState({
    title: '',
    instituteName: '',
    principalInvestigator: '',
    coPrincipalInvestigator: '',
    amountSanctioned: '',
    durationFrom: '',
    durationTo: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Auto-generate S.No. (next number in sequence)
      const nextSno = projects.length > 0 
        ? Math.max(...projects.map(p => p.sno)) + 1 
        : 1

      // Create new project
      const newProject: OngoingProject = {
        id: Date.now().toString(),
        sno: nextSno,
        title: formData.title,
        instituteName: formData.instituteName,
        principalInvestigator: formData.principalInvestigator,
        coPrincipalInvestigator: formData.coPrincipalInvestigator,
        amountSanctioned: formData.amountSanctioned,
        durationFrom: formData.durationFrom,
        durationTo: formData.durationTo,
      }

      // Add to list
      setProjects(prev => [...prev, newProject])
      
      // TODO: Add API call to submit the form data
      // await fetch('/api/ongoing-projects', { method: 'POST', body: JSON.stringify(newProject) })
      
      // Reset form and close modal
      setFormData({
        title: '',
        instituteName: '',
        principalInvestigator: '',
        coPrincipalInvestigator: '',
        amountSanctioned: '',
        durationFrom: '',
        durationTo: '',
      })
      setIsModalOpen(false)
      
      // Show success message
      alert('Project added successfully!')
    } catch (error) {
      console.error('Error adding project:', error)
      alert('Failed to add project. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(prev => {
        const updated = prev.filter(project => project.id !== id)
        // Re-number S.No. after deletion
        return updated.map((project, index) => ({
          ...project,
          sno: index + 1
        }))
      })
    }
  }

  const handleCloseModal = () => {
    if (!isSubmitting) {
      setIsModalOpen(false)
      setFormData({
        title: '',
        instituteName: '',
        principalInvestigator: '',
        coPrincipalInvestigator: '',
        amountSanctioned: '',
        durationFrom: '',
        durationTo: '',
      })
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Ongoing Projects</h1>
        <p className="mt-2 text-sm text-gray-600">Manage ongoing projects</p>
      </div>

      <div className="glass-strong rounded-xl p-6 border-2 border-primary/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Projects {projects.length > 0 && `(${projects.length})`}
          </h2>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <i className="fas fa-plus mr-2"></i>
            Add Project
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <i className="fas fa-project-diagram text-4xl mb-4"></i>
            <p>No projects added yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary/10 border-b-2 border-primary/20">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">S.No.</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Title of the Proposal</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Name of the Institute</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Principal Investigator (PI)</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Co-Principal Investigator</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Amount Sanctioned (INR)</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Duration of Project</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">{project.sno}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{project.title}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{project.instituteName}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{project.principalInvestigator}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{project.coPrincipalInvestigator}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      ₹{parseFloat(project.amountSanctioned).toLocaleString('en-IN')}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {new Date(project.durationFrom).toLocaleDateString()} - {new Date(project.durationTo).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                      >
                        <i className="fas fa-trash mr-1"></i>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
              <h2 className="text-2xl font-bold text-gray-900">Add Project</h2>
              <button
                onClick={handleCloseModal}
                disabled={isSubmitting}
                className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* S.No. Display (Auto-generated) */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  S.No.
                </label>
                <div className="text-lg font-bold text-primary">
                  {projects.length > 0 
                    ? Math.max(...projects.map(p => p.sno)) + 1 
                    : 1}
                </div>
                <p className="text-xs text-gray-500 mt-1">Auto-generated</p>
              </div>

              {/* Title of the Proposal */}
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                  Title of the Proposal <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Enter proposal title"
                />
              </div>

              {/* Name of the Institute */}
              <div>
                <label htmlFor="instituteName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Name of the Institute <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="instituteName"
                  name="instituteName"
                  required
                  value={formData.instituteName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Enter institute name"
                />
              </div>

              {/* Principal Investigator (PI) */}
              <div>
                <label htmlFor="principalInvestigator" className="block text-sm font-semibold text-gray-700 mb-2">
                  Principal Investigator (PI) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="principalInvestigator"
                  name="principalInvestigator"
                  required
                  value={formData.principalInvestigator}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Enter principal investigator name"
                />
              </div>

              {/* Co-Principal Investigator */}
              <div>
                <label htmlFor="coPrincipalInvestigator" className="block text-sm font-semibold text-gray-700 mb-2">
                  Co-Principal Investigator
                </label>
                <input
                  type="text"
                  id="coPrincipalInvestigator"
                  name="coPrincipalInvestigator"
                  value={formData.coPrincipalInvestigator}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Enter co-principal investigator name"
                />
              </div>

              {/* Amount Sanctioned (INR) */}
              <div>
                <label htmlFor="amountSanctioned" className="block text-sm font-semibold text-gray-700 mb-2">
                  Amount Sanctioned (INR) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="amountSanctioned"
                  name="amountSanctioned"
                  required
                  min="0"
                  step="0.01"
                  value={formData.amountSanctioned}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Enter amount in INR"
                />
              </div>

              {/* Duration of Project */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Duration of Project <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* From Date */}
                  <div>
                    <label htmlFor="durationFrom" className="block text-xs font-medium text-gray-600 mb-2">
                      From <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="durationFrom"
                      name="durationFrom"
                      required
                      value={formData.durationFrom}
                      onChange={handleInputChange}
                      max={formData.durationTo || undefined}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>

                  {/* To Date */}
                  <div>
                    <label htmlFor="durationTo" className="block text-xs font-medium text-gray-600 mb-2">
                      To <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="durationTo"
                      name="durationTo"
                      required
                      value={formData.durationTo}
                      onChange={handleInputChange}
                      min={formData.durationFrom || undefined}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-check mr-2"></i>
                      Submit
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
