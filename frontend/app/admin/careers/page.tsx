'use client'

import { useState } from 'react'
import {
  useGetCareersQuery,
  useCreateCareerMutation,
  useUpdateCareerMutation,
  useDeleteCareerMutation,
} from '@/lib/store/api'

interface Career {
  _id?: string
  title: string
  description?: string
  department?: string
  location?: string
  applicationLink?: string
  deadline?: string
  pdf?: string
  status?: 'open' | 'closed'
}

export default function CareersAdmin() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Career | null>(null)
  const [formData, setFormData] = useState<Career>({
    title: '',
    description: '',
    department: '',
    location: '',
    applicationLink: '',
    deadline: '',
    pdf: '',
    status: 'open',
  })

  const { data, isLoading, error, refetch } = useGetCareersQuery()
  const [createItem, { isLoading: isCreating }] = useCreateCareerMutation()
  const [updateItem, { isLoading: isUpdating }] = useUpdateCareerMutation()
  const [deleteItem] = useDeleteCareerMutation()

  const careers = data?.data || []

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, pdf: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingItem?._id) {
        await updateItem({ id: editingItem._id, ...formData }).unwrap()
      } else {
        await createItem(formData).unwrap()
      }
      setIsModalOpen(false)
      resetForm()
      refetch()
      alert(editingItem ? 'Updated successfully!' : 'Created successfully!')
    } catch (error: any) {
      alert(error?.data?.message || 'Failed to save')
    }
  }

  const handleEdit = (item: Career) => {
    setEditingItem(item)
    setFormData(item)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this job listing?')) {
      try {
        await deleteItem(id).unwrap()
        refetch()
        alert('Deleted successfully!')
      } catch (error: any) {
        alert(error?.data?.message || 'Failed to delete')
      }
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      department: '',
      location: '',
      applicationLink: '',
      deadline: '',
      pdf: '',
      status: 'open',
    })
    setEditingItem(null)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    resetForm()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-primary mb-4"></i>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Careers</h1>
        <p className="mt-2 text-sm text-gray-600">Manage career opportunities</p>
      </div>

      <div className="glass-strong rounded-xl p-6 border-2 border-primary/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Job Listings</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <i className="fas fa-plus mr-2"></i>
            Add Job
          </button>
        </div>

        {error ? (
          <div className="text-center py-12 text-red-500">
            <i className="fas fa-exclamation-circle text-4xl mb-4"></i>
            <p>Error loading data. Please try again.</p>
          </div>
        ) : careers.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <i className="fas fa-briefcase text-4xl mb-4"></i>
            <p>No job listings added yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careers.map((career: Career) => (
              <div key={career._id} className="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{career.title}</h3>
                {career.department && (
                  <p className="text-sm text-gray-600 mb-1"><strong>Department:</strong> {career.department}</p>
                )}
                {career.location && (
                  <p className="text-sm text-gray-600 mb-1"><strong>Location:</strong> {career.location}</p>
                )}
                {career.deadline && (
                  <p className="text-sm text-gray-600 mb-1"><strong>Deadline:</strong> {new Date(career.deadline).toLocaleDateString()}</p>
                )}
                {career.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{career.description}</p>
                )}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEdit(career)}
                    className="flex-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  >
                    <i className="fas fa-edit mr-1"></i>Edit
                  </button>
                  <button
                    onClick={() => career._id && handleDelete(career._id)}
                    className="flex-1 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                  >
                    <i className="fas fa-trash mr-1"></i>Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingItem ? 'Edit Job Listing' : 'Add Job Listing'}
              </h2>
              <button
                onClick={handleCloseModal}
                disabled={isCreating || isUpdating}
                className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
              >
                <i className="text-xl fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label htmlFor="title" className="block mb-2 text-sm font-semibold text-gray-700">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter job title"
                />
              </div>

              <div>
                <label htmlFor="description" className="block mb-2 text-sm font-semibold text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter job description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="department" className="block mb-2 text-sm font-semibold text-gray-700">
                    Department
                  </label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Department"
                  />
                </div>
                <div>
                  <label htmlFor="location" className="block mb-2 text-sm font-semibold text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Location"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="applicationLink" className="block mb-2 text-sm font-semibold text-gray-700">
                  Application Link
                </label>
                <input
                  type="url"
                  id="applicationLink"
                  name="applicationLink"
                  value={formData.applicationLink}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://example.com/apply"
                />
              </div>

              <div>
                <label htmlFor="deadline" className="block mb-2 text-sm font-semibold text-gray-700">
                  Deadline
                </label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="pdf" className="block mb-2 text-sm font-semibold text-gray-700">
                  Job Description PDF
                </label>
                <input
                  type="file"
                  id="pdf"
                  accept=".pdf,application/pdf"
                  onChange={handlePdfChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
              </div>

              <div>
                <label htmlFor="status" className="block mb-2 text-sm font-semibold text-gray-700">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'open' | 'closed' }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isCreating || isUpdating}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
                >
                  {isCreating || isUpdating ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      {editingItem ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    <>
                      <i className="fas fa-check mr-2"></i>
                      {editingItem ? 'Update' : 'Create'}
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

