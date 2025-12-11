'use client'

import { useState } from 'react'

interface Advisor {
  id: string
  name: string
  image: string | null
  linkedinUrl: string
  description: string
}

export default function AdvisorsAdmin() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [advisors, setAdvisors] = useState<Advisor[]>([])
  const [formData, setFormData] = useState({
    name: '',
    image: null as File | null,
    linkedinUrl: '',
    description: '',
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

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
      setFormData(prev => ({
        ...prev,
        image: file
      }))
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Convert image to base64 for storage
      let imageBase64 = null
      if (formData.image) {
        imageBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(formData.image!)
        })
      }

      // Create new advisor
      const newAdvisor: Advisor = {
        id: Date.now().toString(),
        name: formData.name,
        image: imageBase64,
        linkedinUrl: formData.linkedinUrl,
        description: formData.description,
      }

      // Add to list
      setAdvisors(prev => [...prev, newAdvisor])
      
      // TODO: Add API call to submit the form data
      // await fetch('/api/advisors', { method: 'POST', body: JSON.stringify(newAdvisor) })
      
      // Reset form and close modal
      setFormData({
        name: '',
        image: null,
        linkedinUrl: '',
        description: '',
      })
      setImagePreview(null)
      setIsModalOpen(false)
      
      // Show success message
      alert('Advisor added successfully!')
    } catch (error) {
      console.error('Error adding advisor:', error)
      alert('Failed to add advisor. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this advisor?')) {
      setAdvisors(prev => prev.filter(advisor => advisor.id !== id))
    }
  }

  const handleCloseModal = () => {
    if (!isSubmitting) {
      setIsModalOpen(false)
      setFormData({
        name: '',
        image: null,
        linkedinUrl: '',
        description: '',
      })
      setImagePreview(null)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Advisors</h1>
        <p className="mt-2 text-sm text-gray-600">Manage advisors</p>
      </div>

      <div className="glass-strong rounded-xl p-6 border-2 border-primary/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Advisors List {advisors.length > 0 && `(${advisors.length})`}
          </h2>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <i className="fas fa-plus mr-2"></i>
            Add Advisor
          </button>
        </div>

        {advisors.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <i className="fas fa-user-tie text-4xl mb-4"></i>
            <p>No advisors added yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {advisors.map((advisor) => (
              <div
                key={advisor.id}
                className="glass-strong rounded-xl p-6 border-2 border-primary/10 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="relative w-full h-48 mb-4 bg-gray-200 rounded-xl overflow-hidden">
                  {advisor.image ? (
                    <img
                      src={advisor.image}
                      alt={advisor.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-primary/5">
                      <i className="fas fa-user text-6xl"></i>
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-bold mb-2 text-primary group-hover:text-primary-dark transition-colors">
                  {advisor.linkedinUrl ? (
                    <a
                      href={advisor.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline inline-flex items-center gap-2"
                    >
                      {advisor.name}
                      <i className="fab fa-linkedin text-sm"></i>
                    </a>
                  ) : (
                    advisor.name
                  )}
                </h3>
                {advisor.description && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{advisor.description}</p>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDelete(advisor.id)}
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

      {/* Add Advisor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">Add Advisor</h2>
              <button
                onClick={handleCloseModal}
                disabled={isSubmitting}
                className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Enter advisor name"
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
                  value={formData.linkedinUrl}
                  onChange={handleInputChange}
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
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                  placeholder="Enter advisor description or position"
                />
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
