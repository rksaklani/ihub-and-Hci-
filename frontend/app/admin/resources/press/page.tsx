'use client'

import { useState } from 'react'
import {
  useGetPressQuery,
  useCreatePressMutation,
  useDeletePressMutation,
} from '@/lib/store/api'

interface PressArticle {
  _id: string
  title: string
  description?: string | null
  image?: string | null
  pdf?: string | null
  link?: string | null
}

export default function PressAdmin() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // RTK Query hooks
  const { data: pressData, refetch: refetchPress } = useGetPressQuery({})
  const [createPress] = useCreatePressMutation()
  const [deletePress] = useDeletePressMutation()
  
  const pressArticles = pressData?.data || []
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null as File | null,
    pdf: null as File | null,
    link: '',
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [pdfPreview, setPdfPreview] = useState<string | null>(null)

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

    // Client-side validation
    const trimmedTitle = formData.title?.trim()
    if (!trimmedTitle) {
      alert('Please enter a title')
      return
    }

    try {
      let imageBase64 = null
      if (formData.image) {
        imageBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(formData.image!)
        })
      }

      let pdfBase64 = null
      if (formData.pdf) {
        pdfBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(formData.pdf!)
        })
      }

      await createPress({
        title: trimmedTitle,
        description: formData.description?.trim() || undefined,
        image: imageBase64 || undefined,
        pdf: pdfBase64 || undefined,
        link: formData.link?.trim() || undefined,
      }).unwrap()
      
      // Reset form and close modal
      setFormData({
        title: '',
        description: '',
        image: null,
        pdf: null,
        link: '',
      })
      setImagePreview(null)
      setPdfPreview(null)
      setIsModalOpen(false)
      refetchPress()
      
      // Show success message
      alert('Press release added successfully!')
    } catch (error: any) {
      console.error('Error adding press release:', error)
      const errorMessage = error?.data?.message || error?.message || 'Failed to add press release'
      alert(errorMessage)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setFormData({
      title: '',
      description: '',
      image: null,
      pdf: null,
      link: '',
    })
    setImagePreview(null)
    setPdfPreview(null)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this press release?')) {
      try {
        await deletePress(id).unwrap()
        refetchPress()
        alert('Press release deleted successfully!')
      } catch (error: any) {
        console.error('Error deleting press release:', error)
        const errorMessage = error?.data?.message || error?.message || 'Failed to delete press release'
        alert(errorMessage)
      }
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Press</h1>
        <p className="mt-2 text-sm text-gray-600">Manage press releases and media coverage</p>
      </div>

      <div className="glass-strong rounded-xl p-6 border-2 border-primary/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Press Releases</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <i className="fas fa-plus mr-2"></i>
            Add Press Release
          </button>
        </div>

        {pressArticles.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <i className="fas fa-microphone text-4xl mb-4"></i>
            <p>No press releases added yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pressArticles.map((article) => (
              <div key={article._id} className="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                {article.image && (
                  <div className="w-full h-48 mb-3 overflow-hidden bg-gray-200 rounded-lg">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                {!article.image && (
                  <div className="w-full h-48 mb-3 bg-primary/5 rounded-lg flex items-center justify-center">
                    <i className="fas fa-newspaper text-5xl text-primary"></i>
                  </div>
                )}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-primary flex-1">{article.title}</h3>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="ml-2 text-red-500 hover:text-red-700 transition-colors"
                    title="Delete press release"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
                {article.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{article.description}</p>
                )}
                <div className="space-y-2">
                  {article.pdf && (
                    <a
                      href={article.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-center text-sm"
                    >
                      <i className="fas fa-file-pdf mr-2"></i>
                      View PDF
                    </a>
                  )}
                  {article.link && (
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full px-4 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors text-center text-sm"
                    >
                      <i className="fas fa-external-link-alt mr-2"></i>
                      Read More
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Press Release Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">Add Press Release</h2>
              <button
                onClick={handleCloseModal}
                disabled={isSubmitting}
                className="text-gray-400 transition-colors hover:text-gray-600 disabled:opacity-50"
              >
                <i className="text-xl fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Press Release Title Field */}
              <div>
                <label htmlFor="title" className="block mb-2 text-sm font-semibold text-gray-700">
                  Press Release Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., Overcoming the hurdle of accessibility, IIT-Mandi has created a niche for itself"
                />
                <p className="mt-1 text-xs text-gray-500">Enter the title of the press release or article</p>
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
                  placeholder="Enter a brief description of the press release..."
                />
                <p className="mt-1 text-xs text-gray-500">Provide a brief description of the press release (optional)</p>
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
                    <div className="mt-3">
                      <img src={imagePreview} alt="Preview" className="object-cover w-full h-48 border border-gray-200 rounded-lg" />
                    </div>
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-500">Upload a cover image for the press release (optional)</p>
              </div>

              {/* PDF Upload Field */}
              <div>
                <label htmlFor="pdf" className="block mb-2 text-sm font-semibold text-gray-700">
                  PDF Upload
                </label>
                <div className="space-y-3">
                  <input
                    type="file"
                    id="pdf"
                    name="pdf"
                    accept=".pdf,application/pdf"
                    onChange={handlePdfChange}
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
                <p className="mt-1 text-xs text-gray-500">Upload a PDF file for the press release (optional)</p>
              </div>

              {/* Read More Link Field */}
              <div>
                <label htmlFor="link" className="block mb-2 text-sm font-semibold text-gray-700">
                  Read More Link
                </label>
                <input
                  type="url"
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://www.timesnownews.com/education/..."
                />
                <p className="mt-1 text-xs text-gray-500">Enter the URL to read the full article online (optional)</p>
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
