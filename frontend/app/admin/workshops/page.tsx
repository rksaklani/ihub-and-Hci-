'use client'

import { useState } from 'react'
import {
  useGetWorkshopsQuery,
  useCreateWorkshopMutation,
  useUpdateWorkshopMutation,
  useDeleteWorkshopMutation,
} from '@/lib/store/api'

interface Workshop {
  _id?: string
  title: string
  description?: string
  date?: string
  location?: string
  link?: string
  image?: string
  pdf?: string
  status?: 'upcoming' | 'completed' | 'cancelled'
}

export default function WorkshopsAdmin() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Workshop | null>(null)
  const [formData, setFormData] = useState<Workshop>({
    title: '',
    description: '',
    date: '',
    location: '',
    link: '',
    image: '',
    pdf: '',
    status: 'upcoming',
  })

  const { data, isLoading, error, refetch } = useGetWorkshopsQuery()
  const [createItem, { isLoading: isCreating }] = useCreateWorkshopMutation()
  const [updateItem, { isLoading: isUpdating }] = useUpdateWorkshopMutation()
  const [deleteItem] = useDeleteWorkshopMutation()

  const workshops = data?.data || []

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
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

  const handleEdit = (item: Workshop) => {
    setEditingItem(item)
    setFormData(item)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this workshop?')) {
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
      date: '',
      location: '',
      link: '',
      image: '',
      pdf: '',
      status: 'upcoming',
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
        <h1 className="text-3xl font-bold text-gray-900">Our Workshops</h1>
        <p className="mt-2 text-sm text-gray-600">Manage workshops</p>
      </div>

      <div className="glass-strong rounded-xl p-6 border-2 border-primary/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Workshops</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <i className="fas fa-plus mr-2"></i>
            Add Workshop
          </button>
        </div>

        {error ? (
          <div className="text-center py-12 text-red-500">
            <i className="fas fa-exclamation-circle text-4xl mb-4"></i>
            <p>Error loading data. Please try again.</p>
          </div>
        ) : workshops.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <i className="fas fa-chalkboard-teacher text-4xl mb-4"></i>
            <p>No workshops added yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workshops.map((workshop: Workshop) => (
              <div key={workshop._id} className="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                {workshop.image && (
                  <img src={workshop.image} alt={workshop.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                )}
                <h3 className="text-lg font-bold text-gray-900 mb-2">{workshop.title}</h3>
                {workshop.date && (
                  <p className="text-sm text-gray-600 mb-1"><strong>Date:</strong> {new Date(workshop.date).toLocaleDateString()}</p>
                )}
                {workshop.location && (
                  <p className="text-sm text-gray-600 mb-1"><strong>Location:</strong> {workshop.location}</p>
                )}
                {workshop.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{workshop.description}</p>
                )}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEdit(workshop)}
                    className="flex-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  >
                    <i className="fas fa-edit mr-1"></i>Edit
                  </button>
                  <button
                    onClick={() => workshop._id && handleDelete(workshop._id)}
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
                {editingItem ? 'Edit Workshop' : 'Add Workshop'}
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
                  Workshop Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter workshop title"
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
                  placeholder="Enter workshop description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block mb-2 text-sm font-semibold text-gray-700">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
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
                <label htmlFor="link" className="block mb-2 text-sm font-semibold text-gray-700">
                  Link
                </label>
                <input
                  type="url"
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label htmlFor="image" className="block mb-2 text-sm font-semibold text-gray-700">
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
                {formData.image && (
                  <img src={formData.image} alt="Preview" className="mt-3 w-full h-48 object-cover rounded-lg border border-gray-200" />
                )}
              </div>

              <div>
                <label htmlFor="pdf" className="block mb-2 text-sm font-semibold text-gray-700">
                  PDF
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
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'upcoming' | 'completed' | 'cancelled' }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
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
