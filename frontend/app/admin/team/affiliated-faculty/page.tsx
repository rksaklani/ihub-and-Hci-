'use client'

import { useState } from 'react'

interface Project {
  id: string
  name: string
  description: string
}

interface FacultyMember {
  id: string
  projectId: string
  projectName: string
  name: string
  image: string | null
  linkedinUrl: string
  description: string
}

export default function AffiliatedFacultyAdmin() {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [facultyMembers, setFacultyMembers] = useState<FacultyMember[]>([])
  
  // Project form data
  const [projectFormData, setProjectFormData] = useState({
    name: '',
    description: '',
  })
  const [isProjectSubmitting, setIsProjectSubmitting] = useState(false)

  // Member form data
  const [memberFormData, setMemberFormData] = useState({
    projectId: '',
    name: '',
    image: null as File | null,
    linkedinUrl: '',
    description: '',
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isMemberSubmitting, setIsMemberSubmitting] = useState(false)

  // Project form handlers
  const handleProjectInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProjectFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProjectSubmitting(true)

    try {
      const newProject: Project = {
        id: Date.now().toString(),
        name: projectFormData.name,
        description: projectFormData.description,
      }

      setProjects(prev => [...prev, newProject])
      
      // TODO: Add API call
      // await fetch('/api/projects', { method: 'POST', body: JSON.stringify(newProject) })
      
      setProjectFormData({
        name: '',
        description: '',
      })
      setIsProjectModalOpen(false)
      
      alert('Project added successfully!')
    } catch (error) {
      console.error('Error adding project:', error)
      alert('Failed to add project. Please try again.')
    } finally {
      setIsProjectSubmitting(false)
    }
  }

  const handleProjectDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project? All associated members will also be deleted.')) {
      setProjects(prev => prev.filter(project => project.id !== id))
      setFacultyMembers(prev => prev.filter(member => member.projectId !== id))
    }
  }

  // Member form handlers
  const handleMemberInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setMemberFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setMemberFormData(prev => ({
        ...prev,
        image: file
      }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleMemberSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsMemberSubmitting(true)

    try {
      if (!memberFormData.projectId) {
        alert('Please select a project')
        setIsMemberSubmitting(false)
        return
      }

      // Get project name
      const selectedProject = projects.find(p => p.id === memberFormData.projectId)
      if (!selectedProject) {
        alert('Selected project not found')
        setIsMemberSubmitting(false)
        return
      }

      // Convert image to base64
      let imageBase64 = null
      if (memberFormData.image) {
        imageBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(memberFormData.image!)
        })
      }

      const newMember: FacultyMember = {
        id: Date.now().toString(),
        projectId: memberFormData.projectId,
        projectName: selectedProject.name,
        name: memberFormData.name,
        image: imageBase64,
        linkedinUrl: memberFormData.linkedinUrl,
        description: memberFormData.description,
      }

      setFacultyMembers(prev => [...prev, newMember])
      
      // TODO: Add API call
      // await fetch('/api/faculty-members', { method: 'POST', body: JSON.stringify(newMember) })
      
      setMemberFormData({
        projectId: '',
        name: '',
        image: null,
        linkedinUrl: '',
        description: '',
      })
      setImagePreview(null)
      setIsMemberModalOpen(false)
      
      alert('Faculty member added successfully!')
    } catch (error) {
      console.error('Error adding faculty member:', error)
      alert('Failed to add faculty member. Please try again.')
    } finally {
      setIsMemberSubmitting(false)
    }
  }

  const handleMemberDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this faculty member?')) {
      setFacultyMembers(prev => prev.filter(member => member.id !== id))
    }
  }

  const handleCloseProjectModal = () => {
    if (!isProjectSubmitting) {
      setIsProjectModalOpen(false)
      setProjectFormData({
        name: '',
        description: '',
      })
    }
  }

  const handleCloseMemberModal = () => {
    if (!isMemberSubmitting) {
      setIsMemberModalOpen(false)
      setMemberFormData({
        projectId: '',
        name: '',
        image: null,
        linkedinUrl: '',
        description: '',
      })
      setImagePreview(null)
    }
  }

  // Group members by project
  const membersByProject = projects.map(project => ({
    project,
    members: facultyMembers.filter(member => member.projectId === project.id)
  }))

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Affiliated Faculty</h1>
        <p className="mt-2 text-sm text-gray-600">Manage affiliated faculty members and projects</p>
      </div>

      <div className="glass-strong rounded-xl p-6 border-2 border-primary/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Projects & Faculty {projects.length > 0 && `(${projects.length} projects, ${facultyMembers.length} members)`}
          </h2>
          <div className="flex gap-3">
            <button 
              onClick={() => setIsProjectModalOpen(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <i className="fas fa-plus mr-2"></i>
              Add Project
            </button>
            <button 
              onClick={() => {
                if (projects.length === 0) {
                  alert('Please add a project first before adding members')
                } else {
                  setIsMemberModalOpen(true)
                }
              }}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              <i className="fas fa-plus mr-2"></i>
              Add Member
            </button>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <i className="fas fa-user-graduate text-4xl mb-4"></i>
            <p>No projects added yet. Add a project to get started.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {membersByProject.map(({ project, members }) => (
              <div key={project.id} className="border-2 border-primary/10 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-primary mb-2">{project.name}</h3>
                    {project.description && (
                      <p className="text-gray-600 mb-4">{project.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleProjectDelete(project.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                  >
                    <i className="fas fa-trash mr-2"></i>
                    Delete Project
                  </button>
                </div>

                {members.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <i className="fas fa-users text-2xl mb-2"></i>
                    <p>No faculty members added to this project yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {members.map((member) => (
                      <div
                        key={member.id}
                        className="glass-strong rounded-xl p-6 border-2 border-primary/10 hover:shadow-lg transition-all duration-300 group"
                      >
                        <div className="relative w-full h-48 mb-4 bg-gray-200 rounded-xl overflow-hidden">
                          {member.image ? (
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 bg-primary/5">
                              <i className="fas fa-user text-6xl"></i>
                            </div>
                          )}
                        </div>
                        <h4 className="text-lg font-bold mb-2 text-primary group-hover:text-primary-dark transition-colors">
                          {member.linkedinUrl ? (
                            <a
                              href={member.linkedinUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline inline-flex items-center gap-2"
                            >
                              {member.name}
                              <i className="fab fa-linkedin text-sm"></i>
                            </a>
                          ) : (
                            member.name
                          )}
                        </h4>
                        {member.description && (
                          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{member.description}</p>
                        )}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleMemberDelete(member.id)}
                            className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                          >
                            <i className="fas fa-trash mr-2"></i>
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Project Modal */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">Add Project</h2>
              <button
                onClick={handleCloseProjectModal}
                disabled={isProjectSubmitting}
                className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <form onSubmit={handleProjectSubmit} className="p-6 space-y-6">
              {/* Project Name Field */}
              <div>
                <label htmlFor="projectName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="projectName"
                  name="name"
                  required
                  value={projectFormData.name}
                  onChange={handleProjectInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Enter project name"
                />
              </div>

              {/* Description Field */}
              <div>
                <label htmlFor="projectDescription" className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="projectDescription"
                  name="description"
                  rows={4}
                  value={projectFormData.description}
                  onChange={handleProjectInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                  placeholder="Enter project description"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseProjectModal}
                  disabled={isProjectSubmitting}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProjectSubmitting}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProjectSubmitting ? (
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

      {/* Add Member Modal */}
      {isMemberModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">Add Faculty Member</h2>
              <button
                onClick={handleCloseMemberModal}
                disabled={isMemberSubmitting}
                className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <form onSubmit={handleMemberSubmit} className="p-6 space-y-6">
              {/* Project Name Dropdown */}
              <div>
                <label htmlFor="projectId" className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Name <span className="text-red-500">*</span>
                </label>
                <select
                  id="projectId"
                  name="projectId"
                  required
                  value={memberFormData.projectId}
                  onChange={handleMemberInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                  <option value="">Select a project</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={memberFormData.name}
                  onChange={handleMemberInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Enter faculty member name"
                />
              </div>

              {/* Image Upload Field */}
              <div>
                <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-2">
                  Image
                </label>
                <div className="space-y-3">
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                  />
                  {imagePreview && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-600 mb-2">Preview:</p>
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-32 h-40 object-cover rounded-lg border border-gray-300"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* LinkedIn URL Field */}
              <div>
                <label htmlFor="linkedinUrl" className="block text-sm font-semibold text-gray-700 mb-2">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  id="linkedinUrl"
                  name="linkedinUrl"
                  value={memberFormData.linkedinUrl}
                  onChange={handleMemberInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="https://www.linkedin.com/in/username"
                />
              </div>

              {/* Description Field */}
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={memberFormData.description}
                  onChange={handleMemberInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                  placeholder="Enter faculty member description or position"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseMemberModal}
                  disabled={isMemberSubmitting}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isMemberSubmitting}
                  className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isMemberSubmitting ? (
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
