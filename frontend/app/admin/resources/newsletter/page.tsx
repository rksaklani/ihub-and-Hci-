'use client'

import { useState } from 'react'
import {
  useGetNewslettersQuery,
  useCreateNewsletterMutation,
  useUpdateNewsletterMutation,
  useDeleteNewsletterMutation,
} from '@/lib/store/api'

interface Newsletter {
  _id?: string
  title: string
  pdf?: string | null
  image?: string | null
  link?: string | null
}

export default function NewsletterAdmin() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Newsletter | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    pdf: null as File | null,
    image: null as File | null,
    link: '',
  })
  const [pdfPreview, setPdfPreview] = useState<string | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const { data, isLoading, error, refetch } = useGetNewslettersQuery()
  const [createNewsletter, { isLoading: isCreating }] = useCreateNewsletterMutation()
  const [updateNewsletter, { isLoading: isUpdating }] = useUpdateNewsletterMutation()
  const [deleteNewsletter] = useDeleteNewsletterMutation()

  const newsletters = data?.data || []
  const isSubmitting = isCreating || isUpdating

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      let pdfBase64 = null
      if (formData.pdf) {
        pdfBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(formData.pdf!)
        })
      } else if (editingItem?.pdf) {
        pdfBase64 = editingItem.pdf
      }

      let imageBase64 = null
      if (formData.image) {
        imageBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(formData.image!)
        })
      } else if (editingItem?.image) {
        imageBase64 = editingItem.image
      }

      const newsletterData = {
        title: formData.title,
        pdf: pdfBase64,
        image: imageBase64,
        link: formData.link || null,
      }

      if (editingItem?._id) {
        await updateNewsletter({ id: editingItem._id, ...newsletterData }).unwrap()
      } else {
        await createNewsletter(newsletterData).unwrap()
      }
      
      refetch()
      resetForm()
      setIsModalOpen(false)
      alert(editingItem ? 'Newsletter updated successfully!' : 'Newsletter added successfully!')
    } catch (error: any) {
      console.error('Error saving newsletter:', error)
      alert(error?.data?.message || 'Failed to save newsletter. Please try again.')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      pdf: null,
      image: null,
      link: '',
    })
    setPdfPreview(null)
    setImagePreview(null)
    setEditingItem(null)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    resetForm()
  }

  const handleEdit = (newsletter: Newsletter) => {
    setEditingItem(newsletter)
    setFormData({
      title: newsletter.title,
      pdf: null,
      image: null,
      link: newsletter.link || '',
    })
    setPdfPreview(newsletter.pdf)
    setImagePreview(newsletter.image)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this newsletter?')) {
      try {
        await deleteNewsletter(id).unwrap()
        refetch()
        alert('Newsletter deleted successfully!')
      } catch (error: any) {
        alert(error?.data?.message || 'Failed to delete')
      }
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Newsletter</h1>
        <p className="mt-2 text-sm text-gray-600">Manage newsletters</p>
      </div>

      <div className="glass-strong rounded-xl p-6 border-2 border-primary/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Newsletters</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <i className="fas fa-plus mr-2"></i>
            Add Newsletter
          </button>
        </div>

        {error ? (
          <div className="text-center py-12 text-red-500">
            <i className="fas fa-exclamation-circle text-4xl mb-4"></i>
            <p>Error loading data. Please try again.</p>
          </div>
        ) : isLoading ? (
          <div className="text-center py-12 text-gray-500">
            <i className="fas fa-spinner fa-spin text-4xl mb-4"></i>
            <p>Loading...</p>
          </div>
        ) : newsletters.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <i className="fas fa-newspaper text-4xl mb-4"></i>
            <p>No newsletters added yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {newsletters.map((newsletter) => (
              <div key={newsletter._id} className="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                {newsletter.image && (
                  <div className="w-full h-48 mb-3 overflow-hidden bg-gray-200 rounded-lg">
                    <img
                      src={newsletter.image}
                      alt={newsletter.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                {!newsletter.image && (
                  <div className="w-full h-48 mb-3 bg-primary/5 rounded-lg flex items-center justify-center">
                    <i className="fas fa-file-pdf text-5xl text-primary"></i>
                  </div>
                )}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-primary flex-1">{newsletter.title}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(newsletter)}
                      className="text-blue-500 hover:text-blue-700 transition-colors"
                      title="Edit newsletter"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      onClick={() => newsletter._id && handleDelete(newsletter._id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Delete newsletter"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  {newsletter.pdf && (
                    <a
                      href={newsletter.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-center text-sm"
                    >
                      <i className="fas fa-download mr-2"></i>
                      View PDF
                    </a>
                  )}
                  {newsletter.link && (
                    <a
                      href={newsletter.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full px-4 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors text-center text-sm"
                    >
                      <i className="fas fa-external-link-alt mr-2"></i>
                      Read Online
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Newsletter Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingItem ? 'Edit Newsletter' : 'Add Newsletter'}
              </h2>
              <button
                onClick={handleCloseModal}
                disabled={isSubmitting}
                className="text-gray-400 transition-colors hover:text-gray-600 disabled:opacity-50"
              >
                <i className="text-xl fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Newsletter Title Field */}
              <div>
                <label htmlFor="title" className="block mb-2 text-sm font-semibold text-gray-700">
                  Newsletter Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., Convergence Jan-Apr 2023"
                />
                <p className="mt-1 text-xs text-gray-500">Enter the title of the newsletter</p>
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
                <p className="mt-1 text-xs text-gray-500">Upload the newsletter PDF file</p>
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
                <p className="mt-1 text-xs text-gray-500">Upload a cover image for the newsletter (optional)</p>
              </div>

              {/* Read Online Link Field */}
              <div>
                <label htmlFor="link" className="block mb-2 text-sm font-semibold text-gray-700">
                  Read Online Link
                </label>
                <input
                  type="url"
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://www.ihubiitmandi.in/newsletter-may-july-2023/"
                />
                <p className="mt-1 text-xs text-gray-500">Enter the URL to read the newsletter online (optional)</p>
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
                      {editingItem ? 'Updating...' : 'Submitting...'}
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
