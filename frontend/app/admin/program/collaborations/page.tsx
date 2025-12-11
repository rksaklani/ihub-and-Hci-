'use client'

import { useState } from 'react'
import {
  useGetCollaborationsQuery,
  useCreateCollaborationMutation,
  useUpdateCollaborationMutation,
  useDeleteCollaborationMutation,
} from '@/lib/store/api'

interface Collaboration {
  _id?: string
  title: string
  description: string
  link: string
  image: string | null
  status?: 'active' | 'inactive'
}

export default function CollaborationsAdmin() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Collaboration | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    image: null as File | null,
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const { data, isLoading, error, refetch } = useGetCollaborationsQuery()
  const [createItem, { isLoading: isCreating }] = useCreateCollaborationMutation()
  const [updateItem, { isLoading: isUpdating }] = useUpdateCollaborationMutation()
  const [deleteItem] = useDeleteCollaborationMutation()

  const collaborations = data?.data || []

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file')
        return
      }
      setFormData(prev => ({ ...prev, image: file }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      let imageBase64 = null
      if (formData.image) {
        imageBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(formData.image!)
        })
      }

      const collaborationData = {
        title: formData.title,
        description: formData.description,
        link: formData.link,
        image: imageBase64,
        status: 'active' as const,
      }

      if (editingItem?._id) {
        await updateItem({ id: editingItem._id, ...collaborationData }).unwrap()
      } else {
        await createItem(collaborationData).unwrap()
      }

      setIsModalOpen(false)
      resetForm()
      refetch()
      alert(editingItem ? 'Updated successfully!' : 'Created successfully!')
    } catch (error: any) {
      console.error('Error saving collaboration:', error)
      alert(error?.data?.message || 'Failed to save collaboration')
    }
  }

  const handleEdit = (item: Collaboration) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      description: item.description,
      link: item.link,
      image: null,
    })
    setImagePreview(item.image)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this collaboration?')) {
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
      link: '',
      image: null,
    })
    setImagePreview(null)
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
      <div 
        className="p-6 border-2 shadow-xl glass-strong rounded-2xl border-primary/10"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10">
              <i className="text-xl fas fa-handshake text-primary"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Our Collaborations</h2>
              <p className="mt-1 text-sm text-gray-600">Manage partnerships and collaborations</p>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
          >
            <i className="mr-2 fas fa-plus"></i>
            Add Collaboration
          </button>
        </div>

        {error ? (
          <div className="py-16 text-center text-red-500">
            <i className="fas fa-exclamation-circle text-4xl mb-4"></i>
            <p>Error loading data. Please try again.</p>
          </div>
        ) : collaborations.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5">
              <i className="text-4xl fas fa-handshake text-primary"></i>
            </div>
            <p className="text-lg font-medium">No collaborations added yet</p>
            <p className="mt-1 text-sm">Click "Add Collaboration" to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {collaborations.map((collab) => (
              <div key={collab._id} className="p-5 transition-all duration-300 border-2 border-gray-200 rounded-xl hover:shadow-xl hover:border-primary/30 bg-white/50 backdrop-blur-sm">
                {collab.image && (
                  <div className="w-full h-48 mb-3 overflow-hidden bg-gray-200 rounded-lg">
                    <img
                      src={collab.image}
                      alt={collab.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start flex-1 gap-3">
                    {!collab.image && (
                      <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10">
                        <i className="fas fa-handshake text-primary"></i>
                      </div>
                    )}
                    <h3 className="flex-1 text-lg font-bold text-primary">{collab.title}</h3>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(collab)}
                      className="text-blue-500 transition-colors hover:text-blue-700"
                      title="Edit collaboration"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      onClick={() => collab._id && handleDelete(collab._id)}
                      className="text-red-500 transition-colors hover:text-red-700"
                      title="Delete collaboration"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
                <p className="mb-3 text-sm text-gray-700 line-clamp-3">{collab.description}</p>
                {collab.link && (
                  <a
                    href={collab.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    Read More
                    <i className="text-xs fas fa-external-link-alt"></i>
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Collaboration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingItem ? 'Edit Collaboration' : 'Add Collaboration'}
              </h2>
              <button
                onClick={handleCloseModal}
                disabled={isCreating || isUpdating}
                className="text-gray-400 transition-colors hover:text-gray-600 disabled:opacity-50"
              >
                <i className="text-xl fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Image Upload Field */}
              <div>
                <label htmlFor="image" className="block mb-2 text-sm font-semibold text-gray-700">
                  Collaboration Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
                {imagePreview && (
                  <div className="mt-3">
                    <img src={imagePreview} alt="Preview" className="object-cover w-full h-48 border border-gray-200 rounded-lg" />
                  </div>
                )}
                <p className="mt-1 text-xs text-gray-500">Upload an image for this collaboration (optional)</p>
              </div>

              {/* Collaboration Title Field */}
              <div>
                <label htmlFor="title" className="block mb-2 text-sm font-semibold text-gray-700">
                  Collaboration Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., Collaboration With Naxon Labs"
                />
              </div>

              {/* Description Field */}
              <div>
                <label htmlFor="description" className="block mb-2 text-sm font-semibold text-gray-700">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={6}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter a description of the collaboration..."
                />
                <p className="mt-1 text-xs text-gray-500">Provide a brief description of the collaboration</p>
              </div>

              {/* Read More Link Field */}
              <div>
                <label htmlFor="link" className="block mb-2 text-sm font-semibold text-gray-700">
                  Read More Link <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  id="link"
                  name="link"
                  required
                  value={formData.link}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://www.ihubiitmandi.in/collaboration-details/"
                />
                <p className="mt-1 text-xs text-gray-500">Enter the URL to the detailed page about this collaboration</p>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isCreating || isUpdating}
                  className="flex-1 px-6 py-3 text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="flex-1 px-6 py-3 text-white transition-colors rounded-lg bg-primary hover:bg-primary-dark disabled:opacity-50"
                >
                  {isCreating || isUpdating ? (
                    <>
                      <i className="mr-2 fas fa-spinner fa-spin"></i>
                      {editingItem ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    <>
                      <i className="mr-2 fas fa-check"></i>
                      {editingItem ? 'Update' : 'Submit'}
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
