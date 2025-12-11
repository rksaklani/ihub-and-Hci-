'use client'

import { useState } from 'react'

interface Brochure {
  id: string
  title: string
  description: string | null
  image: string | null
  pdf: string | null
}

export default function BrochureAdmin() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [brochures, setBrochures] = useState<Brochure[]>([])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null as File | null,
    pdf: null as File | null,
  })
  const [pdfPreview, setPdfPreview] = useState<string | null>(null)
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
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file')
        return
      }
      setFormData(prev => ({
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

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file')
        return
      }
      setFormData(prev => ({
        ...prev,
        pdf: file
      }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setPdfPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      let pdfBase64 = null
      if (formData.pdf) {
        pdfBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(formData.pdf!)
        })
      }

      let imageBase64 = null
      if (formData.image) {
        imageBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(formData.image!)
        })
      }

      const newBrochure: Brochure = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description || null,
        image: imageBase64,
        pdf: pdfBase64,
      }

      setBrochures(prev => [...prev, newBrochure])
      
      // TODO: Add API call to submit the form data
      // await fetch('/api/brochures', { method: 'POST', body: JSON.stringify(newBrochure) })
      
      // Reset form and close modal
      setFormData({
        title: '',
        description: '',
        image: null,
        pdf: null,
      })
      setPdfPreview(null)
      setImagePreview(null)
      setIsModalOpen(false)
      
      // Show success message
      alert('Brochure added successfully!')
    } catch (error) {
      console.error('Error adding brochure:', error)
      alert('Failed to add brochure. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCloseModal = () => {
    if (!isSubmitting) {
      setIsModalOpen(false)
      setFormData({
        title: '',
        description: '',
        image: null,
        pdf: null,
      })
      setPdfPreview(null)
      setImagePreview(null)
    }
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this brochure?')) {
      setBrochures(prev => prev.filter(brochure => brochure.id !== id))
      // TODO: Add API call to delete
      // await fetch(`/api/brochures/${id}`, { method: 'DELETE' })
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Brochure</h1>
        <p className="mt-2 text-sm text-gray-600">Manage brochures</p>
      </div>

      <div className="glass-strong rounded-xl p-6 border-2 border-primary/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Brochures</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <i className="fas fa-plus mr-2"></i>
            Add Brochure
          </button>
        </div>

        {brochures.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <i className="fas fa-book text-4xl mb-4"></i>
            <p>No brochures added yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {brochures.map((brochure) => (
              <div key={brochure.id} className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow text-center">
                {brochure.image ? (
                  <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
                    <img
                      src={brochure.image}
                      alt={brochure.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-file-pdf text-4xl text-primary"></i>
                  </div>
                )}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-primary flex-1">{brochure.title}</h3>
                  <button
                    onClick={() => handleDelete(brochure.id)}
                    className="ml-2 text-red-500 hover:text-red-700 transition-colors"
                    title="Delete brochure"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
                {brochure.description && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{brochure.description}</p>
                )}
                {brochure.pdf && (
                  <a
                    href={brochure.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-3 rounded-xl hover:from-primary-dark hover:to-primary transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <i className="fas fa-download"></i>
                    Download PDF
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Brochure Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">Add Brochure</h2>
              <button
                onClick={handleCloseModal}
                disabled={isSubmitting}
                className="text-gray-400 transition-colors hover:text-gray-600 disabled:opacity-50"
              >
                <i className="text-xl fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Brochure Title Field */}
              <div>
                <label htmlFor="title" className="block mb-2 text-sm font-semibold text-gray-700">
                  Brochure Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., iHub IIT Mandi Information Brochure"
                />
                <p className="mt-1 text-xs text-gray-500">Enter the title of the brochure</p>
              </div>

              {/* Description Field */}
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
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., Download our comprehensive information brochure to learn more about iHub IIT Mandi, our research areas, programs, and initiatives."
                />
                <p className="mt-1 text-xs text-gray-500">Provide a brief description of the brochure (optional)</p>
              </div>

              {/* Cover Image Upload Field */}
              <div>
                <label htmlFor="image" className="block mb-2 text-sm font-semibold text-gray-700">
                  Cover Image
                </label>
                <div className="space-y-3">
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                  />
                  {imagePreview && (
                    <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <img
                        src={imagePreview}
                        alt="Cover preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-500">Upload a cover image for the brochure (optional)</p>
              </div>

              {/* PDF Upload Field */}
              <div>
                <label htmlFor="pdf" className="block mb-2 text-sm font-semibold text-gray-700">
                  PDF Upload <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  <input
                    type="file"
                    id="pdf"
                    name="pdf"
                    accept=".pdf,application/pdf"
                    onChange={handlePdfChange}
                    required
                    className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                  />
                  {pdfPreview && (
                    <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-3">
                        <i className="fas fa-file-pdf text-3xl text-red-500"></i>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {formData.pdf?.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(formData.pdf?.size! / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-500">Upload the brochure PDF file</p>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 text-white transition-colors rounded-lg bg-primary hover:bg-primary-dark disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <i className="mr-2 fas fa-spinner fa-spin"></i>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <i className="mr-2 fas fa-check"></i>
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
